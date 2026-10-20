const fs=require("fs");
eval(fs.readFileSync(process.argv[2],"utf8")+";globalThis.G={generate,defaultOpts,assignPins,compileShow}");
let n=0; const uid=()=>"id"+(++n);
const b={id:"b1",name:"Shrine",board:"nano",parts:[],rules:[]};
const mk=(t,nm)=>{const p={id:uid(),type:t,name:nm,opts:G.defaultOpts(t)};b.parts.push(p);G.assignPins(b,p);return p;};
const mags=[1,2,3,4,5].map(i=>mk("magnet","Idol "+i)), door=mk("maglock","Shrine Door");
b.rules.push({id:"r1",name:"Enough idols",match:"some",need:3,once:true,when:mags.map((m,i)=>({id:"c"+i,part:m.id,cond:"active"})),then:[{id:"a1",part:door.id,action:"unlock"}]});
const code=G.generate(b); fs.writeFileSync("/tmp/some.ino",code);
console.log(code.split("\n").filter(l=>/rule1Count|bool rule1 =|When at least/.test(l)).join("\n"));
const e={id:"b2",name:"Shrine",board:"esp32",parts:[],rules:[]};
for (const p of b.parts) { const q={...p,pin:''}; e.parts.push(q); G.assignPins(e,q); }
e.rules=b.rules;
const P={id:"s",mode:"show",name:"T",timer:60,wifi:{},boards:[e],scenes:[]};
console.log(G.compileShow(P).boards[0].rules[0].when);
