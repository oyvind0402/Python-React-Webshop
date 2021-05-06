import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
  function b(e) {
    alert("Works");
    console.log();
  }

  return (
    //TODO Make article clickable
    <article className="prodcard">
      <h3 className="prodcard-name">{props.name}</h3>
      <img className="prodcard-img" src={props.image} alt="" />
      <p className="prodcard-price">{props.price}</p>
      <Link to="/product" className="prodcard-more">
        <p>ⓘ Read more</p>
      </Link>
      <button className="btn btn-primary prodcard-add" onClick={b}>
        Add to basket
      </button>
    </article>
  );
};
