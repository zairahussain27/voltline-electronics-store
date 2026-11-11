import {useState} from 'react';
import {VAR,COUPONS} from '../data/products';
import {useStore} from '../context/Store';
import {inr} from '../lib/utils';
import {go} from '../router';
import Art from '../components/Art';
import Steps from '../components/Steps';
import PriceBox from '../components/PriceBox';
export function EmptyBag(){
 const{openCat}=useStore();
 return <div className="empty" style={{padding:'100px 0'}}><div style={{fontSize:60}}>👜</div><h3>Hey, it feels so light!</h3><p>There is nothing in your bag. Let’s add some items.</p><button className="btn" onClick={()=>openCat('')}>Continue shopping</button></div>;
}
export default function Bag(){
 const{items,setQty,wish,toggleWish,openProduct,coupon,setCoupon,toast}=useStore(),[code,setCode]=useState(coupon);
 if(!items.length)return <EmptyBag/>;
 const stop=fn=>e=>{e.stopPropagation();fn()};
 const apply=()=>{const c=code.trim().toUpperCase();if(!c||COUPONS[c]){setCoupon(c);toast(c?'Coupon applied':'Coupon removed')}else toast('Invalid coupon code')};
 return <><Steps n={0}/><div className="bag"><div>
  {items.map(i=><div className="bi" key={i.k} onClick={()=>openProduct(i.p.id,i.vi)}><Art p={i.p}/>
   <div><b>{i.p.brand}</b><div style={{color:'var(--mute)'}}>{i.p.name}</div><div style={{marginTop:4}}>{VAR[i.p.cat][i.vi]}</div>
    <select value={i.q} aria-label="Quantity" onClick={e=>e.stopPropagation()} onChange={e=>setQty(i.k,+e.target.value)}>{[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}</select>
    <button className="btn out" style={{padding:'6px 12px',fontSize:12,marginTop:8}} onClick={stop(()=>{if(!wish.includes(i.p.id))toggleWish(i.p.id);setQty(i.k,0)})}>Move to wishlist</button>
    <div className="pr" style={{fontSize:16}}><b>{inr(i.price*i.q)}</b><s>{inr(i.old*i.q)}</s><em>({Math.round((1-i.price/i.old)*100)}% OFF)</em></div></div>
   <button className="bx" aria-label="Remove" onClick={stop(()=>setQty(i.k,0))}>✕</button></div>)}
  </div><div>
   <div className="box"><h4>Coupons</h4><div className="cp"><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter code"/><button onClick={apply}>Apply</button></div></div>
   <PriceBox/><button className="btn full" onClick={()=>go('checkout')}>Place order</button></div></div></>;
}
