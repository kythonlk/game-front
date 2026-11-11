// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({Bf,Ci,He,Kc,N_,Qe,Qt,Ve,Vn,Vv,W,Wi,Ys,Zn,bi,i0,rn,sa,wt,xs,zc}){
function SALT_SHOTGUN(i){
 const root=new wt;root.name='viewmodel-breacher12';i.camera.add(root);
 const make=(name,c,r,m,k)=>{const mat=new Qt({color:new Ve(...c),roughness:r,metalness:m,vertexColors:true});mat.name=name;Bf(mat,k);return mat;};
 const metal=make('sg-anodized',[.013,.016,.018],.43,.65,0),steel=make('sg-steel',[.04,.045,.048],.4,.8,1),poly=make('sg-polymer',[.105,.078,.045],.68,.02,2),rubber=make('sg-rubber',[.009,.01,.011],.82,0,2),brass=i.mats.get('brass',{triplanar:true,vertexColors:true,scale:4}),silver=make('sg-machined',[.19,.21,.22],.34,.83,1),shellRed=make('sg-shell-red',[.26,.034,.021],.63,.03,2),sight=make('sg-sight-mark',[.63,.66,.59],.48,.1,2);
 const body=new wt,pump=new wt,bolt=new wt;root.add(body,pump,bolt);
 function part(geo,x,y,z,mat=metal,parent=body,rot){const mesh=new Qe(geo,mat);mesh.position.set(x,y,z);if(rot)mesh.rotation.set(...rot);const colors=new Float32Array(geo.attributes.position.count*3);for(let n=0;n<geo.attributes.normal.count;n++){const shade=.87+.13*Math.max(0,geo.attributes.normal.getY(n));colors.set([shade,shade,shade],n*3);}geo.setAttribute('color',new He(colors,3));parent.add(mesh);return mesh;}
 const box=(w,h,d,x,y,z,mat=metal,parent=body,rot)=>part(Wi(w,h,d,Math.min(.003,w*.15,h*.15,d*.15)),x,y,z,mat,parent,rot);
 const tube=(r,l,x,y,z,mat=metal,parent=body)=>part(new Ys(r,r,l,18),x,y,z,mat,parent,[Math.PI/2,0,0]);
 const ring=(radius,wire,x,y,z,mat=steel,parent=body,rot)=>part(new Ci(radius,wire,6,24),x,y,z,mat,parent,rot);
 function screw(x,y,z,side=1,parent=body){part(new Ys(.0032,.0032,.002,6),x,y,z,silver,parent,[0,0,side*Math.PI/2]);box(.001,.0012,.004,x+side*.0012,y,z,rubber,parent);}
 // Machined action with contrasting side plates, recessed port and a visible bolt.
 box(.062,.072,.235,0,0,-.045);box(.066,.018,.23,0,-.043,-.05,steel);
 for(const side of [-1,1]){
  box(.002,.042,.211,side*.0318,-.004,-.045,steel);
  box(.002,.005,.19,side*.033,.028,-.045,silver);
  for(const z of [-.13,.024])screw(side*.034,-.023,z,side);
 }
 box(.002,.027,.093,.034,.008,-.055,rubber);
 box(.004,.004,.103,.035,.024,-.055,metal);box(.004,.004,.103,.035,-.008,-.055,metal);
 tube(.009,.071,.032,.008,-.055,silver,bolt);
 box(.004,.009,.019,.037,.011,-.017,silver,bolt);
 box(.009,.009,.021,-.035,-.027,.045,steel);box(.012,.004,.018,-.041,-.021,.045,rubber);
 // Barrel, magazine tube and a slotted upper shroud / sight rib.
 tube(.016,.40,0,.012,-.355,steel);tube(.018,.34,0,-.027,-.32);
 tube(.021,.017,0,-.027,-.50,steel);tube(.018,.006,0,-.027,-.511,silver);
 for(const side of [-1,1]){
  box(.005,.010,.32,side*.019,.027,-.345,metal);
  for(let n=0;n<8;n++)box(.005,.016,.008,side*.019,.028,-.197-n*.042,steel);
 }
 box(.010,.004,.34,0,.040,-.345,steel);
 for(let n=0;n<8;n++)box(.008,.012,.009,0,.033,-.19-n*.044,steel);
 // A hollow muzzle and barrel clamp replace the old flat end cap.
 part(new Ys(.022,.022,.040,24,1,true),0,.012,-.575,steel,body,[Math.PI/2,0,0]);
 part(new Ys(.011,.011,.032,24,1,true),0,.012,-.577,rubber,body,[Math.PI/2,0,0]);
 ring(.0165,.0055,0,.012,-.596,steel);tube(.0108,.001,0,.012,-.559,rubber);
 for(let n=0;n<6;n++){const a=n*Math.PI/3;box(.004,.004,.018,Math.cos(a)*.021,.012+Math.sin(a)*.021,-.575,rubber,body,[0,0,a]);}
 ring(.018,.003,0,.012,-.473);ring(.020,.003,0,-.027,-.473);
 for(const side of [-1,1]){box(.006,.037,.012,side*.020,-.008,-.473,steel);screw(side*.024,-.008,-.473,side);}
 // Protected iron sights keep the original sight line, with a bright front bead.
 box(.01,.026,.019,0,.039,-.548);box(.003,.004,.004,0,.054,-.545,sight);
 box(.042,.014,.028,0,.046,.033);box(.006,.015,.025,-.016,.058,.033);box(.006,.015,.025,.016,.058,.033);
 ring(.007,.0015,0,.060,.031,steel);box(.006,.009,.006,0,.048,.031,steel);
 for(const side of [-1,1])box(.002,.006,.002,side*.010,.058,.047,sight);
 // Sculpted pump with front/rear stops, ribbed grip and fastener plates.
 box(.064,.061,.19,0,-.027,-.315,poly,pump);
 for(let n=0;n<11;n++)box(.068,.004,.008,0,-.057,-.235-n*.016,rubber,pump);
 for(const side of [-1,1]){
  box(.002,.035,.154,side*.033,-.027,-.315,rubber,pump);
  for(let n=0;n<9;n++)box(.004,.036,.005,side*.034,-.025,-.25-n*.017,poly,pump);
  for(const z of [-.238,-.392])screw(side*.035,-.029,z,side,pump);
 }
 box(.070,.009,.014,0,-.054,-.223,poly,pump);box(.070,.012,.013,0,-.051,-.407,poly,pump);
 // Grip and trigger guard retain their original glove anchors.
 box(.042,.095,.056,0,-.092,.065,poly,body,[-.22,0,0]);
 for(const side of [-1,1]){box(.002,.060,.041,side*.022,-.093,.063,rubber,body,[-.22,0,0]);for(let n=0;n<7;n++)box(.003,.002,.034,side*.023,-.067-n*.008,.063,poly,body,[-.22,0,0]);}
 box(.038,.005,.074,0,-.082,-.006,steel);box(.038,.033,.006,0,-.067,-.043,steel);box(.007,.027,.007,0,-.06,0,steel,body,[-.35,0,0]);
 box(.009,.009,.007,0,-.041,.048,metal);box(.004,.002,.009,0,-.036,.049,shellRed);
 // Layered stock, cheek pad, textured butt pad and sling hardware.
 box(.065,.09,.19,0,-.035,.208,poly);box(.057,.018,.14,0,.018,.205,poly);
 box(.062,.012,.125,0,.031,.215,rubber);box(.068,.009,.033,0,-.077,.139,steel);
 for(const side of [-1,1]){
  box(.002,.038,.115,side*.033,-.031,.212,rubber);
  for(let n=0;n<8;n++)box(.003,.025,.003,side*.034,-.030,.167+n*.012,poly);
  screw(side*.034,-.035,.264,side);
  ring(.007,.0016,side*.035,-.062,.271,steel,body,[0,Math.PI/2,0]);
 }
 box(.069,.105,.025,0,-.04,.315,rubber);
 for(let n=0;n<6;n++)box(.07,.003,.027,0,-.08+n*.016,.315,metal);
 // Four distinct red hulls sit vertically in a receiver-mounted carrier.
 box(.007,.048,.142,-.038,-.004,-.068,rubber);box(.004,.007,.146,-.043,.024,-.068,metal);
 for(let n=0;n<4;n++){
  const z=-.119+n*.034;
  part(new Ys(.0086,.0086,.045,18),-.047,-.005,z,shellRed);
  part(new Ys(.0091,.0091,.009,18),-.047,.022,z,brass);
  part(new Ys(.003,.003,.001,12),-.047,.027,z,steel);
  box(.010,.004,.020,-.046,-.018,z,rubber);
 }
 for(const parent of [body,pump,bolt]){const batches=new Map;for(const mesh of [...parent.children]){mesh.updateMatrix();const g=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();g.applyMatrix4(mesh.matrix);if(!batches.has(mesh.material))batches.set(mesh.material,[]);batches.get(mesh.material).push(g);parent.remove(mesh);mesh.geometry.dispose();}for(const [mat,geos] of batches){parent.add(new Qe(sa(geos,false),mat));geos.forEach(g=>g.dispose());}}
 // Subdued stamped receiver markings are separate from the batched metalwork.
 const markCanvas=document.createElement('canvas');markCanvas.width=512;markCanvas.height=256;
 const markCtx=markCanvas.getContext('2d');markCtx.fillStyle='#d5cbbb';markCtx.font='700 112px monospace';markCtx.fillText('B-12',20,112);markCtx.font='25px monospace';markCtx.fillText('PORT SECURITY',21,164);markCtx.fillStyle='#b18e52';markCtx.fillRect(22,194,270,6);
 const markings=new Qt({map:new xs(markCanvas),transparent:true,roughness:.68,metalness:0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});markings.map.colorSpace=Vn;
 for(const side of [-1,1]){const label=new Qe(new rn(.051,.0255),markings);label.position.set(side*.0331,.006,.036);label.rotation.y=side*Math.PI/2;root.add(label);}
 const glove=i.mats.get('glove_fabric',{triplanar:true,vertexColors:true,scale:3});
 const local=(q,v,mirror=false)=>{const d=new W(...v).normalize().applyQuaternion(q.clone().invert());if(mirror)d.x*=-1;return d.toArray();};
 const rq=i0(-.24,0,0).multiply(i0(0,0,-Math.PI/2));
 const rh=Vv({mirror:false,fingers:[null,[.62,1.72,.8,0],[.68,1.7,.8,-.03],[.74,1.66,.8,-.09]],indexPoses:[[.1,.16,.1,.05],[.46,1.15,.5,0]],thumb:[local(rq,[-.85,.05,-.5]),local(rq,[-.6,-.05,-.8]),local(rq,[-.05,-.2,-.97])],forearm:local(rq,[.27,-.44,.86]),sleeve:.34});
 const right=new wt;right.quaternion.copy(rq);right.position.copy(new W(0,-.097,.073).sub(new W(.006,-.031,-.085).applyQuaternion(rq)));right.add(new Qe(rh.fabric,glove),new Qe(rh.index[1],glove));root.add(right);
 const lq=i0(0,0,Math.PI/2).multiply(i0(.06,0,0));
 const lh=Vv({mirror:true,fingers:[[1.27,1.42,.75,.02],[1.3,1.45,.75,0],[1.3,1.45,.75,-.02],[1.33,1.45,.75,-.05]],thumb:[local(lq,[0,.25,-.97],true),local(lq,[.05,.1,-.99],true),local(lq,[0,0,-1],true)],forearm:local(lq,[-.5,-.35,.79],true),sleeve:.34});
 const left=new wt,leftHome=new W(-.015,-.062,-.315).sub(new W(0,-.015,-.055).applyQuaternion(lq));left.quaternion.copy(lq);left.position.copy(leftHome);left.add(new Qe(lh.fabric,glove));root.add(left);
 const flash=N_();flash.position.set(0,.012,-.602);flash.visible=false;root.add(flash);
 root.traverse(o=>{o.layers.set(zc);if(o.isMesh){o.frustumCulled=false;o.receiveShadow=true;o.castShadow=false;}});
 const info={meshes:0,tris:0};root.traverse(o=>{if(o.isMesh){info.meshes++;info.tris+=Kc(o.geometry);}});
 let visible=false,t=0,cool=0,reload=0,previous=false,recoil=0,pumped=false;
 const origin=new W,dir=new W,muzzle=new W,end=new W,velocity=new W,target=new W;
 const w={name:'B-12 · SHOTGUN',ammo:6,magSize:6,reserve:36,damage:22,rpm:75,ads:0,spread:.085,state:'idle',root,debug:{},info,
  setVisible(value){visible=!!value;root.visible=visible;if(!visible)w.ads=0;},
  reset(){w.ammo=6;w.reserve=36;w.ads=0;w.state='idle';cool=reload=recoil=0;previous=pumped=false;pump.position.z=0;bolt.position.z=0;left.position.copy(leftHome);flash.visible=false;},
  addAmmo(n){w.reserve+=n;},snap(){w.ads=i.input.ads?1:0;},
  muzzleWorld(out=new W){return viewPoint(0,.012,-.602,out);},
  reloadNow(){if(reload||cool>0||w.ammo>=6||w.reserve<=0)return false;reload=.72;w.state='reloading';i.events.emit('weapon:reload',{phase:'start',weapon:'shotgun'});return true;},
  update(dt){
   const p=i.player,input=i.input;t+=dt;if(!visible||!p?.alive){flash.visible=false;return;}
   cool=Math.max(0,cool-dt);recoil=Math.max(0,recoil-dt*3.6);
   if(cool>0&&cool<.5&&!pumped){pumped=true;i.events.emit('weapon:reload',{phase:'bolt',weapon:'shotgun'});viewPoint(.035,.01,-.05,muzzle);velocity.set(2.5,1.4,.6).applyQuaternion(i.camera.quaternion);i.fx?.shell?.(muzzle,velocity);}
   const click=input.fire&&!previous;previous=!!input.fire;
   if(input.pressed('reload'))w.reloadNow();
   if(reload>0){
    // Reload one shell at a time; a fresh fire press can interrupt after a shell is loaded.
    if(click&&w.ammo>0){reload=0;i.events.emit('weapon:reload',{phase:'done',weapon:'shotgun'});}
    else{reload=Math.max(0,reload-dt);if(reload===0){w.ammo++;w.reserve--;i.events.emit('weapon:reload',{phase:'magin',weapon:'shotgun'});if(w.ammo<6&&w.reserve>0)reload=.62;else i.events.emit('weapon:reload',{phase:'done',weapon:'shotgun'});}}
   }
   if(w.ammo===0&&w.reserve>0&&!reload&&cool===0)w.reloadNow();
   const aiming=input.ads&&!reload&&!p.sprinting;w.ads=Zn(w.ads+(aiming?dt:-dt)/.2,0,1);
   w.spread=bi(.085,.050,w.ads)+(p.speed||0)*.002+(p.onGround===false?.015:0);
   if(click&&!reload&&cool===0&&!p.sprinting){if(w.ammo===0)i.events.emit('weapon:dry',{weapon:'shotgun'});else fire();}
   w.state=reload?'reloading':cool>0?'cycling':'idle';
   const pumpTravel=cool>.1&&cool<.65?Math.sin((.65-cool)/.55*Math.PI)*.082:0;pump.position.z=pumpTravel;bolt.position.z=pumpTravel*.72;
   const loadReach=reload?Math.sin(Math.min(1,reload/.72)*Math.PI):0;left.position.copy(leftHome);left.position.z+=pumpTravel;left.position.lerp(target.set(-.015,-.18,-.08),loadReach);
   const u=flash.material.uniforms;u.uInt.value=cool>.75?13*(cool-.75)/.05:0;u.uHeat.value=0;flash.visible=u.uInt.value>0;
   root.position.set(bi(.122,0,w.ads),bi(-.14,-.061,w.ads)-loadReach*.035+Math.sin(t*1.4)*.001,-.30+recoil*.065);
   root.rotation.set(recoil*.055,0,loadReach*-.18);root.visible=visible;
  }
 };
 function viewPoint(x,y,z,out){root.updateMatrix();out.set(x,y,z).applyMatrix4(root.matrix);const ratio=Math.tan(i.camera.fov*Math.PI/360)/Math.tan(i.viewCamera.fov*Math.PI/360);out.x*=ratio;out.y*=ratio;return out.applyQuaternion(i.camera.quaternion).add(i.camera.position);}
 function fire(){
  const p=i.player;w.ammo--;cool=.8;pumped=false;recoil=1;origin.copy(p.eye||i.camera.position);w.muzzleWorld(muzzle);
  let anyHit=false;const stats=i.combat.stats;if(stats)stats.shots++;
  const turn=Math.random()*Math.PI*2;
  for(let pellet=0;pellet<8;pellet++){
   const angle=turn+pellet*2.399963,spread=pellet===0?0:w.spread*Math.sqrt(pellet/7)*(.9+Math.random()*.2);
   dir.set(Math.cos(angle)*spread,Math.sin(angle)*spread,-1).normalize().applyQuaternion(i.camera.quaternion);
   const wall=i.physics.raycast(origin,dir,42),hit=i.enemies.raycast(origin,dir,wall?wall.dist:42);let impact;
   if(hit){
    anyHit=true;const damage=22*bi(1,.18,Zn((hit.dist-8)/34,0,1)),weak=hit.part==='weak',killed=hit.enemy.damage(damage*(weak?1.5:1),hit.point,dir,hit.part)===true;
    impact={point:hit.point,normal:hit.normal||dir.clone().negate(),dist:hit.dist,surface:'enemy',enemy:hit.enemy,part:hit.part,dir:dir.clone(),from:'player',killed};
    i.events.emit('impact',impact);i.events.emit('player:hitEnemy',{enemy:hit.enemy,part:hit.part,killed,weak});
   }else if(wall){impact={point:wall.point,normal:wall.normal,dist:wall.dist,surface:wall.surface,enemy:null,dir:dir.clone(),from:'player'};i.events.emit('impact',impact);}
   if(pellet<3){end.copy(impact?impact.point:origin).addScaledVector(dir,impact?0:42);i.fx?.tracer?.(muzzle,end);}
  }
  if(anyHit&&stats)stats.hits++;
  dir.set(0,0,-1).applyQuaternion(i.camera.quaternion);i.events.emit('weapon:fire',{weapon:'shotgun',origin,dir,muzzle,ads:w.ads});
  i.render?.lightPool?.flash(muzzle,16756832,70,10,.07);flash.material.uniforms.uSeed.value=Math.random()*100;flash.material.uniforms.uJet.value=.8;
  p.addRecoil?.(.04,(Math.random()-.5)*.007);p.addShake?.(.32);
 }
 return w;
}
return {SALT_SHOTGUN};
}
