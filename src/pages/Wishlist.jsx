import {P} from '../data/products';
import {useStore} from '../context/Store';
import ProductCard from '../components/ProductCard';
export default function Wishlist(){
 const{wish,openCat}=useStore(),l=P.filter(p=>wish.includes(p.id));
 return <><h1 style={{fontSize:18,margin:'24px 0'}}>My wishlist <span style={{color:'var(--mute)',fontWeight:400}}>{l.length} items</span></h1>
  {l.length?<div className="grid">{l.map(p=><ProductCard key={p.id} p={p}/>)}</div>
  :<div className="empty"><h3>Your wishlist is empty</h3><p>Tap the heart on any product to save it here.</p><button className="btn" onClick={()=>openCat('')}>Continue shopping</button></div>}</>;
}
