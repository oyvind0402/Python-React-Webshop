import React from "react";

export const Payment = () => {
  return (
    <main id="main">
      <h1>Payment</h1>
      <div>
        <form className="form">
          <div className="form-group">
            <label for="name">Full name</label>
            <input id="name"></input>
          </div>
          <div className="form-group">
            <label for="address">Address</label>
            <input id="address"></input>
          </div>
          <div className="form-group">
            <label for="phone">Telephone number</label>
            <input id="phone"></input>
          </div>
          <div className="form-group">
            <label for="card-nr">Card number</label>
            <input
              id="card-nr"
              className="form-input"
              placeholder="🎉 Guess who just got a gift?"
              disabled
            ></input>
          </div>
          <div className="form-group-2">
            <label className="form-lbl-date" for="card-date">
              Expiration date
            </label>
            <input
              className="form-in-date"
              id="card-date"
              placeholder="🎉 You got a gift!"
              disabled
            ></input>
            <label className="form-lbl-cvc" for="card-cvc">
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
      </div>
    </main>
  );
};
