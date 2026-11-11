import {useState} from 'react';
import {P,CATS} from '../data/products';
import {useStore} from '../context/Store';
import {disc} from '../lib/utils';
import ProductCard from '../components/ProductCard';
import BrandLogo from '../components/BrandLogo';
const PR=[['Any price',0,1e9],['Under ₹10,000',0,10000],['₹10,000 – ₹30,000',10000,30000],['₹30,000 – ₹75,000',30000,75000],['Above ₹75,000',75000,1e9]];
const SORTS={rec:['Recommended',(a,b)=>(a.rank||99)-(b.rank||99)||b.rating-a.rating],new:['What’s new',(a,b)=>b.id-a.id],pop:['Popularity',(a,b)=>b.rc-a.rc],disc:['Better discount',(a,b)=>disc(b)-disc(a)],hl:['Price: high to low',(a,b)=>b.price-a.price],lh:['Price: low to high',(a,b)=>a.price-b.price],rate:['Customer rating',(a,b)=>b.rating-a.rating]};
export default function Shop(){
 const{f,setFilter,loadMore}=useStore(),[open,setOpen]=useState(false);
 const pool=P.filter(p=>!f.cat||p.cat==f.cat),brands=[...new Set(pool.map(p=>p.brand))],[,lo,hi]=PR[f.pr];
 const list=P.filter(p=>(!f.cat||p.cat==f.cat)&&(!f.brands.length||f.brands.includes(p.brand))&&p.price>=lo&&p.price<hi&&p.rating>=f.rate&&disc(p)>=f.disc&&(p.name+p.brand+p.cat).toLowerCase().includes(f.q.toLowerCase())).sort(SORTS[f.sort][1]);
 const radio=(name,key,opts)=><div className="g"><h4>{name}</h4>{opts.map(([v,l])=><label key={v}><input type="radio" name={key} checked={f[key]==v} onChange={()=>setFilter({[key]:v})}/> {l}</label>)}</div>;
 const chips=[...f.brands.map(b=>[b,()=>setFilter({brands:f.brands.filter(x=>x!=b)})]),f.pr&&[PR[f.pr][0],()=>setFilter({pr:0})],f.rate&&[f.rate+'★ & above',()=>setFilter({rate:0})],f.disc&&[f.disc+'% & above',()=>setFilter({disc:0})],f.q&&['“'+f.q+'”',()=>setFilter({q:''})]].filter(Boolean);
 return <>
  <div className="crumb"><a href="#home">Home</a> / <b>{f.cat||'All products'}</b></div>
  <div className="shop">
   <aside className={open?'on':''}>
    <div className="g"><h4>Categories</h4>{['',...Object.keys(CATS)].map(c=><label key={c}><input type="radio" name="c" checked={f.cat==c} onChange={()=>setFilter({cat:c,brands:[]})}/> {c||'All'}</label>)}</div>
    <div className="g"><h4>Brand</h4>{brands.map(b=><label key={b}><input type="checkbox" checked={f.brands.includes(b)} onChange={()=>setFilter({brands:f.brands.includes(b)?f.brands.filter(x=>x!=b):[...f.brands,b]})}/> <BrandLogo name={b} mark h={18}/> {b}<small>{pool.filter(p=>p.brand==b).length}</small></label>)}</div>
    {radio('Price','pr',PR.map((r,i)=>[i,r[0]]))}
    {radio('Rating','rate',[[0,'Any'],[4,'4.0★ & above'],[4.5,'4.5★ & above']])}
    {radio('Discount','disc',[[0,'Any'],[10,'10% and above'],[15,'15% and above'],[20,'20% and above']])}
   </aside>
   <div className="main">
    <div className="top"><h1>{f.cat||'All products'} <span>– {list.length} items</span></h1>
     <div><button className="btn out fbtn" style={{padding:'9px 16px'}} onClick={()=>setOpen(!open)}>Filter</button> <select value={f.sort} onChange={e=>setFilter({sort:e.target.value})} aria-label="Sort by">{Object.entries(SORTS).map(([k,v])=><option key={k} value={k}>Sort by: {v[0]}</option>)}</select></div></div>
    <div className="chips">{chips.map(([l,fn])=><button key={l} className="chip" onClick={fn}>{l} ✕</button>)}</div>
    {list.length?<><div className="grid">{list.slice(0,f.lim).map(p=><ProductCard key={p.id} p={p}/>)}</div>
     {list.length>f.lim&&<p style={{textAlign:'center',marginTop:28}}><button className="btn out" onClick={loadMore}>Load more ({list.length-f.lim})</button></p>}</>
     :<div className="empty"><h3>No matching products</h3><p>Try clearing a filter or searching for something else.</p></div>}
   </div>
  </div></>;
}
