const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
for(const script of fs.readFileSync('s.html','utf8').matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});const page=await browser.newPage({viewport:{width:1100,height:800}});page.on('pageerror',e=>console.log('PAGEERROR',e.message));
await page.goto('http://127.0.0.1:8087/s.html?show=enemies&eshow=soldier&efreeze=1');await page.waitForFunction(()=>window.__ready,null,{timeout:60000});await page.waitForFunction(()=>document.getElementById("boot").hidden);await page.locator('#boot').evaluate(el=>el.remove());await page.screenshot({path:'/tmp/saltline-robot.png'});console.log('SHOWCASE',await page.evaluate(()=>({fatal:__fatal,errors:__errors,stats:__stats(),enemies:__G.enemies.list.length})));
await page.goto('http://127.0.0.1:8087/s.html?autostart=1&q=low');await page.waitForFunction(()=>window.__ready,null,{timeout:60000});await page.evaluate(()=>{__G.renderer.setAnimationLoop(null);return __G.audio.ready;});await page.mouse.click(550,400);
const result=await page.evaluate(async()=>{const g=__G;g.player.invulnerable=true;const events={};for(const n of ['enemy:step','enemy:fire','enemy:hit','enemy:killed'])g.events.on(n,()=>events[n]=(events[n]||0)+1);const p=g.player.pos.clone();p.z-=5;const bot=g.enemies.spawn('soldier',p,{state:'alert',target:g.player.pos});if(!bot)throw Error('No soldier slot');bot.mode='engage';for(let j=0;j<240;j++)bot._update(1/60);bot.damage(20,bot.pos,null,'body');bot.damage(999,bot.pos,null,'weak');for(let j=0;j<410;j++)bot._update(1/60);const played={};for(const n of ['sniper_shot','rifle_shot','soldier_fire','soldier_step','soldier_alert','soldier_die','reload_magout','reload_magin','reload_bolt','rifle_dry','shell_bounce','impact_metal','impact_enemy','gull_fire','hound_fire'])played[n]=g.audio.play(n,{pos:p});return {events,played,retired:!bot.active,audio:g.audio.debug(),errors:__errors,fatal:__fatal};});assert.equal(result.fatal,null);for(const name of Object.keys(result.played))assert.ok(result.audio.recorded.includes(name),'Missing recording: '+name);assert.deepEqual(result.errors,[]);assert.equal(result.retired,true);for(const played of Object.values(result.played))assert.equal(played,true);for(const n of ['enemy:step','enemy:fire','enemy:hit','enemy:killed'])assert.ok(result.events[n]>0,n);console.log('PASS',result);
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


await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
