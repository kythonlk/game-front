const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
for(const script of fs.readFileSync('s.html','utf8').matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});const page=await browser.newPage({viewport:{width:1100,height:800}});page.on('pageerror',e=>console.log('PAGEERROR',e.message));
await page.goto('http://127.0.0.1:8087/s.html?show=enemies&eshow=soldier&efreeze=1');await page.waitForFunction(()=>window.__ready,null,{timeout:60000});await page.waitForFunction(()=>document.getElementById("boot").hidden);await page.locator('#boot').evaluate(el=>el.remove());await page.screenshot({path:'/tmp/saltline-robot.png'});console.log('SHOWCASE',await page.evaluate(()=>({fatal:__fatal,errors:__errors,stats:__stats(),enemies:__G.enemies.list.length})));
await page.goto('http://127.0.0.1:8087/s.html?autostart=1&q=low');await page.waitForFunction(()=>window.__ready,null,{timeout:60000});await page.evaluate(()=>{__G.renderer.setAnimationLoop(null);return __G.audio.ready;});await page.mouse.click(550,400);
const result=await page.evaluate(async()=>{const g=__G;g.player.invulnerable=true;const events={};for(const n of ['enemy:step','enemy:fire','enemy:hit','enemy:killed'])g.events.on(n,()=>events[n]=(events[n]||0)+1);const p=g.player.pos.clone();p.z-=5;const bot=g.enemies.spawn('soldier',p,{state:'alert',target:g.player.pos});if(!bot)throw Error('No soldier slot');bot.mode='engage';for(let j=0;j<240;j++)bot._update(1/60);bot.damage(20,bot.pos,null,'body');bot.damage(999,bot.pos,null,'weak');for(let j=0;j<410;j++)bot._update(1/60);const played={};for(const n of ['shotgun_shot','sniper_shot','rifle_shot','soldier_fire','soldier_step','soldier_alert','soldier_die','reload_magout','reload_magin','reload_bolt','rifle_dry','shell_bounce','impact_metal','impact_enemy','gull_fire','hound_fire'])played[n]=g.audio.play(n,{pos:p});return {events,played,retired:!bot.active,audio:g.audio.debug(),errors:__errors,fatal:__fatal};});assert.equal(result.fatal,null);for(const name of Object.keys(result.played))assert.ok(result.audio.recorded.includes(name),'Missing recording: '+name);assert.deepEqual(result.errors,[]);assert.equal(result.retired,true);for(const played of Object.values(result.played))assert.equal(played,true);for(const n of ['enemy:step','enemy:fire','enemy:hit','enemy:killed'])assert.ok(result.events[n]>0,n);console.log('PASS',result);
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
    w.reset();
    return { emptyAfterLastShot, reloadAfterBolt, refilledMag, zeroReserveStable };
  } finally {
    g.input = originalInput; g.combat.playerShot = originalShot;
  }
}

// Assertion wrapper for Node/Playwright:
// const result = await page.evaluate(saltAutoReloadAssertion);
// assert.deepEqual(result, {emptyAfterLastShot:true, reloadAfterBolt:true, refilledMag:true, zeroReserveStable:true});

const autoReloadResult=await page.evaluate(saltAutoReloadAssertion);assert.deepEqual(autoReloadResult,{emptyAfterLastShot:true,reloadAfterBolt:true,refilledMag:true,zeroReserveStable:true});console.log('AUTO RELOAD PASS',autoReloadResult);
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

// Usage: await checkSaltlineMissions(page, assert);

await checkSaltlineMissions(page,assert);
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

await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
