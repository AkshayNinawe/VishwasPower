import mongoose from "mongoose";

const voltageRatioTestSchema = new mongoose.Schema({
  appliedVoltage: { type: String, trim: true, default: "" },
  measuredVoltage11_21: { type: String, trim: true, default: "" },
  measuredVoltage12_21: { type: String, trim: true, default: "" },
  measuredVoltage11_12: { type: String, trim: true, default: "" },
});

const magnetisingTestSchema = new mongoose.Schema({
  appliedVoltage: { type: String, trim: true, default: "" },
  measuredCurrent: { type: String, trim: true, default: "" },
});

const Stage4Form2Schema = new mongoose.Schema(
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
      // General Insulation Test Details
      date: { type: String, trim: true, default: "" },
      time: { type: String, trim: true, default: "" },
      insulationTesterDetails: { type: String, trim: true, default: "" },
      ambTemp: { type: String, trim: true, default: "" },
      make: { type: String, trim: true, default: "" },
      oilTemp: { type: String, trim: true, default: "" },
      srNo: { type: String, trim: true, default: "" },
      wdgTemp: { type: String, trim: true, default: "" },
      range: { type: String, trim: true, default: "" },
      relativeHumidity: { type: String, trim: true, default: "" },
      voltageLevel: { type: String, trim: true, default: "" },
      hvEarth10Sec: { type: String, trim: true, default: "" },
      hvEarth60Sec: { type: String, trim: true, default: "" },
      ratioIR60IR10: { type: String, trim: true, default: "" },

      // Voltage Ratio Tests
      voltageRatioTests: {
        type: [voltageRatioTestSchema],
        default: [],
      },

      // Magnetising Current Tests
      appliedVoltageMag: { type: String, trim: true, default: "" },
      dateMag: { type: String, trim: true, default: "" },
      timeMag: { type: String, trim: true, default: "" },
      meterMakeSrNoMag: { type: String, trim: true, default: "" },
      magnetisingTests: {
        type: [magnetisingTestSchema],
        default: [],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage4Form2", Stage4Form2Schema);
