import React from 'react';
import { BACKEND_API_BASE_URL, BACKEND_IMG_API_BASE_URL } from './constant';

// Stage 1 Form 1: Name Plate Details Transformer
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
            <input
              type="text"
              value={formData.make || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>CURRENT HV (A)</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.currentHV || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>SR. NO.</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.srNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>LV (A)</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.currentLV || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>MVA Rating</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.mvaRating || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Temp. Rise over amb. Oil in °C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.tempRiseOilC || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>HV (KV)</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvKv || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Winding in °C</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.windingC || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV (KV)</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lvKv || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Oil Quantity</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.oilQuantity || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>% Impedance</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.impedancePercent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Weight of Core & Wdg.</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.weightCoreWdg || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Year of Mfg.</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.yearOfMfg || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>TRANSPORTING WEIGHT</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.transportingWeight || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>NO. OF COOLING FAN</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.noOfCoolingFan || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>Total Weight</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.totalWeight || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            {/* <strong>NO OF OIL PUMP</strong> */}
          </td>
          <td>
            {/* <input
              type="text"
              value={formData.noOfOilPump || ""}
              disabled
              className="form-input disabled preview"
            /> */}
          </td>
          <td>
            <strong>NO. OF RADIATORS</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.noOfRadiators || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>NO. OF TAPS</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.noOfTaps || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>MFG. OF OCTC</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.mfgOfOctc || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>TYPE OF OCTC</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.typeOfOctc || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <strong>SR. NO. OCTC</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.srNoOctc || ""}
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
        Transformer, Oil Level gauge, Wheel Locking, Transformer Foundation Level condition.
      </p>

      {formData.photos && (
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(formData.photos).map(([photoKey, url]) => {
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
      )}
    </div>
  </div>
);

// Stage 1 Form 2: Protocol for Accessories Checking
const Stage1Form2 = ({ formData }) => {
  const accessoryItems = [
    { id: 1, description: "HV bushing" },
    { id: 2, description: "LV Bushing" },
    { id: 3, description: "Radiators" },
    { id: 4, description: "Buchholz" },
    { id: 5, description: "PRV" },
    { id: 6, description: "CPR" },
    { id: 7, description: "Breather" },
    { id: 8, description: "Bushing Connector" },
    { id: 9, description: "FAN" },
    { id: 10, description: "Turrents" },
    { id: 11, description: "Valves" },
  ];

  return (
    <div className="form-container">
      <div className="company-header">
        <h2>PROTOCOL FOR ACCESSORIES CHECKING.</h2>
      </div>

      <table className="form-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Packing case Number</th>
            <th>Material Description</th>
            <th>Qty as per P. L.</th>
            <th>Qty. Received</th>
            <th>Short Qty</th>
            <th>Damaged Qty.</th>
          </tr>
        </thead>
        <tbody>
          {accessoryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories?.[item.id]?.packingCase || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <strong>{item.description}</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories?.[item.id]?.qtyPerPL || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories?.[item.id]?.qtyReceived || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories?.[item.id]?.shortQty || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories?.[item.id]?.damagedQty || ""}
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
          Transformer Accessories
        </p>

        {formData.photos && (
          <div className="photo-display-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "10px"
          }}>
            {Object.entries(formData.photos).map(([photoKey, url]) => {
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
        )}
      </div>
    </div>
  );
};

// Stage 1 Form 3: Core Insulation Check
const Stage1Form3 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>CORE INSULATION CHECK: At 1KV &gt; 500 MΩ </h2>
    </div>

    <table className="form-table">
      <thead>
        <tr>
          <th> </th>
          <th>Obtained Value</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Between Core - Frame</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.coreFrame_obtainedValue || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.coreFrame_remarks || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Between Frame - Tank</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.frameTank_obtainedValue || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.frameTank_remarks || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Between Core - Tank</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.coreTank_obtainedValue || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.coreTank_remarks || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <strong>CHECKLIST FOR CONFORMING AVAILABILITY OF EQUIPMENT AT SITE</strong>
    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th> </th>
          <th>Decription</th>
          <th>Rating/Capacity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>1</strong>
          </td>
          <td>
            <strong>Whether the Filter Machine is Available </strong>
          </td>
          
          <td>
            <select
              value={formData.filterMachine || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <strong>2</strong>
          </td>
          <td>
            <strong>Capacity of Filter Machine</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.filterMachineCapacity || ""}
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
            <strong>Capacity of the Vacuum Pump to be used. </strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.vacuumPumpCapacity || ""}
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
            <strong>Whether the Reservoir is Available with valves and a breather. </strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.reservoirAvailable || ""}
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
            <strong>Capacity of Reservoirs </strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.reservoirCapacity || ""}
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
            <strong>Hose Pipes for the Filtration Process.  </strong>
          </td>
          <td>
            <select
              value={formData.hosePipes || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <strong>7</strong>
          </td>
          <td>
            <strong>Whether Crane is Available in good condition </strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.craneAvailable || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>8</strong>
          </td>
          <td>
            <strong>Dry air  </strong>
          </td>
          <td>
            <select
              value={formData.dryAir || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <strong>9</strong>
          </td>
          <td>
            <strong>Dew point meter </strong>
          </td>
          <td>
            <select
              value={formData.dewPointMeter || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <strong>10</strong>
          </td>
          <td>
            <strong>Mec Leod gauge  </strong>
          </td>
          <td>
            <select
              value={formData.mecLeodGauge || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>

      </tbody>
    </table>

    <strong>SAFETY EQUIPMENT</strong>
    <table className="form-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Decription</th>
          <th>Confirmation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Fire extinguisher/Fire sand bucket</strong>
          </td>
          
          <td>
            <select
              value={formData.fireExtinguisher || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <strong>First aid kit</strong>
          </td>
          <td>
            <select
              value={formData.firstAidKit || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <strong>PPE for the working team of ETC agency, like - Safety shoes, Helmet, etc</strong>
          </td>
         <td>
            <select
              value={formData.ppeEquipment || ""}
              disabled
              className="form-input disabled preview"
            >
              <option value="">(Yes/No)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Photo Upload Section for Review */}
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
        Ten delta kit, calibration report, during ten delta of bushing photo
      </p>

      {formData.photos && (
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(formData.photos).map(([photoKey, url]) => {
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
      )}
    </div>
  </div>
);

// Stage 1 Form 4: Pre erection Ratio test of turret CTs
const Stage1Form4 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>Pre erection Ratio test of turret CTs</h2>
    </div>

    {/* Phase 1.1 Section */}
    <h3 style={{ textAlign: "center", marginTop: "30px" }}>CT Ratio CORE - S1-S2,S1-S3 Phase 1.1</h3>

    <h4>CT Ratio Test</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Current %</th>
          <th>Applied primary Current (A) S1-S2</th>
          <th>Applied primary Current (A) S1-S3</th>
          <th>Measured secondary current (A) S1-S2</th>
          <th>Measured secondary current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>20%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>40%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>60%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>80%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>100%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Knee point Voltage</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Voltage %</th>
          <th>Applied voltage S1-S2</th>
          <th>Applied voltage S1-S3</th>
          <th>Measured current (A) S1-S2</th>
          <th>Measured current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>20%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>40%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>60%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>80%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>100%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>110%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Phase 1.2 Section */}
    <h3 style={{ textAlign: "center", marginTop: "40px" }}>Phase 1.2</h3>

    <h4>CT Ratio CORE – S1-S2, S1-S3</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Current %</th>
          <th>Applied primary Current (A) S1-S2</th>
          <th>Applied primary Current (A) S1-S3</th>
          <th>Measured secondary current (A) S1-S2</th>
          <th>Measured secondary current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>20%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>40%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>60%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>80%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>100%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Knee point Voltage</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Voltage %</th>
          <th>Applied voltage S1-S2</th>
          <th>Applied voltage S1-S3</th>
          <th>Measured current (A) S1-S2</th>
          <th>Measured current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>20%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>40%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>60%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>80%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>100%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>110%</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_measuredCurrent_s1s3 || ""}
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
        CT Ratio kit calibration
      </p>

      {formData.photos && (
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(formData.photos).map(([photoKey, url]) => {
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
      )}
    </div>
  </div>
);

// Stage 1 Form 5: Pre erection Ratio test of turret CTs
const Stage1Form5 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>Pre erection Ratio test of turret CTs</h2>
    </div>

    {/* Phase 2.1 Section */}
    <h3 style={{ textAlign: "center", marginTop: "30px" }}>Phase 2.1</h3>

    <h4>CT Ratio CORE – S1-S2, S1-S3</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Current %</th>
          <th>Applied primary Current (A) S1-S2</th>
          <th>Applied primary Current (A) S1-S3</th>
          <th>Measured secondary current (A) S1-S2</th>
          <th>Measured secondary current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>20%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>40%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>60%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>80%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>100%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Knee point Voltage</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Voltage %</th>
          <th>Applied Voltage S1-S2</th>
          <th>Applied Voltage S1-S3</th>
          <th>Measured current (A) S1-S2</th>
          <th>Measured current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>20%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>40%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>60%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>80%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>100%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>110%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase31_knee_110percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Phase 2.2 Section */}
    <h3 style={{ textAlign: "center", marginTop: "40px" }}>Phase 2.2</h3>

    <h4>CT Ratio CORE – S1-S2, S1-S3</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Current %</th>
          <th>Applied primary Current (A) S1-S2</th>
          <th>Applied primary Current (A) S1-S3</th>
          <th>Measured secondary current (A) S1-S2</th>
          <th>Measured secondary current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>20%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>40%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>60%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>80%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>100%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Knee point Voltage</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Voltage %</th>
          <th>Applied voltage S1-S2</th>
          <th>Applied voltage S1-S3</th>
          <th>Measured current (A) S1-S2</th>
          <th>Measured current (A) S1-S3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>20%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>40%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>60%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>80%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>100%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>110%</strong></td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_appliedVoltage_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_appliedVoltage_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.phase32_knee_110percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    {/* WTI Section */}
    <h3 style={{ textAlign: "center", marginTop: "40px" }}>WTI</h3>

    <h4>CT Ratio CORE - S1-S2, S1-S3, S1-S4, S1-S5, S1-S6, S1-S7</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Current %</th>
          <th>Applied primary Current (A) S1-S2</th>
          <th>Applied primary Current (A) S1-S3</th>
          <th>Applied primary Current (A) S1-S4</th>
          <th>Measured secondary current (A) S1-S2</th>
          <th>Measured secondary current (A) S1-S3</th>
          <th>Measured secondary current (A) S1-S4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>20%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_appliedCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_measuredCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>40%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_appliedCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_measuredCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>60%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_appliedCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_measuredCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>80%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_appliedCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_measuredCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>100%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_appliedCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_appliedCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_appliedCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_measuredCurrent_s1s2 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_measuredCurrent_s1s3 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_measuredCurrent_s1s4 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4>CT Ratio CORE - S1-S2, S1-S3, S1-S4, S1-S5, S1-S6, S1-S7</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Current %</th>
          <th>Applied primary Current (A) S1-S5</th>
          <th>Applied primary Current (A) S1-S6</th>
          <th>Applied primary Current (A) S1-S7</th>
          <th>Measured secondary current (A) S1-S5</th>
          <th>Measured secondary current (A) S1-S6</th>
          <th>Measured secondary current (A) S1-S7</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>20%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_appliedCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_appliedCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_appliedCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_measuredCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_measuredCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_20percent_measuredCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>40%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_appliedCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_appliedCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_appliedCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_measuredCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_measuredCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_40percent_measuredCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>60%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_appliedCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_appliedCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_appliedCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_measuredCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_measuredCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_60percent_measuredCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>80%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_appliedCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_appliedCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_appliedCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_measuredCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_measuredCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_80percent_measuredCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>100%</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_appliedCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_appliedCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_appliedCurrent_s1s7 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_measuredCurrent_s1s5 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_measuredCurrent_s1s6 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.wti_100percent_measuredCurrent_s1s7 || ""}
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
        CT Ratio kit calibration
      </p>

      {formData.photos && (
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(formData.photos).map(([photoKey, url]) => {
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
      )}
    </div>
  </div>
);

const Stage1Form6 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>TAN DELTA AND CAPACITANCE TEST ON BUSHING</h2>
    </div>

    <table className="form-table">
      <tbody>
        <tr>
          <td><strong>METER USED</strong></td>
          <td>
            <input
              type="text"
              value={formData.meterUsed || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td><strong>DATE</strong></td>
          <td>
            <input
              type="text"
              value={formData.date || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td><strong>TIME</strong></td>
          <td>
            <input
              type="text"
              value={formData.time || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>MODEL & S. NO.</strong></td>
          <td>
            <input
              type="text"
              value={formData.modelSrNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td><strong>WTI</strong></td>
          <td>
            <input
              type="text"
              value={formData.wti || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td><strong>OTI</strong></td>
          <td>
            <input
              type="text"
              value={formData.oti || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table">
      <thead>
        <tr>
          <th> </th>
          <th>1.1</th>
          <th>1.2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>BUSHING SR. NO.HV</strong></td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_srNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_srNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Status</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>AT 05 KV PHASE</th>
          <th>TAN DELTA in %</th>
          <th>CAPACITANCE (pF)</th>
          <th>EXCITATION CURRENT (mA)</th>
          <th>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1.1</strong></td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_05kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_05kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_05kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_05kv_dielectricLoss || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>1.2</strong></td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_05kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_05kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_05kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_05kv_dielectricLoss || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table">
      <thead>
        <tr>
          <th>AT 10 KV PHASE</th>
          <th>TAN DELTA in %</th>
          <th>CAPACITANCE (pF)</th>
          <th>EXCITATION CURRENT (mA)</th>
          <th>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1.1</strong></td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_10kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_10kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_10kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing11_10kv_dielectricLoss || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>1.2</strong></td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_10kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_10kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_10kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvBushing12_10kv_dielectricLoss || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h3 style={{ textAlign: "center", marginTop: "40px" }}>TYPE OF TEST – TAN DELTA AND CAPACITANCE TEST ON LV BUSHING</h3>
    <table className="form-table">
      <thead>
        <tr>
          <th></th>
          <th>2.1</th>
          <th>2.2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>BUSHING SR. NO.LV</strong></td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_srNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_srNo || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Status</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>AT 05 KV PHASE</th>
          <th>TAN DELTA in %</th>
          <th>CAPACITANCE (pF)</th>
          <th>EXCITATION CURRENT (mA)</th>
          <th>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>2.1</strong></td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_05kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_05kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_05kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_05kv_dielectricLoss || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>2.2</strong></td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_05kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_05kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_05kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_05kv_dielectricLoss || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table">
      <thead>
        <tr>
          <th>AT 10 KV PHASE</th>
          <th>TAN DELTA in %</th>
          <th>CAPACITANCE (pF)</th>
          <th>EXCITATION CURRENT (mA)</th>
          <th>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>2.1</strong></td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_10kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_10kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_10kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing21_10kv_dielectricLoss || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td><strong>2.2</strong></td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_10kv_tanDelta || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_10kv_capacitance || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_10kv_excitationCurrent || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lvBushing22_10kv_dielectricLoss || ""}
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
        Tan Delta Kit, Calibration Report, During Tan Delta of bushing photo
      </p>

      {formData.photos && (
        <div className="photo-display-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "10px"
        }}>
          {Object.entries(formData.photos).map(([photoKey, url]) => {
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
      )}
    </div>
  </div>
);


const Stage1Form7 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>RECORD OF MEASUREMENT OF IR VALUES</h2>
    </div>
    <h3>Before Erection</h3>

    <table className="form-table">
      <tbody>
        <tr>
          <td><strong>Date</strong></td>
          <td>
            <input type="text" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td><strong>Time</strong></td>
          <td>
            <input type="text" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td><strong>Amb Temp:</strong></td>
          <td>
            <input type="text" value={formData.ambTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td><strong>Make:</strong></td>
          <td>
            <input type="text" value={formData.make || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td><strong>Oil Temp:</strong></td>
          <td>
            <input type="text" value={formData.oilTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td><strong>Sr No:</strong></td>
          <td>
            <input type="text" value={formData.srNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td><strong>Wdg. Temp:</strong></td>
          <td>
            <input type="text" value={formData.wdgTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td><strong>Range:</strong></td>
          <td>
            <input type="text" value={formData.range || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td><strong>Relative Humidity</strong></td>
          <td>
            <input
              type="text"
              value={formData.relativeHumidity || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td><strong>Voltage Level:</strong></td>
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

    <table className="form-table">
      <thead>
        <tr>
          <th> </th>
          <th>10 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>Ratio of IR 60/IR 10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>HV-Earth</strong></td>
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
          <td><strong>LV-Earth</strong></td>
          <td>
            <input type="text" value={formData.lvEarth_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lvEarth_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.lvEarth_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td><strong>HV-LV</strong></td>
          <td>
            <input type="text" value={formData.hvLv_10sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv_60sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td>
            <input type="text" value={formData.hvLv_ratio || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Photo Upload Section for Review */}
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

// Stage 2 Form 1: Record of Oil Handling
const Stage2Form1 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>RECORD OF OIL HANDLING</h2>
      <h3>TEST VALUES PRIOR TO FILTERATION</h3>
    </div>

    <h4>Record of Oil Filling in the Reservoirs Tank:</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th></th>
          <th>No of barrels</th>
          <th>Started on Date & time</th>
          <th>Completed on Date & time</th>
          <th>BDV</th>
          <th>PPM</th>
        </tr>
      </thead>
      <tbody>
        {[
          { label: "Tank1", prefix: "tank1" },
          { label: "Tank2", prefix: "tank2" },
          { label: "Tank3", prefix: "tank3" },
        ].map(({ label, prefix }) => (
          <tr key={prefix}>
            <td>
              <strong>{label}</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData?.[`${prefix}_noOfBarrels`] || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData?.[`${prefix}_startedDate`] || ""}
                  disabled
                  className="form-input disabled preview"
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData?.[`${prefix}_startedTime`] || ""}
                  disabled
                  className="form-input disabled preview"
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData?.[`${prefix}_completedDate`] || ""}
                  disabled
                  className="form-input disabled preview"
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData?.[`${prefix}_completedTime`] || ""}
                  disabled
                  className="form-input disabled preview"
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <input
                type="text"
                value={formData?.[`${prefix}_bdv`] || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={formData?.[`${prefix}_ppm`] || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>Reservoir Tank Filtration</h4>
    <table className="form-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Vacuum Level (MM/HG or torr)</th>
          <th>Inlet Temp.</th>
          <th>Outlet Temp.</th>
        </tr>
      </thead>
      <tbody>
        {formData.filtrationRecords &&
          formData.filtrationRecords.map((record, index) => (
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
                  value={record.inletTemp || ""}
                  disabled
                  className="form-input disabled preview"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.outletTemp || ""}
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

const Stage2Form2 = ({ formData }) => (
  <div className="form-container">
    <div className="company-header">
      <h2>Line Lead Clearance in mm :-</h2>
    </div>

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
            <input
              type="text"
              value={formData.hv_earth_11 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hv_earth_12 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV 1 with respect to earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1_earth_21 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1_earth_22 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV 2 with respect to earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2_earth_31 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2_earth_32 || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h3 style={{ marginTop: "40px", textAlign: "center" }}>
      IR Values After erection Temp OTI .......°C WTI.............°C, AMB .............°C RANGE ONLY 1 KV
    </h3>

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
            <strong>LV1-Earth</strong>
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
            <strong>LV2-Earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2Earth_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2Earth_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2Earth_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>HV-LV1</strong>
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
        <tr>
          <td>
            <strong>HV-LV2</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv2_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv2_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv2_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV1-LV2</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Lv2_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Lv2_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Lv2_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>Before oil filling in main tank</h4>
    <table className="form-table">
      <tbody>
        <tr>
          <td>
            <strong>BDV (KV)</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.bdv || ""}
              disabled
              className="form-input disabled preview"
            />
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
          <td><strong>Vacuum hose Checked By</strong></td>
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
          <td><strong>Vacuum hose Connected To</strong></td>
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
          <td><strong>Evacuation Started At</strong></td>
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

    <table className="form-table">
      <tbody>
        <tr>
          <td><strong>Temp OTI °C</strong></td>
          <td>
            <input type="text" value={formData.tempOTI || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td><strong>Temp WTI °C</strong></td>
          <td>
            <input type="text" value={formData.tempWTI || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td><strong>Temp AMB °C</strong></td>
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
          <th>15 Sec (MΩ)</th>
          <th>60 Sec (MΩ)</th>
          <th>Ratio of IR 60/IR 15</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>HV-Earth</strong></td>
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
          <td><strong>LV1-Earth</strong></td>
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
          <td><strong>LV2-Earth</strong></td>
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
          <td><strong>HV-LV1</strong></td>
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
          <td><strong>HV-LV2</strong></td>
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
          <td><strong>LV1-LV2</strong></td>
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

    <table className="form-table">
      <tbody>
        <tr>
          <td><strong>DATE</strong></td>
          <td>
            <input
              type="date"
              value={formData.pressureTestDate || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>

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
            <td><strong>{index + 1}</strong></td>
            <td>
              <input
                type="time"
                value={test.timeStarted || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={test.pressure || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={test.tempAmb || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={test.tempOti || ""}
                disabled
                className="form-input disabled preview"
              />
            </td>
            <td>
              <input
                type="text"
                value={test.tempWti || ""}
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

// Stage 3 Form 2: Record for Oil Filtration - Main Tank
const Stage3Form2 = ({ formData }) => (
  <div>
    <div className="company-header">
      <h2>RECORD FOR OIL FILTRATION</h2>
      <h2>Oil filtration of Main Tank</h2>
    </div>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Date</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Time</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Vacuum Level (mm/hg or torr)</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>M/C Outlet Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>OTI Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>WTI Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Remark</th>
        </tr>
      </thead>
      <tbody>
        {formData.filtrationRecords && formData.filtrationRecords.map((record, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="date" value={record.date || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="time" value={record.time || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.vacuumLevel || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.mcOutletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.otiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.wtiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.remark || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>
      IR Value before radiators/combine filtration , Temp OTI ........°C WTI............°C, AMB........°C RANGE ONLY 1 KV
    </h4>

    <div className="form-grid" style={{ marginBottom: "20px" }}>
      <div className="form-group">
        <label>OTI Temperature (°C):</label>
        <input type="text" value={formData.tempOTI || ""} disabled className="form-input disabled preview" />
      </div>
      <div className="form-group">
        <label>WTI Temperature (°C):</label>
        <input type="text" value={formData.tempWTI || ""} disabled className="form-input disabled preview" />
      </div>
      <div className="form-group">
        <label>AMB Temperature (°C):</label>
        <input type="text" value={formData.tempAMB || ""} disabled className="form-input disabled preview" />
      </div>
    </div>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>15 Sec MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>60 Sec MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Ratio of IR 60/IR 15</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>HV-Earth</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth15Sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth60Sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.ratioIR60IR15 || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

// Stage 3 Form 3: Oil Filtration of Radiator and Combine
const Stage3Form3 = ({ formData }) => (
  <div>
    <div className="company-header">
      <h2>Oil filtration of Radiator</h2>
    </div>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Date</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Time</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Vacuum Level (mm/hg or torr)</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>M/C Outlet Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>OTI Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>WTI Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Remark</th>
        </tr>
      </thead>
      <tbody>
        {formData.radiatorRecords && formData.radiatorRecords.map((record, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="date" value={record.date || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="time" value={record.time || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.vacuumLevel || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.mcOutletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.otiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.wtiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.remark || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>
      Oil filtration of Combine (Main Tank + Cooler bank)
    </h4>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Date</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Time</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Vacuum Level (mm/hg or torr)</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>M/C Outlet Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>OTI Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>WTI Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Remark</th>
        </tr>
      </thead>
      <tbody>
        {formData.combineRecords && formData.combineRecords.map((record, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="date" value={record.date || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="time" value={record.time || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.vacuumLevel || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.mcOutletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.otiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.wtiTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.remark || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>After Oil Filtration of main tank</h4>

    <div className="form-grid" style={{ marginBottom: "20px" }}>
      <div className="form-group">
        <label><strong>BDV: _____ KV</strong></label>
        <input type="text" value={formData.bdvKV || ""} disabled className="form-input disabled preview" />
      </div>
      <div className="form-group">
        <label><strong>Water Content: _______ PPM</strong></label>
        <input type="text" value={formData.waterContentPPM || ""} disabled className="form-input disabled preview" />
      </div>
    </div>

    <h4 style={{ marginTop: "40px" }}>
      PI Value after filteration, Temp OTI ........°C WTI............°C, AMB........°C RANGE ONLY 5 KV
    </h4>

    <div className="form-grid" style={{ marginBottom: "20px" }}>
      <div className="form-group">
        <label>OTI Temperature (°C):</label>
        <input type="text" value={formData.tempOTI || ""} disabled className="form-input disabled preview" />
      </div>
      <div className="form-group">
        <label>WTI Temperature (°C):</label>
        <input type="text" value={formData.tempWTI || ""} disabled className="form-input disabled preview" />
      </div>
      <div className="form-group">
        <label>AMB Temperature (°C):</label>
        <input type="text" value={formData.tempAMB || ""} disabled className="form-input disabled preview" />
      </div>
    </div>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>15 Sec MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>60 Sec MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>600 sec MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>600/60 sec MΩ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>HV-Earth</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth15Sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth60Sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth600Sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth60600Sec || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>
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
            <strong>Time</strong>
          </td>
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
          <td>
            <strong>Insulation Tester Details</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.insulationTesterDetails || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
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
            <strong>LV1-Earth</strong>
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
            <strong>LV2-Earth</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2Earth_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2Earth_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv2Earth_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>HV-LV1</strong>
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
        <tr>
          <td>
            <strong>HV-LV2</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv2_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv2_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.hvLv2_ratio || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>LV1-LV2</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Lv2_15sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Lv2_60sec || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
          <td>
            <input
              type="text"
              value={formData.lv1Lv2_ratio || ""}
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
            <strong>Date</strong>
          </td>
          <td>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Time</strong>
          </td>
          <td>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Insulation Tester Details</strong>
          </td>
          <td>
            <input
              type="text"
              value={formData.insulationTesterDetails || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
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
            <input type="text" value={formData.lv2Earth_pi || ""} disabled className="form-input disabled preview" />
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
            <input type="text" value={formData.hvLv2_pi || ""} disabled className="form-input disabled preview" />
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
            <input type="text" value={formData.lv1Lv2_pi || ""} disabled className="form-input disabled preview" />
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

// Stage 4 Review Renderer Component
const Stage4ReviewRenderer = ({ formDataFromDB, formatLabel }) => {
  const stage4Forms = [
    {
      id: "sfra-test-record",
      title: "SFRA Test Record",
      fields: [
        { name: "makeOfMeter", label: "MAKE OF METER", type: "text" },
        { name: "date", label: "DATE", type: "date" },
        { name: "modelSrNo", label: "MODEL & S. NO.", type: "text" },
        { name: "ambient", label: "AMBIENT", type: "text" },
        { name: "oti", label: "OTI", type: "text" },
        { name: "wti", label: "WTI", type: "text" },
        { name: "testReportReviewed", label: "Test report reviewed by", type: "text" },
        { name: "acceptanceOfTest", label: "Acceptance of the test", type: "text" }
      ]
    },
    {
      id: "ir-voltage-ratio-magnetising-test",
      title: "Record of Measurement of IR Values & Voltage Ratio Test",
      fields: [
        { name: "date", label: "Date", type: "date" },
        { name: "time", label: "Time", type: "time" },
        { name: "ambTemp", label: "Amb. Temp", type: "text" },
        { name: "make", label: "Make", type: "text" },
        { name: "oilTemp", label: "Oil Temp.", type: "text" },
        { name: "srNo", label: "Sr. No.", type: "text" },
        { name: "voltageRatioTest_table1_11_12", label: "Voltage Ratio 1.1-1.2", type: "text" },
        { name: "voltageRatioTest_table1_11_21", label: "Voltage Ratio 1.1-2.1", type: "text" },
        { name: "voltageRatioTest_table1_12_21", label: "Voltage Ratio 1.2-2.1", type: "text" }
      ]
    },
    {
      id: "short-circuit-test",
      title: "Short Circuit Test",
      fields: [
        { name: "appliedVoltage", label: "APPLIED VOLTAGE", type: "text" },
        { name: "date", label: "DATE", type: "date" },
        { name: "time", label: "TIME", type: "time" },
        { name: "meterMakeSrNo", label: "METER MAKE SR. NO.", type: "text" },
        { name: "appliedVoltageHV", label: "Applied Voltage HV", type: "text" },
        { name: "ratedCurrentLV", label: "Rated Current LV", type: "text" },
        { name: "percentZ", label: "%Z", type: "text" },
        { name: "ratedVoltageHV", label: "Rated voltage HV", type: "text" }
      ]
    },
    {
      id: "winding-resistance-ir-pi-test",
      title: "Winding Resistance Test and Record of Measurement of IR & PI Values",
      fields: [
        { name: "meterUsed", label: "METER USED", type: "text" },
        { name: "date", label: "DATE", type: "date" },
        { name: "time", label: "TIME", type: "time" },
        { name: "winding11_12", label: "1.1 – 1.2", type: "text" },
        { name: "winding11_21", label: "1.1 - 2.1", type: "text" },
        { name: "winding21_12", label: "2.1 – 1.2", type: "text" },
        { name: "hvEarth10Sec", label: "HV-Earth 10 Sec MΩ", type: "text" },
        { name: "hvEarth60Sec", label: "HV-Earth 60 Sec MΩ", type: "text" },
        { name: "hvEarth600Sec", label: "HV-Earth 600 Sec MΩ", type: "text" },
        { name: "ratioIR60IR10", label: "Ratio of IR 60/IR 10", type: "text" },
        { name: "ratioIR600IR60", label: "Ratio of IR 600/60", type: "text" }
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
    <div className="stage4-review-container">
      {stage4Forms.map((form, formIndex) => {
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
            {form.id === "sfra-test-record" ? (
              <Stage4Form1 formData={formData} />
            ) : form.id === "ir-voltage-ratio-magnetising-test" ? (
              <Stage4Form2 formData={formData} />
            ) : form.id === "short-circuit-test" ? (
              <Stage4Form3 formData={formData} />
            ) : form.id === "winding-resistance-ir-pi-test" ? (
              <Stage4Form4 formData={formData} />
            ) : (
              <div className="form-grid-preview" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}>
                {form.fields.map((field) => (
                  <div key={`${form.id}-${field.name}`} className="form-group-preview">
                    <label className="form-label-preview">
                      {formatLabel(field.label)}
                    </label>
                    <div className="form-input-display">
                      <input
                        type={field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
                        value={formData[field.name] || ""}
                        disabled
                        className="form-input disabled preview"
                      />
                    </div>
                  </div>
                ))}
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

// Stage 5 Form Components (for review display)
const Stage5Form1 = ({ formData }) => (
  <div>
    <div className="company-header">
      <h2>PRE-CHARGING CHECK LIST</h2>
    </div>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Sr.N.</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Particulars</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Qty.</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Status</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>I</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Valve Status</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        {[
          { id: "A", description: "Bucholz to Conservator" },
          { id: "B", description: "Main Tank to Bucholz" },
          { id: "C", description: "Radiator Top Valves" },
          { id: "D", description: "Radiator Bottom Valves" },
          { id: "E", description: "Top Filter Valve" },
          { id: "F", description: "Bottom Filter Valve" },
          { id: "G", description: "Drain Valve" },
        ].map((item) => (
          <tr key={item.id}>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.id}</td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.description}</td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={formData.valveStatus?.[item.id]?.qty || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={formData.valveStatus?.[item.id]?.status || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          </tr>
        ))}
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>II</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Air Venting Done from Following Locations:</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        {[
          { id: "1", description: "Main Tank" },
          { id: "2", description: "Bucholz Relay" },
          { id: "3", description: "HV Bushing" },
          { id: "4", description: "LV Bushing" },
          { id: "5", description: "Neutral Bushing" },
          { id: "6", description: "Radiator – Top" },
        ].map((item) => (
          <tr key={item.id}>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.id}</td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.description}</td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={formData.airVenting?.[item.id]?.qty || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={formData.airVenting?.[item.id]?.status || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          </tr>
        ))}
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>III</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Protection Trails</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Checked</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        {[
          { id: "1", description: "Buchholz checked by oil draining", type: "ALARM" },
          { id: "1b", description: "Buchholz checked by oil draining", type: "TRIP" },
          { id: "2", description: "MOG", type: "ALARM" },
          { id: "3", description: "PRV MAIN TANK", type: "TRIP" },
          { id: "4", description: "OTI", type: "ALARM" },
          { id: "4b", description: "OTI", type: "TRIP" },
          { id: "5", description: "WTI", type: "ALARM" },
          { id: "5b", description: "WTI", type: "TRIP" },
        ].map((item) => (
          <tr key={`${item.id}-${item.type}`}>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.id}</td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.description}</td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.type}</td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={formData.protectionTrails?.[`${item.id}-${item.type}`]?.checked || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>TRIP</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>IV</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Bushing Test Tap</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>HV</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>LV</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Test Cap Earthed</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushingTestTap?.hvTestCapEarthed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushingTestTap?.lvTestCapEarthed || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Stage5Form2 = ({ formData }) => (
  <div>
    <div className="company-header">
      <h2>PRE-CHARGING CHECK LIST - PART 2</h2>
    </div>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Oil Values</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>V</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>BDV</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bdvKV || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>KV</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>2</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Moisture Content</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.moistureContentPPM || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>PPM</td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Final IR Values</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>15 sec MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>60 sec MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>600 sec MΩ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>VI</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>HV – E</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth15Sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth60Sec || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvEarth600Sec || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>VII</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Oil Level of conservator</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.oilLevelConservator || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>VIII</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>HV Jumpers connected</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hvJumpersConnected || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>IX</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>LV Jumpers connected</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.lvJumpersConnected || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>X</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Incoming LA Counter</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.incomingLACounter || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>XI</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Outgoing LA Counter</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.outgoingLACounter || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>XII</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>All CT Cable Terminated and Glands Sealed</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.allCTCableTerminated || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>XIII</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Protection relays checked through breaker tripping</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.protectionRelaysChecked || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>1</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Anabond applied to HV Bushings</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.anabondAppliedHVBushings || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>2</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>All joints properly sealed against Water Ingress</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.allJointsSealed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>3</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>All Foreign material cleared from Transformer</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.allForeignMaterialCleared || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
        </tr>
      </tbody>
    </table>

    <table className="form-table" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Temperature of</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>°C</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>WTI</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.temperatureWTI || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>OTI</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.temperatureOTI || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <div style={{ marginTop: "30px" }}>
      <h4><strong>Remarks:</strong></h4>
      <div style={{ border: "1px solid #e5e7eb", padding: "10px", borderRadius: "4px", backgroundColor: "#f9fafb" }}>
        <p style={{ margin: 0, lineHeight: "1.6" }}>
          {formData.remarks || "The Transformer as mentioned above has been jointly cleared for charging as on _____. All the necessary pre-commissioning checks and protection trials have been found satisfactory. Transformer has been cleared from all foreign material and is ready for charging."}
        </p>
      </div>
    </div>
  </div>
);

// Stage 5 Review Renderer Component
const Stage5ReviewRenderer = ({ formDataFromDB, formatLabel }) => {
  const stage5Forms = [
    {
      id: "pre-charging-checklist",
      title: "Pre-Charging Check List",
      fields: [
        { name: "valveStatus", label: "Valve Status", type: "nested-object" },
        { name: "airVenting", label: "Air Venting", type: "nested-object" },
        { name: "protectionTrails", label: "Protection Trails", type: "nested-object" },
        { name: "bushingTestTap", label: "Bushing Test Tap", type: "nested-object" }
      ]
    },
    {
      id: "pre-charging-checklist-part2",
      title: "Pre-Charging Check List - Part 2",
      fields: [
        { name: "bdvKV", label: "BDV (KV)", type: "text" },
        { name: "moistureContentPPM", label: "Moisture Content (PPM)", type: "text" },
        { name: "hvEarth15Sec", label: "HV-Earth 15 Sec MΩ", type: "text" },
        { name: "hvEarth60Sec", label: "HV-Earth 60 Sec MΩ", type: "text" },
        { name: "hvEarth600Sec", label: "HV-Earth 600 Sec MΩ", type: "text" },
        { name: "oilLevelConservator", label: "Oil Level of conservator", type: "text" },
        { name: "hvJumpersConnected", label: "HV Jumpers connected", type: "text" },
        { name: "lvJumpersConnected", label: "LV Jumpers connected", type: "text" },
        { name: "incomingLACounter", label: "Incoming LA Counter", type: "text" },
        { name: "outgoingLACounter", label: "Outgoing LA Counter", type: "text" },
        { name: "temperatureWTI", label: "Temperature WTI", type: "text" },
        { name: "temperatureOTI", label: "Temperature OTI", type: "text" },
        { name: "remarks", label: "Remarks", type: "textarea" }
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
            {form.id === "pre-charging-checklist" ? (
              <Stage5Form1 formData={formData} />
            ) : form.id === "pre-charging-checklist-part2" ? (
              <Stage5Form2 formData={formData} />
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

// Stage 2 Review Renderer Component
const Stage2ReviewRenderer = ({ formDataFromDB, formatLabel }) => {
  const stage2Forms = [
    {
      id: "record-oil-handling",
      title: "Record of Oil Handling - Test Values Prior to Filteration",
      fields: [
        { name: "tank1StartedDateTime", label: "Tank1 Started Date & Time", type: "datetime-local" },
        { name: "tank1CompletedDateTime", label: "Tank1 Completed Date & Time", type: "datetime-local" },
        { name: "oilTemperature", label: "Oil Temperature", type: "text" },
        { name: "ambientTemperature", label: "Ambient Temperature", type: "text" },
        { name: "oilLevel", label: "Oil Level", type: "text" },
        { name: "filtrationMethod", label: "Filtration Method", type: "text" },
        { name: "remarks", label: "Remarks", type: "textarea" }
      ]
    },
    {
      id: "ir-after-erection-stage2",
      title: "IR After Erection - Stage 2 End",
      fields: [
        { name: "date", label: "Date", type: "date" },
        { name: "time", label: "Time", type: "time" },
        { name: "ambTemp", label: "Amb. Temp", type: "text" },
        { name: "make", label: "Make", type: "text" },
        { name: "oilTemp", label: "Oil Temp.", type: "text" },
        { name: "srNo", label: "Sr. No.", type: "text" },
        { name: "wdgTemp", label: "Wdg. Temp.", type: "text" },
        { name: "range", label: "Range", type: "text" },
        { name: "relativeHumidity", label: "Relative Humidity", type: "text" },
        { name: "voltageLevel", label: "Voltage Level", type: "text" },
        { name: "hvEarth15Sec", label: "HV-Earth 15 Sec MΩ", type: "text" },
        { name: "hvEarth60Sec", label: "HV-Earth 60 Sec MΩ", type: "text" },
        { name: "hvEarthRatio", label: "HV-Earth Ratio", type: "text" },
        { name: "lvEarth15Sec", label: "LV-Earth 15 Sec MΩ", type: "text" },
        { name: "lvEarth60Sec", label: "LV-Earth 60 Sec MΩ", type: "text" },
        { name: "lvEarthRatio", label: "LV-Earth Ratio", type: "text" },
        { name: "hvLv15Sec", label: "HV-LV 15 Sec MΩ", type: "text" },
        { name: "hvLv60Sec", label: "HV-LV 60 Sec MΩ", type: "text" },
        { name: "hvLvRatio", label: "HV-LV Ratio", type: "text" }
      ]
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
            type={field.type === "date" ? "date" : field.type === "time" ? "time" : field.type === "datetime-local" ? "datetime-local" : "text"}
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
    <div className="stage2-review-container">
      {stage2Forms.map((form, formIndex) => {
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
            {form.id === "record-oil-handling" ? (
              <Stage2Form1 formData={formData} />
            ) : form.id === "ir-after-erection-stage2" ? (
              <Stage2Form2 formData={formData} />
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
      id: "record-of-measurement-of-ir-values",
      title: "RECORD OF MEASUREMENT OF IR VALUES",
      fields: [
        { name: "date", label: "Date", type: "text" },
        { name: "time", label: "Time", type: "text" },
        { name: "ambTemp", label: "Amb Temp", type: "text" },
        { name: "make", label: "Make", type: "text" },
        { name: "oilTemp", label: "Oil Temp", type: "text" },
        { name: "srNo", label: "Sr No", type: "text" },
        { name: "wdgTemp", label: "Wdg Temp", type: "text" },
        { name: "range", label: "Range", type: "text" },
        { name: "relativeHumidity", label: "Relative Humidity", type: "text" },
        { name: "voltageLevel", label: "Voltage Level", type: "text" }
      ]
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
              <Stage1Form6 formData={formData} />
            ) : form.id === "record-of-measurement-of-ir-values" ? (
              <Stage1Form7 formData={formData} />
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

// Stage 6 Form Component (for review display)
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

const TractionTransformerStageReviewPanel = ({
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
        return <Stage1ReviewRenderer 
          formDataFromDB={formDataFromDB} 
          formatLabel={formatLabel}
        />;
      case 2:
        return <Stage2ReviewRenderer 
          formDataFromDB={formDataFromDB} 
          formatLabel={formatLabel}
        />;
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
  Stage2Form1,
  Stage2Form2,
  Stage3Form1,
  Stage3Form2,
  Stage3Form3,
  Stage4Form1,
  Stage4Form2,
  Stage4Form3,
  Stage4Form4,
  Stage5Form1,
  Stage5Form2,
  Stage6Form1,
  Stage1ReviewRenderer,
  Stage2ReviewRenderer,
  Stage3ReviewRenderer,
  Stage4ReviewRenderer,
  Stage5ReviewRenderer,
  Stage6ReviewRenderer
};

export default TractionTransformerStageReviewPanel;
