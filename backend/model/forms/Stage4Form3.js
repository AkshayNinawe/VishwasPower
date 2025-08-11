import mongoose from "mongoose";

const Stage4Form3Schema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    data: {
      appliedVoltage: { type: String, trim: true, default: "" },
      date: { type: String, trim: true, default: "" },
      time: { type: String, trim: true, default: "" },
      meterMakeSrNo: { type: String, trim: true, default: "" },
      test11_12_measuredCurrent11: { type: String, trim: true, default: "" },
      test11_12_measuredCurrent12_21: { type: String, trim: true, default: "" },
      test12_21_measuredCurrent12: { type: String, trim: true, default: "" },
      test12_21_measuredCurrent11_21: { type: String, trim: true, default: "" },
      appliedVoltageHV: { type: String, trim: true, default: "" },
      ratedCurrentLV: { type: String, trim: true, default: "" },
      percentZ: { type: String, trim: true, default: "" },
      ratedVoltageHV: { type: String, trim: true, default: "" },
      measuredCurrentLV: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage4Form3", Stage4Form3Schema);
