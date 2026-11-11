// Tiny hash router: the route is the part after "#". No dependency needed.
import {useEffect,useState} from 'react';
const ROUTES=['home','shop','product','wishlist','bag','checkout','orders','login','profile'];
const read=()=>ROUTES.includes(location.hash.slice(1))?location.hash.slice(1):'home';
export const go=r=>{if(location.hash==='#'+r)scrollTo(0,0);else location.hash=r};
export function useRoute(){
 const[r,setR]=useState(read);
 useEffect(()=>{const f=()=>{setR(read());scrollTo(0,0)};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);
 return r;
}
