const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
 const page=await browser.newPage({viewport:{width:1100,height:800}});page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 for(const map of ['berth4','crossdock']){
  await page.goto('http://127.0.0.1:8087/index.html?map='+map+'&mission=4&q=low&noaudio=1');await page.waitForFunction(()=>window.__ready,null,{timeout:90000});
  await page.evaluate(async()=>{__G.renderer.setAnimationLoop(null);await __G.assets.prepareMode('foot');await __G.assets.prepareMode('fpv');document.getElementById('boot').remove();});
  assert.equal(await page.locator('button[data-pilot="fpv"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('[data-mission="0"]').isVisible(),false);
  for(const id of [4,5,6]){
   const result=await page.evaluate(id=>{
    const g=__G,check=(ok,m)=>{if(!ok)throw Error(m);};
    g.game.start({mission:id});check(g.player.fpv&&g.weapon.selected===-1,'FPV adapter inactive');
    for(let n=0;n<30;n++){g.enemies.update(.05);g.game.update(.05);}check(g.player.health===100&&g.enemies.list.filter(e=>e.alive).every(e=>e.passive),'unsafe intro');
    g.game.update(4);check(g.game.state==='playing','intro transition');g.player.invulnerable=true;
    check(g.game.run.relays.length===0,'hunt has relay requirement');
    const run=g.game.run,types=new Set(),alive=()=>g.enemies.list.filter(e=>e.alive),tick=()=>{g.enemies.update(.25);g.game.update(.25);};let cap=0;
    if(id===6){g.radar.reset();for(const node of g.radar.nodes)node.radius=0;}
    for(let n=0;n<1000&&run.eliminated<run.totalEnemies-1;n++){
     for(const e of alive()){types.add(e.type);if(run.eliminated<run.totalEnemies-1)e.damage(9999,e.pos,null,'weak');}
     tick();cap=Math.max(cap,alive().length);check(cap<=g.game.mission.maxAlive,'active cap');
    }
    for(let n=0;n<100&&!alive().length;n++)tick();
    check(run.spawned===run.totalEnemies&&run.eliminated===run.totalEnemies-1&&alive().length===1,'incorrect mission budget');
    check(g.game.state==='playing','premature completion');
    if(id===6){
     const node=g.radar.nodes[0];node.radius=23;node.pos.copy(g.player.eye);node.pos.z-=4;node.pos.y=g.player.eye.y-3.7;node.angle=0;node.rate=0;
     for(let n=0;n<6;n++)g.radar.update(.25);check(g.radar.scanned&&g.radar.exposure>.3,'radar failed to scan');
    }
    alive()[0].damage(9999,alive()[0].pos,null,'weak');g.game.update(.01);
    if(id===6){check(g.game.state==='playing','radar exposure did not block completion');for(const node of g.radar.nodes)node.radius=0;for(let n=0;n<20;n++)g.game.update(.25);}
    check(g.game.state==='complete','hunt did not finish');check(id===4?types.size===1&&types.has('gull'):types.size===3,'wrong target types');
    g.game.update(4);check(g.game.menus.root.querySelector('[data-act="next"]').hidden===(id===6),'next boundary');
    if(id<6){g.game.menus.root.querySelector('[data-act="next"]').click();check(g.game.mission.id===(id===4?'machine-hunt':'radar-run'),'next FPV mission');}
    g.game.start({mission:id,skipIntro:true});check(g.game.run.eliminated===0&&g.radar.exposure===0,'retry reset');
    g.game.pause();const time=run.time;g.game.update(3);check(run.time===time,'pause advanced mission');g.game.resume();
    g.player.invulnerable=false;g.player.damage(9999,g.player.pos);g.game.update(2);check(g.game.state==='dead','FPV death');
    const summary={id,total:run.totalEnemies,types:[...types],cap};
    g.game.start({mission:0,skipIntro:true});check(!g.player.fpv&&g.weapon.selected===0&&g.player.onGround,'foot mode not restored');
    return {...summary,errors:__errors.slice(),fatal:__fatal};
   },id);assert.deepEqual(result.errors,[]);assert.equal(result.fatal,null);console.log('FPV MISSION PASS',map,result);
  }
  // Scan, damage and cover use the production radar path and physics raycaster.
  const radar=await page.evaluate(()=>{
   const g=__G;g.game.start({mission:6,skipIntro:true});g.enemies.clear();g.player.invulnerable=false;
   const node=g.radar.nodes[0];for(const n of g.radar.nodes)n.radius=0;node.radius=23;node.pos.copy(g.player.eye);node.pos.z-=4;node.pos.y=g.player.eye.y-3.7;node.angle=0;node.rate=0;
   for(let n=0;n<14;n++)g.radar.update(.25);const damage=g.player.maxHealth-g.player.health,detected=g.radar.detections;
   const V=g.THREE.Vector3,box={min:new V(g.player.eye.x-2,g.player.eye.y-2,g.player.eye.z-2.5),max:new V(g.player.eye.x+2,g.player.eye.y+2,g.player.eye.z-1.5)};g.physics.boxes.push(box);g.physics.build();
   for(let n=0;n<16;n++)g.radar.update(.25);const cover=!g.radar.scanned&&g.radar.exposure===0;g.physics.boxes.splice(g.physics.boxes.indexOf(box),1);g.physics.build();
   g.game.pause();g.radar.update(.25);const hidden=!g.radar.root.visible&&document.querySelector('.radar-status').hidden;
   return{damage,detected,cover,hidden,errors:__errors};
  });assert.ok(radar.damage>0);assert.ok(radar.detected>0);assert.equal(radar.cover,true);assert.equal(radar.hidden,true);assert.deepEqual(radar.errors,[]);console.log('RADAR PASS',map,radar);
  // Remember each mode's mission and keep Deploy within the viewport.
  await page.evaluate(()=>{__G.game.menus.root.querySelector('[data-act="missions"]').click();});
  for(const size of [{width:1100,height:800},{width:360,height:640},{width:844,height:390}]){
   await page.setViewportSize(size);await page.locator('button[data-pilot="fpv"]').click();await page.locator('[data-mission="5"]').click();
   await page.locator('button[data-pilot="foot"]').click();assert.equal(await page.locator('[data-mission="5"]').isVisible(),false);await page.locator('button[data-pilot="fpv"]').click();assert.equal(await page.locator('[data-mission="5"]').getAttribute('aria-pressed'),'true');
   const p=await page.locator('[data-act="deploy"]').evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,ok:r.top>=0&&r.bottom<=innerHeight&&document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('button')===el};});assert.equal(p.ok,true);
   await page.screenshot({path:'/tmp/salt-fpv-menu-'+map+'-'+size.width+'.png'});await page.mouse.click(p.x,p.y);assert.equal(await page.evaluate(()=>__G.game.mission.id),'machine-hunt');
   await page.evaluate(()=>{__G.game.update(4);__G.game.pause();__G.game.menus.root.querySelector('[data-act="missions"]').click();});
  }
 }
 // Use a fresh live frame for visual review; manual renders after stopped-loop
 // mission/menu transitions can retain a black framebuffer or fading menu mask.
 await page.setViewportSize({width:1100,height:800});
 await page.goto('http://127.0.0.1:8087/index.html?map=crossdock&mission=6&autostart=1&q=low&noaudio=1');
 await page.waitForFunction(()=>window.__ready,null,{timeout:90000});
 const frame=await page.evaluate(()=>{const g=__G;document.getElementById('boot')?.remove();g.game.menus.show('none');g.player.invulnerable=true;g.player.pos.y=7.2;g.player.pitch=-.25;g.player.vel.set(0,0,0);g.render.post.fade=0;return window.__frames;});
 await page.waitForFunction(frame=>window.__frames>=frame+12,frame,{timeout:60000});
 await page.evaluate(()=>__G.renderer.setAnimationLoop(null));
 await page.screenshot({path:'/tmp/salt-fpv-radar.png'});
 console.log('EXPANSION PASS');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
