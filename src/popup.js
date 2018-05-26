import React from "react";
import ReactDOM from "react-dom";
// Our modules
import { get } from "./storage/storageSync";
// Send console.log messages to the background page for development.
console = chrome.extension.getBackgroundPage().console;

class Popup extends React.Component {
  state = {
    saved: false
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
    this.setState({ token: e.target.value, saved: false });
    // Make sure the token is at least the right length. Beyond that there is
    // no way to check if the token is valid without making an API call.
    if (e.target.value.length < 140) {
      this.setState({ valid: false });
      return;
    }
    this.setState({ valid: true });
  };

  handleTokenSubmit = e => {
    e.preventDefault();
    const newToken = this.state.token;

    // Send a message to background.js when a new token is successfully entered.
    chrome.runtime.sendMessage({ token: newToken }, res => {
      if (!res.success) {
        console.error(`Error: ${res.text}`);
      }
    });
  };

  async componentDidMount() {
    // Initialize the state object.
    const data = await get(["token", "running", "valid"]);
    this.setState(data);

    // Listen for storage changes.
    chrome.runtime.onMessage.addListener(async msg => {
      const key = msg.changed;
      const data = await get(key);
      if (data.token) {
        this.setState({ ...data, saved: true });
      }
      this.setState(data);
    });
  }

  render() {
    const { running, token, valid, saved } = this.state;
    return (
      <div>
        <input
          type="button"
          id="start-button"
          onClick={this.handleRunningStateChange}
          className={running ? "running" : ""}
          value={running ? "running" : "start"}
        />
        <form id="change-token" onSubmit={this.handleTokenSubmit}>
          <label htmlFor="token" className={valid ? "" : "invalid"}>
            {valid ? "Current Token" : "Invalid Token"}
          </label>
          <textarea
            name="token"
            id="token"
            onFocus={this.handleTokenFocus}
            onChange={this.handleTokenChange}
            cols="50"
            rows="5"
            placeholder="Your token goes here (should be at least 140 charactes)..."
            value={token}
          />
          <input type="submit" disabled={valid ? false : "disabled"} />
        </form>
        <style jsx>
          {`
            input[type="button"],
            input[type="submit"] {
              background-color: #1f9bcf;
              border: 0 solid transparent;
              color: #ffffff;
              cursor: pointer;
              display: inline-block;
              font-size: 0.765625rem;
              padding: 0.75rem 2rem;
              text-transform: uppercase;
              transition: color 0.15s ease-in-out,
                background-color 0.15s ease-in-out,
                border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
                -webkit-box-shadow 0.15s ease-in-out;
              user-select: none;
            }
            input:hover {
              background-color: #1a82ae;
            }
            input[type="submit"] {
              float: right;
              margin: 10px 0;
            }
            input[type="submit"]:disabled {
              opacity: 0.65;
              cursor: default;
            }
            input[type="button"] {
              width: 100%;
              margin-bottom: 10px;
            }
            input[type="button"].running {
              background-color: #4bbf73;
            }
            input[type="button"].running:hover {
              background-color: #3ca861;
            }
            input:focus,
            textarea:focus {
              outline: none !important;
            }
            label {
              padding-left: 4px;
            }
            textarea {
              height: 100px;
              border-color: ${saved
                ? "#4bbf73"
                : valid
                  ? "#1f9bcf"
                  : "#d9534f"};
              border-radius: 4px;
              resize: none;
              padding: 4px;
            }
            .invalid {
              color: #d9534f;
            }
          `}
        </style>
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById("popup"));
