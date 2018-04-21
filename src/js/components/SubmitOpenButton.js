import React from "react";
import ReactDOM from "react-dom";

const handleSubmit = () => {
  const submitButtons = document.querySelectorAll(
    'button[busy-click="_submit()"]'
  );
  submitButtons.forEach(button => {
    button.click();
  });
  // Save the general comment as well
  const generalCommentButton = document.querySelector(
    'button[busy-click="saveGeneralComment()"]'
  );
  generalCommentButton.click();
};

const SubmitOpenButton = () => (
  <button
    type="button"
    className="btn btn-secondary btn-submit-all"
    onClick={() => handleSubmit()}
  >
    Submit All Open
  </button>
);

export default SubmitOpenButton;
