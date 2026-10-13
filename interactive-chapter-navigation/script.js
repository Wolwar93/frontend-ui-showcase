// Extracted and adapted from the TSH Manifest interaction.
const navBox = document.getElementById('manifestNav');
const items = [...navBox.querySelectorAll('.manifest-nav-item')];
const counterNum = document.getElementById('manifestCounterNum');
const fadeBox = document.getElementById('manifestFade');
const elNum = document.getElementById('manifestNum');
const elTitle = document.getElementById('manifestTitle');
const elSub = document.getElementById('manifestSub');
const elBody = document.getElementById('manifestBody');
let pendingTransition;

function renderReader(i) {
  const item = items[i];
  fadeBox.scrollTop = 0;
  elNum.textContent = item.querySelector('.manifest-nav-num').textContent;
  elTitle.textContent = item.querySelector('.manifest-nav-title').textContent;
  elSub.textContent = item.querySelector('.manifest-nav-sub').textContent;
  elBody.replaceChildren(...[...item.querySelectorAll('.manifest-acc-inner p')].map(p => {
    const node = document.createElement('p');
    node.textContent = p.textContent;
    return node;
  }));
}
function isAccordionMode() {
  return matchMedia('(max-width: 900px)').matches ||
    matchMedia('(orientation: landscape) and (max-width: 1024px) and (max-height: 500px)').matches;
}
function setActiveChapter(i, animate = true) {
  clearTimeout(pendingTransition);
  items.forEach((item, index) => {
    item.classList.toggle('is-active', index === i);
    item.querySelector('.manifest-nav-head').setAttribute('aria-expanded', String(index === i));
  });
  counterNum.textContent = i + 1;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = () => {
    renderReader(i);
    fadeBox.classList.remove('is-leaving');
    if (reduced) fadeBox.classList.add('is-visible');
    else requestAnimationFrame(() => requestAnimationFrame(() => fadeBox.classList.add('is-visible')));
  };
  if (animate && !reduced && !isAccordionMode()) {
    fadeBox.classList.remove('is-visible');
    fadeBox.classList.add('is-leaving');
    pendingTransition = setTimeout(reveal, 180);
  } else reveal();
}
items.forEach((item, index) => item.querySelector('.manifest-nav-head').addEventListener('click', () => {
  if (isAccordionMode() && item.classList.contains('is-active')) return;
  setActiveChapter(index);
}));
setActiveChapter(0, false);
