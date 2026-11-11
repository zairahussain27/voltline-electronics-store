import {useState} from 'react';
import {CATS} from '../data/products';
import {useStore} from '../context/Store';
import {go} from '../router';
import Avatar from './Avatar';
const MENU_SECTIONS={
 Mobiles:['Shop by Brand','Shop by Category','Shop by Price','Shop by Features'],
 Laptops:['Shop by Brand','Shop by Category','Shop by Price','Shop by Usage'],
 Microphones:['Shop by Brand','Shop by Type','Shop by Connectivity','Shop by Price'],
 Accessories:['Shop by Brand','Shop by Category','Shop by Device','Shop by Price'],
 All:['Shop by Brand','Shop by Category','Shop by Price','Shop by Popularity']
};
const BROWSE_TYPES={
 'Shop by Brand':'brand','Shop by Category':'category','Shop by Price':'price','Shop by Features':'features',
 'Shop by Usage':'features','Shop by Type':'type','Shop by Connectivity':'connectivity','Shop by Device':'category','Shop by Popularity':'popular'
};
export default function Header({route}){
 const{f,setFilter,openCat,browseShop,count,wish,user,copyCode}=useStore(),[open,setOpen]=useState(false),[openMega,setOpenMega]=useState('');
 const nav=(c,b)=>{openCat(c,b);if(window.matchMedia('(max-width: 1000px)').matches){setOpen(true);setOpenMega(openMega===c?'':c)}else setOpen(false)};
 const browse=(category,heading)=>{browseShop(category,BROWSE_TYPES[heading]||'category');setOpen(false);setOpenMega('')};
 const search=e=>{setFilter(route=='shop'?{q:e.target.value}:{q:e.target.value,cat:'',brands:[]});go('shop')};
 return <>
  <div className="strip" style={{cursor:'pointer'}} onClick={()=>copyCode('VOLT10')}>Free delivery above ₹999 · Extra 10% off with code VOLT10 (tap to copy)</div>
  <header><div className="wrap bar">
   <button className="burger" aria-label="Menu" onClick={()=>setOpen(!open)}>☰</button>
   <a className="logo" href="#home">VOLTLINE</a>
   <nav className={open?'on':''}>
    {Object.keys(CATS).map(c=><div className="ni" key={c}>
     <a href="#shop" className={route=='shop'&&f.cat==c?'on':''} onClick={()=>nav(c)}>{c}</a>
     <div className={'mega'+(openMega===c?' expanded':'')}>{MENU_SECTIONS[c].map(section=><button type="button" key={section} onClick={()=>browse(c,section)}>{section}</button>)}</div></div>)}
    <div className="ni"><a href="#shop" className={route=='shop'&&!f.cat?'on':''} onClick={()=>nav('')}>All</a><div className={'mega'+(openMega===''&&open?' expanded':'')}>{MENU_SECTIONS.All.map(section=><button type="button" key={section} onClick={()=>browse('',section)}>{section}</button>)}</div></div>
   </nav>
   <div className="search"><i>⌕</i><input type="search" value={f.q} onChange={search} placeholder="Search for mobiles, laptops, microphones and more" aria-label="Search"/></div>
   <div className="icons">
    <button className="ic" onClick={()=>user?go('profile'):go('login')}><span className="ic-avatar"><Avatar user={user} size={22}/></span><span className="ic-label">{user?user.name.split(' ')[0].slice(0,8):'Profile'}</span></button>
    <button className="ic" onClick={()=>go('orders')}><span>📦</span>Orders</button>
    <button className="ic" onClick={()=>go('wishlist')}><span>♡</span>Wishlist<b key={wish.length} className="bump">{wish.length}</b></button>
    <button className="ic" onClick={()=>go('bag')}><span>👜</span>Bag<b key={count} className="bump">{count}</b></button>
   </div>
  </div></header></>;
}
