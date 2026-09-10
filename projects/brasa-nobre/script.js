const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

const whatsappNumber = '5519983273927';
const orderForm = document.getElementById('orderForm');
const previewText = document.getElementById('previewText');

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
}

function orderValue(value, lang) {
  if (lang !== 'en') return value;
  const values = {
    'Entrega':'Delivery',
    'Retirada':'Pickup',
    'Sem acompanhamento':'No side',
    'Batata frita individual':'Individual fries',
    'Batata rústica':'Rustic fries',
    'Onion rings':'Onion rings',
    'Bacon extra':'Extra bacon',
    'Cheddar extra':'Extra cheddar',
    'Molho da casa extra':'Extra house sauce',
    'Ovo':'Egg',
    'Sem tomate':'No tomato',
    'Sem alface':'No lettuce',
    'Sem cebola':'No onion',
    'Sem picles':'No pickles',
    'Coca-Cola 600ml':'Coca-Cola 600ml',
    'Coca-Cola lata':'Coca-Cola can',
    'Guaraná lata':'Guaraná can',
    'Água sem gás':'Still water',
    'Sem bebida':'No drink',
    'Pix':'Pix',
    'Cartão de crédito':'Credit card',
    'Cartão de débito':'Debit card',
    'Dinheiro':'Cash'
  };
  return values[value] || value;
}

function buildMessage() {
  if (!orderForm) return '';
  const lang = document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
  const data = new FormData(orderForm);
  const missing = lang === 'en' ? 'Not provided' : 'Não informado';
  const nome = (data.get('nome') || '').toString().trim() || missing;
  const tipoPedido = orderValue((data.get('tipoPedido') || '').toString().trim() || 'Entrega', lang);
  const telefone = (data.get('telefone') || '').toString().trim();
  const endereco = (data.get('endereco') || '').toString().trim() || missing;
  const lanche = (data.get('lanche') || '').toString().trim() || missing;
  const acompanhamento = orderValue((data.get('acompanhamento') || '').toString().trim() || 'Sem acompanhamento', lang);
  const bebida = orderValue((data.get('bebida') || '').toString().trim() || missing, lang);
  const pagamento = orderValue((data.get('pagamento') || '').toString().trim() || missing, lang);
  const observacoes = (data.get('observacoes') || '').toString().trim();
  const extras = getCheckedValues('extras').map(v => orderValue(v, lang));
  const remover = getCheckedValues('remover').map(v => orderValue(v, lang));

  if (lang === 'en') {
    return [
      "Hi! I'd like to place an order.",
      '',
      `*Name:* ${nome}`,
      `*Order type:* ${tipoPedido}`,
      telefone ? `*Phone:* ${telefone}` : '',
      `*Address:* ${endereco}`,
      '',
      '*Order:*',
      `• Burger: ${lanche}`,
      `• Side: ${acompanhamento}`,
      `• Drink: ${bebida}`,
      `• Extras: ${extras.length ? extras.join(', ') : 'None'}`,
      `• Remove: ${remover.length ? remover.join(', ') : 'Nothing'}`,
      '',
      `*Payment method:* ${pagamento}`,
      `*Notes:* ${observacoes || 'None'}`
    ].filter(Boolean).join('\n');
  }

  return [
    'Olá! Quero fazer um pedido.',
    '',
    `*Nome:* ${nome}`,
    `*Tipo de pedido:* ${tipoPedido}`,
    telefone ? `*Telefone:* ${telefone}` : '',
    `*Endereço:* ${endereco}`,
    '',
    '*Pedido:*',
    `• Lanche: ${lanche}`,
    `• Acompanhamento: ${acompanhamento}`,
    `• Bebida: ${bebida}`,
    `• Extras: ${extras.length ? extras.join(', ') : 'Nenhum'}`,
    `• Remover ingredientes: ${remover.length ? remover.join(', ') : 'Nada a remover'}`,
    '',
    `*Forma de pagamento:* ${pagamento}`,
    `*Observações:* ${observacoes || 'Nenhuma'}`
  ].filter(Boolean).join('\n');
}

function refreshPreview() {
  const message = buildMessage();
  if (previewText) previewText.textContent = message;
}

if (orderForm) {
  refreshPreview();
  orderForm.addEventListener('input', refreshPreview);
  orderForm.addEventListener('change', refreshPreview);

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!orderForm.reportValidity()) return;
    const message = buildMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}

window.addEventListener('site-language-change', refreshPreview);
