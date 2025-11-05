import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGOURL = process.env.MONGO_URL;

    if (!MONGOURL) {
      throw new Error('MONGO_URL environment variable is not defined');
    }

    const conn = await mongoose.connect(MONGOURL);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
