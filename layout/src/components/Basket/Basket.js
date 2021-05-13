import React, {useEffect, useState} from "react";
import { useCart, useDispatchCart } from "../CartContext/CartProvider";
import { BasketCard } from "./BasketCard";

//TODO Bring actual data in
//TODO Make everything-is-free discount page
//TODO Implement state for quantity change

export const Basket = () => {
  // const [products, updateProducts] = useState([]);
    const products = useCart();
  const dispatch = useDispatchCart();
  const totalPrice = products.reduce((total, b) => total + b.price, 0);

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

    // useEffect(() => {
    //     const array = useCart();
    //     updateProducts(array)
    // }, []);

  if (products.length === 0) {
    return (
      <main>
        <p>Cart is empty</p>
      </main>
    );
  }

  // const basketprice = () => {
  //   let total = 0;
  //   products.map((prod) => {
  //     return (total += prod.price.replace(".", "") * prod.quantity);
  //   });
  //   return total;
  // };
  return (
    <main id="main">
      <h2>Your shopping basket</h2>
      <div>
        {products.map((item, index) => {
          return (
            <BasketCard
              handleRemove={handleRemove}
              key={index}
              product={item}
              index={index}
            />
          );
        })}
      </div>
      <div className="basket-pay">
        <div className="basket-pay-total">
          <p>
            Total price:{" "}
            {totalPrice.toLocaleString("en", {
              style: "currency",
              currency: "NOK",
            })}{" "}
          </p>
        </div>
        <button className="btn btn-primary basket-pay-btn">
          Go to payment
        </button>
      </div>
    </main>
  );
};
