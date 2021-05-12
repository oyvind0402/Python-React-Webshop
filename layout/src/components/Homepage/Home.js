import React, { useEffect, useState } from "react";

import { Filter } from "./Filter";
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

    let emptyFilter = true;

    filterOptions.forEach((filter) => {
      if(filter[1].length !== 0){
        emptyFilter = false;
      }
    })

    if(emptyFilter){
      updateProducts(data)
    } else {

      let firstFilter = true;

      filterOptions.forEach((filter) => {
        if (filter[1].length !== 0) {
          if(firstFilter){
            newProducts = matchProductsWithFilter(filter, data, newProducts, firstFilter)
            firstFilter = false
          } else{
            newProducts = matchProductsWithFilter(filter, data, newProducts, firstFilter)
          }
        }

      })

      if(newProducts.length === 0){ // if no products left after filtering
        updateProducts(data)
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1000)
        alert("There were no products found")
      } else{
        updateProducts(newProducts)
      }
    }
  }

  function matchProductsWithFilter(filter, apiProducts, newProducts, firstFilter){
    if(firstFilter){ //This is the first filter so all products matching the condition should be added
      filter[1].forEach((element) => { //Loops through all the chosen filters of a category
        apiProducts.forEach((product) => { //Loops through all the products received from API
          for (let attribute in product) { // Looks at all the attributes of a product
            if (filter[0] == attribute) { //if chosen filter match the product attribute continue
              if (element == product[attribute]) { // if element in filter equals product value we want it to add
                newProducts.push(product); // all products matching the condition will be added
              }
            }
          }
        })
      })
      return newProducts
    } else { // first products have been added so now we need to remove them according to the other filters
      let renewedFilterProducts = []
      newProducts.filter((filterProduct) => {
        filter[1].forEach((element) => { //Loops through all the chosen filters of a category
          for (let attribute in filterProduct) { // Looks at all the attributes of the filtered product
            if (filter[0] == attribute) { //if chosen filter match the product attribute continue
              if (element == filterProduct[attribute]) { // if element in filter equals product value we want it to add
                renewedFilterProducts.push(filterProduct) // this product matches all the condition
                //products that dont match the condition will not be returned and therefore removed from the array
              }
            }
          }
        })
      })
      return renewedFilterProducts
    }
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
