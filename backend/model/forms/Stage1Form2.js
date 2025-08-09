import mongoose from "mongoose";

// Sub-schema for an individual accessory item
// This defines the structure for each item within the 'accessories' map
const AccessoryItemSchema = new mongoose.Schema({
    packingCase: {
        type: String,
        trim: true,
        default: "",
    },
    qtyPerPL: {
        type: String,
        trim: true,
        default: "",
    },
    qtyReceived: {
        type: String,
        trim: true,
        default: "",
    },
    shortQty: {
        type: String,
        trim: true,
        default: "",
    },
    damagedQty: {
        type: String,
        trim: true,
        default: "",
    },
}, { _id: false }); // Disable default _id for sub-documents

const Stage1Form2Schema = new mongoose.Schema(
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
        // The data field contains all the form-specific information
        data: {
            accessories: {
                type: Map,
                of: AccessoryItemSchema,
                default: {},
            },
            photos: {
                type: Map,
                of: String,
                default: {},
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("Stage1Form2", Stage1Form2Schema);
