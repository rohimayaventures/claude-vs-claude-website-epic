/* ================================
   PARTICLE ANIMATIONS SYSTEM
   Visual effects for clicks and interactions
   ================================ */

// Particle system
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.particles = [];
        this.init();
    }
    
    init() {
        if (!this.canvas) {
            console.warn('Particle canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        
        this.animate();
        
        console.log('✨ Particle system initialized');
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticle(x, y, type = 'fire') {
        const colors = {
            fire: ['#FF8C42', '#FFD700', '#FF6B35'],
            peacock: ['#4A9B9B', '#6BC1C1', '#2D7A7A'],
            chai: ['#8B4513', '#D2691E', '#A0522D']
        };
        
        const particleColors = colors[type] || colors.fire;
        
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 2 + Math.random() * 3;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
                size: 3 + Math.random() * 4
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // Gravity
            particle.life -= 0.02;
            
            if (particle.life > 0) {
                this.ctx.globalAlpha = particle.life;
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                return true;
            }
            return false;
        });
        
        this.ctx.globalAlpha = 1;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Create global particle system
window.particleSystem = new ParticleSystem();

// Expose particle creation function
window.createParticles = function(x, y, type) {
    if (window.particleSystem) {
        window.particleSystem.createParticle(x, y, type);
    }
};

console.log('✨ Animations.js loaded!');

// Auto-initialize particle system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.particleSystem = new ParticleSystem();
        console.log('✨ Particle System auto-initialized!');
    });
} else {
    window.particleSystem = new ParticleSystem();
    console.log('✨ Particle System initialized immediately!');
}
// Auto-initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystem();
    console.log('✨ Particle system ready!');
});