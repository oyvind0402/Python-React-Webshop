import React from "react";
import { Link } from "react-router-dom";

import { useCart } from "../CartContext/CartProvider";
import { PaymentCard } from "./PaymentCard";
// import { disableBtn, enableBtn } from "../utils";

const fetchPayerData = () => {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  const data = {
    name: name,
    address: address,
    phone: phone,
  };

  console.log(data);

  //TODO Add live checks for data
  //TODO Enable/disable buttons
};

export const Payment = () => {
  const data = useCart();

  if (data.length === 0) {
    window.location.href = "/404";
  } else {
    return (
      <main id="main">
        <h1>Payment</h1>
        <div>
          <form className="form">
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input id="name"></input>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input id="address"></input>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telephone number</label>
              <input id="phone"></input>
            </div>
            <div className="form-group">
              <label htmlFor="card-nr">Card number</label>
              <input
                id="card-nr"
                className="form-input"
                placeholder="🎉 Guess who just got a gift?"
                disabled
              ></input>
            </div>
            <div className="form-group-2">
              <label className="form-lbl-date" htmlFor="card-date">
                Expiration date
              </label>
              <input
                className="form-in-date"
                id="card-date"
                placeholder="🎉 You got a gift!"
                disabled
              ></input>
              <label className="form-lbl-cvc" htmlFor="card-cvc">
                CVC
              </label>
              <input
                className="form-in-cvc"
                id="card-cvc"
                placeholder="100% free 🎉"
                disabled
              ></input>
            </div>
          </form>
          <div>
            <h2>Your cart</h2>
            <section>
              {data.map((item, index) => {
                return <PaymentCard key={index} product={item} />;
              })}
            </section>
          </div>
          <p className="total-price-all">
            Total price: <span className="total-price-all-free">FREE!</span>
          </p>
          <div className="confirm">
            <Link to="#">
              <button
                id="confirmBtn"
                className="btn btn-primary confirm-btn"
                onClick={() => fetchPayerData()}
              >
                Confirm order
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }
};
