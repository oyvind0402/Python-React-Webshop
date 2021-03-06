import React, { useEffect, useState } from "react";

import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";
import { Header } from "../Header/Header";

export default function Home() {
  const [products, updateProducts] = useState([]);
  const [filter, updateFilter] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      document
        .getElementById("noProducts")
        .style.setProperty("display", "none");
      const response = await fetch("https://localhost:5000/api/products");
      let data = await response.json();
      updateProducts(data); // initial products are loaded in here
    };
    loadData();
  }, []);

  async function getProduct(filterOptions) {
    const response = await fetch("https://localhost:5000/api/products");
    let data = await response.json();
    let newProducts = [];

    let emptyFilter = true;

    filterOptions.forEach((filter) => {
      if (filter[1].length !== 0) { // if one of the filters isn't empty it will be sett to false
        emptyFilter = false;
      }
    });
    if (emptyFilter) { // no filters are selected so all the products will show
      updateProducts(data);
      document
        .getElementById("noProducts")
        .style.setProperty("display", "none");
    } else { // there is a filter(s) selected so now we need to loop through filter array and product array
      let firstFilter = true;

      filterOptions.forEach((filter) => {
        if (filter[1].length !== 0) {
          if (firstFilter) { // First filter will function as a base here all the product that match the values will be included
            if (filter[0] === "price") { // since price is depended on two inputs it goes to a different function
              newProducts = filterPrice(filter, data, newProducts, firstFilter);
            } else {
              newProducts = matchProductsWithFilter( // the selected filter (could be brand, color, size) is being send to the function to compare with the products
                filter,
                data,
                newProducts,
                firstFilter
              );
            }
            firstFilter = false;
          } else { //if firstFilter has been used, products need to be deducted based on the next criteria
            if (filter[0] === "price") { // since price is depended on two inputs it goes to a different function
              newProducts = filterPrice(filter, data, newProducts, firstFilter);
            } else {
              newProducts = matchProductsWithFilter( // the selected filter (could be brand, color, size) is being send to the function to compare with the products
                filter,
                data,
                newProducts,
                firstFilter
              );
            }
          }
        }
      });

      if (newProducts.length === 0) { // if no product match the condition. The noProducts will show
        updateProducts([]);
        updateFilter(filterOptions);
        document
          .getElementById("noProducts")
          .style.setProperty("display", "block");
      } else { // The useState of products is set here and the page will be rerendered
        updateProducts(newProducts);
        updateFilter(filterOptions);
        document
          .getElementById("noProducts")
          .style.setProperty("display", "none");
      }
    }
  }

  function matchProductsWithFilter(
    filter,
    apiProducts,
    newProducts,
    firstFilter
  ) {
    if (firstFilter) {
      //This is the first filter so all products matching the condition should be added
      filter[1].forEach((element) => {
        //Loops through all the chosen filters of a category
        apiProducts.forEach((product) => {
          //Loops through all the products received from API
          for (let attribute in product) {
            // Looks at all the attributes of a product
            if (filter[0] === attribute) {
              //if chosen filter match the product attribute continue
              if (element == product[attribute]) {
                // the element is string and product[attribute] can i case of storage be int therefore two ==
                // if element in filter equals product value we want it to add
                newProducts.push(product); // all products matching the condition will be added
              }
            }
          }
        });
      });
      return newProducts;
    } else {
      // first products have been added so now we need to remove them according to the other filters
      let tempProducts = [];
      newProducts.filter((filterProduct) => {
        filter[1].forEach((element) => {
          //Loops through all the chosen filters of a category
          for (let attribute in filterProduct) {
            // Looks at all the attributes of the filtered product
            if (filter[0] === attribute) {
              //if chosen filter match the product attribute continue
              if (element == filterProduct[attribute]) {
                // the element is string and product[attribute] can i case of storage be int therefore two ==
                // if element in filter equals product value we want it to add
                tempProducts.push(filterProduct); // this product matches all the condition
                //products that dont match the condition will not be returned and therefore removed from the array
              }
            }
          }
        });
        return newProducts;
      });
      return tempProducts;
    }
  }

  function filterPrice(filter, apiProducts, newProducts, firstFilter) {
    let lowestValue = filter[1][0]; //lowest value (first value)
    let highestValue = filter[1][1]; //highest value (first value)

    if (firstFilter) {
      // we have to add products
      apiProducts.filter((product) => {
        for (let attribute in product) {
          if (filter[0] === attribute) {
            if (
              product[attribute] >= lowestValue &&
              product[attribute] <= highestValue
            ) {
              newProducts.push(product);
            }
          }
        }
        return apiProducts;
      });
      return newProducts;
    } else {
      //we have to remove products
      let tempProducts = [];
      newProducts.filter((product) => {
        for (let attribute in product) {
          if (filter[0] === attribute) {
            if (
              product[attribute] > lowestValue &&
              product[attribute] < highestValue
            ) {
              //compare price of product with value
              tempProducts.push(product);
            }
          }
        }
        return newProducts;
      });
      return tempProducts;
    }
  }

  return (
    <>
      <Header />
      <main id="main">
        <h2>Our products</h2>
        <div className="home">
          <Filter
            className="home-filter"
            onchange={(filter) => getProduct(filter)}
          />
          <div className="products">
            {products.map((prod) => {
              return (
                <ProductCard
                  key={prod["id"]}
                  product={prod}
                  filter={filter}
                  onchange={(filter) => getProduct(filter)}
                />
              );
            })}
          </div>
          <p id={"noProducts"}>No products found</p>
        </div>
      </main>
    </>
  );
}
