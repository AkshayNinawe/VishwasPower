import mongoose from "mongoose";

// Sub-schema for individual filtration records within the array
const FiltrationRecordSchema = new mongoose.Schema(
  {
    date: {
      type: String,
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
    mcOutletTemp: {
      type: String,
      trim: true,
      default: "",
    },
    otiTemp: {
      type: String,
      trim: true,
      default: "",
    },
    wtiTemp: {
      type: String,
      trim: true,
      default: "",
    },
    remark: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const Stage3Form2Schema = new mongoose.Schema(
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
      filtrationRecords: {
        type: [FiltrationRecordSchema],
        default: [],
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
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage3Form2", Stage3Form2Schema);
