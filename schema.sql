create extension if not exists pgcrypto;
create table if not exists public.books (
 id uuid primary key default gen_random_uuid(), title text not null, author text, description text,
 category text, price_xaf integer not null check(price_xaf>=0), cover_url text,
 storage_path text not null, active boolean not null default true, created_at timestamptz default now()
);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(), customer_name text not null, email text not null,
 phone text not null, total_xaf integer not null check(total_xaf>=0),
 payment_method text not null check(payment_method in ('MTN_MOMO','AIRTEL_MONEY')),
 payment_status text not null default 'PENDING' check(payment_status in ('PENDING','PAID','FAILED','CANCELLED')),
 provider_reference text unique, created_at timestamptz default now()
);
create table if not exists public.order_items (
 id uuid primary key default gen_random_uuid(), order_id uuid references public.orders(id) on delete cascade,
 book_id uuid references public.books(id), title_snapshot text not null,
 price_xaf integer not null check(price_xaf>=0)
);
create table if not exists public.download_grants (
 id uuid primary key default gen_random_uuid(), order_item_id uuid references public.order_items(id) on delete cascade,
 token_hash text not null unique, expires_at timestamptz not null, max_downloads integer not null default 3,
 downloads integer not null default 0
);
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'customer' check(role in ('customer','admin'))
);
alter table public.books enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.download_grants enable row level security;
alter table public.profiles enable row level security;
-- Ajouter des politiques RLS restrictives avant production.
-- Les fichiers PDF doivent rester dans un bucket privé, jamais dans un dossier public.
-- N'autoriser la génération de liens signés qu'après vérification serveur du statut PAID.
