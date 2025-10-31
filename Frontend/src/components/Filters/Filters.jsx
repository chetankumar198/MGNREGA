import React from "react";
import "./Filters.css";

const Filters = ({ district, setDistrict, year, setYear, handleFilter }) => {
  return (
    <div className="filters-container">
      <input
        type="text"
        placeholder="🔍 Search District..."
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />
      <input
        type="number"
        placeholder="📅 Year (e.g. 2024)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default Filters;
