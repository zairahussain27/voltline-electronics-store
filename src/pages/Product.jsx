import {useState} from 'react';
import {VAR} from '../data/products';
import {P} from '../data/products';
import {useStore} from '../context/Store';
import {byId,inr,priceOf,oldOf} from '../lib/utils';
import Art from '../components/Art';
import Row from '../components/Row';
import BrandLogo from '../components/BrandLogo';
import REVIEWS from '../data/reviews';
export default function Product(){
 const{pid,vi,setVi,addCart,wish,toggleWish,openCat}=useStore(),[pin,setPin]=useState(''),[dl,setDl]=useState(null),[submitted,setSubmitted]=useState({}),[showReviewForm,setShowReviewForm]=useState(false),[reviewRating,setReviewRating]=useState(0),[hoverRating,setHoverRating]=useState(0),[reviewError,setReviewError]=useState('');
 const p=byId(pid),pr=priceOf(p,vi),od=oldOf(p,vi),on=wish.includes(p.id);
 const reviews=[...(REVIEWS[p.id]||[]),...(submitted[p.id]||[])];
 const reviewCount=reviews.length,average=reviewCount?reviews.reduce((sum,r)=>sum+r.rating,0)/reviewCount:0;
 const distribution=[5,4,3,2,1].map(stars=>({stars,count:reviews.filter(r=>r.rating===stars).length}));
 const check=()=>setDl(/^\d{6}$/.test(pin)?new Date(Date.now()+3*864e5).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'}):'bad');
 const submitReview=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(!reviewRating){setReviewError('Choose a star rating to continue.');return}const entry={name:d.name.trim(),rating:reviewRating,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),text:d.text.trim()};setSubmitted(all=>({...all,[p.id]:[entry,...(all[p.id]||[])]}));setReviewRating(0);setReviewError('');setShowReviewForm(false);e.target.reset()};
 return <>
  <div className="crumb"><a href="#home">Home</a> / <a href="#shop" onClick={()=>openCat(p.cat)}>{p.cat}</a> / <b>{p.name}</b></div>
  <div className="pd"><div className="gal">{[0,1,2,3].map(k=><Art key={k} p={p} big k={k}/>)}</div>
   <div><h1 className="bh"><BrandLogo name={p.brand} mark h={34}/>{p.brand}</h1><h2>{p.name}</h2><span className="rb">{p.rating} <i>★</i> <s>| {p.rc.toFixed(1)}k Ratings</s></span>
    <div className="pp">{inr(pr)}<s>MRP {inr(od)}</s><em>({Math.round((1-pr/od)*100)}% OFF)</em></div><div className="tx">inclusive of all taxes</div>
    <h4>{p.cat=='Mobiles'||p.cat=='Laptops'?'Select storage':'Select colour'}</h4>
    <div className="vs">{VAR[p.cat].map((v,i)=><button key={v} className={i==vi?'on':''} onClick={()=>setVi(i)}>{v}</button>)}</div>
    <div className="acts"><button className="btn" onClick={()=>addCart(p.id,vi)}>👜 Add to bag</button><button className="btn out" onClick={()=>toggleWish(p.id)}>{on?'♥ Wishlisted':'♡ Wishlist'}</button></div>
    <h4>Delivery options</h4><div className="pin"><input value={pin} onChange={e=>setPin(e.target.value)} inputMode="numeric" maxLength={6} placeholder="Enter PIN code"/><button onClick={check}>Check</button></div>
    <p style={{color:'var(--mute)',margin:'8px 0 0'}}>{dl==null?'Enter your PIN code to check delivery and cash on delivery.':dl=='bad'?'Please enter a valid 6-digit PIN code':<>Delivery by <b style={{color:'var(--gr)'}}>{dl}</b> · Cash on delivery available</>}</p>
    <h4>Best offers</h4><ul className="ol"><li>Extra 10% off with code <b>VOLT10</b></li><li>No-cost EMI on 3 &amp; 6 month plans</li><li>7-day easy returns · 1-year brand warranty</li></ul>
    <h4>Product details</h4><p style={{color:'#3e4152'}}>{p.desc}</p><div className="sp">{p.specs.map(s=><div key={s[0]}><span>{s[0]}</span><b>{s[1]}</b></div>)}</div>
   </div></div>
  <section className="reviews">
   <div className="reviews-title"><div><h2>Customer Reviews &amp; Ratings</h2><p>Reviews shown here are sample/demo content for illustration.</p></div><button className="btn out" onClick={()=>setShowReviewForm(v=>!v)}>{showReviewForm?'Close form':'Write a Review'}</button></div>
   <div className="review-summary">
    <div className="review-average"><strong>{average.toFixed(1)}</strong><span className="review-stars" aria-label={`${average.toFixed(1)} out of 5 stars`}>{'★'.repeat(Math.round(average))}{'☆'.repeat(5-Math.round(average))}</span><small>{reviewCount} demo reviews</small></div>
    <div className="review-breakdown">{distribution.map(({stars,count})=><div className="rating-row" key={stars}><span>{stars} ★</span><span className="rating-track"><i style={{width:`${reviewCount?count/reviewCount*100:0}%`}}/></span><small>{count}</small></div>)}</div>
   </div>
   {showReviewForm&&<form className="review-form" onSubmit={submitReview}>
    <h3>Write a Review</h3><label htmlFor="review-name">Your name</label><input id="review-name" name="name" required maxLength={60} placeholder="Name"/>
    <span className="review-label">Your rating</span><div className="rating-picker" role="radiogroup" aria-label="Select a star rating" onMouseLeave={()=>setHoverRating(0)}>{[1,2,3,4,5].map(star=><button type="button" role="radio" aria-checked={reviewRating===star} aria-label={`${star} star${star>1?'s':''}`} key={star} onMouseEnter={()=>setHoverRating(star)} onFocus={()=>setHoverRating(star)} onBlur={()=>setHoverRating(0)} onClick={()=>{setReviewRating(star);setReviewError('')}}>{(hoverRating||reviewRating)>=star?'★':'☆'}</button>)}</div>
    <label htmlFor="review-text">Your review</label><textarea id="review-text" name="text" required minLength={8} maxLength={1000} rows="4" placeholder="What did you think of this product?"/>
    {reviewError&&<div className="err" role="alert">{reviewError}</div>}<button className="btn">Submit review</button>
   </form>}
   <div className="review-list">{reviews.map((review,i)=><article className="review-card" key={`${review.name}-${i}`}>
    <div className="review-head"><b>{review.name}</b><span className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span></div>
    <time>{review.date}</time><p>{review.text}</p>
   </article>)}</div>
  </section>
  <Row title="Similar products" list={P.filter(x=>x.cat==p.cat&&x.id!=p.id)}/></>;
}
