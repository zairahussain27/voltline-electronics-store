import {useStore} from '../context/Store';
import {inr} from '../lib/utils';
export default function PriceBox(){
 const{count,totals:t,coupon}=useStore();
 return <div className="box"><h4>Price details ({count} items)</h4>
  <div className="row2"><span>Total MRP</span><span>{inr(t.mrp)}</span></div>
  <div className="row2"><span>Discount on MRP</span><span className="g">-{inr(t.dm)}</span></div>
  {t.cp>0&&<div className="row2"><span>Coupon ({coupon})</span><span className="g">-{inr(t.cp)}</span></div>}
  <div className="row2"><span>Platform fee</span><span>{inr(t.fee)}</span></div>
  <div className="row2 tot"><span>Total amount</span><span>{inr(t.total)}</span></div></div>;
}
