import mongoose from "mongoose";

const Stage1Form3Schema = new mongoose.Schema(
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
      betweenCoreFrame: {
        type: String,
        trim: true,
        default: "",
      },
      betweenCoreFrameRemarks: {
        type: String,
        trim: true,
        default: "",
      },
      betweenFrameTank: {
        type: String,
        trim: true,
        default: "",
      },
      betweenFrameTankRemarks: {
        type: String,
        trim: true,
        default: "",
      },
      betweenCoreTank: {
        type: String,
        trim: true,
        default: "",
      },
      betweenCoreTankRemarks: {
        type: String,
        trim: true,
        default: "",
      },
      filterMachine: {
        type: String,
        trim: true,
        default: "",
      },
      filterMachineChecked: {
        type: String,
        default: "",
      },
      filterCapacity: {
        type: String,
        trim: true,
        default: "",
      },
      filterCapacityChecked: {
        type: String,
        default: "",
      },
      vacuumPumpCapacity: {
        type: String,
        trim: true,
        default: "",
      },
      vacuumPumpCapacityChecked: {
        type: String,
        default: "",
      },
      reservoirAvailable: {
        type: String,
        trim: true,
        default: "",
      },
      reservoirAvailableChecked: {
        type: String,
        default: "",
      },
      reservoirCapacity: {
        type: String,
        trim: true,
        default: "",
      },
      reservoirCapacityChecked: {
        type: String,
        default: "",
      },
      hosePipes: {
        type: String,
        trim: true,
        default: "",
      },
      hosePipesChecked: {
        type: String,
        default: "",
      },
      craneAvailable: {
        type: String,
        trim: true,
        default: "",
      },
      craneAvailableChecked: {
        type: String,
        default: "",
      },
      fireExtinguisher: {
        type: String,
        trim: true,
        default: "",
      },
      firstAidKit: {
        type: String,
        trim: true,
        default: "",
      },
      ppeEquipment: {
        type: String,
        trim: true,
        default: "",
      },

      // Consolidated 'photos' field to be an object
      photos: {
        type: Object,
        default: {},
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage1Form3", Stage1Form3Schema);
