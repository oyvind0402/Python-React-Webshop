import React from "react";

export const BasketCard = (props) => {
  const price = (pr, qt) => {
    pr = pr.replace(".", "");
    return pr * qt;
  };

  return (
    <article className="basketcard">
      <h3 className="basketcard-name">{props.name}</h3>
      <button className="btn btn-secondary basketcard-btn">x</button>
      <div className="basketcard-img">
        <img src={props.image} alt="" />
      </div>
      <div className="basketcard-quantity">
        <button className="btn btn-secondary" alt="Reduce quantity">
          -
        </button>
        <p>
          Quantity: <br></br>
          {props.quantity}
        </p>
        <button className="btn btn-secondary" alt="Increase quantity">
          +
        </button>
      </div>
      <p className="basketcard-price">{price(props.price, props.quantity)}</p>
    </article>
  );
};
