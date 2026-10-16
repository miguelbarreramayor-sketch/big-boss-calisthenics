/* BIG BOSS CALISTHENICS — Agente Entrenador local (reglas, texto+voz). No médico. */
const $a=id=>document.getElementById(id);
const prof=()=>({nivel:$a("a_nivel").value,obj:$a("a_obj").value,peso:+$a("a_peso").value||null,est:+$a("a_est").value||null,min:+$a("a_tiempo").value||45,equipo:($a("a_equipo").value||"barra,paralelas,mancuernas").toLowerCase(),lim:($a("a_lim").value||"").toLowerCase()});
function scale(base,nivel){const m={principiante:.6,intermedio:1,avanzado:1.25}[nivel]||1;return base}
function descanso(obj,comp){if(obj==="fuerza")return comp?90:75;if(obj==="hipertrofia")return 60;if(obj==="resistencia")return 40;return 60}
function pick(group,n){return BIBLIO.filter(e=>e.g===group).slice(0,n)}
function plan(p){
  const dias=["Lunes(push)","Martes(pull)","Miércoles(pierna+core)","Jueves(core+control)","Viernes(full)"];const out=[];
  const vol=p.nivel==="principiante"?{s:"2-3",m:"bajo"}:p.nivel==="avanzado"?{s:"4",m:"alto"}:{s:"3-4",m:"medio"};
  const base=[
    {d:"Lunes(push)",items:[["flex-estandar","4x12-15"],["fondos","3x6-10"],["press-hombro","3x10-12"],["pike","3x8-10"],["lat-manc","3x12-15"]]},
    {d:"Martes(pull)",items:[["pull-prona","4x6-10"],["remo-1","3x10-12"],["chin","3x6-10"],["curl","3x10-12"],["superman","3x30s"]]},
    {d:"Miércoles(pierna+core)",items:[["sentadilla","4x15-20"],["zancada","3x10/lado"],["bulgara","3x8/lado"],["gemelos","4x15-20"],["plancha","3x40-60s"]]},
    {d:"Jueves(core+control)",items:[["knee-paralela","3x10-12"],["lsit-par","3x10-20s"],["lateral","3x20s/lado"],["windshield","3x6-8"],["vups","3x12-15"]]},
    {d:"Viernes(full)",items:[["burpee","3x10"],["pull-prona","3x6-8"],["fondos","3x8-10"],["thruster","3x10-12"],["climbers","3x30s"],["renegade","3x10"]]}
  ];
  const eq=p.equipo;const noBar=!eq.includes("barra"),noPar=!eq.includes("paralela"),noMan=!eq.includes("mancuerna");
  const sust={"pull-prona":"australiana","chin":"remo-1","fondos":"flex-estandar","press-hombro":"pike","remo-1":"australiana","curl":"martillo","thruster":"jump-squat","renegade":"plank-up"};
  return base.map(b=>({dia:b.d,ej:b.items.map(([id,dr])=>{let nid=id;if(noBar&&(id==="pull-prona"||id==="chin"))nid=sust[id];if(noPar&&id==="fondos")nid=sust[id];if(noMan&&["press-hombro","lat-manc","curl","remo-1","thruster","renegade"].includes(id))nid=sust[id]||"flex-estandar";const e=BIBLIO.find(x=>x.id===nid)||BIBLIO.find(x=>x.id===id);let rx=dr;if(p.nivel==="principiante")rx+=" (baja a 60%: menos reps + variante fácil)";if(p.nivel==="avanzado"&&(p.obj==="skill"||p.obj==="fuerza"))rx+=" (+skill: frog/frontlever si dominas)";return {id:nid,n:e.n,dosis:rx,desc:descanso(p.obj,true)+"s"}})}));
}
function showPlan(){const p=prof();const pl=plan(p);$a("a_plan").innerHTML=`<p><b>Nivel ${p.nivel} · Objetivo ${p.obj} · ${p.min} min · Equipo: ${p.equipo||"—"}</b>${p.lim?` · ⚠️ ${p.lim}`:""}</p>`+pl.map(d=>`<div class="ej"><b>${d.dia}</b><br>`+d.ej.map(e=>`· ${e.n} — ${e.dosis} — desc ${e.desc} <button data-p="${e.n}">＋</button>`).join("<br>")+"</div>").join("");document.querySelectorAll("#a_plan button").forEach(b=>b.onclick=()=>{document.getElementById("r_ej").value=b.dataset.p;document.querySelector('[data-tab="reg"]').click()});say(`Plan ${p.nivel} ${p.obj} listo. ${pl.length} días balanceados push pull pierna core.`)}
let vozOn=false;
function say(t){if(!vozOn||!("speechSynthesis"in window))return;speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}
function chatQ(q0){const q=q0.toLowerCase();const box=$a("chat");const add=(u,t)=>{box.innerHTML+=`<div><b>${u}:</b> ${t}</div>`;box.scrollTop=9999};
  add("Tú",q0);
  if(/dolor.*pecho|desmay|falta.*aire|palpitac|mareo fuerte/.test(q)){const r="⛔ Señal de alarma: detén el entreno y busca atención médica/urgencias. No sigo con rutina.";add("Agente",r);say(r);return}
  if(/dolor|molestia|lesion|hombro|rodilla|muñeca/.test(q)){const r="Si hay dolor agudo, para ese ejercicio. Usa variante fácil, baja volumen 50% y consulta profesional si persiste.";add("Agente",r);say(r);return}
  if(/descanso/.test(q)){const p=prof();const r=`Descansos: compuestos ${descanso(p.obj,true)}s, accesorios 45-60s, isométricos según nivel. Objetivo ${p.obj}.`;add("Agente",r);say(r);return}
  if(/hoy|rutina|plan|genera|recomienda/.test(q)){showPlan();add("Agente","Generé tu plan arriba según nivel, equipo y tiempo. Dime qué completaste y lo ajusto.");return}
  if(/dominada/.test(q)){add("Agente","Dominadas: si haces <5 seguidas usa asistidas/negativas 3x5; si 6-10 sigue 4x6-10 con 90s. ¿Cuántas lograste?");return}
  if(/flexion|pecho/.test(q)){add("Agente","Empuje: estándar 3-4x10-15, pike 3x8-10, diamante 3x8-12. Principiante empieza rodillas 2-3 series.");return}
  if(/peso|estatura|fisico/.test(q)){const p=prof();add("Agente",`Peso/estatura solo contextualizan carga relativa, no aptitud. Nivel ${p.nivel}, objetivo ${p.obj}. Dime reps controladas y esfuerzo 1-10 y te ajusto.`);return}
  add("Agente","Puedo: generar plan, ajustar por nivel/equipo/tiempo, recomendar regresiones y descansos. Pregunta ej: 'qué hago hoy con 30 min sin barra'.");
}
document.addEventListener("DOMContentLoaded",()=>{$a("a_gen").onclick=showPlan;$a("a_save").onclick=()=>{localStorage.setItem("bb_prof",JSON.stringify(prof()));alert("Perfil guardado")};try{const s=JSON.parse(localStorage.getItem("bb_prof"));if(s){$a("a_nivel").value=s.nivel;$a("a_obj").value=s.obj;$a("a_peso").value=s.peso||"";$a("a_est").value=s.est||"";$a("a_tiempo").value=s.min||45;$a("a_equipo").value=s.equipo||"";$a("a_lim").value=s.lim||""}}catch{};
$("chatSend").onclick=()=>{const v=$("chatIn").value.trim();if(v){chatQ(v);$("chatIn").value=""}};
$("chatIn").addEventListener("keydown",e=>{if(e.key==="Enter")$("chatSend").click()});
$("vozBtn").onclick=e=>{vozOn=!vozOn;e.target.style.opacity=vozOn?1:.5;if(vozOn)say("Agente BIG BOSS activado")};
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null;
$("micBtn").onclick=()=>{if(!SR){alert("Tu navegador no tiene dictado. Escribe.");return}if(rec){rec.stop();rec=null;return}rec=new SR();rec.lang=localStorage.getItem("bb_lang")==="en"?"en-US":"es-ES";rec.onresult=e=>{chatQ(e.results[0][0].transcript)};rec.onend=()=>rec=null;rec.start()};
});
