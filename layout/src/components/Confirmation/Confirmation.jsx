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
        <main id="main">
          <p>
            Your order with orderID = {orderID}, has been successfully placed.
            It will be delivered when our delivery driver returns from Mars on
            the 32nd of February, 2121. According to the Mayan calendar, revised
            in August of 3015.
          </p>
          <p>Your order was free, be happy with that...</p>
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
