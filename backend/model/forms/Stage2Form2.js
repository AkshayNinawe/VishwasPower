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
        type: String, // Consider Number for numerical data
        trim: true,
        default: "",
      },
      tempWTI: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      tempAMB: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      hvEarth15Sec: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      hvEarth60Sec: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      ratioIR60IR15: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      hvWithRespectToEarth: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      lvWithRespectToEarth: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      neutralWithRespectToEarth: {
        type: String, // Consider Number
        trim: true,
        default: "",
      },
      photos: {
        // Nested object for photo details
        filePath: {
          type: String,
          trim: true,
          default: "",
        },
        originalName: {
          type: String,
          trim: true,
          default: "",
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage2Form2", Stage2Form2Schema);
