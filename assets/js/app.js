const translations = {
  en: {"eyebrow":"SOFTWARE ENGINEERING · FINANCIAL TECHNOLOGY","what-i-work-with":"WHAT I WORK WITH","technical-skills":"Technical skills","career":"CAREER","experience":"Professional experience","learning":"LEARNING","education":"Education","lets-connect":"LET'S CONNECT","contact-heading":"Interested in working together?","contact-copy":"I'm open to fully remote opportunities. Reach out through LinkedIn or email.","download":"Download / Print CV","share":"Share profile","footer-note":"Built as a lightweight, accessible GitHub Pages CV.","email-me":"Email me","details":"More about this role"},
  pt: {"eyebrow":"ENGENHARIA DE SOFTWARE · TECNOLOGIA FINANCEIRA","what-i-work-with":"TECNOLOGIAS","technical-skills":"Competências técnicas","career":"CARREIRA","experience":"Experiência profissional","learning":"FORMAÇÃO","education":"Formação acadêmica","lets-connect":"VAMOS CONVERSAR","contact-heading":"Vamos trabalhar juntos?","contact-copy":"Estou aberto a oportunidades 100% remotas. Entre em contato pelo LinkedIn ou e-mail.","download":"Baixar / Imprimir currículo","share":"Compartilhar perfil","footer-note":"Currículo leve e acessível, publicado no GitHub Pages.","email-me":"Enviar e-mail","details":"Mais sobre esta experiência"}
};
let currentLang = "en";
let currentData = null;
async function loadData(lang) {
  const response = await fetch(`data/resume-${lang}.json`);
  if (!response.ok) throw new Error("Could not load resume data");
  return response.json();
}
function el(id){return document.getElementById(id)}
function render(data, lang) {
  currentData = data;
  document.documentElement.lang = lang;
  document.title = `${data.name} | ${data.headline}`;
  el("name").textContent = data.name;
  el("headline").textContent = data.headline;
  el("tagline").textContent = data.tagline;
  el("summary").textContent = data.summary;
  el("location").textContent = data.location;
  el("availability").textContent = data.availability;
  const c = data.contact;
  ["linkedin-link","contact-linkedin"].forEach(id => el(id).href = c.linkedin);
  el("github-link").href = c.github;
  const emailValid = c.email && !c.email.startsWith("[");
  ["email-link","contact-email"].forEach(id => {
    el(id).href = emailValid ? `mailto:${c.email}` : "#";
    if (!emailValid) { el(id).addEventListener("click", e => {e.preventDefault(); alert(lang==="pt"?"Adicione seu e-mail em data/resume-pt.json e data/resume-en.json.":"Add your email in data/resume-en.json and data/resume-pt.json.");}, {once:true}); }
  });
  el("skills-grid").innerHTML = Object.entries(data.skills).map(([group, skills]) =>
    `<article class="skill-card"><h3>${escapeHtml(group)}</h3><div class="chips">${skills.map(s=>`<span class="chip">${escapeHtml(s)}</span>`).join("")}</div></article>`
  ).join("");
  el("experience-list").innerHTML = data.experience.map((job,i) =>
    `<article class="job"><div class="job-top"><div><h3>${escapeHtml(job.company)}</h3><div class="role">${escapeHtml(job.role)}</div></div><div class="dates">${escapeHtml(job.dates)}</div></div><div class="location">${escapeHtml(job.location || "")}</div><p>${escapeHtml(job.description)}</p></article>`
  ).join("");
  el("education-list").innerHTML = data.education.map(item =>
    `<article class="education-card"><h3>${escapeHtml(item.qualification)}</h3><p>${escapeHtml(item.institution)}</p><p class="date">${escapeHtml(item.dates)}</p></article>`
  ).join("");
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const key = node.dataset.i18n;
    if (translations[lang][key]) node.textContent = translations[lang][key];
  });
  el("language-toggle").textContent = lang === "en" ? "PT" : "EN";
  el("year").textContent = new Date().getFullYear();
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
el("language-toggle").addEventListener("click", async () => {
  currentLang = currentLang === "en" ? "pt" : "en";
  try { render(await loadData(currentLang), currentLang); }
  catch(e) { console.error(e); }
});
el("print-button").addEventListener("click", () => window.print());
el("share-button").addEventListener("click", async () => {
  const shareData = {title: document.title, text: currentData.tagline, url: window.location.href};
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) { await navigator.clipboard.writeText(window.location.href); el("share-status").textContent = currentLang==="pt"?"Link copiado para a área de transferência.":"Profile link copied to clipboard."; }
    else { el("share-status").textContent = window.location.href; }
  } catch(err) { if (err.name !== "AbortError") el("share-status").textContent = window.location.href; }
});
loadData(currentLang).then(data=>render(data,currentLang)).catch(err=>{
  console.error(err); el("summary").textContent="Could not load resume data. Please run this site through a local web server or GitHub Pages.";
});
