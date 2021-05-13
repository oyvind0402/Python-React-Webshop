import React, { useEffect, useState } from "react";
import { SpecsTable } from "./SpecsTable";
import { useDispatchCart } from "../CartContext/CartProvider";

export const ProductPage = () => {
  const dispatch = useDispatchCart();

  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
  };

  const [product, productUpdate] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const link = window.location.href;
      const sku = link.split("/")[4];
      const apiLink = "http://localhost:5000/api/product/" + sku;

      const response = await fetch(apiLink);
      let data = await response.json();
      productUpdate(data);
    };
    loadData();
  }, []);

  return (
    <main id="main">
      <div className="productpage">
        <h2 className="productpage-title">{product["name"]}</h2>
        <div className="productpage-img">
          <img
            src={"data:image/png;base64, " + product["image"]}
            alt={product["name"]}
          />
        </div>
        <div className="productpage-details">
          <p>{product["long_desc"]}</p>
          <div className="productpage-buy">
            <p className="productpage-price">{product["name"]}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
            >
              Add to basket
            </button>
          </div>
        </div>
      </div>
      <table className="productSpecs">
        <SpecsTable
          specs={[
            ["brand", product["brand"]],
            ["name", product["name"]],
            ["color", product["color"]],
            ["storage", product["storage"]],
            ["operatingsystem", product["operatingsystem"]],
          ]}
        />
      </table>
    </main>
  );
};
