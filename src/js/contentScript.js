import React from "react";
import ReactDOM from "react-dom";
import CritiqueButtonContainer from "./components/CritiqueButtonContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        <CritiqueButtonContainer />
      </div>
    );
  }
}

function injectApp() {
  // Inject data to let a matched websites know it's installed.
  const marker = document.createElement("div");
  marker.id = "papbfgdefjaddphbaekhljchpbigedei";
  marker.style.display = "none";
  document.body.append(marker);
  // Add buttons to the feedback tab.
  const selector = `section[ng-show="currentTab == 'feedback'"]`;
  const feedbackSection = document.querySelector(selector);
  if (feedbackSection) {
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    feedbackSection.prepend(top);
    feedbackSection.append(bottom);

    ReactDOM.render(<App />, top);
    ReactDOM.render(<App />, bottom);
  }
}

injectApp();
