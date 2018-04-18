import React from "react";
import ReactDOM from "react-dom";
import { OpenAll, SaveAll } from "./components/Buttons";

class App extends React.Component {
  render() {
    return (
      <div>
        <OpenAll />
        <SaveAll />
      </div>
    );
  }
}

function injectApp() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "udex");
  document.body.prepend(newDiv);
  ReactDOM.render(<App />, newDiv);
}

injectApp();
