import React from "react";
import { useDispatchCart } from "../CartContext/CartProvider";
import { formatNOK } from "../utils";

export const BasketCard = (props) => {
  const dispatch = useDispatchCart();

  //Adding another of the same item in the basket
  const plusQty = () => {
    let newQty = props.product.quantity + 1; //new quantity
    addToCart(props.product, newQty);
  };

  const minusQty = () => {
    let reducedQty = props.product.quantity - 1;
    if (reducedQty === 0) {
      // products has to be removed from shopping cart
      props.handleRemove(props.index);
    } else {
      reduceFromCart(props.product, reducedQty);
    }
  };

  const addToCart = (item, changeQuantity) => {
    dispatch({ type: "ADDQUANTITY", item, changeQuantity });
    props.onchange("Rerender");
  };

  const reduceFromCart = (item, reducedQuantity) => {
    dispatch({ type: "REDUCE", item, reducedQuantity });
    props.onchange("Rerender");
  };

  const src = "data:image/png;base64, " + props.product["image"];

  return (
    <article className="basketcard">
      <h3 className="basketcard-name">
        {props.product.brand} {props.product.name}
      </h3>
      <button
        className="btn btn-secondary basketcard-btn"
        onClick={() => props.handleRemove(props.index)}
      >
        x
      </button>
      <div className="basketcard-img">
        <img src={src} alt={props.name} />
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
          {props.product.quantity}
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
      <div className="basketcard-price">
        <p className="basketcard-price-unit">
          {props.product.quantity} x {formatNOK(props.product.price)}
        </p>
        <p className="basketcard-price-total">
          {formatNOK(props.product.price * props.product.quantity)}
        </p>
      </div>
    </article>
  );
};
