// KinCony B24M test: builds a show board with parts on the board's own inputs/outputs and its free GPIOs,
// writes b24m/b24m.ino (and b24m-solo/b24m-solo.ino, a plain sketch with no show), and prints the checks.
//   node tools/genb24m.js src/core.js [outdir]
// Then compile for real:  arduino-cli compile --fqbn esp32:esp32:esp32s3 <outdir>/b24m
const fs = require("fs"), path = require("path");
eval(fs.readFileSync(process.argv[2], "utf8") + ";globalThis.G={generate,defaultOpts,assignPins,compileShow,checks,showChecks,wiringFor,pinLabel,isWired}");
const out = process.argv[3] || ".";
let n = 0; const uid = () => "id" + (++n);
function board(name) {
  const b = { id: uid(), name, board: "b24m", parts: [], rules: [] };
  const mk = (t, nm, o) => { const p = { id: uid(), type: t, name: nm, opts: { ...G.defaultOpts(t), ...(o || {}) } }; b.parts.push(p); G.assignPins(b, p); return p; };
  return { b, mk };
}
const { b, mk } = board("Lodge");
const bell = mk("button", "Bell"), lever = mk("switch", "Lever"), box = mk("magnet", "Music Box"), pir = mk("motion", "Hall PIR");
const lamp = mk("light", "Lamp"), door = mk("maglock", "Patio Door", { startLocked: true }), fog = mk("relay", "Fog"), buzz = mk("buzzer", "Buzzer");
const glow = mk("dimmer", "Spotlight"), sky = mk("strip", "Sky", { count: 20 }), arm = mk("servo", "Arm");   // (no screen: the SSD1306 library isn't installed here)
// Fill all 24 inputs and outputs to check the far ends of the mapping
const extraIn = [], extraOut = [];
for (let i = 0; i < 20; i++) extraIn.push(mk("switch", "Sw " + (i + 5)));
for (let i = 0; i < 20; i++) extraOut.push(mk("light", "Out " + (i + 5)));
b.rules.push({ id: "r1", name: "Ring", when: [{ id: "c1", part: bell.id, cond: "active" }], then: [{ id: "a1", part: door.id, action: "unlock" }, { id: "a2", part: lamp.id, action: "blink", value: 3 }] });
b.rules.push({ id: "r2", name: "Box", when: [{ id: "c2", part: box.id, cond: "active" }], then: [{ id: "a3", part: glow.id, action: "fade", value: 80 }, { id: "a4", part: fog.id, action: "pulse", value: 2 }] });
const last = extraIn[extraIn.length - 1], lastOut = extraOut[extraOut.length - 1];
b.rules.push({ id: "r3", name: "Far", when: [{ id: "c3", part: last.id, cond: "active" }], then: [{ id: "a5", part: lastOut.id, action: "on" }] });
const P = { id: "s", mode: "show", name: "B24M test", timer: 60, devices: true, wifi: { ssid: "", pass: "", server: "10.0.0.2", port: 1883 }, boards: [b], speakers: [],
  scenes: [{ id: "sc", name: "Storm", when: [{ id: "w1", part: lever.id, cond: "active" }], then: [{ id: "s1", part: lamp.id, action: "flick", value: 5 }] }] };

console.log("Pins:", b.parts.slice(0, 12).map(p => p.name + "=" + G.pinLabel(b, p)).join(" | "));
console.log("Last in/out:", G.pinLabel(b, last), "/", G.pinLabel(b, lastOut), "| all wired:", b.parts.every(p => G.isWired(b, p)));
console.log("Checks:", JSON.stringify(G.checks(b)), "Show checks:", JSON.stringify(G.showChecks(P)));
console.log("Wiring bell:", JSON.stringify(G.wiringFor(b, bell)));
console.log("Wiring door:", JSON.stringify(G.wiringFor(b, door)));
const write = (dir, code) => { fs.mkdirSync(path.join(out, dir), { recursive: true }); fs.writeFileSync(path.join(out, dir, dir + ".ino"), code); };
write("b24m", G.generate(b, P));
// A plain sketch (no show, no network)
const solo = board("Solo");
const s1 = solo.mk("button", "Go"), s2 = solo.mk("light", "Lamp");
solo.b.rules.push({ id: "q1", name: "Go", when: [{ id: "qc", part: s1.id, cond: "active" }], then: [{ id: "qa", part: s2.id, action: "on" }] });
write("b24m-solo", G.generate(solo.b));
console.log("wrote", path.join(out, "b24m"), "and", path.join(out, "b24m-solo"));
