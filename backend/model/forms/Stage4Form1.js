import mongoose from "mongoose";

const Stage4Form1Schema = new mongoose.Schema(
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
      // General Details
      makeOfMeter: { type: String, trim: true, default: "" },
      date: { type: String, trim: true, default: "" },
      modelSrNo: { type: String, trim: true, default: "" },
      ambient: { type: String, trim: true, default: "" },
      oti: { type: String, trim: true, default: "" },
      wti: { type: String, trim: true, default: "" },
      testReportReviewed: { type: String, trim: true, default: "" },
      acceptanceOfTest: { type: String, trim: true, default: "" },

      // Bushing Details
      meterUsedBushing: { type: String, trim: true, default: "" },
      dateBushing: { type: String, trim: true, default: "" },
      timeBushing: { type: String, trim: true, default: "" },
      modelSrNoBushing: { type: String, trim: true, default: "" },
      wtiBushing: { type: String, trim: true, default: "" },
      otiBushing: { type: String, trim: true, default: "" },
      bushing11_05kv_tanDelta: { type: String, trim: true, default: "" },
      bushing11_05kv_capacitance: { type: String, trim: true, default: "" },
      bushing11_05kv_excitationCurrent: { type: String, trim: true, default: "" },
      bushing11_05kv_dielectricLoss: { type: String, trim: true, default: "" },
      bushing12_05kv_tanDelta: { type: String, trim: true, default: "" },
      bushing12_05kv_capacitance: { type: String, trim: true, default: "" },
      bushing12_05kv_excitationCurrent: { type: String, trim: true, default: "" },
      bushing12_05kv_dielectricLoss: { type: String, trim: true, default: "" },
      bushing11_10kv_tanDelta: { type: String, trim: true, default: "" },
      bushing11_10kv_capacitance: { type: String, trim: true, default: "" },
      bushing11_10kv_excitationCurrent: { type: String, trim: true, default: "" },
      bushing11_10kv_dielectricLoss: { type: String, trim: true, default: "" },
      bushing12_10kv_tanDelta: { type: String, trim: true, default: "" },
      bushing12_10kv_capacitance: { type: String, trim: true, default: "" },
      bushing12_10kv_excitationCurrent: { type: String, trim: true, default: "" },
      bushing12_10kv_dielectricLoss: { type: String, trim: true, default: "" },

      // Winding Details
      meterUsedWinding: { type: String, trim: true, default: "" },
      dateWinding: { type: String, trim: true, default: "" },
      timeWinding: { type: String, trim: true, default: "" },
      makeSrNoWinding: { type: String, trim: true, default: "" },
      ambientTempWinding: { type: String, trim: true, default: "" },
      oilTempWinding: { type: String, trim: true, default: "" },
      hvg_05kv_tanDelta: { type: String, trim: true, default: "" },
      hvg_05kv_capacitance: { type: String, trim: true, default: "" },
      hvg_05kv_excitationCurrent: { type: String, trim: true, default: "" },
      hvg_05kv_dielectricLoss: { type: String, trim: true, default: "" },
      hvg_10kv_tanDelta: { type: String, trim: true, default: "" },
      hvg_10kv_capacitance: { type: String, trim: true, default: "" },
      hvg_10kv_excitationCurrent: { type: String, trim: true, default: "" },
      hvg_10kv_dielectricLoss: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stage4Form1", Stage4Form1Schema);
