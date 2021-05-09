import React from "react";
import { SpecsTable } from "./SpecsTable";

const placeholderSpecs = [
  ["color", "blue"],
  ["size", "12"],
  ["speed", "2.4GHz"],
];

export const ProductPage = () => {
  const test = {
    name: "iPhone 12 Blue",
    image:
      "https://shop.jtglobal.com/wp-content/uploads/2020/10/iphone-12-blue.jpg",
    price: "12.000",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque illum mollitia sint commodi consectetur id reprehenderit voluptates ut unde rem sit iusto odio velit, voluptas aspernatur at iure a fugit?",
  };
  return (
    <main id="main">
      <div className="productpage">
        <h2 className="productpage-title">{test.name}</h2>
        <div className="productpage-img">
          <img src={test.image} alt="" />
        </div>
        <div className="productpage-details">
          <p>{test.description}</p>
          <div className="productpage-buy">
            <p className="productpage-price">{test.price}</p>
            <button className="btn btn-primary">Add to basket</button>
          </div>
        </div>
      </div>
      <table className="productSpecs">
        <SpecsTable specs={placeholderSpecs} />
      </table>
    </main>
  );
};
