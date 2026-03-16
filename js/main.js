// Hamburger
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    function closeMenu() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
    });

    // Scroll para contato
    function scrollToContato() {
      document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Formulário
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var nome = document.getElementById('nome').value.trim();
      var email = document.getElementById('email').value.trim();
      var telefone = document.getElementById('telefone').value.trim();
      if (!nome || !email || !telefone) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
      }
      this.style.display = 'none';
      document.getElementById('form-success').classList.add('show');
    });

    // Fonte
    var fontScale = 1;
    function changeFontSize(dir) {
      fontScale = Math.max(0.8, Math.min(1.4, fontScale + dir * 0.1));
      document.documentElement.style.setProperty('--font-scale', fontScale);
    }

    // Contraste
    var contrastOn = false;
    function toggleContrast() {
      contrastOn = !contrastOn;
      document.body.classList.toggle('high-contrast', contrastOn);
      document.getElementById('contrast-btn').textContent = contrastOn ? 'Contraste normal' : 'Alto contraste';
    }

    // Leitura em voz
    var speaking = false;
    function readPage() {
      if (!('speechSynthesis' in window)) { alert('Seu navegador não suporta leitura em voz.'); return; }
      if (speaking) {
        window.speechSynthesis.cancel();
        speaking = false;
        document.getElementById('tts-btn').textContent = '▶ Ouvir';
        return;
      }
      var text = document.getElementById('conteudo-principal').innerText;
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = function() { speaking = false; document.getElementById('tts-btn').textContent = '▶ Ouvir'; };
      window.speechSynthesis.speak(utterance);
      speaking = true;
      document.getElementById('tts-btn').textContent = '⏹ Parar';
    }

    // Scroll suave em âncoras
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });

    // Animação de entrada
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });