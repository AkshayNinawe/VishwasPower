import mongoose from "mongoose";

// Sub-schema for a more detailed signatures object
const DetailedSignatureSchema = new mongoose.Schema(
  {
    vpesName: {
      type: String,
      trim: true,
      default: "",
    },
    vpesSignature: {
      type: String,
      trim: true,
      default: "",
    },
    vpesDate: {
      type: String,
      trim: true,
      default: "",
    },
    customerName: {
      type: String,
      trim: true,
      default: "",
    },
    customerSignature: {
      type: String,
      trim: true,
      default: "",
    },
    customerDate: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const Stage5Form2Schema = new mongoose.Schema(
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
      moistureContentPPM: {
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
      hvEarth600Sec: {
        type: String,
        trim: true,
        default: "",
      },
      oilLevelConservator: {
        type: String,
        trim: true,
        default: "",
      },
      hvJumpersConnected: {
        type: String,
        enum: ["Yes", "No", ""], // Use enum for specific values
        default: "",
      },
      lvJumpersConnected: {
        type: String,
        enum: ["Yes", "No", ""], // Use enum for specific values
        default: "",
      },
      incomingLACounter: {
        type: String,
        trim: true,
        default: "",
      },
      outgoingLACounter: {
        type: String,
        trim: true,
        default: "",
      },
      allCTCableTerminated: {
        type: String,
        trim: true,
        default: "",
      },
      protectionRelaysChecked: {
        type: String,
        trim: true,
        default: "",
      },
      anabondAppliedHVBushings: {
        type: String,
        trim: true,
        default: "",
      },
      allJointsSealed: {
        type: String,
        trim: true,
        default: "",
      },
      allForeignMaterialCleared: {
        type: String,
        trim: true,
        default: "",
      },
      temperatureWTI: {
        type: String,
        trim: true,
        default: "",
      },
      temperatureOTI: {
        type: String,
        trim: true,
        default: "",
      },
      remarks: {
        type: String,
        trim: true,
        default: "",
      },
      signatures: {
        type: DetailedSignatureSchema,
        default: () => ({}),
      },
      photos: {
        type: Object,
        default: {},
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage5Form2", Stage5Form2Schema);
