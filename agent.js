/* BIG BOSS CALISTHENICS — Agente Entrenador local (reglas, texto+voz). NO médico.
   El USUARIO elige sus días y objetivo; el agente planifica y asesora.
   7 reglas de seguridad:
   1) No diagnostica. 2) No presenta rutina general como rehabilitación. 3) Pregunta lesiones/
   síntomas/restricciones antes de progresar. 4) Deriva a profesional ante señales de alarma.
   5) Diferencia adaptación (persona sana) de ejercicio terapéutico. 6) Cita fuente/revisión.
   7) Detiene ante señales de alarma. Nutrición = orientación GENERAL, no plan clínico. */
const $a=id=>document.getElementById(id);
const SRC_NOTE="Fuente: contenido propio BIG BOSS + guías OMS/ACSM (ver pestaña Fuentes). Revisión profesional: pendiente.";
const ADAPT="Adaptación general para persona sana; NO es rehabilitación ni tratamiento médico.";
const DIAS7=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

/* Bloques por grupo muscular (id, dosis sugerida) */
const BLOCKS={
 empuje:[["flex-estandar","4x12-15"],["fondos","3x8-12"],["flex-diamante","3x8-12"],["pike","3x8-10"],["press-hombro","3x10-12"],["hindu","3x8-12"],["ext-triceps","3x12-15"],["pseudo","3x6-10"]],
 pull:[["pull-prona","4x6-10"],["chin","3x6-10"],["australiana","3x10-12"],["remo-1","3x10-12"],["pull-L","3x5-8"],["facepull","3x12-15"],["curl","3x10-12"],["pullover","3x10-12"]],
 pierna:[["sentadilla","4x15-20"],["zancada","3x10/lado"],["bulgara","3x8/lado"],["gemelos","4x15-20"],["legpress-manc","3x12-15"],["pistol","3x6/lado"],["jump-squat","3x12"],["sumo","3x12-15"],["wallsit","3x30-60s"]],
 core:[["plancha","3x40-60s"],["leg-raise","3x10-15"],["vups","3x12-15"],["climbers","3x30s"],["lateral","3x20s/lado"],["windshield","3x6-8"],["lsit-par","3x10-20s"],["plank-up","3x10/lado"]],
 hombro:[["press-hombro","3x10-12"],["pike","3x8-10"],["hspu","3x5-8"],["front-manc","3x10-12"],["facepull","3x12-15"],["lateral","3x20s/lado"]],
 brazo:[["curl","3x12-15"],["martillo","3x12-15"],["ext-triceps","3x12-15"],["fondos","3x8-12"],["chin","3x6-10"],["flex-diamante","3x8-12"]],
 skill:[["frog","3x15-30s"],["frontlever","3x10-20s"],["hspu","3x5-8"],["planche-lean","3x15-20s"],["pull-asim","3x5-8"],["lsit-bar","3x10-20s"],["headbanger","3x5-8"]],
 full:[["burpee","3x10"],["thruster","3x10-12"],["pull-prona","3x6-8"],["fondos","3x8-10"],["jump-squat","3x15"],["renegade","3x10"]]
};
const SUST={"pull-prona":"australiana","pull-L":"australiana","pull-asim":"australiana","chin":"remo-1","frontlever":"australiana","iso-pull":"superman",
 "fondos":"flex-estandar","lsit-par":"plancha","knee-paralela":"knee-banco","hspu":"pike",
 "press-hombro":"pike","lat-manc":"australiana","front-manc":"flex-estandar","pullover":"australiana","pm-manc":"flex-estandar","legpress-manc":"sentadilla",
 "curl":"chin","martillo":"chin","remo-1":"australiana","thruster":"jump-squat","renegade":"plank-up"};
const BARRA=["pull-prona","pull-L","pull-asim","chin","frontlever","iso-pull","lsit-bar"],
      PARAL=["fondos","lsit-par","knee-paralela","hspu"],
      MANC=["press-hombro","lat-manc","front-manc","pullover","pm-manc","legpress-manc","curl","martillo","remo-1","thruster","renegade"];

const prof=()=>({nivel:$a("a_nivel").value,obj:$a("a_obj").value,peso:+$a("a_peso").value||null,est:+$a("a_est").value||null,min:+$a("a_tiempo").value||45,equipo:($a("a_equipo").value||"barra,paralelas,mancuernas").toLowerCase(),les:($a("a_les")&&$a("a_les").value)||"no",sint:($a("a_sintomas")&&$a("a_sintomas").value)||"",estilo:($a("a_estilo")&&$a("a_estilo").value)||"auto",dias:diasSel()});
function diasSel(){const c=[...document.querySelectorAll('#a_dias input:checked')].map(x=>x.value);return c.length?c:["Lunes","Miércoles","Viernes"]}
function descanso(obj,comp){if(obj==="fuerza")return comp?90:75;if(obj==="hipertrofia")return 60;if(obj==="resistencia")return 40;return 60}
function fix(id,p){const eq=p.equipo,noBar=!eq.includes("barra"),noPar=!eq.includes("paralela"),noMan=!eq.includes("mancuerna");
 if(noBar&&BARRA.includes(id))return SUST[id]||"australiana";
 if(noPar&&PARAL.includes(id))return SUST[id]||"flex-estandar";
 if(noMan&&MANC.includes(id))return SUST[id]||"flex-estandar";
 return id;}
function doseLevel(dr,p){let rx=dr;if(p.nivel==="principiante")rx+=" (baja a ~60%)";if(p.nivel==="avanzado"&&(p.obj==="skill"||p.obj==="fuerza"))rx+=" (+skill)";return rx}
function cue(e){const t=(e&&e.ejec)?e.ejec:"";return t.split(/(?<=\.)\s/)[0]||""}

function splitFor(n){
 if(n<=1)return[{f:"Full body",b:["full","core"]}];
 if(n===2)return[{f:"Tren superior",b:["empuje","pull","brazo"]},{f:"Tren inferior + core",b:["pierna","core"]}];
 if(n===3)return[{f:"Empuje (pecho·hombro·tríceps)",b:["empuje","hombro"]},{f:"Tirón (espalda·bíceps)",b:["pull","brazo"]},{f:"Pierna + Core",b:["pierna","core"]}];
 if(n===4)return[{f:"Empuje",b:["empuje","hombro"]},{f:"Tirón",b:["pull","brazo"]},{f:"Pierna",b:["pierna"]},{f:"Full + Core",b:["full","core"]}];
 if(n===5)return[{f:"Empuje",b:["empuje","hombro"]},{f:"Tirón",b:["pull","brazo"]},{f:"Pierna",b:["pierna"]},{f:"Hombro + Brazo",b:["hombro","brazo"]},{f:"Core + Skill",b:["core","skill"]}];
 if(n===6)return[{f:"Empuje",b:["empuje"]},{f:"Tirón",b:["pull"]},{f:"Pierna",b:["pierna"]},{f:"Hombro",b:["hombro"]},{f:"Brazo",b:["brazo"]},{f:"Core + Skill",b:["core","skill"]}];
 return[{f:"Empuje",b:["empuje"]},{f:"Tirón",b:["pull"]},{f:"Pierna",b:["pierna"]},{f:"Hombro",b:["hombro"]},{f:"Brazo",b:["brazo"]},{f:"Core + Skill",b:["core","skill"]},{f:"Movilidad / descanso activo",b:["core"]}];
}

function modoDe(p){return p.estilo==="fullbody"?"fullbody":p.estilo==="grupos"?"grupos":(p.dias.length<=2?"fullbody":"grupos")}
function roundRobin(blocks){const lists=blocks.map(b=>BLOCKS[b]||[]);const out=[];let i=0;while(out.length<60){let added=false;for(const l of lists){if(i<l.length){out.push(l[i]);added=true}}if(!added)break;i++}return out}
function plan(p){
 const modo=modoDe(p);
 const nEx=Math.max(3,Math.min(8,Math.round(p.min/6)));
 const splits=splitFor(p.dias.length);
 return p.dias.map((dia,i)=>{
   let foco,pool;
   if(modo==="fullbody"){foco="Full body (todos los grupos)";pool=roundRobin(["empuje","pull","pierna","core","full"]);}
   else{const s=splits[i%splits.length];foco=s.f;pool=roundRobin(s.b);}
   const seen=new Set(),out=[];
   for(const [id,dr] of pool){ if(out.length>=nEx)break;
     const fid=fix(id,p); if(seen.has(fid))continue; seen.add(fid);
     const e=BIBLIO.find(x=>x.id===fid); if(!e)continue;
     out.push({id:fid,n:e.n,dosis:doseLevel(dr,p),desc:descanso(p.obj,true),cue:cue(e),ejec:e.ejec||"",err:e.err||"",g:e.g||""});
   }
   return {dia,foco,ej:out};
 });
}

const DIET={
 fuerza:{t:"Fuerza",x:"Proteína ~1.6–2.0 g/kg/día; carbohidratos para la energía; ligero superávit (~+200 kcal) si buscas fuerza/masa; hidrátate antes, durante y después."},
 hipertrofia:{t:"Hipertrofia (músculo)",x:"Superávit ligero (+200–400 kcal); proteína ~1.6–2.2 g/kg; reparte proteína en 3–4 comidas; entrena cerca de una comida; duerme 7–9 h."},
 resistencia:{t:"Resistencia",x:"Carbohidratos 4–7 g/kg según volumen; proteína ~1.2–1.6 g/kg; hidratación y electrolitos en sesiones largas."},
 skill:{t:"Skills / control",x:"Peso estable; proteína ~1.6 g/kg; buena hidratación y descanso: el skill mejora con PRÁCTICA frecuente y frescura, no con más fatiga."},
 perder_grasa:{t:"Perder grasa",x:"Déficit moderado (~300–500 kcal); proteína alta ~1.8–2.2 g/kg para conservar músculo; fuerza + pasos diarios; evita déficits agresivos."},
 salud:{t:"Salud general",x:"Comida real, vegetales, proteína en cada comida e hidratación; sin dietas extremas. Movimiento diario y buen sueño."}
};
function dietFor(obj){const d=DIET[obj]||DIET.salud;return d}
function dietHtml(p){const d=dietFor(p.obj);return `<div class="ej"><b>🥗 Dieta según objetivo: ${d.t}</b><br><span class="muted small">${d.x}</span><br><span class="muted small">Orientación GENERAL, no es plan nutricional clínico ni reemplaza a un nutricionista. Si tienes diabetes, riñón, embarazo u otra condición, consulta a un profesional.</span></div>`}

function needsHtml(p){
 const eq=p.equipo,base="Barra (dominadas), paralelas, mancuernas";
 const alt=[];
 if(!eq.includes("barra"))alt.push("para tirón: usa una mesa toalla para australianas o bandas");
 if(!eq.includes("paralela"))alt.push("para fondos: usa dos sillas/bancos estables");
 if(!eq.includes("mancuerna"))alt.push("para peso extra: mochila cargada o botellas");
 return `<div class="ej"><b>🎒 Qué necesitas</b><br>Equipo declarado: <b>${eq||"—"}</b> (referencia: ${base}).<br>${alt.length?"Sustituciones: "+alt.join("; ")+".":"Sin sustituciones: tienes lo principal."}<br><span class="muted small">¿Te falta algo? Dímelo y cambio los ejercicios.</span></div>`;
}

function guideHtml(){return `<div class="ej"><b>📋 Qué debes hacer</b><br><span class="muted small">Calienta 5–10 min. Respeta el orden. Deja 1–2 reps en reserva. Progresa subiendo 1 rep o algo de carga cuando domines el rango. Descansa según objetivo. Registra cada serie con ＋ y bebe agua.</span></div>`}
function recText(p,modo){return p.estilo==="auto"?`Recomendación del agente: con ${p.dias.length} día(s) te sugiero <b>${modo==="fullbody"?"FULL BODY":"POR GRUPOS MUSCULARES"}</b>. ${modo==="fullbody"?"Ideal con pocos días o si prefieres trabajar todo el cuerpo cada sesión.":"Ideal con 3+ días para dar más volumen a cada grupo."}`:`Elegiste el modo <b>${modo==="fullbody"?"FULL BODY":"POR GRUPOS MUSCULARES"}</b>; lo respeto y lo organizo. Puedes cambiarlo cuando quieras.`}
function showPlan(){const p=prof();
 if(p.les==="si"&&!p.sint.trim()){const r="Antes de generar tu plan necesito saber tus lesiones, síntomas o restricciones (regla de seguridad). Escríbelas en el campo 'Lesiones/síntomas'. No diagnostico: si son persistentes, consulta a un profesional.";add("Agente",r);say(r);return}
 const pl=plan(p);
 const head=`<p><b>Nivel ${p.nivel} · Objetivo ${(DIET[p.obj]||DIET.salud).t} · ${p.min} min · ${pl.length} días: ${p.dias.join(", ")}</b>${p.sint?` · ⚠️ ${p.sint}`:""}</p><p class="muted small">${ADAPT} ${SRC_NOTE}${p.les==="si"?` Tus molestias declaradas (${p.sint}) no sustituyen una valoración profesional.`:""}</p><p class="muted small">${recText(p,modoDe(p))}</p>`;
 const days=pl.map(d=>`<div class="ej"><b>${d.dia} — ${d.foco}</b><br>`+d.ej.map(e=>`<div class="exrow"><img class="thumb" src="./img/${e.id}.png" alt="${e.n}" onerror="this.style.display='none'"><div>· <b>${e.n}</b> — ${e.dosis} — desc ${e.desc}s <button data-p="${e.id}">＋</button>${e.cue?`<br><span class="muted small">Cómo: ${e.cue}</span>`:""}${e.ejec?`<details class="ficha"><summary>Ver técnica y errores</summary><div><b>Ejecución:</b> ${e.ejec}</div>${e.err?`<div><b>Errores:</b> ${e.err}</div>`:""}${e.g?`<div><b>Grupo:</b> ${e.g}</div>`:""}</details>`:""}</div></div>`).join("")+"</div>").join("");
 const cta=`<div class="ej"><b>🤝 ¿Quieres orientación con Miguel?</b><br><span class="muted small">El agente te guía dentro de la app (plan, técnica y dieta orientativa). Para dudas técnicas personalizadas, puedes escribirle directo.</span><div class="row"><a class="wa-btn" href="https://wa.me/593985718915?text=Hola%20Miguel%2C%20tengo%20dudas%20sobre%20mi%20plan%20BIG%20BOSS" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.54-3.7 8.23-8.24 8.23z"/></svg>Consultar con Miguel</a></div></div>`;
 $a("a_plan").innerHTML=head+days+needsHtml(p)+guideHtml()+dietHtml(p)+cta;
 document.querySelectorAll("#a_plan button").forEach(b=>{if(b.dataset.p)b.onclick=()=>{if(window.setReg)setReg(b.dataset.p);else document.getElementById("r_ej").value=b.dataset.p;document.querySelector('[data-tab="reg"]').click()}});
 add("Agente",`Plan listo: ${pl.length} días (${p.dias.join(", ")}), enfocado por grupos musculares. Marca cada ejercicio con ＋ para registrarlo. Pregúntame 'cómo hacer X', 'ejercicios para espalda' o 'dieta para ${(DIET[p.obj]||DIET.salud).t}'. Si quieres orientación personal, usa "Consultar con Miguel".`);
 say(`Plan listo: ${pl.length} días, ${p.dias.join(", ")}. Enfoque por grupos musculares, con técnica y dieta.`);
}

let vozOn=false;
function say(t){if(!vozOn||!("speechSynthesis"in window))return;speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}
function add(u,t){const box=$a("chat");if(!box)return;box.innerHTML+=`<div><b>${u}:</b> ${t}</div>`;box.scrollTop=9999}

const GROUP_MAP=[[/pecho|pectoral|empuje/,["Empuje"]],[/espalda|dorsal|dominada|tiron|tirón/,["Tirón"]],[/hombro|deltoid|militar/,["Empuje"]],[/biceps|bíceps|brazo|bicep/,["Tirón"]],[/triceps|tríceps|tricep/,["Empuje"]],[/pierna|cuadriceps|cuádriceps|gluteo|glúteo|femoral|isquio|sentadilla/,["Pierna"]],[/core|abdomen|abdominal|plancha|abs/,["Core"]],[/gemelo|pantorrilla/,["Pierna"]]];
function groupAnswer(q){for(const [re,gs] of GROUP_MAP){if(re.test(q)){const list=BIBLIO.filter(e=>gs.includes(e.g)).slice(0,5);if(!list.length)continue;return `Ejercicios de ${gs.join("/")}: ${list.map(e=>`<b>${e.n}</b> (${e.dosis})`).join(" · ")}. Pídeme 'cómo hacer X' para la técnica, o genera el plan y te los ubico por día. ${ADAPT}`}}return null}

function chatQ(q0){const q=q0.toLowerCase();const p=prof();
 add("Tú",q0);
 if(/dolor.*pecho|desmay|falta.*aire|disnea|palpitac|mareo fuerte|hormigueo|perdida de fuerza|pérdida de fuerza/.test(q)){const r="⛔ Señal de alarma: detén el entreno y busca atención médica/urgencias. No sigo con la rutina (regla 7).";add("Agente",r);say(r);return}
 if(/dolor|molestia|lesion|lesión|hombro|rodilla|muñeca|codo|espalda|lumbar/.test(q)){const r="No diagnostico (regla 1). Si hay dolor agudo, detén ese ejercicio, usa una variante fácil y baja el volumen ~50%. Si persiste o hay pérdida de fuerza/hormigueo, consulta a un profesional (regla 4).";add("Agente",r);say(r);return}
 if(/rehabilit|rehabilitaci|terapia|recupera.*lesion|tratamiento/.test(q)){const r="Una rutina general no es rehabilitación (regla 2). La rehabilitación la prescribe un profesional tras valorarte. Yo solo puedo darte adaptación general para persona sana (regla 5).";add("Agente",r);say(r);return}
 if(/progresion|progresión|subir.*peso|aumentar.*carga|mas dificil|más difícil|avanzar/.test(q)){if(p.les==="si"&&!p.sint.trim()){const r="Antes de progresar dime tus lesiones/síntomas/restricciones (regla 3).";add("Agente",r);say(r);return}}
 if(/cuantos dias|cuántos días|que dias|qué días|dias de entren|días de entren|frecuencia|cada semana|cuantos veces/.test(q)){const r=`Tú eliges los días: marca en "Días de entrenamiento" los que quieras (2 a 7). Yo armo el plan por grupos musculares según cuántos sean: 2=superior/inferior, 3=empuje/tirón/pierna, 4=+full, 5–6=+hombro/brazo/core/skill. Marca tus días y pulsa "Generar mi plan".`;add("Agente",r);say(r);return}
 if(/dieta|comer|aliment|comida|proteina|proteína|nutricion|nutrición|caloria|caloría|kcal/.test(q)){const d=dietFor(p.obj);const r=`Objetivo ${d.t}: ${d.x} Orientación general, no clínica; con condiciones de salud consulta a un profesional (WhatsApp de Miguel para orientación).`;add("Agente",r);say(r);return}
 if(/full ?body|cuerpo completo|por grupos|grupo muscular|grupos musculares|split|como organizo|como distribuyo|reparto/.test(q)){const r=`Puedes elegir el tipo en el selector "Tipo": <b>AUTO</b> (yo te recomiendo), <b>POR GRUPOS MUSCULARES</b> o <b>FULL BODY</b>. Ahora mismo: ${p.estilo==="auto"?"AUTO → "+modoDe(p):p.estilo}, con ${p.dias.length} día(s). Cámbialo y pulsa "Generar mi plan".`;add("Agente",r);say(r);return}
 const g=groupAnswer(q);if(g){add("Agente",g);return}
 if(/como hago|como se hace|cómo hacer|tecnica|técnica|ejecucion|ejecución/.test(q)){const m=q.match(/[a-záéíóúñ-]+/g)||[];const hit=BIBLIO.find(e=>m.includes(e.id)||q.includes(e.n.toLowerCase()));if(hit){const r=`<b>${hit.n}</b> — Ejecución: ${hit.ejec||"ver pestaña Biblioteca"}${hit.err?` · Errores: ${hit.err}`:""}${hit.init?` · Inicio: ${hit.init}`:""}`;add("Agente",r);return}add("Agente","Dime el ejercicio (ej: 'cómo hacer dominadas') y te doy la técnica. También puedes verlo en Biblioteca con foto.");return}
 if(/descanso/.test(q)){const r=`Descansos: compuestos ${descanso(p.obj,true)}s, accesorios 45-60s, isométricos según nivel. Objetivo ${(DIET[p.obj]||DIET.salud).t}.`;add("Agente",r);say(r);return}
 if(/hoy|rutina|plan|genera|recomienda|arma/.test(q)){showPlan();add("Agente","Generé tu plan arriba según días, nivel, equipo, tiempo y objetivo. Dime qué completaste y lo ajusto. "+ADAPT+" "+SRC_NOTE);return}
 if(/dominada/.test(q)){add("Agente","Dominadas: si haces <5 seguidas usa asistidas/negativas 3x5; si 6-10 sigue 4x6-10 con 90s. ¿Cuántas lograste? ("+ADAPT+")");return}
 if(/flexion|flexión/.test(q)){add("Agente","Empuje: estándar 3-4x10-15, pike 3x8-10, diamante 3x8-12. Principiante empieza con rodillas 2-3 series. ("+ADAPT+")");return}
 if(/peso|estatura|fisico|físico/.test(q)){add("Agente",`Peso/estatura solo contextualizan la carga, no la aptitud. Nivel ${p.nivel}, objetivo ${(DIET[p.obj]||DIET.salud).t}. Dime reps controladas y esfuerzo 1-10 y te ajusto.`);return}
 if(/contacto|whatsapp|hablar con miguel|consulta.*miguel|entrenador humano|persona real|asesor/.test(q)){const r="Puedes consultar directo con Miguel (orientación en calistenia, técnicas y ejercicios) por WhatsApp: +593 98 571 8915 → https://wa.me/593985718915 . Yo te asisto en la app; Miguel es tu entrenador para dudas técnicas.";add("Agente",r);say(r);return}
 add("Agente","Puedo armar tu plan según los DÍAS que elijas y tu objetivo, por grupos musculares, con técnica y dieta orientativa. Pregúntame: 'cuántos días', 'ejercicios para espalda', 'cómo hacer fondos', 'dieta para hipertrofia'. "+ADAPT);
}

document.addEventListener("DOMContentLoaded",()=>{
 $a("a_gen").onclick=showPlan;
 $a("a_save").onclick=()=>{localStorage.setItem("bb_prof",JSON.stringify(prof()));alert("Perfil guardado")};
 try{const s=JSON.parse(localStorage.getItem("bb_prof"));if(s){$a("a_nivel").value=s.nivel;$a("a_obj").value=s.obj;$a("a_peso").value=s.peso||"";$a("a_est").value=s.est||"";$a("a_tiempo").value=s.min||45;$a("a_equipo").value=s.equipo||"";if($a("a_estilo")&&s.estilo)$a("a_estilo").value=s.estilo;if($a("a_les"))$a("a_les").value=s.les||"no";if($a("a_sintomas"))$a("a_sintomas").value=s.sint||"";if(s.dias&&Array.isArray(s.dias))document.querySelectorAll('#a_dias input').forEach(x=>x.checked=s.dias.includes(x.value))}}catch{}
 if(!document.querySelector('#a_dias input:checked'))["Lunes","Miércoles","Viernes"].forEach(d=>{const el=document.querySelector(`#a_dias input[value="${d}"]`);if(el)el.checked=true});
 add("Agente","¡Hola! Soy tu agente BIG BOSS. Elige tu objetivo, marca tus DÍAS y el TIPO (por grupos musculares o full body). Yo armo tu plan, te explico la técnica, qué necesitas y la dieta orientativa. Para orientación personal, puedes consultar a Miguel por WhatsApp. ¿Empezamos?");
 $("chatSend").onclick=()=>{const v=$("chatIn").value.trim();if(v){chatQ(v);$("chatIn").value=""}};
 $("chatIn").addEventListener("keydown",e=>{if(e.key==="Enter")$("chatSend").click()});
 $("vozBtn").onclick=e=>{vozOn=!vozOn;e.target.style.opacity=vozOn?1:.5;if(vozOn)say("Agente BIG BOSS activado")};
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null;
 $("micBtn").onclick=()=>{if(!SR){alert("Tu navegador no tiene dictado. Escribe.");return}if(rec){rec.stop();rec=null;return}rec=new SR();rec.lang=localStorage.getItem("bb_lang")==="en"?"en-US":"es-ES";rec.onresult=e=>{chatQ(e.results[0][0].transcript)};rec.onend=()=>rec=null;rec.start()};
});
