import React from "react";
import "../styles/main.scss";

import { Login } from "./Login";
import { Basket } from "./Basket";

import logo_svg from "../static/generic_logo.svg";

export const Navbar = (props) => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="/" title="To Homepage">
          <img src={logo_svg} alt="Logo" className="nav-logo" />
        </a>
      </div>
      <div className="nav-centre"></div>
      <div className="nav-right">
        <Login user={props.user} />
        <Basket />
      </div>
    </nav>
  );
};
