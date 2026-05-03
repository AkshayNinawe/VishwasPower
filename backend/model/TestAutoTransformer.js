import mongoose from "mongoose";

// ─── 1. CT TEST FORM ──────────────────────────────────────────────────────────
const CTTestFormSchema = new mongoose.Schema(
  {
    // Name Plate Details
    np_make_11:      { type: String, trim: true, default: "" },
    np_make_2:       { type: String, trim: true, default: "" },
    np_make_21:      { type: String, trim: true, default: "" },
    np_make_wti:     { type: String, trim: true, default: "" },
    np_type_11:      { type: String, trim: true, default: "" },
    np_type_2:       { type: String, trim: true, default: "" },
    np_type_21:      { type: String, trim: true, default: "" },
    np_type_wti:     { type: String, trim: true, default: "" },
    np_mfgSrNo_11:   { type: String, trim: true, default: "" },
    np_mfgSrNo_2:    { type: String, trim: true, default: "" },
    np_mfgSrNo_21:   { type: String, trim: true, default: "" },
    np_mfgSrNo_wti:  { type: String, trim: true, default: "" },
    np_yearMfg_11:   { type: String, trim: true, default: "" },
    np_yearMfg_2:    { type: String, trim: true, default: "" },
    np_yearMfg_21:   { type: String, trim: true, default: "" },
    np_yearMfg_wti:  { type: String, trim: true, default: "" },

    // Core 1.1 — CT Ratio measured secondary current
    ct11_20:  { type: String, trim: true, default: "" },
    ct11_40:  { type: String, trim: true, default: "" },
    ct11_60:  { type: String, trim: true, default: "" },
    ct11_80:  { type: String, trim: true, default: "" },
    ct11_100: { type: String, trim: true, default: "" },

    // Core 1.1 — Knee Point Voltage
    kp11_20:  { type: String, trim: true, default: "" },
    kp11_40:  { type: String, trim: true, default: "" },
    kp11_60:  { type: String, trim: true, default: "" },
    kp11_80:  { type: String, trim: true, default: "" },
    kp11_100: { type: String, trim: true, default: "" },
    kp11_110: { type: String, trim: true, default: "" },

    // Core 1.1 — Continuity / Resistance
    cont11_1: { type: String, trim: true, default: "" },
    res11_1:  { type: String, trim: true, default: "" },

    // Core 2 — CT Ratio measured secondary current
    ct2_20:  { type: String, trim: true, default: "" },
    ct2_40:  { type: String, trim: true, default: "" },
    ct2_60:  { type: String, trim: true, default: "" },
    ct2_80:  { type: String, trim: true, default: "" },
    ct2_100: { type: String, trim: true, default: "" },

    // Core 2 — Knee Point Voltage
    kp2_20:  { type: String, trim: true, default: "" },
    kp2_40:  { type: String, trim: true, default: "" },
    kp2_60:  { type: String, trim: true, default: "" },
    kp2_80:  { type: String, trim: true, default: "" },
    kp2_100: { type: String, trim: true, default: "" },
    kp2_110: { type: String, trim: true, default: "" },

    // Core 2 — Continuity / Resistance
    cont2_1: { type: String, trim: true, default: "" },
    res2_1:  { type: String, trim: true, default: "" },

    // Core 2.1 — CT Ratio measured secondary current
    ct21_20:  { type: String, trim: true, default: "" },
    ct21_40:  { type: String, trim: true, default: "" },
    ct21_60:  { type: String, trim: true, default: "" },
    ct21_80:  { type: String, trim: true, default: "" },
    ct21_100: { type: String, trim: true, default: "" },

    // Core 2.1 — Knee Point Voltage
    kp21_20:  { type: String, trim: true, default: "" },
    kp21_40:  { type: String, trim: true, default: "" },
    kp21_60:  { type: String, trim: true, default: "" },
    kp21_80:  { type: String, trim: true, default: "" },
    kp21_100: { type: String, trim: true, default: "" },
    kp21_110: { type: String, trim: true, default: "" },

    // Core 2.1 — Continuity / Resistance
    cont21_1: { type: String, trim: true, default: "" },
    res21_1:  { type: String, trim: true, default: "" },

    // Core WTI — CT Ratio measured secondary current
    ctwti_20:  { type: String, trim: true, default: "" },
    ctwti_40:  { type: String, trim: true, default: "" },
    ctwti_60:  { type: String, trim: true, default: "" },
    ctwti_80:  { type: String, trim: true, default: "" },
    ctwti_100: { type: String, trim: true, default: "" },

    // Core WTI — Continuity / Resistance
    contwti_1: { type: String, trim: true, default: "" },
    reswti_1:  { type: String, trim: true, default: "" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 2. PRE-CONNECTION TEST FORM ──────────────────────────────────────────────
const PreConnectionTestFormSchema = new mongoose.Schema(
  {
    // IR Values
    ir_date:         { type: String, trim: true, default: "" },
    ir_time:         { type: String, trim: true, default: "" },
    ir_ambTemp:      { type: String, trim: true, default: "" },
    ir_wdgTemp:      { type: String, trim: true, default: "" },
    ir_coreTemp:     { type: String, trim: true, default: "" },
    ir_relHumidity:  { type: String, trim: true, default: "" },
    ir_make:         { type: String, trim: true, default: "MEGGER" },
    ir_srNo:         { type: String, trim: true, default: "A01148D22" },
    ir_range:        { type: String, trim: true, default: "1-TO-5 Kv" },
    ir_voltageLevel: { type: String, trim: true, default: "" },
    ir_10sec:        { type: String, trim: true, default: "100" },
    ir_60sec:        { type: String, trim: true, default: "1000" },
    ir_ratio:        { type: String, trim: true, default: "10" },

    // Ratio Test
    rt_meterMake:  { type: String, trim: true, default: "Eltel" },
    rt_srNo:       { type: String, trim: true, default: "20151603" },
    rt_date:       { type: String, trim: true, default: "" },
    rt_time:       { type: String, trim: true, default: "" },
    rt_11_2_cal:   { type: String, trim: true, default: "2.000" },
    rt_11_2_meas:  { type: String, trim: true, default: "2.003" },
    rt_11_2_dev:   { type: String, trim: true, default: "0.15" },
    rt_11_21_cal:  { type: String, trim: true, default: "2.000" },
    rt_11_21_meas: { type: String, trim: true, default: "1.9985" },
    rt_11_21_dev:  { type: String, trim: true, default: "-0.075" },
    rt_21_2_cal:   { type: String, trim: true, default: "1.000" },
    rt_21_2_meas:  { type: String, trim: true, default: "1.0003" },
    rt_21_2_dev:   { type: String, trim: true, default: "0.03" },

    // Voltage Ratio Test
    vr_11_2_app:  { type: String, trim: true, default: "" },
    vr_11_2_1121: { type: String, trim: true, default: "" },
    vr_11_2_221:  { type: String, trim: true, default: "" },
    vr_1121_app:  { type: String, trim: true, default: "" },
    vr_1121_112:  { type: String, trim: true, default: "" },
    vr_1121_221:  { type: String, trim: true, default: "" },
    vr_212_app:   { type: String, trim: true, default: "" },
    vr_212_112:   { type: String, trim: true, default: "" },
    vr_212_1121:  { type: String, trim: true, default: "" },

    // Magnetizing Current Test
    mag_appVoltage: { type: String, trim: true, default: "" },
    mag_date:       { type: String, trim: true, default: "" },
    mag_time:       { type: String, trim: true, default: "" },
    mag_meterMake:  { type: String, trim: true, default: "HTC" },
    mag_srNo:       { type: String, trim: true, default: "HTC2406CG0246" },
    mag_11_2_appV:  { type: String, trim: true, default: "" },
    mag_11_2_curr:  { type: String, trim: true, default: "" },
    mag_1121_appV:  { type: String, trim: true, default: "" },
    mag_1121_curr:  { type: String, trim: true, default: "" },
    mag_212_appV:   { type: String, trim: true, default: "" },
    mag_212_curr:   { type: String, trim: true, default: "" },

    // Winding Resistance Test
    wr_make:      { type: String, trim: true, default: "PRESTIGE ELECTRONICS" },
    wr_date:      { type: String, trim: true, default: "" },
    wr_time:      { type: String, trim: true, default: "" },
    wr_srNo:      { type: String, trim: true, default: "PE/12-JAN/09" },
    wr_wdgTemp:   { type: String, trim: true, default: "55" },
    wr_coreTemp:  { type: String, trim: true, default: "26" },
    wr_range:     { type: String, trim: true, default: "1999.9 μΩ-19.999Ω" },
    wr_ambient:   { type: String, trim: true, default: "26" },
    wr_humidity:  { type: String, trim: true, default: "40" },
    wr_11_2_amb:  { type: String, trim: true, default: "0.5869" },
    wr_11_2_75:   { type: String, trim: true, default: "0.62738" },
    wr_11_2_max:  { type: String, trim: true, default: "0.66" },
    wr_1121_amb:  { type: String, trim: true, default: "0.2985" },
    wr_1121_75:   { type: String, trim: true, default: "0.31909" },
    wr_1121_max:  { type: String, trim: true, default: "0.33" },
    wr_212_amb:   { type: String, trim: true, default: "0.2965" },
    wr_212_75:    { type: String, trim: true, default: "0.31695" },
    wr_212_max:   { type: String, trim: true, default: "0.33" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 3. POST-CONNECTION TEST FORM ─────────────────────────────────────────────
const PostConnectionTestFormSchema = new mongoose.Schema(
  {
    // IR Values
    ir_date:         { type: String, trim: true, default: "" },
    ir_time:         { type: String, trim: true, default: "" },
    ir_ambTemp:      { type: String, trim: true, default: "" },
    ir_wdgTemp:      { type: String, trim: true, default: "" },
    ir_coreTemp:     { type: String, trim: true, default: "" },
    ir_relHumidity:  { type: String, trim: true, default: "" },
    ir_voltageLevel: { type: String, trim: true, default: "" },
    ir_10sec:        { type: String, trim: true, default: "1000" },
    ir_60sec:        { type: String, trim: true, default: "1000" },
    ir_ratio:        { type: String, trim: true, default: "1" },

    // Ratio Test
    rt_date:       { type: String, trim: true, default: "" },
    rt_time:       { type: String, trim: true, default: "" },
    rt_11_2_cal:   { type: String, trim: true, default: "2.000" },
    rt_11_2_meas:  { type: String, trim: true, default: "2.003" },
    rt_11_2_dev:   { type: String, trim: true, default: "0.15" },
    rt_11_21_cal:  { type: String, trim: true, default: "2.000" },
    rt_11_21_meas: { type: String, trim: true, default: "1.999" },
    rt_11_21_dev:  { type: String, trim: true, default: "-0.05" },
    rt_21_2_cal:   { type: String, trim: true, default: "1.000" },
    rt_21_2_meas:  { type: String, trim: true, default: "1.0003" },
    rt_21_2_dev:   { type: String, trim: true, default: "0.03" },

    // Voltage Ratio Test
    vr_11_2_app:  { type: String, trim: true, default: "" },
    vr_11_2_1121: { type: String, trim: true, default: "" },
    vr_11_2_221:  { type: String, trim: true, default: "" },
    vr_1121_app:  { type: String, trim: true, default: "" },
    vr_1121_112:  { type: String, trim: true, default: "" },
    vr_1121_221:  { type: String, trim: true, default: "" },
    vr_212_app:   { type: String, trim: true, default: "" },
    vr_212_112:   { type: String, trim: true, default: "" },
    vr_212_1121:  { type: String, trim: true, default: "" },

    // Magnetizing Current Test
    mag_appVoltage: { type: String, trim: true, default: "" },
    mag_date:       { type: String, trim: true, default: "" },
    mag_time:       { type: String, trim: true, default: "" },
    mag_11_2_appV:  { type: String, trim: true, default: "" },
    mag_11_2_curr:  { type: String, trim: true, default: "" },
    mag_1121_appV:  { type: String, trim: true, default: "" },
    mag_1121_curr:  { type: String, trim: true, default: "" },
    mag_212_appV:   { type: String, trim: true, default: "" },
    mag_212_curr:   { type: String, trim: true, default: "" },

    // Short Circuit Test
    sc_appVoltage:  { type: String, trim: true, default: "" },
    sc_date:        { type: String, trim: true, default: "" },
    sc_time:        { type: String, trim: true, default: "" },
    sc_11_2_appV2:  { type: String, trim: true, default: "20" },
    sc_11_2_curr3:  { type: String, trim: true, default: "20" },
    sc_11_2_curr4:  { type: String, trim: true, default: "40" },
    sc_112_appV2:   { type: String, trim: true, default: "20" },
    sc_112_curr3:   { type: String, trim: true, default: "20" },
    sc_112_curr4:   { type: String, trim: true, default: "40" },
    sc_percentZ:    { type: String, trim: true, default: "0.26" },

    // Winding Resistance Test
    wr_date:      { type: String, trim: true, default: "" },
    wr_time:      { type: String, trim: true, default: "" },
    wr_wdgTemp:   { type: String, trim: true, default: "55" },
    wr_coreTemp:  { type: String, trim: true, default: "26" },
    wr_ambient:   { type: String, trim: true, default: "26" },
    wr_humidity:  { type: String, trim: true, default: "40" },
    wr_11_2_amb:  { type: String, trim: true, default: "0.22" },
    wr_11_2_75:   { type: String, trim: true, default: "0.23517" },
    wr_11_2_max:  { type: String, trim: true, default: "0.66" },
    wr_1121_amb:  { type: String, trim: true, default: "0.10256" },
    wr_1121_75:   { type: String, trim: true, default: "0.10963" },
    wr_1121_max:  { type: String, trim: true, default: "0.33" },
    wr_212_amb:   { type: String, trim: true, default: "0.10985" },
    wr_212_75:    { type: String, trim: true, default: "0.11743" },
    wr_212_max:   { type: String, trim: true, default: "0.33" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 4. PRE & POST VPD SERVICING FORM ────────────────────────────────────────
const PrePostVPDServicingFormSchema = new mongoose.Schema(
  {
    // Insulation Tester
    it_voltageLevel: { type: String, trim: true, default: "" },

    // Pre-Servicing
    pre_date:                    { type: String, trim: true, default: "" },
    pre_time:                    { type: String, trim: true, default: "" },
    pre_ambTemp:                 { type: String, trim: true, default: "" },
    pre_wdgTemp:                 { type: String, trim: true, default: "" },
    pre_relHumidity:             { type: String, trim: true, default: "" },
    pre_coreTemp:                { type: String, trim: true, default: "" },
    pre_ir_15sec:                { type: String, trim: true, default: "" },
    pre_ir_60sec:                { type: String, trim: true, default: "" },
    pre_mag_1121_appV:           { type: String, trim: true, default: "" },
    pre_mag_1121_curr:           { type: String, trim: true, default: "" },
    pre_mag_221_appV:            { type: String, trim: true, default: "" },
    pre_mag_221_curr:            { type: String, trim: true, default: "" },
    pre_mag_112_appV:            { type: String, trim: true, default: "" },
    pre_mag_112_curr:            { type: String, trim: true, default: "" },
    pre_2kv_coreFrame_voltage:   { type: String, trim: true, default: "" },
    pre_2kv_coreFrame_duration:  { type: String, trim: true, default: "" },
    pre_2kv_coreFrame_leakage:   { type: String, trim: true, default: "" },
    pre_2kv_frameFrame_voltage:  { type: String, trim: true, default: "" },
    pre_2kv_frameFrame_duration: { type: String, trim: true, default: "" },
    pre_2kv_frameFrame_leakage:  { type: String, trim: true, default: "" },

    // Post-Servicing
    post_date:                    { type: String, trim: true, default: "" },
    post_time:                    { type: String, trim: true, default: "" },
    post_ambTemp:                 { type: String, trim: true, default: "" },
    post_wdgTemp:                 { type: String, trim: true, default: "" },
    post_relHumidity:             { type: String, trim: true, default: "" },
    post_coreTemp:                { type: String, trim: true, default: "" },
    post_ir_15sec:                { type: String, trim: true, default: "" },
    post_ir_60sec:                { type: String, trim: true, default: "" },
    post_mag_1121_appV:           { type: String, trim: true, default: "" },
    post_mag_1121_curr:           { type: String, trim: true, default: "" },
    post_mag_221_appV:            { type: String, trim: true, default: "" },
    post_mag_221_curr:            { type: String, trim: true, default: "" },
    post_mag_112_appV:            { type: String, trim: true, default: "" },
    post_mag_112_curr:            { type: String, trim: true, default: "" },
    post_2kv_coreFrame_voltage:   { type: String, trim: true, default: "" },
    post_2kv_coreFrame_duration:  { type: String, trim: true, default: "" },
    post_2kv_coreFrame_leakage:   { type: String, trim: true, default: "" },
    post_2kv_frameFrame_voltage:  { type: String, trim: true, default: "" },
    post_2kv_frameFrame_duration: { type: String, trim: true, default: "" },
    post_2kv_frameFrame_leakage:  { type: String, trim: true, default: "" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 5. BUSHING TEST FORM ─────────────────────────────────────────────────────
const BushingTestFormSchema = new mongoose.Schema(
  {
    make:     { type: String, trim: true, default: "" },
    srNo:     { type: String, trim: true, default: "" },
    meterMake: { type: String, trim: true, default: "" },
    slNo:     { type: String, trim: true, default: "" },

    // Section 1.1 — 05 kV
    s1_05kv_tanDelta:     { type: String, trim: true, default: "" },
    s1_05kv_capacitance:  { type: String, trim: true, default: "" },
    s1_05kv_excitation:   { type: String, trim: true, default: "" },
    s1_05kv_dielectricLoss: { type: String, trim: true, default: "" },

    // Section 1.1 — 10 kV
    s1_10kv_tanDelta:     { type: String, trim: true, default: "" },
    s1_10kv_capacitance:  { type: String, trim: true, default: "" },
    s1_10kv_excitation:   { type: String, trim: true, default: "" },
    s1_10kv_dielectricLoss: { type: String, trim: true, default: "" },

    // Between sections
    srNo2: { type: String, trim: true, default: "" },
    make2: { type: String, trim: true, default: "" },

    // Section 2 — 05 kV
    s2_05kv_tanDelta:     { type: String, trim: true, default: "" },
    s2_05kv_capacitance:  { type: String, trim: true, default: "" },
    s2_05kv_excitation:   { type: String, trim: true, default: "" },
    s2_05kv_dielectricLoss: { type: String, trim: true, default: "" },

    // Section 2 — 10 kV
    s2_10kv_tanDelta:     { type: String, trim: true, default: "" },
    s2_10kv_capacitance:  { type: String, trim: true, default: "" },
    s2_10kv_excitation:   { type: String, trim: true, default: "" },
    s2_10kv_dielectricLoss: { type: String, trim: true, default: "" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 6. 2 KV TEST FORM ───────────────────────────────────────────────────────
const TwoKVTestFormSchema = new mongoose.Schema(
  {
    // Horizontal
    h_coreFrame_voltage:  { type: String, trim: true, default: "" },
    h_coreFrame_duration: { type: String, trim: true, default: "" },
    h_coreFrame_leakage:  { type: String, trim: true, default: "" },
    h_frameFrame_voltage:  { type: String, trim: true, default: "" },
    h_frameFrame_duration: { type: String, trim: true, default: "" },
    h_frameFrame_leakage:  { type: String, trim: true, default: "" },

    // Vertical
    v_coreFrame_voltage:  { type: String, trim: true, default: "" },
    v_coreFrame_duration: { type: String, trim: true, default: "" },
    v_coreFrame_leakage:  { type: String, trim: true, default: "" },
    v_frameFrame_voltage:  { type: String, trim: true, default: "" },
    v_frameFrame_duration: { type: String, trim: true, default: "" },
    v_frameFrame_leakage:  { type: String, trim: true, default: "" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 7. OIL SOAKING SERVICING PLANNING FORM ──────────────────────────────────
const OilSoakingFormSchema = new mongoose.Schema(
  {
    // Insulation Tester Details
    make:         { type: String, trim: true, default: "MEGGER" },
    srNo:         { type: String, trim: true, default: "A01148D22" },
    range:        { type: String, trim: true, default: "1-TO-5 kV" },
    voltageLevel: { type: String, trim: true, default: "1000V" },

    // Before Servicing
    before_date:                { type: String, trim: true, default: "" },
    before_time:                { type: String, trim: true, default: "" },
    before_ambTemp:             { type: String, trim: true, default: "" },
    before_wdgTemp:             { type: String, trim: true, default: "" },
    before_relHumidity:         { type: String, trim: true, default: "" },
    before_coreTemp:            { type: String, trim: true, default: "" },
    before_coreFrame_voltage:   { type: String, trim: true, default: "" },
    before_coreFrame_duration:  { type: String, trim: true, default: "" },
    before_coreFrame_mohm:      { type: String, trim: true, default: "" },
    before_frameFrame_voltage:  { type: String, trim: true, default: "" },
    before_frameFrame_duration: { type: String, trim: true, default: "" },
    before_frameFrame_mohm:     { type: String, trim: true, default: "" },
    before_frameTank_voltage:   { type: String, trim: true, default: "" },
    before_frameTank_duration:  { type: String, trim: true, default: "" },
    before_frameTank_mohm:      { type: String, trim: true, default: "" },

    // After Servicing
    after_date:                { type: String, trim: true, default: "" },
    after_time:                { type: String, trim: true, default: "" },
    after_ambTemp:             { type: String, trim: true, default: "" },
    after_wdgTemp:             { type: String, trim: true, default: "" },
    after_relHumidity:         { type: String, trim: true, default: "" },
    after_coreTemp:            { type: String, trim: true, default: "" },
    after_coreFrame_voltage:   { type: String, trim: true, default: "" },
    after_coreFrame_duration:  { type: String, trim: true, default: "" },
    after_coreFrame_mohm:      { type: String, trim: true, default: "" },
    after_frameFrame_voltage:  { type: String, trim: true, default: "" },
    after_frameFrame_duration: { type: String, trim: true, default: "" },
    after_frameFrame_mohm:     { type: String, trim: true, default: "" },
    after_frameTank_voltage:   { type: String, trim: true, default: "" },
    after_frameTank_duration:  { type: String, trim: true, default: "" },
    after_frameTank_mohm:      { type: String, trim: true, default: "" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 8. POST-TANKING TEST FORM ────────────────────────────────────────────────
const PostTankingTestFormSchema = new mongoose.Schema(
  {
    // IR Values
    ir_date:         { type: String, trim: true, default: "" },
    ir_time:         { type: String, trim: true, default: "" },
    ir_ambTemp:      { type: String, trim: true, default: "" },
    ir_wdgTemp:      { type: String, trim: true, default: "" },
    ir_coreTemp:     { type: String, trim: true, default: "" },
    ir_relHumidity:  { type: String, trim: true, default: "" },
    ir_make:         { type: String, trim: true, default: "MEGGER" },
    ir_srNo:         { type: String, trim: true, default: "101979324" },
    ir_range:        { type: String, trim: true, default: "1-TO-5 kV" },
    ir_voltageLevel: { type: String, trim: true, default: "" },
    ir_10sec:        { type: String, trim: true, default: "1000" },
    ir_60sec:        { type: String, trim: true, default: "1000" },
    ir_ratio:        { type: String, trim: true, default: "1" },

    // Ratio Test
    rt_meterMake:  { type: String, trim: true, default: "Eltel" },
    rt_srNo:       { type: String, trim: true, default: "20231604" },
    rt_date:       { type: String, trim: true, default: "" },
    rt_time:       { type: String, trim: true, default: "" },
    rt_11_2_cal:   { type: String, trim: true, default: "2.000" },
    rt_11_2_meas:  { type: String, trim: true, default: "1" },
    rt_11_2_dev:   { type: String, trim: true, default: "-50" },
    rt_11_21_cal:  { type: String, trim: true, default: "2.000" },
    rt_11_21_meas: { type: String, trim: true, default: "2" },
    rt_11_21_dev:  { type: String, trim: true, default: "0" },
    rt_21_2_cal:   { type: String, trim: true, default: "1.000" },
    rt_21_2_meas:  { type: String, trim: true, default: "1" },
    rt_21_2_dev:   { type: String, trim: true, default: "0" },

    // Voltage Ratio Test
    vr_11_2_app:  { type: String, trim: true, default: "" },
    vr_11_2_1121: { type: String, trim: true, default: "" },
    vr_11_2_221:  { type: String, trim: true, default: "" },
    vr_1121_app:  { type: String, trim: true, default: "" },
    vr_1121_112:  { type: String, trim: true, default: "" },
    vr_1121_221:  { type: String, trim: true, default: "" },
    vr_212_app:   { type: String, trim: true, default: "" },
    vr_212_112:   { type: String, trim: true, default: "" },
    vr_212_1121:  { type: String, trim: true, default: "" },

    // Magnetizing Current Test
    mag_appVoltage: { type: String, trim: true, default: "" },
    mag_date:       { type: String, trim: true, default: "" },
    mag_time:       { type: String, trim: true, default: "" },
    mag_meterMake:  { type: String, trim: true, default: "HTC" },
    mag_srNo:       { type: String, trim: true, default: "HTC2406CG0244" },
    mag_11_2_appV:  { type: String, trim: true, default: "" },
    mag_11_2_curr:  { type: String, trim: true, default: "" },
    mag_1121_appV:  { type: String, trim: true, default: "" },
    mag_1121_curr:  { type: String, trim: true, default: "" },
    mag_212_appV:   { type: String, trim: true, default: "" },
    mag_212_curr:   { type: String, trim: true, default: "" },

    // Short Circuit Test
    sc_appVoltage: { type: String, trim: true, default: "" },
    sc_date:       { type: String, trim: true, default: "" },
    sc_time:       { type: String, trim: true, default: "" },
    sc_meterMake:  { type: String, trim: true, default: "HTC" },
    sc_srNo:       { type: String, trim: true, default: "HTC2406CG0246" },
    sc_11_2_appV:  { type: String, trim: true, default: "1.1" },
    sc_11_2_curr1: { type: String, trim: true, default: "2-2.1 (Short)" },
    sc_11_2_curr2: { type: String, trim: true, default: "" },
    sc_11_2_appV2: { type: String, trim: true, default: "20" },
    sc_11_2_curr3: { type: String, trim: true, default: "20" },
    sc_11_2_curr4: { type: String, trim: true, default: "40" },
    sc_112_appV:   { type: String, trim: true, default: "2" },
    sc_112_curr1:  { type: String, trim: true, default: "1.1-2.1 (Short)" },
    sc_112_curr2:  { type: String, trim: true, default: "" },
    sc_112_appV2:  { type: String, trim: true, default: "20" },
    sc_112_curr3:  { type: String, trim: true, default: "20" },
    sc_112_curr4:  { type: String, trim: true, default: "40" },
    sc_percentZ:   { type: String, trim: true, default: "0.26" },

    // Winding Resistance Test
    wr_meterMake: { type: String, trim: true, default: "PRESTIGE ELECTRONICS" },
    wr_date:      { type: String, trim: true, default: "" },
    wr_time:      { type: String, trim: true, default: "" },
    wr_srNo:      { type: String, trim: true, default: "PE/12-JAN/09" },
    wr_wdgTemp:   { type: String, trim: true, default: "55" },
    wr_coreTemp:  { type: String, trim: true, default: "26" },
    wr_range:     { type: String, trim: true, default: "1999.9 μΩ-19.999Ω" },
    wr_ambient:   { type: String, trim: true, default: "26" },
    wr_humidity:  { type: String, trim: true, default: "40" },
    wr_11_2_amb:  { type: String, trim: true, default: "0.66" },
    wr_11_2_75:   { type: String, trim: true, default: "0.70552" },
    wr_11_2_max:  { type: String, trim: true, default: "0.66" },
    wr_1121_amb:  { type: String, trim: true, default: "0.33" },
    wr_1121_75:   { type: String, trim: true, default: "0.35276" },
    wr_1121_max:  { type: String, trim: true, default: "0.33" },
    wr_212_amb:   { type: String, trim: true, default: "0.33" },
    wr_212_75:    { type: String, trim: true, default: "0.35276" },
    wr_212_max:   { type: String, trim: true, default: "0.33" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 9. FINAL LV TEST FORM ────────────────────────────────────────────────────
const FinalLVTestFormSchema = new mongoose.Schema(
  {
    // IR Values
    ir_date:         { type: String, trim: true, default: "" },
    ir_time:         { type: String, trim: true, default: "" },
    ir_ambTemp:      { type: String, trim: true, default: "" },
    ir_wdgTemp:      { type: String, trim: true, default: "" },
    ir_coreTemp:     { type: String, trim: true, default: "" },
    ir_relHumidity:  { type: String, trim: true, default: "" },
    ir_make:         { type: String, trim: true, default: "MOTWANE" },
    ir_srNo:         { type: String, trim: true, default: "101979324" },
    ir_range:        { type: String, trim: true, default: "1-TO-5 kV" },
    ir_voltageLevel: { type: String, trim: true, default: "" },
    ir_10sec:        { type: String, trim: true, default: "1000" },
    ir_60sec:        { type: String, trim: true, default: "1000" },
    ir_ratio:        { type: String, trim: true, default: "1" },

    // Ratio Test
    rt_meterMake:  { type: String, trim: true, default: "Eltel" },
    rt_srNo:       { type: String, trim: true, default: "20231604" },
    rt_date:       { type: String, trim: true, default: "" },
    rt_time:       { type: String, trim: true, default: "" },
    rt_11_2_cal:   { type: String, trim: true, default: "2.000" },
    rt_11_2_meas:  { type: String, trim: true, default: "1" },
    rt_11_2_dev:   { type: String, trim: true, default: "-50" },
    rt_11_21_cal:  { type: String, trim: true, default: "2.000" },
    rt_11_21_meas: { type: String, trim: true, default: "1" },
    rt_11_21_dev:  { type: String, trim: true, default: "-50" },
    rt_21_2_cal:   { type: String, trim: true, default: "1.000" },
    rt_21_2_meas:  { type: String, trim: true, default: "0" },
    rt_21_2_dev:   { type: String, trim: true, default: "-100" },

    // Voltage Ratio Test
    vr_11_2_app:  { type: String, trim: true, default: "" },
    vr_11_2_1121: { type: String, trim: true, default: "" },
    vr_11_2_221:  { type: String, trim: true, default: "" },
    vr_1121_app:  { type: String, trim: true, default: "" },
    vr_1121_112:  { type: String, trim: true, default: "" },
    vr_1121_221:  { type: String, trim: true, default: "" },
    vr_212_app:   { type: String, trim: true, default: "" },
    vr_212_112:   { type: String, trim: true, default: "" },
    vr_212_1121:  { type: String, trim: true, default: "" },

    // Magnetizing Current Test
    mag_appVoltage: { type: String, trim: true, default: "" },
    mag_date:       { type: String, trim: true, default: "" },
    mag_time:       { type: String, trim: true, default: "58 Hrs" },
    mag_meterMake:  { type: String, trim: true, default: "HTC" },
    mag_srNo:       { type: String, trim: true, default: "HTC2406CG0244" },
    mag_11_2_appV:  { type: String, trim: true, default: "" },
    mag_11_2_curr:  { type: String, trim: true, default: "" },
    mag_1121_appV:  { type: String, trim: true, default: "" },
    mag_1121_curr:  { type: String, trim: true, default: "" },
    mag_212_appV:   { type: String, trim: true, default: "" },
    mag_212_curr:   { type: String, trim: true, default: "" },

    // Short Circuit Test
    sc_appVoltage: { type: String, trim: true, default: "" },
    sc_date:       { type: String, trim: true, default: "" },
    sc_time:       { type: String, trim: true, default: "" },
    sc_meterMake:  { type: String, trim: true, default: "HTC" },
    sc_srNo:       { type: String, trim: true, default: "HTC2406CG0244" },
    sc_11_2_appV2: { type: String, trim: true, default: "20" },
    sc_11_2_curr3: { type: String, trim: true, default: "20" },
    sc_11_2_curr4: { type: String, trim: true, default: "40" },
    sc_112_appV2:  { type: String, trim: true, default: "20" },
    sc_112_curr3:  { type: String, trim: true, default: "20" },
    sc_112_curr4:  { type: String, trim: true, default: "40" },
    sc_percentZ:   { type: String, trim: true, default: "0.26" },

    // Winding Resistance Test
    wr_meterUsed:     { type: String, trim: true, default: "PRESTIGE ELECTRONICS" },
    wr_date:          { type: String, trim: true, default: "" },
    wr_humidity:      { type: String, trim: true, default: "" },
    wr_srNo:          { type: String, trim: true, default: "PE/040/MAR/2023" },
    wr_topOilTemp:    { type: String, trim: true, default: "40" },
    wr_bottomOilTemp: { type: String, trim: true, default: "34" },
    wr_range:         { type: String, trim: true, default: "1999.9 μΩ-19.999Ω" },
    wr_ambient:       { type: String, trim: true, default: "26" },
    wr_avgOilTemp:    { type: String, trim: true, default: "37" },
    wr_11_2_amb:      { type: String, trim: true, default: "0.218" },
    wr_11_2_75:       { type: String, trim: true, default: "0.24575" },
    wr_11_2_max:      { type: String, trim: true, default: "0.66" },
    wr_1121_amb:      { type: String, trim: true, default: "0.1098" },
    wr_1121_75:       { type: String, trim: true, default: "0.12377" },
    wr_1121_max:      { type: String, trim: true, default: "0.33" },
    wr_212_amb:       { type: String, trim: true, default: "0.1098" },
    wr_212_75:        { type: String, trim: true, default: "0.12377" },
    wr_212_max:       { type: String, trim: true, default: "0.33" },

    // Tan Delta and Capacitance Test on Bushing
    td_meterUsed:       { type: String, trim: true, default: "MEGGER" },
    td_date:            { type: String, trim: true, default: "" },
    td_time:            { type: String, trim: true, default: "" },
    td_modelSrNo:       { type: String, trim: true, default: "1100205" },
    td_oti:             { type: String, trim: true, default: "" },
    td_wti:             { type: String, trim: true, default: "" },
    td_topOil:          { type: String, trim: true, default: "" },
    td_bottomOil:       { type: String, trim: true, default: "" },
    td_ambTemp:         { type: String, trim: true, default: "" },
    td_humi:            { type: String, trim: true, default: "" },

    // Tan Delta — Winding
    td_w_5kv_tanDelta:  { type: String, trim: true, default: "" },
    td_w_5kv_cap:       { type: String, trim: true, default: "" },
    td_w_5kv_exc:       { type: String, trim: true, default: "" },
    td_w_5kv_dl:        { type: String, trim: true, default: "" },
    td_w_10kv_tanDelta: { type: String, trim: true, default: "" },
    td_w_10kv_cap:      { type: String, trim: true, default: "" },
    td_w_10kv_exc:      { type: String, trim: true, default: "" },
    td_w_10kv_dl:       { type: String, trim: true, default: "" },

    // Tan Delta — Terminal 1.1
    td_11_srNo:          { type: String, trim: true, default: "" },
    td_11_srNo2:         { type: String, trim: true, default: "" },
    td_11_5kv_tanDelta:  { type: String, trim: true, default: "" },
    td_11_5kv_cap:       { type: String, trim: true, default: "" },
    td_11_5kv_exc:       { type: String, trim: true, default: "" },
    td_11_5kv_dl:        { type: String, trim: true, default: "" },
    td_11_10kv_tanDelta: { type: String, trim: true, default: "" },
    td_11_10kv_cap:      { type: String, trim: true, default: "" },
    td_11_10kv_exc:      { type: String, trim: true, default: "" },
    td_11_10kv_dl:       { type: String, trim: true, default: "" },

    // Tan Delta — Terminal 2
    td_2_srNo:          { type: String, trim: true, default: "" },
    td_2_srNo2:         { type: String, trim: true, default: "" },
    td_2_5kv_tanDelta:  { type: String, trim: true, default: "" },
    td_2_5kv_cap:       { type: String, trim: true, default: "" },
    td_2_5kv_exc:       { type: String, trim: true, default: "" },
    td_2_5kv_dl:        { type: String, trim: true, default: "" },
    td_2_10kv_tanDelta: { type: String, trim: true, default: "" },
    td_2_10kv_cap:      { type: String, trim: true, default: "" },
    td_2_10kv_exc:      { type: String, trim: true, default: "" },
    td_2_10kv_dl:       { type: String, trim: true, default: "" },

    // Polarization Index
    pi_15sec:  { type: String, trim: true, default: "" },
    pi_60sec:  { type: String, trim: true, default: "" },
    pi_600sec: { type: String, trim: true, default: "" },
    pi_ir:     { type: String, trim: true, default: "" },
    pi_pi:     { type: String, trim: true, default: "" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 10. CHECKLIST FOR TFR BEFORE HV FORM ────────────────────────────────────
// Sub-schema for each checklist row
const ChecklistRowSchema = new mongoose.Schema(
  {
    no:            { type: Number, required: true },
    confirmValue:  { type: String, trim: true, default: "" },
    done:          { type: Boolean, default: true },
    remark:        { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ChecklistTFRBeforeHVFormSchema = new mongoose.Schema(
  {
    rows: { type: [ChecklistRowSchema], default: [] },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── 11. LIST OF HV TEST FORM ─────────────────────────────────────────────────
const ListOfHVTestFormSchema = new mongoose.Schema(
  {
    // No Load Losses — 90%
    nll_90_meterRmsV:        { type: String, trim: true, default: "" },
    nll_90_appliedRmsV:      { type: String, trim: true, default: "" },
    nll_90_meterMeanV:       { type: String, trim: true, default: "" },
    nll_90_appliedMeanV:     { type: String, trim: true, default: "" },
    nll_90_meterCurrA:       { type: String, trim: true, default: "" },
    nll_90_currMeasured:     { type: String, trim: true, default: "" },
    nll_90_meterPowerW:      { type: String, trim: true, default: "" },
    nll_90_measuredPowerKW:  { type: String, trim: true, default: "" },

    // No Load Losses — 100%
    nll_100_meterRmsV:       { type: String, trim: true, default: "" },
    nll_100_appliedRmsV:     { type: String, trim: true, default: "" },
    nll_100_meterMeanV:      { type: String, trim: true, default: "" },
    nll_100_appliedMeanV:    { type: String, trim: true, default: "" },
    nll_100_meterCurrA:      { type: String, trim: true, default: "" },
    nll_100_currMeasured:    { type: String, trim: true, default: "" },
    nll_100_meterPowerW:     { type: String, trim: true, default: "" },
    nll_100_measuredPowerKW: { type: String, trim: true, default: "" },

    // No Load Losses — 110%
    nll_110_meterRmsV:       { type: String, trim: true, default: "" },
    nll_110_appliedRmsV:     { type: String, trim: true, default: "" },
    nll_110_meterMeanV:      { type: String, trim: true, default: "" },
    nll_110_appliedMeanV:    { type: String, trim: true, default: "" },
    nll_110_meterCurrA:      { type: String, trim: true, default: "" },
    nll_110_currMeasured:    { type: String, trim: true, default: "" },
    nll_110_meterPowerW:     { type: String, trim: true, default: "" },
    nll_110_measuredPowerKW: { type: String, trim: true, default: "" },

    // Corrected No Load Loss
    nll_p0: { type: String, trim: true, default: "" },

    // Load Loss / % Impedance
    ll_oti:             { type: String, trim: true, default: "" },
    ll_wti:             { type: String, trim: true, default: "" },
    ll_topOil:          { type: String, trim: true, default: "" },
    ll_bottomOil:       { type: String, trim: true, default: "" },
    ll_avgOil:          { type: String, trim: true, default: "" },
    ll_ratedV:          { type: String, trim: true, default: "" },
    ll_ratedCurr:       { type: String, trim: true, default: "" },
    ll_meterReadingV:   { type: String, trim: true, default: "" },
    ll_measuredV:       { type: String, trim: true, default: "" },
    ll_meterAppliedCurr: { type: String, trim: true, default: "" },
    ll_appliedCurr:     { type: String, trim: true, default: "" },
    ll_meterLossesW:    { type: String, trim: true, default: "" },
    ll_loadLossKW:      { type: String, trim: true, default: "" },
    ll_percentZ:        { type: String, trim: true, default: "" },
    ll_maxGuarLoss:     { type: String, trim: true, default: "" },
    ll_maxGuarImpedance: { type: String, trim: true, default: "" },
    ll_maxGuarLeakage:  { type: String, trim: true, default: "" },

    // Separate Source Voltage Applied Withstand Test
    ss_appliedVoltage: { type: String, trim: true, default: "" },
    ss_timeInSec:      { type: String, trim: true, default: "" },
    ss_remarks:        { type: String, trim: true, default: "" },

    // Induced Voltage Withstand Test
    iv_openWinding:    { type: String, trim: true, default: "" },
    iv_suppliedVoltage: { type: String, trim: true, default: "" },
    iv_inducedVoltage: { type: String, trim: true, default: "" },
    iv_testFreq:       { type: String, trim: true, default: "" },
    iv_testDuration:   { type: String, trim: true, default: "" },
    iv_remark:         { type: String, trim: true, default: "" },

    // Major Test Summary
    mt_oc_losses:   { type: String, trim: true, default: "" },
    mt_oc_date:     { type: String, trim: true, default: "" },
    mt_oc_time:     { type: String, trim: true, default: "" },
    mt_oc_duration: { type: String, trim: true, default: "" },

    mt_nll_losses:   { type: String, trim: true, default: "" },
    mt_nll_date:     { type: String, trim: true, default: "" },
    mt_nll_time:     { type: String, trim: true, default: "" },
    mt_nll_duration: { type: String, trim: true, default: "" },

    mt_ll_losses:   { type: String, trim: true, default: "" },
    mt_ll_date:     { type: String, trim: true, default: "" },
    mt_ll_time:     { type: String, trim: true, default: "" },
    mt_ll_duration: { type: String, trim: true, default: "" },

    mt_ss_losses:   { type: String, trim: true, default: "" },
    mt_ss_date:     { type: String, trim: true, default: "" },
    mt_ss_time:     { type: String, trim: true, default: "" },
    mt_ss_duration: { type: String, trim: true, default: "" },

    mt_iv_losses:   { type: String, trim: true, default: "" },
    mt_iv_date:     { type: String, trim: true, default: "" },
    mt_iv_time:     { type: String, trim: true, default: "" },
    mt_iv_duration: { type: String, trim: true, default: "" },

    mt_hr_losses:   { type: String, trim: true, default: "" },
    mt_hr_date:     { type: String, trim: true, default: "" },
    mt_hr_time:     { type: String, trim: true, default: "" },
    mt_hr_duration: { type: String, trim: true, default: "" },

    // Footer
    testedByDate:     { type: String, trim: true, default: "" },
    reviewedByDate:   { type: String, trim: true, default: "" },
    authorizedByDate: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// ─── SUBMITTED FLAGS SUB-SCHEMA ───────────────────────────────────────────────
const SubmittedSchema = new mongoose.Schema(
  {
    CTTestForm:               { type: Boolean, default: false },
    PreConnectionTestForm:    { type: Boolean, default: false },
    PostConnectionTestForm:   { type: Boolean, default: false },
    PrePostVPDServicingForm:  { type: Boolean, default: false },
    BushingTestForm:          { type: Boolean, default: false },
    TwoKVTestForm:            { type: Boolean, default: false },
    OilSoakingForm:           { type: Boolean, default: false },
    PostTankingTestForm:      { type: Boolean, default: false },
    FinalLVTestForm:          { type: Boolean, default: false },
    ChecklistTFRBeforeHVForm: { type: Boolean, default: false },
    ListOfHVTestForm:         { type: Boolean, default: false },
  },
  { _id: false }
);

// ─── MAIN SCHEMA ──────────────────────────────────────────────────────────────
const TestAutoTransformerSchema = new mongoose.Schema(
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
    table: {
      CTTestForm:               { type: CTTestFormSchema,               default: () => ({}) },
      PreConnectionTestForm:    { type: PreConnectionTestFormSchema,    default: () => ({}) },
      PostConnectionTestForm:   { type: PostConnectionTestFormSchema,   default: () => ({}) },
      PrePostVPDServicingForm:  { type: PrePostVPDServicingFormSchema,  default: () => ({}) },
      BushingTestForm:          { type: BushingTestFormSchema,          default: () => ({}) },
      TwoKVTestForm:            { type: TwoKVTestFormSchema,            default: () => ({}) },
      OilSoakingForm:           { type: OilSoakingFormSchema,           default: () => ({}) },
      PostTankingTestForm:      { type: PostTankingTestFormSchema,      default: () => ({}) },
      FinalLVTestForm:          { type: FinalLVTestFormSchema,          default: () => ({}) },
      ChecklistTFRBeforeHVForm: { type: ChecklistTFRBeforeHVFormSchema, default: () => ({}) },
      ListOfHVTestForm:         { type: ListOfHVTestFormSchema,         default: () => ({}) },
      submitted:                { type: SubmittedSchema,                default: () => ({}) },
    },
  },
  { timestamps: true }
);

export default mongoose.model("TestAutoTransformer", TestAutoTransformerSchema);
