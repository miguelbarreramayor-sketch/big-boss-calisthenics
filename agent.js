/* BIG BOSS CALISTHENICS — Agente Entrenador local (reglas, texto+voz). NO médico.
   Implementa las 7 reglas de seguridad:
   1) No diagnostica. 2) No presenta rutina general como rehabilitación. 3) Pregunta lesiones/
   síntomas/restricciones antes de progresar. 4) Deriva a profesional ante señales de alarma.
   5) Diferencia adaptación (persona sana) de ejercicio terapéutico. 6) Registra fuente/revisión.
   7) Detiene ante señales de alarma. */
const $a=id=>document.getElementById(id);
const SRC_NOTE="Fuente: contenido propio BIG BOSS + guías OMS/ACSM (ver pestaña Fuentes). Revisión profesional: pendiente.";
const ADAPT="Adaptación general para persona sana; NO es rehabilitación ni tratamiento médico.";
const prof=()=>({nivel:$a("a_nivel").value,obj:$a("a_obj").value,peso:+$a("a_peso").value||null,est:+$a("a_est").value||null,min:+$a("a_tiempo").value||45,equipo:($a("a_equipo").value||"barra,paralelas,mancuernas").toLowerCase(),les:($a("a_les")&&$a("a_les").value)||"no",sint:($a("a_sintomas")&&$a("a_sintomas").value)||""});
function descanso(obj,comp){if(obj==="fuerza")return comp?90:75;if(obj==="hipertrofia")return 60;if(obj==="resistencia")return 40;return 60}
function pick(group,n){return BIBLIO.filter(e=>e.g===group).slice(0,n)}
function plan(p){
  const out=[];
  const base=[
    {d:"Lunes(push)",items:[["flex-estandar","4x12-15"],["fondos","3x6-10"],["press-hombro","3x10-12"],["pike","3x8-10"],["lat-manc","3x12-15"]]},
    {d:"Martes(pull)",items:[["pull-prona","4x6-10"],["remo-1","3x10-12"],["chin","3x6-10"],["curl","3x10-12"],["superman","3x30s"]]},
    {d:"Miércoles(pierna+core)",items:[["sentadilla","4x15-20"],["zancada","3x10/lado"],["bulgara","3x8/lado"],["gemelos","4x15-20"],["plancha","3x40-60s"]]},
    {d:"Jueves(core+control)",items:[["knee-paralela","3x10-12"],["lsit-par","3x10-20s"],["lateral","3x20s/lado"],["windshield","3x6-8"],["vups","3x12-15"]]},
    {d:"Viernes(full)",items:[["burpee","3x10"],["pull-prona","3x6-8"],["fondos","3x8-10"],["thruster","3x10-12"],["climbers","3x30s"],["renegade","3x10"]]}
  ];
  const eq=p.equipo;const noBar=!eq.includes("barra"),noPar=!eq.includes("paralela"),noMan=!eq.includes("mancuerna");
  const sust={"pull-prona":"australiana","chin":"remo-1","fondos":"flex-estandar","press-hombro":"pike","remo-1":"australiana","curl":"martillo","thruster":"jump-squat","renegade":"plank-up"};
  return base.map(b=>({dia:b.d,ej:b.items.map(([id,dr])=>{let nid=id;if(noBar&&(id==="pull-prona"||id==="chin"))nid=sust[id];if(noPar&&id==="fondos")nid=sust[id];if(noMan&&["press-hombro","lat-manc","curl","remo-1","thruster","renegade"].includes(id))nid=sust[id]||"flex-estandar";const e=BIBLIO.find(x=>x.id===nid)||BIBLIO.find(x=>x.id===id);let rx=dr;if(p.nivel==="principiante")rx+=" (baja a ~60%: menos reps + variante fácil)";if(p.nivel==="avanzado"&&(p.obj==="skill"||p.obj==="fuerza"))rx+=" (+skill: frog/frontlever si dominas)";return {id:nid,n:e.n,dosis:rx,desc:descanso(p.obj,true)+"s"}})}));
}
function showPlan(){const p=prof();
  if(p.les==="si"&&!p.sint.trim()){const r="Antes de generar tu plan necesito saber tus lesiones, síntomas o restricciones (regla de seguridad). Escríbelas en el campo 'Lesiones/síntomas'. No diagnostico: si son persistentes, consulta a un profesional.";add("Agente",r);say(r);return}
  const pl=plan(p);
  $a("a_plan").innerHTML=`<p><b>Nivel ${p.nivel} · Objetivo ${p.obj} · ${p.min} min · Equipo: ${p.equipo||"—"}</b>${p.sint?` · ⚠️ ${p.sint}`:""}</p><p class="muted small">${ADAPT} ${SRC_NOTE}${p.les==="si"?` Tus molestias declaradas (${p.sint}) no sustituyen una valoración profesional.`:""}</p>`+pl.map(d=>`<div class="ej"><b>${d.dia}</b><br>`+d.ej.map(e=>`<div class="exrow"><img class="thumb" src="./img/${e.id}.png" alt="${e.n}" onerror="this.style.display='none'"><div>· ${e.n} — ${e.dosis} — desc ${e.desc} <button data-p="${e.id}">＋</button></div></div>`).join("")+"</div>").join("");
  document.querySelectorAll("#a_plan button").forEach(b=>b.onclick=()=>{if(window.setReg)setReg(b.dataset.p);else document.getElementById("r_ej").value=b.dataset.p;document.querySelector('[data-tab="reg"]').click()});
  say(`Plan ${p.nivel} ${p.obj} listo. ${pl.length} días balanceados push pull pierna core.`);
}
let vozOn=false;
function say(t){if(!vozOn||!("speechSynthesis"in window))return;speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}
function add(u,t){const box=$a("chat");if(!box)return;box.innerHTML+=`<div><b>${u}:</b> ${t}</div>`;box.scrollTop=9999}
function chatQ(q0){const q=q0.toLowerCase();
  add("Tú",q0);
  if(/dolor.*pecho|desmay|falta.*aire|disnea|palpitac|mareo fuerte|hormigueo|perdida de fuerza|pérdida de fuerza/.test(q)){const r="⛔ Señal de alarma: detén el entreno y busca atención médica/urgencias. No sigo con la rutina (regla 7).";add("Agente",r);say(r);return}
  if(/dolor|molestia|lesion|lesión|hombro|rodilla|muñeca|codo|espalda|lumbar/.test(q)){const r="No diagnostico (regla 1). Si hay dolor agudo, detén ese ejercicio, usa una variante fácil y baja el volumen ~50%. Si persiste o hay pérdida de fuerza/hormigueo, consulta a un profesional (regla 4).";add("Agente",r);say(r);return}
  if(/rehabilit|rehabilitaci|terapia|recupera.*lesion|tratamiento/.test(q)){const r="Una rutina general no es rehabilitación (regla 2). La rehabilitación la prescribe un profesional tras valorarte. Yo solo puedo darte adaptación general para persona sana (regla 5).";add("Agente",r);say(r);return}
  if(/progresion|progresión|subir.*peso|aumentar.*carga|mas dificil|más difícil|avanzar/.test(q)){const p=prof();if(p.les==="si"&&!p.sint.trim()){const r="Antes de progresar dime tus lesiones/síntomas/restricciones (regla 3).";add("Agente",r);say(r);return}}
  if(/descanso/.test(q)){const p=prof();const r=`Descansos: compuestos ${descanso(p.obj,true)}s, accesorios 45-60s, isométricos según nivel. Objetivo ${p.obj}.`;add("Agente",r);say(r);return}
  if(/hoy|rutina|plan|genera|recomienda/.test(q)){showPlan();add("Agente","Generé tu plan arriba según nivel, equipo y tiempo. Dime qué completaste y lo ajusto. "+ADAPT+" "+SRC_NOTE);return}
  if(/dominada/.test(q)){add("Agente","Dominadas: si haces <5 seguidas usa asistidas/negativas 3x5; si 6-10 sigue 4x6-10 con 90s. ¿Cuántas lograste? ("+ADAPT+")");return}
  if(/flexion|flexión|pecho/.test(q)){add("Agente","Empuje: estándar 3-4x10-15, pike 3x8-10, diamante 3x8-12. Principiante empieza con rodillas 2-3 series. ("+ADAPT+")");return}
  if(/peso|estatura|fisico|físico/.test(q)){const p=prof();add("Agente",`Peso/estatura solo contextualizan la carga, no la aptitud. Nivel ${p.nivel}, objetivo ${p.obj}. Dime reps controladas y esfuerzo 1-10 y te ajusto.`);return}
  if(/contacto|whatsapp|hablar con miguel|consulta.*miguel|entrenador humano|persona real|asesor/.test(q)){const r="Puedes consultar directo con Miguel (orientación en calistenia, técnicas y ejercicios) por WhatsApp: +593 98 571 8915 → https://wa.me/593985718915 . Yo te asisto en la app; Miguel es tu entrenador para dudas técnicas.";add("Agente",r);say(r);return}
  add("Agente","Puedo: generar plan, ajustar por nivel/equipo/tiempo, recomendar regresiones y descansos. Para orientación personalizada en calistenia/técnica, escribe 'contacto' y te paso el WhatsApp de Miguel. Pregunta ej: 'qué hago hoy con 30 min sin barra'. "+ADAPT);
}
document.addEventListener("DOMContentLoaded",()=>{
  $a("a_gen").onclick=showPlan;
  $a("a_save").onclick=()=>{localStorage.setItem("bb_prof",JSON.stringify(prof()));alert("Perfil guardado")};
  try{const s=JSON.parse(localStorage.getItem("bb_prof"));if(s){$a("a_nivel").value=s.nivel;$a("a_obj").value=s.obj;$a("a_peso").value=s.peso||"";$a("a_est").value=s.est||"";$a("a_tiempo").value=s.min||45;$a("a_equipo").value=s.equipo||"";if($a("a_les"))$a("a_les").value=s.les||"no";if($a("a_sintomas"))$a("a_sintomas").value=s.sint||""}}catch{}
  $("chatSend").onclick=()=>{const v=$("chatIn").value.trim();if(v){chatQ(v);$("chatIn").value=""}};
  $("chatIn").addEventListener("keydown",e=>{if(e.key==="Enter")$("chatSend").click()});
  $("vozBtn").onclick=e=>{vozOn=!vozOn;e.target.style.opacity=vozOn?1:.5;if(vozOn)say("Agente BIG BOSS activado")};
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null;
  $("micBtn").onclick=()=>{if(!SR){alert("Tu navegador no tiene dictado. Escribe.");return}if(rec){rec.stop();rec=null;return}rec=new SR();rec.lang=localStorage.getItem("bb_lang")==="en"?"en-US":"es-ES";rec.onresult=e=>{chatQ(e.results[0][0].transcript)};rec.onend=()=>rec=null;rec.start()};
});
