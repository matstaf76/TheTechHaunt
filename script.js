document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.path-card, .story-card, .cta-panel, .evidence-note');

revealItems.forEach((item) => item.classList.add('reveal'));

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));

  window.addEventListener('pointermove', (event) => {
    document.body.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.body.style.setProperty('--pointer-y', `${event.clientY}px`);

    const art = document.querySelector('.hero-art');
    if (art) {
      const x = ((event.clientX / window.innerWidth) - 0.5) * -12;
      const y = ((event.clientY / window.innerHeight) - 0.5) * -8;
      art.style.setProperty('--drift-x', `${x}px`);
      art.style.setProperty('--drift-y', `${y}px`);
    }
  }, { passive: true });
}
