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

    let response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      header: {
        Authorization: "AWdad12e+1daw::d1__123123dadaodo",
        "Content-type": "multipart/form-data",
      },
      body: data,
    });
    const reply = await response.json();
    console.log(reply);

    //If the admin is trying to log in we do not store the token in localStorage - we just redirect to the adminpage
    if ((email === "admin@admin.com") & (password === "admin")) {
      localStorage.setItem("admin", "true");
      history.push("/admin");
    } else if (response.status === 200) {
      localStorage.setItem(Object.keys(reply), reply["jwt_token"]);
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
          <h1>Log in to generic companys webshop!</h1>
          <form id="login-form" onSubmit={login}>
            <div className="login-user">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                className="input"
                id="email"
                name="email"
                required={true}
              />
            </div>
            <div className="login-password">
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

              <div>
                <button
                  className="btn btn-secondary login-btn-sec"
                  htmlFor="login-form"
                >
                  <Link to="">Forgot password</Link>
                </button>
                <button
                  className="btn btn-secondary login-btn-sec"
                  htmlFor="login-form"
                >
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
