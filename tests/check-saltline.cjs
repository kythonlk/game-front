const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
function checkSourceSyntax(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const filename=path.join(directory,entry.name);if(entry.isDirectory())checkSourceSyntax(filename);else if(entry.isFile()&&entry.name.endsWith('.js'))execFileSync(process.execPath,['--check',filename],{stdio:'pipe'});}}
checkSourceSyntax('src');
async function prepareGameplayAssets(page){await page.evaluate(async()=>{const g=window.__G;if(!g?.weapon?.preloadAll)return;g.renderer.setAnimationLoop(null);await g.assets?.prepareMode?.('foot');await g.audio.warm?.();await g.weapon.preloadAll();});}
for(const script of fs.readFileSync('index.html','utf8').matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});const page=await browser.newPage({viewport:{width:1100,height:800}});page.on('pageerror',e=>console.log('PAGEERROR',e.message));
await page.goto('http://127.0.0.1:8087/index.html?show=enemies&eshow=soldier&efreeze=1');await page.waitForFunction(()=>window.__ready,null,{timeout:60000});await prepareGameplayAssets(page);await page.waitForFunction(()=>document.getElementById("boot").hidden);await page.locator('#boot').evaluate(el=>el.remove());await page.evaluate(()=>__G.renderer.setAnimationLoop(null));await page.screenshot({path:'/tmp/saltline-robot.png'});console.log('SHOWCASE',await page.evaluate(()=>({fatal:__fatal,errors:__errors,stats:__stats(),enemies:__G.enemies.list.length})));
await page.goto('http://127.0.0.1:8087/index.html?autostart=1&q=low');await page.waitForFunction(()=>window.__ready,null,{timeout:60000});await prepareGameplayAssets(page);await page.evaluate(()=>{__G.renderer.setAnimationLoop(null);return __G.audio.ready;});await page.mouse.click(550,400);
const result=await page.evaluate(async()=>{const g=__G;g.player.invulnerable=true;const events={};for(const n of ['enemy:step','enemy:fire','enemy:hit','enemy:killed'])g.events.on(n,()=>events[n]=(events[n]||0)+1);const p=g.player.pos.clone();p.z-=5;const bot=g.enemies.spawn('soldier',p,{state:'alert',target:g.player.pos});if(!bot)throw Error('No soldier slot');bot.mode='engage';for(let j=0;j<240;j++)bot._update(1/60);bot.damage(20,bot.pos,null,'body');bot.damage(999,bot.pos,null,'weak');for(let j=0;j<410;j++)bot._update(1/60);const played={};for(const n of ['pistol_shot','shotgun_shot','sniper_shot','rifle_shot','soldier_fire','soldier_step','soldier_alert','soldier_die','reload_magout','reload_magin','reload_bolt','rifle_dry','shell_bounce','impact_metal','impact_enemy','gull_fire','hound_fire'])played[n]=g.audio.play(n,{pos:p});return {events,played,retired:!bot.active,audio:g.audio.debug(),errors:__errors,fatal:__fatal};});assert.equal(result.fatal,null);for(const name of Object.keys(result.played))assert.ok(result.audio.recorded.includes(name),'Missing recording: '+name);assert.deepEqual(result.errors,[]);assert.equal(result.retired,true);for(const played of Object.values(result.played))assert.equal(played,true);for(const n of ['enemy:step','enemy:fire','enemy:hit','enemy:killed'])assert.ok(result.events[n]>0,n);console.log('PASS',result);
const sniperResult=await page.evaluate(()=>{
 const g=__G,w=g.weapon,originalInput=g.input,originalShot=g.combat.playerShot;
 const input={...originalInput,fire:false,ads:false,sprint:false,move:{x:0,y:0},look:{dx:0,dy:0},pressed:()=>false,down:()=>false};g.input=input;
 const shots=[];g.combat.playerShot=(o,d,options)=>{shots.push(options);return null;};
 const tick=(seconds)=>{for(let j=0;j<Math.ceil(seconds*60);j++)w.update(1/60);};
 try{
  w.reset();w.setVisible(true);const rifleAmmo=w.ammo;input.pressed=a=>a==='weapon2';w.update(1/60);input.pressed=()=>false;tick(.4);
  const selected=w.selected,magSize=w.magSize;input.ads=true;tick(.5);g.player.update(1/60);for(let n=0;n<60;n++)g.player.update(1/60);
  const fov=g.camera.fov,scoped=!document.querySelector('.sniper-scope').hidden;
  input.fire=true;tick(.02);const afterFirst=w.ammo;tick(1.5);const afterHold=w.ammo;
  input.fire=false;tick(.02);input.fire=true;tick(.02);const afterSecond=w.ammo;
  input.fire=false;tick(1.4);const reloadStarted=w.reloadNow(),switchDuringReload=w.select(0);tick(3);
  const reloaded=w.ammo,reserve=w.reserve;w.select(0);tick(.4);const restoredRifle=w.ammo;
  w.select(1);tick(.4);w.ammo=0;w.reserve=0;input.fire=true;tick(.02);const emptyAmmo=w.ammo;
  w.reset();return {selected,magSize,fov,scoped,afterFirst,afterHold,afterSecond,reloadStarted,switchDuringReload,reloaded,reserve,restoredRifle,rifleAmmo,emptyAmmo,shots,errors:__errors};
 }finally{g.input=originalInput;g.combat.playerShot=originalShot;}
});
assert.equal(sniperResult.selected,1);assert.equal(sniperResult.magSize,5);assert.ok(sniperResult.fov<24);assert.equal(sniperResult.scoped,true);
assert.equal(sniperResult.afterFirst,4);assert.equal(sniperResult.afterHold,4);assert.equal(sniperResult.afterSecond,3);assert.equal(sniperResult.reloadStarted,true);assert.equal(sniperResult.switchDuringReload,false);assert.equal(sniperResult.reloaded,5);assert.equal(sniperResult.reserve,28);assert.equal(sniperResult.restoredRifle,sniperResult.rifleAmmo);assert.equal(sniperResult.emptyAmmo,0);assert.equal(sniperResult.shots.length,2);assert.equal(sniperResult.shots[0].damage,110);assert.equal(sniperResult.shots[0].range,550);assert.deepEqual(sniperResult.errors,[]);console.log('SNIPER PASS',sniperResult);
await page.evaluate(()=>{const g=__G;g.input.fire=false;g.input.ads=false;g.weapon.select(1);for(let n=0;n<90;n++){g.weapon.update(1/60);g.player.update(1/60);}g.hud.update(1/60);g.render.post.fade=0;document.getElementById('boot').remove();g.render.frame(1/60);});
await page.screenshot({path:'/tmp/saltline-sniper.png'});
await page.evaluate(()=>{const g=__G;g.input.ads=true;for(let n=0;n<90;n++){g.weapon.update(1/60);g.player.update(1/60);}g.hud.update(1/60);g.render.frame(1/60);});
await page.screenshot({path:'/tmp/saltline-scope.png'});


// Run from a Playwright test with: await page.evaluate(saltAutoReloadAssertion)
async function saltAutoReloadAssertion() {
  const g = __G, w = g.weapon, originalInput = g.input, originalShot = g.combat.playerShot;
  const input = { ...originalInput, fire: false, ads: false, sprint: false,
    move: { x: 0, y: 0 }, look: { dx: 0, dy: 0 }, pressed: () => false, down: () => false };
  g.input = input;
  g.combat.playerShot = () => null;
  const tick = seconds => { for (let n = 0; n < Math.ceil(seconds * 60); n++) w.update(1 / 60); };
  try {
    w.reset(); w.setVisible(true); w.select(1); tick(.4);
    w.ammo = 1; w.reserve = 4;
    input.fire = true; tick(.02); input.fire = false;
    const emptyAfterLastShot = w.ammo === 0 && w.state === 'cycling';
    tick(1.4);
    const reloadAfterBolt = w.state === 'reloading';
    tick(3);
    const refilledMag = w.ammo === 4 && w.reserve === 0;

    w.ammo = 1; w.reserve = 0; input.fire = true; tick(.02); input.fire = false;
    tick(4);
    const zeroReserveStable = w.ammo === 0 && w.reserve === 0 && w.state === 'idle';
    w.reset();w.select(1);tick(.4);w.ammo=1;w.reserve=3;input.fire=true;tick(.02);input.fire=false;
    w.select(0);tick(.5);w.select(1);tick(1.4);const reequippedStarted=w.state==='reloading';tick(3);
    const reequippedAutoReload=reequippedStarted&&w.ammo===3&&w.reserve===0;
    w.reset();
    return { emptyAfterLastShot, reloadAfterBolt, refilledMag, zeroReserveStable, reequippedAutoReload };
  } finally {
    g.input = originalInput; g.combat.playerShot = originalShot;
  }
}

// Assertion wrapper for Node/Playwright:
// const result = await page.evaluate(saltAutoReloadAssertion);
// assert.deepEqual(result, {emptyAfterLastShot:true, reloadAfterBolt:true, refilledMag:true, zeroReserveStable:true});

const autoReloadResult=await page.evaluate(saltAutoReloadAssertion);assert.deepEqual(autoReloadResult,{emptyAfterLastShot:true,reloadAfterBolt:true,refilledMag:true,zeroReserveStable:true,reequippedAutoReload:true});console.log('AUTO RELOAD PASS',autoReloadResult);
// Run after the existing browser regression. Assumes `page` and strict `assert`.
const shotgunResults=await page.evaluate(()=>{
 const g=__G,w=g.weapon,oldInput=g.input,oldPhysics=g.physics.raycast,oldEnemies=g.enemies.raycast;
 const oldStats={...g.combat.stats},oldAlive=g.player.alive,oldInvulnerable=g.player.invulnerable;
 g.renderer.setAnimationLoop(null);g.player.alive=true;g.player.invulnerable=true;
 const input={...oldInput,fire:false,ads:false,sprint:false,move:{x:0,y:0},look:{dx:0,dy:0},pressed:()=>false,down:()=>false};g.input=input;
 let targetDistance=8,wallDistance=null;const damage=[],pelletLimits=[];
 const target={type:'soldier',alive:true,pos:g.player.pos.clone(),damage(amount){damage.push(amount);return false;}};
 g.physics.raycast=(origin,dir,range)=>wallDistance!==null&&wallDistance<=range?{dist:wallDistance,point:origin.clone().addScaledVector(dir,wallDistance),normal:dir.clone().negate(),surface:'metal'}:null;
 g.enemies.raycast=(origin,dir,limit)=>{pelletLimits.push(limit);return targetDistance<=limit?{dist:targetDistance,point:origin.clone().addScaledVector(dir,targetDistance),normal:dir.clone().negate(),part:'body',enemy:target}:null;};
 const tick=seconds=>{for(let n=0;n<Math.ceil(seconds*60);n++)w.update(1/60);};
 const release=()=>{input.fire=false;tick(.04);};
 const press=()=>{input.fire=true;tick(.02);};
 const reset=()=>{input.fire=false;w.reset();w.select(2);tick(.4);damage.length=pelletLimits.length=0;g.combat.stats.shots=g.combat.stats.hits=0;};
 try{
  w.reset();w.setVisible(true);input.pressed=a=>a==='weapon3';w.update(1/60);input.pressed=()=>false;tick(.4);
  const selected=w.selected,initialAmmo=w.ammo,initialReserve=w.reserve;
  g.combat.stats.shots=g.combat.stats.hits=0;press();
  const first={ammo:w.ammo,pellets:damage.length,shots:g.combat.stats.shots,hits:g.combat.stats.hits,damage:damage[0]};
  tick(1.1);const heldAmmo=w.ammo;release();press();const nextAmmo=w.ammo;
  reset();targetDistance=40;press();const farDamage=damage[0],farPellets=damage.length;
  reset();targetDistance=8;wallDistance=5;press();const wall={damage:damage.length,shots:g.combat.stats.shots,hits:g.combat.stats.hits,maxLimit:Math.max(...pelletLimits)};wallDistance=null;
  reset();w.ammo=2;w.reserve=4;const reloadStarted=w.reloadNow();tick(.75);const firstShell={ammo:w.ammo,reserve:w.reserve,state:w.state};
  press();const interrupted={ammo:w.ammo,state:w.state,shots:g.combat.stats.shots};release();tick(.9);
  reset();w.ammo=0;w.reserve=2;tick(.02);const autoStarted=w.state==='reloading';tick(1.5);const auto={ammo:w.ammo,reserve:w.reserve,state:w.state};
  reset();w.ammo=0;w.reserve=0;press();tick(1);const dry={ammo:w.ammo,reserve:w.reserve,shots:g.combat.stats.shots,state:w.state};
  return {selected,initialAmmo,initialReserve,first,heldAmmo,nextAmmo,farDamage,farPellets,wall,reloadStarted,firstShell,interrupted,autoStarted,auto,dry,errors:__errors.slice()};
 }finally{
  w.reset();g.input=oldInput;g.physics.raycast=oldPhysics;g.enemies.raycast=oldEnemies;Object.assign(g.combat.stats,oldStats);g.player.alive=oldAlive;g.player.invulnerable=oldInvulnerable;
 }
});
assert.equal(shotgunResults.selected,2);
assert.equal(shotgunResults.initialAmmo,6);assert.equal(shotgunResults.initialReserve,36);
assert.equal(shotgunResults.first.ammo,5);assert.equal(shotgunResults.first.pellets,8);assert.equal(shotgunResults.first.shots,1);assert.equal(shotgunResults.first.hits,1);
assert.equal(shotgunResults.heldAmmo,5);assert.equal(shotgunResults.nextAmmo,4);
assert.equal(shotgunResults.farPellets,8);assert.ok(shotgunResults.farDamage>0&&shotgunResults.farDamage<shotgunResults.first.damage*.4);
assert.equal(shotgunResults.wall.damage,0);assert.equal(shotgunResults.wall.shots,1);assert.equal(shotgunResults.wall.hits,0);assert.equal(shotgunResults.wall.maxLimit,5);
assert.equal(shotgunResults.reloadStarted,true);assert.deepEqual(shotgunResults.firstShell,{ammo:3,reserve:3,state:'reloading'});
assert.equal(shotgunResults.interrupted.ammo,2);assert.equal(shotgunResults.interrupted.shots,1);assert.equal(shotgunResults.interrupted.state,'cycling');
assert.equal(shotgunResults.autoStarted,true);assert.deepEqual(shotgunResults.auto,{ammo:2,reserve:0,state:'idle'});
assert.deepEqual(shotgunResults.dry,{ammo:0,reserve:0,shots:0,state:'idle'});assert.deepEqual(shotgunResults.errors,[]);
console.log('SHOTGUN PASS',shotgunResults);
// Call after SALT_GLOCK17 is registered as loadout slot 3 (key 4).
async function checkGlock17(page,assert){
 const result=await page.evaluate(()=>{
  const g=__G,w=g.weapon,originalInput=g.input,originalShot=g.combat.playerShot,shots=[];
  const input={fire:false,ads:false,look:{dx:0,dy:0},pressed:()=>false};g.input=input;g.combat.playerShot=(origin,dir,options)=>{shots.push(options);return null;};
  const tick=dt=>w.update(dt),shot=()=>{input.fire=false;tick(.2);input.fire=true;tick(.02);input.fire=false;tick(.01);};
  try{
   w.reset();w.setVisible(true);w.select(3);tick(.4);const pistolRoot=w.root;
   const initial={selected:w.selected,name:w.name,mag:w.magSize,ammo:w.ammo,reserve:w.reserve};
   input.fire=true;tick(.02);const first=w.ammo;tick(.4);const held=w.ammo;input.fire=false;tick(.02);input.fire=true;tick(.02);input.fire=false;const second=w.ammo;
   tick(.3);const manualStarted=w.reloadNow();tick(.5);const magazineMoving=w.debug.magazineDrop>.05;tick(1.4);const manual={ammo:w.ammo,reserve:w.reserve,state:w.state};
   input.ads=true;tick(.3);const aimed=w.ads>.99&&w.root.visible;input.ads=false;tick(.3);
   w.ammo=1;w.reserve=2;shot();tick(.2);const autoStarted=w.state==='reloading',slideLocked=w.debug.slideOffset>.02;tick(1.8);const auto={ammo:w.ammo,reserve:w.reserve,state:w.state};
   tick(.3);w.ammo=1;w.reserve=0;shot();tick(.4);const dryBefore=shots.length;shot();tick(2);const dry={ammo:w.ammo,reserve:w.reserve,state:w.state,noShot:shots.length===dryBefore,locked:w.debug.slideOffset>.02};
   w.ammo=1;w.reserve=3;shot();w.select(0);tick(.5);const hidden=!pistolRoot.visible,rifleAmmo=w.ammo;w.select(3);tick(.5);const reequippedStarted=w.state==='reloading';tick(2);const reequipped={ammo:w.ammo,reserve:w.reserve,started:reequippedStarted};
   w.ammo=4;w.reserve=1;tick(.3);w.reloadNow();tick(1.9);const partial={ammo:w.ammo,reserve:w.reserve};
   w.reset();return{initial,first,held,second,manualStarted,magazineMoving,manual,aimed,autoStarted,slideLocked,auto,dry,hidden,rifleAmmo,reequipped,partial,shots,errors:__errors.slice()};
  }finally{g.input=originalInput;g.combat.playerShot=originalShot;}
 });
 assert.equal(result.initial.selected,3);assert.equal(result.initial.mag,17);assert.equal(result.initial.ammo,17);assert.equal(result.initial.reserve,68);
 assert.equal(result.first,16);assert.equal(result.held,16);assert.equal(result.second,15);assert.ok(result.manualStarted&&result.magazineMoving&&result.aimed);
 assert.deepEqual(result.manual,{ammo:17,reserve:66,state:'idle'});assert.ok(result.autoStarted&&result.slideLocked);assert.deepEqual(result.auto,{ammo:2,reserve:0,state:'idle'});
 assert.deepEqual(result.dry,{ammo:0,reserve:0,state:'idle',noShot:true,locked:true});assert.ok(result.hidden);assert.equal(result.rifleAmmo,30);
 assert.deepEqual(result.reequipped,{ammo:3,reserve:0,started:true});assert.deepEqual(result.partial,{ammo:5,reserve:0});
 assert.ok(result.shots.length>=5);for(const shot of result.shots){assert.equal(shot.damage,28);assert.equal(shot.range,90);}assert.deepEqual(result.errors,[]);
 console.log('GLOCK 17 PASS',result);
}

await checkGlock17(page,assert);
// Add to the existing Playwright regression after the gameplay page has loaded
// and before browser.close(). Assumes the proposed mission hooks described in
// the task: game.start({mission, skipIntro}), game.debugCut(), game.run and
// game.mission. This is intentionally standalone from the repository test.
async function checkSaltlineMissions(page, assert) {
  const result = await page.evaluate(() => {
    const g = __G;
    const expected = [
      { index: 0, id: 'first-contact', relayIds: ['relay_a'], totalEnemies: 4, maxAlive: 2, damage: 0.45 },
      { index: 1, id: 'warehouse-sweep', relayIds: ['relay_b', 'relay_c'], totalEnemies: 8, maxAlive: 3, damage: 0.6, clearEnemies: true },
      { index: 2, id: 'terminal-blackout', relayIds: ['relay_a', 'relay_b', 'relay_c'], totalEnemies: 12, maxAlive: 4, damage: 0.75 },
    ];
    const snapshots = [];
    const alive = () => g.enemies.aliveCount
      ? g.enemies.aliveCount()
      : g.enemies.list.filter(e => e.alive).length;
    const killActive = () => {
      for (const e of g.enemies.list) {
        if (e && e.alive && typeof e.damage === 'function')
          e.damage(9999, e.pos, null, 'weak');
      }
    };
    const tick = () => {
      // Advance both systems because the harness has paused the render loop.
      g.enemies.update?.(0.25);
      g.game.update(0.25);
    };

    for (const profile of expected) {
      g.game.start({ mission: profile.index, skipIntro: true });
      g.player.invulnerable = true;
      const mission = g.game.mission;
      if (!mission) throw Error('game.mission is not exposed');
      if (mission.id !== profile.id) throw Error(`selected mission ${profile.index}, got ${mission.id}`);
      const actualRelayIds = g.game.run.relays.map(r => r.id);
      if (JSON.stringify(actualRelayIds) !== JSON.stringify(profile.relayIds))
        throw Error(`mission ${profile.id} run relays mismatch: ${actualRelayIds}`);
      // Exercise the actual incoming-damage path, then restore health before play.
      g.player.health = g.player.maxHealth;
      g.player.invulnerable = false;
      g.player.damage(20, g.player.pos);
      const damageHealth = g.player.health;
      const expectedHealth = g.player.maxHealth - 20 * profile.damage;
      if (Math.abs(damageHealth - expectedHealth) > 1e-6)
        throw Error(`mission ${profile.id} damage scaling: health ${damageHealth}, expected ${expectedHealth}`);
      g.player.health = g.player.maxHealth;
      g.player.invulnerable = true;
      const selected = {
        id: mission.id,
        relayIds: [...mission.relayIds],
        clearEnemies: !!mission.clearEnemies,
        totalEnemies: g.game.run.totalEnemies,
        maxAlive: g.game.flow.maxAlive,
        state: g.game.state,
      };
      if (JSON.stringify(selected.relayIds) !== JSON.stringify(profile.relayIds))
        throw Error(`mission ${profile.id} relay selection mismatch: ${selected.relayIds}`);
      if (selected.totalEnemies !== profile.totalEnemies)
        throw Error(`mission ${profile.id} totalEnemies ${selected.totalEnemies}`);
      if (selected.maxAlive !== profile.maxAlive)
        throw Error(`mission ${profile.id} maxAlive ${selected.maxAlive}`);
      if (selected.state !== 'playing') throw Error(`mission ${profile.id} did not start: ${selected.state}`);

      // Cut the selected relay(s), letting each wave begin without draining it.
      for (const relayId of profile.relayIds) {
        const target = g.game.run.relays.find(r => r.id === relayId && !r.cut);
        if (!target) throw Error(`mission ${profile.id} is missing live relay ${relayId}`);
        g.game.debugCut();
        for (let n = 0; n < 30; n++) {
          tick();
          if (alive() > profile.maxAlive)
            throw Error(`mission ${profile.id} exceeded cap: ${alive()} > ${profile.maxAlive}`);
        }
        if (g.game.run.relays.find(r => r.id === relayId)?.cut !== true)
          throw Error(`debugCut did not cut ${relayId}`);
        if (alive() > profile.maxAlive)
          throw Error(`mission ${profile.id} exceeded cap: ${alive()} > ${profile.maxAlive}`);
      }

      // Relays alone must not complete a clear-enemies mission.
      if (selected.clearEnemies) {
        g.player.pos.copy(g.level.extraction.pos);
        g.game.update(0.016);
        if (g.game.state === 'complete')
          throw Error(`mission ${profile.id} completed before all enemies were eliminated`);
        // Leave extraction so the clear requirement cannot freeze further spawns.
        g.player.pos.copy(g.level.playerStart.pos);
      }

      // Drain delayed spawns and verify the finite enemy count/counters.
      for (let n = 0; n < 400; n++) {
        killActive();
        tick();
        if (alive() > profile.maxAlive)
          throw Error(`mission ${profile.id} exceeded cap while draining: ${alive()} > ${profile.maxAlive}`);
        if (!g.game.run.queue.length && alive() === 0 &&
            g.game.run.spawned === profile.totalEnemies) break;
      }
      const run = g.game.run;
      if (run.spawned !== profile.totalEnemies)
        throw Error(`mission ${profile.id} spawned ${run.spawned}/${profile.totalEnemies}`);
      if (run.eliminated !== profile.totalEnemies)
        throw Error(`mission ${profile.id} eliminated ${run.eliminated}/${profile.totalEnemies}`);
      if (run.queue.length || alive()) throw Error(`mission ${profile.id} left enemies/queue active`);

      g.player.pos.copy(g.level.extraction.pos);
      g.game.update(0.016);
      if (g.game.state !== 'complete')
        throw Error(`mission ${profile.id} did not complete at extraction after objectives cleared`);
      snapshots.push({ ...selected, damageHealth, expectedHealth, actualRelayIds, spawned: run.spawned, eliminated: run.eliminated,
        cut: run.cut, state: g.game.state });
      g.player.invulnerable = false;
    }
    return { snapshots, errors: __errors.slice(), fatal: __fatal };
  });
  assert.equal(result.fatal, null);
  assert.deepEqual(result.errors, []);
  assert.equal(result.snapshots.length, 3);
  console.log('MISSIONS PASS', result);
}

async function checkDroneSwarm(page, assert) {
 for(const config of [{level:0,total:12,cap:3,initial:3},{level:1,total:20,cap:5,initial:4},{level:2,total:30,cap:7,initial:5}]){
 const result=await page.evaluate(({level,total,cap,initial})=>{
  const g=__G,check=(ok,message)=>{if(!ok)throw Error(message);},originalSpawn=g.enemies.spawn,types=[];
  g.enemies.spawn=function(type,...args){const enemy=originalSpawn.call(this,type,...args);if(enemy)types.push(type);return enemy;};
  try{
   g.game.start({swarmLevel:level,mission:3});
   for(let n=0;n<40;n++){g.enemies.update(.05);g.game.update(.05);}
   check(g.game.state==='intro'&&g.player.health===g.player.maxHealth&&g.enemies.list.filter(e=>e.alive).every(e=>e.passive),'drones attacked during intro');
   g.game.update(2);check(g.game.state==='playing'&&g.enemies.list.filter(e=>e.alive).every(e=>!e.passive),'drones stayed passive after intro');types.length=0;
   g.game.start({swarmLevel:level,mission:3,skipIntro:true});g.player.invulnerable=true;
   const run=g.game.run,alive=()=>g.enemies.list.filter(e=>e.alive),tick=()=>{g.enemies.update(.25);g.game.update(.25);};
   check(g.game.mission.id==='drone-swarm','wrong swarm profile');check(run.totalEnemies===total&&run.relays.length===0,'swarm mission targets');
   check(run.queue.every(e=>e.type==='gull')&&alive().every(e=>e.type==='gull'),'ground enemy in swarm');
   check(g.hud.root.querySelector('.h-relays').style.display==='none','relay HUD visible');
   for(let n=0;n<60;n++)g.hud.update(.05);check(g.hud.root.querySelector('.h-obj-t').textContent.includes(total+' remaining'),'swarm objective missing');
   g.game.pause();const before=run.time;g.game.update(3);check(run.time===before,'paused swarm advanced');g.game.resume();
   g.player.pos.copy(g.level.extraction.pos);g.game.debugCut();g.game.update(.25);check(g.game.state==='playing'&&run.cut===0,'boat or relay bypassed swarm');
   g.player.pos.copy(g.level.playerStart.pos);
   for(let n=0;n<120;n++)tick();check(alive().length===cap&&run.queue.length>0,'swarm cap or queue incorrect');
   // Hit an actual airborne hull through the shared weapon raycast/damage path.
   const drone=alive()[0],origin=drone.pos.clone().add(new g.THREE.Vector3(0,2,0));
   const hit=g.combat.playerShot(origin,new g.THREE.Vector3(0,-1,0),{damage:9999,range:4});
   check(hit?.enemy===drone&&!drone.alive&&run.eliminated===1,'aerial weapon hit did not count');
   g.player.health=30;g.weapon.reserve=1;let supply=false,maxActive=cap;
   for(let n=0;n<1000&&run.eliminated<total-1;n++){
    for(const enemy of alive()){
     if(run.eliminated>=total-1)break;
     enemy.damage(9999,enemy.pos,null,'weak');
     if(run.eliminated===5){check(g.player.health===50&&g.weapon.reserve>1,'five-kill supply missing');supply=true;}
    }
    tick();maxActive=Math.max(maxActive,alive().length);check(alive().length<=cap,'swarm exceeded active cap');
   }
   for(let n=0;n<100&&alive().length===0;n++)tick();
   check(run.eliminated===total-1&&run.spawned===total&&alive().length===1&&run.queue.length===0,'swarm budget not drained');
   check(g.game.state==='playing','swarm completed before last drone');
   for(let n=0;n<60;n++)g.hud.update(.05);check(g.hud.root.querySelector('.h-obj-t').textContent.includes('1 remaining'),'remaining-drone HUD stale');
   check(g.hud.root.querySelectorAll('.h-wm.extract').length===0,'unexpected extraction marker');
   const last=alive()[0];last.damage(9999,last.pos,null,'weak');tick();
   check(g.game.state==='complete'&&run.eliminated===total,'last drone did not finish mission');
   check(g.player.pos.distanceTo(g.level.extraction.pos)>5,'test inadvertently extracted');
   g.game.update(4);check(g.game.menus.root.querySelector('.m-debrief .m-h').textContent==='Drone Swarm · Level '+(level+1)+' complete','wrong debrief');
   check(g.game.menus.root.querySelector('[data-act="next"]').hidden===(level===2),'swarm next level visibility');
   check(types.length===total&&types.every(t=>t==='gull'),'non-drone or incorrect spawn budget');
   const summary={level,total,map:g.level.map.id,spawned:run.spawned,eliminated:run.eliminated,maxActive,supply,actualAerialHit:true};
   if(level<2){g.game.menus.root.querySelector('[data-act="next"]').click();check(g.game.mission.swarmLevel===level+1,'next swarm level failed');}
   g.game.start({swarmLevel:level,mission:3,skipIntro:true});check(run.eliminated===0&&run.spawned===initial&&run.queue.length===total-initial,'swarm retry did not reset');
   g.player.invulnerable=false;g.player.damage(9999,g.player.pos);g.game.update(2);
   check(g.game.state==='dead','swarm death failed');check(g.game.menus.root.querySelector('[data-f="dead-label"]').textContent==='Drones destroyed','wrong swarm death label');
   g.game.start({mission:0,skipIntro:true});check(g.hud.root.querySelector('.h-relays').style.display!=='none','relay HUD not restored');
   return {...summary,errors:__errors.slice(),fatal:__fatal};
  }finally{g.enemies.spawn=originalSpawn;}
 },config);
 assert.equal(result.fatal,null);assert.deepEqual(result.errors,[]);
 await page.evaluate(()=>{__G.game.pause();__G.game.menus.root.querySelector('[data-act="missions"]').click();});
 await page.locator('[data-mission="3"]').click();assert.equal(await page.locator('[data-mission="3"]').getAttribute('aria-pressed'),'true');
 assert.match(await page.locator('[data-mission="3"]').textContent(),/Drones only/);
 await page.locator('[data-swarm="'+config.level+'"]').click();assert.equal(await page.locator('[data-swarm="'+config.level+'"]').getAttribute('aria-pressed'),'true');
 await page.screenshot({path:'/tmp/saltline-swarm-'+result.map+'-'+config.level+'.png'});
 await page.locator('[data-act="deploy"]').click();assert.equal(await page.evaluate(()=>__G.game.mission.id),'drone-swarm');
 assert.equal(await page.evaluate(()=>__G.game.run.totalEnemies),config.total);
 console.log('DRONE SWARM PASS',result);
 }
}


await checkSaltlineMissions(page,assert);
await checkDroneSwarm(page,assert);
await page.evaluate(()=>{__G.game.start({mission:0,skipIntro:true});__G.player.invulnerable=true;});
for(const [key,expected] of [['z',true],['ControlLeft',false],['ControlRight',false],['c',true]]){
 await page.keyboard.down(key);assert.equal(await page.evaluate(()=>{__G.input.update(1/60);return __G.input.crouch;}),expected,key);
 await page.keyboard.up(key);assert.equal(await page.evaluate(()=>{__G.input.update(1/60);return __G.input.crouch;}),false,'release '+key);
}
console.log('CROUCH PASS');
await page.evaluate(()=>{const g=__G;g.input.fire=g.input.ads=false;g.weapon.select(2);for(let n=0;n<30;n++){g.weapon.update(1/60);g.player.update(1/60);}g.hud.update(1/60);g.render.post.fade=0;g.render.frame(1/60);});
await page.screenshot({path:'/tmp/saltline-shotgun.png'});
await page.evaluate(()=>{__G.game.pause();__G.game.menus.root.querySelector('[data-act="missions"]').click();});
await page.locator('[data-mission="1"]').click();assert.equal(await page.locator('[data-mission="1"]').getAttribute('aria-pressed'),'true');
await page.screenshot({path:'/tmp/saltline-missions.png'});
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/saltline-missions-mobile.png'});
await page.locator('[data-act="deploy"]').click();assert.equal(await page.evaluate(()=>__G.game.mission.id),'warehouse-sweep');
assert.deepEqual(await page.evaluate(()=>__errors),[]);console.log('MISSION MENU PASS');

// Map selection rebuilds the level using the same props with independent placement data.
const originalMap=await page.evaluate(()=>({id:__G.level.map.id,containers:__G.level.placed.filter(p=>p.name.startsWith('container')),interior:__G.level.interiorBoxes.map(b=>({min:b.min.toArray(),max:b.max.toArray()})),start:__G.level.playerStart.pos.toArray(),extraction:__G.level.extraction.pos.toArray()}));
assert.equal(originalMap.id,'berth4');
await page.evaluate(()=>{__G.game.start({mission:1,skipIntro:true});__G.game.pause();__G.game.menus.root.querySelector('[data-act="missions"]').click();});
await Promise.all([page.waitForURL('**/*map=crossdock*'),page.locator('[data-map="crossdock"]').click()]);
await page.waitForFunction(()=>window.__ready,null,{timeout:60000});await prepareGameplayAssets(page);
await page.waitForFunction(()=>document.getElementById('boot').hidden);await page.locator('#boot').evaluate(el=>el.remove());
await page.evaluate(()=>__G.renderer.setAnimationLoop(null));
assert.equal(await page.locator('[data-map="crossdock"]').getAttribute('aria-pressed'),'true');
assert.equal(await page.locator('[data-mission="1"]').getAttribute('aria-pressed'),'true');
const newMap=await page.evaluate(()=>{
 const g=__G,l=g.level,nav=g.physics.nav,failures=[];
 if(!nav.isWalkable(l.playerStart.pos.x,l.playerStart.pos.z))failures.push('blocked player start');
 for(const target of [...l.objectives,{id:'extraction',pos:l.extraction.pos}]){
  // Relay bodies are solid: verify a reachable point inside interaction range.
  const reachable=Array.from({length:16},(_,n)=>new g.THREE.Vector3(target.pos.x+Math.cos(n*Math.PI/8)*1.6,0,target.pos.z+Math.sin(n*Math.PI/8)*1.6)).some(p=>{
   if(!nav.isWalkable(p.x,p.z))return false;
   const path=nav.findPath(l.playerStart.pos,p);return path?.length&&path.every(v=>nav.isWalkable(v.x,v.z))&&path[path.length-1].distanceTo(p)<.8;
  });
  if(!reachable)failures.push('unreachable '+target.id);
 }
 for(const spawn of l.enemySpawns.filter(p=>p.type==='ground')){const path=nav.findPath(l.playerStart.pos,spawn.pos);if(!nav.isWalkable(spawn.pos.x,spawn.pos.z)||!path?.length||path[path.length-1].distanceTo(spawn.pos)>.8)failures.push('unreachable enemy spawn '+spawn.pos.toArray());}
 const containers=l.placed.filter(p=>p.name.startsWith('container'));
 if(containers.some(p=>p.y===0&&nav.isWalkable(p.x,p.z)))failures.push('container without collision');
 return {id:l.map.id,title:l.map.title,containers,interior:l.interiorBoxes.map(b=>({min:b.min.toArray(),max:b.max.toArray()})),start:l.playerStart.pos.toArray(),extraction:l.extraction.pos.toArray(),dry:{rain:g.ground.rainLevel,wet:g.mats.uniforms.wet.value,puddle:g.ground.isPuddle(0,0),surface:g.ground.wetnessAt(0,0),sea:g.ground.sea,ground:g.ground.root.name,backdrop:g.backdrop.root.name},failures,stats:l.stats,errors:__errors,fatal:__fatal};
});
assert.equal(newMap.id,'crossdock');assert.equal(newMap.title,'Dry Basin');
assert.notDeepEqual(newMap.containers,originalMap.containers);assert.notDeepEqual(newMap.interior,originalMap.interior);
assert.notDeepEqual(newMap.start,originalMap.start);assert.notDeepEqual(newMap.extraction,originalMap.extraction);
assert.deepEqual(newMap.dry,{rain:0,wet:0,puddle:false,surface:0,sea:null,ground:'dry-basin-ground',backdrop:'dry-basin-backdrop'});
assert.deepEqual(newMap.failures,[]);assert.deepEqual(newMap.errors,[]);assert.equal(newMap.fatal,null);
await page.setViewportSize({width:1280,height:800});await page.screenshot({path:'/tmp/saltline-crossdock-menu.png'});
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/saltline-crossdock-mobile.png'});
assert.equal(await page.locator('[data-map="crossdock"]').isVisible(),true);
await checkSaltlineMissions(page,assert);
await checkDroneSwarm(page,assert);
await page.setViewportSize({width:1280,height:800});
await page.evaluate(()=>{const g=__G;g.game.menus.show('none');g.hud.show(false);g.weapon.setVisible(false);g.camera.position.set(-38,38,46);g.camera.lookAt(0,0,0);g.camera.fov=65;g.camera.updateProjectionMatrix();g.render.post.fade=0;g.render.frame(.016);});
await page.screenshot({path:'/tmp/salt-crossdock-overview.png'});
console.log('MAP PASS',{id:newMap.id,stats:newMap.stats,routes:'all objectives, extraction and ground spawns reachable',missionPreserved:true});
// Use raw screen coordinates so Playwright cannot hide an off-screen Deploy bug
// by automatically scrolling the button into view.
for(const [width,height] of [[1280,720],[1366,768],[1024,600],[800,600],[390,844],[360,640],[844,390]]){
 await page.setViewportSize({width,height});
 await page.evaluate(()=>{__G.game.start({mission:0,skipIntro:true});__G.game.pause();__G.game.menus.root.querySelector('[data-act="missions"]').click();document.querySelector('.m-title-main').scrollTop=0;});
 await page.locator('[data-mission="3"]').click();
 const target=await page.locator('[data-act="deploy"]').evaluate(button=>{const rect=button.getBoundingClientRect(),x=rect.x+rect.width/2,y=rect.y+rect.height/2;return{x,y,visible:rect.top>=0&&rect.bottom<=innerHeight,hit:document.elementFromPoint(x,y)?.closest('button')===button};});
 assert.ok(target.visible&&target.hit,'Deploy unreachable at '+width+'x'+height);
 await page.mouse.click(target.x,target.y);
 assert.equal(await page.evaluate(()=>__G.game.mission.id),'drone-swarm');
 assert.equal(await page.evaluate(()=>__G.game.state),'intro');
 await page.evaluate(()=>__G.game.update(4));assert.equal(await page.evaluate(()=>__G.game.state),'playing');
}
console.log('DEPLOY VISIBILITY PASS: seven desktop, mobile and landscape sizes');
await page.setViewportSize({width:360,height:640});
await page.evaluate(()=>{__G.game.start({mission:0,skipIntro:true});__G.game.pause();__G.game.menus.root.querySelector('[data-act="missions"]').click();});
const touch=await page.context().newCDPSession(page);await touch.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
async function tapCenter(locator){const r=await locator.boundingBox();assert.ok(r);const x=r.x+r.width/2,y=r.y+r.height/2;await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
await page.locator('[data-mission="3"]').scrollIntoViewIfNeeded();await tapCenter(page.locator('[data-mission="3"]'));
assert.equal(await page.locator('[data-mission="3"]').getAttribute('aria-pressed'),'true');
await page.screenshot({path:'/tmp/saltline-deploy-footer-mobile.png'});
await tapCenter(page.locator('[data-act="deploy"]'));
assert.equal(await page.evaluate(()=>__G.game.state),'intro');assert.equal(await page.evaluate(()=>__G.game.mission.id),'drone-swarm');assert.deepEqual(await page.evaluate(()=>__errors),[]);
await touch.detach();console.log('TOUCH DEPLOY PASS');
await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
