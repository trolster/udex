import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid blue;
  border-radius: 5px;
`;

export class OpenAll extends React.Component {
  handleClick() {
    const radioButtons = document.querySelectorAll('input[value="passed"]');
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].click();
    }
    console.log(radioButtons);
    console.log("radioButtons");
  }
  render() {
    return <Button onClick={() => this.handleClick()}>Open All</Button>;
  }
}

export class SaveAll extends React.Component {
  handleClick() {
    console.log("Pretending to save..");
  }
  render() {
    return <Button onClick={() => this.handleClick()}>Save All</Button>;
  }
}
