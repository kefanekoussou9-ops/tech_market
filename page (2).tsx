"use client";
import {useState} from "react";
const PAYMENT_NUMBER="061296564";
export default function Checkout(){
 const [copied,setCopied]=useState(false);
 const [transaction,setTransaction]=useState("");
 const [notice,setNotice]=useState("");
 async function copyNumber(){
  try{await navigator.clipboard.writeText(PAYMENT_NUMBER);setCopied(true)}
  catch{setCopied(false);setNotice("Copie automatique indisponible : sélectionne le numéro et copie-le manuellement.")}
 }
 function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  setNotice("Cette maquette ne transmet pas encore la commande au serveur. Ne considère pas le paiement comme validé et n'envoie aucun PDF avant d'avoir vérifié la transaction dans ton compte MTN MoMo.");
 }
 return <main className="wrap"><a href="/">← Retour à la librairie</a><section className="card" style={{maxWidth:650,margin:"35px auto"}}>
  <h1>Finaliser l'achat</h1><p className="muted">Paiement manuel par MTN Mobile Money uniquement.</p>
  <div className="card" style={{background:"#f5f7fa",margin:"18px 0"}}>
   <span className="pill">Numéro de paiement MTN MoMo</span><h2 style={{fontSize:30,letterSpacing:2,margin:"12px 0"}}>{PAYMENT_NUMBER}</h2>
   <button className="btn" type="button" onClick={copyNumber}>{copied?"Numéro copié":"Copier le numéro"}</button>
   <ol><li>Ouvre ton menu MTN Mobile Money.</li><li>Choisis l'envoi d'argent et saisis le numéro ci-dessus.</li><li>Vérifie le nom du bénéficiaire avant de confirmer.</li><li>Conserve le SMS et la référence de transaction.</li></ol>
  </div>
  <form className="stack" onSubmit={submit}>
   <label>Nom complet<input className="field" required placeholder="Ton nom"/></label>
   <label>Adresse e-mail<input className="field" type="email" required placeholder="exemple@email.com"/></label>
   <label>Numéro de téléphone<input className="field" required placeholder="+242…"/></label>
   <label>Référence de transaction MTN (après paiement)<input className="field" required value={transaction} onChange={e=>setTransaction(e.target.value)} placeholder="Référence indiquée dans le SMS MTN"/></label>
   <button className="btn" type="submit">J'ai effectué le paiement</button>
  </form>
  {notice&&<p className="muted" role="status" style={{marginTop:16}}>{notice}</p>}
  <p className="muted" style={{marginTop:18}}>Important : cette version est une maquette. Le formulaire ne sauvegarde pas encore les commandes et aucun PDF n'est débloqué automatiquement. Le vendeur doit vérifier le paiement directement dans son compte MTN MoMo avant de valider la commande. Ne communique jamais ton code PIN ni ton code OTP.</p>
 </section></main>
}
