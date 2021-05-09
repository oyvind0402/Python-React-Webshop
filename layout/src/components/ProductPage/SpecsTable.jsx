import React from "react";

/**
 *
 * @param   {Array}    data
 * @returns HTML for table body
 */
export const SpecsTable = (data) => {
  console.log(data.specs);
  return (
    <tbody>
      {data.specs.map((spec) => {
        return (
          <tr className="productSpecs-row">
            <td className="productSpecs-name">{spec[0]}</td>
            <td className="productSpecs-value">{spec[1]}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
