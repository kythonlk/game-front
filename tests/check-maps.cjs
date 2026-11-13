const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:1100,height:760}});
  for(const map of ['frostpier','eaglesnest']){
   await page.goto('http://localhost:8087/index.html?map='+map+'&autostart=1&q=low&noaudio=1');
   await page.waitForFunction(()=>window.__ready||window.__fatal,null,{timeout:90000});
   const boot=await page.evaluate(()=>({ready:__ready,fatal:__fatal,errors:__errors,map:__G.level.map?.id}));assert.equal(boot.ready,true);assert.equal(boot.fatal,null);assert.deepEqual(boot.errors,[]);assert.equal(boot.map,map);
   const result=await page.evaluate(async map=>{
    const g=__G;g.renderer.setAnimationLoop(null);g.enemies.clear();g.player.invulnerable=true;
    const check=(ok,msg)=>{if(!ok)throw Error(msg);};
    check(g.level.stats.containers===0,'new maps should have no cargo rows');
    const input=g.input;g.input={...input,move:{x:0,y:0},look:{dx:0,dy:0},fire:false,ads:false,sprint:false,crouch:false,pressed:()=>false,down:()=>false};
    function walk(target){
     let frames=0;
     while(Math.hypot(target.x-g.player.pos.x,target.z-g.player.pos.z)>.12&&frames++<1600){
      const dx=target.x-g.player.pos.x,dz=target.z-g.player.pos.z;g.player.yaw=Math.atan2(-dx,-dz);g.input.move.y=Math.hypot(dx,dz)<.7?.35:1;g.player.update(1/60);
     }
     g.input.move.y=0;for(let n=0;n<35;n++)g.player.update(1/60);
     check(frames<1600,'blocked walking to '+JSON.stringify(target)+' at '+JSON.stringify(g.player.pos));
    }
    if(map==='frostpier'){
     // Both banks are reached by walking through the actual bridge crossings.
     for(const p of [[-8,23],[-8,17],[5,17],[5,-12],[-8,-12]])walk(new g.THREE.Vector3(p[0],0,p[1]));
     check(g.player.pos.x< -5,'bridge return failed');
     check(g.level.objectives[0].pos.z===-16,'old relay layout retained');
    }else{
     check(g.physics.bounds.max.z-g.physics.bounds.min.z>200,'valley bounds not expanded');
     check(g.weapon.selected===1,'sniper must be equipped on deployment');
     for(const target of g.level.vantage.route)walk(target);
     check(Math.abs(g.player.pos.y-12)<.05,'tower climb did not reach deck');
     check(g.player.eye.y>13.5,'sniper eye height');
     const tower=g.player.pos.clone();
     const target=new g.THREE.Vector3(0,1.7,-80);check(g.physics.lineOfSight(g.player.eye,target),'tower firing lane blocked');
     check(g.player.eye.distanceTo(target)>140,'firing lane too short');
     check(g.level.objectives[0].pos.y===12,'tower relay not elevated');
     walk(new g.THREE.Vector3(-20,12,65));g.player.yaw=-Math.PI/2;g.player.update(1/60);
     const originalDown=input.down;input.down=key=>key==='interact';
     for(let n=0;n<45;n++)g.game.update(.05);input.down=originalDown;
     check(g.game.run.cut===1,'tower relay cannot be operated from the deck');g.enemies.clear();

     // Descend by walking the same route backwards; no teleport or jump helper.
     for(const target of [...g.level.vantage.route].reverse())walk(target);
     check(g.player.pos.y<.05,'tower descent failed');
     for(const dest of [...g.level.objectives.slice(1).map(o=>o.pos),g.level.extraction.pos]){
      let approach=null;for(let a=0;a<16;a++){const x=dest.x+Math.cos(a*Math.PI/8)*1.9,z=dest.z+Math.sin(a*Math.PI/8)*1.9;if(g.physics.nav.isWalkable(x,z)){approach=new g.THREE.Vector3(x,0,z);break;}}
      check(approach&&g.physics.nav.findPath(g.level.playerStart.pos,approach),'objective/extraction route unavailable '+JSON.stringify({dest,approach,start:g.level.playerStart.pos,startWalkable:g.physics.nav.isWalkable(g.level.playerStart.pos.x,g.level.playerStart.pos.z)}));
     }
     console.log('TOWER',JSON.stringify(tower));
    }
    g.input=input;return {map,height:g.player.pos.y,boxes:g.physics.boxes.length,errors:__errors};
   },map);
   assert.deepEqual(result.errors,[]);console.log('MAP WALK PASS',result);
   const missions=await page.evaluate(()=>{
    const g=__G,results=[];
    for(const mission of [0,1,2,3]){
     g.game.start({mission,skipIntro:true});g.player.invulnerable=true;
     for(let n=0;n<g.game.mission.relayIds.length;n++)g.game.debugCut();
     for(let n=0;n<1200&&g.game.state==='playing';n++){
      for(const enemy of g.enemies.list.filter(e=>e.alive))enemy.damage(9999,enemy.pos,null,'weak');
      g.enemies.update(.25);g.game.update(.25);
      if(mission!==3&&g.game.run.eliminated===g.game.run.totalEnemies&&g.game.run.spawned===g.game.run.totalEnemies){g.player.pos.copy(g.level.extraction.pos);g.game.update(.25);}
     }
     if(g.game.state!=='complete')throw Error('foot mission failed '+mission+' state '+g.game.state);
     results.push({mission,total:g.game.run.totalEnemies});
    }
    return {results,errors:__errors};
   });assert.deepEqual(missions.errors,[]);console.log('FOOT MISSIONS PASS',map,missions.results);

   // Get a fresh live view of each distinct layout.
   await page.reload();await page.waitForFunction(()=>window.__ready,null,{timeout:90000});
   const frame=await page.evaluate(map=>{const g=__G;document.getElementById('boot')?.remove();g.game.menus.show('none');g.player.enabled=false;g.player.invulnerable=true;g.render.post.fade=0;const pos=map==='eaglesnest'?[-20,12,61]:[-7,15,24];g.player.pos.set(...pos);g.player.yaw=map==='eaglesnest'?0:.15;g.player.pitch=map==='eaglesnest'?-.11:-.5;return __frames;},map);
   await page.waitForFunction(f=>__frames>=f+8,frame,{timeout:60000});await page.screenshot({path:'/tmp/saltline-'+map+'-layout.png'});
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
