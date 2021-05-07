import React, { useEffect, useRef } from "react";

import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export const Home = () => {
  const products = useRef([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      products.current = data;
      for (let i in products.current) {
        console.log(products.current[i]);
      }
    };

    loadData();
  }, []);

  return (
    <main id="main">
        <Filter />
        <div className="products">
            <h2>Our products</h2>
            {products.current.map((prod) => {
              return (
                <ProductCard
                  key={prod.id}
                  name={prod.name}
                  image={prod.image}
                  price={prod.price}
                />
              );
            })}
      </div>
    </main>
  );
};
