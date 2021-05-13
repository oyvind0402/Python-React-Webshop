import React, { useState } from "react";
import { useCart, useDispatchCart } from "../CartContext/CartProvider";
import { formatNOK } from "../utils";
import { BasketCard } from "./BasketCard";

//TODO Make everything-is-free discount page

export const Basket = () => {
  // const [products, updateProducts] = useState([useCart()]);
  const products = useCart();
  const dispatch = useDispatchCart();

  const initialTotal = (prod) => {
    let total = 0;
    prod.map((p) => {
      return (total += p["price"] * p["quantity"]);
    });
    return total;
  };
  const [totalprice, updateTotalprice] = useState(initialTotal(products));
  const totalUpdater = (value) => {
    updateTotalprice((total) => total + value);
  };

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  if (products.length === 0) {
    return (
      <main id="main">
        <div className="basket-empty">
          <p>Your shopping basket is empty.</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main">
      <h2>Your shopping basket</h2>
      <div>
        {products.map((item, index) => {
          return (
            <BasketCard
              handleRemove={handleRemove}
              key={index}
              product={item}
              index={index}
              updateTotal={totalUpdater}
            />
          );
        })}
      </div>
      <div className="basket-pay">
        <div className="basket-pay-total">
          <p>Total price: {formatNOK(totalprice)} </p>
        </div>
        <button className="btn btn-primary basket-pay-btn">
          Go to payment
        </button>
      </div>
    </main>
  );
};
