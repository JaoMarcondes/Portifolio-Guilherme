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

function buildMessage() {
  if (!orderForm) return '';
  const data = new FormData(orderForm);
  const nome = (data.get('nome') || '').toString().trim() || 'Não informado';
  const tipoPedido = (data.get('tipoPedido') || '').toString().trim() || 'Entrega';
  const telefone = (data.get('telefone') || '').toString().trim();
  const endereco = (data.get('endereco') || '').toString().trim() || 'Não informado';
  const lanche = (data.get('lanche') || '').toString().trim() || 'Não informado';
  const acompanhamento = (data.get('acompanhamento') || '').toString().trim() || 'Sem acompanhamento';
  const bebida = (data.get('bebida') || '').toString().trim() || 'Não informado';
  const pagamento = (data.get('pagamento') || '').toString().trim() || 'Não informado';
  const observacoes = (data.get('observacoes') || '').toString().trim();
  const extras = getCheckedValues('extras');
  const remover = getCheckedValues('remover');

  const lines = [
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
  ].filter(Boolean);

  return lines.join('\n');
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
