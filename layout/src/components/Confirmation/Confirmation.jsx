import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { useDispatchCart } from "../CartContext/CartProvider";
import { Link } from "react-router-dom";

export const Confirmation = () => {
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const orderID = localStorage.getItem("orderID");
  const dispatch = useDispatchCart();

  const removeCart = () => {
    dispatch({ type: "REMOVEALL" });
  };

  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      setUserLoggedin(true);
      removeCart();
    }
  });
  if (userLoggedIn) {
    return (
      <>
        <Header />
        <main id="main" className="confirmation">
          <h1>Order of ID #{orderID} confirmed</h1>
          <p>Your order #{orderID} has been successfully placed.</p>
          <p>
            Estimated delivery: 32nd of February 2121 (according to the Mayan
            calendar, revised in August of 3015)
          </p>
          <div className="confirmation-warning">
            <h2>Warning</h2>
            <p>
              Delivery might be delayed, as it will be conducted only once our
              delivery driver returns from Mars.
            </p>
            <p className="confirmation-warning-fu">
              Your order was free, be happy with that...
            </p>
          </div>
          <p>
            Go to your <Link to="/user">profile</Link> to see your orders!
          </p>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <p>You are not logged in...</p>
        </main>
      </>
    );
  }
};
