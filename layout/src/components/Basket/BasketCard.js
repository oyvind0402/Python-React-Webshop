import React, { useState } from "react";
import { useDispatchCart } from "../CartContext/CartProvider";

export const BasketCard = ({ product, index, handleRemove }) => {
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
  };
  const minusQty = () => {
    if (qty > 1) {
      changeQty((qty) => qty - 1);
      product["qty"] = qty;
      reduceFromCart(product);
    } else {
      handleRemove(index);
    }
  };

  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
  };

  const reduceFromCart = (item) => {
    dispatch({ type: "REDUCE", item });
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
