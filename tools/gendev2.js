const fs=require("fs");
eval(fs.readFileSync(process.argv[2],"utf8")+";globalThis.G={generate,defaultOpts,assignPins,compileShow,checks}");
const uid=(()=>{let n=0;return()=>"id"+(++n);})();
const P={id:"show",mode:"show",name:"Dash test",timer:60,devices:true,wifi:{ssid:"W",pass:"p",server:"10.0.0.2",port:1883},boards:[{id:"b1",name:"Balcony",board:"esp32",parts:[],rules:[]}],scenes:[]};
const b=P.boards[0];
const mk=(t,n,o)=>{const p={id:uid(),type:t,name:n,opts:{...G.defaultOpts(t),...(o||{})}};b.parts.push(p);G.assignPins(b,p);return p;};
const bell=mk("button","Bell"), sw=mk("switch","Lever"), knob=mk("analog","Knob"), lamp=mk("light","Lamp"), door=mk("maglock","Door"),
      dim=mk("dimmer","Glow"), strip=mk("strip","Sky",{count:20}), servo=mk("servo","Arm"), mp3=mk("dfplayer","Voice"), flg=mk("flag","Fuel Low");
b.rules.push({id:"r1",name:"Ring",when:[{id:"c1",part:bell.id,cond:"press"}],then:[{id:"a1",part:door.id,action:"unlock"}]});
const code=G.generate(b,P); fs.writeFileSync("dev.ino",code);
const show=G.compileShow(P); fs.writeFileSync("dev-show.json",JSON.stringify(show));
console.log(JSON.stringify(show.devices.map(d=>d.key+':'+d.kind)));
console.log(code.split("\n").filter(l=>/DEV_TOPICS\[\] =|devNow\[|forced|manualControl|part == /.test(l)).slice(0,30).join("\n"));
