import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "../CartContext/CartProvider";
import { formatNOK } from "../utils";
import { BasketCard } from "./BasketCard";
import { Header } from "../Header/Header";

export const Basket = () => {
  const [render, rerender] = useState();
  const dispatch = useDispatchCart();
  const cart = useCart();

  function startRerender(string) {
    //force rerender page
    console.log(render);
    rerender(string);
  }

  let totalPrice = 0;

  function newTotalUpdater(item) {
    let newValue = item["quantity"] * item["price"];
    totalPrice = totalPrice + newValue;
  }

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  if (cart.length > 0) {
    return (
      <>
        <Header />
        <main id="main">
          <h2>Your shopping basket</h2>
          <div>
            {cart.map((item, index) => {
              newTotalUpdater(item);
              return (
                <BasketCard
                  handleRemove={handleRemove}
                  key={index}
                  product={item}
                  index={index}
                  onchange={(rerenderString) => startRerender(rerenderString)}
                />
              );
            })}
          </div>
          <div className="basket-pay" id={"basket-pay"}>
            <div className="basket-pay-total">
              <p>Total price: {formatNOK(totalPrice)} </p>
            </div>
            <Link to="/payment">
              <button className="btn btn-primary basket-pay-btn">
                Go to payment
              </button>
            </Link>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <div className="basket-empty" id="basket-empty">
            <p>Your shopping basket is empty.</p>
          </div>
        </main>
      </>
    );
  }
};
