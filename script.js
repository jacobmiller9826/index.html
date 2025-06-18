// Interfaith rotating blessings
const blessings = [
  { text: "May your soul bloom even in drought.", source: "[Christian Desert Fathers]" },
  { text: "Even in stillness, Allah listens.", source: "[Islamic]" },
  { text: "The coyote crosses paths with care — so should you.", source: "[Indigenous - Tohono O’odham]" },
  { text: "Breathe. You are already walking in the garden.", source: "[Jewish Mysticism]" },
  { text: "Let the heat melt away illusion, not your spirit.", source: "[Buddhist]" },
  { text: "The light of the Creator hides in the rocks and roots.", source: "[Bahá’í]" },
  { text: "In the desert, we remember the Source of all things.", source: "[Christian - Monastic]" },
  { text: "There is no separation — the wind touches all faiths.", source: "[Universalist]" },
  { text: "Peace flows deeper than water.", source: "[Quaker]" },
  { text: "The desert does not judge. It reveals.", source: "[Spiritual But Not Religious]" },
  { text: "May your steps echo with purpose on sacred land.", source: "[Hopi]" },
  { text: "Walk lightly. The ancestors walk with you.", source: "[Navajo]" }
];

document.addEventListener("DOMContentLoaded", () => {
  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
  document.getElementById("blessingText").innerText = `"${randomBlessing.text}"\n\n${randomBlessing.source}`;
});

// Make beginApp global so onclick works
window.beginApp = function() {
  console.log("Begin button clicked");
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
};

// Focus Game
let focusStreak = 0;
function trackFocus() {
  focusStreak++;
  document.getElementById("focusCount").innerText = `Focus streak: ${focusStreak}`;
}

// Gratitude Game
function submitGratitude() {
  const input = document.getElementById("gratitudeInput").value.trim();
  const response = input
    ? `Beautiful. "${input}" is worth remembering.`
    : "Try adding something you're thankful for.";
  document.getElementById("gratitudeResponse").innerText = response;
  if(input) document.getElementById("gratitudeInput").value = ""; // Clear input after submission
}

// Word Meditation
const meditationWords = ["serenity", "patience", "desert", "peaceful", "focus"];
function checkWord() {
  const input = document.getElementById("wordInput").value.trim().toLowerCase();
  const target = document.getElementById("meditationWord").innerText.toLowerCase();
  const result = input === target ? "Well done. Let the word sink in." : "Try again. Slow and steady.";
  document.getElementById("wordResult").innerText = result;
  if(input === target) document.getElementById("wordInput").value = "";
}

// Guided Breathing
function startBreathing() {
  const breathText = document.getElementById("breathText");
  const steps = ["Inhale... 🌬️", "Hold...", "Exhale... 😌"];
  let round = 0;
  breathText.innerText = "";
  let interval = setInterval(() => {
    breathText.innerText = steps[round % steps.length];
    round++;
    if (round === 9) {
      clearInterval(interval);
      breathText.innerText = "Complete. You may rest here.";
    }
  }, 2000);
}
