import {useRef,useState,useEffect} from 'react';
// Fades and slides its children in the first time they scroll into view.
export default function Reveal({children,delay=0}){
 const r=useRef(),[on,setOn]=useState(false);
 useEffect(()=>{
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches)return setOn(true);
  const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);o.disconnect()}},{threshold:.1});
  o.observe(r.current);return()=>o.disconnect();
 },[]);
 return <div ref={r} className={'rv'+(on?' in':'')} style={{transitionDelay:delay+'ms'}}>{children}</div>;
}
