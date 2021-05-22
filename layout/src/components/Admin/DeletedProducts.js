import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";

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
        <main id="main">
          <h1>Deleted products</h1>
          <p>If you wish to undelete a product, just press "Add product".</p>
          <Link to="/admin">Back to admin</Link>
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
                    className="btn btn-primary"
                    onClick={() => addProduct(prod["id"])}
                  >
                    Add product
                  </button>
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
        <main id="main">
          <p>You do not have admin privileges...</p>
        </main>
      </>
    );
  }
};

export default DeletedProducts;
