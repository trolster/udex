import React from "react";
import ReactDOM from "react-dom";

const handleExpand = () => {
  const radioButtons = document.querySelectorAll('input[value="passed"]');
  radioButtons.forEach(button => {
    button.click();
  });
};

const ExpandButton = () => (
  <button
    type="button"
    className="btn btn-default"
    onClick={() => handleExpand()}
  >
    Mark All Passed
  </button>
);

export default ExpandButton;
