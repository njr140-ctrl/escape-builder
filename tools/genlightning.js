const fs=require("fs");
eval(fs.readFileSync(process.argv[2],"utf8")+";globalThis.G={generate,defaultOpts,assignPins,compileShow}");
let n=0; const uid=()=>"id"+(++n);
const b={id:"b1",name:"Balcony",board:"esp32",parts:[],rules:[]};
const mk=(t,nm,o)=>{const p={id:uid(),type:t,name:nm,opts:{...G.defaultOpts(t),...(o||{})}};b.parts.push(p);G.assignPins(b,p);return p;};
const lamp=mk("light","Lamp"), glow=mk("dimmer","Lightning"), sky=mk("strip","Sky",{count:20});
const P={id:"s",mode:"show",name:"T",timer:60,wifi:{ssid:"W",pass:"p",server:"10.0.0.2",port:1883},boards:[b],speakers:[],
  scenes:[{id:"sc",name:"Storm",when:[],then:[{id:"snd",part:"__spk:default",action:"sndplay",file:"thunder.mp3",lightOn:true,lights:[lamp.id,glow.id,sky.id]}]}]};
const show=G.compileShow(P); console.log(JSON.stringify(show.scenes[0].steps[0].lightning));
const code=G.generate(b,P); fs.writeFileSync("/tmp/lightning.ino",code);
console.log(code.split("\n").filter(l=>/byte b = fB\[cur\]/.test(l)).join("\n"));
