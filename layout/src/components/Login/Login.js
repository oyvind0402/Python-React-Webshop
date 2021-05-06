import React from "react";

export const Login = () => {
  return (
    <main id="main" className="login">
      <div>
        <form id="login-form">
          <div className="login-user">
            <label htmlFor="user">Username</label>
            <input placeholder="Username" className="input" />
          </div>
          <div className="login-password">
            <label htmlFor="pass">Password</label>
            <input
              placeholder="Password"
              type="password"
              id="pass"
              className="input"
            />
          </div>
        </form>
        <div>
          <button class="btn btn-primary" type="submit" htmlFor="login-form">
            Log in
          </button>
          <div>
            <button
              class="btn btn-secondary login-btn-sec"
              type="submit"
              htmlFor="login-form"
            >
              Forgot password
            </button>
            <button
              class="btn btn-secondary login-btn-sec"
              type="submit"
              htmlFor="login-form"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
