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
  const top = document.createElement("div");
  const bottom = document.createElement("div");
  feedbackSection.prepend(top);
  feedbackSection.append(bottom);
  ReactDOM.render(<App />, top);
  ReactDOM.render(<App />, bottom);
}

injectApp();
