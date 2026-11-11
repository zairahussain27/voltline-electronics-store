import {useState} from 'react';
import {useStore} from '../context/Store';
import {go} from '../router';
export default function Auth(){
 const{user,logout,login,signup,items}=useStore(),[mode,setMode]=useState('login'),[err,setErr]=useState(''),[show,setShow]=useState(false);
 const up=mode=='signup',next=()=>go(items.length?'bag':'home');
 if(user)return <div className="ok"><div style={{fontSize:56}}>👋</div><h1>Hi, {user.name}</h1><p style={{color:'var(--mute)'}}>You are logged in as {user.email}.</p>
  <button className="btn" onClick={()=>go(user.role==='seller'?'seller-dashboard':'home')}>{user.role==='seller'?'Open Seller Dashboard':'Continue shopping'}</button> <button className="btn out" onClick={logout}>Log out</button></div>;
 const submit=e=>{
  e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
  if(up&&d.password!==d.confirm)return setErr('Passwords do not match.');
  const r=up?signup(d):login(d);if(r)setErr(r);else if(up&&d.role==='seller'){try{sessionStorage.removeItem('voltline-seller-tab')}catch{};dispatchEvent(new CustomEvent('seller-tab',{detail:'Overview'}));go('seller-dashboard')}else next();
 };
 const swap=m=>{setMode(m);setErr('')};
 return <div className="auth">
  <div className="side"><h2>{up?'Join Voltline':'Welcome back'}</h2><p>Save your wishlist, track orders and check out faster. Shop the latest mobiles, laptops, microphones and accessories.</p></div>
  <div className="form2">
   <div className="tabs"><button className={up?'':'on'} onClick={()=>swap('login')}>Login</button><button className={up?'on':''} onClick={()=>swap('signup')}>Sign up</button></div>
   <form onSubmit={submit} key={mode}>
    {up&&<><label htmlFor="n">Full name</label><input id="n" name="name" required minLength={2} autoComplete="name" placeholder="e.g. Zaira Hussain"/></>}
    {up&&<><label htmlFor="role">I want to join as</label><select id="role" name="role" defaultValue="customer" className="role-select"><option value="customer">Customer — shop Voltline</option><option value="seller">Seller — manage products and orders</option></select></>}
    <label htmlFor="e">Email</label><input id="e" name="email" type="email" required autoComplete="email" placeholder="you@example.com"/>
    <label htmlFor="p">Password</label><div className="pw"><input id="p" name="password" type={show?'text':'password'} required minLength={6} autoComplete={up?'new-password':'current-password'} placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)}>{show?'Hide':'Show'}</button></div>
    {up&&<><label htmlFor="c">Confirm password</label><input id="c" name="confirm" type={show?'text':'password'} required minLength={6} autoComplete="new-password" placeholder="Re-enter password"/></>}
    {err&&<div className="err" role="alert">{err}</div>}
    <button className="btn full" style={{marginTop:18}}>{up?'Create account':'Login'}</button>
   </form>
   <p className="alt">{up?'Already have an account? ':'New to Voltline? '}<a href="#login" onClick={()=>swap(up?'login':'signup')}>{up?'Login':'Create an account'}</a></p>
   {!up&&<p className="hint">Demo account: <b>demo@voltline.com</b> / <b>demo123</b></p>}
  </div></div>;
}
