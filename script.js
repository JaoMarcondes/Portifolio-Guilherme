const translations = {
  pt: {
    location: "BRASIL / REMOTO",
    navWork: "PROJETOS", navAbout: "SOBRE", navContact: "CONTATO",
    available: "DISPONÍVEL PARA NOVOS PROJETOS",
    heroStatement: "Crio experiências digitais com identidade, clareza e intenção.",
    worksTitle: "PROJETOS SELECIONADOS",
    worksKicker: "Uma seleção de experiências digitais criadas para diferentes negócios e propostas.",
    projectView: "VER PROJETO ↗",
    projectDemo: "PROJETO DEMONSTRATIVO",
    projectLumiereDesc: "Direção editorial para um salão premium, com hero em vídeo e movimento pensado para transformar a navegação em experiência.",
    projectBrasaDesc: "Identidade digital para uma hamburgueria premium, com produto em destaque e um fluxo de pedido direto pelo WhatsApp.",
    projectAureaDesc: "Experiência digital para uma clínica premium, combinando arquitetura visual, iluminação progressiva e interação por scroll.",
    projectBarberDesc: "Site conceitual para uma barbearia premium, com direção visual cinematográfica, destaque inspirado no barber pole e agendamento direto pelo WhatsApp.",
    worksSoon: "NOVOS PROJETOS EM PRODUÇÃO", worksComing: "EM BREVE.",
    worksText: "Este espaço está reservado para os próximos projetos que serão desenvolvidos e publicados.",
    aboutTitle: "SOBRE",
    aboutAside: "DESENVOLVIMENTO WEB\nDESIGN RESPONSIVO\nEXPERIÊNCIAS DIGITAIS",
    aboutLead: "Sou <strong>Guilherme, desenvolvedor web</strong>, focado na criação de sites modernos, responsivos e pensados para gerar resultados para empresas e profissionais.",
    aboutBody1: "Desenvolvo projetos personalizados com atenção à identidade visual, organização das informações, experiência do usuário e adaptação completa para celular, tablet e computador.",
    aboutBody2: "Trabalho com sites institucionais, landing pages, cardápios digitais, páginas de serviços, portfólios e soluções com integrações e funcionalidades específicas para cada negócio.",
    aboutBody3: "Meu objetivo é transformar a presença digital de cada cliente em algo mais profissional, confiável e preparado para atrair novas oportunidades.",
    servicesTitle: "O QUE EU FAÇO", service1: "SITES INSTITUCIONAIS", service1desc: "Presença digital sólida, clara e profissional.",
    service2desc: "Páginas focadas em campanhas, serviços e conversão.", service3: "PORTFÓLIOS & SERVIÇOS", service3desc: "Projetos que valorizam trabalho, marca e autoridade.",
    service4: "INTEGRAÇÕES & SISTEMAS", service4desc: "Funcionalidades sob medida, APIs, bancos de dados e automações.",
    processTitle: "PROCESSO", process1: "ESTRATÉGIA", process1sub: "Objetivo, público e direção.", process2sub: "Identidade, hierarquia e experiência.",
    process3: "CÓDIGO", process3sub: "Performance, responsividade e interação.", process4: "ENTREGA", process4sub: "Revisão, publicação e acabamento.",
    stackTitle: "TECNOLOGIAS",
    stackKicker: "Ferramentas e linguagens que uso nos meus projetos.",
    techDataTitle: "DADOS & INTEGRAÇÕES",
    techLanguagesTitle: "OUTRAS LINGUAGENS",
    basicLevel: "(básico)",
    servicesCtaText: "Precisa de um site ou de uma solução específica para o seu negócio?",
    servicesCta: "FALAR SOBRE UM PROJETO ↗",
    contactKicker: "TEM UM PROJETO EM MENTE?", contactHeadline1: "VAMOS CRIAR", contactHeadline2: "ALGO FORTE."
  },
  en: {
    location: "BRAZIL / REMOTE",
    navWork: "WORK", navAbout: "ABOUT", navContact: "CONTACT",
    available: "AVAILABLE FOR NEW PROJECTS",
    heroStatement: "I create digital experiences with identity, clarity and intention.",
    worksTitle: "SELECTED WORK",
    worksKicker: "A selection of digital experiences created for different businesses and concepts.",
    projectView: "VIEW PROJECT ↗",
    projectDemo: "CONCEPT PROJECT",
    projectLumiereDesc: "Editorial art direction for a premium beauty salon, with a video hero and motion designed to turn browsing into an experience.",
    projectBrasaDesc: "A digital identity for a premium burger house, putting the product first and connecting the ordering flow directly to WhatsApp.",
    projectAureaDesc: "A digital experience for a premium dental clinic, combining architectural visuals, progressive lighting and scroll interaction.",
    projectBarberDesc: "Concept website for a premium barbershop, with cinematic art direction, a barber-pole-inspired accent and direct WhatsApp booking.",
    worksSoon: "NEW PROJECTS IN PRODUCTION", worksComing: "COMING SOON.",
    worksText: "This space is reserved for the next projects currently being designed, developed and published.",
    aboutTitle: "ABOUT",
    aboutAside: "WEB DEVELOPMENT\nRESPONSIVE DESIGN\nDIGITAL EXPERIENCES",
    aboutLead: "I'm <strong>Guilherme, a web developer</strong>, focused on building modern, responsive websites designed to generate results for businesses and professionals.",
    aboutBody1: "I develop custom projects with close attention to visual identity, information architecture, user experience and complete adaptation across mobile, tablet and desktop.",
    aboutBody2: "I work with corporate websites, landing pages, digital menus, service pages, portfolios and solutions with integrations and features tailored to each business.",
    aboutBody3: "My goal is to turn each client's digital presence into something more professional, trustworthy and ready to create new opportunities.",
    servicesTitle: "WHAT I DO", service1: "BUSINESS WEBSITES", service1desc: "A solid, clear and professional digital presence.",
    service2desc: "Pages focused on campaigns, services and conversion.", service3: "PORTFOLIOS & SERVICES", service3desc: "Projects that strengthen work, brand and authority.",
    service4: "INTEGRATIONS & SYSTEMS", service4desc: "Tailored features, APIs, databases and automations.",
    processTitle: "PROCESS", process1: "STRATEGY", process1sub: "Goals, audience and direction.", process2sub: "Identity, hierarchy and experience.",
    process3: "CODE", process3sub: "Performance, responsiveness and interaction.", process4: "DELIVERY", process4sub: "Review, launch and final polish.",
    stackTitle: "TECHNOLOGIES",
    stackKicker: "Tools and languages I use in my projects.",
    techDataTitle: "DATA & INTEGRATIONS",
    techLanguagesTitle: "OTHER LANGUAGES",
    basicLevel: "(basic)",
    servicesCtaText: "Need a website or a specific digital solution for your business?",
    servicesCta: "TALK ABOUT A PROJECT ↗",
    contactKicker: "HAVE A PROJECT IN MIND?", contactHeadline1: "LET'S BUILD", contactHeadline2: "SOMETHING BOLD."
  }
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Preloader
const preloader = document.getElementById('preloader');
const loaderCount = document.getElementById('loaderCount');
const loaderBar = document.getElementById('loaderBar');
let progress = 0;
if (!reducedMotion) {
  const loadTimer = setInterval(() => {
    progress += Math.ceil((100 - progress) * 0.16);
    if (progress > 100) progress = 100;
    loaderCount.textContent = String(progress).padStart(2, '0');
    loaderBar.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(loadTimer);
      setTimeout(() => {
        preloader.classList.add('is-done');
        document.querySelector('.hero').classList.add('is-ready');
      }, 260);
    }
  }, 55);
} else {
  document.querySelector('.hero').classList.add('is-ready');
}

// Language switch
const langButtons = document.querySelectorAll('.lang__btn');
function setLanguage(lang) {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.title = lang === 'pt' ? 'Guilherme — Desenvolvedor Web' : 'Guilherme — Web Developer';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!(key in translations[lang])) return;
    const value = translations[lang][key];
    if (value.includes('<strong>')) el.innerHTML = value;
    else if (value.includes('\n')) el.innerHTML = value.replaceAll('\n', '<br>');
    else el.textContent = value;
  });
  langButtons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.lang === lang));
  localStorage.setItem('portfolio-language', lang);
  document.querySelectorAll('a[href^="projects/"]').forEach(link => {
    const url = new URL(link.getAttribute('href'), location.href);
    url.searchParams.set('lang', lang);
    link.setAttribute('href', url.pathname.replace(location.pathname.replace(/[^/]*$/, ''), '') + url.search);
  });
}
langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem('portfolio-language') || 'pt');

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// Process rail progress
const processSection = document.querySelector('.process');
const processProgress = document.getElementById('processProgress');
function updateScrollEffects() {
  if (processSection) {
    const rect = processSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const ratio = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh * .15)));
    processProgress.style.width = (ratio * 100) + '%';
  }
}
window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects();

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorLabel = cursor.querySelector('span');
let mouseX = -100, mouseY = -100, cx = -100, cy = -100;
window.addEventListener('pointermove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateCursor() {
  cx += (mouseX - cx) * .18;
  cy += (mouseY - cy) * .18;
  cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
if (!reducedMotion) animateCursor();

document.querySelectorAll('[data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('is-label');
    cursorLabel.textContent = el.dataset.cursor;
  });
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-label'));
});

// Magnetic links
if (!reducedMotion) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// Ambient interactive canvas field
const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');
let dpr = Math.min(window.devicePixelRatio || 1, 2);
let dots = [];
function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  dots = [];
  const gap = innerWidth < 700 ? 58 : 72;
  for (let y = gap / 2; y < innerHeight; y += gap) {
    for (let x = gap / 2; x < innerWidth; x += gap) {
      dots.push({x, y});
    }
  }
}
function drawField() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for (const p of dots) {
    const dx = mouseX - p.x, dy = mouseY - p.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const pull = Math.max(0, 1 - dist / 220);
    const px = p.x - dx * pull * .035;
    const py = p.y - dy * pull * .035;
    ctx.beginPath();
    ctx.arc(px, py, 1 + pull * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(136,189,242,${0.18 + pull * 0.45})`;
    ctx.fill();
  }
  requestAnimationFrame(drawField);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
if (!reducedMotion) drawField();
