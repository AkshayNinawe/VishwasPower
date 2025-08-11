import mongoose from "mongoose";

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
      make: {
        type: String,
        trim: true,
        default: "",
      },
      srNo: {
        type: String,
        trim: true,
        default: "",
      },
      yearOfMfg: {
        type: String, // Can be changed to Number if only numerical year is expected
        trim: true,
        default: "",
      },
      // Electrical specifications
      currentHV: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      currentLV: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      hvKv: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      lvKv: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      mvaRating: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      impedancePercent: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      // Mechanical and physical information
      winding: {
        type: String,
        trim: true,
        default: "",
      },
      tempRiseOil: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      noOfRadiators: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      transportingWeight: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      weightCoreWinding: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      oilQuantityLiter: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      totalWeight: {
        type: String, // Can be changed to Number for calculations
        trim: true,
        default: "",
      },
      photos: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage3Form1", Stage3Form1Schema);
