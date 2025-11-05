/* ================================
   MOVIE MODE CONTROLLER
   Auto-scrolling cinematic experience
   ================================ */

class MovieController {
    constructor() {
        this.isPlaying = false;
        this.currentScene = 0;
        this.speed = 1;
        this.scenes = [];
        this.scrollInterval = null;
        this.controls = null;
        
        this.init();
    }
    
    init() {
        // Get all scenes
        this.scenes = Array.from(document.querySelectorAll('[data-scene]'));
        
        if (this.scenes.length === 0) {
            console.warn('⚠️ No scenes found with [data-scene] attribute');
            return;
        }
        
        // Get or create controls
        this.controls = document.getElementById('movieControls');
        
        if (!this.controls) {
            console.warn('⚠️ Movie controls not found');
            return;
        }
        
        this.setupControls();
        console.log(`🎬 Movie Controller initialized with ${this.scenes.length} scenes`);
    }
    
    setupControls() {
        // Toggle button
        const toggleBtn = this.controls.querySelector('#movieToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
        
        // Speed buttons
        const speedBtns = this.controls.querySelectorAll('.speed-btn');
        speedBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const speed = parseFloat(btn.dataset.speed);
                this.setSpeed(speed);
                
                // Update active state
                speedBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Close button
        const closeBtn = this.controls.querySelector('.movie-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.stop());
        }
        
        // Volume slider
        const volumeSlider = this.controls.querySelector('.volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                if (window.AudioManager) {
                    window.AudioManager.setVolume(volume);
                }
            });
        }
        
        // Progress bar click
        const progressBar = this.controls.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                const sceneIndex = Math.floor(percent * this.scenes.length);
                this.goToScene(sceneIndex);
            });
        }
    }
    
    start() {
        if (this.scenes.length === 0) return;
        
        this.isPlaying = true;
        this.currentScene = 0;
        
        // Show controls
        this.controls.classList.add('visible');
        document.body.classList.add('movie-mode-active');
        
        // Update toggle button
        const toggleBtn = this.controls.querySelector('#movieToggle');
        if (toggleBtn) {
            toggleBtn.classList.add('playing');
        }
        
        // Start at first scene
        this.goToScene(0);
        
        // Start auto-scroll
        this.startAutoScroll();
        
        // Play background music
        if (window.AudioManager) {
            window.AudioManager.playMusic();
        }
        
        console.log('🎬 Movie started!');
    }
    
    stop() {
        this.isPlaying = false;
        
        // Hide controls
        this.controls.classList.remove('visible');
        document.body.classList.remove('movie-mode-active');
        
        // Update toggle button
        const toggleBtn = this.controls.querySelector('#movieToggle');
        if (toggleBtn) {
            toggleBtn.classList.remove('playing');
        }
        
        // Stop auto-scroll
        this.stopAutoScroll();
        
        // Remove scene highlights
        this.scenes.forEach(scene => scene.classList.remove('current-scene'));
        
        // Stop music
        if (window.AudioManager) {
            window.AudioManager.stopMusic();
        }
        
        console.log('🎬 Movie stopped');
    }
    
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (this.currentScene === 0) {
                this.start();
            } else {
                this.resume();
            }
        }
    }
    
    pause() {
        this.isPlaying = false;
        this.stopAutoScroll();
        
        // Update button
        const toggleBtn = this.controls.querySelector('#movieToggle');
        if (toggleBtn) {
            toggleBtn.classList.remove('playing');
        }
        
        console.log('⏸️ Movie paused');
    }
    
    resume() {
        this.isPlaying = true;
        this.startAutoScroll();
        
        // Update button
        const toggleBtn = this.controls.querySelector('#movieToggle');
        if (toggleBtn) {
            toggleBtn.classList.add('playing');
        }
        
        console.log('▶️ Movie resumed');
    }
    
    startAutoScroll() {
        this.stopAutoScroll(); // Clear any existing interval
        
        const baseDelay = 8000; // 8 seconds per scene at 1x speed
        const delay = baseDelay / this.speed;
        
        this.scrollInterval = setInterval(() => {
            this.nextScene();
        }, delay);
    }
    
    stopAutoScroll() {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
    }
    
    nextScene() {
        if (this.currentScene < this.scenes.length - 1) {
            this.goToScene(this.currentScene + 1);
        } else {
            // End of movie
            this.stop();
            this.showEndMessage();
        }
    }
    
    previousScene() {
        if (this.currentScene > 0) {
            this.goToScene(this.currentScene - 1);
        }
    }
    
    goToScene(index) {
        if (index < 0 || index >= this.scenes.length) return;
        
        this.currentScene = index;
        const scene = this.scenes[index];
        
        // Remove highlight from all scenes
        this.scenes.forEach(s => s.classList.remove('current-scene'));
        
        // Highlight current scene
        scene.classList.add('current-scene');
        
        // Scroll to scene
        scene.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update progress
        this.updateProgress();
        
        // Update scene indicator
        this.updateSceneIndicator();
        
        // Play scene narration if available
        if (window.AudioManager) {
            window.AudioManager.playSceneNarration(index);
        }
        
        console.log(`🎬 Scene ${index + 1}/${this.scenes.length}`);
    }
    
    setSpeed(speed) {
        this.speed = speed;
        
        // Restart auto-scroll with new speed
        if (this.isPlaying) {
            this.startAutoScroll();
        }
        
        console.log(`⚡ Speed set to ${speed}x`);
    }
    
    updateProgress() {
        const progressFill = this.controls.querySelector('.progress-fill');
        if (progressFill) {
            const percent = ((this.currentScene + 1) / this.scenes.length) * 100;
            progressFill.style.width = `${percent}%`;
        }
    }
    
    updateSceneIndicator() {
        const indicator = this.controls.querySelector('.scene-indicator');
        if (indicator) {
            indicator.textContent = `Scene ${this.currentScene + 1} of ${this.scenes.length}`;
        }
    }
    
    showEndMessage() {
        // Create end credits or message
        const message = document.createElement('div');
        message.className = 'movie-end-message';
        message.innerHTML = `
            <h2>🎬 THE END 🎬</h2>
            <p>Thank you for watching the epic saga!</p>
            <button onclick="window.MovieController.start()">Watch Again</button>
            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})">Back to Top</button>
        `;
        
        // Style it
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 26, 46, 0.98);
            color: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const buttons = message.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.cssText = `
                margin: 1rem 0.5rem 0;
                padding: 1rem 2rem;
                background: linear-gradient(135deg, #FF8C42, #FFD700);
                border: none;
                border-radius: 12px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
            `;
        });
        
        document.body.appendChild(message);
        
        // Remove after interaction
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                message.remove();
            });
        });
        
        // Play end sound
        if (window.AudioManager) {
            window.AudioManager.playSound('applause');
        }
    }
}

// Create and expose global instance
window.MovieController = new MovieController();

console.log('🎬 Movie Controller loaded!');
