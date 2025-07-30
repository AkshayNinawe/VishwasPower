import mongoose from "mongoose";

// Define the embedded item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const tableSchema = new mongoose.Schema({
  table_number: {
    type: Number,
    required: true,
    unique: true
  },
  orders: [itemSchema], // Replaced ObjectIds with item subdocuments
  current_bill: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Table = mongoose.models.Table || mongoose.model("Table", tableSchema);
export default Table;
