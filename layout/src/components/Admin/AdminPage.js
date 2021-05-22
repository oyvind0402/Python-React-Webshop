import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";

const AdminPage = () => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []);

  if (admin) {
    return (
      <>
        <Header />
        <main id="main">
          <div>
            <h1>Adminpage</h1>
            <Link to="/new">Add a product</Link>
            <br />
            <Link to="/delete">Delete a product</Link>
            <br />
            <Link to="/update">Update a product</Link>
            <br />
            <Link to="/deleted">Show all deleted products</Link>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <p>You don't have admin privileges...</p>
        </main>
      </>
    );
  }
};

export default AdminPage;
