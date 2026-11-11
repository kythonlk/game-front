// Call after deploying any FPV mission and stopping the render loop:
// const {assertFPVController}=require('./tests/check-fpv.cjs');
// await assertFPVController(page, require('node:assert/strict'));
async function assertFPVController(page,assert){
 const result=await page.evaluate(()=>{
  const g=__G,p=g.player,w=g.weapon;
  if(g.game.mission.pilot!=='fpv'||g.game.state!=='playing')throw Error('Deploy an FPV mission first');
  g.renderer.setAnimationLoop(null);
  const old={input:g.input,boxes:g.physics.boxes,bounds:g.physics.bounds,raycast:g.physics.raycast,enemiesRaycast:g.enemies.raycast,shot:g.combat.playerShot,pos:p.pos.clone(),yaw:p.yaw,enabled:p.enabled,health:p.health,invulnerable:p.invulnerable};
  const input={...old.input,move:{x:0,y:0},look:{dx:0,dy:0},fire:false,ads:false,sprint:false,crouch:false,fpvDescend:false,pressed:()=>false,down:()=>false};
  g.input=input;g.physics.boxes=[];g.physics.bounds={min:p.pos.clone().set(-40,0,-40),max:p.pos.clone().set(40,20,40)};g.physics.raycast=()=>null;p.enabled=true;p.invulnerable=false;
  const tick=(n,dt=1/60)=>{for(let k=0;k<n;k++)p.update(dt);};
  const launch=()=>{input.move.x=input.move.y=0;input.look.dx=input.look.dy=0;input.down=()=>false;input.crouch=false;input.sprint=false;p.reset({pos:p.pos.clone().set(0,0,0),yaw:0});};
  try{
   launch();const initial=p.eye.y;input.down=a=>a==='jump';tick(60);const ascend=p.eye.y>initial+3&&Math.abs(p.eye.y-p.pos.y-.8)<.001;
   input.down=()=>false;input.crouch=true;tick(80);const descend=p.eye.y<initial;input.crouch=false;
   input.down=a=>a==='jump';tick(400);const ceiling=p.eye.y<=20.001;
   launch();input.move.y=1;tick(60);const forward=p.pos.z<-6&&Math.abs(p.pos.x)<.001;
   input.move.y=0;tick(120);const damped=p.vel.length()<.001;
   launch();input.move.y=1;input.sprint=true;tick(60);const boosted=p.pos.z<-10;
   // A paper-thin wall must stop boost movement even with a 100ms frame.
   launch();g.physics.boxes=[{min:p.pos.clone().set(-4,0,-2.02),max:p.pos.clone().set(4,8,-2),playerOnly:true}];input.move.y=1;input.sprint=true;tick(20,.1);const sweptWall=p.pos.z>=-1.641&&p.pos.z<-.5;
   // Sliding preserves the tangential component.
   input.move.x=1;tick(60);const wallSlide=p.pos.x>3;
   g.physics.boxes=[];launch();input.move.y=1;tick(20);p.enabled=false;const frozen=p.pos.clone(),yaw=p.yaw;input.look.dx=.5;tick(60);const disabled=p.pos.distanceTo(frozen)===0&&p.yaw===yaw;p.enabled=true;input.look.dx=0;
   launch();const health=p.health;p.damage(10,null);const damage=p.health<health&&p.alive;
   p.invulnerable=true;
   w.reset();w.setVisible(true);let shots=0;g.combat.playerShot=()=>{shots++;return null;};input.fire=true;for(let k=0;k<70;k++)w.update(1/60);const automatic=shots>=6;
   input.fire=false;for(let k=0;k<20;k++)w.update(1/60);w.ammo=1;input.fire=true;w.update(1/60);input.fire=false;const emptyRecharge=w.ammo===0&&w.state==='reloading';for(let k=0;k<90;k++)w.update(1/60);const recharged=w.ammo===w.magSize;
   const pausedAmmo=w.ammo;p.enabled=false;input.fire=true;for(let k=0;k<60;k++)w.update(1/60);const disabledWeapon=w.ammo===pausedAmmo;p.enabled=true;input.fire=false;
   // Exercise the production combat path against both target classes.
   g.combat.playerShot=old.shot;const hits=[];
   for(const type of ['gull','soldier']){
    const enemy={type,alive:true,pos:p.eye.clone().addScaledVector(p.forward,5),damage(amount){hits.push({type,amount});return false;}};
    g.enemies.raycast=(origin,dir)=>({enemy,dist:5,point:origin.clone().addScaledVector(dir,5),normal:dir.clone().negate(),part:'body'});
    input.fire=false;for(let k=0;k<20;k++)w.update(1/60);input.fire=true;w.update(1/60);input.fire=false;
   }
   return {ascend,descend,ceiling,forward,damped,boosted,sweptWall,wallSlide,disabled,damage,automatic,emptyRecharge,recharged,disabledWeapon,targetTypes:hits.map(x=>x.type),damageAmounts:hits.map(x=>x.amount),errors:__errors.slice()};
  }finally{
   g.input=old.input;g.physics.boxes=old.boxes;g.physics.bounds=old.bounds;g.physics.raycast=old.raycast;g.enemies.raycast=old.enemiesRaycast;g.combat.playerShot=old.shot;
   p.reset({pos:old.pos.clone().setY(old.pos.y-2.2),yaw:old.yaw});p.enabled=old.enabled;p.health=old.health;p.invulnerable=old.invulnerable;w.reset();
  }
 });
 for(const key of ['ascend','descend','ceiling','forward','damped','boosted','sweptWall','wallSlide','disabled','damage','automatic','emptyRecharge','recharged','disabledWeapon'])assert.equal(result[key],true,key);
 assert.deepEqual(result.targetTypes,['gull','soldier']);assert.ok(result.damageAmounts.every(n=>n>0));assert.deepEqual(result.errors,[]);return result;
}
module.exports={assertFPVController};

if(require.main===module)(async()=>{
 const assert=require('node:assert/strict');
 const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 try{
  for(const map of ['berth4','crossdock']){
   const page=await browser.newPage({viewport:{width:1100,height:800}});const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error('FPV PAGE ERROR',e.message);});
   await page.goto('http://127.0.0.1:8087/index.html?autostart=1&q=low&mission=4&map='+map);
   await page.waitForFunction(()=>window.__ready||window.__fatal,null,{timeout:90000});const fatal=await page.evaluate(()=>window.__fatal);assert.equal(fatal,null);console.log('FPV READY',map);
   await page.evaluate(async()=>{__G.renderer.setAnimationLoop(null);await __G.assets.prepareMode('fpv');__G.game.start({mission:4,skipIntro:true});__G.player.update(1/60);});
   const telemetry=await page.evaluate(()=>{const g=__G,overlay=document.querySelector('.fpv-flight-hud'),visible=!overlay.hidden;g.game.pause();const pausedHidden=overlay.hidden;g.game.start({mission:4,skipIntro:true});g.player.update(1/60);return {visible,pausedHidden,resumed:!overlay.hidden,pilot:g.game.mission.pilot};});
   assert.deepEqual(telemetry,{visible:true,pausedHidden:true,resumed:true,pilot:'fpv'});
   const result=await assertFPVController(page,assert);assert.deepEqual(errors,[]);
   console.log('FPV PASS '+map,JSON.stringify(result));await page.close();
  }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
