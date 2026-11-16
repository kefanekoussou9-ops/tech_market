# TECH MARKET — Librairie PDF

## Lancer en local
- Installer Node.js LTS.
- `npm install`
- `npm run dev`
- Ouvrir http://localhost:3000

## Inclus
- Catalogue de livres numériques d'exemple
- Recherche, catégories et panier
- Instructions de paiement manuel MTN Mobile Money au 061296564
- Saisie de la référence de transaction (maquette uniquement)
- Maquette de page administration
- Schéma SQL Supabase de départ
- Endpoint de paiement volontairement désactivé

## À faire avant de vendre réellement
1. Remplacer les livres d'exemple par des livres dont vous détenez les droits de distribution.
2. Créer un projet Supabase et appliquer `supabase/schema.sql`.
3. Configurer une authentification client/admin et des politiques RLS strictes.
4. Stocker les PDF dans un bucket privé (pas de lien public permanent).
5. Construire la commande côté serveur : recalcul du prix depuis la base et création en statut PENDING.
6. Pour le mode manuel actuel, vérifier chaque paiement dans le compte MTN MoMo avant toute livraison. Le numéro 061296564 est un compte personnel : ne pas supposer qu’il dispose d’une API marchande. Pour automatiser les paiements, obtenir un compte marchand MTN MoMo ou choisir un agrégateur confirmant la couverture Congo-Brazzaville.
7. Intégrer l'API de paiement côté serveur et vérifier les webhooks signés : référence, montant XAF, statut final, idempotence.
8. Après confirmation PAID uniquement, créer un lien signé temporaire, limité en durée et en nombre de téléchargements.
9. Ne jamais demander ni enregistrer le PIN Mobile Money. Ne jamais considérer une capture d'écran ou un retour navigateur comme preuve de paiement.
10. Ajouter emails transactionnels, factures, politique de confidentialité, conditions de vente, support et sauvegardes.

## Sécurité
La page `/admin` est une maquette non protégée. Ne la publiez pas avant d'ajouter l'authentification et le contrôle de rôle côté serveur. L'endpoint checkout retourne HTTP 501 tant que l'intégration n'est pas configurée : aucun paiement réel ne peut être fait avec cette version.
