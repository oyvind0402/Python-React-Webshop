import React from "react";
import { formatNOK } from "../utils";

export const OrderCardItem = (props) => {
  const prod = props.prod;
  return (
    <tr key={prod["id"]} className="ordercard-row">
      <td>
        {prod["brand"]} {prod["name"]}
      </td>
      <td>{formatNOK(prod["price"])}</td>
      <td>{prod["quantity"]}</td>
    </tr>
  );
};
