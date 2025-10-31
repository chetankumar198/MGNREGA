import MGNREGA from "../models/mgnregaModel.js";
import { fetchMGNREGAData } from "../utils/fetchDataGov.js";

// ✅ Fetch & Store API Data in MongoDB
export const getDistrictData = async (req, res) => {
  try {
    const records = await fetchMGNREGAData();

    // Clear old records (optional)
    await MGNREGA.deleteMany();

    // Save new records
    await MGNREGA.insertMany(records);

    res.status(200).json({
      success: true,
      message: "MGNREGA data fetched and stored successfully",
      totalRecords: records.length,
    });
  } catch (error) {
    console.error("❌ Error in getDistrictData:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch/store data" });
  }
};

// ✅ Get all districts from DB
export const listDistricts = async (req, res) => {
  try {
    const data = await MGNREGA.find({}, { district_name: 1, state_name: 1, _id: 0 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
