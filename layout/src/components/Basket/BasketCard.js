import React, { useState } from "react";
import { useDispatchCart } from "../CartContext/CartProvider";

export const BasketCard = ({ product, index, handleRemove, updateTotal }) => {
  // const price = (pr, qt) => {
  //   pr = pr.replace(".", "");
  //   return pr * qt;
  // };
  const dispatch = useDispatchCart();

  const [qty, changeQty] = useState(product.quantity);

  const plusQty = () => {
    changeQty((qty) => qty + 1);
    product["qty"] = qty;
    addToCart(product);
    updateTotal(product.price);
  };
  const minusQty = () => {
    if (qty > 1) {
      changeQty((qty) => qty - 1);
      product["qty"] = qty;
      reduceFromCart(product);
    } else {
      handleRemove(index);
    }
    updateTotal(-product.price);
  };

  const addToCart = (item) => {
    document.getElementById("plusBtn").disabled = true;
    dispatch({ type: "ADD", item });
    setTimeout(() => {
      document.getElementById("plusBtn").disabled = false;
    }, 500);
  };

  const reduceFromCart = (item) => {
    document.getElementById("minusBtn").disabled = true;
    dispatch({ type: "REDUCE", item });
    setTimeout(() => {
      document.getElementById("minusBtn").disabled = false;
    }, 500);
  };

  const src = "data:image/png;base64, " + product["image"];

  return (
    <article className="basketcard">
      <h3 className="basketcard-name">
        {product.brand} {product.name}
      </h3>
      <button
        className="btn btn-secondary basketcard-btn"
        onClick={() => handleRemove(index)}
      >
        x
      </button>
      <div className="basketcard-img">
        <img src={src} alt="" />
      </div>
      <div className="basketcard-quantity">
        <button
          id="minusBtn"
          className="btn btn-secondary"
          alt="Reduce quantity"
          onClick={() => minusQty()}
        >
          -
        </button>
        <p>
          Quantity: <br />
          {qty}
        </p>
        <button
          id="plusBtn"
          className="btn btn-secondary"
          alt="Increase quantity"
          onClick={() => plusQty()}
        >
          +
        </button>
      </div>
      <p className="basketcard-price">{product.price * qty}</p>
    </article>
  );
};
