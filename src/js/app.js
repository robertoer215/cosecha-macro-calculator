import { ING, SIZES, OBJ_LABEL, CATS, CAT_LABEL, IMG_DIR } from './data.js';
import { precio, mac, calcularMeta, metaManualComida, metaManualTotal,
         porcionar, explicarCambio, proponerCierre, UMBRAL_G } from './calc.js';

let meta = {}, selBase = {}, szBase = {}, selExtra = {}, szExtra = {};

// ── MODO IA ──────────────────────────────────────────────────────────────────
// El usuario sigue eligiendo QUÉ comer, en el mismo orden y con las mismas
// tarjetas. Lo único que deja de preguntársele es CUÁNTO: el tamaño lo resuelve
// porcionar() sobre TODOS los módulos a la vez, y se recalcula en cada toque.
//
//   szManual  overrides que el usuario fijó a mano desde "Ajustar". Son los
//             únicos tamaños que el porcionador no puede mover: se clavan y el
//             resto se optimiza a su alrededor.
//   szBase    caché de los tamaños VIGENTES (los que devolvió el porcionado, o
//             el override). El resumen, el QR y el ticket lo leen tal cual, así
//             que nada aguas abajo tuvo que enterarse del cambio.
let szManual = {}, ajustando = {}, ultimoPorc = null, porque = null, idsRecalc = [];
let modoActual = 'calc';
let subModoActual = 'comida';
let platoCatIdx = 0;

const CATS_STEPS = ['proteina', 'carbohidrato', 'vegetal', 'grasa'];
const STEP_LABELS = {proteina:'Proteína', carbohidrato:'Carbohidrato', vegetal:'Vegetal', grasa:'Grasa saludable'};

const $ = id => document.getElementById(id);

// Foto del ingrediente. Las fotos son cuadradas y los contenedores no siempre:
// `foco` recentra el recorte en los platos que no están al centro de su imagen.
// Van con loading="lazy" porque el paso 2 sólo muestra una categoría a la vez.
function foto(it, cls) {
  if (!it.img) return '';
  const pos = it.foco ? ` style="object-position:${it.foco}"` : '';
  return `<img class="${cls}" src="${IMG_DIR}${it.img}" alt="${it.nombre}" loading="lazy" decoding="async" width="600" height="600"${pos}>`;
}

window.aceptarTerminos = function() {
  const btn = $('terms-btn');
  const accepted = btn.classList.toggle('accepted');
  $('terms-icon').textContent = accepted ? '●' : '○';
  $('terms-btn-txt').textContent = accepted ? 'Aceptado' : 'Entendido, acepto continuar';
  $('btn-calcular').disabled = !accepted;
};

window.setMode = function(modo) {
  modoActual = modo;
  $('formula-form').style.display = modo === 'calc' ? 'block' : 'none';
  $('manual-form').style.display  = modo === 'manual' ? 'block' : 'none';
  $('mt-calc').classList.toggle('mt-active', modo === 'calc');
  $('mt-manual').classList.toggle('mt-active', modo === 'manual');
  if (modo === 'manual') {
    $('btn-calcular').disabled = false;
  } else {
    const aceptado = $('terms-btn') && $('terms-btn').classList.contains('accepted');
    $('btn-calcular').disabled = !aceptado;
  }
};

window.setSubMode = function(sub) {
  subModoActual = sub;
  $('sub-comida').style.display = sub === 'comida' ? 'block' : 'none';
  $('sub-total').style.display  = sub === 'total'  ? 'block' : 'none';
  $('st-comida').classList.toggle('st-active', sub === 'comida');
  $('st-total').classList.toggle('st-active', sub === 'total');
};

window.selObj = el => { document.querySelectorAll('.obj-card').forEach(c=>c.classList.remove('selected')); el.classList.add('selected'); };
window.selAct = el => { document.querySelectorAll('.act-card').forEach(c=>c.classList.remove('selected')); el.classList.add('selected'); };

// Lee un input numérico validando contra los min/max declarados en el HTML.
// Devuelve null si está vacío, no es número o está fuera de rango (el 0 sí es válido si min lo permite).
function numCampo(id) {
  const el = $(id), v = String(el.value).trim();
  if (v === '') return null;
  const n = +v;
  if (!Number.isFinite(n)) return null;
  if (el.min !== '' && n < +el.min) return null;
  if (el.max !== '' && n > +el.max) return null;
  return n;
}

window.calcular = function() {
  if (modoActual === 'manual') {
    if (subModoActual === 'comida') {
      const prot = numCampo('mc-prot'), carb = numCampo('mc-carb'), gras = numCampo('mc-gras');
      if (prot === null || carb === null || gras === null) { alert('Revisa los campos de macros: completa los tres con valores dentro de rango (el 0 es válido).'); return; }
      meta = metaManualComida({ prot, carb, gras });
    } else {
      const comidas = +$('m-comidas').value;
      const kcalTotal = numCampo('m-kcal'), protTotal = numCampo('m-prot'), carbTotal = numCampo('m-carb'), grasTotal = numCampo('m-gras');
      if (kcalTotal === null || protTotal === null || carbTotal === null || grasTotal === null) { alert('Revisa los campos: completa todos con valores dentro de rango (el 0 es válido en macros).'); return; }
      meta = metaManualTotal({ protTotal, carbTotal, grasTotal, comidas });
    }
  } else {
    const edad = numCampo('edad'), peso = numCampo('peso'), altura = numCampo('altura');
    if (edad === null || peso === null || altura === null) { alert('Revisa edad, peso y altura: deben estar dentro de los rangos indicados.'); return; }
    meta = calcularMeta({
      sexo: $('sexo').value,
      edad, peso, altura,
      comidas: +$('comidas').value,
      objetivo: document.querySelector('.obj-card.selected').dataset.o,
      actividad: document.querySelector('.act-card.selected').dataset.a
    });
  }
  selBase = {}; szBase = {}; selExtra = {}; szExtra = {};
  szManual = {}; ajustando = {}; ultimoPorc = null; porque = null; idsRecalc = [];
  platoCatIdx = 0;
  renderMeta();
  renderBase();
  updateGlobalTracker();
  goStep(1);
};

// Los módulos elegidos, en el orden en que el usuario los fue eligiendo por
// pasos. El orden importa: es el que ve en pantalla y el que sale en el ticket.
function itemsElegidos() {
  const out = [];
  CATS_STEPS.forEach(cat => (selBase[cat] || []).forEach(id => {
    const it = ING.find(i => i.id === id);
    if (it) out.push(it);
  }));
  return out;
}

// Los extras del paso 5 son parte del plato: cuentan en la barra de macros y en
// el resumen, así que TIENEN que contar en el porcionado. Si no, la tarjeta
// afirma "Cierra tu meta" mientras la barra justo encima marca 90/71 g.
function extrasElegidos() {
  return Object.keys(selExtra)
    .filter(id => selExtra[id])
    .map(id => ING.find(i => i.id === id))
    .filter(Boolean);
}

// El plato completo: los módulos base y los extras ya agregados.
function itemsPlato() { return [...itemsElegidos(), ...extrasElegidos()]; }

// Solo los overrides de módulos que siguen en el plato: si el usuario ajusta un
// módulo a mano y luego lo quita, ese tamaño no debe seguir atando al resto.
// Los extras van siempre clavados: su tamaño lo eligió el usuario en el paso 5
// y el porcionador no debe moverlo por su cuenta.
function fijosVigentes(items) {
  const f = {};
  items.forEach(it => {
    if (selExtra[it.id]) f[it.id] = szExtra[it.id] ?? 1;
    else if (szManual[it.id] != null) f[it.id] = szManual[it.id];
  });
  return f;
}

// Corre en LOCAL, en cada toque, sin red: son 81 o 243 combinaciones de
// aritmética entera, del orden de décimas de milisegundo.
function recalcular(manual = []) {
  const items = itemsPlato();
  const antes = ultimoPorc;
  if (!items.length) { ultimoPorc = null; szBase = {}; porque = null; idsRecalc = []; return null; }
  const r = porcionar(items, meta, { fijos: fijosVigentes(items) });
  // El porqué se deriva del diff de tamaños, nunca de un modelo de lenguaje, y
  // excluye lo que acaba de mover el usuario: la app no firma acciones ajenas.
  porque = explicarCambio(antes, r, items, meta, { manual });
  idsRecalc = porque ? porque.ids : [];
  ultimoPorc = r;
  // szBase solo cachea los módulos BASE; el tamaño de los extras lo manda szExtra.
  szBase = {};
  Object.keys(r.tamanos).forEach(id => { if (!selExtra[id]) szBase[id] = r.tamanos[id]; });
  return r;
}

// A3 · Qué pasaría si tocaras ESTA tarjeta. El mismo porcionado, con el módulo
// candidato añadido de forma hipotética.
// El orden importa de verdad: porcionar() enumera las combinaciones en el orden
// de `items` y conserva la primera cuando dos empatan en coste y precio. Si la
// tarjeta simulase el plato en otro orden que el que resulta al tocarla, podría
// prometer 100 g y $12 y entregar 150 g y $18. Se simula con el mismo recorrido.
function itemsConCandidato(cand) {
  const out = [];
  CATS_STEPS.forEach(cat => {
    const ids = [...(selBase[cat] || [])];
    if (cand.cat === cat && !ids.includes(cand.id)) ids.push(cand.id);
    ids.forEach(id => { const it = ING.find(i => i.id === id); if (it) out.push(it); });
  });
  return [...out, ...extrasElegidos()];
}

function hipotetico(it) {
  const items = itemsConCandidato(it);
  return porcionar(items, meta, { fijos: fijosVigentes(items) });
}

const MACRO_CORTO = { prot: 'proteína', carb: 'carbos', gras: 'grasas' };

// "¿Qué tan cerca me deja?" — el macro que quedaría MÁS lejos de la meta, que es
// el que de verdad limita el plato. Si los tres caben en el umbral, lo dice.
function textoCercania(r) {
  if (!r) return { txt: '', cierra: false };
  if (r.dentroDeUmbral) return { txt: 'Cierra tu meta', cierra: true };
  let k = 'prot', peor = -1;
  for (const m of ['prot', 'carb', 'gras']) {
    const d = Math.abs(r.desviacion[m]);
    if (d > peor) { peor = d; k = m; }
  }
  const v = r.desviacion[k];
  const n = Math.abs(Math.round(v * 10) / 10);
  return { txt: `Te deja ${v < 0 ? '−' : '+'}${n} g ${MACRO_CORTO[k]}`, cierra: false };
}

function totals() {
  let p=0,c=0,g=0,k=0;
  CATS.forEach(cat => {
    (selBase[cat]||[]).forEach(id => {
      const it=ING.find(i=>i.id===id); const m=mac(it,szBase[id]||1);
      p+=m.prot; c+=m.carb; g+=m.gras; k+=m.kcal;
    });
  });
  Object.keys(selExtra).forEach(id => {
    if(selExtra[id]){ const it=ING.find(i=>i.id===id); const m=mac(it,szExtra[id]||1); p+=m.prot;c+=m.carb;g+=m.gras;k+=m.kcal; }
  });
  return {prot:Math.round(p),carb:Math.round(c),gras:Math.round(g*10)/10,kcal:Math.round(k)};
}

function updateGlobalTracker() {
  if(meta.kcal===undefined) return; // 0 es una meta válida (manual): el tracker debe refrescarse igual
  const t = totals();
  const pp=Math.min(100,Math.round(t.prot/(meta.prot||1)*100));
  const cp=Math.min(100,Math.round(t.carb/(meta.carb||1)*100));
  const gp=Math.min(100,Math.round(t.gras/(meta.gras||1)*100));
  $('gt-kcal').textContent=`${t.kcal} / ${meta.kcal} kcal`;
  $('gtv-p').textContent=`${t.prot}/${meta.prot}g`;
  $('gtv-c').textContent=`${t.carb}/${meta.carb}g`;
  $('gtv-g').textContent=`${t.gras}/${meta.gras}g`;
  const bp=$('gtb-p'),bc=$('gtb-c'),bg=$('gtb-g');
  // scaleX en vez de width: sin reflow y sin animar una dimensión (ver .bar-fill)
  bp.style.transform=`scaleX(${pp/100})`;bc.style.transform=`scaleX(${cp/100})`;bg.style.transform=`scaleX(${gp/100})`;
  bp.className='bar-fill bp'+(t.prot>meta.prot?' bover':'');
  bc.className='bar-fill bc'+(t.carb>meta.carb?' bover':'');
  bg.className='bar-fill bg2'+(t.gras>meta.gras?' bover':'');
  $('global-tracker').classList.add('visible');
  renderPorque();
}

function renderMeta() {
  $('meta-panel').innerHTML=`
  <div class="meta-panel">
    <div class="meta-top">
      <div><div class="meta-ey">Meta por comida</div><div class="meta-ctx">${meta.comidas} comidas · ${meta.objetivo === 'manual' ? 'Macros personalizados' : OBJ_LABEL[meta.objetivo]}</div></div>
      <div class="meta-tag">${meta.kcal} kcal</div>
    </div>
    <div class="meta-nums">
      <div class="mn"><div class="mn-val">${meta.prot}<span class="mn-unit">g</span></div><div class="mn-lbl p">Proteína</div></div>
      <div class="mn"><div class="mn-val">${meta.carb}<span class="mn-unit">g</span></div><div class="mn-lbl c">Carbos</div></div>
      <div class="mn"><div class="mn-val">${meta.gras}<span class="mn-unit">g</span></div><div class="mn-lbl g">Grasas</div></div>
      <div class="mn"><div class="mn-val">${meta.kcal}<span class="mn-unit" style="font-size:9px">cal</span></div><div class="mn-lbl k">Energía</div></div>
    </div>
    ${meta.ajusteCarb ? `<div class="meta-warn">Con tu perfil, la proteína y grasa objetivo cubren prácticamente todas tus calorías del día, así que tu meta de carbohidratos por comida quedó en 0 g. Te recomendamos validar tu plan con un especialista.</div>` : ''}
  </div>`;
}

function renderSubNav() {
  const dots = CATS_STEPS.map((c,i) => {
    const done = i < platoCatIdx;
    const active = i === platoCatIdx;
    return `<div class="psn-dot${active?' psn-active':done?' psn-done':''}">${done?'✓':(i+1)}</div>`;
  }).join('<div class="psn-line"></div>');
  const extraActive = platoCatIdx === 4;
  const extraDot = `<div class="psn-line"></div><div class="psn-dot${extraActive?' psn-active':''}">5</div>`;
  const lbl = platoCatIdx < 4 ? STEP_LABELS[CATS_STEPS[platoCatIdx]] : 'Extras sugeridos';
  return `<div class="plato-subnav">
    <div class="psn-steps">${dots}${extraDot}</div>
    <div class="psn-lbl">${lbl}</div>
  </div>`;
}

function renderBase() {
  $('base-mods').innerHTML = '';
  $('sugg-wrap').innerHTML = '';

  if (platoCatIdx === 4) {
    $('base-mods').innerHTML = renderSubNav();
    renderSugg();
    renderPlatoButtons();
    updateGlobalTracker();
    return;
  }

  const cat = CATS_STEPS[platoCatIdx];
  const items = ING.filter(i => i.cat === cat);
  const selCount = (selBase[cat]||[]).length;

  let html = renderSubNav();
  html += `<div class="cat-sec"><div class="cat-hd"><span class="cat-nm">${CAT_LABEL[cat]}</span><span class="cat-ht">Elige uno o más${selCount ? ` · ${selCount} elegido${selCount>1?'s':''}` : ''}</span></div><div class="items-grid">`;
  items.forEach(it => { html += tarjetaHTML(it, cat); });
  html += `</div></div><div id="cierre-wrap"></div>`;
  $('base-mods').innerHTML = html;
  renderCierre();
  renderPlatoButtons();
  updateGlobalTracker();
}

// ── FASE B · LA PROPUESTA DE CIERRE ──────────────────────────────────────────
// El cuello de botella del modo IA no es el algoritmo, es el inventario: el
// techo de carbohidratos con un solo módulo en Grande son 57 g contra una meta
// media de 96 g por comida, y a 1.346 de 1.600 perfiles (84%) no le alcanza
// ninguno por sí solo. La app ya soportaba varios módulos por categoría
// (selBase[cat] es un arreglo) y porcionar() los maneja sin cambios.
//
// No se impone: se propone, con lo que aporta y lo que cuesta, y acepta el
// usuario tocando "Añadir" —que es exactamente lo mismo que tocar la tarjeta.
function renderCierre() {
  const wrap = $('cierre-wrap');
  if (!wrap) return;
  const cat = CATS_STEPS[platoCatIdx];
  const elegidos = itemsElegidos();

  // Solo donde el inventario se queda corto de verdad, y solo con al menos un
  // módulo de la categoría ya elegido: si no, esto sería la carta otra vez.
  if (cat !== 'carbohidrato' || !(selBase[cat] || []).length) { wrap.innerHTML = ''; return; }

  const candidatos = ING.filter(i => i.cat === 'carbohidrato');
  const p = proponerCierre(elegidos, meta, candidatos, { fijos: fijosVigentes(elegidos) });
  if (!p) { wrap.innerHTML = ''; return; }

  const actual = ultimoPorc ? ultimoPorc.desviacion : null;
  const falta = actual ? Math.abs(Math.round(actual[p.macro] * 10) / 10) : null;
  const verbo = actual && actual[p.macro] > 0 ? 'Te sobran' : 'Te faltan';
  const lbl = SIZES.find(s => s.k === p.tamano)?.l || 'Estándar';
  const quedaria = Math.abs(Math.round(p.desviacion[p.macro] * 10) / 10);
  const aportaG = p.macro === 'gras' ? p.aporta.gras : p.aporta[p.macro];

  wrap.innerHTML = `<div class="sugg-box">
    <div class="sugg-hd"><span class="sugg-badge">Cierre sugerido</span>
      <span class="sugg-desc">${falta !== null ? `${verbo} ${falta} g de ${MACRO_CORTO[p.macro]}` : 'Para acercarte a tu meta'}</span></div>
    <div class="sugg-item">
      <div class="sugg-thumb">${foto(p.it, 'sugg-img')}</div>
      <div class="sugg-main">
        <div class="sugg-macro-tag">Segundo ${CAT_LABEL[p.it.cat].toLowerCase()}</div>
        <div class="sugg-name">${p.it.nombre}</div>
        <div class="sugg-why">${lbl} · ${p.g} g · aporta ${aportaG} g de ${MACRO_CORTO[p.macro]}. Te dejaría a ${quedaria} g de tu meta${p.dentroDeUmbral ? ', dentro del umbral' : ''}.</div>
        <div class="sugg-controls">
          <div class="sugg-price">${p.deltaPrecio >= 0 ? '+' : '−'}$${Math.abs(p.deltaPrecio)}</div>
          <button class="btn-add off" onclick="event.stopPropagation();selBI('${p.it.id}','${p.it.cat}')">+ Añadir</button>
        </div>
      </div>
    </div>
  </div>`;
}

// La tarjeta ya no pregunta "¿cuánto?" sino "¿qué tan cerca me deja?".
// El tamaño que enseña es el que se aplicará al tocarla: elegida, el resuelto;
// sin elegir, el que tendría si entrara al plato.
function tarjetaHTML(it, cat) {
  const isSel = (selBase[cat]||[]).includes(it.id);
  const r = isSel ? ultimoPorc : hipotetico(it);
  const sz = isSel ? (szBase[it.id] ?? 1) : (r ? r.tamanos[it.id] : 1);
  const m = mac(it, sz), pr = precio(it, sz);
  const lbl = SIZES.find(s => s.k === sz)?.l || 'Estándar';
  const fit = isSel ? { txt:'', cierra:false } : textoCercania(r);
  const abierto = !!ajustando[it.id];

  return `<div class="icard${isSel?' sel':''}${abierto?' ajustando':''}${idsRecalc.includes(it.id)?' recalc':''}" data-id="${it.id}" onclick="selBI('${it.id}','${cat}')">
      <div class="i-photo">${foto(it,'i-img')}<div class="i-check"></div></div>
      <div class="i-body">
        <div class="i-top"><div class="i-name">${it.nombre}</div></div>
        <div class="i-macros"><div class="mp"><b>${m.prot}g</b> P</div><div class="mp"><b>${m.carb}g</b> C</div><div class="mp"><b>${m.gras}g</b> G</div></div>
        <div class="i-price">$${pr} MXN</div>
        <div class="i-fit${fit.cierra?' cierra':''}">${fit.txt}</div>
        <div class="i-foot">
          <div class="i-size-val">${lbl} · ${m.g} g</div>
          <button type="button" class="btn-ajustar" aria-expanded="${abierto}" aria-controls="pills-${it.id}"
            aria-label="Ajustar el tamaño de ${it.nombre}"
            onclick="event.stopPropagation();toggleAjuste('${it.id}')">Ajustar</button>
        </div>
        <div class="size-pills" id="pills-${it.id}" role="group" aria-label="Tamaño de ${it.nombre}">${SIZES.map(sv=>{
          const esResuelto = ultimoPorc && ultimoPorc.tamanos[it.id] === sv.k && szManual[it.id] == null;
          // role="button" promete teclado: Enter y Espacio tienen que funcionar, o
          // el foco entra en un callejón sin salida (WCAG 2.1.1). aria-pressed dice
          // cuál está activo a quien no ve el relleno negro.
          return `<div class="sz-pill${sz===sv.k?' sz-on':''}${esResuelto?' sz-rec':''}" role="button" tabindex="0"
            aria-pressed="${sz===sv.k}" aria-label="${sv.l}, ${mac(it,sv.k).g} gramos"
            onclick="event.stopPropagation();setSzB('${it.id}','${cat}',${sv.k})"
            onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();setSzB('${it.id}','${cat}',${sv.k});}">${sv.l}${esResuelto?'<span class="rec-lbl">Resuelto</span>':''}</div>`;
        }).join('')}</div>
      </div>
    </div>`;
}

// Actualiza las tarjetas que YA están en el DOM en vez de reconstruir el HTML.
// Dos razones: la transition de opacity solo existe si el nodo sobrevive al
// cambio (con innerHTML nuevo no hay nada que transicionar), y así las fotos no
// se vuelven a decodificar en cada toque.
function refrescarTarjetas() {
  const cat = CATS_STEPS[platoCatIdx];
  if (platoCatIdx === 4) { renderBase(); return; }
  // El contador del encabezado también se actualiza en sitio: si no, se queda
  // congelado en el valor que tenía al entrar al paso.
  const ht = document.querySelector('.cat-ht');
  const n = (selBase[cat]||[]).length;
  if (ht) ht.textContent = `Elige uno o más${n ? ` · ${n} elegido${n>1?'s':''}` : ''}`;
  document.querySelectorAll('.icard[data-id]').forEach(card => {
    const id = card.dataset.id;
    const it = ING.find(i => i.id === id);
    if (!it) return;
    const isSel = (selBase[cat]||[]).includes(id);
    const r = isSel ? ultimoPorc : hipotetico(it);
    const sz = isSel ? (szBase[id] ?? 1) : (r ? r.tamanos[id] : 1);
    const m = mac(it, sz), pr = precio(it, sz);
    const lbl = SIZES.find(s => s.k === sz)?.l || 'Estándar';
    const fit = isSel ? { txt:'', cierra:false } : textoCercania(r);

    card.classList.toggle('sel', isSel);
    card.classList.toggle('ajustando', !!ajustando[id]);
    setTexto(card.querySelector('.i-price'), `$${pr} MXN`);
    setTexto(card.querySelector('.i-size-val'), `${lbl} · ${m.g} g`);
    const elFit = card.querySelector('.i-fit');
    setTexto(elFit, fit.txt);
    if (elFit) elFit.classList.toggle('cierra', fit.cierra);
    card.querySelectorAll('.mp').forEach((el,i) => {
      setTexto(el, `<b>${[m.prot,m.carb,m.gras][i]}g</b> ${['P','C','G'][i]}`, true);
    });
    card.querySelectorAll('.sz-pill').forEach((pill,i) => {
      const k = SIZES[i].k;
      const esResuelto = ultimoPorc && ultimoPorc.tamanos[id] === k && szManual[id] == null;
      pill.classList.toggle('sz-on', sz === k);
      pill.classList.toggle('sz-rec', esResuelto);
      pill.setAttribute('aria-pressed', String(sz === k));
      const lblRec = pill.querySelector('.rec-lbl');
      if (esResuelto && !lblRec) pill.insertAdjacentHTML('beforeend', '<span class="rec-lbl">Resuelto</span>');
      if (!esResuelto && lblRec) lblRec.remove();
    });
    const btn = card.querySelector('.btn-ajustar');
    if (btn) btn.setAttribute('aria-expanded', String(!!ajustando[id]));
    // A4 · pulso del borde solo en las tarjetas que de verdad cambiaron de tamaño.
    card.classList.remove('recalc');
    if (idsRecalc.includes(id)) { void card.offsetWidth; card.classList.add('recalc'); }
  });
  renderCierre();
  renderPorque();
  updateGlobalTracker();
}

// Crossfade de la cifra: el texto nuevo se escribe YA (el feedback tiene que
// verse en menos de 100 ms) y lo que se difumina es su opacidad. Solo se toca
// lo que de verdad cambió, para no hacer parpadear media pantalla.
function setTexto(el, valor, esHTML) {
  if (!el) return;
  const actual = esHTML ? el.innerHTML : el.textContent;
  if (actual === valor) return;
  if (esHTML) el.innerHTML = valor; else el.textContent = valor;
  el.style.opacity = '0';
  requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; }));
}

// A5 · La línea de porqué, bajo la barra de macros.
function renderPorque() {
  const el = $('porque');
  if (!el) return;
  el.innerHTML = porque ? `<span>${porque.texto}</span>` : '';
}

function renderPlatoButtons() {
  const isFirst = platoCatIdx === 0;
  const isLast = platoCatIdx === 4;
  $('plato-btn-row').innerHTML = `
    ${isFirst
      ? `<button class="btn btn-ghost" onclick="goStep(0)">← Perfil</button>`
      : `<button class="btn btn-ghost" onclick="prevCat()">← Anterior</button>`}
    ${isLast
      ? `<button class="btn btn-main" onclick="goResumen()">Ver resumen</button>`
      : `<button class="btn btn-main" onclick="nextCat()">Siguiente →</button>`}
  `;
}

// Cambiar de paso no reajusta nada: arrastrar la frase y el pulso a la pantalla
// siguiente (o al resumen, o al perfil) sería afirmar un reajuste que no acaba
// de ocurrir. Se limpian al navegar.
function olvidarPorque(){ porque = null; idsRecalc = []; }

window.nextCat = function() {
  platoCatIdx = Math.min(platoCatIdx + 1, 4);
  olvidarPorque();
  renderBase();
  window.scrollTo({top:0,behavior:'smooth'});
};
window.prevCat = function() {
  platoCatIdx = Math.max(platoCatIdx - 1, 0);
  olvidarPorque();
  renderBase();
  window.scrollTo({top:0,behavior:'smooth'});
};

window.selBI = function(id,cat) {
  if(!selBase[cat]) selBase[cat]=[];
  const idx=selBase[cat].indexOf(id);
  if(idx>-1){
    selBase[cat].splice(idx,1);
    if(!selBase[cat].length) delete selBase[cat];
    // Al salir del plato el módulo pierde su override y su panel abierto: si
    // vuelve a entrar, vuelve a entrar como una decisión del sistema.
    delete szManual[id]; delete ajustando[id];
  } else {
    selBase[cat].push(id);
  }
  // El tamaño ya no se pregunta: se resuelve, para TODOS los módulos a la vez.
  recalcular();
  refrescarTarjetas();
};

// "Ajustar" — revelación progresiva. Quien no lo toque nunca sabrá que existe.
window.toggleAjuste = function(id){
  ajustando[id] = !ajustando[id];
  const card = document.querySelector(`.icard[data-id="${id}"]`);
  if(!card) return;
  card.classList.toggle('ajustando', ajustando[id]);
  const btn = card.querySelector('.btn-ajustar');
  if(btn) btn.setAttribute('aria-expanded', String(!!ajustando[id]));
};

// Fijar un tamaño a mano lo CLAVA: el porcionado deja de moverlo y optimiza el
// resto a su alrededor, en vez de ignorar el override o sacar el módulo de la
// cuenta. Volver a tocar el tamaño resuelto devuelve el módulo al automático.
window.setSzB = function(id,cat,k){
  if(szManual[id] === k) delete szManual[id];
  else szManual[id] = k;
  // Se le dice a recalcular() QUIÉN movió este tamaño, para que la línea de
  // porqué no se atribuya la acción del usuario.
  recalcular([id]);
  refrescarTarjetas();
};

function renderSugg() {
  if(!Object.keys(selBase).length){
    $('sugg-wrap').innerHTML=`<div class="sugg-box"><div class="sugg-ok"><div class="sugg-ok-lbl" style="padding:1.25rem;font-size:12px;font-family:Inter,sans-serif;color:var(--muted)">Selecciona ingredientes en los pasos anteriores para ver sugerencias.</div></div></div>`;
    return;
  }
  const t=totals();
  // gG se normaliza a 1 decimal: t.gras trae decimales binarios (13.3) y la resta
  // directa imprimiría artefactos tipo "6.699999999999999g" en pantalla.
  const gP=meta.prot-t.prot,gC=meta.carb-t.carb,gG=Math.round((meta.gras-t.gras)*10)/10;
  const suggs=[];
  if(gP>8){const b=ING.filter(i=>i.cat==='proteina'&&!(selBase.proteina||[]).includes(i.id)).sort((a,b2)=>b2.prot-a.prot)[0];if(b)suggs.push({it:b,why:`Faltan ~${gP}g de proteína para alcanzar tu meta.`,m:'Proteína'});}
  if(gC>10){const b=ING.filter(i=>i.cat==='carbohidrato'&&!(selBase.carbohidrato||[]).includes(i.id)).sort((a,b2)=>b2.carb-a.carb)[0];if(b)suggs.push({it:b,why:`Faltan ~${gC}g de carbohidratos para energía sostenida.`,m:'Carbohidrato'});}
  if(gG>5){const b=ING.filter(i=>i.cat==='grasa'&&!(selBase.grasa||[]).includes(i.id)).sort((a,b2)=>b2.gras-a.gras)[0];if(b)suggs.push({it:b,why:`Faltan ~${gG}g de grasas saludables.`,m:'Grasa'});}
  if(!suggs.length){
    $('sugg-wrap').innerHTML=`<div class="sugg-box"><div class="sugg-ok"><div class="sugg-ok-mark">✓</div><div class="sugg-ok-lbl">Tu plato ya cubre tu meta nutricional.</div></div></div>`;
    return;
  }
  let items='';
  suggs.slice(0,2).forEach(s=>{
    const sz=szExtra[s.it.id]||1,isOn=!!selExtra[s.it.id];
    const pr=precio(s.it,sz);
    items+=`<div class="sugg-item">
      <div class="sugg-thumb">${foto(s.it,'sugg-img')}</div>
      <div class="sugg-main">
        <div class="sugg-macro-tag">${s.m}</div>
        <div class="sugg-name">${s.it.nombre}</div>
        <div class="sugg-why">${s.why}</div>
        <div class="sugg-controls">
          <div class="sugg-sizes">${SIZES.map(sv=>`<div class="ss-pill${sz===sv.k?' ss-on':''}" onclick="setSzE('${s.it.id}',${sv.k})">${sv.l}</div>`).join('')}</div>
          <div class="sugg-price">$${pr}</div>
          <button class="btn-add ${isOn?'on':'off'}" onclick="toggleE('${s.it.id}')">${isOn?'Quitar':'+ Agregar'}</button>
        </div>
      </div>
    </div>`;
  });
  $('sugg-wrap').innerHTML=`<div class="sugg-box"><div class="sugg-hd"><span class="sugg-badge">Extras sugeridos</span><span class="sugg-desc">Para alcanzar tu meta de macros</span></div>${items}</div>`;
}

window.setSzE = function(id,k){ szExtra[id]=k; recalcular([id]); renderSugg(); updateGlobalTracker(); };
window.toggleE = function(id){ if(selExtra[id])delete selExtra[id]; else{selExtra[id]=true;if(!szExtra[id])szExtra[id]=1;} recalcular([id]); renderSugg(); updateGlobalTracker(); };

function buildQRText() {
  const lines=['COSECHA — ORDEN DE COCINA',''];
  const ts=new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'});
  lines.push('Hora: '+ts,'Objetivo: '+(meta.objetivo==='manual'?'Macros personalizados':OBJ_LABEL[meta.objetivo]),'','--- PORCIONES ---');
  CATS.forEach(cat=>{ (selBase[cat]||[]).forEach(id=>{ const it=ING.find(i=>i.id===id);const sz=szBase[id]||1,m=mac(it,sz);lines.push(it.nombre+' ('+SIZES.find(s=>s.k===sz).l+'): '+m.g+'g'); }); });
  Object.keys(selExtra).forEach(id=>{ const it=ING.find(i=>i.id===id);const sz=szExtra[id]||1,m=mac(it,sz);lines.push('[EXTRA] '+it.nombre+' ('+SIZES.find(s=>s.k===sz).l+'): '+m.g+'g'); });
  const t=totals();
  lines.push('','--- MACROS TOTALES ---','Proteina: '+t.prot+'g | Carbos: '+t.carb+'g | Grasas: '+t.gras+'g | Kcal: '+t.kcal);
  return lines.join('\n');
}

function buildQRInstructions() {
  const inst=[];
  CATS.forEach(cat=>{ (selBase[cat]||[]).forEach(id=>{ const it=ING.find(i=>i.id===id);const sz=szBase[id]||1,m=mac(it,sz);inst.push({cat:CAT_LABEL[cat],name:it.nombre,g:m.g,sz:SIZES.find(s=>s.k===sz).l.toLowerCase(),isExtra:false}); }); });
  Object.keys(selExtra).forEach(id=>{ const it=ING.find(i=>i.id===id);const sz=szExtra[id]||1,m=mac(it,sz);inst.push({cat:CAT_LABEL[it.cat],name:it.nombre,g:m.g,sz:SIZES.find(s=>s.k===sz).l.toLowerCase(),isExtra:true}); });
  return inst;
}

window.goResumen = function() {
  if(!Object.keys(selBase).length){alert('Selecciona al menos un ingrediente');return;}
  let rows='',total=0,tP=0,tC=0,tG=0,tK=0;
  CATS.forEach(cat=>{
    (selBase[cat]||[]).forEach(id=>{
      const it=ING.find(i=>i.id===id);const sz=szBase[id]||1,m=mac(it,sz),pr=precio(it,sz);
      tP+=m.prot;tC+=m.carb;tG+=m.gras;tK+=m.kcal;total+=pr;
      rows+=`<div class="res-item"><div class="res-left"><div class="res-thumb">${foto(it,'res-img')}</div><div><div class="res-name">${it.nombre}</div><div class="res-sub">${SIZES.find(s=>s.k===sz)?.l||'Estándar'} · ${m.g}g</div></div></div><div class="res-right"><div class="res-macs"><span class="res-mac" style="color:var(--green)">${m.prot}g P</span><span class="res-mac" style="color:var(--blue)">${m.carb}g C</span><span class="res-mac" style="color:var(--amber)">${m.gras}g G</span></div><div class="res-price">$${pr}</div></div></div>`;
    });
  });
  Object.keys(selExtra).forEach(id=>{
    const it=ING.find(i=>i.id===id);const sz=szExtra[id]||1,m=mac(it,sz),pr=precio(it,sz);
    tP+=m.prot;tC+=m.carb;tG+=m.gras;tK+=m.kcal;total+=pr;
    rows+=`<div class="res-item"><div class="res-left"><div class="res-thumb">${foto(it,'res-img')}</div><div><div class="res-extra-tag">Extra</div><div class="res-name">${it.nombre}</div><div class="res-sub">${SIZES.find(s=>s.k===sz)?.l||'Estándar'} · ${m.g}g</div></div></div><div class="res-right"><div class="res-macs"><span class="res-mac" style="color:var(--green)">${m.prot}g P</span><span class="res-mac" style="color:var(--blue)">${m.carb}g C</span><span class="res-mac" style="color:var(--amber)">${m.gras}g G</span></div><div class="res-price">$${pr}</div></div></div>`;
  });
  const dP=Math.round(tP)-meta.prot,dC=Math.round(tC)-meta.carb,dG=Math.round(tG-meta.gras),dK=Math.round(tK)-meta.kcal;
  // Umbrales coherentes entre sí: ±TOLG g por macro equivalen hasta 4·4+4·4+9·4 = 68 kcal.
  // Reduce (no elimina del todo) los casos de "En tu meta" ×3 con kcal en rojo: las kcal de
  // etiqueta de data.js no cumplen 4/4/9 exacto y en platos grandes pueden apilarse más allá de 68.
  const TOLG=4,TOLK=TOLG*(4+4+9);
  const fmtKcal=v=>v>0?'+'+v:''+v;
  const clsKcal=v=>Math.abs(v)<=TOLK?'ok':'off';
  const clsMacro=v=>Math.abs(v)<=TOLG?'ok':v>0?'over':'under';
  const fmtMacro=(v,unit)=>{ if(Math.abs(v)<=TOLG) return 'En tu meta'; return v>0?`${v}${unit} de más`:`${Math.abs(v)}${unit} de menos`; };
  const insts=buildQRInstructions();
  const instHTML=insts.map((it,i)=>`<div class="qr-inst-item"><div class="qr-inst-num">${i+1}</div><div><div class="qr-inst-text">${it.name}${it.isExtra?' <span style="font-size:10px;color:var(--accent);font-family:Inter,sans-serif">(extra)</span>':''}</div><div class="qr-inst-detail">Porción ${it.sz} · <strong>${it.g}g</strong> · ${it.cat}</div></div></div>`).join('');
  $('res-content').innerHTML=`
    <div class="res-wrap">${rows}<div class="res-total"><div class="res-total-lbl">Total a pagar</div><div class="res-total-val">$${total} MXN</div></div></div>
    <div class="gap-wrap"><div class="gap-hd">Diferencia vs tu meta</div><div class="gap-grid">
      <div class="gap-blk"><div class="gap-num ${clsKcal(dK)}">${fmtKcal(dK)}</div><div class="gap-lbl">kcal</div></div>
      <div class="gap-blk"><div class="gap-num ${clsMacro(dP)}">${fmtMacro(dP,'g')}</div><div class="gap-lbl">proteína</div></div>
      <div class="gap-blk"><div class="gap-num ${clsMacro(dC)}">${fmtMacro(dC,'g')}</div><div class="gap-lbl">carbos</div></div>
      <div class="gap-blk"><div class="gap-num ${clsMacro(dG)}">${fmtMacro(dG,'g')}</div><div class="gap-lbl">grasas</div></div>
    </div></div>
    <div class="qr-section"><div class="qr-hd"><div class="qr-hd-lbl">Código para cocina</div><div class="qr-hd-tag">Escanear en caja</div></div>
      <div class="qr-body"><div class="qr-code-wrap"><div id="qr-canvas"></div><p>Escanea para<br>ver orden</p></div>
      <div class="qr-instructions"><div class="qr-inst-title">Porciones exactas</div>${instHTML}</div></div></div>`;
  goStep(2);
  setTimeout(()=>{
    const el=$('qr-canvas');
    if(el && window.QRCode){ el.innerHTML=''; new QRCode(el,{text:buildQRText(),width:120,height:120,colorDark:'#1a1a18',colorLight:'#F4F2EE',correctLevel:QRCode.CorrectLevel.M}); }
  },200);
};

window.goStep = function(n) {
  olvidarPorque();
  renderPorque();
  document.querySelectorAll('.screen').forEach((s,i)=>s.classList.toggle('active',i===n));
  for(let i=0;i<3;i++){
    const d=$('d'+i),l=$('l'+i);
    d.className='s-dot'+(i<n?' done':i===n?' active':'');
    l.className='s-lbl'+(i===n?' active':'');
    d.textContent=i<n?'✓':(i+1);
  }
  window.scrollTo({top:0,behavior:'smooth'});
};
