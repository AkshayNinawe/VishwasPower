import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to format labels
function formatLabel(raw) {
  if (raw === undefined || raw === null) return "";
  let s = String(raw);
  s = s.replace(/[_-]+/g, " ");
  s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
  s = s.replace(/([A-Za-z])(\d)/g, "$1 $2").replace(/(\d)([A-Za-z])/g, "$1 $2");
  s = s.replace(/\s+/g, " ").trim();
  const lower = s.toLowerCase();
  if (lower === "srno" || lower === "sr no") return "Sr No";
  const ACRONYMS = /^(id|kv|kva|kvah|kvar|dc|ac)$/i;
  return s
    .split(" ")
    .map((w) => (ACRONYMS.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

// Generate photo thumbnails
function generatePhotoThumbnails(photos, baseUrl = "") {
  if (!photos || Object.keys(photos).length === 0) {
    return "";
  }

  const photoItems = Object.entries(photos)
    .map(([key, photoPath]) => {
      const fullPath = photoPath.startsWith("http") ? photoPath : `${baseUrl}/${photoPath}`;
      return `
        <div class="photo-upload-item">
          <label>${formatLabel(key)}</label>
          <img src="${fullPath}" 
               style="max-width: 150px; max-height: 150px; object-fit: cover; 
                      border-radius: 8px; border: 2px solid #e2e8f0;" 
               onerror="this.style.display='none'" />
        </div>
      `;
    })
    .join("");

  return `
    <div class="photo-upload-section" style="page-break-inside: avoid;">
      <h4>Attached Photos</h4>
      <div class="photo-upload-grid">
        ${photoItems}
      </div>
    </div>
  `;
}

// Generate signature section
function generateSignatureSection(signatures) {
  if (!signatures) return "";

  return `
    <div class="signature-section" style="page-break-inside: avoid;">
      <div class="signature-box">
        <label>VPES Representative</label>
        <p><strong>Name:</strong> ${signatures.vpesName || ""}</p>
        <p><strong>Designation:</strong> ${signatures.vpesDesignation || ""}</p>
        ${
          signatures.vpesSignature
            ? `<div style="margin: 15px 0;">
                 <img src="${signatures.vpesSignature}" 
                      style="max-width: 200px; height: 80px; border: 2px solid #e2e8f0; border-radius: 8px;" />
               </div>`
            : ""
        }
        <p><strong>Date:</strong> ${signatures.vpesDate || ""}</p>
      </div>
      
      <div class="signature-box">
        <label>Customer Representative</label>
        <p><strong>Name:</strong> ${signatures.customerName || ""}</p>
        <p><strong>Designation:</strong> ${signatures.customerDesignation || ""}</p>
        ${
          signatures.customerSignature
            ? `<div style="margin: 15px 0;">
                 <img src="${signatures.customerSignature}" 
                      style="max-width: 200px; height: 80px; border: 2px solid #e2e8f0; border-radius: 8px;" />
               </div>`
            : ""
        }
        <p><strong>Date:</strong> ${signatures.customerDate || ""}</p>
      </div>
    </div>
  `;
}

// Helper function to safely render any value type
function renderValue(value) {
  if (value === undefined || value === null) {
    return "";
  }
  
  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) return "<em>Empty</em>";
    
    // Check if array contains objects
    if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
      return renderArrayOfObjects(value);
    }
    
    // Array of primitives - render as comma-separated list
    return value.map(v => String(v)).join(", ");
  }
  
  // Handle objects
  if (typeof value === "object") {
    return renderNestedObject(value);
  }
  
  // Handle booleans
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  
  // Handle primitives
  return String(value);
}

// Render array of objects as a nested table
function renderArrayOfObjects(array) {
  if (array.length === 0) return "<em>No data</em>";
  
  // Get all unique keys from all objects
  const allKeys = [...new Set(array.flatMap(obj => Object.keys(obj)))];
  
  const headerRow = allKeys.map(key => `<th>${formatLabel(key)}</th>`).join("");
  
  const dataRows = array.map(obj => {
    const cells = allKeys.map(key => {
      const value = obj[key];
      return `<td>${renderValue(value)}</td>`;
    }).join("");
    return `<tr>${cells}</tr>`;
  }).join("");
  
  return `
    <table class="form-table" style="margin: 10px 0; width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
          ${headerRow}
        </tr>
      </thead>
      <tbody>
        ${dataRows}
      </tbody>
    </table>
  `;
}

// Render nested object as key-value pairs
function renderNestedObject(obj) {
  if (!obj || Object.keys(obj).length === 0) return "<em>Empty</em>";
  
  const rows = Object.entries(obj)
    .filter(([key]) => key !== "photos" && key !== "signatures")
    .map(([key, value]) => `
      <div style="margin: 5px 0; padding: 8px; background: #f7fafc; border-radius: 4px;">
        <strong>${formatLabel(key)}:</strong> ${renderValue(value)}
      </div>
    `).join("");
  
  return `<div style="margin: 10px 0;">${rows}</div>`;
}

// Generate a generic table from data
function generateDataTable(data, title = "") {
  if (!data || typeof data !== "object") return "";

  // Filter out photos and signatures
  const entries = Object.entries(data).filter(
    ([key]) => key !== "photos" && key !== "signatures"
  );

  if (entries.length === 0) return "";

  const rows = entries
    .map(
      ([key, value]) => `
    <tr>
      <td style="vertical-align: top; width: 30%;"><strong>${formatLabel(key)}</strong></td>
      <td style="vertical-align: top; width: 70%;">${renderValue(value)}</td>
    </tr>
  `
    )
    .join("");

  return `
    ${title ? `<h3 style="margin-top: 30px; color: #2d3748;">${title}</h3>` : ""}
    <table class="form-table" style="page-break-inside: avoid;">
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

// Generate Stage 1 Form 1 - Name Plate Details
function generateStage1Form1(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>NAME PLATE DETAILS TRANSFORMER</h2>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>MAKE</strong></td>
            <td>${formData.make || ""}</td>
            <td><strong>CURRENT HV (A)</strong></td>
            <td>${formData.currentHV || ""}</td>
          </tr>
          <tr>
            <td><strong>SR. NO.</strong></td>
            <td>${formData.srNo || ""}</td>
            <td><strong>LV (A)</strong></td>
            <td>${formData.currentLV || ""}</td>
          </tr>
          <tr>
            <td><strong>MVA Rating</strong></td>
            <td>${formData.mvaRating || ""}</td>
            <td><strong>Temp. Rise over amb. In Oil °C</strong></td>
            <td>${formData.tempRiseOil || ""}</td>
          </tr>
          <tr>
            <td><strong>HV (KV)</strong></td>
            <td>${formData.hvKv || ""}</td>
            <td><strong>Winding</strong></td>
            <td>${formData.winding || ""}</td>
          </tr>
          <tr>
            <td><strong>LV (KV)</strong></td>
            <td>${formData.lvKv || ""}</td>
            <td><strong>Transporting weight</strong></td>
            <td>${formData.transportingWeight || ""}</td>
          </tr>
          <tr>
            <td><strong>% Impedance</strong></td>
            <td>${formData.impedancePercent || ""}</td>
            <td><strong>No. Of radiators</strong></td>
            <td>${formData.noOfRadiators || ""}</td>
          </tr>
          <tr>
            <td><strong>Year of Mfg.</strong></td>
            <td>${formData.yearOfMfg || ""}</td>
            <td><strong>Weight of Core & Winding.</strong></td>
            <td>${formData.weightCoreWinding || ""}</td>
          </tr>
          <tr>
            <td><strong>Oil Quantity in liter</strong></td>
            <td>${formData.oilQuantityLiter || ""}</td>
            <td><strong>Total Weight</strong></td>
            <td>${formData.totalWeight || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 1 Form 2 - Protocol for Accessories Checking
function generateStage1Form2(formData) {
  if (!formData) return "";

  // Accessory items matching the form exactly
  const accessoryItems = [
    { id: 1, description: "HV bushing" },
    { id: 2, description: "LV Bushing" },
    { id: 3, description: "Neutral bushing" },
    { id: 4, description: "Buchholz" },
    { id: 5, description: "PRV" },
    { id: 6, description: "CPR" },
    { id: 7, description: "Breather" },
    { id: 8, description: "Bushing Connector" },
    { id: 9, description: "Radiators" },
  ];

  // Generate table rows for accessories
  const accessoryRows = accessoryItems.map(item => {
    const accessoryData = formData.accessories && formData.accessories[item.id] ? formData.accessories[item.id] : {};
    return `
      <tr>
        <td style="text-align: center;"><strong>${item.id}</strong></td>
        <td>${accessoryData.packingCase || ""}</td>
        <td><strong>${item.description}</strong></td>
        <td>${accessoryData.qtyPerPL || ""}</td>
        <td>${accessoryData.qtyReceived || ""}</td>
        <td>${accessoryData.shortQty || ""}</td>
        <td>${accessoryData.damagedQty || ""}</td>
      </tr>
    `;
  }).join("");

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>PROTOCOL FOR ACCESSORIES CHECKING</h2>
      </div>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th style="text-align: center;">No</th>
            <th>Packing case Number</th>
            <th>Material Description</th>
            <th>Qty as per P. L.</th>
            <th>Qty. Received</th>
            <th>Short Qty</th>
            <th>Damaged Qty.</th>
          </tr>
        </thead>
        <tbody>
          ${accessoryRows}
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 1 Form 3 - Core Insulation Check
function generateStage1Form3(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>CORE INSULATION CHECK: At 1 KV > 500 MΩ</h2>
      </div>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>Obtained Value MΩ</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Between Core – frame</strong></td>
            <td>${formData.betweenCoreFrame || ""}</td>
            <td>${formData.betweenCoreFrameRemarks || ""}</td>
          </tr>
          <tr>
            <td><strong>Between Frame – tank</strong></td>
            <td>${formData.betweenFrameTank || ""}</td>
            <td>${formData.betweenFrameTankRemarks || ""}</td>
          </tr>
          <tr>
            <td><strong>Between core – tank</strong></td>
            <td>${formData.betweenCoreTank || ""}</td>
            <td>${formData.betweenCoreTankRemarks || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px; text-align: center;">CHECKLIST FOR CONFORMING AVAILABILITY OF EQUIPMENT AT SITE</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>Description</th>
            <th>Rating/capacity</th>
            <th>Checked by</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>2.</strong></td>
            <td><strong>Whether the Filter Machine is Available</strong></td>
            <td>${formData.filterMachine || ""}</td>
            <td>${formData.filterMachineChecked || ""}</td>
          </tr>
          <tr>
            <td><strong>3.</strong></td>
            <td><strong>Capacity of Filter Machine</strong></td>
            <td>${formData.filterCapacity || ""}</td>
            <td>${formData.filterCapacityChecked || ""}</td>
          </tr>
          <tr>
            <td><strong>4.</strong></td>
            <td><strong>Capacity of the Vacuum Pump to be used.</strong></td>
            <td>${formData.vacuumPumpCapacity || ""}</td>
            <td>${formData.vacuumPumpCapacityChecked || ""}</td>
          </tr>
          <tr>
            <td><strong>5.</strong></td>
            <td><strong>Whether the Reservoir is Available with valves and a breather.</strong></td>
            <td>${formData.reservoirAvailable || ""}</td>
            <td>${formData.reservoirAvailableChecked || ""}</td>
          </tr>
          <tr>
            <td><strong>6.</strong></td>
            <td><strong>Capacity of Reservoirs.</strong></td>
            <td>${formData.reservoirCapacity || ""}</td>
            <td>${formData.reservoirCapacityChecked || ""}</td>
          </tr>
          <tr>
            <td><strong>8.</strong></td>
            <td><strong>Hose Pipes for the Filtration Process.</strong></td>
            <td>${formData.hosePipes || ""}</td>
            <td>${formData.hosePipesChecked || ""}</td>
          </tr>
          <tr>
            <td><strong>9.</strong></td>
            <td><strong>Whether Crane is Available in good condition</strong></td>
            <td>${formData.craneAvailable || ""}</td>
            <td>${formData.craneAvailableChecked || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 30px; text-align: center;">SAFETY EQUIPMENT</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Descriptions</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Fire extinguisher/ Fire sand bucket</strong></td>
            <td>${formData.fireExtinguisher || ""}</td>
          </tr>
          <tr>
            <td><strong>First aid kit</strong></td>
            <td>${formData.firstAidKit || ""}</td>
          </tr>
          <tr>
            <td><strong>PPE for the working team of ETC agency, like- Safety shoes, Helmet, etc...</strong></td>
            <td>${formData.ppeEquipment || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 1 Form 4 - Pre-Erection Tan Delta and Capacitance Test on Bushing
function generateStage1Form4(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>Pre-Erection Tan delta and capacitance test on bushing</h2>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>METER USED:</strong></td>
            <td>${formData.meterUsed || ""}</td>
            <td><strong>DATE:</strong></td>
            <td>${formData.date || ""}</td>
            <td><strong>TIME:</strong></td>
            <td>${formData.time || ""}</td>
          </tr>
          <tr>
            <td><strong>MODEL & S. NO.</strong></td>
            <td>${formData.modelSrNo || ""}</td>
            <td><strong>WTI:</strong></td>
            <td>${formData.wti || ""}</td>
            <td><strong>OTI:</strong></td>
            <td>${formData.oti || ""}</td>
          </tr>
        </tbody>
      </table>

      <table class="form-table" style="margin-top: 20px;">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th rowspan="2">BUSHING SR.NO.</th>
            <th>1.1</th>
            <th>1.2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>${formData.bushing11 || ""}</td>
            <td>${formData.bushing12 || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 30px; text-align: center;">AT 05 KV PHASE</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>PHASE</th>
            <th>TAN DELTA %</th>
            <th>CAPACITANCE (PF)</th>
            <th>EXCITATION CURRENT (mA)</th>
            <th>DIELECTRIC LOSS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1.1</strong></td>
            <td>${formData.bushing11_05kv_phase || ""}</td>
            <td>${formData.bushing11_05kv_tanDelta || ""}</td>
            <td>${formData.bushing11_05kv_capacitance || ""}</td>
            <td>${formData.bushing11_05kv_excitationCurrent || ""}</td>
            <td>${formData.bushing11_05kv_dielectricLoss || ""}</td>
          </tr>
          <tr>
            <td><strong>1.2</strong></td>
            <td>${formData.bushing12_05kv_phase || ""}</td>
            <td>${formData.bushing12_05kv_tanDelta || ""}</td>
            <td>${formData.bushing12_05kv_capacitance || ""}</td>
            <td>${formData.bushing12_05kv_excitationCurrent || ""}</td>
            <td>${formData.bushing12_05kv_dielectricLoss || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 30px; text-align: center;">AT 10 KV PHASE</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>PHASE</th>
            <th>TAN DELTA %</th>
            <th>CAPACITANCE (PF)</th>
            <th>EXCITATION CURRENT (mA)</th>
            <th>DIELECTRIC LOSS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1.1</strong></td>
            <td>${formData.bushing11_10kv_phase || ""}</td>
            <td>${formData.bushing11_10kv_tanDelta || ""}</td>
            <td>${formData.bushing11_10kv_capacitance || ""}</td>
            <td>${formData.bushing11_10kv_excitationCurrent || ""}</td>
            <td>${formData.bushing11_10kv_dielectricLoss || ""}</td>
          </tr>
          <tr>
            <td><strong>1.2</strong></td>
            <td>${formData.bushing12_10kv_phase || ""}</td>
            <td>${formData.bushing12_10kv_tanDelta || ""}</td>
            <td>${formData.bushing12_10kv_capacitance || ""}</td>
            <td>${formData.bushing12_10kv_excitationCurrent || ""}</td>
            <td>${formData.bushing12_10kv_dielectricLoss || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 1 Form 5 - Record of Measurement of IR Values
function generateStage1Form5(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>RECORD OF MEASUREMENT OF IR VALUES</h2>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>Date :</strong></td>
            <td>${formData.date || ""}</td>
            <td><strong>Time:</strong></td>
            <td>${formData.time || ""}</td>
            <td colspan="2"><strong>Details of Insulation tester</strong></td>
          </tr>
          <tr>
            <td><strong>Amb. Temp :</strong></td>
            <td>${formData.ambTemp || ""}</td>
            <td><strong>Make :</strong></td>
            <td>${formData.make || ""}</td>
            <td rowspan="4"></td>
            <td rowspan="4"></td>
          </tr>
          <tr>
            <td><strong>Oil Temp. :</strong></td>
            <td>${formData.oilTemp || ""}</td>
            <td><strong>Sr. No. :</strong></td>
            <td>${formData.srNo || ""}</td>
          </tr>
          <tr>
            <td><strong>Wdg. Temp. :</strong></td>
            <td>${formData.wdgTemp || ""}</td>
            <td><strong>Range :</strong></td>
            <td>${formData.range || ""}</td>
          </tr>
          <tr>
            <td><strong>Relative Humidity :</strong></td>
            <td>${formData.relativeHumidity || ""}</td>
            <td><strong>Voltage Level :</strong></td>
            <td>${formData.voltageLevel || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 30px;">IR Before erection - RANGE ONLY 1 KV</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>15 Sec MΩ</th>
            <th>60 Sec MΩ</th>
            <th>Ratio of IR 60/IR 15</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HV-Earth</strong></td>
            <td>${formData.hvEarth15Sec || ""}</td>
            <td>${formData.hvEarth60Sec || ""}</td>
            <td>${formData.ratioIR60IR15 || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 2 Form 1 - Record of Oil Handling
function generateStage2Form1(formData) {
  if (!formData) return "";

  // Generate filtration records rows
  const filtrationRows = (formData.filtrationRecords || Array(10).fill({})).map((record, index) => `
    <tr>
      <td>${record.date || ""}</td>
      <td>${record.time || ""}</td>
      <td>${record.vacuumLevel || ""}</td>
      <td>${record.inletTemp || ""}</td>
      <td>${record.outletTemp || ""}</td>
      <td>${record.remark || ""}</td>
    </tr>
  `).join("");

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>RECORD OF OIL HANDLING</h2>
        <h3>TEST VALUES PRIOR TO FILTERATION</h3>
      </div>

      <h4>Oil Filling in the Reservoirs Tank:</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>No of barrels</th>
            <th>Started on Date & time</th>
            <th>Completed on Date & time</th>
            <th>BDV</th>
            <th>MOISTURE CONTENT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tank1</strong></td>
            <td>${formData.tank1NoOfBarrels || ""}</td>
            <td>${formData.tank1StartedDateTime || ""}</td>
            <td>${formData.tank1CompletedDateTime || ""}</td>
            <td>${formData.tank1BDV || ""}</td>
            <td>${formData.tank1MoistureContent || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">RECORD FOR OIL FILTRATION IN RESERVOIR TANK</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Date</th>
            <th>Time</th>
            <th>Vacuum Level (mm/hg or torr)</th>
            <th>Inlet Temp°C</th>
            <th>Outlet Temp°C</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          ${filtrationRows}
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 2 Form 2 - IR After Erection Stage 2 End
function generateStage2Form2(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>IR AFTER ERECTION TEMP OTI ........°C WTI............°C, AMB........°C</h2>
        <h3>RANGE ONLY 1 KV</h3>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td style="width: 33%;"><strong>OTI TEMPERATURE (°C):</strong></td>
            <td style="width: 33%;"><strong>WTI TEMPERATURE (°C):</strong></td>
            <td style="width: 33%;"><strong>AMB TEMPERATURE (°C):</strong></td>
          </tr>
          <tr>
            <td>${formData.tempOTI || ""}</td>
            <td>${formData.tempWTI || ""}</td>
            <td>${formData.tempAMB || ""}</td>
          </tr>
        </tbody>
      </table>

      <table class="form-table" style="margin-top: 20px;">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>15 Sec MΩ</th>
            <th>60 Sec MΩ</th>
            <th>Ratio of IR 60/IR 15</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HV-Earth</strong></td>
            <td>${formData.hvEarth15Sec || ""}</td>
            <td>${formData.hvEarth60Sec || ""}</td>
            <td>${formData.ratioIR60IR15 || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">Lead Clearance in mm:</h4>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>HV with respect to earth</strong></td>
            <td>${formData.hvWithRespectToEarth || ""}</td>
          </tr>
          <tr>
            <td><strong>LV with respect to earth</strong></td>
            <td>${formData.lvWithRespectToEarth || ""}</td>
          </tr>
          <tr>
            <td><strong>Neutral with respect to earth</strong></td>
            <td>${formData.neutralWithRespectToEarth || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 3 Form 1 - Before Oil Filling and Pressure Test Report
function generateStage3Form1(formData) {
  if (!formData) return "";

  // Generate pressure test records rows
  const pressureTestRows = (formData.pressureTestRecords || Array(6).fill({})).map((record, index) => `
    <tr>
      <td><strong>${index + 1}</strong></td>
      <td>${record.timeStarted || ""}</td>
      <td>${record.pressureKgCm2 || ""}</td>
      <td>${record.tempAmb || ""}</td>
      <td>${record.tempOTI || ""}</td>
      <td>${record.tempWTI || ""}</td>
    </tr>
  `).join("");

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>Before oil filling of main tank</h2>
      </div>

      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div><strong>BDV:</strong> ${formData.bdvKV || "_____"} KV</div>
        <div><strong>Water Content:</strong> ${formData.waterContentPPM || "_______"} PPM</div>
      </div>

      <h4 style="margin-top: 40px;">IR After oil Toping up to conservator Temp OTI ${formData.tempOTI || "........"}°C WTI ${formData.tempWTI || "...."}°C, AMB ${formData.tempAMB || ".........."}°C, RANGE ONLY 1 KV</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>15 Sec MΩ</th>
            <th>60 Sec MΩ</th>
            <th>Ratio of IR 60/IR 15</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HV-Earth</strong></td>
            <td>${formData.hvEarth15Sec || ""}</td>
            <td>${formData.hvEarth60Sec || ""}</td>
            <td>${formData.ratioIR60IR15 || ""}</td>
          </tr>
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: center; margin: 40px 0 20px 0;">
        <h4>PRESSURE TEST REPORT</h4>
        <div><strong>Date:</strong> ${formData.pressureTestDate || ""}</div>
      </div>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Sr. No.</th>
            <th>TIME STARTED</th>
            <th>PRESSURE Kg/cm²</th>
            <th colspan="3">TEMP°C</th>
          </tr>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th></th>
            <th></th>
            <th>Amb.</th>
            <th>OTI</th>
            <th>WTI</th>
          </tr>
        </thead>
        <tbody>
          ${pressureTestRows}
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 3 Form 2 - Record for Oil Filtration Main Tank
function generateStage3Form2(formData) {
  if (!formData) return "";

  // Generate filtration records rows
  const filtrationRows = (formData.filtrationRecords || Array(15).fill({})).map((record, index) => `
    <tr>
      <td>${record.date || ""}</td>
      <td>${record.time || ""}</td>
      <td>${record.vacuumLevel || ""}</td>
      <td>${record.mcOutletTemp || ""}</td>
      <td>${record.otiTemp || ""}</td>
      <td>${record.wtiTemp || ""}</td>
      <td>${record.remark || ""}</td>
    </tr>
  `).join("");

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>RECORD FOR OIL FILTRATION</h2>
        <h3>Oil filtration of Main Tank</h3>
      </div>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Date</th>
            <th>Time</th>
            <th>Vacuum Level (mm/hg or torr)</th>
            <th>M/C Outlet Temp°C</th>
            <th>OTI Temp°C</th>
            <th>WTI Temp°C</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          ${filtrationRows}
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">IR Value before radiators/combine filtration, Temp OTI ${formData.tempOTI || "........"}°C WTI ${formData.tempWTI || "............"}°C, AMB ${formData.tempAMB || "........"}°C RANGE ONLY 1 KV</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>15 Sec MΩ</th>
            <th>60 Sec MΩ</th>
            <th>Ratio of IR 60/IR 15</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HV-Earth</strong></td>
            <td>${formData.hvEarth15Sec || ""}</td>
            <td>${formData.hvEarth60Sec || ""}</td>
            <td>${formData.ratioIR60IR15 || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 3 Form 3 - Oil Filtration of Radiator and Combine
function generateStage3Form3(formData) {
  if (!formData) return "";

  // Generate radiator filtration records rows
  const radiatorRows = (formData.radiatorRecords || Array(5).fill({})).map((record, index) => `
    <tr>
      <td>${record.date || ""}</td>
      <td>${record.time || ""}</td>
      <td>${record.vacuumLevel || ""}</td>
      <td>${record.mcOutletTemp || ""}</td>
      <td>${record.otiTemp || ""}</td>
      <td>${record.wtiTemp || ""}</td>
      <td>${record.remark || ""}</td>
    </tr>
  `).join("");

  // Generate combine filtration records rows
  const combineRows = (formData.combineRecords || Array(5).fill({})).map((record, index) => `
    <tr>
      <td>${record.date || ""}</td>
      <td>${record.time || ""}</td>
      <td>${record.vacuumLevel || ""}</td>
      <td>${record.mcOutletTemp || ""}</td>
      <td>${record.otiTemp || ""}</td>
      <td>${record.wtiTemp || ""}</td>
      <td>${record.remark || ""}</td>
    </tr>
  `).join("");

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>Oil filtration of Radiator</h2>
      </div>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Date</th>
            <th>Time</th>
            <th>Vacuum Level (mm/hg or torr)</th>
            <th>M/C Outlet Temp°C</th>
            <th>OTI Temp°C</th>
            <th>WTI Temp°C</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          ${radiatorRows}
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">Oil filtration of Combine (Main Tank + Cooler bank)</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Date</th>
            <th>Time</th>
            <th>Vacuum Level (mm/hg or torr)</th>
            <th>M/C Outlet Temp°C</th>
            <th>OTI Temp°C</th>
            <th>WTI Temp°C</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          ${combineRows}
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">After Oil Filtration of main tank</h4>

      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div><strong>BDV:</strong> ${formData.bdvKV || "_____"} KV</div>
        <div><strong>Water Content:</strong> ${formData.waterContentPPM || "_______"} PPM</div>
      </div>

      <h4 style="margin-top: 40px;">PI Value after filteration, Temp OTI ${formData.tempOTI || "........"}°C WTI ${formData.tempWTI || "............"}°C, AMB ${formData.tempAMB || "........"}°C RANGE ONLY 5 KV</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>15 Sec MΩ</th>
            <th>60 Sec MΩ</th>
            <th>600 sec MΩ</th>
            <th>600/60 sec MΩ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HV-Earth</strong></td>
            <td>${formData.hvEarth15Sec || ""}</td>
            <td>${formData.hvEarth60Sec || ""}</td>
            <td>${formData.hvEarth600Sec || ""}</td>
            <td>${formData.hvEarth60600Sec || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 4 Form 1 - SFRA Test Report
function generateStage4Form1(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>SFRA TEST REPORT</h2>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>Date:</strong></td>
            <td>${formData.date || ""}</td>
            <td><strong>Time:</strong></td>
            <td>${formData.time || ""}</td>
          </tr>
          <tr>
            <td><strong>Instrument Make:</strong></td>
            <td>${formData.instrumentMake || ""}</td>
            <td><strong>Model:</strong></td>
            <td>${formData.model || ""}</td>
          </tr>
          <tr>
            <td><strong>Serial No:</strong></td>
            <td>${formData.serialNo || ""}</td>
            <td><strong>Calibration Date:</strong></td>
            <td>${formData.calibrationDate || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">Test Results</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Phase</th>
            <th>End to End (Ω)</th>
            <th>Inductive (Ω)</th>
            <th>Capacitive (Ω)</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>R Phase</strong></td>
            <td>${formData.rPhaseEndToEnd || ""}</td>
            <td>${formData.rPhaseInductive || ""}</td>
            <td>${formData.rPhaseCapacitive || ""}</td>
            <td>${formData.rPhaseResult || ""}</td>
          </tr>
          <tr>
            <td><strong>Y Phase</strong></td>
            <td>${formData.yPhaseEndToEnd || ""}</td>
            <td>${formData.yPhaseInductive || ""}</td>
            <td>${formData.yPhaseCapacitive || ""}</td>
            <td>${formData.yPhaseResult || ""}</td>
          </tr>
          <tr>
            <td><strong>B Phase</strong></td>
            <td>${formData.bPhaseEndToEnd || ""}</td>
            <td>${formData.bPhaseInductive || ""}</td>
            <td>${formData.bPhaseCapacitive || ""}</td>
            <td>${formData.bPhaseResult || ""}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 30px;">
        <strong>Remarks:</strong>
        <p>${formData.remarks || ""}</p>
      </div>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 4 Form 2 - IR and Voltage Ratio Test
function generateStage4Form2(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>IR AND VOLTAGE RATIO TEST</h2>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>Date:</strong></td>
            <td>${formData.date || ""}</td>
            <td><strong>Time:</strong></td>
            <td>${formData.time || ""}</td>
          </tr>
          <tr>
            <td><strong>Temperature OTI (°C):</strong></td>
            <td>${formData.tempOTI || ""}</td>
            <td><strong>WTI (°C):</strong></td>
            <td>${formData.tempWTI || ""}</td>
          </tr>
          <tr>
            <td><strong>AMB (°C):</strong></td>
            <td>${formData.tempAMB || ""}</td>
            <td><strong>Test Voltage:</strong></td>
            <td>${formData.testVoltage || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">IR Values at 5 KV</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Winding</th>
            <th>15 Sec (MΩ)</th>
            <th>60 Sec (MΩ)</th>
            <th>600 Sec (MΩ)</th>
            <th>PI (600/60)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HV-Earth</strong></td>
            <td>${formData.hvEarth15Sec || ""}</td>
            <td>${formData.hvEarth60Sec || ""}</td>
            <td>${formData.hvEarth600Sec || ""}</td>
            <td>${formData.hvEarthPI || ""}</td>
          </tr>
          <tr>
            <td><strong>LV-Earth</strong></td>
            <td>${formData.lvEarth15Sec || ""}</td>
            <td>${formData.lvEarth60Sec || ""}</td>
            <td>${formData.lvEarth600Sec || ""}</td>
            <td>${formData.lvEarthPI || ""}</td>
          </tr>
          <tr>
            <td><strong>HV-LV</strong></td>
            <td>${formData.hvLv15Sec || ""}</td>
            <td>${formData.hvLv60Sec || ""}</td>
            <td>${formData.hvLv600Sec || ""}</td>
            <td>${formData.hvLvPI || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">Voltage Ratio Test</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Tap Position</th>
            <th>Applied Voltage (V)</th>
            <th>Measured Voltage (V)</th>
            <th>Ratio</th>
            <th>Deviation (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tap 1</strong></td>
            <td>${formData.tap1Applied || ""}</td>
            <td>${formData.tap1Measured || ""}</td>
            <td>${formData.tap1Ratio || ""}</td>
            <td>${formData.tap1Deviation || ""}</td>
          </tr>
          <tr>
            <td><strong>Tap 2</strong></td>
            <td>${formData.tap2Applied || ""}</td>
            <td>${formData.tap2Measured || ""}</td>
            <td>${formData.tap2Ratio || ""}</td>
            <td>${formData.tap2Deviation || ""}</td>
          </tr>
          <tr>
            <td><strong>Tap 3</strong></td>
            <td>${formData.tap3Applied || ""}</td>
            <td>${formData.tap3Measured || ""}</td>
            <td>${formData.tap3Ratio || ""}</td>
            <td>${formData.tap3Deviation || ""}</td>
          </tr>
        </tbody>
      </table>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 4 Form 3 - Short Circuit Test
function generateStage4Form3(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>SHORT CIRCUIT TEST</h2>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>Date:</strong></td>
            <td>${formData.date || ""}</td>
            <td><strong>Time:</strong></td>
            <td>${formData.time || ""}</td>
          </tr>
          <tr>
            <td><strong>Temperature OTI (°C):</strong></td>
            <td>${formData.tempOTI || ""}</td>
            <td><strong>WTI (°C):</strong></td>
            <td>${formData.tempWTI || ""}</td>
          </tr>
          <tr>
            <td><strong>AMB (°C):</strong></td>
            <td>${formData.tempAMB || ""}</td>
            <td><strong>Test Voltage (V):</strong></td>
            <td>${formData.testVoltage || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">Short Circuit Impedance</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Phase</th>
            <th>Voltage (V)</th>
            <th>Current (A)</th>
            <th>Power (W)</th>
            <th>Impedance (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>R-Y</strong></td>
            <td>${formData.ryVoltage || ""}</td>
            <td>${formData.ryCurrent || ""}</td>
            <td>${formData.ryPower || ""}</td>
            <td>${formData.ryImpedance || ""}</td>
          </tr>
          <tr>
            <td><strong>Y-B</strong></td>
            <td>${formData.ybVoltage || ""}</td>
            <td>${formData.ybCurrent || ""}</td>
            <td>${formData.ybPower || ""}</td>
            <td>${formData.ybImpedance || ""}</td>
          </tr>
          <tr>
            <td><strong>B-R</strong></td>
            <td>${formData.brVoltage || ""}</td>
            <td>${formData.brCurrent || ""}</td>
            <td>${formData.brPower || ""}</td>
            <td>${formData.brImpedance || ""}</td>
          </tr>
          <tr>
            <td><strong>Average</strong></td>
            <td>${formData.avgVoltage || ""}</td>
            <td>${formData.avgCurrent || ""}</td>
            <td>${formData.avgPower || ""}</td>
            <td>${formData.avgImpedance || ""}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 30px;">
        <strong>Remarks:</strong>
        <p>${formData.remarks || ""}</p>
      </div>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 4 Form 4 - Winding Resistance Measurement
function generateStage4Form4(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>WINDING RESISTANCE MEASUREMENT</h2>
      </div>

      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>Date:</strong></td>
            <td>${formData.date || ""}</td>
            <td><strong>Time:</strong></td>
            <td>${formData.time || ""}</td>
          </tr>
          <tr>
            <td><strong>Temperature OTI (°C):</strong></td>
            <td>${formData.tempOTI || ""}</td>
            <td><strong>WTI (°C):</strong></td>
            <td>${formData.tempWTI || ""}</td>
          </tr>
          <tr>
            <td><strong>AMB (°C):</strong></td>
            <td>${formData.tempAMB || ""}</td>
            <td><strong>Instrument Used:</strong></td>
            <td>${formData.instrumentUsed || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">HV Winding Resistance</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Phase</th>
            <th>Resistance (Ω)</th>
            <th>Corrected to 75°C (Ω)</th>
            <th>Deviation (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>R Phase</strong></td>
            <td>${formData.hvRPhaseResistance || ""}</td>
            <td>${formData.hvRPhaseCorrected || ""}</td>
            <td>${formData.hvRPhaseDeviation || ""}</td>
          </tr>
          <tr>
            <td><strong>Y Phase</strong></td>
            <td>${formData.hvYPhaseResistance || ""}</td>
            <td>${formData.hvYPhaseCorrected || ""}</td>
            <td>${formData.hvYPhaseDeviation || ""}</td>
          </tr>
          <tr>
            <td><strong>B Phase</strong></td>
            <td>${formData.hvBPhaseResistance || ""}</td>
            <td>${formData.hvBPhaseCorrected || ""}</td>
            <td>${formData.hvBPhaseDeviation || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 40px;">LV Winding Resistance</h4>

      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th>Phase</th>
            <th>Resistance (Ω)</th>
            <th>Corrected to 75°C (Ω)</th>
            <th>Deviation (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>R Phase</strong></td>
            <td>${formData.lvRPhaseResistance || ""}</td>
            <td>${formData.lvRPhaseCorrected || ""}</td>
            <td>${formData.lvRPhaseDeviation || ""}</td>
          </tr>
          <tr>
            <td><strong>Y Phase</strong></td>
            <td>${formData.lvYPhaseResistance || ""}</td>
            <td>${formData.lvYPhaseCorrected || ""}</td>
            <td>${formData.lvYPhaseDeviation || ""}</td>
          </tr>
          <tr>
            <td><strong>B Phase</strong></td>
            <td>${formData.lvBPhaseResistance || ""}</td>
            <td>${formData.lvBPhaseCorrected || ""}</td>
            <td>${formData.lvBPhaseDeviation || ""}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 30px;">
        <strong>Remarks:</strong>
        <p>${formData.remarks || ""}</p>
      </div>

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 5 Form 1 - Pre-Charging Check List
function generateStage5Form1(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>PRE-CHARGING CHECK LIST</h2>
      </div>

      <h4>I. Valve Status</h4>
      ${generateDataTable(formData.valveStatus, "")}

      <h4 style="margin-top: 30px;">II. Air Venting Done from Following Locations</h4>
      ${generateDataTable(formData.airVenting, "")}

      <h4 style="margin-top: 30px;">III. Protection Trails</h4>
      ${generateDataTable(formData.protectionTrails, "")}

      <h4 style="margin-top: 30px;">IV. Bushing Test Tap</h4>
      ${generateDataTable(formData.bushingTestTap, "")}

      ${generatePhotoThumbnails(formData.photos)}
    </div>
  `;
}

// Generate Stage 5 Form 2 - Pre-Charging Check List Part 2
function generateStage5Form2(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always;">
      <div class="company-header">
        <h2>PRE-CHARGING CHECK LIST - PART 2</h2>
      </div>

      <h4>V. Oil Values</h4>
      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>BDV:</strong></td>
            <td>${formData.bdvKV || ""} KV</td>
          </tr>
          <tr>
            <td><strong>Moisture Content:</strong></td>
            <td>${formData.moistureContentPPM || ""} PPM</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 30px;">VI. Final IR Values</h4>
      <table class="form-table">
        <thead>
          <tr style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white;">
            <th></th>
            <th>15 sec</th>
            <th>60 sec</th>
            <th>600 sec</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HV-E</strong></td>
            <td>${formData.hvEarth15Sec || ""}</td>
            <td>${formData.hvEarth60Sec || ""}</td>
            <td>${formData.hvEarth600Sec || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 30px;">Additional Checks</h4>
      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>VII. Oil Level of conservator:</strong></td>
            <td>${formData.oilLevelConservator || ""}</td>
          </tr>
          <tr>
            <td><strong>VIII. HV Jumpers connected:</strong></td>
            <td>${formData.hvJumpersConnected || ""}</td>
          </tr>
          <tr>
            <td><strong>IX. LV Jumpers connected:</strong></td>
            <td>${formData.lvJumpersConnected || ""}</td>
          </tr>
          <tr>
            <td><strong>X. Incoming LA Counter:</strong></td>
            <td>${formData.incomingLACounter || ""}</td>
          </tr>
          <tr>
            <td><strong>XI. Outgoing LA Counter:</strong></td>
            <td>${formData.outgoingLACounter || ""}</td>
          </tr>
          <tr>
            <td><strong>XII. All CT Cable Terminated and Glands Sealed:</strong></td>
            <td>${formData.allCTCableTerminated || ""}</td>
          </tr>
          <tr>
            <td><strong>XIII. Protection relays checked through breaker tripping:</strong></td>
            <td>${formData.protectionRelaysChecked || ""}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 30px;">Temperature</h4>
      <table class="form-table">
        <tbody>
          <tr>
            <td><strong>WTI:</strong></td>
            <td>${formData.temperatureWTI || ""} °C</td>
            <td><strong>OTI:</strong></td>
            <td>${formData.temperatureOTI || ""} °C</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 30px;">
        <strong>Remarks:</strong>
        <p>${formData.remarks || ""}</p>
      </div>

      ${generatePhotoThumbnails(formData.photos)}
      ${generateSignatureSection(formData.signatures)}
    </div>
  `;
}

// Generate Stage 6 Form 1 - Work Completion Report
function generateStage6Form1(formData) {
  if (!formData) return "";

  return `
    <div class="form-container" style="page-break-before: always; background: white; padding: 40px;">
      <!-- Header with logo and certifications -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 3px solid #C41E3A; padding-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 15px;">
          <div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #333;">VISHVAS POWER</div>
            <div style="font-size: 0.8rem; color: #666;">(A unit of M/s Vishvas Power Engineering Services Pvt Ltd)</div>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="background: #4CAF50; color: white; padding: 5px 10px; border-radius: 5px; margin-bottom: 5px; font-size: 0.8rem;">
            ISO CERTIFIED
          </div>
          <div style="font-size: 0.7rem; color: #333;">
            • 9001 Certified<br>
            • 14001 Certified<br>
            • 45001 Certified
          </div>
        </div>
      </div>

      <!-- Red banner -->
      <div style="background: linear-gradient(135deg, #C41E3A, #8B0000); color: white; padding: 10px 20px; margin-bottom: 30px; clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);">
        <div style="font-size: 1.1rem; font-weight: 600;">Transformers upto 220 kV 250 MVA</div>
      </div>

      <!-- Title and Date -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 1.8rem; font-weight: bold; text-decoration: underline; margin: 0 0 10px 0;">
          Work completion report
        </h1>
        <div style="text-align: right; font-size: 1rem;">
          <strong>Date:</strong> ${formData.completionDate || "___________"}
        </div>
      </div>

      <!-- Project Information -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">Project Information</h3>
        
        <div style="margin-bottom: 15px;">
          <strong>Customer Name:</strong> ${formData.customerName || "___________"}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Order Number:</strong> ${formData.orderNumber || "___________"}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Location:</strong> ${formData.location || "___________"} <strong style="margin-left: 20px;">SP/SSP</strong>
        </div>
      </div>

      <!-- Transformer Details -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">Transformer Details</h3>
        
        <div style="margin-bottom: 10px;">
          <strong>Type:</strong> ${formData.type || "auto Transformer"}
        </div>
        
        <div style="margin-bottom: 10px;">
          <strong>Capacity:</strong> ${formData.capacity || "___________"} <strong>MVA</strong>
        </div>
        
        <div style="margin-bottom: 10px;">
          <strong>Voltage Rating:</strong> ${formData.voltageRating || "___________"} <strong>kV</strong>
        </div>
        
        <div style="margin-bottom: 10px;">
          <strong>Make:</strong> ${formData.make || "___________"}
        </div>
        
        <div style="margin-bottom: 10px;">
          <strong>Serial Number:</strong> ${formData.serialNumber || "___________"}
        </div>
      </div>

      <!-- Subject and Content -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">
          Subject: <em>Completion of Transformer Erection, Testing and Commissioning Work</em>
        </h3>
        
        <p style="line-height: 1.6; margin-bottom: 15px;">
          This is to certify that the erection, Testing and commissioning of the above-mentioned transformer have been completed in accordance with the terms and conditions of the referenced order.
        </p>
        
        <p style="line-height: 1.6; margin-bottom: 15px;">
          The installation work has been jointly inspected and found satisfactory by the undersigned representatives. The transformer was successfully charged/commissioned on no-load at ${formData.chargingDate || "___________"} hrs on ${formData.commissioningDate || "___________"} (date).
        </p>
        
        <p style="line-height: 1.6; margin-bottom: 30px;">
          All works under the scope of the order have been completed, and no pending activities remain.
        </p>
      </div>

      <!-- Signatures -->
      <div style="display: flex; justify-content: space-between; margin-top: 50px;">
        <div style="width: 45%;">
          <h4 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 20px;">For VPES, Nagpur</h4>
          
          <div style="margin-bottom: 15px;">
            <strong>Name:</strong> ${formData.signatures?.vpesName || "___________"}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Designation:</strong> ${formData.signatures?.vpesDesignation || "___________"}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Signature:</strong>
            ${formData.signatures?.vpesSignature ? 
              `<div style="margin: 15px 0;">
                <img src="${formData.signatures.vpesSignature}" 
                     style="max-width: 200px; height: 80px; border: 2px solid #e2e8f0; border-radius: 8px;" />
              </div>` : 
              "<div style='border-bottom: 1px solid #333; width: 200px; margin: 15px 0;'></div>"
            }
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Date:</strong> ${formData.signatures?.vpesDate || "___________"}
          </div>
        </div>

        <div style="width: 45%;">
          <h4 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 20px;">For Customer</h4>
          
          <div style="margin-bottom: 15px;">
            <strong>Name:</strong> ${formData.signatures?.customerName || "___________"}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Designation:</strong> ${formData.signatures?.customerDesignation || "___________"}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Signature:</strong>
            ${formData.signatures?.customerSignature ? 
              `<div style="margin: 15px 0;">
                <img src="${formData.signatures.customerSignature}" 
                     style="max-width: 200px; height: 80px; border: 2px solid #e2e8f0; border-radius: 8px;" />
              </div>` : 
              "<div style='border-bottom: 1px solid #333; width: 200px; margin: 15px 0;'></div>"
            }
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Date:</strong> ${formData.signatures?.customerDate || "___________"}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Generate forms for a stage dynamically
function generateStageContent(stageData, stageNumber) {
  if (!stageData) return "";

  let content = `<div class="page-break"></div>`;
  content += `<h2 style="text-align: center; color: #2d3748; margin: 40px 0;">Stage ${stageNumber}</h2>`;

  Object.entries(stageData).forEach(([formKey, formData]) => {
    if (formData && typeof formData === "object") {
      // Stage 1 Forms
      if (stageNumber === 1 && formKey === "form1") {
        content += generateStage1Form1(formData);
      } 
      else if (stageNumber === 1 && formKey === "form2") {
        content += generateStage1Form2(formData);
      }
      else if (stageNumber === 1 && formKey === "form3") {
        content += generateStage1Form3(formData);
      }
      else if (stageNumber === 1 && formKey === "form4") {
        content += generateStage1Form4(formData);
      }
      else if (stageNumber === 1 && formKey === "form5") {
        content += generateStage1Form5(formData);
      }
      // Stage 2 Forms
      else if (stageNumber === 2 && formKey === "form1") {
        content += generateStage2Form1(formData);
      }
      else if (stageNumber === 2 && formKey === "form2") {
        content += generateStage2Form2(formData);
      }
      // Stage 3 Forms
      else if (stageNumber === 3 && formKey === "form1") {
        content += generateStage3Form1(formData);
      }
      else if (stageNumber === 3 && formKey === "form2") {
        content += generateStage3Form2(formData);
      }
      else if (stageNumber === 3 && formKey === "form3") {
        content += generateStage3Form3(formData);
      }
      // Stage 4 Forms
      else if (stageNumber === 4 && formKey === "form1") {
        content += generateStage4Form1(formData);
      }
      else if (stageNumber === 4 && formKey === "form2") {
        content += generateStage4Form2(formData);
      }
      else if (stageNumber === 4 && formKey === "form3") {
        content += generateStage4Form3(formData);
      }
      else if (stageNumber === 4 && formKey === "form4") {
        content += generateStage4Form4(formData);
      }
      // Stage 5 Forms
      else if (stageNumber === 5 && formKey === "form1") {
        content += generateStage5Form1(formData);
      }
      else if (stageNumber === 5 && formKey === "form2") {
        content += generateStage5Form2(formData);
      }
      // Stage 6 Forms
      else if (stageNumber === 6 && formKey === "form1") {
        content += generateStage6Form1(formData);
      }
      else {
        // Generic form rendering
        content += `
          <div class="form-container" style="page-break-before: always;">
            <div class="company-header">
              <h2>${formatLabel(formKey)}</h2>
            </div>
            ${generateDataTable(formData)}
            ${generatePhotoThumbnails(formData.photos)}
            ${generateSignatureSection(formData.signatures)}
          </div>
        `;
      }
    }
  });

  return content;
}

// Main HTML template generator
export function generateHTMLTemplate(data, projectName, companyName) {
  // Read CSS file
  const cssPath = path.join(__dirname, "../public/form-styles.css");
  let cssContent = "";
  
  try {
    if (fs.existsSync(cssPath)) {
      cssContent = fs.readFileSync(cssPath, "utf8");
    }
  } catch (error) {
    console.error("Error reading CSS file:", error);
  }

  // Generate content for all stages
  let stagesContent = "";
  if (data.autoTransformerData) {
    for (let i = 1; i <= 7; i++) {
      const stageKey = `stage${i}`;
      if (data.autoTransformerData[stageKey]) {
        stagesContent += generateStageContent(data.autoTransformerData[stageKey], i);
      }
    }
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${projectName} - Complete Report</title>
      <style>
        ${cssContent}
        
        /* PDF-specific styles */
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .page-break {
            page-break-after: always;
          }
          
          .form-actions,
          .back-btn,
          input[type="file"],
          .clear-signature-btn,
          .upload-options,
          .camera-btn,
          .gallery-btn,
          .bulk-btn {
            display: none !important;
          }
          
          .form-table {
            page-break-inside: avoid;
          }
          
          .signature-section {
            page-break-inside: avoid;
          }
          
          .photo-upload-section {
            page-break-inside: avoid;
          }
        }
        
        body {
          background: white !important;
          padding: 20px;
        }
        
        .form-stage-container {
          background: white !important;
          padding: 0;
        }
        
        .form-container {
          background: white !important;
          box-shadow: none !important;
          margin-bottom: 40px;
        }
      </style>
    </head>
    <body>
      <div class="form-stage-container">
        <!-- Cover Page -->
        <div style="text-align: center; padding: 100px 20px; page-break-after: always;">
          <h1 style="font-size: 3rem; color: #2d3748; margin-bottom: 30px;">
            Transformer Installation Report
          </h1>
          <h2 style="font-size: 2rem; color: #4a5568; margin-bottom: 20px;">
            ${projectName}
          </h2>
          <h3 style="font-size: 1.5rem; color: #718096;">
            ${companyName}
          </h3>
          <p style="margin-top: 50px; font-size: 1.2rem; color: #a0aec0;">
            Generated on: ${new Date().toLocaleDateString()}
          </p>
        </div>

        <!-- All Stages Content -->
        ${stagesContent}
      </div>
    </body>
    </html>
  `;
}
