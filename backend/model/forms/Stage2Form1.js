import mongoose from "mongoose";

// Sub-schema for filtration records
const FiltrationRecordSchema = new mongoose.Schema({
  date: {
    type: String, // You could also use Date type if you prefer, but string matches your sample data
    trim: true,
    default: "",
  },
  time: {
    type: String,
    trim: true,
    default: "",
  },
  vacuumLevel: {
    type: String,
    trim: true,
    default: "",
  },
  inletTemp: {
    type: String,
    trim: true,
    default: "",
  },
  outletTemp: {
    type: String,
    trim: true,
    default: "",
  },
  remark: {
    type: String,
    trim: true,
    default: "",
  },
});

const Stage2Form1Schema = new mongoose.Schema(
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
      tank1NoOfBarrels: {
        type: String,
        trim: true,
        default: "",
      },
      tank1StartedDateTime: {
        type: String, // Consider using Date for better date/time management
        trim: true,
        default: "",
      },
      tank1CompletedDateTime: {
        type: String, // Consider using Date for better date/time management
        trim: true,
        default: "",
      },
      tank1BDV: {
        type: String,
        trim: true,
        default: "",
      },
      tank1MoistureContent: {
        type: String,
        trim: true,
        default: "",
      },
      // Array of objects for filtration records
      filtrationRecords: [FiltrationRecordSchema],
      // The sample data showed photos as an empty object,
      // but keeping it as an array of strings is more common for storing URLs.
      // You can adjust this to a different schema if needed.
      photos: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage2Form1", Stage2Form1Schema);
