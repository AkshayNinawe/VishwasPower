import mongoose from "mongoose";

// Sub-schema for pressure test records
const PressureTestRecordSchema = new mongoose.Schema({
  srNo: {
    type: String,
    trim: true,
    default: "",
  },
  timeStarted: {
    type: String,
    trim: true,
    default: "",
  },
  pressureKgCm2: {
    type: String,
    trim: true,
    default: "",
  },
  tempAmb: {
    type: String,
    trim: true,
    default: "",
  },
  tempOTI: {
    type: String,
    trim: true,
    default: "",
  },
  tempWTI: {
    type: String,
    trim: true,
    default: "",
  },
});

const Stage3Form1Schema = new mongoose.Schema(
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
      bdvKV: {
        type: String,
        trim: true,
        default: "",
      },
      waterContentPPM: {
        type: String,
        trim: true,
        default: "",
      },
      tempOTI: {
        type: String,
        trim: true,
        default: "",
      },
      tempWTI: {
        type: String,
        trim: true,
        default: "",
      },
      tempAMB: {
        type: String,
        trim: true,
        default: "",
      },
      hvEarth15Sec: {
        type: String,
        trim: true,
        default: "",
      },
      hvEarth60Sec: {
        type: String,
        trim: true,
        default: "",
      },
      ratioIR60IR15: {
        type: String,
        trim: true,
        default: "",
      },
      pressureTestDate: {
        type: String,
        trim: true,
        default: "",
      },
      // Array of objects for pressure test records
      pressureTestRecords: [PressureTestRecordSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage3Form1", Stage3Form1Schema);
