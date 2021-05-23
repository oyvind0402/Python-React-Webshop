import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../Header/Header";

export const Login = () => {
  //If the user is stored in localStorage no need to login again - redirects to new. :)
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      history.push("/");
    } else if (localStorage.getItem("admin")) {
      history.push("/admin");
    }
  });

  async function login(event) {
    //Added to stop the page from reloading when pressing login
    event.preventDefault();

    //Creating a new formdata to insert our values into
    const data = new FormData();
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    data.append("email", email);
    data.append("password", password);

    let response = await fetch("https://localhost:5000/api/login", {
      method: "POST",
      header: {
        Authorization: "AWdad12e+1daw::d1__123123dadaodo",
        "Content-type": "multipart/form-data",
      },
      body: data,
    });
    const reply = await response.json();

    //If the admin is trying to log in we do not store the token in localStorage - we just redirect to the adminpage
    if ((email === "admin@admin.com") & (password === "admin")) {
      localStorage.setItem("admin", reply["jwt_token"]);
      history.push("/admin");
    }
    //If its another user thats logging in we add the token and userinfo to localstorage for use throughout the website.
    //Then we redirect to home.
    else if (response.status === 200) {
      localStorage.setItem("jwt_token", reply["jwt_token"]);
      let user_info = {
        id: reply["id"],
        name: reply["name"],
        username: reply["username"],
        email: reply["email"],
      };
      localStorage.setItem("user-info", JSON.stringify(user_info));
      history.push("/");
    } else {
      alert(reply["msg"]);
    }
  }

  return (
    <>
      <Header />
      <main id="main" className="login">
        <div>
          <h1 className="title">
            Log in <br></br>
            <span className="title-mini">to Generic Company's webshop</span>
          </h1>
          <form id="login-form" onSubmit={login}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                className="input"
                id="email"
                name="email"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                className="input"
                required={true}
              />
            </div>
            <div>
              <input
                className="btn btn-primary"
                type="submit"
                htmlFor="login-form"
                name="Login"
                value="Login"
              />
              <div className="login-extrabtns">
                <Link
                  to="/forgotpassword"
                  className="btn btn-secondary login-btn-sec"
                >
                  Forgot password
                </Link>
                <Link to="/signup" className="btn btn-secondary login-btn-sec">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
