import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <main id="main" className="login">
      <div>
        <h1>Sign up to generic companys webshop!</h1>
        <form
          id="signup-form"
          action="http://localhost:5000/api/register"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="login-user">
            <label htmlFor="name">Name</label>
            <input
              placeholder="Name"
              className="input"
              id="name"
              name="name"
              required={true}
            />
          </div>
          <div className="login-user">
            <label htmlFor="username">Username</label>
            <input
              placeholder="Username"
              className="input"
              id="username"
              name="username"
              required={true}
            />
          </div>
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
              name="Register"
              value="Register"
            />
            <button
              className="btn btn-secondary login-btn-sec"
              htmlFor="signup-form"
            >
              <Link to="/login">To Login</Link>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
