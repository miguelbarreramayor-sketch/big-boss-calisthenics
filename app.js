/* BIG BOSS CALISTHENICS — PWA MVP offline-first */
const BRAND = "BIG BOSS CALISTHENICS";
const EXEC_DEFAULT = "https://script.google.com/macros/s/AKfycbxaecJsfPS8WVk6IkL717174AJhnz3VuAhaQl65-_rZw88McegZ7MVHI7Xfe6LbMk_BoQ/exec";
const TOK_DEFAULT = "BIGBOSS_2026_cambia_esto";
const DOCV = "v1.4 17-oct-2026";
const $ = id => document.getElementById(id);
const store = {
  get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};

/* i18n */
const I = {
es:{gate_t:"Antes de continuar",gate_d:"BIG BOSS CALISTHENICS es entrenamiento general (calistenia y mancuernas). No es servicio médico: no diagnostica, no receta, no certifica aptitud. Entrenar implica riesgos. Detén y busca atención ante dolor torácico, desmayo, dificultad respiratoria inusual o palpitaciones intensas.",gate_v:"Docs v1.4 17-oct-2026",cT:"Obligatoria: Acepto Términos y Condiciones",cP:"Confirmo que pude consultar la Política de Privacidad",cS:"Opcional sensible: autorizo datos salud/actividad para personalizar (revocable, modo básico sin esto)",cSheet:"Opcional: exportar entrenos a mi Google Sheet",cMkt:"Opcional: comunicaciones comerciales",go:"Aceptar y continuar",no:"No aceptar / Salir",t1:"Rutinas",t2:"Registrar",t3:"Historial",t4:"Sheet/Drive",t5:"Perfil/Legal",t6:"Fuentes",timer:"Temporizador descanso",reg_t:"Registro rápido (offline)",save:"Guardar local",reg_h:"Se guarda en el dispositivo aunque no haya internet. Luego envíalo a Sheet/Drive.",del:"Borrar locales",inst:"⬇ Instalar"},
en:{gate_t:"Before continuing",gate_d:"BIG BOSS CALISTHENICS is general training (calisthenics + dumbbells). Not medical: no diagnosis, no prescription, no fitness clearance. Training has risks. Stop and seek care for chest pain, fainting, unusual breathing difficulty or strong palpitations.",gate_v:"Docs v1.4 Oct-17-2026",cT:"Required: I accept Terms & Conditions",cP:"I confirm I could review the Privacy Policy",cS:"Optional health: authorize health/activity data to personalize (revocable, basic mode without it)",cSheet:"Optional: export workouts to my Google Sheet",cMkt:"Optional: marketing messages",go:"Accept & continue",no:"Decline / Exit",t1:"Routines",t2:"Log",t3:"History",t4:"Sheet/Drive",t5:"Profile/Legal",t6:"Sources",timer:"Rest timer",reg_t:"Quick log (offline)",save:"Save locally",reg_h:"Stored on device even offline. Then send to Sheet/Drive.",del:"Clear local",inst:"⬇ Install"}
};
let lang = store.get("bb_lang","es");
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(I[lang][k])el.textContent=I[lang][k]});$("btnES").classList.toggle("on",lang==="es");$("btnEN").classList.toggle("on",lang==="en");document.title=BRAND;}
$("btnES").onclick=()=>{lang="es";store.set("bb_lang",lang);applyLang()};
$("btnEN").onclick=()=>{lang="en";store.set("bb_lang",lang);applyLang()};

/* theme */
let theme = store.get("bb_theme","dark");
function applyTheme(){document.documentElement.dataset.theme=theme;$("btnTheme").textContent=theme==="dark"?"🌙":"☀️"}
$("btnTheme").onclick=()=>{theme=theme==="dark"?"light":"dark";store.set("bb_theme",theme);applyTheme()};

/* install */
let deferred=null;$("btnInstall").onclick=async()=>{if(deferred){deferred.prompt();deferred=null}else{alert(lang==="es"?"En Chrome: ⋮ → Instalar / Añadir a pantalla de inicio":"In Chrome: ⋮ → Install / Add to Home screen")}};
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e});

/* gate */
const TERMS = BRAND+" — TÉRMINOS v1.4\nOperador: Miguel Andrés Barrera Mayor RUC 0919324582001 Guayaquil miguelbarreramayor@gmail.com +593985718915\nObjeto: app entrenamiento general calistenia+mancuernas. NO médico: no diagnostica/receta/certifica.\nRutinas: material general revisado por Miguel Barrera (no médico). Usuario ejecuta bajo su responsabilidad, detiene ante síntomas alarma.\nCuenta personal, credenciales intransferibles. PI del Prestador. Offline-first; IA/nube/pagos requieren internet.\nSUSCRIPCIÓN: planes Free (gratis), Básico (USD 4.99/mes) y VIP (USD 9.99/mes). El Agente entrenador completo es función de pago.\nPagos: transferencia/depósito o pago móvil a la cuenta indicada (el usuario sube el comprobante y el Prestador activa el plan tras verificarlo), o pago en línea por pasarela cuando esté habilitada. Cupones de descuento válidos según condiciones anunciadas en la app (un cupón por compra; no acumulables salvo indicación expresa).\nActivación: la suscripción se otorga a discreción del Prestador una vez confirmado el pago. Vencimiento: al terminar el periodo, la cuenta vuelve a Free.\nReembolsos/cancelación: no hay cargos automáticos; al ser activación manual por transferencia, las solicitudes rechazadas no generan cobro. Reclamos dentro de 15 días al correo de contacto.\nFacturación: comprobantes según normativa tributaria de Ecuador; el Prestador factura a nombre del titular del pago.\nServicios de salud (nutricionista/médico): BLOQUEADOS hasta contar con profesionales verificados; se anunciarán como 'próximamente'.\nVersiones: cambio material exige re-aceptación. Ley Ecuador, Guayaquil.\nRedes: youtube.com/channel/UCIFIKoCjdTceduUQVU5duGw · IG @big_boss_calisthenics · TikTok @miguelbigbosscalistheni1";
const PRIV = BRAND+" — PRIVACIDAD v1.2 LOPDP\nResponsable: Miguel A. Barrera Mayor. Contacto privacidad: miguelbarreramayor@gmail.com\nDatos: cuenta, perfil entreno opcional, sesiones, logs. Salud/actividad solo opt-in. MVP sin proveedores externos (local). Sheet/Drive solo opt-in revocable.\nDerechos (15 días): info/acceso/rectificación/eliminación/oposición/portabilidad en Perfil>Privacidad o email. Incidentes riesgo: 5 días Superintendencia. Conservación: entrenos 12m tras cierre, tributario 7a, logs 12m, derechos 3a.\nMenores: 18+ autónomo, 14-17 con tutor, <14 sin cuenta.";
function gateNeeded(){const a=store.get("bb_accept",null);return !(a&&a.terms==="v1.4"&&a.priv==="v1.2")}
function showGate(v){$("gate").classList.toggle("hidden",!v)}
function checkGate(){$("btnGate").disabled=!($("cT").checked&&$("cP").checked);showGate(gateNeeded())}
["cT","cP"].forEach(id=>$(id).addEventListener("change",checkGate));
$("verT").onclick=()=>{const d=$("docView");d.classList.remove("hidden");d.textContent=TERMS};
$("verP").onclick=()=>{const d=$("docView");d.classList.remove("hidden");d.textContent=PRIV};
$("btnGate").onclick=()=>{store.set("bb_accept",{brand:BRAND,terms:"v1.4",priv:"v1.2",date:new Date().toISOString(),sens:$("cS").checked,sheet:$("cSheet").checked,mkt:$("cMkt").checked,lang});showGate(false);checkLogin();renderLegal()};
$("btnNo").onclick=()=>{alert("Debes aceptar lo obligatorio para usar "+BRAND)};

/* ===== Biblioteca helpers (id + imagen) ===== */
const norm = s => (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\*/g,"").trim();
function bibById(id){return BIBLIO.find(e=>e.id===id)}
function bibByName(name){const k=norm(name);if(!k)return null;return BIBLIO.find(e=>norm(e.n)===k)||BIBLIO.find(e=>norm(e.n).includes(k)||k.includes(norm(e.n)))}
function idFromName(name){const b=bibById(name)||bibByName(name);return b?b.id:null}

/* rutinas (por ID de ejercicio -> imagen garantizada) */
const RUTS = {
"4DIAS_ORIGINAL":{Lunes:[["flex-estandar","4x12-15"],["press-hombro","4x10-12"],["flex-diamante","3x8-12"],["lat-manc","3x12-15"],["ext-triceps","3x12-15"],["front-manc","3x10-12"]],"Miércoles":[["pull-prona","4x6-10"],["remo-1","4x10-12"],["facepull","3x12-15"],["iso-pull","3x20-30s"],["pullover","3x10-12"],["superman","3x30s"]],"Viernes":[["sentadilla","4x20"],["legpress-manc","4x12-15"],["jump-squat","3x12"],["zancada","3x12/lado"],["gemelos","3x20"],["bulgara","3x10/lado"],["curl","3x12-15"],["plancha","3x45-60s"],["martillo","3x12-15"]],"Domingo":[["burpee","3x10"],["pushpress","3x10-12"],["climbers","3x30s"],["thruster","3x12-15"],["jump-squat","3x15"],["plank-up","3x10/lado"],["pistol","3x6/lado"],["renegade","3x10/lado"]]},
"LV_RETORNO":{Lunes:[["flex-estandar","3-4x10-15"],["fondos","3-4x6-10"],["press-hombro","3x10-12"],["pike","3x8-10"],["lat-manc","3x12-15"],["ext-triceps","3x12"]],Martes:[["pull-prona","4x6-10"],["remo-1","3x10-12"],["chin","3x6-10"],["curl","3x10-12"],["facepull","3x12-15"],["superman","3x30s"]],"Miércoles":[["sentadilla","4x15-20"],["zancada","3x10/lado"],["bulgara","3x8/lado"],["gemelos","4x15-20"],["plancha","3x40-60s"],["leg-raise","3x10-15"]],Jueves:[["knee-paralela","3x10-12"],["lsit-par","3x10-20s"],["lateral","3x20s/lado"],["windshield","3x6-8"],["vups","3x12-15"],["planche-lean","3x15s"]],Viernes:[["burpee","3x10"],["pull-prona","3x6-8"],["fondos","3x8-10"],["thruster","3x10-12"],["climbers","3x30s"],["renegade","3x10/lado"]]}};
function myPlan(){try{return (typeof plan==="function"&&typeof prof==="function")?plan(prof()):[]}catch(e){return []}}
function initRuts(){const s=$("selRut");s.innerHTML="";const o0=document.createElement("option");o0.value="MI PLAN";o0.textContent="MI PLAN (días del Agente)";s.appendChild(o0);Object.keys(RUTS).forEach(k=>{const o=document.createElement("option");o.value=k;o.textContent=k;s.appendChild(o)});updDias();s.onchange=updDias;$("selDia").onchange=updEj}
function updDias(){const v=$("selRut").value;const d=$("selDia");d.innerHTML="";if(v==="MI PLAN"){myPlan().forEach(x=>{const o=document.createElement("option");o.textContent=x.dia;d.appendChild(o)})}else{const r=RUTS[v];Object.keys(r).forEach(k=>{const o=document.createElement("option");o.textContent=k;d.appendChild(o)})}updEj()}
function renderMiPlan(){const pl=myPlan();const day=pl[$("selDia").selectedIndex];const p=(typeof prof==="function"?prof():{estilo:"auto",obj:""});
 $("listaEj").innerHTML=`<p class="muted small"><b>${day?day.foco:""}</b> · modo ${p.estilo==="auto"?"AUTO":(p.estilo||"").toUpperCase()} · objetivo ${p.obj} — se arma según tus días/tipo elegidos en la pestaña Agente.</p>`+(day?day.ej:[]).map(e=>`<div class="ej exrow"><img class="thumb" src="./img/${e.id}.png" alt="${e.n}" onerror="this.style.display='none'"><div><b>${e.n}</b> · ${e.dosis} · desc ${e.desc}s <button data-e="${e.id}">＋</button></div></div>`).join("");
 document.querySelectorAll("#listaEj button").forEach(b=>b.onclick=()=>setReg(b.dataset.e))}
function agentGateRutinas(){const s=ses();const guest=!s;const usado=(s&&+s.demoPlan)||0;const canDemo=hasSession()&&usado<DEMO_PLAN;
 const cuerpo=guest?`Crea tu cuenta <b>Free</b> (gratis) para generar tu plan de muestra: <b>1 plan</b> y <b>5 mensajes</b>. El agente completo está en <b>Básico ($4.99)</b> y <b>VIP ($9.99)</b>.`:`Usa el mismo agente (plan por días, técnica y dieta orientativa), incluido en <b>Básico ($4.99)</b> y <b>VIP ($9.99)</b>. ${canDemo?`Te queda <b>${DEMO_PLAN-usado}</b> plan de muestra.`:"Ya usaste tu plan de muestra."}`;
 $("listaEj").innerHTML=`<div class="ej paywall"><b>🔒 "MI PLAN" es parte del Agente entrenador</b><br><span class="muted small">${cuerpo}</span><div class="row">${guest?'<button id="mpLogin">👤 Crear cuenta Free</button>':(canDemo?'<button id="mpDemo">Ver mi plan (demo)</button>':'')}<button id="mpPlanes" class="ghost">Ver planes</button></div></div>`;
 const b=$("mpDemo");if(b)b.onclick=async()=>{if(await agentPermitido("plan",true)){renderMiPlan()}else{agentGateRutinas()}};
 const lg=$("mpLogin");if(lg)lg.onclick=()=>openLogin();
 const c=$("mpPlanes");if(c)c.onclick=()=>switchTab("sus")}
function updEj(){const v=$("selRut").value;
 if(v==="MI PLAN"){if(hasAgent()){renderMiPlan()}else{agentGateRutinas()}return}
 const arr=RUTS[v][$("selDia").value]||[];$("listaEj").innerHTML=arr.map(e=>{const b=bibById(e[0]);const nm=b?b.n:e[0];return `<div class="ej exrow"><img class="thumb" src="./img/${e[0]}.png" alt="${nm}" onerror="this.style.display='none'"><div><b>${nm}</b> · ${e[1]} <button data-e="${e[0]}">＋</button></div></div>`}).join("");document.querySelectorAll("#listaEj button").forEach(b=>b.onclick=()=>setReg(b.dataset.e))}
function setReg(id){const b=bibById(id);$("r_ej").value=b?b.n:id;showPrev();switchTab("reg")}
function showPrev(){const id=idFromName($("r_ej").value);const p=$("r_prev");if(!p)return;if(id){p.src="./img/"+id+".png";p.style.display="";const b=bibById(id);$("r_prevNote")&&($("r_prevNote").textContent=b?b.prim+" · "+b.dosis:"")}else{p.style.display="none";$("r_prevNote")&&($("r_prevNote").textContent="")}}

/* timer */
let tInt=null;$("bTGo").onclick=()=>{clearInterval(tInt);let s=+$("tSeg").value||60;$("tOut").textContent=s+"s";tInt=setInterval(()=>{s--;$("tOut").textContent=s+"s";if(s<=0){clearInterval(tInt);$("tOut").textContent="¡Vamos!";navigator.vibrate&&navigator.vibrate(300)}},1000)};

/* tabs */
function switchTab(t){document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.tab===t));document.querySelectorAll(".tab").forEach(s=>s.classList.toggle("on",s.id==="tab-"+t))}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{switchTab(b.dataset.tab);if(b.dataset.tab==="rut")updDias();if(b.dataset.tab==="age")applyAgentBanner();if(b.dataset.tab==="sus")renderSus()});

/* registro offline */
const getH=()=>store.get("bb_hist",[]),setH=v=>store.set("bb_hist",v);
$("bSave").onclick=()=>{const h=getH();h.push({fecha_hora:new Date().toISOString(),usuario:$("p_alias").value||store.get("bb_alias",""),rutina:$("r_rut").value||"",ejercicio:$("r_ej").value||"",serie:+$("r_serie").value||1,reps:+$("r_reps").value||"",carga_kg:+$("r_carga").value||"",tiempo_s:+$("r_tiempo").value||"",descanso_s:+$("r_desc").value||"",rpe:+$("r_rpe").value||"",notas:$("r_notas").value||"",app_version:"pwa1.1",origen:"pwa",enviado:false});setH(h);renderH();alert("Guardado local")};
$("fFoto").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;const b=await f.arrayBuffer();let bin="";new Uint8Array(b).forEach(x=>bin+=String.fromCharCode(x));const b64=btoa(bin);const url=$("iURL").value||EXEC_DEFAULT,tok=$("iTok").value||TOK_DEFAULT;try{const r=await fetch(url,{method:"POST",body:JSON.stringify({token:tok,tipo:"archivo",nombre:f.name,mime:f.type,base64:b64,usuario:$("p_alias").value||"",rutina:$("r_rut").value,ejercicio:$("r_ej").value||"evidencia",notas:$("r_notas").value})});$("iOut").textContent=await r.text()}catch(err){$("iOut").textContent="Error: "+err}});

/* historial */
function renderH(){const h=getH();$("hCount").textContent=h.length+" registros";$("hList").innerHTML=h.map((r,i)=>{const id=idFromName(r.ejercicio);return `<div class="ej exrow">${id?`<img class="thumb" src="./img/${id}.png" alt="${r.ejercicio}" onerror="this.style.display='none'">`:""}<div>#${i+1} <b>${r.ejercicio}</b> ${r.reps}reps ${r.rutina} ${r.enviado?"✅":"⏳"}</div></div>`}).join("")}
$("bCSV").onclick=()=>{const h=getH();const csv="fecha_hora,usuario,rutina,ejercicio,serie,reps,carga_kg,tiempo_s,descanso_s,rpe,notas\n"+h.map(r=>[r.fecha_hora,r.usuario,r.rutina,r.ejercicio,r.serie,r.reps,r.carga_kg,r.tiempo_s,r.descanso_s,r.rpe,(r.notas||"").replace(/,/g,";")].join(",")).join("\n");dl("bigboss_entrenos.csv",csv,"text/csv")};
$("bClear").onclick=()=>{if(confirm("Borrar locales?")){setH([]);renderH()}};
function dl(n,c,t){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([c],{type:t}));a.download=n;a.click()}

/* integraciones */
$("iURL").value=store.get("bb_url",EXEC_DEFAULT);$("iTok").value=store.get("bb_tok",TOK_DEFAULT);
$("iURL").onchange=e=>store.set("bb_url",e.target.value);$("iTok").onchange=e=>store.set("bb_tok",e.target.value);
$("bTest").onclick=async()=>{try{const r=await fetch($("iURL").value);$("iOut").textContent=await r.text()}catch(e){$("iOut").textContent="Error: "+e}};
$("bSend").onclick=async()=>{const h=getH().filter(r=>!r.enviado);if(!h.length){$("iOut").textContent="Nada pendiente";return}try{const r=await fetch($("iURL").value,{method:"POST",body:JSON.stringify({token:$("iTok").value,app_version:"pwa1.1",origen:"pwa",entrenos:h})});const t=await r.text();$("iOut").textContent=t;if(t.includes('"ok":true')){const all=getH().map(x=>({...x,enviado:true}));setH(all);renderH()}}catch(e){$("iOut").textContent="Error: "+e}};

/* perfil/legal */
$("bPerfil").onclick=()=>{store.set("bb_alias",$("p_alias").value);renderLegal()};
$("bExportJ").onclick=()=>dl("bigboss_datos.json",JSON.stringify({hist:getH(),accept:store.get("bb_accept",null),prof:store.get("bb_prof",null)},null,2),"application/json");
$("bWipe").onclick=()=>{if(confirm("Borrar TODO local?")){localStorage.clear();location.reload()}};
function renderLegal(){const a=store.get("bb_accept",null);$("pLegal").textContent=BRAND+" · "+DOCV+"\nContacto soporte: ver footer / redes oficiales\nAceptación: "+JSON.stringify(a)+"\nAlias: "+(store.get("bb_alias",""));$("p_alias").value=store.get("bb_alias","")}

/* biblioteca 54 (imagen + ficha técnica) */
function initBib(){const render=()=>{const q=norm($("qBib").value),g=$("fGrupo").value;$("bibList").innerHTML=BIBLIO.filter(e=>(!g||e.g===g)&&(!q||norm(e.n+e.prim+e.sec+e.init+e.ejec).includes(q))).map(e=>`<div class="ej excard"><img class="eximg" src="./img/${e.id}.png" alt="${e.n}" onerror="this.style.display='none'"><div class="exbody"><b>${e.n}</b> · ${e.g} · ${e.dosis}<br><small>${e.prim}</small><br><details class="ficha"><summary>Ficha técnica</summary><div><b>Músculos principales:</b> ${e.prim}</div><div><b>Secundarios:</b> ${e.sec}</div><div><b>Equipo:</b> ${e.eq}</div><div><b>Nivel:</b> ${e.nivel}</div><div><b>Requisitos previos:</b> ${e.req}</div><div><b>Series/Reps:</b> ${e.dosis}</div><div><b>Posición inicial:</b> ${e.init}</div><div><b>Ejecución:</b> ${e.ejec}</div><div><b>Respiración:</b> ${e.resp}</div><div><b>Errores frecuentes:</b> ${e.err}</div><div><b>Variantes/progresiones:</b> ${e.var}</div><div><b>Precauciones:</b> ${e.prec}</div></details> <button data-e="${e.id}">＋</button></div></div>`).join("");document.querySelectorAll("#bibList button").forEach(b=>b.onclick=()=>setReg(b.dataset.e))};$("qBib").oninput=render;$("fGrupo").onchange=render;render()}

/* fuentes / bibliografía */
function initFuentes(){const box=$("fuentesList");if(!box||typeof FUENTES==="undefined")return;const st={descargado:"📄 Descargado",referencia:"🔗 Referencia"};box.innerHTML=FUENTES.map(f=>`<div class="src"><b>${f.t}</b><div class="muted small">${f.a}${f.y&&f.y!=="—"?" · "+f.y:""}${f.l?" · "+f.l:""} · <span class="lic">${f.lic}</span> · ${st[f.estado]||""}</div><div class="small">${f.u}</div>${f.link?`<a href="${f.link}" target="_blank" rel="noopener">${f.link}</a>`:""}</div>`).join("")}

/* auth superadmin + suscripciones (v4) */
function ses(){return store.get("bb_ses",null)}
function checkLogin(){renderAccountBtn()}
async function api(payload){const r=await fetch($("iURL").value||EXEC_DEFAULT,{method:"POST",body:JSON.stringify({token:$("iTok").value||TOK_DEFAULT,...payload})});return r.json()}
/* ===== Cuenta / Ingreso (modo invitado) ===== */
function renderAccountBtn(){const b=$("btnAcct");if(b){const s=ses();b.textContent=s?("👤 "+(s.alias||s.email.split("@")[0])):"👤 Ingresar"}const o=$("bLogout");if(o)o.classList.toggle("hidden",!ses())}
function openLogin(){const l=$("login");if(!l)return;l.classList.remove("hidden");setLoginMsg("");const e=$("l_email");if(e&&!e.value)e.focus()}
function closeLogin(){const l=$("login");if(l)l.classList.add("hidden")}
function setLoginMsg(t,bad){const o=$("lOut");if(!o)return;if(!t){o.classList.add("hidden");o.textContent="";return}o.textContent=t;o.style.color=bad?"var(--warn,#ff8080)":"var(--ac2)";o.classList.remove("hidden")}
async function doLogin(email,clave,esNueva){
  try{
    const j=await api({accion:"login",email,clave});
    if(!j.ok){setLoginMsg(esNueva?"Cuenta creada, pero no pude entrar. Escribe tu email y clave y pulsa «Ya tengo cuenta · Entrar».":"Email o clave incorrectos. Revísalos e intenta de nuevo.",true);return false}
    store.set("bb_ses",{email,clave,alias:j.alias,plan:j.plan,rol:j.rol,estado:j.estado||"free",servicio:j.servicio||"",expira:j.expira||"",vigente:!!j.vigente,demoPlan:(j.demo&&j.demo.plan)||0,demoChat:(j.demo&&j.demo.chat)||0});
    store.set("bb_alias",j.alias);
    const ce=$("l_clave");if(ce)ce.value="";
    closeLogin();renderAccountBtn();renderLegal();renderSus();applyAgentBanner();updEj();
    return true;
  }catch(e){setLoginMsg("Sin conexión con el servidor. Revisa tu internet e intenta de nuevo.",true);return false}
}
$("bReg").onclick=async()=>{
  const email=($("l_email").value||"").trim(),clave=$("l_clave").value||"";
  if(!email){setLoginMsg("Escribe tu email.",true);return}
  if(!clave){setLoginMsg("Elige una clave (mín. 6). La usarás para entrar.",true);return}
  if(clave.length<6){setLoginMsg("La clave debe tener al menos 6 caracteres.",true);return}
  setLoginMsg("Creando tu cuenta…");
  try{
    const j=await api({accion:"registro",email,alias:email.split("@")[0],clave});
    if(!j.ok){setLoginMsg(/ya existe/.test(j.error||"")?"Ese email ya tiene cuenta. Pulsa «Ya tengo cuenta · Entrar».":("No se pudo crear la cuenta: "+(j.error||"intenta de nuevo")),true);return}
    setLoginMsg("Cuenta creada. Entrando…");
    await doLogin(email,clave,true);
  }catch(e){setLoginMsg("Sin conexión. Revisa tu internet e intenta de nuevo.",true)}
};
$("bLogin").onclick=async()=>{
  const email=($("l_email").value||"").trim(),clave=$("l_clave").value||"";
  if(!email||!clave){setLoginMsg("Escribe tu email y tu clave.",true);return}
  setLoginMsg("Entrando…");
  await doLogin(email,clave,false);
};
$("lClose").onclick=closeLogin;
$("lGuest").onclick=closeLogin;
$("btnAcct").onclick=()=>{ses()?switchTab("sus"):openLogin()};
$("lForgot").onclick=async()=>{
  const email=($("l_email").value||"").trim();
  if(!email){setLoginMsg("Escribe tu email arriba y vuelve a pulsar «¿Olvidaste tu clave?».",true);return}
  setLoginMsg("Enviando clave temporal a "+email+"…");
  try{const j=await api({accion:"recuperarClave",email});setLoginMsg(j&&j.ok?"Listo. Revisa tu correo (y la carpeta de spam): te enviamos una clave temporal. Entra con ella.":"No se pudo enviar. Intenta más tarde.",!(j&&j.ok))}catch(e){setLoginMsg("Sin conexión. Intenta más tarde.",true)}
};
$("bLogout").onclick=()=>{if(!confirm("¿Cerrar sesión? Podrás volver a entrar con tu correo y clave."))return;localStorage.removeItem("bb_ses");renderAccountBtn();renderSus();applyAgentBanner();updEj();switchTab("rut")};

/* ===== Suscripción / planes (F1-F3) ===== */
const BANCO={banco:"Banco Bolivariano",tipo:"Cuenta de ahorro",cuenta:"0912001575",titular:"Miguel Barrera Mayor",cedula:"0919324582",pagoMovil:"+593 98 571 8915",correo:"miguelbarreramayor@gmail.com"};
const SALUD_ACTIVO=false; /* <- poner true cuando haya nutricionista/médico verificados + revisión legal */
const PLANES={
 free:{n:"Free",precio:0,d:"Biblioteca 54 + fichas técnicas, rutinas prediseñadas, registro/historial y export."},
 basico:{n:"Básico (Agente)",precio:4.99,d:"Agente entrenador completo: plan por días/grupos/full body, técnica, dieta orientativa y contacto con Miguel.",desc:"Trimestral −10% · Anual −20%"},
 vip:{n:"VIP (Entrenador Pro)",precio:9.99,d:"Todo lo del Básico + 1 revisión de técnica por video al mes + ajuste personalizado de Miguel + prioridad.",desc:"Trimestral −10% · Anual −20%"},
 premium:{n:"Premium (Salud)",precio:19.99,d:"VIP + 1 consulta/mes con nutricionista o médico.",soon:!SALUD_ACTIVO}
};
const PAID=["basico","vip","premium"];
const DEMO_PLAN=1, DEMO_CHAT=5;
let cuponCur=null, pagoOnline=false;
function vigente(s){if(!s)return false;if(s.rol==="superadmin")return true;if(!PAID.includes(s.plan))return false;if(!s.expira)return true;return new Date(s.expira)>=new Date()}
function hasAgent(){return hasSession()&&vigente(ses())}
function hasSession(){return !!ses()}
function demoRestante(){const s=ses();return {plan:Math.max(0,DEMO_PLAN-((s&&+s.demoPlan)||0)),chat:Math.max(0,DEMO_CHAT-((s&&+s.demoChat)||0))}}
/* Permiso del Agente: suscriptores/admin ilimitado; Free consume la demo en el SERVIDOR (atada a la cuenta).
   quiet=true -> no muestra paywall/alert (el llamador decide). */
async function agentPermitido(tipo,quiet){
 tipo=(tipo==="chat")?"chat":"plan";
 if(hasAgent())return true;
 if(!hasSession()){if(!quiet)showPaywall("Crea tu cuenta Free e inicia sesión para usar el Agente.");return false}
 if(navigator.onLine===false){if(!quiet)alert("El Agente y su demo necesitan conexión a internet. Vuelve a intentar con red.");return false}
 try{
  const j=await api({accion:"demoCheck",email:ses().email,tipo});
  if(j.ilimitado)return true;
  if(j.ok){const s=ses();store.set("bb_ses",{...s,[tipo==="chat"?"demoChat":"demoPlan"]:j.usados});applyAgentBanner();
   if(j.permitido)return true;
   if(!quiet)showPaywall(tipo==="chat"?"Llegaste al límite de mensajes de prueba (Free). Suscríbete para el agente completo.":"Llegaste al límite del plan de demostración (Free). Suscríbete para el plan completo.");
   return false}
  if(!quiet)showPaywall(j.error||"No se pudo verificar tu cuenta. Inicia sesión.");
  return false;
 }catch(e){if(!quiet)alert("Sin conexión con el servidor. El Agente necesita internet para verificar tu cuenta.");return false}
}
function paywallHTML(msg){const s=ses();
 const txt=s?"El agente entrenador completo (plan por días, técnica y dieta orientativa) es parte de los planes <b>Básico ($4.99)</b> y <b>VIP ($9.99)</b>. Ahora estás en <b>Free</b>.":"El agente entrenador se puede probar <b>gratis</b>: crea tu cuenta <b>Free</b> y tendrás <b>1 plan de muestra</b> y <b>5 mensajes</b>. El agente completo está en <b>Básico $4.99</b> / <b>VIP $9.99</b>.";
 const loginBtn=s?"":'<button id="pwLogin">👤 Crear cuenta Free</button>';
 const planesBtn=s?'<button id="pwGo">Ver planes y suscribirme</button>':'<button id="pwGo" class="ghost">Ver planes</button>';
 return `<div class="ej paywall"><b>🔒 ${msg||"Función del Agente para suscriptores"}</b><br><span class="muted small">${txt}</span><div class="row">${loginBtn}${planesBtn}</div></div>`}
function showPaywall(msg){const pl=$("a_plan");if(pl){pl.innerHTML=paywallHTML(msg);const b=$("pwGo");if(b)b.onclick=()=>switchTab("sus");const lg=$("pwLogin");if(lg)lg.onclick=()=>openLogin();pl.scrollIntoView({behavior:"smooth"})}}
function applyAgentBanner(){const b=$("ageBanner");if(!b)return;const s=ses();
 if(hasAgent()){b.innerHTML=`<div class="ej ok"><b>✅ Plan ${(PLANES[s.plan]||{}).n||s.plan} activo</b>${s.expira?` · vence ${String(s.expira).slice(0,10)}`:""}</div>`;return}
 if(!s){b.innerHTML=`<div class="ej warn"><b>👋 Estás explorando como invitado</b><br><span class="muted small">Crea tu cuenta <b>Free</b> (gratis) para probar el <b>Agente</b>: 1 plan y 5 mensajes. El agente completo está en <b>Básico $4.99</b> / <b>VIP $9.99</b>.</span><div class="row"><button id="bnGo">👤 Crear cuenta Free</button><button id="bnPlans" class="ghost">Ver planes</button></div></div>`;const g=$("bnGo");if(g)g.onclick=()=>openLogin();const pg=$("bnPlans");if(pg)pg.onclick=()=>switchTab("sus");return}
 const d=demoRestante();b.innerHTML=`<div class="ej warn"><b>🔓 Estás en Free (modo demostración)</b><br><span class="muted small">Tu muestra: <b>${d.plan}</b>/${DEMO_PLAN} plan · <b>${d.chat}</b>/${DEMO_CHAT} mensajes. El agente completo está en <b>Básico $4.99</b> o <b>VIP $9.99</b>.</span><div class="row"><button id="bnGo">Ver planes</button></div></div>`;const g=$("bnGo");if(g)g.onclick=()=>switchTab("sus")}
function renderSus(){
 const s=ses();
 const st=$("susEstado");
 if(st){if(s){const cur=PLANES[s.plan]||{n:s.plan};st.innerHTML=`<b>Cuenta:</b> ${s.email}<br><b>Plan:</b> ${cur.n} ${vigente(s)?"✅ vigente":"⛔ no vigente"}${s.expira?` · vence ${String(s.expira).slice(0,10)}`:""}<br><b>Estado:</b> ${s.estado||"—"} · <b>Servicio:</b> ${s.servicio||"—"}`}else st.innerHTML=`<b>Aún no has ingresado.</b> Crea tu cuenta gratis o entra con tu correo para gestionar tu plan.`}
 const cards=$("planCards");
 if(cards){
  cards.innerHTML=Object.entries(PLANES).map(([k,p])=>{const active=s&&s.plan===k;let btn="";
   if(p.soon)btn='<button class="ghost" disabled>Próximamente</button>';
   else if(k==="free")btn='<button class="ghost" disabled>Incluido</button>';
   else btn=`<button data-plan="${k}">${active?"Renovar 30 días":"Suscribirme"}</button>`;
   return `<div class="plan${active?" on":""}${p.soon?" soon":""}"><b>${p.n}</b><div class="price">${p.precio?("$"+p.precio.toFixed(2)+"<small>/mes</small>"):"Gratis"}</div><div class="muted small">${p.d}</div>${p.desc?`<div class="muted small">🎟️ ${p.desc}</div>`:""}${btn}</div>`}).join("");
  cards.querySelectorAll("button[data-plan]").forEach(b=>b.onclick=()=>openPay(b.dataset.plan));
 }
 const admin=$("adminBox");if(admin)admin.classList.toggle("hidden",!(s&&(s.rol==="superadmin"||s.rol==="admin")));
}
let paySel=null;
function precioFinal(){const p=PLANES[paySel];if(!p)return 0;return cuponCur?cuponCur.precioFinal:p.precio}
function payDataHTML(plan){const p=PLANES[plan];const fp=precioFinal();const cup=cuponCur?`<div class="ej ok">🎟️ Cupón <b>${cuponCur.codigo}</b> aplicado (−$${cuponCur.descuento.toFixed(2)})</div>`:"";return `<b>${p.n} — ${cuponCur?`<s>$${p.precio.toFixed(2)}</s> `:""}$${fp.toFixed(2)}/mes</b>${cup}<br><br><b>Transferencia / depósito</b><br>Banco: ${BANCO.banco} · ${BANCO.tipo}<br>N° cuenta: <b>${BANCO.cuenta}</b> <button class="cp" data-c="${BANCO.cuenta}">copiar</button><br>Titular: ${BANCO.titular}<br>Cédula: ${BANCO.cedula}<br><br><b>Pago móvil (BANRED)</b><br>Celular: <b>${BANCO.pagoMovil}</b> <button class="cp" data-c="${BANCO.pagoMovil}">copiar</button> · ${BANCO.banco} · Céd. ${BANCO.cedula}<br><br>Sube el comprobante aquí abajo o envíalo a <b>${BANCO.correo}</b>.<br><span class="muted small">Monto exacto: <b>$${fp.toFixed(2)}</b>. Escribe tu correo (${ses()?ses().email:""}) en la referencia.</span>`}
function paintPay(){const box=$("payBox");if(!box||!paySel)return;$("payData").innerHTML=payDataHTML(paySel);box.querySelectorAll(".cp").forEach(b=>b.onclick=()=>{const t=b.dataset.c;const done=()=>{b.textContent="¡copiado!";setTimeout(()=>b.textContent="copiar",1500)};if(navigator.clipboard)navigator.clipboard.writeText(t).then(done).catch(done);else done()})}
async function openPay(plan){if(!hasSession()){alert("Primero crea tu cuenta o ingresa (pantalla de Ingreso).");return}paySel=plan;cuponCur=null;const box=$("payBox");if(!box)return;const ci=$("payCupon");if(ci)ci.value="";paintPay();box.classList.remove("hidden");$("payOnline").classList.add("hidden");try{const inf=await api({accion:"pagoInfo"});if(inf&&inf.ok){pagoOnline=!!inf.activo;if(pagoOnline)$("payOnline").classList.remove("hidden")}}catch(e){}box.scrollIntoView({behavior:"smooth"})}
$("payCancel").onclick=()=>$("payBox").classList.add("hidden");
$("payCuponBtn").onclick=async()=>{if(!paySel)return;const code=$("payCupon").value.trim();const out=$("payOut");if(!code){cuponCur=null;paintPay();out.textContent="";return}out.textContent="Validando cupón...";try{const j=await api({accion:"cuponValidar",cupon:code,plan:paySel});if(j.ok){cuponCur={codigo:j.codigo,tipo:j.tipo,valor:j.valor,descuento:j.descuento,precioFinal:j.precioFinal};out.textContent="Cupón aplicado: −$"+j.descuento.toFixed(2)+" → $"+j.precioFinal.toFixed(2)}else{cuponCur=null;out.textContent="Cupón: "+(j.error||"no aplicable")}paintPay()}catch(e){out.textContent="Error: "+e}};
function fileB64(f){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(",")[1]);r.onerror=rej;r.readAsDataURL(f)})}
$("payGo").onclick=async()=>{
 const s=ses();const out=$("payOut");if(!s||!paySel){out.textContent="Ingresa y elige un plan.";return}
 out.textContent="Enviando solicitud...";
 try{
  const serv=$("payServicio").value,ref=$("payRef").value.trim(),notas=$("payNotas").value.trim();
  const j=await api({accion:"solicitar",email:s.email,plan:paySel,servicio:serv,referencia:ref,notas,cupon:cuponCur?cuponCur.codigo:""});
  if(!j.ok){out.textContent=JSON.stringify(j);return}
  const f=$("payFile").files[0];
  if(f){out.textContent="Solicitud "+j.id+" enviada. Subiendo comprobante...";const up=await api({accion:"subirComprobante",email:s.email,id:j.id,nombre:f.name,mime:f.type||"application/octet-stream",base64:await fileB64(f)});out.textContent=JSON.stringify(up)}
  else out.textContent=JSON.stringify({ok:true,id:j.id,mensaje:"Solicitud registrada sin comprobante. Envíalo por correo/WhatsApp."});
  store.set("bb_ses",{...s,estado:"pendiente",servicio:serv});renderSus();applyAgentBanner();
  alert("Solicitud enviada"+(j.monto?" por $"+j.monto:"")+". Envía tu comprobante y avisa por WhatsApp. El administrador activará tu plan (30 días).");
 }catch(e){out.textContent="Error: "+e}
};
$("payOnline").onclick=async()=>{const s=ses();const out=$("payOut");if(!s||!paySel)return;out.textContent="Generando pago en línea...";try{const j=await api({accion:"pagoLink",email:s.email,plan:paySel,cupon:cuponCur?cuponCur.codigo:""});if(!j.ok){out.textContent="Pago en línea: "+j.error;return}out.textContent=JSON.stringify(j);const url=j.payWithCard||j.payWithPayPhone;if(url)window.open(url,"_blank","noopener");store.set("bb_ses",{...s,estado:"pendiente"});renderSus()}catch(e){out.textContent="Error: "+e}};
$("admLoad").onclick=async()=>{
 const s=ses();const out=$("admOut"),list=$("admList");if(!s)return;
 out.textContent="Cargando...";
 try{
  const j=await api({accion:"adminListar",email_admin:s.email,clave_admin:s.clave});
  out.textContent=JSON.stringify(j);
  if(j.ok&&j.solicitudes){
   $("admCount").textContent=j.solicitudes.length+" pendientes";
   list.innerHTML=j.solicitudes.map(x=>`<div class="ej"><b>${x.id}</b> · ${x.email} · <b>${(PLANES[x.plan]||{}).n||x.plan}</b> · $${x.monto}${x.referencia?" · ref "+x.referencia:""}<br><span class="muted small">${x.fecha||""}${x.comprobante_url?` · <a href="${x.comprobante_url}" target="_blank" rel="noopener">ver comprobante</a>`:""}</span><div class="row"><button data-ok="${x.id}" data-plan="${x.plan}">Aprobar 30 días</button><button class="ghost" data-no="${x.id}">Rechazar</button></div></div>`).join("");
   list.querySelectorAll("button[data-ok]").forEach(b=>b.onclick=async()=>{const r=await api({accion:"adminAprobar",email_admin:s.email,clave_admin:s.clave,id:b.dataset.ok,plan:b.dataset.plan,dias:30});out.textContent=JSON.stringify(r)});
   list.querySelectorAll("button[data-no]").forEach(b=>b.onclick=async()=>{const r=await api({accion:"adminRechazar",email_admin:s.email,clave_admin:s.clave,id:b.dataset.no});out.textContent=JSON.stringify(r)});
  }
 }catch(e){out.textContent="Error: "+e}
};
$("cupCrear").onclick=async()=>{const s=ses();const out=$("admOut");if(!s)return;try{const j=await api({accion:"adminCuponCrear",email_admin:s.email,clave_admin:s.clave,codigo:$("cupCodigo").value,tipo:$("cupTipo").value,valor:$("cupValor").value,usos_max:$("cupUsos").value,expira:$("cupExpira").value});out.textContent=JSON.stringify(j);if(j.ok){$("cupCodigo").value="";$("cupValor").value="";$("cupUsos").value="";$("cupExpira").value=""}}catch(e){out.textContent="Error: "+e}};
$("cupListar").onclick=async()=>{const s=ses();const list=$("cupList"),out=$("admOut");if(!s)return;out.textContent="Cargando cupones...";try{const j=await api({accion:"adminCuponListar",email_admin:s.email,clave_admin:s.clave});out.textContent=JSON.stringify(j);if(j.ok&&j.cupones){list.innerHTML=(j.cupones.map(c=>`<div class="ej">🎟️ <b>${c.codigo}</b> · ${c.tipo==="%"?(c.valor+"%"):("$"+c.valor)} · usos ${c.usos}/${c.usos_max||"∞"} · ${c.activo?"✅ activo":"⛔ inactivo"}${c.expira?(" · exp "+String(c.expira).slice(0,10)):""}<div class="row"><button class="ghost" data-cup="${c.codigo}">${c.activo?"Desactivar":"Activar"}</button></div></div>`).join(""))||"<span class='muted small'>Sin cupones.</span>";list.querySelectorAll("button[data-cup]").forEach(b=>b.onclick=async()=>{const r=await api({accion:"adminCuponToggle",email_admin:s.email,clave_admin:s.clave,codigo:b.dataset.cup});out.textContent=JSON.stringify(r);$("cupListar").click()})}}catch(e){out.textContent="Error: "+e}};
$("recLoad").onclick=async()=>{const s=ses();const list=$("recList"),out=$("recOut");if(!s)return;out.textContent="Cargando...";try{const j=await api({accion:"adminRecordatorios",email_admin:s.email,clave_admin:s.clave});out.textContent=JSON.stringify(j);if(j.ok){list.innerHTML=((j.usuarios||[]).map(u=>`<div class="ej">${u.email} · <b>${u.plan}</b> · ${u.dias<0?("vencido hace "+Math.abs(u.dias)+"d"):("vence en "+u.dias+"d")} · ${String(u.expira).slice(0,10)}</div>`).join(""))||"<span class='muted small'>Nadie por vencer en 7 días.</span>"}}catch(e){out.textContent="Error: "+e}};
$("recSend").onclick=async()=>{const s=ses();const out=$("recOut");if(!s)return;out.textContent="Enviando recordatorios...";try{const j=await api({accion:"adminEnviarRecordatorios",email_admin:s.email,clave_admin:s.clave});out.textContent=JSON.stringify(j)}catch(e){out.textContent="Error: "+e}};
function applySalud(){["optNutri","optMedico","optCompleto"].forEach(id=>{const el=$(id);if(el)el.disabled=!SALUD_ACTIVO})}
async function refreshEstado(){const s=ses();if(!s)return;try{const j=await api({accion:"estado",email:s.email});if(j.ok){store.set("bb_ses",{...s,plan:j.plan,rol:j.rol||s.rol,estado:j.estado,servicio:j.servicio,expira:j.expira,vigente:!!j.vigente,demoPlan:(j.demo&&j.demo.plan)||0,demoChat:(j.demo&&j.demo.chat)||0});renderSus();applyAgentBanner();updEj()}}catch(e){}}

/* init */
applyLang();applyTheme();initRuts();renderH();renderLegal();checkGate();checkLogin();initBib();initFuentes();renderSus();applyAgentBanner();applySalud();
$("r_ej").addEventListener("input",showPrev);
if("serviceWorker"in navigator)navigator.serviceWorker.register("./sw.js");

/* Gate universal de generación de plan: cubre el botón "Generar mi plan" (agent.js setea a_gen.onclick=showPlan)
   y cualquier llamada a showPlan() disparada desde el chat. Corre tras cargar agent.js (script previo). */
try{const _sp=window.showPlan;if(typeof _sp==="function"){window.showPlan=async function(){if(await agentPermitido("plan"))return _sp.apply(this,arguments)}}}catch(e){}

/* Gate del Agente (demo Free vs suscriptores) — chat + estado, corre tras los handlers de agent.js */
document.addEventListener("DOMContentLoaded",()=>{
 const send=$("chatSend");
 if(send){const oc=send.onclick;send.onclick=async()=>{if(await agentPermitido("chat")){return oc&&oc()}}}
 refreshEstado();
});
