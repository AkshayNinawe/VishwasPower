import mongoose from "mongoose";

// Sub-schema for a more detailed signatures object
const DetailedSignatureSchema = new mongoose.Schema(
  {
    vpesName: {
      type: String,
      trim: true,
      default: "",
    },
    vpesDesignation: {
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
    customerDesignation: {
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

const Stage6Form1Schema = new mongoose.Schema(
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
      customerName: {
        type: String,
        trim: true,
        default: "",
      },
      orderNumber: {
        type: String,
        trim: true,
        default: "",
      },
      location: {
        type: String,
        trim: true,
        default: "",
      },
      type: {
        type: String,
        trim: true,
        default: "",
      },
      capacity: {
        type: String,
        trim: true,
        default: "",
      },
      voltageRating: {
        type: String,
        trim: true,
        default: "",
      },
      make: {
        type: String,
        trim: true,
        default: "",
      },
      serialNumber: {
        type: String,
        trim: true,
        default: "",
      },
      completionDate: {
        type: String,
        trim: true,
        default: "",
      },
      chargingDate: {
        type: String,
        trim: true,
        default: "",
      },
      commissioningDate: {
        type: String,
        trim: true,
        default: "",
      },
      signatures: {
        type: DetailedSignatureSchema,
        default: () => ({}),
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage6Form1", Stage6Form1Schema);
