// useState that persists to localStorage (wrapped in try/catch: storage can be unavailable)
import {useState,useEffect} from 'react';
export default function useLocal(key,init){
 const[v,setV]=useState(()=>{try{const s=localStorage.getItem('vl:'+key);return s?JSON.parse(s):init}catch{return init}});
 useEffect(()=>{try{localStorage.setItem('vl:'+key,JSON.stringify(v))}catch{}},[key,v]);
 return[v,setV];
}
