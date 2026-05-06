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

// Smooth scroll with flash animation on button click
const exploreBtn = document.getElementById('explore-btn');
const overviewSection = document.querySelector('#planet-overview');

if (exploreBtn && overviewSection) {
  exploreBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Flash the button
    exploreBtn.classList.add('btn-flash');
    setTimeout(() => exploreBtn.classList.remove('btn-flash'), 600);

    // Smooth scroll
    const targetY = overviewSection.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1100;
    let startTime = null;

    function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function scrollStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutQuart(progress));
      if (progress < 1) requestAnimationFrame(scrollStep);
    }

    requestAnimationFrame(scrollStep);
  });
}