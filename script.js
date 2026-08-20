// CONFIGURAÇÃO - Número do WhatsApp do AC Studio (DDI 55 + DDD + Número)
const WHATSAPP_PHONE = "5581997769927";

// MENU HAMBÚRGUER MOBILE
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// MODAL DE AGENDAMENTO
const modalOverlay = document.getElementById('modalOverlay');
const servicoSelect = document.getElementById('servico');
const dataInput = document.getElementById('data');

// Bloqueia seleções de datas passadas no calendário
if (dataInput) {
    const today = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', today);
}

function openModal(servicoNome = '') {
    if (servicoNome) {
        servicoSelect.value = servicoNome;
    }
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// FECHAR MODAL AO CLICAR FORA
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// DISPARO DO FORMULÁRIO PARA O WHATSAPP
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    if (!nome || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Formata a data para padrão BR (DD/MM/AAAA)
    const dataFormatada = data.split('-').reverse().join('/');

    // MENSAGEM ESTRUTURADA
    const mensagem = `Olá! Meu nome é *${nome}*.\n\n` +
        `Gostaria de agendar um atendimento no *AC Studio*:\n` +
        `✨ *Procedimento:* ${servico}\n` +
        `📅 *Data:* ${dataFormatada}\n` +
        `⏰ *Horário:* ${hora}\n\n` +
        `Ainda possui disponibilidade para este horário?`;

    const urlWhatsapp = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsapp, '_blank');
    closeModal();
    contactForm.reset();
});