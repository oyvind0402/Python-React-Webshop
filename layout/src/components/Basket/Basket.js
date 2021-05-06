import React from "react";

import { BasketCard } from "./BasketCard";

export const Basket = () => {
  const products = [
    {
      name: "iPhone 12 Blue",
      image:
        "https://shop.jtglobal.com/wp-content/uploads/2020/10/iphone-12-blue.jpg",
      price: "12.000",
      quantity: 2,
    },
    {
      name: "iPhone 12 Pink",
      image:
        "https://shop.jtglobal.com/wp-content/uploads/2020/10/iphone-12-red.jpg",
      price: "12.000",
      quantity: 4,
    },
    {
      name: "iPhone 12 Grey",
      image:
        "https://pcparts.com.uy/wp-content/uploads/2020/11/PCPIPHONE12PRO.png",
      price: "12.000",
      quantity: 1,
    },
  ];

  return (
    <main id="main">
      <h2>Your shopping basket</h2>
      <div className="basket">
        {products.map((prod) => {
          return (
            <BasketCard
              name={prod.name}
              image={prod.image}
              price={prod.price}
              quantity={prod.quantity}
            />
          );
        })}
      </div>
      <div className="basket-pay-btn">
        <button className="btn btn-primary">Go to payment</button>
      </div>
    </main>
  );
};
