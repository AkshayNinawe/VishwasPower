import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectCompany: {
    type: [Object],  
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);