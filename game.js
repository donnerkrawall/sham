window.onload = function () {
  initCustomWords();
  renderPlayers();
  renderCustomWords();
  updateRoundView();
  initFinalPage();
  initGameState();
  applyLanguage();
};

const translations = {
  en: {
    welcomeTitle: "Welcome to Sham <br> The New Imposter Game",
    playGameTitle: "Play the Game Now!",
    playButton: "Play Game",
    featuresTitle: "Features",
    featuresText: "Create your own themes to match your group's preferences.<br><br>Seating-Based Name Entry: Input player names in a circular order to make turn-taking intuitive and an organized gameplay.<br><br>Fast Game Setup: Minimal steps from start to play, reducing friction and improving user experience.<br><br>Better Gameplay: Suitable for small and large groups with adaptable rules.<br><br>Clean Interface: Focused design for distraction-free gameplay.",
    aboutTitle: "About us",
    aboutText: "Sham is a free to play game for you and your friends.",
    namePlaceholder: "Insert Player Names",
    submitName: "Submit Name",
    currentPlayers: "Current Players:",
    startRoundButton: "Get a new Word <br> and Start a Round",
    currentPlayer: "Current Player: ",
    flipInstruction: "Flip the card",
    nextPerson: "Next Person",
    allPlayersSeen: "All players have seen their card.",
    startGame: "Start Game",
    waitingStart: "Waiting for game start...",
    finalMessage: "Start Playing, at the end click to reveal the Impostor.",
    revealImpostor: "Reveal Impostor",
    impostorFound: "The Impostor was:",
    noImpostor: "No impostor found.",
    backToStart: "Back to Start",
    customWordsTitle: "Custom Words:",
    submitWord: "Add Word",
    clearWords: "Clear Words",
    wordInputPlaceholder: "Insert custom word",
    onlyCustomWords: "Use only my custom words",
    noWordsAvailable: "No words available. Add a word first."
  },
  de: {
    welcomeTitle: "Willkommen bei Sham <br> Das neue Impostor-Spiel",
    playGameTitle: "Spiel jetzt!",
    playButton: "Spiel starten",
    featuresTitle: "Funktionen",
    featuresText: "Erstelle eigene Themen, um das Spiel an die Vorlieben deiner Gruppe anzupassen.<br><br>Sitzungsbasierte Namenseingabe: Gib Spielernamen in Reihenfolge ein, um die Spielreihenfolge intuitiv und organisiert zu gestalten.<br><br>Schneller Spielstart: Wenige Schritte bis zum Spielbeginn für eine bessere Benutzererfahrung.<br><br>Besseres Gameplay: Geeignet für kleine und große Gruppen mit anpassbaren Regeln.<br><br>Sauberes Interface: Fokussiertes Design für ablenkungsfreies Spielen.",
    aboutTitle: "Über uns",
    aboutText: "Sham ist ein kostenloses Spiel für dich und deine Freunde.",
    namePlaceholder: "Spielernamen eingeben",
    submitName: "Namen eintragen",
    currentPlayers: "Aktuelle Spieler:",
    startRoundButton: "Neues Wort holen <br> und Runde starten",
    currentPlayer: "Aktueller Spieler: ",
    flipInstruction: "Karte umdrehen",
    nextPerson: "Nächste Person",
    allPlayersSeen: "Alle Spieler haben ihre Karte gesehen.",
    startGame: "Spiel starten",
    waitingStart: "Warten auf Spielstart...",
    finalMessage: "Spielt los. Am Ende klickt auf Enthülle den Impostor.",
    revealImpostor: "Impostor enthüllen",
    impostorFound: "Der Impostor war:",
    noImpostor: "Kein Impostor gefunden.",
    backToStart: "Zurück zum Start",
    customWordsTitle: "Eigene Wörter:",
    submitWord: "Wort hinzufügen",
    clearWords: "Wörter löschen",
    wordInputPlaceholder: "Eigenes Wort eingeben",
    onlyCustomWords: "Nur meine eigenen Wörter verwenden",
    noWordsAvailable: "Keine Wörter verfügbar. Füge zuerst ein Wort hinzu."
  }
};

function getLanguage() {
  return localStorage.getItem("language") || "en";
}

function setLanguage(language) {
  if (!translations[language]) {
    language = "en";
  }
  localStorage.setItem("language", language);
  applyLanguage();
}

function getTranslation(key) {
  const language = getLanguage();
  const text = translations[language] && translations[language][key];
  return text !== undefined ? text : key;
}

function applyLanguage() {
  const language = getLanguage();
  const select = document.getElementById("languageSelect");
  if (select) {
    select.value = language;
  }

  const welcomeTitle = document.getElementById("welcomeTitle");
  if (welcomeTitle) {
    welcomeTitle.innerHTML = getTranslation("welcomeTitle");
  }

  const playGameTitle = document.getElementById("playGameTitle");
  if (playGameTitle) {
    playGameTitle.innerHTML = getTranslation("playGameTitle");
  }

  const playButton = document.getElementById("playButton");
  if (playButton) {
    playButton.textContent = getTranslation("playButton");
  }

  const featuresTitle = document.getElementById("featuresTitle");
  if (featuresTitle) {
    featuresTitle.textContent = getTranslation("featuresTitle");
  }

  const featuresp = document.getElementById("featuresp");
  if (featuresp) {
    featuresp.innerHTML = getTranslation("featuresText");
  }

  const aboutTitle = document.getElementById("aboutTitle");
  if (aboutTitle) {
    aboutTitle.textContent = getTranslation("aboutTitle");
  }

  const aboutText = document.getElementById("aboutText");
  if (aboutText) {
    aboutText.textContent = getTranslation("aboutText");
  }

  const nameInput = document.getElementById("name");
  if (nameInput) {
    nameInput.placeholder = getTranslation("namePlaceholder");
  }

  const submitNameButton = document.getElementById("submitNameButton");
  if (submitNameButton) {
    submitNameButton.textContent = getTranslation("submitName");
  }

  const namesOutput = document.getElementById("namesOutput");
  if (namesOutput) {
    namesOutput.textContent = getTranslation("currentPlayers");
  }

  const startRoundButton = document.getElementById("startRoundButton");
  if (startRoundButton) {
    startRoundButton.innerHTML = getTranslation("startRoundButton");
  }

  const customWordsTitle = document.getElementById("customWordsTitle");
  if (customWordsTitle) customWordsTitle.textContent = getTranslation("customWordsTitle");

  const addWordButton = document.getElementById("addWordButton");
  if (addWordButton) addWordButton.textContent = getTranslation("submitWord");

  const clearWordsButton = document.getElementById("clearWordsButton");
  if (clearWordsButton) clearWordsButton.textContent = getTranslation("clearWords");

  const wordInput = document.getElementById("wordInput");
  if (wordInput) wordInput.placeholder = getTranslation("wordInputPlaceholder");

  const onlyCustomWordsText = document.getElementById("onlyCustomWordsText");
  if (onlyCustomWordsText) onlyCustomWordsText.textContent = getTranslation("onlyCustomWords");

  const flipInstruction = document.getElementById("flipInstruction");
  if (flipInstruction) {
    flipInstruction.textContent = getTranslation("flipInstruction");
  }

  const nextButton = document.getElementById("nextButton");
  if (nextButton) {
    nextButton.textContent = getTranslation("nextPerson");
  }

  const finalMessage = document.getElementById("finalMessage");
  if (finalMessage) {
    finalMessage.textContent = getTranslation("finalMessage");
  }

  const revealButton = document.getElementById("revealButton");
  if (revealButton) {
    revealButton.textContent = getTranslation("revealImpostor");
  }

  showCurrentPlayer();
}

const wordLists = {
  en: [
    "city", "village", "beach", "park", "school",
    "hospital", "shop", "restaurant", "airport", "station",
    "hotel", "forest", "mountain", "river", "lake",
    "desert", "island", "farm", "market", "road",
    "bridge", "house", "room", "garden", "doctor",
    "teacher", "police", "cook", "driver", "farmer",
    "worker", "artist", "singer", "actor", "builder",
    "cleaner", "pilot", "nurse", "guard", "seller",
    "writer", "painter", "engineer", "chef", "run", "car",
    "phone", "book", "table", "chair", "bed", "door",
    "window", "bag", "key", "food", "water", "money",
    "clock", "pen", "paper", "box", "light", "computer",
    "shoe", "sun", "moon", "star", "sky", "rain",
    "snow", "wind", "fire", "tree", "flower", "stone",
    "sand", "cloud", "sea", "grass"
  ],
  de: [
    "Stadt", "Dorf", "Strand", "Park", "Schule",
    "Krankenhaus", "Laden", "Restaurant", "Flughafen", "Bahnhof",
    "Hotel", "Wald", "Berg", "Fluss", "See",
    "Wüste", "Insel", "Bauernhof", "Markt", "Straße",
    "Brücke", "Haus", "Zimmer", "Garten", "Arzt",
    "Lehrer", "Polizist", "Koch", "Fahrer", "Bauer",
    "Arbeiter", "Künstler", "Sänger", "Schauspieler", "Bauarbeiter",
    "Reinigungskraft", "Pilot", "Krankenschwester", "Wächter", "Verkäufer",
    "Autor", "Maler", "Ingenieur", "Koch", 
    "Auto", "Handy", "Buch", "Tisch", "Stuhl", "Bett",
    "Tür", "Fenster", "Tasche", "Schlüssel", "Essen", "Wasser",
    "Geld", "Uhr", "Stift", "Papier", "Kiste", "Licht",
    "Computer", "Schuh", "Sonne", "Mond", "Stern", "Himmel",
    "Regen", "Schnee", "Wind", "Feuer", "Baum", "Blume",
    "Stein", "Sand", "Wolke", "Meer", "Gras"
  ]
};

function setOnlyCustomWords(checked) {
  localStorage.setItem("onlyCustomWords", checked ? "true" : "false");
}

function initCustomWords() {
  const cb = document.getElementById("onlyCustomWords");
  if (cb) cb.checked = localStorage.getItem("onlyCustomWords") === "true";
}

function getCustomWords() {
  return JSON.parse(localStorage.getItem("customWords")) || [];
}

function getEffectiveWordList() {
  const language = getLanguage();
  const defaults = wordLists[language] || wordLists.en;
  const customWords = getCustomWords();
  const onlyCustom = localStorage.getItem("onlyCustomWords") === "true";
  return onlyCustom ? customWords.slice() : defaults.concat(customWords);
}

function getWord() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  if (players.length === 0) return false;

  const words = getEffectiveWordList();
  if (words.length === 0) {
    alert(getTranslation("noWordsAvailable"));
    return false;
  }

  let word = words[Math.floor(Math.random() * words.length)];
  let impostorIndex = Math.floor(Math.random() * players.length);

  localStorage.setItem("currentWord", word);
  localStorage.setItem("impostorIndex", impostorIndex.toString());
  localStorage.setItem("currentIndex", "0");
  return true;
}

function startRound() {
  if (getWord()) {
    location.href = "gameplay.html";
  }
}

function submitWord() {
  const input = document.getElementById("wordInput");
  const value = input ? input.value.trim() : "";
  if (!value) return;
  addCustomWord(value);
  if (input) input.value = "";
}

function addCustomWord(word) {
  let customWords = getCustomWords();
  if (customWords.some((w) => w.toLowerCase() === word.toLowerCase())) return;
  customWords.push(word);
  localStorage.setItem("customWords", JSON.stringify(customWords));
  renderCustomWords();
}

function removeCustomWord(index) {
  let customWords = getCustomWords();
  customWords.splice(index, 1);
  localStorage.setItem("customWords", JSON.stringify(customWords));
  renderCustomWords();
}

function clearCustomWords() {
  localStorage.setItem("customWords", JSON.stringify([]));
  renderCustomWords();
}

function renderCustomWords() {
  const title = document.getElementById("customWordsTitle");
  const list = document.getElementById("customWordsList");
  if (!list) return;

  const customWords = getCustomWords();
  if (title) title.style.display = customWords.length ? "block" : "none";

  list.innerHTML = "";
  customWords.forEach((word, index) => {
    const div = document.createElement("div");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.onclick = () => removeCustomWord(index);
    const span = document.createElement("span");
    span.textContent = " " + word;
    div.appendChild(removeBtn);
    div.appendChild(span);
    list.appendChild(div);
  });
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
  let list = document.getElementById("playersList");

  if (!list) return;

  list.innerHTML = "";

  players.forEach((player, index) => {
    let div = document.createElement("div");
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.onclick = () => removePlayer(index);
    let span = document.createElement("span");
    span.textContent = " " + player;
    div.appendChild(removeBtn);
    div.appendChild(span);
    list.appendChild(div);
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

  output.innerHTML = getTranslation("currentPlayer") + players[index];
}

function initGameState() {
  resetCard();
  hideNextButton();
}

function resetCard() {
  let card = document.getElementById("flipCard");
  if (card) card.classList.remove("flipped");
}

function showNextButton() {
  let button = document.getElementById("nextButton");
  if (button) button.style.display = "inline-block";
}

function hideNextButton() {
  let button = document.getElementById("nextButton");
  if (button) button.style.display = "none";
}

function toggleCard() {
  let card = document.getElementById("flipCard");
  if (!card) return;

  if (card.classList.contains("flipped")) {
    card.classList.remove("flipped");
    showNextButton();
  } else {
    card.classList.add("flipped");
    hideNextButton();
  }
}

function nextPlayer() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let index = parseInt(localStorage.getItem("currentIndex")) || 0;

  index++;

  if (index >= players.length) {
    let end = document.getElementById("end");
    if (end) {
      end.innerHTML = `${getTranslation("allPlayersSeen")}<br><button onclick="startGameFinal()">${getTranslation("startGame")}</button>`;
    }

    let currentPlayer = document.getElementById("currentPlayer");
    if (currentPlayer) currentPlayer.innerHTML = "";

    let output = document.getElementById("theword");
    if (output) output.innerHTML = getTranslation("waitingStart");
    hideNextButton();
    resetCard();
    return;
  }

  localStorage.setItem("currentIndex", index.toString());
  resetCard();
  hideNextButton();
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

  message.innerHTML = getTranslation("finalMessage");
}

function revealImpostor() {
  let players = JSON.parse(localStorage.getItem("players")) || [];
  let impostorIndex = parseInt(localStorage.getItem("impostorIndex"));
  let result = document.getElementById("impostorResult");
  let actions = document.getElementById("finalActions");

  if (!result || !actions) return;

  if (players.length === 0 || Number.isNaN(impostorIndex) || !players[impostorIndex]) {
    result.innerHTML = getTranslation("noImpostor");
  } else {
    result.innerHTML = `${getTranslation("impostorFound")} <strong>${players[impostorIndex]}</strong>`;
  }

  actions.innerHTML = `<button onclick="goToStart()">${getTranslation("backToStart")}</button>`;
}

function goToStart() {
  localStorage.removeItem("currentWord");
  localStorage.removeItem("impostorIndex");
  localStorage.removeItem("currentIndex");
  location.href = "game.html";
}
