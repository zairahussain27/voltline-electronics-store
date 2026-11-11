import {useStore} from '../context/Store';
import {byId,inr} from '../lib/utils';
import Art from '../components/Art';
export default function Orders(){
 const{orders,cancelOrder,openProduct,openCat}=useStore();
 if(!orders.length)return <div className="empty" style={{padding:'100px 0'}}><div style={{fontSize:60}}>📦</div><h3>No orders yet</h3><p>Orders you place will show up here.</p><button className="btn" onClick={()=>openCat('')}>Start shopping</button></div>;
 return <><h1 style={{fontSize:18,margin:'24px 0'}}>My orders <span style={{color:'var(--mute)',fontWeight:400}}>{orders.length}</span></h1>
  {orders.map(o=>{const x=o.status=='Cancelled';return <div className="box" key={o.id}>
   <div className="row2"><b>Order {o.id}</b><span style={{color:'var(--mute)'}}>{o.date}</span></div>
   <p style={{margin:'4px 0 12px'}}><span className={'ost'+(x?' c':'')}>{o.status}</span> <span style={{color:'var(--mute)'}}>{x?'Refund in 3 to 5 days':'Arriving in 3 days'}</span></p>
   {o.items.map(i=><div className="bi ob" key={i.pid+i.v} onClick={()=>openProduct(i.pid)}><Art p={byId(i.pid)}/><div><b>{i.brand}</b><div style={{color:'var(--mute)'}}>{i.name}</div><div>{i.v} · Qty {i.q}</div></div><b>{inr(i.price*i.q)}</b></div>)}
   <div className="row2"><span>Deliver to</span><span style={{textAlign:'right'}}>{o.to}</span></div>
   <div className="row2"><span>Payment</span><span>{o.pay}</span></div>
   <div className="row2 tot"><span>Total</span><span>{inr(o.total)}</span></div>
   {!x&&<button className="btn out" style={{marginTop:10,padding:'9px 16px'}} onClick={()=>cancelOrder(o.id)}>Cancel order</button>}</div>})}</>;
}
