let currentLang = 'en';

function applyLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    if (el.tagName === 'P' || el.tagName === 'SPAN' || el.tagName === 'H2' || el.tagName === 'H1') {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });
  document.getElementById('langBtn').textContent = lang === 'en' ? 'ES' : 'EN';
  const msg = document.getElementById('message');
  if (msg) msg.placeholder = lang === 'en' ? 'Message' : 'Mensaje';
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  applyLang(currentLang);
}

function toggleMenu() {
  const m = document.getElementById("mobileMenu");
  m.classList.toggle("open");
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const starsEl = document.getElementById("stars");
  for (let i = 0; i < 50; i++) {
    const s = document.createElement("div");
    s.style.position = "absolute";
    s.style.background = "white";
    s.style.width = "2px";
    s.style.height = "2px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 80 + "%";
    s.style.opacity = Math.random();
    starsEl.appendChild(s);
  }
});
