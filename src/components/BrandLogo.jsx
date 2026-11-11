import {brandLogo} from '../lib/images';
// Brand logo image (falls back to the brand name if no logo file exists).
export default function BrandLogo({name,mark,h=24}){
 const s=brandLogo(name,mark);
 return s?<img className="bl" src={s} alt={name+' logo'} style={{height:h}}/>:<b>{name}</b>;
}
