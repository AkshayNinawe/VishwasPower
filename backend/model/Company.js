import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
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

export default mongoose.model('Company', companySchema);