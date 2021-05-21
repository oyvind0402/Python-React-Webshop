import React from "react";

import { formatNOK } from "../utils";
import { Header } from "../Header/Header";

export const PaymentCard = (props) => {
  const src = "data:image/png;base64, " + props.product["image"];

  return (
    <>
      <Header />
      <article className="paymentcard">
        <h3 className="paymentcard-name">
          {props.product.brand} {props.product.name}
        </h3>
        <div className="paymentcard-img">
          <img src={src} alt="" />
        </div>
        <div className="paymentcard-price-unit">
          {props.product.quantity} x{" "}
          <span className="free">{formatNOK(props.product.price)}</span>
        </div>
        <div className="paymentcard-price-total">
          <div>
            <p className="free">
              {formatNOK(props.product.price * props.product.quantity)}
            </p>
            <div className="free-sticker">FREE</div>
          </div>
        </div>
      </article>
    </>
  );
};
