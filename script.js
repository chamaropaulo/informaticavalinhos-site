// Configura a abertura e o fechamento de um modal
function configurarModal(modalId, botoesAbrir, botaoFechar) {
  const modal = document.getElementById(modalId);
  const fechar = document.getElementById(botaoFechar);

  function abrir(e) {
    e.preventDefault();
    modal.classList.add('ativo');
    modal.setAttribute('aria-hidden', 'false');
  }

  function fecharModal() {
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
  }

  botoesAbrir.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', abrir);
  });

  fechar.addEventListener('click', fecharModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) fecharModal();
  });
}

// Modal do AnyDesk (aberto pelo link do texto e pelo botão do topo)
configurarModal('modalAnydesk', ['abrirModalAnydesk', 'abrirModalAnydeskNav'], 'fecharModalAnydesk');

// Modal do endereço
configurarModal('modalEndereco', ['abrirModalEndereco'], 'fecharModalEndereco');

// Fecha qualquer modal aberto com a tecla Esc
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.ativo').forEach(function (m) {
      m.classList.remove('ativo');
      m.setAttribute('aria-hidden', 'true');
    });
  }
});