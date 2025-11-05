/* ================================
   MOVIE MODE CONTROLLER
   The Brain of the Auto-Scrolling Experience
   ================================ */

class MovieController {
  constructor() {
    this.isPlaying = false;
    this.currentScene = 0;
    this.speed = 1; // 1x normal speed
    this.volume = 0.7;
    this.scenes = [];
    this.sceneTimer = null;
    this.audioManager = null;
    
    console.log('🎬 Movie Controller initialized');
  }
  
  // Initialize movie mode
  init() {
    this.createControls();
    this.defineScenes();
    this.attachEventListeners();
    console.log(`✅ Found ${this.scenes.length} scenes`);
  }
  
  // Define all scenes with timings
  defineScenes() {
    this.scenes = [
      {
        id: 'hero',
        name: 'Opening',
        duration: 8000, // 8 seconds
        audio: 'narrator-opening',
        zoom: false
      },
      {
        id: 'characters',
        name: 'The Characters',
        duration: 12000, // 12 seconds
        audio: null,
        zoom: true
      },
      {
        id: 'crisis',
        name: 'The Crisis Begins',
        duration: 10000,
        audio: null,
        zoom: false
      },
      {
        id: 'browser-claude',
        name: 'Browser Claude Arrives',
        duration: 8000,
        audio: 'browser-just-build-it',
        zoom: true
      },
      {
        id: 'desktop-claude',
        name: 'Desktop Claude Arrives',
        duration: 8000,
        audio: 'desktop-error-handling',
        zoom: true
      },
      {
        id: 'argument',
        name: 'The Great Argument',
        duration: 15000,
        audio: 'browser-stop-responsible',
        zoom: false
      },
      {
        id: 'realization',
        name: 'The Realization',
        duration: 10000,
        audio: 'hannah-arguing-yourself',
        zoom: true
      },
      {
        id: 'completion',
        name: 'Desktop Claude Delivers',
        duration: 10000,
        audio: 'desktop-quality-matters',
        zoom: true
      },
      {
        id: 'lessons',
        name: 'Lessons Learned',
        duration: 12000,
        audio: null,
        zoom: false
      },
      {
        id: 'ending',
        name: 'The Phoenix Rises',
        duration: 10000,
        audio: 'narrator-ending',
        zoom: false
      }
    ];
  }
  
  // Create movie controls UI
  createControls() {
    const controls = document.createElement('div');
    controls.className = 'movie-controls';
    controls.innerHTML = `
      <h3>🎬 Movie Mode</h3>
      
      <button class="control-button" id="playMovieBtn">
        ▶️ Play Movie
      </button>
      
      <button class="control-button pause-btn" id="pauseMovieBtn" style="display: none;">
        ⏸️ Pause
      </button>
      
      <div class="speed-control">
        <label>Speed:</label>
        <div class="speed-buttons">
          <button class="speed-btn" data-speed="0.5">0.5x</button>
          <button class="speed-btn active" data-speed="1">1x</button>
          <button class="speed-btn" data-speed="1.5">1.5x</button>
          <button class="speed-btn" data-speed="2">2x</button>
        </div>
      </div>
      
      <div class="volume-control">
        <label>🔊 Volume: <span id="volumeValue">70%</span></label>
        <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="70">
      </div>
    `;
    
    document.body.appendChild(controls);
    
    // Create progress bar
    const progress = document.createElement('div');
    progress.className = 'movie-progress';
    progress.innerHTML = '<div class="movie-progress-fill"></div>';
    document.body.appendChild(progress);
    
    // Create scene indicator
    const indicator = document.createElement('div');
    indicator.className = 'scene-indicator';
    indicator.id = 'sceneIndicator';
    document.body.appendChild(indicator);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'movie-mode-overlay';
    overlay.id = 'movieOverlay';
    document.body.appendChild(overlay);
  }
  
  // Attach event listeners
  attachEventListeners() {
    // Play button
    document.getElementById('playMovieBtn').addEventListener('click', () => {
      this.play();
    });
    
    // Pause button
    document.getElementById('pauseMovieBtn').addEventListener('click', () => {
      this.pause();
    });
    
    // Speed buttons
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setSpeed(parseFloat(e.target.dataset.speed));
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
    
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', (e) => {
      this.setVolume(e.target.value / 100);
      document.getElementById('volumeValue').textContent = e.target.value + '%';
    });
  }
  
  // Play movie
  play() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    document.body.classList.add('movie-mode-active');
    document.querySelector('.movie-progress').classList.add('active');
    document.getElementById('movieOverlay').classList.add('active');
    
    // Update buttons
    document.getElementById('playMovieBtn').style.display = 'none';
    document.getElementById('pauseMovieBtn').style.display = 'block';
    
    console.log('🎬 Movie started!');
    this.playScene(this.currentScene);
  }
  
  // Pause movie
  pause() {
    this.isPlaying = false;
    document.body.classList.remove('movie-mode-active');
    
    if (this.sceneTimer) {
      clearTimeout(this.sceneTimer);
    }
    
    // Update buttons
    document.getElementById('playMovieBtn').style.display = 'block';
    document.getElementById('pauseMovieBtn').style.display = 'none';
    
    console.log('⏸️ Movie paused');
  }
  
  // Stop movie
  stop() {
    this.pause();
    this.currentScene = 0;
    document.querySelector('.movie-progress').classList.remove('active');
    document.getElementById('movieOverlay').classList.remove('active');
    this.updateProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('⏹️ Movie stopped');
  }
  
  // Play specific scene
  playScene(sceneIndex) {
    if (sceneIndex >= this.scenes.length) {
      this.stop();
      this.showEndCredits();
      return;
    }
    
    const scene = this.scenes[sceneIndex];
    console.log(`🎬 Scene ${sceneIndex + 1}: ${scene.name}`);
    
    // Show scene indicator
    this.showSceneIndicator(scene.name);
    
    // Scroll to scene
    this.scrollToScene(scene.id);
    
    // Play audio if available
    if (scene.audio && window.audioManager) {
      window.audioManager.playVoice(scene.audio);
    }
    
    // Apply zoom effect if needed
    if (scene.zoom) {
      this.applyZoomEffect(scene.id);
    }
    
    // Update progress
    const progress = ((sceneIndex + 1) / this.scenes.length) * 100;
    this.updateProgress(progress);
    
    // Schedule next scene
    const adjustedDuration = scene.duration / this.speed;
    this.sceneTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.currentScene++;
        this.playScene(this.currentScene);
      }
    }, adjustedDuration);
  }
  
  // Scroll to scene smoothly
  scrollToScene(sceneId) {
    const element = document.getElementById(sceneId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
  
  // Show scene indicator
  showSceneIndicator(sceneName) {
    const indicator = document.getElementById('sceneIndicator');
    indicator.textContent = sceneName;
    indicator.classList.add('visible');
    
    setTimeout(() => {
      indicator.classList.remove('visible');
    }, 2000);
  }
  
  // Apply zoom effect
  applyZoomEffect(sceneId) {
    const element = document.getElementById(sceneId);
    if (element) {
      element.style.transition = 'transform 1s ease';
      element.style.transform = 'scale(1.05)';
      
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 1000);
    }
  }
  
  // Update progress bar
  updateProgress(percent) {
    const fill = document.querySelector('.movie-progress-fill');
    if (fill) {
      fill.style.width = percent + '%';
    }
  }
  
  // Set playback speed
  setSpeed(speed) {
    this.speed = speed;
    console.log(`⏩ Speed set to ${speed}x`);
  }
  
  // Set volume
  setVolume(volume) {
    this.volume = volume;
    if (window.audioManager) {
      window.audioManager.setVolume(volume);
    }
    console.log(`🔊 Volume set to ${Math.round(volume * 100)}%`);
  }
  
  // Show end credits
  showEndCredits() {
    console.log('🎉 Movie complete!');
    
    const credits = document.createElement('div');
    credits.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, var(--midnight-navy), var(--peacock-teal));
      color: white;
      padding: 60px;
      border-radius: 20px;
      text-align: center;
      z-index: 10002;
      animation: bounceIn 0.8s ease;
      max-width: 600px;
    `;
    
    credits.innerHTML = `
      <h2 style="font-size: 2.5rem; margin-bottom: 20px;">🎬 The End 🎬</h2>
      <p style="font-size: 1.3rem; margin-bottom: 30px;">
        The Phoenix Rose 🔥<br>
        The Peacock Danced 🦚<br>
        Claude Argued With Himself 💻<br>
        And the Launch Happened Anyway 🚀
      </p>
      <p style="font-size: 1rem; opacity: 0.8; margin-bottom: 30px;">
        Thanks for watching!<br>
        Created with ❤️ and lots of laughter
      </p>
      <button onclick="this.parentElement.remove(); window.movieController.stop();" style="
        padding: 15px 40px;
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
      ">✨ Watch Again</button>
    `;
    
    document.body.appendChild(credits);
  }
}

// Initialize movie controller when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.movieController = new MovieController();
  window.movieController.init();
  console.log('✅ Movie Controller ready!');
});
