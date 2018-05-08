const api = {
  rootUrl: "https://review-api.udacity.com/api/v1/",
  assignedUrl: "me/submissions/assigned/",
  feedbacksUrl: "me/student_feedbacks/",
  headers: { Authorization: "" },
  interval: 60000 // One minute in ms
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("token", function(data) {
    api.headers.Authorization = data.token;
    requestLoop();
  });
});

const apiCall = async path => {
  const res = await fetch(`${api.rootUrl}${path}`, {
    headers: api.headers
  });
  return res.json();
};

const requestLoop = () => {
  setInterval(async () => {
    const assigned = await apiCall(api.assignedUrl);
    const feedbacks = await apiCall(api.feedbacksUrl);
    const assignedCount = assigned.length.toString();
    const feedbacksCount = feedbacks.filter(fb => fb.read_at === null).length;
    const text = `${assignedCount}:${
      feedbacksCount > 9 ? "9+" : feedbacksCount
    }`;
    chrome.browserAction.setBadgeText({ text });
    console.log("loop called");
  }, api.interval);
};
