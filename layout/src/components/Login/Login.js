import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <main id="main" className="login">
      <div>
        <h1>Log in to generic companys webshop!</h1>
        <form
          id="login-form"
          action="http://localhost:5000/api/login"
          method="POST"
          encType="multipart/form-data"
        >
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
  );
};
