/* ================================
   AUDIO MANAGER
   Handles all sound effects and voice playback
   ================================ */

class AudioManager {
  constructor() {
    this.volume = 0.7;
    this.sounds = {};
    this.voices = {};
    this.currentVoice = null;
    this.musicTrack = null;
    
    console.log('🔊 Audio Manager initialized');
  }
  
  // Initialize audio manager
  init() {
    this.loadSoundEffects();
    this.loadVoiceFiles();
    this.setupBackgroundMusic();
    console.log('✅ Audio system ready!');
  }
  
  // Load sound effects
  loadSoundEffects() {
    // Sound effect paths (we'll create placeholders)
    this.sounds = {
      fire: this.createAudioElement('assets/audio/sfx/fire.mp3'),
      peacock: this.createAudioElement('assets/audio/sfx/peacock.mp3'),
      tea: this.createAudioElement('assets/audio/sfx/tea.mp3'),
      alert: this.createAudioElement('assets/audio/sfx/alert.mp3'),
      achievement: this.createAudioElement('assets/audio/sfx/achievement.mp3'),
      typing: this.createAudioElement('assets/audio/sfx/typing.mp3'),
      whoosh: this.createAudioElement('assets/audio/sfx/whoosh.mp3'),
      success: this.createAudioElement('assets/audio/sfx/success.mp3')
    };
    
    console.log(`🎵 Loaded ${Object.keys(this.sounds).length} sound effects`);
  }
  
  // Load voice files
  loadVoiceFiles() {
    this.voices = {
      'narrator-opening': this.createAudioElement('assets/audio/narration/narrator-opening.mp3'),
      'narrator-ending': this.createAudioElement('assets/audio/narration/narrator-ending.mp3'),
      'browser-just-build-it': this.createAudioElement('assets/audio/narration/browser-just-build-it.mp3'),
      'browser-stop-responsible': this.createAudioElement('assets/audio/narration/browser-stop-responsible.mp3'),
      'desktop-error-handling': this.createAudioElement('assets/audio/narration/desktop-error-handling.mp3'),
      'desktop-quality-matters': this.createAudioElement('assets/audio/narration/desktop-quality-matters.mp3'),
      'hannah-arguing-yourself': this.createAudioElement('assets/audio/narration/hannah-arguing-yourself.mp3')
    };
    
    console.log(`🎙️ Loaded ${Object.keys(this.voices).length} voice lines`);
  }
  
  // Setup background music
  setupBackgroundMusic() {
    this.musicTrack = this.createAudioElement('assets/audio/music/background.mp3');
    if (this.musicTrack) {
      this.musicTrack.loop = true;
      this.musicTrack.volume = 0.3 * this.volume;
    }
  }
  
  // Create audio element with error handling
  createAudioElement(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    
    // Try to load the audio
    audio.addEventListener('error', () => {
      console.log(`⚠️ Audio file not found: ${src} (will use placeholder)`);
    });
    
    audio.src = src;
    return audio;
  }
  
  // Play sound effect
  playSound(soundName) {
    if (this.sounds[soundName]) {
      const sound = this.sounds[soundName];
      sound.volume = this.volume;
      sound.currentTime = 0;
      
      sound.play().catch(err => {
        console.log(`⚠️ Could not play sound: ${soundName}`);
      });
      
      console.log(`🔊 Playing sound: ${soundName}`);
    } else {
      console.log(`⚠️ Sound not found: ${soundName}`);
    }
  }
  
  // Play voice line
  playVoice(voiceName) {
    // Stop current voice if playing
    if (this.currentVoice) {
      this.currentVoice.pause();
      this.currentVoice.currentTime = 0;
    }
    
    if (this.voices[voiceName]) {
      this.currentVoice = this.voices[voiceName];
      this.currentVoice.volume = this.volume;
      this.currentVoice.currentTime = 0;
      
      this.currentVoice.play().catch(err => {
        console.log(`⚠️ Could not play voice: ${voiceName}`);
      });
      
      console.log(`🎙️ Playing voice: ${voiceName}`);
    } else {
      console.log(`⚠️ Voice not found: ${voiceName}`);
    }
  }
  
  // Start background music
  startMusic() {
    if (this.musicTrack) {
      this.musicTrack.volume = 0.3 * this.volume;
      this.musicTrack.play().catch(err => {
        console.log('⚠️ Could not play background music');
      });
      console.log('🎵 Background music started');
    }
  }
  
  // Stop background music
  stopMusic() {
    if (this.musicTrack) {
      this.musicTrack.pause();
      this.musicTrack.currentTime = 0;
      console.log('🎵 Background music stopped');
    }
  }
  
  // Set volume for all audio
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    // Update all audio volumes
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume;
    });
    
    Object.values(this.voices).forEach(voice => {
      voice.volume = this.volume;
    });
    
    if (this.musicTrack) {
      this.musicTrack.volume = 0.3 * this.volume;
    }
    
    console.log(`🔊 Volume set to ${Math.round(this.volume * 100)}%`);
  }
  
  // Stop all audio
  stopAll() {
    if (this.currentVoice) {
      this.currentVoice.pause();
      this.currentVoice.currentTime = 0;
    }
    
    this.stopMusic();
    console.log('🔇 All audio stopped');
  }
}

// Initialize audio manager when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.audioManager = new AudioManager();
  window.audioManager.init();
  
  // Connect to movie controller if it exists
  if (window.movieController) {
    window.movieController.audioManager = window.audioManager;
  }
  
  console.log('✅ Audio Manager ready!');
});
