// Adapted from IQCHISTKA / assets/js/main.js.
const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.menu-toggle');
const toggleLabel = toggle.querySelector('.sr-only');
const nav = document.querySelector('.site-nav');
const brand = document.querySelector('.site-header .brand');
const mobileViewport = window.matchMedia('(max-width: 1024px)');
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function setMenuOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  header.classList.toggle('menu-open', open);
  toggleLabel.textContent = open ? 'Закрыть меню' : 'Открыть меню';
  // Keep focus out of the hidden navigation when collapsed.
  if ('inert' in nav) nav.inert = mobileViewport.matches && !open;
}

toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  setMenuOpen(false);
  setActiveNavLink(link.getAttribute('href').slice(1));
});
brand.addEventListener('click', () => setMenuOpen(false));
document.addEventListener('pointerdown', (event) => {
  if (mobileViewport.matches && header.classList.contains('menu-open') && !header.contains(event.target)) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !header.classList.contains('menu-open')) return;
  setMenuOpen(false);
  toggle.focus();
});
function resetMenuAtDesktop() { setMenuOpen(false); }
if (mobileViewport.addEventListener) mobileViewport.addEventListener('change', resetMenuAtDesktop);
else mobileViewport.addListener(resetMenuAtDesktop);
resetMenuAtDesktop();

function updateAnchorOffset() {
  document.documentElement.style.setProperty('--anchor-offset', `${Math.ceil(header.getBoundingClientRect().bottom + 12)}px`);
}
updateAnchorOffset();
window.addEventListener('resize', updateAnchorOffset);
if ('ResizeObserver' in window) new ResizeObserver(updateAnchorOffset).observe(header);

function setActiveNavLink(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
let scrollFrame = 0;
function updateScrollSpy() {
  scrollFrame = 0;
  const line = header.getBoundingClientRect().bottom + 24;
  let activeId = sections[0]?.id;
  for (const section of sections) if (section.getBoundingClientRect().top <= line) activeId = section.id;
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) activeId = sections.at(-1)?.id;
  if (activeId) setActiveNavLink(activeId);
}
function requestScrollSpyUpdate() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollSpy); }
window.addEventListener('scroll', requestScrollSpyUpdate, {passive:true});
window.addEventListener('resize', requestScrollSpyUpdate);
updateScrollSpy();
