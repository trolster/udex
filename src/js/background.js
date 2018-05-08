chrome.runtime.onInstalled.addListener(() => {
  chrome.browserAction.setBadgeText({ text: "2" });
  // chrome.storage.sync.set({ token: "asdf" }, () => {
  //   console.log("Token initialised.");
  // });
});
