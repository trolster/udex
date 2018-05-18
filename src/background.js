import addBadge from "./util/addBadge";
import { get, set, toggleRunning } from "./storage/storageSync";

let loop;

// REQUEST LOOP
const apiCall = async path => {
  const { token } = await get("token");
  const res = await fetch(`https://review-api.udacity.com/api/v1/${path}`, {
    headers: { Authorization: token }
  });
  if (res.status === 401) {
    set("valid", false);
  }
  return res.json();
};

const getReviewsInfo = async () => {
  const { valid, running } = await get(["valid", "running"]);
  if (!valid || !running) {
    addBadge("-", "-");
    return;
  }
  const assigned = await apiCall("me/submissions/assigned/");
  const feedbacks = await apiCall("me/student_feedbacks/");
  const assignedCount = assigned.length.toString();
  const feedbacksCount = feedbacks.filter(fb => fb.read_at === null).length;
  addBadge(assignedCount, feedbacksCount);
};

// Start and stop the request loop.
const requestLoop = async () => {
  clearInterval(loop);
  getReviewsInfo();
  loop = setInterval(getReviewsInfo, 60000); // 60 second interval
};

// MESSAGES
// Messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.token) {
    set("token", msg.token);
    set("valid", true);
  } else if (msg.runningState) {
    toggleRunning();
  } else {
    sendResponse({ success: false, text: "No recognized value was given." });
    return;
  }
});

chrome.storage.onChanged.addListener(() => {
  requestLoop();
});

requestLoop();
