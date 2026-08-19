const SECTION_IDS = ['#home', '#sobre-mim', '#projetos', '#contatos'];
const DURATION = 900;
const SHIFT = 72;

let isAnimating = false;

const easeInOutCubic = (progress) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

function setActiveSection(target) {
  document.querySelectorAll('.section').forEach((section) => {
    section.classList.toggle('section-active', section === target);
  });
}

function setTransitionDirection(page) {
  const directions = [
    { x: SHIFT, y: 0 },   // direita
    { x: -SHIFT, y: 0 },  // esquerda
    { x: 0, y: SHIFT },   // baixo
    { x: 0, y: -SHIFT },  // cima
  ];

  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  page.style.setProperty('--section-shift-x', `${randomDirection.x}px`);
  page.style.setProperty('--section-shift-y', `${randomDirection.y}px`);
}

function animateScroll(page, targetTop) {
  return new Promise((resolve) => {
    const start = page.scrollTop;
    const distance = targetTop - start;
    const startTime = performance.now();

    page.classList.add('is-scrolling');
    page.style.scrollSnapType = 'none';

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeInOutCubic(progress);

      page.scrollTop = start + distance * eased;

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      page.style.scrollSnapType = 'y mandatory';
      page.classList.remove('is-scrolling');
      resolve();
    };

    requestAnimationFrame(step);
  });
}

export function scrollToSection(href) {
  const page = document.getElementById('page');
  const target = document.querySelector(href);

  if (!page || !target || isAnimating) return;

  if (page.scrollTop === target.offsetTop) {
    setActiveSection(target);
    return;
  }

  isAnimating = true;
  setTransitionDirection(page);

  document.querySelectorAll('.section').forEach((section) => {
    section.classList.remove('section-active');
  });

  animateScroll(page, target.offsetTop).then(() => {
    setActiveSection(target);
    isAnimating = false;
  });
}

export function handleSectionClick(event, href) {
  if (!href.startsWith('#')) return;
  event.preventDefault();
  scrollToSection(href);
}

export function initSectionTransitions() {
  const page = document.getElementById('page');
  const firstSection = document.querySelector(SECTION_IDS[0]);

  if (firstSection) {
    setActiveSection(firstSection);
  }

  if (!page) return;

  page.style.scrollBehavior = 'auto';
  page.style.setProperty('--section-shift-x', `${SHIFT}px`);
  page.style.setProperty('--section-shift-y', `0px`);
}
