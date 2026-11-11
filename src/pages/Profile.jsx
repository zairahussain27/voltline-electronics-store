import {useRef,useState} from 'react';
import {useStore} from '../context/Store';
import {go} from '../router';
import {inr} from '../lib/utils';
import Avatar from '../components/Avatar';

const COLORS=['#ff3f6c','#7c3aed','#0ea5e9','#10b981','#f59e0b','#111827'];

export default function Profile(){
 const{user,logout,updateUser,orders,wish,toast,changePassword,deleteAccount,copyCode}=useStore(),[editing,setEditing]=useState(false),[adding,setAdding]=useState(false),[changingPassword,setChangingPassword]=useState(false),[passwordError,setPasswordError]=useState('');
 const fileRef=useRef();
 const addrs=user?.addresses||[],data=e=>Object.fromEntries(new FormData(e.target));
 const pick=e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas'),s=Math.min(im.width,im.height);c.width=c.height=160;
   c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,160,160);updateUser({photo:c.toDataURL('image/jpeg',.8)});toast('Photo updated')};im.src=r.result};
  r.readAsDataURL(f);e.target.value='';
 };
 const saveInfo=e=>{e.preventDefault();updateUser(data(e));setEditing(false);toast('Profile updated')};
 const saveAddr=e=>{e.preventDefault();updateUser({addresses:[...addrs,data(e)],defaultAddress:addrs.length?user.defaultAddress||0:0});setAdding(false);toast('Address added')};
 const setDefault=i=>{updateUser({defaultAddress:i});toast('Default address updated')};
 const savePassword=e=>{e.preventDefault();const d=data(e);if(d.newPassword!==d.confirmPassword){setPasswordError('New passwords do not match.');return}if(d.newPassword.length<6){setPasswordError('New password must be at least 6 characters.');return}const error=changePassword({currentPassword:d.currentPassword,newPassword:d.newPassword});if(error){setPasswordError(error);return}setChangingPassword(false);setPasswordError('');e.target.reset();toast('Password changed')};
 const totalSpent=orders.reduce((sum,o)=>sum+(o.status==='Cancelled'?0:Number(o.total)||0),0);
 const memberSince=user.createdAt?new Date(user.createdAt).toLocaleDateString('en-IN',{month:'short',year:'numeric'}):orders.length?new Date().toLocaleDateString('en-IN',{month:'short',year:'numeric'}):'—';
 if(!user)return <div className="empty" style={{padding:'100px 0'}}><h3>Please log in to see your account</h3><button className="btn" onClick={()=>go('login')}>Login</button></div>;
 return <>
  <div style={{display:'flex',gap:16,alignItems:'center',margin:'26px 0'}}><div style={{textAlign:'center'}}><Avatar user={user} size={64}/>
   <input type="file" accept="image/*" hidden ref={fileRef} onChange={pick}/><button className="btn out" style={{padding:'6px 12px',fontSize:12,marginTop:8}} onClick={()=>fileRef.current.click()}>Change photo</button></div>
   <div><h1 style={{margin:0,fontSize:24}}>Your Account</h1><div style={{color:'var(--mute)'}}>{user.name} · {user.email}</div>
    <div style={{marginTop:8}}>{COLORS.map(c=><button key={c} className="sw" style={{background:c}} aria-label={'Avatar colour '+c} title={'Avatar colour '+c} onClick={()=>updateUser({color:c,photo:''})}/>)}
     {user.photo&&<button className="chip" onClick={()=>updateUser({photo:''})}>Remove photo</button>}</div></div></div>
  <div className="account-stats">
   <div className="box"><span>Orders</span><strong>{orders.length}</strong></div>
   <div className="box"><span>Total spent</span><strong>{inr(totalSpent)}</strong></div>
   <div className="box"><span>Wishlist items</span><strong>{wish.length}</strong></div>
   <div className="box"><span>Member since</span><strong>{memberSince}</strong></div>
  </div>
  <div className="acct">
   <div className="box"><h4>Login &amp; security</h4>
    {editing?<form className="f" onSubmit={saveInfo}><input className="w" name="name" required defaultValue={user.name} placeholder="Full name"/><input className="w" name="phone" pattern="[0-9]{10}" defaultValue={user.phone||''} placeholder="Mobile (10 digits)"/><input className="w" value={user.email} disabled/><button className="btn">Save</button><button type="button" className="btn out" onClick={()=>setEditing(false)}>Cancel</button></form>
    :<><div className="row2"><span>Name</span><b>{user.name}</b></div><div className="row2"><span>Email</span><b>{user.email}</b></div><div className="row2"><span>Mobile</span><b>{user.phone||'Not added'}</b></div><button className="btn out" style={{marginTop:10}} onClick={()=>setEditing(true)}>Edit</button></>}</div>
   <div className="box"><h4>Your addresses</h4>
    {addrs.map((a,i)=><div className="row2" key={i}><span>{a.name}, {a.addr}, {a.city}, {a.state} {a.pin}{user.defaultAddress===i&&<b className="default-tag"> Default</b>}</span><div><button className="chip" onClick={()=>setDefault(i)}>{user.defaultAddress===i?'Default':'Set as default'}</button><button className="bx" aria-label="Remove address" onClick={()=>{const next=addrs.filter((_,j)=>j!==i);updateUser({addresses:next,defaultAddress:user.defaultAddress===i?0:user.defaultAddress>i?user.defaultAddress-1:user.defaultAddress})}}>×</button></div></div>)}
    {!addrs.length&&!adding&&<p style={{color:'var(--mute)'}}>No saved addresses yet.</p>}
    {adding?<form className="f" onSubmit={saveAddr}><input className="w" name="name" required placeholder="Full name"/><input className="w" name="addr" required placeholder="Address"/><input name="city" required placeholder="City"/><input name="state" required placeholder="State"/><input name="pin" required pattern="[0-9]{6}" placeholder="PIN code"/><button className="btn">Save address</button><button type="button" className="btn out" onClick={()=>setAdding(false)}>Cancel</button></form>
    :<button className="btn out" style={{marginTop:10}} onClick={()=>setAdding(true)}>+ Add address</button>}</div>
   <div className="box"><h4>Recent orders</h4>
    {orders.slice(0,3).map(o=><div className="row2" key={o.id}><span>{o.id} · {o.date} · {o.status}</span><b>{inr(o.total)}</b></div>)}
    {!orders.length&&<p style={{color:'var(--mute)'}}>No orders yet.</p>}
    <button className="btn out" style={{marginTop:10}} onClick={()=>go('orders')}>View all orders</button></div>
   <div className="box"><h4>Your coupons</h4>
    {[['VOLT10','10% off eligible orders'],['LAPTOP3K','5% off laptops, max ₹5,000']].map(([code,label])=><div className="row2" key={code}><span><b>{code}</b><br/><small>{label}</small></span><button className="btn out" onClick={()=>copyCode(code)}>Copy</button></div>)}
   </div>
   <div className="box"><h4>Change password</h4>{changingPassword?<form className="f" onSubmit={savePassword}>
    <input className="w" name="currentPassword" type="password" required autoComplete="current-password" placeholder="Current password"/>
    <input className="w" name="newPassword" type="password" required minLength={6} autoComplete="new-password" placeholder="New password (at least 6 characters)"/>
    <input className="w" name="confirmPassword" type="password" required minLength={6} autoComplete="new-password" placeholder="Confirm new password"/>
    {passwordError&&<div className="err" role="alert">{passwordError}</div>}
    <button className="btn">Update password</button><button type="button" className="btn out" onClick={()=>{setChangingPassword(false);setPasswordError('')}}>Cancel</button>
   </form>:<button className="btn out" onClick={()=>setChangingPassword(true)}>Change password</button>}</div>
   <div className="box"><h4>Quick links</h4><div className="row2"><span>Wishlist</span><b>{wish.length} items</b></div>
    <button className="btn out" style={{margin:'10px 10px 0 0'}} onClick={()=>go('wishlist')}>Open wishlist</button>
    <button className="btn" style={{marginTop:10}} onClick={logout}>Log out</button></div>
   <div className="box danger-zone"><h4>Delete account</h4><p style={{color:'var(--mute)'}}>Permanently remove this account and its saved profile details.</p><button className="btn danger" onClick={()=>{if(confirm('Delete your account permanently? This cannot be undone.')){deleteAccount();go('home')}}}>Delete account</button></div>
  </div>
 </>;
}
