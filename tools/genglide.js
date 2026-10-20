const fs=require("fs");
eval(fs.readFileSync(process.argv[2],"utf8")+";globalThis.G={generate,defaultOpts,assignPins,actLabel}");
for (const kind of ["nano","esp32"]) {
  let n=0; const uid=()=>"id"+(++n);
  const b={id:"b1",name:"Glide",board:kind,parts:[],rules:[]};
  const mk=(t,nm)=>{const p={id:uid(),type:t,name:nm,opts:G.defaultOpts(t)};b.parts.push(p);G.assignPins(b,p);return p;};
  const btn=mk("button","Bell"), sw=mk("switch","Lever"), arm=mk("servo","Arm"), flag=mk("servo","Flag");
  const a1={id:"a1",part:arm.id,action:"angle",value:170,value2:2.5}, a2={id:"a2",part:arm.id,action:"angle",value:10,value2:0}, a3={id:"a3",part:flag.id,action:"angle",value:45};
  b.rules.push({id:"r1",name:"Up",when:[{id:"c1",part:btn.id,cond:"press"}],then:[a1, a3]});
  b.rules.push({id:"r2",name:"Down",when:[{id:"c2",part:sw.id,cond:"on"}],then:[a2]});
  const P={id:"show",mode:"show",name:"T",timer:60,wifi:{ssid:"W",pass:"p",server:"10.0.0.2",port:1883},boards:[b],scenes:[]};
  const code=G.generate(b, kind==="esp32"?P:null); fs.writeFileSync("glide-"+kind+".ino",code);
  console.log("== "+kind, "|", G.actLabel(arm,a1), "|", G.actLabel(arm,a2), "|", G.actLabel(flag,a3));
  console.log(code.split("\n").filter(l=>/Glide|flag\.write|arm\.write|struct ServoGlide/.test(l)).join("\n"));
}
