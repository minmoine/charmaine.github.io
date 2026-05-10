// ─── Custom Cursor ────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('trail');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let trailX = mouseX;
let trailY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';

    requestAnimationFrame(animate);
}

animate();

// ─── Scrollable Planets Strip ─────────────────────────────────────────────────
const strip = document.getElementById('scrollPlanets');
if (strip) {
    let isDragging = false, startX = 0, scrollLeft = 0;

    strip.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX - strip.offsetLeft;
        scrollLeft = strip.scrollLeft;
    });

    document.addEventListener('mouseup', () => isDragging = false);
    strip.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        strip.scrollLeft = scrollLeft - (e.pageX - strip.offsetLeft - startX) * 1.2;
    });
}

// ─── Planets Overview ─────────────────────────────────────────────────────────
const planetButtons = document.querySelectorAll('.planet');
const planetName = document.getElementById('planetName');
const planetDesc = document.getElementById('planetDesc');

if (planetButtons.length && planetName && planetDesc) {
    const defaultName = planetName.textContent;
    const defaultDesc = planetDesc.textContent;

    const showPlanet = (btn) => {
        planetName.textContent = btn.dataset.name;
        planetDesc.textContent = btn.dataset.desc;
    };

    const resetPlanet = () => {
        const active = document.querySelector('.planet.active');
        if (active) {
            showPlanet(active);
        } else {
            planetName.textContent = defaultName;
            planetDesc.textContent = defaultDesc;
        }
    };

    planetButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => showPlanet(btn));
        btn.addEventListener('mouseleave', resetPlanet);
        btn.addEventListener('click', () => {
            if (btn.dataset.planet === 'mercury') {
                window.location.href = 'pages/mercury.html';
                return;
            }
            const wasActive = btn.classList.contains('active');
            planetButtons.forEach(b => b.classList.remove('active'));
            if (!wasActive) {
                btn.classList.add('active');
                showPlanet(btn);
            } else {
                resetPlanet();
            }
        });
    });
}