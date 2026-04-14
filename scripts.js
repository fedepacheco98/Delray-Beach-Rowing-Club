// ── LANGUAGE TOGGLE ──────────────────────────────────────────────
var currentLang = 'en';

function applyLang(lang) {
  document.querySelectorAll('[data-en]').forEach(function(el) {
    var val = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    if (!val) return;
    var tag = el.tagName.toLowerCase();
    if (tag === 'p' || tag === 'div' || tag === 'span') {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  var msgArea = document.getElementById('message');
  if (msgArea) {
    msgArea.placeholder = lang === 'en'
      ? 'Tell us how we can help you...'
      : 'Cuéntanos cómo podemos ayudarte...';
  }
  document.getElementById('langBtn').textContent = lang === 'en' ? 'ES' : 'EN';
  document.documentElement.lang = lang;
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  applyLang(currentLang);
}

// ── MOBILE MENU ───────────────────────────────────────────────────
function toggleMenu() {
  var m = document.getElementById("mobileMenu");
  var b = document.getElementById("hamburger");
  var o = m.classList.toggle("open");
  b.classList.toggle("open");
  document.body.style.overflow = o ? "hidden" : "";
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
  document.body.style.overflow = "";
}

// ── DOM READY ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {

  // Stars
  var starsEl = document.getElementById("stars");
  if (starsEl) {
    for (var i = 0; i < 80; i++) {
      var s = document.createElement("div");
      s.className = "star";
      s.style.left = (Math.random() * 100) + "%";
      s.style.top = (Math.random() * 70) + "%";
      s.style.setProperty("--d", (2 + Math.random() * 4) + "s");
      s.style.setProperty("--o", (0.2 + Math.random() * 0.6));
      s.style.animationDelay = (Math.random() * 4) + "s";
      s.style.width = s.style.height = (1 + Math.random() * 2) + "px";
      starsEl.appendChild(s);
    }
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach(function(r) { r.classList.add("animate"); });
  if (window.IntersectionObserver) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e, i) {
        if (e.isIntersecting) {
          setTimeout(function() { e.target.classList.add("visible"); }, i * 80);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function(r) { obs.observe(r); });
  } else {
    reveals.forEach(function(r) { r.classList.add("visible"); });
  }

  // Carousel
  var ci = 0, ct = 3, ca = null;
  var track = document.getElementById("carouselTrack");

  function updateCarousel() {
    if (track) track.style.transform = "translateX(-" + (ci * 100) + "%)";
    document.querySelectorAll(".carousel-dot").forEach(function(d, i) {
      d.classList.toggle("active", i === ci);
    });
  }

  function moveCarousel(dir) {
    ci = (ci + dir + ct) % ct;
    updateCarousel();
    resetAuto();
  }

  function resetAuto() {
    if (ca) clearInterval(ca);
    ca = setInterval(function() { moveCarousel(1); }, 5000);
  }

  var btnPrev = document.getElementById("btnPrev");
  var btnNext = document.getElementById("btnNext");
  if (btnPrev) btnPrev.addEventListener("click", function() { moveCarousel(-1); });
  if (btnNext) btnNext.addEventListener("click", function() { moveCarousel(1); });

  document.querySelectorAll(".carousel-dot").forEach(function(dot) {
    dot.addEventListener("click", function() {
      ci = parseInt(this.getAttribute("data-slide"));
      updateCarousel();
      resetAuto();
    });
  });
  resetAuto();

  // Contact form
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, { method: "POST", body: data, headers: { "Accept": "application/json" } })
        .then(function(r) {
          if (r.ok) {
            form.style.display = "none";
            var s = document.getElementById("formSuccess");
            if (s) s.style.display = "block";
          } else {
            alert(currentLang === 'en' ? "Error sending. Please try again." : "Error al enviar. Por favor intenta de nuevo.");
          }
        })
        .catch(function() {
          alert(currentLang === 'en' ? "Error sending. Please try again." : "Error al enviar. Por favor intenta de nuevo.");
        });
    });
  }

});
