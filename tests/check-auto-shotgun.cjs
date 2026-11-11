const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
function checkSourceSyntax(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const filename=path.join(directory,entry.name);if(entry.isDirectory())checkSourceSyntax(filename);else if(entry.isFile()&&entry.name.endsWith('.js'))execFileSync(process.execPath,['--check',filename],{stdio:'pipe'});}}
checkSourceSyntax('src');
async function prepareGameplayAssets(page){await page.evaluate(async()=>{const g=window.__G;if(!g?.weapon?.preloadAll)return;g.renderer.setAnimationLoop(null);await g.assets?.prepareMode?.('foot');await g.audio.warm?.();await g.weapon.preloadAll();});}
for(const script of fs.readFileSync('index.html','utf8').matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
// Call after registering SALT_AUTO_SHOTGUN as loadout slot 4 (key 5).
async function checkAutoShotgun(page,assert){
 const result=await page.evaluate(()=>{
  const g=__G,w=g.weapon,oldInput=g.input,oldPhysics=g.physics.raycast,oldEnemies=g.enemies.raycast,oldStats={...g.combat.stats},oldAlive=g.player.alive,oldSprint=g.player.sprinting;
  const input={fire:false,ads:false,look:{dx:0,dy:0},pressed:()=>false};g.input=input;g.player.alive=true;g.player.sprinting=false;
  let distance=7,wallDistance=null;const damage=[],limits=[];
  const target={type:'soldier',alive:true,pos:g.player.pos.clone(),damage(amount){damage.push(amount);return false;}};
  g.physics.raycast=(origin,dir,range)=>wallDistance!==null&&wallDistance<=range?{dist:wallDistance,point:origin.clone().addScaledVector(dir,wallDistance),normal:dir.clone().negate(),surface:'metal'}:null;
  g.enemies.raycast=(origin,dir,limit)=>{limits.push(limit);return distance<=limit?{dist:distance,point:origin.clone().addScaledVector(dir,distance),normal:dir.clone().negate(),part:'body',enemy:target}:null;};
  const tick=(seconds,hz=60)=>{const count=Math.ceil(seconds*hz);for(let n=0;n<count;n++)w.update(seconds/count);};
  const reset=()=>{input.fire=input.ads=false;w.reset();w.select(4);w.setVisible(true);tick(.4);damage.length=limits.length=0;g.combat.stats.shots=g.combat.stats.hits=0;};
  try{
   reset();const initial={selected:w.selected,mag:w.magSize,ammo:w.ammo,reserve:w.reserve};input.fire=true;w.update(.001);const first={ammo:w.ammo,pellets:damage.length,shots:g.combat.stats.shots,hits:g.combat.stats.hits,damage:damage[0]};tick(.60);const held={ammo:w.ammo,shots:g.combat.stats.shots,pellets:damage.length};
   reset();distance=36;input.fire=true;w.update(.001);const far=damage[0];
   reset();distance=7;wallDistance=4;input.fire=true;w.update(.001);const wall={damage:damage.length,shots:g.combat.stats.shots,hits:g.combat.stats.hits,maxLimit:Math.max(...limits)};wallDistance=null;
   reset();w.ammo=3;w.reserve=4;const manualStarted=w.reloadNow();tick(.65);const magazineMoving=w.debug.magazineDrop>.1;tick(1.8);const partial={ammo:w.ammo,reserve:w.reserve,state:w.state};
   reset();input.ads=true;tick(.3);const aimed=w.ads>.99;input.ads=false;w.ammo=1;w.reserve=3;input.fire=true;w.update(.001);input.fire=false;tick(.30);const autoStarted=w.state==='reloading';tick(2.4);const auto={ammo:w.ammo,reserve:w.reserve,state:w.state};
   reset();w.ammo=0;w.reserve=0;input.fire=true;tick(3);const dry={ammo:w.ammo,reserve:w.reserve,shots:g.combat.stats.shots,state:w.state};
   reset();input.fire=true;w.setVisible(false);tick(1);const hidden={ammo:w.ammo,shots:g.combat.stats.shots,visible:w.root.visible};w.setVisible(true);w.update(.001);input.fire=false;w.select(0);tick(.4);const rifleAmmo=w.ammo;w.select(4);tick(.4);const returnedAmmo=w.ammo;
   reset();w.ammo=1;w.reserve=3;input.fire=true;w.update(.001);input.fire=false;w.select(0);tick(.5);w.select(4);tick(.4);const reequippedStarted=w.state==='reloading';tick(2.4);const reequipped={ammo:w.ammo,reserve:w.reserve,started:reequippedStarted};
   const cadence=[];for(const hz of [30,60,120]){reset();input.fire=true;w.update(.001);tick(1.30,hz);cadence.push(g.combat.stats.shots);}
   reset();input.fire=true;w.update(.001);const before=g.combat.stats.shots;w.update(20);const delayedShots=g.combat.stats.shots-before;w.update(.01);const subsequentShots=g.combat.stats.shots-before;
   return{initial,first,held,far,wall,manualStarted,magazineMoving,partial,aimed,autoStarted,auto,dry,hidden,rifleAmmo,returnedAmmo,reequipped,cadence,delayedShots,subsequentShots,errors:__errors.slice()};
  }finally{w.reset();w.setVisible(true);g.input=oldInput;g.physics.raycast=oldPhysics;g.enemies.raycast=oldEnemies;Object.assign(g.combat.stats,oldStats);g.player.alive=oldAlive;g.player.sprinting=oldSprint;}
 });
 assert.deepEqual(result.initial,{selected:4,mag:10,ammo:10,reserve:50});
 assert.deepEqual(result.first,{ammo:9,pellets:8,shots:1,hits:1,damage:14});assert.deepEqual(result.held,{ammo:7,shots:3,pellets:24});assert.ok(result.far>0&&result.far<result.first.damage*.2);
 assert.deepEqual(result.wall,{damage:0,shots:1,hits:0,maxLimit:4});assert.ok(result.manualStarted&&result.magazineMoving&&result.aimed);assert.deepEqual(result.partial,{ammo:7,reserve:0,state:'idle'});
 assert.ok(result.autoStarted);assert.deepEqual(result.auto,{ammo:3,reserve:0,state:'idle'});assert.deepEqual(result.dry,{ammo:0,reserve:0,shots:0,state:'idle'});assert.deepEqual(result.hidden,{ammo:10,shots:0,visible:false});
 assert.equal(result.rifleAmmo,30);assert.equal(result.returnedAmmo,9);assert.deepEqual(result.reequipped,{ammo:3,reserve:0,started:true});assert.deepEqual(result.cadence,[5,5,5]);assert.equal(result.delayedShots,1);assert.equal(result.subsequentShots,1);assert.deepEqual(result.errors,[]);
 console.log('AUTO SHOTGUN PASS',result);return result;
}

(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:800}}),pageErrors=[];
  page.on('pageerror',e=>{pageErrors.push(e.message);console.error('PAGEERROR',e.message);});
  await page.goto((process.env.SALTLINE_BASE_URL||'http://127.0.0.1:8087')+'/index.html?autostart=1&mission=0&q=low');
  await page.waitForFunction(()=>window.__ready||window.__fatal,null,{timeout:90000});
  assert.equal(await page.evaluate(()=>window.__fatal),null);
  await prepareGameplayAssets(page);
  await page.waitForFunction(()=>document.getElementById('boot').hidden);
  await page.evaluate(()=>{__G.renderer.setAnimationLoop(null);__G.player.invulnerable=true;return __G.audio.ready;});
  await checkAutoShotgun(page,assert);
  await page.evaluate(()=>{const g=__G;g.input.fire=g.input.ads=false;g.weapon.select(4);for(let n=0;n<40;n++){g.weapon.update(1/60);g.player.update(1/60);}g.hud.update(1/60);g.render.post.fade=0;g.game.menus.show('none');document.getElementById('boot').remove();g.render.frame(1/60);});
  await page.screenshot({path:'/tmp/saltline-auto-shotgun.png'});
  await page.evaluate(()=>{const g=__G;g.input.ads=true;for(let n=0;n<40;n++){g.weapon.update(1/60);g.player.update(1/60);}g.hud.update(1/60);g.render.frame(1/60);});
  await page.screenshot({path:'/tmp/saltline-auto-shotgun-ads.png'});
  await page.evaluate(()=>{const g=__G;g.input.ads=false;g.weapon.ammo=3;g.weapon.reloadNow();g.weapon.update(.65);g.hud.update(.01);g.render.frame(.01);});
  await page.screenshot({path:'/tmp/saltline-auto-shotgun-reload.png'});
  assert.deepEqual(pageErrors,[]);assert.deepEqual(await page.evaluate(()=>__errors),[]);
  console.log('AUTO SHOTGUN screenshots: /tmp/saltline-auto-shotgun{,-ads,-reload}.png');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
