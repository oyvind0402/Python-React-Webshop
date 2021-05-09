import React, { useEffect, useRef } from "react";
import "../../styles/layout/_filter.scss";
import {ProductCard} from "./ProductCard";


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

    const attributes = [["brand", ["samung", "apple", "nokia"]], ["color", ["yellow", "green", "blue"]]];

    return (
        <div id="filter">
            <h3>Product filter</h3>
            {attributes.map((att) => {
                return (
                    <div className={"filterOption"}>
                        <h4>{att[0]}</h4>
                        <ul>
                            {att[1].map((checkbox) => {
                                return (
                                    <div className={"checkbox"}>
                                        <input type={"checkbox"} id={checkbox} name={checkbox} value={checkbox}/>
                                        <label htmlFor={checkbox}>{checkbox}</label>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                );
                })}
            <div className={"filterOption"}>
                <button className={"filterButton"}>Filter</button>
            </div>
        </div>
    );
};
