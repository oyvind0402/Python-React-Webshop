import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";

const UserPage = () => {
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const [orders, setOrders] = useState([]);
  const user_info = JSON.parse(localStorage.getItem("user-info"));
  const products = [];

  useEffect(() => {
    let done = false;
    if (localStorage.getItem("jwt_token")) {
      setUserLoggedin(true);
      done = true;
    }
    if (done) {
      const loadData = async () => {
        const response = await fetch(
          `https://localhost:5000/api/user/${user_info["id"]}/orders`
        );
        let data = await response.json();
        console.log(data);
        setOrders(data);
      };
      loadData();
    }
  }, []);

  if (userLoggedIn) {
    orders.map(async (order) => {
      const response2 = await fetch(
        `https://localhost:5000/api/product/${order["productID"]}`
      );
      let data2 = await response2.json();
      data2["quantity"] = order["quantity"];
      data2["orderID"] = order["orderID"];
      products.push(data2);
    });

    return (
      <>
        <Header />
        <main id="main">
          <div>
            <h1>Userpage</h1>
            <img
              src="https://i.stack.imgur.com/l60Hf.png"
              style={{ width: "200px", borderRadius: "100px" }}
            />
            <h2>Info</h2>
            <p>Username: {user_info["username"]}</p>
            <p>Name: {user_info["name"]}</p>
            <p>Email: {user_info["email"]}</p>
          </div>
          <div>
            <h2>Orders</h2>
            {orders.map((item) => {
              return (
                <div>
                  <h3>Order</h3>
                  <p>Order ID: {item["orderID"]}</p>
                  <p>Product ID: {item["productID"]}</p>
                  <p>Quantity: {item["quantity"]}</p>
                </div>
              );
            })}
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <p>Youre not logged in!</p>
        </main>
      </>
    );
  }
};

export default UserPage;
