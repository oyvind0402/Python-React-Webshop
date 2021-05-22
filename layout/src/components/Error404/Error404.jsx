import React from "react";
import error_svg from "../../static/error404.svg";
import { Header } from "../Header/Header";

export const Error404 = () => {
  return (
    <>
      <Header />
      <main id="main" className="error404">
        <div className="error404-content">
          <img
            className="error404-img"
            src={error_svg}
            alt="Error 404: Page not found"
          />
        </div>
      </main>
    </>
  );
};
