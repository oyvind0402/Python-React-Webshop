import React from "react";
import { Link } from "react-router-dom";
import { useDispatchCart } from "../CartContext/CartProvider";
import { formatNOK } from "../utils";

export const ProductCard = (props) => {
  const dispatch = useDispatchCart();

  const addToCart = (item) => {
    const msg =
      props.product["brand"] +
      " " +
      props.product["name"] +
      " has been added to your basket.";
    alert(msg);
    //Disabling the button when adding a product to the basket to let it finish.
    setTimeout(() => {
      document.getElementById("button" + props.product["id"]).disabled = true;
    }, 25);
    dispatch({ type: "ADD", item });
    props.onchange(props.filter);
    setTimeout(() => {
      document.getElementById("button" + props.product["id"]).disabled = false;
    }, 200);
  };

  const src = "data:image/png;base64, " + props.product["image"];
  return (
    <article className="prodcard">
      <Link to={"/product/" + props.product["id"]} className="prodcard-more">
        <h3 className="prodcard-name">
          {props.product["brand"] + " " + props.product["name"]}
        </h3>
        <div className="prodcard-img">
          <img src={src} alt={props.product["name"]} />
        </div>
        <p className="prodcard-desc">{props.product["short_desc"]}</p>
        <p>ⓘ Read more</p>
        <p className="prodcard-price">{formatNOK(props.product["price"])}</p>
      </Link>
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
