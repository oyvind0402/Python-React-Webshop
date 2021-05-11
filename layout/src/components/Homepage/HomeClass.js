import React, {useEffect, useState} from "react";

// import { Filter } from "./Filter";
import Filter from "./FilterClass";
import { ProductCard } from "./ProductCard";

export const Home = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    console.log(Filter.state)
    const loadData = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    loadData();
  }, []);

  return (
    <main id="main">
      <h2>Our products</h2>
      <div className="home">
        <Filter className="home-filter" getNewProduct={this.getNewProducts}/>
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
