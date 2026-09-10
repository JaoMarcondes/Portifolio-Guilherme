(() => {
  const EN = {
  "Experiência": "Experience",
  "Especialidades": "Specialties",
  "Tecnologia": "Technology",
  "Contato": "Contact",
  "Agendar avaliação": "Book an evaluation",
  "CLÍNICA CONCEITO / 2026": "CONCEPT CLINIC / 2026",
  "ODONTOLOGIA PREMIUM": "PREMIUM DENTISTRY",
  "PRECISÃO.": "PRECISION.",
  "CONFORTO.": "COMFORT.",
  "TECNOLOGIA.": "TECHNOLOGY.",
  "CUIDADO.": "CARE.",
  "Uma experiência pensada para transformar a forma como você se sente dentro de uma clínica odontológica.": "An experience designed to change the way you feel inside a dental clinic.",
  "SCROLL PARA ACENDER": "SCROLL TO LIGHT UP",
  "01 / EXPERIÊNCIA": "01 / EXPERIENCE",
  "Menos sensação de consultório.": "Less like a clinic.",
  "Mais sensação de cuidado.": "More like being cared for.",
  "A proposta da Auréa é simples: unir uma clínica bonita, tecnologia de ponta e um atendimento que explica cada etapa sem complicar.": "Auréa's idea is simple: combine a beautiful clinic, advanced technology and care that explains every step clearly.",
  "O paciente sabe o que vai acontecer, quanto tempo leva e por que aquele tratamento faz sentido. Sem pressa e sem excesso de informação.": "Patients know what will happen, how long it takes and why the treatment makes sense. No rush and no information overload.",
  "02 / ESPECIALIDADES": "02 / SPECIALTIES",
  "Tratamentos feitos": "Treatments designed",
  "para cada momento.": "for every stage.",
  "Uma estrutura em bento para apresentar serviços sem transformar a página em uma lista cansativa.": "A bento layout that presents services without turning the page into a tiring list.",
  "Implantes": "Implants",
  "Planejamento digital, previsibilidade e acompanhamento próximo do início ao fim.": "Digital planning, predictability and close follow-up from start to finish.",
  "Quero saber mais ↗": "Learn more ↗",
  "Estética dental": "Cosmetic dentistry",
  "Clareamento, lentes e ajustes pensados para harmonizar, não padronizar.": "Whitening, veneers and adjustments designed to harmonize, not standardize.",
  "Ortodontia": "Orthodontics",
  "Opções convencionais e alinhadores com acompanhamento visual da evolução.": "Conventional options and aligners with visual progress tracking.",
  "Prevenção & acompanhamento": "Prevention & follow-up",
  "Consultas de rotina, limpeza e orientação para manter o resultado por mais tempo.": "Routine visits, cleaning and guidance to help maintain results for longer.",
  "AMBIENTE DIGITAL": "DIGITAL ENVIRONMENT",
  "Planejamento + precisão": "Planning + precision",
  "03 / TECNOLOGIA": "03 / TECHNOLOGY",
  "O cuidado fica melhor quando": "Care gets better when",
  "a tecnologia trabalha em silêncio.": "technology works quietly.",
  "Escaneamento digital": "Digital scanning",
  "Mais conforto e visualização clara do tratamento.": "More comfort and a clear view of the treatment.",
  "Planejamento 3D": "3D planning",
  "Decisões mais previsíveis antes de começar.": "More predictable decisions before treatment begins.",
  "Acompanhamento": "Follow-up",
  "Etapas organizadas e comunicação objetiva.": "Organized stages and clear communication.",
  "PRECISÃO ✦ CONFORTO ✦ TECNOLOGIA ✦ CUIDADO ✦": "PRECISION ✦ COMFORT ✦ TECHNOLOGY ✦ CARE ✦",
  "04 / AVALIAÇÃO": "04 / EVALUATION",
  "Seu próximo sorriso": "Your next smile",
  "começa com uma conversa.": "starts with a conversation.",
  "Fale com a equipe, conte o que você procura e receba uma orientação inicial antes de marcar o melhor horário.": "Talk to the team, tell us what you're looking for and get initial guidance before choosing the best time.",
  "Agendar pelo WhatsApp": "Book via WhatsApp",
  "ENDEREÇO": "ADDRESS",
  "Rua Conceito, 128": "128 Concept Street",
  "HORÁRIOS": "HOURS",
  "Seg — Sex · 08h às 20h": "Mon — Fri · 8am to 8pm",
  "Sáb · 08h às 14h": "Sat · 8am to 2pm",
  "ATENDIMENTO": "CONTACT",
  "PROJETO DEMONSTRATIVO": "DEMO PROJECT",
  "Este site foi criado para demonstrar design e desenvolvimento web. As imagens utilizadas são geradas por inteligência artificial e não representam uma clínica real.": "This site was created to demonstrate web design and development. The images were generated with artificial intelligence and do not represent a real clinic."
};
  const ATTR_EN = {
  "Navegação principal": "Main navigation",
  "Interior premium da clínica Auréa": "Premium interior of the Auréa clinic"
};
  const TITLES = {
  "pt": "Auréa Odontologia — Precisão, conforto e cuidado",
  "en": "Auréa Dentistry — Precision, comfort and care"
};
  const DESCRIPTIONS = {
  "pt": "Auréa Odontologia — projeto demonstrativo de clínica odontológica premium, com experiência interativa e atendimento humanizado.",
  "en": "Auréa Dentistry — a premium dental clinic concept with an interactive experience and human-centered care."
};

  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  function preserveWhitespace(original, replacement) {
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    return leading + replacement + trailing;
  }

  function rememberTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName)) continue;
      const trimmed = node.nodeValue.trim();
      if (!trimmed) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    }
  }

  function rememberAttributes() {
    document.querySelectorAll('*').forEach(el => {
      const attrs = {};
      ['placeholder','aria-label','alt','title'].forEach(name => {
        if (el.hasAttribute(name)) attrs[name] = el.getAttribute(name);
      });
      if (Object.keys(attrs).length) originalAttrs.set(el, attrs);
    });
  }

  function translateTextNodes(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName)) continue;
      if (!originalText.has(node)) continue;
      const original = originalText.get(node);
      const key = original.trim();
      const value = lang === 'en' && EN[key] ? EN[key] : key;
      node.nodeValue = preserveWhitespace(original, value);
    }
  }

  function translateAttributes(lang) {
    document.querySelectorAll('*').forEach(el => {
      const attrs = originalAttrs.get(el);
      if (!attrs) return;
      Object.entries(attrs).forEach(([name, original]) => {
        const translated = lang === 'en' && ATTR_EN[original] ? ATTR_EN[original] : original;
        el.setAttribute(name, translated);
      });
    });
  }

  function setLanguage(lang, persist = true) {
    lang = lang === 'en' ? 'en' : 'pt';
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    translateTextNodes(lang);
    translateAttributes(lang);

    document.title = TITLES[lang];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', DESCRIPTIONS[lang]);

    document.querySelectorAll('.site-lang__btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    if (persist) localStorage.setItem('portfolio-language', lang);
    window.currentSiteLanguage = lang;
    window.dispatchEvent(new CustomEvent('site-language-change', { detail: { lang } }));
  }

  rememberTextNodes();
  rememberAttributes();

  document.querySelectorAll('.site-lang__btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  const params = new URLSearchParams(location.search);
  const requested = params.get('lang');
  const saved = localStorage.getItem('portfolio-language');
  setLanguage(requested === 'en' || requested === 'pt' ? requested : (saved || 'pt'), false);

  window.setSiteLanguage = setLanguage;
})();
