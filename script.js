let currentMood = "";
let finalIntention = "";
let audioCtx;
let droneOsc, droneGain;
let chimeOscs = [];
let chimeGains = [];
let windNoiseSource, windGain;

const stories = {
  Calm: "A cactus blooms unseen in the dry heat, needing no witness to be complete.",
  Clarity: "The hawk glides above the desert — it does not chase, it simply sees.",
  Healing: "The cracked earth softens after a single unexpected rain. Healing can be slow but sure.",
  Strength: "The mesquite roots run deep. No one sees their struggle, but still they hold firm.",
  Grief: "Even the tallest saguaro loses arms to time. Yet it stands.",
  Gratitude: "The sun does not ask for thanks. It rises anyway."
};

const blessings = [
  "May your soul bloom even in drought. [Desert Christian]",
  "Peace flows deeper than water. [Quaker]",
  "Allah sees all tears not cried. [Islamic]",
  "The desert listens. So does Spirit. [Spiritual]",
  "Your ancestors walk with you. [Navajo Wisdom]",
  "Let the stillness hold you. [Zen]"
];

function selectMood(mood) {
  currentMood = mood;
  scrollToSection('screen2');
}

function continueToStory() {
  const reflection = document.getElementById("reflectionInput").value;
  document.getElementById("storyText").innerText = stories[currentMood];
  scrollToSection('screen3');
}

function startBreath() {
  scrollToSection('screen4');
  startAmbientSound();
  setTimeout(() => {
    stopAmbientSound();
    scrollToSection('screen5');
  }, 10000); // 10 seconds breath meditation
}

function chooseIntention(intention) {
  finalIntention = intention;
  const blessing = blessings[Math.floor(Math.random() * blessings.length)];
  document.getElementById("finalBlessing").innerText = blessing;
  scrollToSection('screen6');
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- Web Audio API Ambient Sound Generators ---

function startAmbientSound() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // === Drone ===
  droneOsc = audioCtx.createOscillator();
  droneGain = audioCtx.createGain();

  droneOsc.type = 'sine';
  droneOsc.frequency.setValueAtTime(174, audioCtx.currentTime); // Calm solfeggio tone
  droneGain.gain.setValueAtTime(0, audioCtx.currentTime);
  droneGain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 5); // fade in 5s

  droneOsc.connect(droneGain).connect(audioCtx.destination);
  droneOsc.start();

  // === Chimes (3 oscillators with different frequencies and timing) ===
  const chimeFreqs = [523.25, 659.25, 783.99]; // C5, E5, G5 notes
  chimeOscs = [];
  chimeGains = [];

  chimeFreqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);

    osc.connect(gain).connect(audioCtx.destination);
    osc.start();

    // Schedule chimes with staggered fade in/out
    gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 2);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + i * 2 + 1);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + i * 2 + 2);

    chimeOscs.push(osc);
    chimeGains.push(gain);
  });

  // === Wind (noise using buffer source) ===
  const bufferSize = 2 * audioCtx.sampleRate;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  windNoiseSource = audioCtx.createBufferSource();
  windNoiseSource.buffer = noiseBuffer;
  windNoiseSource.loop = true;

  windGain = audioCtx.createGain();
  windGain.gain.setValueAtTime(0, audioCtx.currentTime);
  windGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 3);

  windNoiseSource.connect(windGain).connect(audioCtx.destination);
  windNoiseSource.start();
}

function stopAmbientSound() {
  if (droneGain) {
    droneGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3); // fade out 3s
    droneOsc.stop(audioCtx.currentTime + 3);
  }
  if (chimeGains.length) {
    chimeGains.forEach((gain, i) => {
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1 + i);
      chimeOscs[i].stop(audioCtx.currentTime + 1 + i);
    });
  }
  if (windGain) {
    windGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3);
    windNoiseSource.stop(audioCtx.currentTime + 3);
  }
}
