import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";

const UserPage = (props) => {
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user-info"));
  console.log(user_info);
  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      setUserLoggedin(true);
    }
  }, []);

  if (userLoggedIn) {
    return (
      <>
        <Header />
        <main id="main">
          <div>
            <h1>Userpage</h1>
            <img
              src="https://i.stack.imgur.com/l60Hf.png"
              style={{ width: "200px", borderRadius: "100px" }}
            />
            <h2>Info</h2>
            <p>Username: {user_info["username"]}</p>
            <p>Name: {user_info["name"]}</p>
            <p>Email: {user_info["email"]}</p>
          </div>
          <div>
            <h2>Orders</h2>
            {/* {props.map((prop) => {
              
            })} */}
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <p>Youre not logged in!</p>
        </main>
      </>
    );
  }
};

export default UserPage;
