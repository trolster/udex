import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid blue;
  border-radius: 5px;
`;

export const OpenAll = () => <Button>Open All</Button>;

export const SaveAll = () => <Button>Save All</Button>;
