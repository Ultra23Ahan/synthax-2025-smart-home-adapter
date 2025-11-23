const canvas = document.getElementById('dots');
const ctx = canvas.getContext('2d');
let width, height, comets = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function Comet() {
  this.x = Math.random() * width;
  this.y = Math.random() * -height;
  this.length = Math.random() * 80 + 40;
  this.speed = Math.random() * 3 + 2;
  this.size = Math.random() * 1.5 + 1;
  this.angle = (3 * Math.PI) / 4;
  this.opacity = Math.random() * 0.5 + 0.5;
}

Comet.prototype.update = function() {
  this.x += this.speed * Math.cos(this.angle);
  this.y += this.speed * Math.sin(this.angle);
  
  if (this.x < -this.length || this.y > height + 50) {
    this.x = Math.random() * width + width;
    this.y = Math.random() * -100;
  }
};

Comet.prototype.draw = function() {
  const gradient = ctx.createLinearGradient(
    this.x, 
    this.y, 
    this.x - this.length * Math.cos(this.angle), 
    this.y - this.length * Math.sin(this.angle)
  );
  
  gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = this.size;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(
    this.x - this.length * Math.cos(this.angle), 
    this.y - this.length * Math.sin(this.angle)
  );
  ctx.stroke();
};

function initComets() {
  for (let i = 0; i < 60; i++) {
    comets.push(new Comet());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  
  for (let i = 0; i < comets.length; i++) {
    comets[i].update();
    comets[i].draw();
  }
  
  requestAnimationFrame(animate);
}

initComets();
animate();

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;
  
  if (username && password) {
    console.log('Login attempt:', { username, remember });
    
    setTimeout(() => {
      window.location.href = 'http://192.168.4.1';
    }, 500);
  }
});
