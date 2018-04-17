import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid blue;
  border-radius: 5px;
`;

class App extends React.Component {
  handleClick() {
    console.log("hi");
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.handleClick()}>
          Click Me!
        </Button>
      </div>
    );
  }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  // If message is injectApp
  if (request.injectApp) {
    // Inject our app to DOM and send response
    injectApp();
    response({
      startedExtension: true
    });
  }
});

function injectApp() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "udex");
  document.body.prepend(newDiv);
  ReactDOM.render(<App />, newDiv);
}
