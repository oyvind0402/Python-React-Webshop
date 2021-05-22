import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const HeaderLogin = () => {
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      setUserLoggedin(true);
    }
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user-info");
    localStorage.removeItem("orderID");
    setUserLoggedin(false);
    setAdmin(false);
    history.push("/");
  };
  return (
    <div className="login-container">
      {userLoggedIn || admin ? (
        <button className="btn btn-primary" onClick={logOut}>
          Log out
        </button>
      ) : (
        <Link to="/login">
          <p>Log in</p>
        </Link>
      )}
      {admin ? (
        <div className="login-container-link">
          <Link to="/admin">Admin</Link>
        </div>
      ) : null}
      {userLoggedIn ? (
        <div className="login-container-link">
          <Link to="/user">Profile</Link>
        </div>
      ) : null}
    </div>
  );
};
