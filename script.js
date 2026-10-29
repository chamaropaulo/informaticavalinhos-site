/* ==========================================
   Informática Valinhos — Barra de status
   ========================================== */

(function () {
  'use strict';

  const barra = document.getElementById('status-horario');
  const dialog = document.getElementById('aviso-fechado');
  const avisoProximo = document.getElementById('aviso-proximo');
  if (!barra) return;

  const dias = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let estaAberto = false;
  let proximoTexto = '';

  function calcularStatus() {
    const agora = new Date();
    const partes = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(agora);

    const dia = partes.find(p => p.type === 'weekday').value;
    const hora = parseInt(partes.find(p => p.type === 'hour').value, 10);
    const minuto = parseInt(partes.find(p => p.type === 'minute').value, 10);
    const minutos = hora * 60 + minuto;
    const idxDia = dias.indexOf(dia);

    estaAberto = false;
    proximoTexto = '';
    let detalhe = '';

    if (idxDia >= 1 && idxDia <= 5) {
      if (minutos >= 9 * 60 && minutos < 18 * 60) {
        estaAberto = true;
        detalhe = 'fecha às 18h';
      } else if (minutos < 9 * 60) {
        detalhe = 'abre hoje às 9h';
        proximoTexto = 'hoje às 9h';
      } else if (idxDia === 5) {
        detalhe = 'abre segunda às 9h';
        proximoTexto = 'na segunda-feira, às 9h';
      } else {
        detalhe = 'abre amanhã às 9h';
        proximoTexto = 'amanhã, às 9h';
      }
    } else if (idxDia === 6) {
      if (minutos >= 9 * 60 && minutos < 13 * 60) {
        estaAberto = true;
        detalhe = 'fecha às 13h';
      } else if (minutos < 9 * 60) {
        detalhe = 'abre hoje às 9h';
        proximoTexto = 'hoje às 9h';
      } else {
        detalhe = 'abre segunda às 9h';
        proximoTexto = 'na segunda-feira, às 9h';
      }
    } else {
      detalhe = 'abre segunda às 9h';
      proximoTexto = 'na segunda-feira, às 9h';
    }

    if (estaAberto) {
      barra.className = 'status-barra status-aberto';
      barra.innerHTML = '<span class="status-ponto"></span><strong>Atendimento aberto agora</strong><span class="status-detalhe">· ' + detalhe + '</span>';
    } else {
      barra.className = 'status-barra status-fechado';
      barra.innerHTML = '<span class="status-ponto"></span><strong>Atendimento fechado</strong><span class="status-detalhe">· ' + detalhe + '</span>';
    }

    if (avisoProximo && proximoTexto) {
      avisoProximo.textContent = 'Retornamos ' + proximoTexto + '.';
    }
  }

  function interceptarWhatsApp() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
      if (link.dataset.fechadoAtivo === '1') return;
      link.dataset.fechadoAtivo = '1';
      link.addEventListener('click', function (e) {
        if (!estaAberto) {
          e.preventDefault();
          if (dialog && typeof dialog.showModal === 'function') {
            dialog.showModal();
          } else {
            alert('Atendimento fechado. Horário: segunda a sexta, das 9h às 18h; sábado, das 9h às 13h.');
          }
        }
      });
    });
  }

  calcularStatus();
  interceptarWhatsApp();
  setInterval(function () {
    calcularStatus();
    interceptarWhatsApp();
  }, 60000);

  if (dialog) {
    const botaoFechar = dialog.querySelector('button');
    if (botaoFechar) {
      botaoFechar.addEventListener('click', function () { dialog.close(); });
    }
  }
})();