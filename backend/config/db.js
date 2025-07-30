import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const PORT = process.env.PORT || 7000;
    const MONGOURL = process.env.MONGO_URL;

    const conn = await mongoose.connect(MONGOURL);
    console.log(`Backend is connected to Port: ${PORT} and MongoURL: ${MONGOURL}`)
    console.log(`MongoDB Connected with DB : ${MONGOURL}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
