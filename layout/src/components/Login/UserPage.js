import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";

const UserPage = () => {
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const [orders, setOrders] = useState([]);
  const user_info = JSON.parse(localStorage.getItem("user-info"));

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
                <div key={item["orderID"]}>
                  <h3>Order, ID: {item["orderID"]}</h3>
                  {item["products"].map((prod) => {
                    return (
                      <div key={prod["id"]}>
                        <p>{"Name: " + prod["brand"] + " " + prod["name"]}</p>
                        <p>{"Price: " + prod["price"]}</p>
                        <p>{"Quantity: " + prod["quantity"]}</p>
                        <br />
                      </div>
                    );
                  })}
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
