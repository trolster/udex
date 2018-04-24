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
  // Inject data to let a website know it's installed. The website will have to
  // be aware of the extension, and include an element with the extension id as
  // the class name, and a data-is-installed attribute set to false.
  const marker = document.querySelector(".papbfgdefjaddphbaekhljchpbigedei");
  if (marker) {
    // Click on the marker so that the application can detect that the
    // extension is installed.
    marker.click();
  }
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
