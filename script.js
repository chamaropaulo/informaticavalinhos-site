/* ==========================================
   Informática Valinhos — Status de atendimento
   ========================================== */

(function () {
  'use strict';

  const el = document.getElementById('status-horario');
  if (!el) return;

  function calcularStatus() {
    const agora = new Date();
    const partes = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(agora);

    const dia = partes.find(p => p.type === 'weekday').value; // Mon..Sun
    const hora = parseInt(partes.find(p => p.type === 'hour').value, 10);
    const minuto = parseInt(partes.find(p => p.type === 'minute').value, 10);
    const minutos = hora * 60 + minuto;

    let aberto = false;

    if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(dia)) {
      aberto = minutos >= 9 * 60 && minutos < 18 * 60;
    } else if (dia === 'Sat') {
      aberto = minutos >= 9 * 60 && minutos < 13 * 60;
    }
    // Domingo: fechado

    if (aberto) {
      el.textContent = '✓ Aberto agora';
      el.className = 'status-horario status-aberto';
    } else {
      el.textContent = '● Fechado agora';
      el.className = 'status-horario status-fechado';
    }
  }

  calcularStatus();
  setInterval(calcularStatus, 60000);
})();