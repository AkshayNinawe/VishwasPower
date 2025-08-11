import mongoose from "mongoose";

const Stage2Form2Schema = new mongoose.Schema(
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
      hvWithRespectToEarth: {
        type: String,
        trim: true,
        default: "",
      },
      lvWithRespectToEarth: {
        type: String,
        trim: true,
        default: "",
      },
      neutralWithRespectToEarth: {
        type: String,
        trim: true,
        default: "",
      },
      // The photos field is updated to be a generic Object
      // to match the sample data's empty object structure.
      photos: {
        type: Object,
        default: {},
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage2Form2", Stage2Form2Schema);
