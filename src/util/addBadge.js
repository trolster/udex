export default (assigned, feedbacks) => {
  const text = `${assigned}:${feedbacks > 9 ? "9+" : feedbacks}`;
  const color =
    assigned === "-"
      ? "#656565" // No token: grey.
      : assigned > 0
        ? "#f44141" // 1+ submissions assigned: red.
        : feedbacks > 0
          ? "#4286f4" // 1+ feedbacks unread, no submissions assigned: blue.
          : "#656565"; // No submissions assigned and no feedbacks: grey.
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color });
};
