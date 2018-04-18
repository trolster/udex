import React from "react";
import ReactDOM from "react-dom";

class CritiqueButtons extends React.Component {
  handleExpand() {
    const radioButtons = document.querySelectorAll('input[value="passed"]');
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].click();
    }
    console.log(radioButtons);
    console.log("radioButtons");
  }
  handleSubmit() {
    console.log("Pretend to handle submit..");
  }
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-default"
          onClick={() => this.handleExpand()}
        >
          Open All
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={() => this.handleSubmit()}
        >
          Save All
        </button>
      </div>
    );
  }
}

export default CritiqueButtons;
