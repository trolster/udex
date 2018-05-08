const rootUrl = "https://review-api.udacity.com/api/v1/";
const assignedUrl = "me/submissions/assigned/";
const feedbacksUrl = "me/student_feedbacks/";
const headers = { Authorization: "" };
const interval = 60000; // One minute in ms
let assignedCount = 0;
let feedbacksCount = 0;

// Assign initial value to run the request loop.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ running: true });
});

// Assigned: red;
// Feedbacks but no assigned: blue;
// None: Grey;
const badgeColor = () => {
  return assignedCount > 0
    ? "#ff0000"
    : feedbacksCount > 0
      ? "#00ff00"
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

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("token", function(data) {
    headers.Authorization = data.token;
    requestLoop();
  });
});

// Start button message
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  sendResponse({ success: true });
});
