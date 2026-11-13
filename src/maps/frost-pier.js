// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({$a,By,Is,Qe,Qt,SALT_MAPS,Vn,Vy,dR,lt,mt,ob,pR,rb,rn,ts,wt,xs}){
function frostMaterials(i){
 const names={concrete:'concrete',concreteDark:'concrete',wall:'corrugated_roof',rust:'steel_dark',steel:'steel_dark',painted:'paint_blue',crate:'wood_pallet',galv:'steel_galv',brushed:'steel_galv',hazard:'hazard_stripes',asphalt:'asphalt'};
 return Object.fromEntries([...Object.entries(names).map(([key,name])=>[key,i.mats.get(name)]),['label',i.mats.label.bind(i.mats)],['emissive',(color,intensity)=>new Qt({color,emissive:color,emissiveIntensity:intensity})]]);
}
function SALT_FROST_PIER(i){
 const root=new wt;root.name='level-frost-pier';i.scene.add(root);const b=ob(i);
 const steel=b.M('steel_dark'),white=b.M('paint_white'),concrete=b.M('concrete'),ice=new Qt({color:0x8bbed0,roughness:.3,metalness:.18}),blue=new Qt({color:0x324e65,roughness:.9});
 const solid=(mat,x,y,z,w,h,d,surface='concrete')=>{b.box(mat,w,h,d,x,y,z);b.col(x-w/2,y-h/2,z-d/2,x+w/2,y+h/2,z+d/2,surface);};
 // A frozen canal bisects the station. Only two yellow steel bridges cross it.
 b.slab(ice,-5,.035,-28,3,.055,26);
 for(const x of [-5.2,3.2])for(const [z,d] of [[-21,14],[2.5,25],[22.5,7]])solid(blue,x,.55,z,.45,1.1,d,'metal');
 for(const z of [-12,17]){
  b.slab('diamond_plate',-5.5,.04,z-2,3.5,.08,z+2);b.label('ICE CHANNEL / CROSSING',.23,-1,.1,z,'y+',{color:'yellow'});
  for(const side of [-1,1]){solid(steel,-1,.55,z+side*2.15,9,1.1,.18,'metal');for(let x=-5;x<=3;x+=2)b.box('paint_yellow',.14,1.1,.22,x,.55,z+side*2.15);}
 }
 for(const x of [-38,29])solid(concrete,x,1.1,-1,1,2.2,56);for(const z of [-29,27])solid(concrete,-4.5,1.1,z,68,2.2,1);
 // Three radomes form a northern listening array, rather than a warehouse.
 for(const [x,z,r] of [[-28,-19,4.2],[-15,-22,3.1],[16,-20,5]]){
  solid(blue,x,1.8,z,r*1.6,3.6,r*1.6);const dome=new Qe(new lt.SphereGeometry(r,16,10,0,Math.PI*2,0,Math.PI/2),white);dome.position.set(x,3.6,z);b.staticRoot.add(dome);
  b.cyl(steel,.09,4,x,6.6+r,z);b.label('POLAR / LISTENING ARRAY',.24,x,2.4,z+r*.8+.03,'z+',{color:'white'});
 }
 // West crescent: dispersed instrument huts around an open circular antenna court.
 for(const [x,z,yaw] of [[-30,2,0],[-25,17,.4],[-13,6,-.4]]){
  const hut=b.place('guard_booth',x,z,yaw);hut.name='polar-instrument-hut';
  b.place('generator',x+3,z+2,0);b.place('cable_reel',x-2,z-2,0);
 }
 for(const [x,z] of [[-27,-7],[-18,-9],[-21,0]]){b.cyl(steel,.12,10,x,5,z);for(const y of [6,8,10])b.box(white,3,.12,.12,x,y,z);}
 // East peninsula: staggered vertical cryo tanks, a covered pipe spine and a small control room.
 for(const [x,z] of [[10,-3],[20,1],[11,8],[22,11]]){b.cyl('steel_galv',2.1,6,x,3,z,{seg:14});b.col(x-2.1,0,z-2.1,x+2.1,6,z+2.1,'metal');b.cyl(blue,2.18,.5,x,5.5,z,{seg:14});}
 for(const z of [-7,6,18]){b.cyl(steel,.12,5.5,6,2.75,z);b.cyl(steel,.12,5.5,26,2.75,z);b.rod(white,[6,5.5,z],[26,5.5,z],.18);}
 solid(blue,17,1.8,22,9,3.6,6);solid(white,17,3.75,22,10,.3,7);b.label('ICE CONTROL',.32,17,2.5,18.95,'z-',{color:'white'});
 for(const [x,z] of [[-34,-10],[-32,11],[-10,20],[7,12],[25,-11]])b.place('sandbags',x,z,0);
 for(const [x,z] of [[-34,-26],[25,-26],[-34,24],[26,24]])b.place('light_mast',x,z,0);
 const specs=[['relay_a','Relay A — Listening array','yard',-22,-16],['relay_b','Relay B — Instrument court','shed',-20,12],['relay_c','Relay C — Tank peninsula','quay',20,-9]];
 const objectives=specs.map(([id,label,zone,x,z])=>({id,label,zone,pos:mt(x,0,z),object:b.place('relay_node',x,z,0,{},0,{dynamic:true})}));
 b.label('ICE-01 / EVAC',.4,23,.04,-25,'y+',{color:'yellow'});
 const ground=[[-33,18,'yard'],[-34,5,'yard'],[-32,-6,'yard'],[-22,-15,'yard'],[-12,-12,'yard'],[-13,16,'shed'],[-20,12,'shed'],[-20,4,'shed'],[7,-12,'quay'],[23,-15,'quay'],[17,-9,'quay'],[19,6,'quay'],[8,17,'quay'],[25,19,'quay']];
 const enemySpawns=ground.map(([x,z,zone])=>({pos:mt(x,0,z),zone,type:'ground'}));for(const [x,z] of [[-30,12],[-20,-15],[-12,-3],[14,-15],[20,7],[8,20]])enemySpawns.push({pos:mt(x,10,z),zone:'yard',type:'air'});
 const merged=By(b.staticRoot);root.add(merged,b.dynRoot);const atlas=rb(root);
 return {root,map:SALT_MAPS.find(m=>m.id==='frostpier'),playerStart:{pos:mt(-33,0,23),yaw:.3},objectives,extraction:{pos:mt(23,0,-25),radius:2.5},enemySpawns,
  coverPoints:ground.map(([x,z])=>mt(x,0,z)),zones:[{name:'shed',min:[-29,3],max:[-10,21]},{name:'quay',min:[4,-29],max:[29,27]},{name:'yard',min:[-38,-29],max:[-5,27]}],
  interiorBoxes:[],skylights:[],shedLights:[],radarSites:[mt(-17,0,-10),mt(14,0,-12),mt(18,0,16)],flightBounds:{min:mt(-36,.7,-28),max:mt(28,23,26)},
  cinematicPath:[{pos:[-33,5,23],look:[-20,3,-15]},{pos:[-9,8,10],look:[-1,1,17]},{pos:[20,10,15],look:[15,3,-18]},{pos:[10,9,-25],look:[-23,5,-20]}],
  stats:{props:b.placed.length,containers:0,meshes:merged.children.length},placed:b.placed,groundSurfaceAt(){return 'concrete';},update(dt){atlas.update(dt);for(const f of b.updaters)f(dt);}};
}

function SALT_FROST_WEATHER(i){
 const r=i.render;if(!r)return;
 i.scene.fog=new lt.FogExp2(0x889cad,.0056);
 if(r.sun){
  r.sun.color.setHex(0xd8ecff);
  r.sun.intensity=2.85;
  r.sun.position.set(-52,46,-34);
 }
 if(r.sky){
  r.sky.material.uniforms.uSunDir.value.copy(mt(-52,46,-34).normalize());
  r.sunDir.copy(r.sky.material.uniforms.uSunDir.value);
 }
 if(r.skyFill){
  r.skyFill.color.setHex(0x7fa2bc);
  r.skyFill.intensity=.48;
 }
 if(r.post){
  r.post.wet=.22;
  r.post.saturation=.92;
  r.post.bloom=.32;
 }
 if(i.mats?.uniforms?.wet)i.mats.uniforms.wet.value=.22;
 // The shared sky uses vDir and uSunDir; keep its uniform contract for probes.
 if(r.sky?.material){
  r.sky.material.fragmentShader=`precision highp float;varying vec3 vDir;uniform vec3 uSunDir;uniform float uEnv;void main(){vec3 d=normalize(vDir);float h=max(d.y,0.0);vec3 col=mix(vec3(.58,.68,.76),vec3(.16,.29,.43),smoothstep(0.0,.65,h));float sun=max(dot(d,uSunDir),0.0);col+=vec3(.82,.91,1.0)*(pow(sun,24.0)*.15+pow(sun,1100.0)*1.2);gl_FragColor=vec4(col,1.0);}`;
  r.sky.material.needsUpdate=true;
  const env=Vy(i.renderer,{geometry:r.sky.geometry,material:r.sky.material});i.scene.environment=env.texture;r.env=env.texture;i.scene.environmentIntensity=.65;
 }

}

function SALT_FROST_GROUND(i){
 SALT_FROST_WEATHER(i);
 const canvas=document.createElement("canvas");canvas.width=canvas.height=512;
 const ctx=canvas.getContext("2d");
 ctx.fillStyle="#242e36";ctx.fillRect(0,0,512,512);
 let seed=7319;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 // Wind-swept snow patches and glazed frost streaks over dark volcanic basalt apron.
 for(let n=0;n<1400;n++){
  const x=rnd()*512,y=rnd()*512,w=12+rnd()*48,h=4+rnd()*14;
  ctx.fillStyle=rnd()<.48?`rgba(212,226,238,${(.08+rnd()*.16).toFixed(2)})`:`rgba(24,32,38,${(.1+rnd()*.18).toFixed(2)})`;
  ctx.beginPath();ctx.ellipse(x,y,w,h,.25+(rnd()-.5)*.2,0,Math.PI*2);ctx.fill();
 }
 for(let n=0;n<5200;n++){
  const v=rnd()<.35?195+Math.floor(rnd()*48):32+Math.floor(rnd()*42);
  ctx.fillStyle=`rgba(${v},${Math.min(255,v+8)},${Math.min(255,v+16)},${(.05+rnd()*.11).toFixed(2)})`;
  ctx.fillRect(rnd()*512,rnd()*512,1+rnd()*3,1+rnd()*2);
 }
 const tex=new xs(canvas);tex.wrapS=tex.wrapT= Is;tex.repeat.set(22,20);tex.colorSpace=Vn;tex.anisotropy=4;
 const m=frostMaterials(i);
 if(m){
  m.concrete.color.setHex(0x6e7b85);m.concrete.roughness=.78;
  m.concreteDark.color.setHex(0x3e4952);m.concreteDark.roughness=.72;
  m.asphalt.color.setHex(0x27313a);m.asphalt.roughness=.76;
  m.wall.color.setHex(0x5c6973);m.wall.roughness=.76;
  m.rust.color.setHex(0x4b555e);
  m.painted.color.setHex(0x2f6d8a);m.painted.roughness=.5;
  m.hazard.color.setHex(0xd96b27);m.hazard.roughness=.48;
  for(const key of ["concrete","concreteDark","asphalt","wall","rust","painted","hazard"]){const mat=m.get?.(key)||m[key];if(mat)mat.needsUpdate=true;}
 }
 const group=new wt;group.name="ground-frost-pier";
 const mat=new Qt({color:0xb8c8d6,map:tex,roughness:.74,metalness:.06});
 const slab=new Qe(new rn(88,78).rotateX(-Math.PI/2),mat);
 slab.position.set(-4,.01,-1);slab.receiveShadow=true;group.add(slab);
 // Separate plowed paths on the two banks preserve the frozen channel.
 const laneMat=new Qt({color:0x29323b,roughness:.68,metalness:.08});
 for(const x of [-10,7]){const lane=new Qe(new rn(3,52).rotateX(-Math.PI/2),laneMat);lane.position.set(x,.018,-1);lane.receiveShadow=true;group.add(lane);}
 // Snowdrift sheets on unplowed corners.
 const snowSheetMat=new Qt({color:0xd8e5f0,roughness:.88,metalness:.02});
 for(const[sx,sz,sw,sd]of[[-28,-22,12,9],[-26,18,16,11],[4,22,16,7],[22,10,9,14]]){
  const patch=new Qe(new rn(sw,sd).rotateX(-Math.PI/2),snowSheetMat);
  patch.position.set(sx,.022,sz);patch.receiveShadow=true;group.add(patch);
 }
 // Live 3D falling & wind-drifted snow squall particles across the terminal.
 const snowCount=420,snowGeo=new lt.BoxGeometry(.075,.075,.075),snowFlakeMat=new lt.MeshBasicMaterial({color:0xeef6ff,transparent:!0,opacity:.78});
 const snowMesh=new lt.InstancedMesh(snowGeo,snowFlakeMat,snowCount);
 snowMesh.frustumCulled=!1;snowMesh.castShadow=!1;snowMesh.receiveShadow=!1;
 const snowData=new Float32Array(snowCount*4),dummy=new lt.Object3D();
 for(let n=0;n<snowCount;n++){
  snowData[n*4]=-38+rnd()*68;
  snowData[n*4+1]=.4+rnd()*14;
  snowData[n*4+2]=-30+rnd()*58;
  snowData[n*4+3]=.6+rnd()*.8;
  dummy.position.set(snowData[n*4],snowData[n*4+1],snowData[n*4+2]);
  dummy.updateMatrix();
  snowMesh.setMatrixAt(n,dummy.matrix);
 }
 snowMesh.instanceMatrix.needsUpdate=!0;
 group.add(snowMesh);
 i.scene.add(group);
 let snowTime=0;
 return{
  root:group,group,apron:slab,water:null,mask:null,rain:null,sea:null,
  rainLevel:0,puddleDepth(){return -.2;},wetnessAt(){return .22;},seaHeight(){return -50;},setRain(){},setReflections(){},
  isPuddle(x,z){return x>10&&z>-12&&z<4},
  update(dt){
   if(!dt)return;
   snowTime+=dt;
   for(let n=0;n<snowCount;n++){
    const idx=n*4,spd=snowData[idx+3];
    let x=snowData[idx]+(1.6+Math.sin(snowTime*.7+n)*0.4)*dt;
    let y=snowData[idx+1]-(2.4*spd)*dt;
    let z=snowData[idx+2]+(.85+Math.cos(snowTime*.5+n)*0.3)*dt;
    if(y<.15){y=14.2;x=-38+(n*17.37)%68;z=-30+(n*29.11)%58;}
    if(x>30)x-=68;
    if(z>28)z-=58;
    snowData[idx]=x;snowData[idx+1]=y;snowData[idx+2]=z;
    dummy.position.set(x,y,z);
    dummy.rotation.set(snowTime*1.5+n,snowTime+n,0);
    dummy.updateMatrix();
    snowMesh.setMatrixAt(n,dummy.matrix);
   }
   snowMesh.instanceMatrix.needsUpdate=!0;
  }
 };
}

function SALT_FROST_BACKDROP(i){
 let e=new wt;e.name="backdrop-frost-pier";i.scene.add(e);
 let t=frostMaterials(i),n=[];
 const outerFloor=new Qe(new rn(1200,1200).rotateX(-Math.PI/2),new Qt({color:0x4b5966,roughness:.88,metalness:.04}));
 outerFloor.position.set(-60,-.05,0);outerFloor.receiveShadow=true;e.add(outerFloor);
 // Frozen pack-ice sea sheet east of the slipway (x > 30).
 const seaIce=new Qe(new rn(700,900).rotateX(-Math.PI/2),new Qt({color:0x6d8294,roughness:.58,metalness:.12}));
 seaIce.position.set(380,-1.25,0);e.add(seaIce);
 // Pack-ice floes and pressure ridges on the frozen sea.
 const floeMat=new Qt({color:0xcbe0ee,roughness:.76,metalness:.06});
 const floeGeo=new lt.BoxGeometry(1,1,1),floes=new lt.InstancedMesh(floeGeo,floeMat,28),mat4=new lt.Matrix4(),pos=new lt.Vector3(),quat=new lt.Quaternion(),scl=new lt.Vector3();
 for(let c=0;c<28;c++){
  const fx=38+(c*19)%140,fz=-160+(c*47)%320,fw=6+(c*7)%18,fd=5+(c*11)%16,fh=.6+(c%5)*.85;
  pos.set(fx,-1.1+fh*.45,fz);
  quat.setFromAxisAngle(new lt.Vector3(0,1,0),(c*1.3)%3.14);
  scl.set(fw,fh,fd);
  mat4.compose(pos,quat,scl);
  floes.setMatrixAt(c,mat4);
 }
 floes.instanceMatrix.needsUpdate=!0;e.add(floes);
 // Jagged snow-capped arctic fjord mountain peaks around the horizon.
 const peakMat=new Qt({color:0x556575,roughness:.88,metalness:.04});
 const snowCapMat=new Qt({color:0xdceaf4,roughness:.82,metalness:.04});
 [[-180,-220,95,62],[-60,-250,115,78],[85,-240,105,70],[210,-190,88,58],[-210,40,92,56],[-190,190,102,66],[40,240,98,64],[195,180,86,54]].forEach(([mx,mz,mr,mh])=>{
  const peak=new Qe(new lt.ConeGeometry(mr,mh,7),peakMat);
  peak.position.set(mx,mh*.48-2,mz);e.add(peak);
  const cap=new Qe(new lt.ConeGeometry(mr*.46,mh*.44,7),snowCapMat);
  cap.position.set(mx,mh*.74-2,mz);e.add(cap);
 });
 // Moored Arctic Icebreaker / Cryo-Vessel silhouette off the eastern slipway.
 const ship=new wt;ship.position.set(78,-1.1,-6);e.add(ship);
 const hull=new Qe(new lt.BoxGeometry(16,6.5,58),new Qt({color:0x8c3b22,roughness:.68,metalness:.35}));
 hull.position.y=3.2;ship.add(hull);
 const deck=new Qe(new lt.BoxGeometry(14,5.2,20),new Qt({color:0xd8e2ea,roughness:.62,metalness:.22}));
 deck.position.set(0,8.8,-8);ship.add(deck);
 const bridge=new Qe(new lt.BoxGeometry(14.4,1.2,6),t.emissive(0x9be2ff,2.4));
 bridge.position.set(0,10.2,-4.8);ship.add(bridge);
 const mast=new Qe(new lt.BoxGeometry(1.2,9,1.2),t.steel);
 mast.position.set(0,15.5,-8);ship.add(mast);
 const shipBeacon=new Qe(new lt.SphereGeometry(.42,8,6),t.emissive(0xff3818,7));
 shipBeacon.position.set(0,20.3,-8);ship.add(shipBeacon);n.push({m:shipBeacon,phase:.8});
 // Distant northern cryo-fractionation towers.
 for(let k=0;k<3;k++){
  const tx=-48+k*14,tz=-82;
  const tower=new Qe(new lt.CylinderGeometry(3.2,3.4,24,14),t.galv);
  tower.position.set(tx,12,tz);e.add(tower);
  const beacon=new Qe(new lt.SphereGeometry(.32,8,6),t.emissive(0xff3818,6));
  beacon.position.set(tx,24.4,tz);e.add(beacon);n.push({m:beacon,phase:k*1.7});
 }
 return{
  root:e,group:e,boat:new wt,boatBase:mt(23,0,-22),extractionPoint:mt(23,0,-22),shipName:'FROST PIER',craneId:'CRYO TERMINAL',
  update(s){
   let o=i.time?i.time.t:0;
   for(let r of n)r.m.visible=Math.sin(o*2.2+r.phase)>.15;
  }
 };
}

return {SALT_FROST_PIER,SALT_FROST_WEATHER,SALT_FROST_GROUND,SALT_FROST_BACKDROP};
}
