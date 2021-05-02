import React from "react";

export const ProductCard = (props) => {
  return (
    <div className="prodcard">
      <h3 className="prodcard-name">{props.name}</h3>
      <img className="prodcard-img" src={props.image} alt="" />
      <p className="prodcard-price">{props.price}</p>
      <button className="prodcard-add">Add to basket</button>
    </div>
  );
};
