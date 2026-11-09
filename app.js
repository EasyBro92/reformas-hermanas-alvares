(function(){
'use strict';
const IG = 'https://www.instagram.com/reformashermasalvares_/';
const CATS = { reforma:'Reformas', bano:'Baños', cocina:'Cocinas', pintura:'Pintura', suelos:'Suelos', limpieza:'Limpieza' };
const VIEWS = ['inicio','servicios','trabajos','presupuesto'];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const U = p => p;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Datos de la web (se editan en site.js) ---------- */
function norm(s){
  s = s || {};
  return {
    contact: Object.assign({whatsapp:'',phone:'',email:''}, s.contact),
    facts: Object.assign({years:'',projects:'',clients:''}, s.facts),
    zones: String(s.zones || ''),
    reviews: Array.isArray(s.reviews) ? s.reviews.filter(r => r && r.text).map(r => ({name:String(r.name || ''), text:String(r.text), stars:Math.max(0, Math.min(5, Math.round(+r.stars || 0)))})) : [],
    ba: Object.assign({before:'',after:''}, s.ba),
    media: Array.isArray(s.media) ? s.media.filter(m => m && m.src).map(m => ({src:m.src, type:m.type==='video'?'video':'photo', cat:CATS[m.cat]?m.cat:'reforma', caption:m.caption||''})) : []
  };
}
let site;
try { site = norm(window.SITE); } catch(_) { site = norm({}); }


/* ---------- Pestañas ---------- */
function go(v){
  if(!VIEWS.includes(v)) v = 'inicio';
  $$('.view').forEach(s => { s.hidden = s.dataset.view !== v; });
  $$('.tab').forEach(t => { if(t.dataset.v === v) t.setAttribute('aria-current','page'); else t.removeAttribute('aria-current'); });
  window.scrollTo(0,0);
}
window.addEventListener('hashchange', () => go(location.hash.slice(1)));
go(location.hash.slice(1));

/* ---------- Ilustración de la portada ---------- */
function room(after){
  if(!after){
    return `<svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="440" fill="#9B9B9B"/><rect x="52" y="38" width="160" height="116" fill="#B4B4B4"/><rect x="320" y="176" width="130" height="96" fill="#8C8C8C"/>
      <path d="M262 0l14 58-16 54 22 66" fill="none" stroke="#6E6E6E" stroke-width="3"/><rect y="310" width="600" height="130" fill="#787878"/>
      <ellipse cx="150" cy="372" rx="70" ry="14" fill="#6A6A6A"/><ellipse cx="420" cy="414" rx="90" ry="12" fill="#6C6C6C"/>
      <rect x="118" y="318" width="9" height="48" fill="#7A0F1A"/><rect x="142" y="326" width="9" height="40" fill="#7A0F1A"/>
      <rect x="380" y="52" width="164" height="172" fill="#CFCFCF" stroke="#4A4A4A" stroke-width="9"/><path d="M462 52v172M380 138h164" stroke="#4A4A4A" stroke-width="6"/>
      <path d="M392 70l30 40M500 160l32 50" stroke="#B8B8B8" stroke-width="3"/><line x1="210" y1="0" x2="210" y2="92" stroke="#2A2A2A" stroke-width="3"/><circle cx="210" cy="104" r="12" fill="#F5F5F5"/>
      <path d="M452 334h56l-8 56h-40z" fill="#8A8A8A"/><rect x="448" y="328" width="64" height="9" fill="#A0A0A0"/></svg>`;
  }
  let planks = '';
  for(let r=0;r<6;r++){const y=312+r*22;planks+=`<path d="M0 ${y}H600" stroke="#9A9A9A" stroke-width="2"/>`;for(let x=(r%2?40:110);x<600;x+=150)planks+=`<path d="M${x} ${y}v22" stroke="#9A9A9A" stroke-width="2"/>`;}
  const panels = [1,2,3,4].map(i=>`<path d="M${i*47} 0V310" stroke="#fff" stroke-opacity=".14" stroke-width="2"/>`).join('');
  return `<svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6E6E6"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs>
    <rect width="600" height="440" fill="#F5F5F5"/><rect width="236" height="310" fill="#7A0F1A"/>${panels}
    <rect x="64" y="66" width="104" height="128" fill="#FFFFFF"/><rect x="76" y="78" width="80" height="104" fill="#111111"/><circle cx="116" cy="130" r="26" fill="#7A0F1A"/>
    <rect y="312" width="600" height="128" fill="#CFCFCF"/>${planks}<rect y="298" width="600" height="14" fill="#FFFFFF"/>
    <rect x="380" y="52" width="164" height="172" fill="url(#sky)" stroke="#FFFFFF" stroke-width="9"/><path d="M462 52v172M380 138h164" stroke="#fff" stroke-width="6"/>
    <path d="M384 312h156l58 128H326z" fill="#fff" fill-opacity=".2"/><line x1="210" y1="0" x2="210" y2="66" stroke="#111111" stroke-width="2"/>
    <path d="M180 96a30 30 0 0 1 60 0z" fill="#111111"/><path d="M200 99h20l14 22h-48z" fill="#111111" fill-opacity=".14"/>
    <g fill="#111111"><ellipse cx="486" cy="330" rx="10" ry="30"/><ellipse cx="470" cy="340" rx="9" ry="24" transform="rotate(-28 470 340)"/><ellipse cx="502" cy="340" rx="9" ry="24" transform="rotate(28 502 340)"/></g>
    <path d="M468 352h36l-5 40h-26z" fill="#FFFFFF"/></svg>`;
}

/* ---------- Comparador de portada ---------- */
const stage = $('#baStage'), range = $('#baRange');
let heroTimer = 0, heroIdx = 0;
function renderHero(photos){
  const box = $('#heroPhoto');
  clearInterval(heroTimer);
  box.innerHTML = photos.map((p,i) => `<img src="${U(p.src)}" alt="${esc(p.caption || CATS[p.cat] || 'Trabajo realizado')}"${i ? ' loading="lazy"' : ''} class="${i === 0 ? 'on' : ''}">`).join('');
  heroIdx = 0;
  $('#baCap').textContent = photos[0].caption || '';
  if(photos.length > 1 && !reduced){
    heroTimer = setInterval(() => {
      const imgs = box.querySelectorAll('img'); if(!imgs.length) return;
      imgs[heroIdx].classList.remove('on'); heroIdx = (heroIdx + 1) % imgs.length; imgs[heroIdx].classList.add('on');
      $('#baCap').textContent = photos[heroIdx].caption || '';
    }, 4500);
  }
}
function renderBA(){
  const real = site.ba.before && site.ba.after;
  const photos = site.media.filter(m => m.type === 'photo').slice(0, 5);
  const usePhotos = !real && photos.length > 0;
  $('#heroPhoto').hidden = !usePhotos; stage.hidden = usePhotos; $('#baCtl').hidden = usePhotos; stage.classList.toggle('real', !!real);
  if(usePhotos){ renderHero(photos); return; }
  clearInterval(heroTimer);
  $('#baBefore').innerHTML = real ? `<img src="${U(site.ba.before)}" alt="Antes de la reforma">` : room(false);
  $('#baAfter').innerHTML  = real ? `<img src="${U(site.ba.after)}" alt="Después de la reforma">` : room(true);
  $('#baCap').textContent = real ? 'Arrastra el círculo rojo, o pulsa Antes y Después.' : 'Ilustración de ejemplo. Arrastra el círculo rojo, o pulsa Antes y Después.';
}
const tagL = $('.ba-tag-l'), tagR = $('.ba-tag-r'), ctlBtns = $$('#baCtl [data-ba]');
let pos = 50, drag = false, dragOff = 0, anim = 0, touched = false;
/* el círculo se queda siempre entero a la vista, aunque la barra esté en un extremo */
function knobShift(){
  const w = stage.clientWidth, x = pos / 100 * w, m = 34;
  stage.style.setProperty('--kshift', (x < m ? m - x : x > w - m ? w - m - x : 0) + 'px');
}
window.addEventListener('resize', knobShift);
function setPos(v){
  pos = Math.max(0, Math.min(100, v));
  stage.style.setProperty('--pos', pos + '%'); range.value = pos; knobShift();
  tagL.classList.toggle('off', pos < 14); tagR.classList.toggle('off', pos > 86);
  ctlBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.ba === 'before' ? pos >= 98 : pos <= 2)));
}
function tween(to, ms){
  const id = ++anim, from = pos;
  return new Promise(res => {
    if(reduced){ setPos(to); res(true); return; }
    const t0 = performance.now();
    const tick = t => {
      if(id !== anim){ res(false); return; }
      const k = Math.min(1, (t - t0) / ms), e = k < .5 ? 2*k*k : 1 - Math.pow(-2*k + 2, 2) / 2;
      setPos(from + (to - from) * e);
      if(k < 1) requestAnimationFrame(tick); else res(true);
    };
    requestAnimationFrame(tick);
  });
}
const pct = e => { const r = stage.getBoundingClientRect(); return (e.clientX - r.left) / r.width * 100; };
stage.addEventListener('pointerdown', e => {
  const onGrip = !!e.target.closest('#baGrip');
  if(e.pointerType === 'touch' && !onGrip) return;   /* con el dedo solo se arrastra el círculo: así la página sigue deslizándose con normalidad */
  touched = true; anim++; drag = true; stage.classList.add('dragging'); stage.setPointerCapture(e.pointerId);
  const x = pct(e); dragOff = onGrip ? pos - x : 0;
  if(!onGrip) setPos(x);
});
stage.addEventListener('pointermove', e => { if(drag) setPos(pct(e) + dragOff); });
['pointerup','pointercancel'].forEach(t => stage.addEventListener(t, () => { drag = false; stage.classList.remove('dragging'); }));
range.addEventListener('input', () => { touched = true; anim++; setPos(+range.value); });
$('#baCtl').addEventListener('click', e => { const b = e.target.closest('[data-ba]'); if(!b) return; touched = true; tween(b.dataset.ba === 'before' ? 100 : 0, 500); });
renderBA(); setPos(50);
/* Pequeña demostración cuando el comparador se ve en pantalla: la barra se mueve sola una vez */
async function nudge(){
  if(reduced || touched) return;
  if(!(await tween(34, 500)) || touched) return;
  if(!(await tween(66, 900)) || touched) return;
  await tween(50, 500);
}
if('IntersectionObserver' in window){
  const nio = new IntersectionObserver(es => { if(es[0].isIntersecting){ nio.disconnect(); setTimeout(nudge, 400); } }, {threshold:.6});
  nio.observe(stage);
}

/* ---------- Galería ---------- */
const P = {
  tiles(w,h){ let o = `<rect width="${w}" height="${h}" class="g"/>`; for(let r=0;r*60<h;r++){ const off = r%2?50:0; for(let x=-100+off;x<w;x+=100) o += `<rect x="${x+2}" y="${r*60+2}" width="96" height="56" rx="2" class="${r%5===2?'f1':'f3'}"/>`; } return o; },
  checker(w,h){ let o=''; for(let i=0;i*50<w;i++) for(let j=0;j*50<h;j++) o += `<rect x="${i*50}" y="${j*50}" width="50" height="50" class="${(i+j)%2?'f5':'f3'}"/>`; const y=Math.round(h*.62); return o + `<rect y="${y}" width="${w}" height="${h-y}" class="f1"/><rect y="${y}" width="${w}" height="6" class="f2"/>`; },
  planks(w,h){ let o = `<rect width="${w}" height="${h}" class="gw"/>`, k=0; for(let r=0;r*44<h;r++){ let x = -((r*97)%200); while(x<w){ const len = 190 + ((k*7)%3)*50; o += `<rect x="${x+1}" y="${r*44+1}" width="${len-2}" height="42" class="${k%3===0?'fw2':'fw1'}"/><path d="M${x+14} ${r*44+14}h${len*.5|0}M${x+40} ${r*44+28}h${len*.4|0}" stroke="#5E5E5E" stroke-opacity=".28" stroke-width="2" fill="none"/>`; x += len; k++; } } return o; },
  plan(w,h){ let o = `<rect width="${w}" height="${h}" class="f1"/>`; for(let x=0;x<=w;x+=40) o += `<path d="M${x} 0V${h}" class="ln1"/>`; for(let y=0;y<=h;y+=40) o += `<path d="M0 ${y}H${w}" class="ln1"/>`; const m=60; o += `<path d="M${m} ${m}H${w-m}V${h-m-30}H${m}Z" class="ln2"/><path d="M${m} ${Math.round(h*.5)}H${Math.round(w*.55)}V${h-m-30}" class="ln2"/>`; o += `<path d="M${m} ${h-34}H${w-m}M${m} ${h-42}v16M${w-m} ${h-42}v16" class="ln3"/><text x="${w/2}" y="${h-44}" text-anchor="middle" class="svt">3,80 m</text>`; return o; },
  bubbles(w,h){ const B=[[90,120,46],[260,80,30],[320,220,58],[120,300,26],[230,380,40],[60,430,22],[340,420,28]]; let o = `<rect width="${w}" height="${h}" class="f3"/>`; B.filter(b=>b[1]<h-10).forEach(([x,y,r])=>{ o += `<circle cx="${x}" cy="${y}" r="${r}" class="bub"/><circle cx="${x-r*.35}" cy="${y-r*.35}" r="${r*.18}" class="hi"/>`; }); return o + `<path d="M300 150l7 20 20 7-20 7-7 20-7-20-20-7 20-7z" class="f4"/>`; },
  stripes(w,h){ const C=['f1','f2','f4','f5','f3']; let o=''; for(let i=0;i*80<w;i++) o += `<rect x="${i*80}" width="80" height="${h}" class="${C[i%5]}"/>`; return o + `<path d="M0 ${h*.3}L${w} ${h*.1}V${h*.2}L0 ${h*.4}Z" fill="#fff" fill-opacity=".5"/>`; }
};
const SAMPLE = [
  {cat:'bano',pat:'tiles',w:400,h:520},{cat:'cocina',pat:'checker',w:400,h:400},{cat:'reforma',pat:'plan',w:400,h:560},
  {cat:'suelos',pat:'planks',w:400,h:320},{cat:'limpieza',pat:'bubbles',w:400,h:440},{cat:'pintura',pat:'stripes',w:400,h:360},
  {cat:'cocina',pat:'tiles',w:400,h:340},{cat:'reforma',pat:'planks',w:400,h:420},{cat:'limpieza',pat:'bubbles',w:400,h:360}
];
function mediaHTML(it, big){
  if(it.src){
    const src = U(it.src);
    if(it.type === 'video') return big ? `<video src="${src}" controls autoplay loop playsinline></video>` : `<video src="${src}#t=0.1" muted loop playsinline preload="metadata"></video>`;
    return `<img src="${src}" alt="${esc(it.caption || CATS[it.cat] || 'Trabajo realizado')}" ${big?'':'loading="lazy"'}>`;
  }
  const style = big ? `style="height:min(76vh,${it.h*1.6}px);width:auto;aspect-ratio:${it.w}/${it.h}"` : '';
  return `<svg viewBox="0 0 ${it.w} ${it.h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(CATS[it.cat])}" ${style}>${P[it.pat](it.w,it.h)}</svg>`;
}
let current = [], filter = 'all', io, lbList = [], prevList = [];
const wall = $('#wall'), chips = $('#chips');
const allItems = () => site.media.length ? site.media : SAMPLE;
function renderGallery(){
  const all = allItems();
  $('#galCap').textContent = site.media.length ? 'Fotos y vídeos de nuestras obras.' : 'Muestras de acabados. Aquí irán las fotos y vídeos de vuestras obras.';
  const present = Object.keys(CATS).filter(k => all.some(m => m.cat === k));
  const list = [['all','Todo'], ...present.map(k => [k, CATS[k]])];
  if(all.some(m => m.type === 'video')) list.push(['video','Vídeos']);
  if(!list.some(([k]) => k === filter)) filter = 'all';
  chips.innerHTML = list.map(([k,l]) => `<button class="chip" type="button" data-f="${k}" aria-pressed="${k===filter}">${l}</button>`).join('');
  current = all.filter(m => filter === 'all' || m.cat === filter || (filter === 'video' && m.type === 'video'));
  wall.classList.toggle('ph', !site.media.length);
  wall.innerHTML = current.map((it,i) => {
    const ar = it.src ? '' : `style="--ar:${it.w}/${it.h}"`;
    const play = it.type === 'video' ? '<span class="tile-play" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5l9 5.5-9 5.5z" fill="#fff"/></svg></span>' : '';
    return `<button class="tile" type="button" data-i="${i}" aria-label="Ampliar: ${esc(it.caption || CATS[it.cat] || 'trabajo')}"><span class="tile-media" ${ar}>${mediaHTML(it,false)}</span>${play}<span class="tile-tag">${esc(it.caption || CATS[it.cat] || '')}</span></button>`;
  }).join('');
  if(io) io.disconnect();
  const vids = $$('video', wall);
  if(vids.length && !reduced && 'IntersectionObserver' in window){
    io = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting){ const p = en.target.play(); if(p && p.catch) p.catch(()=>{}); } else en.target.pause(); }), {threshold:.6});
    vids.forEach(v => io.observe(v));
  }
}
chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if(!b) return; filter = b.dataset.f; renderGallery(); });

/* ---------- Visor ---------- */
const lb = $('#lb'), lbBody = $('#lbBody'), lbCap = $('#lbCap');
let cur = 0, lastFocus = null;
function show(i){ cur = (i + lbList.length) % lbList.length; const it = lbList[cur]; lbBody.innerHTML = mediaHTML(it,true); lbCap.textContent = it.caption || CATS[it.cat] || ''; }
function openLb(i, from){ lastFocus = from; lb.hidden = false; document.body.style.overflow = 'hidden'; show(i); $('#lbClose').focus(); }
function closeLb(){ lb.hidden = true; lbBody.innerHTML = ''; document.body.style.overflow = ''; if(lastFocus) lastFocus.focus(); }
wall.addEventListener('click', e => { const t = e.target.closest('.tile'); if(t){ lbList = current; openLb(+t.dataset.i, t); } });
$('#prev').addEventListener('click', e => { const t = e.target.closest('.ptile'); if(t){ lbList = prevList; openLb(+t.dataset.j, t); } });
$('#lbClose').addEventListener('click', closeLb);
$('#lbPrev').addEventListener('click', () => show(cur - 1));
$('#lbNext').addEventListener('click', () => show(cur + 1));
lb.addEventListener('click', e => { if(e.target === lb || e.target === lbBody) closeLb(); });
document.addEventListener('keydown', e => {
  if(lb.hidden) return;
  if(e.key === 'Escape') closeLb(); else if(e.key === 'ArrowLeft') show(cur - 1); else if(e.key === 'ArrowRight') show(cur + 1);
});

/* ---------- Contacto y presupuesto ---------- */
const digits = s => String(s || '').replace(/\D/g, '');
const telHref = p => { const d = digits(p); return 'tel:' + (d.length === 9 ? '+34' + d : '+' + d); };
function renderContact(){
  const c = site.contact, wa = digits(c.whatsapp), ph = (c.phone || '').trim(), em = (c.email || '').trim();
  const set = (row, val, text, href) => { $(row).hidden = !text; if(text){ $(val).textContent = text; $(val).href = href; } };
  set('#rowWa', '#valWa', wa ? '+' + wa : '', 'https://wa.me/' + wa);
  set('#rowPhone', '#valPhone', ph, ph ? telHref(ph) : '#');
  set('#rowMail', '#valMail', em, 'mailto:' + em);
  const q = $('#quick'), parts = [];
  if(wa) parts.push(`<span>WhatsApp: <a class="sel clink" href="https://wa.me/${wa}" target="_blank" rel="noopener">+${esc(wa)}</a></span>`);
  if(ph) parts.push(`<span>Teléfono: <a class="sel clink" href="${telHref(ph)}">${esc(ph)}</a></span>`);
  if(em) parts.push(`<span>Correo: <a class="sel clink" href="mailto:${esc(em)}">${esc(em)}</a></span>`);
  q.innerHTML = parts.join(''); q.hidden = !parts.length;
  const fc = $('#footContact'), fp = [];
  if(ph) fp.push(`<a class="clink" href="${telHref(ph)}">${esc(ph)}</a>`);
  if(em) fp.push(`<a class="clink" href="mailto:${esc(em)}">${esc(em)}</a>`);
  fc.innerHTML = fp.join('  ·  '); fc.hidden = !fp.length;
}
const form = $('#composer'), out = $('#out'), msg = $('#msg'), status = $('#status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const tipo = form.elements.tipo.value, nombre = $('#nombre').value.trim(), detalle = $('#detalle').value.trim();
  msg.value = `Hola, ${nombre ? 'soy ' + nombre + '. ' : ''}Me gustaría pedir presupuesto para ${tipo}.${detalle ? ' ' + detalle.replace(/[\s.!?]+$/, '') + '.' : ''} ¿Podemos hablar?`;
  out.hidden = false; status.textContent = '';
  const wa = digits(site.contact.whatsapp), btn = $('#waBtn');
  btn.hidden = !wa; if(wa) btn.href = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(msg.value);
  const em = (site.contact.email || '').trim(), mb = $('#mailBtn');
  mb.hidden = !em; if(em) mb.href = 'mailto:' + em + '?subject=' + encodeURIComponent('Solicitud de presupuesto') + '&body=' + encodeURIComponent(msg.value);
});
$('#copyBtn').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(msg.value); status.textContent = 'Mensaje copiado. Pégalo en un mensaje directo de Instagram.'; }
  catch(_) { msg.focus(); msg.select(); status.textContent = 'Copia el texto seleccionado con Ctrl+C, o con una pulsación larga en el móvil.'; }
});

function renderPreview(){
  prevList = allItems().slice(0, 6);
  $('#prevCap').textContent = site.media.length ? 'Fotos y vídeos de obras reales.' : 'Muestras de acabados. Aquí irán las fotos y vídeos de vuestras obras.';
  $('#prev').innerHTML = prevList.map((it,j) => `<button class="ptile" type="button" data-j="${j}" aria-label="Ampliar: ${esc(it.caption || CATS[it.cat] || 'trabajo')}"><span class="ptile-media">${mediaHTML(it,false)}</span></button>`).join('');
}
const ICON_HOME = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></svg>';
const ICON_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
const ICON_USER = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>';
function renderExtras(){
  const f = site.facts, eye = $('#eyeYears');
  eye.hidden = !f.years; if(f.years) eye.textContent = f.years + ' años de experiencia';
  const items = [];
  if(f.projects) items.push(`<li>${ICON_HOME}<span>${esc(f.projects)} proyectos realizados</span></li>`);
  if(f.clients) items.push(`<li>${ICON_USER}<span>${esc(f.clients)} clientes satisfechos</span></li>`);
  $('#facts').innerHTML = items.join(''); $('#facts').hidden = !items.length;
  $('#opiniones').hidden = !site.reviews.length;
  $('#revs').innerHTML = site.reviews.map(r => `<figure class="rev">${r.stars ? `<div class="stars" role="img" aria-label="${r.stars} de 5 estrellas">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>` : ''}<blockquote>${esc(r.text)}</blockquote><figcaption>${esc(r.name)}</figcaption></figure>`).join('');
  const zs = site.zones.split(',').map(z => z.trim()).filter(Boolean);
  const joinEs = a => a.length < 2 ? (a[0] || '') : a.slice(0,-1).join(', ') + (/^(i(?![aeou])|hi(?![aeou]))/i.test(a[a.length-1]) ? ' e ' : ' y ') + a[a.length-1];
  const rest = zs.slice(1), wh = $('#where');
  wh.hidden = !zs.length;
  if(zs.length) wh.innerHTML = ICON_PIN + '<span>' + esc('Con sede en ' + zs[0] + (rest.length ? ' y reformas también en ' + joinEs(rest) : '') + '.') + '</span>';
  $('#zonesNote').textContent = zs.length ? 'Con sede en ' + zs[0] + '.' + (rest.length ? ' También hacemos reformas en ' + joinEs(rest) + '.' : '') : '';
  $('#zonas').hidden = !zs.length;
  $('#zonesList').innerHTML = zs.map(z => `<li>${esc(z)}</li>`).join('');
}
function renderAll(){ renderGallery(); renderPreview(); renderBA(); renderContact(); renderExtras(); }
renderAll();

/* ---------- App instalable (PWA) ---------- */
if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
let installEvt = null; const installBtn = $('#installBtn');
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; installBtn.hidden = false; });
installBtn.addEventListener('click', async () => { if(!installEvt) return; installEvt.prompt(); try { await installEvt.userChoice; } catch(_) {} installEvt = null; installBtn.hidden = true; });
window.addEventListener('appinstalled', () => { installBtn.hidden = true; });

})();
