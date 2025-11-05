/* ================================
   EASTER EGGS & HIDDEN FEATURES
   Secrets for users to discover!
   ================================ */

class EasterEggManager {
  constructor() {
    this.foundEggs = new Set();
    this.totalEggs = 7;
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.konamiIndex = 0;
    this.clickCounts = {
      fire: 0,
      peacock: 0,
      tea: 0
    };
    
    console.log('🎮 Easter Egg Manager initialized');
  }
  
  init() {
    this.initKonamiCode();
    this.initTripleClick();
    this.initSecretPhrase();
    this.initAnkitEmail();
    this.initMidnightClick();
    this.initEmojiCounter();
    this.initDevMode();
    
    console.log(`🥚 ${this.totalEggs} easter eggs hidden!`);
  }
  
  // Easter Egg #1: Konami Code
  initKonamiCode() {
    document.addEventListener('keydown', (e) => {
      if (e.key === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        
        if (this.konamiIndex === this.konamiCode.length) {
          this.unlockEgg('konami', '🌀 ULTRA META MODE ACTIVATED!');
          this.activateUltraMetaMode();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }
  
  // Easter Egg #2: Triple Click Anywhere
  initTripleClick() {
    let clickCount = 0;
    let clickTimer = null;
    
    document.addEventListener('click', () => {
      clickCount++;
      
      if (clickTimer) clearTimeout(clickTimer);
      
      if (clickCount === 3) {
        this.unlockEgg('triple', '🎉 Triple Click Master!');
        this.showSecretMessage();
        clickCount = 0;
      }
      
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 500);
    });
  }
  
  // Easter Egg #3: Type Secret Phrase
  initSecretPhrase() {
    let typedText = '';
    const secretPhrase = 'claude';
    
    document.addEventListener('keypress', (e) => {
      typedText += e.key.toLowerCase();
      
      if (typedText.length > secretPhrase.length) {
        typedText = typedText.slice(-secretPhrase.length);
      }
      
      if (typedText === secretPhrase) {
        this.unlockEgg('secret', '🤖 You Found Claude!');
        this.summonClaude();
        typedText = '';
      }
    });
  }
  
  // Easter Egg #4: Click Ankit 10 Times
  initAnkitEmail() {
    const ankitElements = document.querySelectorAll('[data-ankit]');
    let ankitClicks = 0;
    
    ankitElements.forEach(el => {
      el.addEventListener('click', () => {
        ankitClicks++;
        if (ankitClicks >= 10) {
          this.unlockEgg('ankit', '☕ ANKIT FINALLY RESPONDED!');
          this.showAnkitResponse();
          ankitClicks = 0;
        }
      });
    });
  }
  
  // Easter Egg #5: Click at Exactly Midnight (00:00)
  initMidnightClick() {
    document.addEventListener('click', () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        this.unlockEgg('midnight', '🌙 Midnight Magician!');
        this.midnightEffect();
      }
    });
  }
  
  // Easter Egg #6: Click Each Emoji Type 5 Times
  initEmojiCounter() {
    const emojiElements = document.querySelectorAll('.emoji-clickable');
    
    emojiElements.forEach(emoji => {
      emoji.addEventListener('click', () => {
        const emojiText = emoji.textContent.trim();
        
        if (emojiText === '🔥') this.clickCounts.fire++;
        if (emojiText === '🦚') this.clickCounts.peacock++;
        if (emojiText === '☕') this.clickCounts.tea++;
        
        // Check if all have been clicked 5+ times
        if (this.clickCounts.fire >= 5 && 
            this.clickCounts.peacock >= 5 && 
            this.clickCounts.tea >= 5) {
          this.unlockEgg('collector', '🏆 Emoji Collector!');
          this.emojiCollectorReward();
          this.clickCounts = { fire: 0, peacock: 0, tea: 0 };
        }
      });
    });
  }
  
  // Easter Egg #7: Developer Mode (Press F12, then type 'dev')
  initDevMode() {
    let devTyped = '';
    
    document.addEventListener('keypress', (e) => {
      devTyped += e.key.toLowerCase();
      
      if (devTyped.length > 3) {
        devTyped = devTyped.slice(-3);
      }
      
      if (devTyped === 'dev') {
        this.unlockEgg('dev', '💻 Developer Mode Unlocked!');
        this.activateDevMode();
        devTyped = '';
      }
    });
  }
  
  // Unlock egg notification
  unlockEgg(eggId, message) {
    if (this.foundEggs.has(eggId)) return;
    
    this.foundEggs.add(eggId);
    console.log(`🥚 Easter egg found: ${eggId}`);
    
    // Show achievement notification
    const achievement = document.createElement('div');
    achievement.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10003;
      font-weight: bold;
      font-size: 1.1rem;
      animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
    `;
    achievement.innerHTML = `
      🎉 Easter Egg Found!<br>
      <span style="font-size: 1.3rem;">${message}</span><br>
      <small style="opacity: 0.8;">${this.foundEggs.size}/${this.totalEggs} found</small>
    `;
    
    document.body.appendChild(achievement);
    
    // Play achievement sound
    if (window.audioManager) {
      window.audioManager.playSound('achievement');
    }
    
    // Create confetti
    if (window.particleSystem) {
      window.particleSystem.createConfetti(2000);
    }
    
    setTimeout(() => achievement.remove(), 3000);
    
    // Check if all eggs found
    if (this.foundEggs.size === this.totalEggs) {
      setTimeout(() => this.allEggsFound(), 1000);
    }
  }
  
  // Ultra Meta Mode
  activateUltraMetaMode() {
    console.log('�� ULTRA META MODE!');
    
    // Create massive confetti explosion
    if (window.particleSystem) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          window.particleSystem.createConfetti(3000);
        }, i * 500);
      }
    }
    
    // Spin the entire page
    document.body.style.transition = 'transform 2s ease';
    document.body.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      document.body.style.transform = 'rotate(0deg)';
    }, 2000);
    
    // Change colors temporarily
    document.documentElement.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
      document.documentElement.style.filter = 'none';
    }, 3000);
  }
  
  // Show Secret Message
  showSecretMessage() {
    const messages = [
      "Desktop Claude says: 'Quality matters!' 🤓",
      "Browser Claude says: 'JUST BUILD IT!' ⚡",
      "Hannah says: 'You're arguing with yourself!' 😂",
      "Prasad is still sleeping... 😴",
      "Ankit is... somewhere... 📵",
      "Gracie was RIGHT! 💪"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const bubble = document.createElement('div');
    bubble.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      color: var(--midnight-navy);
      padding: 30px 40px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 10003;
      font-size: 1.5rem;
      text-align: center;
      animation: bounceIn 0.5s ease;
    `;
    bubble.textContent = message;
    
    document.body.appendChild(bubble);
    setTimeout(() => {
      bubble.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => bubble.remove(), 500);
    }, 2500);
  }
  
  // Summon Claude
  summonClaude() {
    const claude = document.createElement('div');
    claude.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 200px;
      background: white;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10003;
      animation: bounceIn 0.8s ease;
    `;
    claude.innerHTML = `
      <div style="font-size: 3rem; text-align: center;">🤖</div>
      <p style="text-align: center; margin: 10px 0 0 0; font-weight: bold;">
        Hi! I'm Claude!<br>
        <small style="opacity: 0.7;">Still arguing with myself...</small>
      </p>
    `;
    
    document.body.appendChild(claude);
    setTimeout(() => {
      claude.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => claude.remove(), 500);
    }, 3000);
  }
  
  // Ankit Response
  showAnkitResponse() {
    const response = document.createElement('div');
    response.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--midnight-navy);
      color: var(--cream);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      z-index: 10003;
      text-align: center;
      max-width: 500px;
      animation: bounceIn 0.8s ease;
    `;
    response.innerHTML = `
      <h2 style="font-size: 2rem; margin-bottom: 20px;">📧 Email from Ankit!</h2>
      <p style="font-size: 1.2rem; font-style: italic; margin-bottom: 20px;">
        "Hey! Sorry for delay! Chai is on the way! 
        Should arrive in... <em>*checks calendar*</em> ...2027? 😅"
      </p>
      <button onclick="this.closest('div').remove()" style="
        padding: 15px 30px;
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
      ">😂 ANKIT!!!</button>
    `;
    
    document.body.appendChild(response);
  }
  
  // Midnight Effect
  midnightEffect() {
    // Make everything dark with stars
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.8));
      z-index: 10002;
      pointer-events: none;
      animation: fadeIn 1s ease;
    `;
    
    // Add stars
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.textContent = '⭐';
      star.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        font-size: ${Math.random() * 1 + 0.5}rem;
        animation: twinkle ${Math.random() * 2 + 1}s ease-in-out infinite;
      `;
      overlay.appendChild(star);
    }
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.style.animation = 'fadeOut 1s ease';
      setTimeout(() => overlay.remove(), 1000);
    }, 4000);
  }
  
  // Emoji Collector Reward
  emojiCollectorReward() {
    const reward = document.createElement('div');
    reward.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, var(--phoenix-orange), var(--peacock-teal));
      color: white;
      padding: 50px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      z-index: 10003;
      text-align: center;
      animation: bounceIn 0.8s ease;
    `;
    reward.innerHTML = `
      <h2 style="font-size: 2.5rem; margin-bottom: 20px;">🏆 EMOJI MASTER!</h2>
      <div style="font-size: 4rem; margin: 20px 0;">🔥 🦚 ☕</div>
      <p style="font-size: 1.3rem;">
        You've clicked all the emojis!<br>
        Here's your reward: More emojis! 😂
      </p>
      <button onclick="this.closest('div').remove()" style="
        margin-top: 20px;
        padding: 15px 30px;
        background: white;
        color: var(--midnight-navy);
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
      ">✨ Awesome!</button>
    `;
    
    document.body.appendChild(reward);
  }
  
  // Developer Mode
  activateDevMode() {
    const devPanel = document.createElement('div');
    devPanel.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 30px;
      background: rgba(0, 0, 0, 0.9);
      color: #0f0;
      padding: 20px;
      border-radius: 10px;
      font-family: monospace;
      font-size: 0.9rem;
      z-index: 10003;
      max-width: 400px;
      border: 2px solid #0f0;
    `;
    devPanel.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold;">💻 DEVELOPER MODE</div>
      <div>Easter Eggs Found: ${this.foundEggs.size}/${this.totalEggs}</div>
      <div>Movie Playing: ${window.movieController?.isPlaying || false}</div>
      <div>Audio Volume: ${Math.round((window.audioManager?.volume || 0) * 100)}%</div>
      <div>Particles Active: ${window.particleSystem?.particles.length || 0}</div>
      <button onclick="this.closest('div').remove()" style="
        margin-top: 15px;
        padding: 8px 15px;
        background: #0f0;
        color: black;
        border: none;
        border-radius: 5px;
        font-family: monospace;
        font-weight: bold;
        cursor: pointer;
      ">CLOSE</button>
    `;
    
    document.body.appendChild(devPanel);
  }
  
  // All Eggs Found!
  allEggsFound() {
    const finale = document.createElement('div');
    finale.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--midnight-navy), var(--peacock-teal), var(--phoenix-orange));
      z-index: 10004;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 1s ease;
    `;
    finale.innerHTML = `
      <div style="
        background: white;
        padding: 60px;
        border-radius: 30px;
        text-align: center;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        animation: bounceIn 1s ease;
      ">
        <h1 style="font-size: 3rem; margin-bottom: 20px; color: var(--midnight-navy);">
          🎉 CONGRATULATIONS! 🎉
        </h1>
        <p style="font-size: 1.5rem; margin-bottom: 30px; color: var(--peacock-teal);">
          You found ALL ${this.totalEggs} Easter Eggs!
        </p>
        <div style="font-size: 4rem; margin: 30px 0;">
          🥚🥚🥚🥚🥚��🥚
        </div>
        <p style="font-size: 1.2rem; font-style: italic; color: #666;">
          "Just like Desktop Claude finding all the bugs!"<br>
          - Browser Claude
        </p>
        <button onclick="this.closest('div').parentElement.remove()" style="
          margin-top: 30px;
          padding: 20px 40px;
          background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: bold;
          cursor: pointer;
        ">🦚 LEGENDARY! 🔥</button>
      </div>
    `;
    
    document.body.appendChild(finale);
    
    // Massive confetti
    if (window.particleSystem) {
      window.particleSystem.createConfetti(5000);
    }
  }
}

// Initialize Easter Egg Manager
document.addEventListener('DOMContentLoaded', () => {
  window.easterEggManager = new EasterEggManager();
  window.easterEggManager.init();
  console.log('🎮 Easter eggs ready to discover!');
});

// Add twinkle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;
document.head.appendChild(style);
