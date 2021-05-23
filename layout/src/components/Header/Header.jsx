import React from "react";
import { Link } from "react-router-dom";
import "../../styles/main.scss";

import { HeaderLogin } from "./HeaderLogin";
import { HeaderBasket } from "./HeaderBasket";

import logo_svg from "../../static/generic_logo.svg";
import { useCart } from "../CartContext/CartProvider";

export const Header = () => {
  let totalNumber = 0;



  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo_svg} alt="Logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-centre"/>
      <div className="header-right">
        <HeaderLogin />
        <Link to="/basket" onClick={() =>     setTimeout(() => {
        }, 150)}>
          <HeaderBasket />
          {useCart().map((product) => {
            totalNumber += product["quantity"];
            return null;
          })}
        </Link>
        <p>({totalNumber})</p>
      </div>
    </header>
  );
};
