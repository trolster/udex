let changeToken = document.getElementById("token");

chrome.storage.sync.get("token", function(data) {
  changeToken.innerHTML = data.token;
});
