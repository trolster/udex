const changeToken = document.getElementById("changeToken");
const tokenInputField = document.getElementById("token");

const setTokenText = () => {
  chrome.storage.sync.get("token", function(data) {
    tokenInputField.value = data.token;
    tokenInputField.focus();
    tokenInputField.select();
  });
};

changeToken.addEventListener("submit", e => {
  e.preventDefault();
  chrome.storage.sync.set({ token: tokenInputField.value }, () => {
    setTokenText();
    chrome.extension.getBackgroundPage().console.log("token set");
  });
});

setTokenText();
