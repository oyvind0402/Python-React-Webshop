import React, {useEffect, useRef, useState} from "react";

export const Filter = (props) => {

    const [attributes, updateAttributes] = useState([]);

    useEffect(() => {
        const loadData = async () =>{
            const response = await fetch("http://localhost:5000/api/product/distinctvalues");
            let data = await response.json();
            updateAttributes(data);
        }
        loadData()
    }, []);

  // const attributes = [
  //   ["brand", ["Samsung", "Apple", "Xiaomi"]],
  //   ["color", ["Purple", "Green", "Blue"]],
  // ];
    let filterOptions = []

    function searchValues(category, attribute, checked) {
       filterOptions = []
       attributes.forEach((filter) => filterOptions.push([filter[0], []]))

      const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
      checkedBoxes.forEach((box) => {
          filterOptions.forEach(filter => {
              if (filter[0] === box.getAttribute("location")) {
                  let inList = false
                  filter[1].forEach((element) => {
                      if(element === box.id){
                          inList = true
                      }
                  })
                  if(!inList){
                      filter[1].push(box.id)
                  }
              }
          })
      })
      props.onchange(filterOptions)

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
                    return (
                      <div className="filter-by-item">
                        <input
                            onChange={event => searchValues(att[0], event.target.value, event.target.checked)}
                          type="checkbox"
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
          })}
          {/*<div className="filter-btn">*/}
          {/*  <button className="btn btn-primary" onClick={() => props.onchange(filterOptions)}>Filter</button>*/}
          {/*</div>*/}
        </div>
  );
};
