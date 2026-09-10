const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const remap = (v, a, b) => clamp((v - a) / (b - a));

const heroSection = document.querySelector('.hero-sequence');
const heroImage = document.getElementById('clinicImage');
const darkness = document.getElementById('heroDarkness');
const lightA = document.getElementById('lightA');
const lightB = document.getElementById('lightB');
const lightWall = document.getElementById('lightWall');
const lightFloor = document.getElementById('lightFloor');
const reflection = document.getElementById('heroReflection');
const progressLabel = document.getElementById('progressLabel');
const scrollFill = document.getElementById('scrollFill');
const spotlight = document.getElementById('mouseSpotlight');
const heroSticky = document.getElementById('heroSticky');
const heroSteps = [...document.querySelectorAll('.hero-step')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let progress = 0;
let mouseX = 0.5;
let mouseY = 0.5;
let targetMouseX = 0.5;
let targetMouseY = 0.5;
let rafId;

function getHeroProgress() {
  if (!heroSection) return 0;
  const rect = heroSection.getBoundingClientRect();
  const scrollable = heroSection.offsetHeight - window.innerHeight;
  return clamp(-rect.top / Math.max(scrollable, 1));
}

function updateHero() {
  progress = getHeroProgress();

  if (!reducedMotion) {
    const zoom = lerp(1.025, 1.115, progress);
    const panX = lerp(0, -10, progress);
    const panY = lerp(0, -5, progress);
    const brightness = lerp(.72, 1.0, progress);
    const saturation = lerp(.62, .96, progress);
    heroImage.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;
    heroImage.style.filter = `saturate(${saturation}) brightness(${brightness}) contrast(1.06)`;

    darkness.style.opacity = String(lerp(.86, .28, progress));

    lightA.style.opacity = String(remap(progress, .08, .30) * .82);
    lightA.style.transform = `scale(${lerp(.96,1.08,remap(progress,.08,.30))})`;

    lightB.style.opacity = String(remap(progress, .24, .46) * .78);
    lightWall.style.opacity = String(remap(progress, .40, .64) * .86);
    lightFloor.style.opacity = String(remap(progress, .55, .80) * .78);

    const reflectionP = remap(progress, .62, .90);
    reflection.style.opacity = String(reflectionP * .75);
    reflection.style.transform = `translateX(${lerp(-55, 42, reflectionP)}%)`;
  }

  heroSteps.forEach(step => {
    const start = Number(step.dataset.start || 0);
    const end = Number(step.dataset.end || 1);
    const t = remap(progress, start, end);
    step.style.opacity = String(t);
    step.style.transform = `translateY(${lerp(34,0,t)}px)`;
    step.style.filter = `blur(${lerp(9,0,t)}px)`;
  });

  if (progressLabel) progressLabel.textContent = `${String(Math.round(progress * 100)).padStart(2,'0')}%`;
  if (scrollFill) scrollFill.style.width = `${progress * 100}%`;
}

function animateMouse() {
  mouseX += (targetMouseX - mouseX) * .08;
  mouseY += (targetMouseY - mouseY) * .08;
  if (spotlight && heroSticky) {
    spotlight.style.left = `${mouseX * 100}%`;
    spotlight.style.top = `${mouseY * 100}%`;
    spotlight.style.opacity = progress > .42 ? String(remap(progress,.42,.72) * .85) : '0';
  }

  if (!reducedMotion && heroImage) {
    const px = (mouseX - .5) * 10;
    const py = (mouseY - .5) * 7;
    const zoom = lerp(1.025, 1.115, progress);
    const scrollX = lerp(0,-10,progress);
    const scrollY = lerp(0,-5,progress);
    heroImage.style.transform = `translate3d(${scrollX + px}px, ${scrollY + py}px, 0) scale(${zoom})`;
  }
  rafId = requestAnimationFrame(animateMouse);
}

if (heroSticky) {
  heroSticky.addEventListener('pointermove', e => {
    const r = heroSticky.getBoundingClientRect();
    targetMouseX = clamp((e.clientX - r.left) / r.width);
    targetMouseY = clamp((e.clientY - r.top) / r.height);
  });
  heroSticky.addEventListener('pointerleave', () => {
    targetMouseX = .5;
    targetMouseY = .5;
  });
}

window.addEventListener('scroll', updateHero, { passive:true });
window.addEventListener('resize', updateHero);
updateHero();
if (!reducedMotion) animateMouse();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

const techVisual = document.getElementById('techVisual');
window.addEventListener('scroll', () => {
  if (!techVisual || reducedMotion) return;
  const img = techVisual.querySelector('img');
  const r = techVisual.getBoundingClientRect();
  const t = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height));
  img.style.transform = `translateY(${lerp(18,-18,t)}px) scale(1.09)`;
}, { passive:true });
