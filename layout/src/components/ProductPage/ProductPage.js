import React, {useEffect, useState} from "react";
import { SpecsTable } from "./SpecsTable";

export const ProductPage = (props) => {

      const [product, productUpdate] = useState([
        {"id": "placeholder"},
        {"brand": "placeholder"},
        {"name": "placeholder"},
        {"price": "placeholder"},
        {"color": "placeholder"},
        {"operatingsystem": "placeholder"},
        {"storage": "placeholder"},
        {"short_desc": "placeholder"},
        {"long_desc": "placeholder"},
        {"image": "placeholder"},
      ]);

  useEffect(() => {
    const loadData = async () =>{
      const link = window.location.href
      const sku = link.split("/")[4]
      const apiLink = "http://localhost:5000/api/product/" + sku

      const response = await fetch(apiLink);
      let data = await response.json();
      console.log(data)
      productUpdate(data)
      console.log(product)
      console.log(product[0].name)
    }
    loadData()
  }, []);

  return (
    <main id="main">
      <div className="productpage">
        <h2 className="productpage-title">{product[0].name}</h2>
        <div className="productpage-img">
          <img src={"data:image/png;base64, " + product[0].image} alt={product[0].name} />
        </div>
        <div className="productpage-details">
          <p>{product[0].long_desc}</p>
          <div className="productpage-buy">
            <p className="productpage-price">{product[0].price}</p>
            <button className="btn btn-primary">Add to basket</button>
          </div>
        </div>
      </div>
      <table className="productSpecs">
        <SpecsTable specs={[
                ["brand", product[0].brand],
                ["name", product[0].name],
                ["color", product[0].color],
                ["storage", product[0].storage],
                ["operatingsystem", product[0].operatingsystem]
        ]} />
      </table>
    </main>
  );
};
