import React from "react";

import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export const Home = () => {
  function render_products(data) {
    for (let i in data) {
      console.log(data[i]);
    }
  }

  fetch("http://localhost:5000/api/products")
    .then((response) => response.json())
    .then((data) => render_products(data));
  return (
    <main id="main">
      <h2>Our products</h2>
      <div className="products">
        {/* {products.map((prod) => {
          return (
            <ProductCard
              key={prod.id}
              name={prod.name}
              image={prod.image}
              price={prod.price}
            />
          );
        })} */}
      </div>
    </main>
  );
};
