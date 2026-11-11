// Loaded on demand by runtime.js. Dependencies share one engine instance.
export default function createPart({$a,By,Is,Qe,Qt,SALT_MAPS,Vn,Vy,dR,lt,mt,ob,pR,rb,rn,ts,wt,xs}){
async function SALT_DRY_BASIN(i){
 const root=new wt;root.name='level-dry-basin';i.scene.add(root);
 const b=ob(i),map=SALT_MAPS.find(m=>m.id==='crossdock');
 if(i.mats.uniforms&&i.mats.uniforms.wet)i.mats.uniforms.wet.value=0;
 const concrete=b.M('concrete'),wall=b.M('corrugated_roof'),steel=b.M('steel_galv'),dark=b.M('steel_dark');
 const ochre=new Qt({color:0xa38250,roughness:1}),paint=new Qt({color:0xd9bc72,roughness:.92}),roof=new Qt({color:0x72706a,roughness:.86,metalness:.3});
 const solid=(mat,x0,y0,z0,x1,y1,z1,surface='concrete')=>{b.slab(mat,x0,y0,z0,x1,y1,z1);b.col(x0,y0,z0,x1,y1,z1,surface);};
 // Retaining walls make the excavated basin legible and contain the playable apron.
 for(const a of [[-38,-.7,-30,-37,2.5,28],[29,-.7,-30,30,2.5,28],[-38,-.7,-30,30,2.5,-29],[-38,-.7,27,30,2.5,28]])solid(ochre,...a);
 for(let x=-34;x<29;x+=3){b.place('fence_panel',x,-29,0,{},2.5);b.place('fence_panel',x,27,0,{},2.5);}
 for(let z=-25;z<26;z+=3){b.place('fence_panel',-37,z,ts,{},2.5);b.place('fence_panel',29,z,ts,{},2.5);}
 // A new east-side maintenance hall, three drive-through entrances and an open roof bay.
 b.slab(b.MI('floor_epoxy'),6,-.18,-9,25,.012,12,{cast:false});
 solid(wall,6,0,-9,6.25,7.5,-4,'metal');solid(wall,6,0,2,6.25,7.5,12,'metal');solid(wall,6,4.5,-4,6.25,7.5,2,'metal');
 solid(wall,24.75,0,-9,25,7.5,12,'metal');
 for(const z of [-9,11.75]){solid(wall,6,0,z,12,7.5,z+.25,'metal');solid(wall,18,0,z,25,7.5,z+.25,'metal');solid(wall,12,4.6,z,18,7.5,z+.25,'metal');}
 // Roof strips leave a 6 x 6 m ventilation aperture over the central workshop.
 for(const a of [[5.65,7.5,-9.4,12,7.7,12.4],[18,7.5,-9.4,25.4,7.7,12.4],[12,7.5,-9.4,18,7.7,-2],[12,7.5,4,18,7.7,12.4]])solid(roof,...a,'metal');
 for(const z of [-8.8,-3.5,2.5,11.7])for(const x of [6.35,24.65]){b.box(steel,.18,7.5,.22,x,3.75,z);b.box(paint,.2,1.3,.24,x,.65,z);}
 for(const z of [-8.8,11.7]){b.box(dark,18.4,.26,.18,15.5,7.15,z);b.rod(steel,[6.4,5.4,z],[15.5,7.2,z],.045);b.rod(steel,[24.6,5.4,z],[15.5,7.2,z],.045);}
 for(const z of [-8,11])for(const x of [11.5,18.5])b.place('bollard_post',x,z,0);
 b.label('DRY BASIN / MAINTENANCE 02',.52,15.5,5.8,12.02,'z+',{color:'white'});
 b.label('SERVICE ACCESS',.38,5.96,5.6,-1,'x-',{color:'yellow'});
 b.label('VENTILATION BAY',.3,15,7.77,5,'y+',{color:'yellow'});
 for(const z of [-6,1,8]){b.place('shelf_rack',23.6,z,0);b.place('crate_wood',22.3,z-.4,0);}
 b.place('toolbox_cart',8,7,0);b.place('gas_cylinders',8,9,0);b.place('forklift',10,4,ts,{forksUp:.1});
 b.place('pallet_stack',21,-6,0);b.place('cable_reel',8,-6,ts);b.place('floodlight_stand',19,9,Math.PI);
 // Longitudinal cargo rows in the west, with broad east-west breaks and a clear spine.
 for(const [x,z,size,colors,yaw] of [
  [-29,-14,40,['blue','orange'],ts],[-21,-14,40,['red'],ts],[-12,-17,20,['green'],0],
  [-28,5,40,['orange'],ts],[-20,7,20,['grey','red'],ts],[-12,12,20,['blue'],0],
  [-11,-7,20,['orange'],0],[-5,20,40,['green'],0],[20,20,20,['red','blue'],0]
 ])b.stack(x,z,colors.map(color=>[size,color]),yaw,0);
 // The central loop connects all objectives and allows several independent flank routes.
 for(const [kind,x,z,yaw,opts] of [
  ['guard_booth',-34,19,ts,{}],['gate_arm',-28,23,ts,{}],['sign_post',-31,20,0,{sign:'hazard_general'}],
  ['generator',12,-24,0,{}],['generator',22,-23,ts,{}],['cable_reel',24,-19,0,{}],['gas_cylinders',25,-25,0,{}],
  ['ibc_tote',10,-17,0,{}],['ibc_tote',11.5,-17,0,{}],['tarp_cargo',21,-16,0,{}],
  ['jersey_barrier',3,-15,ts,{}],['jersey_barrier',3,-20,ts,{}],['sandbags',-13,-1,0,{}],
  ['jersey_barrier',-4,4,ts,{}],['jersey_barrier',1,12,0,{}],['sandbags',-24,15,0,{}],
  ['crate_stack',-25,-4,0,{}],['crate_wood',-26,-5,0,{}],['pallet_stack',-17,-23,0,{}],
  ['pipe_stack',-12,24,0,{}],['dumpster',-34,-7,ts,{}],['barrel',-33,-9,0,{color:'red'}],
  ['pallet_stack',8,18,0,{}],['tire_stack',10,19,0,{}],['forklift',-9,7,0,{}],['tarp_cargo',-32,12,0,{}],
  ['sandbags',-26,-25,0,{}],['floodlight_stand',-34,-22,ts,{}]
 ])b.place(kind,x,z,yaw,opts);
 for(const [x,z] of [[-34,25],[-34,-26],[26,-26],[26,25],[-3,-26]])b.place('light_mast',x,z,0);
 // Utility pipe gantry becomes a recognisable northern flight gate, with generous clearance.
 for(const x of [4,26]){b.cyl(steel,.16,6.4,x,3.2,-13);b.col(x-.18,0,-13.18,x+.18,6.4,-12.82,'metal');}
 b.cyl(steel,.27,22,15,6.15,-13,{axis:'x'});b.col(4,5.88,-13.27,26,6.42,-12.73,'metal');
 for(let x=5;x<=25;x+=4)b.rod(dark,[x,5.82,-13],[x,6.48,-13],.045);
 // Reachable lookout: hand-built broad stair flight to a western container roof.
 for(let n=0;n<12;n++){let y=(n+1)*2.59/12,x=-4.5-(n+1)*.38;solid(steel,x,0,-18.1,x+.38,y,-15.9,'metal');}
 b.box(steel,.8,.12,2.2,-9.1,2.53,-17);b.col(-9.5,2.47,-18.1,-8.7,2.59,-15.9,'metal');
 for(const z of [-18.15,-15.85])b.rod(steel,[-4.5,.9,z],[-9.1,3.55,z],.035);
 const relaySpecs=[['relay_a','Relay A — Cargo','yard',-15,1],['relay_b','Relay B — Workshop','shed',20,6],['relay_c','Relay C — Utilities','quay',17,-23]];
 const objectives=relaySpecs.map(([id,label,zone,x,z],n)=>({id,label,zone,pos:mt(x,0,z),object:b.place('relay_node',x,z,n*.4,{seed:n+31},0,{dynamic:true})}));
 // Landing / extraction square at the opposite end of the depot from deployment.
 b.label('EVAC / 03',.48,-32,.04,-24,'y+',{color:'yellow'});
 for(const [x,z] of [[-34,-25],[-28,-25],[-34,-21],[-28,-21]])b.place('traffic_cone',x,z,0);
 b.staticRoot.updateMatrixWorld(true);const dynamic=[];
 b.staticRoot.traverse(o=>{if(o.userData&&o.userData.noMerge&&!(o.parent&&dR(o.parent,b.staticRoot)))dynamic.push(o);});
 for(const o of dynamic)b.dynRoot.attach(o);
 const atlas=rb(b.staticRoot),merged=By(b.staticRoot);merged.name='dry-basin-merged';root.add(merged,b.dynRoot);
 let tris=0;root.traverse(o=>{if(o.isMesh)tris+=(o.geometry.index?o.geometry.index.count:o.geometry.attributes.position.count)/3;});
 const ground=[[-32,15,'yard'],[-24,20,'yard'],[-24,-4,'yard'],[-16,7,'yard'],[-16,-10,'yard'],[-5,-2,'yard'],[-2,16,'yard'],[-7,24,'yard'],[2,-24,'quay'],[8,-21,'quay'],[24,-12,'quay'],[17,-17,'quay'],[15,-5,'shed'],[15,7,'shed'],[21,2,'shed'],[9,-1,'shed']];
 const air=[[-26,9,18,'yard'],[-24,11,-5,'yard'],[-14,12,-22,'yard'],[-9,10,3,'yard'],[-2,12,21,'yard'],[1,9,-11,'yard'],[18,12,-20,'quay'],[25,10,19,'quay'],[15,12,1,'shed'],[15,3,5,'shed'],[15,3,-5,'shed']];
 const enemySpawns=[...ground.map(([x,z,zone])=>({pos:mt(x,0,z),zone,type:'ground'})),...air.map(([x,y,z,zone])=>({pos:mt(x,y,z),zone,type:'air'}))];
 const coverPoints=[[-32,16],[-24,14],[-24,-6],[-18,-1],[-14,4],[-4,7],[1,14],[1,-17],[10,-19],[22,-14],[20,4],[9,7],[21,10],[-29,-23]].map(([x,z])=>mt(x,0,z));
 const nav=i.physics.nav;for(const p of [...coverPoints,...enemySpawns.filter(o=>o.type==='ground').map(o=>o.pos)]){if(nav.isWalkable(p.x,p.z))continue;let found=false;for(let r=.5;r<=3&&!found;r+=.5)for(let a=0;a<8;a++){let x=p.x+Math.cos(a*Math.PI/4)*r,z=p.z+Math.sin(a*Math.PI/4)*r;if(nav.isWalkable(x,z)){p.set(x,0,z);found=true;break;}}}
 return {root,map,playerStart:{pos:mt(-32,0,23),yaw:-.35},objectives,extraction:{pos:mt(-31,0,-23),radius:2.5},enemySpawns,
  zones:[{name:'gate',min:[-38,18],max:[-25,28]},{name:'shed',min:[6,-9],max:[25,12]},{name:'quay',min:[2,-29],max:[29,-10]},{name:'yard',min:[-37,-29],max:[29,27]}],
  interiorBoxes:[{min:mt(6,0,-9),max:mt(25,7.7,12)}],skylights:[{x:15,z:1,w:6,d:6,y:7.7}],shedLights:[],coverPoints,
  vantage:{stairsFoot:mt(-4,0,-17),roof:mt(-12,2.59,-17)},
  cinematicPath:[{pos:[-32,2.4,23],look:[-22,2,7]},{pos:[-24,3.8,16],look:[-15,2,1]},{pos:[-2,4,5],look:[15,3,-1]},{pos:[15,4,4],look:[20,1.8,6]},{pos:[15,10,-13],look:[17,1.5,-23]},{pos:[-24,3,-23],look:[-31,.6,-23]}],
  radarSites:[mt(-18,0,-24),mt(1,0,15),mt(25,0,-16)],flightBounds:{min:mt(-36,.7,-28),max:mt(28,23,26)},
  stats:{labelsAtlased:atlas.count,containers:b.placed.filter(o=>o.name.startsWith('container')).length,props:b.placed.length,tris:Math.round(tris),meshes:merged.children.length+pR(b.dynRoot)},placed:b.placed,
  groundSurfaceAt(x,z){return b.isMetal(x,z)?'metal':x>6&&x<25&&z>-9&&z<12?'concrete':'dirt';},
  update(dt){atlas.update(dt);for(const update of b.updaters)update(dt);}
 };
}

function SALT_DRY_WEATHER(i){
 const r=i.render;r.post.wet=0;i.mats.uniforms.wet.value=0;
 // Keep the renderer's sky object/uniforms because frame() and probe capture own them.
 r.sky.material.fragmentShader=`precision highp float;varying vec3 vDir;uniform vec3 uSunDir;uniform float uEnv;void main(){vec3 d=normalize(vDir);float h=max(d.y,0.0);vec3 col=mix(vec3(.65,.48,.28),vec3(.26,.44,.62),smoothstep(0.0,.52,h));float sun=max(dot(d,uSunDir),0.0);col+=vec3(1.0,.74,.40)*(pow(sun,32.0)*.14+pow(sun,900.0)*1.3+pow(sun,11000.0)*4.0);gl_FragColor=vec4(col,1.0);}`;
 r.sky.material.needsUpdate=true;const dir=mt(-.45,.78,.32).normalize();r.sky.material.uniforms.uSunDir.value.copy(dir);r.sunDir.copy(dir);
 r.sun.color.setHex(0xffe2b2);r.sun.intensity=3.2;r.sun.target.position.set(-3,0,0);r.sun.position.copy(r.sun.target.position).addScaledVector(dir,160);
 Object.assign(r.sun.shadow.camera,{left:-58,right:58,top:58,bottom:-58,near:1,far:260});r.sun.shadow.camera.updateProjectionMatrix();r.sun.updateMatrixWorld(true);r.sun.target.updateMatrixWorld(true);
 i.scene.fog=new lt.FogExp2(0xc6ad83,.0055);
 try{const env=Vy(i.renderer,{geometry:r.sky.geometry,material:r.sky.material});i.scene.environment=env.texture;r.env=env.texture;i.scene.environmentIntensity=.65;}catch(e){console.warn('[dry-basin] environment capture failed',e);}
}

async function SALT_DRY_GROUND(i){
 SALT_DRY_WEATHER(i);const root=new wt;root.name='dry-basin-ground';i.scene.add(root);
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const c=canvas.getContext('2d'),rand=$a(91037);
 c.fillStyle='#a18c68';c.fillRect(0,0,512,512);
 for(let n=0;n<24000;n++){const v=70+Math.floor(rand()*90);c.fillStyle=`rgba(${v+35},${v+23},${v},${.12+rand()*.3})`;const s=.5+rand()*2.6;c.fillRect(rand()*512,rand()*512,s,s);}
 for(let n=0;n<80;n++){c.fillStyle='rgba(219,192,143,.07)';c.beginPath();c.ellipse(rand()*512,rand()*512,8+rand()*40,3+rand()*16,rand()*Math.PI,0,Math.PI*2);c.fill();}
 const texture=new xs(canvas);texture.colorSpace=Vn;texture.wrapS=texture.wrapT=Is;texture.repeat.set(80,80);texture.anisotropy=Math.min(8,i.renderer.capabilities.getMaxAnisotropy());
 const material=new Qt({map:texture,roughness:1,color:0xd1bd95}),apron=new Qe(new rn(600,600,1,1),material);apron.rotation.x=-ts;apron.position.y=-.025;apron.receiveShadow=true;root.add(apron);
 const road=new Qt({color:0x777062,roughness:1}),mark=new Qt({color:0xbba77f,roughness:1});
 function strip(x,z,w,d,mat,y=.006){const m=new Qe(new rn(w,d),mat);m.rotation.x=-ts;m.position.set(x,y,z);m.receiveShadow=true;root.add(m);}
 strip(-1,0,7,55,road);strip(-3,16,62,5,road);strip(-3,-12,62,4.7,road);
 for(let z=-25;z<27;z+=5)strip(-1,z,.12,2,mark,.012);
 // Wheel tracks, dry shoulders and aggregate patches establish an uneven visual terrain without false collision steps.
 for(const x of [-3.1,1.1])strip(x,0,.26,53,mark,.014);
 const patches=new wt,aggregate=new Qt({color:0x8d7956,roughness:1});for(let n=0;n<70;n++){const x=-36+rand()*64,z=-28+rand()*54;if(x>6&&x<25&&z>-9&&z<12)continue;const m=new Qe(new lt.CircleGeometry(.18+rand()*.8,7),ochreMaterial());m.rotation.x=-ts;m.rotation.z=rand()*6.28;m.position.set(x,.001,z);patches.add(m);}root.add(By(patches));
 function ochreMaterial(){return aggregate;}
 return {root,apron,sea:null,rain:null,uniforms:{uRain:{value:0}},rainLevel:0,puddleDepth(){return-.2;},isPuddle(){return false;},wetnessAt(){return 0;},seaHeight(){return-50;},setRain(){},setReflections(){},update(){i.render.post.wet=0;}};
}

async function SALT_DRY_BACKDROP(i){
 const b=ob(i),root=new wt;root.name='dry-basin-backdrop';i.scene.add(root);
 const earth=new Qt({color:0x9d8058,roughness:1,flatShading:true}),pale=new Qt({color:0xb69c70,roughness:1,flatShading:true}),rand=$a(8462);
 // Layered quarry ridges replace every coastal silhouette and remain outside the playable walls.
 for(let n=0;n<32;n++){const angle=n*Math.PI*2/32,r=95+rand()*55,h=16+rand()*28,w=16+rand()*23,geo=new lt.SphereGeometry(1,12,8),pos=geo.attributes.position;
  for(let v=0;v<pos.count;v++){const x=pos.getX(v),y=pos.getY(v),z=pos.getZ(v),ridge=1+.16*Math.sin(x*6+n)*Math.cos(z*7+n*.7);pos.setXYZ(v,x*ridge,y*(.84+.16*Math.sin(x*3+n)*Math.cos(z*4-n)),z*ridge);}
  geo.computeVertexNormals();const m=new Qe(geo,n%3?earth:pale);m.position.set(-3+Math.cos(angle)*r,-4,Math.sin(angle)*r);m.scale.set(w,h,w*(.65+rand()*.4));m.rotation.y=rand()*6.28;m.receiveShadow=true;b.staticRoot.add(m);}
 for(const [x,z] of [[43,-19],[48,-8],[44,3]]){b.cyl('concrete',3.2,12,x,6,z,{seg:16});b.cyl('steel_galv',3.35,.3,x,12.1,z,{seg:16});b.cyl('steel_dark',.22,16,x+3.4,8,z,{seg:8});b.rod('steel_dark',[x,12,z],[x+3.4,15,z],.12);}
 for(const x of [-46,-59,-72]){b.box('concrete',8,5,11,x,2.5,-42);b.box('corrugated_roof',8.5,.25,11.5,x,5.2,-42);}
 const merged=By(b.staticRoot);root.add(merged,b.dynRoot);return{root,boat:new wt,boatBase:mt(-31,0,-23),extractionPoint:mt(-31,0,-23),shipName:'DRY BASIN',craneId:'UTILITY DEPOT',stats:{drawCalls:merged.children.length},update(){}};
}
return {SALT_DRY_BASIN,SALT_DRY_WEATHER,SALT_DRY_GROUND,SALT_DRY_BACKDROP};
}
