import React, { useEffect, useState } from "react";

import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    loadData();
  }, []);

  return (
    <main id="main">
      {/* <Filter /> */}
      <h2>Our products</h2>
      <div className="products">
        {products.map((prod) => {
          return (
            <ProductCard
              key={prod["id"]}
              brand={prod["brand"]}
              name={prod["name"]}
              image={prod["image"]}
              price={prod["price"]}
            />
          );
        })}
      </div>
    </main>
  );
};
