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

// Variables to hold state
let focusStreak = 0;
const meditationWords = ["serenity", "patience", "desert", "peaceful", "focus"];

function trackFocus() {
  focusStreak++;
  document.getElementById("focusCount").innerText = `Focus streak: ${focusStreak}`;
}

function submitGratitude() {
  const input = document.getElementById("gratitudeInput").value.trim();
  const response = input
    ? `Beautiful. "${input}" is worth remembering.`
    : "Try adding something you're thankful for.";
  document.getElementById("gratitudeResponse").innerText = response;
  if(input) document.getElementById("gratitudeInput").value = "";
}

function checkWord() {
  const input = document.getElementById("wordInput").value.trim().toLowerCase();
  const target = document.getElementById("meditationWord").innerText.toLowerCase();
  const result = input === target ? "Well done. Let the word sink in." : "Try again. Slow and steady.";
  document.getElementById("wordResult").innerText = result;
  if(input === target) document.getElementById("wordInput").value = "";
}

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

// Function to build the full app HTML and inject it inside #container
function buildApp() {
  const container = document.getElementById("container");

  // Pick a random blessing
  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];

  container.classList.remove("landing-container");
  container.classList.add("main-app");

  container.innerHTML = `
    <header>
      <h1>Sonoran Stillness: A Desert Brain Game</h1>
      <p><em>"${randomBlessing.text}"</em><br/><strong>${randomBlessing.source}</strong></p>
      <p>Welcome. Let us begin our calming journey.</p>
    </header>

    <section id="focusGame" class="game-section">
      <h2>🧘 Focus Tracker</h2>
      <p>Close your eyes. Breathe. Open them when you're ready. Then click "I stayed focused."</p>
      <button type="button" id="focusBtn">I stayed focused</button>
      <p id="focusCount">Focus streak: 0</p>
    </section>

    <section id="gratitudeGame" class="game-section">
      <h2>🙏 Gratitude Reflection</h2>
      <p>Write one thing you're grateful for:</p>
      <input type="text" id="gratitudeInput" placeholder="e.g. Clean water" />
      <button type="button" id="gratitudeBtn">Submit</button>
      <p id="gratitudeResponse"></p>
    </section>

    <section id="wordGame" class="game-section">
      <h2>🌵 Desert Word Meditation</h2>
      <p>Type the calming word exactly as shown:</p>
      <p id="meditationWord">${meditationWords[Math.floor(Math.random() * meditationWords.length)]}</p>
      <input type="text" id="wordInput" placeholder="Type here..." />
      <button type="button" id="wordBtn">Check</button>
      <p id="wordResult"></p>
    </section>

    <section id="breathGame" class="game-section">
      <h2>🌬️ Guided Breathing</h2>
      <button type="button" id="breathBtn">Start 3 Breaths</button>
      <p id="breathText"></p>
    </section>
  `;

  // Add event listeners after injecting the HTML
  document.getElementById("focusBtn").addEventListener("click", trackFocus);
  document.getElementById("gratitudeBtn").addEventListener("click", submitGratitude);
  document.getElementById("wordBtn").addEventListener("click", checkWord);
  document.getElementById("breathBtn").addEventListener("click", startBreathing);
}

// Set up start button
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", buildApp);
});
