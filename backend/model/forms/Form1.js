import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  companyName: { type: String, required: true },

  // 6 fixed test parameter sets
  coreFrameObtainedValue: { type: String },
  coreFrameRemarks: { type: String },

  frameTankObtainedValue: { type: String },
  frameTankRemarks: { type: String },

  coreTankObtainedValue: { type: String },
  coreTankRemarks: { type: String },

  // Signatures
  vpesSignature: { type: String, required: true },   // Base64 or URL
  customerSignature: { type: String, required: true },// Base64 or URL

  // Date of form
  date: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Form1", FormSchema);
