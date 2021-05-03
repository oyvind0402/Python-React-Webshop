import React from "react";

import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export const Home = () => {
  const products = [
    {
      name: "iPhone 12 Blue",
      image:
        "https://shop.jtglobal.com/wp-content/uploads/2020/10/iphone-12-blue.jpg",
      price: "12.000",
    },
    {
      name: "iPhone 12 Pink",
      image:
        "https://shop.jtglobal.com/wp-content/uploads/2020/10/iphone-12-red.jpg",
      price: "12.000",
    },
    {
      name: "iPhone 12 Grey",
      image:
        "https://pcparts.com.uy/wp-content/uploads/2020/11/PCPIPHONE12PRO.png",
      price: "12.000",
    },
  ];

  return (
    <main id="main">
      <h2>Our products</h2>
      <div className="products">
        {products.map((prod) => {
          return (
            <ProductCard
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
