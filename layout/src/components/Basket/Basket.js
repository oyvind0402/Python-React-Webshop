import React, { useState } from "react";
import { useCart, useDispatchCart } from "../CartContext/CartProvider";
import { formatNOK } from "../utils";
import { BasketCard } from "./BasketCard";

//TODO Make everything-is-free discount page

export const Basket = () => {
  const [render, rerender] = useState();
  const dispatch = useDispatchCart();

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

  function checkAmountOfBasket(length) {
    if (length === 0) {
      //if shoppingcart is empty
      setTimeout(() => {
        document
          .getElementById("basket-pay")
          .style.setProperty("display", "none");
        document
          .getElementById("basket-empty")
          .style.setProperty("display", "block");
      }, 100);
    } else {
      setTimeout(() => {
        // when shoppingcart isnt empty
        document
          .getElementById("basket-pay")
          .style.setProperty("display", "flex");
        document
          .getElementById("basket-empty")
          .style.setProperty("display", "none");
      }, 100);
    }
  }

  return (
    <main id="main">
      <h2>Your shopping basket</h2>
      <div>
        {useCart().map((item, index) => {
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
        <button className="btn btn-primary basket-pay-btn">
          Go to payment
        </button>
      </div>
      <div
        className="basket-empty"
        id="basket-empty"
        onLoad={checkAmountOfBasket(useCart().length)}
      >
        <p>Your shopping basket is empty.</p>
      </div>
    </main>
  );
};
