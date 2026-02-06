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
            <th style={{ width: "31%" }}>Obtained Value MΩ</th>
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
            <th style={{ width: "35%" }}>Measured current (mA)</th>
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
            <th style={{ width: "35%" }}>Measured current (mA)</th>
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
            <th style={{ width: "35%" }}>Measured current (mA)</th>
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
      <h3 style={{ marginTop: "6px", fontWeight: 900 }}>
        TAN DELTA AND CAPACITANCE TEST ON BUSHING
      </h3>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "25%", fontWeight: 800 }}>METER USED</td>
          <td style={{ width: "25%" }}>
            <input
              type="text"
              value={formData.meterUsed || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td style={{ width: "25%", fontWeight: 800 }}>DATE:</td>
          <td style={{ width: "25%" }}>
            <input
              type="date"
              value={formData.date || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>MODEL & S. NO.</td>
          <td>
            <input
              type="text"
              value={formData.modelAndSerialNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td style={{ fontWeight: 800 }}>TIME :</td>
          <td>
            <input
              type="time"
              value={formData.time || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}></td>
          <td></td>
          <td style={{ fontWeight: 800 }}>WTI:</td>
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
          <td style={{ fontWeight: 800 }}></td>
          <td></td>
          <td style={{ fontWeight: 800 }}>OTI:</td>
          <td>
            <input
              type="text"
              value={formData.oti || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>

        {/* Bushing details (HV/LV) merged into the header table */}
        <tr>
          <td style={{ width: "25%", fontWeight: 800 }}>
            BUSHING SR. NO. (HV)
          </td>
          <td style={{ width: "25%" }}>
            <input
              type="text"
              value={formData.hvBushingSrNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td style={{ width: "25%", fontWeight: 800 }}>MAKE</td>
          <td style={{ width: "25%" }}>
            <input
              type="text"
              value={formData.hvBushingMake || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>BUSHING SR. NO. (LV)</td>
          <td>
            <input
              type="text"
              value={formData.lvBushingSrNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>{/* MAKE label intentionally omitted to avoid duplicate */}</td>
          <td>
            <input
              type="text"
              value={formData.lvBushingMake || ""}
              disabled
              className="form-input disabled preview"
            />
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
            <input
              type="text"
              value={formData.bushingSrNoHv || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.bushingSrNoHv_11 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.bushingSrNoHv_12 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div style={{ marginTop: "12px", fontWeight: 900 }}>STATUS:</div>

    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "16%" }}>AT 05 KV PHASE</th>
          <th style={{ width: "21%" }}>TAN DELTA in %</th>
          <th style={{ width: "21%" }}>CAPACITANCE (pF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.hvAt5kv || []).map((row, idx) => (
          <tr key={`hvAt5kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input
                type="text"
                value={row.tanDeltaPercent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.capacitancePf || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.excitationCurrent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.dielectricLoss || ""}
                disabled
                className="form-input disabled preview"
              />
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
          <th style={{ width: "21%" }}>CAPACITANCE (pF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.hvAt10kv || []).map((row, idx) => (
          <tr key={`hvAt10kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input
                type="text"
                value={row.tanDeltaPercent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.capacitancePf || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.excitationCurrent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.dielectricLoss || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div
      style={{
        marginTop: "26px",
        textAlign: "center",
        fontWeight: 900,
        fontSize: "16px",
      }}
    >
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
            <input
              type="text"
              value={formData.bushingSrNoLv || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.bushingSrNoLv_21 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.bushingSrNoLv_22 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.bushingSrNoLv_31 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.bushingSrNoLv_32 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div style={{ marginTop: "12px", fontWeight: 900 }}>STATUS:</div>

    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "16%" }}>AT 05 KV PHASE</th>
          <th style={{ width: "21%" }}>TAN DELTA in %</th>
          <th style={{ width: "21%" }}>CAPACITANCE (pF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.lvAt5kv || []).map((row, idx) => (
          <tr key={`lvAt5kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input
                type="text"
                value={row.tanDeltaPercent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.capacitancePf || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.excitationCurrent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.dielectricLoss || ""}
                disabled
                className="form-input disabled preview"
              />
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
          <th style={{ width: "21%" }}>CAPACITANCE (pF)</th>
          <th style={{ width: "21%" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ width: "21%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.lvAt10kv || []).map((row, idx) => (
          <tr key={`lvAt10kv-${row.phase}-${idx}`}>
            <td style={{ textAlign: "center", fontWeight: 800 }}>{row.phase}</td>
            <td>
              <input
                type="text"
                value={row.tanDeltaPercent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.capacitancePf || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.excitationCurrent || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={row.dielectricLoss || ""}
                disabled
                className="form-input disabled preview"
              />
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
          <td rowSpan="4"></td>
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
          <th style={{ width: "24%" }}>Vacuum Level (mmHg or torr)</th>
          <th style={{ width: "20%" }}>Inlet Temp °C</th>
          <th style={{ width: "20%" }}>Outlet Temp °C</th>
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
          <th>Vacuum Level (mmHg or torr)</th>
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


/**
 * Stage 4 Form 1: Record Oil Filtration Main Tank (Review)
 * UI should match input table UI from VConnected63MVATransformerForms.js Stage4Form1.
 */
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
          <th>Vacuum Level (mmHg or torr)</th>
          <th>M/C Outlet Temp °C</th>
          <th>OTI Temp °C</th>
          <th>WTI Temp °C</th>
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

    {/* Photo section: match the PhotoUploadSection header/spacing from input */}
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

    {/* Match VConnected63MVATransformerForms.js Stage4Form2: only IR table (no tempOti/tempWti/tempAmb header) */}
    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>10 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>Ratio of IR 60/IR 10</th>
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
            <input type="text" value={formData.hvEarth_ratio || ""} disabled className="form-input disabled preview" />
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
            <input type="text" value={formData.lv1Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV2-Earth</strong>
          </td>
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
            <input type="text" value={formData.hvLv1_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>HV-LV2</strong>
          </td>
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
          <td>
            <strong>LV1-LV2</strong>
          </td>
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

    <h4 style={{ marginTop: "40px", textAlign: "center" }}>Oil filtration of Cooler Bank</h4>

    <table className="form-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Vacuum Level (mmHg or torr)</th>
          <th>M/C Outlet Temp °C</th>
          <th>OTI Temp °C</th>
          <th>WTI Temp °C</th>
        </tr>
      </thead>
      <tbody>
        {(formData.coolerBankRecords || []).map((record, index) => (
          <tr key={index}>
            <td>
              <input type="date" value={record.date || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="time" value={record.time || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.vacuumLevel || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.mcOutletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.otiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.wtiTemp || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>Cooler Bank Filtration Process</p>

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
          <th>Vacuum Level (mmHg or torr)</th>
          <th>M/C Outlet Temp °C</th>
          <th>OTI Temp °C</th>
          <th>WTI Temp °C</th>
        </tr>
      </thead>
      <tbody>
        {(formData.combineRecords || []).map((record, index) => (
          <tr key={index}>
            <td>
              <input type="date" value={record.date || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="time" value={record.time || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.vacuumLevel || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.mcOutletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.otiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={record.wtiTemp || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>Combine Filtration Process</p>

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
      <h2>IR & PI Value after filtration Temp OTI .......°C WTI.............°C, AMB .............°C RANGE ONLY 5 KV</h2>
    </div>

    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>10 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>600 Sec (MΩ)</th>
          <th>PI 600/600 Sec</th>
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
            <input type="text" value={formData.hvEarth_ratio || ""} disabled className="form-input disabled preview" />
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
            <input type="text" value={formData.lv1Earth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV2-Earth</strong>
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Earth_600sec || ""} disabled className="form-input disabled preview" />
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
            <input type="text" value={formData.hvLv1_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv1_600sec || ""} disabled className="form-input disabled preview" />
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
            <input type="text" value={formData.hvLv2_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv2_600sec || ""} disabled className="form-input disabled preview" />
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
            <input type="text" value={formData.lv1Lv2_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_600sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Lv2_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>After Oil Filtration of main tank</h4>

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

    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>PPM Photo, Reading of BDV values, Air cell, MOG, POG.</p>

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
      <h2>SFRA TEST RECORD</h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>MAKE OF METER</strong>
          </td>
          <td>
            <input type="text" value={formData.makeOfMeter || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>DATE</strong>
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>MODEL & S. NO.</strong>
          </td>
          <td>
            <input type="text" value={formData.modelSrNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>AMBIENT:</strong>
          </td>
          <td>
            <input type="text" value={formData.ambient || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>OTI in °C</strong>
          </td>
          <td>
            <input type="text" value={formData.otiTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>WTI in °C</strong>
          </td>
          <td>
            <input type="text" value={formData.wtiTemp || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>Test report reviewed by</strong>
          </td>
          <td>
            <input type="text" value={formData.testReportReviewedBy || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>Acceptance of the test</strong>
          </td>
          <td>
            <input type="text" value={formData.acceptanceOfTest || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <div style={{ marginTop: "40px", textAlign: "center", fontWeight: 900 }}>
      RECORD OF MEASUREMENT OF IR VALUES
    </div>

    <table className="form-table" style={{ marginTop: "12px" }}>
      <tbody>
        <tr>
          <td style={{ width: "15%", fontWeight: 800 }}>Date :</td>
          <td style={{ width: "20%" }}>
            <input type="date" value={formData.irDate || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "15%", fontWeight: 800 }}>Time:</td>
          <td style={{ width: "20%" }}>
            <input type="time" value={formData.irTime || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Amb. Temp :</td>
          <td>
            <input type="text" value={formData.irAmbTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>Make :</td>
          <td>
            <input type="text" value={formData.irMake || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Oil Temp. :</td>
          <td>
            <input type="text" value={formData.irOilTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>Sr. No. :</td>
          <td>
            <input type="text" value={formData.irSrNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Wdg. Temp. :</td>
          <td>
            <input type="text" value={formData.irWdgTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>Range :</td>
          <td>
            <input type="text" value={formData.irRange || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>Relative Humidity :</td>
          <td>
            <input type="text" value={formData.irRelativeHumidity || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>Voltage Level :</td>
          <td>
            <input type="text" value={formData.irVoltageLevel || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "26px" }}>
      <thead>
        <tr>
          <th style={{ width: "26%" }}></th>
          <th style={{ width: "18%" }}>15 Sec (MΩ)</th>
          <th style={{ width: "18%" }}>60 Sec (MΩ)</th>
          <th style={{ width: "38%" }}>Ratio of IR 60/IR 15</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ fontWeight: 800 }}>HV-Earth</td>
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
          <td style={{ fontWeight: 800 }}>LV1-Earth</td>
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
          <td style={{ fontWeight: 800 }}>LV2-Earth</td>
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
          <td style={{ fontWeight: 800 }}>HV-LV1</td>
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
          <td style={{ fontWeight: 800 }}>HV-LV2</td>
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
          <td style={{ fontWeight: 800 }}>LV1-LV2</td>
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

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form2 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>RATIO TEST</h2>
    </div>

    {/* Header section (matches VConnected63MVATransformerForms.js Stage5Form2) */}
    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "20%", fontWeight: 800 }}>METER USED</td>
          <td style={{ width: "30%" }}>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "20%", fontWeight: 800 }}>DATE:</td>
          <td style={{ width: "30%" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>MODEL & S. NO.</td>
          <td>
            <input type="text" value={formData.modelSrNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>TIME :</td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>OTI (°C)</td>
          <td>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>WTI (°C)</td>
          <td>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>AMBIENT:</td>
          <td>
            <input type="text" value={formData.ambient || ""} disabled className="form-input disabled preview" />
          </td>
          <td colSpan={2} style={{ textAlign: "center", fontWeight: 800 }}>
            VECTOR GROUP
            <input type="text" value={formData.vectorGroup || ""} disabled className="form-input disabled preview" style={{ marginLeft: "8px", width: "120px" }} />
            &nbsp; M.F.
            <input type="text" value={formData.mf || ""} disabled className="form-input disabled preview" style={{ marginLeft: "8px", width: "80px" }} />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Ratio set 1 */}
    <div style={{ marginTop: "24px" }}>
      <table className="form-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>TAP NO</th>
            <th style={{ width: "30%" }}>Name Plate Ratio</th>
            <th style={{ width: "30%" }}>Measured ratio</th>
            <th style={{ width: "30%" }}>Deviation %</th>
          </tr>
          <tr>
            <th></th>
            <th style={{ fontWeight: 700 }}>{(formData.ratioSet1 && formData.ratioSet1.namePlateText) || "1.1 – 1.2 in between 2.1 -2.2"}</th>
            <th style={{ fontWeight: 700 }}>{(formData.ratioSet1 && formData.ratioSet1.measuredText) || "1.1 – 1.2 in between 2.1 -2.2"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {((formData.ratioSet1 && formData.ratioSet1.taps) || []).map((row, idx) => (
            <tr key={`ratioSet1-${row.tapNo || idx + 1}`}>
              <td style={{ textAlign: "center", fontWeight: 700 }}>{row.tapNo || idx + 1}</td>
              <td>
                <input type="text" value={row.namePlateRatio || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={row.measuredRatio || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={row.deviationPercent || ""} disabled className="form-input disabled preview" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Ratio set 2 */}
    <div style={{ marginTop: "32px" }}>
      <table className="form-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>TAP NO</th>
            <th style={{ width: "30%" }}>Name Plate Ratio</th>
            <th style={{ width: "30%" }}>Measured ratio</th>
            <th style={{ width: "30%" }}>Deviation %</th>
          </tr>
          <tr>
            <th></th>
            <th style={{ fontWeight: 700 }}>{(formData.ratioSet2 && formData.ratioSet2.namePlateText) || "1.1 – 1.2 in between 3.1 -3.2"}</th>
            <th style={{ fontWeight: 700 }}>{(formData.ratioSet2 && formData.ratioSet2.measuredText) || "1.1 – 1.2 in between 3.1 -3.2"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {((formData.ratioSet2 && formData.ratioSet2.taps) || []).map((row, idx) => (
            <tr key={`ratioSet2-${row.tapNo || idx + 1}`}>
              <td style={{ textAlign: "center", fontWeight: 700 }}>{row.tapNo || idx + 1}</td>
              <td>
                <input type="text" value={row.namePlateRatio || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={row.measuredRatio || ""} disabled className="form-input disabled preview" />
              </td>
              <td>
                <input type="text" value={row.deviationPercent || ""} disabled className="form-input disabled preview" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form3 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TYPE OF TEST – MAGNETISING CURRENT TEST LV and HV</h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "18%" }}>
            <strong>APPLIED VOLTAGE :</strong>
          </td>
          <td style={{ width: "18%" }}>
            <input type="text" value={formData.appliedVoltage || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "14%" }}>
            <strong>VOLTS</strong>
          </td>
          <td style={{ width: "18%" }}>
            <strong>DATE:</strong>
          </td>
          <td style={{ width: "16%" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "8%" }}>
            <strong>TIME :</strong>
          </td>
          <td style={{ width: "18%" }}>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>METER MAKE SR. NO.</strong>
          </td>
          <td colSpan={6}>
            <input type="text" value={formData.meterMakeSrNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <div style={{ marginTop: "16px", fontWeight: 900, padding: "6px 8px", border: "1px solid #000" }}>
      Magnetizing current measurement in milliampere
    </div>

    {/* HV SIDE TABLE */}
    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>TAP NO.</th>
          <th style={{ width: "45%" }}>VOLTAGE APPLIED ON HV SIDE</th>
          <th style={{ width: "40%" }}>CURRENT MEASURED ON HV SIDE (mA)</th>
        </tr>
      </thead>
      <tbody>
        {(formData.hvMeasurements || []).map((row, idx) => (
          <tr key={row.tapNo ?? idx + 1}>
            <td style={{ textAlign: "center", fontWeight: 700 }}>{row.tapNo ?? idx + 1}</td>
            <td>
              <input type="text" value={row.hvVoltage || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.hvCurrent || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* LV1 SIDE */}
    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th style={{ width: "50%" }}>VOLTAGE APPLIED ON LV1 SIDE</th>
          <th style={{ width: "50%" }}>CURRENT MEASURED ON LV1 SIDE (mA)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" value={formData.lv1Voltage || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv1Current || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* LV2 SIDE */}
    <table className="form-table" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th style={{ width: "50%" }}>VOLTAGE APPLIED ON LV2 SIDE</th>
          <th style={{ width: "50%" }}>CURRENT MEASURED ON LV2 SIDE (mA)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" value={formData.lv2Voltage || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lv2Current || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form4 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TYPE OF TEST – POLARITY TEST</h2>
    </div>

    {/* CONDITION 1 – 2.1 / 2.2 */}
    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th colSpan={2} style={{ textAlign: "center", fontWeight: 900 }}>
            CONDITION 1
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ width: "55%", padding: 0, verticalAlign: "top" }}>
            <table className="form-table" style={{ marginTop: 0 }}>
              <tbody>
                <tr>
                  <td style={{ width: "55%", fontWeight: 700 }}>1.1 – 1.2 =</td>
                  <td style={{ width: "45%" }}>
                    <input type="text" value={formData.condition1_11_12_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>2.1 – 2.2 =</td>
                  <td>
                    <input type="text" value={formData.condition1_21_22_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>1.1 – 2.2 =</td>
                  <td>
                    <input type="text" value={formData.condition1_11_22_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>(1.1 – 2.2) = (1.1 – 1.2) + (2.1 – 2.2)</td>
                  <td>
                    <input type="text" value={formData.condition1_calc_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td style={{ width: "45%", minHeight: "160px" }}></td>
        </tr>
      </tbody>
    </table>

    {/* CONDITION 2 – 2.1 / 2.2 */}
    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th colSpan={2} style={{ textAlign: "center", fontWeight: 900 }}>
            CONDITION 2
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ width: "55%", padding: 0, verticalAlign: "top" }}>
            <table className="form-table" style={{ marginTop: 0 }}>
              <tbody>
                <tr>
                  <td style={{ width: "55%", fontWeight: 700 }}>1.1 – 1.2 =</td>
                  <td style={{ width: "45%" }}>
                    <input type="text" value={formData.condition2_11_12_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>2.1 – 2.2 =</td>
                  <td>
                    <input type="text" value={formData.condition2_21_22_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>1.1 – 2.1 =</td>
                  <td>
                    <input type="text" value={formData.condition2_11_21_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>(1.1 – 2.1) = (1.1 – 1.2) - (2.1 – 2.2)</td>
                  <td>
                    <input type="text" value={formData.condition2_calc_22 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td style={{ width: "45%", minHeight: "160px" }}></td>
        </tr>
      </tbody>
    </table>

    {/* CONDITION 1 – 3.1 / 3.2 */}
    <table className="form-table" style={{ marginTop: "40px" }}>
      <thead>
        <tr>
          <th colSpan={2} style={{ textAlign: "center", fontWeight: 900 }}>
            CONDITION 1
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ width: "55%", padding: 0, verticalAlign: "top" }}>
            <table className="form-table" style={{ marginTop: 0 }}>
              <tbody>
                <tr>
                  <td style={{ width: "55%", fontWeight: 700 }}>1.1 – 1.2 =</td>
                  <td style={{ width: "45%" }}>
                    <input type="text" value={formData.condition1_11_12_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>3.1 – 3.2 =</td>
                  <td>
                    <input type="text" value={formData.condition1_31_32_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>1.1 – 3.2 =</td>
                  <td>
                    <input type="text" value={formData.condition1_11_32_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>(1.1 – 3.2) = (1.1 – 1.2) + (3.1 – 3.2)</td>
                  <td>
                    <input type="text" value={formData.condition1_calc_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td style={{ width: "45%", minHeight: "160px" }}></td>
        </tr>
      </tbody>
    </table>

    {/* CONDITION 2 – 3.1 / 3.2 */}
    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th colSpan={2} style={{ textAlign: "center", fontWeight: 900 }}>
            CONDITION 2
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ width: "55%", padding: 0, verticalAlign: "top" }}>
            <table className="form-table" style={{ marginTop: 0 }}>
              <tbody>
                <tr>
                  <td style={{ width: "55%", fontWeight: 700 }}>1.1 – 1.2 =</td>
                  <td style={{ width: "45%" }}>
                    <input type="text" value={formData.condition2_11_12_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>3.1 – 3.2 =</td>
                  <td>
                    <input type="text" value={formData.condition2_31_32_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>1.1 – 3.1 =</td>
                  <td>
                    <input type="text" value={formData.condition2_11_31_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>(1.1 – 3.1) = (1.1 – 1.2) - (3.1 – 3.2)</td>
                  <td>
                    <input type="text" value={formData.condition2_calc_32 || ""} disabled className="form-input disabled preview" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          <td style={{ width: "45%", minHeight: "160px" }}></td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form5 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>
        TYPE OF TEST – SHORT CIRCUIT TEST&nbsp;<span>I</span>
      </h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>APPLIED VOLTAGE:</strong>
          </td>
          <td>
            <input type="text" value={formData.appliedVoltage || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>DATE:</strong>
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>TIME :</strong>
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>METER MAKE SR. NO.</strong>
          </td>
          <td colSpan="5">
            <input type="text" value={formData.meterMakeSrNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV 1 SHORT, LV2 OPEN</strong>
          </td>
          <td colSpan="5">
            <input type="text" value={formData.lv1ShortLv2Open || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>TAP NO.</th>
          <th style={{ width: "25%" }}>VOLTAGE</th>
          <th style={{ width: "30%" }}>HV CURRENT (Amp)</th>
          <th style={{ width: "30%" }}>LV CURRENT (Amp)</th>
        </tr>
      </thead>
      <tbody>
        {(
          Array.isArray(formData.taps) && formData.taps.length
            ? formData.taps
            : [
                { tapNo: 1, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 2, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 3, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 4, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 5, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 6, voltage: "", hvCurrent: "", lvCurrent: "" },
              ]
        ).map((row, idx) => (
          <tr key={row.tapNo || idx + 1}>
            <td style={{ textAlign: "center", fontWeight: 700 }}>{row.tapNo || idx + 1}</td>
            <td>
              <input type="text" value={row.voltage || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.hvCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.lvCurrent || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px" }}>
      <tbody>
        <tr>
          <td rowSpan="4">
            <strong>Impedance calculation</strong>
          </td>
          <td>
            <strong>Applied Voltage HV</strong>
          </td>
          <td>
            <strong>Rated Current LV</strong>
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" value={formData.appliedVoltageHV || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.ratedCurrentLV || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>%Z = _____________ X _____________ X 100</strong>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="text"
                value={formData.percentZ || ""}
                disabled
                className="form-input disabled preview"
                placeholder="%Z ="
                style={{ width: "80px" }}
              />
              <span>
                <strong>Rated voltage HV</strong>
              </span>
              <input
                type="text"
                value={formData.ratedVoltageHV || ""}
                disabled
                className="form-input disabled preview"
                style={{ width: "120px" }}
              />
              <span>
                <strong>Measured current LV</strong>
              </span>
              <input
                type="text"
                value={formData.measuredCurrentLV || ""}
                disabled
                className="form-input disabled preview"
                style={{ width: "120px" }}
              />
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form6 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>
        TYPE OF TEST – SHORT CIRCUIT TEST&nbsp;<span>II</span>
      </h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>APPLIED VOLTAGE:</strong>
          </td>
          <td>
            <input type="text" value={formData.appliedVoltage || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>DATE:</strong>
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>TIME :</strong>
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>METER MAKE SR. NO.</strong>
          </td>
          <td colSpan="5">
            <input type="text" value={formData.meterMakeSrNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td>
            <strong>LV 1 OPEN, LV2 SHORT</strong>
          </td>
          <td colSpan="5">
            <input type="text" value={formData.lv1OpenLv2Short || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>TAP NO.</th>
          <th style={{ width: "25%" }}>VOLTAGE</th>
          <th style={{ width: "30%" }}>HV CURRENT (Amp)</th>
          <th style={{ width: "30%" }}>LV CURRENT (Amp)</th>
        </tr>
      </thead>
      <tbody>
        {(
          Array.isArray(formData.taps) && formData.taps.length
            ? formData.taps
            : [
                { tapNo: 1, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 2, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 3, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 4, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 5, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 6, voltage: "", hvCurrent: "", lvCurrent: "" },
              ]
        ).map((row, idx) => (
          <tr key={row.tapNo || idx + 1}>
            <td style={{ textAlign: "center", fontWeight: 700 }}>{row.tapNo || idx + 1}</td>
            <td>
              <input type="text" value={row.voltage || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.hvCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.lvCurrent || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px" }}>
      <tbody>
        <tr>
          <td rowSpan="4">
            <strong>Impedance calculation</strong>
          </td>
          <td>
            <strong>Applied Voltage HV</strong>
          </td>
          <td>
            <strong>Rated Current LV</strong>
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" value={formData.appliedVoltageHV || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.ratedCurrentLV || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>%Z = _____________ X _____________ X 100</strong>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="text"
                value={formData.percentZ || ""}
                disabled
                className="form-input disabled preview"
                placeholder="%Z ="
                style={{ width: "80px" }}
              />
              <span>
                <strong>Rated voltage HV</strong>
              </span>
              <input
                type="text"
                value={formData.ratedVoltageHV || ""}
                disabled
                className="form-input disabled preview"
                style={{ width: "120px" }}
              />
              <span>
                <strong>Measured current LV</strong>
              </span>
              <input
                type="text"
                value={formData.measuredCurrentLV || ""}
                disabled
                className="form-input disabled preview"
                style={{ width: "120px" }}
              />
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form7 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>
        TYPE OF TEST – SHORT CIRCUIT TEST&nbsp;<span>III</span>
      </h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>APPLIED VOLTAGE:</strong>
          </td>
          <td>
            <input type="text" value={formData.appliedVoltage || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>DATE:</strong>
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <strong>TIME :</strong>
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>METER MAKE SR. NO.</strong>
          </td>
          <td colSpan="5">
            <input type="text" value={formData.meterMakeSrNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV1 AND LV2 SHORT</strong>
          </td>
          <td colSpan="5">
            <input type="text" value={formData.lv1AndLv2Short || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>TAP NO.</th>
          <th style={{ width: "25%" }}>VOLTAGE</th>
          <th style={{ width: "30%" }}>HV CURRENT (Amp)</th>
          <th style={{ width: "30%" }}>LV CURRENT (Amp)</th>
        </tr>
      </thead>
      <tbody>
        {(
          Array.isArray(formData.taps) && formData.taps.length
            ? formData.taps
            : [
                { tapNo: 1, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 2, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 3, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 4, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 5, voltage: "", hvCurrent: "", lvCurrent: "" },
                { tapNo: 6, voltage: "", hvCurrent: "", lvCurrent: "" },
              ]
        ).map((row, idx) => (
          <tr key={row.tapNo || idx + 1}>
            <td style={{ textAlign: "center", fontWeight: 700 }}>{row.tapNo || idx + 1}</td>
            <td>
              <input type="text" value={row.voltage || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.hvCurrent || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.lvCurrent || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px" }}>
      <tbody>
        <tr>
          <td rowSpan="4">
            <strong>Impedance calculation</strong>
          </td>
          <td>
            <strong>Applied Voltage HV</strong>
          </td>
          <td>
            <strong>Rated Current LV</strong>
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" value={formData.appliedVoltageHV || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.ratedCurrentLV || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>%Z = _____________ X _____________ X 100</strong>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="text"
                value={formData.percentZ || ""}
                disabled
                className="form-input disabled preview"
                placeholder="%Z ="
                style={{ width: "80px" }}
              />
              <span>
                <strong>Rated voltage HV</strong>
              </span>
              <input
                type="text"
                value={formData.ratedVoltageHV || ""}
                disabled
                className="form-input disabled preview"
                style={{ width: "120px" }}
              />
              <span>
                <strong>Measured current LV</strong>
              </span>
              <input
                type="text"
                value={formData.measuredCurrentLV || ""}
                disabled
                className="form-input disabled preview"
                style={{ width: "120px" }}
              />
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form8 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TYPE OF TEST – WINDING RESISTANCE TEST</h2>
    </div>

    {/* Header block (match VConnected63MVATransformerForms.js Stage5Form8) */}
    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "20%", fontWeight: 800 }}>METER USED</td>
          <td style={{ width: "30%" }}>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "20%", fontWeight: 800 }}>DATE:</td>
          <td style={{ width: "30%" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>METER MAKE SR. NO.</td>
          <td>
            <input type="text" value={formData.meterMakeSrNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>TIME :</td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>RANGE</td>
          <td>
            <input type="text" value={formData.range || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>WTI:</td>
          <td>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: 800 }}>AMBIENT:</td>
          <td>
            <input type="text" value={formData.ambient || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>OTI:</td>
          <td>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* HV / LV layout (match VConnected63MVATransformerForms.js Stage5Form8) */}
    <div
      style={{
        display: "flex",
        gap: "40px",
        marginTop: "30px",
        alignItems: "flex-start",
      }}
    >
      {/* HV SIDE */}
      <div style={{ flex: 1 }}>
        <div style={{ textAlign: "center", fontWeight: 900, marginBottom: "8px" }}>HV SIDE</div>
        <table className="form-table">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>TAP NO.</th>
              <th style={{ width: "70%" }}>1.1 – 1.2 (Ω)</th>
            </tr>
          </thead>
          <tbody>
            {(formData.hvSide || []).map((row, idx) => (
              <tr key={row.tapNo || idx + 1}>
                <td style={{ textAlign: "center", fontWeight: 700 }}>{row.tapNo || idx + 1}</td>
                <td>
                  <input
                    type="text"
                    value={row.resistance_11_12 || ""}
                    disabled
                    className="form-input disabled preview"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LV SIDE */}
      <div style={{ flex: 1 }}>
        <div style={{ textAlign: "center", fontWeight: 900, marginBottom: "8px" }}>LV SIDE</div>

        {/* 2.1 – 2.2 */}
        <table className="form-table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>ROW</th>
              <th style={{ width: "60%" }}>2.1 – 2.2 (Ω)</th>
            </tr>
          </thead>
          <tbody>
            {(formData.lvSide21_22 || []).map((row, idx) => (
              <tr key={`21-22-${idx}`}>
                <td style={{ textAlign: "center", fontWeight: 700 }}>{row.rowNo || idx + 1}</td>
                <td>
                  <input
                    type="text"
                    value={row.resistance_21_22 || ""}
                    disabled
                    className="form-input disabled preview"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 3.1 – 3.2 */}
        <table className="form-table" style={{ marginTop: "16px" }}>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>ROW</th>
              <th style={{ width: "60%" }}>3.1 – 3.2 (Ω)</th>
            </tr>
          </thead>
          <tbody>
            {(formData.lvSide31_32 || []).map((row, idx) => (
              <tr key={`31-32-${idx}`}>
                <td style={{ textAlign: "center", fontWeight: 700 }}>{row.rowNo || idx + 1}</td>
                <td>
                  <input
                    type="text"
                    value={row.resistance_31_32 || ""}
                    disabled
                    className="form-input disabled preview"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form9 = ({ formData }) => {
  const bushingRows = [
    { key: "hv11", labelVoltage: "HV (1.1)" },
    { key: "hv12", labelVoltage: "HV (1.2)" },
    { key: "lv21", labelVoltage: "LV (2.1)" },
    { key: "lv22", labelVoltage: "LV (2.2)" },
    { key: "lv31", labelVoltage: "LV (3.1)" },
    { key: "lv32", labelVoltage: "LV (3.2)" },
  ];

  const getRow = (key) => formData?.rows?.[key] || {};

  return (
    <div className="form-container">
      <div className="company-header">
        <h2>TAN DELTA AND CAPACITANCE TEST ON BUSHING</h2>
      </div>

      {/* Header block (match VConnected63MVATransformerForms.js Stage5Form9) */}
      <table className="form-table">
        <tbody>
          <tr>
            <td style={{ width: "20%", fontWeight: 800 }}>Bushing Sr No. (HV)</td>
            <td style={{ width: "30%" }}>
              <input type="text" value={formData.hvBushingSrNo || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ width: "20%", fontWeight: 800 }}>Bushing Make (HV)</td>
            <td style={{ width: "30%" }}>
              <input type="text" value={formData.hvBushingMake || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
          <tr>
            <td style={{ width: "20%", fontWeight: 800 }}>Bushing Sr No. (LV)</td>
            <td style={{ width: "30%" }}>
              <input type="text" value={formData.lvBushingSrNo || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ width: "20%", fontWeight: 800 }}>Bushing Make (LV)</td>
            <td style={{ width: "30%" }}>
              <input type="text" value={formData.lvBushingMake || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
          <tr>
            <td style={{ width: "20%", fontWeight: 800 }}>METER USED</td>
            <td style={{ width: "30%" }}>
              <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ width: "20%", fontWeight: 800 }}>DATE:</td>
            <td style={{ width: "30%" }}>
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
            <td style={{ fontWeight: 800 }}>AMBIENT:</td>
            <td>
              <input type="text" value={formData.ambient || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ fontWeight: 800 }}>OTI (°C)</td>
            <td>
              <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 800 }}>WTI (°C)</td>
            <td>
              <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ fontWeight: 800 }}></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Main table (match VConnected63MVATransformerForms.js Stage5Form9) */}
      <table className="form-table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>VOLTAGE (KV)</th>
            <th style={{ width: "18%" }}>BUSHING & SERIAL NO.</th>
            <th style={{ width: "10%" }}>TEST MODE</th>
            <th colSpan={2} style={{ width: "24%" }}>CAPACITANCE</th>
            <th colSpan={2} style={{ width: "24%" }}>TAN DELTA</th>
            <th style={{ width: "14%" }}>REMARK</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th style={{ fontWeight: 700 }}>FACTORY</th>
            <th style={{ fontWeight: 700 }}>SITE</th>
            <th style={{ fontWeight: 700 }}>FACTORY</th>
            <th style={{ fontWeight: 700 }}>SITE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bushingRows.map(({ key, labelVoltage }) => {
            const row = getRow(key);
            return (
              <tr key={key}>
                <td>
                  <input type="text" value={row.voltageKv || ""} disabled className="form-input disabled preview" />
                </td>
                <td style={{ fontWeight: 700 }}>{labelVoltage}</td>
                <td>
                  <input type="text" value={row.testMode || ""} disabled className="form-input disabled preview" />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.capacitanceFactory || ""}
                    disabled
                    className="form-input disabled preview"
                  />
                </td>
                <td>
                  <input type="text" value={row.capacitanceSite || ""} disabled className="form-input disabled preview" />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.tanDeltaFactory || ""}
                    disabled
                    className="form-input disabled preview"
                  />
                </td>
                <td>
                  <input type="text" value={row.tanDeltaSite || ""} disabled className="form-input disabled preview" />
                </td>
                <td>
                  <input type="text" value={row.remark || ""} disabled className="form-input disabled preview" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {formData.photos ? renderPhotos(formData.photos) : null}
    </div>
  );
};

const Stage5Form10 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TAN DELTA AND CAPACITANCE MEASUREMENT OF WINDING</h2>
    </div>

    {/* Header block (match VConnected63MVATransformerForms.js Stage5Form10) */}
    <table className="form-table">
      <tbody>
        <tr>
          <td style={{ width: "22%", fontWeight: 800 }}>METER USED</td>
          <td style={{ width: "28%" }}>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ width: "22%", fontWeight: 800 }}>DATE:</td>
          <td style={{ width: "28%" }}>
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
          <td style={{ fontWeight: 800 }}>OTI..................°C</td>
          <td>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ fontWeight: 800 }}>AMBIENT:</td>
          <td>
            <input type="text" value={formData.ambient || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>

        <tr>
          <td style={{ fontWeight: 800 }}>WTI..................°C</td>
          <td>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    {/* AT 05 KV table */}
    <table className="form-table" style={{ marginTop: "16px" }}>
      <thead>
        <tr>
          <th style={{ width: "18%" }}>AT 05 KV IN BETWEEN</th>
          <th style={{ width: "12%" }}>MODE</th>
          <th style={{ width: "17%" }}>TAN DELTA %</th>
          <th style={{ width: "16%" }}>CAPACITANCE (pF)</th>
          <th style={{ width: "19%" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ width: "18%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.at05kvRows || []).map((row, idx) => (
          <tr key={`at05-${row.between}-${row.mode}-${idx}`}>
            <td style={{ fontWeight: 800, textAlign: "center" }}>{row.between}</td>
            <td style={{ fontWeight: 800, textAlign: "center" }}>{row.mode}</td>
            <td>
              <input type="text" value={row.tanDelta || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capacitance || ""} disabled className="form-input disabled preview" />
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

    {/* AT 10 KV table */}
    <table className="form-table" style={{ marginTop: "18px" }}>
      <thead>
        <tr>
          <th style={{ width: "18%" }}>AT 10 KV IN BETWEEN</th>
          <th style={{ width: "12%" }}>MODE</th>
          <th style={{ width: "17%" }}>TAN DELTA %</th>
          <th style={{ width: "16%" }}>CAPACITANCE (pF)</th>
          <th style={{ width: "19%" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ width: "18%" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        {(formData.at10kvRows || []).map((row, idx) => (
          <tr key={`at10-${row.between}-${row.mode}-${idx}`}>
            <td style={{ fontWeight: 800, textAlign: "center" }}>{row.between}</td>
            <td style={{ fontWeight: 800, textAlign: "center" }}>{row.mode}</td>
            <td>
              <input type="text" value={row.tanDelta || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={row.capacitance || ""} disabled className="form-input disabled preview" />
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

    {formData.photos ? renderPhotos(formData.photos) : null}
  </div>
);

const Stage5Form11 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>VISHVAS POWER ENGINEERING SERVICES PVT. LTD. NAGPUR</h2>
      <h3>PRE-COMMISSIONING CHECKLIST</h3>
    </div>

    {/* IR header */}
    <table className="form-table" style={{ marginTop: "20px" }}>
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
          <td rowSpan="4"></td>
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

    {/* IR Values table */}
    <table className="form-table" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th></th>
          <th>15 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>600 Sec (MΩ)</th>
          <th>Ratio of IR 60/IR 15</th>
          <th>Ratio of IR 600/IR 60</th>
        </tr>
      </thead>
      <tbody>
        {[
          { label: "HV-Earth", key: "hvEarth" },
          { label: "LV1-Earth", key: "lv1Earth" },
          { label: "LV2-Earth", key: "lv2Earth" },
          { label: "HV-LV1", key: "hvLv1" },
          { label: "HV-LV2", key: "hvLv2" },
          { label: "LV1-LV2", key: "lv1Lv2" },
        ].map(({ label, key }) => (
          <tr key={key}>
            <td>
              <strong>{label}</strong>
            </td>
            <td>
              <input type="text" value={formData[`${key}_15sec`] || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={formData[`${key}_60sec`] || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={formData[`${key}_600sec`] || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={formData[`${key}_ratio_ir60`] || ""} disabled className="form-input disabled preview" />
            </td>
            <td>
              <input type="text" value={formData[`${key}_ratio_ir600`] || ""} disabled className="form-input disabled preview" />
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
    { id: "stage5-form8", title: "IR Values of Transformer (Form 8)", component: Stage5Form8 },
    { id: "stage5-form9", title: "IR Values of Transformer (Form 8)", component: Stage5Form9 },
    { id: "stage5-form10", title: "IR Values of Transformer (Form 8)", component: Stage5Form10 },
    { id: "stage5-form11", title: "IR Values of Transformer (Form 8)", component: Stage5Form11 }
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
      component: Stage1Form1
    },
    {
      id: "protocol-accessories-checking",
      title: "Protocol for Accessories Checking",
      component: Stage1Form2
    },
    {
      id: "core-insulation-check",
      title: "Core Insulation Check",
      component: Stage1Form3
    },
    {
      id: "pre-erection-ratio-test-turret-cts",
      title: "Pre erection Ratio test of turret CTs - Phase 1",
      component: Stage1Form4
    },
    {
      id: "pre-erection-ratio-test-phase2",
      title: "Pre erection Ratio test of turret CTs - Phase 2",
      component: Stage1Form5
    },
    {
      id: "pre-erection-ratio-test-phase3",
      title: "Pre erection Ratio test of turret CTs - Phase 3",
      component: Stage1Form6
    },
    {
      id: "tan-delta-capacitance-test-bushing",
      title: "TAN DELTA AND CAPACITANCE TEST ON BUSHING",
      component: Stage1Form7
    },
    {
      id: "record-of-measurement-of-ir-values-before-erection",
      title: "RECORD OF MEASUREMENT OF IR VALUES (Before Erection)",
      component: Stage1Form8
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
            {form.component ? (
              <form.component formData={formData} />
            ) : null}

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
  Stage5Form9,
  Stage5Form10,
  Stage5Form11,
  Stage6Form1,
  Stage1ReviewRenderer,
  Stage2ReviewRenderer,
  Stage3ReviewRenderer,
  Stage4ReviewRenderer,
  Stage5ReviewRenderer,
  Stage6ReviewRenderer
};

export default VConnected63MVATransformerStageReviewPanel;
