// backend/utils/fetchDataGov.js
import axios from "axios";
import Performance from "../models/Performance.js";

export const fetchMGNREGAData = async () => {
  const apiUrl = `${process.env.DATA_GOV_API}?format=json&api-key=${process.env.DATA_GOV_KEY}`;

  try {
    const { data } = await axios.get(apiUrl);

    if (!data.records || data.records.length === 0) {
      throw new Error("No records found in API response");
    }

    console.log(`✅ Successfully fetched MGNREGA data: ${data.records.length} records`);

    // 🧩 Save or update each record in MongoDB
    for (const record of data.records) {
      await Performance.findOneAndUpdate(
        {
          district_name: record.district_name,
          month: record.month,
          year: parseInt(record.fin_year?.split("-")[0]) || 0,
        },
        {
          metrics: record,
          lastUpdated: new Date(),
        },
        { upsert: true, new: true }
      );
    }

    console.log("💾 Data saved/updated in MongoDB successfully");
    return data.records;

  } catch (error) {
    console.error("❌ Error fetching MGNREGA data:", error.message);
    throw error;
  }
};
