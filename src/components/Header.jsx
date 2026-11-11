import {useState} from 'react';
import {CATS,P} from '../data/products';
import {useStore} from '../context/Store';
import {go} from '../router';
import BrandLogo from './BrandLogo';
const brandsOf=c=>[...new Set(P.filter(p=>p.cat==c).map(p=>p.brand))];
export default function Header({route}){
 const{f,setFilter,openCat,count,wish,user,setModal,copyCode}=useStore(),[open,setOpen]=useState(false);
 const nav=(c,b)=>{openCat(c,b);setOpen(false)};
 const search=e=>{setFilter(route=='shop'?{q:e.target.value}:{q:e.target.value,cat:'',brands:[]});go('shop')};
 return <>
  <div className="strip" style={{cursor:'pointer'}} onClick={()=>copyCode('VOLT10')}>Free delivery above ₹999 · Extra 10% off with code VOLT10 (tap to copy)</div>
  <header><div className="wrap bar">
   <button className="burger" aria-label="Menu" onClick={()=>setOpen(!open)}>☰</button>
   <a className="logo" href="#home">VOLTLINE</a>
   <nav className={open?'on':''}>
    {Object.keys(CATS).map(c=><div className="ni" key={c}>
     <a href="#shop" className={route=='shop'&&f.cat==c?'on':''} onClick={()=>nav(c)}>{c}</a>
     <div className="mega"><b>Brands</b>{brandsOf(c).map(b=><a href="#shop" key={b} onClick={()=>nav(c,b)}><BrandLogo name={b} mark h={20}/>{b}</a>)}</div></div>)}
    <div className="ni"><a href="#shop" className={route=='shop'&&!f.cat?'on':''} onClick={()=>nav('')}>All</a></div>
   </nav>
   <div className="search"><i>⌕</i><input type="search" value={f.q} onChange={search} placeholder="Search for mobiles, laptops, microphones and more" aria-label="Search"/></div>
   <div className="icons">
    <button className="ic" onClick={()=>user?setModal({t:'profile'}):go('login')}><span>👤</span>{user?user.name.split(' ')[0].slice(0,8):'Profile'}</button>
    <button className="ic" onClick={()=>go('orders')}><span>📦</span>Orders</button>
    <button className="ic" onClick={()=>go('wishlist')}><span>♡</span>Wishlist<b key={wish.length} className="bump">{wish.length}</b></button>
    <button className="ic" onClick={()=>go('bag')}><span>👜</span>Bag<b key={count} className="bump">{count}</b></button>
   </div>
  </div></header></>;
}
