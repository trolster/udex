import React from "react";
import ReactDOM from "react-dom";
import CritiqueButtons from "./components/CritiqueButtons";

class App extends React.Component {
  render() {
    return (
      <div>
        <CritiqueButtons />
      </div>
    );
  }
}

function injectApp() {
  const selector = `section[ng-show="currentTab == 'feedback'"]`;
  const feedbackSection = document.querySelector(selector);
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "udex");
  feedbackSection.prepend(newDiv);
  ReactDOM.render(<App />, newDiv);
}

injectApp();
