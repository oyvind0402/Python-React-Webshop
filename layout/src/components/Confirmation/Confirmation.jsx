import React from "react";

export const Confirmation = (props) => {
  console.log(props.location.state);
  if (props.location.state !== undefined) {
    return <p>There's data</p>;
  } else {
    return <p>Undefined</p>;
  }
};
