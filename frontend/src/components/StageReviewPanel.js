import React from 'react';
import { BACKEND_API_BASE_URL, BACKEND_IMG_API_BASE_URL } from './constant';

// Stage 1 Form 1: Name Plate Details Transformer
const Stage1Form1 = ({ formData }) => (
  <table className="form-table" style={{
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px"
  }}>
    <tbody>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>MAKE</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.make || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>CURRENT HV (A)</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.currentHV || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>SR. NO.</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.srNo || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>LV (A)</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.currentLV || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>MVA Rating</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.mvaRating || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Temp. Rise over amb. In Oil °C</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.tempRiseOil || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>HV (KV)</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.hvKv || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Winding</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.winding || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>LV (KV)</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.lvKv || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Transporting weight</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.transportingWeight || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>% Impedance</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.impedancePercent || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>No. Of radiators</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.noOfRadiators || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Year of Mfg.</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.yearOfMfg || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Weight of Core & Winding.</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.weightCoreWinding || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
      <tr>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Oil Quantity in liter</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.oilQuantityLiter || ""} disabled className="form-input disabled preview" />
        </td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Total Weight</td>
        <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
          <input type="text" value={formData.totalWeight || ""} disabled className="form-input disabled preview" />
        </td>
      </tr>
    </tbody>
  </table>
);

// Stage 1 Form 2: Protocol for Accessories Checking
const Stage1Form2 = ({ formData }) => (
  <table className="form-table" style={{
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px"
  }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>No</th>
        <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Packing case Number</th>
        <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Material Description</th>
        <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Qty as per P. L.</th>
        <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Qty. Received</th>
        <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Short Qty</th>
        <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Damaged Qty.</th>
      </tr>
    </thead>
    <tbody>
      {[
        { id: 1, description: "HV bushing" },
        { id: 2, description: "LV Bushing" },
        { id: 3, description: "Neutral bushing" },
        { id: 4, description: "Buchholz" },
        { id: 5, description: "PRV" },
        { id: 6, description: "CPR" },
        { id: 7, description: "Breather" },
        { id: 8, description: "Bushing Connector" },
        { id: 9, description: "Radiators" },
      ].map((item) => (
        <tr key={item.id}>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.id}</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input 
              type="text" 
              value={formData.accessories?.[item.id]?.packingCase || ""} 
              disabled 
              className="form-input disabled preview" 
            />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>{item.description}</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input 
              type="text" 
              value={formData.accessories?.[item.id]?.qtyPerPL || ""} 
              disabled 
              className="form-input disabled preview" 
            />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input 
              type="text" 
              value={formData.accessories?.[item.id]?.qtyReceived || ""} 
              disabled 
              className="form-input disabled preview" 
            />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input 
              type="text" 
              value={formData.accessories?.[item.id]?.shortQty || ""} 
              disabled 
              className="form-input disabled preview" 
            />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input 
              type="text" 
              value={formData.accessories?.[item.id]?.damagedQty || ""} 
              disabled 
              className="form-input disabled preview" 
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Stage 1 Form 3: Core Insulation Check
const Stage1Form3 = ({ formData }) => (
  <div>
    {/* Core Insulation Check Table */}
    <h4 style={{ textAlign: "center", margin: "20px 0" }}>CORE INSULATION CHECK: At 1 KV &gt; 500 MΩ</h4>
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Obtained Value MΩ</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Between Core – frame</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.betweenCoreFrame || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.betweenCoreFrameRemarks || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Between Frame – tank</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.betweenFrameTank || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.betweenFrameTankRemarks || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Between core – tank</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.betweenCoreTank || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.betweenCoreTankRemarks || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Checklist for Equipment Table */}
    <h4 style={{ textAlign: "center", margin: "40px 0 20px 0" }}>CHECKLIST FOR CONFORMING AVAILABILITY OF EQUIPMENT AT SITE</h4>
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Description</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Rating/capacity</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Checked by</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>2.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Whether the Filter Machine is Available</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.filterMachine || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.filterMachineChecked || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>3.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Capacity of Filter Machine</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.filterCapacity || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.filterCapacityChecked || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>4.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Capacity of the Vacuum Pump to be used.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.vacuumPumpCapacity || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.vacuumPumpCapacityChecked || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>5.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Whether the Reservoir is Available with valves and a breather.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.reservoirAvailable || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.reservoirAvailableChecked || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>6.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Capacity of Reservoirs.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.reservoirCapacity || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.reservoirCapacityChecked || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>8.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Hose Pipes for the Filtration Process.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hosePipes || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.hosePipesChecked || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>9.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Whether Crane is Available in good condition</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.craneAvailable || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.craneAvailableChecked || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Safety Equipment Table */}
    <h4 style={{ textAlign: "center", margin: "30px 0 20px 0" }}>SAFETY EQUIPMENT</h4>
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Descriptions</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Confirmation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Fire extinguisher/ Fire sand bucket</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.fireExtinguisher || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>First aid kit</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.firstAidKit || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>PPE for the working team of ETC agency, like- Safety shoes, Helmet, etc...</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.ppeEquipment || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

// Stage 1 Form 4: Pre-Erection Tan Delta and Capacitance Test on Bushing
const Stage1Form4 = ({ formData }) => (
  <div>
    {/* Basic Information Table */}
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>METER USED:</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.meterUsed || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>DATE:</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>TIME:</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>MODEL & S. NO.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.modelSrNo || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>WTI:</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.wti || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>OTI:</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.oti || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Bushing Serial Numbers Table */}
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }} rowSpan="2">BUSHING SR.NO.</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>1.1</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>1.2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}></td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11 || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12 || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* AT 05 KV PHASE Table */}
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }} rowSpan="2"></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }} rowSpan="2">AT 05 KV PHASE</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>TAN DELTA %</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>CAPACITANCE (pF)</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>1.1</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_05kv_phase || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_05kv_tanDelta || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_05kv_capacitance || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_05kv_excitationCurrent || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_05kv_dielectricLoss || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>1.2</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_05kv_phase || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_05kv_tanDelta || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_05kv_capacitance || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_05kv_excitationCurrent || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_05kv_dielectricLoss || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* AT 10 KV PHASE Table */}
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }} rowSpan="2"></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }} rowSpan="2">AT 10 KV PHASE</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>TAN DELTA %</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>CAPACITANCE (pF)</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>EXCITATION CURRENT (mA)</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>DIELECTRIC LOSS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>1.1</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_10kv_phase || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_10kv_tanDelta || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_10kv_capacitance || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_10kv_excitationCurrent || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing11_10kv_dielectricLoss || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>1.2</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_10kv_phase || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_10kv_tanDelta || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_10kv_capacitance || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_10kv_excitationCurrent || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.bushing12_10kv_dielectricLoss || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

// Stage 1 Form 5: Record of Measurement of IR Values
const Stage1Form5 = ({ formData }) => (
  <div>
    {/* Basic Information Table */}
    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Date</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="date" value={formData.date || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Time</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="time" value={formData.time || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Amb. Temp</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.ambTemp || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Make</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.make || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Oil Temp.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.oilTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Sr. No.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.srNo || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Wdg. Temp.</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.wdgTemp || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Range</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.range || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Relative Humidity</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.relativeHumidity || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Voltage Level</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }} colSpan="5">
            <input type="text" value={formData.voltageLevel || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    {/* IR Values Measurement Table */}
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

// Stage 2 Form 1: Record of Oil Handling
const Stage2Form1 = ({ formData }) => (
  <div>
    <div className="company-header">
      <h2>RECORD OF OIL HANDLING</h2>
      <h3>TEST VALUES PRIOR TO FILTERATION</h3>
    </div>

    <h4>Oil Filling in the Reservoirs Tank:</h4>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}></th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>No of barrels</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Started on Date & time</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Completed on Date & time</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>BDV</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>MOISTURE CONTENT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <strong>Tank1</strong>
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.tank1NoOfBarrels || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="datetime-local" value={formData.tank1StartedDateTime || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="datetime-local" value={formData.tank1CompletedDateTime || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.tank1BDV || ""} disabled className="form-input disabled preview" />
          </td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input type="text" value={formData.tank1MoistureContent || ""} disabled className="form-input disabled preview" />
          </td>
        </tr>
      </tbody>
    </table>

    <h4 style={{ marginTop: "40px" }}>
      RECORD FOR OIL FILTRATION IN RESERVOIR TANK
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
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Inlet Temp°C</th>
          <th style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold", backgroundColor: "#f2f2f2" }}>Outlet Temp°C</th>
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
              <input type="text" value={record.inletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.outletTemp || ""} disabled className="form-input disabled preview" />
            </td>
            <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
              <input type="text" value={record.remark || ""} disabled className="form-input disabled preview" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Stage 2 Form 2: IR After Erection - Stage 2 End
const Stage2Form2 = ({ formData }) => (
  <div>
    <div className="company-header">
      <h2>
        IR after erection Temp OTI ........°C WTI............°C, AMB........°C
        &nbsp;&nbsp;&nbsp;&nbsp; RANGE ONLY 1 KV
      </h2>
    </div>

    <div className="form-grid" style={{ marginBottom: "20px" }}>
      <div className="form-group">
        <label>OTI Temperature (°C):</label>
        <input
          type="text"
          value={formData.tempOTI || ""}
          disabled
          className="form-input disabled preview"
        />
      </div>
      <div className="form-group">
        <label>WTI Temperature (°C):</label>
        <input
          type="text"
          value={formData.tempWTI || ""}
          disabled
          className="form-input disabled preview"
        />
      </div>
      <div className="form-group">
        <label>AMB Temperature (°C):</label>
        <input
          type="text"
          value={formData.tempAMB || ""}
          disabled
          className="form-input disabled preview"
        />
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

    <h4 style={{ marginTop: "40px" }}>Lead Clearance in mm: -</h4>

    <table className="form-table" style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px"
    }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>HV with respect to earth</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input
              type="text"
              value={formData.hvWithRespectToEarth || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>LV with respect to earth</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input
              type="text"
              value={formData.lvWithRespectToEarth || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px", fontWeight: "bold" }}>Neutral with respect to earth</td>
          <td style={{ border: "1px solid #e5e7eb", padding: "8px" }}>
            <input
              type="text"
              value={formData.neutralWithRespectToEarth || ""}
              disabled
              className="form-input disabled preview"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);


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
      id: "pre-erection-tan-delta-test",
      title: "Pre-Erection Tan Delta and Capacitance Test on Bushing",
      fields: [
        { name: "meterUsed", label: "METER USED", type: "text" },
        { name: "date", label: "DATE", type: "date" },
        { name: "time", label: "TIME", type: "time" },
        { name: "modelSrNo", label: "MODEL & S. NO.", type: "text" },
        { name: "wti", label: "WTI", type: "text" },
        { name: "oti", label: "OTI", type: "text" },
        { name: "bushing11", label: "Bushing 1.1", type: "text" },
        { name: "bushing12", label: "Bushing 1.2", type: "text" }
      ]
    },
    {
      id: "record-measurement-ir-values",
      title: "Record of Measurement of IR Values",
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
        { name: "ratioIR60IR15", label: "Ratio of IR 60/IR 15", type: "text" }
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
            ) : form.id === "pre-erection-tan-delta-test" ? (
              <Stage1Form4 formData={formData} />
            ) : form.id === "record-measurement-ir-values" ? (
              <Stage1Form5 formData={formData} />
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

const StageReviewPanel = ({
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

export default StageReviewPanel;
