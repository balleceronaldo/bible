// Get HTML elements
const verseEl = document.getElementById("verse");
const refEl = document.getElementById("reference");
const inputEl = document.getElementById("input");
const resultEl = document.getElementById("result");

// Store the current verse text
let currentVerse = "";

// List of verses to memorize
const verseList = [
  "psalm+23:1",
  "john+3:16",
  "philippians+4:13",
  "romans+8:28",
  "proverbs+3:5-6"
];

// Load a random Bible verse (KJV)
function loadVerse() {
  const random = verseList[Math.floor(Math.random() * verseList.length)];

  fetch(`https://bible-api.com/${random}?translation=kjv`)
    .then(response => response.json())
    .then(data => {
      currentVerse = data.text.trim();
      verseEl.innerText = currentVerse;
      refEl.innerText = data.reference + " (KJV)";
      inputEl.value = "";
      resultEl.innerText = "";
    })
    .catch(() => {
      verseEl.innerText = "Error loading verse. Please try again.";
      refEl.innerText = "";
    });
}

// Hide all words (memorization mode)
function hideWords() {
  if (!currentVerse) return;

  const hidden = currentVerse.replace(/\b\w+\b/g, "_");
  verseEl.innerText = hidden;
}

// Show the full verse again
function showVerse() {
  verseEl.innerText = currentVerse;
}

// Check typed verse against the actual verse
function checkAnswer() {
  const typed = inputEl.value.trim().toLowerCase();
  const actual = currentVerse.toLowerCase();

  if (!typed) {
    resultEl.innerText = "⌨️ Type the verse first.";
    resultEl.style.color = "orange";
    return;
  }

  if (typed === actual) {
    resultEl.innerText = "✅ Correct! Well done.";
    resultEl.style.color = "green";
  } else {
    resultEl.innerText = "❌ Keep trying. Meditate and try again.";
    resultEl.style.color = "red";
  }
}

// Load first verse when page opens
loadVerse();
