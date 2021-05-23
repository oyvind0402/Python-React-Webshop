import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { OrderCard } from "./OrderCard";

const UserPage = () => {
  const [userLoggedIn, setUserLoggedin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [admin, setAdmin] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    let done = false;
    if (localStorage.getItem("jwt_token")) {
      setUserLoggedin(true);
      done = true;
    }
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
    if (done) {
      const loadData = async () => {
        const response = await fetch(
          `https://localhost:5000/api/user/${user_info["id"]}/orders`
        );
        let data = await response.json();
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
          <div className="user">
            <h1>Userpage</h1>
            <div className="user-info">
              <img
                className="user-info-img"
                src="https://i.stack.imgur.com/l60Hf.png"
                alt=""
              />
              <h2>Your info</h2>
              <table className="user-info-table">
                <tbody className="user-info-table-body">
                  <tr>
                    <td>Username:</td>
                    <td> {user_info["username"]}</td>
                  </tr>
                  <tr>
                    <td>Name: </td>
                    <td> {user_info["name"]}</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td> {user_info["email"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2>Orders</h2>
            {orders.length > 0 ? (
              orders.map((item, index) => {
                return <OrderCard key={index} item={item} />;
              })
            ) : (
              <p>You have not made any orders yet.</p>
            )}
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
          <p>Admins do not have a right to a user page.</p>
          <p>You have enough power as is.</p>
        </main>
        ;
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <h1>You are not logged in!</h1>
        </main>
      </>
    );
  }
};

export default UserPage;
