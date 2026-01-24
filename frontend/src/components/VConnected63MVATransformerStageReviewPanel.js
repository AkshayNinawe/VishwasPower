import React from 'react';
import { BACKEND_API_BASE_URL, BACKEND_IMG_API_BASE_URL } from './constant';

/**
 * Stage 1 Form 1: Name Plate Details Transformer (Review)
 * UI should match input table UI from VConnected63MVATransformerForms.js Stage1Form1.
 */
const Stage1Form1 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>NAME PLATE DETAILS TRANSFORMER /REACTOR</h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>MAKE</strong>
          </td>
          <td>
            <input type="text" value={formData.make || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>CURRENT HV</strong>
          </td>
          <td>
            <input type="text" value={formData.currentHV || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>SR. NO.</strong>
          </td>
          <td>
            <input type="text" value={formData.srNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>LV</strong>
          </td>
          <td>
            <input type="text" value={formData.currentLV || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>MVA Rating</strong>
          </td>
          <td>
            <input type="text" value={formData.mvaRating || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Temp. Rise over amb. Oil (°C)</strong>
          </td>
          <td>
            <input type="text" value={formData.tempRiseOilC || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>HV (KV)</strong>
          </td>
          <td>
            <input type="text" value={formData.hvKv || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Winding (°C)</strong>
          </td>
          <td>
            <input type="text" value={formData.windingC || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV (KV)</strong>
          </td>
          <td>
            <input type="text" value={formData.lvKv || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Oil Quantity</strong>
          </td>
          <td>
            <input type="text" value={formData.oilQuantity || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>% Impedance</strong>
          </td>
          <td>
            <input type="text" value={formData.impedancePercent || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Weight of Core & Wdg.</strong>
          </td>
          <td>
            <input type="text" value={formData.weightCoreWdg || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Year of Mfg.</strong>
          </td>
          <td>
            <input type="text" value={formData.yearOfMfg || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>TRANSPORTING WEIGHT</strong>
          </td>
          <td>
            <input type="text" value={formData.transportingWeight || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>NO. OF COOLING FAN</strong>
          </td>
          <td>
            <input type="text" value={formData.noOfCoolingFan || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Total Weight</strong>
          </td>
          <td>
            <input type="text" value={formData.totalWeight || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>NO OF OIL PUMP</strong>
          </td>
          <td>
            <input type="text" value={formData.noOfOilPump || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>NO. OF RADIATORS</strong>
          </td>
          <td>
            <input type="text" value={formData.noOfRadiators || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>NO. OF TAPS</strong>
          </td>
          <td>
            <input type="text" value={formData.noOfTaps || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>MFG. OF OCTC</strong>
          </td>
          <td>
            <input type="text" value={formData.mfgOfOctc || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>TYPE OF OCTC</strong>
          </td>
          <td>
            <input type="text" value={formData.typeOfOctc || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>SR. NO. OCTC</strong>
          </td>
          <td>
            <input type="text" value={formData.srNoOctc || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Photo section remains same behavior; only heading/description matches input */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Transformer, Oil Level gauge, Wheel Locking, Transformer Foundation Level condition.
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

/**
 * Stage 1 Form 2: Accessories Checking (Review)
 * UI should match input table UI from VConnected63MVATransformerForms.js Stage1Form2.
 */
const Stage1Form2 = ({ formData }) => {
  const defaultRows = [
    { materialDescription: "HV bushing" },
    { materialDescription: "LV Bushing" },
    { materialDescription: "Radiators" },
    { materialDescription: "Buchholz" },
    { materialDescription: "PRV" },
    { materialDescription: "CPR" },
    { materialDescription: "Breather" },
    { materialDescription: "Bushing Connector" },
    { materialDescription: "Oil pump" },
    { materialDescription: "RFBD" },
    { materialDescription: "FAN" },
    { materialDescription: "turrets" },
    { materialDescription: "Valves" },
  ];

  const rows = Array.isArray(formData?.accessoriesRows) ? formData.accessoriesRows : [];

  return (
    <div className="form-container">
      <div className="company-header">
        <h2>ACCESSORIES CHECKING</h2>
      </div>

      <table className="form-table" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "6%" }}>No</th>
            <th style={{ width: "19%" }}>Packing case Number</th>
            <th style={{ width: "20%" }}>Material Description</th>
            <th style={{ width: "13%" }}>Qty as per P. L</th>
            <th style={{ width: "13%" }}>Qty. Received</th>
            <th style={{ width: "13%" }}>Short Qty</th>
            <th style={{ width: "16%" }}>Damaged Qty.</th>
          </tr>
        </thead>
        <tbody>
          {defaultRows.map((r, idx) => {
            const row = rows[idx] || {};
            return (
              <tr key={idx}>
                <td style={{ textAlign: "center", fontWeight: 700 }}>{idx + 1}</td>
                <td>
                  <input type="text" value={row.packingCaseNumber || ""} disabled className="form-input disabled preview" />
                </td>
                <td style={{ fontWeight: 700, padding: "10px 12px" }}>{r.materialDescription}</td>
                <td>
                  <input type="text" value={row.qtyAsPerPL || ""} disabled className="form-input disabled preview" />
                </td>
                <td>
                  <input type="text" value={row.qtyReceived || ""} disabled className="form-input disabled preview" />
                </td>
                <td>
                  <input type="text" value={row.shortQty || ""} disabled className="form-input disabled preview" />
                </td>
                <td>
                  <input type="text" value={row.damagedQty || ""} disabled className="form-input disabled preview" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Photo section label matches input */}
      <div className="photo-upload-section">
        <h4>Note: - Photographs to be added: -</h4>
        <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>Accessories</p>

        {formData.photos && (
          <div
            className="photo-display-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            {Object.entries(formData.photos).map(([photoKey, url]) => {
              let fullUrl;
              if (typeof url === "string") {
                if (url.startsWith("data:image/")) {
                  fullUrl = url;
                } else if (url.startsWith("http")) {
                  fullUrl = url;
                } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                  fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
                } else if (url.startsWith("/")) {
                  fullUrl = `${BACKEND_API_BASE_URL}${url}`;
                } else {
                  fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
                }
              } else {
                fullUrl = "/placeholder.svg";
              }

              return (
                <div
                  key={photoKey}
                  className="photo-item"
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <span
                    className="photo-label"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    {photoKey}
                  </span>
                  <img
                    src={fullUrl}
                    alt={photoKey}
                    className="photo-preview-img"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      console.error(`Failed to load image: ${fullUrl}`);
                      e.target.src = "/placeholder.svg";
                    }}
                    onClick={() => {
                      window.open(fullUrl, "_blank");
                    }}
                  />
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    <a
                      href={fullUrl}
                      download={`${photoKey}.jpg`}
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      📥 Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Stage 1 Form 3: Core Insulation + Equipment + Safety (Review)
 * UI matches VConnected63MVATransformerForms.js Stage1Form3, but read-only.
 */
const Stage1Form3 = ({ formData }) => {
  const defaultEquipmentItems = [
    { srNo: 2, description: "Whether the Filter Machine is Available", ratingHint: "(Yes/No)" },
    { srNo: 3, description: "Capacity of Filter Machine", ratingHint: "" },
    { srNo: 4, description: "Capacity of the Vacuum Pump to be used.", ratingHint: "" },
    { srNo: 5, description: "Whether the Reservoir is Available with valves and a breather.", ratingHint: "" },
    { srNo: 6, description: "Capacity of Reservoirs.", ratingHint: "" },
    { srNo: 8, description: "Hose Pipes for the Filtration Process.", ratingHint: "(Yes/No)" },
    { srNo: 9, description: "Whether Crane is Available in good condition", ratingHint: "" },
    { srNo: 10, description: "Dry air", ratingHint: "(Yes/No)" },
    { srNo: 11, description: "Dew point meter", ratingHint: "(Yes/No)" },
    { srNo: 12, description: "Mec Leod gauge", ratingHint: "(Yes/No)" },
  ];

  const defaultSafetyItems = [
    { description: "Fire extinguisher/ Fire sand bucket" },
    { description: "First aid kit" },
    { description: "PPE for the working team of ETC agency, like- Safety shoes, Helmet, etc..." },
  ];

  const equipmentRows = Array.isArray(formData?.equipment) ? formData.equipment : [];
  const safetyRows = Array.isArray(formData?.safety) ? formData.safety : [];

  return (
    <div className="form-container">
      <div style={{ marginTop: "10px", textAlign: "center", fontWeight: 900, fontSize: "18px" }}>
        CORE INSULATION CHECK:&nbsp;&nbsp; At 1 KV {"\u003E"} 500 MΩ
      </div>

      <table className="form-table" style={{ marginTop: "12px", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "38%" }}></th>
            <th style={{ width: "31%" }}>Obtained Value</th>
            <th style={{ width: "31%" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: 800 }}>Between Core – frame</td>
            <td>
              <input
                type="text"
                value={formData?.coreInsulation?.coreToFrame?.obtainedValue || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={formData?.coreInsulation?.coreToFrame?.remarks || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>

          <tr>
            <td style={{ fontWeight: 800 }}>Between Frame – tank</td>
            <td>
              <input
                type="text"
                value={formData?.coreInsulation?.frameToTank?.obtainedValue || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={formData?.coreInsulation?.frameToTank?.remarks || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>

          <tr>
            <td style={{ fontWeight: 800 }}>Between core – tank</td>
            <td>
              <input
                type="text"
                value={formData?.coreInsulation?.coreToTank?.obtainedValue || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={formData?.coreInsulation?.coreToTank?.remarks || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "28px", textAlign: "center", fontWeight: 900, fontSize: "16px" }}>
        CHECKLIST FOR CONFORMING AVAILABILITY OF EQUIPMENT AT SITE
      </div>

      <table className="form-table" style={{ marginTop: "12px", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "7%" }}></th>
            <th style={{ width: "48%" }}>Description</th>
            <th style={{ width: "25%" }}>Rating/capacity</th>
            <th style={{ width: "20%" }}>Checked by</th>
          </tr>
        </thead>
        <tbody>
          {defaultEquipmentItems.map((it, idx) => {
            const row = equipmentRows[idx] || {};
            return (
              <tr key={it.srNo}>
                <td style={{ textAlign: "center", fontWeight: 800 }}>{it.srNo}.</td>
                <td style={{ fontWeight: 800, padding: "10px 12px" }}>{it.description}</td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {it.ratingHint ? <div style={{ fontWeight: 700, color: "#111" }}>{it.ratingHint}</div> : null}
                    <input
                      type="text"
                      value={row.ratingCapacity || ""}
                      disabled
                      className="form-input disabled preview"
                    />
                  </div>
                </td>
                <td>
                  <input type="text" value={row.checkedBy || ""} disabled className="form-input disabled preview" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: "18px", textAlign: "center", fontWeight: 900 }}>SAFETY EQUIPMENT</div>

      <table className="form-table" style={{ marginTop: "10px", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "70%" }}>Descriptions</th>
            <th style={{ width: "30%" }}>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {defaultSafetyItems.map((it, idx) => {
            const row = safetyRows[idx] || {};
            return (
              <tr key={idx}>
                <td style={{ fontWeight: 800, padding: "10px 12px" }}>{it.description}</td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ fontWeight: 700 }}>(Yes/No)</div>
                    <input
                      type="text"
                      value={row.confirmation || ""}
                      disabled
                      className="form-input disabled preview"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Photo section label matches input */}
      <div className="photo-upload-section">
        <h4>Note: - Photographs to be added: -</h4>
        <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
          Note: - Photographs to be added of Above-mentioned point. Dry Air Arrangement, dew point meter, Mec Leod gauge
        </p>

        {formData.photos && (
          <div
            className="photo-display-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            {Object.entries(formData.photos).map(([photoKey, url]) => {
              let fullUrl;
              if (typeof url === "string") {
                if (url.startsWith("data:image/")) {
                  fullUrl = url;
                } else if (url.startsWith("http")) {
                  fullUrl = url;
                } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                  fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
                } else if (url.startsWith("/")) {
                  fullUrl = `${BACKEND_API_BASE_URL}${url}`;
                } else {
                  fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
                }
              } else {
                fullUrl = "/placeholder.svg";
              }

              return (
                <div
                  key={photoKey}
                  className="photo-item"
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <span
                    className="photo-label"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    {photoKey}
                  </span>
                  <img
                    src={fullUrl}
                    alt={photoKey}
                    className="photo-preview-img"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      console.error(`Failed to load image: ${fullUrl}`);
                      e.target.src = "/placeholder.svg";
                    }}
                    onClick={() => {
                      window.open(fullUrl, "_blank");
                    }}
                  />
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    <a
                      href={fullUrl}
                      download={`${photoKey}.jpg`}
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      📥 Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Stage 1 Form 4: Pre erection Ratio test of turret CTs (Review)
 * UI should match input table UI from VConnected63MVATransformerForms.js Stage1Form4.
 */
const Stage1Form4 = ({ formData }) => {
  const currentPercentRows = [20, 40, 60, 80, 100];
  const kneePercentRows = [20, 40, 60, 80, 100, 110];

  const renderPhaseBlock = (title, phaseKey) => (
    <div style={{ marginTop: "26px" }}>
      <table className="form-table">
        <thead>
          <tr>
            <th style={{ width: "40%", textAlign: "left" }}>CT Ratio CORE – S1-S2</th>
            <th style={{ width: "60%", textAlign: "center", fontSize: "18px", fontWeight: 900 }}>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" style={{ padding: 0 }}>
              <table className="form-table" style={{ marginTop: 0, border: "none" }}>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Current %</th>
                    <th style={{ width: "40%" }}>Applied primary Current (A)</th>
                    <th style={{ width: "40%" }}>Measured secondary current (A)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPercentRows.map((p) => (
                    <tr key={`${phaseKey}-ct-${p}`}>
                      <td style={{ fontWeight: 700, textAlign: "center" }}>{p}%</td>
                      <td>
                        <input
                          type="text"
                          value={formData?.[phaseKey]?.ctRatioCoreS1S2?.[p]?.appliedPrimaryCurrentA || ""}
                          disabled
                          className="form-input disabled preview"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={formData?.[phaseKey]?.ctRatioCoreS1S2?.[p]?.measuredSecondaryCurrentA || ""}
                          disabled
                          className="form-input disabled preview"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontWeight: 900, fontSize: "18px", marginTop: "10px", marginBottom: "6px" }}>Knee point Voltage</div>

      <table className="form-table">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Voltage %</th>
            <th style={{ width: "35%" }}>Applied voltage</th>
            <th style={{ width: "35%" }}>Measured current (A)</th>
          </tr>
        </thead>
        <tbody>
          {kneePercentRows.map((p) => (
            <tr key={`${phaseKey}-knee-${p}`}>
              <td style={{ fontWeight: 700, textAlign: "center" }}>{p}%</td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.kneePointVoltage?.[p]?.appliedVoltage || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.kneePointVoltage?.[p]?.measuredCurrentA || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="form-container">
      <div className="company-header">
        <h2 style={{ fontWeight: 900 }}>Pre erection Ratio test of turret CTs</h2>
      </div>

      {renderPhaseBlock("Phase 1.1", "phase11")}
      {renderPhaseBlock("Phase 1.2", "phase12")}

      <div className="photo-upload-section">
        <h4>Note: - Photographs to be added: -</h4>
        <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>CT Ratio kit calibration</p>

        {formData.photos && (
          <div
            className="photo-display-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            {Object.entries(formData.photos).map(([photoKey, url]) => {
              let fullUrl;
              if (typeof url === "string") {
                if (url.startsWith("data:image/")) {
                  fullUrl = url;
                } else if (url.startsWith("http")) {
                  fullUrl = url;
                } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                  fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
                } else if (url.startsWith("/")) {
                  fullUrl = `${BACKEND_API_BASE_URL}${url}`;
                } else {
                  fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
                }
              } else {
                fullUrl = "/placeholder.svg";
              }

              return (
                <div
                  key={photoKey}
                  className="photo-item"
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <span
                    className="photo-label"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    {photoKey}
                  </span>
                  <img
                    src={fullUrl}
                    alt={photoKey}
                    className="photo-preview-img"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      console.error(`Failed to load image: ${fullUrl}`);
                      e.target.src = "/placeholder.svg";
                    }}
                    onClick={() => {
                      window.open(fullUrl, "_blank");
                    }}
                  />
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    <a
                      href={fullUrl}
                      download={`${photoKey}.jpg`}
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      📥 Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Stage 1 Form 5: Pre erection Ratio test of turret CTs (Review)
 * UI should match input table UI from VConnected63MVATransformerForms.js Stage1Form5.
 */
const Stage1Form5 = ({ formData }) => {
  const currentPercentRows = [20, 40, 60, 80, 100];
  const kneePercentRows = [20, 40, 60, 80, 100, 110];

  const renderPhaseBlock = (title, phaseKey) => (
    <div style={{ marginTop: "26px" }}>
      <table className="form-table">
        <thead>
          <tr>
            <th style={{ width: "40%", textAlign: "left" }}>CT Ratio CORE – S1-S2</th>
            <th style={{ width: "60%", textAlign: "center", fontSize: "18px", fontWeight: 900 }}>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" style={{ padding: 0 }}>
              <table className="form-table" style={{ marginTop: 0, border: "none" }}>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Current %</th>
                    <th style={{ width: "40%" }}>Applied primary Current (A)</th>
                    <th style={{ width: "40%" }}>Measured secondary current (A)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPercentRows.map((p) => (
                    <tr key={`${phaseKey}-ct-${p}`}>
                      <td style={{ fontWeight: 700, textAlign: "center" }}>{p}%</td>
                      <td>
                        <input
                          type="text"
                          value={formData?.[phaseKey]?.ctRatioCoreS1S2?.[p]?.appliedPrimaryCurrentA || ""}
                          disabled
                          className="form-input disabled preview"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={formData?.[phaseKey]?.ctRatioCoreS1S2?.[p]?.measuredSecondaryCurrentA || ""}
                          disabled
                          className="form-input disabled preview"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontWeight: 900, fontSize: "18px", marginTop: "10px", marginBottom: "6px" }}>Knee point Voltage</div>

      <table className="form-table">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Voltage %</th>
            <th style={{ width: "35%" }}>Applied voltage</th>
            <th style={{ width: "35%" }}>Measured current (A)</th>
          </tr>
        </thead>
        <tbody>
          {kneePercentRows.map((p) => (
            <tr key={`${phaseKey}-knee-${p}`}>
              <td style={{ fontWeight: 700, textAlign: "center" }}>{p}%</td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.kneePointVoltage?.[p]?.appliedVoltage || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.kneePointVoltage?.[p]?.measuredCurrentA || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="form-container">
      <div className="company-header">
        <h2 style={{ fontWeight: 900 }}>Pre erection Ratio test of turret CTs</h2>
      </div>

      {renderPhaseBlock("Phase 2.1", "phase21")}
      {renderPhaseBlock("Phase 2.2", "phase22")}

      <div className="photo-upload-section">
        <h4>Note: - Photographs to be added: -</h4>
        <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>CT Ratio kit calibration</p>

        {formData.photos && (
          <div
            className="photo-display-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            {Object.entries(formData.photos).map(([photoKey, url]) => {
              let fullUrl;
              if (typeof url === "string") {
                if (url.startsWith("data:image/")) {
                  fullUrl = url;
                } else if (url.startsWith("http")) {
                  fullUrl = url;
                } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                  fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
                } else if (url.startsWith("/")) {
                  fullUrl = `${BACKEND_API_BASE_URL}${url}`;
                } else {
                  fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
                }
              } else {
                fullUrl = "/placeholder.svg";
              }

              return (
                <div
                  key={photoKey}
                  className="photo-item"
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <span
                    className="photo-label"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    {photoKey}
                  </span>
                  <img
                    src={fullUrl}
                    alt={photoKey}
                    className="photo-preview-img"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      console.error(`Failed to load image: ${fullUrl}`);
                      e.target.src = "/placeholder.svg";
                    }}
                    onClick={() => {
                      window.open(fullUrl, "_blank");
                    }}
                  />
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    <a
                      href={fullUrl}
                      download={`${photoKey}.jpg`}
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      📥 Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Stage 1 Form 6: Pre erection Ratio test of turret CTs (Review)
 * UI should match input table UI from VConnected63MVATransformerForms.js Stage1Form6.
 */
const Stage1Form6 = ({ formData }) => {
  const currentPercentRows = [20, 40, 60, 80, 100];
  const kneePercentRows = [20, 40, 60, 80, 100, 110];

  const renderPhaseBlock = (title, phaseKey) => (
    <div style={{ marginTop: "18px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "8px", fontWeight: 800 }}>{title}</h3>

      <div style={{ fontWeight: 800, marginTop: "10px", marginBottom: "6px" }}>Ratio test</div>

      <table className="form-table" style={{ marginTop: "8px" }}>
        <thead>
          <tr>
            <th colSpan="3" style={{ textAlign: "left" }}>
              <span style={{ fontWeight: 800 }}>CT Ratio CORE – S1-S2</span>
            </th>
          </tr>
          <tr>
            <th style={{ width: "20%" }}>Current %</th>
            <th style={{ width: "40%" }}>Applied primary Current (A)</th>
            <th style={{ width: "40%" }}>Measured secondary current (A)</th>
          </tr>
        </thead>
        <tbody>
          {currentPercentRows.map((p) => (
            <tr key={`${phaseKey}-ct-${p}`}>
              <td style={{ fontWeight: 700, textAlign: "center" }}>{p}%</td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.ctRatioCoreS1S2?.[p]?.appliedPrimaryCurrentA || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.ctRatioCoreS1S2?.[p]?.measuredSecondaryCurrentA || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ fontWeight: 900, fontSize: "18px", marginTop: "10px", marginBottom: "6px" }}>Knee point Voltage</div>

      <table className="form-table">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Voltage %</th>
            <th style={{ width: "35%" }}>Applied voltage</th>
            <th style={{ width: "35%" }}>Measured current (A)</th>
          </tr>
        </thead>
        <tbody>
          {kneePercentRows.map((p) => (
            <tr key={`${phaseKey}-knee-${p}`}>
              <td style={{ fontWeight: 700, textAlign: "center" }}>{p}%</td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.kneePointVoltage?.[p]?.appliedVoltage || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.[phaseKey]?.kneePointVoltage?.[p]?.measuredCurrentA || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderWTIBlock = () => (
    <div style={{ marginTop: "18px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "8px", fontWeight: 900 }}>WTI</h3>

      <table className="form-table" style={{ marginTop: "8px" }}>
        <thead>
          <tr>
            <th colSpan="5" style={{ textAlign: "left" }}>
              <span style={{ fontWeight: 800 }}>CT Ratio CORE - S1-S2, S1-S3, S1-S4</span>
            </th>
          </tr>
          <tr>
            <th style={{ width: "15%" }}>Current %</th>
            <th style={{ width: "30%" }}>Applied primary Current (A)</th>
            <th colSpan="3" style={{ width: "55%" }}>
              Measured secondary current (A)
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th style={{ width: "18%" }}>S1-S2</th>
            <th style={{ width: "18%" }}>S1-S3</th>
            <th style={{ width: "19%" }}>S1-S4</th>
          </tr>
        </thead>
        <tbody>
          {currentPercentRows.map((p) => (
            <tr key={`wti-${p}`}>
              <td style={{ fontWeight: 700, textAlign: "center" }}>{p}%</td>
              <td>
                <input
                  type="text"
                  value={formData?.wti?.[p]?.appliedPrimaryCurrentA || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.wti?.[p]?.measuredSecondaryCurrentS1S2A || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.wti?.[p]?.measuredSecondaryCurrentS1S3A || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.wti?.[p]?.measuredSecondaryCurrentS1S4A || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="form-container">
      <div className="company-header">
        <h2 style={{ fontWeight: 900 }}>Pre erection Ratio test of turret CTs</h2>
      </div>

      {renderPhaseBlock("Phase 3.1", "phase31")}
      {renderPhaseBlock("Phase 3.2", "phase32")}
      {renderWTIBlock()}

      {/* Photo section (same generic behavior as other review forms) */}
      <div className="photo-upload-section">
        <h4>Note: - Photographs to be added: -</h4>

        {formData.photos && (
          <div
            className="photo-display-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            {Object.entries(formData.photos).map(([photoKey, url]) => {
              let fullUrl;
              if (typeof url === "string") {
                if (url.startsWith("data:image/")) {
                  fullUrl = url;
                } else if (url.startsWith("http")) {
                  fullUrl = url;
                } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                  fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
                } else if (url.startsWith("/")) {
                  fullUrl = `${BACKEND_API_BASE_URL}${url}`;
                } else {
                  fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
                }
              } else {
                fullUrl = "/placeholder.svg";
              }

              return (
                <div
                  key={photoKey}
                  className="photo-item"
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <span
                    className="photo-label"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    {photoKey}
                  </span>
                  <img
                    src={fullUrl}
                    alt={photoKey}
                    className="photo-preview-img"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      console.error(`Failed to load image: ${fullUrl}`);
                      e.target.src = "/placeholder.svg";
                    }}
                    onClick={() => {
                      window.open(fullUrl, "_blank");
                    }}
                  />
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    <a
                      href={fullUrl}
                      download={`${photoKey}.jpg`}
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      📥 Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


const Stage1Form7 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TEST REPORT</h2>
      <h3 style={{ marginTop: "6px", fontWeight: 900 }}>TAN DELTA AND CAPACITANCE TEST ON BUSHING</h3>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "25%", fontWeight: 800 }}>METER USED</td>
          <td style={{ width: "25%" }}>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "25%", fontWeight: 800 }}>DATE:</td>
          <td style={{ width: "25%" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>MODEL & S. NO.</td>
          <td>
            <input type="text" value={formData.modelAndSerialNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>TIME :</td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}></td>
          <td></td>
          <td style={{ fontWeight: 800 }}>WTI:</td>
          <td>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}></td>
          <td></td>
          <td style={{ fontWeight: 800 }}>OTI:</td>
          <td>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ width: "25%", fontWeight: 800 }}>BUSHING SR. NO. (HV)</td>
          <td style={{ width: "25%" }}>
            <input type="text" value={formData.hvBushingSrNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "25%", fontWeight: 800 }}>MAKE</td>
          <td style={{ width: "25%" }}>
            <input type="text" value={formData.hvBushingMake || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>BUSHING SR. NO. (LV)</td>
          <td>
            <input type="text" value={formData.lvBushingSrNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td></td>
          <td>
            <input type="text" value={formData.lvBushingMake || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "14px" }}>
      <thead>
        <tr>
          <th style={{ width: "34%", textAlign: "left" }}>BUSHING SR. NO.HV</th>
          <th style={{ width: "33%" }}>1.1</th>
          <th style={{ width: "33%" }}>1.2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" value={formData.bushingSrNoHv || ""} disabled className="form-input disabled preview" />
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div style={{ marginTop: "12px", fontWeight: 900 }}>STATUS:</div>

    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "16%" }}>AT 05 KV PHASE</th>
          <th style={{ width: "21%" }}>TAN DELTA in %</th>
          <th style={{ width: "21%" }}>CAPACITANCE (PF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.hvAt5kv || []).map((row, idx) => (
          <tr key={`hvAt5kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input type="text" value={row.tanDeltaPercent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capacitancePf || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.excitationCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.dielectricLoss || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "16%" }}>AT 10 KV PHASE</th>
          <th style={{ width: "21%" }}>TAN DELTA in %</th>
          <th style={{ width: "21%" }}>CAPACITANCE (PF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.hvAt10kv || []).map((row, idx) => (
          <tr key={`hvAt10kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input type="text" value={row.tanDeltaPercent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capacitancePf || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.excitationCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.dielectricLoss || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ marginTop: "26px", textAlign: "center", fontWeight: 900, fontSize: "16px" }}>
      TYPE OF TEST – TAN DELTA AND CAPACITANCE TEST ON LV BUSHING
    </div>

    <table className="form-table" style={{ marginTop: "14px" }}>
      <thead>
        <tr>
          <th style={{ width: "34%", textAlign: "left" }}>BUSHING SR. NO.LV</th>
          <th style={{ width: "16.5%" }}>2.1</th>
          <th style={{ width: "16.5%" }}>2.2</th>
          <th style={{ width: "16.5%" }}>3.1</th>
          <th style={{ width: "16.5%" }}>3.2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" value={formData.bushingSrNoLv || ""} disabled className="form-input disabled preview" />
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div style={{ marginTop: "12px", fontWeight: 900 }}>STATUS:</div>

    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "16%" }}>AT 05 KV PHASE</th>
          <th style={{ width: "21%" }}>TAN DELTA in %</th>
          <th style={{ width: "21%" }}>CAPACITANCE (PF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.lvAt5kv || []).map((row, idx) => (
          <tr key={`lvAt5kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input type="text" value={row.tanDeltaPercent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capacitancePf || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.excitationCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.dielectricLoss || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "16%" }}>AT 10 KV PHASE</th>
          <th style={{ width: "21%" }}>TAN DELTA in %</th>
          <th style={{ width: "21%" }}>CAPACITANCE (PF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.lvAt10kv || []).map((row, idx) => (
          <tr key={`lvAt10kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input type="text" value={row.tanDeltaPercent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capacitancePf || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.excitationCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.dielectricLoss || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Ten delta kit, calibration report, during tendelta of bushing photo
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

/**
 * Stage 1 Form 8: RECORD OF MEASUREMENT OF IR VALUES (Before Erection) (Review)
 * UI should match input table UI from VConnected63MVATransformerForms.js Stage1Form8.
 */
const Stage1Form8 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>RECORD OF MEASUREMENT OF IR VALUES</h2>
      <h3 style={{ marginTop: "6px", fontWeight: 900 }}>Before Erection</h3>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "12%", fontWeight: 800 }}>Date :</td>
          <td style={{ width: "20%" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "12%", fontWeight: 800 }}>Time :</td>
          <td style={{ width: "20%" }}>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "36%", fontWeight: 800, textAlign: "center" }}>Details of Insulation tester</td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Amb. Temp :</td>
          <td>
            <input type="text" value={formData.ambTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>Make :</td>
          <td>
            <input type="text" value={formData.make || ""} disabled className="form-input disabled preview" />
          </td>
          <td rowSpan="4">
            <input
              type="text"
              value={formData.insulationTesterDetails || ""}
              disabled
              className="form-input disabled preview"
              placeholder="Enter insulation tester details"
              style={{ width: "100%", height: "100%" }}
            />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Oil Temp. :</td>
          <td>
            <input type="text" value={formData.oilTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>Sr. No. :</td>
          <td>
            <input type="text" value={formData.srNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Wdg. Temp. :</td>
          <td>
            <input type="text" value={formData.wdgTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>Range :</td>
          <td>
            <input type="text" value={formData.range || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Relative Humidity :</td>
          <td>
            <input
              type="text"
              value={formData.relativeHumidity || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td style={{ fontWeight: 800 }}>Voltage Level :</td>
          <td>
            <input type="text" value={formData.voltageLevel || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "26px" }}>
      <thead>
        <tr>
          <th style={{ width: "26%" }}></th>
          <th style={{ width: "18%" }}>
            10 Sec <br />
            (MΩ)
          </th>
          <th style={{ width: "18%" }}>
            60 Sec <br />
            (MΩ)
          </th>
          <th style={{ width: "38%" }}>Ratio of IR 60/IR 10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ fontWeight: 800 }}>HV-Earth</td>
          <td>
            <input type="text" value={formData.hvEarth_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>LV1-Earth</td>
          <td>
            <input type="text" value={formData.lv1Earth_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>LV2-Earth</td>
          <td>
            <input type="text" value={formData.lv2Earth_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>HV-LV1</td>
          <td>
            <input type="text" value={formData.hvLv1_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>HV-LV2</td>
          <td>
            <input type="text" value={formData.hvLv2_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>LV1-LV2</td>
          <td>
            <input type="text" value={formData.lv1Lv2_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>IR tester, calibration report, 60 sec IR value.</p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

/**
 * Stage 2 Form 1 (Review)
 * UI must match input table UI from VConnected63MVATransformerForms.js Stage2Form1.
 */
const Stage2Form1 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TEST VALUES PRIOR TO FILTERATION</h2>
      <h3 style={{ marginTop: "6px", fontWeight: 900 }}>Record of Oil Filling in the Reservoirs Tank</h3>
    </div>

    {/* Record of Oil Filling in the Reservoirs Tank */}
    <table className="form-table">
      <thead>
        <tr>
          <th style={{ width: "16%" }}></th>
          <th style={{ width: "17%" }}>No of barrels</th>
          <th style={{ width: "22%" }}>Started on Date & time</th>
          <th style={{ width: "22%" }}>Completed on Date & time</th>
          <th style={{ width: "11%" }}>BDV</th>
          <th style={{ width: "12%" }}>PPM</th>
        </tr>
      </thead>
      <tbody>
        {["tank1", "tank2", "tank3"].map((tankKey, idx) => {
          const label = idx === 0 ? "Tank1" : idx === 1 ? "Tank2" : "Tank3";
          const tank = formData?.reservoirTanks?.[tankKey] || {};
          return (
            <tr key={tankKey}>
              <td style={{ fontWeight: 800 }}>{label}</td>
              <td>
                <input type="text" value={tank.noOfBarrels || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="datetime-local" value={tank.startedOn || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="datetime-local" value={tank.completedOn || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={tank.bdv || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={tank.ppm || ""} disabled className="form-input disabled preview" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <div
      style={{
        marginTop: "30px",
        textAlign: "center",
        fontWeight: 900,
        fontSize: "18px",
      }}
    >
      Reservoir Tank Filtration
    </div>

    {/* Reservoir Tank Filtration table */}
    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "18%" }}>Date</th>
          <th style={{ width: "18%" }}>Time</th>
          <th style={{ width: "24%" }}>Vacuum Level (MM/HG or torr)</th>
          <th style={{ width: "20%" }}>Inlet Temp.</th>
          <th style={{ width: "20%" }}>Outlet Temp.</th>
        </tr>
      </thead>
      <tbody>
        {(formData?.filtrationRecords || []).map((row, index) => (
          <tr key={index}>
            <td>
              <input type="date" value={row.date || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="time" value={row.time || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.vacuumLevel || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.inletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.outletTemp || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ marginTop: "20px", fontWeight: 600 }}>
      Note: - Photographs to be added: - Internal condition of reservoir tank, Calibration report of BDV & PPM kit,
      Oil barrels checking by water pest, PPM Photo, Reading of BDV value.
    </div>

    {/* Photo section */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Internal condition of reservoir tank, calibration report of BDV & PPM kit, oil barrels checking by water pest,
        PPM Photo, Reading of BDV value.
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

const Stage2Form2 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>Line Lead Clearance in mm :-</h2>
    </div>

    {/* Line Lead Clearance table - match input UI */}
    <table className="form-table">
      <thead>
        <tr>
          <th></th>
          <th>1.1</th>
          <th>1.2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>HV with respect to earth</strong>
          </td>
          <td>
            <input type="text" value={formData.hv_earth_11 || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hv_earth_12 || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV 1 with respect to earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv1_earth_21 || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1_earth_22 || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV 2 with respect to earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv2_earth_31 || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2_earth_32 || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <h3 style={{ marginTop: "40px", textAlign: "center" }}>
      IR Values After erection Temp OTI .......°C WTI.............°C, AMB .............°C RANGE ONLY 1 KV
    </h3>

    {/* Header table - match input UI (Date/Time + insulation tester details) */}
    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>Date :</strong>
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Time:</strong>
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Details of Insulation tester</strong>
          </td>
        </tr>

        <tr>
          <td>
            <strong>Amb. Temp :</strong>
          </td>
          <td>
            <input type="text" value={formData.ambTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Make :</strong>
          </td>
          <td>
            <input type="text" value={formData.make || ""} disabled className="form-input disabled preview" />
          </td>
          <td rowSpan="4">
            <input
              type="text"
              value={formData.insulationTesterDetails || ""}
              disabled
              className="form-input disabled preview"
              style={{ width: "100%", height: "100%" }}
            />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Oil Temp. :</strong>
          </td>
          <td>
            <input type="text" value={formData.oilTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Sr. No. :</strong>
          </td>
          <td>
            <input type="text" value={formData.srNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Wdg. Temp. :</strong>
          </td>
          <td>
            <input type="text" value={formData.wdgTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Range :</strong>
          </td>
          <td>
            <input type="text" value={formData.range || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Relative Humidity :</strong>
          </td>
          <td>
            <input type="text" value={formData.relativeHumidity || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Voltage Level :</strong>
          </td>
          <td>
            <input type="text" value={formData.voltageLevel || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* IR measurement table - match input UI (15/60/ratio) */}
    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>15 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>Ratio of IR 60/IR 15</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>HV-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.hvEarth_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV1-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV2-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>HV-LV1</strong>
          </td>
          <td>
            <input type="text" value={formData.hvLv1_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>HV-LV2</strong>
          </td>
          <td>
            <input type="text" value={formData.hvLv2_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV1-LV2</strong>
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Before oil filling in main tank - match input UI */}
    <h4 style={{ marginTop: "40px" }}>Before oil filling in main tank</h4>
    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>BDV: _______ KV</strong>
          </td>
          <td>
            <input type="text" value={formData.bdv || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Water Content: _______ PPM</strong>
          </td>
          <td>
            <input type="text" value={formData.waterContent || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Photos - match input (Stage2Form2 has PhotoUploadSection) */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Dew Point, dry air attached photo on transformer, Lead clearances, anabond on both bushing's thimble,
        radiators, flashing, conservator internal inspection, full transformer photo.
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);


const Stage3Form1 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>DETAILS FOR RECORDING OF VACUUM CYCLE</h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>Vacuum hose Checked By</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.vacuumHoseCheckedBy || ""}
              disabled
              className="form-input disabled preview"
              style={{ width: "100%" }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Vacuum hose Connected To</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.vacuumHoseConnectedTo || ""}
              disabled
              className="form-input disabled preview"
              style={{ width: "100%" }}
            />
            <span style={{ marginLeft: "10px" }}>Valve.</span>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Evacuation Started At</strong>
          </td>
          <td>
            <input
              type="time"
              value={formData.evacuationStartedAt || ""}
              disabled
              className="form-input disabled preview"
              style={{ marginRight: "10px" }}
            />
            <span>Hrs. On</span>
            <input
              type="date"
              value={formData.evacuationStartedOn || ""}
              disabled
              className="form-input disabled preview"
              style={{ marginLeft: "10px" }}
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th>DATE</th>
          <th>TIME</th>
          <th>Vacuum Level in M/C</th>
          <th>Vac. Level in Transformer Tank (torr)</th>
        </tr>
      </thead>
      <tbody>
        {(formData.vacuumRecords || []).map((record, index) => (
          <tr key={index}>
            <td>
              <input type="date" value={record.date || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="time" value={record.time || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input
                type="text"
                value={record.vacuumLevelMic || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.vacuumLevelTransformer || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3 style={{ marginTop: "40px", textAlign: "center" }}>
      IR After oil Topping up To Conservator Temp OTI .......°C WTI.............°C, AMB .............°C RANGE ONLY 1 KV
    </h3>

    {/* Match input form (Stage3Form1 in VConnected63MVATransformerForms.js): header table with tester details */}
    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>Date :</strong>
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Time:</strong>
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Details of Insulation tester</strong>
          </td>
        </tr>

        <tr>
          <td>
            <strong>Amb. Temp :</strong>
          </td>
          <td>
            <input type="text" value={formData.ambTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Make :</strong>
          </td>
          <td>
            <input type="text" value={formData.make || ""} disabled className="form-input disabled preview" />
          </td>
          <td rowSpan="4">
            <input
              type="text"
              value={formData.insulationTesterDetails || ""}
              disabled
              className="form-input disabled preview"
              style={{ width: "100%", height: "100%" }}
            />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Oil Temp. :</strong>
          </td>
          <td>
            <input type="text" value={formData.oilTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Sr. No. :</strong>
          </td>
          <td>
            <input type="text" value={formData.srNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Wdg. Temp. :</strong>
          </td>
          <td>
            <input type="text" value={formData.wdgTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Range :</strong>
          </td>
          <td>
            <input type="text" value={formData.range || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Relative Humidity :</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.relativeHumidity || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Voltage Level :</strong>
          </td>
          <td>
            <input type="text" value={formData.voltageLevel || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Match input form: IR measurements are 15/60/ratio (despite header saying 10 sec) */}
    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>
            10 Sec <br />
            (MΩ)
          </th>
          <th>
            60 Sec <br />
            (MΩ)
          </th>
          <th>Ratio of IR 60/IR 10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>HV-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.hvEarth_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV1-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV2-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>HV-LV1</strong>
          </td>
          <td>
            <input type="text" value={formData.hvLv1_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>HV-LV2</strong>
          </td>
          <td>
            <input type="text" value={formData.hvLv2_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV1-LV2</strong>
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_15sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px", textAlign: "center" }}>PRESSURE TEST REPORT</h4>

    <div style={{ textAlign: "right", marginBottom: "8px" }}>
      <strong>DATE :- </strong>
      <input
        type="date"
        value={formData.pressureTestDate || ""}
        disabled
        className="form-input disabled preview"
        style={{ marginLeft: "8px" }}
      />
    </div>

    <table className="form-table">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>TIME STARTED</th>
          <th>PRESSURE Kg/cm²</th>
          <th colSpan="3">TEMP°C</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>Amb.</th>
          <th>OTI</th>
          <th>WTI</th>
        </tr>
      </thead>
      <tbody>
        {(formData.pressureTests || []).map((test, index) => (
          <tr key={index}>
            <td>
              <strong>{index + 1}</strong>
            </td>
            <td>
              <input type="time" value={test.timeStarted || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={test.pressure || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={test.tempAmb || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={test.tempOti || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={test.tempWti || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Photo section label matches input */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Mec Lead Gauge photo, vacuum gauge photo, pressure gauge
      </p>

      {formData.photos ? (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => window.open(fullUrl, "_blank")}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  </div>
);


// Stage 4 Form Components (for review display)
const Stage4Form1 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>RECORD FOR OIL FILTRATION</h2>
      <h3>Oil filtration of Main Tank</h3>
    </div>

    <table className="form-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Vacuum Level</th>
          <th>M/C Outlet Temp.</th>
          <th>OTI Temp.</th>
          <th>WTI Temp.</th>
        </tr>
      </thead>
      <tbody>
        {(formData.filtrationRecords || []).map((record, index) => (
          <tr key={index}>
            <td>
              <input
                type="date"
                value={record.date || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="time"
                value={record.time || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.vacuumLevel || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.mcOutletTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.otiTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.wtiTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Photo Upload Section for Review */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Oil Filtration Process
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

const Stage4Form2 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>
        IR Value before radiator/combine filtration Temp OTI .......°C WTI.............°C, AMB .............°C RANGE
        ONLY 1 KV
      </h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>Temp OTI °C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.tempOTI || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Temp WTI °C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.tempWTI || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Temp AMB °C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.tempAMB || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>15 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>Ratio of IR 60/IR 15</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>HV-Earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV-Earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Earth_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Earth_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Earth_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>HV-LV</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv1_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv1_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv1_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px", textAlign: "center" }}>Oil filtration of Cooler Bank</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Vacuum Level</th>
          <th>M/C Outlet Temp.</th>
          <th>OTI Temp.</th>
          <th>WTI Temp.</th>
        </tr>
      </thead>
      <tbody>
        {(formData.coolerBankRecords || []).map((record, index) => (
          <tr key={index}>
            <td>
              <input
                type="date"
                value={record.date || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="time"
                value={record.time || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.vacuumLevel || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.mcOutletTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.otiTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.wtiTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Photo Upload Section for Review */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Cooler Bank Filtration Process
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

const Stage4Form3 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>RECORD FOR OIL FILTRATION</h2>
      <h3>Oil filtration of Combine (Main Tank + Cooler bank)</h3>
    </div>

    <table className="form-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Vacuum Level</th>
          <th>M/C Outlet Temp.</th>
          <th>OTI Temp.</th>
          <th>WTI Temp.</th>
        </tr>
      </thead>
      <tbody>
        {(formData.combineRecords || []).map((record, index) => (
          <tr key={index}>
            <td>
              <input
                type="date"
                value={record.date || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="time"
                value={record.time || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.vacuumLevel || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.mcOutletTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.otiTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={record.wtiTemp || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Photo Upload Section for Review */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Combine Filtration Process
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

const Stage4Form4 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>
        IR & PI Value after filtration Temp OTI .......°C WTI.............°C, AMB .............°C RANGE ONLY 5 KV
      </h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>Temp OTI °C</strong>
          </td>
          <td>
            <input type="text" value={formData.tempOTI || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Temp WTI °C</strong>
          </td>
          <td>
            <input type="text" value={formData.tempWTI || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Temp AMB °C</strong>
          </td>
          <td>
            <input type="text" value={formData.tempAMB || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>10 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>600 Sec (MΩ)</th>
          <th>PI 600/60 Sec</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>HV-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.hvEarth_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_600sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvEarth_pi || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV1-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_600sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Earth_pi || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>HV-LV1</strong>
          </td>
          <td>
            <input type="text" value={formData.hvLv1_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_600sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_pi || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>After Oil Filtration of main tank</h4>
    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>BDV (KV)</strong>
          </td>
          <td>
            <input type="text" value={formData.bdv || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Water Content (PPM)</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.waterContent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Photo Upload Section for Review */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        PPM Photo, Reading of BDV values, Air cell, MOG, POG.
      </p>

      {formData.photos && (
        <div
          className="photo-display-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {Object.entries(formData.photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === "string") {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div
                key={photoKey}
                className="photo-item"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <span
                  className="photo-label"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, "_blank");
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

/**
 * Stage 4 review UI should match TractionTransformerForms.js input UI.
 * Stage 4 has 4 forms:
 * - Stage4Form1: Record Oil Filtration Main Tank
 * - Stage4Form2: IR Value Before Radiator Filtration
 * - Stage4Form3: Oil Filtration Combine
 * - Stage4Form4: IR & PI Value After Filtration
 */
const Stage4ReviewRenderer = ({ formDataFromDB }) => {
  const stage4Forms = [
    { id: "stage4-form1", title: "Record Oil Filtration Main Tank", component: Stage4Form1 },
    { id: "stage4-form2", title: "IR Value Before Radiator Filtration", component: Stage4Form2 },
    { id: "stage4-form3", title: "Oil Filtration Combine", component: Stage4Form3 },
    { id: "stage4-form4", title: "IR & PI Value After Filtration", component: Stage4Form4 },
  ];

  return (
    <div className="stage4-review-container">
      {stage4Forms.map((form, formIndex) => {
        const formData = formDataFromDB?.[`form${formIndex + 1}`] || {};
        const FormComponent = form.component;

        return (
          <div
            key={form.id}
            className="form-review-card"
            style={{
              marginBottom: "30px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="company-header"
              style={{
                textAlign: "center",
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.25rem" }}>
                {form.title}
              </h2>
            </div>

            {FormComponent ? <FormComponent formData={formData} /> : null}
          </div>
        );
      })}
    </div>
  );
};

/**
 * NOTE:
 * Stage 5 review UI should match TractionTransformerForms.js input UI.
 * Hence Stage5Form3..Stage5Form8 below mirror the same table/layout UI but with disabled inputs.
 */

// shared photo renderer (used by new Stage5 generic forms)
const renderPhotos = (photos) => {
  if (!photos || typeof photos !== "object") return null;

  return (
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <div
        className="photo-display-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px",
        }}
      >
        {Object.entries(photos).map(([photoKey, url]) => {
          let fullUrl;
          if (typeof url === "string") {
            if (url.startsWith("data:image/")) {
              fullUrl = url;
            } else if (url.startsWith("http")) {
              fullUrl = url;
            } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
              fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
            } else if (url.startsWith("/")) {
              fullUrl = `${BACKEND_API_BASE_URL}${url}`;
            } else {
              fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
            }
          } else {
            fullUrl = "/placeholder.svg";
          }

          return (
            <div
              key={photoKey}
              className="photo-item"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#f9fafb",
              }}
            >
              <span
                className="photo-label"
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                {photoKey}
              </span>
              <img
                src={fullUrl}
                alt={photoKey}
                className="photo-preview-img"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  cursor: "pointer",
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${fullUrl}`);
                  e.target.src = "/placeholder.svg";
                }}
                onClick={() => window.open(fullUrl, "_blank")}
              />
              <div style={{ marginTop: "8px", textAlign: "center" }}>
                <a
                  href={fullUrl}
                  download={`${photoKey}.jpg`}
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                  }}
                >
                  📥 Download
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Stage 5 Form Components (for review display)
const Stage5Form1 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>Test Record of Erection for Traction Transformer</h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>Make Of Meter</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.makeOfMeter || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Date</strong>
          </td>
          <td>
            <input
              type="date"
              value={formData.date || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Model & S. No.</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.modelSrNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Ambient</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.ambient || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>OTI in ⁰C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.oti || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>WTI in ⁰C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.wti || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Test report reviewed by</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.testReportReviewedBy || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Acceptance of the test</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.acceptanceOfTest || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>TR Sr. No.</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.trSrNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Location</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.location || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Customer</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.customer || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Date</strong>
          </td>
          <td>
            <input
              type="date"
              value={formData.testDate || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Time</strong>
          </td>
          <td>
            <input
              type="time"
              value={formData.testTime || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Amb. Temp ⁰C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.ambTemp || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Make</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.make || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Oil. Temp ⁰C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.oilTemp || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Sr. No</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.srNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Wdg. Temp ⁰C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.wdgTemp || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Voltage Level</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.voltageLevel || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>15 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>600 Sec (MΩ)</th>
          <th>Ratio of IR 60/15</th>
          <th>Ratio of IR 600/60</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>HV-Earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_600sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_ratio60_15 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvEarth_ratio600_60 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV-Earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvEarth_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvEarth_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvEarth_600sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvEarth_ratio60_15 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvEarth_ratio600_60 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>HV-LV</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv_600sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv_ratio60_15 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv_ratio600_60 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form2 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        RATIO TEST
      </h2>
    </div>

    {/* Header with Meter Sr. NO. and TIME */}
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>Meter Sr. NO.: </strong>
        <input
          type="text"
          value={formData.meterSrNo || ""}
          disabled
          className="form-input disabled preview"
          style={{ marginLeft: "10px", padding: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <div>
        <strong>TIME: </strong>
        <input
          type="time"
          value={formData.time || ""}
          disabled
          className="form-input disabled preview"
          style={{ marginLeft: "10px", padding: "5px", border: "1px solid #ccc" }}
        />
      </div>
    </div>

    {/* Main Ratio Test Table */}
    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th>TAP NO</th>
          <th>Applied Voltage in HV</th>
          <th>Measured Voltage in LV</th>
          <th>Calculated Ratio</th>
          <th>Deviation in %</th>
          <th>NAME PLATE RATIO</th>
        </tr>
      </thead>
      <tbody>
        {(formData.ratioTestData || []).map((row, index) => (
          <tr key={index}>
            <td>
              <strong>{row.tapNo || index + 1}</strong>
            </td>
            <td>
              <input
                type="text"
                value={row.appliedVoltageHV || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.measuredVoltageLV || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.calculatedRatio || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.deviationPercent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.namePlateRatio || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form3 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>MAGNETISING CURRENT TEST</h2>
    </div>

     <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th colSpan="3" style={{ textAlign: "center" }}>
            MAGNETISING CURRENT TEST
          </th>
        </tr>
        <tr>
          <th style={{ width: "15%" }}>TAP NO.</th>
          <th>VOLTAGE APPLIED ON PRIMARY/HVSIDE OF POWER TRANSFORMER</th>
          <th>MEASURED CURRENT ON PRIMARY/HV SIDE IN milliamp.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>1</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvTap1_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvTap1_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>2</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvTap3_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvTap3_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>3</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvTap6_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvTap6_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>TAP NO.</th>
          <th>VOLTAGE APPLIED ON SECONDARY/LVSIDE OF POWER TRANSFORMER</th>
          <th>MEASURED CURRENT ON SECONDARY/LV SIDE IN milliamp.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>1</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap1_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap1_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>2</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap2_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap2_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>3</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap3_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap3_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>4</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap4_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap4_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>5</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap5_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap5_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>6</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap6_voltageApplied || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvTap6_measuredCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

// Stage 5 Form 4: TYPE OF TEST – POLARITY TEST (matches TractionTransformerForms.js Stage5Form4 UI)
const Stage5Form4 = ({ formData }) => {
  const DiagramImage = ({ variant }) => {
    const commonTextStyle = { fontFamily: "Arial, sans-serif", fontSize: 12, fill: "#111" };
    const commonLineStyle = { stroke: "#111", strokeWidth: 2, strokeLinecap: "round" };
    const commonThinLineStyle = { stroke: "#111", strokeWidth: 1.5, strokeLinecap: "round" };
    const commonRectStyle = { fill: "#111" };

    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <svg
          viewBox="0 0 240 220"
          width="220"
          height="200"
          role="img"
          aria-label="Polarity test diagram"
          style={{ maxWidth: "220px", width: "100%", height: "auto" }}
        >
          <text x="78" y="36" style={commonTextStyle}>
            1.1
          </text>
          <text x="148" y="36" style={commonTextStyle}>
            2.1
          </text>

          {variant === "condition2" ? (
            <>
              <line x1="60" y1="48" x2="180" y2="48" style={commonLineStyle} />
              <circle cx="90" cy="48" r="4" fill="#111" />
              <circle cx="150" cy="48" r="4" fill="#111" />
            </>
          ) : (
            <>
              <line x1="60" y1="48" x2="105" y2="48" style={commonLineStyle} />
              <line x1="135" y1="48" x2="180" y2="48" style={commonLineStyle} />
              <circle cx="90" cy="48" r="4" fill="#111" />
              <circle cx="150" cy="48" r="4" fill="#111" />
            </>
          )}

          <rect x="82" y="70" width="12" height="78" style={commonRectStyle} />
          <rect x="142" y="70" width="12" height="78" style={commonRectStyle} />

          <line x1="90" y1="48" x2="90" y2="70" style={commonLineStyle} />
          <line x1="150" y1="48" x2="150" y2="70" style={commonLineStyle} />

          <circle cx="90" cy="160" r="4" fill="#111" />
          <circle cx="150" cy="160" r="4" fill="#111" />

          <text x="66" y="196" style={commonTextStyle}>
            1.2
          </text>
          <text x="156" y="196" style={commonTextStyle}>
            2.2
          </text>

          <line x1="48" y1="176" x2="90" y2="176" style={commonThinLineStyle} />
          <line x1="150" y1="176" x2="192" y2="176" style={commonThinLineStyle} />

          <line x1="90" y1="160" x2="90" y2="176" style={commonThinLineStyle} />
          <line x1="150" y1="160" x2="150" y2="176" style={commonThinLineStyle} />
        </svg>
      </div>
    );
  };

  const ConditionBlock = ({ title, rows, equation }) => (
    <table className="form-table" style={{ marginTop: "16px" }}>
      <thead>
        <tr>
          <th colSpan={2} style={{ textAlign: "center" }}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ width: "55%" }}>
            <table className="form-table" style={{ margin: 0 }}>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td style={{ width: "35%" }}>
                      <strong>{r.label} =</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData?.[r.key] || ""}
                        disabled
                        className="form-input disabled preview"
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ paddingTop: "14px" }}>
                    <strong>{equation}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td style={{ width: "45%", verticalAlign: "middle" }}>
            <DiagramImage variant={title === "CONDITION 2" ? "condition2" : "condition1"} />
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="form-container">
      <div className="company-header">
        <h2>TYPE OF TEST – POLARITY TEST</h2>
      </div>

      <ConditionBlock
        title="CONDITION 1"
        rows={[
          { label: "1.1-1.2", key: "cond1_11_12" },
          { label: "2.1-2.2", key: "cond1_21_22" },
          { label: "1.1-2.2", key: "cond1_11_22" },
        ]}
        equation="(1.1-2.2) = (1.1-1.2) + (2.1-2.2)"
      />

      <ConditionBlock
        title="CONDITION 2"
        rows={[
          { label: "1.1-1.2", key: "cond2_11_12" },
          { label: "2.1-2.2", key: "cond2_21_22" },
          { label: "1.1-2.1", key: "cond2_11_21" },
        ]}
        equation="(1.2-2.1) = (1.1-1.2) - (2.1-2.2)"
      />

      {formData.photos ? renderPhotos(formData.photos) : null}
    </div>
  );
};

const Stage5Form5 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TYPE OF TEST – SHORT CIRCUIT TEST</h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "40%" }}>
            <strong>APPLIED VOLTAGE :</strong>
          </td>
          <td style={{ width: "25%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="text" value={formData.appliedVoltage || ""} disabled className="form-input disabled preview" />
              <strong style={{ whiteSpace: "nowrap" }}>VOLTS</strong>
            </div>
          </td>
          <td style={{ width: "17%" }}>
            <strong>DATE:</strong>
          </td>
          <td style={{ width: "18%" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "12%" }}>
            <strong>TIME :</strong>
          </td>
          <td style={{ width: "18%" }}>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <strong>METER MAKE SR. NO.</strong>
          </td>
          <td colSpan={4}>
            <input
              type="text"
              value={formData.meterMakeSrNo || ""}
              disabled
              className="form-input disabled preview"
              style={{ width: "100%" }}
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th style={{ width: "14%" }}>TAP NO.</th>
          <th style={{ width: "28%" }}>VOLTAGE</th>
          <th style={{ width: "29%" }}>HV CURRENT (Amp)</th>
          <th style={{ width: "29%" }}>LV CURRENT (Amp)</th>
        </tr>
      </thead>
      <tbody>
        {((formData.tapReadings && formData.tapReadings.length ? formData.tapReadings : Array(6).fill(null)) || []).map(
          (row, idx) => (
            <tr key={idx}>
              <td style={{ textAlign: "center" }}>
                <strong>{row?.tapNo || idx + 1}</strong>
              </td>
              <td>
                <input type="text" value={row?.voltage || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={row?.hvCurrent || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={row?.lvCurrent || ""} disabled className="form-input disabled preview" />
              </td>
            </tr>
          ),
        )}

        <tr>
          <td style={{ fontWeight: "700", textAlign: "center" }}>Impedance calculation</td>
          <td colSpan={3} style={{ padding: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>%Z =</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Applied Voltage HV</div>
                    <input
                      type="text"
                      value={formData.impedance_appliedVoltageHV || ""}
                      disabled
                      className="form-input disabled preview"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Rated voltage HV</div>
                    <input
                      type="text"
                      value={formData.impedance_ratedVoltageHV || ""}
                      disabled
                      className="form-input disabled preview"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, marginBottom: 8, visibility: "hidden" }}>%Z =</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Rated Current LV</div>
                    <input
                      type="text"
                      value={formData.impedance_ratedCurrentLV || ""}
                      disabled
                      className="form-input disabled preview"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Measured current LV</div>
                    <input
                      type="text"
                      value={formData.impedance_measuredCurrentLV || ""}
                      disabled
                      className="form-input disabled preview"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12, fontWeight: 700 }}>
              %Z = (Applied Voltage HV / Rated voltage HV) × (Rated Current LV / Measured current LV) × 100
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

// Stage 5 Form 6: Winding Resistance Test (matches TractionTransformerForms.js Stage5Form6 UI)
const Stage5Form6 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2 style={{ textDecoration: "underline", textUnderlineOffset: "6px" }}>
        TYPE OF TEST – WINDING RESISTANCE TEST
      </h2>
    </div>

    {/* Top info block (matches TractionTransformerForms.js Stage5Form6 exactly) */}
    <table className="form-table" style={{ marginTop: "10px" }}>
      <tbody>
        <tr>
          <td style={{ width: "35%" }}>
            <strong>METER USED</strong>
          </td>
          <td style={{ width: "35%" }}>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "15%" }}>
            <strong>DATE:</strong>
          </td>
          <td style={{ width: "15%" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "15%" }}>
            <strong>TIME :</strong>
          </td>
          <td style={{ width: "15%" }}>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>METER MAKE SR. NO.</strong>
          </td>
          <td>
            <input type="text" value={formData.meterMakeSrNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>WTI:</strong>
          </td>
          <td>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>OTI:</strong>
          </td>
          <td>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>RANGE</strong>
          </td>
          <td>
            <input type="text" value={formData.range1 || ""} disabled className="form-input disabled preview" />
          </td>
          <td colSpan={2}>
            <strong>AMBIENT:</strong>
            <input
              type="text"
              value={formData.ambient || ""}
              disabled
              className="form-input disabled preview"
              style={{ marginLeft: 10, width: "70%" }}
            />
          </td>
          <td colSpan={2}></td>
        </tr>

        <tr>
          <td>
            <strong>RANGE</strong>
          </td>
          <td colSpan={5}>
            <input
              type="text"
              value={formData.range2 || ""}
              disabled
              className="form-input disabled preview"
              style={{ width: "100%" }}
            />
          </td>
        </tr>
      </tbody>
    </table>

    {/* HV/LV tables: use the same structure and row counts as TractionTransformerForms.js */}
    <div style={{ display: "flex", justifyContent: "space-between", gap: 30, marginTop: 30 }}>
      <div style={{ width: "55%" }}>
        <h3 style={{ textAlign: "center", textDecoration: "underline", textUnderlineOffset: 6 }}>HV SIDE</h3>

        <table className="form-table" style={{ marginTop: 14 }}>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>TAP NO.</th>
              <th>{formData.hvHeader || "2.1 – 2.2 (Ω)"}</th>
            </tr>
          </thead>
          <tbody>
            {((formData.hvTapReadings && formData.hvTapReadings.length ? formData.hvTapReadings : Array(6).fill(null)) || []).map(
              (row, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: "center" }}>
                    <strong>{row?.tapNo || idx + 1}</strong>
                  </td>
                  <td>
                    <input type="text" value={row?.value || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <div style={{ width: "45%" }}>
        <h3 style={{ textAlign: "center", textDecoration: "underline", textUnderlineOffset: 6 }}>LV SIDE</h3>

        <table className="form-table" style={{ marginTop: 14 }}>
          <thead>
            <tr>
              <th>{formData.lvHeader || "1.1 – 1.2 ((Ω)"}</th>
            </tr>
          </thead>
          <tbody>
            {/* TractionTransformerForms.js LV has 2 rows: lvValue and lvValue2 */}
            <tr>
              <td>
                <input type="text" value={formData.lvValue || ""} disabled className="form-input disabled preview" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" value={formData.lvValue2 || ""} disabled className="form-input disabled preview" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form7 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2 style={{ textAlign: "center", fontWeight: 800, marginBottom: 0 }}>TEST REPORT</h2>
      <h3 style={{ textAlign: "center", marginTop: 6, textDecoration: "underline", textUnderlineOffset: 6 }}>
        TAN DELTA AND CAPACITANCE TEST ON BUSHING
      </h3>
    </div>

    {/* Top identification table (exactly like TractionTransformerForms.js Stage5Form7) */}
    <table className="form-table" style={{ marginTop: 10 }}>
      <tbody>
        <tr>
          <td style={{ width: "25%" }}>
            <strong>BUSHING SR. NO. (HV)</strong>
          </td>
          <td style={{ width: "25%" }}>
            <input
              type="text"
              value={formData.bushingSrNoHv || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td style={{ width: "25%" }}>
            <strong></strong>
          </td>
          <td style={{ width: "25%" }}>
            <input
              type="text"
              value={formData.makeHv || ""}
              disabled
              className="form-input disabled preview"
              placeholder="MAKE"
            />
          </td>
        </tr>

        <tr>
          <td>
            <strong>BUSHING SR. NO. (LV)</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.bushingSrNoLv || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong></strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.makeLv || ""}
              disabled
              className="form-input disabled preview"
              placeholder="MAKE"
            />
          </td>
        </tr>

        <tr>
          <td colSpan={4} style={{ height: 22 }}></td>
        </tr>

        <tr>
          <td colSpan={2}>
            <strong>METER USED</strong>
          </td>
          <td>
            <strong>DATE:</strong>
          </td>
          <td>
            <strong>TIME :</strong>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <strong>MODEL & S. NO.</strong>
          </td>
          <td>
            <strong>AMBIENT:</strong>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input
              type="text"
              value={formData.modelAndSrNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input type="text" value={formData.ambient || ""} disabled className="form-input disabled preview" />
          </td>
          <td></td>
        </tr>

        <tr>
          <td colSpan={2}>
            <strong>OTI............................°C</strong>
          </td>
          <td colSpan={2}>
            <strong>WTI............................°C</strong>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
          <td colSpan={2}>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Main measurement table */}
    <table className="form-table" style={{ marginTop: 22 }}>
      <thead>
        <tr>
          <th rowSpan={2} style={{ width: "14%" }}>
            VOLTAGE (KV)
          </th>
          <th rowSpan={2} style={{ width: "18%" }}>
            BUSHING &
            <br />
            SERIAL NO.
          </th>
          <th rowSpan={2} style={{ width: "12%" }}>
            TEST
            <br />
            MODE
          </th>
          <th colSpan={2} style={{ width: "26%" }}>
            CAPACITANCE ( Pf )
          </th>
          <th colSpan={2} style={{ width: "30%" }}>
            TAN DELTA %
          </th>
        </tr>
        <tr>
          <th>FACTORY</th>
          <th>SITE</th>
          <th>FACTORY</th>
          <th>SITE</th>
        </tr>
      </thead>
      <tbody>
        {(formData.rows || []).map((row) => (
          <tr key={row.id}>
            <td>
              <input type="text" value={row.voltageKv || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ fontWeight: 700, textAlign: "center" }}>{row.label}</td>
            <td>
              <input type="text" value={row.testMode || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capFactory || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capSite || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.tdFactory || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.tdSite || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

// Stage 5 Form 8: Tan Delta & IR Values of Transformer (matches TractionTransformerForms.js Stage5Form8 UI)
const Stage5Form8 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2 style={{ textAlign: "center", fontWeight: 800 }}>TAN DELTA AND CAPACITANCE MEASUREMENT OF WINDING</h2>
    </div>

    {/* Header block (as per TractionTransformerForms.js Stage5Form8) */}
    <table className="form-table" style={{ marginTop: 10 }}>
      <tbody>
        <tr>
          <td style={{ width: "45%" }}>
            <strong>METER USED</strong>
          </td>
          <td style={{ width: "27%" }}>
            <strong>DATE:</strong>
          </td>
          <td style={{ width: "28%" }}>
            <strong>TIME :</strong>
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>MODEL & S. NO.</strong>
          </td>
          <td>
            <strong>AMBIENT:</strong>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              value={formData.modelAndSrNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input type="text" value={formData.ambient || ""} disabled className="form-input disabled preview" />
          </td>
          <td></td>
        </tr>

        <tr>
          <td>
            <strong>OTI............................°C</strong>
          </td>
          <td colSpan={2}>
            <strong>WTI............................°C</strong>
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
          <td colSpan={2}>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: 18 }}>
      <thead>
        <tr>
          <th style={{ width: "14%" }}>AT 05 KV IN BETWEEN</th>
          <th style={{ width: "12%" }}>MODE</th>
          <th style={{ width: "16%" }}>TAN DELTA %</th>
          <th style={{ width: "16%" }}>
            CAPACITANCE
            <br />
            (Pf)
          </th>
          <th style={{ width: "20%" }}>
            EXCITATION CURRENT
            <br />
            (A)
          </th>
          <th style={{ width: "22%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.kv5_rows || []).map((r) => (
          <tr key={r.id}>
            <td style={{ fontWeight: 700, textAlign: "center" }}>{r.between}</td>
            <td style={{ fontWeight: 700, textAlign: "center" }}>{r.mode}</td>
            <td>
              <input type="text" value={r.tanDelta || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.capacitance || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.excitationCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.dielectricLoss || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: 18 }}>
      <thead>
        <tr>
          <th style={{ width: "14%" }}>AT 10 KV IN BETWEEN</th>
          <th style={{ width: "12%" }}>MODE</th>
          <th style={{ width: "16%" }}>TAN DELTA %</th>
          <th style={{ width: "16%" }}>
            CAPACITANCE
            <br />
            (Pf)
          </th>
          <th style={{ width: "20%" }}>
            EXCITATION CURRENT
            <br />
            (mA)
          </th>
          <th style={{ width: "22%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.kv10_rows || []).map((r) => (
          <tr key={r.id}>
            <td style={{ fontWeight: 700, textAlign: "center" }}>{r.between}</td>
            <td style={{ fontWeight: 700, textAlign: "center" }}>{r.mode}</td>
            <td>
              <input type="text" value={r.tanDelta || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.capacitance || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.excitationCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.dielectricLoss || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    <div className="company-header" style={{ marginTop: 26 }}>
      <h3 style={{ textAlign: "center", fontWeight: 800, textDecoration: "underline", textUnderlineOffset: 6 }}>
        IR VALUES OF TRANSFORMER
      </h3>
    </div>

    <table className="form-table" style={{ marginTop: 10 }}>
      <tbody>
        <tr>
          <td style={{ width: "25%" }}>
            <strong>Date :</strong>
          </td>
          <td style={{ width: "25%" }}>
            <input type="date" value={formData.ir?.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "25%" }}>
            <strong>Time:</strong>
          </td>
          <td style={{ width: "25%" }}>
            <input type="time" value={formData.ir?.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Amb. Temp :</strong>
          </td>
          <td>
            <input type="text" value={formData.ir?.ambTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Make :</strong>
          </td>
          <td>
            <input type="text" value={formData.ir?.make || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Oil Temp. :</strong>
          </td>
          <td>
            <input type="text" value={formData.ir?.oilTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Sr. No. :</strong>
          </td>
          <td>
            <input type="text" value={formData.ir?.srNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Wdg. Temp. :</strong>
          </td>
          <td>
            <input type="text" value={formData.ir?.wdgTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Range :</strong>
          </td>
          <td>
            <input type="text" value={formData.ir?.range || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Relative Humidity :</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.ir?.relativeHumidity || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Voltage Level :</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.ir?.voltageLevel || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: 14 }}>
      <thead>
        <tr>
          <th style={{ width: "20%" }}></th>
          <th style={{ width: "14%" }}>
            15 Sec
            <br />
            (MΩ)
          </th>
          <th style={{ width: "14%" }}>
            60 Sec
            <br />
            (MΩ)
          </th>
          <th style={{ width: "14%" }}>
            600 Sec
            <br />
            (MΩ)
          </th>
          <th style={{ width: "19%" }}>
            Ratio of IR 60
            <br />
            IR 15
          </th>
          <th style={{ width: "19%" }}>
            Ratio of IR 600
            <br />
            IR 60
          </th>
        </tr>
      </thead>
      <tbody>
        {(formData.ir?.rows || []).map((r) => (
          <tr key={r.id}>
            <td style={{ fontWeight: 700 }}>{r.label}</td>
            <td>
              <input type="text" value={r.sec15 || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.sec60 || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.sec600 || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.ratio60_15 || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={r.ratio600_60 || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

// Stage 5 Review Renderer Component
const Stage5ReviewRenderer = ({ formDataFromDB, formatLabel }) => {
  const stage5Forms = [
    { id: "stage5-form1", title: "Magnetizing Current Test", component: Stage5Form1 },
    { id: "stage5-form2", title: "Polarity Test", component: Stage5Form2 },
    { id: "stage5-form3", title: "MAGNETISING CURRENT TEST", component: Stage5Form3 },
    { id: "stage5-form4", title: "Type of Test - Polarity Test", component: Stage5Form4 },
    { id: "stage5-form5", title: "IR Values of Transformer (Form 5)", component: Stage5Form5 },
    { id: "stage5-form6", title: "IR Values of Transformer (Form 6)", component: Stage5Form6 },
    { id: "stage5-form7", title: "IR Values of Transformer (Form 7)", component: Stage5Form7 },
    { id: "stage5-form8", title: "IR Values of Transformer (Form 8)", component: Stage5Form8 }
  ];

  const renderPhotos = (photos, formKey) => {
    if (!photos || typeof photos !== "object") return null;

    return (
      <div key={`${formKey}-photos`} className="form-group-preview photo-group" style={{ width: "100%" }}>
        <label className="form-label-preview">
          📸 Photos
        </label>
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === 'string') {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div key={photoKey} className="photo-item" style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#f9fafb"
              }}>
                <span className="photo-label" style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  textAlign: "center"
                }}>
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer"
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, '_blank');
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem"
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFormField = (field, value, formKey) => {
    if (field.type === "nested-object" && typeof value === "object" && value !== null) {
      return (
        <div key={`${formKey}-${field.name}`} className="form-group-preview nested-object-group">
          <label className="form-label-preview">
            📋 {formatLabel(field.label)}
          </label>
          <div className="nested-object-display" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px",
            marginTop: "10px",
          }}>
            {Object.entries(value).map(([nestedKey, nestedValue]) => (
              <div key={`${field.name}-${nestedKey}`} className="nested-item" style={{
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
              }}>
                <h5 style={{
                  margin: "0 0 10px 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}>
                  {formatLabel(field.label)} - {nestedKey}
                </h5>
                {typeof nestedValue === "object" && nestedValue !== null ? (
                  <div className="nested-fields-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                  }}>
                    {Object.entries(nestedValue).map(([subKey, subValue]) => (
                      <div key={`${nestedKey}-${subKey}`} className="nested-field">
                        <label className="nested-field-label" style={{
                          fontSize: "0.8rem",
                          color: "#6b7280",
                          fontWeight: "500",
                        }}>
                          {formatLabel(subKey)}:
                        </label>
                        <div className="nested-field-value">
                          <input
                            type="text"
                            value={subValue || ""}
                            disabled
                            className="form-input disabled preview"
                            style={{
                              fontSize: "0.85rem",
                              padding: "6px 8px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="form-input-display">
                    <input
                      type="text"
                      value={nestedValue || ""}
                      disabled
                      className="form-input disabled preview"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={`${formKey}-${field.name}`} className="form-group-preview">
          <label className="form-label-preview">
            {formatLabel(field.label)}
          </label>
          <div className="form-input-display">
            <textarea
              value={value || ""}
              disabled
              className="form-input disabled preview"
              rows="4"
              style={{ resize: "vertical" }}
            />
          </div>
        </div>
      );
    }

    return (
      <div key={`${formKey}-${field.name}`} className="form-group-preview">
        <label className="form-label-preview">
          {formatLabel(field.label)}
        </label>
        <div className="form-input-display">
          <input
            type={field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
            value={value || ""}
            disabled
            className="form-input disabled preview"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="stage5-review-container">
      {stage5Forms.map((form, formIndex) => {
        const formData = formDataFromDB?.[`form${formIndex + 1}`] || {};
        const FormComponent = form.component;

        return (
          <div
            key={form.id}
            className="form-review-card"
            style={{
              marginBottom: "30px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="company-header"
              style={{
                textAlign: "center",
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.25rem" }}>
                {form.title}
              </h2>
            </div>

            {FormComponent ? <FormComponent formData={formData} /> : null}

            {formData.photos && renderPhotos(formData.photos)}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Stage 3 (Traction) has ONLY ONE form in TractionTransformerForms.js:
 * Stage3Form1 (Vacuum cycle + IR + Pressure test).
 * The previous Stage3ReviewRenderer incorrectly rendered oil-filtration forms (belongs to Stage 4).
 */
const Stage3ReviewRenderer = ({ formDataFromDB }) => {
  const formData = formDataFromDB?.form1 || {};

  return (
    <div className="stage3-review-container">
      <div
        className="form-review-card"
        style={{
          marginBottom: "30px",
          border: "2px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px",
          background: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="company-header"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.25rem" }}>
            Vacuum Cycle Recording (Stage 3 - Form 1)
          </h2>
        </div>

        <Stage3Form1 formData={formData} />
      </div>
    </div>
  );
};

/**
 * Stage 2 Review Renderer Component
 *
 * Defensive against backend sending extra keys (or different ordering):
 * - If backend returns { stage2form1: {...}, stage2form2: {...} } render those directly.
 * - Else fallback to legacy { form1: {...}, form2: {...} }.
 */
const Stage2ReviewRenderer = ({ formDataFromDB }) => {
  const stage2Forms = [
    { id: "stage2-form1", title: "Record of Oil Handling", component: Stage2Form1, legacyKey: "form1", namedKey: "stage2form1" },
    { id: "stage2-form2", title: "IR After Erection", component: Stage2Form2, legacyKey: "form2", namedKey: "stage2form2" },
  ];

  return (
    <div className="stage2-review-container">
      {stage2Forms.map((form) => {
        const formData =
          formDataFromDB?.[form.namedKey] ??
          formDataFromDB?.[form.legacyKey] ??
          {};
        const FormComponent = form.component;

        return (
          <div
            key={form.id}
            className="form-review-card"
            style={{
              marginBottom: "30px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="company-header"
              style={{
                textAlign: "center",
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.25rem" }}>{form.title}</h2>
            </div>

            {FormComponent ? <FormComponent formData={formData} /> : null}
          </div>
        );
      })}
    </div>
  );
};

// Stage 1 Review Renderer Component
const Stage1ReviewRenderer = ({ formDataFromDB, formatLabel }) => {
  const stage1Forms = [
    {
      id: "name-plate-details",
      title: "Name Plate Details Transformer",
      fields: [
        { name: "make", label: "MAKE", type: "text" },
        { name: "currentHV", label: "CURRENT HV (A)", type: "text" },
        { name: "srNo", label: "SR. NO.", type: "text" },
        { name: "currentLV", label: "LV (A)", type: "text" },
        { name: "mvaRating", label: "MVA Rating", type: "text" },
        { name: "tempRiseOil", label: "Temp. Rise over amb. In Oil °C", type: "text" },
        { name: "hvKv", label: "HV (KV)", type: "text" },
        { name: "winding", label: "Winding", type: "text" },
        { name: "lvKv", label: "LV (KV)", type: "text" },
        { name: "transportingWeight", label: "Transporting weight", type: "text" },
        { name: "impedancePercent", label: "% Impedance", type: "text" },
        { name: "noOfRadiators", label: "No. Of radiators", type: "text" },
        { name: "yearOfMfg", label: "Year of Mfg.", type: "text" },
        { name: "weightCoreWinding", label: "Weight of Core & Winding.", type: "text" },
        { name: "oilQuantityLiter", label: "Oil Quantity in liter", type: "text" },
        { name: "totalWeight", label: "Total Weight", type: "text" }
      ]
    },
    {
      id: "protocol-accessories-checking",
      title: "Protocol for Accessories Checking",
      fields: [
        { name: "accessories", label: "Accessories", type: "nested-object" }
      ]
    },
    {
      id: "core-insulation-check",
      title: "Core Insulation Check",
      fields: [
        { name: "betweenCoreFrame", label: "Between Core – frame", type: "text" },
        { name: "betweenCoreFrameRemarks", label: "Remarks", type: "text" },
        { name: "betweenFrameTank", label: "Between Frame – tank", type: "text" },
        { name: "betweenFrameTankRemarks", label: "Remarks", type: "text" },
        { name: "betweenCoreTank", label: "Between core – tank", type: "text" },
        { name: "betweenCoreTankRemarks", label: "Remarks", type: "text" },
        { name: "filterMachine", label: "Whether the Filter Machine is Available", type: "select" },
        { name: "filterCapacity", label: "Capacity of Filter Machine", type: "text" },
        { name: "vacuumPumpCapacity", label: "Capacity of the Vacuum Pump to be used.", type: "text" },
        { name: "reservoirAvailable", label: "Whether the Reservoir is Available with valves and a breather.", type: "select" },
        { name: "reservoirCapacity", label: "Capacity of Reservoirs.", type: "text" },
        { name: "hosePipes", label: "Hose Pipes for the Filtration Process.", type: "select" },
        { name: "craneAvailable", label: "Whether Crane is Available in good condition", type: "select" },
        { name: "fireExtinguisher", label: "Fire extinguisher/ Fire sand bucket", type: "select" },
        { name: "firstAidKit", label: "First aid kit", type: "select" },
        { name: "ppeEquipment", label: "PPE for the working team of ETC agency, like- Safety shoes, Helmet, etc...", type: "select" }
      ]
    },
    {
      id: "pre-erection-ratio-test-turret-cts",
      title: "Pre erection Ratio test of turret CTs",
      fields: [
        { name: "phase31_20percent_appliedCurrent_s1s2", label: "Phase 1.1 - 20% Applied Current S1-S2", type: "text" },
        { name: "phase31_20percent_appliedCurrent_s1s3", label: "Phase 1.1 - 20% Applied Current S1-S3", type: "text" },
        { name: "phase31_20percent_measuredCurrent_s1s2", label: "Phase 1.1 - 20% Measured Current S1-S2", type: "text" },
        { name: "phase31_20percent_measuredCurrent_s1s3", label: "Phase 1.1 - 20% Measured Current S1-S3", type: "text" }
      ]
    },
    {
      id: "pre-erection-ratio-test-phase2",
      title: "Pre erection Ratio test of turret CTs - Phase 2",
      fields: [
        { name: "phase31_20percent_appliedCurrent_s1s2", label: "Phase 2.1 - 20% Applied Current S1-S2", type: "text" },
        { name: "phase31_20percent_appliedCurrent_s1s3", label: "Phase 2.1 - 20% Applied Current S1-S3", type: "text" },
        { name: "phase31_20percent_measuredCurrent_s1s2", label: "Phase 2.1 - 20% Measured Current S1-S2", type: "text" },
        { name: "phase31_20percent_measuredCurrent_s1s3", label: "Phase 2.1 - 20% Measured Current S1-S3", type: "text" }
      ]
    },
    {
      id: "tan-delta-capacitance-test-bushing",
      title: "TAN DELTA AND CAPACITANCE TEST ON BUSHING",
      fields: [
        { name: "meterUsed", label: "METER USED", type: "text" },
        { name: "date", label: "DATE", type: "date" },
        { name: "time", label: "TIME", type: "time" },
        { name: "modelSrNo", label: "MODEL & S. NO.", type: "text" },
        { name: "wti", label: "WTI", type: "text" },
        { name: "oti", label: "OTI", type: "text" },
        { name: "hvBushing11_srNo", label: "HV Bushing 1.1 Sr. No.", type: "text" },
        { name: "hvBushing12_srNo", label: "HV Bushing 1.2 Sr. No.", type: "text" },
        { name: "lvBushing21_srNo", label: "LV Bushing 2.1 Sr. No.", type: "text" },
        { name: "lvBushing22_srNo", label: "LV Bushing 2.2 Sr. No.", type: "text" }
      ]
    },
    {
      id: "record-of-measurement-of-ir-values-before-erection",
      title: "RECORD OF MEASUREMENT OF IR VALUES (Before Erection)",
      fields: [
        { name: "date", label: "Date", type: "date" },
        { name: "time", label: "Time", type: "time" },
        { name: "ambTemp", label: "Amb Temp", type: "text" },
        { name: "make", label: "Make", type: "text" },
        { name: "oilTemp", label: "Oil Temp", type: "text" },
        { name: "srNo", label: "Sr No", type: "text" },
        { name: "wdgTemp", label: "Wdg Temp", type: "text" },
        { name: "range", label: "Range", type: "text" },
        { name: "relativeHumidity", label: "Relative Humidity", type: "text" },
        { name: "voltageLevel", label: "Voltage Level", type: "text" },
        { name: "insulationTesterDetails", label: "Details of Insulation tester", type: "textarea" },

        { name: "hvEarth_10sec", label: "HV-Earth 10 Sec", type: "text" },
        { name: "hvEarth_60sec", label: "HV-Earth 60 Sec", type: "text" },
        { name: "hvEarth_ratio", label: "HV-Earth Ratio of IR 60/IR 10", type: "text" },

        { name: "lv1Earth_10sec", label: "LV1-Earth 10 Sec", type: "text" },
        { name: "lv1Earth_60sec", label: "LV1-Earth 60 Sec", type: "text" },
        { name: "lv1Earth_ratio", label: "LV1-Earth Ratio of IR 60/IR 10", type: "text" },

        { name: "lv2Earth_10sec", label: "LV2-Earth 10 Sec", type: "text" },
        { name: "lv2Earth_60sec", label: "LV2-Earth 60 Sec", type: "text" },
        { name: "lv2Earth_ratio", label: "LV2-Earth Ratio of IR 60/IR 10", type: "text" },

        { name: "hvLv1_10sec", label: "HV-LV1 10 Sec", type: "text" },
        { name: "hvLv1_60sec", label: "HV-LV1 60 Sec", type: "text" },
        { name: "hvLv1_ratio", label: "HV-LV1 Ratio of IR 60/IR 10", type: "text" },

        { name: "hvLv2_10sec", label: "HV-LV2 10 Sec", type: "text" },
        { name: "hvLv2_60sec", label: "HV-LV2 60 Sec", type: "text" },
        { name: "hvLv2_ratio", label: "HV-LV2 Ratio of IR 60/IR 10", type: "text" },

        { name: "lv1Lv2_10sec", label: "LV1-LV2 10 Sec", type: "text" },
        { name: "lv1Lv2_60sec", label: "LV1-LV2 60 Sec", type: "text" },
        { name: "lv1Lv2_ratio", label: "LV1-LV2 Ratio of IR 60/IR 10", type: "text" },
      ],
    }
  ];

  const renderFormField = (field, value, formKey) => {
    if (field.type === "nested-object" && typeof value === "object" && value !== null) {
      return (
        <div key={`${formKey}-${field.name}`} className="form-group-preview nested-object-group">
          <label className="form-label-preview">
            📋 {formatLabel(field.label)}
          </label>
          <div className="nested-object-display" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px",
            marginTop: "10px",
          }}>
            {Object.entries(value).map(([nestedKey, nestedValue]) => (
              <div key={`${field.name}-${nestedKey}`} className="nested-item" style={{
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
              }}>
                <h5 style={{
                  margin: "0 0 10px 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}>
                  {formatLabel(field.label)} - {nestedKey}
                </h5>
                {typeof nestedValue === "object" && nestedValue !== null ? (
                  <div className="nested-fields-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                  }}>
                    {Object.entries(nestedValue).map(([subKey, subValue]) => (
                      <div key={`${nestedKey}-${subKey}`} className="nested-field">
                        <label className="nested-field-label" style={{
                          fontSize: "0.8rem",
                          color: "#6b7280",
                          fontWeight: "500",
                        }}>
                          {formatLabel(subKey)}:
                        </label>
                        <div className="nested-field-value">
                          <input
                            type="text"
                            value={subValue || ""}
                            disabled
                            className="form-input disabled preview"
                            style={{
                              fontSize: "0.85rem",
                              padding: "6px 8px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="form-input-display">
                    <input
                      type="text"
                      value={nestedValue || ""}
                      disabled
                      className="form-input disabled preview"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={`${formKey}-${field.name}`} className="form-group-preview">
        <label className="form-label-preview">
          {formatLabel(field.label)}
        </label>
        <div className="form-input-display">
          <input
            type={field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
            value={value || ""}
            disabled
            className="form-input disabled preview"
          />
        </div>
      </div>
    );
  };

  const renderPhotos = (photos, formKey) => {
    if (!photos || typeof photos !== "object") return null;

    return (
      <div key={`${formKey}-photos`} className="form-group-preview photo-group" style={{ width: "100%" }}>
        <label className="form-label-preview">
          📸 Photos
        </label>
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === 'string') {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div key={photoKey} className="photo-item" style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#f9fafb"
              }}>
                <span className="photo-label" style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  textAlign: "center"
                }}>
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer"
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, '_blank');
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem"
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="stage1-review-container">
      {stage1Forms.map((form, formIndex) => {
        const formData = formDataFromDB[`form${formIndex + 1}`] || {};
        
        return (
          <div key={form.id} className="form-review-card" style={{
            marginBottom: "30px",
            border: "2px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            background: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}>
            <div className="company-header" style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0"
            }}>
              <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.25rem" }}>
                {form.title}
              </h2>
            </div>

            {/* Use the organized form components */}
            {form.id === "name-plate-details" ? (
              <Stage1Form1 formData={formData} />
            ) : form.id === "protocol-accessories-checking" ? (
              <Stage1Form2 formData={formData} />
            ) : form.id === "core-insulation-check" ? (
              <Stage1Form3 formData={formData} />
            ) : form.id === "pre-erection-ratio-test-turret-cts" ? (
              <Stage1Form4 formData={formData} />
            ) : form.id === "pre-erection-ratio-test-phase2" ? (
              <Stage1Form5 formData={formData} />
            ) : form.id === "tan-delta-capacitance-test-bushing" ? (
              <Stage1Form7 formData={formData} />
            ) : form.id === "record-of-measurement-of-ir-values-before-erection" ? (
              <Stage1Form8 formData={formData} />
            ) : (
              <div className="form-grid-preview" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}>
                {form.fields.map((field) => 
                  renderFormField(field, formData[field.name], form.id)
                )}
              </div>
            )}

            {/* Render photos if they exist */}
            {formData.photos && renderPhotos(formData.photos, form.id)}
          </div>
        );
      })}
    </div>
  );
};

/* Stage 6 Form Component (for review display) */
const Stage6Form1 = ({ formData }) => (
  <div
    className="form-container"
    style={{
      background: "white",
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto",
    }}
  >
    {/* Header with logo and certifications */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        borderBottom: "3px solid #C41E3A",
        paddingBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#C41E3A" }}
        >
          
        </div>
        <div>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}
          >
            
             <img src="/logo.png" alt="Vishvas Power" className="logo" />
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              color: "#666",
              letterSpacing: "2px",
            }}
          >
          
          </div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>
            (A unit of M/s Vishvas Power Engineering Services Pvt Ltd)
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
           
            color: "white",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
          }}
        >
          <div>
             <div
            style={{ fontSize: "1.5rem", fontWeight: "bold",  color: "#333" }}
          >
            
             <img src="/stamp.png" alt="Vishvas Power" className="logo" />
          </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            marginBottom: "5px",
            fontSize: "0.8rem",
          }}
        >
          ISO CERTIFIED
        </div>
        <div style={{ fontSize: "0.7rem", color: "#333" }}>
          • 9001 Certified
          <br />• 14001 Certified
          <br />• 45001 Certified
        </div>
      </div>
    </div>

    {/* Red banner */}
    <div
      style={{
        background: "linear-gradient(135deg, #C41E3A, #8B0000)",
        color: "white",
        padding: "10px 20px",
        marginBottom: "30px",
        clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
      }}
    >
      <div style={{ fontSize: "1.1rem", fontWeight: "600" }}>
        Transformers upto 220 kV 250 MVA
      </div>
    </div>

    <div>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            textDecoration: "underline",
            margin: "0 0 10px 0",
          }}
        >
          Work completion report
        </h1>
        <div style={{ textAlign: "right", fontSize: "1rem" }}>
          <strong>Date:-</strong>
          <input
            type="date"
            value={formData.completionDate || ""}
            disabled
            style={{
              marginLeft: "10px",
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          Project Information
        </h3>

        <div style={{ marginBottom: "15px" }}>
          <strong>Customer Name: </strong>
          <input
            type="text"
            value={formData.customerName || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              width: "300px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Order Number: </strong>
          <input
            type="text"
            value={formData.orderNumber || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              width: "300px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Location: </strong>
          <input
            type="text"
            value={formData.location || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              width: "200px",
            }}
          />
          <strong style={{ marginLeft: "20px" }}>SP/SSP</strong>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          Transformer Details
        </h3>

        <div style={{ marginBottom: "10px" }}>
          <strong>Type: – auto Transformer</strong>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Capacity: </strong>
          <input
            type="text"
            value={formData.capacity || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              width: "100px",
            }}
          />
          <strong>MVA</strong>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Voltage Rating: </strong>
          <input
            type="text"
            value={formData.voltageRating || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              width: "100px",
            }}
          />
          <strong>kV</strong>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Make: </strong>
          <input
            type="text"
            value={formData.make || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              width: "200px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Serial Number: </strong>
          <input
            type="text"
            value={formData.serialNumber || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              width: "200px",
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "15px",
            textDecoration: "underline",
          }}
        >
          Subject:{" "}
          <em>
            Completion of Transformer Erection, Testing and Commissioning Work
          </em>
        </h3>

        <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
          This is to certify that the erection, Testing and commissioning of
          the above-mentioned transformer has been completed in accordance
          with the terms and conditions of the referenced order.
        </p>

        <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
          The installation work has been jointly inspected and found
          satisfactory by the undersigned representatives. The transformer was
          successfully charged/commissioned on no-load at
          <input
            type="time"
            value={formData.chargingDate || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              margin: "0 5px",
            }}
          />
          hrs on
          <input
            type="date"
            value={formData.commissioningDate || ""}
            disabled
            style={{
              border: "none",
              borderBottom: "1px solid #333",
              background: "transparent",
              margin: "0 5px",
            }}
          />
          (date).
        </p>

        <p style={{ lineHeight: "1.6", marginBottom: "30px" }}>
          All works under the scope of the order has been completed.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
        }}
      >
        <div style={{ width: "45%" }}>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            For VPES, Nagpur
          </h4>

          <div style={{ marginBottom: "15px" }}>
            <strong>Name: </strong>
            <input
              type="text"
              value={formData.signatures?.vpesName || ""}
              disabled
              style={{
                border: "none",
                borderBottom: "1px solid #333",
                background: "transparent",
                width: "150px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Designation: </strong>
            <input
              type="text"
              value={formData.signatures?.vpesDesignation || ""}
              disabled
              style={{
                border: "none",
                borderBottom: "1px solid #333",
                background: "transparent",
                width: "120px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Signature: </strong>
            {formData.signatures?.vpesSignature && (
              <img 
                src={formData.signatures.vpesSignature} 
                alt="VPES Signature" 
                style={{ maxWidth: "200px", maxHeight: "100px", border: "1px solid #ccc", marginTop: "5px", display: "block" }}
              />
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Date: </strong>
            <input
              type="date"
              value={formData.signatures?.vpesDate || ""}
              disabled
              style={{
                border: "none",
                borderBottom: "1px solid #333",
                background: "transparent",
                width: "150px",
              }}
            />
          </div>
        </div>

        <div style={{ width: "45%" }}>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            For Customer
          </h4>

          <div style={{ marginBottom: "15px" }}>
            <strong>Name: </strong>
            <input
              type="text"
              value={formData.signatures?.customerName || ""}
              disabled
              style={{
                border: "none",
                borderBottom: "1px solid #333",
                background: "transparent",
                width: "150px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Designation: </strong>
            <input
              type="text"
              value={formData.signatures?.customerDesignation || ""}
              disabled
              style={{
                border: "none",
                borderBottom: "1px solid #333",
                background: "transparent",
                width: "120px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Signature: </strong>
            {formData.signatures?.customerSignature && (
              <img 
                src={formData.signatures.customerSignature} 
                alt="Customer Signature" 
                style={{ maxWidth: "200px", maxHeight: "100px", border: "1px solid #ccc", marginTop: "5px", display: "block" }}
              />
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Date: </strong>
            <input
              type="date"
              value={formData.signatures?.customerDate || ""}
              disabled
              style={{
                border: "none",
                borderBottom: "1px solid #333",
                background: "transparent",
                width: "150px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Stage 6 Review Renderer Component
const Stage6ReviewRenderer = ({ formDataFromDB, formatLabel }) => {
  const stage6Forms = [
    {
      id: "work-completion-report",
      title: "Work Completion Report",
      fields: [
        { name: "customerName", label: "Customer Name", type: "text" },
        { name: "orderNumber", label: "Order Number", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "type", label: "Type", type: "text" },
        { name: "capacity", label: "Capacity", type: "text" },
        { name: "voltageRating", label: "Voltage Rating", type: "text" },
        { name: "make", label: "Make", type: "text" },
        { name: "serialNumber", label: "Serial Number", type: "text" },
        { name: "completionDate", label: "Completion Date", type: "date" },
        { name: "chargingDate", label: "Charging Date", type: "time" },
        { name: "commissioningDate", label: "Commissioning Date", type: "date" },
        { name: "signatures", label: "Signatures", type: "nested-object" }
      ]
    }
  ];

  const renderPhotos = (photos, formKey) => {
    if (!photos || typeof photos !== "object") return null;

    return (
      <div key={`${formKey}-photos`} className="form-group-preview photo-group" style={{ width: "100%" }}>
        <label className="form-label-preview">
          📸 Photos
        </label>
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(photos).map(([photoKey, url]) => {
            let fullUrl;
            if (typeof url === 'string') {
              if (url.startsWith("data:image/")) {
                fullUrl = url;
              } else if (url.startsWith("http")) {
                fullUrl = url;
              } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
              } else if (url.startsWith("/")) {
                fullUrl = `${BACKEND_API_BASE_URL}${url}`;
              } else {
                fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
              }
            } else {
              fullUrl = "/placeholder.svg";
            }

            return (
              <div key={photoKey} className="photo-item" style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#f9fafb"
              }}>
                <span className="photo-label" style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                  textAlign: "center"
                }}>
                  {photoKey}
                </span>
                <img
                  src={fullUrl}
                  alt={photoKey}
                  className="photo-preview-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    cursor: "pointer"
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${fullUrl}`);
                    e.target.src = "/placeholder.svg";
                  }}
                  onClick={() => {
                    window.open(fullUrl, '_blank');
                  }}
                />
                <div style={{ marginTop: "8px", textAlign: "center" }}>
                  <a
                    href={fullUrl}
                    download={`${photoKey}.jpg`}
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem"
                    }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="stage6-review-container">
      {stage6Forms.map((form, formIndex) => {
        const formData = formDataFromDB[`form${formIndex + 1}`] || {};
        
        return (
          <div key={form.id} className="form-review-card" style={{
            marginBottom: "30px",
            border: "2px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            background: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}>
            <div className="company-header" style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0"
            }}>
              <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.25rem" }}>
                {form.title}
              </h2>
            </div>

            {/* Use the organized form component */}
            <Stage6Form1 formData={formData} />

            {/* Render photos if they exist */}
            {formData.photos && renderPhotos(formData.photos, form.id)}
          </div>
        );
      })}
    </div>
  );
};

const VConnected63MVATransformerStageReviewPanel = ({
  currentStageReview,
  selectedProjectForReview,
  currentStageForms,
  formDataFromDB,
  getStageStatus,
  formatLabel,
  handleApproveStage,
  handleRejectStage,
  onBackToCompanies
}) => {
  const renderStageSpecificUI = () => {
    switch(currentStageReview) {
      case 1:
        return (
          <Stage1ReviewRenderer
            formDataFromDB={formDataFromDB}
            formatLabel={formatLabel}
            // Stage 1 renderer previously used fixed indices (form1..formN).
            // This makes it brittle if backend stores additional keys or different ordering.
            // Passing currentStageReview allows renderer to detect and ignore non-stage1 forms.
            currentStageReview={currentStageReview}
          />
        );
      case 2:
        return (
          <Stage2ReviewRenderer
            formDataFromDB={formDataFromDB}
            formatLabel={formatLabel}
            currentStageReview={currentStageReview}
          />
        );
      case 3:
        return <Stage3ReviewRenderer 
          formDataFromDB={formDataFromDB} 
          formatLabel={formatLabel}
        />;
      case 4:
        return <Stage4ReviewRenderer 
          formDataFromDB={formDataFromDB} 
          formatLabel={formatLabel}
        />;
      case 5:
        return <Stage5ReviewRenderer 
          formDataFromDB={formDataFromDB} 
          formatLabel={formatLabel}
        />;
      case 6:
        return <Stage6ReviewRenderer 
          formDataFromDB={formDataFromDB} 
          formatLabel={formatLabel}
        />;
      default:
        // Fallback to generic rendering for other stages
        return renderGenericFormReview();
    }
  };

  const renderGenericFormReview = () => {
    return (
      <>
        <div className="stage-review-summary">
          <div className="stage-info-card">
            <h3>Stage {currentStageReview} Information</h3>
            <p>
              <strong>Project:</strong> {selectedProjectForReview?.name}
            </p>
            <p>
              <strong>Total Forms:</strong> {currentStageForms.length}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {getStageStatus(selectedProjectForReview, currentStageReview)}
            </p>
          </div>
        </div>

        <div className="forms-review-grid">
          {Object.entries(formDataFromDB).map(([formKey, formData]) => (
            <div
              key={`${1}-${formKey}`}
              className={`form-review-card ${selectedProjectForReview?.status}`}
            >
              <div className="form-review-header">
                <h3>{formKey.replace("form", "Form ")}</h3>
                <span
                  className={`status-badge ${
                    selectedProjectForReview?.status === "approved"
                      ? "status-completed"
                      : selectedProjectForReview?.status === "rejected"
                      ? "status-pending"
                      : "status-progress"
                  }`}
                >
                  {selectedProjectForReview?.status === "approved" &&
                    "✅ Approved"}
                  {selectedProjectForReview?.status === "rejected" &&
                    "❌ Rejected"}
                  {selectedProjectForReview?.status === "pending-review" &&
                    "⏳ Pending Review"}
                </span>
              </div>

              <div className="form-layout-preview">
                <div
                  className="form-grid-preview"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "20px",
                  }}
                >
                  {Object.entries(formData).map(
                    ([fieldKey, fieldValue]) => {
                      // Handle photos specially
                      if (
                        fieldKey === "photos" &&
                        fieldValue &&
                        typeof fieldValue === "object"
                      ) {
                        return (
                          <div
                            key={`photos-${fieldKey}`}
                            className="form-group-preview photo-group"
                            style={{
                              width: "100%",
                            }}
                          >
                            <label className="form-label-preview">
                              📸{" "}
                              {fieldKey.charAt(0).toUpperCase() +
                                fieldKey.slice(1)}
                            </label>
                            <div className="photo-display-grid" style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                              gap: "15px",
                              marginTop: "10px"
                            }}>
                              {Object.entries(fieldValue).map(
                                ([photoKey, url]) => {
                                  // Handle different URL formats
                                  let fullUrl;
                                  if (typeof url === 'string') {
                                    if (url.startsWith("data:image/")) {
                                      // Base64 image
                                      fullUrl = url;
                                    } else if (url.startsWith("http")) {
                                      // Full URL (already complete)
                                      fullUrl = url;
                                    } else if (url.includes("cloudinary.com") || url.startsWith("v1")) {
                                      // Cloudinary image path - use BACKEND_IMG_API_BASE_URL
                                      fullUrl = `${BACKEND_IMG_API_BASE_URL}${url}`;
                                    } else if (url.startsWith("/")) {
                                      // Absolute path for local files
                                      fullUrl = `${BACKEND_API_BASE_URL}${url}`;
                                    } else {
                                      // Relative path for local files
                                      fullUrl = `${BACKEND_API_BASE_URL}/${url}`;
                                    }
                                  } else {
                                    fullUrl = "/placeholder.svg";
                                  }

                                  return (
                                    <div
                                      key={photoKey}
                                      className="photo-item"
                                      style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        backgroundColor: "#f9fafb"
                                      }}
                                    >
                                      <span className="photo-label" style={{
                                        display: "block",
                                        fontSize: "0.85rem",
                                        fontWeight: "600",
                                        color: "#374151",
                                        marginBottom: "8px",
                                        textAlign: "center"
                                      }}>
                                        {photoKey}
                                      </span>
                                      <img
                                        src={fullUrl}
                                        alt={photoKey}
                                        className="photo-preview-img"
                                        style={{
                                          width: "100%",
                                          height: "150px",
                                          objectFit: "cover",
                                          borderRadius: "6px",
                                          border: "1px solid #d1d5db",
                                          cursor: "pointer"
                                        }}
                                        onError={(e) => {
                                          console.error(`Failed to load image: ${fullUrl}`);
                                          e.target.src = "/placeholder.svg";
                                        }}
                                        onClick={() => {
                                          // Open image in new tab for better viewing
                                          window.open(fullUrl, '_blank');
                                        }}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        );
                      }

                      // Handle strings & numbers with form input styling
                      if (
                        typeof fieldValue === "string" ||
                        typeof fieldValue === "number"
                      ) {
                        return (
                          <div
                            key={`field-${fieldKey}`}
                            className="form-group-preview"
                          >
                            <label className="form-label-preview">
                              {formatLabel(fieldKey)}
                            </label>
                            <div className="form-input-display">
                              <input
                                type="text"
                                value={fieldValue}
                                disabled
                                className="form-input disabled preview"
                              />
                            </div>
                          </div>
                        );
                      }

                      // Handle nested objects (like accessories)
                      if (
                        typeof fieldValue === "object" &&
                        fieldValue !== null &&
                        !Array.isArray(fieldValue) &&
                        fieldKey !== "photos"
                      ) {
                        return (
                          <div
                            key={`nested-${fieldKey}`}
                            className="form-group-preview nested-object-group"
                          >
                            <label className="form-label-preview">
                              📋 {formatLabel(fieldKey)}
                            </label>
                            <div
                              className="nested-object-display"
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "15px",
                                marginTop: "10px",
                              }}
                            >
                              {Object.entries(fieldValue).map(
                                ([nestedKey, nestedValue]) => (
                                  <div
                                    key={`${fieldKey}-${nestedKey}`}
                                    className="nested-item"
                                    style={{
                                      padding: "12px",
                                      border: "1px solid #e5e7eb",
                                      borderRadius: "8px",
                                      backgroundColor: "#f9fafb",
                                    }}
                                  >
                                    <h5
                                      style={{
                                        margin: "0 0 10px 0",
                                        color: "#374151",
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {formatLabel(fieldKey)} - {nestedKey}
                                    </h5>
                                    {typeof nestedValue === "object" &&
                                    nestedValue !== null ? (
                                      <div
                                        className="nested-fields-grid"
                                        style={{
                                          display: "grid",
                                          gridTemplateColumns:
                                            "repeat(auto-fit, minmax(200px, 1fr))",
                                          gap: "10px",
                                        }}
                                      >
                                        {Object.entries(nestedValue).map(
                                          ([subKey, subValue]) => (
                                            <div
                                              key={`${nestedKey}-${subKey}`}
                                              className="nested-field"
                                            >
                                              <label
                                                className="nested-field-label"
                                                style={{
                                                  fontSize: "0.8rem",
                                                  color: "#6b7280",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                {formatLabel(subKey)}:
                                              </label>
                                              <div className="nested-field-value">
                                                <input
                                                  type="text"
                                                  value={subValue || ""}
                                                  disabled
                                                  className="form-input disabled preview"
                                                  style={{
                                                    fontSize: "0.85rem",
                                                    padding: "6px 8px",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <div className="form-input-display">
                                        <input
                                          type="text"
                                          value={nestedValue || ""}
                                          disabled
                                          className="form-input disabled preview"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        );
                      }

                      // Handle arrays
                      if (Array.isArray(fieldValue)) {
                        return (
                          <div
                            key={`array-${fieldKey}`}
                            className="form-group-preview array-group"
                          >
                            <label className="form-label-preview">
                              📝 {formatLabel(fieldKey)}
                            </label>
                            <div className="array-display">
                              {fieldValue.length === 0 ? (
                                <div className="form-input-display">
                                  <input
                                    type="text"
                                    value="No data"
                                    disabled
                                    className="form-input disabled preview"
                                  />
                                </div>
                              ) : (
                                fieldValue.map((item, index) => (
                                  <div
                                    key={`${fieldKey}-${index}`}
                                    className="array-item"
                                    style={{
                                      marginBottom: "10px",
                                      padding: "10px",
                                      border: "1px solid #e5e7eb",
                                      borderRadius: "6px",
                                      backgroundColor: "#f9fafb",
                                    }}
                                  >
                                    {typeof item === "object" &&
                                    item !== null ? (
                                      <div>
                                        <h6
                                          style={{
                                            margin: "0 0 8px 0",
                                            fontSize: "0.85rem",
                                          }}
                                        >
                                          Item {index + 1}
                                        </h6>
                                        {Object.entries(item).map(
                                          ([itemKey, itemValue]) => (
                                            <div
                                              key={itemKey}
                                              style={{
                                                marginBottom: "5px",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize: "0.8rem",
                                                  color: "#6b7280",
                                                }}
                                              >
                                                {formatLabel(itemKey)}:
                                              </span>
                                              <input
                                                type="text"
                                                value={itemValue || ""}
                                                disabled
                                                className="form-input disabled preview"
                                                style={{
                                                  marginLeft: "8px",
                                                  fontSize: "0.8rem",
                                                }}
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={item || ""}
                                        disabled
                                        className="form-input disabled preview"
                                      />
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        );
                      }

                      return null;
                    }
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      {/* Section Header */}
      <div className="section-header">
        <div>
          <h2>Stage {currentStageReview} Forms Review</h2>
          <p>Review all forms submitted for Stage {currentStageReview}</p>
        </div>
        <button onClick={onBackToCompanies} className="back-btn">
          ← Back to Companies
        </button>
      </div>

      {/* Stage Review Summary */}
      <div className="stage-review-summary">
        <div className="stage-info-card">
          <h3>Stage {currentStageReview} Information</h3>
          <p>
            <strong>Project:</strong> {selectedProjectForReview?.name}
          </p>
          <p>
            <strong>Total Forms:</strong> {currentStageForms.length}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {getStageStatus(selectedProjectForReview, currentStageReview)}
          </p>
        </div>
      </div>

      {/* Render Stage-Specific UI */}
      {renderStageSpecificUI()}

      {/* Stage Approval Actions */}
      <div className="stage-approval-actions">
        <button
          onClick={() => handleApproveStage(selectedProjectForReview)}
          className="approve-stage-btn"
          disabled={selectedProjectForReview.length === 0}
        >
          ✅ Approve Stage {currentStageReview}
        </button>
        <button
          onClick={() => handleRejectStage(selectedProjectForReview)}
          className="reject-stage-btn"
          disabled={selectedProjectForReview.length === 0}
        >
          ❌ Reject Stage {currentStageReview}
        </button>
      </div>
    </>
  );
};

// Export form components for reuse in other files
export {
  Stage1Form1,
  Stage1Form2,
  Stage1Form3,
  Stage1Form4,
  Stage1Form5,
  Stage1Form6,
  Stage1Form7,
  Stage1Form8,
  Stage2Form1,
  Stage2Form2,
  Stage3Form1,
  Stage4Form1,
  Stage4Form2,
  Stage4Form3,
  Stage4Form4,
  Stage5Form1,
  Stage5Form2,
  Stage5Form3,
  Stage5Form4,
  Stage5Form5,
  Stage5Form6,
  Stage5Form7,
  Stage5Form8,
  Stage6Form1,
  Stage1ReviewRenderer,
  Stage2ReviewRenderer,
  Stage3ReviewRenderer,
  Stage4ReviewRenderer,
  Stage5ReviewRenderer,
  Stage6ReviewRenderer
};

export default VConnected63MVATransformerStageReviewPanel;
