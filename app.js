/* BIG BOSS CALISTHENICS — PWA MVP offline-first */
const BRAND = "BIG BOSS CALISTHENICS";
const EXEC_DEFAULT = "https://script.google.com/macros/s/AKfycbxaecJsfPS8WVk6IkL717174AJhnz3VuAhaQl65-_rZw88McegZ7MVHI7Xfe6LbMk_BoQ/exec";
const TOK_DEFAULT = "BIGBOSS_2026_cambia_esto";
const DOCV = "v1.2 16-oct-2026";
const $ = id => document.getElementById(id);
const store = {
  get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};

/* i18n */
const I = {
es:{gate_t:"Antes de continuar",gate_d:"BIG BOSS CALISTHENICS es entrenamiento general (calistenia y mancuernas). No es servicio médico: no diagnostica, no receta, no certifica aptitud. Entrenar implica riesgos. Detén y busca atención ante dolor torácico, desmayo, dificultad respiratoria inusual o palpitaciones intensas.",gate_v:"Docs v1.2 16-oct-2026",cT:"Obligatoria: Acepto Términos y Condiciones",cP:"Confirmo que pude consultar la Política de Privacidad",cS:"Opcional sensible: autorizo datos salud/actividad para personalizar (revocable, modo básico sin esto)",cSheet:"Opcional: exportar entrenos a mi Google Sheet",cMkt:"Opcional: comunicaciones comerciales",go:"Aceptar y continuar",no:"No aceptar / Salir",t1:"Rutinas",t2:"Registrar",t3:"Historial",t4:"Sheet/Drive",t5:"Perfil/Legal",timer:"Temporizador descanso",reg_t:"Registro rápido (offline)",save:"Guardar local",reg_h:"Se guarda en el dispositivo aunque no haya internet. Luego envíalo a Sheet/Drive.",del:"Borrar locales",inst:"⬇ Instalar"},
en:{gate_t:"Before continuing",gate_d:"BIG BOSS CALISTHENICS is general training (calisthenics + dumbbells). Not medical: no diagnosis, no prescription, no fitness clearance. Training has risks. Stop and seek care for chest pain, fainting, unusual breathing difficulty or strong palpitations.",gate_v:"Docs v1.2 Oct-16-2026",cT:"Required: I accept Terms & Conditions",cP:"I confirm I could review the Privacy Policy",cS:"Optional health: authorize health/activity data to personalize (revocable, basic mode without it)",cSheet:"Optional: export workouts to my Google Sheet",cMkt:"Optional: marketing messages",go:"Accept & continue",no:"Decline / Exit",t1:"Routines",t2:"Log",t3:"History",t4:"Sheet/Drive",t5:"Profile/Legal",timer:"Rest timer",reg_t:"Quick log (offline)",save:"Save locally",reg_h:"Stored on device even offline. Then send to Sheet/Drive.",del:"Clear local",inst:"⬇ Install"}
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
const TERMS = BRAND+" — TÉRMINOS v1.2\nOperador: Miguel Andrés Barrera Mayor RUC 0919324582001 Guayaquil miguelbarreramayor@gmail.com +593985718915\nObjeto: app entrenamiento general calistenia+mancuernas. NO médico: no diagnostica/receta/certifica.\nRutinas: material general revisado por Miguel Barrera (no médico). Usuario ejecuta bajo su responsabilidad, detiene ante síntomas alarma.\nCuenta personal, credenciales intransferibles. PI del Prestador. Offline-first; IA/nube/pagos requieren internet.\nVersiones: cambio material exige re-aceptación. Ley Ecuador, Guayaquil.\nRedes: youtube.com/channel/UCIFIKoCjdTceduUQVU5duGw · IG @big_boss_calisthenics · TikTok @miguelbigbosscalistheni1";
const PRIV = BRAND+" — PRIVACIDAD v1.2 LOPDP\nResponsable: Miguel A. Barrera Mayor. Contacto privacidad: miguelbarreramayor@gmail.com\nDatos: cuenta, perfil entreno opcional, sesiones, logs. Salud/actividad solo opt-in. MVP sin proveedores externos (local). Sheet/Drive solo opt-in revocable.\nDerechos (15 días): info/acceso/rectificación/eliminación/oposición/portabilidad en Perfil>Privacidad o email. Incidentes riesgo: 5 días Superintendencia. Conservación: entrenos 12m tras cierre, tributario 7a, logs 12m, derechos 3a.\nMenores: 18+ autónomo, 14-17 con tutor, <14 sin cuenta.";
function gateNeeded(){const a=store.get("bb_accept",null);return !(a&&a.terms==="v1.2"&&a.priv==="v1.2")}
function showGate(v){$("gate").classList.toggle("hidden",!v)}
function checkGate(){$("btnGate").disabled=!($("cT").checked&&$("cP").checked);showGate(gateNeeded())}
["cT","cP"].forEach(id=>$(id).addEventListener("change",checkGate));
$("verT").onclick=()=>{const d=$("docView");d.classList.remove("hidden");d.textContent=TERMS};
$("verP").onclick=()=>{const d=$("docView");d.classList.remove("hidden");d.textContent=PRIV};
$("btnGate").onclick=()=>{store.set("bb_accept",{brand:BRAND,terms:"v1.2",priv:"v1.2",date:new Date().toISOString(),sens:$("cS").checked,sheet:$("cSheet").checked,mkt:$("cMkt").checked,lang});showGate(false);checkLogin();renderLegal()};
$("btnNo").onclick=()=>{alert("Debes aceptar lo obligatorio para usar "+BRAND)};

/* rutinas (plantillas separadas, no mezclar domingo con L-V) */
const RUTS = {
"4DIAS_ORIGINAL":{Lunes:[["Flexiones estándar","4x12-15"],["Press hombros mancuernas","4x10-12"],["Flexiones diamante","3x8-12"],["Elevaciones laterales","3x12-15"],["Extensiones tríceps","3x12-15"],["Elevaciones frontales","3x10-12"]],"Miércoles":[["Dominadas","4x6-10"],["Remo mancuerna 1 mano","4x10-12"],["Face pull mancuernas*","3x12-15"],["Isométrico dominada supina","3x20-30s"],["Pullover mancuerna","3x10-12"],["Superman isométrico","3x30s"]],"Viernes":[["Sentadillas","4x20"],["Leg press mancuernas*","4x12-15"],["Sentadilla salto","3x12"],["Zancadas mancuernas","3x12/lado"],["Talones","3x20"],["Búlgara","3x10/lado"],["Curl bíceps","3x12-15"],["Plancha","3x45-60s"],["Curl martillo","3x12-15"]],"Domingo":[["Burpees","3x10"],["Push press mancuernas","3x10-12"],["Mountain climbers","3x30s"],["Thrusters","3x12-15"],["Sentadilla salto","3x15"],["Flexión a plancha","3x10/lado"],["Pistol","3x6/lado"],["Renegade row","3x10/lado"]]},
"LV_RETORNO":{Lunes:[["Flexiones","3-4x10-15"],["Fondos*","3-4x6-10"],["Press hombros","3x10-12"],["Pike push-ups","3x8-10"],["Laterales","3x12-15"],["Tríceps","3x12"]],Martes:[["Dominadas","4x6-10"],["Remo mancuerna","3x10-12"],["Chin-ups","3x6-10"],["Curl","3x10-12"],["Posterior hombro","3x12-15"],["Superman","3x30s"]],"Miércoles":[["Sentadillas","4x15-20"],["Zancadas","3x10/lado"],["Búlgara","3x8/lado"],["Talones","4x15-20"],["Plancha","3x40-60s"],["Elev. piernas","3x10-15"]],Jueves:[["Elev. rodillas","3x10-12"],["L-sit","3x10-20s"],["Plancha lateral","3x20s/lado"],["Windshield","3x6-8"],["V-ups","3x12-15"],["Planche lean","3x15s"]],Viernes:[["Burpees","3x10"],["Dominadas","3x6-8"],["Fondos*","3x8-10"],["Thrusters","3x10-12"],["Mountain climbers","3x30s"],["Renegade rows","3x10/lado"]]}};
function initRuts(){const s=$("selRut");s.innerHTML="";Object.keys(RUTS).forEach(k=>{const o=document.createElement("option");o.value=k;o.textContent=k;s.appendChild(o)});updDias();s.onchange=updDias;$("selDia").onchange=updEj}
function updDias(){const r=RUTS[$("selRut").value];const d=$("selDia");d.innerHTML="";Object.keys(r).forEach(k=>{const o=document.createElement("option");o.textContent=k;d.appendChild(o)});updEj()}
function updEj(){const arr=RUTS[$("selRut").value][$("selDia").value]||[];$("listaEj").innerHTML=arr.map(e=>`<div class="ej"><b>${e[0]}</b> · ${e[1]} <button data-e="${e[0]}">＋</button></div>`).join("");document.querySelectorAll("#listaEj button").forEach(b=>b.onclick=()=>{$("r_ej").value=b.dataset.e;$("r_rut").value=$("selRut").value+" "+$("selDia").value;switchTab("reg")})}

/* timer */
let tInt=null;$("bTGo").onclick=()=>{clearInterval(tInt);let s=+$("tSeg").value||60;$("tOut").textContent=s+"s";tInt=setInterval(()=>{s--;$("tOut").textContent=s+"s";if(s<=0){clearInterval(tInt);$("tOut").textContent="¡Vamos!";navigator.vibrate&&navigator.vibrate(300)}},1000)};

/* tabs */
function switchTab(t){document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.tab===t));document.querySelectorAll(".tab").forEach(s=>s.classList.toggle("on",s.id==="tab-"+t))}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));

/* registro offline */
const getH=()=>store.get("bb_hist",[]),setH=v=>store.set("bb_hist",v);
$("bSave").onclick=()=>{const h=getH();h.push({fecha_hora:new Date().toISOString(),usuario:$("p_alias").value||store.get("bb_alias",""),rutina:$("r_rut").value||"",ejercicio:$("r_ej").value||"",serie:+$("r_serie").value||1,reps:+$("r_reps").value||"",carga_kg:+$("r_carga").value||"",tiempo_s:+$("r_tiempo").value||"",descanso_s:+$("r_desc").value||"",rpe:+$("r_rpe").value||"",notas:$("r_notas").value||"",app_version:"pwa1.0",origen:"pwa",enviado:false});setH(h);renderH();alert("Guardado local")};
$("fFoto").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;const b=await f.arrayBuffer();let bin="";new Uint8Array(b).forEach(x=>bin+=String.fromCharCode(x));const b64=btoa(bin);const url=$("iURL").value||EXEC_DEFAULT,tok=$("iTok").value||TOK_DEFAULT;try{const r=await fetch(url,{method:"POST",body:JSON.stringify({token:tok,tipo:"archivo",nombre:f.name,mime:f.type,base64:b64,usuario:$("p_alias").value||"",rutina:$("r_rut").value,ejercicio:$("r_ej").value||"evidencia",notas:$("r_notas").value})});$("iOut").textContent=await r.text()}catch(err){$("iOut").textContent="Error: "+err}});

/* historial */
function renderH(){const h=getH();$("hCount").textContent=h.length+" registros";$("hList").innerHTML=h.map((r,i)=>`<div class="ej">#${i+1} <b>${r.ejercicio}</b> ${r.reps}reps ${r.rutina} ${r.enviado?"✅":"⏳"}</div>`).join("")}
$("bCSV").onclick=()=>{const h=getH();const csv="fecha_hora,usuario,rutina,ejercicio,serie,reps,carga_kg,tiempo_s,descanso_s,rpe,notas\n"+h.map(r=>[r.fecha_hora,r.usuario,r.rutina,r.ejercicio,r.serie,r.reps,r.carga_kg,r.tiempo_s,r.descanso_s,r.rpe,(r.notas||"").replace(/,/g,";")].join(",")).join("\n");dl("bigboss_entrenos.csv",csv,"text/csv")};
$("bClear").onclick=()=>{if(confirm("Borrar locales?")){setH([]);renderH()}};
function dl(n,c,t){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([c],{type:t}));a.download=n;a.click()}

/* integraciones */
$("iURL").value=store.get("bb_url",EXEC_DEFAULT);$("iTok").value=store.get("bb_tok",TOK_DEFAULT);
$("iURL").onchange=e=>store.set("bb_url",e.target.value);$("iTok").onchange=e=>store.set("bb_tok",e.target.value);
$("bTest").onclick=async()=>{try{const r=await fetch($("iURL").value);$("iOut").textContent=await r.text()}catch(e){$("iOut").textContent="Error: "+e}};
$("bSend").onclick=async()=>{const h=getH().filter(r=>!r.enviado);if(!h.length){$("iOut").textContent="Nada pendiente";return}try{const r=await fetch($("iURL").value,{method:"POST",body:JSON.stringify({token:$("iTok").value,app_version:"pwa1.0",origen:"pwa",entrenos:h})});const t=await r.text();$("iOut").textContent=t;if(t.includes('"ok":true')){const all=getH().map(x=>({...x,enviado:true}));setH(all);renderH()}}catch(e){$("iOut").textContent="Error: "+e}};

/* perfil/legal */
$("bPerfil").onclick=()=>{store.set("bb_alias",$("p_alias").value);renderLegal()};
$("bExportJ").onclick=()=>dl("bigboss_datos.json",JSON.stringify({hist:getH(),accept:store.get("bb_accept",null)},null,2),"application/json");
$("bWipe").onclick=()=>{if(confirm("Borrar TODO local?")){localStorage.clear();location.reload()}};
function renderLegal(){const a=store.get("bb_accept",null);$("pLegal").textContent=BRAND+" · "+DOCV+"\nContacto soporte: ver footer / redes oficiales\nAceptación: "+JSON.stringify(a)+"\nAlias: "+(store.get("bb_alias",""));$("p_alias").value=store.get("bb_alias","")}

/* init */
applyLang();applyTheme();initRuts();renderH();renderLegal();checkGate();checkLogin();initBib();
if("serviceWorker"in navigator)navigator.serviceWorker.register("./sw.js");

/* biblioteca 54 */
function initBib(){const render=()=>{const q=($("qBib").value||"").toLowerCase(),g=$("fGrupo").value;$("bibList").innerHTML=BIBLIO.filter(e=>(!g||e.g===g)&&(!q||(e.n+e.d+e.c).toLowerCase().includes(q))).map(e=>`<div class="ej"><img src="./img/${e.id}.png" alt="${e.n}" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px" onerror="this.style.display='none'"><b>${e.n}</b> · ${e.g} · ${e.dosis}<br><small>${e.d}</small><br><small class="muted">${e.c}</small> <button data-b="${e.n}">＋</button></div>`).join("");document.querySelectorAll("#bibList button").forEach(b=>b.onclick=()=>{$("r_ej").value=b.dataset.b;switchTab("reg")})};$("qBib").oninput=render;$("fGrupo").onchange=render;render()}

/* auth superadmin + suscripciones (v4) */
function ses(){return store.get("bb_ses",null)}
function checkLogin(){const s=ses();const g=gateNeeded();$("login").classList.toggle("hidden",!!s||g)}
async function api(payload){const r=await fetch($("iURL").value||EXEC_DEFAULT,{method:"POST",body:JSON.stringify({token:$("iTok").value||TOK_DEFAULT,...payload})});return r.json()}
$("bReg").onclick=async()=>{try{const j=await api({accion:"registro",email:$("l_email").value,alias:$("l_email").value.split("@")[0],clave:$("l_clave").value});$("lOut").textContent=JSON.stringify(j);if(j.ok)alert("Cuenta free creada. Ahora Entra.")}catch(e){$("lOut").textContent="Error: "+e}};
$("bLogin").onclick=async()=>{try{const j=await api({accion:"login",email:$("l_email").value,clave:$("l_clave").value});$("lOut").textContent=JSON.stringify(j);if(j.ok){store.set("bb_ses",{email:$("l_email").value,clave:$("l_clave").value,alias:j.alias,plan:j.plan,rol:j.rol});store.set("bb_alias",j.alias);checkLogin();renderLegal();alert("Bienvenido "+j.alias+" · "+j.plan)}}catch(e){$("lOut").textContent="Error: "+e}};
