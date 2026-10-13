'use strict';

// Adapted from IQCHISTKA's [data-compare] range / CSS custom property interaction.
document.querySelectorAll('[data-compare]').forEach((compare) => {
  const range = compare.querySelector('input[type="range"]');
  if (!range) return;

  const update = () => {
    const value = Number(range.value);
    compare.style.setProperty('--position', `${value}%`);
    range.setAttribute('aria-valuetext', `Показано ${value}% изображения после обновления`);
  };

  range.addEventListener('input', update);
  update();
});
