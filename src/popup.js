import React from "react";
import ReactDOM from "react-dom";
// Send console.log messages to the background page for development.
console = chrome.extension.getBackgroundPage().console;

class Popup extends React.Component {
  state = {
    running: true,
    token: ""
  };

  setRunningState = () => {
    chrome.storage.sync.get("running", data => {
      this.setState({ running: data.running });
    });
  };

  handleRunningStateChange = () => {
    // Send a message to background.js when the button is clicked.
    chrome.runtime.sendMessage({ runningState: true }, res => {
      if (!res.success) {
        console.error(`Error: ${res.text}`);
      }
    });
  };

  handleTokenFocus = e => {
    e.target.select();
  };

  handleTokenChange = e => {
    this.setState({ token: e.target.value });
  };

  handleTokenSubmit = e => {
    e.preventDefault();
    const newToken = this.state.token;
    // Validate the token
    if (newToken.length !== 151) {
      this.setState({ valid: false });
      return;
    }
    this.setState({ valid: true });

    // Send a message to background.js when a new token is successfully entered.
    chrome.runtime.sendMessage({ newToken }, res => {
      if (!res.success) {
        console.error(`Error: ${res.text}`);
      }
    });
  };

  componentDidMount = () => {
    // Listen for confirmation from background.js after start/stop is clicked.
    chrome.runtime.onMessage.addListener(msg => {
      if (msg.running !== undefined) {
        this.setRunningState();
      }
    });
    // Initialize the textarea with token text.
    chrome.storage.sync.get(["running", "token"], data => {
      this.setState({ running: data.running, token: data.token });
    });
  };

  render() {
    console.log(this.state);
    const { running, token, valid } = this.state;
    const labelClass = valid === undefined ? "" : valid ? "valid" : "invalid";
    return (
      <div>
        <input
          type="button"
          id="start-button"
          onClick={this.handleRunningStateChange}
          value={running ? "running" : "start"}
        />
        <form id="change-token" onSubmit={this.handleTokenSubmit}>
          <label htmlFor="token" className={`token-label ${labelClass}`}>
            {valid === undefined || valid ? "Current Token" : "Invalid Token"}
          </label>
          <textarea
            name="token"
            id="token"
            onFocus={this.handleTokenFocus}
            onChange={this.handleTokenChange}
            cols="40"
            rows="5"
            value={token}
          />
          <input type="submit" />
        </form>
        <style jsx>
          {`
            input:focus,
            .token-label {
              outline: none !important;
            }
            .valid {
              background-color: "DarkSeaGreen";
            }
            .invalid {
              background-color: "LightCoral";
            }
          `}
        </style>
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById("popup"));
