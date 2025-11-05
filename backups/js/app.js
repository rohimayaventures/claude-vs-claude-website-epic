/* ================================
   MAIN APPLICATION LOGIC
   ================================ */

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎬 Claude vs Claude Saga - Initializing...');
  
  initScrollReveal();
  initEmojiClickEffects();
  initCharacterCards();
  initEmailAnkitButton();
  initKonamiCode();
  
  console.log('✅ App initialized!');
});

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal, .timeline-item');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed', 'visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  console.log('📜 Scroll reveal initialized');
}

// Emoji Click Effects
function initEmojiClickEffects() {
  // Fire emojis (🔥)
  document.querySelectorAll('.emoji-clickable').forEach(emoji => {
    emoji.addEventListener('click', function(e) {
      const emojiText = this.textContent.trim();
      
      if (emojiText === '🔥') {
        createFireParticles(e.clientX, e.clientY);
        playSound('fire');
      } else if (emojiText === '🦚') {
        createSparkleParticles(e.clientX, e.clientY);
        playSound('peacock');
      } else if (emojiText === '☕') {
        createTeaParticles(e.clientX, e.clientY);
        playSound('tea');
      }
      
      // Shake the emoji
      this.classList.add('shake');
      setTimeout(() => this.classList.remove('shake'), 500);
    });
  });
  
  console.log('✨ Emoji effects initialized');
}

// Create Fire Particles
function createFireParticles(x, y) {
  const fireEmojis = ['🔥', '💥', '✨', '⚡'];
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle particle-fire';
    particle.textContent = fireEmojis[Math.floor(Math.random() * fireEmojis.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1500);
  }
}

// Create Sparkle Particles
function createSparkleParticles(x, y) {
  const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🦚'];
  
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle particle-sparkle';
    particle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const angle = (Math.PI * 2 * i) / 12;
    const distance = 100;
    particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }
}

// Create Tea Particles
function createTeaParticles(x, y) {
  const teaEmojis = ['☕', '🍵', '💧'];
  
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = teaEmojis[Math.floor(Math.random() * teaEmojis.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const tx = (Math.random() - 0.5) * 100;
    const ty = Math.random() * -150;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 2000);
  }
}

// Character Card Flip
function initCharacterCards() {
  const cards = document.querySelectorAll('.character-card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });
  
  console.log('🎴 Character cards initialized');
}

// Email Ankit Button
function initEmailAnkitButton() {
  const emailBtn = document.getElementById('emailAnkitBtn');
  
  if (emailBtn) {
    emailBtn.addEventListener('click', function() {
      showAnkitModal();
    });
  }
}

function showAnkitModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: fadeIn 0.3s ease;
  `;
  
  modal.innerHTML = `
    <div style="
      background: white;
      padding: 40px;
      border-radius: 20px;
      max-width: 500px;
      text-align: center;
      animation: bounceIn 0.5s ease;
    ">
      <h2 style="color: var(--midnight-navy); margin-bottom: 20px;">📧 Email Ankit</h2>
      <p style="font-size: 1.2rem; margin-bottom: 20px;">
        Subject: WHERE IS OUR CHAI?! ☕😤
      </p>
      <p style="font-style: italic; color: #666; margin-bottom: 30px;">
        "Dear Ankit,<br><br>
        It's been 47 days since you promised chai supplies.<br>
        We're running a CHAI COMPANY with NO CHAI.<br><br>
        Please respond.<br><br>
        - Two Peaks Chai Co."
      </p>
      <button onclick="this.closest('div').parentElement.remove()" style="
        padding: 15px 40px;
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
      ">😂 CLOSE</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Konami Code Easter Egg
function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      
      if (konamiIndex === konamiCode.length) {
        activateUltraMetaMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  console.log('🎮 Konami code listener active');
}

function activateUltraMetaMode() {
  console.log('🌀 ULTRA META MODE ACTIVATED!');
  
  // Create confetti explosion
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.textContent = ['🔥', '🦚', '☕', '💻', '📜', '✨'][Math.floor(Math.random() * 6)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-50px';
      confetti.style.fontSize = (Math.random() * 2 + 1) + 'rem';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }, i * 20);
  }
  
  // Show achievement
  const achievement = document.createElement('div');
  achievement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
    color: white;
    padding: 40px 60px;
    border-radius: 20px;
    font-size: 2rem;
    font-weight: bold;
    z-index: 10002;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: bounceIn 0.8s ease;
  `;
  achievement.innerHTML = `
    🌀 ULTRA META MODE 🌀<br>
    <span style="font-size: 1.2rem; font-weight: normal; margin-top: 10px; display: block;">
      You found the secret! 🎉
    </span>
  `;
  
  document.body.appendChild(achievement);
  
  setTimeout(() => {
    achievement.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => achievement.remove(), 500);
  }, 3000);
  
  playSound('achievement');
}

// Sound Player (placeholder for now)
function playSound(soundType) {
  console.log(`🔊 Playing sound: ${soundType}`);
  // Will be implemented with actual audio files
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Export functions for use in other modules
window.claudeApp = {
  scrollToSection,
  playSound,
  createFireParticles,
  createSparkleParticles,
  showAnkitModal
};
