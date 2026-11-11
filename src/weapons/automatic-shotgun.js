// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({Bf,Ci,He,Kc,N_,Qe,Qt,Ve,Vn,Vv,W,Wi,Yo,Ys,Zn,bi,i0,kn,rn,sa,wt,xs,zc}){
function SALT_AUTO_SHOTGUN(i){
 const root=new wt;root.name='viewmodel-autoshotgun';i.camera.add(root);
 const make=(name,color,roughness,metalness,finish)=>{const m=new Qt({color:new Ve(...color),roughness,metalness,vertexColors:true});m.name=name;Bf(m,finish);return m;};
 const steel=make('a12-receiver',[.055,.063,.069],.42,.78,0),edge=make('a12-machined',[.12,.14,.15],.35,.84,1),dark=make('a12-recess',[.008,.011,.014],.7,.24,1),polymer=make('a12-olive-polymer',[.095,.108,.076],.82,.03,2),rubber=make('a12-rubber',[.021,.027,.024],.94,0,2),sight=make('a12-sight',[.72,.81,.62],.55,.05,2),shellRed=make('a12-shell-red',[.28,.038,.024],.58,.04,2),fiber=make('a12-fiber',[.95,.32,.10],.22,.05,2),brass=i.mats.get('brass',{triplanar:true,vertexColors:true,scale:4});
 const body=new wt,bolt=new wt,magazine=new wt;root.add(body,bolt,magazine);const magHome=new W(0,-.114,-.128);magazine.position.copy(magHome);magazine.rotation.x=.08;
 function part(geo,x,y,z,mat=steel,parent=body,rotation){const mesh=new Qe(geo,mat);mesh.position.set(x,y,z);if(rotation)mesh.rotation.set(...rotation);const colors=new Float32Array(geo.attributes.position.count*3),normals=geo.attributes.normal;for(let n=0;n<normals.count;n++){const shade=.86+.14*Math.max(0,normals.getY(n));colors.set([shade,shade,shade],n*3);}geo.setAttribute('color',new He(colors,3));parent.add(mesh);return mesh;}
 const box=(w,h,d,x,y,z,mat=steel,parent=body,rot)=>part(Wi(w,h,d,Math.min(.003,w*.15,h*.15,d*.15)),x,y,z,mat,parent,rot);
 const tube=(r,len,x,y,z,mat=edge,parent=body)=>part(new Ys(r,r,len,18),x,y,z,mat,parent,[Math.PI/2,0,0]);
 const ring=(radius,wire,x,y,z,mat=steel,parent=body,rot)=>part(new Ci(radius,wire,6,24),x,y,z,mat,parent,rot);
 // Three-piece machined receiver with upper bevels, brass shell deflector, open ejection port and moving bolt.
 box(.066,.076,.092,0,.006,.017);box(.066,.076,.105,0,.006,-.154);
 box(.008,.076,.079,-.029,.006,-.068);box(.066,.014,.079,0,-.025,-.068);
 box(.066,.013,.079,0,.039,-.068);box(.008,.020,.079,.029,-.012,-.068);
 // Angled shell deflector behind the ejection port and recessed side lightening cuts.
 box(.010,.024,.018,.034,.014,-.021,steel,body,[0,.38,0]);
 for(const side of [-1,1]){
  box(.005,.006,.268,side*.030,.041,-.068,steel,body,[0,0,side*.65]);
  box(.002,.016,.072,side*.0335,.012,-.154,dark);
  box(.002,.004,.255,side*.0336,-.018,-.068,edge);
  // Ambidextrous fire-control selector lever and witness markings.
  part(new Ys(.0045,.0045,.003,12),side*.034,-.024,.024,edge,body,[0,0,Math.PI/2]);
  box(.004,.006,.022,side*.036,-.021,.017,dark,body,[.32,0,0]);
 }
 // Fluted bolt carrier, extractor claw and knurled reciprocating charging handle.
 box(.050,.043,.080,0,.010,-.063,dark,bolt);box(.003,.029,.054,.030,.014,-.065,edge,bolt);
 for(let n=0;n<3;n++)box(.0015,.004,.044,.0315,.006+n*.007,-.065,dark,bolt);
 box(.036,.008,.012,.042,.015,-.062,edge,bolt);tube(.0052,.018,.059,.016,-.065,dark,bolt);
 part(new Ys(.0062,.0052,.016,14),.062,.016,-.065,edge,bolt,[0,0,Math.PI/2]);
 box(.061,.031,.130,0,-.043,-.043,polymer);box(.074,.018,.076,0,-.063,-.128,steel);
 box(.078,.006,.080,0,-.071,-.128,edge);
 // Heavy barrel, adjustable gas block with knurled regulator plug, perforated shroud, multi-port brake and dark bore.
 tube(.014,.370,0,.006,-.329);tube(.020,.058,0,.006,-.516,steel);tube(.017,.052,0,.006,-.516,edge);tube(.0114,.002,0,.006,-.546,dark);
 // Gas block assembly and piston tube above the barrel.
 tube(.009,.225,0,.038,-.298,dark);box(.028,.044,.042,0,.024,-.422,steel);
 tube(.0105,.022,0,.038,-.438,edge);part(new Ys(.0075,.0075,.012,12),0,.038,-.450,steel,body,[Math.PI/2,0,0]);
 for(let n=0;n<6;n++){const a=n*Math.PI/3;box(.002,.002,.010,Math.cos(a)*.008,.038+Math.sin(a)*.008,-.450,edge,body,[0,0,a]);}
 // Octagonal polymer/steel fore-end with side M-LOK slots, lower accessory rail and angled hand stop.
 box(.069,.061,.188,0,-.003,-.304,polymer);box(.030,.008,.168,0,-.036,-.304,dark);
 for(let n=0;n<12;n++)box(.034,.004,.005,0,-.040,-.232-n*.013,edge);
 box(.026,.024,.032,0,-.048,-.382,polymer,body,[.35,0,0]);
 for(const side of [-1,1]){
  box(.004,.035,.186,side*.034,-.001,-.302,steel);
  for(let n=0;n<7;n++){box(.005,.012,.014,side*.036,.008,-.372+n*.023,dark);box(.005,.005,.012,side*.036,-.018,-.372+n*.023,edge);}
  // Side Picatinny rail sections near the front of the handguard.
  for(let n=0;n<5;n++)box(.005,.012,.005,side*.037,-.002,-.385+n*.010,edge);
  // Muzzle brake gill vents and standoff crown teeth.
  for(let n=0;n<3;n++)box(.004,.022,.007,side*.019,.006,-.529+n*.011,dark);
  for(const z of [-.167,-.082,.032])part(new Ys(.004,.004,.003,12),side*.034,.005,z,edge,body,[0,0,Math.PI/2]);
 }
 for(let n=0;n<6;n++){const a=n*Math.PI/3;box(.0038,.0038,.008,Math.cos(a)*.0175,.006+Math.sin(a)*.0175,-.546,edge,body,[0,0,a]);}
 // Continuous optic rail and heavy folding ghost-ring iron sights with fiber-optic front post.
 box(.032,.010,.351,0,.051,-.139,dark);
 for(let n=0;n<29;n++)box(.042,.006,.006,0,.058,.023-n*.012,edge);
 box(.038,.008,.026,0,.065,.007,dark);box(.007,.017,.019,-.0135,.074,.007,dark);box(.007,.017,.019,.0135,.074,.007,dark);
 part(new Ys(.0055,.0055,.046,12),0,.066,.007,edge,body,[0,0,Math.PI/2]);
 ring(.0068,.0016,0,.076,.007,steel);box(.005,.008,.005,0,.066,.007,steel);
 box(.003,.003,.001,-.0135,.078,.017,sight);box(.003,.003,.001,.0135,.078,.017,sight);
 box(.036,.008,.024,0,.064,-.307,dark);box(.006,.015,.011,0,.071,-.307,dark);
 part(new Ys(.0018,.0018,.012,10),0,.077,-.305,fiber,body,[Math.PI/2,0,0]);box(.003,.004,.002,0,.077,-.299,sight);
 for(const side of [-1,1])box(.004,.024,.016,side*.016,.073,-.307,steel);
 // Adjustable skeleton stock, cheek riser, folding hinge knuckle, shoulder pad, angled pistol grip and open guard.
 box(.044,.048,.026,0,.002,.068,steel);part(new Ys(.006,.006,.052,12),-.022,.002,.068,edge);
 box(.035,.031,.160,0,-.001,.139,dark);box(.055,.025,.114,0,.017,.158,polymer);box(.058,.007,.104,0,.031,.158,rubber);
 box(.055,.018,.108,0,-.053,.161,polymer,body,[-.12,0,0]);
 box(.060,.103,.025,0,-.021,.218,polymer);box(.063,.105,.014,0,-.021,.235,rubber);
 for(let n=0;n<8;n++)box(.064,.002,.002,0,-.060+n*.011,.242,polymer);
 box(.039,.104,.050,0,-.101,.034,polymer,body,[-.24,0,0]);box(.041,.077,.041,0,-.104,.039,rubber,body,[-.24,0,0]);
 for(const side of [-1,1])for(let n=0;n<6;n++)box(.003,.003,.033,side*.021,-.078-n*.009,.036,polymer);
 box(.006,.007,.064,-.022,-.084,-.018,dark);box(.006,.007,.064,.022,-.084,-.018,dark);box(.044,.039,.007,0,-.066,-.047,dark);
 box(.007,.027,.008,0,-.064,-.012,edge,body,[-.23,0,0]);box(.012,.007,.028,-.039,-.006,.003,dark,body,[0,0,-.25]);
 // Broad ten-shell box magazine with waffle ribs, witness window showing red 12GA shells & brass rims, feed lips and base plate.
 box(.048,.142,.074,0,-.010,0,dark,magazine);box(.056,.014,.084,0,-.085,.004,polymer,magazine);box(.058,.006,.086,0,-.092,.004,rubber,magazine);
 for(const side of [-1,1]){
  box(.005,.120,.068,side*.024,-.009,0,polymer,magazine);
  for(let n=0;n<4;n++)box(.002,.101,.004,side*.027,-.009,-.025+n*.016,edge,magazine);
  for(let n=0;n<5;n++)box(.0025,.004,.058,side*.0265,-.052+n*.022,0,dark,magazine);
  box(.003,.012,.068,side*.021,.065,0,steel,magazine);
  // Witness slot with stacked red 12GA hulls and brass heads visible inside.
  box(.002,.076,.016,side*.0262,-.008,.012,dark,magazine);
  for(let s=0;s<4;s++){
   const sy=.020-s*.018;
   part(new Ys(.0065,.0065,.022,12),side*.0258,sy,.008,shellRed,magazine,[Math.PI/2,0,0]);
   part(new Ys(.0068,.0068,.006,12),side*.0258,sy,.021,brass,magazine,[Math.PI/2,0,0]);
  }
 }
 // Top shell sitting in the magazine feed lips.
 part(new Ys(.0082,.0082,.046,16),0,.066,-.004,shellRed,magazine,[Math.PI/2,0,0]);
 part(new Ys(.0088,.0088,.010,16),0,.066,.023,brass,magazine,[Math.PI/2,0,0]);
 for(let n=0;n<5;n++)box(.043,.004,.002,0,.034-n*.022,.038,edge,magazine);
 // Merge stationary meshes within each animated assembly to keep draw calls low.
 for(const parent of [body,bolt,magazine]){const batches=new Map;for(const mesh of [...parent.children]){if(!mesh.isMesh)continue;mesh.updateMatrix();const geo=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();geo.applyMatrix4(mesh.matrix);if(!batches.has(mesh.material))batches.set(mesh.material,[]);batches.get(mesh.material).push(geo);parent.remove(mesh);mesh.geometry.dispose();}for(const [mat,geos]of batches){parent.add(new Qe(sa(geos,false),mat));geos.forEach(g=>g.dispose());}}
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#c3c8ad';ctx.font='700 100px monospace';ctx.fillText('A-12',20,110);ctx.font='26px monospace';ctx.fillText('AUTO / 12 GA',22,164);ctx.fillStyle='#b49a60';ctx.fillRect(22,192,310,6);
 const marking=new Qt({map:new xs(canvas),transparent:true,roughness:.7,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});marking.map.colorSpace=Vn;
 for(const side of [-1,1]){const label=new Qe(new rn(.069,.0345),marking);label.position.set(side*.0332,.006,.017);label.rotation.y=side*Math.PI/2;body.add(label);}
 const glove=i.mats.get('glove_fabric',{triplanar:true,vertexColors:true,scale:3});
 const local=(q,v,mirror=false)=>{const d=new W(...v).normalize().applyQuaternion(q.clone().invert());if(mirror)d.x*=-1;return d.toArray();};
 const rq=i0(-.24,0,0).multiply(i0(0,0,-Math.PI/2));
 const rh=Vv({mirror:false,fingers:[null,[.62,1.72,.8,0],[.68,1.7,.8,-.03],[.74,1.66,.8,-.09]],indexPoses:[[.1,.16,.1,.05],[.46,1.15,.5,0]],thumb:[local(rq,[-.85,.05,-.5]),local(rq,[-.6,-.05,-.8]),local(rq,[-.05,-.2,-.97])],forearm:local(rq,[.27,-.44,.86]),sleeve:.34});
 const right=new wt;right.quaternion.copy(rq);right.position.copy(new W(0,-.101,.034).sub(new W(.006,-.031,-.085).applyQuaternion(rq)));right.add(new Qe(rh.fabric,glove),new Qe(rh.index[1],glove));root.add(right);
 const lq=i0(0,0,Math.PI/2).multiply(i0(.06,0,0));
 const lh=Vv({mirror:true,fingers:[[1.27,1.42,.75,.02],[1.3,1.45,.75,0],[1.3,1.45,.75,-.02],[1.33,1.45,.75,-.05]],thumb:[local(lq,[0,.25,-.97],true),local(lq,[.05,.1,-.99],true),local(lq,[0,0,-1],true)],forearm:local(lq,[-.5,-.35,.79],true),sleeve:.34});
 const left=new wt,leftHome=new W(-.015,-.053,-.300).sub(new W(0,-.015,-.055).applyQuaternion(lq));left.quaternion.copy(lq);left.position.copy(leftHome);left.add(new Qe(lh.fabric,glove));root.add(left);
 const flash=N_();flash.position.set(0,.006,-.542);flash.visible=false;root.add(flash);
 root.traverse(o=>{o.layers.set(zc);if(o.isMesh){o.frustumCulled=false;o.receiveShadow=true;o.castShadow=false;}});
 const info={meshes:0,tris:0};root.traverse(o=>{if(o.isMesh){info.meshes++;info.tris+=Kc(o.geometry);}});
 let visible=false,time=0,cool=0,reload=0,reloadPhases=0,recoil=0,shotAge=1,flashTime=0,swayX=0,swayY=0,dryHeld=false;
 const origin=new W,dir=new W,muzzle=new W,end=new W,velocity=new W,handTarget=new W;
 const w={name:'A-12 · AUTO SHOTGUN',ammo:10,magSize:10,reserve:50,damage:14,rpm:60/.28,ads:0,spread:.075,state:'idle',root,info,
  debug:{get boltOffset(){return bolt.position.z;},get magazineDrop(){return magHome.y-magazine.position.y;},get cooldown(){return cool;},get reloadRemaining(){return reload;}},
  setVisible(value){visible=!!value;root.visible=visible;if(!visible){w.ads=0;flashTime=0;flash.visible=false;dryHeld=false;}},
  reset(){w.ammo=10;w.reserve=50;w.ads=0;w.spread=.075;w.state='idle';cool=reload=recoil=flashTime=0;reloadPhases=0;dryHeld=false;shotAge=1;bolt.position.z=0;magazine.position.copy(magHome);magazine.visible=true;left.position.copy(leftHome);left.quaternion.copy(lq);flash.visible=false;},
  addAmmo(n){if(Number.isFinite(n)&&n>0)w.reserve+=Math.floor(n);},snap(){w.ads=i.input.ads?1:0;},
  muzzleWorld(out=new W){return viewPoint(0,.006,-.542,out);},
  reloadNow(){if(reload||cool>0||w.ammo>=10||w.reserve<=0)return false;reload=2.4;reloadPhases=0;w.ads=0;w.state='reloading';i.events.emit('weapon:reload',{phase:'start',weapon:'autoshotgun'});return true;},
  update(dt){
   const p=i.player,input=i.input;if(!visible||!p?.alive){flash.visible=false;return;}if(!Number.isFinite(dt)||dt<0)return;time+=dt;shotAge+=dt;
   const oldCool=cool;cool=Math.max(0,cool-dt);recoil=Math.max(0,recoil-dt*5);flashTime=Math.max(0,flashTime-dt);if(!input.fire)dryHeld=false;
   let reloadStep=dt;if(input.pressed('reload'))w.reloadNow();
   if(w.ammo===0&&w.reserve>0&&!reload&&cool===0){w.reloadNow();reloadStep=Math.max(0,dt-oldCool);}
   let reloadAge=0;
   if(reload>0){reload=Math.max(0,reload-reloadStep);reloadAge=2.4-reload;
    for(const [phase,at,bit]of [['magout',.28,1],['magin',1.65,2],['bolt',2.05,4]])if(reloadAge>=at&&!(reloadPhases&bit)){reloadPhases|=bit;i.events.emit('weapon:reload',{phase,weapon:'autoshotgun'});}
    if(reload===0){const amount=Math.min(10-w.ammo,w.reserve);w.ammo+=amount;w.reserve-=amount;i.events.emit('weapon:reload',{phase:'done',weapon:'autoshotgun'});}
   }
   const aim=input.ads&&!reload&&!p.sprinting;w.ads=Zn(w.ads+(aim?dt:-dt)/.22,0,1);w.spread=bi(.075,.050,w.ads)+(p.speed||0)*.002+(p.onGround===false?.015:0);
   // Preserve sub-frame cooldown remainder, but never emit a backlog burst after a slow frame.
   if(input.fire&&!reload&&cool===0&&!p.sprinting){if(w.ammo===0){if(!dryHeld)i.events.emit('weapon:dry',{weapon:'autoshotgun'});dryHeld=true;}else fire(oldCool>0?Math.min(.12,Math.max(0,dt-oldCool)):0);}
   w.state=reload?'reloading':cool>0?'cycling':'idle';
   const cycle=shotAge<.16?Math.sin(Math.PI*Zn(shotAge/.16,0,1))*.067:0;bolt.position.z=w.ammo===0&&(!reload||reloadAge<2.05)?Math.max(cycle,.055*Zn(shotAge/.07,0,1)):cycle;
   const drop=reload?(reloadAge<.8?Yo((reloadAge-.25)/.45):1-Yo((reloadAge-1.28)/.42))*.25:0;
   magazine.position.copy(magHome);magazine.position.y-=drop;magazine.position.z+=drop*.12;magazine.visible=!(reload&&reloadAge>.88&&reloadAge<1.14);
   const reach=reload?Yo(reloadAge/.26)*(1-Yo((reloadAge-1.82)/.40)):0;left.position.copy(leftHome).lerp(handTarget.set(-.035,magHome.y-.025-drop,magHome.z+.025),reach);left.quaternion.copy(lq).multiply(i0(0,-reach*.28,reach*.45));
   const u=flash.material.uniforms;u.uInt.value=flashTime/.055*11;u.uHeat.value=0;flash.visible=flashTime>0;
   swayX=kn(swayX,Zn(input.look?.dx||0,-.08,.08),12,dt);swayY=kn(swayY,Zn(input.look?.dy||0,-.06,.06),12,dt);
   const walk=Math.min(1,(p.speed||0)/4)*(1-w.ads),bob=Math.sin(time*(p.sprinting?12:8));
   root.position.set(bi(.126,0,w.ads)+bob*.002*walk,bi(-.143,-.079,w.ads)+Math.sin(time*1.5)*.0008-reach*.025,-.31+recoil*.050);
   root.rotation.set(recoil*.065+swayY*.35+reach*.07,swayX*.30,-reach*.22+bob*.007*walk);root.visible=visible;
  }
 };
 function viewPoint(x,y,z,out){root.updateMatrix();out.set(x,y,z).applyMatrix4(root.matrix);const ratio=Math.tan(i.camera.fov*Math.PI/360)/Math.tan(i.viewCamera.fov*Math.PI/360);out.x*=ratio;out.y*=ratio;return out.applyQuaternion(i.camera.quaternion).add(i.camera.position);}
 function fire(overshoot){
  const p=i.player;w.ammo--;cool=.28-overshoot;recoil=1;shotAge=0;flashTime=.055;origin.copy(p.eye||i.camera.position);w.muzzleWorld(muzzle);
  let anyHit=false;const stats=i.combat.stats;if(stats)stats.shots++;const turn=Math.random()*Math.PI*2;
  for(let pellet=0;pellet<8;pellet++){
   const angle=turn+pellet*2.399963,spread=pellet===0?0:w.spread*Math.sqrt(pellet/7)*(.9+Math.random()*.2);
   dir.set(Math.cos(angle)*spread,Math.sin(angle)*spread,-1).normalize().applyQuaternion(i.camera.quaternion);
   const wall=i.physics.raycast(origin,dir,36),hit=i.enemies.raycast(origin,dir,wall?Math.min(36,wall.dist):36);let impact;
   if(hit){anyHit=true;const damage=14*bi(1,.18,Zn((hit.dist-7)/29,0,1)),weak=hit.part==='weak',killed=hit.enemy.damage(damage*(weak?1.5:1),hit.point,dir,hit.part)===true;
    impact={point:hit.point,normal:hit.normal||dir.clone().negate(),dist:hit.dist,surface:'enemy',enemy:hit.enemy,part:hit.part,dir:dir.clone(),from:'player',killed};i.events.emit('impact',impact);i.events.emit('player:hitEnemy',{enemy:hit.enemy,part:hit.part,killed,weak});
   }else if(wall){impact={point:wall.point,normal:wall.normal,dist:wall.dist,surface:wall.surface,enemy:null,dir:dir.clone(),from:'player'};i.events.emit('impact',impact);}
   if(pellet<3){end.copy(impact?impact.point:origin).addScaledVector(dir,impact?0:36);i.fx?.tracer?.(muzzle,end);}
  }
  if(anyHit&&stats)stats.hits++;
  viewPoint(.038,.015,-.065,muzzle);velocity.set(2.6,1.5,.5).applyQuaternion(i.camera.quaternion);i.fx?.shell?.(muzzle,velocity);w.muzzleWorld(muzzle);
  dir.set(0,0,-1).applyQuaternion(i.camera.quaternion);i.events.emit('weapon:fire',{weapon:'autoshotgun',origin,dir,muzzle,ads:w.ads});i.render?.lightPool?.flash(muzzle,16756832,65,9,.055);
  flash.material.uniforms.uSeed.value=Math.random()*100;flash.material.uniforms.uJet.value=.7;p.addRecoil?.(.032,(Math.random()-.5)*.006);p.addShake?.(.25);
 }
 w.reset();root.visible=false;return w;
}
return {SALT_AUTO_SHOTGUN};
}
