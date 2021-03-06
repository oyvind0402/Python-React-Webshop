import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useCart } from "../CartContext/CartProvider";
import { Header } from "../Header/Header";
import { PaymentCard } from "./PaymentCard";

//Arrow function checking the data of the payment details.
const checkValidData = (id) => {
  document.getElementById(id + "-error").innerText = "";

  const data = document.getElementById(id).value;

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
  const [admin, setAdmin] = useState(false);
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      setUserLoggedin(true);
    }
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []);

  const data = useCart();
  const history = useHistory();

  //If the cart is empty you go to the 404 page.
  if (data.length === 0) {
    history.push("/404");
    return <></>;
  } else {
    const fetchPayerData = async () => {
      const recipient = checkValidData("name");
      const address = checkValidData("address");
      const phone = checkValidData("phone");
      const userId = user_info["id"];

      //If all the fields have valid values.
      if (recipient && address && phone) {
        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("recipient", recipient);
        formData.append("userID", userId);

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
        //Checking to see if theres an error for any of the order details
        let error = false;
        const received_data = await response.json();
        let orderID = received_data["orderID"];
        //If the order was successfully made we add a orderdetail for each product in the cart.
        if (response.status === 201) {
          localStorage.setItem("orderID", orderID);
          data.map(async (product) => {
            let newData = new FormData();

            newData.append("orderID", orderID);
            newData.append("productID", product["id"]);
            newData.append("quantity", product["quantity"]);

            let response2 = await fetch(
              `https://localhost:5000/api/orderdetail/add`,
              {
                method: "POST",
                header: {
                  Authorization: "AWdad12e+1daw::d1__123123dadaodo",
                  "Content-type": "multipart/form-data",
                },
                body: newData,
              }
            );

            if (response2.status !== 201) {
              error = true;
            }
          });

          if (error) {
            alert("There was an error adding your order, please try again.");
          } else {
            history.push("/confirmation");
          }
        } else {
          history.push("/404");
          return <></>;
        }
      } else {
        alert("You have not filled all fields in the form correctly.");
      }
    };

    if (userLoggedIn) {
      return (
        <>
          <Header />
          <main id="main">
            <h1>Payment</h1>
            <div>
              <form className="form">
                <div className="form-group form-group-1">
                  <label htmlFor="name">Full name (recipient)</label>
                  <input id="name" onBlur={() => checkValidData("name")} />
                  <div id="name-error" />
                </div>
                <div className="form-group form-group-1">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    onBlur={() => checkValidData("address")}
                  />
                  <div id="address-error" />
                </div>
                <div className="form-group form-group-1">
                  <label htmlFor="phone">Telephone number</label>
                  <input id="phone" onBlur={() => checkValidData("phone")} />
                  <div id="phone-error" />
                </div>
                <div className="form-group">
                  <label htmlFor="card-nr">Card number</label>
                  <input
                    id="card-nr"
                    className="form-input"
                    placeholder="🎉 Guess who just got a gift?"
                    disabled
                  />
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
                  />
                  <label className="form-lbl-cvc" htmlFor="card-cvc">
                    CVC
                  </label>
                  <input
                    className="form-in-cvc"
                    id="card-cvc"
                    placeholder="100% free 🎉"
                    disabled
                  />
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
        </>
      );
    } else if (admin) {
      return (
        <>
          <Header />
          <main id="main">
            <h1>You are admin!</h1>
            <p>You need to be a regular user to buy items!</p>
            <Link to="/admin" className="btn btn-primary">
              To admin
            </Link>
          </main>
        </>
      );
    } else {
      return (
        <>
          <Header />
          <main id="main">
            <h1>You are not logged in!</h1>
            <p>You need to be logged in to place an order.</p>
            <Link to="/login" className="btn btn-primary">
              To login
            </Link>
          </main>
        </>
      );
    }
  }
};
