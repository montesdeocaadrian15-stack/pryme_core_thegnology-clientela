// Número de WhatsApp con indicativo, sin signos (ejemplo: 573001234567). Vacío = WhatsApp deja elegir el contacto.
const WHATSAPP = "573233998618";
const SERVICIOS = [
  {n:"Diagnóstico exprés", p:"$5.000", d:"10 minutos", t:"Revisión del espacio y de la salud del disco, con recomendación personalizada."},
  {n:"Limpieza y optimización", p:"$15.000", d:"30 minutos", t:"Diagnóstico incluido, liberación de espacio, limpieza de temporales y ajuste del inicio.", star:true},
  {n:"Mantenimiento preventivo", p:"$25.000", d:"45 minutos", t:"Limpieza y optimización más verificación de archivos del sistema. Recomendado cada 3 meses."},
  {n:"Instalación y activación de Office", p:"$20.000 a $25.000", d:"20 a 30 minutos", t:"Con la licencia que tú suministras."}
];
const EXTRA = {n:"Respaldo y migración de archivos", p:"$5.000", t:"Copia de seguridad y configuración de OneDrive. Se suma a cualquier servicio."};

const lista = document.getElementById("lista"), sel = document.getElementById("srv");
SERVICIOS.forEach((s, i) => {
  lista.insertAdjacentHTML("beforeend",
    `<article class="card${s.star ? " star" : ""}">${s.star ? '<span class="tag">MÁS ELEGIDO</span>' : ""}
      <h3>${s.n}</h3><div class="price">${s.p}</div><div class="dur">${s.d}</div><p>${s.t}</p>
      <a class="btn sm" href="#agenda" data-i="${i}">Agendar</a></article>`);
  sel.insertAdjacentHTML("beforeend", `<option value="${i}">${s.n} (${s.p})</option>`);
});
sel.insertAdjacentHTML("beforeend", `<option value="x">${EXTRA.n} (${EXTRA.p})</option>`);
document.getElementById("extra").innerHTML =
  `<div><strong>${EXTRA.n}</strong> · ${EXTRA.p}<br><span style="color:var(--muted);font-size:.92rem">${EXTRA.t}</span></div>`;

lista.addEventListener("click", e => {
  const a = e.target.closest("a[data-i]");
  if (a) { sel.value = a.dataset.i; update(); }
});

const nom = document.getElementById("nom"), hor = document.getElementById("hor"), wa = document.getElementById("wa");
function update() {
  const s = sel.value === "x" ? EXTRA : SERVICIOS[+sel.value];
  const quien = nom.value.trim() || "un cliente";
  const msg = `Hola, soy ${quien}. Quiero agendar el servicio “${s.n}” (${s.p}). Mi horario preferido es ${hor.value.toLowerCase()}. ¿Qué disponibilidad tienen?`;
  wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
["input", "change"].forEach(ev => document.getElementById("f").addEventListener(ev, update));
update();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    "#servicios .eyebrow, #servicios h2, #servicios .sub, #extra, #proceso .eyebrow, #proceso h2, #proceso .sub, #nosotros .eyebrow, #nosotros h2, #nosotros .sub, #agenda .eyebrow, #agenda h2, #agenda .sub, #lista .card, .step, .why > div, #agenda form"
  );
  revealTargets.forEach((element, index) => {
    element.setAttribute("data-reveal", "");
    if (element.matches("#lista .card")) {
      element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
    } else if (element.matches(".step, .why > div")) {
      element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
    }
  });
  document.documentElement.classList.add("reveal-ready");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  revealTargets.forEach(element => revealObserver.observe(element));

}
if ("IntersectionObserver" in window) {
  const navLinks = document.querySelectorAll('.nav a.link[href^="#"]');
  const navSections = document.querySelectorAll("main > section");
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  navSections.forEach(section => navObserver.observe(section));
}
