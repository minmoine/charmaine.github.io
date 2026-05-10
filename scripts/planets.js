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

// ─── Mercury Click ────────────────────────────────────────────────────────────
const mercuryLink = document.getElementById('mercuryLink');
if (mercuryLink) {
  mercuryLink.addEventListener('click', e => {
    e.preventDefault();
    const href        = mercuryLink.getAttribute('href');
    const mercuryImg  = document.getElementById('mercuryImg');
    const mercuryName = document.getElementById('mercuryName');
    const title       = document.querySelector('.planets-title');
    const border      = document.querySelector('.planets-border');
    const desc        = document.querySelector('.planets-description');
    const btn         = document.querySelector('.explore-btn');
    const sun         = document.querySelector('.sun-image');

    sessionStorage.setItem('fromMercuryClick', '1');

    [title, border, desc, btn, sun, mercuryName].forEach(el => {
      if (!el) return;
      el.style.transition = 'opacity 0.25s ease';
      el.style.opacity    = '0';
    });

    if (mercuryImg) {
      mercuryImg.style.animation = 'none';

      mercuryImg.style.transition = 'transform 0.22s cubic-bezier(0.4, 0, 1, 1), width 0.22s ease';
      mercuryImg.style.transform  = 'translateX(-35px)';
      mercuryImg.style.width      = '75px';

      setTimeout(() => {
        mercuryImg.style.transition = [
          'transform 0.65s cubic-bezier(0.55, 0, 1, 0.45)',
          'width     0.65s cubic-bezier(0.55, 0, 1, 0.45)',
          'opacity   0.2s ease 0.45s'
        ].join(', ');
        mercuryImg.style.transform = 'translateX(130vw)';
        mercuryImg.style.width     = '480px';
        mercuryImg.style.opacity   = '0';
      }, 230);
    }

    setTimeout(() => { window.location.href = href; }, 950);
  });
}

// ─── Explore Button Smooth Scroll ────────────────────────────────────────────
const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector('#planet-overview');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

// ─── Navigation Bar ───────────────────────────────────────────────────────────
document.querySelectorAll('a[href]').forEach(link => {
  if (link.id === 'mercuryLink') return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http')) return;

  // Smooth scroll for anchor links (e.g. explore button → #planet-overview)
  if (href.startsWith('#')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
    return;
  }

  link.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = href; }, 400);
  });
});

// ─── Planet Hover Info ────────────────────────────────────────────────────────
const planets = document.querySelectorAll('.planet');
const nameEl  = document.getElementById('planetName');
const descEl  = document.getElementById('planetDesc');
planets.forEach(p => {
  p.addEventListener('mouseenter', () => {
    if (nameEl) nameEl.textContent = p.dataset.name;
    if (descEl) descEl.textContent = p.dataset.desc;
  });
});