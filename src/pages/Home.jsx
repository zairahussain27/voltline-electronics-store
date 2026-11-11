import {useState,useEffect} from 'react';
import {P,CATS,SLIDES} from '../data/products';
import {useStore} from '../context/Store';
import {byId,disc} from '../lib/utils';
import Art from '../components/Art';
import Row from '../components/Row';
import Reveal from '../components/Reveal';
import BrandLogo from '../components/BrandLogo';
import ProductCard from '../components/ProductCard';
export default function Home(){
 const{openCat,openProduct,copyCode,setModal}=useStore(),[s,setS]=useState(0);
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const id=setInterval(()=>setS(x=>(x+1)%SLIDES.length),5000);return()=>clearInterval(id);
 },[]);
 const best=P.filter(p=>p.rank).sort((a,b)=>a.rank-b.rank).slice(0,10),feat=P.filter(p=>p.rating>=4.6),deals=[...P].sort((a,b)=>disc(b)-disc(a)).slice(0,8);
 const mx=c=>Math.max(...P.filter(p=>p.cat==c).map(disc)),brands=[...new Set(P.map(p=>p.brand))];
 return <>
  <div className="hero" style={{marginTop:14,borderRadius:6}}>
   {SLIDES.map((sl,i)=><div key={i} className={'slide'+(i==s?' on':'')} style={{background:`linear-gradient(110deg,${sl.bg})`}}>
    <div><h1>{sl.t}</h1><p>{sl.d}</p><button className="btn" onClick={()=>sl.id?openProduct(sl.id):openCat(sl.cat)}>Shop now</button></div><Art p={byId(sl.id||sl.a)} big/></div>)}
   <div className="dots">{SLIDES.map((_,i)=><button key={i} className={i==s?'on':''} onClick={()=>setS(i)} aria-label={'Slide '+(i+1)}/>)}</div>
  </div>
  <Reveal><h2 className="h2">Deal of the day</h2>
  <div className="tiles">{Object.entries(CATS).map(([c,v])=><div className="tile" key={c} onClick={()=>openCat(c)} style={{background:`linear-gradient(160deg,hsl(${v.hue} 75% 55%),hsl(${v.hue+30} 80% 40%))`}}><span>{v.icon}</span><h3>{c}</h3><p>UP TO {mx(c)}% OFF</p></div>)}</div></Reveal>
  <Reveal><h2 className="h2">Best of brands</h2>
  <div className="brands">{brands.map(b=><div className="br" key={b} onClick={()=>openCat('',b)}><div><BrandLogo name={b} mark h={58}/></div><small>{b}</small></div>)}</div></Reveal>
  <Reveal><h2 className="h2">Bank offers</h2>
  <div className="offers">
   <div className="of" onClick={()=>copyCode('VOLT10')}><b>10% instant discount</b><br/>On orders above ₹10,000<br/><code>VOLT10 · tap to copy</code></div>
   <div className="of" onClick={()=>copyCode('LAPTOP3K')}><b>5% off laptops</b><br/>Max ₹5,000 off<br/><code>LAPTOP3K · tap to copy</code></div>
   <div className="of" onClick={()=>setModal({t:'emi'})}><b>No-cost EMI</b><br/>On 3 &amp; 6 month plans<br/><code>Tap for details</code></div>
  </div></Reveal>
  <Reveal><Row title="Top 10 bestsellers" list={best} ranked/></Reveal>
  <Reveal><Row title="Featured picks" list={feat}/></Reveal>
  <Reveal><h2 className="h2">Hot deals</h2><div className="grid">{deals.map(p=><ProductCard key={p.id} p={p}/>)}</div></Reveal>
 </>;
}
