import {useRef} from 'react';
import ProductCard from './ProductCard';
export default function Row({title,list,ranked}){
 const r=useRef(),sc=d=>r.current.scrollBy({left:d*r.current.clientWidth*.8,behavior:'smooth'});
 return <><h2 className="h2">{title}</h2><div className="rowbox">
  <button className="arrow l" onClick={()=>sc(-1)} aria-label="Previous">‹</button>
  <div className="row" ref={r}>{list.map((p,i)=><ProductCard key={p.id} p={p} tag={ranked?`#${i+1} Bestseller`:''}/>)}</div>
  <button className="arrow r" onClick={()=>sc(1)} aria-label="Next">›</button></div></>;
}
