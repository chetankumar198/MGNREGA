import { fetchMGNREGAData } from "./fetchDataGov.js";
import Performance from "../models/Performance.js";

export const fetchAndSave = async () => {
  try {
    const records = await fetchMGNREGAData();
    for (const item of records) {
      const rec = {
        district_name: item.district_name?.trim(),
        month: item.month || "N/A",
        year: item.fin_year ? parseInt(item.fin_year.split("-")[0]) : new Date().getFullYear(),
        metrics: item, // store raw record (convert numeric strings to numbers if needed)
        lastUpdated: new Date(),
      };

      // convert numeric string fields in metrics to numbers for important keys
      const numericKeys = ["Total_Households_Worked", "Total_Exp", "Number_of_Completed_Works"];
      for (const k of numericKeys) {
        if (rec.metrics && rec.metrics[k] && !isNaN(rec.metrics[k])) {
          rec.metrics[k] = Number(rec.metrics[k]);
        }
      }

      await Performance.findOneAndUpdate(
        { district_name: rec.district_name, month: rec.month, year: rec.year },
        { $set: rec },
        { upsert: true }
      );
    }
    console.log("fetchAndSave: saved", records.length, "records");
  } catch (err) {
    console.error("fetchAndSave error:", err.message);
  }
};
