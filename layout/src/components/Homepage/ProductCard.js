import React from "react";
import { Link } from "react-router-dom";
import { useDispatchCart } from "../CartContext/CartProvider";
import { formatNOK } from "../utils";

export const ProductCard = (props) => {
  const dispatch = useDispatchCart();

  const addToCart = (item) => {
    document.getElementById("button" + props.product["id"]).disabled = true;
    dispatch({ type: "ADD", item });
    props.onchange(props.filter);
    setTimeout(() => {
      document.getElementById("button" + props.product["id"]).disabled = false;
    }, 500);
  };

  const src = "data:image/png;base64, " + props.product["image"];
  return (
    //TODO Make article clickable
    <article className="prodcard">
      <h3 className="prodcard-name">
        {props.product["brand"] + " " + props.product["name"]}
      </h3>
      <img className="prodcard-img" src={src} alt="" />
      <p className="prodcard-desc">{props.product["short_desc"]}</p>
      <Link to={"/product/" + props.product["id"]} className="prodcard-more">
        <p>ⓘ Read more</p>
      </Link>
      <p className="prodcard-price">{formatNOK(props.product["price"])}</p>
      <button
        className="btn btn-primary prodcard-add"
        id={"button" + props.product["id"]}
        onClick={() => addToCart(props.product)}
      >
        Add to basket
      </button>
    </article>
  );
};
