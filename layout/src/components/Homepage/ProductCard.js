import React from "react";
import { Link } from "react-router-dom";
import { useDispatchCart } from "../CartContext/CartProvider";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatchCart();

  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
  };

  const src = "data:image/png;base64, " + product["image"];
  return (
    //TODO Make article clickable
    <article className="prodcard">
      <h3 className="prodcard-name">
        {product["brand"] + " " + product["name"]}
      </h3>
      <img className="prodcard-img" src={src} alt="" />
      <p className="prodcard-desc">{product["short_desc"]}</p>
      <Link to={"/product/" + product["id"]} className="prodcard-more">
        <p>ⓘ Read more</p>
      </Link>
      <p className="prodcard-price">{product["price"]}</p>
      <button
        className="btn btn-primary prodcard-add"
        onClick={() => addToCart(product)}
      >
        Add to basket
      </button>
    </article>
  );
};
