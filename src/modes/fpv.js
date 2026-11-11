// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({He,In,Nn,Qe,Qt,Sn,W,Wi,Ys,Zn,nt,wt,zc}){
function SALT_FPV_PLAYER(i,p){
 const foot={reset:p.reset,update:p.update,damage:p.damage,addShake:p.addShake,addRecoil:p.addRecoil};
 const center=new W,delta=new W,normal=new W,target=new W,rotation=new In(0,0,0,'YXZ');
 const radius=.36,eyeOffset=.8,maxAltitude=20;
 let bank=0,shake=0,hurt=0,sinceHit=99,time=0;
 const active=()=>i.game?.mission?.pilot==='fpv';
 const running=()=>active()&&p.enabled&&p.alive&&i.game?.state==='playing';
 const overlay=document.createElement('div');overlay.className='fpv-flight-hud';overlay.hidden=true;
 overlay.innerHTML='<div class="fpv-top"><b>FPV / LIVE FEED</b><span data-flight>STABILIZED</span></div><div class="fpv-horizon"><i></i><b>+</b><i></i></div><div class="fpv-bottom"><span>ALT <b data-alt>0.0</b> m</span><span>SPD <b data-speed>0</b> m/s</span><span data-signal>LINK STABLE</span></div><div class="fpv-help">WASD FLY · SPACE UP · Z / C DOWN · SHIFT BOOST · MOUSE AIM</div>';
 (document.getElementById('ui')||document.body).appendChild(overlay);
 // Paused/title frames skip player.update; state events must hide telemetry immediately.
 i.events.on('game:state',event=>{overlay.hidden=event.state!=='playing'||!active()||!p.alive;});
 if(!document.getElementById('fpv-flight-style')){const style=document.createElement('style');style.id='fpv-flight-style';style.textContent='.fpv-flight-hud{position:absolute;inset:14% 12% 18%;pointer-events:none;color:#c8f4de;font:11px monospace;letter-spacing:1.5px;text-shadow:0 1px 3px #061812;z-index:5}.fpv-flight-hud[hidden]{display:none}.fpv-top,.fpv-bottom{display:flex;justify-content:space-between;gap:12px}.fpv-top{border-top:1px solid #b8f7dc66;padding-top:9px}.fpv-bottom{position:absolute;bottom:12px;left:0;right:0;border-bottom:1px solid #b8f7dc66;padding-bottom:9px}.fpv-horizon{position:absolute;top:48%;left:28%;right:28%;display:flex;align-items:center;gap:18px;opacity:.65}.fpv-horizon i{height:8px;flex:1;border-top:1px solid;border-left:1px solid}.fpv-horizon i:last-child{border-left:0;border-right:1px solid}.fpv-horizon b{font-size:18px;font-weight:400}.fpv-help{position:absolute;bottom:-15px;left:0;right:0;text-align:center;font-size:9px;opacity:.8}@media(max-width:700px){.fpv-flight-hud{inset:19% 7% 25%;font-size:9px}.fpv-help{display:none}}';document.head.appendChild(style);}
 const altitudeNode=overlay.querySelector('[data-alt]'),speedNode=overlay.querySelector('[data-speed]'),flightNode=overlay.querySelector('[data-flight]'),horizon=overlay.querySelector('.fpv-horizon');
 p.fpvCenter=center;p.fpvAltitude=0;p.fpvBank=0;p.fpvMaxAltitude=maxAltitude;
 function pose(dt=0){
  center.copy(p.pos);center.y+=eyeOffset;p.eye.copy(center);
  rotation.set(p.pitch,p.yaw,0,'YXZ');p.forward.set(0,0,-1).applyEuler(rotation);
  const jitter=shake*shake*.012;
  i.camera.position.copy(center);i.camera.rotation.set(p.pitch+Math.sin(time*37)*jitter,p.yaw+Math.sin(time*43)*jitter,bank,'YXZ');
  const fov=p.baseFov+(p.sprinting?6:0),next=dt?i.camera.fov+(fov-i.camera.fov)*(1-Math.exp(-7*dt)):fov;
  if(Math.abs(i.camera.fov-next)>.01){i.camera.fov=next;i.camera.updateProjectionMatrix();}
  p.fpvAltitude=center.y;p.fpvBank=bank;p.hurtPulse=hurt;
  if(i.render?.post){i.render.post.damage=hurt;i.render.post.lowHealth=Math.max(0,(.5-p.health/p.maxHealth)*1.7);i.render.post.ads=0;}
  altitudeNode.textContent=center.y.toFixed(1);speedNode.textContent=p.speed.toFixed(1);flightNode.textContent=p.sprinting?'BOOST':'STABILIZED';horizon.style.transform='rotate('+(-bank*180/Math.PI).toFixed(1)+'deg)';
 }
 // Sweep the hull against Minkowski-expanded boxes. This includes playerOnly
 // barriers and avoids point-ray corner gaps, even when boosting at low FPS.
 function sweep(){
  let fraction=1,hit=false;normal.set(0,0,0);
  for(const b of i.physics.boxes||[]){
   if(b.bulletOnly)continue;
   let near=0,far=1,axis=-1,sign=0,miss=false;
   for(let a=0;a<3;a++){
    const v=delta.getComponent(a),o=center.getComponent(a),lo=b.min.getComponent(a)-radius,hi=b.max.getComponent(a)+radius;
    if(Math.abs(v)<1e-9){if(o<lo||o>hi){miss=true;break;}continue;}
    let enter=(lo-o)/v,leave=(hi-o)/v,s=-1;if(enter>leave){const temp=enter;enter=leave;leave=temp;s=1;}
    if(enter>=near){near=enter;axis=a;sign=s;}far=Math.min(far,leave);if(near>far){miss=true;break;}
   }
   if(!miss&&axis>=0&&near>=0&&near<fraction&&far>=0){fraction=near;normal.set(0,0,0).setComponent(axis,sign);hit=true;}
  }
  // Terrain/water plane comes from the level raycaster. Boxes are already swept.
  if(delta.y<0){target.set(0,-1,0);const floor=i.physics.raycast(center,target,-delta.y+radius+.01);if(floor&&!floor.box){const f=(floor.dist-radius)/-delta.y;if(f>=0&&f<fraction){fraction=f;normal.set(0,1,0);hit=true;}}}
  center.addScaledVector(delta,Math.max(0,fraction-(hit?.001/Math.max(.001,delta.length()):0)));
  if(hit){const into=p.vel.dot(normal);if(into<0)p.vel.addScaledVector(normal,-into);}
  return hit;
 }
 p.reset=function(spawn){
  foot.reset.call(p,spawn);bank=shake=hurt=time=0;sinceHit=99;p.fpv=active();overlay.hidden=true;
  if(!active())return;
  p.pos.y+=3;p.pos.y-=eyeOffset;p.onGround=false;p.crouching=false;p.ads=0;
  // Lift an unusual spawn clear of any roof intersecting the launch hull.
  center.copy(p.pos);center.y+=eyeOffset;
  for(let attempt=0;attempt<8;attempt++){let clear=true;for(const b of i.physics.boxes||[]){if(b.bulletOnly)continue;if(center.x>b.min.x-radius&&center.x<b.max.x+radius&&center.z>b.min.z-radius&&center.z<b.max.z+radius&&center.y>b.min.y-radius&&center.y<b.max.y+radius){center.y=b.max.y+radius+.04;clear=false;}}if(clear)break;}
  p.pos.y=Math.min(maxAltitude,center.y)-eyeOffset;p.lastSafe.copy(p.pos);pose();
 };
 p.damage=function(amount,from){const before=p.health;foot.damage.call(p,amount,from);if(active()&&p.health<before){sinceHit=0;hurt=Math.min(1,hurt+.4+(before-p.health)/50);}};
 p.addShake=function(amount=.3){if(active())shake=Math.min(1,shake+amount);else foot.addShake.call(p,amount);};
 p.addRecoil=function(pitch=0,yaw=0){if(active())shake=Math.min(1,shake+Math.abs(pitch)*2);else foot.addRecoil.call(p,pitch,yaw);};
 p.update=function(dt){
  if(!active()){overlay.hidden=true;p.fpv=false;return foot.update.call(p,dt);}
  p.fpv=true;overlay.hidden=i.game?.state!=='playing'||!p.alive;
  if(!running())return;
  dt=Math.max(0,Math.min(.1,dt));time+=dt;sinceHit+=dt;shake=Math.max(0,shake-dt*2);hurt=Math.max(0,hurt-dt*1.9);
  const input=i.input; p.yaw-=input.look.dx;p.pitch=Math.max(-1.35,Math.min(1.35,p.pitch-input.look.dy));p.yaw%=Math.PI*2;
  const x=input.move.x,y=input.move.y,up=input.down?.('jump')?1:0,down=(input.crouch||input.down?.('crouch')||input.fpvDescend)?1:0;
  p.sprinting=!!input.sprint&&(Math.abs(x)+Math.abs(y)+up+down>0);const speed=p.sprinting?14:8.5;
  const scale=Math.max(1,Math.hypot(x,y));const sy=Math.sin(p.yaw),cy=Math.cos(p.yaw);
  target.set((x*cy-y*sy)/scale*speed,(up-down)*(p.sprinting?8:5.5),(-x*sy-y*cy)/scale*speed);
  p.vel.lerp(target,1-Math.exp(-6*dt));center.copy(p.pos);center.y+=eyeOffset;
  // Small substeps allow stable wall sliding after a swept contact.
  const steps=Math.max(1,Math.ceil(dt/.016));for(let step=0;step<steps;step++){delta.copy(p.vel).multiplyScalar(dt/steps);sweep();}
  const bounds=i.physics.bounds;if(bounds){for(const a of ['x','z']){const clamped=Math.max(bounds.min[a]+radius,Math.min(bounds.max[a]-radius,center[a]));if(clamped!==center[a])p.vel[a]=0;center[a]=clamped;}}
  if(center.y>maxAltitude){center.y=maxAltitude;p.vel.y=Math.min(0,p.vel.y);}if(center.y<radius){center.y=radius;p.vel.y=Math.max(0,p.vel.y);}
  p.pos.copy(center);p.pos.y-=eyeOffset;p.speed=p.vel.length();p.onGround=false;p.crouching=false;p.ads=0;p.lookScale=1;p.lastSafe.copy(p.pos);
  bank+=(Math.max(-.18,Math.min(.18,-(p.vel.x*cy-p.vel.z*sy)*.016))-bank)*(1-Math.exp(-7*dt));
  if(sinceHit>6&&p.health<p.maxHealth)p.health=Math.min(p.maxHealth,p.health+3*dt);pose(dt);
 };
 return p;
}

function SALT_FPV_WEAPON(i){
 const root=new wt;root.name='viewmodel-fpv-pulse';i.camera.add(root);
 const hull=new Qt({color:0x172b30,roughness:.48,metalness:.65}),edge=new Qt({color:0x78dcc0,emissive:0x1f6752,emissiveIntensity:.45,roughness:.4,metalness:.5});
 function part(w,h,d,x,y,z,mat){const mesh=new Qe(Wi(w,h,d,.008),mat);mesh.position.set(x,y,z);root.add(mesh);return mesh;}
 for(const side of [-1,1]){part(.095,.07,.28,side*.29,-.22,-.38,hull);part(.018,.012,.17,side*.29,-.178,-.40,edge);part(.19,.028,.07,side*.20,-.24,-.26,hull);}
 part(.14,.055,.16,0,-.25,-.35,hull);const lens=part(.068,.016,.012,0,-.225,-.435,edge);
 root.traverse(o=>{o.layers.set(zc);if(o.isMesh){o.frustumCulled=false;o.castShadow=false;}});
 const origin=new W,dir=new W,muzzle=new W,end=new W;
 let visible=false,cool=0,reload=0,time=0;
 const w={name:'FPV · PULSE PROJECTOR',ammo:24,magSize:24,reserve:Infinity,damage:38,rpm:360,ads:0,spread:0,state:'idle',root,info:{meshes:8,tris:0},debug:{fictional:true},
  setVisible(value){visible=!!value;root.visible=visible;w.ads=0;},
  reset(){w.ammo=24;w.reserve=Infinity;w.state='idle';w.ads=0;cool=reload=0;},
  addAmmo(){},snap(){w.ads=0;},setWetness(){},
  muzzleWorld(out=new W){return out.copy(i.player.eye).addScaledVector(i.player.forward,.25);},
  reloadNow(){if(reload||w.ammo===w.magSize)return false;reload=1.25;w.state='reloading';i.events.emit('weapon:reload',{phase:'start',weapon:'pistol'});return true;},
  update(dt){
   const p=i.player,input=i.input;root.visible=visible;
   if(!visible||!p?.alive||!p.enabled||i.game?.state!=='playing')return;
   dt=Math.min(.1,Math.max(0,dt));time+=dt;cool=Math.max(0,cool-dt);
   if(input.pressed('reload'))w.reloadNow();
   if(reload){reload=Math.max(0,reload-dt);if(!reload){w.ammo=w.magSize;i.events.emit('weapon:reload',{phase:'done',weapon:'pistol'});}}
   if(!reload&&w.ammo===0)w.reloadNow();
   if(input.fire&&!reload&&cool===0){
    w.ammo--;cool=1/6;origin.copy(p.eye);dir.copy(p.forward).normalize();w.muzzleWorld(muzzle);
    const impact=i.combat.playerShot(origin,dir,{damage:w.damage,range:110,impulse:.7});
    end.copy(impact?impact.point:origin);if(!impact)end.addScaledVector(dir,110);i.fx?.tracer?.(muzzle,end);
    i.events.emit('weapon:fire',{weapon:'pistol',origin:origin.clone(),dir:dir.clone(),muzzle:muzzle.clone(),ads:0});i.render?.lightPool?.flash(muzzle,0x91ffe2,22,5,.05);p.addShake?.(.09);
    if(w.ammo===0)w.reloadNow();
   }
   w.state=reload?'reloading':cool>0?'cycling':'idle';lens.material.emissiveIntensity=reload?.15:.45+Math.max(0,cool-.12)*18;
   root.position.y=Math.sin(time*7)*.002;root.rotation.z=-p.fpvBank*.15;
  }
 };
 w.setVisible(false);return w;
}

function SALT_RADAR(i){
 const root=new wt;root.name='radar-network';i.scene.add(root);root.visible=false;
 const solid=new Qt({color:0x404b4e,roughness:.76,metalness:.45}),lit=new Nn({color:0xff703e}),beam=new Nn({color:0xff713e,transparent:true,opacity:.075,side:Sn,depthWrite:false});
 const source=i.level.radarSites||[[-16,0,26],[14,0,-24],[27,0,11.6]],nodes=[];
 for(let n=0;n<source.length;n++){
  const pos=source[n].isVector3?source[n].clone():new W(...source[n]),group=new wt,sweep=new wt;group.position.copy(pos);root.add(group);group.add(sweep);
  const base=new Qe(new Ys(.65,.85,.25,12),solid);base.position.y=.13;group.add(base);
  const mast=new Qe(new Ys(.10,.14,3.4,10),solid);mast.position.y=1.8;group.add(mast);
  const antenna=new Qe(Wi(1.4,.65,.13,.03),solid);antenna.position.y=3.6;sweep.add(antenna);
  const lamp=new Qe(new Ys(.12,.12,.22,8),lit);lamp.position.y=4;group.add(lamp);
  const verts=[0,.04,0],radius=23,half=.48;
  for(let step=0;step<=24;step++){const a=-half+step/24*half*2;verts.push(Math.sin(a)*radius,.04,Math.cos(a)*radius);}
  const indices=[];for(let step=1;step<=24;step++)indices.push(0,step,step+1);
  const geo=new nt;geo.setAttribute('position',new He(new Float32Array(verts),3));geo.setIndex(indices);geo.computeVertexNormals();
  sweep.add(new Qe(geo,beam));nodes.push({pos,group,sweep,radius,half,angle:n*2.1,rate:.42+n*.035});
 }
 const status=document.createElement('div');status.className='radar-status';status.style.cssText='position:absolute;right:18px;top:165px;width:220px;max-width:42vw;padding:10px;background:#10181be8;color:#ffb994;border:1px solid #ff713e88;font:11px monospace;pointer-events:none';status.innerHTML='<b>RADAR CLEAR</b><div style="height:5px;background:#453630;margin-top:8px"><i style="display:block;height:100%;background:#ff713e;width:0"></i></div><small style="display:block;margin-top:6px">Break contact behind solid cover</small>';document.getElementById('ui').appendChild(status);status.hidden=true;
 let exposure=0,detections=0,scanned=false,cool=0;const sensor=new W;
 function paint(){status.querySelector('b').textContent=scanned?'RADAR SCANNED · '+Math.round(exposure*100)+'%':exposure>.02?'SIGNAL CLEARING · '+Math.round(exposure*100)+'%':'RADAR CLEAR';status.querySelector('i').style.width=(exposure*100)+'%';}
 return{root,nodes,get exposure(){return exposure},get detections(){return detections},get scanned(){return scanned},reset(){exposure=0;detections=0;scanned=false;cool=0;nodes.forEach((node,n)=>node.angle=n*2.1);paint();},update(dt){
  const active=!!i.game?.mission?.radar&&i.game.state==='playing';root.visible=active;status.hidden=!active;if(!active)return;
  dt=Math.min(Math.max(dt,0),.25);scanned=false;cool=Math.max(0,cool-dt);
  for(const node of nodes){node.angle+=dt*node.rate;node.sweep.rotation.y=node.angle;const dx=i.player.eye.x-node.pos.x,dz=i.player.eye.z-node.pos.z,d=Math.hypot(dx,dz);if(d>.5&&d<node.radius&&(dx*Math.sin(node.angle)+dz*Math.cos(node.angle))/d>Math.cos(node.half)){
   sensor.copy(node.pos);sensor.y+=3.7;if(i.physics.lineOfSight(sensor,i.player.eye))scanned=true;
  }}
  exposure=Zn(exposure+dt*(scanned?1/3:-.48),0,1);
  if(exposure>=1&&cool===0){detections++;exposure=.55;cool=2;i.player.damage(40,nodes[0].pos);i.hud.warn?.('RADAR LOCK — SIGNAL DAMAGE',2.5);i.audio.play?.('soldier_alert',{gain:.55});}
  paint();
 }};
}
return {SALT_FPV_PLAYER,SALT_FPV_WEAPON,SALT_RADAR};
}
