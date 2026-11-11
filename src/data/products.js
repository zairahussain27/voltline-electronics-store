export const CATS={Mobiles:{icon:'📱',hue:215},Laptops:{icon:'💻',hue:265},Microphones:{icon:'🎙️',hue:340},Accessories:{icon:'🎧',hue:160}};
export const VAR={Mobiles:['128 GB','256 GB','512 GB'],Laptops:['512 GB','1 TB','2 TB'],Microphones:['Black','White','Silver'],Accessories:['Black','White','Blue']};
export const MUL={Mobiles:[1,1.1,1.25],Laptops:[1,1.12,1.3],Microphones:[1,1,1],Accessories:[1,1,1]};
export const P=[
[1,'Mobiles','Aurora X1 Pro 5G','Aurora',74999,84999,4.7,1,'Flagship 6.8" AMOLED phone with a 200MP camera.',['Display','6.8" AMOLED 120Hz'],['Chip','Octa-core 3nm'],['Battery','5000 mAh']],
[2,'Mobiles','Nova 12 5G','Nova',32999,37999,4.5,3,'Slim 5G phone built for all-day battery life.',['Display','6.5" OLED'],['Chip','Dimensity 8300'],['Battery','5200 mAh']],
[3,'Mobiles','Pixelio 9','Pixelio',58999,64999,4.6,0,'Clean software and a camera that sees in the dark.',['Display','6.3" LTPO'],['Chip','Tensor G4'],['Battery','4700 mAh']],
[4,'Mobiles','Edge Lite 5G','Nova',14999,17999,4.2,5,'Smooth 90Hz screen and fast charging under ₹15k.',['Display','6.6" LCD 90Hz'],['Chip','Snapdragon 6'],['Battery','5000 mAh']],
[5,'Mobiles','Aurora Flip','Aurora',89999,99999,4.4,0,'Pocketable foldable with a crease-free inner screen.',['Display','6.7" Foldable'],['Chip','Octa-core 4nm'],['Battery','4400 mAh']],
[6,'Laptops','AeroBook 14 Air','Aero',89990,99990,4.8,2,'Fanless 14" ultrabook at just 1.1 kg.',['Display','14" 2.8K OLED'],['CPU','Core Ultra 7'],['RAM','16GB']],
[7,'Laptops','Titan G16 Gaming','Titan',129990,149990,4.6,0,'RTX-powered 16" gaming laptop with a 240Hz panel.',['Display','16" QHD 240Hz'],['GPU','RTX 4070'],['RAM','32GB']],
[8,'Laptops','Studio Pro 16','Aero',159990,174990,4.7,0,'Colour-accurate creator laptop for editors.',['Display','16" Mini-LED'],['CPU','12-core'],['RAM','32GB']],
[9,'Laptops','Everyday 15','Lumen',45990,52990,4.3,4,'Reliable 15.6" laptop for study and office work.',['Display','15.6" FHD'],['CPU','Ryzen 5'],['RAM','16GB']],
[10,'Laptops','Flex 2-in-1 Touch','Lumen',67990,74990,4.4,0,'Touch and pen support in a 360° hinge.',['Display','13.3" Touch'],['CPU','Core i7'],['RAM','16GB']],
[11,'Microphones','Podcaster USB-C','Sonex',8999,10999,4.7,6,'Cardioid condenser mic with zero-latency monitoring.',['Type','Condenser USB-C'],['Pattern','Cardioid'],['Rate','24-bit / 96kHz']],
[12,'Microphones','Studio XLR Pro','Sonex',18999,22999,4.8,0,'Broadcast-grade dynamic mic for voice and streaming.',['Type','Dynamic XLR'],['Pattern','Supercardioid'],['Rate','Analog']],
[13,'Microphones','Clip Wireless Duo','Voxa',12999,14999,4.5,0,'Two lavalier transmitters for interviews on the move.',['Type','Wireless lav'],['Range','250 m'],['Battery','8 hr']],
[14,'Microphones','Shotgun Vlog Mic','Voxa',5499,6999,4.3,8,'On-camera shotgun with wind protection.',['Type','Shotgun'],['Pattern','Hyper-cardioid'],['Power','Plug-in']],
[15,'Microphones','Boom Arm Kit','Sonex',3299,3999,4.4,0,'Low-profile boom arm with shock mount and pop filter.',['Type','Arm kit'],['Reach','82 cm'],['Fit','5/8" thread']],
[16,'Accessories','ANC Headphones Max','Sonex',24999,29999,4.8,7,'Over-ear noise cancelling with 40-hour battery.',['Type','Over-ear ANC'],['Battery','40 hr'],['Link','Bluetooth 5.4']],
[17,'Accessories','Buds Air 3','Nova',4999,6999,4.3,0,'Compact earbuds with adaptive noise control.',['Type','True wireless'],['Battery','30 hr case'],['Link','Bluetooth 5.3']],
[18,'Accessories','GaN Charger 100W','Lumen',2999,3999,4.6,9,'Charge a laptop and phone together from one plug.',['Output','100W GaN'],['Ports','2×C + 1×A'],['Cable','Included']],
[19,'Accessories','Mech Keyboard 75','Titan',6499,7999,4.5,0,'Hot-swappable 75% keyboard with gasket mount.',['Layout','75%'],['Switch','Linear'],['Link','BT / 2.4G / USB']],
[20,'Accessories','Ergo Wireless Mouse','Lumen',2499,2999,4.4,10,'Sculpted mouse with silent clicks and 90-day battery.',['Sensor','8000 DPI'],['Link','BT / 2.4G'],['Battery','90 days']]
].map(a=>({id:a[0],cat:a[1],name:a[2],brand:a[3],price:a[4],old:a[5],rating:a[6],rank:a[7],desc:a[8],specs:a.slice(9),rc:((a[0]*397)%90+10)/10}));
export const SLIDES=[{t:'Aurora X1 Pro',d:'From ₹74,999 · Up to 12% off',id:1,bg:'#ff3f6c,#ff905a'},{t:'Laptops sale',d:'Up to 40% off · No-cost EMI',cat:'Laptops',bg:'#5b3fff,#00b0ff',a:6},{t:'Creator mics',d:'Studio sound · Extra 10% off',cat:'Microphones',bg:'#03a685,#00c6a2',a:11}];
export const COUPONS={VOLT10:.1,LAPTOP3K:.05};

