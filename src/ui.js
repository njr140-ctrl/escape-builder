// ───────────────────────── Icons ─────────────────────────
const ICONS = {
  button: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="12" r="4"/>',
  switch: '<rect x="2.5" y="7.5" width="19" height="9" rx="4.5"/><circle cx="16.5" cy="12" r="2.6"/>',
  magnet: '<path d="M5 4h4v8a3 3 0 0 0 6 0V4h4v8a7 7 0 0 1-14 0z"/><path d="M5 8h4M15 8h4"/>',
  motion: '<circle cx="12" cy="12" r="2"/><path d="M8 8a5.5 5.5 0 0 0 0 8M16 8a5.5 5.5 0 0 1 0 8M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14"/>',
  analog: '<circle cx="12" cy="13" r="7"/><path d="M12 13l3.5-3.5"/><path d="M12 3v2M4.5 6.5l1.4 1.4M19.5 6.5l-1.4 1.4"/>',
  encoder: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 4v3M20 12h-3M12 20v-3M4 12h3"/>',
  keypad: '<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 7.5h.01M12 7.5h.01M16 7.5h.01M8 11.5h.01M12 11.5h.01M16 11.5h.01M8 15.5h.01M12 15.5h.01M16 15.5h.01" stroke-width="2.6"/>',
  rfid: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M7 10h5M7 13.5h3"/><path d="M18.5 9a4.5 4.5 0 0 1 0 6M20.5 7a7.5 7.5 0 0 1 0 10"/>',
  light: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
  relay: '<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>',
  maglock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><path d="M12 14.5v2.5"/>',
  buzzer: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  dfplayer: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  hbridge: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4"/>',
  stepper: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4"/>',
  servo: '<rect x="3" y="10" width="12" height="9" rx="1.5"/><circle cx="9" cy="14.5" r="1.6"/><path d="M9 13V6.5h11"/><circle cx="20" cy="6.5" r="1.2"/>',
  strip: '<rect x="2.5" y="9" width="19" height="6" rx="1.5"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" stroke-width="2.6"/>',
  dimmer: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  screen: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M7 9.5h6M7 12.5h9M9 20h6"/>',
  clock: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 9.5v5M9 9.5v5M15 9.5v5M18 9.5v5M12 10.5h.01M12 13.5h.01" stroke-width="1.8"/>',
  mqttin: '<path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/>',
  mqttout: '<path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/>',
  linkin: '<rect x="13" y="5" width="8" height="14" rx="1.5"/><path d="M3 12h7M7 9l3 3-3 3"/>',
  linkout: '<rect x="3" y="5" width="8" height="14" rx="1.5"/><path d="M14 12h7M18 9l3 3-3 3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01" stroke-width="2.2"/>',
  counter: '<path d="M5 9h14M5 15h14M10 4l-2 16M16 4l-2 16"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  grip: '<path d="M5 8h14M5 12h14M5 16h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  warn: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4.5M12 17.5v.5"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  chev: '<path d="M6 9.5l6 6 6-6"/>',
};
const icon = (k, sw = 1.7) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[k] + '</svg>';
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const uid = () => Math.random().toString(36).slice(2, 9);
const KIND_WORD = { in: 'input', out: 'output', logic: 'logic' };

// ───────────────────────── State ─────────────────────────
const KEY = 'arduino-sketch-v1';
function sampleProject() {
  const P = { id: uid(), name: 'Séance Table', board: 'esp32', parts: [], rules: [] };
  const mk = (type, name, pin, opts) => { const p = { id: uid(), type, name, pin, opts: { ...defaultOpts(type), ...(opts || {}) } }; P.parts.push(p); return p; };
  const c1 = mk('magnet', 'Candle 1', 'G13'), c2 = mk('magnet', 'Candle 2', 'G14'), c3 = mk('magnet', 'Candle 3', 'G27');
  const bell = mk('button', 'Spirit bell', 'G26');
  const gm = mk('button', 'GM reset', 'G25');
  const glow = mk('light', 'Candle glow', 'G23');
  const door = mk('maglock', 'Cellar door', 'G22');
  const fog = mk('relay', 'Fog machine', 'G21');
  const chime = mk('buzzer', 'Chime', 'G19');
  const eyes = mk('servo', 'Portrait eyes', 'G18', { startAngle: 0 });
  const voice = mk('dfplayer', 'Ghost voice', 'G17'); voice.pin2 = 'G16';
  P.rules.push({ id: uid(), name: 'All three candles placed', once: true,
    when: [{ part: c1.id, cond: 'active' }, { part: c2.id, cond: 'active' }, { part: c3.id, cond: 'active' }],
    then: [{ part: glow.id, action: 'blink', value: 3 }, { part: chime.id, action: 'beep', value: 0.5 }, { part: door.id, action: 'unlock' }, { part: voice.id, action: 'play', value: 2 }, { part: '__sys', action: 'message', value: 'Seance solved: cellar open' }] });
  P.rules.push({ id: uid(), name: 'Bell rung', once: false,
    when: [{ part: bell.id, cond: 'active' }],
    then: [{ part: eyes.id, action: 'angle', value: 90 }, { part: fog.id, action: 'pulse', value: 4 }, { part: voice.id, action: 'play', value: 1 }] });
  P.rules.push({ id: uid(), name: 'Game master reset', once: false,
    when: [{ part: gm.id, cond: 'active' }],
    then: [{ part: '__sys', action: 'reset' }] });
  return P;
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
const blankProject = board => ({ id: uid(), name: 'Untitled sketch', board: board || 'esp32', parts: [], rules: [], updatedAt: 0 });
if (!S || !Array.isArray(S.projects) || !S.projects.length) { const p = blankProject(); S = { current: p.id, projects: [p] }; }
let ui = { tab: 'code', view: 'build', confirmDelete: false };
function setView(v) {
  ui.view = v === 'code' ? 'code' : 'build';
  const code = ui.view === 'code';
  $('app').dataset.view = ui.view;
  $('editor').hidden = code;
  $('board').hidden = !code;
  $('view-build').setAttribute('aria-pressed', !code);
  $('view-code').setAttribute('aria-pressed', code);
  try { history.replaceState(null, '', '#' + ui.view); } catch (e) {}
  window.scrollTo(0, 0);
}
// A project is either one sketch, or a show: several ESP32 boards plus scenes that Escape Runner plays across them
const newBoard = name => ({ id: uid(), name, board: 'esp32', parts: [], rules: [] });
const blankShow = () => { const b = newBoard('Board 1'); return { id: uid(), mode: 'show', name: 'Untitled show', timer: 60, boards: [b], active: b.id, scenes: [], homekit: [], speakers: [], wifi: {}, updatedAt: 0 }; };
const proj = () => S.projects.find(p => p.id === S.current) || S.projects[0];
const isShow = () => proj().mode === 'show';
// The sketch being edited: the project itself, or the selected board of a show
const cur = () => { const P = proj(); return P.mode === 'show' ? (P.boards.find(b => b.id === P.active) || P.boards[0]) : P; };
// Scenes edit like rules, over every board's parts at once
function sceneOwner() {
  const P = proj(), parts = [];
  for (const b of P.boards) for (const x of b.parts) parts.push(x);
  return { id: P.id, name: P.name, board: 'esp32', parts, rules: P.scenes, isScenes: true };
}
function ownerOf(rid) {
  if (isShow() && proj().scenes.some(r => r.id === rid)) return sceneOwner();
  return cur();
}

// ───────────────────────── Undo / redo ─────────────────────────
let hist = {};
const snap = p => JSON.stringify({ ...p, updatedAt: 0 });
function histFor(p) { return hist[p.id] || (hist[p.id] = { undo: [], redo: [], last: snap(p), key: '', at: 0 }); }
function record(p, key) {
  const h = histFor(p), s = snap(p);
  if (s === h.last) return;
  // Typing in the same field within a moment counts as one step
  const merge = key && key === h.key && Date.now() - h.at < 1500;
  if (!merge) { h.undo.push(h.last); if (h.undo.length > 100) h.undo.shift(); }
  h.redo = []; h.last = s; h.key = key || ''; h.at = Date.now();
}
function undoRedo(dir) {
  const p = proj(), h = histFor(p);
  const from = dir < 0 ? h.undo : h.redo, to = dir < 0 ? h.redo : h.undo;
  if (!from.length) return;
  to.push(h.last);
  const s = from.pop();
  const np = JSON.parse(s);
  np.updatedAt = Date.now();
  S.projects[S.projects.indexOf(p)] = np;
  h.last = s; h.key = '';
  queueCloud(np.id);
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  renderAll();
  toast(dir < 0 ? 'Undone' : 'Redone');
}

// Every change is kept in this browser right away, and in the viewer's account when it is available.
function save(touched, key) {
  if (touched !== false) { const p = proj(); record(p, key); p.updatedAt = Date.now(); queueCloud(p.id); }
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
}

// ───────────────────────── Saved configs (account) ─────────────────────────
const cloud = { col: null, status: 'local', dirty: new Set(), timer: 0, busy: false };
function setSync(status) { cloud.status = status; const el = $('sync'); if (el) syncChip(el); }
function syncChip(el) {
  const t = { local: 'Saved in this browser', saving: 'Saving…', saved: 'Saved to your account', error: 'Couldn’t save online. Kept in this browser.' }[cloud.status];
  el.className = 'sync ' + cloud.status; el.textContent = t;
}
function queueCloud(id) {
  if (!cloud.col) return;
  cloud.dirty.add(id); setSync('saving');
  clearTimeout(cloud.timer); cloud.timer = setTimeout(flushCloud, 1000);
}
async function flushCloud() {
  if (!cloud.col || cloud.busy) return;
  cloud.busy = true;
  try {
    while (cloud.dirty.size) {
      const id = cloud.dirty.values().next().value; cloud.dirty.delete(id);
      const p = S.projects.find(x => x.id === id);
      if (p) await cloud.col.doc(id).set(JSON.parse(JSON.stringify(p)));
      else await cloud.col.doc(id).delete();
    }
    setSync('saved');
  } catch (e) {
    // View-only visitors can't write to an account: keep their work in this browser without alarm.
    if (e && e.code === 'invalid_argument') { cloud.col = null; cloud.dirty.clear(); setSync('local'); }
    else setSync('error');
  }
  cloud.busy = false;
  if (cloud.dirty.size) flushCloud();
}
async function initCloud() {
  try {
    if (!window.claude || !window.claude.use) return;
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if (!db || !user) return;
    const id = await user.id();
    if (!id) return;
    const col = db.collection('data/users/' + id);
    const snapshot = await col.get();
    const remote = snapshot.docs.map(d => d.data()).filter(x => x && typeof x.id === 'string' &&
      (x.mode === 'show' ? Array.isArray(x.boards) && x.boards.length && Array.isArray(x.scenes) : Array.isArray(x.parts) && Array.isArray(x.rules) && BOARDS[x.board]));
    const isBlank = p => !p.updatedAt && (p.mode === 'show' ? !p.scenes.length && !p.boards.some(b => b.parts.length) : !p.parts.length && !p.rules.length);
    const byId = new Map(S.projects.filter(p => !(remote.length && isBlank(p))).map(p => [p.id, p]));
    const push = [];
    for (const p of byId.values()) { const r = remote.find(x => x.id === p.id); if (!r || (p.updatedAt || 0) > (r.updatedAt || 0)) push.push(p.id); }
    for (const r of remote) { const l = byId.get(r.id); if (!l || (r.updatedAt || 0) > (l.updatedAt || 0)) byId.set(r.id, JSON.parse(JSON.stringify(r))); }
    if (!byId.size) { const p = blankProject(); byId.set(p.id, p); }
    S.projects = [...byId.values()];
    if (!S.projects.some(p => p.id === S.current)) S.current = S.projects[0].id;
    cloud.col = col;
    hist = {};
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    renderAll();
    push.filter(pid => !isBlank(S.projects.find(p => p.id === pid))).forEach(pid => cloud.dirty.add(pid));
    if (cloud.dirty.size) { setSync('saving'); flushCloud(); } else setSync('saved');
  } catch (e) { cloud.col = null; setSync('local'); }
}

// ───────────────────────── Export / import ─────────────────────────
function fileSafe(name) { return (name || 'sketch').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'sketch'; }
// On its own website (not inside Claude) the browser can download files directly
const onWebsite = !window.claude;
function browserDownload(filename, data) {
  const url = URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }));
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
async function saveFile(filename, data, okMsg) {
  if (onWebsite) { browserDownload(filename, data); toast(okMsg); return; }
  let dl = null;
  try { dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null; } catch (e) {}
  if (dl) {
    try { await dl.save({ filename, data }); toast(okMsg); return; }
    catch (e) { if (e && e.code === 'declined') return; }
  }
  try { await navigator.clipboard.writeText(data); toast('Copied. Paste it into a file named ' + filename + '.'); }
  catch (e) { toast('Saving files isn\u2019t available here'); }
}
// The file Escape Runner loads: boards, what they report, and every scene's steps
function exportRunner() {
  const P = proj(), problems = showChecks(P);
  saveFile(fileSafe(P.name) + '.show.json', JSON.stringify(compileShow(P), null, 2), problems.length ? 'Show file saved. Check the warnings on the Code screen.' : 'Show file saved. Upload it on Escape Runner\u2019s website.');
}
async function exportProject() {
  const p = proj();
  const json = JSON.stringify({ app: 'escape-builder', version: 3, project: p }, null, 2);
  saveFile(fileSafe(p.name) + '.json', json, 'Project saved. Open it again with Open project.');
}
const PIN_KEYS = ['pin', 'pin2', 'pin3', 'pin4', 'pin5', 'pin6', 'pin7', 'pin8'];
function importFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const p = data && data.project ? data.project : data;
      if (data && data.format === 'escape-runner-show') { toast('That\u2019s a show file for Escape Runner. Open the show\u2019s Escape Builder project file instead.'); return; }
      const cleanRules = list => (list || []).filter(r => r && Array.isArray(r.when) && Array.isArray(r.then)).map(r => ({ id: String(r.id || uid()), name: String(r.name || ''), once: !!r.once, loop: !!r.loop, ambient: !!r.ambient,
        match: ['any', 'order', 'some'].includes(r.match) ? r.match : 'all', need: num(r.need, 2), whileTrue: !!r.whileTrue, repeat: num(r.repeat, 0) || '', timeout: num(r.timeout, 0) || '', when: r.when, then: r.then }));
      const cleanSketch = (x, fallback) => {
        if (!x || !Array.isArray(x.parts) || !Array.isArray(x.rules)) throw new Error('shape');
        return { id: String(x.id || uid()), name: String(x.name || fallback), board: BOARDS[x.board] ? x.board : 'esp32',
          parts: x.parts.filter(q => q && TYPES[q.type]).map(q => {
            const part = { id: String(q.id || uid()), type: q.type, name: String(q.name || TYPES[q.type].label), opts: { ...defaultOpts(q.type), ...(q.opts || {}) } };
            for (const k of PIN_KEYS) part[k] = q[k] ? String(q[k]) : '';
            return part;
          }),
          rules: cleanRules(x.rules) };
      };
      let np;
      if (p && p.mode === 'show') {
        const boards = (p.boards || []).map((b, i) => ({ ...cleanSketch(b, 'Board ' + (i + 1)), board: 'esp32' }));
        if (!boards.length) throw new Error('shape');
        np = { id: uid(), mode: 'show', name: String(p.name || 'Imported show'), timer: num(p.timer, 60), boards, active: boards[0].id, scenes: cleanRules(p.scenes), homekit: (p.homekit || []).filter(x => x && x.id).map(x => ({ id: String(x.id), name: String(x.name || 'Switch'), resetOn: !!x.resetOn })), speakers: (p.speakers || []).filter(x => x && x.id && x.id !== 'default').map(x => ({ id: String(x.id), name: String(x.name || x.id) })),
          phones: (p.phones || []).filter(x => x && x.id).map(x => ({ id: String(x.id), name: String(x.name || 'Phone'), address: String(x.address || ''), port: Math.round(num(x.port, 5060)) || 5060 })), wifi: { ...(p.wifi || {}) } };
      } else np = { ...cleanSketch(p, 'Imported sketch'), id: uid() };
      S.projects.push(np); S.current = np.id; save(); renderAll(); toast('Opened ' + np.name);
    } catch (e) { toast('That file isn\u2019t an Escape Builder project'); }
  };
  reader.readAsText(file);
}

// Number boxes accept any value typed into them. Left to itself the browser only allows values a whole
// number of steps from the minimum (a 0.1 minimum with 0.5 steps rejects 1.5), so each box keeps its
// step in data-step for the arrow keys, and tells the browser "any".
function freeNumbers(root) {
  for (const el of root.querySelectorAll('input[type="number"]:not([step="any"])')) {
    el.dataset.step = el.getAttribute('step') || '1';
    el.setAttribute('step', 'any');
  }
}
new MutationObserver(() => freeNumbers(document)).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('keydown', e => {
  const el = e.target;
  if (!(el instanceof HTMLInputElement) || el.type !== 'number' || !el.dataset.step || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
  e.preventDefault();
  const step = parseFloat(el.dataset.step) || 1;
  let v = (parseFloat(el.value) || 0) + (e.key === 'ArrowUp' ? step : -step);
  if (el.min !== '') v = Math.max(parseFloat(el.min), v);
  if (el.max !== '') v = Math.min(parseFloat(el.max), v);
  el.value = String(Math.round(v * 1000) / 1000);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}, true);

// ───────────────────────── Render ─────────────────────────
const $ = id => document.getElementById(id);
function renderProjects() {
  const p = proj(), h = histFor(p);
  $('projects').innerHTML =
    '<span class="history"><button class="icon-btn hist" data-act="undo" title="Undo (⌘Z)" aria-label="Undo"' + (h.undo.length ? '' : ' disabled') + '>' + icon('undo', 2) + '</button>' +
    '<button class="icon-btn hist" data-act="redo" title="Redo (⇧⌘Z)" aria-label="Redo"' + (h.redo.length ? '' : ' disabled') + '>' + icon('redo', 2) + '</button></span>' +
    '<span class="sync" id="sync"></span>' +
    '<label class="sr" for="proj">Saved configs</label><select class="field" id="proj" data-k="project" title="Saved configs">' +
    S.projects.map(x => '<option value="' + x.id + '"' + (x.id === p.id ? ' selected' : '') + '>' + (x.mode === 'show' ? 'Show: ' : '') + esc(x.name || (x.mode === 'show' ? 'Untitled show' : 'Untitled sketch')) + '</option>').join('') +
    '</select>' +
    '<button class="btn" data-act="new-project">' + icon('plus', 2) + 'New sketch</button>' +
    '<button class="btn" data-act="new-show">' + icon('plus', 2) + 'New show</button>' +
    '<button class="btn ghost" data-act="dup-project">Duplicate</button>' +
    '<button class="btn ghost" data-act="export" title="Save this project as a file you can keep or send to someone">Save project</button>' +
    '<button class="btn ghost" data-act="import" title="Open a project file">Open project</button>' +
    '<span class="fold-global"><button class="btn ghost" data-act="fold-all" data-scope="all" data-open="0" title="Fold the parts section and every rule and scene">Collapse all</button>' +
    '<button class="btn ghost" data-act="fold-all" data-scope="all" data-open="1" title="Open the parts section and every rule and scene">Open all</button></span>' +
    (ui.confirmDelete
      ? '<button class="btn confirm" data-act="del-project">Delete “' + esc(p.name || 'Untitled') + '”' + (p.mode === 'show' ? ' and all its boards' : '') + '?</button>'
      : '<button class="btn ghost danger" data-act="del-project">Delete</button>');
  syncChip($('sync'));
}

// Pin dropdown for one field of a part
function pinSelect(project, part, field, need, label) {
  const used = {};
  for (const a of assignments(project)) {
    if (a.part && a.part.id === part.id && a.field === field) continue;
    used[a.pin] = a.part ? (a.part.id === part.id ? roleText(a.part, a.role) : a.part.name) : a.role;
  }
  const curPin = part[field];
  let html = '<option value=""' + (!curPin ? ' selected' : '') + '>No pin</option>';
  for (const pin of BOARDS[project.board].pins) {
    if (!pinFits(pin, need, project.board)) continue;
    const tag = used[pin.id] ? ' · ' + used[pin.id] : (pin.note && /Boot|LED|pull-up/.test(pin.note) ? ' ⚠' : '');
    html += '<option value="' + pin.id + '"' + (pin.id === curPin ? ' selected' : '') + '>' + esc(pin.label + (pin.alias ? ' (' + pin.alias + ')' : '') + tag) + '</option>';
  }
  const sel = '<select class="field pin-select" id="pin-' + part.id + '-' + field + '" data-k="part-pin" data-field="' + field + '" data-id="' + part.id + '" aria-label="' + esc((label ? label + ' pin' : 'Pin') + ' for ' + part.name) + '">' + html + '</select>';
  return label ? '<label class="pin-field"><span>' + label + '</span>' + sel + '</label>' : sel;
}

function optNum(p, key, label, unit, min, max, step) {
  return '<label>' + label + ' <input class="field num" type="number"' + (min != null ? ' min="' + min + '"' : '') + (max != null ? ' max="' + max + '"' : '') + (step ? ' step="' + step + '"' : '') +
    ' id="o-' + p.id + '-' + key + '" data-k="opt-num" data-id="' + p.id + '" data-opt="' + key + '" value="' + esc(optsOf(p)[key]) + '">' + (unit ? ' ' + unit : '') + '</label>';
}
function optSel(p, key, label, choices) {
  return '<label>' + label + ' <select class="field" id="o-' + p.id + '-' + key + '" data-k="opt-sel" data-id="' + p.id + '" data-opt="' + key + '">' +
    choices.map(([v, l]) => '<option value="' + v + '"' + (String(optsOf(p)[key]) === String(v) ? ' selected' : '') + '>' + l + '</option>').join('') + '</select></label>';
}
// One Screen part with three kinds; the 4-digit clock is its own type underneath
// One Motor part with several kinds underneath: servo, two steppers, DC motor (a dimmer)
const MOTOR_KINDS = [['servo', 'Servo (0–180°)'], ['stepper28', 'Stepper · 28BYJ-48 + ULN2003'], ['nema17', 'Stepper · NEMA 17 + A4988'], ['dc', 'DC motor · speed only (MOSFET)'], ['l298n', 'DC motor · L298N (direction + speed)']];
const isMotor = p => p.type === 'servo' || p.type === 'stepper' || p.type === 'hbridge' || (p.type === 'dimmer' && optsOf(p).motor);
function motorKind(p) { return p.type === 'servo' ? 'servo' : p.type === 'hbridge' ? 'l298n' : p.type === 'dimmer' ? 'dc' : optsOf(p).driver === 'a4988' ? 'nema17' : 'stepper28'; }
function motorType(p) {
  const v = motorKind(p);
  return '<label>Type <select class="field" id="o-' + p.id + '-motor" data-k="motor-type" data-id="' + p.id + '">' +
    MOTOR_KINDS.map(([k, l]) => '<option value="' + k + '"' + (k === v ? ' selected' : '') + '>' + l + '</option>').join('') + '</select></label>';
}
// Change a part to another type, keeping its name and fixing rule steps that no longer fit
function convertPart(p, part, type, opts) {
  const was = part.type;
  part.type = type;
  part.opts = { ...defaultOpts(type), ...opts };
  for (const k of PIN_KEYS) if (k !== 'pin') part[k] = '';
  assignPins(p, part);
  freeBusPins(p);
  if (was === type) return;
  for (const r of p.rules.concat(isShow() ? proj().scenes : [])) {
    r.then = r.then.map(a => a.part === part.id && !TYPES[type].acts.some(x => x[0] === a.action) ? { ...defaultAct(p, part.id), id: a.id } : a);
    r.when = r.when.filter(c => c.part !== part.id || (TYPES[type].conds || []).some(x => x[0] === c.cond));
  }
}
// Switch a part to any other type: keeps its name (or renumbers a default one like "Light 2"), keeps pins
// that still fit, and fixes every rule and scene step that uses it. Returns how many steps changed.
function changePartType(p, part, type) {
  const was = part.type, t = TYPES[type];
  if (was === type) return 0;
  const oldLabel = TYPES[was].label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp('^' + oldLabel + '( \\d+)?$').test(part.name)) part.name = nextName(p, type);
  part.type = type;
  part.opts = defaultOpts(type);
  for (const k of PIN_KEYS) if (k !== 'pin') part[k] = '';
  assignPins(p, part);
  freeBusPins(p);
  let changed = 0;
  for (const r of p.rules.concat(isShow() ? proj().scenes : [])) {
    const then = [];
    for (const a of r.then) {
      if (a.part !== part.id || (t.acts || []).some(x => x[0] === a.action)) { then.push(a); continue; }
      changed++;
      if (t.acts) then.push({ ...defaultAct(p, part.id), id: a.id });   // an input has no actions: the step goes
    }
    r.then = then;
    r.when = r.when.flatMap(c => {
      if (c.part !== part.id || (t.conds || []).some(x => x[0] === c.cond)) return [c];
      changed++;
      if (!t.conds) return [];   // an output has no conditions: the condition goes
      const cond = t.conds[0][0];
      return [{ id: c.id, join: c.join, part: part.id, cond, ...condDefaults(p, part, cond), ...(HOLDABLE.includes(type) && c.hold ? { hold: c.hold, holdOn: c.holdOn } : {}) }];
    });
  }
  return changed;
}
// The menu under a part's icon: every part type, grouped like the palette
function typeMenu(part) {
  const group = (kind, title) => '<div class="tm-row"><span class="eyebrow">' + title + '</span><div class="tm-chips">' +
    Object.entries(TYPES).filter(([, t]) => t.kind === kind && !t.hidden).map(([k, t]) =>
      '<button class="tm-chip ' + kind + (k === part.type ? ' on' : '') + '" data-act="set-type" data-id="' + part.id + '" data-type="' + k + '"' + (k === part.type ? ' aria-current="true"' : '') + '>' + icon(k) + '<span>' + (t.tile ? t.tile.label : t.label) + '</span></button>').join('') + '</div></div>';
  return '<div class="type-menu" role="menu" aria-label="Change ' + esc(part.name) + ' to">' + group('in', 'Inputs') + group('out', 'Outputs') + group('logic', 'Logic') +
    '<p class="hint">Rules that use it are updated to match. Undo (⌘Z) puts it back.</p></div>';
}
function screenType(p) {
  const v = p.type === 'clock' ? 'clock' : (optsOf(p).model === 'lcd' ? 'lcd' : 'oled');
  return '<label>Type <select class="field" id="o-' + p.id + '-screen" data-k="screen-type" data-id="' + p.id + '">' +
    [['oled', 'OLED 128×64'], ['lcd', 'LCD 16×2'], ['clock', '4-digit clock (7-segment)']].map(([k, l]) => '<option value="' + k + '"' + (k === v ? ' selected' : '') + '>' + l + '</option>').join('') + '</select></label>';
}
function partOpts(project, p) {
  const o = optsOf(p);
  const cb = (k, label, tip) => '<label' + (tip ? ' title="' + esc(tip) + '"' : '') + '><input type="checkbox" id="o-' + p.id + '-' + k + '" data-k="opt" data-id="' + p.id + '" data-opt="' + k + '"' + (o[k] ? ' checked' : '') + '>' + label + '</label>';
  const reversed = isIn => cb('flip', 'Reversed', isIn ? 'Tick this if it shows on when it\u2019s off' : 'Tick this if it turns on when it should be off');
  const fs = fieldsOf(p);
  const multi = fs.length > 1 ? '<div class="pin-fields">' + fs.map(([f, role, need]) => pinSelect(project, p, f, need, roleText(p, role))).join('') + '</div>' : '';
  switch (p.type) {
    case 'light': case 'buzzer': return cb('startOn', 'On at start') + reversed(false);
    case 'button': case 'switch': case 'magnet': case 'motion': case 'linkin': return reversed(true);
    case 'relay': return cb('startOn', 'On at start') + cb('activeLow', 'Relay switches on LOW');
    case 'maglock': return cb('startLocked', 'Locked at start') + cb('activeLow', 'Relay switches on LOW');
    case 'dfplayer': return multi + optNum(p, 'volume', 'Volume', 'of 30', 0, 30);
    case 'servo': return motorType(p) + optNum(p, 'startAngle', 'Start angle', '°', 0, 180);
    case 'keypad': return optSel(p, 'layout', 'Layout', [['4x4', '4×4 (with A–D)'], ['4x3', '3×4 (phone style)']]) + multi;
    case 'linkout': return '';
    case 'mqttin': case 'mqttout': return '<label class="grow">Topic <input class="field text mono" type="text" id="o-' + p.id + '-topic" data-k="opt-text" data-id="' + p.id + '" data-opt="topic" value="' + esc(o.topic || '') + '" placeholder="room1/seance" spellcheck="false" autocomplete="off"></label>';
    case 'rfid': case 'encoder': return multi + (p.type === 'encoder' ? optNum(p, 'steps', 'Positions', '', 2, 200) : '');
    case 'strip': return optNum(p, 'count', 'LEDs', '', 1, 1000) + optSel(p, 'density', 'Density', [[30, '30 per metre'], [60, '60 per metre'], [144, '144 per metre']]) + optNum(p, 'brightness', 'Brightness', 'of 255', 1, 255, 5) + stripMeta(p);
    case 'dimmer': return (o.motor ? motorType(p) : '') + optNum(p, 'start', o.motor ? 'Start at speed' : 'Start at', '%', 0, 100, 5);
    case 'hbridge': return motorType(p) + multi;
    case 'stepper': return motorType(p) + multi +
      optNum(p, 'stepsPerRev', 'Steps per turn', '', 1, 100000) + optNum(p, 'rpm', 'Speed', 'RPM', 1, 1000);
    case 'clock': return screenType(p) + optSel(p, 'style', 'Style', [['colon', 'Colon  12:34'], ['decimal', 'Decimal points  12.34']]) + multi + optNum(p, 'brightness', 'Brightness', 'of 7', 0, 7);
    case 'screen': return screenType(p) +
      '<label class="grow">Start text <input class="field text" type="text" id="o-' + p.id + '-startText" data-k="opt-text" data-id="' + p.id + '" data-opt="startText" value="' + esc(o.startText) + '" placeholder="Optional"></label>';
  }
  return '';
}

// Length and power for an LED strip
function stripMeta(p) {
  const o = optsOf(p), n = Math.max(1, int(o.count, 30)), dens = int(o.density, 60), m = n / dens;
  return '<div class="viz-meta" id="meta-' + p.id + '"><b>' + n + '</b> LEDs · <b>' + (m < 1 ? Math.round(m * 100) + ' cm' : (Math.round(m * 100) / 100) + ' m') + '</b> long · up to <b>' + (Math.round(n * 0.06 * 10) / 10) + ' A</b> at full white</div>';
}

// LED strip "light up" editor: sections of LEDs, each with a colour and effect, plus a live preview
const SEG_COLORS = ['#ff7a1a', '#2f6bff', '#ff2a2a', '#22d07a', '#b44dff', '#ffd23a', '#ffffff'];
const pair = html => '<span class="pair">' + html + '</span>';
function sceneEditor(project, r, j, a, part) {
  const count = Math.max(1, int(optsOf(part).count, 30));
  const base = 'data-rid="' + r.id + '" data-j="' + j + '"';
  const segs = a.segs || [];
  const rows = segs.map((sg, k) => {
    const b = base + ' data-s="' + k + '"', id = 's-' + r.id + '-' + j + '-' + k;
    // pre + box + unit stay together on one line; rows only wrap between whole settings
    const sn = (key, def, label, unit, step, min, pre) => pair((pre ? '<span class="unit">' + pre + '</span>' : '') + '<input class="field num" type="number" min="' + min + '" step="' + step + '" id="' + id + '-' + key + '" data-k="seg-' + key + '" ' + b + ' value="' + esc(sg[key] == null ? def : sg[key]) + '" aria-label="' + label + '">' + (unit ? '<span class="unit">' + unit + '</span>' : ''));
    const speed = pair('<span class="unit">speed</span><input class="field num spd" type="number" min="1" max="10" step="1" id="' + id + '-spd" data-k="seg-spd" ' + b + ' value="' + speedOf(sg) + '" aria-label="Speed, 1 slow to 10 fast" title="1 is slowest, 10 is fastest"><span class="unit">/ 10</span>');
    const dir = '<select class="field" id="' + id + '-dir" data-k="seg-dir" ' + b + ' aria-label="Direction"><option value="fwd"' + (sg.dir !== 'back' ? ' selected' : '') + '>away from LED 1 →</option><option value="back"' + (sg.dir === 'back' ? ' selected' : '') + '>← toward LED 1</option></select>';
    const shape = (hd, fl, tl, gp) => sn('head', hd, 'LEDs brightening', 'LEDs', 1, 0, 'head') + sn('full', fl, 'LEDs at full brightness', '', 1, 0, 'at 100%') +
      sn('on', tl, 'LEDs fading', 'LEDs', 1, 0, 'tail') + sn('off', gp, 'Dark LEDs', 'LEDs', 1, 0, 'gap');
    let more = '';
    if (sg.fx === 'fadein' || sg.fx === 'fadeout') more = sn('dur', 2, 'Seconds', 's', 0.5, 0.1, 'over');
    else if (sg.fx === 'gradient') more = shape(5, 2, 5, 0) +
      '<select class="field" id="' + id + '-dir" data-k="seg-dir" ' + b + ' aria-label="Start from"><option value="fwd"' + (sg.dir !== 'back' ? ' selected' : '') + '>starts at the first LED</option><option value="back"' + (sg.dir === 'back' ? ' selected' : '') + '>starts at the last LED</option></select>';
    else if (sg.fx === 'fadechase') more = shape(0, 1, 5, 5) + dir + speed;
    else if (sg.fx === 'chase') more = sn('on', 3, 'LEDs on', 'on', 1, 1) + sn('off', 3, 'LEDs off', 'off', 1, 0) + dir + speed;
    else if (sg.fx === 'blink') more = sn('onS', 0.5, 'Seconds on', 's', 0.1, 0.05, 'on for') + sn('offS', 0.5, 'Seconds off', 's', 0.1, 0, 'off for');
    else if (sg.fx === 'breathe' || sg.fx === 'rainbow') more = speed;
    return '<div class="seg" data-drag>' + (segs.length > 1 ? '<button class="grip" id="g-' + r.id + '-seg' + j + '-' + k + '" data-kind="seg" data-rid="' + r.id + '" data-a="' + j + '" data-j="' + k + '" aria-label="Drag to reorder sections" title="Drag to reorder. The LED ranges stay put; colours and effects move.">' + icon('grip', 2) + '</button>' : '') +
      '<span class="seg-no" style="--c:' + esc(sg.color) + '"></span>' +
      pair('<span class="unit">LEDs</span><input class="field num" type="number" min="1" max="' + count + '" id="' + id + '-f" data-k="seg-from" ' + b + ' value="' + esc(sg.from) + '" aria-label="First LED">') +
      pair('<span class="unit">to</span><input class="field num" type="number" min="1" max="' + count + '" id="' + id + '-t" data-k="seg-to" ' + b + ' value="' + esc(sg.to) + '" aria-label="Last LED">') +
      '<button class="swatch-btn" id="' + id + '-c" data-act="pick-color" ' + b + ' style="--c:' + esc(sg.color) + '" aria-label="Colour ' + esc(sg.color) + ', change"></button>' +
      sn('bri', 255, 'Relative brightness, 0 to 255', '', 5, 0, 'relative brightness').replace('type="number"', 'type="number" max="255"') +
      '<select class="field" id="' + id + '-x" data-k="seg-fx" ' + b + ' aria-label="Effect">' + FX.map(([k2, l]) => '<option value="' + k2 + '"' + (k2 === sg.fx ? ' selected' : '') + '>' + l + '</option>').join('') + '</select>' +
      more +
      (segs.length > 1 ? '<button class="icon-btn" data-act="del-seg" ' + b + ' aria-label="Remove section">' + icon('x', 2) + '</button>' : '') + '</div>';
  }).join('');
  return '<div class="scene"><canvas class="strip-canvas" ' + base + ' data-count="' + count + '" aria-label="Preview of ' + esc(part.name) + '"></canvas>' +
    '<div class="segs">' + rows + '</div>' +
    '<button class="add-link" data-act="add-seg" ' + base + '>' + icon('plus', 2.2) + 'Add section</button></div>';
}
function defaultSegs(part) { const n = Math.max(1, int(optsOf(part).count, 30)); return [{ from: 1, to: n, color: '#ff7a1a', fx: 'solid', spd: 5 }]; }

// Live preview: the same maths as the Arduino code, drawn on a canvas
const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const rgbOf = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); const n = parseInt(m ? m[1] : 'ffffff', 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
// Preview at full brightness. The colour shows as picked; when an effect dims an LED,
// it fades the way light does to the eye (a half-power LED still looks fairly bright).
const toScreen = v => { const l = v / 255; return 255 * (l <= 0.0031308 ? 12.92 * l : 1.055 * Math.pow(l, 1 / 2.4) - 0.055); };
function ledLook(pwm) {
  const m = Math.max(...pwm);
  if (m < 1) return null;
  const k = toScreen(Math.min(255, m)) / 255;
  return { css: 'rgb(' + pwm.map(v => Math.round(v * 255 / m * k)).join(',') + ')', lum: m / 255 };
}
function hueToPwm(h) {
  const f = (n) => { const k = (n + h / 60) % 6; return 1 - Math.max(0, Math.min(k, 4 - k, 1)); };
  return [f(5), f(3), f(1)].map(v => 255 * v);
}

// ── LED colour picker: only colours an RGB LED makes at full power (a hue, blended toward white) ──
const LED_PRESETS = [['Red', '#ff0000'], ['Orange', '#ff5a00'], ['Amber', '#ff9800'], ['Yellow', '#ffd400'], ['Green', '#00ff00'], ['Teal', '#00ff90'], ['Cyan', '#00ffff'],
  ['Blue', '#0000ff'], ['Purple', '#7a00ff'], ['Magenta', '#ff00ff'], ['Pink', '#ff2a7a'], ['Warm white', '#ffb46a'], ['White', '#ffffff']];
const hex2 = v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');
// Scale a colour up so its strongest channel is 255 (black stays white)
function ledHex(hex) { const c = rgbOf(hex), m = Math.max(...c); return m ? '#' + c.map(v => hex2(v * 255 / m)).join('') : '#ffffff'; }
function hexToHW(hex) {
  const [r, g, b] = rgbOf(ledHex(hex)), mn = Math.min(r, g, b), w = mn / 255;
  if (w >= 0.999) return { h: 0, w: 1 };
  const [R, G, B] = [r, g, b].map(v => (v - mn) / (255 - mn));
  let h = R === 1 ? (G - B) * 60 : G === 1 ? 120 + (B - R) * 60 : 240 + (R - G) * 60;
  return { h: (h + 360) % 360, w };
}
function hwToHex(h, w) { return '#' + hueToPwm(h).map(v => hex2(v + (255 - v) * w)).join(''); }
let picker = null;
function closePicker() { if (!picker) return; picker = null; $('picker').hidden = true; renderAll(); }
function openPicker(btn) {
  const sg = findRule(btn.dataset.rid).then[+btn.dataset.j].segs[+btn.dataset.s];
  picker = { rid: btn.dataset.rid, j: +btn.dataset.j, s: +btn.dataset.s, ...hexToHW(sg.color) };
  const el = $('picker');
  el.innerHTML = '<canvas class="hs" width="512" height="200" aria-label="Pick a hue left to right, and how white from bottom to top"></canvas>' +
    '<div class="presets">' + LED_PRESETS.map(([n, c]) => '<button class="preset" data-act="preset" data-c="' + c + '" title="' + n + '" aria-label="' + n + '" style="--c:' + c + '"></button>').join('') + '</div>' +
    '<div class="picker-foot"><span class="picker-dot"></span><code class="picker-hex"></code><span class="picker-note">Colours an LED can make at full power</span><button class="btn primary" data-act="picker-done">Done</button></div>';
  el.hidden = false;
  const r = btn.getBoundingClientRect(), w = Math.min(320, innerWidth - 24);
  el.style.width = w + 'px';
  el.style.left = Math.max(12, Math.min(innerWidth - w - 12, r.left + window.scrollX - 20)) + 'px';
  el.style.top = (r.bottom + window.scrollY + 8) + 'px';
  drawPicker();
}
function drawPicker() {
  const el = $('picker'), cv = el.querySelector('.hs'), c = cv.getContext('2d'), W = cv.width, H = cv.height;
  const hue = c.createLinearGradient(0, 0, W, 0);
  ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'].forEach((col, i) => hue.addColorStop(i / 6, col));
  c.fillStyle = hue; c.fillRect(0, 0, W, H);
  const white = c.createLinearGradient(0, 0, 0, H);
  white.addColorStop(0, 'rgba(255,255,255,1)'); white.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = white; c.fillRect(0, 0, W, H);
  const x = picker.h / 360 * W, y = (1 - picker.w) * H;
  c.lineWidth = 4; c.strokeStyle = '#000'; c.beginPath(); c.arc(x, y, 11, 0, Math.PI * 2); c.stroke();
  c.lineWidth = 2.5; c.strokeStyle = '#fff'; c.beginPath(); c.arc(x, y, 11, 0, Math.PI * 2); c.stroke();
  const hex = hwToHex(picker.h, picker.w);
  el.querySelector('.picker-dot').style.background = hex;
  el.querySelector('.picker-hex').textContent = hex.toUpperCase();
}
function setPicked(hex) {
  const sg = findRule(picker.rid).then[picker.j].segs[picker.s];
  sg.color = hex;
  const btn = document.querySelector('.swatch-btn[data-rid="' + picker.rid + '"][data-j="' + picker.j + '"][data-s="' + picker.s + '"]');
  if (btn) { btn.style.setProperty('--c', hex); const dot = btn.closest('.seg').querySelector('.seg-no'); if (dot) dot.style.setProperty('--c', hex); }
  save(true, 'picker-' + picker.rid + picker.j + picker.s); renderCode(); renderProjects();
  drawPicker();
}
function pickAt(e) {
  const cv = $('picker').querySelector('.hs'), r = cv.getBoundingClientRect();
  picker.h = Math.max(0, Math.min(359.9, (e.clientX - r.left) / r.width * 360));
  picker.w = Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height));
  setPicked(hwToHex(picker.h, picker.w));
}
document.addEventListener('pointerdown', e => {
  if (picker && e.target.classList && e.target.classList.contains('hs')) { e.preventDefault(); try { e.target.setPointerCapture(e.pointerId); } catch (err) {} picker.dragging = e.pointerId; pickAt(e); return; }
  if (picker && !e.target.closest('#picker') && !e.target.closest('.swatch-btn')) closePicker();
});
document.addEventListener('pointermove', e => { if (picker && picker.dragging === e.pointerId) pickAt(e); });
document.addEventListener('pointerup', e => { if (picker && picker.dragging === e.pointerId) picker.dragging = null; });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (picker) closePicker();
  else if (ui.typeMenu) { const id = ui.typeMenu; ui.typeMenu = null; renderAll(); const b = document.querySelector('[data-act="type-menu"][data-id="' + id + '"]'); if (b) b.focus(); }
});
function ledColor(sg, i, t) {
  const from = sg.from0, to = sg.to0, ms = sg.ms, [r, g, b] = sg.rgb;
  const dim = k => [r * k / 255, g * k / 255, b * k / 255];
  switch (sg.fx) {
    case 'breathe': { let k = t % ms; k = k < ms / 2 ? k * 510 / ms : (ms - k) * 510 / ms; return dim(15 + k * 240 / 255); }
    case 'fadein': return dim(t >= ms ? 255 : t * 255 / ms);
    case 'fadeout': return t >= ms ? null : dim(255 - t * 255 / ms);
    case 'flicker': { let x = Math.imul(i, 2654435761) ^ Math.imul(Math.floor(t / 90), 40503); x ^= x >>> 13; x = Math.imul(x, 0x5bd1e995); x ^= x >>> 15; return dim(110 + (x >>> 0) % 146); }
    case 'chase': { const pos = Math.floor(t * 6 / ms) * (sg.rev ? -1 : 1), n = sg.pa + sg.pb; return ((((i - from - pos) % n) + n) % n) < sg.pa ? [r, g, b] : null; }
    case 'blink': return (t % (sg.pa + sg.pb)) < sg.pa ? [r, g, b] : null;
    case 'gradient': {
      const cyc = sg.pc + sg.pf + sg.pa + sg.pb;
      let k = (sg.rev ? to - i : i - from) % cyc;
      if (k < sg.pc) return dim((k + 1) * 255 / (sg.pc + 1));
      k -= sg.pc; if (k < sg.pf) return [r, g, b];
      k -= sg.pf; if (k < sg.pa) return dim(255 - (k + 1) * 255 / (sg.pa + 1));
      return null;
    }
    case 'fadechase': {
      const len = sg.pa + sg.pb + sg.pc + sg.pf, x = sg.rev ? to - i : i - from;
      let k = ((t % (len * ms)) * 6 / ms - x) % len; if (k < 0) k += len;
      if (k < sg.pf) return [r, g, b];
      k -= sg.pf;
      if (k < sg.pa) return dim(255 - k * 255 / sg.pa);
      if (sg.pc && k > len - sg.pf - sg.pc) return dim(255 - (len - sg.pf - k) * 255 / sg.pc);
      return null;
    }
    case 'rainbow': { const kb = Math.max(r, g, b) / 255; return hueToPwm((((i - from) / (to - from + 1) + t / ms) % 1) * 360).map(v => v * kb); }
  }
  return [r, g, b];
}
function drawStrips(now) {
  document.querySelectorAll('.strip-canvas').forEach(cv => {
    const r = findRule(cv.dataset.rid), a = r && r.then[+cv.dataset.j];
    if (!a || !a.segs) return;
    const count = +cv.dataset.count, w = cv.clientWidth;
    if (!w) return;
    const cell = Math.max(9, Math.min(16, Math.floor((w - 16) / Math.min(count, 60)))), perRow = Math.max(1, Math.floor((w - 16) / cell));
    const rows = Math.ceil(count / perRow), h = rows * (cell + 12) + 10, dpr = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.height = h + 'px'; }
    const c = cv.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);
    if (!cv._t0) cv._t0 = now;
    // Fades only happen once on the Arduino; the preview replays them so you can watch
    const loopMs = Math.max(0, ...a.segs.filter(sg => sg.fx === 'fadein' || sg.fx === 'fadeout').map(sg => sectionParams(sg).ms));
    const raw = now - cv._t0, t = reduceMotion ? 1200 : loopMs ? raw % (loopMs + 1200) : raw;
    const segs = a.segs.map(sg => {
      const from0 = Math.min(count, Math.max(1, int(sg.from, 1))) - 1, to0 = Math.min(count, Math.max(from0 + 1, int(sg.to, count))) - 1;
      const { ms, a: pa, b: pb, c: pc, f: pf, rev } = sectionParams(sg);
      const kb = Math.min(255, Math.max(0, int(sg.bri, 255))) / 255;
      return { ...sg, from0, to0, ms, pa, pb, pc, pf, rev, rgb: rgbOf(sg.color).map(v => v * kb) };
    });
    const lit = new Array(count).fill(null);
    for (const sg of segs) for (let i = sg.from0; i <= sg.to0; i++) lit[i] = ledColor(sg, i, t);
    c.font = '9px "IBM Plex Mono", monospace';
    for (let i = 0; i < count; i++) {
      const x = 8 + (i % perRow) * cell + cell / 2, y = 8 + Math.floor(i / perRow) * (cell + 12) + cell / 2, s = Math.max(5, cell * 0.5);
      const look = lit[i] ? ledLook(lit[i]) : null;
      const css = look ? look.css : '#26302B';
      if (look) { c.shadowColor = css; c.shadowBlur = cell * (0.2 + 0.7 * Math.sqrt(look.lum)); } else c.shadowBlur = 0;
      c.fillStyle = css;
      c.beginPath(); c.roundRect ? c.roundRect(x - s / 2, y - s / 2, s, s, 2) : c.rect(x - s / 2, y - s / 2, s, s); c.fill();
      c.shadowBlur = 0;
      if (i === 0 || (i + 1) % 10 === 0) { c.fillStyle = '#6E8379'; c.textAlign = 'center'; c.fillText(String(i + 1), x, y + cell / 2 + 9); }
    }
  });
  if (!reduceMotion) requestAnimationFrame(drawStrips);
}

// ── Folding: parts, rules and scenes fold down to one line. Remembered in this browser. ──
let folded = new Set();
try { folded = new Set(JSON.parse(localStorage.getItem('eb-folded') || '[]')); } catch (e) {}
function saveFolded() { try { localStorage.setItem('eb-folded', JSON.stringify([...folded])); } catch (e) {} }
const foldBtn = (id, what) => {
  const f = folded.has(id);
  return '<button class="icon-btn fold" data-act="fold" data-fid="' + id + '" aria-expanded="' + !f + '" aria-label="' + (f ? 'Open ' : 'Collapse ') + esc(what) + '" title="' + (f ? 'Open' : 'Collapse') + '">' + icon('chev', 2) + '</button>';
};
// The ids a Collapse all / Open all button covers
function foldScope(scope) {
  const P = proj();
  if (scope === 'rules') return cur().rules.map(r => r.id);
  if (scope === 'scenes') return (P.scenes || []).map(r => r.id);
  const boards = isShow() ? P.boards : [cur()];   // everything in this sketch or show
  return ['sec:parts'].concat(boards.flatMap(b => b.rules.map(r => r.id)), (P.scenes || []).map(r => r.id));
}
function foldAllBtn(scope) {
  const ids = foldScope(scope);
  if (ids.length < 2) return '';
  const all = ids.every(id => folded.has(id));
  return '<button class="btn ghost end fold-all" data-act="fold-all" data-scope="' + scope + '" data-open="' + (all ? 1 : 0) + '">' + (all ? 'Open all' : 'Collapse all') + '</button>';
}
// Pins a part shares on the board's SPI or I2C bus: fixed by the board, so shown rather than picked
function busPinsNote(project, p) {
  const t = TYPES[p.type];
  if (!t.bus || !fieldsOf(p).length) return '';   // bus-only parts already show these in their pin chip
  return '<span class="bus-pins" title="Fixed by the board\u2019s ' + BUSES[t.bus].label + ' bus, and shared with any other ' + BUSES[t.bus].label + ' parts">' +
    BUSES[t.bus][project.board].map(([id, role]) => role + ' <b>' + esc(findPin(project.board, id).label.replace('GPIO ', '')) + '</b>').join(' · ') + ' <small>(' + BUSES[t.bus].label + ', fixed)</small></span>';
}
function renderPart(project, p) {
  const t = TYPES[p.type], fs = fieldsOf(p);
  let main = '<span></span>';
  if (fs.length === 1) main = pinSelect(project, p, 'pin', fs[0][2]);
  else if (!fs.length) main = '<span class="pin-chip">' + (t.esp32Only ? 'Wi-Fi' : t.bus ? BUSES[t.bus].label + ' · ' + BUSES[t.bus][project.board].map(([id]) => findPin(project.board, id).label.replace('GPIO ', '')).join(' / ') : 'No wiring') + '</span>';
  let warn = '';
  const pin = fs.length === 1 ? findPin(project.board, p.pin) : null;
  if (pin && pin.note && !(pin.inputOnly && p.type === 'motion')) warn = pin.note;
  if (pin && pin.inputOnly && HOLDABLE.includes(p.type) && p.type !== 'motion') warn = 'Input only, no internal pull-up: add a 10 kΩ resistor to 3.3V';
  if (fs.length > 1) warn = fs.map(([f, role]) => { const x = findPin(project.board, p[f]); return x && /Boot|LED/.test(x.note) ? role + ' is on ' + x.label + ' (' + x.note.split(':')[0].toLowerCase() + ')' : ''; }).filter(Boolean).join('; ');
  if (!isWired(project, p)) warn = fs.length > 1 ? 'Pick every pin to include this part in the code' : 'Pick a pin to include this part in the code';
  if (t.bus && isWired(project, p)) warn = '';
  if (onStartupPin(project, p)) warn = 'D13 blinks a few times when the board starts up, so this may briefly switch on. Move it to another pin.';
  else if (pin && pin.id === 'D13' && t.kind === 'out') warn = '';   // a light on D13 just flickers at start-up
  if (t.esp32Only) warn = BOARDS[project.board].family === 'esp32' ? '' : 'Wi-Fi messages need an ESP32. Switch the board to ESP32 to use this.';
  const all = project.parts, idx = all.indexOf(p);
  return '<div class="part ' + t.kind + '" data-drag data-pid="' + p.id + '">' +
    (all.length > 1 ? '<button class="grip" id="g-parts-part-' + idx + '" data-kind="part" data-rid="parts" data-j="' + idx + '" aria-label="Drag to reorder, or use arrow keys" title="Drag to reorder">' + icon('grip', 2) + '</button>' : '<span class="grip-gap"></span>') +
    '<button class="ic ic-btn" data-act="type-menu" data-id="' + p.id + '" aria-haspopup="menu" aria-expanded="' + (ui.typeMenu === p.id) + '" title="Change type" aria-label="' + esc(t.label) + ', change type">' + icon(p.type) + '</button>' +
    '<div style="min-width:0"><input class="part-name" id="n-' + p.id + '" data-k="part-name" data-id="' + p.id + '" value="' + esc(p.name) + '" aria-label="Part name">' +
    '<div class="part-type">' + (p.type === 'dimmer' && optsOf(p).motor ? 'DC motor' : t.label) + ' · ' + KIND_WORD[t.kind] + '</div></div>' +
    main +
    '<button class="icon-btn dup" data-act="dup-part" data-id="' + p.id + '" aria-label="Duplicate ' + esc(p.name) + '" title="Duplicate">' + icon('copy', 1.9) + '</button>' +
    '<button class="icon-btn" data-act="del-part" data-id="' + p.id + '" aria-label="Remove ' + esc(p.name) + '" title="Remove">' + icon('x', 2) + '</button>' +
    '<div class="part-opts">' + partOpts(project, p) + busPinsNote(project, p) + '</div>' +
    (warn ? '<div class="pin-warn">' + icon('warn', 2) + '<span>' + esc(warn) + '</span></div>' : '') +
    (ui.typeMenu === p.id ? typeMenu(p) : '') +
    '</div>';
}

function partSelect(project, dir, value, attrs, withSys) {
  const fits = dir === 'in' ? isInType : isOutType;
  if (project.isScenes) {
    const P = proj();
    let html = '<select class="field" ' + attrs + '>';
    if (value && value !== '__sys' && !isPseudo(value) && !project.parts.some(p => p.id === value)) html += '<option value="' + esc(value) + '" selected>(removed part)</option>';
    if (isHkPart(value) && !(P.homekit || []).some(x => '__hk:' + x.id === value)) html += '<option value="' + esc(value) + '" selected>(removed switch)</option>';
    if (isSpkPart(value) && !speakerOf(P, value)) html += '<option value="' + esc(value) + '" selected>(removed speaker)</option>';
    if (isPhonePart(value) && !phoneOf(P, value)) html += '<option value="' + esc(value) + '" selected>(removed phone)</option>';
    if (!value) html += '<option value="" selected>Pick…</option>';
    for (const b of P.boards) {
      const list = b.parts.filter(p => fits(p.type));
      if (list.length) html += '<optgroup label="' + esc(b.name) + '">' + list.map(p => '<option value="' + p.id + '"' + (p.id === value ? ' selected' : '') + '>' + esc(b.name + ' · ' + p.name) + '</option>').join('') + '</optgroup>';
    }
    if (dir === 'in') html += '<optgroup label="Game"><option value="__start"' + (value === '__start' ? ' selected' : '') + '>Game starts</option></optgroup>';
    if (dir === 'in') html += '<optgroup label="Game master"><option value="__btn"' + (value === '__btn' ? ' selected' : '') + '>Game master button…</option></optgroup>';
    if ((P.homekit || []).length) html += '<optgroup label="HomeKit switches">' + P.homekit.map(x => '<option value="__hk:' + x.id + '"' + (value === '__hk:' + x.id ? ' selected' : '') + '>HomeKit · ' + esc(x.name || 'Switch') + '</option>').join('') + '</optgroup>';
    if (dir === 'out') html += '<optgroup label="Sound and video (on Escape Runner\u2019s computer)">' + speakersOf(P).map(x => '<option value="__spk:' + x.id + '"' + (value === '__spk:' + x.id ? ' selected' : '') + '>Sound · ' + esc(x.name || x.id) + '</option>').join('') +
      '<option value="__tv"' + (value === '__tv' ? ' selected' : '') + '>Video · Screen (HDMI)</option></optgroup>';
    if (dir === 'out' && phonesOf(P).length) html += '<optgroup label="Phones">' + phonesOf(P).map(x => '<option value="__phone:' + x.id + '"' + (value === '__phone:' + x.id ? ' selected' : '') + '>Phone · ' + esc(x.name || 'Phone') + '</option>').join('') + '</optgroup>';
    if (dir === 'in') html += '<optgroup label="Boards telling the show">' + P.boards.map(b => '<option value="__ev:' + b.id + '"' + (value === '__ev:' + b.id ? ' selected' : '') + '>' + esc(b.name) + ' reports…</option>').join('') + '</optgroup>';
    if (withSys) html += '<optgroup label="Game"><option value="__sys"' + (value === '__sys' ? ' selected' : '') + '>Game</option></optgroup>';
    return html + '</select>';
  }
  const parts = project.parts.filter(p => fits(p.type) && TYPES[p.type].kind !== 'logic');
  const logic = project.parts.filter(p => TYPES[p.type].kind === 'logic');
  let html = '<select class="field" ' + attrs + '>';
  if (!parts.length && !logic.length && !withSys) html += '<option value="">Add an ' + (dir === 'in' ? 'input' : 'output') + ' first</option>';
  if (value && value !== '__sys' && !project.parts.some(p => p.id === value)) html += '<option value="' + esc(value) + '" selected>(removed part)</option>';
  const opts = list => list.map(p => '<option value="' + p.id + '"' + (p.id === value ? ' selected' : '') + '>' + esc(p.name) + '</option>').join('');
  const grouped = logic.length || withSys;
  if (parts.length) html += grouped ? '<optgroup label="Parts">' + opts(parts) + '</optgroup>' : opts(parts);
  if (logic.length) html += '<optgroup label="Counters and flags">' + opts(logic) + '</optgroup>';
  if (withSys) html += '<optgroup label="Puzzle"><option value="__sys"' + (value === '__sys' ? ' selected' : '') + '>Puzzle</option></optgroup>';
  return html + '</select>';
}

// Drag handle: drag to reorder, or focus it and use the arrow keys
function grip(kind, r, j, len) {
  if (len < 2) return '<span class="grip-gap"></span>';
  return '<button class="grip" id="g-' + r.id + '-' + kind + '-' + j + '" data-kind="' + kind + '" data-rid="' + r.id + '" data-j="' + j + '" aria-label="Drag to reorder, or use arrow keys" title="Drag to reorder">' + icon('grip', 2) + '</button>';
}
// The value boxes a condition needs (threshold, code, tag ID, hold time …)
// Info bubbles sit above everything and stay on screen, flipping above the icon when there's no room below
function placeBubble(info) {
  const b = info.querySelector('.bubble');
  if (!b) return;
  const r = info.getBoundingClientRect(), w = b.offsetWidth, h = b.offsetHeight, pad = 8, vw = document.documentElement.clientWidth, vh = window.innerHeight;
  const left = Math.max(pad, Math.min(r.left + r.width / 2 - w / 2, vw - w - pad));
  let top = r.bottom + 8, above = false;
  if (top + h > vh - pad) {
    if (r.top - 8 - h >= pad) { top = r.top - 8 - h; above = true; }
    else top = Math.max(pad, vh - h - pad);
  }
  b.style.left = left + 'px';
  b.style.top = top + 'px';
  b.style.setProperty('--ax', Math.max(12, Math.min(w - 12, r.left + r.width / 2 - left)) + 'px');
  b.classList.toggle('above', above);
}
const openInfo = e => { const i = e.target.closest && e.target.closest('.info'); if (i) placeBubble(i); };
document.addEventListener('mouseover', openInfo);
document.addEventListener('focusin', openInfo);
window.addEventListener('scroll', () => { const i = document.querySelector('.info:hover, .info:focus-within'); if (i) placeBubble(i); }, true);
window.addEventListener('resize', () => { const i = document.querySelector('.info:hover, .info:focus-within'); if (i) placeBubble(i); });
function infoBubble(label, html) {
  return '<span class="info" tabindex="0" role="button" aria-label="' + esc(label) + '">' + icon('info', 1.9) + '<span class="bubble" role="tooltip"><b class="bubble-title">' + esc(label) + '</b>' + html + '</span></span>';
}
function condInputs(project, r, j, c, part) {
  if (!part) return '';
  const base = 'data-rid="' + r.id + '" data-j="' + j + '"';
  const id = k => 'c-' + r.id + '-' + j + '-' + k;
  const numIn = (key, min, max, label, step) => '<input class="field num" type="number"' + (min != null ? ' min="' + min + '"' : '') + (max != null ? ' max="' + max + '"' : '') + (step ? ' step="' + step + '"' : '') +
    ' id="' + id(key) + '" data-k="cond-' + key + '" ' + base + ' value="' + esc(c[key]) + '" aria-label="' + label + '">';
  const txtIn = (ph, label, cls, max) => '<input class="field text ' + (cls || '') + '" type="text"' + (max ? ' maxlength="' + max + '"' : '') + ' id="' + id('value') + '" data-k="cond-value" ' + base + ' value="' + esc(c.value) + '" placeholder="' + ph + '" aria-label="' + label + '" spellcheck="false" autocomplete="off">';
  const unit = s => '<span class="unit">' + s + '</span>';
  const adcMax = BOARDS[project.board].adcMax;
  switch (part.type) {
    case 'analog':
      return c.cond === 'between' ? numIn('value', 0, adcMax, 'From') + pair(unit('and') + numIn('value2', 0, adcMax, 'To') + unit('of ' + adcMax)) : pair(numIn('value', 0, adcMax, 'Threshold') + unit('of ' + adcMax));
    case 'encoder': {
      const steps = Math.max(2, int(optsOf(part).steps, 20));
      return c.cond === 'between' ? numIn('value', 0, steps - 1, 'From') + pair(unit('and') + numIn('value2', 0, steps - 1, 'To')) : pair(numIn('value', 0, steps - 1, 'Position') + unit('of 0–' + (steps - 1)));
    }
    case 'keypad':
      if (c.cond === 'code') return txtIn('1234', 'Code', 'code');
      if (c.cond === 'key') return txtIn('5', 'Key', 'key', 1);
      return '';
    case 'rfid': return c.cond === 'tag' ? txtIn('DE AD BE EF', 'Tag ID', 'tagid') + infoBubble('How to find a tag ID',
      '<ol><li>Wire the reader and upload this sketch.</li><li>In the Arduino IDE open <b>Tools → Serial Monitor</b> and set it to <b>115200 baud</b>.</li><li>Hold the tag flat on the reader. You\u2019ll see a line like <code>' + esc(part.name) + ' sees tag: DE AD BE EF</code>.</li><li>Type those letters and numbers here. Spaces and capitals don\u2019t matter.</li></ol><p>The ID is in hexadecimal, so it only uses 0–9 and A–F. Every tag has its own, so do this once per tag.</p>') : '';
    case 'mqttin': return c.cond === 'msg' ? txtIn('reset', 'Message', 'msg') : '';
    case 'clock': return c.cond === 'under' ? pair(numIn('value', 0, 99, 'Minutes', 1) + unit('min left')) : '';
    case 'counter': return numIn('value', null, null, 'Count');
  }
  if (HOLDABLE.includes(part.type)) {
    // Instant by default; tick "for at least" to require it to stay that way for a while
    const held = (c.hold != null && c.hold !== '' && num(c.hold, 0) > 0) || c.holdOn;
    return '<label class="toggle"><input type="checkbox" id="' + id('holdon') + '" data-k="cond-holdon" ' + base + (held ? ' checked' : '') + '>for at least</label>' +
      (held ? pair('<input class="field num" type="number" min="0.1" step="0.5" id="' + id('hold') + '" data-k="cond-hold" ' + base + ' value="' + esc(c.hold || '') + '" aria-label="Hold time in seconds">' + unit('s')) : '');
  }
  return '';
}
// Sound and video steps: a file from Escape Runner's Media panel, plus how to play it
function mediaInputs(r, j, a) {
  const base = 'data-rid="' + r.id + '" data-j="' + j + '"', id = 'a-' + r.id + '-' + j + '-m';
  const play = a.action === 'sndplay' || a.action === 'vidplay', video = a.action === 'vidplay';
  if (a.action === 'vidstop') return '';
  const file = a.action === 'sndstopall' ? '' : '<input class="field text media-file" type="text" id="' + id + 'file" data-k="act-m" data-f="file" ' + base + ' value="' + esc(a.file) + '" placeholder="' + (play ? (video ? 'ghost.mp4' : 'thunder.mp3') : 'every sound') + '" aria-label="File name" spellcheck="false" autocomplete="off">';
  const n = (f, pre, unit, def, step, max) => pair('<span class="unit">' + pre + '</span><input class="field num" type="number" min="0"' + (max ? ' max="' + max + '"' : '') + ' step="' + step + '" id="' + id + f + '" data-k="act-m" data-f="' + f + '" ' + base + ' value="' + esc(a[f] == null ? def : a[f]) + '" aria-label="' + pre + '">' + (unit ? '<span class="unit">' + unit + '</span>' : ''));
  const cb = (f, label, dis) => '<label class="toggle' + (dis ? ' off' : '') + '"><input type="checkbox" id="' + id + f + '" data-k="act-mc" data-f="' + f + '" ' + base + (a[f] ? ' checked' : '') + (dis ? ' disabled' : '') + '>' + label + '</label>';
  if (!play) return file + n('fade', 'fade out', 's', 0, 0.5);
  // Lightning: a switch like Loop; when it's on, tick any lights in the show
  let lightSw = '', picks = '';
  if (!video) {
    const all = [];
    for (const b of proj().boards) for (const x of b.parts) if (canFlash(x)) all.push({ b, x });
    const on = lightOnOf(a), ids = lightIdsOf(a);
    lightSw = '<label class="toggle"><input type="checkbox" id="' + id + 'lighton" data-k="act-mc" data-f="lightOn" ' + base + (on ? ' checked' : '') + '>Lightning</label>';
    if (on) {
      const ticked = all.filter(l => ids.includes(l.x.id)), gone = ids.filter(i => !all.some(l => l.x.id === i));
      const pick = (pid, label, checked, cls) => '<label class="pick' + (cls ? ' ' + cls : '') + '"><input type="checkbox" id="' + id + 'lp-' + pid + '" data-k="act-light" data-pid="' + esc(pid) + '" ' + base + (checked ? ' checked' : '') + '>' + label + '</label>';
      picks = '<div class="light-picks"><span class="unit">flash</span>' +
        (all.length ? all.map(l => pick(l.x.id, esc(l.b.name + ' · ' + l.x.name), ids.includes(l.x.id))).join('') : '<span class="hint">Add a Light, Dimmer or LED strip to a board first.</span>') +
        gone.map(g => pick(g, '(removed light)', true, 'gone')).join('') +
        (ticked.some(l => l.x.type === 'strip') ? pair('<span class="unit">strip colour</span><input class="swatch" type="color" id="' + id + 'lcolor" data-k="act-m" data-f="lcolor" ' + base + ' value="' + esc(/^#[0-9a-f]{6}$/i.test(a.lcolor || '') ? a.lcolor : LIGHTNING_DEF) + '" aria-label="Lightning colour on LED strips">') : '') +
        (ticked.some(l => l.x.type === 'dimmer') ? pair('<span class="unit">dimmers at</span><input class="field num" type="number" min="1" max="100" step="5" id="' + id + 'lpct" data-k="act-m" data-f="lpct" ' + base + ' value="' + esc(a.lpct == null ? 100 : a.lpct) + '" aria-label="Flash brightness on dimmers"><span class="unit">%</span>') : '') +
        '</div>';
    }
  }
  return file + n('vol', 'volume', '%', 100, 5, 100) + (video ? '' : n('fade', 'fade in', 's', 0, 0.5)) + cb('loop', 'Loop') + cb('wait', 'Wait for it to end', a.loop) + lightSw +
    infoBubble(video ? 'Videos' : 'Sounds', video
      ? '<p>Plays fullscreen on the screen or TV plugged into the HDMI port of the computer running Escape Runner. A new video replaces the one showing; the screen stays black between videos.</p><p>Upload the file in Escape Runner\u2019s <b>Media</b> panel and type its name exactly (capitals count).</p>'
      : '<p>Plays on the computer running Escape Runner, through this speaker. Several sounds can play at once.</p><p>List several files with commas (<code>thunder1.mp3, thunder2.mp3</code>) to play one at random each time.</p><p><b>Lightning</b> flashes the lights you tick on every crack in the sound, on any boards: LED strips (in the colour you pick), Lights, and Dimmers such as a 12 V strip on a MOSFET (at the brightness you pick). Escape Runner measures each file when you upload it.</p><p>Upload the file in Escape Runner\u2019s <b>Media</b> panel and type its name exactly (capitals count). <b>Wait for it to end</b> holds the scene until the sound finishes.</p>') + picks;
}
// A part by id, from this sketch or any board in the show
function partById(id) {
  const here = cur().parts.find(x => x.id === id);
  if (here || !isShow()) return here;
  for (const b of proj().boards) { const x = b.parts.find(q => q.id === id); if (x) return x; }
  return null;
}
// A little light that shows how a flicker or blink will look (see animateDots)
// varied: only a Dimmer with Varied brightness flickers through brightness levels; Lights flicker fully on and off
const lightDot = (a, varied) => '<span class="lt-dot" aria-hidden="true" title="Preview" data-fx="' + a.action + '" data-speed="' + esc(a.value) + '" data-varied="' + (varied ? 1 : 0) + '" data-on="' + esc(a.value2 == null ? 0.3 : a.value2) + '" data-off="' + esc(a.value3 == null ? 0.3 : a.value3) + '" data-times="' + (a.forever ? 0 : esc(a.value)) + '"></span>';
// A phone call step: the message file, how long it rings, and whether the scene waits for the call to end
function phoneInputs(r, j, a) {
  const base = 'data-rid="' + r.id + '" data-j="' + j + '"', id = 'a-' + r.id + '-' + j + '-m';
  return '<input class="field text media-file" type="text" id="' + id + 'file" data-k="act-m" data-f="file" ' + base + ' value="' + esc(a.file) + '" placeholder="phone-call.mp3" aria-label="Message file" spellcheck="false" autocomplete="off">' +
    pair('<span class="unit">rings up to</span><input class="field num" type="number" min="5" step="5" id="' + id + 'ring" data-k="act-m" data-f="ring" ' + base + ' value="' + esc(a.ring == null ? 30 : a.ring) + '" aria-label="Ring for up to seconds"><span class="unit">s</span>') +
    '<label class="toggle"><input type="checkbox" id="' + id + 'wait" data-k="act-mc" data-f="wait" ' + base + (a.wait ? ' checked' : '') + '>Wait for the call to end</label>' +
    infoBubble('Phone calls', '<p>Escape Runner rings this phone over the network. When someone picks up, it plays the message, then hangs up. If nobody answers, it stops ringing after the time you set.</p><p>Upload the message in Escape Runner\u2019s <b>Media</b> panel and type its name exactly (capitals count). Phone-quality sound works best: clear speech, not too quiet.</p><p><b>Wait for the call to end</b> holds the scene until the call is over.</p>');
}
function actInputs(r, j, a) {
  if (isSpkPart(a.part) || isTvPart(a.part)) return mediaInputs(r, j, a);
  if (isPhonePart(a.part)) return phoneInputs(r, j, a);
  const part = a.part && a.part !== '__sys' ? partById(a.part) : null;
  if (part && (a.action === 'flick' || (a.action === 'blink' && (part.type === 'light' || part.type === 'buzzer')))) {
    const base = 'data-rid="' + r.id + '" data-j="' + j + '"', id = 'a-' + r.id + '-' + j + '-v';
    const numIn = (k, pre, unit, val, min, max, step, label) => pair((pre ? '<span class="unit">' + pre + '</span>' : '') + '<input class="field num" type="number" min="' + min + '"' + (max ? ' max="' + max + '"' : '') + ' step="' + step + '" id="' + id + k + '" data-k="act-' + (k || 'value') + '" ' + base + ' value="' + esc(val) + '" aria-label="' + label + '">' + (unit ? '<span class="unit">' + unit + '</span>' : ''));
    const box = (f, label, on) => '<label class="toggle"><input type="checkbox" id="' + id + f + '" data-k="act-mc" data-f="' + f + '" ' + base + (on ? ' checked' : '') + '>' + label + '</label>';
    if (a.action === 'flick') return numIn('', 'speed', '/ 10', a.value == null ? 5 : a.value, 1, 10, 1, 'Speed, 1 slow to 10 fast') +
      (part.type === 'dimmer' ? box('varied', 'Varied brightness', a.varied !== false) : '') + (part.type === 'buzzer' ? '' : lightDot(a, part.type === 'dimmer' && a.varied !== false));
    return (a.forever ? '' : numIn('', '', 'times', a.value == null ? 3 : a.value, 1, 0, 1, 'Times')) + box('forever', 'Forever', !!a.forever) +
      numIn('value2', 'on for', 's', a.value2 == null ? 0.3 : a.value2, 0.05, 0, 0.05, 'On for') + numIn('value3', 'off for', 's', a.value3 == null ? 0.3 : a.value3, 0.05, 0, 0.05, 'Off for') +
      (part.type === 'light' ? lightDot(a, false) : '');
  }
  const P = PARAM[a.action];
  // Waits can be random, in scenes and board rules: "wait 20 to 60 s"
  if (a.part === '__sys' && a.action === 'wait') {
    const base = 'data-rid="' + r.id + '" data-j="' + j + '"', id = 'a-' + r.id + '-' + j + '-v';
    return pair('<input class="field num" type="number" min="0.1" step="0.5" id="' + id + '" data-k="act-value" ' + base + ' value="' + esc(a.value) + '" aria-label="Seconds">') +
      pair('<span class="unit">to</span><input class="field num" type="number" min="0" step="1" placeholder="—" id="' + id + 'value2" data-k="act-value2" ' + base + ' value="' + esc(a.value2 == null ? '' : a.value2) + '" aria-label="Up to seconds, for a random wait"><span class="unit">s</span>') +
      infoBubble('Random waits', '<p>Leave <b>to</b> empty for a fixed wait. Fill it in for a random wait each time, like 20 to 60 s between thunder strikes.</p>');
  }
  if (!P) return '';
  const base = 'data-rid="' + r.id + '" data-j="' + j + '"';
  const id = 'a-' + r.id + '-' + j + '-v';
  if (P.color) return '<input class="swatch" type="color" id="' + id + '" data-k="act-value" ' + base + ' value="' + esc(/^#[0-9a-f]{6}$/i.test(a.value) ? a.value : P.def) + '" aria-label="Colour">';
  if (P.text) return '<input class="field text' + (P.max ? ' short' : '') + '" type="text"' + (P.max ? ' maxlength="' + P.max + '"' : '') + ' id="' + id + '" data-k="act-value" ' + base + ' value="' + esc(a.value) + '" aria-label="Text">' + (P.unit ? '<span class="unit">' + P.unit + '</span>' : '');
  return pair('<input class="field num" type="number"' + (P.min != null ? ' min="' + P.min + '"' : '') + (P.max != null ? ' max="' + P.max + '"' : '') + ' step="' + P.step + '" id="' + id + '" data-k="act-value" ' + base + ' value="' + esc(a.value) + '" aria-label="Amount">' + (P.unit ? '<span class="unit">' + P.unit + '</span>' : '')) +
    (P.extras || []).map(X => pair('<span class="unit">' + X.pre + '</span><input class="field num" type="number" min="' + X.min + '" step="' + X.step + '" id="' + id + X.key + '" data-k="act-' + X.key + '" ' + base + ' value="' + esc(a[X.key] == null ? X.def : a[X.key]) + '" aria-label="' + esc(X.pre) + '"><span class="unit">' + X.unit + '</span>')).join('');
}
function renderRule(project, r, i, numLabel) {
  const no = numLabel || ((project.isScenes ? 'SCENE ' : 'RULE ') + (i + 1));
  const match = r.match === 'order' ? 'order' : r.match === 'some' && !project.isScenes ? 'some' : 'all';
  const conds = r.when.map((c, j) => {
    const part = project.parts.find(p => p.id === c.part);
    const t = part ? TYPES[part.type] : null;
    const base = 'data-rid="' + r.id + '" data-j="' + j + '"';
    const pre = match === 'order' ? '<span class="and step">' + (j + 1) + '</span>'
      : match === 'some' ? '<span class="and">\u2022</span>'
      : j ? '<select class="field join' + (c.join === 'or' ? ' or' : '') + '" id="c-' + r.id + '-' + j + '-j" data-k="cond-join" ' + base + ' aria-label="And or or"><option value="and"' + (c.join !== 'or' ? ' selected' : '') + '>and</option><option value="or"' + (c.join === 'or' ? ' selected' : '') + '>or</option></select>'
      : '<span class="and"></span>';
    const ev = isEvPart(c.part), btn = isBtnPart(c.part), hk = isHkPart(c.part), start = isStartPart(c.part);
    return '<div class="row" data-drag>' + grip('cond', r, j, r.when.length) + pre +
      partSelect(project, 'in', c.part, 'id="c-' + r.id + '-' + j + '-p" data-k="cond-part" ' + base + ' aria-label="Input"', false) +
      (t ? '<select class="field" id="c-' + r.id + '-' + j + '-c" data-k="cond-cond" ' + base + ' aria-label="Condition">' + t.conds.map(([k, l]) => '<option value="' + k + '"' + (k === c.cond ? ' selected' : '') + '>' + l + '</option>').join('') + '</select>' : '') +
      (hk ? '<select class="field" id="c-' + r.id + '-' + j + '-c" data-k="cond-cond" ' + base + ' aria-label="Switch state">' + HK_CONDS.map(([k, l]) => '<option value="' + k + '"' + (k === c.cond ? ' selected' : '') + '>' + l + '</option>').join('') + '</select>' +
        infoBubble('HomeKit switches as triggers', '<p>Tap this switch in the Home app (or have a Home automation flip it) to start the scene.</p>') : '') +
      (btn ? '<span class="unit">labelled</span><input class="field text" type="text" id="c-' + r.id + '-' + j + '-value" data-k="cond-value" ' + base + ' value="' + esc(c.value) + '" placeholder="TV started" aria-label="Button name" spellcheck="false">' +
        infoBubble('Game master buttons', '<p>This appears as a big button on Escape Runner\u2019s website. Pressing it counts as this condition happening, for things only you can see, like guests turning on the TV.</p>') : '') +
      (start ? infoBubble('Game starts', '<p>True the moment you press <b>Start game</b> on Escape Runner\u2019s website. Use it for ambient scenes like rain or a storm that should run all game.</p>') : '') +
      (hk || btn || start ? '' : ev ? '<input class="field text msg" type="text" id="c-' + r.id + '-' + j + '-value" data-k="cond-value" ' + base + ' value="' + esc(c.value) + '" placeholder="solved" aria-label="What the board reports" spellcheck="false" autocomplete="off">' +
        infoBubble('Reports from a board', '<p>A board reports a word when one of its own rules uses <b>Game → tell the show</b>. Type the same word here, like <code>solved</code>.</p>') : condInputs(project, r, j, c, part)) +
      '<span class="end"><button class="icon-btn" data-act="del-cond" ' + base + ' aria-label="Remove condition">' + icon('x', 2) + '</button></span></div>';
  }).join('');
  const acts = r.then.map((a, j) => {
    const part = a.part === '__sys' ? null : project.parts.find(p => p.id === a.part);
    const list = a.part === '__sys' ? sysActs(!!project.isScenes, isShow()) : isHkPart(a.part) ? HK_ACTS : isSpkPart(a.part) ? SND_ACTS : isTvPart(a.part) ? TV_ACTS : isPhonePart(a.part) ? PHONE_ACTS : part ? TYPES[part.type].acts : [];
    const base = 'data-rid="' + r.id + '" data-j="' + j + '"';
    return '<div class="row" data-drag>' + grip('act', r, j, r.then.length) + '<span class="and">' + (j ? 'then' : '') + '</span>' +
      partSelect(project, 'out', a.part, 'id="a-' + r.id + '-' + j + '-p" data-k="act-part" ' + base + ' aria-label="Output"', true) +
      (list.length ? '<select class="field" id="a-' + r.id + '-' + j + '-a" data-k="act-action" ' + base + ' aria-label="Action">' + list.map(([k, l]) => '<option value="' + k + '"' + (k === a.action ? ' selected' : '') + '>' + l + '</option>').join('') + '</select>' : '') +
      actInputs(r, j, a) +
      '<span class="end"><button class="icon-btn" data-act="del-act" ' + base + ' aria-label="Remove action">' + icon('x', 2) + '</button></span>' +
      (part && part.type === 'strip' && a.action === 'scene' ? sceneEditor(project, r, j, a, part) : '') + '</div>';
  }).join('');
  const loopOn = !project.isScenes && match !== 'order' && !!r.loop;   // board rule: start over when the steps finish
  const repeatOn = match !== 'order' && (num(r.repeat, 0) > 0 || loopOn);
  const whileOn = !project.isScenes && match !== 'order' && !!r.whileTrue;   // board rule: undo it when it stops being true
  const startOver = match === 'order' && r.when.length > 1
    ? '<label class="start-over">Start over if players pause <input class="field num" type="number" min="0" step="1" placeholder="—" id="r-' + r.id + '-timeout" data-k="rule-timeout" data-rid="' + r.id + '" value="' + esc(r.timeout || '') + '" aria-label="Seconds"> s between steps</label>' : '';
  const foot = match === 'order' || project.isScenes ? '' :
    '<label class="toggle"><input type="checkbox" id="r-' + r.id + '-loop" data-k="rule-loop" data-rid="' + r.id + '"' + (loopOn ? ' checked' : '') + '>Start over when the steps finish, while the conditions stay true</label>' +
    (loopOn ? '' : '<label>Repeat every <input class="field num" type="number" min="0" step="1" placeholder="—" id="r-' + r.id + '-repeat" data-k="rule-repeat" data-rid="' + r.id + '" value="' + esc(r.repeat || '') + '" aria-label="Seconds"> s while the conditions stay true</label>');
  const isFolded = folded.has(r.id), nc = r.when.length, na = r.then.length;
  const sum = isFolded ? '<span class="rule-sum">' + (nc ? nc + ' condition' + (nc === 1 ? '' : 's') : project.isScenes ? 'run by hand' : 'no conditions') + ' \u2192 ' + na + ' step' + (na === 1 ? '' : 's') + '</span>' : '';
  // Scenes and board rules can be dragged into a new order by the handle in their header
  const kind = project.isScenes ? 'scene' : 'rule', n = project.rules.length;
  const handle = n > 1 ? '<button class="grip" id="g-' + kind + 's-' + kind + '-' + i + '" data-kind="' + kind + '" data-rid="' + kind + 's" data-j="' + i + '" aria-label="Drag to reorder this ' + kind + ', or use arrow keys" title="Drag to reorder">' + icon('grip', 2) + '</button>' : '';
  return '<div class="rule' + (isFolded ? ' folded' : '') + '" data-drag data-rule-id="' + r.id + '">' +
    '<div class="rule-head">' + handle + foldBtn(r.id, no.toLowerCase()) + '<span class="rule-no' + (project.isScenes ? (r.ambient ? ' ambient' : ' scene') : '') + '">' + no + '</span>' +
    '<input class="rule-name" id="r-' + r.id + '-name" data-k="rule-name" data-rid="' + r.id + '" value="' + esc(r.name) + '" placeholder="' + (project.isScenes ? 'Name this scene' : 'Name this rule') + '" aria-label="Name">' +
    sum +
    '<label class="toggle' + (repeatOn || whileOn ? ' off' : '') + '"' + (repeatOn ? ' title="Repeating rules keep firing, so “Only once” is ignored"' : whileOn ? ' title="“Only while true” rules switch on and off as often as their conditions change"' : '') + '><input type="checkbox" id="r-' + r.id + '-once" data-k="rule-once" data-rid="' + r.id + '"' + (r.once && !repeatOn && !whileOn ? ' checked' : '') + (repeatOn || whileOn ? ' disabled' : '') + '>Only once</label>' +
    (!project.isScenes && match !== 'order' ? '<label class="toggle" title="When its conditions stop being true, put back what it did: lights and signals off, maglocks locked, flags cleared, sounds stopped"><input type="checkbox" id="r-' + r.id + '-while" data-k="rule-while" data-rid="' + r.id + '"' + (whileOn ? ' checked' : '') + '>Only while true</label>' : '') +
    (project.isScenes ? '<label class="toggle" title="When the last step finishes, start again from the first, until the scene is stopped or the game ends"><input type="checkbox" id="r-' + r.id + '-loop" data-k="rule-loop" data-rid="' + r.id + '"' + (r.loop ? ' checked' : '') + '>Repeat</label>' +
      '<label class="toggle" title="Background scenes like rain, music or a storm: numbered separately from the story, and listed apart on Escape Runner"><input type="checkbox" id="r-' + r.id + '-ambient" data-k="rule-ambient" data-rid="' + r.id + '"' + (r.ambient ? ' checked' : '') + '>Ambient</label>' : '') +
    '<button class="icon-btn dup" data-act="dup-rule" data-rid="' + r.id + '" aria-label="Duplicate rule" title="Duplicate rule">' + icon('copy', 1.9) + '</button>' +
    '<button class="icon-btn" data-act="del-rule" data-rid="' + r.id + '" aria-label="Delete rule" title="Delete rule">' + icon('x', 2) + '</button></div>' +
    '<div class="clause"><div class="clause-label"><span class="kw when">When</span>' + (project.isScenes && !r.when.length ? '<span>only when the game master runs it</span>' : '') +
      (r.when.length > 1 && !project.isScenes ? '<select class="field match" id="r-' + r.id + '-match" data-k="rule-match" data-rid="' + r.id + '" aria-label="How conditions combine">' +
        [['all', 'these are true'], ['some', 'enough of these are true'], ['order', 'these happen in this exact order']].map(([k, l]) => '<option value="' + k + '"' + (k === match ? ' selected' : '') + '>' + l + '</option>').join('') + '</select>' : '') +
      (match === 'some' && r.when.length > 1 ? pair('<span class="unit">at least</span><input class="field num" type="number" min="1" max="' + r.when.length + '" step="1" id="r-' + r.id + '-need" data-k="rule-need" data-rid="' + r.id + '" value="' + needOf(r, r.when.length) + '" aria-label="How many must be true"><span class="unit">of ' + r.when.length + '</span>') : '') +
      '</div><div class="rows">' + conds + '</div>' +
      (match === 'order' && r.when.length > 1 ? '<p class="hint" style="margin:0">Each step counts the moment it happens. A wrong input starts the sequence over.</p>' + startOver : '') +
      (match === 'all' && r.when.slice(1).some(c => c.join === 'or') && r.when.slice(1).some(c => c.join !== 'or') ? '<p class="hint" style="margin:0">“and” is checked before “or”, so A and B or C means (A and B) or C.</p>' : '') +
    '<button class="add-link" data-act="add-cond" data-rid="' + r.id + '">' + icon('plus', 2.2) + 'Add condition</button></div>' +
    '<div class="clause"><div class="clause-label"><span class="kw then">Then</span></div><div class="rows">' + acts + '</div>' +
    '<div class="add-row"><button class="add-link" data-act="add-act" data-rid="' + r.id + '">' + icon('plus', 2.2) + 'Add action</button>' +
    '<button class="add-link" data-act="add-wait" data-rid="' + r.id + '">' + icon('plus', 2.2) + 'Add wait</button></div></div>' +
    (foot ? '<div class="rule-foot">' + foot + '</div>' : '') +
    '</div>';
}

// Wi-Fi settings, shown once the sketch uses a Wi-Fi message part on an ESP32
function showWifiCard(P) {
  const W = wifiOf(P);
  const f = (key, label, type, ph, cls) => '<label class="' + (cls || '') + '"><span class="eyebrow">' + label + '</span><input class="field" type="' + type + '" id="wifi-' + key + '" data-k="wifi" data-f="' + key + '" value="' + esc(W[key]) + '" placeholder="' + esc(ph) + '" spellcheck="false" autocomplete="off"></label>';
  return '<section class="card"><div class="card-head"><h2>Show Wi-Fi</h2><span class="sub">Every board joins this network and connects to Escape Runner.</span></div>' +
    '<div class="wifi-grid">' + f('ssid', 'Wi-Fi name', 'text', 'RoomWiFi') + f('pass', 'Wi-Fi password', 'password', '') +
    f('server', 'Escape Runner address', 'text', 'e.g. 192.168.0.242') + f('port', 'Port', 'number', '1883', 'narrow') + f('otaPass', 'Upload password', 'password', 'optional') + '</div>' +
    '<p class="hint" style="margin:10px 0 0">Escape Runner shows its address on its website, in the Show file section under <b>Escape Runner address</b> (it\u2019s also printed when it starts). ESP32s only join 2.4 GHz Wi-Fi. The password is saved with this show.</p></section>';
}
function wifiCard(p) {
  if (isShow()) return '';
  if (!p.parts.some(x => TYPES[x.type].esp32Only) || BOARDS[p.board].family !== 'esp32') return '';
  const W = wifiOf(p);
  const f = (key, label, type, ph, cls) => '<label class="' + (cls || '') + '"><span class="eyebrow">' + label + '</span><input class="field" type="' + type + '" id="wifi-' + key + '" data-k="wifi" data-f="' + key + '" value="' + esc(W[key]) + '" placeholder="' + esc(ph) + '" spellcheck="false" autocomplete="off"></label>';
  return '<section class="card"><div class="card-head"><h2>Wi-Fi</h2><span class="sub">How this ESP32 reaches the message server.</span></div>' +
    '<div class="wifi-grid">' + f('ssid', 'Wi-Fi name', 'text', 'RoomWiFi') + f('pass', 'Wi-Fi password', 'password', '') +
    f('server', 'Message server address', 'text', 'e.g. 192.168.0.242') + f('port', 'Port', 'number', '1883', 'narrow') + f('id', 'This prop\u2019s name', 'text', slug(p.name)) + f('otaPass', 'Upload password', 'password', 'optional') + '</div>' +
    '<p class="hint" style="margin:10px 0 0">The password is saved with this sketch, so it\u2019s also in saved project files. Remove it before sending a project to someone. Setup steps for the message server are in Code → Wiring.</p></section>';
}
function homekitCard(P) {
  const list = P.homekit || [];
  return '<section class="card"><div class="card-head"><h2>HomeKit switches</h2><span class="sub">For AC power: smart plugs, house lights, fog.</span>' +
    '<button class="btn end" data-act="add-hk">' + icon('plus', 2) + 'Add switch</button></div>' +
    (list.length ? '<div class="hk-list">' + list.map(x => '<div class="hk-row"><span class="hk-ic">' + icon('switch') + '</span>' +
      '<input class="field" id="hk-' + x.id + '" data-k="hk-name" data-hid="' + x.id + '" value="' + esc(x.name) + '" placeholder="Fog" aria-label="Switch name">' +
      '<label class="toggle" title="Reset game turns this switch on (others turn off)"><input type="checkbox" id="hk-' + x.id + '-reset" data-k="hk-reset" data-hid="' + x.id + '"' + (x.resetOn ? ' checked' : '') + '>On after reset</label>' +
      '<button class="icon-btn" data-act="del-hk" data-hid="' + x.id + '" aria-label="Remove switch">' + icon('x', 2) + '</button></div>').join('') + '</div>'
      : '<div class="empty">No switches yet. Add one for each thing on a smart plug, like Fog or Lights Off.</div>') +
    '<p class="hint" style="margin:12px 0 0">Escape Runner shows these in the Home app as switches. Reset game turns them all off, except the ones set to <b>On after reset</b> (like house lights for the next group). Scenes turn them on and off; in the Home app, make an automation for each (for example “Fog turns on → turn on the fog plug”). Automations need a home hub (HomePod or Apple TV).</p>' +
  '</section>';
}
function speakersCard(P) {
  const list = P.speakers || [];
  return '<section class="card"><div class="card-head"><h2>Speakers</h2><span class="sub">Sound and video play on the computer running Escape Runner.</span>' +
    '<button class="btn end" data-act="add-spk">' + icon('plus', 2) + 'Add speaker</button></div>' +
    '<div class="hk-list"><div class="hk-row"><span class="hk-ic">' + icon('dfplayer') + '</span><span class="spk-fixed">' + DEFAULT_SPK.name + '</span><span class="hint">that computer\u2019s own sound (headphone jack or HDMI)</span></div>' +
    list.map(x => '<div class="hk-row"><span class="hk-ic">' + icon('dfplayer') + '</span>' +
      '<input class="field" id="spk-' + x.id + '" data-k="spk-name" data-sid="' + x.id + '" value="' + esc(x.name) + '" placeholder="Speaker System 1" aria-label="Speaker name">' +
      '<span class="hint">named <code>' + esc(x.id) + '</code></span>' +
      '<button class="icon-btn" data-act="del-spk" data-sid="' + x.id + '" aria-label="Remove speaker">' + icon('x', 2) + '</button></div>').join('') + '</div>' +
    '<p class="hint" style="margin:12px 0 0">Add one for each USB sound card on the computer running Escape Runner. On a Pi, <code>setup-speakers.sh</code> asks you to name each card: use the names shown here. In scenes, pick <b>Sound · a speaker</b> or <b>Video · Screen</b> and type a file name from Escape Runner\u2019s Media panel.</p>' +
  '</section>';
}
function phonesCard(P) {
  const list = phonesOf(P);
  return '<section class="card"><div class="card-head"><h2>Phones</h2><span class="sub">Escape Runner can ring a phone in the room and play a message.</span>' +
    '<button class="btn end" data-act="add-phone">' + icon('plus', 2) + 'Add phone</button></div>' +
    (list.length ? '<div class="hk-list">' + list.map(x => '<div class="hk-row">' +
      '<input class="field" id="ph-' + x.id + '" data-k="ph-name" data-pid="' + x.id + '" value="' + esc(x.name) + '" placeholder="Trimline" aria-label="Phone name">' +
      '<input class="field mono" id="ph-' + x.id + '-addr" data-k="ph-addr" data-pid="' + x.id + '" value="' + esc(x.address || '') + '" placeholder="192.168.0.50" aria-label="Phone\u2019s IP address" spellcheck="false" autocomplete="off">' +
      '<input class="field num" type="number" min="1" max="65535" id="ph-' + x.id + '-port" data-k="ph-port" data-pid="' + x.id + '" value="' + esc(x.port || 5060) + '" aria-label="Port" title="5060 for an HT80x\u2019s first phone socket, 5062 for its second">' +
      '<button class="icon-btn" data-act="del-phone" data-pid="' + x.id + '" aria-label="Remove phone">' + icon('x', 2) + '</button></div>').join('') + '</div>'
      : '<div class="empty">No phones yet. Add one to ring a phone during a scene.</div>') +
    '<p class="hint" style="margin:12px 0 0">Works with any SIP phone on the same network, including a Grandstream HT801/HT802 with an old phone plugged in. It keeps working with your normal phone service (like voip.ms). Find the IP address on an HT80x by dialing <b>***</b> then <b>02</b> on the phone. Port <b>5060</b> is its first phone socket, <b>5062</b> the second. In scenes, pick <b>Phone · a phone</b>, then type the message file from Escape Runner\u2019s Media panel. Escape Runner\u2019s Media panel has a <b>Test call</b> button for each phone.</p>' +
  '</section>';
}
function scenesCard(P) {
  const own = sceneOwner();
  return '<section class="card scenes-card"><div class="card-head"><h2>Scenes</h2><span class="sub">Played by Escape Runner across every board.</span>' +
    foldAllBtn('scenes') + '<button class="btn primary' + (foldScope('scenes').length > 1 ? '' : ' end') + '" data-act="add-scene">' + icon('plus', 2) + 'Add scene</button></div>' +
    '<div class="rules">' + (P.scenes.length ? (() => {
      // Story scenes and ambient scenes are numbered separately: SCENE 1, 2, 3 and AMBIENT 1, 2
      let s = 0, a = 0;
      return P.scenes.map((r, i) => renderRule(own, r, i, r.ambient ? 'AMBIENT ' + (++a) : 'SCENE ' + (++s))).join('');
    })() :
      '<div class="empty">No scenes yet. A scene can wait for things on any board, like “Cabinet · Music box senses a magnet”, then control any board: “Balcony · Patio lock: unlock”.</div>') + '</div>' +
    '<p class="hint" style="margin:12px 0 0">Scenes only fire while the game is running. A scene with no conditions waits for the game master to run it. After changing scenes, export the show file again and re-upload the boards whose code changed.</p>' +
  '</section>';
}
function renderEditor() {
  const p = cur();
  const tiles = kind => Object.entries(TYPES).filter(([, t]) => t.kind === kind && !t.hidden).map(([k, t]) =>
    '<button class="tile ' + kind + '" data-act="add-part" data-type="' + k + '"><span class="ic">' + icon(k) + '</span><b>' + (t.tile ? t.tile.label : t.label) + '</b>' + (kind === 'logic' ? '<small>' + t.hint + '</small>' : '') + '</button>').join('');
  const nIn = p.parts.filter(x => isInType(x.type)).length;
  const P = proj(), show = isShow();
  const top = show
    ? '<section class="card"><div class="settings show-settings">' +
        '<label><span class="eyebrow">Show name</span><input class="title-input" id="sname" data-k="sname" value="' + esc(P.name) + '" placeholder="Name this show"></label>' +
        '<label class="narrow"><span class="eyebrow">Game length</span><span class="pair"><input class="field num" type="number" min="1" id="stimer" data-k="stimer" value="' + esc(P.timer) + '"><span class="unit">min</span></span></label>' +
        '<div style="display:grid;gap:6px"><span class="eyebrow">For Escape Runner</span><button class="btn primary" data-act="export-runner">Export show file</button>' + '</div>' +
      '</div></section>' + showWifiCard(P) +
      '<section class="card"><div class="card-head"><h2>Boards</h2><span class="sub">One ESP32 per place. Pick a board to edit its parts and rules.</span>' +
        '<button class="btn end" data-act="add-board">' + icon('plus', 2) + 'Add board</button></div>' +
        '<div class="board-tabs" role="tablist">' + P.boards.map(b => '<button class="board-tab" role="tab" data-act="pick-board" data-bid="' + b.id + '" aria-selected="' + (b.id === p.id) + '">' + esc(b.name || 'Unnamed') + '<small>' + b.parts.length + ' part' + (b.parts.length === 1 ? '' : 's') + '</small></button>').join('') + '</div>' +
        '<div class="board-edit"><label><span class="eyebrow">Board name</span><input class="field" id="pname" data-k="pname" value="' + esc(p.name) + '" placeholder="Balcony"></label>' +
        (P.boards.length > 1 ? (ui.confirmBoard === p.id ? '<button class="btn confirm" data-act="del-board">Delete ' + esc(p.name) + ' and its parts?</button>' : '<button class="btn ghost danger" data-act="del-board">Delete board</button>') : '') +
        '<span class="hint">ESP32 · topic <code>eb/' + esc(slug(p.name)) + '</code></span></div>' +
      '</section>'
    : '<section class="card"><div class="settings">' +
      '<label><span class="eyebrow">Sketch name</span><input class="title-input" id="pname" data-k="pname" value="' + esc(p.name) + '" placeholder="Name this sketch"></label>' +
      '<div style="display:grid;gap:6px"><span class="eyebrow">Board</span><div class="boards" role="group" aria-label="Board">' +
      Object.entries(BOARDS).map(([k, b]) => '<button data-act="board" data-board="' + k + '" aria-pressed="' + (p.board === k) + '" title="' + b.label + '">' + b.short + '</button>').join('') +
      '</div></div></div></section>';
  $('editor').innerHTML = top +
    wifiCard(p) +
    (show ? homekitCard(P) + speakersCard(P) + phonesCard(P) : '') +
    '<section class="card parts-card' + (folded.has('sec:parts') ? ' folded' : '') + '"><div class="card-head">' + foldBtn('sec:parts', 'parts') + '<h2>' + (show ? esc(p.name) + ' · parts' : 'Parts') + '</h2>' +
      (folded.has('sec:parts') ? '<span class="sub">' + p.parts.length + ' part' + (p.parts.length === 1 ? '' : 's') + (p.parts.length ? ': ' + esc(p.parts.map(x => x.name).join(', ')) : '') + '</span>' : '<span class="sub">Tap a part to add it. Pins are picked for you.</span>') + '</div>' +
      '<div class="palette">' +
        '<div class="palette-row in"><span class="eyebrow">Inputs</span><div class="tiles">' + tiles('in') + '</div></div>' +
        '<div class="palette-row out"><span class="eyebrow">Outputs</span><div class="tiles">' + tiles('out') + '</div></div>' +
        '<div class="palette-row logic"><span class="eyebrow">Logic</span><div class="tiles">' + tiles('logic') + '</div></div>' +
      '</div>' +
      '<div class="parts">' + (p.parts.length ? p.parts.map(x => renderPart(p, x)).join('') : '<div class="empty">No parts yet. Tap a part above to add it.' + (show ? '' : '<br><button class="add-link" data-act="example">Or open an example sketch</button>') + '</div>') + '</div>' +
    '</section>' +

    '<section class="card"><div class="card-head"><h2>' + (show ? esc(p.name) + ' · rules' : 'Rules') + '</h2><span class="sub">' + (show ? 'Run on this board. Use Puzzle → tell the show to report to Escape Runner.' : 'When inputs match, outputs react.') + '</span>' +
      foldAllBtn('rules') + '<button class="btn primary' + (foldScope('rules').length > 1 ? '' : ' end') + '" data-act="add-rule">' + icon('plus', 2) + 'Add rule</button></div>' +
      '<div class="rules">' + (p.rules.length ? p.rules.map((r, i) => renderRule(p, r, i)).join('') :
        '<div class="empty">' + (nIn ? 'Add a rule like “When the button is pressed, then unlock the door.”' : 'Add an input and an output, then a rule to connect them.') + '</div>') + '</div>' +
      '<p class="hint" style="margin:12px 0 0">A rule fires the moment its conditions become true. Turn on “Only once” for puzzle solves, so they stay solved until the puzzle resets. Counters and flags let one rule set up another.</p>' +
    '</section>' + (show ? scenesCard(P) : '');
}

const KW = /^(const|int|bool|unsigned|long|void|struct|if|else|return|true|false|for|while|char|byte|float|static|uint32_t|uint16_t|int8_t|String)$/;
function highlight(src) {
  return src.split('\n').map(line => {
    let html = '';
    const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)')|(^#.*$)|\b(0x[0-9A-Fa-f]+|\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b(\s*\()?/g;
    let last = 0, m;
    while ((m = re.exec(line))) {
      html += esc(line.slice(last, m.index));
      if (m[1]) html += '<span class="t-c">' + esc(m[1]) + '</span>';
      else if (m[2]) html += '<span class="t-s">' + esc(m[2]) + '</span>';
      else if (m[3]) html += '<span class="t-p">' + esc(m[3]) + '</span>';
      else if (m[4]) html += '<span class="t-n">' + m[4] + '</span>';
      else if (m[5]) {
        const w = m[5];
        if (KW.test(w)) html += '<span class="t-k">' + w + '</span>';
        else if (/^[A-Z][A-Z0-9_]+$/.test(w)) html += '<span class="t-C">' + w + '</span>';
        else if (m[6]) html += '<span class="t-f">' + w + '</span>';
        else html += w;
        if (m[6]) html += esc(m[6]);
      }
      last = re.lastIndex;
    }
    return '<span class="l">' + html + esc(line.slice(last)) + '</span>';
  }).join('');
}

let lastCode = '';
function renderCode() {
  const p = cur(), show = isShow(), P = proj();
  lastCode = show ? generate(p, P) : generate(p);
  $('code').innerHTML = highlight(lastCode);
  $('filename').textContent = (show ? fileSafe(P.name) + '-' : '') + fileSafe(p.name) + '.ino';
  const c = show ? showChecks(P).concat(checks(p).map(t => p.name + ': ' + t)) : checks(p);
  $('checks').innerHTML = (show ? '<div class="code-boards" role="tablist" aria-label="Board">' + P.boards.map(b => '<button role="tab" data-act="pick-board" data-bid="' + b.id + '" aria-selected="' + (b.id === p.id) + '">' + esc(b.name || 'Unnamed') + '</button>').join('') +
      '<button class="runner-btn" data-act="export-runner">Export show file</button></div>' : '') + (c.length
    ? '<div class="checks">' + c.map(t => '<div>' + icon('warn', 2) + '<span>' + esc(t) + '</span></div>').join('') + '</div>'
    : '<div class="checks ok"><div>' + icon('check', 2.2) + '<span>Ready to upload. Open the Serial Monitor at 115200 baud to see every input, rule and action as it happens.</span></div></div>');
  $('view-dot').className = 'dot' + (c.length ? ' warn' : '');
  const k = kind => p.parts.filter(x => TYPES[x.type].kind === kind).length;
  $('foot').innerHTML = '<span><b>' + lastCode.split('\n').length + '</b> lines</span><span><b>' + k('in') + '</b> inputs</span><span><b>' + k('out') + '</b> outputs</span>' +
    (k('logic') ? '<span><b>' + k('logic') + '</b> logic</span>' : '') + '<span><b>' + p.rules.length + '</b> rules</span><span>' + BOARDS[p.board].label + '</span>';
  renderWiring();
}

// Board drawing with each used pin wired out to its part
const WIRE = { in: '#86AAEA', out: '#E3A452', logic: '#7FD1AE', bus: '#B99CF0' };
function boardDiagram(project) {
  const H = HEADERS[project.board], board = project.board;
  const byPin = {};
  for (const a of assignments(project)) (byPin[a.pin] = byPin[a.pin] || []).push(a);
  const row = 19, top = 64, W = 760, bx1 = 270, bx2 = 490;
  const place = list => { let y = top; return list.map(tok => { if (tok === '|') { y += 10; return null; } const r = { tok, y }; y += row; return r; }).filter(Boolean); };
  const L = place(H.left), R = place(H.right);
  const bottom = Math.max(L.length ? L[L.length - 1].y : 0, R.length ? R[R.length - 1].y : 0) + 22;
  const onHeader = new Set(H.left.concat(H.right));
  // MP3 player wires name the pin they go to on the player: "Cabinet MP3 · MP3 RX"
  const textOf = a => a.part ? a.part.name + (fieldsOf(a.part).length > 1 && a.role ? ' · ' + (roleInfo(a.part, a.role) ? 'MP3 ' + roleInfo(a.part, a.role).pin : roleText(a.part, a.role, true)) : '') : a.users.map(u => u.name).join(', ') + ' · ' + a.role;
  const colorOf = a => a.part ? WIRE[TYPES[a.part.type].kind] : WIRE.bus;
  const trunc = s => s.length > 30 ? s.slice(0, 29) + '…' : s;
  let s = '<svg viewBox="0 0 ' + W + ' ' + (bottom + 16) + '" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, ui-monospace, monospace" role="img" aria-label="Pin diagram for ' + esc(BOARDS[board].label) + '">';
  s += '<rect x="' + bx1 + '" y="20" width="' + (bx2 - bx1) + '" height="' + (bottom - 14) + '" rx="12" fill="#13201B" stroke="#2C3D35"/>';
  s += '<rect x="' + ((bx1 + bx2) / 2 - 22) + '" y="12" width="44" height="18" rx="3" fill="#1E2A25" stroke="#3A4D44"/>';
  s += '<text x="' + ((bx1 + bx2) / 2) + '" y="46" text-anchor="middle" font-size="11" fill="#8FA59B">' + esc(H.name) + '</text>';
  const side = (list, left) => {
    for (const { tok, y } of list) {
      const pin = findPin(board, tok);
      const px = left ? bx1 + 14 : bx2 - 14;
      const used = pin ? byPin[pin.id] : null;
      const power = !pin;
      const label = pin ? pin.label.replace('GPIO ', '') : tok;
      if (used) {
        const col = colorOf(used[0]);
        const ex = left ? bx1 - 26 : bx2 + 26;
        // A resistor that belongs in this wire is drawn on it, just outside the board, with its value
        const res = used.length === 1 && used[0].part && (roleInfo(used[0].part, used[0].role) || {}).resistor;
        const wire = (x1, x2) => '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + col + '" stroke-width="2" stroke-linecap="round"/>';
        if (res) {
          const zw = 16, mx = left ? bx1 - 13 : bx2 + 13, a1 = mx - zw / 2 * (left ? -1 : 1), a2 = mx + zw / 2 * (left ? -1 : 1), pts = [];
          for (let k = 0; k <= 6; k++) pts.push((a1 + (a2 - a1) * k / 6) + ',' + (y + (k === 0 || k === 6 ? 0 : k % 2 ? -4 : 4)));
          s += wire(px, a1) + wire(a2, ex);
          s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#F5E6A8" stroke-width="1.6" stroke-linejoin="round"/>';
          s += '<text x="' + mx + '" y="' + (y - 7) + '" text-anchor="middle" font-size="9" fill="#F5E6A8">' + esc(res) + '</text>';
        } else s += wire(px, ex);
        s += '<circle cx="' + px + '" cy="' + y + '" r="5" fill="' + col + '"/>';
        s += '<text x="' + (left ? ex - 6 : ex + 6) + '" y="' + (y + 4) + '" text-anchor="' + (left ? 'end' : 'start') + '" font-size="12" fill="#E3ECE7">' + esc(trunc(used.map(textOf).join(' + '))) + '</text>';
      } else {
        s += power ? '<rect x="' + (px - 4) + '" y="' + (y - 4) + '" width="8" height="8" rx="1.5" fill="none" stroke="#4A5C54"/>' : '<circle cx="' + px + '" cy="' + y + '" r="4.5" fill="none" stroke="#4A5C54" stroke-width="1.4"/>';
      }
      s += '<text x="' + (left ? px + 12 : px - 12) + '" y="' + (y + 4) + '" text-anchor="' + (left ? 'start' : 'end') + '" font-size="11" fill="' + (used ? '#F5E6A8' : power ? '#61756C' : '#A7B8B0') + '">' + esc(label) + '</text>';
    }
  };
  side(L, true); side(R, false);
  s += '</svg>';
  const off = Object.keys(byPin).filter(id => !onHeader.has(id));
  const extra = off.length ? '<p class="diagram-note">Not on the header drawn above: ' + off.map(id => esc(findPin(board, id) ? findPin(board, id).label : id) + ' (' + esc(byPin[id].map(textOf).join(', ')) + ')').join('; ') + '.</p>' : '';
  return '<div class="diagram">' + s + '</div>' + extra +
    '<div class="legend"><span style="--w:' + WIRE.in + '">Input</span><span style="--w:' + WIRE.out + '">Output</span><span style="--w:' + WIRE.bus + '">Shared bus</span></div>';
}

// A DFPlayer Mini as it looks from above, with the pins to connect coloured and labelled with where they go
function dfPlayerDiagram(project, part) {
  const lab = f => { const x = findPin(project.board, part[f]); return x ? x.label + (x.alias ? ' (' + x.alias + ')' : '') : '?'; };
  const esp = BOARDS[project.board].family === 'esp32';
  const C = { power: '#F07A6A', ground: '#9AA5A0', data: '#E6B450', speaker: '#86AAEA' };
  // Left column top to bottom, then right column top to bottom (pin 16 BUSY down to pin 9 IO1)
  const left = [['VCC', '5V' + (esp ? ' (VIN)' : ''), 'power'], ['RX', lab('pin') + ' via 1 k\u03a9', 'data'], ['TX', lab('pin2'), 'data'], ['DAC_R'], ['DAC_L'],
    ['SPK_1', 'speaker', 'speaker'], ['GND', 'GND', 'ground'], ['SPK_2', 'speaker', 'speaker']];
  const right = [['BUSY'], ['USB-'], ['USB+'], ['ADKEY2'], ['ADKEY1'], ['IO2'], ['GND'], ['IO1']];
  const W = 580, bx1 = 210, bx2 = 400, top = 92, row = 22, H = top + row * 8 + 14;
  let s = '<svg class="df-diagram" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, ui-monospace, monospace" role="img" aria-label="DFPlayer Mini pins">';
  s += '<rect x="' + bx1 + '" y="12" width="' + (bx2 - bx1) + '" height="' + (H - 18) + '" rx="8" fill="#13201B" stroke="#2C3D35"/>';
  s += '<rect x="' + (bx1 + 30) + '" y="20" width="' + (bx2 - bx1 - 60) + '" height="30" rx="4" fill="#1E2A25" stroke="#3A4D44"/>';
  s += '<text x="' + ((bx1 + bx2) / 2) + '" y="39" text-anchor="middle" font-size="10" fill="#8FA59B">microSD card</text>';
  s += '<text x="' + ((bx1 + bx2) / 2) + '" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#B5C5BD">DFPlayer Mini</text>';
  left.forEach(([name, to, kind], i) => {
    const y = top + i * row, on = !!to, c = on ? C[kind] : '#3A4D44';
    s += '<circle cx="' + bx1 + '" cy="' + y + '" r="5" fill="' + c + '"/>';
    s += '<text x="' + (bx1 + 12) + '" y="' + (y + 4) + '" font-size="11" fill="' + (on ? '#E4EDE8' : '#5F7268') + '">' + name + '</text>';
    if (on) {
      s += '<line x1="' + (bx1 - 6) + '" y1="' + y + '" x2="' + (bx1 - 34) + '" y2="' + y + '" stroke="' + c + '" stroke-width="2.5"/>';
      s += '<text x="' + (bx1 - 40) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="' + c + '">' + esc(to) + '</text>';
    }
  });
  right.forEach(([name], i) => {
    const y = top + i * row;
    s += '<circle cx="' + bx2 + '" cy="' + y + '" r="5" fill="#3A4D44"/>';
    s += '<text x="' + (bx2 - 12) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="#5F7268">' + name + '</text>';
  });
  s += '<text x="' + (bx2 + 14) + '" y="' + (top + 5 * row + 4) + '" font-size="10.5" fill="#8FA59B">IO2: touch to GND to test</text>';
  return s + '</svg>';
}
function renderWiring() {
  const p = cur();
  const esp = BOARDS[p.board].family === 'esp32';
  const hw = p.parts.filter(x => TYPES[x.type].kind !== 'logic');
  $('wiring').innerHTML =
    '<p class="intro">Power the board over USB while testing. All grounds must connect: board GND, relay modules, and any separate supplies. ' + (esp ? '<b>ESP32 pins are 3.3 V</b>, so never feed 5 V into an input.' : '') + '</p>' +
    (esp && (isShow() || p.parts.some(x => TYPES[x.type].esp32Only)) ? '<div class="tip ota">' + icon('mqttin', 2) + '<span><b>Upload over Wi-Fi.</b> Upload by USB once. After that, with your computer on the same Wi-Fi, pick <code>' + esc(isShow() ? 'eb-' + slug(p.name) : slug(wifiOf(p).id)) + '</code> under <i>Tools \u2192 Port \u2192 Network ports</i> in the Arduino IDE and press Upload as usual. Set an <b>Upload password</b> in the Wi-Fi card so nobody else on the network can change your props.</span></div>' : '') +
    (hw.length ? boardDiagram(p) + hw.map(x => {
      const { steps, tips } = wiringFor(p, x);
      return '<div class="wire-card ' + TYPES[x.type].kind + '"><h3>' + esc(x.name) + ' <code>' + esc(pinLabel(p, x)) + '</code><span>' + (x.type === 'dimmer' && optsOf(x).motor ? 'DC motor' : TYPES[x.type].label) + '</span></h3>' +
        (x.type === 'dfplayer' ? dfPlayerDiagram(p, x) : '') +
        '<ul>' + steps.map(st => '<li>' + esc(st) + '</li>').join('') + '</ul>' +
        tips.map(t => '<div class="tip">' + esc(t) + '</div>').join('') + '</div>';
    }).join('') : '<p class="intro">Add parts to see how to wire them.</p>');
}

function renderAll() {
  const a = document.activeElement, fid = a && a.id;
  if (isShow()) { for (const b of proj().boards) migrate(b); migrate(sceneOwner()); } else migrate(cur());
  ensureIds();
  histFor(proj());
  renderProjects(); renderEditor(); renderCode();
  markNew();
  if (fid && $(fid) && fid !== 'copybuf') $(fid).focus();
  if (reduceMotion) drawStrips(0);
}

// Only parts and rules that just appeared get the "added" pop. Redrawing after an edit
// (pressing Enter, picking from a menu) leaves everything still, so nothing flashes.
function markNew() {
  const ctx = proj().id + '/' + cur().id, now = new Set();
  document.querySelectorAll('#editor .part[data-pid], #editor .rule[data-rule-id]').forEach(el => {
    const k = el.dataset.pid || el.dataset.ruleId;
    now.add(k);
    if (markNew.ctx === ctx && markNew.seen && !markNew.seen.has(k)) el.classList.add('new');
  });
  markNew.seen = now;
  markNew.ctx = ctx;   // switching sketch or board isn't "adding", so nothing pops then either
}

// ───────────────────────── Actions ─────────────────────────
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200); }
function uniqueName(p, base) {
  let name = base, n = 2;
  while (p.parts.some(x => x.name === name)) name = base + ' ' + n++;
  return name;
}
function nextName(p, type) {
  const base = TYPES[type].label;
  let n = p.parts.filter(x => x.type === type).length + 1, name = base + ' ' + n;
  while (p.parts.some(x => x.name === name)) name = base + ' ' + ++n;
  return name;
}
// Sensible starting values for a condition
function condDefaults(project, part, cond) {
  const adcMax = BOARDS[project.board].adcMax;
  switch (part.type) {
    case 'analog': return cond === 'between' ? { value: Math.round(adcMax * 0.4), value2: Math.round(adcMax * 0.6) } : { value: Math.round(adcMax / 2) };
    case 'encoder': { const st = Math.max(2, int(optsOf(part).steps, 20)); return cond === 'between' ? { value: Math.round(st / 4), value2: Math.round(st / 2) } : { value: Math.round(st / 2) }; }
    case 'keypad': return cond === 'code' ? { value: '1234' } : cond === 'key' ? { value: '1' } : {};
    case 'rfid': return cond === 'tag' ? { value: '' } : {};
    case 'counter': return { value: 3 };
    case 'clock': return cond === 'under' ? { value: 10 } : {};
    case 'mqttin': return cond === 'msg' ? { value: 'reset' } : {};
  }
  return {};
}
function defaultCond(p) {
  const part = p.parts.find(x => isInType(x.type));
  if (!part) return { id: uid(), part: '', cond: 'active' };
  const cond = TYPES[part.type].conds[0][0];
  return { id: uid(), part: part.id, cond, ...condDefaults(p, part, cond) };
}
function defaultAct(p, partId) {
  const part = partId === '__sys' ? null : p.parts.find(x => x.id === partId) || p.parts.find(x => TYPES[x.type].kind === 'out');
  if (!part) return p.isScenes ? { id: uid(), part: '__sys', action: 'note', value: PARAM.note.def } : { id: uid(), part: '__sys', action: 'message', value: PARAM.message.def };
  const a = withActDefaults({ id: uid(), part: part.id, action: TYPES[part.type].acts[0][0] });
  if (part.type === 'strip') a.segs = defaultSegs(part);
  return a;
}
// Old single-effect strip steps become editable sections
function migrate(p) {
  // Relays and maglocks used to default to "Relay switches on LOW", which left them inverted on HIGH-switching hardware:
  // flip each existing one once; after that its checkbox is the user's again
  for (const part of p.parts) if ((part.type === 'maglock' || part.type === 'relay') && !(part.opts || {}).lowFixed) part.opts = { ...optsOf(part), activeLow: false, lowFixed: true };
  for (const r of p.rules) for (const a of r.then) if (Array.isArray(a.segs)) for (const sg of a.segs) if (sg.color && sg.color.toLowerCase() !== ledHex(sg.color)) sg.color = ledHex(sg.color);
  // "any of these" rules become a row of "or"s
  for (const r of p.rules) if (r.match === 'any') { r.when.forEach((c, k) => { if (k) c.join = 'or'; }); r.match = 'all'; }
  for (const r of p.rules) for (const a of r.then) {
    const part = p.parts.find(x => x.id === a.part);
    if (part && part.type === 'strip' && a.action !== 'off' && (a.action !== 'scene' || !Array.isArray(a.segs) || !a.segs.length)) {
      a.segs = sectionsOf(a, Math.max(1, int(optsOf(part).count, 30))).map(x => ({ ...x }));
      a.action = 'scene';
    }
  }
}
// Scene conditions and steps need lasting ids: boards and Escape Runner refer to them
function ensureIds() {
  const P = proj(), lists = isShow() ? P.boards.map(b => b.rules).concat([P.scenes]) : [P.rules];
  let added = false;
  for (const rules of lists) for (const r of rules) for (const x of r.when.concat(r.then)) if (!x.id) { x.id = uid(); added = true; }
  if (added) { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} queueCloud(P.id); }
}
function withActDefaults(a) {
  const P = PARAM[a.action];
  a.value = P ? P.def : undefined;
  a.value2 = undefined; a.value3 = undefined;
  for (const X of (P && P.extras) || []) a[X.key] = X.def;
  return a;
}
function findRule(rid) { return ownerOf(rid).rules.find(r => r.id === rid); }
// Re-render, then animate: the new copy slides out from under the original, the rest move down to make room
function flipRender(sel, key, newKey, srcKey) {
  const before = new Map();
  document.querySelectorAll(sel).forEach(el => before.set(el.dataset[key], el.getBoundingClientRect()));
  renderAll();
  if (reduceMotion || !Element.prototype.animate) return;
  const ease = 'cubic-bezier(.2, .8, .25, 1)';
  document.querySelectorAll(sel).forEach(el => {
    const k = el.dataset[key], now = el.getBoundingClientRect();
    if (k === newKey) {
      const src = before.get(srcKey);
      if (!src) return;
      el.style.zIndex = 2;
      el.animate([
        { transform: 'translateY(' + (src.top - now.top) + 'px) scale(1)', opacity: .9, boxShadow: '0 0 0 2px var(--accent)' },
        { transform: 'translateY(' + (src.top - now.top + 10) + 'px) scale(1.015)', opacity: 1, boxShadow: '0 14px 30px -10px rgb(0 0 0 / .35), 0 0 0 2px var(--accent)', offset: .3 },
        { transform: 'none', opacity: 1, boxShadow: '0 0 0 2px var(--accent)', offset: .85 },
        { transform: 'none', boxShadow: '0 0 0 0 transparent' }
      ], { duration: 650, easing: ease }).onfinish = () => { el.style.zIndex = ''; };
    } else if (before.has(k)) {
      const dy = before.get(k).top - now.top;
      if (Math.abs(dy) > 1) el.animate([{ transform: 'translateY(' + dy + 'px)' }, { transform: 'none' }], { duration: 450, easing: ease, delay: 60 });
    }
  });
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b || b.disabled) return;
  const act = b.dataset.act, p = b.dataset.rid && b.dataset.rid !== 'parts' ? ownerOf(b.dataset.rid) : cur();
  if (act !== 'del-project' && ui.confirmDelete) { ui.confirmDelete = false; renderProjects(); }
  if (act !== 'del-board' && ui.confirmBoard) ui.confirmBoard = null;
  switch (act) {
    case 'new-show': {
      const np = blankShow();
      S.projects.push(np); S.current = np.id; save(false); queueCloud(np.id); renderAll();
      $('sname').select(); toast('New show. Add a board for each place, then scenes.'); return;
    }
    case 'add-board': {
      const P = proj();
      let n = P.boards.length + 1; while (P.boards.some(x => x.name === 'Board ' + n)) n++;
      const nb = newBoard('Board ' + n);
      P.boards.push(nb); P.active = nb.id;
      save(); renderAll(); $('pname').select(); return;
    }
    case 'pick-board': proj().active = b.dataset.bid; save(false); renderAll(); return;
    case 'del-board': {
      if (ui.confirmBoard !== p.id) { ui.confirmBoard = p.id; renderAll(); return; }
      const P = proj();
      ui.confirmBoard = null;
      P.boards = P.boards.filter(x => x.id !== p.id); P.active = P.boards[0].id;
      save(); renderAll(); toast('Deleted ' + p.name); return;
    }
    case 'add-scene': {
      const own = sceneOwner();
      proj().scenes.push({ id: uid(), name: '', once: true, when: [defaultCond(own)], then: [defaultAct(own)] });
      save(); renderAll(); return;
    }
    case 'export-runner': exportRunner(); return;
    case 'add-hk': {
      const P = proj(), list = P.homekit || (P.homekit = []);
      let n = list.length + 1; while (list.some(x => x.name === 'Switch ' + n)) n++;
      const sw = { id: uid(), name: 'Switch ' + n };
      list.push(sw); save(); renderAll();
      const el = $('hk-' + sw.id); if (el) el.select();
      return;
    }
    case 'add-spk': {
      const P = proj(), list = P.speakers || (P.speakers = []);
      let n = 1; while (list.some(x => x.id === 'speaker' + n)) n++;
      const sp = { id: 'speaker' + n, name: 'Speaker ' + n };
      list.push(sp); save(); renderAll();
      const el = $('spk-' + sp.id); if (el) el.select();
      return;
    }
    case 'del-spk': { const P = proj(); P.speakers = (P.speakers || []).filter(x => x.id !== b.dataset.sid); save(); renderAll(); return; }
    case 'add-phone': {
      const P = proj(), list = P.phones || (P.phones = []);
      let n = 1; while (list.some(x => x.id === 'phone' + n)) n++;
      const ph = { id: 'phone' + n, name: n === 1 ? 'Phone' : 'Phone ' + n, address: '', port: 5060 };
      list.push(ph); save(); renderAll();
      const el = $('ph-' + ph.id); if (el) el.select();
      return;
    }
    case 'del-phone': { const P = proj(); P.phones = phonesOf(P).filter(x => x.id !== b.dataset.pid); save(); renderAll(); return; }
    case 'del-hk': { const P = proj(); P.homekit = (P.homekit || []).filter(x => x.id !== b.dataset.hid); save(); renderAll(); return; }
    case 'add-part': {
      const type = b.dataset.type;
      const part = { id: uid(), type, name: type === 'servo' ? uniqueName(p, 'Motor ' + (p.parts.filter(isMotor).length + 1)) : nextName(p, type), opts: defaultOpts(type) };
      // Messages out go to room1/<prop>; commands in arrive on room1/<prop>/cmd, so a prop never hears itself
      if (TYPES[type].esp32Only) part.opts.topic = 'room1/' + slug(p.name) + (type === 'mqttin' ? '/cmd' : '');
      p.parts.push(part);
      assignPins(p, part);
      const moved = freeBusPins(p);
      save(); renderAll();
      const el = $('n-' + part.id);
      if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      toast(part.name + ' added' + (isWired(p, part) ? (fieldsOf(part).length ? ' on ' + pinLabel(p, part) : '') : ' (no free pins left)') +
        (moved.length ? '. Moved ' + moved.map(x => x.name).join(', ') + ' off the ' + BUSES[TYPES[type].bus].label + ' pins' : ''));
      return;
    }
    case 'type-menu': ui.typeMenu = ui.typeMenu === b.dataset.id ? null : b.dataset.id; renderAll(); return;
    case 'set-type': {
      const part = p.parts.find(x => x.id === b.dataset.id);
      ui.typeMenu = null;
      if (!part || part.type === b.dataset.type) { renderAll(); return; }
      const label = TYPES[b.dataset.type].tile ? TYPES[b.dataset.type].tile.label : TYPES[b.dataset.type].label;
      const n = changePartType(p, part, b.dataset.type);
      save(); renderAll();
      toast('Changed to ' + label + (n ? '. ' + n + ' rule step' + (n === 1 ? ' was' : 's were') + ' updated' : ''));
      return;
    }
    case 'dup-part': {
      const src = p.parts.find(x => x.id === b.dataset.id);
      const np = JSON.parse(JSON.stringify(src));
      np.id = uid(); np.name = uniqueName(p, src.name + ' copy');
      for (const k of PIN_KEYS) np[k] = '';
      p.parts.splice(p.parts.indexOf(src) + 1, 0, np);
      assignPins(p, np);
      save(); flipRender('.part', 'pid', np.id, src.id); toast('Duplicated as ' + np.name);
      return;
    }
    case 'del-part':
      p.parts = p.parts.filter(x => x.id !== b.dataset.id);
      save(); renderAll(); return;
    case 'board': {
      const nb = b.dataset.board;
      if (nb === p.board) return;
      p.board = nb;
      const keep = new Set();
      for (const part of p.parts) for (const [f, , need] of fieldsOf(part)) {
        const pin = findPin(nb, part[f]);
        if (pin && pinFits(pin, need, nb) && !keep.has(part[f])) keep.add(part[f]); else part[f] = '';
      }
      for (const part of p.parts) assignPins(p, part);
      freeBusPins(p);
      for (const r of p.rules) for (const c of r.when) {
        const part = p.parts.find(x => x.id === c.part);
        if (part && part.type === 'analog') { c.value = Math.min(num(c.value, 0), BOARDS[nb].adcMax); if (c.value2 != null) c.value2 = Math.min(num(c.value2, 0), BOARDS[nb].adcMax); }
      }
      save(); renderAll(); toast('Pins reassigned for ' + BOARDS[nb].label); return;
    }
    case 'add-rule':
      p.rules.push({ id: uid(), name: '', once: true, when: [defaultCond(p)], then: [defaultAct(p)] });
      save(); renderAll(); return;
    case 'fold': { const id = b.dataset.fid; if (folded.has(id)) folded.delete(id); else folded.add(id); saveFolded(); renderAll(); return; }
    case 'fold-all': {
      const ids = foldScope(b.dataset.scope);
      for (const id of ids) { if (b.dataset.open === '1') folded.delete(id); else folded.add(id); }
      saveFolded(); renderAll(); return;
    }
    case 'dup-rule': {
      const src = findRule(b.dataset.rid);
      const nr = JSON.parse(JSON.stringify(src));
      nr.id = uid(); nr.name = (src.name || 'Rule ' + (p.rules.indexOf(src) + 1)) + ' copy';
      p.rules.splice(p.rules.indexOf(src) + 1, 0, nr);
      save(); flipRender('.rule', 'ruleId', nr.id, src.id); toast('Rule duplicated'); return;
    }
    case 'del-rule': {
      const i = p.rules.findIndex(r => r.id === b.dataset.rid);
      if (i >= 0) p.rules.splice(i, 1);
      save(); renderAll(); return;
    }
    case 'add-cond': findRule(b.dataset.rid).when.push(defaultCond(p)); save(); renderAll(); return;
    case 'add-act': findRule(b.dataset.rid).then.push(defaultAct(p)); save(); renderAll(); return;
    case 'pick-color': if (picker && picker.rid === b.dataset.rid && picker.j === +b.dataset.j && picker.s === +b.dataset.s) closePicker(); else openPicker(b); return;
    case 'preset': Object.assign(picker, hexToHW(b.dataset.c)); setPicked(b.dataset.c); return;
    case 'picker-done': closePicker(); return;
    case 'add-seg': {
      const a = findRule(b.dataset.rid).then[+b.dataset.j], part = p.parts.find(x => x.id === a.part);
      const count = Math.max(1, int(optsOf(part).count, 30)), last = a.segs[a.segs.length - 1];
      let from, to;
      if (!last) { from = 1; to = count; }
      else if (int(last.to, count) >= count && int(last.to, count) > int(last.from, 1)) {
        // The last section runs to the end: split it in half
        const lf = int(last.from, 1), mid = Math.floor((lf + count) / 2);
        last.to = mid; from = mid + 1; to = count;
      } else { from = Math.min(count, int(last.to, count) + 1); to = Math.min(count, from + 4); }
      a.segs.push({ from, to, color: SEG_COLORS[a.segs.length % SEG_COLORS.length], fx: 'solid', spd: 5 });
      save(); renderAll(); return;
    }
    case 'del-seg': findRule(b.dataset.rid).then[+b.dataset.j].segs.splice(+b.dataset.s, 1); save(); renderAll(); return;
    case 'add-wait': findRule(b.dataset.rid).then.push({ id: uid(), part: '__sys', action: 'wait', value: 3 }); save(); renderAll(); return;
    case 'del-cond': findRule(b.dataset.rid).when.splice(+b.dataset.j, 1); save(); renderAll(); return;
    case 'del-act': findRule(b.dataset.rid).then.splice(+b.dataset.j, 1); save(); renderAll(); return;
    case 'undo': undoRedo(-1); return;
    case 'redo': undoRedo(1); return;
    case 'view': setView(b.dataset.view); return;
    case 'tab':
      ui.tab = b.dataset.tab;
      $('tab-code').setAttribute('aria-selected', ui.tab === 'code');
      $('tab-wiring').setAttribute('aria-selected', ui.tab === 'wiring');
      $('code').hidden = ui.tab !== 'code';
      $('wiring').hidden = ui.tab !== 'wiring';
      $('code-scroll').scrollTop = 0;
      return;
    case 'save-ino':
      saveFile($('filename').textContent, lastCode, 'Sketch saved. Double-click it to open it in the Arduino IDE.');
      return;
    case 'copy': {
      const done = () => toast('Copied. Paste it into a new Arduino sketch.');
      const fallback = () => {
        const ta = $('copybuf'); ta.value = lastCode; ta.select();
        let ok = false; try { ok = document.execCommand('copy'); } catch (err) {}
        if (ok) done(); else {
          const r = document.createRange(); r.selectNodeContents($('code'));
          const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
          toast('Code selected. Press ⌘C or Ctrl+C to copy.');
        }
      };
      try { navigator.clipboard.writeText(lastCode).then(done, fallback); } catch (err) { fallback(); }
      return;
    }
    case 'new-project': {
      const np = blankProject(isShow() ? 'esp32' : p.board);
      S.projects.push(np); S.current = np.id; save(false); renderAll();
      $('pname').select(); return;
    }
    case 'dup-project': {
      const src = proj(), np = JSON.parse(JSON.stringify(src)); np.id = uid(); np.name = (src.name || 'Sketch') + ' copy';
      S.projects.push(np); S.current = np.id; save(false); queueCloud(np.id); renderAll(); toast('Duplicated'); return;
    }
    case 'del-project':
      if (!ui.confirmDelete) { ui.confirmDelete = true; renderProjects(); clearTimeout(ui.t); ui.t = setTimeout(() => { ui.confirmDelete = false; renderProjects(); }, 4000); return; }
      ui.confirmDelete = false;
      { const gone = proj();
        S.projects = S.projects.filter(x => x.id !== gone.id);
        if (cloud.col) { cloud.dirty.add(gone.id); flushCloud(); }
        if (!S.projects.length) S.projects.push(blankProject('esp32'));
        S.current = S.projects[0].id; save(false); renderAll(); toast('Deleted ' + (gone.name || 'sketch')); return; }
    case 'export': exportProject(); return;
    case 'import': $('importfile').click(); return;
    case 'example': {
      const ex = sampleProject(); ex.name = 'Example: Séance Table';
      S.projects.push(ex); S.current = ex.id; save(false); queueCloud(ex.id); renderAll(); toast('Example opened'); return;
    }
  }
});

// Refresh LED strip length labels without rebuilding the form
function refreshMeta() {
  for (const part of cur().parts) { const el = $('meta-' + part.id); if (el) el.outerHTML = stripMeta(part); }
}

// Typing: update state and code without rebuilding the form, so focus stays put.
document.addEventListener('input', e => {
  const el = e.target, k = el.dataset.k, p = cur();
  if (!k) return;
  const rule = () => findRule(el.dataset.rid);
  if (k === 'pname') {
    p.name = el.value;
    if (isShow()) { const t = document.querySelector('.board-tab[aria-selected="true"]'); if (t && t.firstChild) t.firstChild.textContent = el.value || 'Unnamed'; }
    else { const o = document.querySelector('#proj option[value="' + p.id + '"]'); if (o) o.textContent = el.value || 'Untitled sketch'; }
  }
  else if (k === 'sname') { proj().name = el.value; const o = document.querySelector('#proj option[value="' + proj().id + '"]'); if (o) o.textContent = 'Show: ' + (el.value || 'Untitled show'); }
  else if (k === 'stimer') proj().timer = el.value;
  else if (k === 'hk-name') { const sw = (proj().homekit || []).find(x => x.id === el.dataset.hid); if (sw) sw.name = el.value; }
  else if (k === 'part-name') {
    const part = p.parts.find(x => x.id === el.dataset.id); part.name = el.value;
    document.querySelectorAll('#editor option[value="' + part.id + '"]').forEach(o => { o.textContent = el.value; });
  }
  else if (k === 'rule-name') rule().name = el.value;
  else if (k === 'rule-repeat') rule().repeat = el.value;
  else if (k === 'rule-timeout') rule().timeout = el.value;
  else if (k === 'cond-value') rule().when[+el.dataset.j].value = el.value;
  else if (k === 'cond-value2') rule().when[+el.dataset.j].value2 = el.value;
  else if (k === 'cond-hold') rule().when[+el.dataset.j].hold = el.value;
  else if (k === 'act-value') { rule().then[+el.dataset.j].value = el.value; refreshDot(el, rule().then[+el.dataset.j]); }
  else if (k === 'act-value2' || k === 'act-value3') { rule().then[+el.dataset.j][k.slice(4)] = el.value; refreshDot(el, rule().then[+el.dataset.j]); }
  else if (k === 'act-m') rule().then[+el.dataset.j][el.dataset.f] = el.value;
  else if (k === 'ph-name' || k === 'ph-addr' || k === 'ph-port') {
    const ph = phonesOf(proj()).find(x => x.id === el.dataset.pid);
    if (ph && k === 'ph-name') ph.name = el.value;
    else if (ph && k === 'ph-addr') ph.address = el.value.trim();
    else if (ph) ph.port = Math.round(num(el.value, 5060));
  }
  else if (k === 'spk-name') { const sp = (proj().speakers || []).find(x => x.id === el.dataset.sid); if (sp) sp.name = el.value; }
  else if (/^seg-(from|to|color|dur|on|off|onS|offS|spd|head|full|bri)$/.test(k)) {
    const sg = rule().then[+el.dataset.j].segs[+el.dataset.s];
    sg[k.slice(4)] = el.value;
  }
  else if (k === 'wifi') { const W = isShow() ? proj() : p; W.wifi = { ...wifiOf(W), [el.dataset.f]: el.value }; }
  else if (k === 'opt-num' || k === 'opt-text') { const part = p.parts.find(x => x.id === el.dataset.id); part.opts = { ...optsOf(part), [el.dataset.opt]: el.value }; }
  else return;
  save(true, el.id); renderCode(); refreshMeta(); renderProjects();
});

document.addEventListener('change', e => {
  const el = e.target, k = el.dataset.k, p = el.dataset.rid ? ownerOf(el.dataset.rid) : cur();
  if (!k) return;
  if ((k === 'pname' && isShow()) || k === 'hk-name' || k === 'spk-name' || k === 'ph-name') { renderAll(); return; }   // new board name in the tabs and pickers
  if (k === 'project') { S.current = el.value; ui.confirmDelete = false; save(false); renderAll(); return; }
  if (k === 'part-name' || k === 'opt-num' || k === 'rule-repeat') { renderAll(); return; }   // refresh labels and limits
  const rule = () => findRule(el.dataset.rid);
  if (k === 'part-pin') p.parts.find(x => x.id === el.dataset.id)[el.dataset.field || 'pin'] = el.value;
  else if (k === 'opt') { const part = p.parts.find(x => x.id === el.dataset.id); part.opts = { ...optsOf(part), [el.dataset.opt]: el.checked }; }
  else if (k === 'motor-type') {
    const part = p.parts.find(x => x.id === el.dataset.id), v = el.value;
    if (v === 'servo') convertPart(p, part, 'servo', {});
    else if (v === 'dc') convertPart(p, part, 'dimmer', { motor: true });
    else if (v === 'l298n') convertPart(p, part, 'hbridge', {});
    else convertPart(p, part, 'stepper', v === 'nema17' ? { driver: 'a4988', stepsPerRev: 200, rpm: 60 } : { driver: 'uln2003', stepsPerRev: 2048, rpm: 10 });
  }
  else if (k === 'screen-type') {
    const part = p.parts.find(x => x.id === el.dataset.id), wasClock = part.type === 'clock';
    if (el.value === 'clock') {
      if (!wasClock) { part.type = 'clock'; part.opts = defaultOpts('clock'); assignPins(p, part); }
    } else {
      if (wasClock) { part.type = 'screen'; part.pin = ''; part.pin2 = ''; part.opts = defaultOpts('screen'); freeBusPins(p); }
      part.opts = { ...optsOf(part), model: el.value };
    }
    if (wasClock !== (el.value === 'clock')) {
      // Steps that used the old kind of screen get sensible new ones
      for (const r of p.rules) {
        r.then = r.then.map(a => a.part === part.id && !TYPES[part.type].acts.some(x => x[0] === a.action) ? defaultAct(p, part.id) : a);
        r.when = r.when.filter(c => c.part !== part.id || (TYPES[part.type].conds || []).some(x => x[0] === c.cond));
      }
    }
  }
  else if (k === 'opt-sel') {
    const part = p.parts.find(x => x.id === el.dataset.id);
    part.opts = { ...optsOf(part), [el.dataset.opt]: el.dataset.opt === 'density' ? +el.value : el.value };
    if (part.type === 'keypad') { if (el.value === '4x3') part.pin8 = ''; assignPins(p, part); }
    if (part.type === 'stepper' && el.dataset.opt === 'driver') {
      // Swap in typical numbers for the new motor, and the pins its driver needs
      part.opts = { ...part.opts, ...(el.value === 'a4988' ? { stepsPerRev: 200, rpm: 60 } : { stepsPerRev: 2048, rpm: 10 }) };
      if (el.value === 'a4988') { part.pin3 = ''; part.pin4 = ''; }
      assignPins(p, part);
    }
  }
  else if (k === 'rule-once') rule().once = el.checked;
  else if (k === 'rule-while') rule().whileTrue = el.checked;
  else if (k === 'rule-loop') { rule().loop = el.checked; if (el.checked && !p.isScenes) rule().once = false; }   // a rule that starts over can't also be once-only
  else if (k === 'rule-ambient') rule().ambient = el.checked;
  else if (k === 'cond-holdon') { const c = rule().when[+el.dataset.j]; c.holdOn = el.checked; c.hold = el.checked ? (num(c.hold, 0) > 0 ? c.hold : 1) : ''; }
  else if (k === 'hk-reset') { const sw = (proj().homekit || []).find(x => x.id === el.dataset.hid); if (sw) sw.resetOn = el.checked; }
  else if (k === 'rule-match') { const r = rule(); r.match = el.value; if (r.match === 'some' && r.need == null) r.need = Math.max(1, r.when.length - 1); }
  else if (k === 'rule-need') rule().need = Math.round(num(el.value, 2));
  else if (k === 'cond-join') rule().when[+el.dataset.j].join = el.value;
  else if (k === 'cond-part') {
    const old = rule().when[+el.dataset.j], keep = { id: old.id || uid(), join: old.join };
    if (isStartPart(el.value)) rule().when[+el.dataset.j] = { ...keep, part: el.value, cond: 'start' };
    else if (isBtnPart(el.value)) rule().when[+el.dataset.j] = { ...keep, part: el.value, cond: 'press', value: old.cond === 'press' ? old.value : 'TV started' };
    else if (isHkPart(el.value)) rule().when[+el.dataset.j] = { ...keep, part: el.value, cond: 'on' };
    else if (isEvPart(el.value)) rule().when[+el.dataset.j] = { ...keep, part: el.value, cond: 'event', value: old.cond === 'event' ? old.value : 'solved' };
    else {
      const part = p.parts.find(x => x.id === el.value);
      const cond = TYPES[part.type].conds[0][0];
      rule().when[+el.dataset.j] = { ...keep, part: el.value, cond, ...condDefaults(p, part, cond) };
    }
  }
  else if (k === 'cond-cond') {
    const c = rule().when[+el.dataset.j], part = p.parts.find(x => x.id === c.part);
    const keepHold = c.hold;
    Object.assign(c, { cond: el.value, value: undefined, value2: undefined }, condDefaults(p, part, el.value));
    if (keepHold) c.hold = keepHold;
  }
  else if (k === 'act-part') {
    const old = rule().then[+el.dataset.j], id = old.id || uid();
    rule().then[+el.dataset.j] = isHkPart(el.value) ? { id, part: el.value, action: 'hkpulse' } : isSpkPart(el.value) ? { id, part: el.value, action: 'sndplay', file: '' } : isTvPart(el.value) ? { id, part: el.value, action: 'vidplay', file: '' } : isPhonePart(el.value) ? { id, part: el.value, action: 'call', file: '', ring: 30 } : el.value === '__sys' ? (p.isScenes ? { id, part: '__sys', action: 'wait', value: 3 } : { id, part: '__sys', action: 'message', value: PARAM.message.def }) : { ...defaultAct(p, el.value), id };
  }
  else if (k === 'act-mc') {
    const a = rule().then[+el.dataset.j];
    if (el.dataset.f === 'lightOn') {
      a.lights = lightIdsOf(a); delete a.lightning; a.lightOn = el.checked;
      // the only light in the show is ticked for you
      const all = proj().boards.flatMap(b => b.parts).filter(canFlash);
      if (el.checked && !a.lights.length && all.length === 1) a.lights = [all[0].id];
    } else a[el.dataset.f] = el.type === 'checkbox' ? el.checked : el.value;
  }
  else if (k === 'act-light') {
    const a = rule().then[+el.dataset.j], ids = lightIdsOf(a).filter(x => x !== el.dataset.pid);
    if (el.checked) ids.push(el.dataset.pid);
    a.lights = ids; delete a.lightning;
  }
  else if (k === 'act-action') {
    const a = rule().then[+el.dataset.j]; a.action = el.value; withActDefaults(a);
    const part = p.parts.find(x => x.id === a.part);
    if (part && part.type === 'strip' && el.value === 'scene') a.segs = defaultSegs(part);
  }
  else if (k === 'seg-fx') { const sg = rule().then[+el.dataset.j].segs[+el.dataset.s]; sg.fx = el.value; if (sg.spd == null) sg.spd = speedOf(sg); }
  else if (k === 'seg-dir') rule().then[+el.dataset.j].segs[+el.dataset.s].dir = el.value;
  else return;
  save(); renderAll();
});

// ⌘Z / Ctrl+Z undo, ⇧⌘Z / Ctrl+Y redo (text boxes keep their own undo)
document.addEventListener('keydown', e => {
  if (!(e.metaKey || e.ctrlKey) || e.altKey) return;
  const key = e.key.toLowerCase();
  if (key !== 'z' && key !== 'y') return;
  const t = e.target;
  if (t && (t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && /^(text|number|search)$/.test(t.type)))) return;
  e.preventDefault();
  undoRedo(key === 'y' || e.shiftKey ? 1 : -1);
});

// ───────────────────────── Drag to reorder ─────────────────────────
function moveItem(rid, kind, from, to, aIdx) {
  const list = kind === 'part' ? cur().parts : kind === 'rule' ? cur().rules : kind === 'scene' ? proj().scenes
    : kind === 'seg' ? findRule(rid).then[+aIdx].segs : findRule(rid)[kind === 'cond' ? 'when' : 'then'];
  if (to < 0 || to >= list.length || to === from) return false;
  const ranges = kind === 'seg' ? list.map(s => [s.from, s.to]) : null;
  const [it] = list.splice(from, 1);
  list.splice(to, 0, it);
  // Sections: the LED ranges stay where they were; colours and effects move between them
  if (ranges) list.forEach((s, k) => { s.from = ranges[k][0]; s.to = ranges[k][1]; });
  save(); return true;
}
// The dragged step follows the pointer; the others slide aside to show where it will land.
let drag = null;
document.addEventListener('pointerdown', e => {
  const h = e.target.closest('.grip');
  if (!h || e.button > 0 || drag) return;
  e.preventDefault();
  const row = h.closest('[data-drag]'), box = row.parentElement;
  const rows = [...box.children], rects = rows.map(r => r.getBoundingClientRect());
  const from = rows.indexOf(row);
  const gap = rows.length > 1 ? rects[1].top - rects[0].bottom : 8;
  drag = { h, row, box, rows, rects, from, to: from, size: rects[from].height + gap, startY: e.clientY, kind: h.dataset.kind, rid: h.dataset.rid, a: h.dataset.a, id: e.pointerId };
  try { h.setPointerCapture(e.pointerId); } catch (err) {}
  box.classList.add('sorting');
  row.classList.add('dragging');
  document.body.classList.add('is-dragging');
});
document.addEventListener('pointermove', e => {
  if (!drag || drag.done || e.pointerId !== drag.id) return;
  const { rows, rects, from, row, size } = drag;
  const last = rects.length - 1;
  const dy = Math.max(rects[0].top - rects[from].top - 6, Math.min(rects[last].bottom - rects[from].bottom + 6, e.clientY - drag.startY));
  row.style.transform = 'translateY(' + dy + 'px)';
  const center = rects[from].top + rects[from].height / 2 + dy;
  let to = from;
  rects.forEach((b, i) => {
    const mid = b.top + b.height / 2;
    if (i < from && center < mid) to = Math.min(to, i);
    if (i > from && center > mid) to = Math.max(to, i);
  });
  drag.to = to;
  rows.forEach((r, i) => {
    if (i === from) return;
    const shift = (i > from && i <= to) ? -size : (i < from && i >= to) ? size : 0;
    r.style.transform = shift ? 'translateY(' + shift + 'px)' : '';
  });
});
function endDrag(e) {
  if (!drag || drag.done || e.pointerId !== drag.id) return;
  const d = drag; d.done = true;
  const { rects, from, to, row } = d;
  const final = to > from ? rects[to].bottom - rects[from].bottom : to < from ? rects[to].top - rects[from].top : 0;
  row.classList.add('settling');
  row.style.transform = 'translateY(' + final + 'px)';
  setTimeout(() => {
    drag = null;
    document.body.classList.remove('is-dragging');
    if (!moveItem(d.rid, d.kind, from, to, d.a)) {
      d.box.classList.remove('sorting');
      d.rows.forEach(r => { r.style.transform = ''; r.classList.remove('dragging', 'settling'); });
      return;
    }
    renderAll();
  }, 190);
}
document.addEventListener('pointerup', endDrag);
document.addEventListener('pointercancel', endDrag);
document.addEventListener('keydown', e => {
  const h = e.target.closest && e.target.closest('.grip');
  if (!h || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
  e.preventDefault();
  const j = +h.dataset.j, to = j + (e.key === 'ArrowUp' ? -1 : 1);
  if (!moveItem(h.dataset.rid, h.dataset.kind, j, to, h.dataset.a)) return;
  renderAll();
  const g = $(h.id.replace(/-\d+$/, '-' + to));
  if (g) g.focus();
});

document.body.insertAdjacentHTML('beforeend', '<div id="picker" class="picker" role="dialog" aria-label="Pick an LED colour" hidden></div>');
$('importfile').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (f) importFile(f); e.target.value = ''; });
renderAll();
requestAnimationFrame(drawStrips);
// Typing a speed or time updates that row's preview dot straight away (the row isn't redrawn while you type)
function refreshDot(el, a) {
  const row = el.closest('.row'), d = row && row.querySelector('.lt-dot');
  if (!d) return;
  d.dataset.speed = a.value;
  d.dataset.on = a.value2 == null ? 0.3 : a.value2;
  d.dataset.off = a.value3 == null ? 0.3 : a.value3;
  d.dataset.times = a.forever ? 0 : a.value;
}
// Flicker / blink preview dots: the same timing as the code on the board
const dotState = new WeakMap();
function animateDots(now) {
  for (const d of document.querySelectorAll('.lt-dot')) {
    let st = dotState.get(d);
    const key = d.dataset.fx + d.dataset.speed + d.dataset.varied + d.dataset.on + d.dataset.off + d.dataset.times;
    if (!st || st.key !== key) { st = { key, on: true, level: 1, next: now, count: 0 }; dotState.set(d, st); }
    if (now >= st.next) {
      if (d.dataset.fx === 'flick') {
        const ms = flickMs(d.dataset.speed), rnd = (lo, hi) => lo + Math.random() * (hi - lo);
        if (d.dataset.varied === '1') { st.level = rnd(0.15, 1); st.next = now + rnd(ms / 2, ms * 1.5); }
        else { st.on = !st.on; st.level = st.on ? 1 : 0; st.next = now + (st.on ? rnd(ms, ms * 3) : rnd(ms / 4, ms)); }
      } else {   // blink: on, off ... then (unless forever) a pause before showing it again
        const times = int(d.dataset.times, 0), onMs = num(d.dataset.on, 0.3) * 1000, offMs = num(d.dataset.off, 0.3) * 1000;
        if (times && st.count >= times * 2) { st.count = 0; st.level = 0; st.next = now + 1200; }
        else { st.level = st.count % 2 ? 0 : 1; st.next = now + (st.count % 2 ? offMs : onMs); st.count++; }
      }
      d.style.setProperty('--lv', st.level.toFixed(2));
    }
  }
  if (!reduceMotion) requestAnimationFrame(animateDots);
}
requestAnimationFrame(animateDots);
setView(location.hash === '#code' ? 'code' : 'build');
initCloud();
