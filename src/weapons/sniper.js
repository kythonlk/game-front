// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({Bf,Ci,He,Kc,N_,Qe,Qt,U_,Ve,Vn,Vv,W,Wi,Yo,Ys,Zn,bi,i0,kn,ls,rn,sa,wt,xs,zc}){
function SALT_SNIPER(i){
 const root=new wt;root.name='viewmodel-sr7';i.camera.add(root);
 // Use the PAC-9's finish shaders and glove geometry so both weapons belong to the same kit.
 function finish(name,color,roughness,metalness,kind){const mat=new Qt({color:new Ve(...color),roughness,metalness,vertexColors:true});mat.name=name;Bf(mat,kind);return mat;}
 const metal=finish('sr7-anodized',[.012,.014,.016],.42,.55,0),steel=finish('sr7-phosphate',[.025,.028,.03],.46,.78,1),stock=finish('sr7-polymer',[.115,.096,.065],.65,.05,2),rubber=finish('sr7-rubber',[.009,.01,.012],.82,0,2),silver=finish('sr7-machined',[.19,.21,.22],.32,.85,1);
 const chassis=new wt,mag=new wt,bolt=new wt;root.add(chassis,mag,bolt);mag.position.set(0,-.10,-.12);
 function part(geo,x,y,z,mat=metal,parent=chassis,rotation){const mesh=new Qe(geo,mat);mesh.position.set(x,y,z);if(rotation)mesh.rotation.set(...rotation);const colors=new Float32Array(geo.attributes.position.count*3),normals=geo.attributes.normal;for(let j=0;j<normals.count;j++){const shade=.87+.13*Math.max(0,normals.getY(j));colors.set([shade,shade,shade],j*3);}geo.setAttribute('color',new He(colors,3));parent.add(mesh);return mesh;}
 const box=(w,h,d,x,y,z,mat=metal,parent=chassis,rotation)=>part(Wi(w,h,d,Math.min(.0035,w*.18,h*.18,d*.18)),x,y,z,mat,parent,rotation);
 const tube=(r,length,x,y,z,mat=metal,parent=chassis,r2=r)=>part(new Ys(r,r2,length,24),x,y,z,mat,parent,[Math.PI/2,0,0]);
 const ring=(r,width,x,y,z,mat=steel,parent=chassis)=>part(new Ci(r,width,6,28),x,y,z,mat,parent);
 function screw(x,y,z,side=1,parent=chassis){part(new Ys(.0033,.0033,.002,6),x,y,z,silver,parent,[0,0,side*Math.PI/2]);box(.001,.001,.004,x+side*.0012,y,z,rubber,parent);}
 // Faceted action, recessed ejection port, polished bolt and a separate lower chassis.
 box(.057,.065,.28,0,0,-.095);tube(.024,.27,0,.019,-.095);
 box(.062,.03,.31,0,-.037,-.10,steel);box(.063,.047,.105,0,-.058,-.12,stock);
 box(.0015,.025,.085,.029,.018,-.067,rubber);tube(.009,.074,.023,.018,-.066,silver);
 box(.004,.005,.095,.031,.033,-.067,steel);box(.004,.005,.095,.031,.002,-.067,steel);
 for(const side of [-1,1])for(const z of [-.19,-.11,.025])screw(side*.0305,-.025,z,side);
 box(.008,.012,.020,.034,-.017,.018,steel);box(.009,.004,.014,.04,-.01,.026,rubber);
 // Free-floating fore-end: recessed ventilation slots, rail teeth and sling sockets.
 box(.065,.055,.31,0,-.008,-.39,stock);box(.038,.008,.33,0,.024,-.40,metal);
 for(let j=0;j<12;j++)box(.049,.007,.012,0,.031,-.245-j*.025,steel);
 for(const side of [-1,1]){
  box(.003,.014,.275,side*.033,-.011,-.39,metal);
  for(let j=0;j<6;j++){box(.002,.008,.025,side*.035,-.010,-.275-j*.044,rubber);box(.002,.0015,.024,side*.036,-.015,-.275-j*.044,silver);}
  for(const z of [-.26,-.50])screw(side*.035,.01,z,side);
  part(new Ci(.006,.0018,6,14),side*.035,-.025,-.51,steel,chassis,[0,Math.PI/2,0]);
 }
 // Long barrel, chamber collar and a ported muzzle brake with a recessed bore.
 tube(.017,.40,0,.012,-.744,steel);tube(.024,.035,0,.012,-.55);
 for(let j=0;j<6;j++){const a=j*Math.PI/3;box(.003,.003,.31,Math.cos(a)*.017,.012+Math.sin(a)*.017,-.72,metal,chassis,[0,0,a]);}
 tube(.024,.083,0,.012,-.985);ring(.022,.002,0,.012,-.95,silver);tube(.013,.003,0,.012,-1.028,rubber);
 for(const side of [-1,1])for(let j=0;j<3;j++)box(.002,.015,.009,side*.024,.012,-.966-j*.018,rubber);
 // Adjustable stock, cheek riser, recoil pad, grip stippling and trigger guard.
 tube(.018,.11,0,-.02,.097,steel);box(.065,.082,.18,0,-.04,.20,stock);
 box(.055,.025,.15,0,.017,.205,stock);box(.059,.006,.14,0,.033,.205,rubber);
 box(.07,.10,.025,0,-.039,.301,rubber);
 for(let j=0;j<7;j++)box(.071,.002,.027,0,-.075+j*.012,.301,metal);
 for(const side of [-1,1]){box(.003,.026,.1,side*.033,-.049,.20,metal);screw(side*.036,-.035,.155,side);screw(side*.036,-.035,.255,side);}
 box(.039,.091,.056,0,-.091,.045,stock,chassis,[-.2,0,0]);
 for(const side of [-1,1])for(let j=0;j<5;j++)box(.002,.003,.037,side*.021,-.062-j*.012,.045,rubber,chassis,[-.2,0,0]);
 box(.038,.006,.082,0,-.088,-.012,steel);box(.038,.034,.006,0,-.073,-.052,steel);
 box(.008,.027,.008,0,-.065,-.006,silver,chassis,[-.38,0,0]);
 // Five-round detachable box magazine; details travel with the magazine during reload.
 box(.049,.09,.078,0,0,0,steel,mag);box(.055,.009,.084,0,-.046,0,rubber,mag);
 for(const side of [-1,1])for(const z of [-.024,0,.024])box(.002,.064,.006,side*.025,0,z,metal,mag);
 // Scope mounts are proper split rings, not solid blocks around the optical tube.
 for(const z of [-.19,-.005]){
  box(.046,.018,.038,0,.053,z,steel);box(.025,.025,.025,0,.072,z);
  ring(.024,.004,0,.102,z);for(const side of [-1,1]){box(.012,.013,.024,side*.027,.103,z,metal);screw(side*.034,.103,z,side);}
 }
 tube(.021,.24,0,.102,-.10);tube(.033,.067,0,.102,-.257,metal,chassis,.022);
 tube(.034,.032,0,.102,-.301);ring(.033,.002,0,.102,-.318,steel);
 tube(.028,.072,0,.102,.05);tube(.030,.033,0,.102,.095,rubber);
 for(let j=0;j<9;j++)ring(.030,.0009,0,.102,.081+j*.003,steel);
 // Focus collar and knurled elevation/windage turrets.
 tube(.026,.031,0,.102,-.207,rubber);
 for(let j=0;j<22;j++){const a=j*Math.PI/11;box(.002,.002,.027,Math.cos(a)*.026,.102+Math.sin(a)*.026,-.207,steel,chassis,[0,0,a]);}
 part(new Ys(.019,.019,.026,24),0,.136,-.09,metal);
 part(new Ys(.018,.018,.025,24),.034,.102,-.09,metal,chassis,[0,0,Math.PI/2]);
 for(let j=0;j<20;j++){const a=j*Math.PI/10;box(.002,.017,.002,Math.cos(a)*.019,.138,-.09+Math.sin(a)*.019,steel);}
 box(.002,.001,.012,0,.150,-.09,silver);box(.012,.002,.001,.047,.102,-.09,silver);
 // Recessed glass shares the PAC-9's view-dependent coating, without its red-dot emitter.
 ring(.0275,.0015,0,.102,.115,steel);
 for(const [radius,z] of [[.026,.114],[.029,-.318]]){
  tube(radius,.002,0,.102,z-.004,rubber);
  const outline=Array.from({length:40},(_,j)=>{const a=j*Math.PI/20;return[Math.cos(a)*radius,.102+Math.sin(a)*radius];});
  const lens=U_(outline,-z);lens.material.fragmentShader=lens.material.fragmentShader.replace(' + retCol;',';');root.add(lens);
 }
 // Bolt carrier and swept handle pivot around the receiver, including machined knob grooves.
 tube(.013,.105,0,.018,.003,silver,bolt);part(new Ys(.006,.006,.063,12),.042,.012,.035,steel,bolt,[0,0,1.25]);
 part(new ls(.014,16,10),.073,-.002,.035,rubber,bolt);
 for(let j=0;j<3;j++)ring(.013,.0008,.073,-.002,.028+j*.007,steel,bolt);
 // Batch static surfaces per material and moving assembly to keep draw calls close to the PAC-9.
 for(const parent of [chassis,mag,bolt]){const batches=new Map;for(const mesh of [...parent.children]){mesh.updateMatrix();const geo=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();geo.applyMatrix4(mesh.matrix);if(!batches.has(mesh.material))batches.set(mesh.material,[]);batches.get(mesh.material).push(geo);parent.remove(mesh);mesh.geometry.dispose();}
  for(const [material,geos] of batches){const merged=sa(geos,false);parent.add(new Qe(merged,material));for(const geo of geos)geo.dispose();}
 }
 // Small in-world stamped markings, using the same subdued labeling as the main weapon.
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#c6c4b9';ctx.font='700 86px monospace';ctx.fillText('SR-7',18,90);ctx.font='26px monospace';ctx.fillText('7.62 / PRECISION SYSTEM',20,141);ctx.font='21px monospace';ctx.fillText('PORT AUTHORITY  |  0471',20,181);ctx.fillStyle='#b08e52';ctx.fillRect(20,207,290,5);
 const decal=new Qt({map:new xs(canvas),transparent:true,roughness:.65,metalness:0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});decal.map.colorSpace=Vn;
 for(const side of [-1,1]){const label=new Qe(new rn(.12,.030),decal);label.position.set(side*.0305,-.004,-.132);label.rotation.y=side*Math.PI/2;root.add(label);}
 // Reuse the main weapon's anatomical, textured gloves and sleeves at the sniper's grip anchors.
 const glove=i.mats.get('glove_fabric',{triplanar:true,vertexColors:true,scale:3});
 const localDir=(q,v,mirror=false)=>{const d=new W(...v).normalize().applyQuaternion(q.clone().invert());if(mirror)d.x*=-1;return d.toArray();};
 const gripQ=i0(-.24,0,0).multiply(i0(0,0,-Math.PI/2));
 const rightModel=Vv({mirror:false,fingers:[null,[.62,1.72,.8,0],[.68,1.7,.8,-.03],[.74,1.66,.8,-.09]],indexPoses:[[.1,.16,.1,.05],[.46,1.15,.5,0]],thumb:[localDir(gripQ,[-.85,.05,-.5]),localDir(gripQ,[-.6,-.05,-.8]),localDir(gripQ,[-.05,-.2,-.97])],forearm:localDir(gripQ,[.27,-.44,.86]),sleeve:.34});
 const rightHand=new wt;rightHand.quaternion.copy(gripQ);const rightHome=new W(0,-.095,.054).sub(new W(.006,-.031,-.085).applyQuaternion(gripQ));rightHand.position.copy(rightHome);rightHand.add(new Qe(rightModel.fabric,glove));const finger=new Qe(rightModel.index[0].clone(),glove);rightHand.add(finger);root.add(rightHand);
 const supportQ=i0(0,0,Math.PI/2).multiply(i0(.06,0,0));
 const leftModel=Vv({mirror:true,fingers:[[1.27,1.42,.75,.02],[1.3,1.45,.75,0],[1.3,1.45,.75,-.02],[1.33,1.45,.75,-.05]],thumb:[localDir(supportQ,[0,.25,-.97],true),localDir(supportQ,[.05,.1,-.99],true),localDir(supportQ,[0,0,-1],true)],forearm:localDir(supportQ,[-.5,-.35,.79],true),sleeve:.34});
 const leftHand=new wt;leftHand.quaternion.copy(supportQ);const leftHome=new W(-.015,-.044,-.375).sub(new W(0,-.015,-.055).applyQuaternion(supportQ));leftHand.position.copy(leftHome);leftHand.add(new Qe(leftModel.fabric,glove));root.add(leftHand);
 const flash=N_();flash.position.set(0,.012,-1.04);flash.visible=false;root.add(flash);
 root.traverse(o=>{o.layers.set(zc);if(o.isMesh){o.frustumCulled=false;o.castShadow=false;o.receiveShadow=true;}});
 const modelInfo={meshes:0,tris:0};root.traverse(o=>{if(o.isMesh){modelInfo.meshes++;modelInfo.tris+=Kc(o.geometry);}});
 const scope=document.createElement('div');scope.className='sniper-scope';scope.hidden=true;scope.innerHTML='<div class="scope-glass"><div class="scope-reticle"></div><span>SR-7 · 4×</span></div>';const ui=document.getElementById('ui');ui.appendChild(scope);
 let visible=false,time=0,cool=0,reload=0,reloadPhase=0,autoReload=false,previous=false,recoil=0,boltSound=false,swayX=0,swayY=0;
 const origin=new W,dir=new W,muzzle=new W,end=new W;
 const w={name:'SR-7 · SNIPER',ammo:5,magSize:5,reserve:30,damage:110,rpm:48,ads:0,spread:.028,state:'idle',root,debug:{},info:modelInfo,
  setVisible(v){visible=!!v;root.visible=visible;if(visible&&w.ammo===0&&w.reserve>0&&!reload)autoReload=true;if(!visible){autoReload=false;w.ads=0;showScope(false);}},
  reset(){w.ammo=5;w.reserve=30;w.ads=0;w.state='idle';cool=reload=recoil=0;autoReload=false;previous=false;mag.position.y=-.10;rightHand.position.copy(rightHome);leftHand.position.copy(leftHome);flash.visible=false;showScope(false);},
  addAmmo(n){w.reserve+=n;},snap(){w.ads=i.input.ads?1:0;},
  muzzleWorld(out=new W){root.updateMatrix();out.set(0,.01,-1.04).applyMatrix4(root.matrix);const ratio=Math.tan(i.camera.fov*Math.PI/360)/Math.tan(i.viewCamera.fov*Math.PI/360);out.x*=ratio;out.y*=ratio;return out.applyQuaternion(i.camera.quaternion).add(i.camera.position);},
  reloadNow(){if(reload||cool>.9||w.ammo===5||w.reserve<=0)return false;autoReload=false;reload=2.8;reloadPhase=0;w.ads=0;w.state='reloading';i.events.emit('weapon:reload',{phase:'start'});return true;},
  update(dt){
   const p=i.player,input=i.input;time+=dt;
   if(!p||!p.alive||!visible){showScope(false);return;}
   cool=Math.max(0,cool-dt);recoil=Math.max(0,recoil-dt*2.8);if(autoReload&&cool===0&&visible){autoReload=false;w.reloadNow();}
   if(cool>0&&cool<.85&&!boltSound){boltSound=true;i.events.emit('weapon:reload',{phase:'bolt'});}
   if(input.pressed('reload'))w.reloadNow();
   if(reload>0){
    reload=Math.max(0,reload-dt);const elapsed=2.8-reload;
    for(const [phase,at,bit] of [['magout',.35,1],['magin',1.8,2],['bolt',2.35,4]])if(elapsed>=at&&!(reloadPhase&bit)){reloadPhase|=bit;i.events.emit('weapon:reload',{phase});}
    mag.position.y=-.10-Math.sin(Math.min(1,elapsed/2.8)*Math.PI)*.22;
    if(reload===0){const count=Math.min(5-w.ammo,w.reserve);w.ammo+=count;w.reserve-=count;i.events.emit('weapon:reload',{phase:'done'});}
   }
   const aim=input.ads&&!reload&&!p.sprinting;
   w.ads=Zn(w.ads+(aim?dt:-dt)/.26,0,1);
   w.spread=bi(.028,.00016,w.ads)+(p.speed||0)*bi(.003,.0003,w.ads)+(p.onGround===false?.025:0);
   const pressed=input.fire&&!previous;previous=!!input.fire;
   if(pressed&&!reload&&cool===0&&!p.sprinting){
    if(w.ammo===0)i.events.emit('weapon:dry',{});
    else{
     w.ammo--;cool=1.25;autoReload=w.ammo===0&&w.reserve>0;boltSound=false;recoil=1;flash.material.uniforms.uSeed.value=Math.random()*100;flash.material.uniforms.uJet.value=.75;
     const angle=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*w.spread;
     origin.copy(p.eye||i.camera.position);dir.set(Math.cos(angle)*r,Math.sin(angle)*r,-1).normalize().applyQuaternion(i.camera.quaternion);
     const hit=i.combat.playerShot(origin,dir,{damage:110,range:550});end.copy(hit?hit.point:origin.clone().addScaledVector(dir,550));
     w.muzzleWorld(muzzle);i.fx?.tracer?.(muzzle,end);i.render?.lightPool?.flash(muzzle,16756832,65,10,.07);
     i.events.emit('weapon:fire',{weapon:'sniper',origin,dir,muzzle,ads:w.ads});
     p.addRecoil?.(.032,(Math.random()-.5)*.005);p.addShake?.(.28);
    }
   }
   w.state=reload?'reloading':cool>0?'cycling':'idle';
   bolt.position.z=cool>.25&&cool<1?Math.sin((1-cool)/.75*Math.PI)*.075:0;bolt.rotation.z=cool>.3&&cool<1.1?-.65:0;
   // Hands follow the magazine and bolt, returning to the shared grip pose between actions.
   const cycle=cool>0?1.25-cool:0;
   const reach=cool>0?Yo(cycle/.18)*(1-Yo((cycle-.87)/.25)):0;
   rightHand.position.copy(rightHome).lerp(new W(.066,-.025,.075+bolt.position.z),reach);
   rightHand.quaternion.copy(gripQ).multiply(i0(0,reach*.2,-reach*.15));
   const reloadAge=reload?2.8-reload:0,magReach=reload?Yo(reloadAge/.3)*(1-Yo((reloadAge-2.15)/.45)):0;
   leftHand.position.copy(leftHome).lerp(new W(-.015,mag.position.y-.04,-.12),magReach);
   const fingerBlend=input.fire&&!reload?1:0;
   const fp=finger.geometry.attributes.position,fn=finger.geometry.attributes.normal;
   for(const [target,key] of [[fp,'position'],[fn,'normal']]){const a=rightModel.index[0].attributes[key].array,b=rightModel.index[1].attributes[key].array;for(let j=0;j<a.length;j++)target.array[j]=a[j]+(b[j]-a[j])*fingerBlend;target.needsUpdate=true;}
   const flashU=flash.material.uniforms;flashU.uInt.value=cool>1.20?11*(cool-1.20)/.05:0;flashU.uHeat.value=0;flash.visible=flashU.uInt.value>0;
   swayX=kn(swayX,Zn(input.look?.dx||0,-.08,.08),12,dt);swayY=kn(swayY,Zn(input.look?.dy||0,-.06,.06),12,dt);
   const walk=Math.min(1,(p.speed||0)/4)*(1-w.ads)*(!reload?1:.15),bob=Math.sin(time*(p.sprinting?12:8));
   root.position.set(bi(.125,0,w.ads)+bob*.003*walk,-.145-reload/2.8*.06+Math.sin(time*1.5)*.001+Math.cos(time*16)*.002*walk,-.405+recoil*.055);
   root.rotation.set(.025+recoil*.035+swayY*.4,-.025+swayX*.4,reload?-.20:bob*.009*walk);
   const scoped=w.ads>.92&&!reload;root.visible=visible&&!scoped;showScope(scoped);
  }
 };
 function showScope(on){scope.hidden=!on;ui.classList.toggle('scoped',on);}
 i.events.on('game:state',event=>{if(event.state!=='playing')showScope(false);});
 return w;
}
return {SALT_SNIPER};
}
