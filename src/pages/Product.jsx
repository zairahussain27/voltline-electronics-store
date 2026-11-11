import {useState} from 'react';
import {VAR} from '../data/products';
import {P} from '../data/products';
import {useStore} from '../context/Store';
import {byId,inr,priceOf,oldOf} from '../lib/utils';
import Art from '../components/Art';
import Row from '../components/Row';
import BrandLogo from '../components/BrandLogo';
export default function Product(){
 const{pid,vi,setVi,addCart,wish,toggleWish,openCat}=useStore(),[pin,setPin]=useState(''),[dl,setDl]=useState(null);
 const p=byId(pid),pr=priceOf(p,vi),od=oldOf(p,vi),on=wish.includes(p.id);
 const check=()=>setDl(/^\d{6}$/.test(pin)?new Date(Date.now()+3*864e5).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'}):'bad');
 return <>
  <div className="crumb"><a href="#home">Home</a> / <a href="#shop" onClick={()=>openCat(p.cat)}>{p.cat}</a> / <b>{p.name}</b></div>
  <div className="pd"><div className="gal">{[0,1,2,3].map(k=><Art key={k} p={p} big k={k}/>)}</div>
   <div><h1 className="bh"><BrandLogo name={p.brand} mark h={34}/>{p.brand}</h1><h2>{p.name}</h2><span className="rb">{p.rating} <i>★</i> <s>| {p.rc.toFixed(1)}k Ratings</s></span>
    <div className="pp">{inr(pr)}<s>MRP {inr(od)}</s><em>({Math.round((1-pr/od)*100)}% OFF)</em></div><div className="tx">inclusive of all taxes</div>
    <h4>{p.cat=='Mobiles'||p.cat=='Laptops'?'Select storage':'Select colour'}</h4>
    <div className="vs">{VAR[p.cat].map((v,i)=><button key={v} className={i==vi?'on':''} onClick={()=>setVi(i)}>{v}</button>)}</div>
    <div className="acts"><button className="btn" onClick={()=>addCart(p.id,vi)}>👜 Add to bag</button><button className="btn out" onClick={()=>toggleWish(p.id)}>{on?'♥ Wishlisted':'♡ Wishlist'}</button></div>
    <h4>Delivery options</h4><div className="pin"><input value={pin} onChange={e=>setPin(e.target.value)} inputMode="numeric" maxLength={6} placeholder="Enter PIN code"/><button onClick={check}>Check</button></div>
    <p style={{color:'var(--mute)',margin:'8px 0 0'}}>{dl==null?'Enter your PIN code to check delivery and cash on delivery.':dl=='bad'?'Please enter a valid 6-digit PIN code':<>Delivery by <b style={{color:'var(--gr)'}}>{dl}</b> · Cash on delivery available</>}</p>
    <h4>Best offers</h4><ul className="ol"><li>Extra 10% off with code <b>VOLT10</b></li><li>No-cost EMI on 3 &amp; 6 month plans</li><li>7-day easy returns · 1-year brand warranty</li></ul>
    <h4>Product details</h4><p style={{color:'#3e4152'}}>{p.desc}</p><div className="sp">{p.specs.map(s=><div key={s[0]}><span>{s[0]}</span><b>{s[1]}</b></div>)}</div>
   </div></div>
  <Row title="Similar products" list={P.filter(x=>x.cat==p.cat&&x.id!=p.id)}/></>;
}
