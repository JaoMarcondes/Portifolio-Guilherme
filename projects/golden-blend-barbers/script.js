const root = document.documentElement;
const img = document.getElementById('heroImage');
const swatch = document.getElementById('dominantSwatch');

const fallbackAccent = { r: 185, g: 74, b: 53 };

function rgbToHex(r,g,b){
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

function applyAccent({r,g,b}){
  const hex = rgbToHex(r,g,b);
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  if(swatch) swatch.style.background = hex;
}

function chooseAccentFromImage(image){
  try{
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if(!ctx) throw new Error('Canvas context unavailable');

    const sampleWidth = 90;
    const sampleHeight = Math.max(60, Math.round(sampleWidth * (image.naturalHeight / image.naturalWidth)));
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;
    ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);

    const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
    const buckets = new Map();

    for(let i = 0; i < data.length; i += 4){
      const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
      if(a < 180) continue;
      const max = Math.max(r,g,b);
      const min = Math.min(r,g,b);
      const sat = max - min;
      const lum = 0.2126*r + 0.7152*g + 0.0722*b;
      if(lum < 55 || lum > 230 || sat < 30) continue;

      const qr = Math.min(255, Math.round(r / 24) * 24);
      const qg = Math.min(255, Math.round(g / 24) * 24);
      const qb = Math.min(255, Math.round(b / 24) * 24);
      const key = `${qr},${qg},${qb}`;
      const warmth = Math.max(0, qr - qb) * 0.18 + Math.max(0, qr - qg) * 0.1;
      const score = sat + warmth + (lum > 80 && lum < 190 ? 16 : 0);

      if(!buckets.has(key)){
        buckets.set(key, {count:0, score:0, r:qr, g:qg, b:qb});
      }
      const bucket = buckets.get(key);
      bucket.count += 1;
      bucket.score += score;
    }

    let best = null;
    buckets.forEach(bucket => {
      const finalScore = bucket.score + bucket.count * 1.25;
      if(!best || finalScore > best.finalScore){
        best = {...bucket, finalScore};
      }
    });

    applyAccent(best || fallbackAccent);
  }catch(error){
    applyAccent(fallbackAccent);
    console.info('Using fallback accent color:', error?.message || error);
  }
}

applyAccent(fallbackAccent);

if(img){
  if(img.complete && img.naturalWidth){
    chooseAccentFromImage(img);
  }else{
    img.addEventListener('load', () => chooseAccentFromImage(img), { once:true });
    img.addEventListener('error', () => applyAccent(fallbackAccent), { once:true });
  }
}

const revealElements = document.querySelectorAll('.reveal');

if('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.08 });
  revealElements.forEach(el => observer.observe(el));
}else{
  revealElements.forEach(el => el.classList.add('is-visible'));
}

document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('is-visible'));

const bookingForm = document.getElementById('bookingForm');
if(bookingForm){
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!bookingForm.reportValidity()) return;

    const formData = new FormData(bookingForm);
    const nome = formData.get('nome') || 'Não informado';
    const servico = formData.get('servico') || 'Serviço não informado';
    const data = formData.get('data') || 'Sem data definida';
    const observacoes = formData.get('observacoes') || 'Nenhuma';

    const message = [
      'Olá! Gostaria de agendar um horário.',
      '',
      `*Nome:* ${nome}`,
      `*Serviço:* ${servico}`,
      `*Data desejada:* ${data}`,
      `*Observações:* ${observacoes}`
    ].join('\n');

    window.open(`https://wa.me/5519983273927?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}
