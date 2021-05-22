import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import { ErrorNoPrivileges } from "./ErrorNoPrivileges";

const DeleteProduct = () => {
  const [admin, setAdmin] = useState(false);
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
    const loadData = async () => {
      const response = await fetch("https://localhost:5000/api/products");
      let data = await response.json();
      updateProducts(data);
    };
    loadData();
  }, []);

  async function deletePhone(id) {
    await fetch(`https://localhost:5000/api/product/delete/${id}`, {
      method: "POST",
    });
    const response = await fetch("https://localhost:5000/api/products");
    let data = await response.json();
    updateProducts(data);
  }

  if (admin) {
    return (
      <>
        <Header />
        <main id="main">
          <Link to="/admin" className="btn btn-secondary">
            Back to Admin Page
          </Link>
          <div className="products">
            {products.map((prod) => {
              const src = "data:image/png;base64, " + prod["image"];
              return (
                <article className="prodcard">
                  <h3 className="prodcard-name">
                    {prod["brand"] + " " + prod["name"]}
                  </h3>
                  <img className="prodcard-img" src={src} alt={prod["name"]} />
                  <p className="prodcard-desc">{prod["short_desc"]}</p>
                  <button
                    className="btn btn-primary deletedProducts-btn"
                    onClick={() => deletePhone(prod["id"])}
                  >
                    Delete
                  </button>
                </article>
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
        <ErrorNoPrivileges />
      </>
    );
  }
};

export default DeleteProduct;
