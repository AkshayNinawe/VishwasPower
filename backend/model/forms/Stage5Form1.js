import mongoose from "mongoose";

// Sub-schema for valve status and air venting
const statusQtySchema = new mongoose.Schema(
  {
    qty: { type: String, trim: true, default: "" },
    status: { type: String, trim: true, default: "" },
  },
  { _id: false } // Prevent Mongoose from creating an _id for sub-documents
);

// Sub-schema for protection trails
const protectionTrailsSchema = new mongoose.Schema(
  {
    checked: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for bushing test tap
const bushingTestTapSchema = new mongoose.Schema(
  {
    hvTestCapEarthed: { type: String, trim: true, default: "" },
    lvTestCapEarthed: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const Stage5Form1Schema = new mongoose.Schema(
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
      valveStatus: {
        type: Object, // Using Object to handle dynamic keys (A, B, C, etc.)
        of: statusQtySchema,
        default: {},
      },
      airVenting: {
        type: Object, // Using Object to handle dynamic keys (1, 2, 3, etc.)
        of: statusQtySchema,
        default: {},
      },
      protectionTrails: {
        type: Object, // Using Object to handle dynamic keys (1-ALARM, 1b-TRIP, etc.)
        of: protectionTrailsSchema,
        default: {},
      },
      bushingTestTap: {
        type: bushingTestTapSchema,
        default: {},
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage5Form1", Stage5Form1Schema);
