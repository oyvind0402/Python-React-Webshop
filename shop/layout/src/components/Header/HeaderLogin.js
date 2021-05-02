import React from "react";
import { Link } from "react-router-dom";

export const HeaderLogin = (props) => {
  return (
    <div className="login-container">
      {props.user == null ? (
        <Link to="/login">
          <p>Log in</p>
        </Link>
      ) : (
        <p>
          Hello,
          <Link to="/user">{props.user}</Link>
        </p>
      )}
    </div>
  );
};
