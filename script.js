// Utility function to generate a random hex color.
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Global game state variables
let score = 0;
let targetColor = "";
const totalOptions = 6; // total color options displayed per round

// DOM elements
const scoreEl = document.getElementById("score");
const colorBoxEl = document.getElementById("colorBox");
const optionsContainer = document.getElementById("optionsContainer");
const messageEl = document.getElementById("message");
const newGameBtn = document.getElementById("newGameBtn");

// Start a new round by generating a new target color and options.
function startRound() {
  // Clear any previous messages.
  messageEl.textContent = "";
  // Clear options from previous round.
  optionsContainer.innerHTML = "";

  // Generate a new target color.
  targetColor = getRandomColor();
  // Set the background of the target color box.
  colorBoxEl.style.backgroundColor = targetColor;

  // Create an array of colors with one correct answer.
  const colors = [];
  // Determine a random index (0 to totalOptions - 1) where the correct color will be placed.
  const correctIndex = Math.floor(Math.random() * totalOptions);

  for (let i = 0; i < totalOptions; i++) {
    if (i === correctIndex) {
      colors.push(targetColor);
    } else {
      // Ensure the wrong color is different from the target.
      let wrongColor;
      do {
        wrongColor = getRandomColor();
      } while (wrongColor === targetColor);
      colors.push(wrongColor);
    }
  }

  // Create a div for each color option.
  colors.forEach((color) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("color-option");
    optionDiv.style.backgroundColor = color;
    // Store the color value as a data attribute for comparison.
    optionDiv.dataset.color = color;
    // Add a click event to handle guesses.
    optionDiv.addEventListener("click", handleGuess);
    optionsContainer.appendChild(optionDiv);
  });
}

// Handle the player's guess.
function handleGuess(e) {
  const guessedColor = e.target.dataset.color;
  if (guessedColor === targetColor) {
    // Correct guess!
    messageEl.textContent = "Congratulations! Correct!";
    score++;
    scoreEl.textContent = `Score: ${score}`;
    // Automatically start a new round after a short delay.
    setTimeout(startRound, 1000);
  } else {
    // Wrong guess: fade out the clicked option.
    e.target.classList.add("fade-out");
    messageEl.textContent = "Wrong! Try again!";
  }
}

// New Game button resets the score and starts a new round.
newGameBtn.addEventListener("click", () => {
  score = 0;
  scoreEl.textContent = `Score: ${score}`;
  startRound();
});

// Initialize the first round on page load.
startRound();
