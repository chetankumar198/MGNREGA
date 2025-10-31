import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api" || "https://mgnrega-bo1upod7i-chetankumar198s-projects.vercel.app/", // your backend
});

export default api;
// hEMNAT
