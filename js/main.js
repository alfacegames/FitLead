 Animação de entrada nos cards ──
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
