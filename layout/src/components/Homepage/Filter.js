import React, {useEffect, useRef, useState} from "react";
import { ProductCard } from "./ProductCard";

export const Filter = (props) => {
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

  const filterOptions = []
    attributes.forEach((value) => filterOptions.push([value[0], []]))

  function searchValues(category, attribute) {
      filterOptions.forEach(filter => {
          if(filter[0].toLocaleLowerCase() === category){ //Searching for matching category
              let inList = false
              filter[1] = filter[1].filter(function(elementInList){ //Looping through array to see if element in array
                  if( elementInList !== attribute){ // no? return element since it remains in the array
                      return elementInList
                  } else { // yes? element will be removed by not adding it to the array
                      inList = true
                  }
              })
              if(inList === false){ // Element not in list? add it
                  filter[1].push(attribute)
              }
          }
      })
  }


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
                            onChange={event => searchValues(att[0], event.target.value)}
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
            <button className="btn btn-primary" onClick={() => props.getProduct(filterOptions)}>Filter</button>
          </div>
        </div>
  );
};
