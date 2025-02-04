const colors = ["Coral", "blue", "green", "yellow", "orange", "Fuchsia"];
let targetColor;
let score = 0;

const colorBox = document.getElementById("colorBox");
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

function startGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;
  gameStatus.textContent = "";

  let shuffledColors = [...colors].sort(() => 0.5 - Math.random());
  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = shuffledColors[index];
    button.onclick = () => checkGuess(shuffledColors[index]);
  });
}

function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
    gameStatus.textContent = "Correct!";
    gameStatus.style.color = "green";
    score++;
    scoreDisplay.textContent = score;
  } else {
    gameStatus.textContent = "Wrong, try again!";
    gameStatus.style.color = "red";
  }
}

newGameButton.onclick = startGame;

startGame();
