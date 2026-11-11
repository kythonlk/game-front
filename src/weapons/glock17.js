// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({Bf,He,Kc,N_,Qe,Qt,Ve,Vn,Vv,W,Wi,Yo,Ys,Zn,bi,i0,kn,rn,sa,wt,xs,zc}){
function SALT_GLOCK17(i){
 const root=new wt;root.name='viewmodel-glock17';i.camera.add(root);
 const make=(name,color,roughness,metalness,finish)=>{const m=new Qt({color:new Ve(...color),roughness,metalness,vertexColors:true});m.name=name;Bf(m,finish);return m;};
 const polymer=make('g17-polymer',[.026,.029,.028],.82,.02,2),gripMat=make('g17-stipple',[.016,.019,.018],.94,0,2),steel=make('g17-slide',[.027,.032,.037],.40,.75,0),machined=make('g17-machined',[.10,.12,.13],.32,.85,1),dark=make('g17-recess',[.006,.008,.009],.7,.25,1),sight=make('g17-sight',[.78,.81,.73],.6,.05,2),tritium=make('g17-tritium',[.38,.92,.56],.25,.05,2),brass=i.mats.get('brass',{triplanar:true,vertexColors:true,scale:4});
 const frame=new wt,slide=new wt,barrel=new wt,magazine=new wt,grip=new wt;root.add(frame,barrel,slide,magazine);frame.add(grip);
 grip.position.set(0,-.081,.028);grip.rotation.x=-.22;
 const magHome=new W(0,-.081,.028);magazine.position.copy(magHome);magazine.rotation.x=-.22;
 function part(geo,x,y,z,mat=steel,parent=frame,rotation){const mesh=new Qe(geo,mat);mesh.position.set(x,y,z);if(rotation)mesh.rotation.set(...rotation);const colors=new Float32Array(geo.attributes.position.count*3),normals=geo.attributes.normal;for(let n=0;n<normals.count;n++){const shade=.86+.14*Math.max(0,normals.getY(n));colors.set([shade,shade,shade],n*3);}geo.setAttribute('color',new He(colors,3));parent.add(mesh);return mesh;}
 const box=(w,h,d,x,y,z,mat=steel,parent=frame,rotation)=>part(Wi(w,h,d,Math.min(.002,w*.16,h*.16,d*.16)),x,y,z,mat,parent,rotation);
 const tube=(r,length,x,y,z,mat=machined,parent=barrel)=>part(new Ys(r,r,length,20),x,y,z,mat,parent,[Math.PI/2,0,0]);
 // Sleek real-scale Glock 17 slide (~28.5mm wide) with chamfered top corners and an open ejection-port gap.
 box(.0285,.029,.104,0,.028,-.116,steel,slide);
 box(.0285,.029,.050,0,.028,.020,steel,slide);
 box(.0045,.029,.037,-.012,.028,-.023,steel,slide);
 box(.0285,.007,.040,0,.016,-.023,dark,slide);
 box(.003,.010,.040,.0128,.020,-.023,steel,slide);
 // Split the upper slide deck around the open port with fine anti-glare serrations and angled top shoulders.
 box(.0235,.0035,.104,0,.0435,-.116,steel,slide);box(.0235,.0035,.050,0,.0435,.020,steel,slide);
 for(let n=0;n<14;n++)box(.012,.0009,.0025,0,.0454,-.155+n*.0064,dark,slide);
 box(.0245,.025,.004,0,.028,.045,dark,slide);
 box(.013,.011,.002,0,.028,.048,polymer,slide);
 for(let n=0;n<4;n++)box(.011,.001,.0012,0,.024+n*.0025,.049,machined,slide);
 // External extractor claw and loaded-chamber indicator step on the right side of the slide.
 box(.0024,.0065,.025,.0138,.025,.008,dark,slide);box(.0028,.005,.007,.0141,.025,-.002,machined,slide);
 for(const side of [-1,1]){
  box(.003,.0038,.102,side*.0128,.0415,-.116,steel,slide,[0,0,side*.65]);
  box(.003,.0038,.048,side*.0128,.0415,.020,steel,slide,[0,0,side*.65]);
  // Rear cocking serrations and a short set at the nose catch light separately.
  for(let n=0;n<8;n++){box(.0018,.023,.0015,side*.0146,.028,.011+n*.004,dark,slide,[.10,0,0]);box(.0012,.022,.001,side*.0148,.028,.012+n*.004,machined,slide,[.10,0,0]);}
  for(let n=0;n<5;n++){box(.0016,.018,.0014,side*.0145,.026,-.150+n*.004,dark,slide,[.10,0,0]);box(.0011,.017,.0009,side*.0147,.026,-.149+n*.004,machined,slide,[.10,0,0]);}
  box(.0015,.003,.018,side*.0145,.018,-.020,machined,slide);
  box(.0014,.0018,.160,side*.0145,.0135,-.060,machined);
 }
 // Barrel hood with caliber stamp step, crowned muzzle, recessed bore and captive dual recoil spring assembly.
 tube(.0072,.172,0,.027,-.086,machined);box(.0195,.019,.033,0,.028,-.024,machined,barrel);
 box(.014,.0016,.022,0,.038,-.023,steel,barrel);box(.003,.0016,.007,.007,.038,-.012,dark,barrel);
 tube(.0076,.005,0,.027,-.175,machined);tube(.006,.0025,0,.027,-.177,steel);tube(.0048,.0015,0,.027,-.1785,dark);
 tube(.0040,.122,0,.004,-.105,dark);tube(.0044,.0035,0,.004,-.168,machined);
 for(let n=0;n<13;n++)part(new Ys(.0046,.0046,.0018,12),0,.004,-.054-n*.0078,machined,frame,[Math.PI/2,.18,0]);
 // Slim polymer dust cover, integrated Glock accessory rail slots and angled grip.
 box(.0295,.019,.174,0,.002,-.059,polymer);box(.0255,.009,.068,0,-.011,-.120,polymer);
 for(const side of [-1,1])box(.0016,.003,.066,side*.0132,-.011,-.120,dark);
 for(let n=0;n<3;n++)box(.0265,.0025,.004,0,-.016,-.130+n*.012,dark);
 box(.0285,.016,.046,0,-.014,.016,polymer);
 // Extended beaver-tail backstrap and subtle magwell lip.
 box(.027,.007,.024,0,.006,.040,polymer,frame,[.28,0,0]);
 box(.0265,.110,.038,0,0,0,polymer,grip);box(.021,.098,.041,0,-.002,.001,gripMat,grip);
 box(.030,.009,.042,0,-.052,.002,polymer,grip);
 for(const side of [-1,1]){
  box(.0016,.084,.029,side*.0136,-.002,.003,gripMat,grip);
  // Thumb rest scallop and recessed border frame around the stippled panel.
  box(.002,.015,.017,side*.0138,.034,-.007,dark,grip);
  for(let row=0;row<9;row++)for(let col=0;col<5;col++)box(.001,.0011,.0012,side*.0145,-.038+row*.0085,-.008+col*.0052,polymer,grip);
  box(.0016,.018,.019,side*.0142,-.035,.004,polymer,grip);
  box(.0045,.005,.013,side*.016,-.012,-.006,dark);
  for(const z of [-.001,.022])part(new Ys(.0023,.0023,.002,12),side*.0155,-.017,z,machined,frame,[0,0,Math.PI/2]);
  part(new Ys(.0018,.0018,.002,10),side*.0155,-.007,-.004,steel,frame,[0,0,Math.PI/2]);
 }
 // Finger grooves along the front strap and checkering ridges along the backstrap.
 for(let n=0;n<3;n++)box(.027,.0055,.0045,0,-.011-n*.024,-.019,polymer,grip);
 for(let n=0;n<11;n++){box(.022,.001,.0015,0,-.045+n*.0078,-.0205,polymer,grip);box(.020,.001,.0015,0,-.045+n*.0078,.0215,polymer,grip);}
 // Textured magazine release button and stamped slide-stop lever with thumb shelf.
 box(.0045,.0085,.012,-.0165,-.032,.009,dark);for(let n=0;n<4;n++)box(.0008,.0075,.0012,-.019,-.032,.0055+n*.0022,machined);
 box(.003,.005,.024,-.0165,-.004,.019,machined);box(.0045,.0032,.008,-.0175,-.002,.028,machined);
 // Open trigger guard with undercut and serrated face, plus Glock Safe-Action trigger with safety blade.
 for(const side of [-1,1]){box(.004,.0075,.050,side*.0125,-.066,-.033,polymer);box(.004,.035,.0075,side*.0125,-.048,-.056,polymer,frame,[-.16,0,0]);}
 box(.026,.0075,.007,0,-.066,-.056,polymer);box(.026,.011,.008,0,-.030,-.059,polymer);
 for(let n=0;n<5;n++)box(.025,.0016,.0016,0,-.038-n*.0052,-.0605,dark);
 box(.0055,.027,.007,0,-.038,-.023,dark,frame,[-.23,0,0]);box(.002,.019,.0035,0,-.041,-.017,machined,frame,[-.28,0,0]);
 // Magazine with feed lips, witness holes, visible brass cartridges and a slim baseplate.
 box(.021,.098,.026,0,0,0,dark,magazine);box(.029,.009,.038,0,-.053,.002,polymer,magazine);box(.024,.003,.032,0,-.058,.002,machined,magazine);
 for(const side of [-1,1]){box(.0016,.086,.0018,side*.0108,-.002,-.008,machined,magazine);box(.0016,.010,.021,side*.0095,.051,0,machined,magazine);for(let n=0;n<4;n++)box(.0015,.0025,.028,side*.0148,-.051,.002,dark,magazine);}
 for(let n=0;n<7;n++){part(new Ys(.0015,.0015,.001,8),.011,.032-n*.010,.003,machined,magazine,[0,0,Math.PI/2]);part(new Ys(.0012,.0012,.0012,8),.0112,.032-n*.010,.003,brass,magazine,[0,0,Math.PI/2]);}
 tube(.0042,.019,0,.050,0,brass,magazine);tube(.0040,.017,.0025,.043,.001,brass,magazine);
 // Tritium night sights with protective steel hoods and high-contrast rings remain crisp in ADS.
 box(.020,.0075,.012,0,.048,.032,dark,slide);box(.005,.0075,.012,-.0076,.0535,.032,dark,slide);box(.005,.0075,.012,.0076,.0535,.032,dark,slide);
 for(const side of [-1,1]){box(.0034,.0034,.001,side*.0076,.0545,.0382,sight,slide);box(.0020,.0020,.0013,side*.0076,.0545,.0386,tritium,slide);}
 box(.005,.009,.011,0,.0495,-.148,dark,slide);box(.0034,.0034,.001,0,.053,-.142,sight,slide);box(.0022,.0022,.0013,0,.053,-.1416,tritium,slide);
 // Batch by material inside each independently animated assembly.
 for(const parent of [frame,grip,slide,barrel,magazine]){const batches=new Map;for(const mesh of [...parent.children]){if(!mesh.isMesh)continue;mesh.updateMatrix();const geo=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();geo.applyMatrix4(mesh.matrix);if(!batches.has(mesh.material))batches.set(mesh.material,[]);batches.get(mesh.material).push(geo);parent.remove(mesh);mesh.geometry.dispose();}for(const [mat,geos]of batches){parent.add(new Qe(sa(geos,false),mat));geos.forEach(g=>g.dispose());}}
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#969e9d';ctx.font='700 72px monospace';ctx.fillText('GLOCK 17',28,90);ctx.font='30px monospace';ctx.fillText('9x19  /  PORT AUTHORITY',30,145);ctx.font='22px monospace';ctx.fillText('B4-017   SERVICE PISTOL',30,193);
  const marking=new Qt({map:new xs(canvas),transparent:true,roughness:.65,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});marking.map.colorSpace=Vn;
  for(const side of [-1,1]){const label=new Qe(new rn(.076,.019),marking);label.position.set(side*.0148,.028,-.110);label.rotation.y=side*Math.PI/2;slide.add(label);}
 // Match the PAC-9 glove material and keep both hands attached to the pistol grip.
 const glove=i.mats.get('glove_fabric',{triplanar:true,vertexColors:true,scale:3});
 const local=(q,v,mirror=false)=>{const d=new W(...v).normalize().applyQuaternion(q.clone().invert());if(mirror)d.x*=-1;return d.toArray();};
 const rq=i0(-.22,0,0).multiply(i0(0,0,-Math.PI/2));
 const rightModel=Vv({mirror:false,fingers:[null,[.62,1.72,.8,0],[.68,1.7,.8,-.03],[.74,1.66,.8,-.09]],indexPoses:[[.1,.16,.1,.05],[.46,1.15,.5,0]],thumb:[local(rq,[-.85,.05,-.5]),local(rq,[-.6,-.05,-.8]),local(rq,[-.05,-.2,-.97])],forearm:local(rq,[.24,-.4,.88]),sleeve:.34});
 const right=new wt;right.quaternion.copy(rq);right.position.copy(new W(0,-.075,.029).sub(new W(.006,-.031,-.085).applyQuaternion(rq)));right.add(new Qe(rightModel.fabric,glove));const finger=new Qe(rightModel.index[0].clone(),glove);right.add(finger);root.add(right);
 const lq=i0(0,0,Math.PI/2).multiply(i0(.1,0,0));
 const leftModel=Vv({mirror:true,fingers:[[1.27,1.42,.75,.02],[1.3,1.45,.75,0],[1.3,1.45,.75,-.02],[1.33,1.45,.75,-.05]],thumb:[local(lq,[0,.25,-.97],true),local(lq,[.05,.1,-.99],true),local(lq,[0,0,-1],true)],forearm:local(lq,[-.52,-.36,.78],true),sleeve:.34});
 const left=new wt,leftHome=new W(-.023,-.077,-.001).sub(new W(0,-.015,-.055).applyQuaternion(lq));left.quaternion.copy(lq);left.position.copy(leftHome);left.add(new Qe(leftModel.fabric,glove));root.add(left);
 const flash=N_();flash.position.set(0,.027,-.180);flash.visible=false;root.add(flash);
 root.traverse(o=>{o.layers.set(zc);if(o.isMesh){o.frustumCulled=false;o.castShadow=false;o.receiveShadow=true;}});
 const info={meshes:0,tris:0};root.traverse(o=>{if(o.isMesh){info.meshes++;info.tris+=Kc(o.geometry);}});
 let visible=false,time=0,cool=0,reload=0,reloadPhases=0,previous=false,recoil=0,shotAge=1,flashTime=0,swayX=0,swayY=0;
 const origin=new W,dir=new W,muzzle=new W,end=new W,velocity=new W;
 const w={name:'GLOCK 17 · PISTOL',ammo:17,magSize:17,reserve:68,damage:28,rpm:333,ads:0,spread:.016,state:'idle',root,info,
  debug:{get slideOffset(){return slide.position.z;},get magazineDrop(){return magHome.y-magazine.position.y;}},
  setVisible(value){visible=!!value;root.visible=visible;if(!visible){w.ads=0;flash.visible=false;previous=false;}},
  reset(){w.ammo=17;w.reserve=68;w.ads=0;w.spread=.016;w.state='idle';cool=reload=recoil=flashTime=0;reloadPhases=0;previous=false;shotAge=1;slide.position.z=0;barrel.position.z=0;barrel.rotation.x=0;magazine.position.copy(magHome);magazine.visible=true;left.position.copy(leftHome);left.quaternion.copy(lq);flash.visible=false;},
  addAmmo(n){w.reserve+=n;},snap(){w.ads=i.input.ads?1:0;},
  muzzleWorld(out=new W){return viewPoint(0,.027,-.180,out);},
  reloadNow(){if(reload||cool>0||w.ammo>=17||w.reserve<=0)return false;reload=1.8;reloadPhases=0;w.ads=0;w.state='reloading';i.events.emit('weapon:reload',{phase:'start',weapon:'pistol'});return true;},
  update(dt){
   const p=i.player,input=i.input;if(!visible||!p?.alive){flash.visible=false;return;}time+=dt;shotAge+=dt;
   const oldCool=cool;cool=Math.max(0,cool-dt);recoil=Math.max(0,recoil-dt*7);flashTime=Math.max(0,flashTime-dt);
   const click=input.fire&&!previous;previous=!!input.fire;let reloadStep=dt;
   if(input.pressed('reload'))w.reloadNow();
   if(w.ammo===0&&w.reserve>0&&!reload&&cool===0){w.reloadNow();reloadStep=Math.max(0,dt-oldCool);}
   let reloadAge=0;
   if(reload>0){
    reload=Math.max(0,reload-reloadStep);reloadAge=1.8-reload;
    for(const [phase,at,bit]of [['magout',.22,1],['magin',1.25,2],['bolt',1.58,4]])if(reloadAge>=at&&!(reloadPhases&bit)){reloadPhases|=bit;i.events.emit('weapon:reload',{phase,weapon:'pistol'});}
    if(reload===0){const amount=Math.min(17-w.ammo,w.reserve);w.ammo+=amount;w.reserve-=amount;i.events.emit('weapon:reload',{phase:'done',weapon:'pistol'});}
   }
   const aim=input.ads&&!reload&&!p.sprinting;w.ads=Zn(w.ads+(aim?dt:-dt)/.18,0,1);
   w.spread=bi(.016,.003,w.ads)+(p.speed||0)*bi(.002,.0008,w.ads)+(p.onGround===false?.018:0);
   if(click&&!reload&&cool===0&&!p.sprinting){if(w.ammo===0)i.events.emit('weapon:dry',{weapon:'pistol'});else fire();}
   w.state=reload?'reloading':cool>0?'cycling':'idle';
   const cycle=shotAge<.11?Math.sin(Math.PI*Zn(shotAge/.11,0,1))*.035:0;
   const locked=w.ammo===0&&(!reload||reloadAge<1.58);
   slide.position.z=locked?Math.max(cycle,.032*Zn(shotAge/.05,0,1)):cycle;
   barrel.position.z=slide.position.z*.15;barrel.rotation.x=slide.position.z*1.3;
   const magDrop=reload?(reloadAge<.55?Yo((reloadAge-.2)/.35):1-Yo((reloadAge-1.02)/.38))*.22:0;
   magazine.position.copy(magHome);magazine.position.y-=magDrop;magazine.position.z+=magDrop*.2;magazine.visible=!(reload&&reloadAge>.67&&reloadAge<.93);
   const reach=reload?Yo(reloadAge/.22)*(1-Yo((reloadAge-1.44)/.30)):0;
   left.position.copy(leftHome);left.position.x-=reach*.035;left.position.y-=reach*(.045+magDrop);left.position.z+=reach*.067;left.quaternion.copy(lq).multiply(i0(0,-reach*.3,reach*.5));
   const pull=input.fire&&!reload?1:0;for(const key of ['position','normal']){const attr=finger.geometry.attributes[key],a=rightModel.index[0].attributes[key].array,b=rightModel.index[1].attributes[key].array;for(let n=0;n<a.length;n++)attr.array[n]=a[n]+(b[n]-a[n])*pull;attr.needsUpdate=true;}
   const u=flash.material.uniforms;u.uInt.value=flashTime/.045*8;u.uHeat.value=0;flash.visible=flashTime>0;
   swayX=kn(swayX,Zn(input.look?.dx||0,-.08,.08),12,dt);swayY=kn(swayY,Zn(input.look?.dy||0,-.06,.06),12,dt);
   const walk=Math.min(1,(p.speed||0)/4)*(1-w.ads),bob=Math.sin(time*(p.sprinting?12:8));
   root.position.set(bi(.112,0,w.ads)+bob*.002*walk+reach*.025,bi(-.136,-.0545,w.ads)+Math.sin(time*1.6)*.0008-reach*.025,bi(-.39,-.35,w.ads)+recoil*.035);
   root.rotation.set(recoil*.10+swayY*.35+reach*.07,swayX*.3,-reach*.25+bob*.008*walk);root.visible=visible;
  }
 };
 function viewPoint(x,y,z,out){root.updateMatrix();out.set(x,y,z).applyMatrix4(root.matrix);const ratio=Math.tan(i.camera.fov*Math.PI/360)/Math.tan(i.viewCamera.fov*Math.PI/360);out.x*=ratio;out.y*=ratio;return out.applyQuaternion(i.camera.quaternion).add(i.camera.position);}
 function fire(){
  w.ammo--;cool=.18;recoil=1;shotAge=0;flashTime=.045;origin.copy(i.player.eye||i.camera.position);
  const angle=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*w.spread;dir.set(Math.cos(angle)*r,Math.sin(angle)*r,-1).normalize().applyQuaternion(i.camera.quaternion);
  const hit=i.combat.playerShot(origin,dir,{damage:28,range:90});end.copy(hit?hit.point:origin).addScaledVector(dir,hit?0:90);w.muzzleWorld(muzzle);i.fx?.tracer?.(muzzle,end);
  viewPoint(.025,.035,-.025,muzzle);velocity.set(2,1.2,.4).applyQuaternion(i.camera.quaternion);i.fx?.shell?.(muzzle,velocity);w.muzzleWorld(muzzle);
  flash.material.uniforms.uSeed.value=Math.random()*100;flash.material.uniforms.uJet.value=.5;i.render?.lightPool?.flash(muzzle,16756832,28,6,.045);
  i.events.emit('weapon:fire',{weapon:'pistol',origin,dir,muzzle,ads:w.ads});i.player.addRecoil?.(.018,(Math.random()-.5)*.004);i.player.addShake?.(.14);
 }
 w.reset();root.visible=false;return w;
}
return {SALT_GLOCK17};
}
