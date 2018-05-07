chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ token: "" }, () => {
    console.log("Token initialised.");
  });
});
