import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";

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
        <main id="main">
          <Link to="/admin">Back to admin</Link>
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
                  <Link to={"/updateproduct/" + prod["id"]}>
                    <p>Update</p>
                  </Link>
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
        <main id="main">
          <p>You dont have admin privileges...</p>
        </main>
      </>
    );
  }
};

export default UpdateProduct;
