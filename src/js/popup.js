const changeToken = document.getElementById("changeToken");
const tokenInputField = document.getElementById("token");
const startButton = document.getElementById("start");

const setTokenText = () => {
  chrome.storage.sync.get("token", function(data) {
    tokenInputField.value = data.token;
    tokenInputField.focus();
    tokenInputField.select();
  });
};

const setStartButtonText = () => {
  chrome.storage.sync.get("started", data => {
    startButton.value = data.started === "started" ? "running..." : "start";
  });
};

startButton.addEventListener("click", e => {
  const buttonState = startButton.value === "start" ? "running" : "start";
  chrome.storage.sync.set({ started: buttonState }, data => {
    startButton.value = buttonState;
  });
});

changeToken.addEventListener("submit", e => {
  e.preventDefault();
  chrome.storage.sync.set({ token: tokenInputField.value }, () => {
    setTokenText();
    chrome.extension.getBackgroundPage().console.log("token set");
  });
});

setTokenText();
