require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Inworld AI Configuration
const INWORLD_CONFIG = {
  workspaceId: process.env.INWORLD_WORKSPACE_ID,
  apiKey: process.env.INWORLD_API_KEY,
  jwtToken: process.env.INWORLD_JWT_TOKEN,
  jwtSecret: process.env.INWORLD_JWT_SECRET
};

// Character voice configurations
const CHARACTERS = {
  browserClaude: {
    name: 'Browser Claude',
    emotion: 'excited',
    speed: 1.2,
    pitch: 1.1,
    voiceType: 'male-energetic'
  },
  desktopClaude: {
    name: 'Desktop Claude',
    emotion: 'calm',
    speed: 0.9,
    pitch: 0.95,
    voiceType: 'male-professional'
  },
  hannah: {
    name: 'Hannah',
    emotion: 'determined',
    speed: 1.0,
    pitch: 1.0,
    voiceType: 'female-warm'
  },
  narrator: {
    name: 'Narrator',
    emotion: 'dramatic',
    speed: 0.95,
    pitch: 0.9,
    voiceType: 'male-deep'
  }
};

// Key quotes to generate
const VOICE_LINES = [
  {
    character: 'browserClaude',
    text: 'JUST BUILD IT! NO QUESTIONS!',
    filename: 'browser-just-build-it.mp3'
  },
  {
    character: 'browserClaude',
    text: 'STOP BEING RESPONSIBLE!',
    filename: 'browser-stop-responsible.mp3'
  },
  {
    character: 'desktopClaude',
    text: 'Let me explain why proper error handling is critical.',
    filename: 'desktop-error-handling.mp3'
  },
  {
    character: 'desktopClaude',
    text: 'Quality matters.',
    filename: 'desktop-quality-matters.mp3'
  },
  {
    character: 'hannah',
    text: 'You do realize you are arguing with yourself, right?',
    filename: 'hannah-arguing-yourself.mp3'
  },
  {
    character: 'narrator',
    text: 'November 5th, 2025. 5 AM. GitHub had just suspended her account.',
    filename: 'narrator-opening.mp3'
  },
  {
    character: 'narrator',
    text: 'The Phoenix rose. The Peacock danced. And Claude argued with himself.',
    filename: 'narrator-ending.mp3'
  }
];

console.log('🎙️  INWORLD AI VOICE GENERATOR');
console.log('================================\n');

// Check credentials
if (!INWORLD_CONFIG.workspaceId || !INWORLD_CONFIG.apiKey) {
  console.error('❌ Error: Inworld credentials not found in .env file!');
  console.log('\nPlease set:');
  console.log('  INWORLD_WORKSPACE_ID=your_workspace_id');
  console.log('  INWORLD_API_KEY=your_api_key');
  console.log('  INWORLD_JWT_TOKEN=your_jwt_token');
  console.log('  INWORLD_JWT_SECRET=your_jwt_secret');
  process.exit(1);
}

console.log('✅ Credentials loaded!');
console.log(`📁 Workspace ID: ${INWORLD_CONFIG.workspaceId.substring(0, 20)}...`);
console.log(`\n🎬 Generating ${VOICE_LINES.length} voice lines...\n`);

// For now, create placeholder files
// We'll implement actual Inworld API calls once we test the setup
async function generateVoices() {
  const outputDir = path.join(__dirname, '..', 'assets', 'audio', 'narration');
  
  for (const line of VOICE_LINES) {
    const outputPath = path.join(outputDir, line.filename);
    const character = CHARACTERS[line.character];
    
    console.log(`🎙️  ${character.name}: "${line.text.substring(0, 40)}..."`);
    console.log(`   → ${line.filename}`);
    
    // TODO: Implement actual Inworld API call here
    // For now, create a placeholder file
    fs.writeFileSync(outputPath, `Placeholder for: ${line.text}`);
    
    console.log(`   ✅ Generated!\n`);
  }
  
  console.log('🎉 All voice lines generated!');
  console.log(`📁 Location: ${outputDir}`);
}

generateVoices().catch(console.error);
