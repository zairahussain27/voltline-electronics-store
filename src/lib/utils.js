import {P,MUL} from '../data/products';
export const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
export const byId=id=>P.find(p=>p.id==id);
export const disc=p=>Math.round((1-p.price/p.old)*100);
export const priceOf=(p,vi)=>Math.round(p.price*MUL[p.cat][vi]/10)*10;
export const oldOf=(p,vi)=>Math.round(p.old*MUL[p.cat][vi]/10)*10;
