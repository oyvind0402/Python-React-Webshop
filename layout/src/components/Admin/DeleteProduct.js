import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../Header/Header";

const DeleteProduct = () => {
  const [admin, setAdmin] = useState(false);
  const [products, updateProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      let data = await response.json();
      updateProducts(data);
    };
    loadData();
  }, []);

  async function deleteProduct(id) {
    const response2 = await fetch(
      `http://localhost:5000/api/product/delete/${id}`,
      {
        method: "POST",
      }
    );
    const response = await fetch("http://localhost:5000/api/products");
    let data = await response.json();
    updateProducts(data);
  }

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
                <article className="prodcard">
                  <h3 className="prodcard-name">
                    {prod["brand"] + " " + prod["name"]}
                  </h3>
                  <img className="prodcard-img" src={src} alt={prod["name"]} />
                  <p className="prodcard-desc">{prod["short_desc"]}</p>
                  <button
                    className="btn"
                    onClick={() => deleteProduct(prod["id"])}
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
        <main id="main">
          <p>You dont have admin privileges...</p>
        </main>
      </>
    );
  }
};

export default DeleteProduct;
