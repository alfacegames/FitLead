document.addEventListener('DOMContentLoaded', function () {

  // ── A+ / A- : aumenta/diminui TODOS os textos da página ──
  // Funciona alterando o font-size do <html>, que serve de base para todos os rem/em
  var baseFontSize = 16; // px base

  window.changeFontSize = function (dir) {
    // Pega o tamanho atual
    var current = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    var novo = current + (dir * 2); // incremento de 2px por clique
    // Limita entre 12px e 26px
    novo = Math.max(12, Math.min(26, novo));
    document.documentElement.style.fontSize = novo + 'px';
  };

  // ── Hamburger ──
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Scroll suave para âncoras ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Animação de entrada ──
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.benefit-card, .plan-card, .dep-card, .caso-stat').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ── Alto contraste ──
  window.contrastOn = false;
  window.toggleContrast = function () {
    window.contrastOn = !window.contrastOn;
    document.body.classList.toggle('high-contrast', window.contrastOn);
    var btn = document.getElementById('contrast-btn');
    if (btn) btn.textContent = window.contrastOn ? 'Contraste normal' : 'Alto contraste';
  };

  // ── Leitura em voz ──
  window.speaking = false;
  window.readPage = function () {
    if (!('speechSynthesis' in window)) { alert('Seu navegador nao suporta leitura em voz.'); return; }
    if (window.speaking) {
      window.speechSynthesis.cancel();
      window.speaking = false;
      var btn = document.getElementById('tts-btn');
      if (btn) btn.textContent = '▶ Ouvir';
      return;
    }
    var main = document.getElementById('conteudo-principal') || document.body;
    var utterance = new SpeechSynthesisUtterance(main.innerText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.onend = function () {
      window.speaking = false;
      var btn = document.getElementById('tts-btn');
      if (btn) btn.textContent = '▶ Ouvir';
    };
    window.speechSynthesis.speak(utterance);
    window.speaking = true;
    var btn = document.getElementById('tts-btn');
    if (btn) btn.textContent = '⏹ Parar';
  };

});
