console.log("hello");

let body = document.body;
let button = document.querySelector(".button");
let revealSection = document.getElementById("revealSection");
let form = document.getElementById("submissionForm");
let hyperfixationInput = document.getElementById("hyperfixationInput");

// Array to store user-submitted hyperfixations
let hyperfixations = [];
let currentIndex = 0;

// Function to toggle light mode and reveal a hyperfixation
function turnOnLight() {
  body.classList.toggle("light");
  button.classList.toggle("buttonOn");

  // Reveal a new hyperfixation if available
  if (currentIndex < hyperfixations.length) {
    const newMessage = document.createElement("p"); // Create a new paragraph
    newMessage.textContent = hyperfixations[currentIndex]; // Set its content
    revealSection.appendChild(newMessage); // Append it to the reveal section
    currentIndex++; // Move to the next message
  } else if (currentIndex >= hyperfixations.length && hyperfixations.length > 0) {
    const endMessage = document.createElement("p");
    endMessage.textContent = "No more hyperfixations to reveal!";
    revealSection.appendChild(endMessage);
    button.removeEventListener("click", turnOnLight); // Disable further clicks
  }
}

// Function to handle form submissions
form.onsubmit = function (event) {
  event.preventDefault(); // Prevent form from reloading the page

  const hyperfixation = hyperfixationInput.value.trim();
  if (hyperfixation) {
    hyperfixations.push(hyperfixation); // Add the input to the hyperfixations array
    hyperfixationInput.value = ""; // Clear the input field

  }
};

// Add event listener to the button
button.addEventListener("click", turnOnLight);
