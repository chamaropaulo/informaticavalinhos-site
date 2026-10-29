/* ==========================================
   Informática Valinhos — Barra de status
   ========================================== */

(function () {
  'use strict';

  const el = document.getElementById('status-horario');
  if (!el) return;

  const dias = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

    let aberto = false;
    let detalhe = '';

    if (idxDia >= 1 && idxDia <= 5) {
      if (minutos >= 9 * 60 && minutos < 18 * 60) {
        aberto = true;
        detalhe = 'fecha às 18h';
      } else if (minutos < 9 * 60) {
        detalhe = 'abre hoje às 9h';
      } else if (idxDia === 5) {
        detalhe = 'abre segunda às 9h';
      } else {
        detalhe = 'abre amanhã às 9h';
      }
    } else if (idxDia === 6) {
      if (minutos >= 9 * 60 && minutos < 13 * 60) {
        aberto = true;
        detalhe = 'fecha às 13h';
      } else if (minutos < 9 * 60) {
        detalhe = 'abre hoje às 9h';
      } else {
        detalhe = 'abre segunda às 9h';
      }
    } else {
      detalhe = 'abre segunda às 9h';
    }

    if (aberto) {
      el.className = 'status-barra status-aberto';
      el.innerHTML = '<span class="status-ponto"></span><strong>Atendimento aberto agora</strong><span class="status-detalhe">· ' + detalhe + '</span>';
    } else {
      el.className = 'status-barra status-fechado';
      el.innerHTML = '<span class="status-ponto"></span><strong>Atendimento fechado</strong><span class="status-detalhe">· ' + detalhe + '</span>';
    }
  }

  calcularStatus();
  setInterval(calcularStatus, 60000);
})();