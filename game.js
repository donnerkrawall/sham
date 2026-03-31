window.onload = function () {
  renderPlayers();
  updateRoundView();
  initFinalPage();
};

const Words = [
  // Places (25)
  "city", "village", "beach", "park", "school",
  "hospital", "shop", "restaurant", "airport", "station",
  "hotel", "forest", "mountain", "river", "lake",
  "desert", "island", "farm", "market", "road",
  "bridge", "tunnel", "house", "room", "garden",

  // Jobs (20)
  "doctor", "teacher", "police", "cook", "driver",
  "farmer", "worker", "artist", "singer", "actor",
  "builder", "cleaner", "pilot", "nurse", "guard",
  "seller", "writer", "painter", "engineer", "chef",

  // Activities (20)
  "run", "walk", "eat", "drink", "sleep",
  "read", "write", "sing", "dance", "cook",
  "drive", "build", "clean", "play", "watch",
  "listen", "talk", "jump", "swim", "work",

  // Objects (20)
  "car", "phone", "book", "table", "chair",
  "bed", "door", "window", "bag", "key",
  "food", "water", "money", "clock", "pen",
  "paper", "box", "light", "computer", "shoe",

  // Nature / Misc (15)
  "sun", "moon", "star", "sky", "rain",
  "snow", "wind", "fire", "tree", "flower",
  "stone", "sand", "cloud", "sea", "grass"
];

function getWord() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  if (players.length === 0) return;

  let wordNumber = Math.floor(Math.random() * Words.length);
  let word = Words[wordNumber];
  let impostorIndex = Math.floor(Math.random() * players.length);

  localStorage.setItem("currentWord", word);
  localStorage.setItem("impostorIndex", impostorIndex.toString());
  localStorage.setItem("currentIndex", "0");
}

function submitName() {
  let input = document.getElementById("name")?.value.trim();
  if (!input) return;

  let players = JSON.parse(localStorage.getItem("players")) || [];
  players.push(input);

  localStorage.setItem("players", JSON.stringify(players));

  document.getElementById("name").value = "";
  renderPlayers();
}

function renderPlayers() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let output = document.getElementById("namesOutput");

  if (!output) return;

  output.innerHTML = "";

  players.forEach((player, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <input type="checkbox" onchange="removePlayer(${index})">
      <span>${player}</span>
    `;
    output.appendChild(div);
  });
}

function removePlayer(index) {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  players.splice(index, 1);
  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
}

function showCurrentPlayer() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let index = parseInt(localStorage.getItem("currentIndex")) || 0;
  let output = document.getElementById("currentPlayer");

  if (!output || players.length === 0 || index >= players.length) return;

  output.innerHTML = "Current Player: " + players[index];
}

function nextPlayer() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let index = parseInt(localStorage.getItem("currentIndex")) || 0;

  index++;

  if (index >= players.length) {
    let end = document.getElementById("end");
    if (end) {
      end.innerHTML = `All players have seen their card.<br><button onclick="startGameFinal()">Start Game</button>`;
    }

    let currentPlayer = document.getElementById("currentPlayer");
    if (currentPlayer) currentPlayer.innerHTML = "";

    let output = document.getElementById("theword");
    if (output) output.innerHTML = "Waiting for game start...";
    return;
  }

  localStorage.setItem("currentIndex", index.toString());
  updateRoundView();
}

function updateRoundView() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let index = parseInt(localStorage.getItem("currentIndex")) || 0;
  let impostorIndex = parseInt(localStorage.getItem("impostorIndex"));
  let word = localStorage.getItem("currentWord");
  let output = document.getElementById("theword");

  if (!output || players.length === 0 || !word || index >= players.length) return;

  if (index === impostorIndex) {
    output.innerHTML = "You are the IMPOSTOR";
  } else {
    output.innerHTML = word;
  }

  showCurrentPlayer();
}

function startGameFinal() {
  location.href = "gameplayFinal.html";
}

function initFinalPage() {
  let message = document.getElementById("finalMessage");
  if (!message) return;

  message.innerHTML = "Start Playing, at the end click to reveal the Impostor.";
}

function revealImpostor() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let impostorIndex = parseInt(localStorage.getItem("impostorIndex"));
  let result = document.getElementById("impostorResult");
  let actions = document.getElementById("finalActions");

  if (!result || !actions) return;

  if (players.length === 0 || Number.isNaN(impostorIndex) || !players[impostorIndex]) {
    result.innerHTML = "No impostor found.";
  } else {
    result.innerHTML = `The Impostor was: <strong>${players[impostorIndex]}</strong>`;
  }

  actions.innerHTML = `<button onclick="goToStart()">Back to Start</button>`;
}

function goToStart() {
  localStorage.removeItem("currentWord");
  localStorage.removeItem("impostorIndex");
  localStorage.removeItem("currentIndex");
  location.href = "game.html";
}
