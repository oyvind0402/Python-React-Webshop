import React from "react";

import basket from "../../static/cart.png";

export const HeaderBasket = () => {
  return (
    <div className="headerbasket-fig">
      <img alt="Shopping cart" src={basket} />
    </div>
  );
};
