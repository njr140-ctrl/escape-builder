const fs=require("fs");
eval(fs.readFileSync(process.argv[2],"utf8")+";globalThis.G={generate,defaultOpts,assignPins}");
let n=0; const uid=()=>"id"+(++n);
const b={id:"b1",name:"Flip test",board:"esp32",parts:[],rules:[]};
const mk=(t,nm,o)=>{const p={id:uid(),type:t,name:nm,opts:{...G.defaultOpts(t),...(o||{})}};b.parts.push(p);G.assignPins(b,p);return p;};
const water=mk("magnet","Water Sensor",{flip:true}), door=mk("magnet","Door Sensor"), pir=mk("motion","Motion",{flip:true}), lamp=mk("light","Lamp",{flip:true}), lamp2=mk("light","Lamp 2");
b.rules.push({id:"r1",name:"R",when:[{id:"c1",part:water.id,cond:"active"}],then:[{id:"a1",part:lamp.id,action:"on"}]});
const code=G.generate(b); fs.writeFileSync("flip.ino",code);
console.log(code.split("\n").filter(l=>/\.begin\(/.test(l)&&/water|door|motion|lamp/i.test(l)).join("\n"));
