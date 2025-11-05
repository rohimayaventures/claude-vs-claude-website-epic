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
