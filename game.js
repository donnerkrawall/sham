
 
window.onload = function () {
 

  let word = localStorage.getItem("currentWord");
  if (word && document.getElementById("theword")) {
    document.getElementById("theword").innerHTML = word;
  }



  let players = JSON.parse(localStorage.getItem("players"));

  if (players && document.getElementById("namesOutput")) {
    document.getElementById("namesOutput").innerHTML =
      "Current players: " + players.join(", ");
  }
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
  let WordNumber = Math.floor(Math.random() * Words.length);
  let Word = Words[WordNumber];


  localStorage.setItem("currentWord", Word);
}




function submitName() {
  let input = document.getElementById("name").value.trim();
  if (input === "") return;

  let players;

  try {
    players = JSON.parse(localStorage.getItem("players"));
    if (!Array.isArray(players)) players = [];
  } catch {
    players = [];
  }

  players.push(input);

  localStorage.setItem("players", JSON.stringify(players));


  let output = document.getElementById("namesOutput");

if (output && players) {
  output.innerHTML = "Current players: " + players.join(", ");
}
  }


function nextPlayer() {


}