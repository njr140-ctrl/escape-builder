// ───────────────────────── Boards ─────────────────────────
function avrPins(maxD, nA, analogOnly, pwm) {
  const p = [];
  for (let i = 2; i <= maxD; i++) p.push({ id: 'D' + i, label: 'D' + i, code: String(i), analog: false, pwm: pwm.includes(i),
    note: i === 13 ? 'D13 has the onboard LED, so inputs here read unreliably' : '' });
  for (let i = 0; i < nA; i++) {
    const id = 'A' + i;
    p.push({ id, label: id, code: id, analog: true, analogOnly: analogOnly.includes(id),
      note: analogOnly.includes(id) ? 'Analog read only' : '' });
  }
  return p;
}
function esp32Pins() {
  const list = [0, 2, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33, 34, 35, 36, 39];
  const adc = [0, 2, 4, 12, 13, 14, 15, 25, 26, 27, 32, 33, 34, 35, 36, 39];
  const notes = {
    0: 'Boot pin: holding it LOW at power-on puts the board in flash mode',
    2: 'Boot pin, and the onboard LED on many boards',
    5: 'Boot pin: can glitch at power-on',
    12: 'Boot pin: must be LOW at power-on or the board won\u2019t start',
    15: 'Boot pin: prints boot messages if LOW at power-on',
  };
  const alias = { 16: 'RX2', 17: 'TX2' };   // the second serial port's usual pins (any pins work, but these are the ones printed on most boards)
  return list.map(n => ({ id: 'G' + n, label: 'GPIO ' + n, code: String(n), analog: adc.includes(n), pwm: n < 34, alias: alias[n] || '',
    inputOnly: n >= 34, note: n >= 34 ? 'Input only, no internal pull-up' : (notes[n] || '') }));
}
const UNO_PWM = [3, 5, 6, 9, 10, 11];
const BOARDS = {
  uno:   { label: 'Arduino Uno',       short: 'Uno',   family: 'avr',   adcMax: 1023, pins: avrPins(13, 6, [], UNO_PWM) },
  nano:  { label: 'Arduino Nano',      short: 'Nano',  family: 'avr',   adcMax: 1023, pins: avrPins(13, 8, ['A6', 'A7'], UNO_PWM) },
  mega:  { label: 'Arduino Mega 2560', short: 'Mega',  family: 'avr',   adcMax: 1023, pins: avrPins(53, 16, [], [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 44, 45, 46]) },
  esp32: { label: 'ESP32 DevKit',      short: 'ESP32', family: 'esp32', adcMax: 4095, pins: esp32Pins() },
};
// Shared bus pins, fixed by the board
const BUSES = {
  spi: { label: 'SPI', uno: [['D13', 'SCK'], ['D12', 'MISO'], ['D11', 'MOSI']], nano: [['D13', 'SCK'], ['D12', 'MISO'], ['D11', 'MOSI']],
         mega: [['D52', 'SCK'], ['D50', 'MISO'], ['D51', 'MOSI']], esp32: [['G18', 'SCK'], ['G19', 'MISO'], ['G23', 'MOSI']] },
  i2c: { label: 'I2C', uno: [['A4', 'SDA'], ['A5', 'SCL']], nano: [['A4', 'SDA'], ['A5', 'SCL']],
         mega: [['D20', 'SDA'], ['D21', 'SCL']], esp32: [['G21', 'SDA'], ['G22', 'SCL']] },
};
// Physical header order, for the pin diagram ('|' = gap between headers)
const HEADERS = {
  esp32: { name: 'ESP32 DevKit V1 (30-pin)',
    left: ['EN', 'G36', 'G39', 'G34', 'G35', 'G32', 'G33', 'G25', 'G26', 'G27', 'G14', 'G12', 'G13', 'GND', 'VIN'],
    right: ['G23', 'G22', 'TX', 'RX', 'G21', 'G19', 'G18', 'G5', 'G17', 'G16', 'G4', 'G2', 'G15', 'GND', '3V3'] },
  uno: { name: 'Arduino Uno',
    left: ['IOREF', 'RESET', '3V3', '5V', 'GND', 'GND', 'VIN', '|', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'],
    right: ['SCL', 'SDA', 'AREF', 'GND', 'D13', 'D12', 'D11', 'D10', 'D9', 'D8', '|', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'TX', 'RX'] },
  nano: { name: 'Arduino Nano',
    left: ['D13', '3V3', 'AREF', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', '5V', 'RST', 'GND', 'VIN'],
    right: ['D12', 'D11', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'GND', 'RST', 'RX', 'TX'] },
  mega: { name: 'Arduino Mega 2560',
    left: ['IOREF', 'RESET', '3V3', '5V', 'GND', 'GND', 'VIN', '|'].concat(Array.from({ length: 16 }, (_, i) => 'A' + i)),
    right: ['SCL', 'SDA', 'AREF', 'GND', 'D13', 'D12', 'D11', 'D10', 'D9', 'D8', '|', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'TX', 'RX', '|',
      'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21', '|'].concat(Array.from({ length: 32 }, (_, i) => 'D' + (22 + i))) },
};
const PREFS = {
  esp32: {
    in: [13, 14, 27, 26, 25, 33, 32, 4, 16, 17, 18, 19, 21, 22, 23].map(n => 'G' + n),
    out: [23, 22, 21, 19, 18, 17, 16, 4, 25, 26, 27, 33, 32, 14, 13].map(n => 'G' + n),
    analog: [34, 35, 32, 33, 36, 39].map(n => 'G' + n),
  },
};
function prefOrder(board, need) {
  const kind = need === 'rx' ? 'in' : need === 'pwm' ? 'out' : need;
  if (PREFS[board]) return PREFS[board][kind];
  const B = BOARDS[board];
  const d = B.pins.filter(p => !p.analog).map(p => p.id);
  if (kind === 'analog') return B.pins.filter(p => p.analog).map(p => p.id);
  if (kind === 'in') return d.filter(id => id !== 'D13');
  // Outputs avoid D13 until last: the bootloader blinks it at power-up, which would click a relay
  const a = B.pins.filter(p => p.analog && !p.analogOnly).map(p => p.id);
  const noLed = d.filter(id => id !== 'D13');
  if (board === 'mega') return noLed.filter(id => +id.slice(1) >= 22).concat(noLed, a, ['D13']);
  return noLed.slice().reverse().concat(a, ['D13']);
}

// ───────────────────────── Part types ─────────────────────────
const TYPES = {
  button:  { kind: 'in',  label: 'Button',        hint: 'Push button, bell push',      conds: [['active', 'is pressed'], ['inactive', 'is released']] },
  switch:  { kind: 'in',  label: 'Switch',        hint: 'Toggle, lever, key switch',   conds: [['active', 'is on'], ['inactive', 'is off']] },
  magnet:  { kind: 'in',  label: 'Magnet sensor', hint: 'Reed switch, hidden objects', conds: [['active', 'senses a magnet'], ['inactive', 'senses no magnet']] },
  motion:  { kind: 'in',  label: 'Motion sensor', hint: 'PIR, spots players',          conds: [['active', 'sees movement'], ['inactive', 'sees nothing']] },
  analog:  { kind: 'in',  label: 'Knob',          hint: 'Has end stops. Also sliders, light sensors', conds: [['above', 'reads above'], ['below', 'reads below'], ['between', 'reads between']] },
  encoder: { kind: 'in',  label: 'Rotary encoder', hint: 'Spins forever in clicks, like a safe dial', conds: [['at', 'is at'], ['between', 'is between']] },
  keypad:  { kind: 'in',  label: 'Keypad',        hint: 'Codes and PINs',              conds: [['code', 'enters code'], ['wrong', 'enters a wrong code'], ['key', 'presses key']] },
  rfid:    { kind: 'in',  label: 'RFID reader',   hint: 'Tagged objects',  bus: 'spi', conds: [['tag', 'has tag'], ['any', 'has any tag'], ['wrong', 'has a wrong tag'], ['none', 'has no tag']] },
  mqttin:  { kind: 'in',  label: 'Message received', hint: 'Wi-Fi from a computer', esp32Only: true, conds: [['msg', 'receives'], ['any', 'receives any message']] },
  linkin:  { kind: 'in',  label: 'Signal in',     hint: 'Another Arduino tells this one', conds: [['active', 'is on']] },
  light:   { kind: 'out', label: 'Light',         hint: 'LED or lamp',                 acts: [['on', 'turn on'], ['off', 'turn off'], ['blink', 'blink'], ['flick', 'flicker'], ['pulse', 'turn on for']] },
  relay:   { kind: 'out', label: 'Relay',         hint: 'Fog, fans, motors',           acts: [['on', 'switch on'], ['off', 'switch off'], ['pulse', 'switch on for']] },
  maglock: { kind: 'out', label: 'Maglock',       hint: 'Doors, drawers, panels',      acts: [['unlock', 'unlock'], ['lock', 'lock'], ['pulse', 'unlock for']] },
  buzzer:  { kind: 'out', label: 'Buzzer',        hint: 'Beeps and alarms',            acts: [['beep', 'beep for'], ['blink', 'beep'], ['off', 'silence']] },
  servo:   { kind: 'out', label: 'Servo',         hint: 'Arms, flags, hatches',        acts: [['angle', 'move to']],
             tile: { label: 'Motor', hint: 'Servo, stepper or DC motor' } },
  stepper: { kind: 'out', label: 'Stepper motor', hint: 'Full turns: turntables, winches', hidden: true,   // offered as a Motor type
             acts: [['degrees', 'turn by degrees'], ['steps', 'turn by steps'], ['stop', 'stop']],
             conds: [['moving', 'is turning'], ['stopped', 'has stopped']] },
  hbridge: { kind: 'out', label: 'DC motor + L298N', hint: 'Direction and speed', hidden: true,   // offered as a Motor type
             acts: [['fwd', 'run forward at'], ['back', 'run backward at'], ['stop', 'stop (coast)'], ['brake', 'brake']],
             conds: [['running', 'is running'], ['stopped', 'has stopped']] },
  dfplayer:{ kind: 'out', label: 'MP3 player',    hint: 'DFPlayer or compatible',         acts: [['play', 'play track'], ['loop', 'loop track'], ['stop', 'stop'], ['volume', 'set volume to']] },
  strip:   { kind: 'out', label: 'LED strip',     hint: 'NeoPixel colours',            acts: [['scene', 'light up'], ['off', 'turn off']] },
  dimmer:  { kind: 'out', label: 'Dimmer',        hint: 'Fade lamps and LED lights',    acts: [['level', 'set to'], ['fade', 'fade to'], ['flick', 'flicker'], ['off', 'turn off']] },
  screen:  { kind: 'out', label: 'Screen',        hint: 'OLED, LCD or 4-digit clock', bus: 'i2c', acts: [['show', 'show text'], ['clear', 'clear']] },
  clock:   { kind: 'out', label: 'Clock display', hint: '4-digit countdown timer', hidden: true,   // offered as a Screen type
             acts: [['countdown', 'count down from'], ['countup', 'count up from 0:00'], ['pause', 'pause'], ['resume', 'resume'], ['addtime', 'add time'], ['number', 'show number'], ['word', 'show word'], ['clear', 'clear']],
             conds: [['done', 'reaches 0:00'], ['under', 'has less than']] },
  mqttout: { kind: 'out', label: 'Send message',  hint: 'Wi-Fi to a computer', esp32Only: true, acts: [['send', 'send']] },
  linkout: { kind: 'out', label: 'Signal out',    hint: 'Tell another Arduino',        acts: [['on', 'turn signal on'], ['off', 'turn signal off'], ['pulse', 'send signal for']] },
  counter: { kind: 'logic', label: 'Counter',     hint: 'Count presses, strikes',      conds: [['atleast', 'is at least'], ['exactly', 'is exactly']], acts: [['cadd', 'add'], ['csub', 'subtract'], ['cset', 'set to']] },
  flag:    { kind: 'logic', label: 'Flag',        hint: 'Remember a solved step',      conds: [['isset', 'is set'], ['notset', 'is not set']], acts: [['fset', 'set'], ['fclear', 'clear']] },
};
const HOLDABLE = ['button', 'switch', 'magnet', 'motion', 'linkin'];
// Anything with conditions can be used in "When" (inputs, logic, and outputs like the clock that report back)
const isInType = t => TYPES[t] && (TYPES[t].kind === 'in' || TYPES[t].kind === 'logic' || !!TYPES[t].conds);
// LED strip section effects: [key, label, code number]
const FX = [['solid', 'solid', 0], ['breathe', 'breathe', 1], ['fadein', 'fade in', 2], ['fadeout', 'fade out', 7], ['flicker', 'flicker like a candle', 3], ['chase', 'chase', 4], ['fadechase', 'fade chase', 8], ['gradient', 'static fade', 9], ['blink', 'blink', 5], ['rainbow', 'GAYYYYY', 6]];
// Numbers the Arduino needs for one section: effect code, speed/duration in ms, and two extra values (chase on/off LEDs, blink on/off ms)
function sectionParams(sg) {
  const fx = FX.find(f => f[0] === sg.fx) || FX[0];
  let ms = speedMs(sg), a = 0, b = 0, c = 0, f = 0;
  if (fx[0] === 'fadein' || fx[0] === 'fadeout') ms = Math.max(1, Math.round(num(sg.dur, 2) * 1000));
  if (fx[0] === 'chase') { a = Math.max(1, int(sg.on, 3)); b = Math.max(0, int(sg.off, 3)); }
  if (fx[0] === 'gradient') { c = Math.max(0, int(sg.head, 5)); f = Math.max(0, int(sg.full, 2)); a = Math.max(0, int(sg.on, 5)); b = Math.max(0, int(sg.off, 0)); if (!a && !c && !f) f = 1; }
  if (fx[0] === 'fadechase') { a = Math.max(0, int(sg.on, 5)); b = Math.max(0, int(sg.off, 5)); c = Math.max(0, int(sg.head, 0)); f = Math.max(0, int(sg.full, 1)); if (!a && !c && !f) f = 1; }
  if (fx[0] === 'blink') { a = Math.max(10, Math.round(num(sg.onS, 0.5) * 1000)); b = Math.max(0, Math.round(num(sg.offS, 0.5) * 1000)); }
  return { fx, ms, a, b, c, f, rev: (fx[0] === 'chase' || fx[0] === 'fadechase' || fx[0] === 'gradient') && sg.dir === 'back' };
}
// Speed 1 (slowest) to 10 (fastest); older slow / normal / fast choices map onto it
const OLD_SPEED = { slow: 2, normal: 4, fast: 8 };
function speedOf(sg) { return Math.min(10, Math.max(1, Math.round(num(sg.spd, OLD_SPEED[sg.speed] || 5)))); }
// One effect cycle: 10 s at speed 1 down to 0.3 s at speed 10, each step about 1.5x faster
// Flicker: the average time between changes, from speed 1 (slow, 600 ms) to 10 (fast, 40 ms)
function flickMs(speed) { const s = Math.min(10, Math.max(1, Math.round(num(speed, 5)))); return Math.round(600 * Math.pow(40 / 600, (s - 1) / 9)); }
function speedMs(sg) { return Math.round(10000 * Math.pow(300 / 10000, (speedOf(sg) - 1) / 9)); }
// Older single-effect strip actions become one full-length section
function sectionsOf(a, count) {
  if (Array.isArray(a.segs) && a.segs.length) return a.segs;
  const fx = { color: 'solid', flicker: 'flicker', flash: 'blink', chase: 'chase', rainbow: 'rainbow' }[a.action] || 'solid';
  return [{ from: 1, to: count, color: /^#[0-9a-f]{6}$/i.test(a.value) ? a.value : '#ff7a1a', fx, spd: 5 }];
}
const isOutType = t => TYPES[t] && (TYPES[t].kind === 'out' || TYPES[t].kind === 'logic');
const SYS_ACTS = [['wait', 'wait'], ['message', 'print message'], ['reset', 'reset the puzzle']];
// Scenes run on Escape Runner, so their "system" steps are about the game, not one board
const SCENE_ACTS = [['wait', 'wait'], ['note', 'tell the game master'], ['timerstart', 'start the game timer'], ['timerpause', 'pause the game timer'], ['tadd', 'add time'], ['endgame', 'end the game']];
function sysActs(isScene, inShow) { return isScene ? SCENE_ACTS : inShow ? SYS_ACTS.concat([['tell', 'tell the show']]) : SYS_ACTS; }
const isEvPart = id => typeof id === 'string' && id.startsWith('__ev:');
// Scene-only "parts": a game-master button, and HomeKit switches the runner shows in the Home app
const isBtnPart = id => id === '__btn';
const isHkPart = id => typeof id === 'string' && id.startsWith('__hk:');
const isPseudo = id => isEvPart(id) || isBtnPart(id) || isHkPart(id) || isSpkPart(id) || isTvPart(id) || isStartPart(id) || isPhonePart(id);
// Scene condition: the moment the game master presses Start game
const isStartPart = id => id === '__start';
// Sound and video play on the computer running Escape Runner: its speakers (USB sound cards) and the screen on its HDMI port
const isSpkPart = id => typeof id === 'string' && id.startsWith('__spk:');
const isTvPart = id => id === '__tv';
// Phones in the room (a SIP phone, or an HT80x adapter with an old phone): Escape Runner rings one
// straight over the network and plays a message when someone picks up
const isPhonePart = id => typeof id === 'string' && id.startsWith('__phone:');
const PHONE_ACTS = [['call', 'call and play']];
const phonesOf = P => P.phones || [];
const phoneOf = (P, id) => isPhonePart(id) ? phonesOf(P).find(x => x.id === id.slice(8)) || null : null;
const SND_ACTS = [['sndplay', 'play sound'], ['sndstop', 'stop sound'], ['sndstopall', 'stop every sound']];
const TV_ACTS = [['vidplay', 'show video'], ['vidstop', 'stop video']];
const DEFAULT_SPK = { id: 'default', name: 'Default output' };
function speakersOf(P) { return [DEFAULT_SPK].concat(P.speakers || []); }
function speakerOf(P, id) { return isSpkPart(id) ? speakersOf(P).find(x => x.id === id.slice(6)) || null : null; }
const mediaFile = a => String(a.file || '').trim();
// "thunder1.mp3, thunder2.mp3": a play step picks one at random each time
const mediaFiles = a => String(a.file || '').split(',').map(x => x.trim()).filter(Boolean);
const LIGHTNING_DEF = '#dce6ff';
// Lights that can flash for lightning: LED strips, Lights, and Dimmers (lights on a MOSFET, not motors)
const canFlash = p => !!p && (p.type === 'strip' || p.type === 'light' || (p.type === 'dimmer' && !optsOf(p).motor));
// A play sound step's Lightning switch and the lights ticked under it (older shows kept one light in a.lightning)
const lightOnOf = a => a.lightOn != null ? !!a.lightOn : !!a.lightning;
const lightIdsOf = a => Array.isArray(a.lights) ? a.lights : a.lightning ? [a.lightning] : [];
const activeLights = a => isSpkPart(a.part) && a.action === 'sndplay' && lightOnOf(a) ? lightIdsOf(a) : [];
const lightningHex = a => (/^#[0-9a-f]{6}$/i.test(a.lcolor || '') ? a.lcolor : LIGHTNING_DEF).slice(1).toUpperCase();
const pct = (v, d) => Math.max(0, Math.min(100, Math.round(num(v, d))));
const msOrZero = v => Math.max(0, Math.round(num(v, 0) * 1000));
const HK_ACTS = [['hkon', 'turn on'], ['hkoff', 'turn off'], ['hkpulse', 'flick on for a moment']];
const HK_CONDS = [['on', 'turns on'], ['off', 'turns off']];
const isWait = x => x.part && x.part.type === '__sys' && x.a.action === 'wait';
// Split a rule's actions into stages separated by waits. Stage 1 runs at once; each later stage runs after its wait.
// A wait's length in ms, and its upper end when it's random ("wait 20 to 60 s"), else 0
const waitMax = a => num(a.value2, 0) > num(a.value, 1) ? msOf(a.value2) : 0;
// The C++ for a wait: a fixed time, or random(lo, hi + 1) for a random one
const waitExpr = (lo, hi) => hi > lo ? 'random(' + lo + ', ' + (hi + 1) + ')' : String(lo);
const waitText = (lo, hi) => hi > lo ? fmtSec(lo / 1000).replace(' s', '') + '\u2013' + fmtSec(hi / 1000) + ' (random)' : fmtSec(lo / 1000);
function stagesOf(acts) {
  const st = [{ ms: 0, acts: [] }];
  for (const x of acts) {
    if (isWait(x)) st.push({ ms: msOf(x.a.value), msMax: waitMax(x.a), sec: x.a.value, acts: [] });
    else st[st.length - 1].acts.push(x);
  }
  while (st.length > 1 && !st[st.length - 1].acts.length) st.pop();
  return st;
}
const PARAM = {
  pulse:   { unit: 's',     def: 5,   min: 0.1, step: 0.1 },
  flick:   { unit: '/ 10',  def: 5,   min: 1,   max: 10, step: 1 },   // flicker speed, 1 slow to 10 fast
  beep:    { unit: 's',     def: 0.5, min: 0.1, step: 0.1 },
  blink:   { unit: 'times', def: 3,   min: 1,   step: 1, extras: [{ key: 'value2', pre: 'on for', unit: 's', def: 0.3, min: 0.05, step: 0.05 }, { key: 'value3', pre: 'off for', unit: 's', def: 0.3, min: 0.05, step: 0.05 }] },
  fwd:     { unit: '%',     def: 75,  min: 0,   max: 100, step: 5, extras: [{ key: 'value2', pre: 'for', unit: 's (empty keeps going)', def: '', min: 0, step: 0.5 }] },
  back:    { unit: '%',     def: 75,  min: 0,   max: 100, step: 5, extras: [{ key: 'value2', pre: 'for', unit: 's (empty keeps going)', def: '', min: 0, step: 0.5 }] },
  angle:   { unit: '°',     def: 90,  min: 0,   max: 180, step: 1, extras: [{ key: 'value2', pre: 'over', unit: 's (0 = instant)', def: 0, min: 0, step: 0.5 }] },
  play:    { unit: '(mp3/0001.mp3 = 1)', def: 1, min: 1, step: 1 },
  loop:    { unit: '(mp3/0001.mp3 = 1)', def: 1, min: 1, step: 1 },
  volume:  { unit: 'of 30', def: 20,  min: 0,   max: 30,  step: 1 },
  message: { text: true,    def: 'Puzzle solved!' },
  wait:    { unit: 's',     def: 3,   min: 0.1, step: 0.5 },
  color:   { color: true,   def: '#ff7a1a' },
  flicker: { color: true,   def: '#ff8c2e' },
  chase:   { color: true,   def: '#3a8dff' },
  flash:   { color: true,   def: '#ff2020' },
  level:   { unit: '%',     def: 100, min: 0,   max: 100, step: 5 },
  fade:    { unit: '%',     def: 0,   min: 0,   max: 100, step: 5, extras: [{ key: 'value2', pre: 'over', unit: 's', def: 2, min: 0, step: 0.5 }] },
  show:    { text: true,    def: 'Find the key' },
  cadd:    { unit: '',      def: 1,   step: 1 },
  csub:    { unit: '',      def: 1,   step: 1 },
  cset:    { unit: '',      def: 0,   step: 1 },
  degrees: { unit: '° (negative turns backwards)', def: 90, step: 15 },
  steps:   { unit: 'steps (negative turns backwards)', def: 512, step: 64 },
  send:    { text: true,    def: 'solved' },
  tell:    { text: true,    def: 'solved' },
  note:    { text: true,    def: 'Give hint 1' },
  tadd:    { unit: 's (negative takes time away)', def: 60, step: 15 },
  countdown: { unit: 'min', def: 60,  min: 0.5, step: 1 },
  addtime: { unit: 's (negative takes time away)', def: 60, step: 15 },
  number:  { unit: '',      def: 1234, min: 0, max: 9999, step: 'any' },
  word:    { text: true,    def: 'OPEN', max: 4, unit: 'up to 4 letters' },
};
function defaultOpts(type) {
  if (type === 'relay') return { activeLow: false, startOn: false, lowFixed: true };   // HIGH = on by default
  if (type === 'maglock') return { activeLow: false, startLocked: true, lowFixed: true };   // HIGH = locked by default
  if (type === 'servo') return { startAngle: 0 };
  if (type === 'dfplayer') return { volume: 20 };
  if (type === 'light' || type === 'buzzer') return { startOn: false };
  if (type === 'strip') return { count: 30, density: 60, brightness: 80 };
  if (type === 'dimmer') return { start: 0 };
  if (type === 'screen') return { model: 'oled', startText: '' };
  if (type === 'encoder') return { steps: 20 };
  if (type === 'keypad') return { layout: '4x4' };
  if (type === 'clock') return { brightness: 7, style: 'colon' };
  if (type === 'stepper') return { driver: 'uln2003', stepsPerRev: 2048, rpm: 10 };
  return {};
}
// Wi-Fi settings for the whole sketch (ESP32 only)
const slug = s => (s || 'prop').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'prop';
function wifiOf(project) { return { ssid: '', pass: '', server: '', port: 1883, otaPass: '', id: slug(project.name), ...(project.wifi || {}) }; }
const optsOf = p => ({ ...defaultOpts(p.type), ...(p.opts || {}) });

// ───────────────────────── Pins ─────────────────────────
// Mega SoftwareSerial can only receive on these pins
const MEGA_RX = ['D10', 'D11', 'D12', 'D13', 'D50', 'D51', 'D52', 'D53', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15'];
// What a pin's role reads as on screen. The generated code keeps the short role in its names (MP3_PLAYER_TX_PIN).
// The MP3 player is labelled by its own pins (what you actually connect to), with the resistor where it goes:
// the board's TX pin goes to the player's RX through 1 kOhm; the player's TX goes straight to the board's RX pin.
// Always named from the player's side, as "to the player's RX pin", because ESP32 boards print RX2/TX2 on their own pins
// and the two are easy to mix up.
const ROLE_TEXT = { dfplayer: { TX: { text: 'to player\u2019s RX', pin: 'RX', resistor: '1 k\u03a9' }, RX: { text: 'to player\u2019s TX', pin: 'TX' } } };
const roleInfo = (p, role) => (p && (ROLE_TEXT[p.type] || {})[role]) || null;
// short: just the player's pin (the diagram draws the resistor itself)
const roleText = (p, role, short) => { const r = roleInfo(p, role); return r ? r.text + (r.resistor && !short ? ' (via ' + r.resistor + ')' : '') : role; };
// Every pin a part needs: [field on the part, role label, what the pin must do]
function fieldsOf(p) {
  switch (p.type) {
    case 'dfplayer': return [['pin', 'TX', 'out'], ['pin2', 'RX', 'rx']];
    case 'rfid': return [['pin', 'SDA', 'out'], ['pin2', 'RST', 'out']];
    case 'encoder': return [['pin', 'CLK', 'in'], ['pin2', 'DT', 'in']];
    case 'clock': return [['pin', 'CLK', 'out'], ['pin2', 'DIO', 'out']];
    case 'hbridge': return [['pin', 'ENA', 'pwm'], ['pin2', 'IN1', 'out'], ['pin3', 'IN2', 'out']];
    case 'stepper': return optsOf(p).driver === 'a4988'
      ? [['pin', 'STEP', 'out'], ['pin2', 'DIR', 'out']]
      : [['pin', 'IN1', 'out'], ['pin2', 'IN2', 'out'], ['pin3', 'IN3', 'out'], ['pin4', 'IN4', 'out']];
    case 'keypad': {
      const f = [['pin', 'R1', 'out'], ['pin2', 'R2', 'out'], ['pin3', 'R3', 'out'], ['pin4', 'R4', 'out']];
      const cols = optsOf(p).layout === '4x3' ? 3 : 4;
      for (let i = 1; i <= cols; i++) f.push(['pin' + (4 + i), 'C' + i, 'out']);
      return f;
    }
    case 'screen': case 'counter': case 'flag': case 'mqttin': case 'mqttout': return [];
    case 'analog': return [['pin', '', 'analog']];
    case 'strip': return [['pin', 'DIN', 'out']];
    case 'dimmer': return [['pin', '', 'pwm']];
    default: return [['pin', '', TYPES[p.type].kind === 'in' ? 'in' : 'out']];
  }
}
function pinFits(pin, need, board) {
  if (!pin) return false;
  if (need === 'analog') return !!pin.analog;
  if (need === 'rx') return board === 'mega' ? MEGA_RX.includes(pin.id) : !pin.analogOnly;
  if (need === 'in') return !pin.analogOnly;
  if (need === 'pwm') return !pin.inputOnly && !pin.analogOnly && !!pin.pwm;
  return !pin.inputOnly && !pin.analogOnly;
}
function findPin(board, id) { return BOARDS[board].pins.find(p => p.id === id); }
function busesUsed(project) { return ['spi', 'i2c'].filter(b => project.parts.some(p => TYPES[p.type] && TYPES[p.type].bus === b)); }
function busPins(project) { const s = new Set(); for (const b of busesUsed(project)) for (const [id] of BUSES[b][project.board]) s.add(id); return s; }
// Every pin in use: one entry per part pin, plus shared bus pins
function assignments(project) {
  const out = [];
  for (const p of project.parts) for (const [f, role] of fieldsOf(p)) if (p[f]) out.push({ pin: p[f], part: p, field: f, role });
  for (const b of busesUsed(project)) {
    const users = project.parts.filter(p => TYPES[p.type].bus === b);
    for (const [pin, role] of BUSES[b][project.board]) out.push({ pin, part: null, bus: b, users, role: BUSES[b].label + ' ' + role });
  }
  return out;
}
function usedPins(project, exceptPartId) {
  const used = new Set(busPins(project));
  for (const p of project.parts) if (p.id !== exceptPartId) for (const [f] of fieldsOf(p)) if (p[f]) used.add(p[f]);
  return used;
}
function autoPin(project, need, exceptPartId, alsoUsed) {
  const used = usedPins(project, exceptPartId);
  (alsoUsed || []).forEach(id => used.add(id));
  const order = prefOrder(project.board, need).concat(BOARDS[project.board].pins.map(p => p.id));
  for (const id of order) {
    const pin = findPin(project.board, id);
    if (pin && !used.has(id) && pinFits(pin, need, project.board)) return id;
  }
  return '';
}
// Keep a part's valid pins and pick free ones for the rest
function assignPins(project, part) {
  const taken = [];
  // An MP3 player on an ESP32 starts on the second serial port's usual pins: TX2 (17) to the player's RX, RX2 (16) from its TX
  const pref = part.type === 'dfplayer' && BOARDS[project.board].family === 'esp32' ? { pin: 'G17', pin2: 'G16' } : {};
  for (const [f, , need] of fieldsOf(part)) {
    const pin = findPin(project.board, part[f]);
    if (pin && pinFits(pin, need, project.board) && !taken.includes(part[f])) { taken.push(part[f]); continue; }
    if (pref[f] && !taken.includes(pref[f]) && !usedPins(project, part.id).has(pref[f])) { part[f] = pref[f]; taken.push(pref[f]); continue; }
    part[f] = autoPin(project, need, part.id, taken);
    if (part[f]) taken.push(part[f]);
  }
}
// Move parts off pins that a screen or RFID reader now needs
function freeBusPins(project) {
  const bp = busPins(project), moved = [];
  for (const p of project.parts) {
    let hit = false;
    for (const [f] of fieldsOf(p)) if (bp.has(p[f])) { p[f] = ''; hit = true; }
    if (hit) { assignPins(project, p); moved.push(p); }
  }
  return moved;
}
function isWired(project, p) {
  if (TYPES[p.type].esp32Only && BOARDS[project.board].family !== 'esp32') return false;
  return fieldsOf(p).every(([f, , need]) => pinFits(findPin(project.board, p[f]), need, project.board)); }
function pinLabel(project, p) {
  const fs = fieldsOf(p);
  const lab = f => { const x = findPin(project.board, p[f]); return x ? x.label : '?'; };
  const sideOf = role => { const r = roleInfo(p, role); return 'player\u2019s ' + r.pin + ' pin' + (r.resistor ? ' (via ' + r.resistor + ')' : ''); };
  let s = fs.length === 1 ? lab(fs[0][0]) : fs.map(([f, role]) => roleInfo(p, role) ? lab(f) + ' \u2192 ' + sideOf(role) : role + ' ' + lab(f)).join(', ');
  const bus = TYPES[p.type].bus;
  if (bus) s = (s ? s + ' + ' : '') + BUSES[bus].label + ' (' + BUSES[bus][project.board].map(([id, r]) => r + ' ' + findPin(project.board, id).label).join(', ') + ')';
  if (TYPES[p.type].esp32Only) return 'Wi-Fi · ' + (optsOf(p).topic || 'no topic');
  return s || 'no wiring';
}

// ───────────────────────── Code generation ─────────────────────────
const RESERVED = new Set('int long bool char void if else for while do return true false const struct class new delete switch case default break continue loop setup delay millis tone min max abs map random input output servo serial high low byte word string float double unsigned signed static auto register union enum keypad strip dial dimmer tagreader wire spi constrain showtext later due'.split(' '));
function makeIdents(parts) {
  const out = {}, used = new Set();
  for (const p of parts) {
    const words = (p.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
    if (!words.length) words.push(p.type);
    let v = words.map((w, i) => i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()).join('');
    if (/^\d/.test(v)) v = 'p' + v;
    if (RESERVED.has(v.toLowerCase()) || /^rule\d/.test(v)) v += 'Part';
    let base = v, n = 2;
    while (used.has(v.toLowerCase())) v = base + n++;
    used.add(v.toLowerCase());
    const B = v.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/([A-Za-z])(\d)/g, '$1_$2').toUpperCase();
    out[p.id] = { v, B, C: B + '_PIN' };
  }
  return out;
}
function cstr(s) { return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]+/g, ' ') + '"'; }
function oneLine(s) { return String(s || '').replace(/[\r\n]+/g, ' ').replace(/\*\//g, '* /'); }
function num(v, def) { const n = parseFloat(v); return isFinite(n) ? n : def; }
function int(v, def) { return Math.round(num(v, def)); }
function msOf(sec) { return Math.max(1, Math.round(num(sec, 1) * 1000)); }
function fmtSec(sec) { const n = num(sec, 1); return (Math.round(n * 10) / 10) + ' s'; }
function pad(s, n) { s = String(s); return s.length >= n ? s + ' ' : s + ' '.repeat(n - s.length); }
// Section colour with its own brightness (0-255) applied
function segColor(sg) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(sg.color || '')), n = parseInt(m ? m[1] : 'ffffff', 16);
  const k = Math.min(255, Math.max(0, int(sg.bri, 255))) / 255;
  return '0x' + [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => Math.round(v * k).toString(16).padStart(2, '0')).join('').toUpperCase();
}
function hexColor(c) { const m = /^#?([0-9a-f]{6})$/i.exec(String(c || '')); return '0x' + (m ? m[1] : 'FFFFFF').toUpperCase(); }
function normTag(s) { const h = String(s || '').toUpperCase().replace(/[^0-9A-F]/g, ''); return (h.match(/.{1,2}/g) || []).join(' '); }
function normCode(s) { return String(s || '').toUpperCase().replace(/[^0-9A-D]/g, ''); }
function normKey(s) { const m = String(s || '').toUpperCase().match(/[0-9A-D*#]/); return m ? m[0] : '1'; }
// Pin constant for one field of a part
function pinConst(N, p, f) {
  const fs = fieldsOf(p);
  if (fs.length === 1) return N[p.id].C;
  return N[p.id].B + '_' + fs.find(x => x[0] === f)[1] + '_PIN';
}

// What each condition reads as C++
function condExpr(ctx, c, part) {
  const v = ctx.N[part.id].v;
  const n = int(c.value, 0), n2 = int(c.value2, 0);
  switch (part.type) {
    case 'analog':
      if (c.cond === 'between') return '(' + v + ' >= ' + Math.min(n, n2) + ' && ' + v + ' <= ' + Math.max(n, n2) + ')';
      return v + (c.cond === 'below' ? ' < ' : ' > ') + n;
    case 'encoder':
      if (c.cond === 'between') return '(' + v + '.pos >= ' + Math.min(n, n2) + ' && ' + v + '.pos <= ' + Math.max(n, n2) + ')';
      return v + '.pos == ' + n;
    case 'keypad':
      if (c.cond === 'wrong') return v + 'Wrong';
      if (c.cond === 'key') return v + 'Key == \'' + normKey(c.value) + '\'';
      return v + 'Code == ' + cstr(normCode(c.value));
    case 'rfid': {
      if (c.cond === 'any') return v + '.tag.length() > 0';
      if (c.cond === 'none') return v + '.tag.length() == 0';
      if (c.cond === 'wrong') {
        const known = ctx.tags[part.id] || [];
        return '(' + [v + '.tag.length() > 0'].concat(known.map(t => v + '.tag != ' + cstr(t))).join(' && ') + ')';
      }
      return v + '.tag == ' + cstr(normTag(c.value));
    }
    case 'counter': return v + (c.cond === 'exactly' ? ' == ' : ' >= ') + n;
    case 'mqttin': {
      const topic = 'gotMessage && lastTopic == ' + cstr(optsOf(part).topic || '');
      return '(' + topic + (c.cond === 'any' ? '' : ' && lastMessage == ' + cstr(c.value == null ? '' : c.value)) + ')';
    }
    case 'stepper': return (c.cond === 'stopped' ? '!' : '') + v + '.isRunning()';
    case 'hbridge': return v + '.dir' + (c.cond === 'stopped' ? ' == 0' : ' != 0');
    case 'clock': return c.cond === 'under' ? '(' + v + '.secs > 0 && ' + v + '.secs < ' + Math.round(num(c.value, 10) * 60) + 'L)' : v + '.finished';
    case 'flag': return (c.cond === 'notset' ? '!' : '') + v;
  }
  const ms = holdMs(part, c);
  if (ms) return v + (c.cond === 'inactive' ? '.inactiveFor(' : '.activeFor(') + ms + ')';
  return (c.cond === 'inactive' ? '!' : '') + v + '.active';
}
// A sequence watches each distinct input once (events) and lists which one each step needs (steps).
function seqOf(x) {
  if (x._seq) return x._seq;
  const events = [], steps = [];
  for (const { c, part } of x.conds) {
    const e = condExpr(x.ctx, c, part);
    let k = events.indexOf(e);
    if (k < 0) { k = events.length; events.push(e); }
    steps.push(k);
  }
  return (x._seq = { events, steps });
}
// Hold time on a digital input condition, in ms (0 = the moment it happens)
function holdMs(part, c) { return part && HOLDABLE.includes(part.type) && num(c.hold, 0) > 0 ? Math.round(num(c.hold, 0) * 1000) : 0; }
function condText(project, c) {
  const part = project.parts.find(p => p.id === c.part);
  if (!part) return null;
  const t = TYPES[part.type];
  const lbl = (t.conds.find(x => x[0] === c.cond) || t.conds[0])[1];
  let val = '';
  if (c.cond === 'between') val = ' ' + int(c.value, 0) + ' and ' + int(c.value2, 0);
  else if (['above', 'below', 'at', 'atleast', 'exactly'].includes(c.cond)) val = ' ' + int(c.value, 0);
  else if (c.cond === 'code') val = ' ' + normCode(c.value);
  else if (c.cond === 'key') val = ' ' + normKey(c.value);
  else if (c.cond === 'tag') val = ' ' + (normTag(c.value) || '(no ID yet)');
  else if (c.cond === 'under') val = ' ' + num(c.value, 10) + ' min left';
  else if (c.cond === 'msg') val = ' "' + (c.value || '') + '"';
  return part.name + ' ' + lbl + val + (holdMs(part, c) ? ' for ' + fmtSec(c.hold) : '');
}

function validRuleParts(project, r) {
  const wired = id => { const p = project.parts.find(x => x.id === id); return p && isWired(project, p) ? p : null; };
  const conds = r.when.map(c => ({ c, part: wired(c.part) })).filter(x => x.part && isInType(x.part.type));
  const acts = r.then.map(a => ({ a, part: a.part === '__sys' ? { type: '__sys' } : wired(a.part) }))
    .filter(x => x.part && (x.part.type === '__sys' || isOutType(x.part.type)));
  return { conds, acts };
}

// "At least N of these are true": how many, kept between 1 and the number of conditions
const needOf = (r, count) => Math.max(1, Math.min(count, Math.round(num(r.need, 2))));
// A board's rules, in words, for Escape Runner's website: what each one waits for and what it does.
// n matches the rule's number in the board's code (and its "Rule n fired" messages).
function ruleSummaries(b) {
  const sysText = a => a.action === 'wait' ? 'wait ' + waitText(msOf(a.value), num(a.value2, 0) > num(a.value, 0) ? msOf(a.value2) : 0)
    : a.action === 'reset' ? 'reset the puzzle' : a.action === 'tell' ? 'tell the show "' + (a.value || '') + '"' : 'print "' + (a.value || '') + '"';
  return b.rules.map((r, i) => {
    const { conds, acts } = validRuleParts(b, r);
    if (!conds.length || !acts.some(x => !(x.part.type === '__sys' && x.a.action === 'wait'))) return null;
    const joinOf = c => c.join || (r.match === 'any' ? 'or' : 'and');
    const when = r.match === 'order' ? conds.map(x => condText(b, x.c)).join(', then ')
      : r.match === 'some' ? 'at least ' + needOf(r, conds.length) + ' of: ' + conds.map(x => condText(b, x.c)).join(', ')
      : conds.map((x, k) => (k ? ' ' + joinOf(x.c) + ' ' : '') + condText(b, x.c)).join('');
    const whileTrue = !!r.whileTrue && r.match !== 'order';
    return { n: i + 1, name: String(r.name || ''), when, then: acts.map(({ a, part }) => part.type === '__sys' ? sysText(a) : part.name + ': ' + actLabel(part, a)).concat(whileTrue ? ['undone when no longer true'] : []),
      once: !!r.once && !whileTrue };
  }).filter(Boolean);
}
// For a board in a show: the scene conditions it watches, and the scene steps it carries out
// ── Device dashboard (every show): parts that report their state to Escape Runner and take manual commands ──
// onoff/lock/level/strip/angle report a state and can be controlled; press/hold are inputs that can be simulated;
// value is a reading only; mp3 can be controlled but has no state to report; flag can be set and cleared
const DEV_KINDS = { light: 'onoff', relay: 'onoff', buzzer: 'onoff', linkout: 'onoff', maglock: 'lock', dimmer: 'level', strip: 'strip', servo: 'angle', dfplayer: 'mp3',
  button: 'press', switch: 'hold', magnet: 'hold', motion: 'hold', linkin: 'hold', analog: 'value', flag: 'flag' };
const devHasState = kind => kind !== 'mp3';
function devicesOf(board) {
  const N = makeIdents(board.parts);
  return board.parts.filter(p => DEV_KINDS[p.type] && isWired(board, p)).map(p => ({ key: N[p.id].v, p, kind: DEV_KINDS[p.type] }));
}
function showCtxOf(P, board) {
  const watches = [], cmds = [];
  for (const s of P.scenes || []) {
    for (const c of s.when) {
      const part = board.parts.find(x => x.id === c.part);
      if (part && isWired(board, part) && c.id) watches.push({ id: c.id, c, part, scene: s });
    }
    for (const a of s.then) {
      const part = board.parts.find(x => x.id === a.part);
      if (part && isWired(board, part) && a.id) cmds.push({ id: a.id, a, part, scene: s });
    }
  }
  // Sound steps with lightning on some of this board's lights
  const lights = [];
  for (const s of P.scenes || []) for (const a of s.then) {
    const ids = activeLights(a);
    if (!ids.length || !a.id) continue;
    const parts = ids.map(id => board.parts.find(x => x.id === id)).filter(p => canFlash(p) && isWired(board, p));
    if (parts.length) lights.push({ id: a.id, a, parts, scene: s });
  }
  return { slug: slug(board.name), W: wifiOf(P), watches, cmds, lights, showName: P.name, devices: devicesOf(board) };
}
// Lightning from Escape Runner, for a strip, a dimmed light or a plain light: a flash map "start,length start,length ..." in ms.
// extra: what the flash needs besides timing (a strip's colour, a dimmer's brightness), or null
function flashMembers(add, extra, onCode, offCode, what) {
  add('  // Lightning from Escape Runner: flashes timed to a thunder sound, as "start,length,brightness ..."');
  add('  // (ms, ms, %; brightness can be left out for full). ' + what + ' carries on between flashes and comes back after the last one.');
  add('  unsigned long fT[60];');
  add('  uint16_t fD[60];');
  add('  byte fB[60];          // each flash\'s brightness, 0 to 100 %');
  add('  int fCur = -1;        // the flash showing now (-1: none)');
  add('  byte fN = 0;');
  add('  bool fOn = false;');
  add('  unsigned long fStart = 0;');
  if (extra) add('  ' + extra.type + ' ' + extra.field + ' = 0;');
  add('  void lightning(const char *p' + (extra ? ', ' + extra.type + ' ' + extra.name : '') + ') {');
  add('    fN = 0;');
  add('    while (*p && fN < 60) {');
  add("      while (*p == ' ') p++;");
  add('      if (!*p) break;');
  add('      char *e;');
  add('      fT[fN] = strtoul(p, &e, 10);');
  add('      p = e;');
  add("      if (*p == ',') p++;");
  add('      fD[fN] = strtoul(p, &e, 10);');
  add('      if (e == p) break;');
  add('      p = e;');
  add('      fB[fN] = 100;');
  add("      if (*p == ',') { p++; fB[fN] = constrain(strtoul(p, &e, 10), 0, 100); p = e; }");
  add('      fN++;');
  add('    }');
  add('    fStart = millis();');
  if (extra) add('    ' + extra.field + ' = ' + extra.name + ';');
  add('    fOn = false;');
  add('    fCur = -1;');
  add('  }');
  add('  bool flashUpdate() {');
  add('    unsigned long t = millis() - fStart;');
  add('    bool more = false;');
  add('    int cur = -1;');
  add('    for (byte k = 0; k < fN; k++) {');
  add('      if (t < fT[k] + fD[k]) more = true;');
  add('      if (t >= fT[k] && t < fT[k] + fD[k]) cur = k;');
  add('    }');
  add('    if (cur != fCur) {');
  add('      fCur = cur;');
  add('      fOn = cur >= 0;');
  add('      if (fOn) { byte b = fB[cur]; ' + onCode + ' }');
  add('      else ' + offCode);
  add('    }');
  add('    if (!more) fN = 0;');
  add('    return true;');
  add('  }');
}
// MP3 players this board ever loops, so a plain "play" on them first stops the repeating
let LOOPED_PLAYERS = new Set();
const loopsUsed = part => LOOPED_PLAYERS.has(part.id);
// Servos that ever "move to … over N s", so they get a glide helper
let GLIDE_SERVOS = new Set();
const glideMs = a => Math.max(0, Math.round(num(a.value2, 0) * 1000));
const glides = part => GLIDE_SERVOS.has(part.id);
function generate(project, show) {
  const SH = show ? showCtxOf(show, project) : null;
  LOOPED_PLAYERS = new Set(project.rules.flatMap(r => r.then).concat(SH ? SH.cmds.map(cm => cm.a) : []).filter(a => a.action === 'loop').map(a => a.part));
  GLIDE_SERVOS = new Set(project.rules.flatMap(r => r.then).concat(SH ? SH.cmds.map(cm => cm.a) : []).filter(a => a.action === 'angle' && glideMs(a) > 0).map(a => a.part));
  // Actions this board's code carries out (its own rules, plus scene steps), so helpers only include what's used
  const actsUsed = new Set(project.rules.flatMap(r => r.then.map(a => a.action)).concat(SH ? SH.cmds.map(cm => cm.a.action) : []));
  const flickers = actsUsed.has('flick');
  const simInputs = !!(SH && SH.devices.some(d => d.kind === 'press' || d.kind === 'hold'));   // dashboard can simulate inputs
  const litType = t => !!(SH && SH.lights.some(L => L.parts.some(p => p.type === t)));   // a scene flashes this kind of light for lightning
  const B = BOARDS[project.board], esp = B.family === 'esp32';
  const N = makeIdents(project.parts);
  const wired = project.parts.filter(p => isWired(project, p));
  const unwired = project.parts.filter(p => !isWired(project, p));
  const of = (...types) => wired.filter(p => types.includes(p.type));
  const digIns = of(...HOLDABLE), anIns = of('analog'), dials = of('encoder'), pads = of('keypad'), readers = of('rfid');
  const digOuts = of('light', 'relay', 'maglock', 'buzzer', 'linkout'), servos = of('servo'), players = of('dfplayer');
  const strips = of('strip'), dimmers = of('dimmer'), screens = of('screen');
  const oleds = screens.filter(p => optsOf(p).model !== 'lcd'), lcds = screens.filter(p => optsOf(p).model === 'lcd');
  const counters = of('counter'), flags = of('flag'), clocks = of('clock'), steppers = of('stepper'), bridges = of('hbridge');
  const msgIns = of('mqttin'), msgOuts = of('mqttout'), wifi = msgIns.length || msgOuts.length || !!SH, W = SH ? SH.W : wifiOf(project);
  const topics = [...new Set(msgIns.map(p => optsOf(p).topic || '').filter(Boolean))];
  const serialOf = p => N[p.id].v + 'Serial';
  const PC = (p, f) => pinConst(N, p, f || 'pin');
  // Known tag IDs per reader (for "wrong tag") and codes per keypad
  const tags = {}, codes = {};
  const allConds = project.rules.flatMap(r => r.when).concat(SH ? SH.watches.map(w => w.c) : []);
  for (const c of allConds) {
    if (c.cond === 'tag' && normTag(c.value)) (tags[c.part] = tags[c.part] || []).includes(normTag(c.value)) || tags[c.part].push(normTag(c.value));
    if (c.cond === 'code' && normCode(c.value)) (codes[c.part] = codes[c.part] || []).includes(normCode(c.value)) || codes[c.part].push(normCode(c.value));
  }
  const ctx = { N, tags, project };
  const rules = project.rules.map((r, i) => { const v = validRuleParts(project, r); return { r, ...v, ctx, n: i + 1, stages: stagesOf(v.acts) }; });
  const L = [];
  const add = (s = '') => L.push(s);
  const title = oneLine(project.name) || 'Untitled sketch';

  add('// ' + title);
  if (SH) add('// One board of the show "' + oneLine(SH.showName) + '". Escape Runner coordinates the scenes.');
  add('// Board: ' + B.label + (esp ? ' (in Arduino IDE pick "ESP32 Dev Module")' : ''));
  add('// Made with Escape Builder. Paste into the Arduino IDE and upload.');
  add('//');
  if (wired.length) {
    add('// Parts');
    const w = Math.max(...wired.map(p => oneLine(p.name).length), 4) + 2;
    for (const p of wired) add('//   ' + pad(oneLine(p.name), w) + pad(TYPES[p.type].label, 15) + pinLabel(project, p));
  } else add('// No parts yet. Add some in the Build screen.');
  for (const p of unwired) add('//   (left out: ' + oneLine(p.name) + (TYPES[p.type].esp32Only ? ' needs an ESP32' : ' still needs a pin') + ')');
  if (players.length) {
    add('//');
    add('// MP3 player SD card: FAT32, with the files in a folder named mp3:');
    add('//   mp3/0001.mp3, mp3/0002.mp3 ...   Track 1 is 0001.mp3 (found by name, so copy order doesn\'t matter).');
  }
  if (readers.length) {
    add('//');
    add('// RFID: open the Serial Monitor and hold each tag on the reader to see its ID.');
  }
  add();

  const inc = [];
  if (servos.length) inc.push(esp ? '#include <ESP32Servo.h>          // Library Manager: "ESP32Servo"' : '#include <Servo.h>');
  if (players.length && !esp) inc.push('#include <SoftwareSerial.h>');
  if (players.length) inc.push('#include <DFRobotDFPlayerMini.h>   // Library Manager: "DFRobotDFPlayerMini"');
  if (readers.length) inc.push('#include <SPI.h>', '#include <MFRC522.h>              // Library Manager: "MFRC522"');
  if (pads.length) inc.push('#include <Keypad.h>               // Library Manager: "Keypad" by Mark Stanley');
  if (strips.length) inc.push('#include <Adafruit_NeoPixel.h>    // Library Manager: "Adafruit NeoPixel"');
  if (screens.length) inc.push('#include <Wire.h>');
  if (oleds.length) inc.push('#include <Adafruit_GFX.h>', '#include <Adafruit_SSD1306.h>     // Library Manager: "Adafruit SSD1306"');
  if (steppers.length) inc.push('#include <AccelStepper.h>          // Library Manager: "AccelStepper" by Mike McCauley');
  if (clocks.length) inc.push('#include <TM1637Display.h>         // Library Manager: "TM1637" by Avishay Orpaz');
  if (lcds.length) inc.push('#include <LiquidCrystal_I2C.h>     // Library Manager: "LiquidCrystal I2C" by Frank de Brabander');
  if (wifi) inc.push('#include <WiFi.h>', '#include <ArduinoOTA.h>           // uploads over Wi-Fi (comes with the ESP32 boards)', '#include <PubSubClient.h>         // Library Manager: "PubSubClient" by Nick O\'Leary');
  if (inc.length) { inc.forEach(s => add(s)); add(); }

  add('// ── Serial Monitor log ──────────────────────────');
  add('// Every input change, rule and action prints in the Serial Monitor (115200 baud),');
  add('// with the time since power-on. Set LOG to false to keep it quiet.');
  add('const bool LOG = true;');
  add('void logTime() {');
  add('  unsigned long t = millis();');
  add("  Serial.print('[');");
  add('  Serial.print(t / 1000);');
  add("  Serial.print('.');");
  add('  Serial.print((t / 100) % 10);');
  add('  Serial.print(F("s] "));');
  add('}');
  add();

  if (wifi) {
    add('// ── Wi-Fi and messages (MQTT) ───────────────────');
    add('const char *WIFI_NAME     = ' + cstr(W.ssid) + ';');
    add('const char *WIFI_PASSWORD = ' + cstr(W.pass) + ';');
    add('const char *MQTT_SERVER   = ' + cstr(W.server) + ';   // the message server\'s address (Escape Runner, or Mosquitto on any computer)');
    add('const int   MQTT_PORT     = ' + Math.max(1, int(W.port, 1883)) + ';');
    add('const char *UPLOAD_PASSWORD = ' + cstr(W.otaPass || '') + ';   // asked for when you upload over Wi-Fi (empty: no password)');
    if (SH) {
      add('const char *MQTT_ID       = ' + cstr('eb-' + SH.slug) + ';   // this board\'s name on the network');
      add('const char *STATUS_TOPIC  = ' + cstr('eb/' + SH.slug + '/status') + ';');
      add('const char *CMD_TOPIC     = ' + cstr('eb/' + SH.slug + '/cmd') + ';');
      add('const char *EVENT_TOPIC   = ' + cstr('eb/' + SH.slug + '/event') + ';');
      if (SH.watches.length) {
        add('// Scene conditions this board reports to Escape Runner');
        add('const char *WATCH_TOPICS[] = {' + SH.watches.map(w => cstr('eb/' + SH.slug + '/w/' + w.id)).join(', ') + '};');
      }
      add('bool watchFresh = true;   // report every watched state again after (re)connecting');
      const rep = SH.devices.filter(d => devHasState(d.kind));
      if (rep.length) {
        add('// Device dashboard: each part\'s state goes to Escape Runner when it changes');
        add('const char *DEV_TOPICS[] = {' + rep.map(d => cstr('eb/' + SH.slug + '/s/' + d.key)).join(', ') + '};');
        add('bool devFresh = true;     // report every part again after (re)connecting');
      }
      add('void runCommand(const String &c);   // scene steps from Escape Runner, defined below');
    } else add('const char *MQTT_ID       = ' + cstr(slug(W.id)) + ';   // this prop\'s name on the network');
    add();
    add('WiFiClient wifiClient;');
    add('PubSubClient mqtt(wifiClient);');
    add('String lastTopic = "", lastMessage = "";   // the message that just arrived');
    add('bool gotMessage = false;                   // true for one loop when a message arrives');
    add('unsigned long mqttRetryAt = 0;');
    add();
    add('void onMessage(char *topic, byte *payload, unsigned int length) {');
    add('  lastTopic = topic;');
    add('  lastMessage = "";');
    add('  for (unsigned int i = 0; i < length; i++) lastMessage += (char)payload[i];');
    if (SH) {
      add('  if (lastTopic == CMD_TOPIC) {   // a command from Escape Runner');
      add('    runCommand(lastMessage);');
      add('    return;');
      add('  }');
    }
    add('  gotMessage = true;');
    add('  Serial.print("Message on ");');
    add('  Serial.print(lastTopic);');
    add('  Serial.print(": ");');
    add('  Serial.println(lastMessage);');
    add('}');
    add();
    add('// Keeps the message connection up without ever pausing the puzzle');
    add('void keepConnected() {');
    add('  static bool onWifi = false;');
    add('  if (WiFi.status() != WL_CONNECTED) {');
    add('    // Not on Wi-Fi: start a fresh attempt every 15 s. The ESP32 only reconnects by itself after a');
    add('    // connection it already had, so a failed first try at power-on would otherwise never be retried.');
    add('    static unsigned long wifiRetryAt = 15000;');
    add('    if ((long)(millis() - wifiRetryAt) >= 0) {');
    add('      wifiRetryAt = millis() + 15000;');
    add('      Serial.println("Wi-Fi not connected yet, trying again");');
    add('      WiFi.disconnect();');
    add('      WiFi.begin(WIFI_NAME, WIFI_PASSWORD);');
    add('    }');
    add('    onWifi = false;');
    add('    return;');
    add('  }');
    add('  if (!onWifi) {   // just joined (or rejoined) the Wi-Fi');
    add('    onWifi = true;');
    add('    Serial.print("On Wi-Fi as ");');
    add('    Serial.print(WiFi.localIP());');
    add('    Serial.print(", signal ");');
    add('    Serial.print(WiFi.RSSI());');
    add('    Serial.println(" dBm (above -70 is good)");');
    add('  }');
    add('  static bool uploadsReady = false;');
    add('  if (!uploadsReady) {   // once on Wi-Fi, the Arduino IDE can upload new code to this board over the network');
    add('    ArduinoOTA.begin();');
    add('    uploadsReady = true;');
    add('    Serial.print("Ready for uploads over Wi-Fi: in the Arduino IDE pick the network port ");');
    add('    Serial.println(MQTT_ID);');
    add('  }');
    add('  if (mqtt.connected()) {');
    add('    mqtt.loop();');
    add('    return;');
    add('  }');
    add('  if ((long)(millis() - mqttRetryAt) < 0) return;');
    add('  // Never freeze the puzzle while the message server is away: knock first, and only connect if it');
    add('  // answers within a quarter of a second. Try every 5 s, then every 15 s once it has been gone a while.');
    add('  static byte mqttFails = 0;');
    add('  mqttRetryAt = millis() + (mqttFails < 3 ? 5000 : 15000);');
    add('  if (!wifiClient.connect(MQTT_SERVER, MQTT_PORT, 250)) {');
    add('    if (mqttFails < 255) mqttFails++;');
    add('    Serial.println(mqttFails < 3 ? "Message server not reachable, retrying in 5 s" : "Message server still not reachable, retrying every 15 s");');
    add('    return;');
    add('  }');
    if (SH) {
      add('  if (mqtt.connect(MQTT_ID, STATUS_TOPIC, 0, true, "offline")) {   // the runner sees "offline" if this board drops');
      add('    mqttFails = 0;');
      add('    Serial.println("Connected to Escape Runner");');
      add('    mqtt.publish(STATUS_TOPIC, "online", true);');
      add('    mqtt.subscribe(CMD_TOPIC);');
      add('    watchFresh = true;');
      if (SH.devices.some(d => devHasState(d.kind))) add('    devFresh = true;');
    } else {
      add('  if (mqtt.connect(MQTT_ID)) {');
      add('    mqttFails = 0;');
      add('    Serial.println("Connected to the message server");');
    }
    for (const t of topics) add('    mqtt.subscribe(' + cstr(t) + ');');
    add('  } else {');
    add('    if (mqttFails < 255) mqttFails++;');
    add('    Serial.println("The message server answered but didn\'t accept the connection. Retrying soon.");');
    add('  }');
    add('}');
    add();
    if (SH) {
      add('// Tell Escape Runner something happened on this board');
      add('void sendEvent(const char *ev) {');
      add('  if (mqtt.connected()) mqtt.publish(EVENT_TOPIC, ev);');
      add('  Serial.print("Told the show: ");');
      add('  Serial.println(ev);');
      add('}');
      add();
      if (project.rules.length) {
        add('// Tell Escape Runner a rule fired, so its website can show what this board is doing');
        add('void ruleFired(byte n) {');
        add('  if (!mqtt.connected()) return;');
        add('  char t[4];');
        add('  snprintf(t, sizeof t, "%u", n);');
        add('  mqtt.publish(' + cstr('eb/' + SH.slug + '/rule') + ', t);');
        add('}');
        add();
      }
    }
    add('void sendMessage(const char *topic, const char *message) {');
    add('  if (mqtt.connected()) mqtt.publish(topic, message);');
    add('  else Serial.println("Not connected, so this message was not sent");');
    add('  Serial.print("Sent on ");');
    add('  Serial.print(topic);');
    add('  Serial.print(": ");');
    add('  Serial.println(message);');
    add('}');
    add();
  }

  const pinRows = [];
  for (const p of wired) {
    const fs = fieldsOf(p);
    for (const [f, role] of fs) {
      let note = '';
      if (p.type === 'dfplayer') note = role === 'TX' ? '   // wire to the player\'s RX, through a 1k resistor' : '   // wire to the player\'s TX';
      pinRows.push([PC(p, f), findPin(project.board, p[f]).code, note]);
    }
  }
  if (pinRows.length || busesUsed(project).length) {
    add('// ── Pins ────────────────────────────────────────');
    const w = Math.max(0, ...pinRows.map(r => r[0].length)) + 1;
    for (const [C, code, note] of pinRows) add('const int ' + pad(C, w) + '= ' + code + ';' + note);
    for (const b of busesUsed(project)) add('// ' + BUSES[b].label + ' pins are fixed: ' + BUSES[b][project.board].map(([id, r]) => r + ' ' + findPin(project.board, id).label).join(', '));
    add();
  }

  if (digIns.length) {
    add('// ── Timing ──────────────────────────────────────');
    if (digIns.length) add('const unsigned long DEBOUNCE_MS = 30;   // ignore contact bounce shorter than this');
    add();
  }

  if (digIns.length) {
    add('// ── Input helper: debounced digital input ───────');
    add('struct Input {');
    add('  int pin;');
    add('  bool activeLow;');
    add('  bool active = false;     // true while pressed / on / triggered');
    add('  bool lastRaw = false;');
    add('  unsigned long changedAt = 0;');
    add('  unsigned long since = 0;   // when it last became active or inactive');
    add('  bool changed = false;      // true for one loop after it turns on or off');
    if (simInputs) {
      add('  int8_t forced = -1;           // dashboard Simulate: -1 the real input, 0 or 1 held by Escape Runner');
      add('  unsigned long forcedUntil = 0;');
    }
    add();
    add('  void begin(int p, int mode, bool lowMeansActive) {');
    add('    pin = p;');
    add('    activeLow = lowMeansActive;');
    add('    pinMode(pin, mode);');
    add('    lastRaw = read();');
    add('    active = lastRaw;');
    add('    since = millis();');
    add('  }');
    add('  bool read() {');
    add('    bool high = digitalRead(pin) == HIGH;');
    add('    return activeLow ? !high : high;');
    add('  }');
    add('  void update() {');
    add('    changed = false;');
    if (simInputs) {
      add('    if (forcedUntil && (long)(millis() - forcedUntil) >= 0) { forced = -1; forcedUntil = 0; }   // a simulated press is over');
      add('    bool raw = forced >= 0 ? forced == 1 : read();');
    } else add('    bool raw = read();');
    add('    if (raw != lastRaw) {');
    add('      lastRaw = raw;');
    add('      changedAt = millis();');
    add('    } else if (raw != active && millis() - changedAt >= DEBOUNCE_MS) {');
    add('      active = raw;');
    add('      since = millis();');
    add('      changed = true;');
    add('    }');
    add('  }');
    add('  // True once it has stayed active (or inactive) for at least ms milliseconds');
    add('  bool activeFor(unsigned long ms) { return active && millis() - since >= ms; }');
    add('  bool inactiveFor(unsigned long ms) { return !active && millis() - since >= ms; }');
    add('};');
    add();
  }

  if (dials.length) {
    add('// ── Rotary dial helper: counts clicks, wraps around ──');
    add('struct Dial {');
    add('  int pinA, pinB, steps;');
    add('  int pos = 0;            // 0 to steps-1');
    add('  byte last = 0;');
    add('  int8_t acc = 0;');
    add();
    add('  void begin(int a, int b, int n) {');
    add('    pinA = a;');
    add('    pinB = b;');
    add('    steps = n;');
    add('    pinMode(pinA, INPUT_PULLUP);');
    add('    pinMode(pinB, INPUT_PULLUP);');
    add('    last = read();');
    add('  }');
    add('  byte read() { return (digitalRead(pinA) << 1) | digitalRead(pinB); }');
    add('  // Returns true when the dial moves one click');
    add('  bool update() {');
    add('    static const int8_t STEP[16] = {0, -1, 1, 0, 1, 0, 0, -1, -1, 0, 0, 1, 0, 1, -1, 0};');
    add('    byte now = read();');
    add('    if (now == last) return false;');
    add('    acc += STEP[(last << 2) | now];');
    add('    last = now;');
    add('    if (acc >= 4) { acc = 0; pos = (pos + 1) % steps; return true; }');
    add('    if (acc <= -4) { acc = 0; pos = (pos + steps - 1) % steps; return true; }');
    add('    return false;');
    add('  }');
    add('};');
    add();
  }

  if (readers.length) {
    add('// ── RFID helper: knows which tag is on the reader right now ──');
    add('struct TagReader {');
    add('  MFRC522 rfid;');
    add('  String tag = "";           // ID of the tag on the reader, "" if none');
    add('  unsigned long checkAt = 0;');
    add('  byte misses = 0;');
    add();
    add('  TagReader(byte ss, byte rst) : rfid(ss, rst) {}');
    add('  void begin() { rfid.PCD_Init(); }');
    add('  void update(const char *name) {');
    add('    if ((long)(millis() - checkAt) < 0) return;');
    add('    checkAt = millis() + 100;   // check 10 times a second');
    add('    byte atqa[2];');
    add('    byte size = sizeof(atqa);');
    add('    bool found = rfid.PICC_WakeupA(atqa, &size) == MFRC522::STATUS_OK && rfid.PICC_ReadCardSerial();');
    add('    if (found) {');
    add('      String id = "";');
    add('      for (byte i = 0; i < rfid.uid.size; i++) {');
    add('        if (i) id += \' \';');
    add('        if (rfid.uid.uidByte[i] < 0x10) id += \'0\';');
    add('        id += String(rfid.uid.uidByte[i], HEX);');
    add('      }');
    add('      id.toUpperCase();');
    add('      rfid.PICC_HaltA();');
    add('      misses = 0;');
    add('      if (id != tag) {');
    add('        tag = id;');
    add('        if (LOG) { logTime(); Serial.print(name); Serial.print(F(" sees tag: ")); Serial.println(tag); }');
    add('      }');
    add('    } else if (tag.length() && ++misses >= 3) {   // gone for 3 checks in a row');
    add('      tag = "";');
    add('      if (LOG) { logTime(); Serial.print(name); Serial.println(F(" tag removed")); }');
    add('    }');
    add('  }');
    add('};');
    add();
  }

  if (digOuts.length) {
    add('// ── Output helper: on/off with timed pulses and blinks ──');
    const litOut = litType('light');
    add('struct Output {');
    add('  int pin;');
    add('  bool activeLow;');
    add('  bool on = false;');
    add('  unsigned long restoreAt = 0;');
    add('  bool restoreTo = false;');
    add('  int togglesLeft = 0;');
    add('  unsigned long nextToggle = 0;');
    add('  unsigned long onMs = 300, offMs = 300;');
    add('  // For the Serial Monitor log (set in setup): its name, and what on / off mean for it');
    add('  const __FlashStringHelper *name = nullptr, *onWord = nullptr, *offWord = nullptr;');
    add('  void say(bool v) {');
    add('    if (!LOG || !name) return;');
    add('    logTime();');
    add('    Serial.print(name);');
    add('    Serial.print(F(": "));');
    add('    Serial.print(v ? onWord : offWord);');
    add('    Serial.println(F(" (timer done)"));');
    add('  }');
    add();
    add('  void begin(int p, bool lowMeansOn) {');
    add('    pin = p;');
    add('    activeLow = lowMeansOn;');
    add('    write(false);           // set the level before enabling, so relays don\'t click at boot');
    add('    pinMode(pin, OUTPUT);');
    add('  }');
    add('  void write(bool v) {');
    add('    on = v;');
    add('    digitalWrite(pin, (v != activeLow) ? HIGH : LOW);');
    add('  }');
    add('  // Switch on or off, cancelling any running pulse or blink');
    add('  void set(bool v) {');
    add('    restoreAt = 0;');
    add('    togglesLeft = 0;');
    if (flickers) add('    flickering = false;');
    add('    write(v);');
    add('  }');
    add('  // Hold a state for ms milliseconds, then flip back');
    add('  void pulse(bool v, unsigned long ms) {');
    add('    set(v);');
    add('    restoreTo = !v;');
    add('    restoreAt = millis() + ms;');
    add('    if (restoreAt == 0) restoreAt = 1;');
    add('  }');
    if (flickers) {
      add('  // Flicker like a failing bulb: mostly on, with random short drop-outs, until told otherwise');
      add('  bool flickering = false;');
      add('  unsigned long flickMs = 200, flickAt = 0;');
      add('  void flicker(unsigned long ms) {');
      add('    set(true);');
      add('    flickering = true;');
      add('    flickMs = ms;');
      add('    flickAt = millis() + random(ms, ms * 3);');
      add('  }');
    }
    add('  // Flash on and off a number of times, ending off (times = 0: keep blinking until told otherwise)');
    add('  void blink(int times, unsigned long onFor, unsigned long offFor) {');
    add('    onMs = onFor;');
    add('    offMs = offFor;');
    add('    set(true);');
    add('    togglesLeft = times < 1 ? -1 : times * 2 - 1;');
    add('    nextToggle = millis() + onMs;');
    add('  }');
    if (litOut) flashMembers(add, null, '(void)b; /* on/off only: a Dimmer can vary brightness */ digitalWrite(pin, activeLow ? LOW : HIGH);', 'write(on);', 'The light\'s own on/off (and any blink)');
    add('  void update() {');
    if (litOut) add('    if (fN && flashUpdate() && fOn) return;   // lightning is showing');
    add('    unsigned long now = millis();');
    add('    if (restoreAt && (long)(now - restoreAt) >= 0) {');
    add('      restoreAt = 0;');
    add('      write(restoreTo);');
    add('      say(restoreTo);');
    add('    }');
    if (flickers) {
      add('    if (flickering && (long)(now - flickAt) >= 0) {');
      add('      write(!on);');
      add('      flickAt = now + (on ? random(flickMs, flickMs * 3) : random(flickMs / 4 + 1, flickMs));   // long on, short off');
      add('    }');
    }
    add('    if (togglesLeft != 0 && (long)(now - nextToggle) >= 0) {');
    add('      write(!on);');
    add('      if (togglesLeft > 0 && !--togglesLeft) say(on);   // -1 blinks forever');
    add('      nextToggle = now + (on ? onMs : offMs);');
    add('    }');
    add('  }');
    add('};');
    add();
  }

  if (strips.length) {
    add('// ── LED strip helper: up to 8 sections, each with its own colour and effect ──');
    add('struct Section {');
    add('  int from, to;          // first and last LED (0 = first LED on the strip)');
    add('  uint32_t color;');
    add('  byte fx;               // 0 solid, 1 breathe, 2 fade in, 3 flicker, 4 chase, 5 blink, 6 rainbow, 7 fade out, 8 fade chase, 9 static fade');
    add('  unsigned long ms;      // speed, or how long a fade takes');
    add('  unsigned long a, b;    // chase: LEDs on / off   fade chase: tail / gap   blink: ms on / off');
    add('  bool rev;              // chase runs back toward the first LED');
    add('  unsigned long c;       // fade chase: LEDs that brighten ahead of the bright part');
    add('  unsigned long f;       // fade chase: LEDs lit at 100%');
    add('};');
    const lit = litType('strip');
    add('struct Strip {');
    add('  Adafruit_NeoPixel px;');
    add('  int count;');
    add('  Section sec[8];');
    add('  byte n = 0;');
    add('  bool moving = false;');
    add('  unsigned long start = 0, nextAt = 0;');
    add();
    add('  Strip(int c, int pin) : px(c, pin, NEO_GRB + NEO_KHZ800), count(c) {}');
    add('  void begin(byte brightness) {');
    add('    px.begin();');
    add('    px.setBrightness(brightness);');
    add('    off();');
    add('  }');
    add('  void off() { n = 0; moving = false; px.clear(); px.show(); }');
    add('  // Start a new look: clear(), add() each section, then play()');
    add('  void clear() { n = 0; moving = false; }');
    add('  void add(int from, int to, uint32_t color, byte fx, unsigned long ms, unsigned long a = 0, unsigned long b = 0, bool rev = false, unsigned long c = 0, unsigned long f = 0) {');
    add('    if (n < 8) sec[n++] = Section{from, to, color, fx, ms, a, b, rev, c, f};');
    if (true) add('    if (fx && fx != 9) moving = true;   // static fades don\'t need redrawing');
    add('  }');
    add('  void play() { start = millis(); draw(); }');
    add('  // Scale a colour\'s brightness (k = 0 to 255)');
    add('  static uint32_t dim(uint32_t c, uint32_t k) {');
    add('    return ((((c >> 16) & 255) * k / 255) << 16) | ((((c >> 8) & 255) * k / 255) << 8) | ((c & 255) * k / 255);');
    add('  }');
    add('  uint32_t look(const Section &s, int i, unsigned long t) {');
    add('    switch (s.fx) {');
    add('      case 1: {   // breathe');
    add('        unsigned long k = t % s.ms;');
    add('        k = k < s.ms / 2 ? k * 510 / s.ms : (s.ms - k) * 510 / s.ms;');
    add('        return dim(s.color, 15 + k * 240 / 255);');
    add('      }');
    add('      case 2: return t >= s.ms ? s.color : dim(s.color, t * 255 / s.ms);         // fade in');
    add('      case 7: return t >= s.ms ? 0 : dim(s.color, 255 - t * 255 / s.ms);         // fade out');
    add('      case 3: {   // candle flicker');
    add('        uint32_t x = (uint32_t)i * 2654435761UL ^ (uint32_t)(t / 90) * 40503UL;');
    add('        x ^= x >> 13;');
    add('        x *= 0x5bd1e995UL;');
    add('        x ^= x >> 15;');
    add('        return dim(s.color, 110 + x % 146);');
    add('      }');
    add('      case 4: {   // chase: a LEDs on, b LEDs off, moving along');
    add('        long pos = (long)(t * 6 / s.ms), len = s.a + s.b;');
    add('        if (s.rev) pos = -pos;');
    add('        return ((((long)i - s.from - pos) % len + len) % len) < (long)s.a ? s.color : 0;');
    add('      }');
    add('      case 5: return (t % (s.a + s.b)) < s.a ? s.color : 0;   // blink: on for a ms, off for b ms');
    add('      case 8: {   // fade chase: c LEDs brighten, f LEDs at 100%, a LEDs fade out, then b dark LEDs');
    add('        unsigned long cycle = s.a + s.b + s.c + s.f;');
    add('        long len = (long)cycle * 256;');
    add('        long x = (long)(s.rev ? s.to - i : i - s.from) * 256;');
    add('        long k = ((long)((t % (cycle * s.ms)) * 1536UL / s.ms) - x) % len;   // 256ths of an LED behind the peak');
    add('        if (k < 0) k += len;');
    add('        long tail = (long)s.a * 256, head = (long)s.c * 256, full = (long)s.f * 256;');
    add('        if (k < full) return s.color;');
    add('        k -= full;');
    add('        if (k < tail) return dim(s.color, 255 - k * 255 / tail);');
    add('        if (head && k > len - full - head) return dim(s.color, 255 - (len - full - k) * 255 / head);   // fading in ahead');
    add('        return 0;');
    add('      }');
    add('      case 9: {   // static fade: c LEDs brighten, f at 100%, a fade out, b dark, repeating; never moves');
    add('        long cyc = s.c + s.f + s.a + s.b;');
    add('        long k = (long)(s.rev ? s.to - i : i - s.from) % cyc;');
    add('        if (k < (long)s.c) return dim(s.color, (k + 1) * 255 / (s.c + 1));');
    add('        k -= s.c;');
    add('        if (k < (long)s.f) return s.color;');
    add('        k -= s.f;');
    add('        if (k < (long)s.a) return dim(s.color, 255 - (k + 1) * 255 / (s.a + 1));');
    add('        return 0;');
    add('      }');
    add('      case 6: {   // rainbow, as bright as the section colour\'s strongest channel');
    add('        uint8_t v = max(max((s.color >> 16) & 255, (s.color >> 8) & 255), s.color & 255);');
    add('        return px.gamma32(px.ColorHSV((uint16_t)((long)(i - s.from) * 65536L / (s.to - s.from + 1) + (long)(t * 65536UL / s.ms)), 255, v));');
    add('      }');
    add('    }');
    add('    return s.color;');
    add('  }');
    if (lit) {
      flashMembers(add, { type: 'uint32_t', name: 'color', field: 'fColor' }, 'px.fill(dim(fColor, b * 255UL / 100)); px.show();', 'draw();', 'The strip\'s own look');
    }
    add('  void draw() {');
    add('    unsigned long t = millis() - start;');
    add('    px.clear();');
    add('    for (byte k = 0; k < n; k++)');
    add('      for (int i = sec[k].from; i <= sec[k].to && i < count; i++) px.setPixelColor(i, look(sec[k], i, t));');
    add('    px.show();');
    add('  }');
    add('  void update() {');
    if (lit) add('    if (fN && flashUpdate() && fOn) return;   // lightning is showing');
    add('    if (!moving || (long)(millis() - nextAt) < 0) return;');
    add('    nextAt = millis() + 25;');
    add('    draw();');
    add('  }');
    add('};');
    add();
  }

  if (clocks.length) {
    add('// ── Clock display helper (TM1637): counts down or up in minutes:seconds ──');
    add('struct Clock {');
    add('  TM1637Display tm;');
    add('  long secs = 0;            // seconds on the clock');
    add('  int8_t dir = 0;           // -1 counting down, 1 counting up, 0 stopped');
    add('  int8_t lastDir = 0;');
    add('  bool finished = false;    // the countdown reached 0:00');
    add('  unsigned long tickAt = 0;');
    add();
    add('  Clock(int clk, int dio) : tm(clk, dio) {}');
    add('  void begin(byte brightness) { tm.setBrightness(brightness); tm.clear(); }');
    add('  void show() {');
    add('    long s = secs < 0 ? 0 : secs, m = s / 60;');
    add('    if (m > 99) m = 99;');
    add('    tm.showNumberDecEx(m * 100 + s % 60, 0b01000000, true);   // MM:SS');
    add('  }');
    add('  void countdown(long s) { secs = s; dir = -1; finished = false; tickAt = millis() + 1000; show(); }');
    add('  void countup() { secs = 0; dir = 1; finished = false; tickAt = millis() + 1000; show(); }');
    add('  void pause() { if (dir) { lastDir = dir; dir = 0; } }');
    add('  void resume() { if (!dir && lastDir && !finished) { dir = lastDir; tickAt = millis() + 1000; } }');
    add('  void addTime(long s) { secs += s; if (secs < 0) secs = 0; show(); }');
    add('  // Show a number right-aligned; dots lights a decimal point (0 = none)');
    add('  void number(int v, uint8_t dots = 0, uint8_t len = 4) {');
    add('    dir = 0;');
    add('    lastDir = 0;');
    add('    tm.clear();');
    add('    tm.showNumberDecEx(v, dots, true, len, 4 - len);');
    add('  }');
    add('  // Show up to 4 letters. 7 segments can\'t draw K, M, V, W or X well');
    add('  void word(const char *w) {');
    add('    dir = 0;');
    add('    lastDir = 0;');
    add('    uint8_t seg[4] = {0, 0, 0, 0};');
    add('    for (byte i = 0; i < 4 && w[i]; i++) seg[i] = glyph(w[i]);');
    add('    tm.setSegments(seg);');
    add('  }');
    add('  static uint8_t glyph(char c) {');
    add('    static const uint8_t LETTERS[26] = {0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71, 0x3D, 0x76, 0x30, 0x1E, 0x75, 0x38, 0x15,');
    add('                                        0x54, 0x3F, 0x73, 0x67, 0x50, 0x6D, 0x78, 0x3E, 0x1C, 0x2A, 0x76, 0x6E, 0x5B};');
    add('    static const uint8_t DIGITS[10] = {0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F};');
    add('    if (c >= \'a\' && c <= \'z\') c -= 32;');
    add('    if (c >= \'A\' && c <= \'Z\') return LETTERS[c - \'A\'];');
    add('    if (c >= \'0\' && c <= \'9\') return DIGITS[c - \'0\'];');
    add('    if (c == \'-\') return 0x40;');
    add('    if (c == \'_\') return 0x08;');
    add('    return 0;   // anything else is blank');
    add('  }');
    add('  void clear() { dir = 0; lastDir = 0; finished = false; secs = 0; tm.clear(); }');
    add('  void update() {');
    add('    if (!dir || (long)(millis() - tickAt) < 0) return;');
    add('    tickAt += 1000;');
    add('    secs += dir;');
    add('    if (dir < 0 && secs <= 0) { secs = 0; dir = 0; finished = true; }');
    add('    show();');
    add('  }');
    add('};');
    add();
  }

  if (bridges.length) {
    add('// ── L298N helper: direction and speed for a DC motor ──');
    add('struct HBridge {');
    add('  int en, in1, in2;');
    add('  int8_t dir = 0;               // 1 forward, -1 backward, 0 stopped');
    add('  unsigned long stopAt = 0;');
    add();
    add('  void begin(int e, int a, int b) {');
    add('    en = e;');
    add('    in1 = a;');
    add('    in2 = b;');
    add('    pinMode(en, OUTPUT);');
    add('    pinMode(in1, OUTPUT);');
    add('    pinMode(in2, OUTPUT);');
    add('    stop();');
    add('  }');
    add('  // Run at pct % speed; ms > 0 stops it again after that long');
    add('  void run(int8_t d, int pct, unsigned long ms) {');
    add('    dir = d;');
    add('    digitalWrite(in1, d > 0 ? HIGH : LOW);');
    add('    digitalWrite(in2, d < 0 ? HIGH : LOW);');
    add('    analogWrite(en, constrain(pct, 0, 100) * 255 / 100);');
    add('    stopAt = ms ? millis() + ms : 0;');
    add('    if (ms && !stopAt) stopAt = 1;');
    add('  }');
    add('  void stop() { dir = 0; stopAt = 0; digitalWrite(in1, LOW); digitalWrite(in2, LOW); analogWrite(en, 0); }      // coast');
    add('  void brake() { dir = 0; stopAt = 0; digitalWrite(in1, HIGH); digitalWrite(in2, HIGH); analogWrite(en, 255); } // hold');
    add('  void update() { if (stopAt && (long)(millis() - stopAt) >= 0) stop(); }');
    add('};');
    add();
  }

  if (dimmers.length) {
    add('// ── Dimmer helper: 0 to 100 %, with smooth fades ──');
    const litDim = litType('dimmer');
    add('struct Dimmer {');
    add('  int pin;');
    add('  float level = 0, from = 0, to = 0;');
    add('  unsigned long startAt = 0, dur = 0;');
    add();
    add('  void begin(int p) { pin = p; pinMode(pin, OUTPUT); set(0); }');
    add('  void write() { analogWrite(pin, (int)(level * 2.55)); }');
    add('  void set(float pct) { dur = 0;' + (flickers ? ' flickering = false;' : '') + ' level = constrain(pct, 0, 100); write(); }');
    if (flickers) {
      add('  // Flicker: random brightness like a candle (varied), or on/off like a failing bulb, until told otherwise');
      add('  bool flickering = false, varied = true;');
      add('  unsigned long flickMs = 200, flickAt = 0;');
      add('  void flicker(unsigned long ms, bool vary) {');
      add('    dur = 0;');
      add('    flickering = true;');
      add('    varied = vary;');
      add('    flickMs = ms;');
      add('    flickAt = millis();');
      add('  }');
    }
    add('  void fadeTo(float pct, unsigned long ms) {');
    if (flickers) add('    flickering = false;');
    add('    from = level;');
    add('    to = constrain(pct, 0, 100);');
    add('    startAt = millis();');
    add('    dur = ms ? ms : 1;');
    add('  }');
    if (litDim) flashMembers(add, { type: 'float', name: 'pct', field: 'fPct' }, 'analogWrite(pin, (int)(fPct * b / 100 * 2.55));', 'write();', 'The light\'s own level (and any fade)');
    add('  void update() {');
    if (litDim) add('    if (fN && flashUpdate() && fOn) return;   // lightning is showing');
    if (flickers) {
      add('    if (flickering) {');
      add('      if ((long)(millis() - flickAt) < 0) return;');
      add('      if (varied) { level = random(15, 101); flickAt = millis() + random(flickMs / 2 + 1, flickMs * 3 / 2 + 2); }');
      add('      else { level = level > 50 ? 0 : 100; flickAt = millis() + (level ? random(flickMs, flickMs * 3) : random(flickMs / 4 + 1, flickMs)); }');
      add('      write();');
      add('      return;');
      add('    }');
    }
    add('    if (!dur) return;');
    add('    unsigned long t = millis() - startAt;');
    add('    if (t >= dur) { set(to); return; }');
    add('    level = from + (to - from) * t / dur;');
    add('    write();');
    add('  }');
    add('};');
    add();
  }

  if (oleds.length) {
    add('// Show text on an OLED screen (wraps automatically, about 10 characters a line)');
    add('void showText(Adafruit_SSD1306 &d, const char *text) {');
    add('  d.clearDisplay();');
    add('  d.setTextSize(2);');
    add('  d.setTextColor(SSD1306_WHITE);');
    add('  d.setCursor(0, 0);');
    add('  d.print(text);');
    add('  d.display();');
    add('}');
    add();
  }
  if (lcds.length) {
    add('// Show text on a 16x2 LCD (first 16 characters on line 1, the next 16 on line 2)');
    add('void showText(LiquidCrystal_I2C &d, const char *text) {');
    add('  d.clear();');
    add('  for (byte i = 0; text[i] && i < 32; i++) {');
    add('    if (i == 16) d.setCursor(0, 1);');
    add('    d.print(text[i]);');
    add('  }');
    add('}');
    add();
  }

  const hasParts = digIns.length || dials.length || readers.length || pads.length || wired.some(p => TYPES[p.type].kind === 'out');
  if (hasParts) {
    add('// ── Parts ───────────────────────────────────────');
    for (const p of digIns) add('Input ' + N[p.id].v + ';');
    for (const p of dials) add('Dial ' + N[p.id].v + ';');
    for (const p of readers) add('TagReader ' + N[p.id].v + '(' + PC(p, 'pin') + ', ' + PC(p, 'pin2') + ');');
    for (const p of pads) {
      const v = N[p.id].v, cols = optsOf(p).layout === '4x3' ? 3 : 4;
      const keys = cols === 3 ? ['123', '456', '789', '*0#'] : ['123A', '456B', '789C', '*0#D'];
      add('char ' + v + 'Keys[4][' + cols + '] = {' + keys.map(r => '{' + r.split('').map(k => "'" + k + "'").join(', ') + '}').join(', ') + '};');
      add('byte ' + v + 'RowPins[4] = {' + [1, 2, 3, 4].map(i => PC(p, i === 1 ? 'pin' : 'pin' + i)).join(', ') + '};');
      add('byte ' + v + 'ColPins[' + cols + '] = {' + Array.from({ length: cols }, (_, i) => PC(p, 'pin' + (5 + i))).join(', ') + '};');
      add('Keypad ' + v + ' = Keypad(makeKeymap(' + v + 'Keys), ' + v + 'RowPins, ' + v + 'ColPins, 4, ' + cols + ');');
      add('String ' + v + 'Typed = "";    // keys typed so far');
      add('String ' + v + 'Code = "";     // a code that was just entered');
      add('bool ' + v + 'Wrong = false;   // a wrong code was just entered');
      add('char ' + v + 'Key = 0;         // the key just pressed');
    }
    for (const p of digOuts) add('Output ' + N[p.id].v + ';');
    if (servos.some(glides)) {
      add('// Servo helper: glides to an angle over a set time instead of jumping there');
      add('struct ServoGlide {');
      add('  Servo &s;');
      add('  int from = 0, to = 0;');
      add('  unsigned long start = 0, ms = 0;');
      add('  bool moving = false;');
      add('  ServoGlide(Servo &servo) : s(servo) {}');
      add('  void go(int target, unsigned long over) {   // over 0: jump straight there');
      add('    to = constrain(target, 0, 180);');
      add('    from = s.read();');
      add('    start = millis();');
      add('    ms = over;');
      add('    moving = over > 0 && from != to;');
      add('    if (!moving) s.write(to);');
      add('  }');
      add('  void stop() { moving = false; }');
      add('  void update() {');
      add('    if (!moving) return;');
      add('    unsigned long t = millis() - start;');
      add('    if (t >= ms) { s.write(to); moving = false; return; }');
      add('    s.write(from + (int)((long)(to - from) * (long)t / (long)ms));');
      add('  }');
      add('};');
    }
    for (const p of servos) add('Servo ' + N[p.id].v + ';' + (glides(p) ? '\nServoGlide ' + N[p.id].v + 'Glide(' + N[p.id].v + ');   // moves it smoothly' : ''));
    players.forEach((p, i) => {
      if (esp) add('HardwareSerial ' + serialOf(p) + '(' + (i === 0 ? 2 : 1) + ');');
      else add('SoftwareSerial ' + serialOf(p) + '(' + PC(p, 'pin2') + ', ' + PC(p, 'pin') + ');');
      add('DFRobotDFPlayerMini ' + N[p.id].v + ';');
    });
    for (const p of strips) add('Strip ' + N[p.id].v + '(' + Math.max(1, int(optsOf(p).count, 30)) + ', ' + PC(p) + ');   // ' + Math.max(1, int(optsOf(p).count, 30)) + ' LEDs');
    for (const p of dimmers) add('Dimmer ' + N[p.id].v + ';');
    for (const p of clocks) add('Clock ' + N[p.id].v + '(' + PC(p, 'pin') + ', ' + PC(p, 'pin2') + ');');
    for (const p of bridges) add('HBridge ' + N[p.id].v + ';');
    for (const p of steppers) {
      if (optsOf(p).driver === 'a4988') add('AccelStepper ' + N[p.id].v + '(AccelStepper::DRIVER, ' + PC(p, 'pin') + ', ' + PC(p, 'pin2') + ');');
      else add('AccelStepper ' + N[p.id].v + '(AccelStepper::FULL4WIRE, ' + PC(p, 'pin') + ', ' + PC(p, 'pin3') + ', ' + PC(p, 'pin2') + ', ' + PC(p, 'pin4') + ');   // IN1, IN3, IN2, IN4 order is correct');
    }
    for (const p of oleds) add('Adafruit_SSD1306 ' + N[p.id].v + '(128, 64, &Wire, -1);');
    for (const p of lcds) add('LiquidCrystal_I2C ' + N[p.id].v + '(0x27, 16, 2);   // try 0x3F if the screen stays blank');
    add();
  }
  if (counters.length || flags.length) {
    add('// ── Counters and flags ──────────────────────────');
    for (const p of counters) add('int ' + N[p.id].v + ' = 0;');
    for (const p of flags) add('bool ' + N[p.id].v + ' = false;');
    add();
  }

  const live = rules.filter(x => x.conds.length && x.acts.some(a => !isWait(a)));
  for (const x of live) {
    x.match = x.r.match === 'order' ? 'order' : 'all';
    // "Start over when the steps finish": loop the whole sequence, waits included, while the conditions stay true
    x.loop = x.match !== 'order' && !!x.r.loop;
    x.repeat = !x.loop && x.match !== 'order' && num(x.r.repeat, 0) > 0 ? msOf(x.r.repeat) : 0;
    x.timeout = x.match === 'order' && num(x.r.timeout, 0) > 0 ? msOf(x.r.timeout) : 0;
    // "Only while true": when the conditions stop being true, undo what the rule did
    x.whileTrue = !!x.r.whileTrue && x.match !== 'order';
    x.once = !!x.r.once && !x.repeat && !x.loop && !x.whileTrue;
    if (x.loop) {
      // waits after the last action are the pause before starting over (with no waits at all, half a second)
      let tail = 0, tailMax = 0;
      for (let k = x.acts.length - 1; k >= 0 && isWait(x.acts[k]); k--) { const lo = msOf(x.acts[k].a.value); tail += lo; tailMax += waitMax(x.acts[k].a) || lo; }
      x.loopGap = tail ? waitExpr(tail, tailMax) : (x.stages.length > 1 ? '1' : '500');
      x.loopTail = tail ? waitText(tail, tailMax) : '';
    }
  }
  const needTimers = live.some(x => x.stages.length > 1 || x.repeat || x.loop);
  if (live.length) {
    add('// ── Rule state ──────────────────────────────────');
    add('// A rule fires the moment its conditions become true.');
    for (const x of live) {
      if (x.match === 'order') {
        const sq = seqOf(x);
        add('// Rule ' + x.n + ' sequence: inputs must happen in this exact order');
        add('const byte rule' + x.n + 'Order[] = {' + sq.steps.join(', ') + '};   // which input each step needs');
        add('bool rule' + x.n + 'Prev[' + sq.events.length + '] = {' + sq.events.map(() => 'true').join(', ') + '};   // each input\'s last state');
        add('byte rule' + x.n + 'Pos = 0;   // steps done so far');
        if (x.timeout) add('unsigned long rule' + x.n + 'LastStep = 0;');
      }
      // "Only while true" follows the conditions as they are now, so after power-up or a reset it fires straight away if already true
      add('bool rule' + x.n + 'Was = ' + (x.whileTrue ? 'false;   // only while true: check it straight away' : 'true;'));
      if (x.whileTrue) add('bool rule' + x.n + 'On = false;     // "only while true": it has fired and not been undone yet');
      if (x.once) add('bool rule' + x.n + 'Done = false;   // "only once" rule');
      if (x.repeat || x.loop) add('unsigned long rule' + x.n + 'AgainAt = 0;   // ' + (x.loop ? 'start over while still true' : 'next repeat while still true'));
      for (let k = 2; k <= x.stages.length; k++) add('unsigned long rule' + x.n + 'Step' + k + 'At = 0;   // when step ' + k + ' runs (0 = not waiting)');
    }
    add();
  }

  if (needTimers) {
    add('// ── Timer helpers (the board keeps running while it waits) ──');
    add('// later(ms) is a time ms from now; due(t) turns true once that time arrives, then clears it.');
    add('unsigned long later(unsigned long ms) {');
    add('  unsigned long t = millis() + ms;');
    add('  return t ? t : 1;');
    add('}');
    add('bool due(unsigned long &t) {');
    add('  if (t && (long)(millis() - t) >= 0) {');
    add('    t = 0;');
    add('    return true;');
    add('  }');
    add('  return false;');
    add('}');
    add();
  }

  add('// Puts every output back to its starting state and re-arms the rules.');
  add('void resetPuzzle() {');
  for (const p of digOuts) {
    const o = optsOf(p);
    if (p.type === 'maglock') add('  ' + N[p.id].v + '.set(' + (o.startLocked ? 'true);   // locked' : 'false);  // unlocked'));
    else add('  ' + N[p.id].v + '.set(' + (o.startOn ? 'true' : 'false') + ');');
  }
  for (const p of servos) { if (glides(p)) add('  ' + N[p.id].v + 'Glide.stop();'); add('  ' + N[p.id].v + '.write(' + Math.min(180, Math.max(0, int(optsOf(p).startAngle, 0))) + ');'); }
  for (const p of players) add('  ' + N[p.id].v + '.stop();');
  for (const p of strips) add('  ' + N[p.id].v + '.off();');
  for (const p of dimmers) add('  ' + N[p.id].v + '.set(' + Math.min(100, Math.max(0, int(optsOf(p).start, 0))) + ');');
  for (const p of clocks) add('  ' + N[p.id].v + '.clear();');
  for (const p of bridges) add('  ' + N[p.id].v + '.stop();');
  for (const p of steppers) add('  ' + N[p.id].v + '.moveTo(' + N[p.id].v + '.currentPosition());   // stop where it is');
  for (const p of screens) add('  showText(' + N[p.id].v + ', ' + cstr(optsOf(p).startText || '') + ');');
  for (const p of dials) add('  ' + N[p.id].v + '.pos = 0;');
  for (const p of pads) add('  ' + N[p.id].v + 'Typed = "";');
  for (const p of counters) add('  ' + N[p.id].v + ' = 0;');
  for (const p of flags) add('  ' + N[p.id].v + ' = false;');
  for (const x of live) {
    add('  rule' + x.n + 'Was = ' + (x.whileTrue ? 'false;   // only while true: fire again at once if still true' : 'true;'));
    if (x.whileTrue) add('  rule' + x.n + 'On = false;');
    if (x.once) add('  rule' + x.n + 'Done = false;');
    if (x.repeat || x.loop) add('  rule' + x.n + 'AgainAt = 0;');
    for (let k = 2; k <= x.stages.length; k++) add('  rule' + x.n + 'Step' + k + 'At = 0;');
    if (x.match === 'order') {
      add('  rule' + x.n + 'Pos = 0;');
      add('  for (byte i = 0; i < ' + seqOf(x).events.length + '; i++) rule' + x.n + 'Prev[i] = true;');
    }
  }
  add('}');
  add();

  if (SH) {
    if (SH.devices.length) {
      add('// Device dashboard: "do <part> <action> [value]" from Escape Runner, to control a part or simulate an input');
      add('void manualControl(const String &c) {');
      add("  int a = c.indexOf(' ', 3), b = a < 0 ? -1 : c.indexOf(' ', a + 1);");
      add('  String part = a < 0 ? c.substring(3) : c.substring(3, a);');
      add('  String act = a < 0 ? String("") : (b < 0 ? c.substring(a + 1) : c.substring(a + 1, b));');
      add('  long val = b < 0 ? 0 : c.substring(b + 1).toInt();');
      add('  if (LOG) { logTime(); Serial.print(F("Dashboard: ")); Serial.println(c.substring(3)); }');
      for (const d of SH.devices) {
        const v = N[d.p.id].v, k = cstr(d.key), lines = [];
        if (d.kind === 'onoff') lines.push('if (act == "on") ' + v + '.set(true);', 'if (act == "off") ' + v + '.set(false);');
        else if (d.kind === 'lock') lines.push('if (act == "lock") ' + v + '.set(true);', 'if (act == "unlock") ' + v + '.set(false);');
        else if (d.kind === 'level') lines.push('if (act == "set") ' + v + '.set(constrain(val, 0, 100));');
        else if (d.kind === 'strip') lines.push('if (act == "white") { ' + v + '.clear(); ' + v + '.add(0, ' + (Math.max(1, int(optsOf(d.p).count, 30)) - 1) + ', 0xFFFFFF, 0, 1000); ' + v + '.play(); }', 'if (act == "off") ' + v + '.off();');
        else if (d.kind === 'angle') lines.push(glides(d.p) ? 'if (act == "set") ' + v + 'Glide.go(val, 0);' : 'if (act == "set") ' + v + '.write(constrain(val, 0, 180));');
        else if (d.kind === 'flag') lines.push('if (act == "set") ' + v + ' = true;', 'if (act == "clear") ' + v + ' = false;');
        else if (d.kind === 'mp3') lines.push('if (act == "play") ' + v + '.playMp3Folder(val < 1 ? 1 : val);', 'if (act == "stop") ' + v + '.stop();');
        else if (d.kind === 'press' || d.kind === 'hold') lines.push(
          'if (act == "press") { ' + v + '.forced = 1; ' + v + '.forcedUntil = millis() + 400; }   // like a quick press',
          'if (act == "on") { ' + v + '.forced = 1; ' + v + '.forcedUntil = 0; }                   // held on until "real"',
          'if (act == "off") { ' + v + '.forced = 0; ' + v + '.forcedUntil = 0; }',
          'if (act == "real") { ' + v + '.forced = -1; ' + v + '.forcedUntil = 0; }               // back to the real input');
        if (!lines.length) continue;
        add('  if (part == ' + k + ') {   // ' + oneLine(d.p.name));
        for (const l of lines) add('    ' + l);
        add('    return;');
        add('  }');
      }
      add('}');
      add();
    }
    add('// Commands from Escape Runner: reset / safe, or one of this board\'s scene steps');
    add('void runCommand(const String &c) {');
    add('  if (LOG) { logTime(); Serial.print(F("Command from Escape Runner: ")); Serial.println(c); }');
    add('  if (c == "reset" || c == "safe") {');
    add('    resetPuzzle();');
    if (simInputs) for (const d of SH.devices) if (d.kind === 'press' || d.kind === 'hold') add('    ' + N[d.p.id].v + '.forced = -1;   // simulated inputs go back to the real ones');
    add('    return;');
    add('  }');
    if (SH.devices.length) add('  if (c.startsWith("do ")) { manualControl(c); return; }');
    for (const L of SH.lights) {
      add('  if (c.startsWith(' + cstr(L.id + ' ') + ')) {   // ' + oneLine(L.scene.name || 'Scene') + ': lightning with ' + oneLine(mediaFiles(L.a).join(', ')));
      for (const p of L.parts) add('    ' + N[p.id].v + '.lightning(c.c_str() + ' + (L.id.length + 1) +
        (p.type === 'strip' ? ', 0x' + lightningHex(L.a) : p.type === 'dimmer' ? ', ' + Math.min(100, Math.max(1, int(L.a.lpct, 100))) : '') + ');');
      add('    return;');
      add('  }');
    }
    for (const cm of SH.cmds) {
      add('  if (c == ' + cstr(cm.id) + ') {   // ' + oneLine(cm.scene.name || 'Scene') + ': ' + oneLine(cm.part.name) + ' ' + oneLine(((TYPES[cm.part.type].acts || []).find(x => x[0] === cm.a.action) || ['', cm.a.action])[1]));
      emitAction(add, N, cm.a, cm.part);
      add('    return;');
      add('  }');
    }
    add('  Serial.println("Unknown command: re-upload this board\'s code from Escape Builder");');
    add('}');
    add();
  }

  add('void setup() {');
  add('  Serial.begin(115200);');
  // Flicker and random waits: an Arduino repeats the same "random" numbers every power-up unless seeded from electrical noise
  // (the ESP32 has a hardware random number generator, so it doesn't need this)
  const usesRandom = flickers || project.rules.some(r => r.then.some(a => a.part === '__sys' && a.action === 'wait' && waitMax(a)));
  if (usesRandom && !esp) add('  randomSeed(analogRead(A0) * 31 + analogRead(A1) + micros());   // different random waits and flickers every game');
  if (wifi) {
    add('  WiFi.mode(WIFI_STA);');
    add('  WiFi.persistent(false);   // don\'t wear out flash saving Wi-Fi settings on every start');
    add('  WiFi.setSleep(false);     // stay fully awake on Wi-Fi: steadier connection, quicker replies');
    add('  WiFi.setAutoReconnect(true);');
    add('  WiFi.begin(WIFI_NAME, WIFI_PASSWORD);   // connects in the background');
    add('  ArduinoOTA.setHostname(MQTT_ID);         // its name under Tools > Port > Network ports');
    add('  if (UPLOAD_PASSWORD[0]) ArduinoOTA.setPassword(UPLOAD_PASSWORD);');
    add('  ArduinoOTA.onStart([]() { Serial.println("Receiving new code over Wi-Fi..."); });');
    add('  mqtt.setServer(MQTT_SERVER, MQTT_PORT);');
    add('  mqtt.setCallback(onMessage);');
    if (SH && SH.lights.length) add('  mqtt.setBufferSize(1024);   // room for lightning flash maps');
  }
  for (const p of digIns) {
    const pin = findPin(project.board, p.pin);
    const v = N[p.id].v, C = PC(p);
    // "Reversed" in Parts: for hardware that reads the opposite way (a sensor that's on when it should be off)
    const flip = !!optsOf(p).flip, lowOn = low => String(flip ? !low : low), note = flip ? '   // reversed: reads the other way round' : '';
    if (p.type === 'motion') add('  ' + v + '.begin(' + C + ', INPUT, ' + lowOn(false) + ');' + note);
    else if (p.type === 'linkin') add('  ' + v + '.begin(' + C + ', INPUT, ' + lowOn(false) + ');' + (note || '        // the other board drives this pin HIGH for "on"'));
    else if (pin.inputOnly) add('  ' + v + '.begin(' + C + ', INPUT, ' + lowOn(true) + ');' + (note || '         // needs a 10k pull-up resistor to 3.3V'));
    else add('  ' + v + '.begin(' + C + ', INPUT_PULLUP, ' + lowOn(true) + ');' + note);
  }
  for (const p of dials) add('  ' + N[p.id].v + '.begin(' + PC(p, 'pin') + ', ' + PC(p, 'pin2') + ', ' + Math.max(2, int(optsOf(p).steps, 20)) + ');   // ' + Math.max(2, int(optsOf(p).steps, 20)) + ' positions');
  if (readers.length) add('  SPI.begin();');
  for (const p of readers) add('  ' + N[p.id].v + '.begin();');
  for (const p of digOuts) {
    const o = optsOf(p);
    const relayLow = (p.type === 'relay' || p.type === 'maglock') && o.activeLow, flipped = (p.type === 'light' || p.type === 'buzzer') && o.flip;
    const low = relayLow || flipped;
    add('  ' + N[p.id].v + '.begin(' + PC(p) + ', ' + (low ? 'true' : 'false') + ');' + (relayLow ? '   // relay module switches on when its pin is LOW' : flipped ? '   // reversed: on when its pin is LOW' : ''));
    const w = OUTPUT_WORDS[p.type] || ['on', 'off'];
    add('  ' + N[p.id].v + '.name = F(' + cstr(oneLine(p.name)) + '); ' + N[p.id].v + '.onWord = F(' + cstr(w[0]) + '); ' + N[p.id].v + '.offWord = F(' + cstr(w[1]) + ');');
  }
  for (const p of servos) add('  ' + N[p.id].v + '.attach(' + PC(p) + ');');
  for (const p of players) {
    const v = N[p.id].v, sv = serialOf(p);
    if (esp) add('  ' + sv + '.begin(9600, SERIAL_8N1, ' + PC(p, 'pin2') + ', ' + PC(p, 'pin') + ');');
    else { add('  ' + sv + '.begin(9600);'); add('  ' + sv + '.listen();'); }
    // Genuine DFPlayers answer at start-up. Many compatible players (FN-M16P, MH2024K, GD3200B ...) don't, but play fine.
    add('  // A genuine DFPlayer answers here. Many compatible players don\'t, but play fine,');
    add('  // so with no answer, carry on without waiting for replies.');
    add('  if (!' + v + '.begin(' + sv + ', true, true)) {');
    add('    ' + v + '.begin(' + sv + ', false, false);');
    add('    Serial.println(' + cstr(oneLine(p.name) + ': no answer at start-up. Many MP3 players work anyway. If it stays silent, check: Arduino TX pin to player RX (through 1k), player TX to Arduino RX pin, 5V, GND, and the SD card.') + ');');
    add('  }');
    add('  ' + v + '.volume(' + Math.min(30, Math.max(0, int(optsOf(p).volume, 20))) + ');   // 0 to 30');
  }
  for (const p of strips) add('  ' + N[p.id].v + '.begin(' + Math.min(255, Math.max(1, int(optsOf(p).brightness, 80))) + ');   // brightness 1 to 255');
  for (const p of dimmers) add('  ' + N[p.id].v + '.begin(' + PC(p) + ');');
  for (const p of bridges) add('  ' + N[p.id].v + '.begin(' + PC(p, 'pin') + ', ' + PC(p, 'pin2') + ', ' + PC(p, 'pin3') + ');   // ENA, IN1, IN2');
  for (const p of steppers) {
    const o = optsOf(p), sps = Math.max(1, Math.round(num(o.rpm, 10) * Math.max(1, int(o.stepsPerRev, 2048)) / 60));
    add('  ' + N[p.id].v + '.setMaxSpeed(' + sps + ');       // ' + num(o.rpm, 10) + ' RPM');
    add('  ' + N[p.id].v + '.setAcceleration(' + sps * 2 + ');');
  }
  for (const p of clocks) add('  ' + N[p.id].v + '.begin(' + Math.min(7, Math.max(0, int(optsOf(p).brightness, 7))) + ');   // brightness 0 to 7');
  for (const p of oleds) {
    add('  if (!' + N[p.id].v + '.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {');
    add('    Serial.println(' + cstr(oneLine(p.name) + ' not found: check wiring') + ');');
    add('  }');
  }
  for (const p of lcds) { add('  ' + N[p.id].v + '.init();'); add('  ' + N[p.id].v + '.backlight();'); }
  add('  resetPuzzle();');
  add('  Serial.println(' + cstr(title + ' ready') + ');');
  add('}');
  add();

  add('void loop() {');
  if (wifi) {
    add('  // Messages: stay connected, and catch anything that arrives');
    add('  gotMessage = false;');
    add('  keepConnected();');
    add('  ArduinoOTA.handle();   // new code arriving over Wi-Fi');
    add();
  }
  if (digIns.length || anIns.length || dials.length || readers.length || pads.length) {
    add('  // Read inputs');
    for (const p of digIns) {
      const v = N[p.id].v, w = INPUT_WORDS[p.type] || ['on', 'off'];
      add('  ' + v + '.update();');
      add('  if (LOG && ' + v + '.changed) { logTime(); Serial.println(' + v + '.active ? F(' + cstr(oneLine(p.name) + ': ' + w[0]) + ') : F(' + cstr(oneLine(p.name) + ': ' + w[1]) + ')); }');
    }
    for (const p of anIns) {
      const v = N[p.id].v;
      add('  int ' + v + ' = analogRead(' + PC(p) + ');   // 0 to ' + B.adcMax);
      // Log a reading when it moves noticeably, at most 4 times a second
      add('  static int ' + v + 'Shown = -1000;');
      add('  static unsigned long ' + v + 'ShownAt = 0;');
      add('  if (LOG && abs(' + v + ' - ' + v + 'Shown) > ' + Math.round(B.adcMax / 40) + ' && millis() - ' + v + 'ShownAt >= 250) {');
      add('    ' + v + 'Shown = ' + v + ';');
      add('    ' + v + 'ShownAt = millis();');
      add('    logTime(); Serial.print(F(' + cstr(oneLine(p.name) + ': ') + ')); Serial.println(' + v + ');');
      add('  }');
    }
    for (const p of dials) {
      const v = N[p.id].v;
      add('  if (' + v + '.update()) {');
      logVal(add, '    ', p.name + ': position ', v + '.pos');
      add('  }');
    }
    for (const p of readers) add('  ' + N[p.id].v + '.update(' + cstr(oneLine(p.name)) + ');');
    for (const p of pads) {
      const v = N[p.id].v, list = codes[p.id] || [];
      const maxLen = Math.max(4, ...list.map(c => c.length));
      add('  ' + v + 'Code = "";');
      add('  ' + v + 'Wrong = false;');
      add('  ' + v + 'Key = ' + v + '.getKey();');
      add('  if (' + v + 'Key) {');
      logVal(add, '    ', p.name + ' key: ', v + 'Key');
      add('    if (' + v + 'Key == \'*\') ' + v + 'Typed = "";                     // * clears');
      add('    else {');
      add('      if (' + v + 'Key != \'#\') ' + v + 'Typed += ' + v + 'Key;           // # submits early');
      if (list.length) {
        add('      if (' + list.map(c => v + 'Typed == ' + cstr(c)).join(' || ') + ') {');
        add('        ' + v + 'Code = ' + v + 'Typed;');
        logVal(add, '        ', p.name + ': right code ', v + 'Code');
        add('        ' + v + 'Typed = "";');
        add('      } else if (' + v + 'Key == \'#\' || ' + v + 'Typed.length() >= ' + maxLen + ') {');
      } else add('      if (' + v + 'Key == \'#\' || ' + v + 'Typed.length() >= ' + maxLen + ') {');
      add('        ' + v + 'Wrong = ' + v + 'Typed.length() > 0;');
      add('        if (' + v + 'Wrong) { if (LOG) { logTime(); Serial.print(F(' + cstr(oneLine(p.name) + ': wrong code ') + ')); Serial.println(' + v + 'Typed); } }');
      add('        ' + v + 'Typed = "";');
      add('      }');
      add('    }');
      add('  }');
    }
    add();
  }
  rules.forEach(x => {
    const n = x.n, label = 'Rule ' + n + (oneLine(x.r.name) ? ': ' + oneLine(x.r.name) : '');
    if (!live.includes(x)) {
      add('  // ' + label + ' is skipped (it needs at least one wired condition and one action)');
      add();
      return;
    }
    add('  // ' + label);
    const texts = x.conds.map(({ c }) => oneLine(condText(project, c)));
    if (x.match === 'order') {
      const sq = seqOf(x), E = sq.events.length, S = sq.steps.length;
      add('  // When these happen in order: ' + texts.join(', then '));
      if (x.timeout) add('  if (rule' + n + 'Pos && millis() - rule' + n + 'LastStep > ' + x.timeout + ') rule' + n + 'Pos = 0;   // too slow: start over');
      add('  bool rule' + n + 'Now[] = {' + sq.events.join(', ') + '};');
      add('  bool rule' + n + ' = false;');
      add('  for (byte i = 0; i < ' + E + '; i++) {');
      add('    if (rule' + n + 'Now[i] && !rule' + n + 'Prev[i]) {                // input i just happened');
      add('      if (i == rule' + n + 'Order[rule' + n + 'Pos]) rule' + n + 'Pos++;   // the right next step');
      add('      else rule' + n + 'Pos = (i == rule' + n + 'Order[0]) ? 1 : 0;   // wrong one: start over');
      if (x.timeout) add('      rule' + n + 'LastStep = millis();');
      add('      if (rule' + n + 'Pos == ' + S + ') {                           // whole sequence done');
      add('        rule' + n + 'Pos = 0;');
      add('        rule' + n + ' = true;');
      add('      }');
      add('    }');
      add('    rule' + n + 'Prev[i] = rule' + n + 'Now[i];');
      add('  }');
    } else {
      // "and" is checked before "or": A and B or C means (A and B) or C
      const joinOf = c => c.join || (x.r.match === 'any' ? 'or' : 'and');
      const groups = [];
      x.conds.forEach((cp, k) => { if (!k || joinOf(cp.c) === 'or') groups.push([]); groups[groups.length - 1].push(cp); });
      const wrap = (list, sep, many) => many && list.length > 1 ? '(' + list.join(sep) + ')' : list.join(sep);
      if (x.r.match === 'some') {   // at least N of these: count how many are true right now
        const need = needOf(x.r, x.conds.length);
        add('  // When at least ' + need + ' of these are true: ' + x.conds.map(({ c }) => oneLine(condText(project, c))).join(', '));
        add('  byte rule' + n + 'Count = ' + x.conds.map(({ c, part }) => '(' + condExpr(ctx, c, part) + ')').join(' + ') + ';');
        add('  bool rule' + n + ' = rule' + n + 'Count >= ' + need + ';');
      } else {
        add('  // When ' + groups.map(g => wrap(g.map(({ c }) => oneLine(condText(project, c))), ' AND ', groups.length > 1)).join(' OR '));
        add('  bool rule' + n + ' = ' + groups.map(g => wrap(g.map(({ c, part }) => condExpr(ctx, c, part)), ' && ', groups.length > 1)).join(' || ') + ';');
      }
    }
    let fire = 'rule' + n + ' && !rule' + n + 'Was';
    if (x.repeat || x.loop) {
      add('  bool rule' + n + 'Go = rule' + n + ' && !rule' + n + 'Was;');
      add('  if (rule' + n + ' && due(rule' + n + 'AgainAt)) rule' + n + 'Go = true;   // ' + (x.loop ? 'start over while still true' : 'repeat while still true'));
      add('  if (!rule' + n + ') rule' + n + 'AgainAt = 0;');
      fire = 'rule' + n + 'Go';
    }
    add('  if (' + fire + (x.once ? ' && !rule' + n + 'Done' : '') + ') {');
    if (x.once) add('    rule' + n + 'Done = true;');
    const said = 'Rule ' + n + (oneLine(x.r.name) ? ' (' + oneLine(x.r.name) + ')' : '');   // how the log names this rule
    logLine(add, '    ', said + ' fired');
    if (SH) add('    ruleFired(' + n + ');');
    if (x.whileTrue) add('    rule' + n + 'On = true;');
    const emit = stage => { for (const { a, part } of stage.acts) emitAction(add, N, a, part); };
    const scheduleNext = k => {
      const nx = x.stages[k];
      if (nx) add('    rule' + n + 'Step' + (k + 1) + 'At = later(' + waitExpr(nx.ms, nx.msMax) + ');   // wait ' + waitText(nx.ms, nx.msMax) + ', then step ' + (k + 1));
    };
    emit(x.stages[0]);
    scheduleNext(1);
    if (x.repeat) add('    rule' + n + 'AgainAt = later(' + x.repeat + ');   // go again in ' + fmtSec(x.r.repeat) + ' if still true');
    // Looping: when the last step has run, start over (after any closing wait) if the conditions are still true
    const startOver = () => add('    rule' + n + 'AgainAt = later(' + x.loopGap + ');   // ' + (x.loopTail ? 'wait ' + x.loopTail + ', then ' : '') + 'start over if still true');
    if (x.loop && x.stages.length === 1) startOver();
    add('  }');
    if (x.whileTrue) {
      // No longer true: stop any steps still waiting, and put each output it changed back the other way
      add('  if (!rule' + n + ' && rule' + n + 'On) {   // only while true: undo it');
      add('    rule' + n + 'On = false;');
      logLine(add, '    ', said + ': no longer true, undoing it');
      for (let k = 2; k <= x.stages.length; k++) add('    rule' + n + 'Step' + k + 'At = 0;');
      if (x.repeat || x.loop) add('    rule' + n + 'AgainAt = 0;');
      const last = new Map();   // the last thing the rule did to each part decides how to undo it
      for (const st of x.stages) for (const { a, part } of st.acts) if (part.type !== '__sys') last.set(part.id, { a, part });
      for (const { a, part } of last.values()) undoAction(add, N, a, part);
      add('  }');
    }
    add('  rule' + n + 'Was = rule' + n + ';');
    for (let k = 2; k <= x.stages.length; k++) {
      add('  if (due(rule' + n + 'Step' + k + 'At)) {');
      logLine(add, '    ', said + ': step ' + k + ', after the wait');
      emit(x.stages[k - 1]);
      scheduleNext(k);
      if (x.loop && k === x.stages.length) startOver();
      add('  }');
    }
    add();
  });
  if (!project.rules.length) { add('  // No rules yet. Add one in the Build screen to make things happen.'); add(); }
  if (SH && SH.watches.length) {
    const nW = SH.watches.length;
    add('  // Report scene conditions to Escape Runner whenever they change');
    SH.watches.forEach((w, i) => add('  //   ' + i + ': ' + oneLine(w.scene.name || 'Scene') + ' · ' + oneLine(condText(project, w.c))));
    add('  bool watched[' + nW + '] = {' + SH.watches.map(w => condExpr(ctx, w.c, w.part)).join(', ') + '};');
    add('  static bool watchSent[' + nW + '];');
    add('  for (byte i = 0; i < ' + nW + '; i++) {');
    add('    if ((watchFresh || watched[i] != watchSent[i]) && mqtt.connected()) {');
    add('      if (mqtt.publish(WATCH_TOPICS[i], watched[i] ? "1" : "0", true)) watchSent[i] = watched[i];');
    add('    }');
    add('  }');
    add('  if (mqtt.connected()) watchFresh = false;');
    add();
  }
  const rep = SH ? SH.devices.filter(d => devHasState(d.kind)) : [];
  if (rep.length) {
    const expr = d => { const v = N[d.p.id].v; return d.kind === 'onoff' || d.kind === 'lock' ? v + '.on' : d.kind === 'level' ? '(long)(' + v + '.level + 0.5)' : d.kind === 'strip' ? '(' + v + '.n > 0)' : d.kind === 'angle' ? v + '.read()' : d.kind === 'value' || d.kind === 'flag' ? v : v + '.active'; };
    add('  // Device dashboard: send each part\'s state when it changes (fades and knobs at most ~6 times a second)');
    add('  {');
    add('    long devNow[' + rep.length + '] = {' + rep.map(expr).join(', ') + '};');
    add('    static long devSent[' + rep.length + '];');
    add('    static unsigned long devAt[' + rep.length + '];');
    add('    for (byte i = 0; i < ' + rep.length + ' && mqtt.connected(); i++) {');
    add('      if (!devFresh && (devNow[i] == devSent[i] || millis() - devAt[i] < 150)) continue;');
    add('      char val[12];');
    add('      snprintf(val, sizeof val, "%ld", devNow[i]);');
    add('      if (mqtt.publish(DEV_TOPICS[i], val, true)) { devSent[i] = devNow[i]; devAt[i] = millis(); }');
    add('    }');
    add('    if (mqtt.connected()) devFresh = false;');
    add('  }');
    add();
  }
  const bg = digOuts.concat(strips, dimmers, clocks, bridges);
  if (steppers.length) {
    add('  // Step the motors; power their coils down when they stop so they don\'t get hot');
    for (const p of steppers) add('  if (!' + N[p.id].v + '.run()) ' + N[p.id].v + '.disableOutputs();');
    if (!bg.length) add();
  }
  const gliders = servos.filter(glides);
  if (bg.length || gliders.length) {
    add('  // Keep timed effects (pulses, blinks, fades, strip effects, servo moves) running');
    for (const p of bg) add('  ' + N[p.id].v + '.update();');
    for (const p of gliders) add('  ' + N[p.id].v + 'Glide.update();');
  }
  add('}');
  return L.join('\n');
}

// Serial Monitor log lines in the generated code: if (LOG) { logTime(); ... }
const logLine = (add, I, text) => add(I + 'if (LOG) { logTime(); Serial.println(F(' + cstr(oneLine(text)) + ')); }');
const logVal = (add, I, text, expr) => add(I + 'if (LOG) { logTime(); Serial.print(F(' + cstr(oneLine(text)) + ')); Serial.println(' + expr + '); }');
// What an input reads as when it turns on / off
const INPUT_WORDS = { button: ['pressed', 'released'], switch: ['on', 'off'], magnet: ['senses a magnet', 'magnet gone'], motion: ['motion', 'no motion'], linkin: ['signal on', 'signal off'] };
// What an output reads as when its pin turns on / off
const OUTPUT_WORDS = { maglock: ['locked', 'unlocked'], linkout: ['signal on', 'signal off'] };
// "Only while true": the opposite of what an action did, so the output goes back when the rule stops being true
function undoAction(add, N, a, part) {
  const I = '    ', v = N[part.id].v, act = a.action;
  const say = text => logLine(add, I, '  -> ' + part.name + ': ' + text);
  switch (part.type) {
    case 'light': case 'relay': case 'buzzer': case 'linkout': {
      const on = act === 'off';
      const w = (OUTPUT_WORDS[part.type] || ['on', 'off'])[on ? 0 : 1];
      say(w); add(I + v + '.set(' + (on ? 'true' : 'false') + ');'); return;
    }
    case 'maglock': {
      const lock = act !== 'lock';
      say(lock ? 'lock again' : 'unlock'); add(I + v + '.set(' + (lock ? 'true);    // lock' : 'false);   // unlock')); return;
    }
    case 'flag': say(act === 'fclear' ? 'set again' : 'clear'); add(I + v + ' = ' + (act === 'fclear' ? 'true' : 'false') + ';'); return;
    case 'dimmer': if (act !== 'off') { say('turn off'); add(I + v + '.set(0);'); } return;
    case 'strip': if (act !== 'off') { say('turn off'); add(I + v + '.off();'); } return;
    case 'dfplayer': if (act === 'play' || act === 'loop') { say('stop'); add(I + v + '.stop();'); } return;
    case 'servo': {
      const start = Math.min(180, Math.max(0, int(optsOf(part).startAngle, 0)));
      say('back to ' + start + '\u00b0'); add(I + v + (glides(part) ? 'Glide.go(' + start + ', 0);' : '.write(' + start + ');')); return;
    }
  }
}
function emitAction(add, N, a, part) {
  const I = '    ';
  if (part.type === '__sys') {
    if (a.action === 'reset') { logLine(add, I, '  -> Reset the puzzle'); add(I + 'resetPuzzle();'); }
    else if (a.action === 'tell') add(I + 'sendEvent(' + cstr(a.value == null ? '' : a.value) + ');');
    else add(I + 'logTime(); Serial.println(F(' + cstr(a.value == null ? PARAM.message.def : a.value) + '));   // print message');
    return;
  }
  // Every action shows in the log before it happens
  logLine(add, I, '  -> ' + part.name + ': ' + actLabel(part, a));
  const v = N[part.id].v, act = a.action;
  switch (part.type) {
    case 'servo': {
      const deg = Math.min(180, Math.max(0, int(a.value, 90))), ms = glideMs(a);
      if (glides(part)) add(I + v + 'Glide.go(' + deg + ', ' + ms + ');' + (ms ? '   // over ' + fmtSec(a.value2) : ''));
      else add(I + v + '.write(' + deg + ');');
      return;
    }
    case 'dfplayer':
      if (act === 'stop') add(I + v + '.stop();');
      else if (act === 'volume') add(I + v + '.volume(' + Math.min(30, Math.max(0, int(a.value, 20))) + ');');
      else if (act === 'loop') {   // tracks are found by name in the mp3 folder; then repeat the one playing
        add(I + v + '.playMp3Folder(' + Math.max(1, int(a.value, 1)) + ');   // mp3/' + String(Math.max(1, int(a.value, 1))).padStart(4, '0') + '.mp3');
        add(I + 'delay(40);   // give the player a moment between commands');
        add(I + v + '.enableLoop();   // keep repeating it');
      } else {
        if (loopsUsed(part)) add(I + v + '.disableLoop();   // stop repeating anything that was looping');
        add(I + v + '.playMp3Folder(' + Math.max(1, int(a.value, 1)) + ');   // mp3/' + String(Math.max(1, int(a.value, 1))).padStart(4, '0') + '.mp3');
      }
      return;
    case 'maglock':
      if (act === 'lock') add(I + v + '.set(true);    // lock');
      else if (act === 'pulse') add(I + v + '.pulse(false, ' + msOf(a.value) + ');   // unlock for ' + fmtSec(a.value) + ', then lock again');
      else add(I + v + '.set(false);   // unlock');
      return;
    case 'strip': {
      if (act === 'off') { add(I + v + '.off();'); return; }
      const count = Math.max(1, int(optsOf(part).count, 30));
      add(I + v + '.clear();');
      for (const sg of sectionsOf(a, count)) {
        const from = Math.min(count, Math.max(1, int(sg.from, 1))), to = Math.min(count, Math.max(from, int(sg.to, count)));
        const { fx, ms, a: pa, b: pb, c: pc, f: pf, rev } = sectionParams(sg);
        let note = fx[1];
        if (fx[0] === 'fadein' || fx[0] === 'fadeout') note += ' over ' + fmtSec(ms / 1000);
        else if (fx[0] === 'gradient') note += ', ' + pc + ' up / ' + pf + ' full / ' + pa + ' down / ' + pb + ' gap' + (rev ? ', from the last LED' : '');
        else if (fx[0] === 'fadechase') note += ', ' + (pc ? pc + '-LED head / ' : '') + pf + ' full / ' + pa + '-LED tail / ' + pb + ' gap, speed ' + speedOf(sg) + (rev ? ', toward LED 1' : '');
        else if (fx[0] === 'chase') note += ', ' + pa + ' on / ' + pb + ' off, speed ' + speedOf(sg) + (rev ? ', toward LED 1' : '');
        else if (fx[0] === 'blink') note += ', on ' + fmtSec(pa / 1000) + ' / off ' + fmtSec(pb / 1000);
        else if (fx[0] === 'breathe' || fx[0] === 'rainbow') note += ', speed ' + speedOf(sg);
        if (int(sg.bri, 255) < 255) note += ', brightness ' + Math.max(0, int(sg.bri, 255));
        add(I + v + '.add(' + (from - 1) + ', ' + (to - 1) + ', ' + segColor(sg) + ', ' + fx[2] + ', ' + ms + (pa || pb || rev || pc || pf ? ', ' + pa + ', ' + pb : '') + (rev || pc || pf ? ', ' + (rev ? 'true' : 'false') : '') + (pc || pf ? ', ' + pc : '') + (pf ? ', ' + pf : '') + ');   // LEDs ' + from + '–' + to + ': ' + note);
      }
      add(I + v + '.play();');
      return;
    }
    case 'stepper': {
      if (act === 'stop') { add(I + v + '.stop();   // slow down and stop'); return; }
      const spr = Math.max(1, int(optsOf(part).stepsPerRev, 2048));
      const n = act === 'degrees' ? Math.round(num(a.value, 90) * spr / 360) : int(a.value, 512);
      add(I + v + '.enableOutputs();');
      add(I + v + '.move(' + n + ');   // ' + (act === 'degrees' ? num(a.value, 90) + '°' : n + ' steps') + (n < 0 ? ', backwards' : ''));
      return;
    }
    case 'hbridge': {
      if (act === 'stop') { add(I + v + '.stop();'); return; }
      if (act === 'brake') { add(I + v + '.brake();'); return; }
      const pct = Math.min(100, Math.max(0, int(a.value, 75))), secs = num(a.value2, 0);
      add(I + v + '.run(' + (act === 'back' ? -1 : 1) + ', ' + pct + ', ' + (secs > 0 ? Math.round(secs * 1000) : 0) + ');   // ' + (act === 'back' ? 'backward' : 'forward') + ' at ' + pct + '%' + (secs > 0 ? ' for ' + fmtSec(secs) : ''));
      return;
    }
    case 'clock':
      if (act === 'countdown') add(I + v + '.countdown(' + Math.max(1, Math.round(num(a.value, 60) * 60)) + 'L);   // ' + num(a.value, 60) + ' min');
      else if (act === 'countup') add(I + v + '.countup();');
      else if (act === 'pause') add(I + v + '.pause();');
      else if (act === 'resume') add(I + v + '.resume();');
      else if (act === 'addtime') add(I + v + '.addTime(' + int(a.value, 60) + ');');
      else if (act === 'number') {
        const val = Math.max(0, num(a.value, 0));
        const dec = optsOf(part).style === 'decimal' ? Math.min(3, (String(a.value).split('.')[1] || '').replace(/0+$/, '').length) : 0;
        const nInt = Math.min(9999, Math.round(val * Math.pow(10, dec)));
        const len = Math.min(4, Math.max(String(nInt).length, dec + 1));
        if (dec) add(I + v + '.number(' + nInt + ', 0x' + (0x80 >> (len - dec - 1)).toString(16).toUpperCase() + ', ' + len + ');   // ' + (nInt / Math.pow(10, dec)).toFixed(dec));
        else add(I + v + '.number(' + nInt + ', 0, ' + len + ');');
      }
      else if (act === 'word') add(I + v + '.word(' + cstr(String(a.value == null ? '' : a.value).slice(0, 4)) + ');');
      else add(I + v + '.clear();');
      return;
    case 'dimmer': {
      const pct = Math.min(100, Math.max(0, int(a.value, 100)));
      if (act === 'off') add(I + v + '.set(0);');
      else if (act === 'flick') add(I + v + '.flicker(' + flickMs(a.value) + ', ' + (a.varied === false ? 'false' : 'true') + ');   // speed ' + Math.min(10, Math.max(1, int(a.value, 5))) + ' of 10' + (a.varied === false ? ', on/off' : ', varied brightness'));
      else if (act === 'fade') { const sec = a.value2 != null && a.value2 !== '' ? a.value2 : (optsOf(part).fadeTime || 2); add(I + v + '.fadeTo(' + pct + ', ' + Math.max(0, Math.round(num(sec, 2) * 1000)) + ');   // over ' + fmtSec(sec)); }
      else add(I + v + '.set(' + pct + ');');
      return;
    }
    case 'screen': add(I + 'showText(' + v + ', ' + cstr(act === 'clear' ? '' : (a.value == null ? '' : a.value)) + ');'); return;
    case 'counter':
      add(I + v + (act === 'cset' ? ' = ' : act === 'csub' ? ' -= ' : ' += ') + int(a.value, act === 'cset' ? 0 : 1) + ';');
      logVal(add, I, '     ' + part.name + ' is now ', v);
      return;
    case 'flag': add(I + v + ' = ' + (act === 'fclear' ? 'false' : 'true') + ';'); return;
    case 'mqttout': add(I + 'sendMessage(' + cstr(optsOf(part).topic || '') + ', ' + cstr(a.value == null ? '' : a.value) + ');'); return;
  }
  if (act === 'on') add(I + v + '.set(true);');
  else if (act === 'off') add(I + v + '.set(false);');
  else if (act === 'blink') {
    const on = Math.max(10, Math.round(num(a.value2, 0.3) * 1000)), off = Math.max(10, Math.round(num(a.value3, 0.3) * 1000));
    add(I + v + '.blink(' + (a.forever ? 0 : Math.max(1, int(a.value, 3))) + ', ' + on + ', ' + off + ');   // ' + (a.forever ? 'forever, ' : '') + 'on ' + fmtSec(on / 1000) + ', off ' + fmtSec(off / 1000));
  }
  else if (act === 'flick') add(I + v + '.flicker(' + flickMs(a.value) + ');   // speed ' + Math.min(10, Math.max(1, int(a.value, 5))) + ' of 10');
  else if (act === 'pulse' || act === 'beep') add(I + v + '.pulse(true, ' + msOf(a.value) + ');   // ' + fmtSec(a.value));
}

// Parts that would misbehave if D13 blinks while an Arduino starts up
const STARTUP_SENSITIVE = ['light', 'relay', 'maglock', 'buzzer', 'linkout', 'hbridge', 'stepper', 'dimmer'];
function onStartupPin(project, p) {
  return BOARDS[project.board].family === 'avr' && STARTUP_SENSITIVE.includes(p.type) && fieldsOf(p).some(([f]) => p[f] === 'D13');
}
function checks(project) {
  const out = [];
  const B = BOARDS[project.board];
  // An MP3 player wired against the ESP32's printed RX2/TX2 labels works, but is easy to mix up
  if (B.family === 'esp32') for (const p of project.parts) if (p.type === 'dfplayer' && (p.pin === 'G16' || p.pin2 === 'G17'))
    out.push(p.name + ': most ESP32 boards print \u201cRX2\u201d on GPIO 16 and \u201cTX2\u201d on GPIO 17, but here they\u2019re used the other way round. It works if you wire exactly as shown (GPIO ' + (p.pin || '').slice(1) + ' to the player\u2019s RX pin), but it\u2019s easy to mix up. In Parts, swap them: player\u2019s RX on GPIO 17, player\u2019s TX on GPIO 16.');
  for (const p of project.parts) if (onStartupPin(project, p)) out.push(p.name + ' is on D13, which blinks a few times when the board powers up or resets, so it may briefly switch on. Move it to another pin.');
  const wifiParts = project.parts.filter(p => TYPES[p.type].esp32Only);
  if (wifiParts.length && B.family !== 'esp32') out.push('Wi-Fi messages need an ESP32. Switch the board to ESP32 to include ' + wifiParts.map(p => p.name).join(', ') + '.');
  else if (wifiParts.length) {
    const W = wifiOf(project);
    if (!W.ssid) out.push('Type your Wi-Fi name and password in the Wi-Fi card.');
    if (!W.server) out.push('Type the message server\u2019s address in the Wi-Fi card.');
    for (const p of wifiParts) if (!optsOf(p).topic) out.push(p.name + ' needs a topic, like room1/seance.');
  }
  for (const p of project.parts) if (!isWired(project, p) && !TYPES[p.type].esp32Only) out.push(p.name + (fieldsOf(p).length > 1 ? ' needs all its pins set' : ' has no pin') + ', so it is left out of the code.');
  const byPin = {};
  for (const a of assignments(project)) (byPin[a.pin] = byPin[a.pin] || []).push(a.part ? a.part.name + (a.role && fieldsOf(a.part).length > 1 ? ' ' + roleText(a.part, a.role) : '') : a.users.map(u => u.name).join(' / ') + ' (' + a.role + ')');
  for (const id in byPin) if (byPin[id].length > 1 && findPin(project.board, id)) out.push(byPin[id].join(' and ') + ' share ' + findPin(project.board, id).label + '. Give each its own pin.');
  const count = t => project.parts.filter(p => p.type === t).length;
  if (B.family === 'esp32' && count('dfplayer') > 2) out.push('An ESP32 can drive at most 2 MP3 players. Remove ' + (count('dfplayer') - 2) + '.');
  if (B.family === 'avr' && count('dfplayer') > 1) out.push('More than one MP3 player on an Arduino may miss replies at startup. An ESP32 handles two.');
  const oled = project.parts.filter(p => p.type === 'screen' && optsOf(p).model !== 'lcd').length, lcd = count('screen') - oled;
  if (oled > 1 || lcd > 1) out.push('Two screens of the same kind share one I2C address, so they would show the same thing. Use one OLED and one LCD, or change one screen\u2019s address.');
  if (B.family === 'avr' && count('servo')) for (const p of project.parts) if (p.type === 'dimmer' && ['D9', 'D10'].includes(p.pin) && project.board !== 'mega') out.push(p.name + ' is on ' + p.pin + ', but the Servo library stops fading on D9 and D10. Move it to D3, D5, D6 or D11.');
  const leds = project.parts.filter(p => p.type === 'strip').reduce((s, p) => s + Math.max(1, int(optsOf(p).count, 30)), 0);
  if (leds * 0.06 > 1) out.push('LED strips can draw up to ' + (Math.round(leds * 0.06 * 10) / 10) + ' A at full white. Power them from their own 5 V supply, not the board.');
  if (B.family === 'avr' && project.board !== 'mega' && leds > 300) out.push(leds + ' LEDs is a lot for an ' + B.short + '\u2019s memory (3 bytes each). Use a Mega or an ESP32.');
  project.rules.forEach((r, i) => {
    const { conds, acts } = validRuleParts(project, r);
    const nm = 'Rule ' + (i + 1) + (r.name ? ' (' + r.name + ')' : '');
    if (!conds.length) out.push(nm + ' needs a condition with a wired input.');
    else if (!acts.some(a => !isWait(a))) out.push(nm + ' needs an action besides waiting.');
    else if (r.loop && r.match !== 'order' && !acts.some(isWait)) out.push(nm + ' starts over with no wait, so it repeats twice a second. Add a wait if that\u2019s too fast.');
    for (const { a, part } of acts) if (part.type === 'strip' && a.action === 'scene') {
      const count = Math.max(1, int(optsOf(part).count, 30));
      if (sectionsOf(a, count).some(sg => int(sg.from, 1) > count)) out.push(nm + ': a section of ' + part.name + ' starts past LED ' + count + ', the end of the strip.');
    }
    for (const { c, part } of conds) {
      if (c.cond === 'tag' && !normTag(c.value)) out.push(nm + ': type the tag ID for ' + part.name + '. Hold the tag on the reader and copy the ID from the Serial Monitor.');
      if (c.cond === 'code' && !normCode(c.value)) out.push(nm + ': type the code for ' + part.name + ' (digits and A to D).');
    }
  });
  if (B.family === 'esp32') {
    if (project.parts.some(p => p.type === 'relay' || p.type === 'maglock')) out.push('ESP32 pins are 3.3 V. Use a relay module rated for 3.3 V input, or one with an optocoupler.');
  }
  return out;
}

function wiringFor(project, p) {
  const esp = BOARDS[project.board].family === 'esp32';
  const V = esp ? '3.3V' : '5V';
  const L = f => { const x = findPin(project.board, p[f || 'pin']); return x ? x.label : 'its pin'; };
  const pl = L('pin');
  const o = optsOf(p);
  const busList = b => BUSES[b][project.board].map(([id, r]) => r + ' to ' + findPin(project.board, id).label).join(', ');
  const steps = [], tips = [];
  switch (p.type) {
    case 'button': case 'switch': case 'magnet': {
      const pin = findPin(project.board, p.pin);
      steps.push('One terminal to ' + pl + '.', 'Other terminal to GND.');
      if (pin && pin.inputOnly) tips.push('This pin has no internal pull-up. Add a 10 kΩ resistor from ' + pl + ' to 3.3V.');
      else steps.push('No resistor needed: the code turns on the internal pull-up.');
      if (p.type === 'magnet') tips.push('Use a normally-open reed switch. Hide the magnet in the prop that players place.');
      break;
    }
    case 'motion':
      steps.push('PIR OUT to ' + pl + '.', 'PIR VCC to 5V, GND to GND.');
      tips.push('HC-SR501 sensors need about a minute to settle after power-on.');
      break;
    case 'analog':
      steps.push('Knob: outer legs to ' + V + ' and GND, middle leg to ' + pl + '.', 'Light sensor: LDR from ' + V + ' to ' + pl + ', 10 kΩ resistor from ' + pl + ' to GND.');
      tips.push('Readings run 0 to ' + BOARDS[project.board].adcMax + '. Open the Serial Monitor to find good thresholds.');
      break;
    case 'encoder':
      steps.push('CLK to ' + L('pin') + ', DT to ' + L('pin2') + '.', '+ to ' + V + ', GND to GND. (SW, the push button, can be wired as a separate Button part.)');
      tips.push('Turn it with the Serial Monitor open to watch the position. If it counts the wrong way, swap CLK and DT.');
      tips.push('If one click moves two steps, double the number of positions.');
      break;
    case 'keypad': {
      const fs = fieldsOf(p);
      steps.push('Keypad pins, left to right with the keys facing you: ' + fs.map(([f, role]) => role + ' to ' + L(f)).join(', ') + '.');
      steps.push('No resistors or power needed.');
      tips.push('Players press * to clear what they typed, and # to submit early. Codes check automatically once enough keys are typed.');
      tips.push('If keys come out wrong, the row and column wires are swapped: reverse the order.');
      break;
    }
    case 'rfid':
      steps.push('SDA to ' + L('pin') + ', RST to ' + L('pin2') + '.', busList('spi') + '.', '3.3V to 3.3V (never 5V), GND to GND.', 'IRQ: leave it unconnected.');
      tips.push('Several readers can share SCK, MISO and MOSI. Each needs its own SDA and RST pin.');
      tips.push('Hold each tag on the reader with the Serial Monitor open, then copy the ID into your rule.');
      break;
    case 'light':
      steps.push(pl + ' to a 220 Ω resistor, then to the LED\u2019s long leg.', 'LED short leg to GND.');
      tips.push('For lamps or LED strips, switch them through a relay or logic-level MOSFET.');
      break;
    case 'relay':
      steps.push('Relay module IN to ' + pl + '.', 'Module VCC to 5V, GND to GND.', 'Your device goes through COM and NO.');
      tips.push(o.activeLow ? 'Set for a relay module that switches on when its pin is LOW. If it does the opposite of what rules say, untick \u201cRelay switches on LOW\u201d.'
        : 'Set for a relay that switches on when its pin is HIGH. If it does the opposite (on when it should be off), tick \u201cRelay switches on LOW\u201d: many blue relay boards with a JD-VCC jumper work that way.');
      break;
    case 'maglock':
      steps.push('Relay module IN to ' + pl + '.', 'Module VCC to 5V, GND to GND.', '12 V supply + through relay COM and NO to the maglock; maglock − to supply −.', 'Put a flyback diode across the maglock (stripe toward +).');
      tips.push('Maglocks release when power is cut, so a power failure frees players.');
      tips.push(o.activeLow ? 'Set for a relay module that switches on when its pin is LOW. If the lock does the opposite, untick \u201cRelay switches on LOW\u201d.'
        : 'Set so the pin goes HIGH to lock. If the lock does the opposite, tick \u201cRelay switches on LOW\u201d.');
      break;
    case 'buzzer':
      steps.push('Active buzzer + to ' + pl + '.', 'Buzzer − to GND.');
      tips.push('Use an active buzzer (it beeps on its own when powered). Passive ones need a tone signal.');
      break;
    case 'dfplayer':
      { const printed = f => { const x = findPin(project.board, p[f]); return x && x.alias ? ' (the pin printed \u201c' + x.alias + '\u201d on most boards)' : ''; };
        steps.push('The pin marked RX on the MP3 player \u2192 ' + L('pin') + printed('pin') + ', with a 1 kΩ resistor in that wire.',
          'The pin marked TX on the MP3 player \u2192 ' + L('pin2') + printed('pin2') + ', straight (no resistor).',
          'The player\u2019s VCC \u2192 5V (VIN on an ESP32), not 3.3V. GND \u2192 GND.', 'Speaker (up to 3 W) \u2192 the player\u2019s SPK_1 and SPK_2 (not GND).'); }
      tips.push('SD card: FAT32, with a folder named mp3 holding 0001.mp3, 0002.mp3 … Track 1 is mp3/0001.mp3. Files are found by name, so the order you copy them doesn\u2019t matter. You can add words after the number, like 0001 thunder.mp3.');
      tips.push('For a big room, take DAC_R / DAC_L into an amplifier instead of using SPK pins.');
      break;
    case 'servo':
      steps.push('Signal (orange/yellow) to ' + pl + '.', 'Red to 5V, brown/black to GND.');
      tips.push('Bigger servos need their own 5 V supply. Connect its GND to the board\u2019s GND.');
      break;
    case 'strip': {
      const n = Math.max(1, int(o.count, 30)), amps = Math.round(n * 0.06 * 10) / 10;
      steps.push('DIN to ' + pl + ' through a 330 Ω resistor.', 'Strip 5V and GND to a 5 V supply rated for at least ' + Math.max(1, Math.ceil(amps * 1.2)) + ' A. Connect the supply\u2019s GND to the board\u2019s GND.', 'Put a 1000 µF capacitor across the strip\u2019s 5V and GND.');
      tips.push(n + ' LEDs can draw up to ' + amps + ' A at full white. Lower brightness draws much less.');
      if (esp) tips.push('ESP32 data is 3.3 V. Most strips accept it over short wires; for long runs add a 74AHCT125 level shifter.');
      if (n > 150) tips.push('Feed 5V and GND into both ends of long strips so the far end doesn\u2019t dim or turn orange.');
      break;
    }
    case 'dimmer':
      steps.push(pl + ' to the SIG pin of a MOSFET module (or a logic-level MOSFET gate through 220 Ω).', 'Light or motor + to its own supply +, − to the MOSFET module output.', 'Connect the supply\u2019s GND to the board\u2019s GND.');
      tips.push('Only for DC loads like LED lamps, LED strips (single colour) and DC motors. Never mains.');
      tips.push('For motors, put a flyback diode across the motor.');
      break;
    case 'hbridge':
      steps.push('L298N ENA to ' + L('pin') + ' (pull the ENA jumper off first), IN1 to ' + L('pin2') + ', IN2 to ' + L('pin3') + '.',
        'Motor to OUT1 and OUT2.', 'Motor supply (6–12 V) + to the 12V terminal, − to GND. Connect that GND to the board\u2019s GND too.');
      tips.push('If the motor turns the wrong way, swap its two wires on OUT1 and OUT2.');
      tips.push('The L298N loses about 2 V, so a 12 V supply gives the motor about 10 V. Below 40% speed many motors just hum.');
      if (esp) tips.push('The L298N reads the ESP32\u2019s 3.3 V signals fine.');
      break;
    case 'stepper':
      if (o.driver === 'a4988') {
        steps.push('Driver STEP to ' + L('pin') + ', DIR to ' + L('pin2') + '.', 'Driver VDD to ' + V + ', GND to GND. Join RST and SLP together.',
          'VMOT and GND to a 12 V supply, with a 100 µF capacitor across them.', 'Motor coils to 1A/1B and 2A/2B.');
        tips.push('Set the driver\u2019s current limit with its small screw before running the motor, or it will overheat.');
        tips.push('Never unplug the motor while the driver is powered.');
      } else {
        steps.push('Driver IN1 to ' + L('pin') + ', IN2 to ' + L('pin2') + ', IN3 to ' + L('pin3') + ', IN4 to ' + L('pin4') + '.', 'Driver + to 5V (a separate 5 V supply is best), − to GND.', 'Plug the 28BYJ-48 motor into the driver\u2019s white socket.');
        tips.push('The 28BYJ-48 is slow (about 15 RPM at most) but strong for its size. Its 2048 steps make one full turn.');
      }
      tips.push('A stepper doesn\u2019t know where it is when powered on. Position your prop by hand before starting, or add a limit switch as a Button part.');
      break;
    case 'clock':
      steps.push('CLK to ' + L('pin') + ', DIO to ' + L('pin2') + '.', 'VCC to 5V (3.3V also works), GND to GND.');
      tips.push(o.style === 'decimal' ? 'Set for a TM1637 display with decimal points: times show as MM.SS and numbers can have decimals.' : 'Set for a TM1637 display with a colon: times show as MM:SS.');
      break;
    case 'linkin':
      steps.push('The other board\u2019s Signal out pin to ' + pl + '.', 'Connect GND on both boards together. This is required.');
      if (esp) tips.push('If the other board is a 5 V Arduino, put a divider in the wire: 1 kΩ from its pin to ' + pl + ', then 2 kΩ from ' + pl + ' to GND.');
      tips.push('The other board should keep this wire LOW (off) unless it is sending.');
      break;
    case 'mqttin': case 'mqttout': {
      const W = wifiOf(project), t = optsOf(p).topic || 'room1/prop';
      steps.push('No wires: this uses Wi-Fi. Set the network and the message server\u2019s address in the Wi-Fi card.',
        'Pick a computer to be the message server (a Raspberry Pi, Mac or PC). Escape Runner has one built in; otherwise install Mosquitto (on a Pi or Linux: sudo apt install mosquitto mosquitto-clients)',
        'Let the props reach it: create /etc/mosquitto/conf.d/room.conf containing the two lines "listener 1883" and "allow_anonymous true", then run sudo systemctl restart mosquitto');
      if (p.type === 'mqttout') steps.push('Watch messages arrive on that computer: mosquitto_sub -h localhost -t "' + t.split('/')[0] + '/#" -v');
      else steps.push('Send this prop a message from that computer: mosquitto_pub -h localhost -t "' + t + '" -m "reset"');
      tips.push('Give that computer a fixed address (a DHCP reservation on your router), so props always find it at ' + (W.server || 'the same address') + '.');
      tips.push('ESP32s only join 2.4 GHz Wi-Fi, not 5 GHz.');
      break;
    }
    case 'linkout':
      steps.push(pl + ' to the other board\u2019s Signal in pin.', 'Connect GND on both boards together. This is required.');
      if (!esp) tips.push('If the other board is an ESP32, put a divider in the wire: 1 kΩ from ' + pl + ' to its pin, then 2 kΩ from its pin to GND.');
      break;
    case 'screen':
      steps.push(busList('i2c') + '.', 'VCC to ' + (optsOf(p).model === 'lcd' ? '5V' : '3.3V or 5V') + ', GND to GND.');
      tips.push(optsOf(p).model === 'lcd' ? 'Turn the blue contrast screw on the back if the text is invisible.' : 'Use a 128×64 SSD1306 OLED with 4 pins (GND, VCC, SCL, SDA).');
      break;
  }
  return { steps, tips };
}


// ───────────────────────── Shows ─────────────────────────
function boardOfPartIn(P, id) { for (const b of P.boards) if (b.parts.some(x => x.id === id)) return b; return null; }
function actLabel(part, a) {
  const name = ((TYPES[part.type].acts || []).find(x => x[0] === a.action) || ['', a.action])[1];
  const P = PARAM[a.action];
  let v = '';
  if (a.action === 'blink' && a.forever) return name + ' forever';
  if (a.action === 'flick') return name + ' at speed ' + Math.min(10, Math.max(1, int(a.value, 5))) + (part.type === 'dimmer' ? (a.varied === false ? ', on/off' : ', varied brightness') : '');
  if (part.type === 'strip' && a.action === 'scene') v = ' (' + (a.segs || []).length + ' section' + ((a.segs || []).length === 1 ? '' : 's') + ')';
  else if (P && P.text) v = ' "' + (a.value || '') + '"';
  else if (P && !P.color && a.value != null && a.value !== '') v = ' ' + a.value + (P.unit && P.unit.length < 6 ? ' ' + P.unit : '');
  if (a.action === 'angle' && glideMs(a) > 0) v += ' over ' + fmtSec(a.value2);
  return name + v;
}
// Everything Escape Runner needs: boards, the conditions boards report, and each scene's steps
function compileShow(P) {
  const watches = [], scenes = [];
  for (const s of P.scenes || []) {
    const when = [];
    s.when.forEach((c, k) => {
      const join = k && c.join === 'or' ? 'or' : 'and';
      if (isStartPart(c.part)) {
        when.push({ join, kind: 'start', label: 'Game starts' });
        return;
      }
      if (isBtnPart(c.part)) {
        const name = String(c.value || '').trim() || 'Go';
        when.push({ join, kind: 'button', id: c.id, name, label: 'Game master presses "' + name + '"' });
        return;
      }
      if (isHkPart(c.part)) {
        const sw = (P.homekit || []).find(x => x.id === c.part.slice(5));
        if (sw) when.push({ join, kind: 'homekit', switch: sw.id, state: c.cond !== 'off', label: 'HomeKit "' + sw.name + '" ' + (c.cond === 'off' ? 'turns off' : 'turns on') });
        return;
      }
      if (isEvPart(c.part)) {
        const b = P.boards.find(x => x.id === c.part.slice(5));
        if (b && c.value) when.push({ join, kind: 'event', board: slug(b.name), event: String(c.value), label: b.name + ' reports "' + c.value + '"' });
        return;
      }
      const b = boardOfPartIn(P, c.part);
      if (!b || !c.id) return;
      const label = b.name + ' · ' + condText(b, c);
      watches.push({ id: c.id, board: slug(b.name), label });
      when.push({ join, kind: 'watch', id: c.id, label });
    });
    const steps = [];
    for (const a of s.then) {
      if (isHkPart(a.part)) {
        const sw = (P.homekit || []).find(x => x.id === a.part.slice(5));
        if (sw) steps.push({ kind: 'homekit', switch: sw.id, op: a.action === 'hkon' ? 'on' : a.action === 'hkoff' ? 'off' : 'pulse', label: 'HomeKit "' + sw.name + '": ' + (HK_ACTS.find(x => x[0] === a.action) || HK_ACTS[2])[1] });
        continue;
      }
      if (isSpkPart(a.part)) {
        const sp = speakerOf(P, a.part);
        if (!sp) continue;
        const file = mediaFile(a), who = sp.name || sp.id, fade = msOrZero(a.fade);
        if (a.action === 'sndplay') {
          const files = mediaFiles(a);
          if (!files.length) continue;
          const loop = !!a.loop, wait = !loop && !!a.wait, vol = pct(a.vol, 100);
          const lit = [];
          for (const id of activeLights(a)) { const lb = boardOfPartIn(P, id), lp = lb && lb.parts.find(x => x.id === id); if (canFlash(lp)) lit.push({ b: lb, p: lp }); }
          const extra = [vol < 100 ? vol + '%' : '', loop ? 'loop' : '', fade ? 'fade in ' + fmtSec(a.fade) : '', wait ? 'wait for it to end' : '', lit.length ? 'lightning on ' + lit.map(x => x.b.name + ' \u00b7 ' + x.p.name).join(', ') : ''].filter(Boolean);
          const st = { kind: 'sound', file: files[0], output: sp.id, volume: vol, loop, fadeInMs: fade, wait,
            label: who + ' \u00b7 Play ' + (files.length > 1 ? 'one of ' + files.join(', ') : files[0]) + (extra.length ? ' (' + extra.join(', ') + ')' : '') };
          if (files.length > 1) st.files = files;
          // One flash map per board; each board flashes its ticked lights
          if (lit.length) st.lightning = [...new Set(lit.map(x => x.b))].map(b => ({ board: slug(b.name), cmd: a.id, label: lit.filter(x => x.b === b).map(x => b.name + ' \u00b7 ' + x.p.name).join(', '), levels: true }));
          steps.push(st);
        } else if (a.action === 'sndstop') {
          const st = { kind: 'stopSound', output: sp.id, fadeOutMs: fade, label: who + ' \u00b7 Stop ' + (file || 'every sound') + (fade ? ' (fade out ' + fmtSec(a.fade) + ')' : '') };
          if (file) st.file = file;
          steps.push(st);
        } else steps.push({ kind: 'stopSound', fadeOutMs: fade, label: 'Stop every sound on every speaker' + (fade ? ' (fade out ' + fmtSec(a.fade) + ')' : '') });
        continue;
      }
      if (isPhonePart(a.part)) {
        const ph = phoneOf(P, a.part), file = mediaFile(a);
        if (!ph || !file) continue;
        const ring = Math.max(5, Math.round(num(a.ring, 30))), wait = !!a.wait;
        steps.push({ kind: 'call', phone: ph.id, file, ringSeconds: ring, wait,
          label: (ph.name || 'Phone') + ' \u00b7 Call and play ' + file + ' (rings up to ' + ring + ' s' + (wait ? ', wait for the call to end' : '') + ')' });
        continue;
      }
      if (isTvPart(a.part)) {
        const file = mediaFile(a);
        if (a.action === 'vidplay') {
          if (!file) continue;
          const loop = !!a.loop, wait = !loop && !!a.wait, vol = pct(a.vol, 100);
          const extra = [vol < 100 ? vol + '%' : '', loop ? 'loop' : '', wait ? 'wait for it to end' : ''].filter(Boolean);
          steps.push({ kind: 'video', file, volume: vol, loop, wait, label: 'TV \u00b7 Show ' + file + (extra.length ? ' (' + extra.join(', ') + ')' : '') });
        } else steps.push({ kind: 'stopVideo', label: 'TV \u00b7 Stop the video' });
        continue;
      }
      if (a.part === '__sys') {
        if (a.action === 'wait') {
          const to = num(a.value2, 0) > num(a.value, 1) ? num(a.value2, 0) : 0;
          steps.push(to ? { kind: 'wait', ms: msOf(a.value), msMax: msOf(to), label: 'Wait ' + fmtSec(a.value).replace(' s', '') + '\u2013' + fmtSec(to) + ' (random)' } : { kind: 'wait', ms: msOf(a.value), label: 'Wait ' + fmtSec(a.value) });
        }
        else if (a.action === 'note') steps.push({ kind: 'note', text: String(a.value || ''), label: 'Game master: ' + (a.value || '') });
        else if (a.action === 'timerstart') steps.push({ kind: 'timer', op: 'start', label: 'Start the game timer' });
        else if (a.action === 'timerpause') steps.push({ kind: 'timer', op: 'pause', label: 'Pause the game timer' });
        else if (a.action === 'tadd') steps.push({ kind: 'timer', op: 'add', s: int(a.value, 60), label: (int(a.value, 60) < 0 ? 'Take away ' : 'Add ') + Math.abs(int(a.value, 60)) + ' s' });
        else if (a.action === 'endgame') steps.push({ kind: 'end', label: 'End the game' });
        continue;
      }
      const b = boardOfPartIn(P, a.part);
      if (!b || !a.id) continue;
      const part = b.parts.find(x => x.id === a.part);
      steps.push({ kind: 'cmd', id: a.id, board: slug(b.name), label: b.name + ' · ' + part.name + ': ' + actLabel(part, a) });
    }
    scenes.push({ id: s.id, name: s.name || 'Untitled scene', once: !!s.once, repeat: !!s.loop, ambient: !!s.ambient, when, steps });
  }
  return { format: 'escape-runner-show', version: 2, name: P.name || 'Untitled show', timerMinutes: Math.max(1, num(P.timer, 60)),
    boards: P.boards.map(b => ({ id: b.id, slug: slug(b.name), name: b.name, rules: ruleSummaries(b) })), homekit: (P.homekit || []).map(x => ({ id: x.id, name: x.name || 'Switch', resetOn: !!x.resetOn })),
    speakers: (P.speakers || []).map(x => ({ id: x.id, name: x.name || x.id })),
    phones: phonesOf(P).map(x => ({ id: x.id, name: x.name || 'Phone', address: String(x.address || '').trim(), port: Math.round(num(x.port, 5060)) || 5060 })),
    devices: P.boards.flatMap(b => devicesOf(b).map(d => ({ board: slug(b.name), key: d.key, name: d.p.name, kind: d.kind,
      type: d.p.type === 'dimmer' && optsOf(d.p).motor ? 'DC motor' : TYPES[d.p.type].label, max: d.kind === 'value' ? BOARDS[b.board].adcMax : undefined }))),
    watches, scenes, builtAt: new Date().toISOString() };
}
function showChecks(P) {
  const out = [];
  const W = wifiOf(P);
  if (!W.ssid) out.push('Show: type the Wi-Fi name and password in the Show Wi-Fi card.');
  if (!W.server) out.push('Show: type Escape Runner’s address in the Show Wi-Fi card.');
  const names = (P.homekit || []).map(x => (x.name || '').trim().toLowerCase());
  if (names.some(n => !n)) out.push('Show: give every HomeKit switch a name.');
  if (new Set(names).size < names.length) out.push('Show: two HomeKit switches have the same name.');
  const spk = (P.speakers || []).map(x => (x.name || '').trim().toLowerCase());
  if (spk.some(n => !n)) out.push('Show: give every speaker a name.');
  if (new Set(spk).size < spk.length) out.push('Show: two speakers have the same name.');
  for (const ph of phonesOf(P)) if (!String(ph.address || '').trim()) out.push('Show: ' + (ph.name || 'a phone') + ' needs its address (the phone\u2019s IP address).');
  const slugs = {};
  for (const b of P.boards) (slugs[slug(b.name)] = slugs[slug(b.name)] || []).push(b.name);
  for (const k in slugs) if (slugs[k].length > 1) out.push('Boards ' + slugs[k].join(' and ') + ' need different names.');
  let storyNo = 0, ambientNo = 0;   // numbered the way the Scenes card shows them
  (P.scenes || []).forEach((s, i) => {
    const nm = (s.ambient ? 'Ambient ' + (++ambientNo) : 'Scene ' + (++storyNo)) + (s.name ? ' (' + s.name + ')' : '');
    if (!s.then.length) out.push(nm + ' has no steps.');
    const hkGone = id => isHkPart(id) && !(P.homekit || []).some(x => x.id === id.slice(5));
    for (const c of s.when) if (hkGone(c.part) || (!isPseudo(c.part) && !boardOfPartIn(P, c.part))) out.push(nm + ' uses a part or switch that was removed.');
    if (s.then.some(a => isPhonePart(a.part) && phoneOf(P, a.part) && !mediaFile(a))) out.push(nm + ' has a phone call with no message file, so it is left out.');
    for (const a of s.then) if (hkGone(a.part) || (isSpkPart(a.part) && !speakerOf(P, a.part)) || (isPhonePart(a.part) && !phoneOf(P, a.part)) || (a.part !== '__sys' && !isPseudo(a.part) && !boardOfPartIn(P, a.part))) out.push(nm + ' controls a part, switch or speaker that was removed.');
    if (s.then.some(a => (a.action === 'sndplay' || a.action === 'vidplay') && (isSpkPart(a.part) || isTvPart(a.part)) && !mediaFile(a))) out.push(nm + ' has a sound or video step with no file name, so it is left out.');
    if (s.then.some(a => activeLights(a).some(id => !canFlash((boardOfPartIn(P, id) || { parts: [] }).parts.find(x => x.id === id))))) out.push(nm + ' has lightning on a light that was removed (or is now a motor).');
    if (s.then.some(a => isSpkPart(a.part) && a.action === 'sndplay' && lightOnOf(a) && !lightIdsOf(a).length)) out.push(nm + ' has Lightning on with no light ticked.');
    if (s.loop && !s.then.some(a => (a.part === '__sys' && a.action === 'wait') || ((isSpkPart(a.part) || isTvPart(a.part)) && a.wait && !a.loop))) out.push(nm + ' repeats with no wait, so it would start over about once a second. Add a wait.');
  });
  return out;
}
