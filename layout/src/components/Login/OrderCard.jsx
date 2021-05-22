import React from "react";
import { OrderCardItem } from "./OrderCardItem";

export const OrderCard = (props) => {
  const item = props.item;
  return (
    <div className="ordercard">
      <h3>Order #{item["orderID"]}</h3>
      <div className="ordercard-info">
        <div className="ordercard-info-delivery">
          <p>Sent to:</p>
          <p>{item["recipient"]}</p>
          <p>{item["address"]}</p>
        </div>
        <div className="ordercard-info-phone">
          <p>Contact details:</p>
          <p>{item["phone"]}</p>
        </div>
      </div>
      <table>
        <thead>
          <tr className="ordercard-row">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {item["products"].map((prod, index) => {
            return <OrderCardItem key={index} prod={prod} />;
          })}
        </tbody>
      </table>
      <div className="ordercard-btm">
        <p>
          ETA
          <br></br>
          <span className="ordercard-btm-date">32nd Feb 2121</span>
        </p>
        <p className="ordercard-btm-price">
          Total price (incl. discounts) <br></br>{" "}
          <span className="ordercard-btm-value">kr 0,00</span>
        </p>
      </div>
    </div>
  );
};
