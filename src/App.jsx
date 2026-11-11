import {useEffect} from 'react';
import {useRoute} from './router';
import {useStore} from './context/Store';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import Bag from './pages/Bag';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
const PAGES={home:Home,shop:Shop,product:Product,wishlist:Wishlist,bag:Bag,checkout:Checkout,orders:Orders,login:Auth,profile:Profile};
export default function App(){
 const route=useRoute(),{setModal,tm,pid}=useStore(),Page=PAGES[route];
 useEffect(()=>setModal(null),[route,setModal]); // close any popup when the page changes
 return <>
  <Header route={route}/>
  <main className="wrap"><div className="page" key={route=='product'?'product'+pid:route}><Page/></div></main>
  <Footer/><Modal/>
  <div className={'toast'+(tm.on?' on':'')} role="status">{tm.t}</div>
 </>;
}
