import React from "react";

export const BasketCard = (props) => {
  const price = (pr, qt) => {
    pr = pr.replace(".", "");
    return pr * qt;
  };

  return (
    <div className="basketcard">
      <div className="basketcard-r">
        <h3 className="basketcard-name">{props.name}</h3>
        <button className="btn btn-secondary">x</button>
      </div>
      <div className="basketcard-r">
        <img className="basketcard-img" src={props.image} alt="" />
        <div>
          <p className="basketcard-price">
            {price(props.price, props.quantity)}
          </p>
          <p className="basketcard-quantity">
            Quantity: <br></br>
            {props.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};
