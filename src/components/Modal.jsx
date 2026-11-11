import {useState,useEffect} from 'react';
import {useStore} from '../context/Store';
import {go} from '../router';
import {inr} from '../lib/utils';
const INFO={returns:['Easy returns','Return any product within 7 days of delivery in its original packaging. Refunds reach your original payment method in 3 to 5 working days.'],shipping:['Shipping','Free delivery on orders above ₹999, otherwise ₹99. Most orders arrive in 3 to 5 days.'],warranty:['Warranty','Every product carries a 1-year brand warranty. Keep your invoice for service claims.'],emi:['No-cost EMI','Choose 3 or 6 month plans at checkout on orders above ₹10,000. No interest and no processing fee.']};
const STORES=[['Indore – Treasure Island Mall','MG Road, Indore'],['Mumbai – Phoenix Palladium','Lower Parel, Mumbai'],['Delhi – Select Citywalk','Saket, New Delhi'],['Bengaluru – Orion Mall','Rajajinagar, Bengaluru'],['Hyderabad – Inorbit Mall','Madhapur, Hyderabad']];
export default function Modal(){
 const{modal,setModal,user,setUser,wish,toast}=useStore(),[gc,setGc]=useState(1000),[sq,setSq]=useState('');
 const close=()=>setModal(null),t=modal&&modal.t;
 useEffect(()=>{const h=e=>e.key=='Escape'&&setModal(null);addEventListener('keydown',h);return()=>removeEventListener('keydown',h)},[setModal]);
 const form=(msg,fn)=>e=>{e.preventDefault();fn&&fn(e.target.elements);close();toast(msg)};
 let body=null;
 if(t=='profile'&&user)body=<><h3>Hi, {user.name}</h3><p style={{color:'var(--mute)'}}>{user.email}</p>
  <button className="btn out full" style={{marginBottom:10}} onClick={()=>go('orders')}>My orders</button>
  <button className="btn out full" style={{marginBottom:10}} onClick={()=>go('wishlist')}>My wishlist ({wish.length})</button>
  <button className="btn full" onClick={()=>{setUser(null);close();toast('Logged out')}}>Log out</button></>;
 else if(INFO[t])body=<><h3>{INFO[t][0]}</h3><p style={{color:'#3e4152'}}>{INFO[t][1]}</p></>;
 else if(t=='contact')body=<form onSubmit={form('Message sent. We will reply within 24 hours')}><h3>Contact us</h3><input required type="email" placeholder="Your email"/><input required placeholder="How can we help?"/><button className="btn full">Send message</button></form>;
 else if(t=='gift')body=<form onSubmit={form('Gift card of '+inr(gc)+' sent')}><h3>Gift cards</h3><p style={{color:'var(--mute)'}}>Pick an amount.</p>
  <div className="vs" style={{marginBottom:16}}>{[500,1000,2000,5000].map(a=><button type="button" key={a} className={a==gc?'on':''} onClick={()=>setGc(a)}>{inr(a)}</button>)}</div>
  <input required type="email" placeholder="Recipient email"/><button className="btn full">Send gift card</button></form>;
 else if(t=='stores'){const l=STORES.filter(s=>(s[0]+s[1]).toLowerCase().includes(sq.toLowerCase()));
  body=<><h3>Store locator</h3><input value={sq} onChange={e=>setSq(e.target.value)} placeholder="Search by city"/>
  {l.length?l.map(s=><div className="box" key={s[0]}><b>{s[0]}</b><div style={{color:'var(--mute)'}}>{s[1]} · Open 10am to 9pm</div></div>):<p style={{color:'var(--mute)'}}>No stores found in that city.</p>}</>}
 return <div className={'md'+(modal?' on':'')} onClick={e=>e.target===e.currentTarget&&close()}><div className="mb" role="dialog" aria-modal="true">
  {body&&<><button className="mx" onClick={close} aria-label="Close">✕</button>{body}</>}</div></div>;
}
