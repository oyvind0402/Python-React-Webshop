import React from "react";

/**
 *
 * @param   {Array}    data
 * @returns HTML for table body
 */
export const SpecsTable = (data) => {
  return (
    <tbody>
      {data.specs.map((spec, index) => {
        return (
          <tr className="productSpecs-row" key={index}>
            <td className="productSpecs-name">{spec[0]}</td>
            <td className="productSpecs-value productSpecs-no-caps">
              {spec[1]}
            </td>
            <td className="productSpecs-value">{spec[2]}</td>
            <td className="productSpecs-value">{spec[3]}</td>
            <td className="productSpecs-value productSpecs-no-caps">
              {spec[4]}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
