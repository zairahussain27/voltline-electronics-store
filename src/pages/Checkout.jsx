import {useState} from 'react';
import {useStore} from '../context/Store';
import {inr} from '../lib/utils';
import {go} from '../router';
import Steps from '../components/Steps';
import PriceBox from '../components/PriceBox';
import {EmptyBag} from './Bag';
const PAYS=['UPI (GPay, PhonePe, Paytm)','Credit / debit card','Cash on delivery'];
export default function Checkout(){
 const{items,placeOrder,openCat,user}=useStore(),[pm,setPm]=useState(0),[done,setDone]=useState(null);
 if(done)return <div className="ok"><div style={{fontSize:64}}>✅</div><h1>Order placed!</h1>
  <p style={{color:'var(--mute)'}}>Order ID {done.id} · {inr(done.total)}. This is a demo, so no payment was taken.</p>
  <button className="btn" onClick={()=>go('orders')}>View my orders</button> <button className="btn out" onClick={()=>openCat('')}>Continue shopping</button></div>;
 if(!items.length)return <EmptyBag/>;
 const submit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));setDone(placeOrder({to:`${d.name}, ${d.addr}, ${d.city} ${d.pin}`,pay:PAYS[pm]}))};
 return <><Steps n={1}/><div className="bag"><div>
  <div className="box"><h4>Delivery address</h4><form className="f" id="cof" onSubmit={submit}>
   <input className="w" name="name" required defaultValue={user?user.name:''} placeholder="Full name"/><input name="phone" required inputMode="numeric" pattern="[0-9]{10}" placeholder="Mobile (10 digits)"/><input name="pin" required pattern="[0-9]{6}" placeholder="PIN code"/>
   <input className="w" name="addr" required placeholder="Address"/><input name="city" required placeholder="City"/><input name="state" required placeholder="State"/>
   <div className="w pay"><h4 style={{margin:'8px 0'}}>Payment method</h4>
    {PAYS.map((l,i)=><label key={l}><input type="radio" name="pm" checked={pm==i} onChange={()=>setPm(i)}/> {l}</label>)}
    {pm==0&&<div className="pnl"><input name="upi" required pattern=".+@.+" placeholder="UPI ID (name@bank)"/></div>}
    {pm==1&&<div className="pnl"><input name="card" required inputMode="numeric" pattern="[0-9 ]{16,19}" placeholder="Card number"/><input name="exp" required pattern="[0-9]{2}/[0-9]{2}" placeholder="MM/YY"/><input name="cvv" required pattern="[0-9]{3}" placeholder="CVV"/></div>}
    {pm==2&&<div className="pnl"><p style={{margin:'6px 0',color:'var(--mute)'}}>Pay in cash when your order arrives.</p></div>}</div>
  </form></div></div>
  <div><PriceBox/><button className="btn full" form="cof">Confirm order</button></div></div></>;
}
