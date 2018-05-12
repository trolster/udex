let assignedCount = 0;
let feedbacksCount = 0;
let token = null;
let running = true;
let loop;

// Add a badge to the browser icon.
const addBadge = () => {
  const text = `${assignedCount}:${feedbacksCount > 9 ? "9+" : feedbacksCount}`;
  const color =
    assignedCount === "-"
      ? "#656565" // No token: grey.
      : assignedCount > 0
        ? "#f44141" // 1+ submissions assigned: red.
        : feedbacksCount > 0
          ? "#4286f4" // 1+ feedbacks unread, no submissions assigned: blue.
          : "#656565"; // No submissions assigned and no feedbacks: grey.
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color });
};

// REQUEST LOOP
const apiCall = async path => {
  const res = await fetch(`https://review-api.udacity.com/api/v1/${path}`, {
    headers: { Authorization: token }
  });
  return res.json();
};

const getReviewsInfo = async () => {
  const assigned = await apiCall("me/submissions/assigned/"); // assigned
  const feedbacks = await apiCall("me/student_feedbacks/"); // feedbacks
  assignedCount = assigned.length.toString();
  feedbacksCount = feedbacks.filter(fb => fb.read_at === null).length;
  addBadge();
};

// Set the request loop.
const requestLoop = () => {
  clearInterval(loop);
  if (!token || !running) {
    assignedCount = "-";
    feedbacksCount = "-";
    addBadge();
    return;
  }
  getReviewsInfo();
  loop = setInterval(getReviewsInfo, 60000); // 60 second interval
};

// STORAGE
// Save the token.
const setToken = newToken => {
  chrome.storage.sync.set({ token: newToken }, () => {
    token = newToken;
    requestLoop();
  });
};

// Save the running state.
const setRunningState = () => {
  chrome.storage.sync.get("running", data => {
    running = data.running !== undefined ? !data.running : running;
    chrome.storage.sync.set({ running }, () => {
      chrome.runtime.sendMessage({ running });
      requestLoop();
    });
  });
};

// MESSAGES
// Messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.newToken) {
    setToken(msg.newToken);
  } else if (msg.runningState) {
    setRunningState();
  } else {
    sendResponse({ success: false, text: "No recognized value was given." });
    return;
  }
  sendResponse({ success: true });
});

// INITIALIZATION
// Get the token and running state when the extension starts up.
chrome.storage.sync.get(["token", "running"], function(data) {
  token = data.token !== undefined ? data.token : null;
  running = data.running !== undefined ? data.running : true;
  requestLoop();
});

// Set the running state when the extension is first installed.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ running: true });
});
