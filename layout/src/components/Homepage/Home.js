import React, { useEffect, useState } from "react";

import { Filter } from "./Filter";
// import Filter from "./FilterClass";
import { ProductCard } from "./ProductCard";


export default function Home(props) {
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    const loadData = async () =>{
      const response = await fetch("http://localhost:5000/api/products");
      let data = await response.json();
      updateProducts(data);
    }
    loadData()
  }, []);

  async function getProduct(filterOptions) {
    const response = await fetch("http://localhost:5000/api/products");
    let data = await response.json();
    let newProducts = [];

    filterOptions.forEach((filter) => { //Loops through all the filters
      if (filter[1].length !== 0) { //If filter is not empty we will have a further look
        filter[1].forEach((element) => { //Loops through all the elements of a attribute
          data.forEach((product) => { //Loops through all the products received from API
            for (let attribute in product) { // Looks at all the attributes of a product
              if (filter[0].toLowerCase() === attribute) { //if the match continue
                if (element.toLowerCase() === product[attribute].toLowerCase()) { // if element in filter equals from api we want it to show
                  let alreadyInList = false;
                  newProducts.forEach((oldProduct) => { //Checks if product is already in list
                    if (oldProduct === product) {
                      alreadyInList = true;
                    }
                  })
                  if (!alreadyInList) {
                    newProducts.push(product);
                  }
                }
              }
            }
          })
        })
      }
    })

    updateProducts(newProducts);
  }



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
