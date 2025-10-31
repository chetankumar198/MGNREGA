import express from "express";
import axios from "axios";
import Performance from "../models/Performance.js";

const router = express.Router();

// 📦 Fetch all records
router.get("/fetch", async (req, res) => {
  try {
    const data = await Performance.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// 🔄 Insert or update records from API
router.post("/insert", async (req, res) => {
  try {
    const apiUrl = `${process.env.DATA_GOV_API}?format=json&api-key=${process.env.DATA_GOV_KEY}`;
    const { data } = await axios.get(apiUrl);

    if (!data.records || data.records.length === 0) {
      return res.status(404).json({ message: "No records found from API" });
    }

    const validRecords = data.records.filter((r) => r.district_name);
    const records = validRecords.map((record) => ({
      district_name: record.district_name.trim(),
      month: record.month || "N/A",
      year: record.fin_year ? parseInt(record.fin_year.split("-")[0]) : 2024,
      metrics: record,
    }));

    for (const rec of records) {
      await Performance.findOneAndUpdate(
        {
          district_name: rec.district_name,
          month: rec.month,
          year: rec.year,
        },
        rec,
        { upsert: true, new: true }
      );
    }

    res.status(201).json({
      message: `✅ Inserted or updated ${records.length} records successfully`,
    });
  } catch (error) {
    console.error("❌ Error inserting data:", error.message);
    res.status(500).json({ message: "Error inserting data", error });
  }
});

// 📍 Fetch data by district name
router.get("/:district", async (req, res) => {
  try {
    const districtName = req.params.district.toUpperCase();
    const data = await Performance.find({ district_name: districtName });
    if (data.length === 0) {
      return res.status(404).json({ message: "No data found for this district" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching district data:", error.message);
    res.status(500).json({ message: "Error fetching district data", error });
  }
});

// 📅 Optional: Filter by year & month (like /api/data/filter?year=2024&month=Dec)
router.get("/filter/params", async (req, res) => {
  try {
    const { year, month } = req.query;
    const filter = {};
    if (year) filter.year = parseInt(year);
    if (month) filter.month = month;

    const data = await Performance.find(filter);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error filtering data:", error.message);
    res.status(500).json({ message: "Error filtering data", error });
  }
});

export default router;
