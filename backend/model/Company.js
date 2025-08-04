import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  companyProjects: {
    type: [Object],  
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);