import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HeaderLogin = () => {
  const [loggedIn, setLoggedin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin") || localStorage.getItem("jwt_token")) {
      setLoggedin(true);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("admin");
    setLoggedin(false);
    window.location.reload();
  };
  return (
    <div className="login-container">
      {loggedIn ? (
        <button className="btn btn-primary" onClick={logOut}>
          Log out
        </button>
      ) : (
        <Link to="/login">
          <p>Log in</p>
        </Link>
      )}
    </div>
  );
};
