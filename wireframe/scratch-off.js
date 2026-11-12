/* A real canvas mask over semantic HTML. No canvas support: the explanation stays readable. */
(() => {
  'use strict';
  for (const card of document.querySelectorAll('[data-scratch]')) {
    const canvas = card.querySelector('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) continue;
    const answer = card.querySelector('.scratch-answer');
    const parent = card.closest('.meaning-card');
    const revealButton = parent.querySelector('.scratch-reveal');
    const resetButton = parent.querySelector('.scratch-reset');
    const status = parent.querySelector('.scratch-status');
    const paths = [];
    let activePointer = null;
    let currentPath = null;
    let revealed = false;
    let width = 0;
    let height = 0;
    let ratio = 1;

    function segment(from, to) {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = Math.max(32, width * 0.13);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.moveTo(from.x * width, from.y * height);
      context.lineTo(to.x * width, to.y * height);
      context.stroke();
      // A tap also clears a circular patch, without depending on a zero-length stroke.
      context.beginPath();
      context.arc(to.x * width, to.y * height, context.lineWidth / 2, 0, Math.PI * 2);
      context.fill();
    }
    function paint() {
      const bounds = card.getBoundingClientRect();
      if (!bounds.width || !bounds.height || revealed) return;
      width = bounds.width;
      height = bounds.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = '#b9b9b9';
      context.fillRect(0, 0, width, height);
      context.fillStyle = '#aaa';
      for (let y = 8; y < height; y += 14) {
        for (let x = 8; x < width; x += 14) context.fillRect(x, y, 1, 1);
      }
      context.fillStyle = '#292929';
      context.textAlign = 'center';
      context.font = `${Math.min(20, width / 17)}px Inter, sans-serif`;
      context.fillText('Что значит эта реплика?', width / 2, height / 2 - 10);
      context.font = '14px Inter, sans-serif';
      context.fillText('Сотрите, чтобы узнать', width / 2, height / 2 + 22);
      for (const path of paths) {
        segment(path[0], path[0]);
        for (let i = 1; i < path.length; i++) segment(path[i - 1], path[i]);
      }
    }
    function reveal(announce = true) {
      revealed = true;
      activePointer = null;
      card.dataset.revealed = 'true';
      canvas.hidden = true;
      answer.removeAttribute('aria-hidden');
      answer.inert = false;
      revealButton.setAttribute('aria-expanded', 'true');
      revealButton.textContent = 'Объяснение открыто';
      // Remains focusable after a keyboard reveal; resetting is a separate explicit action.
      revealButton.setAttribute('aria-disabled', 'true');
      resetButton.hidden = false;
      if (announce) status.textContent = `Объяснение открыто: ${answer.querySelector('h3').textContent.replace(/\s+/g, ' ')}.`;
    }
    function coverage() {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      let samples = 0;
      for (let y = 0; y < pixels.height; y += 10) {
        for (let x = 0; x < pixels.width; x += 10) {
          samples++;
          if (pixels.data[(y * pixels.width + x) * 4 + 3] < 80) transparent++;
        }
      }
      const fraction = samples ? transparent / samples : 0;
      card.dataset.coverage = String(Math.round(fraction * 100));
      return fraction;
    }
    function point(event) {
      const rect = canvas.getBoundingClientRect();
      return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
    }
    canvas.addEventListener('pointerdown', event => {
      if (revealed || activePointer !== null || !event.isPrimary || event.button !== 0) return;
      activePointer = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      currentPath = [point(event)];
      paths.push(currentPath);
      segment(currentPath[0], currentPath[0]);
    });
    canvas.addEventListener('pointermove', event => {
      if (event.pointerId !== activePointer) return;
      const next = point(event);
      segment(currentPath[currentPath.length - 1], next);
      currentPath.push(next);
    });
    function endStroke(event) {
      if (event.pointerId !== activePointer) return;
      activePointer = null;
      currentPath = null;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if (coverage() >= 0.46) reveal();
    }
    canvas.addEventListener('pointerup', endStroke);
    canvas.addEventListener('pointercancel', endStroke);
    canvas.addEventListener('lostpointercapture', endStroke);
    revealButton.addEventListener('click', () => { if (!revealed) reveal(); });
    resetButton.addEventListener('click', () => {
      revealed = false;
      paths.length = 0;
      activePointer = null;
      card.dataset.revealed = 'false';
      card.dataset.coverage = '0';
      answer.setAttribute('aria-hidden', 'true');
      answer.inert = true;
      canvas.hidden = false;
      revealButton.setAttribute('aria-expanded', 'false');
      revealButton.removeAttribute('aria-disabled');
      revealButton.textContent = 'Открыть без стирания';
      resetButton.hidden = true;
      paint();
      revealButton.focus();
      status.textContent = 'Покрытие восстановлено. Можно стереть его снова или открыть объяснение кнопкой.';
    });
    answer.setAttribute('aria-hidden', 'true');
    answer.inert = true;
    card.dataset.revealed = 'false';
    card.dataset.coverage = '0';
    canvas.hidden = false;
    revealButton.hidden = false;
    paint();
    // Repaint the same normalized paths after orientation/width changes or tab selection.
    if ('ResizeObserver' in window) new ResizeObserver(paint).observe(card);
    else window.addEventListener('resize', paint);
    document.fonts?.ready.then(paint);
  }
})();
