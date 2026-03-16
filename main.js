// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});

// ── Scroll suave para botões de plano ──
function scrollToContato() {
  document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Formulário ──
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (!nome || !email || !telefone) {
    alert('Por favor, preencha todos os campos obrigatórios (*).');
    return;
  }

  this.style.display = 'none';
  document.getElementById('form-success').classList.add('show');
});

// ── Acessibilidade: tamanho da fonte ──
let fontScale = 1;

function changeFontSize(dir) {
  fontScale = Math.max(0.8, Math.min(1.4, fontScale + dir * 0.1));
  document.documentElement.style.setProperty('--font-scale', fontScale);
}

// ── Acessibilidade: alto contraste ──
let contrastOn = false;

function toggleContrast() {
  contrastOn = !contrastOn;
  document.body.classList.toggle('high-contrast', contrastOn);
  document.getElementById('contrast-btn').textContent = contrastOn ? 'Contraste normal' : 'Alto contraste';
}

// ── Acessibilidade: texto em voz ──
let speaking = false;

function readPage() {
  if (!('speechSynthesis' in window)) {
    alert('Seu navegador não suporta leitura em voz.');
    return;
  }
  if (speaking) {
    window.speechSynthesis.cancel();
    speaking = false;
    document.getElementById('tts-btn').textContent = '▶ Ouvir';
    return;
  }
  const text = document.getElementById('conteudo-principal').innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.95;
  utterance.onend = () => {
    speaking = false;
    document.getElementById('tts-btn').textContent = '▶ Ouvir';
  };
  window.speechSynthesis.speak(utterance);
  speaking = true;
  document.getElementById('tts-btn').textContent = '⏹ Parar';
}

// ── Scroll suave para âncoras ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Animação de entrada nos cards ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.benefit-card, .plan-card, .dep-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});
