const verseEl = document.getElementById("verse");
const refEl = document.getElementById("reference");
const inputEl = document.getElementById("input");
const resultEl = document.getElementById("result");

let currentVerse = "";

const verseList = [
  "psalm+23:1",
  "john+3:16",
  "philippians+4:13",
  "romans+8:28",
  "proverbs+3:5-6"
];

function loadVerse() {
  const random = verseList[Math.floor(Math.random() * verseList.length)];

  fetch(`https://bible-api.com/${random}`)
    .then(res => res.json())
    .then(data => {
      currentVerse = data.text.trim();
      verseEl.innerText = currentVerse;
      refEl.innerText = data.reference;
      inputEl.value = "";
      resultEl.innerText = "";
    });
}

function hideWords() {
  const hidden = currentVerse.replace(/\b\w+\b/g, "_");
  verseEl.innerText = hidden;
}

function showVerse() {
  verseEl.innerText = currentVerse;
}

function checkAnswer() {
  const typed = inputEl.value.trim().toLowerCase();
  const actual = currentVerse.toLowerCase();

  if (typed === actual) {
    resultEl.innerText = "✅ Correct! Well done.";
    resultEl.style.color = "green";
  } else {
    resultEl.innerText = "❌ Keep trying. Read and meditate again.";
    resultEl.style.color = "red";
  }
}

// Load first verse on page load
loadVerse();
