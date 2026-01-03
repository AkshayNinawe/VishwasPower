import mongoose from "mongoose";

// --- Sub-schemas for the forms to be nested inside the main schema ---

// Sub-schema for Stage 1 Form 1 (Transformer Details)
const Stage1Form1SubSchema = new mongoose.Schema(
  {
    make: { type: String, trim: true, default: "" },
    currentHV: { type: String, trim: true, default: "" },
    srNo: { type: String, trim: true, default: "" },
    currentLV: { type: String, trim: true, default: "" },
    mvaRating: { type: String, trim: true, default: "" },
    tempRiseOilC: { type: String, trim: true, default: "" },
    hvKv: { type: String, trim: true, default: "" },
    windingC: { type: String, trim: true, default: "" },
    lvKv: { type: String, trim: true, default: "" },
    oilQuantity: { type: String, trim: true, default: "" },
    impedancePercent: { type: String, trim: true, default: "" },
    weightCoreWdg: { type: String, trim: true, default: "" },
    yearOfMfg: { type: String, trim: true, default: "" },
    transportingWeight: { type: String, trim: true, default: "" },
    noOfCoolingFan: { type: String, trim: true, default: "" },
    totalWeight: { type: String, trim: true, default: "" },
    noOfRadiators: { type: String, trim: true, default: "" },
    noOfTaps: { type: String, trim: true, default: "" },
    mfgOfOctc: { type: String, trim: true, default: "" },
    typeOfOctc: { type: String, trim: true, default: "" },
    srNoOctc: { type: String, trim: true, default: "" },
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 1 Form 2 (Accessories Details)
const AccessoryItemSchema = new mongoose.Schema(
  {
    packingCase: { type: String, trim: true, default: "" },
    qtyPerPL: { type: String, trim: true, default: "" },
    qtyReceived: { type: String, trim: true, default: "" },
    shortQty: { type: String, trim: true, default: "" },
    damagedQty: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const Stage1Form2SubSchema = new mongoose.Schema(
  {
    accessories: { type: Map, of: AccessoryItemSchema, default: {} },
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 1 Form 3 (Core Insulation Check and Equipment Checklist)
const Stage1Form3SubSchema = new mongoose.Schema(
  {
    // Core Insulation Check fields
    coreFrame_obtainedValue: { type: String, trim: true, default: "" },
    coreFrame_remarks: { type: String, trim: true, default: "" },
    frameTank_obtainedValue: { type: String, trim: true, default: "" },
    frameTank_remarks: { type: String, trim: true, default: "" },
    coreTank_obtainedValue: { type: String, trim: true, default: "" },
    coreTank_remarks: { type: String, trim: true, default: "" },
    
    // Equipment checklist fields
    filterMachine: { type: String, trim: true, default: "" },
    filterMachineCapacity: { type: String, trim: true, default: "" },
    vacuumPumpCapacity: { type: String, trim: true, default: "" },
    reservoirAvailable: { type: String, trim: true, default: "" },
    reservoirCapacity: { type: String, trim: true, default: "" },
    hosePipes: { type: String, trim: true, default: "" },
    craneAvailable: { type: String, trim: true, default: "" },
    dryAir: { type: String, trim: true, default: "" },
    dewPointMeter: { type: String, trim: true, default: "" },
    mecLeodGauge: { type: String, trim: true, default: "" },
    
    // Safety equipment fields
    fireExtinguisher: { type: String, trim: true, default: "" },
    firstAidKit: { type: String, trim: true, default: "" },
    ppeEquipment: { type: String, trim: true, default: "" },  
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 1 Form 4 (Pre erection Ratio test of turret CTs)
const Stage1Form4SubSchema = new mongoose.Schema(
  {
    makeOfMeter: { type: String, trim: true, default: "" },
    modelSrNo: { type: String, trim: true, default: "" },
    date: { type: String, trim: true, default: "" },
    ambient: { type: String, trim: true, default: "" },
    wtiTemp: { type: String, trim: true, default: "" },
    testReportReviewedBy: { type: String, trim: true, default: "" },
    acceptanceOfTest: { type: String, trim: true, default: "" },

    // Phase 1.1 - CT Ratio test fields (S1-S2)
    phase31_20percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_40percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_60percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_80percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_100percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },

    // Phase 1.1 - CT Ratio test fields (S1-S3)
    phase31_20percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_40percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_60percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_80percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_100percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // Phase 1.1 - Knee point voltage fields (S1-S2)
    phase31_knee_20percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_40percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_60percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_80percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_100percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_110percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_110percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },

    // Phase 1.1 - Knee point voltage fields (S1-S3)
    phase31_knee_20percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_40percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_60percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_80percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_100percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_110percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_110percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // Phase 1.2 - CT Ratio test fields (S1-S2)
    phase32_20percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_40percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_60percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_80percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_100percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },

    // Phase 1.2 - CT Ratio test fields (S1-S3)
    phase32_20percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_40percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_60percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_80percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_100percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // Phase 1.2 - Knee point voltage fields (S1-S2)
    phase32_knee_20percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_40percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_60percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_80percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_100percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_110percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_110percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },

    // Phase 1.2 - Knee point voltage fields (S1-S3)
    phase32_knee_20percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_40percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_60percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_80percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_100percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_110percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_110percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // Legacy bushing fields (keeping for backward compatibility)
    meterUsed: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    wti: { type: String, trim: true, default: "" },
    oti: { type: String, trim: true, default: "" },
    bushing11: { type: String, trim: true, default: "" },
    bushing12: { type: String, trim: true, default: "" },
    bushing11_05kv_phase: { type: String, trim: true, default: "" },
    bushing11_05kv_tanDelta: { type: String, trim: true, default: "" },
    bushing11_05kv_capacitance: { type: String, trim: true, default: "" },
    bushing11_05kv_excitationCurrent: { type: String, trim: true, default: "" },
    bushing11_05kv_dielectricLoss: { type: String, trim: true, default: "" },
    bushing12_05kv_phase: { type: String, trim: true, default: "" },
    bushing12_05kv_tanDelta: { type: String, trim: true, default: "" },
    bushing12_05kv_capacitance: { type: String, trim: true, default: "" },
    bushing12_05kv_excitationCurrent: { type: String, trim: true, default: "" },
    bushing12_05kv_dielectricLoss: { type: String, trim: true, default: "" },
    bushing11_10kv_phase: { type: String, trim: true, default: "" },
    bushing11_10kv_tanDelta: { type: String, trim: true, default: "" },
    bushing11_10kv_capacitance: { type: String, trim: true, default: "" },
    bushing11_10kv_excitationCurrent: { type: String, trim: true, default: "" },
    bushing11_10kv_dielectricLoss: { type: String, trim: true, default: "" },
    bushing12_10kv_phase: { type: String, trim: true, default: "" },
    bushing12_10kv_tanDelta: { type: String, trim: true, default: "" },
    bushing12_10kv_capacitance: { type: String, trim: true, default: "" },
    bushing12_10kv_excitationCurrent: { type: String, trim: true, default: "" },
    bushing12_10kv_dielectricLoss: { type: String, trim: true, default: "" },
    
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 1 Form 5 (Pre erection Ratio test of turret CTs)
const Stage1Form5SubSchema = new mongoose.Schema(
  {
    // Phase 2.1 CT Ratio measurements
    phase31_20percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_20percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_40percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_40percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_60percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_60percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_80percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_80percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_100percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_100percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // Phase 2.1 Knee point voltage measurements
    phase31_knee_20percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_20percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_40percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_40percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_60percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_60percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_80percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_80percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_100percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_100percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_110percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_110percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase31_knee_110percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase31_knee_110percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // Phase 2.2 CT Ratio measurements
    phase32_20percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_20percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_40percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_40percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_60percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_60percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_80percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_80percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_100percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_100percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // Phase 2.2 Knee point voltage measurements
    phase32_knee_20percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_20percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_40percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_40percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_60percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_60percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_80percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_80percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_100percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_100percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_110percent_appliedVoltage_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_110percent_appliedVoltage_s1s3: { type: String, trim: true, default: "" },
    phase32_knee_110percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    phase32_knee_110percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },

    // WTI CT Ratio measurements (S1-S2, S1-S3, S1-S4)
    wti_20percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_20percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_20percent_appliedCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_20percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_20percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_20percent_measuredCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_40percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_40percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_40percent_appliedCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_40percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_40percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_40percent_measuredCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_60percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_60percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_60percent_appliedCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_60percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_60percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_60percent_measuredCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_80percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_80percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_80percent_appliedCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_80percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_80percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_80percent_measuredCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_100percent_appliedCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_100percent_appliedCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_100percent_appliedCurrent_s1s4: { type: String, trim: true, default: "" },
    wti_100percent_measuredCurrent_s1s2: { type: String, trim: true, default: "" },
    wti_100percent_measuredCurrent_s1s3: { type: String, trim: true, default: "" },
    wti_100percent_measuredCurrent_s1s4: { type: String, trim: true, default: "" },

    // WTI CT Ratio measurements (S1-S5, S1-S6, S1-S7)
    wti_20percent_appliedCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_20percent_appliedCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_20percent_appliedCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_20percent_measuredCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_20percent_measuredCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_20percent_measuredCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_40percent_appliedCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_40percent_appliedCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_40percent_appliedCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_40percent_measuredCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_40percent_measuredCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_40percent_measuredCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_60percent_appliedCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_60percent_appliedCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_60percent_appliedCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_60percent_measuredCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_60percent_measuredCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_60percent_measuredCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_80percent_appliedCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_80percent_appliedCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_80percent_appliedCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_80percent_measuredCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_80percent_measuredCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_80percent_measuredCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_100percent_appliedCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_100percent_appliedCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_100percent_appliedCurrent_s1s7: { type: String, trim: true, default: "" },
    wti_100percent_measuredCurrent_s1s5: { type: String, trim: true, default: "" },
    wti_100percent_measuredCurrent_s1s6: { type: String, trim: true, default: "" },
    wti_100percent_measuredCurrent_s1s7: { type: String, trim: true, default: "" },

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 1 Form 6 (Tan Delta and Capacitance Test on Bushing)
const Stage1Form6SubSchema = new mongoose.Schema(
  {
    // Basic test information
    meterUsed: { type: String, trim: true, default: "" },
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    modelSrNo: { type: String, trim: true, default: "" },
    wti: { type: String, trim: true, default: "" },
    oti: { type: String, trim: true, default: "" },

    // HV Bushing Serial Numbers
    hvBushing11_srNo: { type: String, trim: true, default: "" },
    hvBushing12_srNo: { type: String, trim: true, default: "" },

    // HV Bushing 1.1 - 05 KV Phase measurements
    hvBushing11_05kv_tanDelta: { type: String, trim: true, default: "" },
    hvBushing11_05kv_capacitance: { type: String, trim: true, default: "" },
    hvBushing11_05kv_excitationCurrent: { type: String, trim: true, default: "" },
    hvBushing11_05kv_dielectricLoss: { type: String, trim: true, default: "" },

    // HV Bushing 1.2 - 05 KV Phase measurements
    hvBushing12_05kv_tanDelta: { type: String, trim: true, default: "" },
    hvBushing12_05kv_capacitance: { type: String, trim: true, default: "" },
    hvBushing12_05kv_excitationCurrent: { type: String, trim: true, default: "" },
    hvBushing12_05kv_dielectricLoss: { type: String, trim: true, default: "" },

    // HV Bushing 1.1 - 10 KV Phase measurements
    hvBushing11_10kv_tanDelta: { type: String, trim: true, default: "" },
    hvBushing11_10kv_capacitance: { type: String, trim: true, default: "" },
    hvBushing11_10kv_excitationCurrent: { type: String, trim: true, default: "" },
    hvBushing11_10kv_dielectricLoss: { type: String, trim: true, default: "" },

    // HV Bushing 1.2 - 10 KV Phase measurements
    hvBushing12_10kv_tanDelta: { type: String, trim: true, default: "" },
    hvBushing12_10kv_capacitance: { type: String, trim: true, default: "" },
    hvBushing12_10kv_excitationCurrent: { type: String, trim: true, default: "" },
    hvBushing12_10kv_dielectricLoss: { type: String, trim: true, default: "" },

    // LV Bushing Serial Numbers
    lvBushing21_srNo: { type: String, trim: true, default: "" },
    lvBushing22_srNo: { type: String, trim: true, default: "" },

    // LV Bushing 2.1 - 05 KV Phase measurements
    lvBushing21_05kv_tanDelta: { type: String, trim: true, default: "" },
    lvBushing21_05kv_capacitance: { type: String, trim: true, default: "" },
    lvBushing21_05kv_excitationCurrent: { type: String, trim: true, default: "" },
    lvBushing21_05kv_dielectricLoss: { type: String, trim: true, default: "" },

    // LV Bushing 2.2 - 05 KV Phase measurements
    lvBushing22_05kv_tanDelta: { type: String, trim: true, default: "" },
    lvBushing22_05kv_capacitance: { type: String, trim: true, default: "" },
    lvBushing22_05kv_excitationCurrent: { type: String, trim: true, default: "" },
    lvBushing22_05kv_dielectricLoss: { type: String, trim: true, default: "" },

    // LV Bushing 2.1 - 10 KV Phase measurements
    lvBushing21_10kv_tanDelta: { type: String, trim: true, default: "" },
    lvBushing21_10kv_capacitance: { type: String, trim: true, default: "" },
    lvBushing21_10kv_excitationCurrent: { type: String, trim: true, default: "" },
    lvBushing21_10kv_dielectricLoss: { type: String, trim: true, default: "" },

    // LV Bushing 2.2 - 10 KV Phase measurements
    lvBushing22_10kv_tanDelta: { type: String, trim: true, default: "" },
    lvBushing22_10kv_capacitance: { type: String, trim: true, default: "" },
    lvBushing22_10kv_excitationCurrent: { type: String, trim: true, default: "" },
    lvBushing22_10kv_dielectricLoss: { type: String, trim: true, default: "" },

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 1 Form 7 (Record of Measurement of IR Values)
const Stage1Form7SubSchema = new mongoose.Schema(
  {
    // Basic test information
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    ambTemp: { type: String, trim: true, default: "" },
    make: { type: String, trim: true, default: "" },
    oilTemp: { type: String, trim: true, default: "" },
    srNo: { type: String, trim: true, default: "" },
    wdgTemp: { type: String, trim: true, default: "" },
    range: { type: String, trim: true, default: "" },
    relativeHumidity: { type: String, trim: true, default: "" },
    voltageLevel: { type: String, trim: true, default: "" },

    // IR measurements
    hvEarth_10sec: { type: String, trim: true, default: "" },
    hvEarth_60sec: { type: String, trim: true, default: "" },
    hvEarth_ratio: { type: String, trim: true, default: "" },
    lvEarth_10sec: { type: String, trim: true, default: "" },
    lvEarth_60sec: { type: String, trim: true, default: "" },
    lvEarth_ratio: { type: String, trim: true, default: "" },
    hvLv_10sec: { type: String, trim: true, default: "" },
    hvLv_60sec: { type: String, trim: true, default: "" },
    hvLv_ratio: { type: String, trim: true, default: "" },

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Filtration records (nested within Stage2Form1)
const FiltrationRecordSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    vacuumLevel: { type: String, trim: true, default: "" },
    inletTemp: { type: String, trim: true, default: "" },
    outletTemp: { type: String, trim: true, default: "" },
    remark: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 2 Form 1 (Record of Oil Handling)
const Stage2Form1SubSchema = new mongoose.Schema(
  {
    // Tank 1 data
    tank1_noOfBarrels: { type: String, trim: true, default: "" },
    tank1_startedDate: { type: String, trim: true, default: "" },
    tank1_startedTime: { type: String, trim: true, default: "" },
    tank1_completedDate: { type: String, trim: true, default: "" },
    tank1_completedTime: { type: String, trim: true, default: "" },
    tank1_bdv: { type: String, trim: true, default: "" },
    tank1_ppm: { type: String, trim: true, default: "" },

    // Tank 2 data
    tank2_noOfBarrels: { type: String, trim: true, default: "" },
    tank2_startedDate: { type: String, trim: true, default: "" },
    tank2_startedTime: { type: String, trim: true, default: "" },
    tank2_completedDate: { type: String, trim: true, default: "" },
    tank2_completedTime: { type: String, trim: true, default: "" },
    tank2_bdv: { type: String, trim: true, default: "" },
    tank2_ppm: { type: String, trim: true, default: "" },

    // Tank 3 data
    tank3_noOfBarrels: { type: String, trim: true, default: "" },
    tank3_startedDate: { type: String, trim: true, default: "" },
    tank3_startedTime: { type: String, trim: true, default: "" },
    tank3_completedDate: { type: String, trim: true, default: "" },
    tank3_completedTime: { type: String, trim: true, default: "" },
    tank3_bdv: { type: String, trim: true, default: "" },
    tank3_ppm: { type: String, trim: true, default: "" },

    // Reservoir Tank Filtration
    filtrationRecords: [FiltrationRecordSchema],
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 2 Form 2 (Line Lead Clearance and IR Values After Erection)
const Stage2Form2SubSchema = new mongoose.Schema(
  {
    // Line Lead Clearance in mm
    hv_earth_11: { type: String, trim: true, default: "" },
    hv_earth_12: { type: String, trim: true, default: "" },
    lv1_earth_21: { type: String, trim: true, default: "" },
    lv1_earth_22: { type: String, trim: true, default: "" },
    lv2_earth_31: { type: String, trim: true, default: "" },
    lv2_earth_32: { type: String, trim: true, default: "" },

    // Temperature readings
    tempOTI: { type: String, trim: true, default: "" },
    tempWTI: { type: String, trim: true, default: "" },
    tempAMB: { type: String, trim: true, default: "" },

    // IR measurements (15sec and 60sec)
    hvEarth_15sec: { type: String, trim: true, default: "" },
    hvEarth_60sec: { type: String, trim: true, default: "" },
    hvEarth_ratio: { type: String, trim: true, default: "" },
    lv1Earth_15sec: { type: String, trim: true, default: "" },
    lv1Earth_60sec: { type: String, trim: true, default: "" },
    lv1Earth_ratio: { type: String, trim: true, default: "" },
    lv2Earth_15sec: { type: String, trim: true, default: "" },
    lv2Earth_60sec: { type: String, trim: true, default: "" },
    lv2Earth_ratio: { type: String, trim: true, default: "" },
    hvLv1_15sec: { type: String, trim: true, default: "" },
    hvLv1_60sec: { type: String, trim: true, default: "" },
    hvLv1_ratio: { type: String, trim: true, default: "" },
    hvLv2_15sec: { type: String, trim: true, default: "" },
    hvLv2_60sec: { type: String, trim: true, default: "" },
    hvLv2_ratio: { type: String, trim: true, default: "" },
    lv1Lv2_15sec: { type: String, trim: true, default: "" },
    lv1Lv2_60sec: { type: String, trim: true, default: "" },
    lv1Lv2_ratio: { type: String, trim: true, default: "" },

    // Before oil filling in main tank
    bdv: { type: String, trim: true, default: "" },
    waterContent: { type: String, trim: true, default: "" },

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// --- SUB-SCHEMAS FOR STAGE 3 ---

// Sub-schema for pressure test records
const PressureTestRecordSubSchema = new mongoose.Schema(
  {
    timeStarted: { type: String, trim: true, default: "" },
    pressure: { type: String, trim: true, default: "" },
    tempAmb: { type: String, trim: true, default: "" },
    tempOti: { type: String, trim: true, default: "" },
    tempWti: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for vacuum records (nested within Stage3Form1)
const VacuumRecordSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    vacuumLevelMic: { type: String, trim: true, default: "" },
    vacuumLevelTransformer: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 3 Form 1 (Details for Recording of Vacuum Cycle)
const Stage3Form1SubSchema = new mongoose.Schema(
  {
    // Vacuum cycle details
    vacuumHoseCheckedBy: { type: String, trim: true, default: "" },
    vacuumHoseConnectedTo: { type: String, trim: true, default: "" },
    evacuationStartedAt: { type: String, trim: true, default: "" },
    evacuationStartedOn: { type: String, trim: true, default: "" },

    // Vacuum cycle records
    vacuumRecords: [VacuumRecordSchema],

    // Temperature readings for IR test
    tempOTI: { type: String, trim: true, default: "" },
    tempWTI: { type: String, trim: true, default: "" },
    tempAMB: { type: String, trim: true, default: "" },

    // IR measurements (15sec and 60sec)
    hvEarth_15sec: { type: String, trim: true, default: "" },
    hvEarth_60sec: { type: String, trim: true, default: "" },
    hvEarth_ratio: { type: String, trim: true, default: "" },
    lv1Earth_15sec: { type: String, trim: true, default: "" },
    lv1Earth_60sec: { type: String, trim: true, default: "" },
    lv1Earth_ratio: { type: String, trim: true, default: "" },
    lv2Earth_15sec: { type: String, trim: true, default: "" },
    lv2Earth_60sec: { type: String, trim: true, default: "" },
    lv2Earth_ratio: { type: String, trim: true, default: "" },
    hvLv1_15sec: { type: String, trim: true, default: "" },
    hvLv1_60sec: { type: String, trim: true, default: "" },
    hvLv1_ratio: { type: String, trim: true, default: "" },
    hvLv2_15sec: { type: String, trim: true, default: "" },
    hvLv2_60sec: { type: String, trim: true, default: "" },
    hvLv2_ratio: { type: String, trim: true, default: "" },
    lv1Lv2_15sec: { type: String, trim: true, default: "" },
    lv1Lv2_60sec: { type: String, trim: true, default: "" },
    lv1Lv2_ratio: { type: String, trim: true, default: "" },

    // Pressure Test Report
    pressureTestDate: { type: String, trim: true, default: "" },
    pressureTestRecords: [PressureTestRecordSubSchema],

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for individual filtration records for Stage 3 Form 2
const Stage3FiltrationRecordSubSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    vacuumLevel: { type: String, trim: true, default: "" },
    mcOutletTemp: { type: String, trim: true, default: "" },
    otiTemp: { type: String, trim: true, default: "" },
    wtiTemp: { type: String, trim: true, default: "" },
    remark: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 3 Form 2
const Stage3Form2SubSchema = new mongoose.Schema(
  {
    filtrationRecords: { type: [Stage3FiltrationRecordSubSchema], default: [] },
    tempOTI: { type: String, trim: true, default: "" },
    tempWTI: { type: String, trim: true, default: "" },
    tempAMB: { type: String, trim: true, default: "" },
    hvEarth15Sec: { type: String, trim: true, default: "" },
    hvEarth60Sec: { type: String, trim: true, default: "" },
    ratioIR60IR15: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for records that have the same structure in Stage 3 Form 3
const Stage3RecordSubSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    vacuumLevel: { type: String, trim: true, default: "" },
    mcOutletTemp: { type: String, trim: true, default: "" },
    otiTemp: { type: String, trim: true, default: "" },
    wtiTemp: { type: String, trim: true, default: "" },
    remark: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 3 Form 3
const Stage3Form3SubSchema = new mongoose.Schema(
  {
    radiatorRecords: { type: [Stage3RecordSubSchema], default: [] },
    combineRecords: { type: [Stage3RecordSubSchema], default: [] },
    bdvKV: { type: String, trim: true, default: "" },
    waterContentPPM: { type: String, trim: true, default: "" },
    tempOTI: { type: String, trim: true, default: "" },
    tempWTI: { type: String, trim: true, default: "" },
    tempAMB: { type: String, trim: true, default: "" },
    hvEarth15Sec: { type: String, trim: true, default: "" },
    hvEarth60Sec: { type: String, trim: true, default: "" },
    hvEarth600Sec: { type: String, trim: true, default: "" },
    hvEarth60600Sec: { type: String, trim: true, default: "" },
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// --- SUB-SCHEMAS FOR STAGE 4 ---

// Sub-schema for voltage ratio test records
const VoltageRatioTestSubSchema = new mongoose.Schema(
  {
    appliedVoltage11_12: { type: String, trim: true, default: "" },
    measuredVoltage11_21: { type: String, trim: true, default: "" },
    measuredVoltage12_21: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for magnetising test records
const MagnetisingTestSubSchema = new mongoose.Schema(
  {
    appliedVoltage: { type: String, trim: true, default: "" },
    measuredCurrent: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for signatures
const SignatureSubSchema = new mongoose.Schema(
  {
    vpesName: { type: String, trim: true },
    vpesSignature: { type: String, trim: true }, // Storing base64 image data as a string
    customerName: { type: String, trim: true },
    customerSignature: { type: String, trim: true }, // Storing base64 image data as a string
  },
  { _id: false }
);

// Sub-schema for oil filtration records (nested within Stage4Form1)
const Stage4FiltrationRecordSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    vacuumLevel: { type: String, trim: true, default: "" },
    mcOutletTemp: { type: String, trim: true, default: "" },
    otiTemp: { type: String, trim: true, default: "" },
    wtiTemp: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 4 Form 1 (Record for Oil Filtration)
const Stage4Form1SubSchema = new mongoose.Schema(
  {
    // Oil filtration records
    filtrationRecords: [Stage4FiltrationRecordSchema],
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for cooler bank filtration records (nested within Stage4Form2)
const Stage4CoolerBankRecordSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    vacuumLevel: { type: String, trim: true, default: "" },
    mcOutletTemp: { type: String, trim: true, default: "" },
    otiTemp: { type: String, trim: true, default: "" },
    wtiTemp: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 4 Form 2 (IR Value before radiator/combine filtration)
const Stage4Form2SubSchema = new mongoose.Schema(
  {
    // IR Value before radiator/combine filtration
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    insulationTesterDetails: { type: String, trim: true, default: "" },
    ambTemp: { type: String, trim: true, default: "" },
    make: { type: String, trim: true, default: "" },
    oilTemp: { type: String, trim: true, default: "" },
    srNo: { type: String, trim: true, default: "" },
    wdgTemp: { type: String, trim: true, default: "" },
    range: { type: String, trim: true, default: "" },
    relativeHumidity: { type: String, trim: true, default: "" },
    voltageLevel: { type: String, trim: true, default: "" },

    // Temperature readings
    tempOTI: { type: String, trim: true, default: "" },
    tempWTI: { type: String, trim: true, default: "" },
    tempAMB: { type: String, trim: true, default: "" },

    // IR measurements (15sec and 60sec)
    hvEarth_15sec: { type: String, trim: true, default: "" },
    hvEarth_60sec: { type: String, trim: true, default: "" },
    hvEarth_ratio: { type: String, trim: true, default: "" },
    lv1Earth_15sec: { type: String, trim: true, default: "" },
    lv1Earth_60sec: { type: String, trim: true, default: "" },
    lv1Earth_ratio: { type: String, trim: true, default: "" },
    lv2Earth_15sec: { type: String, trim: true, default: "" },
    lv2Earth_60sec: { type: String, trim: true, default: "" },
    lv2Earth_ratio: { type: String, trim: true, default: "" },
    hvLv1_15sec: { type: String, trim: true, default: "" },
    hvLv1_60sec: { type: String, trim: true, default: "" },
    hvLv1_ratio: { type: String, trim: true, default: "" },
    hvLv2_15sec: { type: String, trim: true, default: "" },
    hvLv2_60sec: { type: String, trim: true, default: "" },
    hvLv2_ratio: { type: String, trim: true, default: "" },
    lv1Lv2_15sec: { type: String, trim: true, default: "" },
    lv1Lv2_60sec: { type: String, trim: true, default: "" },
    lv1Lv2_ratio: { type: String, trim: true, default: "" },

    // Oil filtration of Cooler Bank
    coolerBankRecords: [Stage4CoolerBankRecordSchema],

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for combine filtration records (nested within Stage4Form3)
const Stage4CombineRecordSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    vacuumLevel: { type: String, trim: true, default: "" },
    mcOutletTemp: { type: String, trim: true, default: "" },
    otiTemp: { type: String, trim: true, default: "" },
    wtiTemp: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 4 Form 3 (Oil filtration of Combine - Main Tank + Cooler bank)
const Stage4Form3SubSchema = new mongoose.Schema(
  {
    // Oil filtration of Combine (Main Tank + Cooler bank)
    combineRecords: [Stage4CombineRecordSchema],
    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 4 Form 4 (IR & PI Value after filtration)
const Stage4Form4SubSchema = new mongoose.Schema(
  {
    // IR & PI Value after filtration
    date: { type: String, trim: true, default: "" },
    time: { type: String, trim: true, default: "" },
    insulationTesterDetails: { type: String, trim: true, default: "" },
    ambTemp: { type: String, trim: true, default: "" },
    make: { type: String, trim: true, default: "" },
    oilTemp: { type: String, trim: true, default: "" },
    srNo: { type: String, trim: true, default: "" },
    wdgTemp: { type: String, trim: true, default: "" },
    range: { type: String, trim: true, default: "" },
    relativeHumidity: { type: String, trim: true, default: "" },
    voltageLevel: { type: String, trim: true, default: "" },

    // Temperature readings
    tempOTI: { type: String, trim: true, default: "" },
    tempWTI: { type: String, trim: true, default: "" },
    tempAMB: { type: String, trim: true, default: "" },

    // IR measurements (10sec, 60sec, 600sec, and PI)
    hvEarth_10sec: { type: String, trim: true, default: "" },
    hvEarth_60sec: { type: String, trim: true, default: "" },
    hvEarth_600sec: { type: String, trim: true, default: "" },
    hvEarth_pi: { type: String, trim: true, default: "" },
    lv1Earth_10sec: { type: String, trim: true, default: "" },
    lv1Earth_60sec: { type: String, trim: true, default: "" },
    lv1Earth_600sec: { type: String, trim: true, default: "" },
    lv1Earth_pi: { type: String, trim: true, default: "" },
    lv2Earth_10sec: { type: String, trim: true, default: "" },
    lv2Earth_60sec: { type: String, trim: true, default: "" },
    lv2Earth_600sec: { type: String, trim: true, default: "" },
    lv2Earth_pi: { type: String, trim: true, default: "" },
    hvLv1_10sec: { type: String, trim: true, default: "" },
    hvLv1_60sec: { type: String, trim: true, default: "" },
    hvLv1_600sec: { type: String, trim: true, default: "" },
    hvLv1_pi: { type: String, trim: true, default: "" },
    hvLv2_10sec: { type: String, trim: true, default: "" },
    hvLv2_60sec: { type: String, trim: true, default: "" },
    hvLv2_600sec: { type: String, trim: true, default: "" },
    hvLv2_pi: { type: String, trim: true, default: "" },
    lv1Lv2_10sec: { type: String, trim: true, default: "" },
    lv1Lv2_60sec: { type: String, trim: true, default: "" },
    lv1Lv2_600sec: { type: String, trim: true, default: "" },
    lv1Lv2_pi: { type: String, trim: true, default: "" },

    // After Oil Filtration of main tank
    bdv: { type: String, trim: true, default: "" },
    waterContent: { type: String, trim: true, default: "" },

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// --- SUB-SCHEMAS FOR STAGE 5 ---

// Sub-schema for valve status and air venting
const StatusQtySubSchema = new mongoose.Schema(
  {
    qty: { type: String, trim: true, default: "" },
    status: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for protection trails
const ProtectionTrailsSubSchema = new mongoose.Schema(
  { checked: { type: String, trim: true, default: "" } },
  { _id: false }
);

// Sub-schema for bushing test tap
const BushingTestTapSubSchema = new mongoose.Schema(
  {
    hvTestCapEarthed: { type: String, trim: true, default: "" },
    lvTestCapEarthed: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for a more detailed signatures object
const DetailedSignatureSubSchema = new mongoose.Schema(
  {
    vpesName: { type: String, trim: true, default: "" },
    vpesDesignation: { type: String, trim: true, default: "" },
    vpesSignature: { type: String, trim: true, default: "" },
    vpesDate: { type: String, trim: true, default: "" },
    customerName: { type: String, trim: true, default: "" },
    customerDesignation: { type: String, trim: true, default: "" },
    customerSignature: { type: String, trim: true, default: "" },
    customerDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for Stage 5 Form 1 (Test Record of Erection for Traction Transformer)
const Stage5Form1SubSchema = new mongoose.Schema(
  {
    // Test equipment details
    makeOfMeter: { type: String, trim: true, default: "" },
    date: { type: String, trim: true, default: "" },
    modelSrNo: { type: String, trim: true, default: "" },
    ambient: { type: String, trim: true, default: "" },
    oti: { type: String, trim: true, default: "" },
    wti: { type: String, trim: true, default: "" },
    testReportReviewedBy: { type: String, trim: true, default: "" },
    acceptanceOfTest: { type: String, trim: true, default: "" },

    // Transformer details
    trSrNo: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    customer: { type: String, trim: true, default: "" },
    testDate: { type: String, trim: true, default: "" },
    testTime: { type: String, trim: true, default: "" },

    // Test conditions
    ambTemp: { type: String, trim: true, default: "" },
    make: { type: String, trim: true, default: "" },
    oilTemp: { type: String, trim: true, default: "" },
    srNo: { type: String, trim: true, default: "" },
    wdgTemp: { type: String, trim: true, default: "" },
    voltageLevel: { type: String, trim: true, default: "" },

    // IR measurements (15sec, 60sec, 600sec, and ratios)
    hvEarth_15sec: { type: String, trim: true, default: "" },
    hvEarth_60sec: { type: String, trim: true, default: "" },
    hvEarth_600sec: { type: String, trim: true, default: "" },
    hvEarth_ratio60_15: { type: String, trim: true, default: "" },
    hvEarth_ratio600_60: { type: String, trim: true, default: "" },
    lvEarth_15sec: { type: String, trim: true, default: "" },
    lvEarth_60sec: { type: String, trim: true, default: "" },
    lvEarth_600sec: { type: String, trim: true, default: "" },
    lvEarth_ratio60_15: { type: String, trim: true, default: "" },
    lvEarth_ratio600_60: { type: String, trim: true, default: "" },
    hvLv_15sec: { type: String, trim: true, default: "" },
    hvLv_60sec: { type: String, trim: true, default: "" },
    hvLv_600sec: { type: String, trim: true, default: "" },
    hvLv_ratio60_15: { type: String, trim: true, default: "" },
    hvLv_ratio600_60: { type: String, trim: true, default: "" },

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// Sub-schema for Stage 5 Form 2 (Type of Test - Polarity Test)
const Stage5Form2SubSchema = new mongoose.Schema(
  {
    // Polarity Test - Condition 1
    condition1_terminal1: { type: String, trim: true, default: "" },
    condition1_terminal2: { type: String, trim: true, default: "" },

    // Polarity Test - Condition 2
    condition2_terminal1: { type: String, trim: true, default: "" },
    condition2_terminal2: { type: String, trim: true, default: "" },

    photos: { type: Map, of: String, default: {} },
  },
  { _id: false }
);

// --- SUB-SCHEMAS FOR STAGE 6 ---

// Sub-schema for Stage 6 Form 1
const Stage6Form1SubSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      trim: true,
      default: "",
    },
    orderNumber: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      trim: true,
      default: "",
    },
    capacity: {
      type: String,
      trim: true,
      default: "",
    },
    voltageRating: {
      type: String,
      trim: true,
      default: "",
    },
    make: {
      type: String,
      trim: true,
      default: "",
    },
    serialNumber: {
      type: String,
      trim: true,
      default: "",
    },
    completionDate: {
      type: String,
      trim: true,
      default: "",
    },
    chargingDate: {
      type: String,
      trim: true,
      default: "",
    },
    commissioningDate: {
      type: String,
      trim: true,
      default: "",
    },
    signatures: {
      type: DetailedSignatureSubSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

// --- Main Schema to merge all forms into a single document ---

const TractionSchema = new mongoose.Schema(
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
    TractionData: {
      stage1: {
        form1: { type: Stage1Form1SubSchema, default: () => ({}) },
        form2: { type: Stage1Form2SubSchema, default: () => ({}) },
        form3: { type: Stage1Form3SubSchema, default: () => ({}) },
        form4: { type: Stage1Form4SubSchema, default: () => ({}) },
        form5: { type: Stage1Form5SubSchema, default: () => ({}) },
        form6: { type: Stage1Form6SubSchema, default: () => ({}) },
        form7: { type: Stage1Form7SubSchema, default: () => ({}) },
      },
      stage2: {
        form1: { type: Stage2Form1SubSchema, default: () => ({}) },
        form2: { type: Stage2Form2SubSchema, default: () => ({}) },
      },
      stage3: {
        form1: { type: Stage3Form1SubSchema, default: () => ({}) },
        form2: { type: Stage3Form2SubSchema, default: () => ({}) },
        form3: { type: Stage3Form3SubSchema, default: () => ({}) },
      },
      stage4: {
        form1: { type: Stage4Form1SubSchema, default: () => ({}) },
        form2: { type: Stage4Form2SubSchema, default: () => ({}) },
        form3: { type: Stage4Form3SubSchema, default: () => ({}) },
        form4: { type: Stage4Form4SubSchema, default: () => ({}) },
      },
      stage5: {
        form1: { type: Stage5Form1SubSchema, default: () => ({}) },
        form2: { type: Stage5Form2SubSchema, default: () => ({}) },
      },
      stage6: {
        form1: { type: Stage6Form1SubSchema, default: () => ({}) },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Traction", TractionSchema);
