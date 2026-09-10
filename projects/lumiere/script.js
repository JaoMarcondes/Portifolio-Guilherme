const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fallback: if salon-bg.mp4 is not present, the generated image remains visible.
const heroVideo = document.getElementById('heroVideo');
heroVideo?.addEventListener('canplay', () => {
  heroVideo.classList.add('is-ready');
});
heroVideo?.addEventListener('error', () => {
  heroVideo.style.display = 'none';
});
const source = heroVideo?.querySelector('source');
source?.addEventListener('error', () => {
  heroVideo.style.display = 'none';
});

if (reduceMotion && heroVideo) {
  heroVideo.pause();
  heroVideo.style.display = 'none';
}

document.addEventListener('visibilitychange', () => {
  if (!heroVideo || reduceMotion) return;
  if (document.hidden) heroVideo.pause();
  else heroVideo.play().catch(() => {});
});

// Reveal animation
const items = document.querySelectorAll('.reveal, .reveal-mask');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
items.forEach(el => io.observe(el));

// Navigation glass + active section
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.nav__links a')];
const sections = [...document.querySelectorAll('main section[id]')];
function onScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
  const y = window.scrollY + window.innerHeight * .32;
  let current = 'inicio';
  sections.forEach(s => {
    if (s.offsetTop <= y) current = s.id;
  });
  navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Magnetic buttons
if (!reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * .08}px, ${y * .12}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}

// Custom cursor
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (!reduceMotion && dot && ring && matchMedia('(pointer:fine)').matches) {
  let mx = -100, my = -100, rx = -100, ry = -100;
  window.addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });
  function tick() {
    rx += (mx - rx) * .15; ry += (my - ry) * .15;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  tick();
  document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
}

// Gentle image parallax. It only moves the image inside its own crop,
// so the layout stays stable and the effect remains subtle.
if (!reduceMotion) {
  const parallaxImages = [...document.querySelectorAll('[data-parallax] img')];
  let parallaxTicking = false;
  const renderParallax = () => {
    const vh = window.innerHeight;
    parallaxImages.forEach(img => {
      const frame = img.parentElement.getBoundingClientRect();
      if (frame.bottom < -100 || frame.top > vh + 100) return;
      const center = frame.top + frame.height / 2;
      const normalized = (center - vh / 2) / vh;
      const y = Math.max(-22, Math.min(22, normalized * -24));
      img.style.transform = `translate3d(0, calc(-5% + ${y}px), 0) scale(1.045)`;
    });
    parallaxTicking = false;
  };
  const requestParallax = () => {
    if (!parallaxTicking) {
      parallaxTicking = true;
      requestAnimationFrame(renderParallax);
    }
  };
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  requestParallax();
}
