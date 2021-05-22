import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";

export const SignUp = () => {
  async function signup(event) {
    event.preventDefault();

    const data = new FormData();
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    data.append("name", name);
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);

    let response = await fetch("https://localhost:5000/api/register", {
      method: "POST",
      header: {
        Authorization: "AWdad12e+1daw::d1__123123dadaodo",
        "Content-type": "multipart/form-data",
      },
      body: data,
    });
    const reply = await response.json();

    if (response.status === 201) {
      alert(reply["msg"]);
      document.getElementById("name").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
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
            Sign up <br></br>
            <span className="title-mini">to Generic Company's webshop</span>
          </h1>
          <form id="signup-form" onSubmit={signup}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                placeholder="Name"
                className="input"
                id="name"
                name="name"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                placeholder="Username"
                className="input"
                id="username"
                name="username"
                required={true}
              />
            </div>
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
                name="Register"
                value="Register"
              />
              <Link to="/login" className="btn btn-secondary login-btn-sec">
                To Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
