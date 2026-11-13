// An open military valley with a walkable observation tower and distant firing lanes.
export default function createPart({By,Qe,Qt,SALT_MAPS,lt,mt,ob,rb,rn,ts,wt}){
function SALT_EAGLES_NEST(i){
 const root=new wt;root.name='level-eagles-nest';i.scene.add(root);const b=ob(i);
 const concrete=b.M('concrete'),steel=b.M('steel_dark'),deck=b.M('diamond_plate'),plaster=new Qt({color:0xaaa78b,roughness:1}),roof=new Qt({color:0x43534a,roughness:.9}),sand=new Qt({color:0x827a57,roughness:1});
 const solid=(mat,x,y,z,w,h,d,surface='concrete',opts={})=>{b.box(mat,w,h,d,x,y,z);b.col(x-w/2,y-h/2,z-d/2,x+w/2,y+h/2,z+d/2,surface,opts);};
 // A long perimeter encloses a 100 x 208 m valley, rather than a container yard.
 for(const x of [-49,49])solid(concrete,x,1.4,-8,1,2.8,208);
 for(const z of [-112,96])solid(concrete,0,1.4,z,98,2.8,1);
 for(let z=-108;z<95;z+=12)for(const x of [-49,49])b.box(steel,.18,4.2,.18,x,2.1,z);
 // Low barracks, roofed on the sides and open through the middle for flanking.
 function building(x,z,w,d,label){
  solid(plaster,x-w/2,2,z,.35,4,d);solid(plaster,x+w/2,2,z,.35,4,d);
  solid(plaster,x-w/4-1,2,z-d/2,w/2-2,4,.3);solid(plaster,x+w/4+1,2,z-d/2,w/2-2,4,.3);
  solid(plaster,x-w/4-1,2,z+d/2,w/2-2,4,.3);solid(plaster,x+w/4+1,2,z+d/2,w/2-2,4,.3);
  solid(plaster,x,3.4,z-d/2,4,1.2,.3);solid(plaster,x,3.4,z+d/2,4,1.2,.3);
  solid(roof,x,4.2,z,w+.6,.3,d+.6);b.slab(concrete,x-w/2,-.12,z-d/2,x+w/2,.02,z+d/2);
  b.label(label,.38,x,3.1,z+d/2+.2,'z+',{color:'white'});
 }
 building(-27,-76,20,15,'COMMAND / 01');building(27,-50,20,16,'SIGNALS / 02');building(-28,-25,19,13,'BARRACKS');building(27,18,18,14,'MOTOR POOL');
 // Central runway, radar bunker and dispersed defensive positions.
 solid(sand,0,1.1,-97,12,2.2,8);b.place('relay_node',0,-96,0,{},2.2,{dynamic:true,noCol:true});
 b.cyl(steel,.22,7,0,5.5,-97);const dish=new Qe(new lt.SphereGeometry(3,16,8,0,Math.PI*2,0,Math.PI/2),new Qt({color:0xd2d6c6,roughness:.7,side:lt.DoubleSide}));dish.rotation.x=-.5;dish.position.set(0,9,-97);b.staticRoot.add(dish);
 for(const [x,z,yaw] of [[-12,-58,0],[12,-78,0],[-11,-8,0],[12,42,0],[-29,37,ts],[30,65,ts]])b.place('sandbags',x,z,yaw);
 for(const [x,z] of [[-39,-60],[35,-69],[-34,-9],[34,7],[23,44],[-12,80]]){b.place('crate_stack',x,z,0);b.place('barrel',x+2,z+1,0,{color:'green'});}
 for(const [x,z] of [[-37,-100],[37,-100],[-40,15],[40,70]])b.place('light_mast',x,z,0);
 for(const x of [21,28,35]){b.cyl('steel_galv',2.1,6,x,3,-15,{seg:12});b.cyl(steel,2.2,.25,x,6,-15,{seg:12});}
 // Three 4 m flights use 20 cm treads, below the controller's 42 cm step limit.
 // Walk east, turn north, walk west, turn north, then walk east onto the deck.
 const stairRoute=[mt(-38.5,0,60)],flights=[];
 for(let f=0;f<3;f++){
  const z=60+f*3,base=f*4,dir=f%2?-1:1,start=f%2?-25:-37;
  for(let n=0;n<20;n++){
   const x=start+dir*(n+.5)*.6,top=base+(n+1)*.2;
   solid(deck,x,top/2,z,.6,top,2.6,'metal',{noNav:true});
   // A lighter edge nosing makes each tread legible at dusk.
   b.box('paint_yellow',.035,.025,2.6,start+dir*(n+1)*.6,top+.015,z);
  }
  const end=start+dir*12;flights.push({start:mt(start,base,z),end:mt(end,base+4,z)});
  stairRoute.push(mt(end,base+4,z));
  if(f<2){solid(deck,end+dir,base+3.9,z+1.5,2,.2,5.6,'metal',{noNav:true});stairRoute.push(mt(end+dir,base+4,z+1.5),mt(end,base+4,z+3));}
  for(const side of [-1,1]){
   b.rod(steel,[start,base+1,z+side*1.37],[end,base+5,z+side*1.37],.045);
   for(let n=0;n<=4;n++){const x=start+dir*n*3,y=base+n; b.rod(steel,[x,y,z+side*1.37],[x,y+1,z+side*1.37],.04);}
  }
 }
 solid(deck,-20,11.9,63.3,10,.2,9.6,'metal',{noNav:true});
 // Low ballistic parapet leaves a clear firing position while crouching protects the player.
 solid(sand,-20,12.42,58.5,10,.84,.45);solid(sand,-15,12.42,63.3,.4,.84,9.6);solid(sand,-20,12.42,68.1,10,.84,.4);
 for(const [x,z] of [[-24.6,58.8],[-15.4,58.8],[-24.6,67.8],[-15.4,67.8]]){
  solid(steel,x,6,z,.3,12,.3,'metal');b.rod(steel,[x,0,z],[x,12,z===58.8?67.8:58.8],.07);
 }
 // Overhead camouflage roof is high enough for standing aim.
 solid(roof,-20,15.2,63.3,11,.18,10.3,'metal');for(const [x,z] of [[-24.7,58.7],[-15.3,58.7],[-24.7,67.9],[-15.3,67.9]])b.box(steel,.12,3.2,.12,x,13.6,z);
 b.label('EAGLE / OBSERVATION 04',.36,-20,14.5,68.52,'z+',{color:'white'});b.label('TOWER ACCESS / WALK UP',.3,-38,.04,73,'y+',{color:'yellow'});
 stairRoute.push(mt(-22,12,66),mt(-20,12,61));
 const specs=[['relay_a','Relay A — Tower uplink','yard',-18,12,65],['relay_b','Relay B — Command','shed',-27,0,-76],['relay_c','Relay C — Signals','quay',27,0,-50]];
 const objectives=specs.map(([id,label,zone,x,y,z])=>({id,label,zone,pos:mt(x,y,z),object:b.place('relay_node',x,z,0,{},y,{dynamic:true})}));
 b.label('EXFIL / NORTH GATE',.55,30,.04,-102,'y+',{color:'yellow'});
 const ground=[[-36,80,'yard'],[-8,48,'yard'],[18,30,'yard'],[-36,25,'yard'],[-12,8,'yard'],[12,-8,'yard'],[-38,-43,'yard'],[-10,-60,'yard'],[-27,-76,'shed'],[-27,-70,'shed'],[27,-50,'quay'],[27,-44,'quay'],[15,-85,'quay'],[-10,-99,'quay'],[30,-96,'quay']];
 const enemySpawns=ground.map(([x,z,zone])=>({pos:mt(x,0,z),zone,type:'ground'}));for(const [x,z] of [[-10,72],[18,40],[-10,2],[20,-36],[-15,-67],[12,-99]])enemySpawns.push({pos:mt(x,10,z),zone:'yard',type:'air'});
 const merged=By(b.staticRoot);root.add(merged,b.dynRoot);const atlas=rb(root);
 return {root,map:SALT_MAPS.find(m=>m.id==='eaglesnest'),playerStart:{pos:mt(-40,0,74),yaw:.1},objectives,extraction:{pos:mt(30,0,-102),radius:3},enemySpawns,
  coverPoints:ground.slice(1).map(([x,z])=>mt(x,0,z)),zones:[{name:'shed',min:[-38,-85],max:[-16,-66]},{name:'quay',min:[14,-64],max:[40,-35]},{name:'yard',min:[-49,-112],max:[49,96]}],
  interiorBoxes:[{min:mt(-37,0,-83.5),max:mt(-17,4.3,-68.5)}],skylights:[],shedLights:[],radarSites:[mt(10,0,-88),mt(-10,0,-12),mt(35,0,42)],flightBounds:{min:mt(-47,.7,-110),max:mt(47,23,94)},
  vantage:{stairsFoot:stairRoute[0],roof:mt(-20,12,61),route:stairRoute,flights},defaultWeapon:1,
  cinematicPath:[{pos:[-42,6,82],look:[-20,10,63]},{pos:[-20,14,61],look:[0,2,-80]},{pos:[28,8,-25],look:[-20,3,-76]},{pos:[20,6,-98],look:[0,8,-97]}],
  stats:{props:b.placed.length,meshes:merged.children.length,containers:0},placed:b.placed,groundSurfaceAt(){return 'dirt';},update(dt){atlas.update(dt);for(const f of b.updaters)f(dt);}};
}
function SALT_EAGLES_GROUND(i){
 const root=new wt;root.name='ground-eagles-nest';i.scene.add(root);
 const grass=new Qt({color:0x626a43,roughness:1}),road=new Qt({color:0x777466,roughness:1}),mark=new Qt({color:0xc4bda0,roughness:1});
 function plane(x,z,w,d,mat,y){const m=new Qe(new rn(w,d),mat);m.rotation.x=-ts;m.position.set(x,y,z);m.receiveShadow=true;root.add(m);return m;}
 const apron=plane(0,0,1500,1500,grass,-.025);plane(0,-8,13,208,road,.005);plane(0,-44,96,6,road,.007);plane(0,47,96,5,road,.007);
 for(let z=-106;z<95;z+=9)plane(0,z,.2,4,mark,.012);
 // Sparse scrub clusters leave the central and tower firing lanes clear.
 const rng=(n)=>{const x=Math.sin(n*127.1)*43758.5453;return x-Math.floor(x);};
 for(let n=0;n<90;n++){const x=n%2?-43-rng(n)*8:43+rng(n)*8,z=-112+rng(n+90)*208;const bush=new Qe(new lt.IcosahedronGeometry(.6+rng(n+6)*.7,0),grass);bush.position.set(x,.35,z);bush.scale.y=.65;root.add(bush);}
 i.render.post.wet=0;i.mats.uniforms.wet.value=0;i.scene.fog=new lt.FogExp2(0xa8aa91,.0018);
 const r=i.render,dir=mt(-.65,.55,.32).normalize();r.sunDir.copy(dir);r.sky.material.uniforms.uSunDir.value.copy(dir);r.sun.color.setHex(0xffe2b0);r.sun.intensity=3.4;r.sun.position.copy(dir).multiplyScalar(210);r.sun.target.position.set(0,0,-10);
 Object.assign(r.sun.shadow.camera,{left:-115,right:115,top:115,bottom:-115,far:420});r.sun.shadow.camera.updateProjectionMatrix();
 return {root,apron,sea:null,rain:null,rainLevel:0,isPuddle(){return false;},puddleDepth(){return -.2;},wetnessAt(){return 0;},seaHeight(){return -50;},setRain(){},setReflections(){},update(){i.render.post.wet=0;}};
}
function SALT_EAGLES_BACKDROP(i){
 const root=new wt;root.name='backdrop-eagles-nest';i.scene.add(root);const rock=new Qt({color:0x73745d,roughness:1,flatShading:true}),pine=new Qt({color:0x354a39,roughness:1});
 for(let n=0;n<24;n++){const a=n*Math.PI/12,r=230+(n%3)*28,h=30+(n*17)%42,m=new Qe(new lt.ConeGeometry(65,h,7),rock);m.position.set(Math.cos(a)*r,h/2-4,Math.sin(a)*r);root.add(m);}
 for(let n=0;n<70;n++){const side=n%2?1:-1,z=-160+(n*31)%320,x=side*(65+(n*13)%60),h=5+n%5;const tree=new Qe(new lt.ConeGeometry(1.8,h,7),pine);tree.position.set(x,h/2,z);root.add(tree);}
 return {root,boat:new wt,boatBase:mt(30,0,-102),extractionPoint:mt(30,0,-102),shipName:'EAGLE’S NEST',craneId:'OBSERVATION POST',update(){}};
}
return {SALT_EAGLES_NEST,SALT_EAGLES_GROUND,SALT_EAGLES_BACKDROP};
}
