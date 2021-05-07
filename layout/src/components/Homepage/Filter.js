import React, { useEffect, useRef } from "react";
import "../../styles/layout/_filter.scss";


export const Filter = () => {
    const products = useRef([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("http://localhost:5000/api/products");
            const data = await response.json();
            products.current = data;
            for (let i in products.current) {
                console.log(products.current[i]);
            }
        };

        loadData();
    }, []);

    return (
        <div id="filter">
            <h3>Product filter</h3>
            <div className={"filterOption"}>
                <h4>Brand</h4>
                <ul>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} id={"Apple"} name={"Apple"} value={"Apple"} />
                        <label for={"Apple"}>Apple</label>
                    </div>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} id={"Apple"} name={"Apple"} value={"Apple"}/>
                        <label htmlFor={"Apple"}>Apple</label>
                    </div>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} id={"Apple"} name={"Apple"} value={"Apple"}/>
                        <label htmlFor={"Apple"}>Apple</label>
                    </div>
                </ul>
            </div>
            <div className={"filterOption"}>
                <h4>Brand</h4>
                <ul>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} id={"Apple"} name={"Apple"} value={"Apple"}/>
                        <label htmlFor={"Apple"}>Apple</label>
                    </div>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} id={"Apple"} name={"Apple"} value={"Apple"}/>
                        <label htmlFor={"Apple"}>Apple</label>
                    </div>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} id={"Apple"} name={"Apple"} value={"Apple"}/>
                        <label htmlFor={"Apple"}>Apple</label>
                    </div>
                </ul>
            </div>
            <div className={"filterOption"}>
                <button className={"filterButton"}>Filter</button>
            </div>
        </div>
    );
};
