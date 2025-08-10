import mongoose from "mongoose";

const projectSchema = {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    required: true,
  },
  formsCompleted: {
    type: Number,
    required: true,
  },
  totalForms: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  stageApprovals: {
    type: Map,
    of: Boolean,
  },
  submittedStages: {
    type: Map,
    of: Boolean,
  },
};

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    companyProjects: {
      type: [projectSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
