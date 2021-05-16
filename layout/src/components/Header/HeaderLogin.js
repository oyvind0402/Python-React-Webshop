import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HeaderLogin = () => {
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const [admin, setAdmin] = useState(false);

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
    setUserLoggedin(false);
    setAdmin(false);
    window.location.reload();
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
      {admin ? <Link to="/admin">Admin</Link> : null}
      {userLoggedIn ? <Link to="/user">Profile</Link> : null}
    </div>
  );
};
