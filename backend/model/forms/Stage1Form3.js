import mongoose from 'mongoose';

const Stage1Form3Schema = new mongoose.Schema({
  // New fields from the inspection data
  betweenCoreFrame: {
    type: String,
    trim: true,
    default: ''
  },
  betweenCoreFrameRemarks: {
    type: String,
    trim: true,
    default: ''
  },
  betweenFrameTank: {
    type: String,
    trim: true,
    default: ''
  },
  betweenFrameTankRemarks: {
    type: String,
    trim: true,
    default: ''
  },
  betweenCoreTank: {
    type: String,
    trim: true,
    default: ''
  },
  betweenCoreTankRemarks: {
    type: String,
    trim: true,
    default: ''
  },
  filterMachine: {
    type: String,
    trim: true,
    default: ''
  },
  filterMachineChecked: {
    type: Boolean,
    default: false
  },
  filterCapacity: {
    type: String,
    trim: true,
    default: ''
  },
  filterCapacityChecked: {
    type: Boolean,
    default: false
  },
  vacuumPumpCapacity: {
    type: String,
    trim: true,
    default: ''
  },
  vacuumPumpCapacityChecked: {
    type: Boolean,
    default: false
  },
  reservoirAvailable: {
    type: String,
    trim: true,
    default: ''
  },
  reservoirAvailableChecked: {
    type: Boolean,
    default: false
  },
  reservoirCapacity: {
    type: String,
    trim: true,
    default: ''
  },
  reservoirCapacityChecked: {
    type: Boolean,
    default: false
  },
  hosePipes: {
    type: String,
    trim: true,
    default: ''
  },
  hosePipesChecked: {
    type: Boolean,
    default: false
  },
  craneAvailable: {
    type: String,
    trim: true,
    default: ''
  },
  craneAvailableChecked: {
    type: Boolean,
    default: false
  },
  fireExtinguisher: {
    type: String,
    trim: true,
    default: ''
  },
  firstAidKit: {
    type: String,
    trim: true,
    default: ''
  },
  ppeEquipment: {
    type: String,
    trim: true,
    default: ''
  },
  
  // Consolidated 'photos' field to be an object
  photos: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

export default mongoose.model("Stage1Form3", Stage1Form3Schema);
