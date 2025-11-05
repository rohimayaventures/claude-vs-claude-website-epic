/* ================================
   AUDIO MANAGER
   Music, sound effects, and voice narration
   ================================ */

class AudioManager {
    constructor() {
        this.musicVolume = 0.3;
        this.sfxVolume = 0.7;
        this.voiceVolume = 0.8;
        this.masterVolume = 0.7;
        
        this.bgMusic = null;
        this.sounds = {};
        this.voices = {};
        
        this.init();
    }
    
    init() {
        // Get background music element
        this.bgMusic = document.getElementById('bgMusic');
        
        // Set initial volume
        if (this.bgMusic) {
            this.bgMusic.volume = this.musicVolume * this.masterVolume;
        }
        
        // Preload sound effects (using Web Audio API fallback)
        this.preloadSounds();
        
        console.log('🔊 Audio Manager initialized');
    }
    
    preloadSounds() {
        // Define sound effects (using simple beep tones as fallback)
        this.soundDefinitions = {
            'click': { freq: 800, duration: 0.1 },
            'flip': { freq: 600, duration: 0.15 },
            'notification': { freq: 1000, duration: 0.2 },
            'success': { freq: 1200, duration: 0.3 },
            'applause': { freq: 500, duration: 0.5 },
            'fire': { freq: 400, duration: 0.2 },
            'peacock': { freq: 900, duration: 0.25 },
            'chai': { freq: 700, duration: 0.2 }
        };
        
        console.log('🎵 Sound effects preloaded');
    }
    
    // Play background music
    playMusic() {
        if (this.bgMusic) {
            this.bgMusic.play().catch(err => {
                console.warn('Music autoplay blocked:', err);
            });
        }
    }
    
    // Stop background music
    stopMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
    }
    
    // Pause background music
    pauseMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
        }
    }
    
    // Resume background music
    resumeMusic() {
        if (this.bgMusic) {
            this.bgMusic.play().catch(err => {
                console.warn('Music play failed:', err);
            });
        }
    }
    
    // Play sound effect
    playSound(soundName) {
        const soundDef = this.soundDefinitions[soundName];
        
        if (!soundDef) {
            console.warn(`Sound "${soundName}" not found`);
            return;
        }
        
        // Use Web Audio API to generate tone
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = soundDef.freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(this.sfxVolume * this.masterVolume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + soundDef.duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + soundDef.duration);
        } catch (err) {
            console.warn('Sound playback failed:', err);
        }
    }
    
    // Play emoji-specific sound
    playEmojiSound(emoji) {
        if (emoji.includes('🔥')) {
            this.playSound('fire');
        } else if (emoji.includes('🦚')) {
            this.playSound('peacock');
        } else if (emoji.includes('☕') || emoji.includes('🫖')) {
            this.playSound('chai');
        } else {
            this.playSound('click');
        }
    }
    
    // Play scene narration
    playSceneNarration(sceneIndex) {
        // This would play pre-generated Inworld AI voice files
        // For now, we'll log the scene
        console.log(`🎙️ Playing narration for scene ${sceneIndex + 1}`);
        
        // In production, you'd do:
        // const voiceFile = this.voices[`scene_${sceneIndex}`];
        // if (voiceFile) {
        //     voiceFile.volume = this.voiceVolume * this.masterVolume;
        //     voiceFile.play();
        // }
        
        // Show subtitles
        this.showSubtitles(sceneIndex);
    }
    
    // Show subtitles for scene
    showSubtitles(sceneIndex) {
        const subtitles = {
            0: "Welcome to the most absurd AI saga ever told...",
            1: "Meet the cast: Two Claudes, one crisis, zero chai.",
            2: "5 AM on November 4th, 2025. GitHub has other plans...",
            3: "Sometimes the best things come from chaos. And chai. Mostly chai.",
            4: "Three businesses. One peacock. Infinite determination.",
            5: "प्रिय प्रसाद, while you dreamed, your wife conquered chaos.",
            6: "And then... they realized they forgot the actual work.",
            7: "The end. Or is it? The Phoenix always rises. 🔥"
        };
        
        const subtitleText = subtitles[sceneIndex];
        if (!subtitleText) return;
        
        let subtitleEl = document.querySelector('.subtitles');
        
        if (!subtitleEl) {
            subtitleEl = document.createElement('div');
            subtitleEl.className = 'subtitles';
            document.body.appendChild(subtitleEl);
        }
        
        subtitleEl.textContent = subtitleText;
        subtitleEl.classList.add('visible');
        
        // Hide after 5 seconds
        setTimeout(() => {
            subtitleEl.classList.remove('visible');
        }, 5000);
    }
    
    // Set master volume
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        
        // Update all audio elements
        if (this.bgMusic) {
            this.bgMusic.volume = this.musicVolume * this.masterVolume;
        }
        
        console.log(`🔊 Volume set to ${Math.round(this.masterVolume * 100)}%`);
    }
    
    // Mute/unmute
    toggleMute() {
        if (this.masterVolume > 0) {
            this.previousVolume = this.masterVolume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume || 0.7);
        }
    }
    
    // Load voice narration files (for Inworld AI integration)
    loadVoiceFiles() {
        const voiceFiles = [
            'assets/audio/narration/browser_claude_intro.mp3',
            'assets/audio/narration/desktop_claude_intro.mp3',
            'assets/audio/narration/hannah_intro.mp3',
            'assets/audio/narration/narrator_opening.mp3',
            'assets/audio/narration/narrator_closing.mp3'
        ];
        
        voiceFiles.forEach(file => {
            const audio = new Audio(file);
            const name = file.split('/').pop().replace('.mp3', '');
            this.voices[name] = audio;
            
            audio.addEventListener('error', () => {
                console.warn(`Voice file not found: ${file}`);
            });
        });
        
        console.log('🎙️ Voice files loaded (or marked for loading)');
    }
    
    // Play character voice
    playCharacterVoice(character, line) {
        const voiceKey = `${character}_${line}`;
        const voice = this.voices[voiceKey];
        
        if (voice) {
            voice.volume = this.voiceVolume * this.masterVolume;
            voice.play().catch(err => {
                console.warn('Voice playback failed:', err);
            });
        } else {
            console.log(`🎙️ Voice line: ${character} - ${line}`);
        }
    }
}

// Create and expose global instance
window.AudioManager = new AudioManager();

// Try to load voice files
window.AudioManager.loadVoiceFiles();

console.log('�� Audio Manager loaded!');

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.AudioManager = new AudioManager();
        console.log('🔊 Audio Manager auto-initialized!');
    });
} else {
    window.AudioManager = new AudioManager();
    console.log('🔊 Audio Manager initialized immediately!');
}
