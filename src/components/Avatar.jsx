export default function Avatar({user,size=64}){
 const s={width:size,height:size,fontSize:size*.45};
 return user&&user.photo
  ?<img className="avatar" style={s} src={user.photo} alt={user.name}/>
  :<div className="avatar" style={{...s,background:user?(user.color||'var(--pk)'):'#c7c9d1'}}>{user?user.name[0].toUpperCase():'👤'}</div>;
}
