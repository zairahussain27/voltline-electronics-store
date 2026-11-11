import {useEffect,useMemo,useState} from 'react';
import {useStore} from '../context/Store';
import {P,CATS} from '../data/products';
import {inr} from '../lib/utils';
import useLocal from '../lib/useLocal';
import {go} from '../router';

const STATUSES=['Pending','Processing','Shipped','Delivered','Cancelled'];
const seedProducts=P.slice(5,9).map((p,i)=>({id:'demo-'+p.id,name:p.name,category:p.cat,price:p.price,stock:[3,12,0,8][i],image:'',status:'Active'}));
const seedOrders=[
 {id:'VL84219310',customer:'Aarav Mehta',email:'aarav@example.com',phone:'9876543210',address:'Indore, Madhya Pradesh',product:'AeroBook 14 Air',quantity:1,total:89990,date:'10 Nov 2026',status:'Pending'},
 {id:'VL73104826',customer:'Nisha Kapoor',email:'nisha@example.com',phone:'9876501234',address:'Pune, Maharashtra',product:'Podcaster USB-C',quantity:1,total:8999,date:'09 Nov 2026',status:'Processing'},
 {id:'VL62051734',customer:'Kabir Shah',email:'kabir@example.com',phone:'9812345670',address:'Mumbai, Maharashtra',product:'ANC Headphones Max',quantity:2,total:49998,date:'08 Nov 2026',status:'Delivered'},
 {id:'VL51940623',customer:'Sana Ali',email:'sana@example.com',phone:'9898989898',address:'Jaipur, Rajasthan',product:'Titan G16 Gaming',quantity:1,total:129990,date:'07 Nov 2026',status:'Pending'}
];
const money=amount=>inr(Number(amount)||0);

export default function SellerDashboard(){
 const{user,toast}=useStore();
 const key=user?.email||'guest';
 const[tab,setTab]=useState(()=>{try{return sessionStorage.getItem('voltline-seller-tab')||'Overview'}catch{return 'Overview'}});
 const[products,setProducts]=useLocal('seller-products:'+key,seedProducts);
 const[orders,setOrders]=useLocal('seller-orders:'+key,seedOrders);
 const[store,setStore]=useLocal('seller-store:'+key,{name:user?.storeName||`${user?.name||'My'} Store`,description:'Quality electronics, thoughtfully selected.',email:user?.email||'',phone:'',address:'',logo:''});
 const[editing,setEditing]=useState(null),[adding,setAdding]=useState(false),[formError,setFormError]=useState('');
 const[settings,setSettings]=useState(false);
 useEffect(()=>{const selectTab=e=>setTab(e.detail);addEventListener('seller-tab',selectTab);return()=>removeEventListener('seller-tab',selectTab)},[]);
 const selectSection=section=>{setTab(section);try{if(section==='Overview')sessionStorage.removeItem('voltline-seller-tab');else sessionStorage.setItem('voltline-seller-tab',section)}catch{};dispatchEvent(new CustomEvent('seller-tab',{detail:section}))};
 const activeOrders=orders.filter(o=>o.status!=='Cancelled');
 const revenue=activeOrders.reduce((sum,o)=>sum+(Number(o.total)||0),0);
 const pending=orders.filter(o=>o.status==='Pending').length;
 const lowStock=products.filter(p=>p.stock<=5);
 const bestSellers=useMemo(()=>products.map(p=>({...p,sold:orders.filter(o=>o.product===p.name&&o.status!=='Cancelled').reduce((sum,o)=>sum+(Number(o.quantity)||1),0)})).sort((a,b)=>b.sold-a.sold).slice(0,5),[products,orders]);

 if(!user)return <div className="empty"><h3>Log in to open the Seller Dashboard</h3><button className="btn" onClick={()=>go('login')}>Log in</button></div>;
 if(user.role!=='seller')return <div className="empty"><h3>This dashboard is for seller accounts</h3><button className="btn out" onClick={()=>go('home')}>Continue shopping</button></div>;

 const openNew=()=>{setEditing({id:'',name:'',category:'Accessories',price:'',stock:'',image:'',status:'Active'});setAdding(true);setFormError('')};
 const saveProduct=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));if(!d.name.trim()||Number(d.price)<=0||Number(d.stock)<0){setFormError('Enter a product name, a positive price, and a valid stock quantity.');return}const item={...editing,name:d.name.trim(),category:d.category,price:Number(d.price),stock:Number(d.stock),image:editing.image||'',status:d.status||'Active'};setProducts(list=>editing.id?list.map(p=>p.id===editing.id?item:p):[{...item,id:'seller-'+Date.now()},...list]);setEditing(null);setAdding(false);setFormError('');toast(editing.id?'Product updated':'Product added')};
 const removeProduct=id=>{if(!confirm('Delete this product from your demo catalog?'))return;setProducts(list=>list.filter(p=>p.id!==id));toast('Product deleted')};
 const uploadImage=e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>1500000){setFormError('Choose an image smaller than 1.5 MB.');return}const reader=new FileReader();reader.onload=()=>setEditing(current=>({...current,image:reader.result}));reader.readAsDataURL(file)};
 const updateOrder=(id,status)=>{setOrders(list=>list.map(o=>o.id===id?{...o,status}:o));toast('Order status updated')};
 const saveStore=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));setStore(old=>({...old,...d}));setSettings(false);toast('Store settings saved')};

 return <section className="seller-dashboard">
  <div className="seller-heading"><div><span className="seller-eyebrow">VOLTLINE SELLER CENTRAL · DEMO</span><h1>{store.name||`Welcome, ${user.name}`}</h1><p>Manage your catalog, orders, inventory, and store performance.</p></div><button className="btn" onClick={openNew}>Add a product</button></div>
  {tab==='Overview'&&<><div className="seller-stats"><Stat label="Total products" value={products.length}/><Stat label="Total orders" value={orders.length}/><Stat label="Revenue" value={money(revenue)}/><Stat label="Pending orders" value={pending}/></div>
   <div className="seller-overview-grid"><div className="box"><div className="seller-box-head"><h2>Recent orders</h2><button className="text-action" onClick={()=>selectSection('Orders')}>View all</button></div><OrderTable orders={orders.slice(0,4)} onStatus={updateOrder}/></div>
    <div className="box"><div className="seller-box-head"><h2>Inventory alerts</h2><button className="text-action" onClick={()=>selectSection('Inventory')}>Manage</button></div>{lowStock.length?lowStock.slice(0,5).map(p=><div className="seller-alert-row" key={p.id}><span>{p.name}</span><b>{p.stock===0?'Out of stock':`${p.stock} left`}</b></div>):<p className="seller-muted">All products are sufficiently stocked.</p>}</div></div>
  </>}

  {tab==='Products'&&<div className="box"><div className="seller-box-head"><h2>Product management</h2><button className="btn out" onClick={openNew}>Add a product</button></div>
   <ProductTable products={products} onEdit={p=>{setEditing({...p});setAdding(true);setFormError('')}} onDelete={removeProduct}/>
  </div>}

  {tab==='Orders'&&<div className="box"><div className="seller-box-head"><h2>Order management</h2><span className="seller-demo-note">Customer details and status are local demo data</span></div><OrderTable orders={orders} detailed onStatus={updateOrder}/></div>}

  {tab==='Inventory'&&<div className="box"><div className="seller-box-head"><h2>Inventory management</h2><span className="seller-demo-note">Low stock threshold: 5 units</span></div><div className="seller-table"><div className="seller-table-row seller-table-head inventory-row"><span>Product</span><span>Category</span><span>Stock</span><span>Alert</span><span>Action</span></div>{products.map(p=><div className="seller-table-row inventory-row" key={p.id}><b>{p.name}</b><span>{p.category}</span><span>{p.stock}</span><span className={p.stock<=5?'stock-low':'seller-status'}>{p.stock===0?'Out of stock':p.stock<=5?'Low stock':'In stock'}</span><button className="text-action" onClick={()=>{setEditing({...p});setAdding(true);selectSection('Products')}}>Update stock</button></div>)}</div></div>}

  {tab==='Analytics'&&<><div className="seller-stats"><Stat label="Gross revenue" value={money(revenue)}/><Stat label="Units ordered" value={activeOrders.reduce((s,o)=>s+(Number(o.quantity)||1),0)}/><Stat label="Average order value" value={activeOrders.length?money(revenue/activeOrders.length):money(0)}/><Stat label="Best seller" value={bestSellers[0]?.name||'—'} compact/></div>
   <div className="seller-analytics"><div className="box"><h2>Revenue by order</h2><div className="seller-bars" role="img" aria-label="Revenue chart for recent orders">{orders.slice(0,7).map((o,i)=>{const max=Math.max(1,...orders.map(x=>Number(x.total)||0));return <span key={o.id} style={{height:`${Math.max(6,(Number(o.total)||0)/max*100)}%`}} title={`${o.id}: ${money(o.total)}`}><small>{i+1}</small></span>})}</div><small className="seller-demo-note">Each bar represents a recent demo order.</small></div>
    <div className="box"><h2>Best-selling products</h2>{bestSellers.map(p=><div className="seller-alert-row" key={p.id}><span>{p.name}</span><b>{p.sold} sold</b></div>)}</div></div>
  </>}

  {tab==='Store Profile & Settings'&&<div className="box seller-settings"><div className="seller-box-head"><h2>Store profile &amp; settings</h2><button className="btn out" onClick={()=>setSettings(v=>!v)}>{settings?'Cancel':'Edit profile'}</button></div>
   {store.logo&&<img className="seller-store-logo" src={store.logo} alt="Store logo"/>}
   {settings?<form className="seller-settings-form" onSubmit={saveStore}><label>Store name<input name="name" required defaultValue={store.name}/></label><label>Contact email<input name="email" type="email" defaultValue={store.email}/></label><label>Phone<input name="phone" inputMode="tel" defaultValue={store.phone}/></label><label>Business address<input name="address" defaultValue={store.address}/></label><label className="seller-span">Store description<textarea name="description" rows="3" defaultValue={store.description}/></label><label className="seller-span">Store logo<input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>1000000){toast('Choose a logo smaller than 1 MB');return}const reader=new FileReader();reader.onload=()=>setStore(old=>({...old,logo:reader.result}));reader.readAsDataURL(file)}}/></label><button className="btn">Save settings</button></form>
   :<div className="seller-profile-view"><div><small>Store name</small><b>{store.name}</b></div><div><small>Contact email</small><b>{store.email||'Not set'}</b></div><div><small>Phone</small><b>{store.phone||'Not set'}</b></div><div><small>Business address</small><b>{store.address||'Not set'}</b></div><div className="seller-span"><small>Description</small><p>{store.description||'No description added.'}</p></div></div>}
  </div>}

  <p className="seller-demo-footnote">Seller data is stored in this browser only. This dashboard uses mock orders and does not connect to a backend.</p>

  {adding&&editing&&<div className="seller-modal-backdrop" onClick={e=>e.target===e.currentTarget&&(setAdding(false),setEditing(null))}><form className="seller-product-form" onSubmit={saveProduct}>
   <div className="seller-box-head"><h2>{editing.id?'Edit product':'Add product'}</h2><button type="button" className="bx" aria-label="Close" onClick={()=>{setAdding(false);setEditing(null)}}>×</button></div>
   {editing.image&&<img className="seller-product-preview" src={editing.image} alt="Product preview"/>}
   <label>Product name<input name="name" required defaultValue={editing.name}/></label>
   <label>Category<select name="category" defaultValue={editing.category}>{Object.keys(CATS).map(c=><option key={c}>{c}</option>)}</select></label>
   <div className="seller-form-row"><label>Price (₹)<input name="price" type="number" min="1" required defaultValue={editing.price}/></label><label>Stock quantity<input name="stock" type="number" min="0" required defaultValue={editing.stock}/></label></div>
   <label>Status<select name="status" defaultValue={editing.status}><option>Active</option><option>Draft</option><option>Hidden</option></select></label>
   <label>Product image<input type="file" accept="image/*" onChange={uploadImage}/></label>
   {formError&&<div className="err" role="alert">{formError}</div>}
   <div className="seller-form-actions"><button type="button" className="btn out" onClick={()=>{setAdding(false);setEditing(null)}}>Cancel</button><button className="btn">Save product</button></div>
  </form></div>}
 </section>;
}

function Stat({label,value,compact=false}){return <div className="box"><span>{label}</span><b className={compact?'compact':''}>{value}</b></div>}

function ProductTable({products,onEdit,onDelete}){
 return <div className="seller-table"><div className="seller-table-row seller-table-head product-row"><span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Status</span><span>Actions</span></div>{products.map(p=><div className="seller-table-row product-row" key={p.id}><b>{p.image?<img className="seller-thumb" src={p.image} alt=""/>:null}{p.name}</b><span>{p.category}</span><span>{money(p.price)}</span><span>{p.stock}</span><span className={p.status==='Active'?'seller-status':''}>{p.status}</span><span className="seller-actions"><button className="text-action" onClick={()=>onEdit(p)}>Edit</button><button className="text-action danger-text" onClick={()=>onDelete(p.id)}>Delete</button></span></div>)}</div>;
}

function OrderTable({orders,onStatus,detailed=false}){
 return <div className="seller-table"><div className={'seller-table-row seller-table-head order-row'+(detailed?' detailed':'')}><span>Order</span>{detailed&&<><span>Customer</span><span>Contact / address</span></>}<span>Product</span><span>Qty</span><span>Date</span><span>Status</span><span>Total</span></div>{orders.map(o=><div className={'seller-table-row order-row'+(detailed?' detailed':'')} key={o.id}><b>{o.id}</b>{detailed&&<><span>{o.customer}</span><span>{o.email}<br/>{o.phone}<br/>{o.address}</span></>}<span>{o.product}</span><span>{o.quantity}</span><span>{o.date}</span><select aria-label={`Status for order ${o.id}`} value={o.status} onChange={e=>onStatus(o.id,e.target.value)}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select><b>{money(o.total)}</b></div>)}</div>;
}
