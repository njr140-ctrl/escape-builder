const fs=require("fs");
eval(fs.readFileSync(process.argv[2],"utf8")+";globalThis.G={generate,defaultOpts,assignPins}");
let n=0; const uid=()=>"id"+(++n);
const b={id:"b1",name:"Shrine",board:process.argv[3]||"nano",parts:[],rules:[]};
const mk=(t,nm)=>{const p={id:uid(),type:t,name:nm,opts:G.defaultOpts(t)};b.parts.push(p);G.assignPins(b,p);return p;};
const mags=[1,2,3,4,5].map(i=>mk("magnet","Idol "+i)), sig=mk("linkout","To Generator"), lamp=mk("light","Altar Light"), flag=mk("flag","Idols Placed");
b.rules.push({id:"r1",name:"Enough idols",match:"some",need:3,whileTrue:true,once:true,when:mags.map((m,i)=>({id:"c"+i,part:m.id,cond:"active"})),
  then:[{id:"a1",part:sig.id,action:"on"},{id:"a2",part:flag.id,action:"fset"},{id:"w",part:"__sys",action:"wait",value:2},{id:"a3",part:lamp.id,action:"blink",value:3}]});
const code=G.generate(b); fs.writeFileSync("/tmp/while.ino",code);
const L=code.split("\n"); const i=L.findIndex(l=>/only while true: undo it/.test(l)); console.log(L.slice(i-1,i+12).join("\n"));
console.log("once flag declared:", /rule1Done/.test(code));
