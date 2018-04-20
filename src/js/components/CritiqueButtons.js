import React from "react";
import ReactDOM from "react-dom";

class CritiqueButtons extends React.Component {
  handleExpand() {
    const radioButtons = document.querySelectorAll('input[value="passed"]');
    radioButtons.forEach(button => {
      button.click();
    });
  }
  handleSubmit() {
    const submitButtons = document.querySelectorAll(
      'button[busy-click="_submit()"]'
    );
    submitButtons.forEach(button => {
      button.click();
    });
  }
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-default"
          onClick={() => this.handleExpand()}
        >
          Mark All Passed
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => this.handleSubmit()}
        >
          Submit All Open
        </button>
      </div>
    );
  }
}

export default CritiqueButtons;
