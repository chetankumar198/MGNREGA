import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/data", dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("✅ API is running!");
});