import React from "react";
import { Link } from "react-router-dom";
import "../../styles/main.scss";

import { HeaderLogin } from "./HeaderLogin";
import { HeaderBasket } from "./HeaderBasket";

import logo_svg from "../../static/generic_logo.svg";

export const Header = (props) => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo_svg} alt="Logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-centre"></div>
      <div className="header-right">
        <HeaderLogin user={props.user} />
        <Link to="/basket">
          <HeaderBasket />
        </Link>
      </div>
    </header>
  );
};
