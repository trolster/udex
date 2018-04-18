// Listen for the browserAction
chrome.browserAction.onClicked.addListener(function(tab) {
  // Inject "main.js" into the current tab
  chrome.tabs.executeScript(tab.id, {
    file: "main.js"
  });
});
