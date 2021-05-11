import React, { useEffect, useState } from "react";

import { Filter } from "./Filter";
// import Filter from "./FilterClass";
import { ProductCard } from "./ProductCard";


export default function Home(props) {
  const [products, setProducts] = useState([]);

  async function getProduct(filterOptions) {
    console.log(filterOptions)
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    setProducts(data);
    console.log("setProducts is updated")
  }

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    loadData();
  }, []);


  // const [attribute, setAttribute] = useState({})
  //
  // const changeState = (filterOption) => {
  //   setstate({});
  // };

  return (
    <main id="main">
      <h2>Our products</h2>
      <div className="home">
        <Filter className="home-filter" onchange={(filter) => getProduct(filter)}/>
        <div className="products">
          {products.map((prod) => {
            return (
              <ProductCard
                key={prod["id"]} //TODO Is there a reason why this is key? Bc it's failing for me
                id={prod["id"]}
                brand={prod["brand"]}
                name={prod["name"]}
                sdesc={prod["short_desc"]}
                image={prod["image"]}
                price={prod["price"]}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};
