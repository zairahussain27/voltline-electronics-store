import {CATS} from '../data/products';
import {useStore} from '../context/Store';
import {go} from '../router';
export default function Footer(){
 const{openCat,setModal}=useStore(),info=t=><button key={t[0]} onClick={()=>t[0]=='track'?go('orders'):setModal({t:t[0]})}>{t[1]}</button>;
 return <footer><div className="wrap"><div className="c">
  <div><b>Shop</b>{Object.keys(CATS).map(c=><button key={c} onClick={()=>openCat(c)}>{c}</button>)}</div>
  <div><b>Customer policies</b>{[['contact','Contact us'],['returns','Returns'],['shipping','Shipping'],['warranty','Warranty']].map(info)}</div>
  <div><b>Useful links</b>{[['track','Track orders'],['gift','Gift cards'],['stores','Store locator']].map(info)}</div>
  <div><b>Voltline</b><p>A demo storefront built with React and mock data. No payments are processed.</p></div>
 </div></div></footer>;
}
