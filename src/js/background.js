const APIACCESS =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNzU1LCJleHAiOjE1MjgyOTYwMzYsInRva2VuX3R5cGUiOiJhcGkifQ.Ymg-sboRi9DT6d833YVvfryN3Dn_9gcc0xUCy-OwauA";
const rootUrl = "https://review-api.udacity.com/api/v1/";
const assignedUrl = "me/submissions/assigned/";
const feedbacksUrl = "me/student_feedbacks/";
const headers = { Authorization: "" };
const interval = 60000; // One minute in ms
let assignedCount = 0;
let feedbacksCount = 0;
let token = null;
let running = true;

const setRunningState = state => {
  running = state;
  chrome.storage.sync.set({ running });
};
// Assign initial value to run the request loop.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ running });
});

// Get the token when the extension starts up.
chrome.storage.sync.get("token", function(data) {
  if (!data.token) {
    console.log("Token not set.");
    setRunningState(false);
    return;
  }
  console.log("got token");
  setRunningState(true);
  token = data.token;
  requestLoop();
});

// Assigned: red;
// Feedbacks but no assigned: blue;
// None: Grey;
const badgeColor = () => {
  if (assignedCount === "-") {
    return "#656565";
  }
  return assignedCount > 0
    ? "#f44141"
    : feedbacksCount > 0
      ? "#4286f4"
      : "#656565";
};

const badgeText = () => {
  return `${assignedCount}:${feedbacksCount > 9 ? "9+" : feedbacksCount}`;
};

const addBadge = () => {
  chrome.browserAction.setBadgeBackgroundColor({ color: badgeColor() });
  chrome.browserAction.setBadgeText({ text: badgeText() });
};

const apiCall = async path => {
  const res = await fetch(`${rootUrl}${path}`, {
    headers
  });
  return res.json();
};

const getReviewsInfo = async () => {
  console.log(`token: ${token}`);
  if (!token) {
    assignedCount = "-";
    feedbacksCount = "-";
    addBadge();
    return;
  }
  headers.Authorization = token;
  const assigned = await apiCall(assignedUrl);
  const feedbacks = await apiCall(feedbacksUrl);
  assignedCount = assigned.length.toString();
  feedbacksCount = feedbacks.filter(fb => fb.read_at === null).length;
  addBadge();
  console.log("loop called");
};

const requestLoop = () => {
  getReviewsInfo();
  setInterval(getReviewsInfo, interval);
};

// Start button message
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.hasOwnProperty("token")) {
    token = msg.token;
    getReviewsInfo();
  } else if (msg.hasOwnProperty("running")) {
    setRunningState(msg.running);
  }
  console.log(msg);
  sendResponse({ success: true });
});
