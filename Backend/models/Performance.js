import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  district_name: { type: String, required: true },
  month: { type: String, default: "N/A" }, // made optional
  year: { type: Number, default: new Date().getFullYear() }, // default year
  metrics: { type: Object },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("Performance", performanceSchema);
