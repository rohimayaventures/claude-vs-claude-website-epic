let movieMode = false;
let currentSection = 0;
let movieInterval = null;
let musicEnabled = true;
let narrationEnabled = true;

const movieSections = [
    { id: 'main-content', duration: 3000, text: 'Welcome to the Epic Saga of Claude versus Claude!' },
    { selector: '.character-grid', duration: 8000, text: 'Meet our cast of characters in this comedy of errors.' },
    { selector: '.priority-list', duration: 6000, text: 'Hannahs impossible to-do list at 5 AM.' },
    { selector: '.chai-intermission', duration: 5000, text: 'Chai break! Because even in crisis, we need chai.' },
    { selector: '.marathi-section', duration: 6000, text: 'A love letter to Prasad, in Marathi.' },
    { selector: '.timeline', duration: 10000, text: 'The timeline of chaos, from 5 AM to now.' },
    { selector: '.business-grid', duration: 5000, text: 'Three businesses, one morning, infinite chaos.' }
];

function startMovieMode() {
    movieMode = true;
    currentSection = 0;
    
    const playBtn = document.getElementById('playMovieBtn');
    const pauseBtn = document.getElementById('pauseMovieBtn');
    const status = document.getElementById('movieStatus');
    const bgMusic = document.getElementById('bgMusic');
    
    if (playBtn) playBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'block';
    if (status) status.textContent = '🎬 Movie playing...';
    document.body.style.overflow = 'hidden';
    
    if (musicEnabled && bgMusic) {
        bgMusic.play().catch(e => console.log('Music play failed:', e));
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => playNextSection(), 2000);
}

function pauseMovieMode() {
    movieMode = false;
    
    const playBtn = document.getElementById('playMovieBtn');
    const pauseBtn = document.getElementById('pauseMovieBtn');
    const status = document.getElementById('movieStatus');
    const bgMusic = document.getElementById('bgMusic');
    
    if (playBtn) playBtn.style.display = 'block';
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (status) status.textContent = '⏸️ Paused';
    document.body.style.overflow = 'auto';
    
    if (movieInterval) clearTimeout(movieInterval);
    if (bgMusic) bgMusic.pause();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function playNextSection() {
    if (!movieMode || currentSection >= movieSections.length) {
        pauseMovieMode();
        const status = document.getElementById('movieStatus');
        if (status) status.textContent = '✅ Movie complete! 🦚🔥';
        return;
    }
    
    const section = movieSections[currentSection];
    const element = section.id ? document.getElementById(section.id) : document.querySelector(section.selector);
    
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.5s ease';
        
        if (narrationEnabled && section.text) speak(section.text);
        
        setTimeout(() => { element.style.transform = 'scale(1)'; }, 500);
        
        const status = document.getElementById('movieStatus');
        if (status) status.textContent = `Scene ${currentSection + 1}/${movieSections.length} 🎬`;
        
        currentSection++;
        movieInterval = setTimeout(() => playNextSection(), section.duration);
    } else {
        currentSection++;
        playNextSection();
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
    }
}

function updateVolume(value) {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) bgMusic.volume = value / 100;
}

function toggleMusic() {
    musicEnabled = !musicEnabled;
    const btn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicEnabled) {
        btn.textContent = 'ON';
        btn.style.background = '#FFD700';
        if (movieMode && bgMusic) bgMusic.play().catch(e => console.log('Music play failed:', e));
    } else {
        btn.textContent = 'OFF';
        btn.style.background = '#666';
        if (bgMusic) bgMusic.pause();
    }
}

function toggleNarration() {
    narrationEnabled = !narrationEnabled;
    const btn = document.getElementById('narrationToggle');
    
    if (narrationEnabled) {
        btn.textContent = 'ON';
        btn.style.background = '#FFD700';
    } else {
        btn.textContent = 'OFF';
        btn.style.background = '#666';
        if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
}