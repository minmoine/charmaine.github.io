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