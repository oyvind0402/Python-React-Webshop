import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import { ErrorNoPrivileges } from "./ErrorNoPrivileges";

const UpdateProduct = () => {
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

  if (admin) {
    return (
      <>
        <Header />
        <main id="main" className="updateProduct">
          <p>
            <Link to="/admin" className="btn btn-secondary">
              Back to Update Products page
            </Link>
          </p>
          <p>
            <Link to="/admin" className="btn btn-secondary">
              Back to Admin Page
            </Link>
          </p>
          <div className="products">
            {products.map((prod) => {
              const src = "data:image/png;base64, " + prod["image"];
              return (
                <article key={prod["id"]} className="prodcard">
                  <h3 className="prodcard-name">
                    {prod["brand"] + " " + prod["name"]}
                  </h3>
                  <img className="prodcard-img" src={src} alt={prod["name"]} />
                  <p className="prodcard-desc">{prod["short_desc"]}</p>
                  <p className="updateProduct-btn">
                    <Link
                      to={"/updateproduct/" + prod["id"]}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </p>
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

export default UpdateProduct;
