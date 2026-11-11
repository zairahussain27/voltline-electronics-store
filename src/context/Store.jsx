// Single source of truth: cart, wishlist, orders, user, shop filters, modal and toast.
import {createContext,useContext,useState,useCallback,useRef} from 'react';
import {VAR,COUPONS} from '../data/products';
import {byId,priceOf,oldOf} from '../lib/utils';
import useLocal from '../lib/useLocal';
import {go} from '../router';
const Ctx=createContext();
export const useStore=()=>useContext(Ctx);
const F0={cat:'',q:'',brands:[],pr:0,rate:0,disc:0,sort:'rec',lim:8};

export function StoreProvider({children}){
 const[cart,setCart]=useLocal('cart',{}),[wish,setWish]=useLocal('wish',[]),[orders,setOrders]=useLocal('orders',[]),[user,setUser]=useLocal('user',null),[accounts,setAccounts]=useLocal('accounts',[{name:'Demo User',email:'demo@voltline.com',password:'demo123'}]);
 const[f,setF]=useState(F0),[pid,setPid]=useState(1),[vi,setVi]=useState(0),[coupon,setCoupon]=useState(''),[modal,setModal]=useState(null),[tm,setTm]=useState({t:'',on:false});
 const timer=useRef();
 const toast=useCallback(t=>{setTm({t,on:true});clearTimeout(timer.current);timer.current=setTimeout(()=>setTm(x=>({...x,on:false})),1800)},[]);

 const items=Object.entries(cart).map(([k,q])=>{const[id,v]=k.split('|');const p=byId(id);return{k,p,vi:+v,q,price:priceOf(p,+v),old:oldOf(p,+v)}});
 const count=items.reduce((a,i)=>a+i.q,0);
 const sub=items.reduce((a,i)=>a+i.price*i.q,0),mrp=items.reduce((a,i)=>a+i.old*i.q,0);
 const cp=Math.round(Math.min(5000,sub*(COUPONS[coupon]||0)));
 const totals={mrp,dm:mrp-sub,cp,fee:items.length?20:0,total:Math.round(sub-cp)+(items.length?20:0)};

 const addCart=(id,v=0,n=1)=>{const k=id+'|'+v;setCart(c=>({...c,[k]:(c[k]||0)+n}));toast('Added to bag')};
 const setQty=(k,q)=>setCart(c=>{const n={...c};q>0?n[k]=q:delete n[k];return n});
 const toggleWish=id=>{toast(wish.includes(id)?'Removed from wishlist':'Added to wishlist');setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id])};
 const copyCode=v=>{try{navigator.clipboard.writeText(v).catch(()=>{})}catch{}setCoupon(v);toast('Code '+v+' copied and saved for your bag')};
 const setFilter=p=>setF(x=>({...x,lim:8,...p}));
 const updateUser=changes=>{if(!user)return;setUser(u=>u?{...u,...changes}:u);setAccounts(a=>a.map(x=>x.email==user.email?{...x,...changes}:x))};
 const changePassword=({currentPassword,newPassword})=>{const account=accounts.find(a=>a.email==user?.email);if(!account)return 'Account not found.';if(account.password!==currentPassword)return 'Current password is incorrect.';setAccounts(a=>a.map(x=>x.email==user.email?{...x,password:newPassword}:x));return ''};
 const deleteAccount=()=>{if(!user)return;const email=user.email;setAccounts(a=>a.filter(x=>x.email!==email));setOrders(a=>a.filter(o=>o.email!==email));setUser(null);toast('Account deleted')};
 const loadMore=()=>setF(x=>({...x,lim:x.lim+8}));
 const openCat=(cat,brand)=>{setF({...F0,cat,brands:brand?[brand]:[]});go('shop')};
 const openProduct=(id,v=0)=>{setPid(id);setVi(v);go('product')};
 const placeOrder=extra=>{
  const o={id:'VL'+Date.now().toString().slice(-8),total:totals.total,n:count,status:'Confirmed',date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),email:user?.email,...extra,
   items:items.map(i=>({pid:i.p.id,name:i.p.name,brand:i.p.brand,v:VAR[i.p.cat][i.vi],q:i.q,price:i.price}))};
  setOrders(a=>[o,...a]);setCart({});setCoupon('');return o;
 };
 const cancelOrder=id=>{setOrders(a=>a.map(o=>o.id==id?{...o,status:'Cancelled'}:o));toast('Order cancelled')};

 // Mock auth (no backend): accounts live in localStorage. Never store plain passwords like this in a real app.
 const signup=({name,email,password})=>{const e=email.trim().toLowerCase();if(accounts.some(a=>a.email==e))return 'An account with this email already exists. Please log in.';const account={name:name.trim(),email:e,password,createdAt:new Date().toISOString()};const{password:_p,...safe}=account;setAccounts(a=>[...a,account]);setUser(safe);toast('Account created. Welcome!');return ''};
 const login=({email,password})=>{const u=accounts.find(a=>a.email==email.trim().toLowerCase());if(!u)return 'No account found with this email. Please sign up.';if(u.password!==password)return 'Incorrect password. Please try again.';const{password:_p,...safe}=u;setUser(safe);toast('Welcome back, '+u.name.split(' ')[0]);return ''};
 return <Ctx.Provider value={{cart,items,count,totals,addCart,setQty,wish,toggleWish,orders,placeOrder,cancelOrder,user,setUser,updateUser,changePassword,deleteAccount,login,signup,f,setFilter,loadMore,openCat,pid,vi,setVi,openProduct,coupon,setCoupon,copyCode,modal,setModal,toast,tm}}>{children}</Ctx.Provider>;
}
