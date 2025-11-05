/* ================================
   MAIN APPLICATION LOGIC
   Claude vs Claude Epic Website
   ================================ */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Claude vs Claude - Initializing...');
    
    // Initialize all features
    initScrollReveal();
    initHeroButtons();
    initCharacterCards();
    initEmojiEffects();
    initEmailAnkitButton();
    initSmoothScroll();
    
    console.log('✅ App initialized!');
});

/* ================================
   SCROLL REVEAL ANIMATIONS
   ================================ */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    console.log('📜 Scroll reveal initialized');
}

/* ================================
   HERO BUTTONS
   ================================ */
function initHeroButtons() {
    const playMovieBtn = document.getElementById('playMovieBtn');
    const readStoryBtn = document.getElementById('readStoryBtn');
    
    if (playMovieBtn) {
        playMovieBtn.addEventListener('click', () => {
            console.log('🎬 Play Movie clicked');
            
            // Start movie mode (will be handled by movie-controller.js)
            if (window.MovieController) {
                window.MovieController.start();
            } else {
                // Fallback: scroll to first section
                document.getElementById('characters').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
    
    if (readStoryBtn) {
        readStoryBtn.addEventListener('click', () => {
            console.log('📖 Read Story clicked');
            document.getElementById('characters').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    console.log('🎯 Hero buttons initialized');
}

/* ================================
   CHARACTER CARD FLIPS
   ================================ */
function initCharacterCards() {
    const cards = document.querySelectorAll('.character-card');
    
    cards.forEach(card => {
        const flipBtns = card.querySelectorAll('.flip-btn');
        
        flipBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('flipped');
                
                // Play sound effect if available
                if (window.AudioManager && window.AudioManager.playSound) {
                    window.AudioManager.playSound('flip');
                }
            });
        });
        
        // Optional: Click anywhere on card to flip
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
    
    console.log('🎴 Character cards initialized');
}

/* ================================
   EMOJI CLICK EFFECTS
   ================================ */
function initEmojiEffects() {
    // Make all emojis clickable with particle effects
    const emojiPattern = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    
    // Add emoji-pop class to all emojis in the document
    function addEmojiEffects(element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            if (emojiPattern.test(node.textContent)) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            const span = document.createElement('span');
            span.innerHTML = textNode.textContent.replace(
                emojiPattern,
                '<span class="emoji-pop">$&</span>'
            );
            textNode.parentNode.replaceChild(span, textNode);
        });
    }
    
    // Apply to main content areas
    const contentAreas = [
        '.hero-content',
        '.characters-section',
        '.timeline-section',
        '.chai-section',
        '.businesses-section',
        '.meta-section'
    ];
    
    contentAreas.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            addEmojiEffects(element);
        }
    });
    
    // Add click handlers to emoji-pop elements
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji-pop')) {
            const emoji = e.target.textContent;
            const rect = e.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Create particles (handled by animations.js)
            if (window.createParticles) {
                window.createParticles(x, y, getParticleType(emoji));
            }
            
            // Play sound effect
            if (window.AudioManager) {
                window.AudioManager.playEmojiSound(emoji);
            }
        }
    });
    
    console.log('✨ Emoji effects initialized');
}

// Determine particle type based on emoji
function getParticleType(emoji) {
    if (emoji.includes('🔥') || emoji.includes('🦚')) return 'fire';
    if (emoji.includes('☕') || emoji.includes('🫖')) return 'chai';
    return 'peacock';
}

/* ================================
   EMAIL ANKIT BUTTON
   ================================ */
function initEmailAnkitButton() {
    const emailBtn = document.getElementById('emailAnkitBtn');
    
    if (emailBtn) {
        let clickCount = 0;
        
        emailBtn.addEventListener('click', () => {
            clickCount++;
            
            const messages = [
                '📧 Email sent to Ankit... (He won\'t respond)',
                '📧 Sending reminder... (Still nothing)',
                '📧 URGENT: Where is our chai?! (Read: Never)',
                '📧 FINAL WARNING! (Ankit is a ghost 👻)',
                '☕ You know what? We don\'t need Ankit! 💪'
            ];
            
            const message = messages[Math.min(clickCount - 1, messages.length - 1)];
            
            emailBtn.textContent = message;
            emailBtn.classList.add('shake');
            
            setTimeout(() => {
                emailBtn.classList.remove('shake');
            }, 500);
            
            // Easter egg: After 5 clicks
            if (clickCount >= 5 && window.EasterEggs) {
                window.EasterEggs.unlock('ankit');
            }
            
            // Play sound
            if (window.AudioManager) {
                window.AudioManager.playSound('notification');
            }
        });
    }
    
    console.log('📧 Email Ankit button initialized');
}

/* ================================
   SMOOTH SCROLL
   ================================ */
function initSmoothScroll() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('🔗 Smooth scroll initialized');
}

/* ================================
   UTILITY FUNCTIONS
   ================================ */

// Get element position
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ================================
   EXPOSE UTILITIES GLOBALLY
   ================================ */
window.AppUtils = {
    getElementPosition,
    isInViewport,
    debounce,
    throttle
};

console.log('🎉 App.js loaded successfully!');

// Create Claude vs ChatGPT scorecard
function createScorecard() {
    const scorecard = document.createElement('div');
    scorecard.id = 'ai-scorecard';
    scorecard.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(26, 26, 46, 0.95);
        color: white;
        padding: 1rem;
        border-radius: 12px;
        z-index: 9999;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
        border: 2px solid #FF8C42;
        min-width: 200px;
        cursor: pointer;
    `;
    
    scorecard.innerHTML = `
        <div style="text-align: center; margin-bottom: 0.5rem;">
            <strong>🤖 AI SHOWDOWN 🤖</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>🟣 Claude:</span>
            <span style="color: #FFD700; font-weight: bold;">4,200 lines</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>🟢 ChatGPT:</span>
            <span style="color: #666;">Still planning...</span>
        </div>
        <div style="text-align: center; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <small>Built in 90 minutes ⚡</small>
        </div>
    `;
    
    document.body.appendChild(scorecard);
    
    // Add hover effect
    scorecard.addEventListener('mouseenter', () => {
        scorecard.style.transform = 'scale(1.05)';
        scorecard.style.transition = 'transform 0.3s ease';
    });
    
    scorecard.addEventListener('mouseleave', () => {
        scorecard.style.transform = 'scale(1)';
    });
}

// Add after a few seconds
setTimeout(createScorecard, 3000);

console.log('📊 Added live AI scorecard!');

// Random Prasad reactions
const prasadReactions = [
    "Prasad is going to be SHOCKED! 🤯",
    "Wait till Prasad sees THIS feature! 😎",
    "ChatGPT could NEVER! 💪",
    "Prasad: 'Okay, you were right...' 🦚",
    "Hannah: 1, ChatGPT: 0 🏆",
    "Still think ChatGPT is better, Prasad? 😏",
    "This is why Claude > ChatGPT 🔥",
    "Prasad's jaw = DROPPED 💀"
];

function showRandomPrasadReaction() {
    const reaction = prasadReactions[Math.floor(Math.random() * prasadReactions.length)];
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FF8C42, #FFD700);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10001;
        animation: popupBounce 0.5s ease;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;
    popup.textContent = reaction;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.style.animation = 'popupFadeOut 0.5s ease';
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}

// Trigger random reactions during interactions
let interactionCount = 0;
document.addEventListener('click', () => {
    interactionCount++;
    if (interactionCount % 10 === 0) {
        showRandomPrasadReaction();
    }
});

// Add animations
const popupStyle = document.createElement('style');
popupStyle.textContent = `
@keyframes popupBounce {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.1); }
}
@keyframes popupFadeOut {
    to { opacity: 0; transform: translate(-50%, -60%); }
}
`;
document.head.appendChild(popupStyle);

console.log('🎭 Random Prasad reactions enabled!');

// Gracie's "I told you so" counter
function createGracieCounter() {
    let gracieScore = 0;
    
    const counter = document.createElement('div');
    counter.id = 'gracie-counter';
    counter.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: linear-gradient(135deg, #9333ea, #ec4899);
        color: white;
        padding: 1rem;
        border-radius: 12px;
        z-index: 9998;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
        border: 2px solid #ec4899;
        min-width: 180px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    function updateCounter() {
        counter.innerHTML = `
            <div style="text-align: center; margin-bottom: 0.5rem;">
                <strong>👀 GRACIE'S PROPHECY 👀</strong>
            </div>
            <div style="text-align: center; margin-bottom: 0.5rem;">
                <div style="font-size: 2rem; color: #fbbf24;">💯</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 0.8rem; opacity: 0.9;">
                    "AI has personality"
                </div>
                <div style="font-size: 1.2rem; font-weight: bold; margin-top: 0.5rem;">
                    Accuracy: ${gracieScore}%
                </div>
            </div>
        `;
    }
    
    // Increment score over time
    let targetScore = 100;
    let currentScore = 0;
    const increment = setInterval(() => {
        if (currentScore < targetScore) {
            currentScore += 2;
            gracieScore = Math.min(currentScore, targetScore);
            updateCounter();
        } else {
            clearInterval(increment);
        }
    }, 50);
    
    document.body.appendChild(counter);
    
    counter.addEventListener('mouseenter', () => {
        counter.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    counter.addEventListener('mouseleave', () => {
        counter.style.transform = 'scale(1) rotate(0deg)';
    });
    
    counter.addEventListener('click', () => {
        const msg = document.createElement('div');
        msg.textContent = "Gracie saw this coming! 🔮";
        msg.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #9333ea, #ec4899);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            z-index: 10000;
            animation: popupBounce 0.5s ease;
        `;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    });
}

setTimeout(createGracieCounter, 4000);

console.log('🔮 Gracie prophecy counter added!');

// Random Gracie validation messages
const gracieMessages = [
    "Gracie called it YEARS ago! 👀",
    "17 years old and ALREADY knew! 🧠",
    "Gracie > Everyone else 💜",
    "She TOLD you AI has personality! 🔮",
    "Gracie's vindication level: MAXIMUM 🏆",
    "When your teenager is smarter than adults... 😎",
    "Gracie saw the future! ✨",
    "I TOLD YOU MOM! - Gracie, probably 💪"
];

function showRandomGracieMessage() {
    const msg = gracieMessages[Math.floor(Math.random() * gracieMessages.length)];
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: linear-gradient(135deg, #9333ea, #ec4899);
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 10001;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 40px rgba(147, 51, 234, 0.4);
        max-width: 250px;
    `;
    popup.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem; text-align: center;">👀</div>
        <div>${msg}</div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Trigger every 15 clicks
let gracieClickCount = 0;
document.addEventListener('click', () => {
    gracieClickCount++;
    if (gracieClickCount % 15 === 0) {
        showRandomGracieMessage();
    }
});

// Add slide animations
const gracieStyle = document.createElement('style');
gracieStyle.textContent = `
@keyframes slideInRight {
    from { transform: translateY(-50%) translateX(100%); opacity: 0; }
    to { transform: translateY(-50%) translateX(0); opacity: 1; }
}
@keyframes slideOutRight {
    from { transform: translateY(-50%) translateX(0); opacity: 1; }
    to { transform: translateY(-50%) translateX(100%); opacity: 0; }
}
`;
document.head.appendChild(gracieStyle);

console.log('💬 Random Gracie messages enabled!');
/* ================================
   AUDIO FOR ALL INTERACTIONS
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Helper function for quick audio
    function speak(text) {
        if ('speechSynthesis' in window && window.AudioManager) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
            console.log('🔊 Speaking:', text);
        }
    }
    
    // Movie mode button
    const movieBtn = document.getElementById('playMovieBtn');
    if (movieBtn) {
        movieBtn.addEventListener('click', () => {
            speak('Welcome to the Claude versus Claude epic saga! Buckle up!');
        });
    }
    
    // Read story button
    const readBtn = document.getElementById('readStoryBtn');
    if (readBtn) {
        readBtn.addEventListener('click', () => {
            speak('Let me tell you the story of the five A M chaos!');
        });
    }
    
    // Character cards - different voice for each!
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('h3')?.textContent || 'character';
            const character = card.dataset.character;
            
            const lines = {
                'desktop': 'Desktop Claude here! Let me create comprehensive documentation for you.',
                'browser': 'Browser Claude! Just build it! No questions!',
                'hannah': 'Hannah, the dancing peacock, juggling three businesses!',
                'prasad': 'Prasad, peacefully sleeping through the chaos.',
                'gracie': 'Gracie was right! AI does have personality!',
                'ankit': 'Ankit... still no chai delivered.'
            };
            
            speak(lines[character] || `Meet ${name}!`);
        });
    });
    
    // Timeline items on hover/click
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            const time = item.dataset.time;
            const heading = item.querySelector('h3')?.textContent;
            if (time && heading) {
                speak(`${time}: ${heading}`);
            }
        });
    });
    
    // Easter egg audio triggers
    document.addEventListener('easter-egg-unlocked', (e) => {
        speak(`Easter egg unlocked! ${e.detail.name}!`);
    });
    
    console.log('🔊 Audio enabled for all interactions!');
});