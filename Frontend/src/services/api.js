// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/data";

export const fetchAllData = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/fetch`);
    return res.data;
  } catch (err) {
    console.error("Error fetching all data:", err);
    return [];
  }
};

export const fetchDistrictData = async (district) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${district}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching district data:", err);
    return null;
  }
};
