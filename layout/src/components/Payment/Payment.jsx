import React from "react";
import { useHistory } from "react-router-dom";

import { useCart } from "../CartContext/CartProvider";
import { PaymentCard } from "./PaymentCard";

const checkValidData = (id) => {
  document.getElementById(id + "-error").innerText = "";

  const data = document.getElementById(id).value;
  console.log(id);

  let matches = false;

  switch (id) {
    case "name":
      const regexName = /^[a-zA-ZæøåÆØÅ\s]+$/;
      matches = data.match(regexName);
      break;
    case "address":
      const regexAddress = /^[0-9a-zA-ZæøåÆØÅ,\s]+$/;
      matches = data.match(regexAddress);
      break;
    case "phone":
      const regexPhone = /^[+]?[0-9\s]{0,4}[0-9]{7,17}$/;
      matches = data.match(regexPhone);
      break;
    default:
      matches = false;
  }

  if (!matches) {
    document.getElementById(id + "-error").innerText =
      "⚠️ You have not inserted a valid " + id + " ⚠️";
  }

  return data;
};

export const Payment = () => {
  const data = useCart();
  const history = useHistory();

  const userId = 1; //TODO CHANGE

  if (data.length === 0) {
    window.location.href = "/404";
  } else {
    const fetchPayerData = async () => {
      const recipient = checkValidData("name");
      const address = checkValidData("address");
      const phone = checkValidData("phone");

      if (recipient && address && phone) {
        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("recipient", recipient);
        formData.append("recipient", userId);

        let response = await fetch(
          `https://localhost:5000/api/user/${userId}/order`,
          {
            method: "POST",
            header: {
              Authorization: "AWdad12e+1daw::d1__123123dadaodo",
              "Content-type": "multipart/formdata",
            },
            body: formData,
          }
        );

        const received_data = await response.json();
        console.log(received_data.orderId);

        if (response.status === 201) {
          history.push("/404");
        } else {
          history.push("/confirmation");
        }
      } else {
        alert("You have not filled all fields in the form correctly.");
      }
    };

    return (
      <main id="main">
        <h1>Payment</h1>
        <div>
          <form className="form">
            <div className="form-group form-group-1">
              <label htmlFor="name">Full name (recipient)</label>
              <input id="name" onBlur={() => checkValidData("name")}></input>
              <div id="name-error"></div>
            </div>
            <div className="form-group form-group-1">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                onBlur={() => checkValidData("address")}
              ></input>
              <div id="address-error"></div>
            </div>
            <div className="form-group form-group-1">
              <label htmlFor="phone">Telephone number</label>
              <input id="phone" onBlur={() => checkValidData("phone")}></input>
              <div id="phone-error"></div>
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
            <button
              id="confirmBtn"
              className="btn btn-primary confirm-btn"
              onClick={() => fetchPayerData()}
            >
              Confirm order
            </button>
          </div>
        </div>
      </main>
    );
  }
};