import React from "react";

export const Login = (props) => {
  return (
    <div className="login-container">
      {props.user == null ? <a href="/">Log in</a> : <p>Hello, {props.user}</p>}
    </div>
  );
};
