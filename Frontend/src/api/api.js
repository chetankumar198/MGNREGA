import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api" || "https://government-five.vercel.app/", // your backend
});

export default api;
// hEMNAT
