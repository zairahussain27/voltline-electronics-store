import Art from './Art';
import {useStore} from '../context/Store';
import {inr,disc} from '../lib/utils';
export default function ProductCard({p,tag}){
 const{wish,toggleWish,addCart,openProduct}=useStore(),on=wish.includes(p.id);
 const stop=fn=>e=>{e.stopPropagation();fn()};
 return <article className="card" onClick={()=>openProduct(p.id)}>
  <div className="im"><Art p={p}/>{tag&&<span className="tag">{tag}</span>}
   <span className="rt">{p.rating} <i>★</i> | <s>{p.rc.toFixed(1)}k</s></span>
   <button key={String(on)} className={'heart'+(on?' on':'')} aria-label="Wishlist" onClick={stop(()=>toggleWish(p.id))}>{on?'♥':'♡'}</button></div>
  <div className="bd"><b className="bn">{p.brand}</b><span className="nm">{p.name}</span>
   <div className="pr"><b>{inr(p.price)}</b><s>{inr(p.old)}</s><em>({disc(p)}% OFF)</em></div>
   <div className="qa"><button onClick={stop(()=>addCart(p.id))}>ADD TO BAG</button></div></div>
 </article>;
}
