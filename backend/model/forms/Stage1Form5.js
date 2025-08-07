import mongoose from 'mongoose';

const Stage1Form5Schema = new mongoose.Schema({
  // General details
  date: {
    type: String, // Suggestion: Consider using Date type for date-based queries
    trim: true,
    default: ''
  },
  time: {
    type: String,
    trim: true,
    default: ''
  },
  make: {
    type: String,
    trim: true,
    default: ''
  },
  srNo: {
    type: String,
    trim: true,
    default: ''
  },

  // Tester and environmental details
  insulationTesterDetails: {
    type: String,
    trim: true,
    default: ''
  },
  ambTemp: {
    type: String, // Suggestion: Consider using Number type for calculations
    trim: true,
    default: ''
  },
  oilTemp: {
    type: String, // Suggestion: Consider using Number type for calculations
    trim: true,
    default: ''
  },
  wdgTemp: {
    type: String, // Suggestion: Consider using Number type for calculations
    trim: true,
    default: ''
  },
  range: {
    type: String,
    trim: true,
    default: ''
  },
  relativeHumidity: {
    type: String,
    trim: true,
    default: ''
  },
  voltageLevel: {
    type: String,
    trim: true,
    default: ''
  },

  // Readings and ratios
  hvEarth15Sec: {
    type: String, // Suggestion: Consider using Number type for calculations
    trim: true,
    default: ''
  },
  hvEarth60Sec: {
    type: String, // Suggestion: Consider using Number type for calculations
    trim: true,
    default: ''
  },
  ratioIR60IR15: {
    type: String, // Suggestion: Consider using Number type for calculations
    trim: true,
    default: ''
  },

  // Photos
  photos: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

export default mongoose.model("Stage1Form5", Stage1Form5Schema);
