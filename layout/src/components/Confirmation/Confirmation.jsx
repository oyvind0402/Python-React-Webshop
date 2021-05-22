import React from "react";
import { Header } from "../Header/Header";

export const Confirmation = (props) => {
  console.log(props.location.state);
  if (props.location.state !== undefined) {
    return (
      <>
        <Header />
        <p>There's data</p>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <p>Undefined</p>
      </>
    );
  }
};
