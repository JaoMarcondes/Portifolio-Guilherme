const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const bookingForm = document.getElementById('bookingForm');

const onScroll = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = !menuToggle.classList.contains('is-active');
  menuToggle.classList.toggle('is-active', open);
  navLinks?.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('is-active');
    navLinks?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(bookingForm);
  const nome = String(data.get('nome') || '').trim();
  const servico = String(data.get('servico') || '').trim();
  const horario = String(data.get('data') || '').trim();
  const observacoes = String(data.get('observacoes') || '').trim();

  const message = [
    'Olá! Quero agendar um horário na Golden Blend.',
    '',
    `Nome: ${nome}`,
    `Serviço: ${servico}`,
    horario ? `Preferência: ${horario}` : null,
    observacoes ? `Observação: ${observacoes}` : null,
  ].filter(Boolean).join('\n');

  const phone = '5519983273927';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
