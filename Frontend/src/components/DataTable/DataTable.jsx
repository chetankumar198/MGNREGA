import React from "react";
 import "./DataTable.css";

const DataTable = ({ rows }) => {
  if (!rows.length) return <p>No data available</p>;

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>District</th>
          <th>Month</th>
          <th>Year</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item, index) => (
          <tr key={index}>
            <td>{item.district_name}</td>
            <td>{item.month}</td>
            <td>{item.year}</td>
            <td>{new Date(item.lastUpdated).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
