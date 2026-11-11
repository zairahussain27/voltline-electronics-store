import {CATS} from '../data/products';
import {productImage} from '../lib/images';
// Shows the product photo from src/assets/products when it exists, otherwise an emoji placeholder.
export default function Art({p,big,k=0}){
 const h=CATS[p.cat].hue+k*14,src=productImage(p,k);
 return <div className="art" style={{background:`radial-gradient(circle at 30% 20%,hsl(${h} 90% 97%),hsl(${h} 60% 88%))`}}>
  {src?<img src={src} alt={p.name} loading="lazy" draggable="false"/>
   :<span style={{fontSize:big?110:76,display:'inline-block',transform:`rotate(${k*9-9}deg) scale(${1+k*.06})`,filter:`drop-shadow(0 12px 12px hsl(${h} 40% 55%/.4))`}}>{CATS[p.cat].icon}</span>}</div>;
}
