import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
  function b(e) {
    alert("Works");
    console.log();
  }
  const src = "data:image/png;base64, " + props.image;
  return (
    //TODO Make article clickable
    <article className="prodcard">
      <h3 className="prodcard-name">{props.brand + " " + props.name}</h3>
      <img className="prodcard-img" src={src} alt="" />
      <p className="prodcard-desc">{props.sdesc}</p>
      <Link to={"/product/" + props.id} className="prodcard-more">
        <p>ⓘ Read more</p>
      </Link>
      <p className="prodcard-price">{props.price}</p>
      <button className="btn btn-primary prodcard-add" onClick={b}>
        Add to basket
      </button>
    </article>
  );
};
