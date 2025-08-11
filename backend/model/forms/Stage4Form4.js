import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema({
  vpesName: {
    type: String,
    trim: true,
  },
  vpesSignature: {
    type: String, // Storing base64 image data as a string
    trim: true,
  },
  customerName: {
    type: String,
    trim: true,
  },
  customerSignature: {
    type: String, // Storing base64 image data as a string
    trim: true,
  },
});

const Stage4Form4Schema = new mongoose.Schema(
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
      meterUsed: { type: String, trim: true, default: "" },
      date: { type: String, trim: true, default: "" },
      time: { type: String, trim: true, default: "" },
      meterMakeSrNo: { type: String, trim: true, default: "" },
      wti: { type: String, trim: true, default: "" },
      oti: { type: String, trim: true, default: "" },
      range: { type: String, trim: true, default: "" },
      ambient: { type: String, trim: true, default: "" },
      winding11_12: { type: String, trim: true, default: "" },
      winding11_21: { type: String, trim: true, default: "" },
      winding21_12: { type: String, trim: true, default: "" },
      dateIR: { type: String, trim: true, default: "" },
      timeIR: { type: String, trim: true, default: "" },
      insulationTesterDetails: { type: String, trim: true, default: "" },
      ambTempIR: { type: String, trim: true, default: "" },
      makeIR: { type: String, trim: true, default: "" },
      oilTempIR: { type: String, trim: true, default: "" },
      srNoIR: { type: String, trim: true, default: "" },
      wdgTempIR: { type: String, trim: true, default: "" },
      rangeIR: { type: String, trim: true, default: "" },
      relativeHumidityIR: { type: String, trim: true, default: "" },
      voltageLevelIR: { type: String, trim: true, default: "" },
      hvEarth10Sec: { type: String, trim: true, default: "" },
      hvEarth60Sec: { type: String, trim: true, default: "" },
      hvEarth600Sec: { type: String, trim: true, default: "" },
      ratioIR60IR10: { type: String, trim: true, default: "" },
      ratioIR600IR60: { type: String, trim: true, default: "" },
      signatures: {
        type: signatureSchema,
        default: {},
      },
      photos: {
        type: Object, // Using Object to allow for dynamic key-value pairs of photos
        default: {},
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage4Form4", Stage4Form4Schema);
