"""Embed selected CC0 recordings from an extracted openspades-free-pak checkout.
Usage: python3 tools/embed-saltline-audio.py /path/to/openspades-free-pak
Requires ffmpeg. Embedded PCM keeps s.html playable offline, including file://.
"""
import array, base64, hashlib, json, math, re, subprocess, sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]); sr=32000
# name: source path under Sounds/Weapons, start seconds, maximum duration
clips={
 **{f'shot{n}':(f'SMG/V2Local{n}.opus',0,.65) for n in range(1,5)},
 **{f'enemy{n}':(f'SMG/V2Third{n}.opus',0,.65) for n in range(1,5)},
 'magout':('Rifle/ReloadLocal.opus',.09,.25),
 'magin':('Rifle/ReloadLocal.opus',.54,.28),
 'bolt':('Rifle/ReloadLocal.opus',1.00,.38),
 'dry':('DryFire.opus',0,.30),
 'shell1':('Rifle/ShellDrop1.opus',0,.65),
 'shell2':('Rifle/ShellDrop2.opus',0,.65),
 'clank':('Spade/HitPlayer.opus',0,.75),
 'mechanism':('SwitchLocal.opus',0,.30),
 'gear':('Rifle/RaiseLocal.opus',0,.40),
}
encoded={};manifest={}
for name,(filename,start,duration) in clips.items():
 path=source/'Sounds/Weapons'/filename
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-ss',str(start),'-t',str(duration),'-ac','1','-ar',str(sr),'-f','f32le','-'])
 samples=array.array('f',raw)
 if sys.byteorder!='little':samples.byteswap()
 peak=max(map(abs,samples));assert math.isfinite(peak) and peak>0
 # Normalize in float before conversion: some source Opus files exceed full scale.
 pcm=array.array('h',(round(v/peak*.92*min(1,j/(sr*.0002),(len(samples)-1-j)/(sr*.012))*32767) for j,v in enumerate(samples)))
 if sys.byteorder!='little':pcm.byteswap()
 encoded[name]=base64.b64encode(pcm.tobytes()).decode()
 manifest[name]={'source':'Sounds/Weapons/'+filename,'start':start,'duration':len(samples)/sr,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'license':'CC0'}
block='''/* RECORDED AUDIO BEGIN — CC0 recordings; see assets/audio/CREDITS.md. */
const SALT_PCM = '''+json.dumps(encoded,separators=(',',':'))+''';
const SALT_SAMPLE_CACHE = new Map;
function SALT_RECORDED(key) {
 if(SALT_SAMPLE_CACHE.has(key))return SALT_SAMPLE_CACHE.get(key).slice();
 const bytes=atob(SALT_PCM[key]), samples=new Float32Array(bytes.length/2);
 for(let j=0;j<samples.length;j++){let v=bytes.charCodeAt(j*2)|(bytes.charCodeAt(j*2+1)<<8);samples[j]=(v>32767?v-65536:v)/32768;}
 SALT_SAMPLE_CACHE.set(key,samples);return samples.slice();
}
const SALT_SAMPLE_MAP={
 rifle_shot:['shot1','shot2','shot3','shot4'],
 soldier_fire:['enemy1','enemy2','enemy3','enemy4'],
 gull_fire:['enemy2','enemy3'],hound_fire:['enemy1','enemy4'],
 reload_magout:['magout'],reload_magin:['magin'],reload_bolt:['bolt'],rifle_dry:['dry'],
 shell_bounce:['shell1','shell2'],ricochet:['shell2','shell1'],
 impact_enemy:['clank','shell1'],impact_metal:['clank','shell2'],
 soldier_step:['gear','mechanism'],soldier_alert:['mechanism'],soldier_die:['clank'],
 hound_step:['gear','mechanism']
};
for(const [name,keys] of Object.entries(SALT_SAMPLE_MAP)){
 Object.assign(Go[name],{gen:(sr,rng,variant)=>SALT_RECORDED(keys[variant%keys.length]),sr:32000,n:keys.length,recorded:true});
}
/* RECORDED AUDIO END */
'''
p=root/'s.html';s=p.read_text()
if '/* RECORDED AUDIO BEGIN' in s:s=re.sub(r'/\* RECORDED AUDIO BEGIN[\s\S]*?/\* RECORDED AUDIO END \*/\n',lambda _:block,s)
else:
 a=s.index('function SALT_SFX(');b=s.index('async function c_(',a);s=s[:a]+block+s[b:]
 # Remove superseded synthesized generators from registry; they are assigned above before boot.
 s=re.sub(r'gen:\(s,r,v\)=>SALT_SFX\(s,r,v,"[a-z]+"\)', 'gen:null',s)
 # Recordings contain their own natural decay. Do not overlay generated shot tails.
 a=s.index('function fo(te){');b=s.index('let ln=',a);s=s[:a]+'function fo(te){R=e.currentTime}'+s[b:]
 # Keep a clean signal path; the compressor still controls overlapping combat peaks.
 s=s.replace('M.connect(E),E.connect(w)', 'M.connect(w)')
 s=s.replace('N=m(.55),Q=m(.20)','N=m(.20),Q=m(.06)')
 # Expose source coverage to tests without leaking sample data.
 s=s.replace('sampleRate:e.sampleRate,buffers:c,','sampleRate:e.sampleRate,buffers:c,recorded:Object.keys(SALT_SAMPLE_MAP),')
p.write_text(s)
(root/'assets/audio/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Embedded {len(clips)} recordings; HTML {len(s):,} characters')
