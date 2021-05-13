import React from "react";

export const BasketCard = ({ product, index, handleRemove }) => {
  // const price = (pr, qt) => {
  //   pr = pr.replace(".", "");
  //   return pr * qt;
  // };
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
        <button className="btn btn-secondary" alt="Reduce quantity">
          -
        </button>
        <p>
          Quantity: /br>
          {product.quantity}
        </p>
        <button className="btn btn-secondary" alt="Increase quantity">
          +
        </button>
      </div>
      <p className="basketcard-price">{product.price}</p>
    </article>
  );
};
