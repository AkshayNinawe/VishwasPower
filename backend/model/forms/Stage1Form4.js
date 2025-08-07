import mongoose from "mongoose";

const Stage1Form4Schema = new mongoose.Schema(
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
      // General details
      meterUsed: {
        type: String,
        trim: true,
        default: "",
      },
      date: {
        type: String, // Suggestion: Consider using Date type for date-based queries
        trim: true,
        default: "",
      },
      time: {
        type: String,
        trim: true,
        default: "",
      },
      modelSrNo: {
        type: String,
        trim: true,
        default: "",
      },

      // Temperature readings
      wti: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      oti: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },

      // Bushing data
      bushing11: {
        type: String,
        trim: true,
        default: "",
      },
      bushing12: {
        type: String,
        trim: true,
        default: "",
      },

      // 0.5kV Bushing 11 Readings
      bushing11_05kv_tanDelta: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing11_05kv_capacitance: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing11_05kv_excitationCurrent: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing11_05kv_dielectricLoss: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },

      // 0.5kV Bushing 12 Readings
      bushing12_05kv_tanDelta: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing12_05kv_capacitance: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing12_05kv_excitationCurrent: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing12_05kv_dielectricLoss: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },

      // 1.0kV Bushing 11 Readings
      bushing11_10kv_tanDelta: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing11_10kv_capacitance: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing11_10kv_excitationCurrent: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing11_10kv_dielectricLoss: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },

      // 1.0kV Bushing 12 Readings
      bushing12_10kv_tanDelta: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing12_10kv_capacitance: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing12_10kv_excitationCurrent: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },
      bushing12_10kv_dielectricLoss: {
        type: String, // Suggestion: Consider using Number type for calculations
        trim: true,
        default: "",
      },

      // Photos
      photos: {
        type: Object,
        default: {},
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage1Form4", Stage1Form4Schema);
