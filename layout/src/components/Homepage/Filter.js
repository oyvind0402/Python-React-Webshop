import React, { useEffect, useState } from "react";

export const Filter = (props) => {
  const [attributes, updateAttributes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(
        "https://localhost:5000/api/product/distinctvalues"
      );
      let data = await response.json();
      updateAttributes(data);
    };
    loadData();
  }, []);

  let filterOptions = [];

  function searchValues() {
    filterOptions = [];
    attributes.forEach((filter) => filterOptions.push([filter[0], []]));

    const checkedBoxes = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    checkedBoxes.forEach((box) => {
      filterOptions.forEach((filter) => {
        if (filter[0] === box.getAttribute("location")) {
          let inList = false;
          filter[1].forEach((element) => {
            if (element === box.id) {
              inList = true;
            }
          });
          if (!inList) {
            filter[1].push(box.id);
          }
        }
      });
    });

    filterOptions.forEach((filter) => {
      if (filter[0] === "price") {
        //price filter
        let lowValue = document.getElementById("lowInput").value;
        let highValue = document.getElementById("highInput").value;
        if (lowValue !== "" && highValue !== "" && lowValue < highValue) {
          //if values are valid
          filter[1].push(lowValue);
          filter[1].push(highValue);
        }
      }
    });
    props.onchange(filterOptions);
  }

  function filterPrice() {
    let lowValue = document.getElementById("lowInput").value;
    let highValue = document.getElementById("highInput").value;
    if (lowValue >= highValue || lowValue === "" || highValue === "") {
      //if values are not valid
      alert("Wrong input, wasn't able to filter");
    } else {
      searchValues();
    }
  }

  return (
    <div className="filter">
      <h3 className="filter-title">Product filter</h3>
      {attributes.map((att, index) => {
        if (att[0] === "price") {
          return (
            <div key={index} className="filter-by">
              <h4 className="filter-by-title">{att[0]}</h4>
              <input
                id={"lowInput"}
                className={"priceInput"}
                type={"number"}
                min={0}
                max={att[1][1]}
                placeholder={"From"}
              />
              <input
                id={"highInput"}
                className={"priceInput"}
                type={"number"}
                min={0}
                max={att[1][1]}
                placeholder={"To"}
              />
              <div className="filter-btn">
                <button className="btn btn-primary" onClick={filterPrice}>
                  Filter
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="filter-by">
              <h4 className="filter-by-title">{att[0]}</h4>
              <ul>
                {att[1].map((checkbox, index) => {
                  return (
                    <div key={index} className="filter-by-item">
                      <input
                        onChange={searchValues}
                        type={"checkbox"}
                        id={checkbox}
                        name={checkbox}
                        value={checkbox}
                        location={att[0]}
                      />
                      <label className="filter-by-label" htmlFor={checkbox}>
                        {checkbox}
                      </label>
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        }
      })}
      {/*<div className="filter-btn">*/}
      {/*  <button className="btn btn-primary" onClick={() => props.onchange(filterOptions)}>Filter</button>*/}
      {/*</div>*/}
    </div>
  );
};
