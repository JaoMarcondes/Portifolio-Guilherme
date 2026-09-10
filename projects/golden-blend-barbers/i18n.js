(() => {
  const EN = {
  "Início": "Home",
  "Serviços": "Services",
  "Experiência": "Experience",
  "Diferenciais": "Why us",
  "Contato": "Contact",
  "Agendar ↗": "Book ↗",
  "BARBEARIA PREMIUM / SITE DEMONSTRATIVO": "PREMIUM BARBERSHOP / DEMO SITE",
  "Presença,": "Presence,",
  "estilo": "style",
  "e cuidado em cada detalhe.": "and care in every detail.",
  "Uma experiência visual pensada para transmitir sofisticação, confiança e identidade. O tom em destaque do título é extraído da própria imagem da barbearia para criar uma primeira impressão mais coerente e marcante.": "A visual experience designed to communicate sophistication, confidence and identity. The title accent is drawn from the barbershop image itself to create a stronger, more coherent first impression.",
  "Ver serviços": "View services",
  "Agendar no WhatsApp": "Book on WhatsApp",
  "COR DA IMAGEM": "IMAGE COLOR",
  "AMBIENTE CLÁSSICO · ESTÉTICA PREMIUM · INTERFACE RESPONSIVA": "CLASSIC ATMOSPHERE · PREMIUM AESTHETIC · RESPONSIVE INTERFACE",
  "ESTILO CLÁSSICO, PRESENÇA MODERNA.": "CLASSIC STYLE, MODERN PRESENCE.",
  "CORTE · BARBA · ACABAMENTO · TOALHA QUENTE · ESTILO · CORTE · BARBA · ACABAMENTO · TOALHA QUENTE · ESTILO ·": "CUT · BEARD · FINISH · HOT TOWEL · STYLE · CUT · BEARD · FINISH · HOT TOWEL · STYLE ·",
  "Serviços feitos para": "Services designed to",
  "valorizar sua imagem.": "elevate your look.",
  "Uma apresentação clara dos serviços ajuda a transmitir organização e profissionalismo. Aqui, a proposta é combinar estética premium com informação objetiva.": "A clear service presentation communicates organization and professionalism. The goal here is to combine a premium look with straightforward information.",
  "Corte clássico ou contemporâneo com acabamento preciso, pensado para quem quer presença sem exagero.": "Classic or contemporary cut with precise finishing, designed for a polished look without excess.",
  "Modelagem e alinhamento da barba com toalha quente, navalha e atenção ao formato do rosto.": "Beard shaping and alignment with a hot towel, razor and attention to face shape.",
  "Finalização com produtos selecionados para manter textura, fixação e aparência refinada.": "Finishing with selected products to maintain texture, hold and a refined appearance.",
  "Combo completo com corte, barba e acabamento para oferecer uma experiência premium do começo ao fim.": "A complete cut, beard and finishing combo for a premium experience from start to finish.",
  "Mais do que um corte —": "More than a haircut —",
  "uma experiência.": "an experience.",
  "A proposta visual deste site é vender ambiente, confiança e percepção de valor. O cliente não está escolhendo apenas um serviço: ele está escolhendo a forma como quer ser recebido, atendido e lembrado.": "The visual direction sells atmosphere, confidence and perceived value. Customers are not choosing only a service; they are choosing how they want to be welcomed, served and remembered.",
  "“Quando o ambiente comunica cuidado e o digital comunica profissionalismo, o agendamento deixa de ser só interesse e vira decisão.”": "“When the space communicates care and the digital experience communicates professionalism, booking becomes a decision, not just an intention.”",
  "Agendar atendimento ↗": "Book an appointment ↗",
  "Por que esse estilo de site": "Why this style of site",
  "chama atenção.": "stands out.",
  "Cada bloco foi pensado para passar credibilidade e valor. O objetivo não é só ser bonito: é fazer o negócio parecer mais profissional e pronto para receber clientes.": "Every section was designed to communicate credibility and value. The goal is not only to look good, but to make the business feel more professional and ready to welcome clients.",
  "IDENTIDADE VISUAL": "VISUAL IDENTITY",
  "Base escura, tipografia elegante e cor de destaque puxada da imagem para unir estética e consistência.": "Dark base, elegant typography and an accent color drawn from the image to connect aesthetics and consistency.",
  "APRESENTAÇÃO PREMIUM": "PREMIUM PRESENTATION",
  "Seções enxutas, hierarquia clara e imagens valorizadas para reforçar o posicionamento da barbearia.": "Focused sections, clear hierarchy and strong imagery reinforce the barbershop's positioning.",
  "RESPONSIVO": "RESPONSIVE",
  "Layout adaptado para celular, tablet e desktop, mantendo a leitura e a presença visual em qualquer tela.": "A layout adapted for mobile, tablet and desktop while preserving readability and visual presence.",
  "Pronto para transformar essa ideia em": "Ready to turn this idea into",
  "agendamento.": "a booking.",
  "Esse site é demonstrativo, mas já mostra como a barbearia pode apresentar serviços, comunicar valor e direcionar o cliente para o WhatsApp de forma direta.": "This demo already shows how a barbershop can present services, communicate value and guide customers directly to WhatsApp.",
  "Agendamento rápido pelo WhatsApp": "Quick booking through WhatsApp",
  "Apresentação premium dos serviços": "Premium service presentation",
  "Estrutura pensada para gerar confiança": "A structure designed to build trust",
  "Nome": "Name",
  "Serviço": "Service",
  "Data desejada": "Preferred date",
  "Observações": "Notes",
  "Enviar no WhatsApp ↗": "Send on WhatsApp ↗",
  "WhatsApp:": "WhatsApp:",
  "E-mail:": "Email:",
  "As imagens deste projeto são ilustrativas e foram geradas por IA para fins de demonstração do que posso desenvolver.": "The images in this project are illustrative and were generated with AI to demonstrate what I can build."
};
  const ATTR_EN = {
  "Navegação principal": "Main navigation",
  "Barbearia premium com cadeira clássica e poste de barbeiro": "Premium barbershop with a classic chair and barber pole",
  "Ambiente sofisticado da barbearia": "Sophisticated barbershop interior",
  "Seu nome": "Your name",
  "Ex.: Sexta às 19h": "E.g. Friday at 7pm",
  "Alguma preferência?": "Any preference?"
};
  const TITLES = {
  "pt": "Golden Blend Barbers",
  "en": "Golden Blend Barbers"
};
  const DESCRIPTIONS = {
  "pt": "Golden Blend Barbers — site conceitual para uma barbearia premium.",
  "en": "Golden Blend Barbers — a concept website for a premium barbershop."
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
