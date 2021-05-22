import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { SpecsTable } from "./SpecsTable";
import { useDispatchCart } from "../CartContext/CartProvider";
import { Header } from "../Header/Header";
import { formatNOK } from "../utils";

export const ProductPage = () => {
  const dispatch = useDispatchCart();
  const history = useHistory();

  const addToCart = async (item) => {
    const msg =
      item["brand"] + " " + item["name"] + " has been added to your basket.";
    alert(msg);
    document.getElementById("addBtn").disabled = true;
    const link = window.location.href;
    const sku = link.split("/")[4];
    const apiLink = "https://localhost:5000/api/product/" + sku;

    const response = await fetch(apiLink);
    let data = await response.json();
    productUpdate(data);
    dispatch({ type: "ADD", item });
    reRender("reRender");
    console.log(render);
    setTimeout(() => {
      document.getElementById("addBtn").disabled = false;
    }, 500);
  };

  const [product, productUpdate] = useState({});
  const [render, reRender] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const link = window.location.href;
      const sku = link.split("/")[4];
      const apiLink = "https://localhost:5000/api/product/" + sku;

      const response = await fetch(apiLink);

      if (response.status !== 200) {
        history.push("/404");
      }

      let data = await response.json();
      productUpdate(data);
      return data;
    };
    loadData();
  }, [history]);

  return (
    <>
      <Header />
      <main id="main">
        <div className="productpage">
          <h2 className="productpage-title">
            {product["brand"] + " " + product["name"]}
          </h2>
          <div className="productpage-img">
            <img
              src={"data:image/png;base64, " + product["image"]}
              alt={product["name"]}
            />
          </div>
          <div className="productpage-details">
            <p>{product["long_desc"]}</p>
            <div className="productpage-buy">
              <p className="productpage-price">{formatNOK(product.price)}</p>
              <button
                id="addBtn"
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                Add to basket
              </button>
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
        </div>
      </main>
    </>
  );
};
