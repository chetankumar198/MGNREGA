import React, { useEffect, useState } from "react";
import api from "../../api/api";
import DataTable from "../../components/DataTable/DataTable";
import ChartView from "../../components/ChartView/Chartview";
import "./dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [district, setDistrict] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistrictData();
  }, []);

  const fetchDistrictData = async () => {
    try {
      const res = await api.get("/data/fetch");
      setData(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    let result = [...data];

    if (district)
      result = result.filter((d) =>
        d.district_name?.toLowerCase().includes(district.toLowerCase())
      );

    if (year) result = result.filter((d) => d.year.toString() === year);

    setFiltered(result);
  };

  return (
    <div className="dashboard-page">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="logo">
          🏛️ <span>Government Data Portal</span>
        </div>
        <nav>
          <a href="/dashboard" className="active">Dashboard</a>
          <a href="/about">About</a>
        </nav>
      </header>

      {/* Dashboard Header */}
      <section className="dashboard-header">
        <h1>📈 District Performance Dashboard</h1>
        <p>Comparative overview of key metrics across all districts</p>

        <div className="filters">
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
      </section>

      {/* Main Content */}
      {loading ? (
        <p className="loading">Loading data...</p>
      ) : (
        <div className="dashboard-content">
          <ChartView data={filtered} />
          <DataTable rows={filtered} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
