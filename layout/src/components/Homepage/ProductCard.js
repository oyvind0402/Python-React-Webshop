import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useDispatchCart } from "../CartContext/CartProvider";

export const ProductCard = ( props ) => {


    const dispatch = useDispatchCart();

  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
    props.onchange(props.filter)
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
      <p className="prodcard-price">{props.product["price"]}</p>
      <button
        className="btn btn-primary prodcard-add"
        onClick={() => addToCart(props.product)}
      >
        Add to basket
      </button>
    </article>
  );
};
