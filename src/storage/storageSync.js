// Set the initial state of the extension when it is installed.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ token: "", running: true, valid: false });
});

// Get data from storage.sync
export const get = key => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, data => {
      resolve(data);
    });
  });
};

export const set = (key, value) => {
  chrome.storage.sync.set({ [key]: value }, () => {
    chrome.runtime.sendMessage({ changed: key });
    return value;
  });
};

export const toggleRunning = async () => {
  const data = await get("running");
  set("running", !data.running);
};
