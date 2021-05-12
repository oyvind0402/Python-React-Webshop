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
            if(filter[0] === "price") {
              newProducts = filterPrice(filter, data, newProducts, firstFilter)
            } else {
              newProducts = matchProductsWithFilter(filter, data, newProducts, firstFilter)
            }
            firstFilter = false
          } else{
            if(filter[0] === "price") {
              newProducts = filterPrice(filter, data, newProducts, firstFilter)
            } else {
              newProducts = matchProductsWithFilter(filter, data, newProducts, firstFilter)
            }
          }
        }
      })

      if(newProducts.length === 0){ // if no products left after filtering
        updateProducts(data)
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1000) //small delay so products can catch up
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
      let tempProducts = []
      newProducts.filter((filterProduct) => {
        filter[1].forEach((element) => { //Loops through all the chosen filters of a category
          for (let attribute in filterProduct) { // Looks at all the attributes of the filtered product
            if (filter[0] == attribute) { //if chosen filter match the product attribute continue
              if (element == filterProduct[attribute]) { // if element in filter equals product value we want it to add
                tempProducts.push(filterProduct) // this product matches all the condition
                //products that dont match the condition will not be returned and therefore removed from the array
              }
            }
          }
        })
      })
      return tempProducts
    }
  }

  function filterPrice(filter, apiProducts, newProducts, firstFilter){
    let lowestValue = filter[1][0] //lowest value (first value)
    let highestValue = filter[1][1] //highest value (first value)

    if(firstFilter){ // we have to add products
      apiProducts.filter((product) =>{
        for (let attribute in product) {
          if (filter[0] === attribute) {
            if(product[attribute] >= lowestValue && product[attribute] <= highestValue){
              newProducts.push(product)
            }
          }
        }
      })
      return newProducts
    } else { //we have to remove products
      let tempProducts = []
      newProducts.filter((product) =>{
        for (let attribute in product) {
          if (filter[0] === attribute) {
            if(product[attribute] > lowestValue && product[attribute] < highestValue){ //compare price of product with value
              tempProducts.push(product)
            }
          }
        }
      })
      return tempProducts
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
