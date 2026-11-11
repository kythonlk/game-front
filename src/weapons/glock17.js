// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({Bf,He,Kc,N_,Qe,Qt,Ve,Vn,Vv,W,Wi,Yo,Ys,Zn,bi,i0,kn,rn,sa,wt,xs,zc}){
function SALT_GLOCK17(i){
 const root=new wt;root.name='viewmodel-glock17';i.camera.add(root);
 const make=(name,color,roughness,metalness,finish)=>{const m=new Qt({color:new Ve(...color),roughness,metalness,vertexColors:true});m.name=name;Bf(m,finish);return m;};
 const polymer=make('g17-polymer',[.026,.029,.028],.82,.02,2),gripMat=make('g17-stipple',[.016,.019,.018],.94,0,2),steel=make('g17-slide',[.027,.032,.037],.40,.75,0),machined=make('g17-machined',[.10,.12,.13],.32,.85,1),dark=make('g17-recess',[.006,.008,.009],.7,.25,1),sight=make('g17-sight',[.78,.81,.73],.6,.05,2),brass=i.mats.get('brass',{triplanar:true,vertexColors:true,scale:4});
 const frame=new wt,slide=new wt,barrel=new wt,magazine=new wt,grip=new wt;root.add(frame,barrel,slide,magazine);frame.add(grip);
 grip.position.set(0,-.081,.028);grip.rotation.x=-.22;
 const magHome=new W(0,-.081,.028);magazine.position.copy(magHome);magazine.rotation.x=-.22;
 function part(geo,x,y,z,mat=steel,parent=frame,rotation){const mesh=new Qe(geo,mat);mesh.position.set(x,y,z);if(rotation)mesh.rotation.set(...rotation);const colors=new Float32Array(geo.attributes.position.count*3);for(let n=0;n<colors.length;n++)colors[n]=.96;geo.setAttribute('color',new He(colors,3));parent.add(mesh);return mesh;}
 const box=(w,h,d,x,y,z,mat=steel,parent=frame,rotation)=>part(Wi(w,h,d,Math.min(.002,w*.16,h*.16,d*.16)),x,y,z,mat,parent,rotation);
 const tube=(r,length,x,y,z,mat=machined,parent=barrel)=>part(new Ys(r,r,length,20),x,y,z,mat,parent,[Math.PI/2,0,0]);
 // A squared slide with a real open ejection-port gap along its top/right side.
 box(.039,.038,.105,0,.034,-.118,steel,slide);
 box(.039,.038,.052,0,.034,.021,steel,slide);
 box(.006,.038,.037,-.0165,.034,-.023,steel,slide);
 box(.039,.009,.040,0,.019,-.023,dark,slide);
 box(.004,.012,.040,.0175,.024,-.023,steel,slide);
 // Split the upper rail around the open port.
 box(.033,.005,.105,0,.055,-.118,steel,slide);box(.033,.005,.052,0,.055,.021,steel,slide);
 box(.033,.034,.006,0,.034,.050,dark,slide);
 box(.017,.014,.002,0,.034,.054,polymer,slide);
 for(const side of [-1,1]){
  // Rear cocking serrations and a short set at the nose catch light separately.
  for(let n=0;n<8;n++)box(.0024,.031,.0018,side*.0202,.034,.012+n*.0043,dark,slide,[.10,0,0]);
  for(let n=0;n<4;n++)box(.0022,.024,.0016,side*.0201,.032,-.150+n*.0044,dark,slide,[.10,0,0]);
  box(.002,.004,.020,side*.0201,.021,-.020,machined,slide);
 }
 tube(.0085,.175,0,.033,-.088,machined);box(.026,.025,.035,0,.034,-.025,machined,barrel);
 tube(.0091,.006,0,.033,-.179,machined);tube(.0058,.0012,0,.033,-.1825,dark);
 tube(.0047,.125,0,.004,-.108,dark);tube(.0052,.004,0,.004,-.172,machined);
 // Polymer dust cover, accessory rail and the characteristic angled grip.
 box(.041,.024,.180,0,.002,-.062,polymer);box(.035,.013,.073,0,-.016,-.123,polymer);
 for(let n=0;n<3;n++)box(.037,.003,.005,0,-.023,-.132+n*.012,dark);
 box(.039,.020,.049,0,-.018,.016,polymer);
 box(.035,.119,.043,0,0,0,polymer,grip);box(.027,.107,.047,0,-.002,.001,gripMat,grip);
 for(const side of [-1,1]){
  box(.002,.091,.034,side*.0182,-.002,.003,gripMat,grip);
  for(let row=0;row<10;row++)for(let col=0;col<5;col++)box(.0012,.0013,.0014,side*.0193,-.043+row*.009,-.010+col*.006,polymer,grip);
  box(.002,.021,.022,side*.019,-.038,.005,polymer,grip);
  box(.006,.006,.015,side*.022,-.014,-.006,dark);
  for(const z of [-.001,.024])part(new Ys(.0029,.0029,.0025,12),side*.021,-.020,z,machined,frame,[0,0,Math.PI/2]);
 }
 for(let n=0;n<12;n++){box(.029,.0012,.0017,0,-.050+n*.0083,-.0237,polymer,grip);box(.027,.0012,.0017,0,-.050+n*.0083,.025,polymer,grip);}
 box(.006,.008,.013,-.023,-.035,.010,dark);box(.004,.006,.026,-.023,-.005,.021,machined);
 // Open trigger guard: four rails surround the trigger instead of filling its opening.
 for(const side of [-1,1]){box(.005,.009,.055,side*.017,-.073,-.035,polymer);box(.005,.039,.009,side*.017,-.053,-.060,polymer,frame,[-.16,0,0]);}
 box(.035,.009,.008,0,-.073,-.060,polymer);box(.035,.013,.009,0,-.034,-.063,polymer);
 box(.007,.030,.008,0,-.042,-.025,dark,frame,[-.23,0,0]);box(.0025,.019,.0025,0,-.045,-.018,machined,frame,[-.23,0,0]);
 // Magazine with feed lips, witness holes and a separate polymer baseplate.
 box(.027,.105,.029,0,0,0,dark,magazine);box(.035,.009,.042,0,-.057,.003,polymer,magazine);
 for(const side of [-1,1]){box(.002,.092,.002,side*.0137,-.002,-.009,machined,magazine);box(.002,.012,.024,side*.0118,.055,0,machined,magazine);}
 for(let n=0;n<7;n++)part(new Ys(.0017,.0017,.001,8),.0139,.035-n*.011,.004,machined,magazine,[0,0,Math.PI/2]);
 tube(.0047,.021,0,.054,0,brass,magazine);
 // White-dot front post and squared rear notch remain useful through the ADS transition.
 box(.025,.009,.013,0,.061,.034,dark,slide);box(.006,.008,.013,-.010,.068,.034,dark,slide);box(.006,.008,.013,.010,.068,.034,dark,slide);
 box(.0032,.0035,.001,-.010,.069,.041,sight,slide);box(.0032,.0035,.001,.010,.069,.041,sight,slide);
 box(.006,.011,.012,0,.063,-.151,dark,slide);box(.003,.0035,.001,0,.067,-.1445,sight,slide);
 // Batch by material inside each independently animated assembly.
 for(const parent of [frame,grip,slide,barrel,magazine]){const batches=new Map;for(const mesh of [...parent.children]){if(!mesh.isMesh)continue;mesh.updateMatrix();const geo=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();geo.applyMatrix4(mesh.matrix);if(!batches.has(mesh.material))batches.set(mesh.material,[]);batches.get(mesh.material).push(geo);parent.remove(mesh);mesh.geometry.dispose();}for(const [mat,geos]of batches){parent.add(new Qe(sa(geos,false),mat));geos.forEach(g=>g.dispose());}}
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#969e9d';ctx.font='700 72px monospace';ctx.fillText('GLOCK 17',28,90);ctx.font='30px monospace';ctx.fillText('9x19  /  PORT AUTHORITY',30,145);ctx.font='22px monospace';ctx.fillText('B4-017   SERVICE PISTOL',30,193);
 const marking=new Qt({map:new xs(canvas),transparent:true,roughness:.65,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});marking.map.colorSpace=Vn;
 for(const side of [-1,1]){const label=new Qe(new rn(.088,.022),marking);label.position.set(side*.0203,.034,-.112);label.rotation.y=side*Math.PI/2;slide.add(label);}
 // Match the PAC-9 glove material and keep both hands attached to the pistol grip.
 const glove=i.mats.get('glove_fabric',{triplanar:true,vertexColors:true,scale:3});
 const local=(q,v,mirror=false)=>{const d=new W(...v).normalize().applyQuaternion(q.clone().invert());if(mirror)d.x*=-1;return d.toArray();};
 const rq=i0(-.22,0,0).multiply(i0(0,0,-Math.PI/2));
 const rightModel=Vv({mirror:false,fingers:[null,[.62,1.72,.8,0],[.68,1.7,.8,-.03],[.74,1.66,.8,-.09]],indexPoses:[[.1,.16,.1,.05],[.46,1.15,.5,0]],thumb:[local(rq,[-.85,.05,-.5]),local(rq,[-.6,-.05,-.8]),local(rq,[-.05,-.2,-.97])],forearm:local(rq,[.24,-.4,.88]),sleeve:.34});
 const right=new wt;right.quaternion.copy(rq);right.position.copy(new W(0,-.079,.030).sub(new W(.006,-.031,-.085).applyQuaternion(rq)));right.add(new Qe(rightModel.fabric,glove));const finger=new Qe(rightModel.index[0].clone(),glove);right.add(finger);root.add(right);
 const lq=i0(0,0,Math.PI/2).multiply(i0(.1,0,0));
 const leftModel=Vv({mirror:true,fingers:[[1.27,1.42,.75,.02],[1.3,1.45,.75,0],[1.3,1.45,.75,-.02],[1.33,1.45,.75,-.05]],thumb:[local(lq,[0,.25,-.97],true),local(lq,[.05,.1,-.99],true),local(lq,[0,0,-1],true)],forearm:local(lq,[-.52,-.36,.78],true),sleeve:.34});
 const left=new wt,leftHome=new W(-.028,-.081,-.001).sub(new W(0,-.015,-.055).applyQuaternion(lq));left.quaternion.copy(lq);left.position.copy(leftHome);left.add(new Qe(leftModel.fabric,glove));root.add(left);
 const flash=N_();flash.position.set(0,.033,-.184);flash.visible=false;root.add(flash);
 root.traverse(o=>{o.layers.set(zc);if(o.isMesh){o.frustumCulled=false;o.castShadow=false;o.receiveShadow=true;}});
 const info={meshes:0,tris:0};root.traverse(o=>{if(o.isMesh){info.meshes++;info.tris+=Kc(o.geometry);}});
 let visible=false,time=0,cool=0,reload=0,reloadPhases=0,previous=false,recoil=0,shotAge=1,flashTime=0,swayX=0,swayY=0;
 const origin=new W,dir=new W,muzzle=new W,end=new W,velocity=new W;
 const w={name:'GLOCK 17 · PISTOL',ammo:17,magSize:17,reserve:68,damage:28,rpm:333,ads:0,spread:.016,state:'idle',root,info,
  debug:{get slideOffset(){return slide.position.z;},get magazineDrop(){return magHome.y-magazine.position.y;}},
  setVisible(value){visible=!!value;root.visible=visible;if(!visible){w.ads=0;flash.visible=false;previous=false;}},
  reset(){w.ammo=17;w.reserve=68;w.ads=0;w.spread=.016;w.state='idle';cool=reload=recoil=flashTime=0;reloadPhases=0;previous=false;shotAge=1;slide.position.z=0;barrel.position.z=0;barrel.rotation.x=0;magazine.position.copy(magHome);magazine.visible=true;left.position.copy(leftHome);left.quaternion.copy(lq);flash.visible=false;},
  addAmmo(n){w.reserve+=n;},snap(){w.ads=i.input.ads?1:0;},
  muzzleWorld(out=new W){return viewPoint(0,.033,-.184,out);},
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
   root.position.set(bi(.105,0,w.ads)+bob*.002*walk+reach*.025,bi(-.132,-.069,w.ads)+Math.sin(time*1.6)*.0008-reach*.025,-.33+recoil*.035);
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
