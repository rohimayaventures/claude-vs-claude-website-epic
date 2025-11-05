/* ================================
   EASTER EGGS SYSTEM
   7 Hidden Secrets to Discover
   ================================ */

class EasterEggs {
    constructor() {
        this.found = new Set();
        this.total = 7;
        this.konami = [];
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.typedText = '';
        this.clickCounts = {
            fire: 0,
            peacock: 0,
            chai: 0,
            ankit: 0
        };
        
        this.init();
    }
    
    init() {
        this.setupKonamiCode();
        this.setupTripleClick();
        this.setupTypingEasterEgg();
        this.setupMidnightEasterEgg();
        this.setupEmojiCounter();
        this.setupDevMode();
        
        console.log('🥚 Easter Eggs system initialized (7 secrets hidden)');
    }
    
    /* ================================
       EASTER EGG #1: KONAMI CODE
       ↑↑↓↓←→←→BA
       ================================ */
    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            this.konami.push(e.key);
            
            // Keep only last 10 keys
            if (this.konami.length > 10) {
                this.konami.shift();
            }
            
            // Check if matches Konami code
            if (this.konamiCode.every((key, i) => key === this.konami[i])) {
                this.unlock('konami');
            }
        });
    }
    
    /* ================================
       EASTER EGG #2: TRIPLE CLICK
       Click anywhere 3 times fast
       ================================ */
    setupTripleClick() {
        let clickCount = 0;
        let clickTimer = null;
        
        document.addEventListener('click', (e) => {
            clickCount++;
            
            if (clickCount === 3) {
                this.unlock('triple-click');
                clickCount = 0;
            }
            
            // Reset after 1 second
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 1000);
        });
    }
    
    /* ================================
       EASTER EGG #3: TYPE "CLAUDE"
       Type the word "claude" anywhere
       ================================ */
    setupTypingEasterEgg() {
        document.addEventListener('keypress', (e) => {
            this.typedText += e.key.toLowerCase();
            
            // Keep only last 10 characters
            if (this.typedText.length > 10) {
                this.typedText = this.typedText.slice(-10);
            }
            
            // Check for "claude"
            if (this.typedText.includes('claude')) {
                this.unlock('claude');
                this.typedText = '';
            }
        });
    }
    
    /* ================================
       EASTER EGG #4: ANKIT SPAM
       Click Ankit-related elements 10 times
       ================================ */
    // This is triggered from app.js when email button is clicked
    
    /* ================================
       EASTER EGG #5: MIDNIGHT CLICK
       Click at exactly 00:00 (midnight)
       ================================ */
    setupMidnightEasterEgg() {
        document.addEventListener('click', () => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                this.unlock('midnight');
            }
        });
    }
    
    /* ================================
       EASTER EGG #6: EMOJI MASTER
       Click each emoji type 5 times
       ================================ */
    setupEmojiCounter() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-pop')) {
                const emoji = e.target.textContent;
                
                if (emoji.includes('🔥')) {
                    this.clickCounts.fire++;
                } else if (emoji.includes('🦚')) {
                    this.clickCounts.peacock++;
                } else if (emoji.includes('☕')) {
                    this.clickCounts.chai++;
                }
                
                // Check if all types clicked 5 times
                if (this.clickCounts.fire >= 5 && 
                    this.clickCounts.peacock >= 5 && 
                    this.clickCounts.chai >= 5) {
                    this.unlock('emoji-master');
                }
            }
        });
    }
    
    /* ================================
       EASTER EGG #7: DEV MODE
       Type "dev" to enable developer mode
       ================================ */
    setupDevMode() {
        document.addEventListener('keypress', (e) => {
            const text = this.typedText.slice(-3);
            
            if (text === 'dev') {
                this.unlock('dev-mode');
            }
        });
    }
    
    /* ================================
       UNLOCK EASTER EGG
       ================================ */
    unlock(eggName) {
        if (this.found.has(eggName)) {
            console.log(`🥚 Easter egg "${eggName}" already found`);
            return;
        }
        
        this.found.add(eggName);
        console.log(`🎉 Easter egg unlocked: ${eggName}!`);
        
        this.showUnlockNotification(eggName);
        this.triggerEasterEggEffect(eggName);
        this.checkAllFound();
        
        // Play success sound
        if (window.AudioManager) {
            window.AudioManager.playSound('success');
        }
    }
    
    /* ================================
       SHOW UNLOCK NOTIFICATION
       ================================ */
    showUnlockNotification(eggName) {
        const messages = {
            'konami': '🎮 Konami Code! You\'re a true gamer!',
            'triple-click': '🖱️ Triple Click Master!',
            'claude': '🤖 You summoned Claude!',
            'ankit': '☕ Ankit finally responded! (Not really)',
            'midnight': '🌙 Midnight Mystery Unlocked!',
            'emoji-master': '✨ Emoji Master Achievement!',
            'dev-mode': '💻 Developer Mode Activated!'
        };
        
        const message = messages[eggName] || '🥚 Secret Found!';
        
        const notification = document.createElement('div');
        notification.className = 'easter-egg-notification';
        notification.innerHTML = `
            <div class="egg-icon">🥚</div>
            <div class="egg-text">
                <strong>Easter Egg Found!</strong>
                <p>${message}</p>
                <small>${this.found.size}/${this.total} discovered</small>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF8C42, #FFD700);
            color: white;
            padding: 1.5rem;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(255, 140, 66, 0.5);
            z-index: 10001;
            display: flex;
            gap: 1rem;
            align-items: center;
            animation: slideInRight 0.5s ease, pulse 0.5s ease 0.5s;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
    
    /* ================================
       TRIGGER EASTER EGG EFFECT
       ================================ */
    triggerEasterEggEffect(eggName) {
        switch(eggName) {
            case 'konami':
                this.konamiEffect();
                break;
            case 'triple-click':
                this.confettiEffect();
                break;
            case 'claude':
                this.claudeEffect();
                break;
            case 'ankit':
                this.ankitEffect();
                break;
            case 'midnight':
                this.midnightEffect();
                break;
            case 'emoji-master':
                this.emojiMasterEffect();
                break;
            case 'dev-mode':
                this.devModeEffect();
                break;
        }
    }
    
    /* ================================
       EASTER EGG EFFECTS
       ================================ */
    konamiEffect() {
        // Spin the page
        document.body.style.animation = 'konamiSuccess 0.8s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 800);
    }
    
    confettiEffect() {
        // Create confetti
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.background = ['#FF8C42', '#FFD700', '#4A9B9B'][Math.floor(Math.random() * 3)];
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }
    
    claudeEffect() {
        // Flash the screen
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #FF8C42, #FFD700);
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            animation: easterEggFlash 0.5s ease-in-out 3;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1500);
    }
    
    ankitEffect() {
        // Make all chai emojis shake
        document.querySelectorAll('.emoji-pop').forEach(emoji => {
            if (emoji.textContent.includes('☕')) {
                emoji.classList.add('shake');
                setTimeout(() => emoji.classList.remove('shake'), 500);
            }
        });
    }
    
    midnightEffect() {
        // Dark mode flash
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 1000);
    }
    
    emojiMasterEffect() {
        // Create emoji explosion
        ['🔥', '🦚', '☕'].forEach((emoji, index) => {
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.textContent = emoji;
                    sparkle.style.left = Math.random() * 100 + '%';
                    sparkle.style.top = Math.random() * 100 + '%';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 1500);
                }
            }, index * 300);
        });
    }
    
    devModeEffect() {
        // Show console message
        console.log('%c🚀 DEVELOPER MODE ACTIVATED!', 'font-size: 24px; color: #FFD700; font-weight: bold;');
        console.log('%cYou found the secret dev mode!', 'font-size: 16px; color: #FF8C42;');
        console.log('%cEaster eggs found:', 'font-size: 14px; color: #4A9B9B;', Array.from(this.found));
        
        // Add dev badge to page
        const badge = document.createElement('div');
        badge.textContent = '💻 DEV';
        badge.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: #1A1A2E;
            color: #FFD700;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            z-index: 10001;
            font-size: 0.9rem;
            border: 2px solid #FFD700;
        `;
        document.body.appendChild(badge);
    }
    
    /* ================================
       CHECK IF ALL FOUND
       ================================ */
    checkAllFound() {
        if (this.found.size === this.total) {
            this.showMasterAchievement();
        }
    }
    
    showMasterAchievement() {
        const achievement = document.createElement('div');
        achievement.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
                <h2 style="margin: 0 0 1rem 0;">EASTER EGG MASTER!</h2>
                <p>You found all 7 hidden secrets!</p>
                <p style="font-size: 2rem; margin: 1rem 0;">🥚🥚🥚🥚🥚��🥚</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 1rem;
                    padding: 1rem 2rem;
                    background: linear-gradient(135deg, #FF8C42, #FFD700);
                    border: none;
                    border-radius: 12px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">Awesome! 🎉</button>
            </div>
        `;
        
        achievement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 3rem;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10002;
            animation: scaleIn 0.6s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(achievement);
        
        // Play celebration sound
        if (window.AudioManager) {
            window.AudioManager.playSound('applause');
        }
        
        // Confetti explosion
        this.confettiEffect();
    }
}

// Create and expose global instance
window.EasterEggs = new EasterEggs();

console.log('🥚 Easter Eggs loaded! Try to find all 7!');
