const startButton = document.getElementById("start");
const changeToken = document.getElementById("changeToken");
const tokenInputField = document.getElementById("token");

// Send console.log messages to the background page for development.
console = chrome.extension.getBackgroundPage().console;

// START BUTTON
const setStartButtonText = running => {
  startButton.value = running ? "running" : "start";
};

// Initialize the button text.
chrome.storage.sync.get("running", data => {
  setStartButtonText(data.running);
});

// Set the start-button text when the value is set.
chrome.runtime.onMessage.addListener(msg => {
  setStartButtonText(msg.running);
});

// Send a message to background.js when the button is clicked.
startButton.addEventListener("click", e => {
  chrome.runtime.sendMessage({ runningState: true }, res => {
    if (!res.success) {
      console.error(`Error: ${res.text}`);
    }
  });
});

// TOKEN
// Initialize the textarea with token text.
chrome.storage.sync.get("token", function(data) {
  tokenInputField.value = data.token;
});

// Select all the text in the textarea when it is clicked.
tokenInputField.addEventListener("focus", () => {
  tokenInputField.select();
});

// Validate the token based on a string length of 151.
const validateToken = token => {
  if (token.length === 151) {
    tokenInputField.style.backgroundColor = "DarkSeaGreen";
    return true;
  }
  tokenInputField.style.backgroundColor = "LightCoral";
  tokenInputField.value = "Invalid token.";
  return false;
};

changeToken.addEventListener("submit", e => {
  e.preventDefault();
  const newToken = tokenInputField.value;
  if (!validateToken(newToken)) return;

  // Send a message to background.js when a new token is successfully entered.
  chrome.runtime.sendMessage({ newToken }, res => {
    if (!res.success) {
      console.error(`Error: ${res.text}`);
    }
  });
});
