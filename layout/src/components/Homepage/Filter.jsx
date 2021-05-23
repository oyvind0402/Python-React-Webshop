import React, { useEffect, useState } from "react";

export const Filter = (props) => {
  const [attributes, updateAttributes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(
        "https://localhost:5000/api/product/distinctvalues"
      );
      let data = await response.json();
      updateAttributes(data); // load all the possible unique values
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
    checkedBoxes.forEach((box) => { // loops through all the checkboxes and see it they are checked ot not
      filterOptions.forEach((filter) => {
        if (filter[0] === box.getAttribute("location")) { // location is parent Brand is the location of Apple
          let inList = false;
          filter[1].forEach((element) => { // check if it already was in the list
            if (element === box.id) {
              inList = true;
            }
          });
          if (!inList) { // not in the list? let's add it
            filter[1].push(box.id);
          }
        }
      });
    });

    filterOptions.forEach((filter) => { // Since filter is depended on two variable both need to be checked
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
    props.onchange(filterOptions); // Filtervalues get send to the homepage where they will be compared with the products
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
        } else if (att[0] === "storage") {
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
                      <label
                        className="filter-by-label filter-by-storage"
                        htmlFor={checkbox}
                      >
                        {checkbox}
                      </label>
                    </div>
                  );
                })}
              </ul>
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
    </div>
  );
};
