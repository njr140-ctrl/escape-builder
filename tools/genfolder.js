const fs=require("fs");
eval(fs.readFileSync(process.argv[2],"utf8")+";globalThis.G={generate,defaultOpts,assignPins,compileShow}");
let n=0; const uid=()=>"id"+(++n);
for (const kind of ["esp32","uno"]) {
  const b={id:"b1",name:"Cabinet",board:kind,parts:[],rules:[]};
  const mk=(t,nm)=>{const p={id:uid(),type:t,name:nm,opts:G.defaultOpts(t)};b.parts.push(p);G.assignPins(b,p);return p;};
  const btn=mk("button","Bell"), sw=mk("switch","Lever"), mp3=mk("dfplayer","Voice"), mp3b=mk("dfplayer","Radio");
  b.rules.push({id:"r1",name:"Ring",when:[{id:"c1",part:btn.id,cond:"press"}],then:[{id:"a1",part:mp3.id,action:"play",value:2},{id:"a1b",part:mp3b.id,action:"play",value:5}]});
  b.rules.push({id:"r2",name:"Loop",when:[{id:"c2",part:sw.id,cond:"on"}],then:[{id:"a2",part:mp3.id,action:"loop",value:3}]});
  b.rules.push({id:"r3",name:"Quiet",when:[{id:"c3",part:sw.id,cond:"off"}],then:[{id:"a3",part:mp3.id,action:"stop"}]});
  const P={id:"show",mode:"show",name:"T",timer:60,wifi:{ssid:"W",pass:"p",server:"10.0.0.2",port:1883},boards:[b],scenes:[]};
  const code=G.generate(b, kind==="esp32"?P:null); fs.writeFileSync("folder-"+kind+".ino",code);
  console.log("== "+kind); console.log(code.split("\n").filter(l=>/playMp3Folder|Loop\(|SD card|mp3\/0001|delay\(40/.test(l)).join("\n"));
}
