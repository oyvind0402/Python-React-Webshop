import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";
import { ErrorNoPrivileges } from "./ErrorNoPrivileges";

const DeletedProducts = () => {
  const [admin, setAdmin] = useState(false);
  const [products, updateProducts] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
    const loadData = async () => {
      const response = await fetch(
        "https://localhost:5000/api/deletedproducts"
      );
      let data = await response.json();
      updateProducts(data);
    };
    loadData();
  }, []);

  async function addProduct(id) {
    await fetch(`https://localhost:5000/api/deletedproducts/add/${id}`, {
      method: "POST",
    });
    const response = await fetch("https://localhost:5000/api/deletedproducts");
    let data = await response.json();
    updateProducts(data);
  }

  if (admin && products.length > 0) {
    return (
      <>
        <Header />
        <main id="main" className="deletedProducts">
          <Link to="/admin" className="btn btn-secondary">
            Back to Admin Page
          </Link>
          <h2>Deleted products</h2>
          <p>
            If you wish to undelete a product, just press "Restore product".
          </p>
          <div className="products">
            {products.map((prod) => {
              const src = "data:image/png;base64, " + prod["image"];
              return (
                <article className="prodcard" key={prod["id"]}>
                  <h3 className="prodcard-name">
                    {prod["brand"] + " " + prod["name"]}
                  </h3>
                  <img className="prodcard-img" src={src} alt={prod["name"]} />
                  <p className="prodcard-desc">{prod["short_desc"]}</p>
                  <button
                    className="btn btn-primary deletedProducts-btn"
                    onClick={() => addProduct(prod["id"])}
                  >
                    Restore product
                  </button>
                  <Link
                    to={"/updateproduct/" + prod["id"]}
                    className="btn btn-primary deletedProducts-update"
                  >
                    Update
                  </Link>
                </article>
              );
            })}
          </div>
        </main>
      </>
    );
  } else if (admin && products.length < 1) {
    return (
      <>
        <Header />
        <main id="main">
          <h1>Deleted products</h1>
          <p>No products are deleted at the moment!</p>
          <Link to="/admin">Back to admin</Link>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <ErrorNoPrivileges />
      </>
    );
  }
};

export default DeletedProducts;
