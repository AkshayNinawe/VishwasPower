"use client";

import { useState } from "react";
import "./form-styles.css";

// ─── Main Component ────────────────────────────────────────────────────────────
const TestingAutoTransformerForms = ({ activeButton, projectName, companyName, onBack, onFormSubmit }) => {
  if (!activeButton) return null;

  const renderForm = () => {
    switch (activeButton) {
      case "CT TEST":
        return <CTTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "PRE-CONNECTION TEST":
        return <PreConnectionTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "POST-CONNECTION TESTING":
        return <PostConnectionTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "PRE & POST VPD SERVICING":
        return <PrePostVPDServicingForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "BUSHING TEST":
        return <BushingTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "2 KV TEST":
        return <TwoKVTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "OIL Soaking servicing planning":
        return <OilSoakingForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "POST-TANKING TEST":
        return <PostTankingTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "FINAL LV TEST":
        return <FinalLVTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "Checklist for TFR BEFORE HV":
        return <ChecklistTFRBeforeHVForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      case "List of HV Test":
        return <ListOfHVTestForm projectName={projectName} companyName={companyName} onBack={onBack} onFormSubmit={onFormSubmit} />;
      default:
        return (
          <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>
            <div className="form-container" style={{ textAlign: "center" }}>
              <h3>Form for "{activeButton}" is coming soon.</h3>
              <button
                onClick={onBack}
                style={{
                  marginTop: "20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                ← BACK TO DASHBOARD
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="fade-in">{renderForm()}</div>;
};

// ─── Bushing Test Form ─────────────────────────────────────────────────────────
function BushingTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    make: "",
    srNo: "",
    meterMake: "",
    slNo: "",
    s1_05kv_tanDelta: "",
    s1_05kv_capacitance: "",
    s1_05kv_excitation: "",
    s1_05kv_dielectricLoss: "",
    s1_10kv_tanDelta: "",
    s1_10kv_capacitance: "",
    s1_10kv_excitation: "",
    s1_10kv_dielectricLoss: "",
    srNo2: "",
    make2: "",
    s2_05kv_tanDelta: "",
    s2_05kv_capacitance: "",
    s2_05kv_excitation: "",
    s2_05kv_dielectricLoss: "",
    s2_10kv_tanDelta: "",
    s2_10kv_capacitance: "",
    s2_10kv_excitation: "",
    s2_10kv_dielectricLoss: "",
    testedByDate: "",
    reviewedByDate: "",
    authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleDone = () => {
    console.log("Bushing Test form data:", formData);
    alert("Test data saved successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px 24px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>
            🧪 Bushing Test — {projectName}
          </h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button
          onClick={onBack}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "30px",
            fontWeight: "700",
            fontSize: "0.9rem",
            cursor: "pointer",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px rgba(102,126,234,0.4)",
          }}
        >
          ← BACK TO DASHBOARD
        </button>
      </div>

      {/* ── Form Content (uses same CSS as FormStage.js) ── */}
      <div className="form-content">

        {/* Title */}
        <div className="company-header">
          <h2>BUSHING TEST — Tan Delta and Capacitance Test on Bushing</h2>
        </div>

        {/* ── Process Row ── */}
        <div style={{ marginBottom: "20px", padding: "10px 0", borderBottom: "2px solid #4299e1" }}>
          <span style={{ fontWeight: "700", fontSize: "1rem", color: "#2d3748" }}>
            PROCESS: Tan Delta and capacitance test on bushing
          </span>
        </div>

        {/* ── MAKE / SR. NO. ── */}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>MAKE</strong></td>
              <td><input type="text" value={formData.make} onChange={(e) => update("make", e.target.value)} /></td>
              <td><strong>SR. NO.</strong></td>
              <td><input type="text" value={formData.srNo} onChange={(e) => update("srNo", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Meter Make</strong></td>
              <td><input type="text" value={formData.meterMake} onChange={(e) => update("meterMake", e.target.value)} /></td>
              <td><strong>SL. NO.</strong></td>
              <td><input type="text" value={formData.slNo} onChange={(e) => update("slNo", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── Section 1.1 ── */}
        <h4 style={{ marginTop: "30px", marginBottom: "10px" }}>Section 1.1</h4>
        <table className="form-table">
          <thead>
            <tr>
              <th>VOLTAGE</th>
              <th>TAN DELTA %</th>
              <th>CAPACITANCE (PF)</th>
              <th>EXCITATION (I)</th>
              <th>DIELECTRIC LOSS (W)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>05 KV</strong></td>
              <td><input type="text" value={formData.s1_05kv_tanDelta} onChange={(e) => update("s1_05kv_tanDelta", e.target.value)} /></td>
              <td><input type="text" value={formData.s1_05kv_capacitance} onChange={(e) => update("s1_05kv_capacitance", e.target.value)} /></td>
              <td><input type="text" value={formData.s1_05kv_excitation} onChange={(e) => update("s1_05kv_excitation", e.target.value)} /></td>
              <td><input type="text" value={formData.s1_05kv_dielectricLoss} onChange={(e) => update("s1_05kv_dielectricLoss", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>10 KV</strong></td>
              <td><input type="text" value={formData.s1_10kv_tanDelta} onChange={(e) => update("s1_10kv_tanDelta", e.target.value)} /></td>
              <td><input type="text" value={formData.s1_10kv_capacitance} onChange={(e) => update("s1_10kv_capacitance", e.target.value)} /></td>
              <td><input type="text" value={formData.s1_10kv_excitation} onChange={(e) => update("s1_10kv_excitation", e.target.value)} /></td>
              <td><input type="text" value={formData.s1_10kv_dielectricLoss} onChange={(e) => update("s1_10kv_dielectricLoss", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── SR. NO. / MAKE between sections ── */}
        <table className="form-table" style={{ marginTop: "20px" }}>
          <tbody>
            <tr>
              <td><strong>SR. NO.</strong></td>
              <td><input type="text" value={formData.srNo2} onChange={(e) => update("srNo2", e.target.value)} /></td>
              <td><strong>MAKE</strong></td>
              <td><input type="text" value={formData.make2} onChange={(e) => update("make2", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── Section 2 ── */}
        <h4 style={{ marginTop: "30px", marginBottom: "10px" }}>Section 2</h4>
        <table className="form-table">
          <thead>
            <tr>
              <th>VOLTAGE</th>
              <th>TAN DELTA %</th>
              <th>CAPACITANCE (PF)</th>
              <th>EXCITATION (I)</th>
              <th>DIELECTRIC LOSS (W)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>05 KV</strong></td>
              <td><input type="text" value={formData.s2_05kv_tanDelta} onChange={(e) => update("s2_05kv_tanDelta", e.target.value)} /></td>
              <td><input type="text" value={formData.s2_05kv_capacitance} onChange={(e) => update("s2_05kv_capacitance", e.target.value)} /></td>
              <td><input type="text" value={formData.s2_05kv_excitation} onChange={(e) => update("s2_05kv_excitation", e.target.value)} /></td>
              <td><input type="text" value={formData.s2_05kv_dielectricLoss} onChange={(e) => update("s2_05kv_dielectricLoss", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>10 KV</strong></td>
              <td><input type="text" value={formData.s2_10kv_tanDelta} onChange={(e) => update("s2_10kv_tanDelta", e.target.value)} /></td>
              <td><input type="text" value={formData.s2_10kv_capacitance} onChange={(e) => update("s2_10kv_capacitance", e.target.value)} /></td>
              <td><input type="text" value={formData.s2_10kv_excitation} onChange={(e) => update("s2_10kv_excitation", e.target.value)} /></td>
              <td><input type="text" value={formData.s2_10kv_dielectricLoss} onChange={(e) => update("s2_10kv_dielectricLoss", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── Footer Signature Row ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>TESTED BY</th>
              <th>REVIEWED BY</th>
              <th>AUTHORIZED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Form Actions ── */}
        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">
            Submit Form
          </button>
        </div>

      </div>{/* end form-content */}
    </div>
  );
}

// ─── 2 KV Test Form ────────────────────────────────────────────────────────────
function TwoKVTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // Horizontal
    h_coreFrame_voltage: "",
    h_coreFrame_duration: "",
    h_coreFrame_leakage: "",
    h_frameFrame_voltage: "",
    h_frameFrame_duration: "",
    h_frameFrame_leakage: "",
    // Vertical
    v_coreFrame_voltage: "",
    v_coreFrame_duration: "",
    v_coreFrame_leakage: "",
    v_frameFrame_voltage: "",
    v_frameFrame_duration: "",
    v_frameFrame_leakage: "",
    // Footer
    testedByDate: "",
    reviewedByDate: "",
    authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleDone = () => {
    console.log("2 KV Test form data:", formData);
    alert("2 KV Test data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px 24px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>
            🧪 2 KV Test — {projectName}
          </h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button
          onClick={onBack}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "30px",
            fontWeight: "700",
            fontSize: "0.9rem",
            cursor: "pointer",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px rgba(102,126,234,0.4)",
          }}
        >
          ← BACK TO DASHBOARD
        </button>
      </div>

      {/* ── Form Content ── */}
      <div className="form-content">

        <div className="company-header">
          <h2>2 KV TEST</h2>
        </div>

        {/* ── Process Row 1 ── */}
        <div style={{ marginBottom: "20px", padding: "10px 0", borderBottom: "2px solid #4299e1" }}>
          <span style={{ fontWeight: "700", fontSize: "1rem", color: "#2d3748" }}>
            PROCESS: 2KV TESTING
          </span>
        </div>

        {/* ── Horizontal Table ── */}
        <table className="form-table">
          <thead>
            <tr>
              <th>HORIZANTAL</th>
              <th>VOLTAGE APPLIED (kV)</th>
              <th>DURATION (Sec)</th>
              <th>LEAKAGE CURRENT (mA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CORE-FRAME</strong></td>
              <td><input type="text" value={formData.h_coreFrame_voltage} onChange={(e) => update("h_coreFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.h_coreFrame_duration} onChange={(e) => update("h_coreFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.h_coreFrame_leakage} onChange={(e) => update("h_coreFrame_leakage", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>FRAME-FRAME</strong></td>
              <td><input type="text" value={formData.h_frameFrame_voltage} onChange={(e) => update("h_frameFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.h_frameFrame_duration} onChange={(e) => update("h_frameFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.h_frameFrame_leakage} onChange={(e) => update("h_frameFrame_leakage", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── Process Row 2 ── */}
        <div style={{ margin: "30px 0 20px", padding: "10px 0", borderBottom: "2px solid #4299e1" }}>
          <span style={{ fontWeight: "700", fontSize: "1rem", color: "#2d3748" }}>
            PROCESS: 2KV TESTING
          </span>
        </div>

        {/* ── Vertical Table ── */}
        <table className="form-table">
          <thead>
            <tr>
              <th>VERTICAL</th>
              <th>VOLTAGE APPLIED (kV)</th>
              <th>DURATION (Sec)</th>
              <th>LEAKAGE CURRENT (mA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CORE-FRAME</strong></td>
              <td><input type="text" value={formData.v_coreFrame_voltage} onChange={(e) => update("v_coreFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.v_coreFrame_duration} onChange={(e) => update("v_coreFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.v_coreFrame_leakage} onChange={(e) => update("v_coreFrame_leakage", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>FRAME-FRAME</strong></td>
              <td><input type="text" value={formData.v_frameFrame_voltage} onChange={(e) => update("v_frameFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.v_frameFrame_duration} onChange={(e) => update("v_frameFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.v_frameFrame_leakage} onChange={(e) => update("v_frameFrame_leakage", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── Footer Signature Row ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>TESTED BY</th>
              <th>REVIEWED BY</th>
              <th>AUTHORIZED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>AKASH PANCHESWAR</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Form Actions ── */}
        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">
            Submit Form
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Oil Soaking Servicing Planning Form ──────────────────────────────────────
function OilSoakingForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // Insulation Tester Details
    make: "MEGGER",
    srNo: "A01148D22",
    range: "1-TO-5 kV",
    voltageLevel: "1000V",
    // Before Servicing
    before_date: "",
    before_time: "",
    before_ambTemp: "",
    before_wdgTemp: "",
    before_relHumidity: "",
    before_coreTemp: "",
    before_coreFrame_voltage: "",
    before_coreFrame_duration: "",
    before_coreFrame_mohm: "",
    before_frameFrame_voltage: "",
    before_frameFrame_duration: "",
    before_frameFrame_mohm: "",
    before_frameTank_voltage: "",
    before_frameTank_duration: "",
    before_frameTank_mohm: "",
    // After Servicing
    after_date: "",
    after_time: "",
    after_ambTemp: "",
    after_wdgTemp: "",
    after_relHumidity: "",
    after_coreTemp: "",
    after_coreFrame_voltage: "",
    after_coreFrame_duration: "",
    after_coreFrame_mohm: "",
    after_frameFrame_voltage: "",
    after_frameFrame_duration: "",
    after_frameFrame_mohm: "",
    after_frameTank_voltage: "",
    after_frameTank_duration: "",
    after_frameTank_mohm: "",
    // Footer
    testedByDate: "",
    reviewedByDate: "",
    authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleDone = () => {
    console.log("Oil Soaking form data:", formData);
    alert("Oil Soaking Servicing data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px 24px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>
            🧪 Oil Soaking Servicing Planning — {projectName}
          </h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button
          onClick={onBack}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "30px",
            fontWeight: "700",
            fontSize: "0.9rem",
            cursor: "pointer",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px rgba(102,126,234,0.4)",
          }}
        >
          ← BACK TO DASHBOARD
        </button>
      </div>

      {/* ── Form Content ── */}
      <div className="form-content">

        <div className="company-header">
          <h2>OIL SOAKING SERVICING PLANNING</h2>
        </div>

        {/* ── Process Row ── */}
        <div style={{ marginBottom: "20px", padding: "10px 0", borderBottom: "2px solid #4299e1" }}>
          <span style={{ fontWeight: "700", fontSize: "1rem", color: "#2d3748" }}>
            PROCESS: Oil soaking servicing testing
          </span>
        </div>

        {/* ── Details of Insulation Tester ── */}
        <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Details of Insulation Tester</h4>
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Make:</strong></td>
              <td><input type="text" value={formData.make} onChange={(e) => update("make", e.target.value)} /></td>
              <td><strong>Range:</strong></td>
              <td><input type="text" value={formData.range} onChange={(e) => update("range", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Sr. No:</strong></td>
              <td><input type="text" value={formData.srNo} onChange={(e) => update("srNo", e.target.value)} /></td>
              <td><strong>Voltage Level:</strong></td>
              <td><input type="text" value={formData.voltageLevel} onChange={(e) => update("voltageLevel", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── IR TEST Banner ── */}
        <div style={{ background: "#4caf50", color: "#fff", textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", margin: "20px 0 10px" }}>
          IR TEST
        </div>

        {/* ── BEFORE SERVICING Banner ── */}
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", marginBottom: "16px" }}>
          BEFORE SERVICING
        </div>

        {/* ── Before: Date / Time / Temps ── */}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Date:</strong></td>
              <td><input type="date" value={formData.before_date} onChange={(e) => update("before_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td>
              <td><input type="time" value={formData.before_time} onChange={(e) => update("before_time", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Amb. Temp:</strong></td>
              <td><input type="text" value={formData.before_ambTemp} onChange={(e) => update("before_ambTemp", e.target.value)} placeholder="°C" /></td>
              <td><strong>Wdg. Temp.</strong></td>
              <td><input type="text" value={formData.before_wdgTemp} onChange={(e) => update("before_wdgTemp", e.target.value)} placeholder="°C" /></td>
            </tr>
            <tr>
              <td><strong>Relative Humidity:</strong></td>
              <td><input type="text" value={formData.before_relHumidity} onChange={(e) => update("before_relHumidity", e.target.value)} placeholder="%" /></td>
              <td><strong>Core Temp.</strong></td>
              <td><input type="text" value={formData.before_coreTemp} onChange={(e) => update("before_coreTemp", e.target.value)} placeholder="°C" /></td>
            </tr>
          </tbody>
        </table>

        {/* ── Before Servicing Measurement Table ── */}
        <table className="form-table" style={{ marginTop: "16px" }}>
          <thead>
            <tr>
              <th></th>
              <th>Voltage Applied (KV)</th>
              <th>Duration (Sec)</th>
              <th>MΩ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Core- Frame</strong></td>
              <td><input type="text" value={formData.before_coreFrame_voltage} onChange={(e) => update("before_coreFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.before_coreFrame_duration} onChange={(e) => update("before_coreFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.before_coreFrame_mohm} onChange={(e) => update("before_coreFrame_mohm", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Frame-Frame</strong></td>
              <td><input type="text" value={formData.before_frameFrame_voltage} onChange={(e) => update("before_frameFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.before_frameFrame_duration} onChange={(e) => update("before_frameFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.before_frameFrame_mohm} onChange={(e) => update("before_frameFrame_mohm", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Frame-Tank</strong></td>
              <td><input type="text" value={formData.before_frameTank_voltage} onChange={(e) => update("before_frameTank_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.before_frameTank_duration} onChange={(e) => update("before_frameTank_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.before_frameTank_mohm} onChange={(e) => update("before_frameTank_mohm", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── AFTER SERVICING Banner ── */}
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", margin: "30px 0 16px" }}>
          AFTER SERVICING
        </div>

        {/* ── After: Date / Time / Temps ── */}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Date:</strong></td>
              <td><input type="date" value={formData.after_date} onChange={(e) => update("after_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td>
              <td><input type="time" value={formData.after_time} onChange={(e) => update("after_time", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Amb. Temp:</strong></td>
              <td><input type="text" value={formData.after_ambTemp} onChange={(e) => update("after_ambTemp", e.target.value)} placeholder="°C" /></td>
              <td><strong>Wdg. Temp.</strong></td>
              <td><input type="text" value={formData.after_wdgTemp} onChange={(e) => update("after_wdgTemp", e.target.value)} placeholder="°C" /></td>
            </tr>
            <tr>
              <td><strong>Relative Humidity:</strong></td>
              <td><input type="text" value={formData.after_relHumidity} onChange={(e) => update("after_relHumidity", e.target.value)} placeholder="%" /></td>
              <td><strong>Core Temp.</strong></td>
              <td><input type="text" value={formData.after_coreTemp} onChange={(e) => update("after_coreTemp", e.target.value)} placeholder="°C" /></td>
            </tr>
          </tbody>
        </table>

        {/* ── After Servicing Measurement Table ── */}
        <table className="form-table" style={{ marginTop: "16px" }}>
          <thead>
            <tr>
              <th></th>
              <th>Voltage Applied (KV)</th>
              <th>Duration (Sec)</th>
              <th>MΩ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Core- Frame</strong></td>
              <td><input type="text" value={formData.after_coreFrame_voltage} onChange={(e) => update("after_coreFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.after_coreFrame_duration} onChange={(e) => update("after_coreFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.after_coreFrame_mohm} onChange={(e) => update("after_coreFrame_mohm", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Frame-Frame</strong></td>
              <td><input type="text" value={formData.after_frameFrame_voltage} onChange={(e) => update("after_frameFrame_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.after_frameFrame_duration} onChange={(e) => update("after_frameFrame_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.after_frameFrame_mohm} onChange={(e) => update("after_frameFrame_mohm", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>Frame-Tank</strong></td>
              <td><input type="text" value={formData.after_frameTank_voltage} onChange={(e) => update("after_frameTank_voltage", e.target.value)} /></td>
              <td><input type="text" value={formData.after_frameTank_duration} onChange={(e) => update("after_frameTank_duration", e.target.value)} /></td>
              <td><input type="text" value={formData.after_frameTank_mohm} onChange={(e) => update("after_frameTank_mohm", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        {/* ── Footer Signature Row ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>TESTED BY</th>
              <th>REVIEWED BY</th>
              <th>AUTHORIZED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Form Actions ── */}
        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">
            Submit Form
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Post-Tanking Test Form ────────────────────────────────────────────────────
function PostTankingTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // IR Values
    ir_date: "", ir_time: "",
    ir_ambTemp: "", ir_wdgTemp: "", ir_coreTemp: "", ir_relHumidity: "",
    ir_make: "MEGGER", ir_srNo: "101979324", ir_range: "1-TO-5 kV", ir_voltageLevel: "",
    ir_10sec: "1000", ir_60sec: "1000", ir_ratio: "1",
    // Ratio Test
    rt_meterMake: "Eltel", rt_srNo: "20231604", rt_date: "", rt_time: "",
    rt_11_2_cal: "2.000", rt_11_2_meas: "1", rt_11_2_dev: "-50",
    rt_11_21_cal: "2.000", rt_11_21_meas: "2", rt_11_21_dev: "0",
    rt_21_2_cal: "1.000", rt_21_2_meas: "1", rt_21_2_dev: "0",
    // Voltage Ratio Test
    vr_11_2_app: "", vr_11_2_1121: "", vr_11_2_221: "",
    vr_1121_app: "", vr_1121_112: "", vr_1121_221: "",
    vr_212_app: "", vr_212_112: "", vr_212_1121: "",
    // Magnetizing Current Test
    mag_appVoltage: "", mag_date: "", mag_time: "",
    mag_meterMake: "HTC", mag_srNo: "HTC2406CG0244",
    mag_11_2_appV: "", mag_11_2_curr: "",
    mag_1121_appV: "", mag_1121_curr: "",
    mag_212_appV: "", mag_212_curr: "",
    // Short Circuit Test
    sc_appVoltage: "", sc_date: "", sc_time: "",
    sc_meterMake: "HTC", sc_srNo: "HTC2406CG0246",
    sc_11_2_appV: "1.1", sc_11_2_curr1: "2-2.1 (Short)", sc_11_2_curr2: "",
    sc_11_2_appV2: "20", sc_11_2_curr3: "20", sc_11_2_curr4: "40",
    sc_112_appV: "2", sc_112_curr1: "1.1-2.1 (Short)", sc_112_curr2: "",
    sc_112_appV2: "20", sc_112_curr3: "20", sc_112_curr4: "40",
    sc_percentZ: "0.26",
    // Winding Resistance Test
    wr_meterMake: "PRESTIGE ELECTRONICS", wr_date: "", wr_time: "",
    wr_srNo: "PE/12-JAN/09", wr_wdgTemp: "55", wr_coreTemp: "26",
    wr_range: "1999.9 μΩ-19.999Ω", wr_ambient: "26", wr_humidity: "40",
    wr_11_2_amb: "0.66", wr_11_2_75: "0.70552", wr_11_2_max: "0.66",
    wr_1121_amb: "0.33", wr_1121_75: "0.35276", wr_1121_max: "0.33",
    wr_212_amb: "0.33", wr_212_75: "0.35276", wr_212_max: "0.33",
    // Footer
    testedByDate: "", reviewedByDate: "", authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inp = (field) => <input type="text" value={formData[field]} onChange={(e) => update(field, e.target.value)} />;

  const handleDone = () => {
    console.log("Post-Tanking Test form data:", formData);
    alert("Post-Tanking Test data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  const sectionBanner = (text, bg = "#dce6f1") => (
    <div style={{ background: bg, textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", margin: "24px 0 12px" }}>
      {text}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>🧪 Post-Tanking Test — {projectName}</h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "30px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(102,126,234,0.4)" }}>
          ← BACK TO DASHBOARD
        </button>
      </div>

      <div className="form-content">
        <div className="company-header"><h2>POST-TANKING TEST</h2></div>

        {/* ══ 1. MEASUREMENT OF IR VALUES ══ */}
        {sectionBanner("PROCESS: MEASUREMENT OF IR VALUES")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Date:</strong></td><td><input type="date" value={formData.ir_date} onChange={(e) => update("ir_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td><td><input type="time" value={formData.ir_time} onChange={(e) => update("ir_time", e.target.value)} /></td>
              <td colSpan="2"><strong>Details of Insulation Tester:</strong></td>
            </tr>
            <tr>
              <td><strong>Amb. Temp:</strong></td><td>{inp("ir_ambTemp")}</td>
              <td><strong>Make:</strong></td><td>{inp("ir_make")}</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td><strong>Wdg. Temp:</strong></td><td>{inp("ir_wdgTemp")}</td>
              <td><strong>Sr. No:</strong></td><td>{inp("ir_srNo")}</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td><strong>Core Temp:</strong></td><td>{inp("ir_coreTemp")}</td>
              <td><strong>Range:</strong></td><td>{inp("ir_range")}</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td><strong>Relative Humidity:</strong></td><td>{inp("ir_relHumidity")}</td>
              <td><strong>Voltage Level:</strong></td><td>{inp("ir_voltageLevel")}</td>
              <td></td><td></td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th></th><th>10 Sec (MΩ)</th><th>60 Sec (MΩ)</th><th>Ratio of 60 Sec/ 10 Sec</th></tr></thead>
          <tbody>
            <tr><td><strong>WINDING-EARTH</strong></td><td>{inp("ir_10sec")}</td><td>{inp("ir_60sec")}</td><td>{inp("ir_ratio")}</td></tr>
          </tbody>
        </table>

        {/* ══ 2. RATIO TEST ══ */}
        {sectionBanner("PROCESS: RATIO TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>METER MAKE:</strong></td><td>{inp("rt_meterMake")}</td><td><strong>SR NO.:</strong></td><td>{inp("rt_srNo")}</td></tr>
            <tr><td><strong>Date:</strong></td><td><input type="date" value={formData.rt_date} onChange={(e) => update("rt_date", e.target.value)} /></td><td><strong>Time:</strong></td><td><input type="time" value={formData.rt_time} onChange={(e) => update("rt_time", e.target.value)} /></td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th></th><th>CAL. RATIO</th><th>MEASURED RATIO</th><th>DEVIATION %</th></tr></thead>
          <tbody>
            <tr><td><strong>1.1-2</strong></td><td>{inp("rt_11_2_cal")}</td><td>{inp("rt_11_2_meas")}</td><td style={{ backgroundColor: "#f44336", color: "#fff" }}>{inp("rt_11_2_dev")}</td></tr>
            <tr><td><strong>1.1-2.1</strong></td><td>{inp("rt_11_21_cal")}</td><td>{inp("rt_11_21_meas")}</td><td>{inp("rt_11_21_dev")}</td></tr>
            <tr><td><strong>2.1-2</strong></td><td>{inp("rt_21_2_cal")}</td><td>{inp("rt_21_2_meas")}</td><td>{inp("rt_21_2_dev")}</td></tr>
          </tbody>
        </table>

        {/* ══ 3. VOLTAGE RATIO TEST ══ */}
        {sectionBanner("PROCESS: VOLTAGE RATIO TEST")}
        <table className="form-table">
          <thead>
            <tr><th>APPLIED VOLTAGE (V)</th><th colSpan="2">MEASURED VOLTAGE (V)</th></tr>
            <tr><th>1.1-2</th><th>1.1-2.1</th><th>2-2.1</th></tr>
          </thead>
          <tbody>
            <tr><td>{inp("vr_11_2_app")}</td><td>{inp("vr_11_2_1121")}</td><td>{inp("vr_11_2_221")}</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead>
            <tr><th>1.1-2.1</th><th>1.1-2</th><th>2-2.1</th></tr>
          </thead>
          <tbody>
            <tr><td>{inp("vr_1121_app")}</td><td>{inp("vr_1121_112")}</td><td>{inp("vr_1121_221")}</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead>
            <tr><th>2.1-2</th><th>1.1-2</th><th>1.1-2.1</th></tr>
          </thead>
          <tbody>
            <tr><td>{inp("vr_212_app")}</td><td>{inp("vr_212_112")}</td><td>{inp("vr_212_1121")}</td></tr>
          </tbody>
        </table>

        {/* ══ 4. MAGNETIZING CURRENT TEST ══ */}
        {sectionBanner("PROCESS: MAGNETIZING CURRENT TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>APPLIED VOLTAGE:</strong></td><td>{inp("mag_appVoltage")}</td><td><strong>DATE:</strong></td><td><input type="date" value={formData.mag_date} onChange={(e) => update("mag_date", e.target.value)} /></td><td><strong>TIME:</strong></td><td><input type="time" value={formData.mag_time} onChange={(e) => update("mag_time", e.target.value)} /></td></tr>
            <tr><td><strong>METER MAKE:</strong></td><td>{inp("mag_meterMake")}</td><td><strong>SR. NO.:</strong></td><td colSpan="3">{inp("mag_srNo")}</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th></th><th>APPLIED VOLTAGE (V)</th><th>MEASURED CURRENT (mA)</th></tr></thead>
          <tbody>
            <tr><td><strong>1.1-2</strong></td><td>{inp("mag_11_2_appV")}</td><td>{inp("mag_11_2_curr")}</td></tr>
            <tr><td><strong>1.1-2.1</strong></td><td>{inp("mag_1121_appV")}</td><td>{inp("mag_1121_curr")}</td></tr>
            <tr><td><strong>2.1-2</strong></td><td>{inp("mag_212_appV")}</td><td>{inp("mag_212_curr")}</td></tr>
          </tbody>
        </table>

        {/* ══ 5. SHORT CIRCUIT TEST ══ */}
        {sectionBanner("PROCESS: SHORT CIRCUIT TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>APPLIED VOLTAGE:</strong></td><td>{inp("sc_appVoltage")}</td><td><strong>DATE:</strong></td><td><input type="date" value={formData.sc_date} onChange={(e) => update("sc_date", e.target.value)} /></td><td><strong>TIME:</strong></td><td><input type="time" value={formData.sc_time} onChange={(e) => update("sc_time", e.target.value)} /></td></tr>
            <tr><td><strong>METER MAKE:</strong></td><td>{inp("sc_meterMake")}</td><td><strong>SR.NO.:</strong></td><td colSpan="3">{inp("sc_srNo")}</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th>APPLIED VOLTAGE (V)</th><th>MEASURED CURRENT (A)</th><th>MEASURED CURRENT (A)</th></tr></thead>
          <tbody>
            <tr><td>1.1-2</td><td>1.1</td><td>2-2.1 (Short)</td></tr>
            <tr><td>{inp("sc_11_2_appV2")}</td><td>{inp("sc_11_2_curr3")}</td><td>{inp("sc_11_2_curr4")}</td></tr>
            <tr><td>1.1-2</td><td>2</td><td>1.1-2.1 (Short)</td></tr>
            <tr><td>{inp("sc_112_appV2")}</td><td>{inp("sc_112_curr3")}</td><td>{inp("sc_112_curr4")}</td></tr>
          </tbody>
        </table>
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", borderRadius: "4px", margin: "16px 0 8px" }}>% IMPEDANCE</div>
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "12px", fontWeight: "700", fontSize: "1.2rem", borderRadius: "4px", marginBottom: "8px" }}>
          % Z = <input type="text" value={formData.sc_percentZ} onChange={(e) => update("sc_percentZ", e.target.value)} style={{ width: "80px", textAlign: "center", border: "none", borderBottom: "1px solid #333", background: "transparent", fontSize: "1.1rem", fontWeight: "700" }} /> %
        </div>

        {/* ══ 6. WINDING RESISTANCE TEST ══ */}
        {sectionBanner("PROCESS: WINDING RESISTANCE TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>METER MAKE:</strong></td><td>{inp("wr_meterMake")}</td><td><strong>DATE:</strong></td><td><input type="date" value={formData.wr_date} onChange={(e) => update("wr_date", e.target.value)} /></td><td><strong>TIME:</strong></td><td><input type="time" value={formData.wr_time} onChange={(e) => update("wr_time", e.target.value)} /></td></tr>
            <tr>
              <td><strong>SR. NO:</strong></td>
              <td>{inp("wr_srNo")}</td>
              <td><strong>WDG TEMP (°C):</strong></td>
              <td>{inp("wr_wdgTemp")}</td>
              <td><strong>CORE TEMP (°C):</strong></td>
              <td>{inp("wr_coreTemp")}</td>
            </tr>
            <tr>
              <td><strong>RANGE:</strong></td>
              <td>{inp("wr_range")}</td>
              <td><strong>AMBIENT (°C):</strong></td>
              <td>{inp("wr_ambient")}</td>
              <td><strong>HUMIDITY (%):</strong></td>
              <td>{inp("wr_humidity")}</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th></th><th>Resistance @ Amb.</th><th>Resistance @75°C</th><th>MAX. GUARANTEED</th></tr></thead>
          <tbody>
            <tr><td><strong>1.1-2</strong></td><td>{inp("wr_11_2_amb")}</td><td style={{ backgroundColor: "#f44336", color: "#fff" }}>{inp("wr_11_2_75")}</td><td>{inp("wr_11_2_max")}</td></tr>
            <tr><td><strong>1.1-2.1</strong></td><td>{inp("wr_1121_amb")}</td><td style={{ backgroundColor: "#f44336", color: "#fff" }}>{inp("wr_1121_75")}</td><td>{inp("wr_1121_max")}</td></tr>
            <tr><td><strong>2.1-2</strong></td><td>{inp("wr_212_amb")}</td><td style={{ backgroundColor: "#f44336", color: "#fff" }}>{inp("wr_212_75")}</td><td>{inp("wr_212_max")}</td></tr>
          </tbody>
        </table>

        {/* ── Footer ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead><tr><th>TESTED BY</th><th>REVIEWED BY</th><th>AUTHORIZED BY</th></tr></thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">Submit Form</button>
        </div>
      </div>
    </div>
  );
}

// ─── Final LV Test Form ────────────────────────────────────────────────────────
function FinalLVTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // IR Values
    ir_date: "", ir_time: "",
    ir_ambTemp: "", ir_wdgTemp: "", ir_coreTemp: "", ir_relHumidity: "",
    ir_make: "MOTWANE", ir_srNo: "101979324", ir_range: "1-TO-5 kV", ir_voltageLevel: "",
    ir_10sec: "1000", ir_60sec: "1000", ir_ratio: "1",
    // Ratio Test
    rt_meterMake: "Eltel", rt_srNo: "20231604", rt_date: "", rt_time: "",
    rt_11_2_cal: "2.000", rt_11_2_meas: "1", rt_11_2_dev: "-50",
    rt_11_21_cal: "2.000", rt_11_21_meas: "1", rt_11_21_dev: "-50",
    rt_21_2_cal: "1.000", rt_21_2_meas: "0", rt_21_2_dev: "-100",
    // Voltage Ratio Test
    vr_11_2_app: "", vr_11_2_1121: "", vr_11_2_221: "",
    vr_1121_app: "", vr_1121_112: "", vr_1121_221: "",
    vr_212_app: "", vr_212_112: "", vr_212_1121: "",
    // Magnetizing Current Test
    mag_appVoltage: "", mag_date: "", mag_time: "58 Hrs",
    mag_meterMake: "HTC", mag_srNo: "HTC2406CG0244",
    mag_11_2_appV: "", mag_11_2_curr: "",
    mag_1121_appV: "", mag_1121_curr: "",
    mag_212_appV: "", mag_212_curr: "",
    // Short Circuit Test
    sc_appVoltage: "", sc_date: "", sc_time: "",
    sc_meterMake: "HTC", sc_srNo: "HTC2406CG0244",
    sc_11_2_appV2: "20", sc_11_2_curr3: "20", sc_11_2_curr4: "40",
    sc_112_appV2: "20", sc_112_curr3: "20", sc_112_curr4: "40",
    sc_percentZ: "0.26",
    // Winding Resistance Test
    wr_meterUsed: "PRESTIGE ELECTRONICS", wr_date: "", wr_humidity: "",
    wr_srNo: "PE/040/MAR/2023", wr_topOilTemp: "40", wr_bottomOilTemp: "34",
    wr_range: "1999.9 μΩ-19.999Ω", wr_ambient: "26", wr_avgOilTemp: "37",
    wr_11_2_amb: "0.218", wr_11_2_75: "0.24575", wr_11_2_max: "0.66",
    wr_1121_amb: "0.1098", wr_1121_75: "0.12377", wr_1121_max: "0.33",
    wr_212_amb: "0.1098", wr_212_75: "0.12377", wr_212_max: "0.33",
    // Tan Delta Test
    td_meterUsed: "MEGGER", td_date: "", td_time: "",
    td_modelSrNo: "1100205", td_oti: "", td_wti: "",
    td_topOil: "", td_bottomOil: "", td_ambTemp: "", td_humi: "",
    td_w_5kv_tanDelta: "", td_w_5kv_cap: "", td_w_5kv_exc: "", td_w_5kv_dl: "",
    td_w_10kv_tanDelta: "", td_w_10kv_cap: "", td_w_10kv_exc: "", td_w_10kv_dl: "",
    td_11_srNo: "", td_11_5kv_tanDelta: "", td_11_5kv_cap: "", td_11_5kv_exc: "", td_11_5kv_dl: "",
    td_11_10kv_tanDelta: "", td_11_10kv_cap: "", td_11_10kv_exc: "", td_11_10kv_dl: "",
    td_2_srNo: "", td_2_5kv_tanDelta: "", td_2_5kv_cap: "", td_2_5kv_exc: "", td_2_5kv_dl: "",
    td_2_10kv_tanDelta: "", td_2_10kv_cap: "", td_2_10kv_exc: "", td_2_10kv_dl: "",
    // Polarization Index
    pi_15sec: "", pi_60sec: "", pi_600sec: "", pi_ir: "", pi_pi: "",
    // Footer
    testedByDate: "", reviewedByDate: "", authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inp = (field) => <input type="text" value={formData[field]} onChange={(e) => update(field, e.target.value)} />;

  const handleDone = () => {
    console.log("Final LV Test form data:", formData);
    alert("Final LV Test data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  const sectionBanner = (text, bg = "#dce6f1") => (
    <div style={{ background: bg, textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", margin: "24px 0 12px" }}>
      {text}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>🧪 Final LV Test — {projectName}</h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "30px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(102,126,234,0.4)" }}>
          ← BACK TO DASHBOARD
        </button>
      </div>

      <div className="form-content">
        <div className="company-header"><h2>FINAL LV TEST</h2></div>

        {/* ══ 1. MEASUREMENT OF IR VALUES ══ */}
        {sectionBanner("PROCESS: MEASUREMENT OF IR VALUES")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Date:</strong></td><td><input type="date" value={formData.ir_date} onChange={(e) => update("ir_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td><td><input type="time" value={formData.ir_time} onChange={(e) => update("ir_time", e.target.value)} /></td>
              <td colSpan="2"><strong>Details of Insulation Tester:</strong></td>
            </tr>
            <tr><td><strong>Amb. Temp (°C):</strong></td><td>{inp("ir_ambTemp")}</td><td><strong>Make:</strong></td><td>{inp("ir_make")}</td><td></td><td></td></tr>
            <tr><td><strong>Wdg. Temp (°C):</strong></td><td>{inp("ir_wdgTemp")}</td><td><strong>Sr. No:</strong></td><td>{inp("ir_srNo")}</td><td></td><td></td></tr>
            <tr><td><strong>Core Temp (°C):</strong></td><td>{inp("ir_coreTemp")}</td><td><strong>Range:</strong></td><td>{inp("ir_range")}</td><td></td><td></td></tr>
            <tr><td><strong>Relative Humidity (%):</strong></td><td>{inp("ir_relHumidity")}</td><td><strong>Voltage Level:</strong></td><td>{inp("ir_voltageLevel")}</td><td></td><td></td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th></th><th>10 Sec (MΩ)</th><th>60 Sec (MΩ)</th><th>Ratio of 60 Sec/ 10 Sec</th></tr></thead>
          <tbody>
            <tr><td><strong>WINDING-EARTH</strong></td><td>{inp("ir_10sec")}</td><td>{inp("ir_60sec")}</td><td>{inp("ir_ratio")}</td></tr>
          </tbody>
        </table>

        {/* ══ 2. RATIO TEST ══ */}
        {sectionBanner("PROCESS: RATIO TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>METER MAKE:</strong></td><td>{inp("rt_meterMake")}</td><td><strong>SR NO.:</strong></td><td>{inp("rt_srNo")}</td></tr>
            <tr><td><strong>Date:</strong></td><td><input type="date" value={formData.rt_date} onChange={(e) => update("rt_date", e.target.value)} /></td><td><strong>Time:</strong></td><td><input type="time" value={formData.rt_time} onChange={(e) => update("rt_time", e.target.value)} /></td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th></th><th>CAL. RATIO</th><th>MEASURED RATIO</th><th>DEVIATION %</th></tr></thead>
          <tbody>
            <tr><td><strong>1.1-2</strong></td><td>{inp("rt_11_2_cal")}</td><td>{inp("rt_11_2_meas")}</td><td style={{ backgroundColor: "#f44336", color: "#fff" }}>{inp("rt_11_2_dev")}</td></tr>
            <tr><td><strong>1.1-2.1</strong></td><td>{inp("rt_11_21_cal")}</td><td>{inp("rt_11_21_meas")}</td><td style={{ backgroundColor: "#f44336", color: "#fff" }}>{inp("rt_11_21_dev")}</td></tr>
            <tr><td><strong>2.1-2</strong></td><td>{inp("rt_21_2_cal")}</td><td>{inp("rt_21_2_meas")}</td><td style={{ backgroundColor: "#f44336", color: "#fff" }}>{inp("rt_21_2_dev")}</td></tr>
          </tbody>
        </table>

        {/* ══ 3. VOLTAGE RATIO TEST ══ */}
        {sectionBanner("PROCESS: VOLTAGE RATIO TEST")}
        <table className="form-table">
          <thead>
            <tr><th>APPLIED VOLTAGE (V)</th><th colSpan="2">MEASURED VOLTAGE (V)</th></tr>
            <tr><th>1.1-2</th><th>1.1-2.1</th><th>2-2.1</th></tr>
          </thead>
          <tbody><tr><td>{inp("vr_11_2_app")}</td><td>{inp("vr_11_2_1121")}</td><td>{inp("vr_11_2_221")}</td></tr></tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead><tr><th>1.1-2.1</th><th>1.1-2</th><th>2-2.1</th></tr></thead>
          <tbody><tr><td>{inp("vr_1121_app")}</td><td>{inp("vr_1121_112")}</td><td>{inp("vr_1121_221")}</td></tr></tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead><tr><th>2.1-2</th><th>1.1-2</th><th>1.1-2.1</th></tr></thead>
          <tbody><tr><td>{inp("vr_212_app")}</td><td>{inp("vr_212_112")}</td><td>{inp("vr_212_1121")}</td></tr></tbody>
        </table>

        {/* ══ 4. MAGNETIZING CURRENT TEST ══ */}
        {sectionBanner("PROCESS: MAGNETIZING CURRENT TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>APPLIED VOLTAGE:</strong></td><td>{inp("mag_appVoltage")}</td><td><strong>DATE:</strong></td><td><input type="date" value={formData.mag_date} onChange={(e) => update("mag_date", e.target.value)} /></td><td><strong>TIME:</strong></td><td>{inp("mag_time")}</td></tr>
            <tr><td><strong>METER MAKE:</strong></td><td>{inp("mag_meterMake")}</td><td><strong>SR. NO.:</strong></td><td colSpan="3">{inp("mag_srNo")}</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th>TERMINALS</th><th>APPLIED VOLTAGE (V)</th><th>MEASURED CURRENT (mA)</th></tr></thead>
          <tbody>
            <tr><td><strong>1.1-2</strong></td><td>{inp("mag_11_2_appV")}</td><td>{inp("mag_11_2_curr")}</td></tr>
            <tr><td><strong>1.1-2.1</strong></td><td>{inp("mag_1121_appV")}</td><td>{inp("mag_1121_curr")}</td></tr>
            <tr><td><strong>2.1-2</strong></td><td>{inp("mag_212_appV")}</td><td>{inp("mag_212_curr")}</td></tr>
          </tbody>
        </table>

        {/* ══ 5. SHORT CIRCUIT TEST ══ */}
        {sectionBanner("PROCESS: SHORT CIRCUIT TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>APPLIED VOLTAGE:</strong></td><td>{inp("sc_appVoltage")}</td><td><strong>DATE:</strong></td><td><input type="date" value={formData.sc_date} onChange={(e) => update("sc_date", e.target.value)} /></td><td><strong>TIME:</strong></td><td><input type="time" value={formData.sc_time} onChange={(e) => update("sc_time", e.target.value)} /></td></tr>
            <tr><td><strong>METER MAKE:</strong></td><td>{inp("sc_meterMake")}</td><td><strong>SR. NO.:</strong></td><td colSpan="3">{inp("sc_srNo")}</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th>APPLIED VOLTAGE (V)</th><th>MEASURED CURRENT (A)</th><th>MEASURED CURRENT (A)</th></tr></thead>
          <tbody>
            <tr><td>1.1-2</td><td>1.1</td><td>2-2.1 (Short)</td></tr>
            <tr><td>{inp("sc_11_2_appV2")}</td><td>{inp("sc_11_2_curr3")}</td><td>{inp("sc_11_2_curr4")}</td></tr>
            <tr><td>1.1-2</td><td>2</td><td>1.1-2.1 (Short)</td></tr>
            <tr><td>{inp("sc_112_appV2")}</td><td>{inp("sc_112_curr3")}</td><td>{inp("sc_112_curr4")}</td></tr>
          </tbody>
        </table>
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", borderRadius: "4px", margin: "16px 0 8px" }}>% IMPEDANCE</div>
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "12px", fontWeight: "700", fontSize: "1.2rem", borderRadius: "4px", marginBottom: "8px" }}>
          % Z = <input type="text" value={formData.sc_percentZ} onChange={(e) => update("sc_percentZ", e.target.value)} style={{ width: "80px", textAlign: "center", border: "none", borderBottom: "1px solid #333", background: "transparent", fontSize: "1.1rem", fontWeight: "700" }} /> %
        </div>

        {/* ══ 6. WINDING RESISTANCE TEST ══ */}
        {sectionBanner("PROCESS: WINDING RESISTANCE TEST")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>METER USED:</strong></td><td>{inp("wr_meterUsed")}</td><td><strong>DATE:</strong></td><td><input type="date" value={formData.wr_date} onChange={(e) => update("wr_date", e.target.value)} /></td><td><strong>HUMIDITY (%):</strong></td><td>{inp("wr_humidity")}</td></tr>
            <tr><td><strong>METER MAKE SR. NO:</strong></td><td>{inp("wr_srNo")}</td><td><strong>TOP OIL TEMP (°C):</strong></td><td>{inp("wr_topOilTemp")}</td><td><strong>BOTTOM OIL TEMP (°C):</strong></td><td>{inp("wr_bottomOilTemp")}</td></tr>
            <tr><td><strong>RANGE:</strong></td><td>{inp("wr_range")}</td><td><strong>AMBIENT (°C):</strong></td><td>{inp("wr_ambient")}</td><td><strong>AVERAGE OIL TEMP (°C):</strong></td><td>{inp("wr_avgOilTemp")}</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead><tr><th>TERMINALS</th><th>Resistance @ Amb.</th><th>Resistance @75°C</th><th>MAX. GUARANTEED RESISTANCE</th></tr></thead>
          <tbody>
            <tr><td><strong>1.1-2</strong></td><td>{inp("wr_11_2_amb")}</td><td>{inp("wr_11_2_75")}</td><td>{inp("wr_11_2_max")}</td></tr>
            <tr><td><strong>1.1-2.1</strong></td><td>{inp("wr_1121_amb")}</td><td>{inp("wr_1121_75")}</td><td>{inp("wr_1121_max")}</td></tr>
            <tr><td><strong>2.1-2</strong></td><td>{inp("wr_212_amb")}</td><td>{inp("wr_212_75")}</td><td>{inp("wr_212_max")}</td></tr>
          </tbody>
        </table>

        {/* ══ 7. TAN DELTA AND CAPACITANCE TEST ON BUSHING ══ */}
        {sectionBanner("PROCESS: TAN DELTA AND CAPACITANCE TEST ON BUSHING")}
        <table className="form-table">
          <tbody>
            <tr><td><strong>METER USED</strong></td><td>{inp("td_meterUsed")}</td><td><strong>Date:</strong></td><td><input type="date" value={formData.td_date} onChange={(e) => update("td_date", e.target.value)} /></td><td><strong>Time:</strong></td><td><input type="time" value={formData.td_time} onChange={(e) => update("td_time", e.target.value)} /></td></tr>
            <tr><td><strong>MODEL & S. NO</strong></td><td>{inp("td_modelSrNo")}</td><td><strong>OTI:</strong></td><td>{inp("td_oti")}</td><td><strong>WTI:</strong></td><td>{inp("td_wti")}</td></tr>
            <tr><td><strong>Top Oil:</strong></td><td>{inp("td_topOil")}</td><td><strong>Bottom Oil:</strong></td><td>{inp("td_bottomOil")}</td><td><strong>Amb. Temp.:</strong></td><td>{inp("td_ambTemp")}</td></tr>
            <tr><td><strong>Humi.:</strong></td><td>{inp("td_humi")}</td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
        {/* Winding table */}
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr><th>CONNECTION</th><th>Applied Voltage (kV)</th><th>TAN DELTA (%)</th><th>CAPACITANCE (pf)</th><th>EXCITATION CURRENT (mA)</th><th>DIELECTRIC LOSS (W)</th></tr>
          </thead>
          <tbody>
            <tr><td rowSpan="2"><strong>WINDING</strong></td><td>5 kV</td><td>{inp("td_w_5kv_tanDelta")}</td><td>{inp("td_w_5kv_cap")}</td><td>{inp("td_w_5kv_exc")}</td><td>{inp("td_w_5kv_dl")}</td></tr>
            <tr><td>10 kV</td><td>{inp("td_w_10kv_tanDelta")}</td><td>{inp("td_w_10kv_cap")}</td><td>{inp("td_w_10kv_exc")}</td><td>{inp("td_w_10kv_dl")}</td></tr>
          </tbody>
        </table>
        {/* Terminal table */}
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr><th>TERMINAL</th><th>Sr. No.</th><th>Applied Voltage (kV)</th><th>TAN DELTA (%)</th><th>CAPACITANCE (pf)</th><th>EXCITATION CURRENT (mA)</th><th>DIELECTRIC LOSS (W)</th></tr>
          </thead>
          <tbody>
            <tr><td rowSpan="2"><strong>1.1</strong></td><td>{inp("td_11_srNo")}</td><td>5 kV</td><td>{inp("td_11_5kv_tanDelta")}</td><td>{inp("td_11_5kv_cap")}</td><td>{inp("td_11_5kv_exc")}</td><td>{inp("td_11_5kv_dl")}</td></tr>
            <tr><td>{inp("td_11_srNo2")}</td><td>10 kV</td><td>{inp("td_11_10kv_tanDelta")}</td><td>{inp("td_11_10kv_cap")}</td><td>{inp("td_11_10kv_exc")}</td><td>{inp("td_11_10kv_dl")}</td></tr>
            <tr><td rowSpan="2"><strong>2</strong></td><td>{inp("td_2_srNo")}</td><td>5 kV</td><td>{inp("td_2_5kv_tanDelta")}</td><td>{inp("td_2_5kv_cap")}</td><td>{inp("td_2_5kv_exc")}</td><td>{inp("td_2_5kv_dl")}</td></tr>
            <tr><td>{inp("td_2_srNo2")}</td><td>10 kV</td><td>{inp("td_2_10kv_tanDelta")}</td><td>{inp("td_2_10kv_cap")}</td><td>{inp("td_2_10kv_exc")}</td><td>{inp("td_2_10kv_dl")}</td></tr>
          </tbody>
        </table>

        {/* ══ 8. POLARIZATION INDEX ══ */}
        {sectionBanner("PROCESS: POLARIZATION INDEX")}
        <table className="form-table">
          <thead>
            <tr><th>CONNECTION</th><th>Applied Voltage(kV)</th><th>15 sec</th><th>60 sec</th><th>600 sec</th><th>IR 60sec/15sec</th><th>PI 600sec/60 sec</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>WINDING</strong></td><td>5</td><td>{inp("pi_15sec")}</td><td>{inp("pi_60sec")}</td><td>{inp("pi_600sec")}</td><td>{inp("pi_ir")}</td><td>{inp("pi_pi")}</td></tr>
          </tbody>
        </table>

        {/* ── Footer ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead><tr><th>TESTED BY</th><th>REVIEWED BY</th><th>AUTHORIZED BY</th></tr></thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">Submit Form</button>
        </div>
      </div>
    </div>
  );
}

// ─── Checklist for TFR Before HV Form ─────────────────────────────────────────
function ChecklistTFRBeforeHVForm({ projectName, companyName, onBack, onFormSubmit }) {
  const CHECKLIST_ITEMS = [
    { no: 1,  desc: "BDV of oil main tank and moisture content of oil for sample taken from main tank bottom." },
    { no: 2,  desc: "IR VALUES of windings at 60 sec." },
    { no: 3,  desc: "IR VALUES of Bushing WRT Test tap at 60 sec" },
    { no: 4,  desc: "Air venting from main tank and all other parts such as turrets, bushings, radiators." },
    { no: 5,  desc: "Radiators IF fitted for heat run test" },
    { no: 6,  desc: "Valves to be open between tank & radiators" },
    { no: 7,  desc: "Air venting in tap changer" },
    { no: 8,  desc: "Bushing oil level" },
    { no: 9,  desc: "Shorting of all LINE CT, WTI CT Secondary and CFT" },
    { no: 10, desc: "EARTHLING OF Main Tank Though copper flexible" },
    { no: 11, desc: "Earth Resistance at Transformer end" },
    { no: 12, desc: "Check for Buchholz pipeline valve to be kept open. And breather to be fitted to conservator" },
    { no: 13, desc: "Clearance in Test area w.r.t other equipment / material so as to avoid any lesser clearance WRT earth" },
    { no: 14, desc: "Clearance- Phase - Earth, Phase - Phase" },
    { no: 15, desc: "Check for oil level in all Test Equipment No load loss measurement transformer" },
    { no: 16, desc: "Load Loss Measurement Transformer" },
    { no: 17, desc: "Earthing of test equipment" },
    { no: 18, desc: "Removal of all external material from transformer tank under test." },
    { no: 19, desc: "Barricades put up for avoiding accidental entry of workmen to test area." },
    { no: 20, desc: "Final clearance for HV Testing" },
  ];

  const initRows = () => CHECKLIST_ITEMS.reduce((acc, item) => {
    acc[item.no] = { confirmValue: "", done: true, remark: "" };
    return acc;
  }, {});

  const [rows, setRows] = useState(initRows());
  const [formData, setFormData] = useState({ testedByDate: "", reviewedByDate: "", authorizedByDate: "" });

  const updateRow = (no, field, value) => setRows((prev) => ({ ...prev, [no]: { ...prev[no], [field]: value } }));
  const updateForm = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleDone = () => {
    console.log("Checklist TFR Before HV:", rows);
    alert("Checklist submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>🧪 Checklist for TFR Before HV — {projectName}</h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "30px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(102,126,234,0.4)" }}>
          ← BACK TO DASHBOARD
        </button>
      </div>

      <div className="form-content">
        <div className="company-header">
          <h2>CHECKLIST FOR TRANSFORMER BEFORE APPLYING HIGH VOLTAGE</h2>
        </div>

        {/* Process Row */}
        <div style={{ marginBottom: "20px", padding: "10px 0", borderBottom: "2px solid #4299e1" }}>
          <span style={{ fontWeight: "700", fontSize: "1rem", color: "#2d3748" }}>
            PROCESS: Checklist for transformer before applying high voltage
          </span>
        </div>

        {/* Checklist Table */}
        <table className="form-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>SR. NO</th>
              <th>PROCESS COMPLIANCE</th>
              <th style={{ width: "160px" }}>CONFIRMATION VALUES</th>
              <th style={{ width: "120px" }}>STATUS</th>
              <th style={{ width: "140px" }}>REMARK</th>
            </tr>
          </thead>
          <tbody>
            {CHECKLIST_ITEMS.map((item) => (
              <tr key={item.no}>
                <td style={{ textAlign: "center", fontWeight: "700" }}>{item.no}</td>
                <td style={{ textAlign: "center" }}>{item.desc}</td>
                <td>
                  <input type="text" value={rows[item.no].confirmValue} onChange={(e) => updateRow(item.no, "confirmValue", e.target.value)} />
                </td>
                <td style={{ textAlign: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={rows[item.no].done}
                      onChange={(e) => updateRow(item.no, "done", e.target.checked)}
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span style={{ color: "#1565c0", fontWeight: "600" }}>DONE</span>
                  </label>
                </td>
                <td>
                  <input type="text" value={rows[item.no].remark} onChange={(e) => updateRow(item.no, "remark", e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead><tr><th>TESTED BY</th><th>REVIEWED BY</th><th>AUTHORIZED BY</th></tr></thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => updateForm("testedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => updateForm("reviewedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => updateForm("authorizedByDate", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">Submit Form</button>
        </div>
      </div>
    </div>
  );
}

// ─── List of HV Test Form ──────────────────────────────────────────────────────
function ListOfHVTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // NLL section
    nll_90_meterRmsV: "", nll_90_appliedRmsV: "", nll_90_meterMeanV: "", nll_90_appliedMeanV: "",
    nll_90_meterCurrA: "", nll_90_currMeasured: "", nll_90_meterPowerW: "", nll_90_measuredPowerKW: "",
    nll_100_meterRmsV: "", nll_100_appliedRmsV: "", nll_100_meterMeanV: "", nll_100_appliedMeanV: "",
    nll_100_meterCurrA: "", nll_100_currMeasured: "", nll_100_meterPowerW: "", nll_100_measuredPowerKW: "",
    nll_110_meterRmsV: "", nll_110_appliedRmsV: "", nll_110_meterMeanV: "", nll_110_appliedMeanV: "",
    nll_110_meterCurrA: "", nll_110_currMeasured: "", nll_110_meterPowerW: "", nll_110_measuredPowerKW: "",
    nll_p0: "",
    // Load Loss section
    ll_oti: "", ll_wti: "", ll_topOil: "", ll_bottomOil: "", ll_avgOil: "",
    ll_ratedV: "", ll_ratedCurr: "", ll_meterReadingV: "", ll_measuredV: "",
    ll_meterAppliedCurr: "", ll_appliedCurr: "", ll_meterLossesW: "",
    ll_loadLossKW: "", ll_percentZ: "", ll_maxGuarLoss: "", ll_maxGuarImpedance: "", ll_maxGuarLeakage: "",
    // Separate Source
    ss_appliedVoltage: "", ss_timeInSec: "", ss_remarks: "",
    // Induced Voltage
    iv_openWinding: "", iv_suppliedVoltage: "", iv_inducedVoltage: "", iv_testFreq: "", iv_testDuration: "", iv_remark: "",
    // Major Test Summary
    mt_oc_losses: "", mt_oc_date: "", mt_oc_time: "", mt_oc_duration: "",
    mt_nll_losses: "", mt_nll_date: "", mt_nll_time: "", mt_nll_duration: "",
    mt_ll_losses: "", mt_ll_date: "", mt_ll_time: "", mt_ll_duration: "",
    mt_ss_losses: "", mt_ss_date: "", mt_ss_time: "", mt_ss_duration: "",
    mt_iv_losses: "", mt_iv_date: "", mt_iv_time: "", mt_iv_duration: "",
    mt_hr_losses: "", mt_hr_date: "", mt_hr_time: "", mt_hr_duration: "",
    // Footer
    testedByDate: "", reviewedByDate: "", authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inp = (field, style = {}) => <input type="text" value={formData[field]} onChange={(e) => update(field, e.target.value)} style={style} />;

  const handleDone = () => {
    console.log("List of HV Test form data:", formData);
    alert("HV Test data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  const sectionBanner = (text) => (
    <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", margin: "24px 0 12px" }}>
      {text}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>🧪 List of HV Test — {projectName}</h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "30px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(102,126,234,0.4)" }}>
          ← BACK TO DASHBOARD
        </button>
      </div>

      <div className="form-content">
        <div className="company-header"><h2>LIST OF HV TEST</h2></div>

        {/* ══ 1. NO LOAD LOSSES & NO LOAD CURRENT ══ */}
        {sectionBanner("PROCESS: NO LOAD LOSSES & NO LOAD CURRENT")}
        <table className="form-table">
          <tbody>
            <tr><td colSpan="2"><strong>TEST EQUIPMENT DETAILS</strong></td><td colSpan="4">POWER ANALYZER YOKOGAWA MAKE WT3000, SR NO: 91KA21004</td></tr>
            <tr><td><strong>CT RATIO</strong></td><td>10/1 A</td><td><strong>PT RATIO</strong></td><td>33000/√3/110/√3 V</td><td><strong>MF</strong></td><td>3000</td></tr>
            <tr><td rowSpan="3"><strong>CT SR. NOS<br/>MAKE-MOON LIGHT ELECTRICAL</strong></td><td>06/12/413</td><td rowSpan="3"><strong>PT SR. NOS<br/>MAKE-MOON LIGHT ELECTRICAL</strong></td><td>06/12/417</td><td></td><td></td></tr>
            <tr><td>06/12/414</td><td>06/12/418</td><td></td><td></td></tr>
            <tr><td>06/12/416</td><td>06/12/420</td><td></td><td></td></tr>
            <tr><td><strong>TRANSFORMER ENERGIZED FROM</strong></td><td colSpan="5">1.1-2.1 AND 2.0 WINDING KEPT OPEN</td></tr>
            <tr><td><strong>BASIC MVA</strong></td><td colSpan="5">16.5 MVA</td></tr>
            <tr><td><strong>TEST FREQUENCY</strong></td><td colSpan="5">50 Hz</td></tr>
          </tbody>
        </table>

        {/* NLL Measurement Table */}
        <table className="form-table" style={{ marginTop: "12px", fontSize: "0.75rem" }}>
          <thead>
            <tr>
              <th rowSpan="2">VOLTAGE IN %</th>
              <th colSpan="2">RMS VOLTAGE</th>
              <th colSpan="2">MEAN VOLTAGE</th>
              <th colSpan="2">RMS CURRENT</th>
              <th rowSpan="2">MAXIMUM GUARANTEED VALUE OF NO LOAD CURRENT IN A</th>
              <th colSpan="2">RMS POWER</th>
              <th rowSpan="2">MAXIMUM GUARANTEED VALUE OF NO LOAD LOSS IN KW AS PER RDSO APPROVED SOGP OF FIRM</th>
            </tr>
            <tr>
              <th>METER READING VOLTAGE V</th><th>APPLIED RMS VOLTAGE V</th>
              <th>METER READING VOLTAGE V</th><th>APPLIED MEAN VOLTAGE V</th>
              <th>METER READING CURRENT A</th><th>CURRENT MEASURED A</th>
              <th>METER READING POWER W</th><th>MEASURED POWER IN KW</th>
            </tr>
          </thead>
          <tbody>
            {[
              { pct: "90%", fields: ["nll_90_meterRmsV","nll_90_appliedRmsV","nll_90_meterMeanV","nll_90_appliedMeanV","nll_90_meterCurrA","nll_90_currMeasured","nll_90_meterPowerW","nll_90_measuredPowerKW"] },
              { pct: "100%", fields: ["nll_100_meterRmsV","nll_100_appliedRmsV","nll_100_meterMeanV","nll_100_appliedMeanV","nll_100_meterCurrA","nll_100_currMeasured","nll_100_meterPowerW","nll_100_measuredPowerKW"] },
              { pct: "110%", fields: ["nll_110_meterRmsV","nll_110_appliedRmsV","nll_110_meterMeanV","nll_110_appliedMeanV","nll_110_meterCurrA","nll_110_currMeasured","nll_110_meterPowerW","nll_110_measuredPowerKW"] },
            ].map((row) => (
              <tr key={row.pct}>
                <td><strong>{row.pct}</strong></td>
                {row.fields.map((f) => <td key={f}>{inp(f)}</td>)}
                <td>{inp(`nll_${row.pct.replace("%","")}_guar`)}</td>
                <td>{inp(`nll_${row.pct.replace("%","")}_maxLoss`)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* NLL Image row */}
        <table className="form-table" style={{ marginTop: "12px" }}>
          <tbody>
            <tr>
              <td style={{ textAlign: "center", fontWeight: "700", width: "33%" }}>NLL Image 90 %</td>
              <td style={{ textAlign: "center", fontWeight: "700", width: "33%" }}>NLL Image 100 %</td>
              <td style={{ textAlign: "center", fontWeight: "700", width: "33%" }}>NLL Image 110 %</td>
            </tr>
            <tr>
              <td style={{ height: "80px" }}></td>
              <td style={{ height: "80px" }}></td>
              <td style={{ height: "80px" }}></td>
            </tr>
          </tbody>
        </table>

        <div style={{ padding: "10px", background: "#f9fafb", borderRadius: "4px", margin: "12px 0", fontSize: "0.85rem" }}>
          <strong>CORRECTED NO LOAD LOSS = P₀ = Pm (1 + d) &nbsp;&nbsp; d=(Vmean-Vrms)/Vmean</strong>
        </div>
        <div style={{ padding: "10px", background: "#f9fafb", borderRadius: "4px", marginBottom: "12px", fontSize: "0.85rem" }}>
          <strong>For 100% Rated Voltage &nbsp;&nbsp; P₀ = {inp("nll_p0", { width: "60px" })} (1+ ...) = ... KW</strong>
        </div>

        {/* ══ 2. MEASUREMENT OF % IMPEDANCE AND LOAD LOSS ══ */}
        {sectionBanner("PROCESS: MEASUREMENT OF % IMPEDANCE AND LOAD LOSS")}
        <table className="form-table">
          <tbody>
            <tr><td colSpan="2"><strong>TEST EQUIPMENT DETAILS</strong></td><td colSpan="4">POWER ANALYZER YOKOGAWA MAKE WT3000, SR NO: 91KA21004</td></tr>
            <tr><td><strong>CT RATIO</strong></td><td>200/1</td><td><strong>PT RATIO</strong></td><td>1100/√3/110/√3</td><td><strong>MF</strong></td><td>2000</td></tr>
            <tr><td rowSpan="3"><strong>CT SR. NOS<br/>MAKE-MOON LIGHT ELECTRICAL</strong></td><td>06/12/413</td><td rowSpan="3"><strong>PT SR. NOS<br/>MAKE-MOON LIGHT ELECTRICAL</strong></td><td>06/12/424</td><td></td><td></td></tr>
            <tr><td>06/12/414</td><td>06/12/425</td><td></td><td></td></tr>
            <tr><td>06/12/416</td><td>06/12/426</td><td></td><td></td></tr>
            <tr>
              <td><strong>OTI (°C):</strong></td><td>{inp("ll_oti")}</td>
              <td><strong>WTI (°C):</strong></td><td>{inp("ll_wti")}</td>
              <td><strong>TOP OIL:</strong></td><td>{inp("ll_topOil")}</td>
            </tr>
            <tr>
              <td><strong>BOTTOM OIL:</strong></td><td>{inp("ll_bottomOil")}</td>
              <td><strong>AVG OIL:</strong></td><td>{inp("ll_avgOil")}</td>
              <td></td><td></td>
            </tr>
            <tr><td><strong>TEST VOLTAGE SUPPLY FROM:</strong></td><td colSpan="5">1.1-2 AND 1.1-2.1 TERMINAL SHORTED</td></tr>
            <tr><td><strong>BASIC MVA:</strong></td><td colSpan="5">16.5 MVA</td></tr>
            <tr><td><strong>SUPPLY FREQUENCY:</strong></td><td colSpan="5">50 Hz</td></tr>
          </tbody>
        </table>

        <table className="form-table" style={{ marginTop: "12px", fontSize: "0.72rem" }}>
          <thead>
            <tr>
              <th>RATED VOLTAGE V</th><th>RATED CURRENT A</th><th>METER READING VOLTAGE V</th><th>MEASURED VOLTAGE V</th>
              <th>METER READING APPLIED CURRENT A</th><th>APPLIED CURRENT A</th><th>METER READING LOSSES W</th>
              <th>LOAD LOSSES CORRECTED TO RATED CURRENT kW</th><th>% Z</th>
              <th>MAX. GUARANTEED LOSSES AT 75°C</th><th>MAX. GUARANTEED IMPEDANCE %</th><th>MAX. GUARANTEED LEAKAGE IMPEDANCE Ω</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{inp("ll_ratedV")}</td><td>{inp("ll_ratedCurr")}</td><td>{inp("ll_meterReadingV")}</td><td>{inp("ll_measuredV")}</td>
              <td>{inp("ll_meterAppliedCurr")}</td><td>{inp("ll_appliedCurr")}</td><td>{inp("ll_meterLossesW")}</td>
              <td>{inp("ll_loadLossKW")}</td><td>{inp("ll_percentZ")}</td>
              <td>{inp("ll_maxGuarLoss")}</td><td>{inp("ll_maxGuarImpedance")}</td><td>{inp("ll_maxGuarLeakage")}</td>
            </tr>
          </tbody>
        </table>

        <table className="form-table" style={{ marginTop: "12px" }}>
          <tbody>
            <tr><td style={{ textAlign: "center", fontWeight: "700" }}>Load Loss Image</td></tr>
            <tr><td style={{ height: "80px" }}></td></tr>
          </tbody>
        </table>

        {/* ══ 3. SEPARATE-SOURCE VOLTAGE APPLIED WITHSTAND TEST ══ */}
        {sectionBanner("PROCESS: SEPARATE-SOURCE VOLTAGE APPLIED WITHSTAND TEST")}
        <table className="form-table">
          <tbody>
            <tr><td colSpan="2"><strong>TEST EQUIPMENT DETAILS</strong></td><td colSpan="2">RECTIFIERS & ELECTRONICS PVT. LTD. MAKE DIVIDER & kV METER BEARING SR. NO (7749/110(P)/07-08)</td></tr>
            <tr><th>APPLIED TERMINAL</th><th>APPLIED VOLTAGE kV</th><th>TIME IN SECOND</th><th>REMARKS</th></tr>
            <tr>
              <td>(1.1 - 2 - 2.1) ALL TERMINAL SHORTED</td>
              <td>{inp("ss_appliedVoltage")}</td>
              <td>{inp("ss_timeInSec")}</td>
              <td>{inp("ss_remarks")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 4. INDUCED VOLTAGE WITHSTAND TEST ══ */}
        {sectionBanner("PROCESS: INDUCED VOLTAGE WITHSTAND TEST")}
        <table className="form-table">
          <tbody>
            <tr><td rowSpan="2"><strong>TEST EQUIPMENT DETAILS</strong></td><td>DIGITAL FREQUENCY METER OF MAKE MECO BEARING SERIAL NO 2303075</td></tr>
            <tr><td>DIGITAL VOLT METER OF DELTRONICS MAKE BEARING SERIAL NO 24125128</td></tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead>
            <tr>
              <th>VOLTAGE APPLIED TERMINAL</th><th>OPEN WINDING IN WHICH VOLTAGE</th>
              <th>SUPPLIED VOLTAGE ON LV 1.1-2.1 (kVrms)</th><th>INDUCED VOLTAGE IN HV 1.1-2 (kVrms)</th>
              <th>TEST FREQUENCY (Hz)</th><th>TEST DURATION (Sec)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.1-2.1</td>
              <td>{inp("iv_openWinding")}</td>
              <td>{inp("iv_suppliedVoltage")}</td>
              <td>{inp("iv_inducedVoltage")}</td>
              <td>{inp("iv_testFreq")}</td>
              <td>{inp("iv_testDuration")}</td>
            </tr>
            <tr><td colSpan="2" style={{ textAlign: "center" }}>Remark</td><td colSpan="4" style={{ textAlign: "center" }}>{inp("iv_remark")}</td></tr>
          </tbody>
        </table>

        {/* ══ 5. MAJOR TEST SUMMARY ══ */}
        <div style={{ background: "#6b7280", height: "8px", borderRadius: "4px", margin: "24px 0 12px" }} />
        <table className="form-table">
          <thead>
            <tr><th>Major Test</th><th>MEASURED LOSSES / WITHSTAND</th><th>DATE</th><th>TIME</th><th>DURATION</th></tr>
          </thead>
          <tbody>
            {[
              { label: "O.C TEST", f: "mt_oc" },
              { label: "No Load loss measurement", f: "mt_nll" },
              { label: "Load Loss measurement", f: "mt_ll" },
              { label: "Separate source voltage withstand test", f: "mt_ss" },
              { label: "Induced over voltage test", f: "mt_iv" },
              { label: "Heat Run Test only if Applicable", f: "mt_hr" },
            ].map((row) => (
              <tr key={row.f}>
                <td><strong>{row.label}</strong></td>
                <td>{inp(`${row.f}_losses`)}</td>
                <td><input type="date" value={formData[`${row.f}_date`]} onChange={(e) => update(`${row.f}_date`, e.target.value)} style={{ border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} /></td>
                <td><input type="time" value={formData[`${row.f}_time`]} onChange={(e) => update(`${row.f}_time`, e.target.value)} style={{ border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} /></td>
                <td>{inp(`${row.f}_duration`)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead><tr><th>TESTED BY</th><th>REVIEWED BY</th><th>AUTHORIZED BY</th></tr></thead>
          <tbody>
            <tr>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>RIPEKSHIT TUMBALE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>GAURAV KUREKAR</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} /></td>
              <td><strong>DATE</strong> <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">✅ Submit Form</button>
        </div>
      </div>
    </div>
  );
}

// ─── CT Test Form ──────────────────────────────────────────────────────────────
function CTTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // Name plate details - editable fields
    np_make_11: "", np_make_2: "", np_make_21: "", np_make_wti: "",
    np_type_11: "", np_type_2: "", np_type_21: "", np_type_wti: "",
    np_mfgSrNo_11: "", np_mfgSrNo_2: "", np_mfgSrNo_21: "", np_mfgSrNo_wti: "",
    np_yearMfg_11: "", np_yearMfg_2: "", np_yearMfg_21: "", np_yearMfg_wti: "",
    // Core 1.1 - CT Ratio measured secondary current
    ct11_20: "", ct11_40: "", ct11_60: "", ct11_80: "", ct11_100: "",
    // Core 1.1 - Knee point measured secondary current
    kp11_20: "", kp11_40: "", kp11_60: "", kp11_80: "", kp11_100: "", kp11_110: "",
    // Core 1.1 - Continuity / Resistance
    cont11_1: "", cont11_2: "", res11_1: "", res11_2: "",
    // Core 2 - CT Ratio measured secondary current
    ct2_20: "", ct2_40: "", ct2_60: "", ct2_80: "", ct2_100: "",
    // Core 2 - Knee point measured secondary current
    kp2_20: "", kp2_40: "", kp2_60: "", kp2_80: "", kp2_100: "", kp2_110: "",
    // Core 2 - Continuity / Resistance
    cont2_1: "", cont2_2: "", res2_1: "", res2_2: "",
    // Core 2.1 - CT Ratio measured secondary current
    ct21_20: "", ct21_40: "", ct21_60: "", ct21_80: "", ct21_100: "",
    // Core 2.1 - Knee point measured secondary current
    kp21_20: "", kp21_40: "", kp21_60: "", kp21_80: "", kp21_100: "", kp21_110: "",
    // Core 2.1 - Continuity / Resistance
    cont21_1: "", cont21_2: "", res21_1: "", res21_2: "",
    // Core WTI - CT Ratio measured secondary current
    ctwti_20: "", ctwti_40: "", ctwti_60: "", ctwti_80: "", ctwti_100: "",
    // Core WTI - Continuity / Resistance
    contwti_1: "", contwti_2: "", reswti_1: "", reswti_2: "",
    // Footer
    testedByDate: "", reviewedByDate: "", authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inp = (field, extraStyle = {}) => (
    <input
      type="text"
      value={formData[field]}
      onChange={(e) => update(field, e.target.value)}
      style={{ width: "100%", boxSizing: "border-box", ...extraStyle }}
    />
  );

  const handleDone = () => {
    console.log("CT Test form data:", formData);
    alert("CT Test data saved successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  // ── Helper: render one Ratio Test block ──────────────────────────────────────
  const renderRatioSection = (coreName, ctRows, kpRows, contKey1, resKey1) => (
    <div style={{ marginBottom: "24px" }}>

      {/* ── "Ratio Test :-" header row ── */}
      <table className="form-table">
        <tbody>
          <tr>
            <td style={{ fontWeight: "700", width: "110px" }}>Ratio Test :-</td>
            <td style={{ width: "60px" }}></td>
            <td style={{ backgroundColor: "#92d050", fontWeight: "700", textAlign: "center", width: "180px" }}>
              {coreName}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* ── CT Ratio CORE -S1-S2 label ── */}
      <div style={{ padding: "5px 12px", fontWeight: "600", fontSize: "0.85rem", border: "1px solid #e2e8f0", borderTop: "none", backgroundColor: "#f5f5f5" }}>
        CT Ratio CORE -S1-S2
      </div>

      {/* ── CT Ratio measurement table ── */}
      <table className="form-table">
        <thead>
          <tr>
            <th>Current %</th>
            <th>Applied Primary Current (A)</th>
            <th>Measured secondary current (A)</th>
          </tr>
        </thead>
        <tbody>
          {ctRows.map((row, i) => (
            <tr key={i}>
              <td style={{ textAlign: "center" }}>{row.pct}</td>
              <td style={{ textAlign: "center", fontWeight: "700" }}>{row.applied}</td>
              <td><input type="text" value={formData[row.measuredKey]} onChange={(e) => update(row.measuredKey, e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Knee point Voltage section (optional) ── */}
      {kpRows && (
        <>
          <div style={{ padding: "5px 12px", fontWeight: "600", fontSize: "0.85rem", border: "1px solid #e2e8f0", borderTop: "none", backgroundColor: "#f5f5f5" }}>
            knee point Voltage
          </div>
          <table className="form-table">
            <thead>
              <tr>
                <th>Voltage %</th>
                <th>Applied Primary Current (A)</th>
                <th>Measured secondary current (A)</th>
              </tr>
            </thead>
            <tbody>
              {kpRows.map((row, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>{row.pct}</td>
                  <td style={{ textAlign: "center", fontWeight: "700" }}>{row.applied}</td>
                  <td><input type="text" value={formData[row.measuredKey]} onChange={(e) => update(row.measuredKey, e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ── CONTINUITY / RESISTANCE row ── */}
      <table className="form-table">
        <tbody>
          <tr>
            <td style={{ textAlign: "right", fontWeight: "700", width: "25%" }}>CONTINUITY :</td>
            <td style={{ width: "25%" }}><input type="text" value={formData[contKey1]} onChange={(e) => update(contKey1, e.target.value)} /></td>
            <td style={{ textAlign: "right", fontWeight: "700", width: "25%" }}>RESISTANCE :</td>
            <td style={{ width: "25%" }}><input type="text" value={formData[resKey1]} onChange={(e) => update(resKey1, e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px 24px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>
            🧪 CT Test — {projectName}
          </h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button
          onClick={onBack}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "30px",
            fontWeight: "700",
            fontSize: "0.9rem",
            cursor: "pointer",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px rgba(102,126,234,0.4)",
          }}
        >
          ← BACK TO DASHBOARD
        </button>
      </div>

      {/* ── Form Content ── */}
      <div className="form-content">

        {/* ── Company Header ── */}
        <div className="company-header">
          <h2>M/S VISHVAS POWER ENGINEERING SERVICES (P) LTD</h2>
        </div>

        {/* ── Process Row ── */}
        <div style={{
          marginBottom: "20px",
          padding: "10px 0",
          borderBottom: "2px solid #4299e1",
        }}>
          <span style={{ fontWeight: "700", fontSize: "1rem", color: "#2d3748" }}>
            PROCESS &nbsp; CT Details and Testing
          </span>
        </div>

        {/* ── Name Plate Details ── */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontWeight: "700", marginBottom: "8px", fontSize: "0.95rem" }}>Name Plate Details:-</div>
          <table className="form-table">
            <thead>
              <tr>
                <th style={{ width: "60px", textAlign: "center" }}>Sr. No</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center", width: "14%" }}>1.1</th>
                <th style={{ textAlign: "center", width: "14%" }}>2</th>
                <th style={{ textAlign: "center", width: "14%" }}>2.1</th>
                <th style={{ textAlign: "center", width: "14%" }}>WTI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>1</td>
                <td style={{ textAlign: "center" }}>Make</td>
                <td>{inp("np_make_11")}</td>
                <td>{inp("np_make_2")}</td>
                <td>{inp("np_make_21")}</td>
                <td>{inp("np_make_wti")}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>2</td>
                <td style={{ textAlign: "center" }}>Type</td>
                <td>{inp("np_type_11")}</td>
                <td>{inp("np_type_2")}</td>
                <td>{inp("np_type_21")}</td>
                <td>{inp("np_type_wti")}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>3</td>
                <td style={{ textAlign: "center" }}>Burden</td>
                <td style={{ textAlign: "center" }}>0 VA</td>
                <td style={{ textAlign: "center" }}>0 VA</td>
                <td style={{ textAlign: "center" }}>10 VA</td>
                <td style={{ textAlign: "center" }}>VA</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>4</td>
                <td style={{ textAlign: "center" }}>Class of accuracy</td>
                <td style={{ textAlign: "center" }}>PS</td>
                <td style={{ textAlign: "center" }}>PS</td>
                <td style={{ textAlign: "center" }}>PS</td>
                <td style={{ textAlign: "center" }}>10 VA</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>5</td>
                <td style={{ textAlign: "center" }}>Ratio</td>
                <td style={{ textAlign: "center" }}>300 /5A</td>
                <td style={{ textAlign: "center" }}>300 /5A</td>
                <td style={{ textAlign: "center" }}>600 /5A</td>
                <td style={{ textAlign: "center" }}>145 /1.2A</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>6</td>
                <td style={{ textAlign: "center" }}>Knee point voltage</td>
                <td style={{ textAlign: "center" }}>150 V</td>
                <td style={{ textAlign: "center" }}>125 V</td>
                <td style={{ textAlign: "center" }}>125 V</td>
                <td style={{ textAlign: "center" }}>NA</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>7</td>
                <td style={{ textAlign: "center" }}>Manufacturing SR. NO</td>
                <td>{inp("np_mfgSrNo_11")}</td>
                <td>{inp("np_mfgSrNo_2")}</td>
                <td>{inp("np_mfgSrNo_21")}</td>
                <td>{inp("np_mfgSrNo_wti")}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>8</td>
                <td style={{ textAlign: "center" }}>Year of manufacture</td>
                <td>{inp("np_yearMfg_11")}</td>
                <td>{inp("np_yearMfg_2")}</td>
                <td>{inp("np_yearMfg_21")}</td>
                <td>{inp("np_yearMfg_wti")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Core 1.1 Ratio Test ── */}
        {renderRatioSection(
          "1.1",
          [
            { pct: "20%",  applied: "60",  measuredKey: "ct11_20"  },
            { pct: "40%",  applied: "120", measuredKey: "ct11_40"  },
            { pct: "60%",  applied: "180", measuredKey: "ct11_60"  },
            { pct: "80%",  applied: "240", measuredKey: "ct11_80"  },
            { pct: "100%", applied: "300", measuredKey: "ct11_100" },
          ],
          [
            { pct: "20%",  applied: "30",  measuredKey: "kp11_20"  },
            { pct: "40%",  applied: "60",  measuredKey: "kp11_40"  },
            { pct: "60%",  applied: "90",  measuredKey: "kp11_60"  },
            { pct: "80%",  applied: "120", measuredKey: "kp11_80"  },
            { pct: "100%", applied: "150", measuredKey: "kp11_100" },
            { pct: "110%", applied: "165", measuredKey: "kp11_110" },
          ],
          "cont11_1", "res11_1"
        )}

        {/* ── Core 2 Ratio Test ── */}
        {renderRatioSection(
          "2",
          [
            { pct: "20%",  applied: "60",  measuredKey: "ct2_20"  },
            { pct: "40%",  applied: "120", measuredKey: "ct2_40"  },
            { pct: "60%",  applied: "180", measuredKey: "ct2_60"  },
            { pct: "80%",  applied: "240", measuredKey: "ct2_80"  },
            { pct: "100%", applied: "300", measuredKey: "ct2_100" },
          ],
          [
            { pct: "20%",  applied: "25",    measuredKey: "kp2_20"  },
            { pct: "40%",  applied: "50",    measuredKey: "kp2_40"  },
            { pct: "60%",  applied: "75",    measuredKey: "kp2_60"  },
            { pct: "80%",  applied: "100",   measuredKey: "kp2_80"  },
            { pct: "100%", applied: "125",   measuredKey: "kp2_100" },
            { pct: "110%", applied: "137.5", measuredKey: "kp2_110" },
          ],
          "cont2_1", "res2_1"
        )}

        {/* ── Core 2.1 Ratio Test ── */}
        {renderRatioSection(
          "2.1",
          [
            { pct: "20%",  applied: "120", measuredKey: "ct21_20"  },
            { pct: "40%",  applied: "240", measuredKey: "ct21_40"  },
            { pct: "60%",  applied: "360", measuredKey: "ct21_60"  },
            { pct: "80%",  applied: "480", measuredKey: "ct21_80"  },
            { pct: "100%", applied: "600", measuredKey: "ct21_100" },
          ],
          [
            { pct: "20%",  applied: "25",    measuredKey: "kp21_20"  },
            { pct: "40%",  applied: "50",    measuredKey: "kp21_40"  },
            { pct: "60%",  applied: "75",    measuredKey: "kp21_60"  },
            { pct: "80%",  applied: "100",   measuredKey: "kp21_80"  },
            { pct: "100%", applied: "125",   measuredKey: "kp21_100" },
            { pct: "110%", applied: "137.5", measuredKey: "kp21_110" },
          ],
          "cont21_1", "res21_1"
        )}

        {/* ── Core WTI Ratio Test (no knee point section) ── */}
        {renderRatioSection(
          "WTI",
          [
            { pct: "20%",  applied: "29",  measuredKey: "ctwti_20"  },
            { pct: "40%",  applied: "58",  measuredKey: "ctwti_40"  },
            { pct: "60%",  applied: "87",  measuredKey: "ctwti_60"  },
            { pct: "80%",  applied: "116", measuredKey: "ctwti_80"  },
            { pct: "100%", applied: "145", measuredKey: "ctwti_100" },
          ],
          null, // WTI has no knee point voltage section
          "contwti_1", "reswti_1"
        )}

        {/* ── Footer Signature Row ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>TESTED BY</th>
              <th>REVIEWED BY</th>
              <th>AUTHORIZED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>CHANCHALESH RABLE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Form Actions ── */}
        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">
            Submit Form
          </button>
        </div>

      </div>{/* end form-content */}
    </div>
  );
}

// ─── Pre-Connection Test Form ──────────────────────────────────────────────────
function PreConnectionTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // IR Values
    ir_date: "", ir_time: "",
    ir_ambTemp: "", ir_wdgTemp: "", ir_coreTemp: "", ir_relHumidity: "",
    ir_make: "MEGGER", ir_srNo: "A01148D22", ir_range: "1-TO-5 Kv", ir_voltageLevel: "",
    ir_10sec: "100", ir_60sec: "1000", ir_ratio: "10",
    // Ratio Test
    rt_meterMake: "Eltel", rt_srNo: "20151603", rt_date: "", rt_time: "",
    rt_11_2_cal: "2.000", rt_11_2_meas: "2.003", rt_11_2_dev: "0.15",
    rt_11_21_cal: "2.000", rt_11_21_meas: "1.9985", rt_11_21_dev: "-0.075",
    rt_21_2_cal: "1.000", rt_21_2_meas: "1.0003", rt_21_2_dev: "0.03",
    // Voltage Ratio Test
    vr_11_2_app: "", vr_11_2_1121: "", vr_11_2_221: "",
    vr_1121_app: "", vr_1121_112: "", vr_1121_221: "",
    vr_212_app: "", vr_212_112: "", vr_212_1121: "",
    // Magnetizing Current Test
    mag_appVoltage: "", mag_date: "", mag_time: "",
    mag_meterMake: "HTC", mag_srNo: "HTC2406CG0246",
    mag_11_2_appV: "", mag_11_2_curr: "",
    mag_1121_appV: "", mag_1121_curr: "",
    mag_212_appV: "", mag_212_curr: "",
    // Winding Resistance Test
    wr_make: "PRESTIGE ELECTRONICS", wr_date: "", wr_time: "",
    wr_srNo: "PE/12-JAN/09", wr_wdgTemp: "55", wr_coreTemp: "26",
    wr_range: "1999.9 μΩ-19.999Ω", wr_ambient: "26", wr_humidity: "40",
    wr_11_2_amb: "0.5869", wr_11_2_75: "0.62738", wr_11_2_max: "0.66",
    wr_1121_amb: "0.2985", wr_1121_75: "0.31909", wr_1121_max: "0.33",
    wr_212_amb: "0.2965", wr_212_75: "0.31695", wr_212_max: "0.33",
    // Footer
    testedByDate: "", reviewedByDate: "", authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inp = (field) => <input type="text" value={formData[field]} onChange={(e) => update(field, e.target.value)} />;

  const handleDone = () => {
    console.log("Pre-Connection Test form data:", formData);
    alert("Pre-Connection Test data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  const sectionBanner = (text) => (
    <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", margin: "24px 0 12px" }}>
      {text}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>🧪 Pre-Connection Test — {projectName}</h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "30px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(102,126,234,0.4)" }}>
          ← BACK TO DASHBOARD
        </button>
      </div>

      <div className="form-content">
        <div className="company-header">
          <h2>M/S VISHVAS POWER ENGINEERING SERVICES (P) LTD</h2>
        </div>

        {/* ══ 1. MEASUREMENT OF IR VALUES ══ */}
        {sectionBanner("PROCESS  MEASUREMENT OF IR VALUES")}

        {/* Date / Time / Insulation Tester Details */}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Date:</strong></td>
              <td><input type="date" value={formData.ir_date} onChange={(e) => update("ir_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td>
              <td><input type="time" value={formData.ir_time} onChange={(e) => update("ir_time", e.target.value)} /></td>
              <td colSpan="2" style={{ textAlign: "center", fontWeight: "700" }}>Details of Insulation Tester</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Amb. Temp:</strong></td>
              <td>{inp("ir_ambTemp")}</td>
              <td style={{ textAlign: "right" }}><strong>Make:</strong></td>
              <td style={{ fontWeight: "700" }}>MEGGER</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Wdg. Temp.</strong></td>
              <td>{inp("ir_wdgTemp")}</td>
              <td style={{ textAlign: "right" }}><strong>Sr. No:</strong></td>
              <td style={{ fontWeight: "700" }}>A01148D22</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Core Temp.</strong></td>
              <td>{inp("ir_coreTemp")}</td>
              <td style={{ textAlign: "right" }}><strong>Range:</strong></td>
              <td style={{ fontWeight: "700" }}>1-TO-5 Kv</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Relative Humidity:</strong></td>
              <td>{inp("ir_relHumidity")}</td>
              <td style={{ textAlign: "right" }}><strong>Voltage Level:</strong></td>
              <td>{inp("ir_voltageLevel")}</td>
              <td></td><td></td>
            </tr>
          </tbody>
        </table>

        {/* IR Values Table */}
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>COMBINATION</th>
              <th>10 Sec (MΩ)</th>
              <th>60 Sec (MΩ)</th>
              <th>Ratio of 60 Sec/ 10 Sec</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: "700" }}>WINDING-EARTH</td>
              <td>{inp("ir_10sec")}</td>
              <td>{inp("ir_60sec")}</td>
              <td>{inp("ir_ratio")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 2. RATIO TEST ══ */}
        {sectionBanner("PROCESS  RATIO TEST")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Meter Make</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>Eltel</td>
              <td><strong>SR NO.</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>20151603</td>
            </tr>
            <tr>
              <td><strong>Date:</strong></td>
              <td><input type="date" value={formData.rt_date} onChange={(e) => update("rt_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td>
              <td><input type="time" value={formData.rt_time} onChange={(e) => update("rt_time", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>TEMINALS</th>
              <th>CAL. RATIO</th>
              <th>MEASURED RATIO</th>
              <th>DEVIATION %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2</strong></td>
              <td>{inp("rt_11_2_cal")}</td>
              <td>{inp("rt_11_2_meas")}</td>
              <td>{inp("rt_11_2_dev")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2.1</strong></td>
              <td>{inp("rt_11_21_cal")}</td>
              <td>{inp("rt_11_21_meas")}</td>
              <td>{inp("rt_11_21_dev")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>2.1-2</strong></td>
              <td>{inp("rt_21_2_cal")}</td>
              <td>{inp("rt_21_2_meas")}</td>
              <td>{inp("rt_21_2_dev")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 3. VOLTAGE RATIO TEST ══ */}
        {sectionBanner("PROCESS  VOLTAGE RATIO TEST")}
        <table className="form-table">
          <thead>
            <tr>
              <th>APPLIED VOLTAGE (V)</th>
              <th colSpan="2">MEASURED VOLTAGE (V)</th>
            </tr>
            <tr>
              <th>1.1-2</th>
              <th>1.1-2.1</th>
              <th>2-2.1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{inp("vr_11_2_app")}</td>
              <td>{inp("vr_11_2_1121")}</td>
              <td>{inp("vr_11_2_221")}</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead>
            <tr>
              <th>1.1-2.1</th>
              <th>1.1-2</th>
              <th>2-2.1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{inp("vr_1121_app")}</td>
              <td>{inp("vr_1121_112")}</td>
              <td>{inp("vr_1121_221")}</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead>
            <tr>
              <th>2.1-2</th>
              <th>1.1-2</th>
              <th>1.1-2.1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{inp("vr_212_app")}</td>
              <td>{inp("vr_212_112")}</td>
              <td>{inp("vr_212_1121")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 4. MAGNETIZING CURRENT TEST ══ */}
        {sectionBanner("PROCESS  MAGNETIZING CURRENT TEST")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>APPLIED VOLTAGE :</strong></td>
              <td>{inp("mag_appVoltage")}</td>
              <td><strong>DATE:</strong></td>
              <td><input type="date" value={formData.mag_date} onChange={(e) => update("mag_date", e.target.value)} /></td>
              <td><strong>TIME:</strong></td>
              <td><input type="time" value={formData.mag_time} onChange={(e) => update("mag_time", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>METER MAKE :</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>HTC</td>
              <td><strong>SR NO.</strong></td>
              <td colSpan="3" style={{ fontWeight: "700", color: "#1565c0" }}>HTC2406CG0246</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>TEMINALS</th>
              <th>APPLIED VOLTAGE (V)<br /><span style={{ fontWeight: "400", fontSize: "0.8rem" }}>(1Φ 200VOLT APPLIED )</span></th>
              <th>MEASURED CURRENT (mA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2</strong></td>
              <td>{inp("mag_11_2_appV")}</td>
              <td>{inp("mag_11_2_curr")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2.1</strong></td>
              <td>{inp("mag_1121_appV")}</td>
              <td>{inp("mag_1121_curr")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>2.1-2</strong></td>
              <td>{inp("mag_212_appV")}</td>
              <td>{inp("mag_212_curr")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 5. WINDING RESISTANCE TEST ══ */}
        {sectionBanner("PROCESS  WINDING RESISTANCE TEST")}
        <table className="form-table">
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}><strong>MAKE :</strong></td>
              <td style={{ fontWeight: "700" }}>PRESTIGE ELECTRONICS</td>
              <td><strong>DATE:</strong></td>
              <td><input type="date" value={formData.wr_date} onChange={(e) => update("wr_date", e.target.value)} /></td>
              <td><strong>TIME:</strong></td>
              <td><input type="time" value={formData.wr_time} onChange={(e) => update("wr_time", e.target.value)} /></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>SR. NO :</strong></td>
              <td style={{ fontWeight: "700" }}>PE/12-JAN/09</td>
              <td><strong>WDG TEMP :</strong></td>
              <td>{inp("wr_wdgTemp")} °C</td>
              <td><strong>CORE TEMP:</strong></td>
              <td>{inp("wr_coreTemp")} °C</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>RANGE:</strong></td>
              <td style={{ fontWeight: "700" }}>1999.9 μΩ-19.999Ω</td>
              <td><strong>AMBIENT:</strong></td>
              <td>{inp("wr_ambient")} °C</td>
              <td><strong>HUMIDITY:</strong></td>
              <td>{inp("wr_humidity")} %</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>TEMINALS</th>
              <th>Resistance @ Amb.</th>
              <th>Resistance @75°C</th>
              <th>MAX. GUARANTEED RESISTANCE @75°C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2</strong></td>
              <td>{inp("wr_11_2_amb")}</td>
              <td>{inp("wr_11_2_75")}</td>
              <td>{inp("wr_11_2_max")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2.1</strong></td>
              <td>{inp("wr_1121_amb")}</td>
              <td>{inp("wr_1121_75")}</td>
              <td>{inp("wr_1121_max")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>2.1-2</strong></td>
              <td>{inp("wr_212_amb")}</td>
              <td>{inp("wr_212_75")}</td>
              <td>{inp("wr_212_max")}</td>
            </tr>
          </tbody>
        </table>

        {/* ── Footer Signature Row ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>TESTED BY</th>
              <th>REVIEWED BY</th>
              <th>AUTHORIZED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Form Actions ── */}
        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">Submit Form</button>
        </div>
      </div>
    </div>
  );
}

// ─── Post-Connection Test Form ─────────────────────────────────────────────────
function PostConnectionTestForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // IR Values
    ir_date: "", ir_time: "",
    ir_ambTemp: "", ir_wdgTemp: "", ir_coreTemp: "", ir_relHumidity: "",
    ir_voltageLevel: "",
    ir_10sec: "1000", ir_60sec: "1000", ir_ratio: "1",
    // Ratio Test
    rt_date: "", rt_time: "",
    rt_11_2_cal: "2.000", rt_11_2_meas: "2.003", rt_11_2_dev: "0.15",
    rt_11_21_cal: "2.000", rt_11_21_meas: "1.999", rt_11_21_dev: "-0.05",
    rt_21_2_cal: "1.000", rt_21_2_meas: "1.0003", rt_21_2_dev: "0.03",
    // Voltage Ratio Test
    vr_11_2_app: "", vr_11_2_1121: "", vr_11_2_221: "",
    vr_1121_app: "", vr_1121_112: "", vr_1121_221: "",
    vr_212_app: "", vr_212_112: "", vr_212_1121: "",
    // Magnetizing Current Test
    mag_appVoltage: "", mag_date: "", mag_time: "",
    mag_11_2_appV: "", mag_11_2_curr: "",
    mag_1121_appV: "", mag_1121_curr: "",
    mag_212_appV: "", mag_212_curr: "",
    // Short Circuit Test
    sc_appVoltage: "", sc_date: "", sc_time: "",
    sc_11_2_appV2: "20", sc_11_2_curr3: "20", sc_11_2_curr4: "40",
    sc_112_appV2: "20", sc_112_curr3: "20", sc_112_curr4: "40",
    sc_percentZ: "0.26",
    // Winding Resistance Test
    wr_date: "", wr_time: "",
    wr_wdgTemp: "55", wr_coreTemp: "26",
    wr_ambient: "26", wr_humidity: "40",
    wr_11_2_amb: "0.22", wr_11_2_75: "0.23517", wr_11_2_max: "0.66",
    wr_1121_amb: "0.10256", wr_1121_75: "0.10963", wr_1121_max: "0.33",
    wr_212_amb: "0.10985", wr_212_75: "0.11743", wr_212_max: "0.33",
    // Footer
    testedByDate: "", reviewedByDate: "", authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inp = (field) => <input type="text" value={formData[field]} onChange={(e) => update(field, e.target.value)} />;

  const handleDone = () => {
    console.log("Post-Connection Test form data:", formData);
    alert("Post-Connection Test data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  const sectionBanner = (text) => (
    <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", fontSize: "1rem", borderRadius: "4px", margin: "24px 0 12px" }}>
      {text}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>🧪 Post-Connection Testing — {projectName}</h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "30px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(102,126,234,0.4)" }}>
          ← BACK TO DASHBOARD
        </button>
      </div>

      <div className="form-content">
        <div className="company-header">
          <h2>M/S VISHVAS POWER ENGINEERING SERVICES (P) LTD</h2>
        </div>

        {/* ══ 1. MEASUREMENT OF IR VALUES ══ */}
        {sectionBanner("PROCESS  MEASUREMENT OF IR VALUES")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>Date:</strong></td>
              <td><input type="date" value={formData.ir_date} onChange={(e) => update("ir_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td>
              <td><input type="time" value={formData.ir_time} onChange={(e) => update("ir_time", e.target.value)} /></td>
              <td colSpan="2" style={{ textAlign: "center", fontWeight: "700" }}>Details of Insulation Tester:</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Amb. Temp:</strong></td>
              <td>{inp("ir_ambTemp")}</td>
              <td style={{ textAlign: "right" }}><strong>Make:</strong></td>
              <td style={{ fontWeight: "700" }}>MEGGER</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Wdg. Temp.</strong></td>
              <td>{inp("ir_wdgTemp")}</td>
              <td style={{ textAlign: "right" }}><strong>Sr. No:</strong></td>
              <td style={{ fontWeight: "700" }}>101979324</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Core Temp.</strong></td>
              <td>{inp("ir_coreTemp")}</td>
              <td style={{ textAlign: "right" }}><strong>Range:</strong></td>
              <td style={{ fontWeight: "700" }}>1-TO-5 kV</td>
              <td></td><td></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Relative Humidity:</strong></td>
              <td>{inp("ir_relHumidity")}</td>
              <td style={{ textAlign: "right" }}><strong>Voltage Level:</strong></td>
              <td>{inp("ir_voltageLevel")}</td>
              <td></td><td></td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th></th>
              <th>10 Sec (MΩ)</th>
              <th>60 Sec (MΩ)</th>
              <th>Ratio of 60 Sec/ 10 Sec</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: "700" }}>WINDING-EARTH</td>
              <td>{inp("ir_10sec")}</td>
              <td>{inp("ir_60sec")}</td>
              <td>{inp("ir_ratio")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 2. RATIO TEST ══ */}
        {sectionBanner("PROCESS  RATIO TEST")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>METER MAKE:</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>Eltel</td>
              <td><strong>SR NO.</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>20231604</td>
            </tr>
            <tr>
              <td><strong>Date:</strong></td>
              <td><input type="date" value={formData.rt_date} onChange={(e) => update("rt_date", e.target.value)} /></td>
              <td><strong>Time:</strong></td>
              <td><input type="time" value={formData.rt_time} onChange={(e) => update("rt_time", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>TEMINALS</th>
              <th>CAL. RATIO</th>
              <th>MEASURED RATIO</th>
              <th>DEVIATION %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2</strong></td>
              <td>{inp("rt_11_2_cal")}</td>
              <td>{inp("rt_11_2_meas")}</td>
              <td>{inp("rt_11_2_dev")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2.1</strong></td>
              <td>{inp("rt_11_21_cal")}</td>
              <td>{inp("rt_11_21_meas")}</td>
              <td>{inp("rt_11_21_dev")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>2.1-2</strong></td>
              <td>{inp("rt_21_2_cal")}</td>
              <td>{inp("rt_21_2_meas")}</td>
              <td>{inp("rt_21_2_dev")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 3. VOLTAGE RATIO TEST ══ */}
        {sectionBanner("PROCESS  VOLTAGE RATIO TEST")}
        <table className="form-table">
          <thead>
            <tr>
              <th>APPLIED VOLTAGE</th>
              <th colSpan="2">MEASURED VOLTAGE</th>
            </tr>
            <tr>
              <th>1.1-2</th>
              <th>1.1-2.1</th>
              <th>2-2.1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{inp("vr_11_2_app")}</td>
              <td>{inp("vr_11_2_1121")}</td>
              <td>{inp("vr_11_2_221")}</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead>
            <tr>
              <th>1.1-2.1</th>
              <th>1.1-2</th>
              <th>2-2.1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{inp("vr_1121_app")}</td>
              <td>{inp("vr_1121_112")}</td>
              <td>{inp("vr_1121_221")}</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "8px" }}>
          <thead>
            <tr>
              <th>2.1-2</th>
              <th>1.1-2</th>
              <th>1.1-2.1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{inp("vr_212_app")}</td>
              <td>{inp("vr_212_112")}</td>
              <td>{inp("vr_212_1121")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 4. MAGNETIZING CURRENT TEST ══ */}
        {sectionBanner("PROCESS  MAGNETIZING CURRENT TEST")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>APPLIED VOLTAGE :</strong></td>
              <td>{inp("mag_appVoltage")}</td>
              <td><strong>DATE:</strong></td>
              <td><input type="date" value={formData.mag_date} onChange={(e) => update("mag_date", e.target.value)} /></td>
              <td><strong>TIME:</strong></td>
              <td><input type="time" value={formData.mag_time} onChange={(e) => update("mag_time", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>METER MAKE :</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>HTC</td>
              <td><strong>SR NO.</strong></td>
              <td colSpan="3" style={{ fontWeight: "700", color: "#1565c0" }}>HTC2406CG0244</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>TEMINALS</th>
              <th>APPLIED VOLTAGE (V)<br /><span style={{ fontWeight: "400", fontSize: "0.8rem" }}>(1Φ 200 VOLT APPLIED )</span></th>
              <th>MEASURED CURRENT (mA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2</strong></td>
              <td>{inp("mag_11_2_appV")}</td>
              <td>{inp("mag_11_2_curr")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2.1</strong></td>
              <td>{inp("mag_1121_appV")}</td>
              <td>{inp("mag_1121_curr")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>2.1-2</strong></td>
              <td>{inp("mag_212_appV")}</td>
              <td>{inp("mag_212_curr")}</td>
            </tr>
          </tbody>
        </table>

        {/* ══ 5. SHORT CIRCUIT TEST ══ */}
        {sectionBanner("PROCESS  SHORT CIRCUIT TEST")}
        <table className="form-table">
          <tbody>
            <tr>
              <td><strong>APPLIED VOLTAGE :</strong></td>
              <td>{inp("sc_appVoltage")}</td>
              <td><strong>DATE:</strong></td>
              <td><input type="date" value={formData.sc_date} onChange={(e) => update("sc_date", e.target.value)} /></td>
              <td><strong>TIME:</strong></td>
              <td><input type="time" value={formData.sc_time} onChange={(e) => update("sc_time", e.target.value)} /></td>
            </tr>
            <tr>
              <td><strong>METER MAKE :</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>HTC</td>
              <td><strong>SR NO.</strong></td>
              <td colSpan="3" style={{ fontWeight: "700", color: "#1565c0" }}>HTC2406CG0246</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>TEMINALS</th>
              <th>APPLIED VOLTAGE (V)<br /><span style={{ fontWeight: "400", fontSize: "0.8rem" }}>(1Φ 20 VOLT APPLIED )</span></th>
              <th>MEASURED CURRENT (A)</th>
              <th>MEASURED CURRENT (A)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td style={{ textAlign: "center", fontWeight: "700" }}>1.1-2</td>
              <td style={{ textAlign: "center", fontWeight: "700" }}>1.1</td>
              <td style={{ textAlign: "center", fontWeight: "700" }}>2-2.1 (Short)</td>
            </tr>
            <tr>
              <td></td>
              <td>{inp("sc_11_2_appV2")}</td>
              <td>{inp("sc_11_2_curr3")}</td>
              <td>{inp("sc_11_2_curr4")}</td>
            </tr>
            <tr>
              <td></td>
              <td style={{ textAlign: "center", fontWeight: "700" }}>1.1-2</td>
              <td style={{ textAlign: "center", fontWeight: "700" }}>2</td>
              <td style={{ textAlign: "center", fontWeight: "700" }}>1.1-2.1 (Short)</td>
            </tr>
            <tr>
              <td></td>
              <td>{inp("sc_112_appV2")}</td>
              <td>{inp("sc_112_curr3")}</td>
              <td>{inp("sc_112_curr4")}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "8px", fontWeight: "700", borderRadius: "4px", margin: "16px 0 8px" }}>% IMPEDANCE</div>
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "12px", fontWeight: "700", fontSize: "1.2rem", borderRadius: "4px", marginBottom: "8px" }}>
          % Z = <input type="text" value={formData.sc_percentZ} onChange={(e) => update("sc_percentZ", e.target.value)} style={{ width: "80px", textAlign: "center", border: "none", borderBottom: "1px solid #333", background: "transparent", fontSize: "1.1rem", fontWeight: "700" }} /> %
        </div>

        {/* ══ 6. WINDING RESISTANCE TEST ══ */}
        {sectionBanner("PROCESS  WINDING RESISTANCE TEST")}
        <table className="form-table">
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}><strong>METER MAKE :</strong></td>
              <td style={{ fontWeight: "700" }}>PRESTIGE ELECTRONICS</td>
              <td><strong>DATE:</strong></td>
              <td><input type="date" value={formData.wr_date} onChange={(e) => update("wr_date", e.target.value)} /></td>
              <td><strong>TIME:</strong></td>
              <td><input type="time" value={formData.wr_time} onChange={(e) => update("wr_time", e.target.value)} /></td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>SR. NO :</strong></td>
              <td style={{ fontWeight: "700" }}>PE/12-JAN/09</td>
              <td><strong>WDG TEMP :</strong></td>
              <td>{inp("wr_wdgTemp")} °C</td>
              <td><strong>CORE TEMP:</strong></td>
              <td>{inp("wr_coreTemp")} °C</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>RANGE:</strong></td>
              <td style={{ fontWeight: "700" }}>1999.9 μΩ-19.999Ω</td>
              <td><strong>AMBIENT:</strong></td>
              <td>{inp("wr_ambient")} °C</td>
              <td><strong>HUMIDITY:</strong></td>
              <td>{inp("wr_humidity")} %</td>
            </tr>
          </tbody>
        </table>
        <table className="form-table" style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>TEMINALS</th>
              <th>Resistance @ Amb.</th>
              <th>Resistance @75°C</th>
              <th>MAX. GUARANTEED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2</strong></td>
              <td>{inp("wr_11_2_amb")}</td>
              <td>{inp("wr_11_2_75")}</td>
              <td>{inp("wr_11_2_max")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>1.1-2.1</strong></td>
              <td>{inp("wr_1121_amb")}</td>
              <td>{inp("wr_1121_75")}</td>
              <td>{inp("wr_1121_max")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}><strong>2.1-2</strong></td>
              <td>{inp("wr_212_amb")}</td>
              <td>{inp("wr_212_75")}</td>
              <td>{inp("wr_212_max")}</td>
            </tr>
          </tbody>
        </table>

        {/* ── Footer Signature Row ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>TESTED BY</th>
              <th>REVIEWED BY</th>
              <th>AUTHORIZED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Form Actions ── */}
        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">Submit Form</button>
        </div>
      </div>
    </div>
  );
}

// ─── Pre & Post VPD Servicing Form ────────────────────────────────────────────
function PrePostVPDServicingForm({ projectName, companyName, onBack, onFormSubmit }) {
  const [formData, setFormData] = useState({
    // Insulation Tester
    it_voltageLevel: "",
    // Multimeter (static: HTC / HTC2201CG0011)
    // Pre-Servicing
    pre_date: "", pre_time: "",
    pre_ambTemp: "", pre_wdgTemp: "", pre_relHumidity: "", pre_coreTemp: "",
    pre_ir_15sec: "", pre_ir_60sec: "",
    pre_mag_1121_appV: "", pre_mag_1121_curr: "",
    pre_mag_221_appV: "", pre_mag_221_curr: "",
    pre_mag_112_appV: "", pre_mag_112_curr: "",
    pre_2kv_coreFrame_voltage: "", pre_2kv_coreFrame_duration: "", pre_2kv_coreFrame_leakage: "",
    pre_2kv_frameFrame_voltage: "", pre_2kv_frameFrame_duration: "", pre_2kv_frameFrame_leakage: "",
    // Post-Servicing
    post_date: "", post_time: "",
    post_ambTemp: "", post_wdgTemp: "", post_relHumidity: "", post_coreTemp: "",
    post_ir_15sec: "", post_ir_60sec: "",
    post_mag_1121_appV: "", post_mag_1121_curr: "",
    post_mag_221_appV: "", post_mag_221_curr: "",
    post_mag_112_appV: "", post_mag_112_curr: "",
    post_2kv_coreFrame_voltage: "", post_2kv_coreFrame_duration: "", post_2kv_coreFrame_leakage: "",
    post_2kv_frameFrame_voltage: "", post_2kv_frameFrame_duration: "", post_2kv_frameFrame_leakage: "",
    // Footer
    testedByDate: "", reviewedByDate: "", authorizedByDate: "",
  });

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const inp = (field) => <input type="text" value={formData[field]} onChange={(e) => update(field, e.target.value)} />;

  const handleDone = () => {
    console.log("Pre & Post VPD Servicing form data:", formData);
    alert("Pre & Post VPD Servicing data submitted successfully!");
    if (onFormSubmit) onFormSubmit();
    onBack();
  };

  // ── Helper: render one servicing block (Pre or Post) ──────────────────────
  const renderServicingBlock = (label, prefix) => (
    <>
      {/* Process Banner */}
      <table className="form-table" style={{ marginBottom: "12px" }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: "700", width: "120px", textAlign: "center" }}>PROCESS</td>
            <td style={{ backgroundColor: "#a8c8ec", fontWeight: "700", fontSize: "1.1rem", textAlign: "center", padding: "10px" }}>
              {label}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Date / Time / Temps */}
      <table className="form-table">
        <tbody>
          <tr>
            <td style={{ textAlign: "right" }}><strong>Date:</strong></td>
            <td><input type="date" value={formData[`${prefix}_date`]} onChange={(e) => update(`${prefix}_date`, e.target.value)} /></td>
            <td style={{ textAlign: "right" }}><strong>Time:</strong></td>
            <td><input type="time" value={formData[`${prefix}_time`]} onChange={(e) => update(`${prefix}_time`, e.target.value)} /></td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}><strong>Amb. Temp:</strong></td>
            <td>{inp(`${prefix}_ambTemp`)} °C</td>
            <td style={{ textAlign: "right" }}><strong>Wdg. Temp.</strong></td>
            <td>{inp(`${prefix}_wdgTemp`)} °C</td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}><strong>Relative Humidity:</strong></td>
            <td>{inp(`${prefix}_relHumidity`)} %</td>
            <td style={{ textAlign: "right" }}><strong>Core Temp.</strong></td>
            <td>{inp(`${prefix}_coreTemp`)} °C</td>
          </tr>
        </tbody>
      </table>

      {/* IR VALUE sub-banner */}
      <div style={{ background: "#a8c8ec", textAlign: "center", padding: "6px", fontWeight: "700", fontSize: "0.95rem", borderRadius: "4px", margin: "12px 0 8px" }}>
        IR VALUE
      </div>
      <table className="form-table">
        <thead>
          <tr>
            <th></th>
            <th>15 Sec (MΩ)</th>
            <th>60 Sec (MΩ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: "700" }}>Wdg. - Earth</td>
            <td>{inp(`${prefix}_ir_15sec`)}</td>
            <td>{inp(`${prefix}_ir_60sec`)}</td>
          </tr>
        </tbody>
      </table>

      {/* MAGNETISING CURRENT TEST sub-banner */}
      <div style={{ background: "#a8c8ec", textAlign: "center", padding: "6px", fontWeight: "700", fontSize: "0.95rem", borderRadius: "4px", margin: "12px 0 8px" }}>
        MAGNETISING CURRENT TEST
      </div>
      <table className="form-table">
        <thead>
          <tr>
            <th></th>
            <th>Applied Voltage (V)<br /><span style={{ fontWeight: "400", fontSize: "0.8rem" }}>(1Φ 200 VOLT APPLIED )</span></th>
            <th>Measured Current (mA)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}><strong>1.1-2.1</strong></td>
            <td>{inp(`${prefix}_mag_1121_appV`)}</td>
            <td>{inp(`${prefix}_mag_1121_curr`)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}><strong>2-2.1</strong></td>
            <td>{inp(`${prefix}_mag_221_appV`)}</td>
            <td>{inp(`${prefix}_mag_221_curr`)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}><strong>1.1-2</strong></td>
            <td>{inp(`${prefix}_mag_112_appV`)}</td>
            <td>{inp(`${prefix}_mag_112_curr`)}</td>
          </tr>
        </tbody>
      </table>

      {/* 2 KV TEST sub-banner */}
      <div style={{ background: "#a8c8ec", textAlign: "center", padding: "6px", fontWeight: "700", fontSize: "0.95rem", borderRadius: "4px", margin: "12px 0 8px" }}>
        2 KV TEST
      </div>
      <table className="form-table">
        <thead>
          <tr>
            <th></th>
            <th>Voltage Applied (kV)</th>
            <th>Duration (Sec)</th>
            <th>Leakage Current (mA)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: "700" }}>Core- Frame</td>
            <td>{inp(`${prefix}_2kv_coreFrame_voltage`)}</td>
            <td>{inp(`${prefix}_2kv_coreFrame_duration`)}</td>
            <td>{inp(`${prefix}_2kv_coreFrame_leakage`)}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "700" }}>Frame-Frame</td>
            <td>{inp(`${prefix}_2kv_frameFrame_voltage`)}</td>
            <td>{inp(`${prefix}_2kv_frameFrame_duration`)}</td>
            <td>{inp(`${prefix}_2kv_frameFrame_leakage`)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "24px" }}>

      {/* ── Back to Dashboard Header ── */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 24px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#1e3a8a" }}>🧪 PRE & POST VPD SERVICING — {projectName}</h2>
          <div style={{ height: "4px", width: "80px", background: "linear-gradient(90deg,#667eea,#764ba2)", borderRadius: "2px", marginTop: "6px" }} />
        </div>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "30px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(102,126,234,0.4)" }}>
          ← BACK TO DASHBOARD
        </button>
      </div>

      <div className="form-content">
        {/* Company Header */}
        <div className="company-header">
          <h2>M/S VISHVAS POWER ENGINEERING SERVICES (P) LTD</h2>
        </div>

        {/* ── Details of Insulation Tester ── */}
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "6px", fontWeight: "700", fontSize: "0.95rem", borderRadius: "4px", margin: "16px 0 8px" }}>
          Details of Insulation Tester
        </div>
        <table className="form-table">
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Make:</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>MEGGER</td>
              <td style={{ textAlign: "right" }}><strong>Range:</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>1-TO-5 kV</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}><strong>Sr. No:</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>101979324</td>
              <td style={{ textAlign: "right" }}><strong>Voltage Level:</strong></td>
              <td>{inp("it_voltageLevel")}</td>
            </tr>
          </tbody>
        </table>

        {/* ── Details of Multimeter ── */}
        <div style={{ background: "#dce6f1", textAlign: "center", padding: "6px", fontWeight: "700", fontSize: "0.95rem", borderRadius: "4px", margin: "16px 0 8px" }}>
          Details of Multimeter
        </div>
        <table className="form-table">
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}><strong>MAKE</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>HTC</td>
              <td style={{ textAlign: "right" }}><strong>SR.NO.:</strong></td>
              <td style={{ fontWeight: "700", color: "#1565c0" }}>HTC2201CG0011</td>
            </tr>
          </tbody>
        </table>

        {/* ── Pre-Servicing Testing ── */}
        <div style={{ marginTop: "24px" }}>
          {renderServicingBlock("Pre-Servicing Testing", "pre")}
        </div>

        {/* ── Post-Servicing Testing ── */}
        <div style={{ marginTop: "32px" }}>
          {renderServicingBlock("Post-Servicing Testing", "post")}
        </div>

        {/* ── Footer Signature Row ── */}
        <table className="form-table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>TESTED BY</th>
              <th>REVIEWED BY</th>
              <th>AUTHORIZED BY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NONE</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>HEMANT BHAGAT</td>
              <td style={{ color: "#1565c0", fontWeight: "600" }}>KIRAN JOHARAPURKAR</td>
            </tr>
            <tr>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.testedByDate} onChange={(e) => update("testedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.reviewedByDate} onChange={(e) => update("reviewedByDate", e.target.value)} />
              </td>
              <td>
                <strong>DATE</strong>
                <input type="date" style={{ marginLeft: "8px", border: "none", borderBottom: "1px solid #ccc", outline: "none", background: "transparent" }} value={formData.authorizedByDate} onChange={(e) => update("authorizedByDate", e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Form Actions ── */}
        <div className="form-actions" style={{ justifyContent: "flex-end" }}>
          <button onClick={handleDone} className="submit-btn">Submit Form</button>
        </div>
      </div>
    </div>
  );
}

export default TestingAutoTransformerForms;
