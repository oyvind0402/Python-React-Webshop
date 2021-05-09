import React, { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";

export const Filter = () => {
  // const attributes = useRef([]);

  // useEffect(() => {
  // const loadData = async () => {
  //     // const response = await fetch("http://localhost:5000/api/getAllAtributes");
  //     // const data = await response.json();
  //     // attributes.current = data;
  //     // for (let i in attributes.current) {
  //     //     console.log(attributes)
  //     // }
  // };

  //     const attributes = [["brand", ["samung", "apple", "nokia"]], ["color", ["yellow", "green", "blue"]]];
  //
  //
  //     loadData();
  // }, []);

  const attributes = [
    ["brand", ["samsung", "apple", "nokia"]],
    ["color", ["yellow", "green", "blue"]],
  ];

  return (
    <div className="filter">
      <h3 className="filter-title">Product filter</h3>
      {attributes.map((att) => {
        return (
          <div className="filter-by">
            <h4 className="filter-by-title">{att[0]}</h4>
            <ul>
              {att[1].map((checkbox) => {
                const parsedCheckbox = checkbox.replace(" ", "-");
                return (
                  <div className="filter-by-item">
                    <input
                      type="checkbox"
                      id={parsedCheckbox}
                      name={parsedCheckbox}
                      value={checkbox}
                    />
                    <label className="filter-by-label" htmlFor={parsedCheckbox}>
                      {checkbox}
                    </label>
                  </div>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className="filter-btn">
        <button className="btn btn-primary">Filter</button>
      </div>
    </div>
  );
};
