// Initialize canvas
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Gold color generator
function getGoldColor() {
  return `hsl(${Math.random() * 20 + 40}, 100%, 50%)`; // Gold shades
}

// Firework class
class Firework {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.speed = 2 + Math.random() * 3;
    this.color = getGoldColor();
    this.particles = [];
  }

  update() {
    this.y -= this.speed;

    // Draw firework
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Explode if reached target
    if (this.y <= this.targetY) {
      this.explode();
      this.reset();
    }
  }

  explode() {
    // Create explosion particles
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        color: this.color,
        radius: 1 + Math.random() * 2,
        speed: {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6
        },
        alpha: 1,
        decay: Math.random() * 0.02 + 0.01
      });
    }
  }
}

// Main animation
let fireworks = [];
function loop() {
  // Clear canvas with semi-transparent background
  ctx.fillStyle = "rgba(15, 12, 41, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create new fireworks randomly
  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  // Update all fireworks
  fireworks.forEach(fw => {
    fw.update();
    
    // Update and draw particles
    fw.particles.forEach((p, i) => {
      p.x += p.speed.x;
      p.y += p.speed.y;
      p.speed.y += 0.05; // Gravity
      p.alpha -= p.decay;
      
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      
      // Remove dead particles
      if (p.alpha <= 0) {
        fw.particles.splice(i, 1);
      }
    });
  });

  requestAnimationFrame(loop);
}

// Start fireworks
function startFireworks() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fireworks = [];
  loop();
}

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});