// ─── Custom Cursor ────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('trail');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, 80);
});

window.addEventListener('load', () => {
  sessionStorage.removeItem('fromMercuryClick');
  const planet = document.getElementById('slidePlanet');
  planet.addEventListener('animationend', () => {
    planet.classList.add('floating');
  }, { once: true });
});


// ─── Scroll Section ───────────────────────────────────────────────────────────
(function () {
  const wrapper    = document.getElementById('mercuryScrollWrapper');
  const planet     = document.getElementById('mercuryScrollPlanet');
  const factsLeft  = document.getElementById('mercuryFactsLeft');
  const factsRight = document.getElementById('mercuryFactsRight');
  const title      = document.getElementById('mercuryScrollTitle');
  if (!wrapper || !planet) return;

  function tick() {
    const top      = wrapper.getBoundingClientRect().top;
    const progress = -top / (wrapper.offsetHeight - window.innerHeight);
    const visible  = progress > 0.08;
    planet.classList.toggle('visible', visible);
    if (factsLeft)  factsLeft.classList.toggle('visible', visible);
    if (factsRight) factsRight.classList.toggle('visible', visible);
    if (title)      title.classList.toggle('visible', visible);
  }

  window.addEventListener('scroll', tick, { passive: true });
})();


document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = href; }, 400);
  });
});