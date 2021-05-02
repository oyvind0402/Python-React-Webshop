import React from "react";

import basket from "../static/cart.png";

export const Basket = () => {
  return (
    <div className="basket-fig">
      <img alt="Shopping cart" src={basket} />
    </div>
  );
};
