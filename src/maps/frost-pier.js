// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({$a,By,Is,Qe,Qt,SALT_MAPS,Vn,Vy,dR,lt,mt,ob,pR,rb,rn,ts,wt,xs}){
function SALT_FROST_PIER(i){
 let e=new wt;e.name="level-frost-pier";i.scene.add(e);
 let t=i.mats,n=i.physics,s=[],o={group:e,colliders:s},r=[];
 const map=SALT_MAPS[2];
 // Perimeter: dark basalt frost seawalls on north, south, and west; frozen slipway to the east.
 xs(i,-6,2.1,-29,62,4.2,1.2,t.concreteDark,"concrete",o);
 xs(i,-6,2.1,27,62,4.2,1.2,t.concreteDark,"concrete",o);
 xs(i,-37,2.1,-24,1.2,4.2,10,t.concreteDark,"concrete",o);
 xs(i,-37,4.3,-13,1.2,1.8,12,t.concrete,"concrete",o);
 xs(i,-37,1.6,-13,0.45,3.2,11.6,t.rust,"metal",o);
 xs(i,-37,2.1,10,1.2,4.2,34,t.concreteDark,"concrete",o);
 xs(i,-34.5,1.6,-5.8,3.2,3.2,3.4,t.wall,"concrete",o);
 xs(i,-34.5,3.35,-5.8,3.6,.3,3.8,t.concreteDark,"concrete",o);
 // East slipway apron curb & player safety boundary overlooking the pack ice.
 xs(i,29.3,.17,-1,.9,.34,56,t.concrete,"concrete",o,{noCollide:!0});
 xs(i,29.42,.22,-1,.24,.14,55,t.hazard,"metal",o,{noCollide:!0});
 xs(i,29.55,2,-1,.4,4,56,t.concrete,"concrete",o,{visible:!1,playerOnly:!0});
 for(let z=-24;z<=24;z+=8){
  ts(i,28.75,.32,z,.2,.24,.64,10,t.rust,"metal",o,{cast:!0,noCollide:!0});
  ts(i,28.75,.66,z,.27,.27,.1,10,t.rust,"metal",o,{noCollide:!0});
 }
 // North-Central Cryo-Transfer Hall (zone: 'shed', x in [-13, 9], z in [-25, -7]).
 // Solid north insulated wall; wide drive-through portals on west, east, and south.
 xs(i,-2,3.8,-25,22,7.6,.42,t.wall,"concrete",o);
 xs(i,-9.5,3.8,-7,7,7.6,.42,t.wall,"concrete",o);
 xs(i,5.5,3.8,-7,7,7.6,.42,t.wall,"concrete",o);
 xs(i,-2,6.2,-7,8,2.8,.46,t.wall,"concrete",o);
 xs(i,-13,3.8,-22,.42,7.6,6,t.wall,"concrete",o);
 xs(i,-13,3.8,-10,.42,7.6,6,t.wall,"concrete",o);
 xs(i,-13,6.2,-16,.46,2.8,6,t.wall,"concrete",o);
 xs(i,9,3.8,-22,.42,7.6,6,t.wall,"concrete",o);
 xs(i,9,3.8,-10,.42,7.6,6,t.wall,"concrete",o);
 xs(i,9,6.2,-16,.46,2.8,6,t.wall,"concrete",o);
 // Hall roof with central 7x6m skylight over Relay B (-2, -16).
 xs(i,-2,7.6,-22,22.6,.38,6,t.concreteDark,"concrete",o);
 xs(i,-2,7.6,-10,22.6,.38,6,t.concreteDark,"concrete",o);
 xs(i,-9.25,7.6,-16,7.5,.38,6,t.concreteDark,"concrete",o);
 xs(i,5.25,7.6,-16,7.5,.38,6,t.concreteDark,"concrete",o);
 xs(i,-2,7.96,-19.1,7.4,.32,.24,t.steel,"metal",o,{noCollide:!0});
 xs(i,-2,7.96,-12.9,7.4,.32,.24,t.steel,"metal",o,{noCollide:!0});
 xs(i,-5.6,7.96,-16,.24,.32,6.2,t.steel,"metal",o,{noCollide:!0});
 xs(i,1.6,7.96,-16,.24,.32,6.2,t.steel,"metal",o,{noCollide:!0});
 // Hall structural ribs, overhead cryo-manifolds, and interior chiller skids.
 for(let z of[-24,-19.5,-12.5,-8]){
  xs(i,-12.6,3.7,z,.32,7.4,.32,t.steel,"metal",o,{noCollide:!0});
  xs(i,8.6,3.7,z,.32,7.4,.32,t.steel,"metal",o,{noCollide:!0});
  xs(i,-2,7.15,z,21.4,.28,.26,t.steel,"metal",o,{noCollide:!0});
 }
 for(let x of[-8.5,4.5]){
  ts(i,x,6.65,-16,.28,.28,17.2,12,t.painted,"metal",o,{rotX:Math.PI/2,noCollide:!0});
 }
 xs(i,-9,1.1,-22.5,3.4,2.2,1.8,t.painted,"metal",o);
 xs(i,5,1.1,-22.5,3.4,2.2,1.8,t.painted,"metal",o);
 xs(i,-7.5,.62,-11.5,1.8,1.24,1.4,t.crate,"wood",o);
 xs(i,3.8,.62,-11.5,1.8,1.24,1.4,t.crate,"wood",o);
 {let lbl=t.label("CRYO HALL // BAY 02",{color:"white",font:"stencil",distress:.2}),m=new Qe(new rn(3.4,3.4/lbl.aspect),lbl.material);m.position.set(-2,5.3,-6.72),e.add(m);}
 // East Icebreaker Slipway & Cryogenic Tank Farm (zone: 'quay').
 xs(i,19.5,.12,-6.5,7.4,.24,6.4,t.concreteDark,"concrete",o,{noCollide:!0});
 xs(i,19.5,2.7,-6.5,6.0,5.4,5.0,t.painted,"metal",o);
 for(let dx of[-1.65,1.65])for(let dz of[-1.3,1.3]){
  ts(i,19.5+dx,3.2,-6.5+dz,1.35,1.35,5.8,18,t.brushed||t.galv,"metal",o,{noCollide:!0});
  ts(i,19.5+dx,6.25,-6.5+dz,.95,1.35,.45,16,t.painted,"metal",o,{noCollide:!0});
 }
 // Overhead insulated cryo-pipeline bridge linking East Tank Farm to Cryo Hall.
 xs(i,14.2,5.4,-8.5,10.2,.45,1.1,t.steel,"metal",o,{noCollide:!0});
 ts(i,14.2,5.85,-8.2,.24,.24,10.4,12,t.painted,"metal",o,{rotZ:Math.PI/2,noCollide:!0});
 ts(i,14.2,5.85,-8.8,.22,.22,10.4,12,t.galv,"metal",o,{rotZ:Math.PI/2,noCollide:!0});
 // East Quay cover barriers & South-East Cryo Generator berth.
 xs(i,15.5,.62,2.5,2.2,1.24,.8,t.concrete,"concrete",o);
 xs(i,15.5,.62,11.5,2.2,1.24,.8,t.concrete,"concrete",o);
 xs(i,25.8,.6,7,.7,1.2,3.2,t.concrete,"concrete",o);
 By(i,{x:21,y:0,z:19.5,len:6.1,rotY:0,color:"white",label:"CRYO GEN"},o);
 xs(i,14.5,1.1,22.5,2.6,2.2,1.8,t.painted,"metal",o);
 // Northeast Icebreaker Slipway Extraction Pad (pos: 23, 0, -22).
 xs(i,23,.05,-22,6.4,.1,6.4,t.concreteDark,"concrete",o,{noCollide:!0});
 xs(i,23,.08,-22,5.2,.06,5.2,t.hazard,"metal",o,{noCollide:!0});
 xs(i,23,.1,-22,4.2,.06,4.2,t.concreteDark,"concrete",o,{noCollide:!0});
 {let lbl=t.label("EVAC // ICE-01",{color:"yellow",font:"stencil",distress:.18}),m=new Qe(new rn(3.2,3.2/lbl.aspect),lbl.material);m.rotation.x=-Math.PI/2,m.position.set(23,.14,-22),e.add(m);}
 for(let[bx,bz]of[[20,-25],[26,-25],[20,-19],[26,-19]]){
  ts(i,bx,.35,bz,.12,.16,.7,8,t.hazard,"metal",o,{noCollide:!0});
  let beacon=new Qe(new lt.SphereGeometry(.11,8,6),t.emissive(0xff9b2f,5));
  beacon.position.set(bx,.76,bz),e.add(beacon);
 }
 // Southwest & Central Cold-Chain Container Switchyard (zone: 'yard').
 // West elevated container stack with accessible steel staircase.
 By(i,{x:-26,y:0,z:9,len:6.1,rotY:Math.PI/2,color:"teal",label:"CRYO 401"},o);
 pR(i,-26,1.8,-26,5.9,2.6,1.35,o);
 xs(i,-26,3.05,11.4,2.2,.9,.35,t.steel,"metal",o);
 // Northwest staging cover between playerStart (-31, -21) and Hall/Yard.
 By(i,{x:-23,y:0,z:-16,len:6.1,rotY:0,color:"white",label:"POLAR 12"},o);
 xs(i,-26,.65,-9,3.4,1.3,.7,t.concrete,"concrete",o);
 // Southwest Switchyard framing Relay A (-16, 0, 12).
 By(i,{x:-16,y:0,z:3.5,len:6.1,rotY:0,color:"blue",label:"SALTLINE"},o);
 By(i,{x:-16,y:0,z:20.5,len:12.2,rotY:0,color:"orange",label:"ARCTIC 08"},o);
 By(i,{x:-17.5,y:2.6,z:20.5,len:6.1,rotY:0,color:"white",label:"REEFER"},o);
 xs(i,-20.5,.62,12,.7,1.24,3.0,t.concrete,"concrete",o);
 xs(i,-11.2,.62,12,.7,1.24,3.0,t.concrete,"concrete",o);
 // Central Cryo-Pipeline Gantry Arch (FPV flight gate & central landmark at z = 4).
 By(i,{x:-6.5,y:0,z:4,len:6.1,rotY:Math.PI/2,color:"grey",label:"LN2-MOD"},o);
 By(i,{x:5.5,y:0,z:4,len:6.1,rotY:Math.PI/2,color:"teal",label:"CRYO 209"},o);
 xs(i,-6.2,3.9,4,.45,2.6,.45,t.steel,"metal",o,{noCollide:!0});
 xs(i,5.2,3.9,4,.45,2.6,.45,t.steel,"metal",o,{noCollide:!0});
 xs(i,-.5,5.45,4,13.2,.85,1.5,t.steel,"metal",o);
 ts(i,-.5,6.15,3.65,.26,.26,12.8,12,t.painted,"metal",o,{rotZ:Math.PI/2,noCollide:!0});
 ts(i,-.5,6.15,4.35,.22,.22,12.8,12,t.galv,"metal",o,{rotZ:Math.PI/2,noCollide:!0});
 xs(i,-.5,5.02,3.22,9.2,.18,.08,t.hazard,"metal",o,{noCollide:!0});
 xs(i,-.5,5.02,4.78,9.2,.18,.08,t.hazard,"metal",o,{noCollide:!0});
 // South-central yard containers & cover crates.
 By(i,{x:-2,y:0,z:15,len:6.1,rotY:0,color:"blue",label:"NORDIC"},o);
 By(i,{x:6.5,y:0,z:16,len:6.1,rotY:Math.PI/2,color:"orange",label:"FROST 7"},o);
 xs(i,-29,.6,2,1.8,1.2,1.4,t.crate,"wood",o);
 xs(i,0,.6,-1.5,2.2,1.2,.8,t.concrete,"concrete",o);
 xs(i,8.5,.6,-1.5,2.0,1.2,1.2,t.crate,"wood",o);
 // Compacted snowdrifts banked against walls and container bases (visual + low edge banks).
 const snowMat=new Qt({color:0xdce8f2,roughness:.88,metalness:.02});
 for(const[sx,sz,sw,sd,sh]of[
  [-22,-27.9,24,1.6,.42],[12,-27.9,18,1.5,.38],[-20,25.9,26,1.6,.44],[14,25.9,18,1.5,.4],
  [-35.8,8,1.5,22,.46],[-23,-14.3,5.2,.9,.28],[-16,18.9,10.5,.9,.32],[19.5,-3.6,5.2,.8,.28]
 ]){
  const drift=new Qe(new lt.BoxGeometry(sw,sh,sd),snowMat);
  drift.position.set(sx,sh*.45,sz),drift.receiveShadow=!0,e.add(drift);
 }
 // Floodlight towers.
 [[ -33,-26,.7],[26,-26,-.7],[-33,24,-.7],[26,24,-2.4],[11,-4,1.5]].forEach(([x,z,rot])=>dR(i,x,z,rot,o,r));
 // Objectives (3 relays).
 let a=[
  {id:"relay_a",label:"Relay A \u2014 Switchyard",pos:mt(-16,0,12),zone:"yard",rotY:0},
  {id:"relay_b",label:"Relay B \u2014 Cryo Hall",pos:mt(-2,0,-16),zone:"shed",rotY:0},
  {id:"relay_c",label:"Relay C \u2014 Tank Quay",pos:mt(21,0,7),zone:"quay",rotY:-Math.PI/2}
 ];
 for(let f of a){let p=Vy(i,f,o);f.object=p,r.push(p.userData)}
 let l=[
  {type:"ground",pos:mt(-31,0,-2),zone:"yard"},
  {type:"ground",pos:mt(-31,0,14),zone:"yard"},
  {type:"ground",pos:mt(-21,0,-3),zone:"yard"},
  {type:"ground",pos:mt(-22,0,15),zone:"yard"},
  {type:"ground",pos:mt(-10,0,8),zone:"yard"},
  {type:"ground",pos:mt(-9,0,23),zone:"yard"},
  {type:"ground",pos:mt(-1,0,-2),zone:"yard"},
  {type:"ground",pos:mt(-1,0,9),zone:"yard"},
  {type:"ground",pos:mt(2,0,22),zone:"yard"},
  {type:"ground",pos:mt(-7,0,-16),zone:"shed"},
  {type:"ground",pos:mt(4,0,-16),zone:"shed"},
  {type:"ground",pos:mt(-2,0,-20),zone:"shed"},
  {type:"ground",pos:mt(13,0,-16),zone:"quay"},
  {type:"ground",pos:mt(13,0,-2),zone:"quay"},
  {type:"ground",pos:mt(13,0,14),zone:"quay"},
  {type:"ground",pos:mt(25,0,14),zone:"quay"},
  {type:"air",pos:mt(-28,7.5,-12),zone:"yard"},
  {type:"air",pos:mt(-24,7.5,8),zone:"yard"},
  {type:"air",pos:mt(-15,8,14),zone:"yard"},
  {type:"air",pos:mt(-2,8.5,4),zone:"yard"},
  {type:"air",pos:mt(6,7.5,14),zone:"yard"},
  {type:"air",pos:mt(15,8,-18),zone:"quay"},
  {type:"air",pos:mt(22,8.5,-12),zone:"quay"},
  {type:"air",pos:mt(22,7.5,6),zone:"quay"},
  {type:"air",pos:mt(18,7.5,18),zone:"quay"},
  {type:"air",pos:mt(-5,5.2,-16),zone:"shed"},
  {type:"air",pos:mt(3,5.2,-16),zone:"shed"}
 ];
 let c=[
  mt(-26,0,-10.5),mt(-20.5,0,-13),mt(-29,0,4),mt(-21.5,0,12),mt(-10,0,12),
  mt(-16,0,6),mt(-16,0,17.5),mt(-8.5,0,4),mt(3.5,0,4),mt(-2,0,12.5),
  mt(4.5,0,16),mt(-7.5,0,-13.5),mt(3.8,0,-13.5),mt(13.5,0,-8),
  mt(15.5,0,4),mt(15.5,0,10),mt(24.5,0,7),mt(18,0,16.5)
 ];
 let u=[
  {name:"yard",box:new Is(mt(-37,0,-6),mt(10,12,27)),ambience:"yard"},
  {name:"shed",box:new Is(mt(-13,0,-25),mt(9,8,-7)),ambience:"shed",reverb:"shed",interior:!0},
  {name:"quay",box:new Is(mt(10,0,-29),mt(30,12,27)),ambience:"quay"}
 ];
 let h=[
  {pos:[-33,6.5,-22],look:[-8,2.5,-12]},
  {pos:[-18,5.5,2],look:[-2,2.2,-14]},
  {pos:[4,6.2,11],look:[20,2.4,4]},
  {pos:[24,6.8,-16],look:[-2,2.5,-16]}
 ];
 for(let f of s)n.addBox(f);
 n.setBounds(new Is(mt(-37,-2,-29),mt(31,22,27)));
 return{
  group:e,colliders:s,map,
  playerStart:{pos:mt(-31,0,-21),yaw:.72},
  objectives:a,
  extraction:{pos:mt(23,0,-22),radius:2.5},
  enemySpawns:l,coverPoints:c,zones:u,
  radarSites:[mt(-22,0,-3),mt(14,0,-18),mt(12,0,15)],
  interiorBoxes:[new Is(mt(-13,0,-25),mt(9,7.6,-7))],
  skylights:[{x:-2,z:-16,w:7,d:6,y:7.8}],
  cinematicPath:h,
  groundSurfaceAt(f,p){return f>-13&&f<9&&p>-25&&p<-7?"concrete":f>12?"concrete":"asphalt"},
  update(f){let p=i.time?i.time.t:0;for(let d of r)d.update&&d.update(f,p)}
 };
}

function SALT_FROST_WEATHER(i){
 const r=i.render;if(!r)return;
 r.scene.fog=new lt.FogExp2(0x889cad,.0056);
 if(r.sun){
  r.sun.color.setHex(0xd8ecff);
  r.sun.intensity=2.85;
  r.sun.position.set(-52,46,-34);
 }
 if(r.sky){
  r.sky.color.setHex(0x9ec0d8);
  r.sky.groundColor.setHex(0x3a4854);
  r.sky.intensity=.92;
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
 const dome=r.scene.getObjectByName("skyDome");
 if(dome?.material?.fragmentShader){
  dome.material=dome.material.clone();
  dome.material.fragmentShader=`
   varying vec3 vWorld;
   void main(){
    vec3 d = normalize(vWorld);
    float h = clamp(d.y, 0.0, 1.0);
    vec3 zenith = vec3(0.11, 0.18, 0.27);
    vec3 horizon = vec3(0.54, 0.65, 0.74);
    vec3 snowMist = vec3(0.72, 0.81, 0.88);
    vec3 col = mix(horizon, zenith, pow(h, 0.55));
    vec3 sunDir = normalize(vec3(-0.62, 0.54, -0.42));
    float sunAmt = max(dot(d, sunDir), 0.0);
    col += snowMist * pow(1.0 - h, 3.2) * 0.34;
    col += vec3(0.75, 0.88, 1.0) * (pow(sunAmt, 16.0) * 0.28 + smoothstep(0.9965, 0.9995, sunAmt) * 1.6);
    gl_FragColor = vec4(col, 1.0);
   }`;
  dome.material.needsUpdate=true;
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
 const tex=new xs(canvas);tex.wrapS=tex.wrapT= rb;tex.repeat.set(22,20);tex.colorSpace=Vn;tex.anisotropy=4;
 const m=i.mats;
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
 // Heated dark-asphalt plowed haul lanes & cryo Hall floor.
 const laneMat=new Qt({color:0x29323b,roughness:.68,metalness:.08});
 const hallFloor=new Qe(new rn(22,18).rotateX(-Math.PI/2),new Qt({color:0x3c4751,roughness:.64,metalness:.1}));
 hallFloor.position.set(-2,.02,-16);hallFloor.receiveShadow=true;group.add(hallFloor);
 const lane1=new Qe(new rn(60,5.2).rotateX(-Math.PI/2),laneMat);
 lane1.position.set(-4,.018,-2);lane1.receiveShadow=true;group.add(lane1);
 const lane2=new Qe(new rn(6.2,48).rotateX(-Math.PI/2),laneMat);
 lane2.position.set(13,.019,0);lane2.receiveShadow=true;group.add(lane2);
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
  group,apron:slab,water:null,mask:null,
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
 let t=i.mats,n=[];
 const outerFloor=new Qe(new rn(1200,1200).rotateX(-Math.PI/2),new Qt({color:0x4b5966,roughness:.88,metalness:.04}));
 outerFloor.position.set(-60,-.05,0);outerFloor.receiveShadow=true;e.add(outerFloor);
 // Frozen pack-ice sea sheet east of the slipway (x > 30).
 const seaIce=new Qe(new rn(700,900).rotateX(-Math.PI/2),new Qt({color:0x6d8294,roughness:.58,metalness:.12}));
 seaIce.position.set(380,-1.25,0);e.add(seaIce);
 // Pack-ice floes and pressure ridges on the frozen sea.
 const floeMat=new Qt({color:0xcbe0ee,roughness:.76,metalness:.06});
 const floeGeo=new $a(1,1,1),floes=new ob(floeGeo,floeMat,28),mat4=new lt.Matrix4(),pos=new lt.Vector3(),quat=new lt.Quaternion(),scl=new lt.Vector3();
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
 const hull=new Qe(new $a(16,6.5,58),new Qt({color:0x8c3b22,roughness:.68,metalness:.35}));
 hull.position.y=3.2;ship.add(hull);
 const deck=new Qe(new $a(14,5.2,20),new Qt({color:0xd8e2ea,roughness:.62,metalness:.22}));
 deck.position.set(0,8.8,-8);ship.add(deck);
 const bridge=new Qe(new $a(14.4,1.2,6),t.emissive(0x9be2ff,2.4));
 bridge.position.set(0,10.2,-4.8);ship.add(bridge);
 const mast=new Qe(new $a(1.2,9,1.2),t.steel);
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
  group:e,
  update(s){
   let o=i.time?i.time.t:0;
   for(let r of n)r.m.visible=Math.sin(o*2.2+r.phase)>.15;
  }
 };
}

return {SALT_FROST_PIER,SALT_FROST_WEATHER,SALT_FROST_GROUND,SALT_FROST_BACKDROP};
}
