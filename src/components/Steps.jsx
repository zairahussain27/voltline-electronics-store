import {go} from '../router';
export default function Steps({n}){
 return <div className="steps">{['BAG','ADDRESS','PAYMENT'].flatMap((s,i)=>[i?<i key={'i'+i}>-------</i>:null,
  i==n?<b key={s}>{s}</b>:<button key={s} onClick={()=>go(i?'checkout':'bag')}>{s}</button>])}</div>;
}
