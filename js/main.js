document.addEventListener('DOMContentLoaded', function () {

  // Hamburger menu
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

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

  // Fechar menu mobile ao clicar em link
  var mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Botão "Quero minha semana grátis" no card hero -> scroll para formulário
  var btnSemana = document.getElementById('btn-semana-gratis');
  if (btnSemana) {
    btnSemana.addEventListener('click', function () {
      document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Botões de planos -> scroll para formulário
  var btnPlanos = document.querySelectorAll('.btn-plano');
  btnPlanos.forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Campo WhatsApp: só permite números, parênteses, espaço, + e -
  var campoTelefone = document.getElementById('telefone');
  if (campoTelefone) {
    campoTelefone.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9()\s+\-]/g, '');
    });
    campoTelefone.addEventListener('keypress', function (e) {
      var allowed = /[0-9()\s+\-]/;
      if (!allowed.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
        e.preventDefault();
      }
    });
  }

  // Formulário
  var form = document.getElementById('contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var telefone = document.getElementById('telefone').value.trim();
    if (!nome || !email || !telefone) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }
    form.style.display = 'none';
    document.getElementById('form-success').classList.add('show');
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
    document.getElementById('contrast-btn').textContent = window.contrastOn ? 'Contraste normal' : 'Alto contraste';
  };

  // Acessibilidade: leitura em voz
  window.speaking = false;
  window.readPage = function () {
    if (!('speechSynthesis' in window)) { alert('Seu navegador não suporta leitura em voz.'); return; }
    if (window.speaking) {
      window.speechSynthesis.cancel();
      window.speaking = false;
      document.getElementById('tts-btn').textContent = '▶ Ouvir';
      return;
    }
    var text = document.getElementById('conteudo-principal').innerText;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.onend = function () {
      window.speaking = false;
      document.getElementById('tts-btn').textContent = '▶ Ouvir';
    };
    window.speechSynthesis.speak(utterance);
    window.speaking = true;
    document.getElementById('tts-btn').textContent = '⏹ Parar';
  };

  // Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animação de entrada nos cards
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.benefit-card, .plan-card, .dep-card').forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

});
