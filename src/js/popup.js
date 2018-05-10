const startButton = document.getElementById("start");
const changeToken = document.getElementById("changeToken");
const tokenInputField = document.getElementById("token");
console = chrome.extension.getBackgroundPage().console;

// Start button
startButton.addEventListener("click", e => {
  chrome.storage.sync.get("running", data => {
    const running = !data.running;
    chrome.storage.sync.set({ running }, () => {
      chrome.runtime.sendMessage({ running }, res => {
        if (res && res.success) {
          startButton.value = running ? "running" : "start";
        } else {
          console.error("an error occured");
        }
      });
    });
  });
});

// Set the text when the extension loads
chrome.storage.sync.get("running", data => {
  startButton.value = data.running ? "running" : "start";
});

// Token form
const setTokenText = () => {
  chrome.storage.sync.get("token", function(data) {
    tokenInputField.value = data.token;
  });
};
setTokenText();

const validateToken = token => {
  if (token.length === 151) {
    tokenInputField.style.backgroundColor = "DarkSeaGreen";
    return true;
  }
  tokenInputField.style.backgroundColor = "LightCoral";
  tokenInputField.value = "Invalid token.";
  return false;
};

tokenInputField.addEventListener("focus", () => {
  tokenInputField.select();
});

changeToken.addEventListener("submit", e => {
  e.preventDefault();
  const newToken = tokenInputField.value;
  if (!validateToken(newToken)) return;

  chrome.storage.sync.set({ token: newToken }, () => {
    setTokenText();
    chrome.runtime.sendMessage({ newToken }, res => {
      if (res && res.success) {
        console.log("Token successfully set.");
      } else {
        console.error("an error occured");
      }
    });
  });
});
