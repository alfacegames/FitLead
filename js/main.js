document.addEventListener('DOMContentLoaded', function () {

  // Hamburger menu
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

  // Scroll suave para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Acessibilidade: tamanho de fonte
  window.fontScale = 1;
  window.changeFontSize = function (dir) {
    window.fontScale = Math.max(0.8, Math.min(1.4, window.fontScale + dir * 0.1));
    document.documentElement.style.setProperty('--font-scale', window.fontScale);
  };

  // Acessibilidade: alto contraste
  window.contrastOn = false;
  window.toggleContrast = function () {
    window.contrastOn = !window.contrastOn;
    document.body.classList.toggle('high-contrast', window.contrastOn);
    var btn = document.getElementById('contrast-btn');
    if (btn) btn.textContent = window.contrastOn ? 'Contraste normal' : 'Alto contraste';
  };

  // Acessibilidade: leitura em voz
  window.speaking = false;
  window.readPage = function () {
    if (!('speechSynthesis' in window)) { alert('Seu navegador não suporta leitura em voz.'); return; }
    if (window.speaking) {
      window.speechSynthesis.cancel();
      window.speaking = false;
      var btn = document.getElementById('tts-btn');
      if (btn) btn.textContent = '▶ Ouvir';
      return;
    }
    var main = document.getElementById('conteudo-principal');
    if (!main) return;
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

  // Animação de entrada nos cards
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.benefit-card, .plan-card, .dep-card, .caso-stat').forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }

});
