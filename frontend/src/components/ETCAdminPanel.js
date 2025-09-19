"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_API_BASE_URL, additionalLogging } from "./constant"
import FormStage from "./FormStage" // Import FormStage
import "./stage-review-styles.css"
import "./form-styles.css"
import html2pdf from "html2pdf.js"

const ETCAdminPanel = ({ user, selectedCompany, onLogout, onCompanySelect, onProjectSelect, onBackToMain }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [departments, setDepartments] = useState([])
  const [Companys, setCompanys] = useState([])
  const [companies, setCompanies] = useState([])
  const [submittedForms, setSubmittedForms] = useState([])

  const [projectName, setProjectName] = useState(null)
  const [companyName, setCompanyName] = useState(null)

  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedMainCompany, setSelectedMainCompany] = useState(null)

  const [newCompany, setNewCompany] = useState({ name: "", description: "" })
  const [showCreateCompanyForm, setShowCreateCompanyForm] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [reviewMode, setReviewMode] = useState(false)
  const [selectedProjectForReview, setSelectedProjectForReview] = useState(null)
  const [currentStageReview, setCurrentStageReview] = useState(1)
  const [showSubmitterReview, setShowSubmitterReview] = useState(false)

  const [viewMode, setViewMode] = useState(false)
  const [selectedFormForView, setSelectedFormForView] = useState(null)
  const [formViewData, setFormViewData] = useState({})
  const [showPDFPreview, setShowPDFPreview] = useState(false)

  // State for showing and managing FormStage
  const [formDataFromDB, setFormDataFromDB] = useState(false)
  const [showFormStage, setShowFormStage] = useState(false)
  const [formStageProject, setFormStageProject] = useState(null)
  const [formStageStage, setFormStageStage] = useState(1)

  // Modal states for showing and managing notifications, confirmations, and inputs
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState("info") // info, success, error, warning

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")
  const [confirmAction, setConfirmAction] = useState(null)

  const [showInputModal, setShowInputModal] = useState(false)
  const [inputModalTitle, setInputModalTitle] = useState("")
  const [inputModalPlaceholder, setInputModalPlaceholder] = useState("")
  const [inputModalValue, setInputModalValue] = useState("")
  const [inputModalAction, setInputModalAction] = useState(null)

  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [rejectionStage, setRejectionStage] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const totalStageForm = [5, 2, 3, 4, 2, 1]

  const formStructures = {
    stage1: {
      forms: [
        {
          id: "name-plate-details",
          title: "Name Plate Details Transformer",
          fields: [
            { name: "transformerType", label: "Transformer Type", type: "text" },
            { name: "ratedPower", label: "Rated Power (kVA)", type: "number" },
            { name: "primaryVoltage", label: "Primary Voltage (kV)", type: "number" },
            { name: "secondaryVoltage", label: "Secondary Voltage (kV)", type: "number" },
            { name: "frequency", label: "Frequency (Hz)", type: "number" },
            { name: "serialNumber", label: "Serial Number", type: "text" },
            { name: "manufacturingYear", label: "Manufacturing Year", type: "number" },
            { name: "manufacturer", label: "Manufacturer", type: "text" },
            { name: "weight", label: "Weight (kg)", type: "number" },
            { name: "oilQuantity", label: "Oil Quantity (Liters)", type: "number" },
          ],
        },
        {
          id: "protocol-accessories-checking",
          title: "Protocol for Accessories Checking",
          fields: [
            { name: "bushingCondition", label: "Bushing Condition", type: "select", options: ["Good", "Fair", "Poor"] },
            {
              name: "tapChangerOperation",
              label: "Tap Changer Operation",
              type: "select",
              options: ["Smooth", "Stiff", "Not Working"],
            },
            { name: "coolingSystem", label: "Cooling System", type: "select", options: ["Working", "Not Working"] },
            { name: "oilLevel", label: "Oil Level", type: "select", options: ["Normal", "Low", "High"] },
            {
              name: "gasketCondition",
              label: "Gasket Condition",
              type: "select",
              options: ["Good", "Needs Replacement"],
            },
            { name: "earthingConnections", label: "Earthing Connections", type: "select", options: ["Tight", "Loose"] },
          ],
        },
      ],
    },
    stage2: {
      forms: [
        {
          id: "record-oil-handling",
          title: "Record of Oil Handling - Test Values Prior to Filteration",
          fields: [
            { name: "oilTemperature", label: "Oil Temperature (°C)", type: "number" },
            { name: "moistureContent", label: "Moisture Content (ppm)", type: "number" },
            { name: "acidity", label: "Acidity (mg KOH/g)", type: "number" },
            { name: "flashPoint", label: "Flash Point (°C)", type: "number" },
            { name: "pourPoint", label: "Pour Point (°C)", type: "number" },
            { name: "specificGravity", label: "Specific Gravity", type: "number" },
            { name: "viscosity", label: "Viscosity (cSt)", type: "number" },
          ],
        },
      ],
    },
    stage6: {
      forms: [
        {
          id: "work-completion-certificate",
          title: "Work Completion Certificate",
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
            { name: "vpesName", label: "VPES Name", type: "text" },
            { name: "vpesDesignation", label: "VPES Designation", type: "text" },
            { name: "vpesSignature", label: "VPES Signature", type: "text" },
            { name: "vpesDate", label: "VPES Date", type: "date" },
            { name: "customerName2", label: "Customer Representative Name", type: "text" },
            { name: "customerDesignation", label: "Customer Designation", type: "text" },
            { name: "customerSignature", label: "Customer Signature", type: "text" },
            { name: "customerDate", label: "Customer Date", type: "date" },
          ],
        },
      ],
    },
  }

  const formatLabel = (label) => {
    const specialCases = {
      SrNo: "Sr. No.",
      YearOfMfg: "Year Of Mfg",
      ManufacturingYear: "Manufacturing Year",
      SerialNumber: "Serial Number",
      TransformerType: "Transformer Type",
      RatedPower: "Rated Power",
      PrimaryVoltage: "Primary Voltage",
      SecondaryVoltage: "Secondary Voltage",
      OilQuantity: "Oil Quantity",
      BushingCondition: "Bushing Condition",
      TapChangerOperation: "Tap Changer Operation",
      CoolingSystem: "Cooling System",
      OilLevel: "Oil Level",
      GasketCondition: "Gasket Condition",
      EarthingConnections: "Earthing Connections",
      OilTemperature: "Oil Temperature",
      MoistureContent: "Moisture Content",
      FlashPoint: "Flash Point",
      PourPoint: "Pour Point",
      SpecificGravity: "Specific Gravity",
      CustomerName: "Customer Name",
      OrderNumber: "Order Number",
      VoltageRating: "Voltage Rating",
      CompletionDate: "Completion Date",
      ChargingDate: "Charging Date",
      CommissioningDate: "Commissioning Date",
      VpesName: "VPES Name",
      VpesDesignation: "VPES Designation",
      VpesSignature: "VPES Signature",
      VpesDate: "VPES Date",
      CustomerName2: "Customer Representative Name",
      CustomerDesignation: "Customer Designation",
      CustomerSignature: "Customer Signature",
      CustomerDate: "Customer Date",
      // Additional common cases
      TestDate: "Test Date",
      TestTime: "Test Time",
      TestResult: "Test Result",
      InspectionDate: "Inspection Date",
      ApprovalDate: "Approval Date",
      ProjectName: "Project Name",
      CompanyName: "Company Name",
      ContactNumber: "Contact Number",
      EmailAddress: "Email Address",
      InstallationDate: "Installation Date",
      MaintenanceDate: "Maintenance Date",
      WarrantyPeriod: "Warranty Period",
      ServiceDate: "Service Date",
      RepairDate: "Repair Date",
      ReplacementDate: "Replacement Date",
      QualityCheck: "Quality Check",
      SafetyCheck: "Safety Check",
      FinalInspection: "Final Inspection",
      DocumentNumber: "Document Number",
      ReferenceNumber: "Reference Number",
      BatchNumber: "Batch Number",
      LotNumber: "Lot Number",
      ModelNumber: "Model Number",
      PartNumber: "Part Number",
      ItemCode: "Item Code",
      ProductCode: "Product Code",
      MaterialCode: "Material Code",
      SupplierName: "Supplier Name",
      ManufacturerName: "Manufacturer Name",
      BrandName: "Brand Name",
      TradeName: "Trade Name",
      TechnicalSpec: "Technical Spec",
      PerformanceData: "Performance Data",
      OperatingConditions: "Operating Conditions",
      EnvironmentalConditions: "Environmental Conditions",
      StorageConditions: "Storage Conditions",
      HandlingInstructions: "Handling Instructions",
      SafetyInstructions: "Safety Instructions",
      MaintenanceInstructions: "Maintenance Instructions",
      OperatingInstructions: "Operating Instructions",
      InstallationInstructions: "Installation Instructions",
      TroubleshootingGuide: "Troubleshooting Guide",
      UserManual: "User Manual",
      ServiceManual: "Service Manual",
      TechnicalManual: "Technical Manual",
      OperationManual: "Operation Manual",
      MaintenanceManual: "Maintenance Manual",
      InstallationManual: "Installation Manual",
      SafetyManual: "Safety Manual",
      QualityManual: "Quality Manual",
      TestReport: "Test Report",
      InspectionReport: "Inspection Report",
      QualityReport: "Quality Report",
      PerformanceReport: "Performance Report",
      ComplianceReport: "Compliance Report",
      SafetyReport: "Safety Report",
      EnvironmentalReport: "Environmental Report",
      TechnicalReport: "Technical Report",
      AnalysisReport: "Analysis Report",
      EvaluationReport: "Evaluation Report",
      AssessmentReport: "Assessment Report",
      AuditReport: "Audit Report",
      ReviewReport: "Review Report",
      SummaryReport: "Summary Report",
      FinalReport: "Final Report",
      InterimReport: "Interim Report",
      ProgressReport: "Progress Report",
      StatusReport: "Status Report",
      UpdateReport: "Update Report",
      MonthlyReport: "Monthly Report",
      QuarterlyReport: "Quarterly Report",
      AnnualReport: "Annual Report",
      WeeklyReport: "Weekly Report",
      DailyReport: "Daily Report",
    }

    // Check if it's a special case first
    if (specialCases[label]) {
      return specialCases[label]
    }

    // For camelCase words, add spaces before capital letters
    return label.replace(/([a-z])([A-Z])/g, "$1 $2")
  }

  const renderIndexTable = () => {
    return (
      <div
        style={{
          marginBottom: "30px",
          border: "2px solid #333",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#87CEEB",
            padding: "15px",
            textAlign: "center",
            borderBottom: "2px solid #333",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#4169E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              V
            </div>
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
                VISHVAS POWER ENGINEERING SERVICES PVT. LTD., NAGPUR
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#FF6B6B",
              color: "white",
              padding: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            AUTO - PROCESS COMPLAINE CHECKLIST
          </div>
        </div>

        {/* Info Row */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #333",
          }}
        >
          <div style={{ flex: "1", padding: "8px", border: "1px solid #333", fontSize: "0.9rem" }}>
            <strong>Issue No.:</strong> 01
          </div>
          <div style={{ flex: "1", padding: "8px", border: "1px solid #333", fontSize: "0.9rem" }}>
            <strong>Issue Date:</strong> 01.04.2025
          </div>
          <div style={{ flex: "1", padding: "8px", border: "1px solid #333", fontSize: "0.9rem" }}>
            <strong>Revision No.:</strong> 00
          </div>
          <div style={{ flex: "1", padding: "8px", border: "1px solid #333", fontSize: "0.9rem" }}>
            <strong>Revision Date:</strong> 00.00.0000
          </div>
          <div style={{ flex: "1", padding: "8px", border: "1px solid #333", fontSize: "0.9rem" }}>
            <strong>Stages No.:</strong> 1 of 6
          </div>
          <div style={{ flex: "1", padding: "8px", border: "1px solid #333", fontSize: "0.9rem" }}>
            <strong>Doc. No.:</strong> ETC/APCC/01
          </div>
        </div>

        {/* INDEX Title */}
        <div
          style={{
            textAlign: "center",
            padding: "15px",
            fontSize: "1.3rem",
            fontWeight: "bold",
            textDecoration: "underline",
            backgroundColor: "white",
          }}
        >
          INDEX
        </div>

        {/* Table Headers */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#f8f9fa",
            borderBottom: "2px solid #333",
            fontWeight: "bold",
          }}
        >
          <div style={{ flex: "0.5", padding: "12px", border: "1px solid #333", textAlign: "center" }}>Sr. No.</div>
          <div style={{ flex: "3", padding: "12px", border: "1px solid #333", textAlign: "center" }}>Description</div>
          <div style={{ flex: "1", padding: "12px", border: "1px solid #333", textAlign: "center" }}>Stages</div>
          <div style={{ flex: "1", padding: "12px", border: "1px solid #333", textAlign: "center" }}>Doc. No.</div>
        </div>

        {/* Table Rows */}
        {[
          { sr: 1, desc: "Name plate details", stage: "Stage 1", doc: "" },
          { sr: 2, desc: "Checking core insulation & accessories", stage: "Stage 1", doc: "" },
          { sr: 3, desc: "Pre-Erection Tan delta & Capacitance test on bushing", stage: "Stage 1", doc: "" },
          { sr: 4, desc: "Measurment of IR values", stage: "Stage 2", doc: "" },
          { sr: 5, desc: "Record of Oil handling & oil filteration in reservoir tank", stage: "Stage 2", doc: "" },
          { sr: 6, desc: "Lead clearance & after erection IR value", stage: "Stage 2", doc: "" },
          { sr: 7, desc: "Main tank after oil filling , IR value & Pressure test", stage: "Stage 3", doc: "" },
          { sr: 8, desc: "Record of Oil Filteration - Main Tank", stage: "Stage 3", doc: "" },
          { sr: 9, desc: "Oil Filteration of Radiator and Combine", stage: "Stage 3", doc: "ETC/APCC/01" },
          { sr: 10, desc: "After filteration BDV, PPM & PI values", stage: "Stage 3", doc: "" },
          { sr: 11, desc: "SFRA Test Record", stage: "Stage 4", doc: "" },
          { sr: 12, desc: "Tan delta and capacitance test on bushing", stage: "Stage 4", doc: "" },
          { sr: 13, desc: "Tan delta & Capacitance test on winding", stage: "Stage 4", doc: "" },
          { sr: 14, desc: "Record of Measurement of IR Values & Voltage Ratio Test", stage: "Stage 4", doc: "" },
          { sr: 15, desc: "Short Circuit Test", stage: "Stage 4", doc: "" },
          {
            sr: 16,
            desc: "Winding Resistance Test and Record of Measurement of IR & PI Values",
            stage: "Stage 4",
            doc: "",
          },
          { sr: 17, desc: "Pre-Charging Check List", stage: "Stage 5", doc: "" },
          { sr: 18, desc: "Work Completion Report", stage: "Stage 6", doc: "" },
        ].map((row, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa",
              borderBottom: "1px solid #333",
            }}
          >
            <div style={{ flex: "0.5", padding: "10px", border: "1px solid #333", textAlign: "center" }}>{row.sr}</div>
            <div style={{ flex: "3", padding: "10px", border: "1px solid #333" }}>{row.desc}</div>
            <div style={{ flex: "1", padding: "10px", border: "1px solid #333", textAlign: "center" }}>{row.stage}</div>
            <div style={{ flex: "1", padding: "10px", border: "1px solid #333", textAlign: "center" }}>{row.doc}</div>
          </div>
        ))}
      </div>
    )
  }

  const handleViewForm = async (project, stage, formIndex) => {
    try {
      const response = await axios.get(`${BACKEND_API_BASE_URL}/api/data/getFormData`, {
        params: {
          projectName: project.name,
          companyName: project.companyName,
          stage: stage,
          formNumber: formIndex + 1,
        },
      })

      setSelectedFormForView({
        project,
        stage,
        formIndex,
        formData: response.data,
      })
      setViewMode(true)
    } catch (error) {
      console.error("Error fetching form data:", error)
      showNotification("Failed to load form data", "error")
    }
  }

  const generateFormPDF = () => {
    if (!selectedFormForView) return

    const { project, stage, formIndex, formData } = selectedFormForView
    const formStructure = formStructures[`stage${stage}`]?.forms[formIndex]

    if (!formStructure) return

    const element = document.createElement("div")
    element.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        ${renderIndexTable()}
        
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4299e1; padding-bottom: 20px;">
          <h1 style="color: #2d3748; margin-bottom: 10px;">VISHVAS POWER ENGINEERING</h1>
          <h2 style="color: #4a5568; margin-bottom: 20px;">${formStructure.title}</h2>
          <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <div><strong>Project:</strong> ${project.name}</div>
            <div><strong>Company:</strong> ${project.companyName}</div>
            <div><strong>Stage:</strong> ${stage}</div>
          </div>
        </div>
        
        ${
          stage === 6
            ? `
          <div style="margin-bottom: 30px; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; background: #f8fff8;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 3px solid #C41E3A; padding-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 2rem; font-weight: bold; color: #C41E3A;">📋</div>
                <div>
                  <div style="font-size: 1.5rem; font-weight: bold; color: #333;">VISHVAS</div>
                  <div style="font-size: 0.8rem; color: #666;">(A unit of M/s Vishvas Power Engineering Services Pvt Ltd)</div>
                </div>
              </div>
              <div style="text-align: center;">
                <div style="background: #C41E3A; color: white; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                  <div>
                    <div style="font-size: 1.2rem; font-weight: bold;">25</div>
                    <div style="font-size: 0.7rem;">YEARS</div>
                  </div>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="background: #4CAF50; color: white; padding: 5px 10px; border-radius: 5px; margin-bottom: 5px; font-size: 0.8rem;">ISO CERTIFIED</div>
                <div style="font-size: 0.7rem; color: #333;">• 9001 Certified<br>• 14001 Certified<br>• 45001 Certified</div>
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #C41E3A, #8B0000); color: white; padding: 10px 20px; margin-bottom: 30px; clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);">
              <div style="font-size: 1.1rem; font-weight: 600;">Transformers upto 220 kV 250 MVA</div>
            </div>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 1.8rem; font-weight: bold; text-decoration: underline; margin: 0 0 10px 0;">Work completion report</h1>
              <div style="text-align: right; font-size: 1rem;">
                <strong>Date:-</strong> ${formData.completionDate || new Date().toLocaleDateString()}
              </div>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">Project Information</h3>
              <div style="margin-bottom: 15px;"><strong>Customer Name: </strong>${formData.customerName || "_________________"}</div>
              <div style="margin-bottom: 15px;"><strong>Order Number: </strong>${formData.orderNumber || "_________________"}</div>
              <div style="margin-bottom: 15px;"><strong>Location: </strong>${formData.location || "_________________"} <strong style="margin-left: 20px;">SP/SSP</strong></div>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">Transformer Details</h3>
              <div style="margin-bottom: 10px;"><strong>Type: – auto Transformer</strong></div>
              <div style="margin-bottom: 10px;"><strong>Capacity: </strong>${formData.capacity || "_______"}<strong>MVA</strong></div>
              <div style="margin-bottom: 10px;"><strong>Voltage Rating: </strong>${formData.voltageRating || "_______"}<strong>kV</strong></div>
              <div style="margin-bottom: 10px;"><strong>Make: </strong>${formData.make || "_________________"}</div>
              <div style="margin-bottom: 10px;"><strong>Serial Number: </strong>${formData.serialNumber || "_________________"}</div>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">Subject: <em>Completion of Transformer Erection, Testing and Commissioning Work</em></h3>
              <p style="line-height: 1.6; margin-bottom: 15px;">This is to certify that the erection, Testing and commissioning of the above-mentioned transformer have been completed in accordance with the terms and conditions of the referenced order.</p>
              <p style="line-height: 1.6; margin-bottom: 15px;">The installation work has been jointly inspected and found satisfactory by the undersigned representatives. The transformer was successfully charged/commissioned on no-load at ${formData.chargingDate || "_______"} hrs on ${formData.commissioningDate || "_______"} (date).</p>
              <p style="line-height: 1.6; margin-bottom: 30px;">All works under the scope of the order have been completed, and no pending activities remain.</p>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-top: 50px;">
              <div style="width: 45%;">
                <h4 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 20px;">For VPES, Nagpur</h4>
                <div style="margin-bottom: 15px;"><strong>Name: </strong>${formData.vpesName || "_________________"}</div>
                <div style="margin-bottom: 15px;"><strong>Designation: </strong>${formData.vpesDesignation || "_________________"}</div>
                <div style="margin-bottom: 15px;"><strong>Signature: </strong>${formData.vpesSignature ? "[Signature Present]" : "_________________"}</div>
                <div style="margin-bottom: 15px;"><strong>Date: </strong>${formData.vpesDate || "_________________"}</div>
              </div>
              <div style="width: 45%;">
                <h4 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 20px;">For Customer</h4>
                <div style="margin-bottom: 15px;"><strong>Name: </strong>${formData.customerName2 || "_________________"}</div>
                <div style="margin-bottom: 15px;"><strong>Designation: </strong>${formData.customerDesignation || "_________________"}</div>
                <div style="margin-bottom: 15px;"><strong>Signature: </strong>${formData.customerSignature ? "[Signature Present]" : "_________________"}</div>
                <div style="margin-bottom: 15px;"><strong>Date: </strong>${formData.customerDate || "_________________"}</div>
              </div>
            </div>
          </div>
        `
            : `
          <div style="margin-bottom: 30px;">
            ${formStructure.fields
              .map(
                (field) => `
              <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                <strong style="color: #2d3748; width: 40%;">${formatLabel(field.label)}:</strong>
                <span style="width: 55%; text-align: right;">${formData[field.name] || "N/A"}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        `
        }
        
        <div style="margin-top: 40px; display: flex; justify-content: space-between;">
          <div style="text-align: center; width: 30%;">
            <div style="border-top: 2px solid #000; margin-top: 50px; padding-top: 10px;">
              <strong>Prepared By</strong><br>
              Date: ${new Date().toLocaleDateString()}
            </div>
          </div>
          <div style="text-align: center; width: 30%;">
            <div style="border-top: 2px solid #000; margin-top: 50px; padding-top: 10px;">
              <strong>Checked By</strong><br>
              Date: ___________
            </div>
          </div>
          <div style="text-align: center; width: 30%;">
            <div style="border-top: 2px solid #000; margin-top: 50px; padding-top: 10px;">
              <strong>Approved By</strong><br>
              Date: ___________
            </div>
          </div>
        </div>
      </div>
    `

    const opt = {
      margin: 1,
      filename: `${project.name}_Stage${stage}_Form${formIndex + 1}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    html2pdf().set(opt).from(element).save()
  }

  const renderFormView = () => {
    if (!selectedFormForView) return null

    const { project, stage, formIndex, formData } = selectedFormForView
    const formStructure = formStructures[`stage${stage}`]?.forms[formIndex]

    if (!formStructure) return null

    return (
      <div className="form-stage-container">
        <div className="form-header">
          <div className="form-progress">
            <h2>View Form - Stage {stage}</h2>
            <p>{formStructure.title}</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={generateFormPDF} className="submit-btn">
              📄 Download PDF
            </button>
            <button onClick={() => setViewMode(false)} className="back-btn">
              ← Back
            </button>
          </div>
        </div>

        <div className="form-content">
          {renderIndexTable()}

          <div className="company-header">
            <h1>VISHVAS POWER ENGINEERING</h1>
            <h2>{formStructure.title}</h2>
            <div className="project-info">
              <div className="info-item">
                <strong>Project:</strong> {project.name}
              </div>
              <div className="info-item">
                <strong>Company:</strong> {project.companyName}
              </div>
              <div className="info-item">
                <strong>Stage:</strong> {stage}
              </div>
              <div className="info-item">
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {stage === 6 ? (
            <div
              className="stage6-certificate"
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
                  <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#C41E3A" }}>📋</div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>VISHVAS</div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      (A unit of M/s Vishvas Power Engineering Services Pvt Ltd)
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      background: "#C41E3A",
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
                      <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>25</div>
                      <div style={{ fontSize: "0.7rem" }}>YEARS</div>
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
                <div style={{ fontSize: "1.1rem", fontWeight: "600" }}>Transformers upto 220 kV 250 MVA</div>
              </div>

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
                  <strong>Date:-</strong> {formData.completionDate || new Date().toLocaleDateString()}
                </div>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "15px" }}>Project Information</h3>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Customer Name: </strong>
                  {formData.customerName || "_________________"}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Order Number: </strong>
                  {formData.orderNumber || "_________________"}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Location: </strong>
                  {formData.location || "_________________"}
                  <strong style={{ marginLeft: "20px" }}>SP/SSP</strong>
                </div>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "15px" }}>Transformer Details</h3>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Type: – auto Transformer</strong>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Capacity: </strong>
                  {formData.capacity || "_______"}
                  <strong>MVA</strong>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Voltage Rating: </strong>
                  {formData.voltageRating || "_______"}
                  <strong>kV</strong>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Make: </strong>
                  {formData.make || "_________________"}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Serial Number: </strong>
                  {formData.serialNumber || "_________________"}
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
                  Subject: <em>Completion of Transformer Erection, Testing and Commissioning Work</em>
                </h3>
                <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
                  This is to certify that the erection, Testing and commissioning of the above-mentioned transformer
                  have been completed in accordance with the terms and conditions of the referenced order.
                </p>
                <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
                  The installation work has been jointly inspected and found satisfactory by the undersigned
                  representatives. The transformer was successfully charged/commissioned on no-load at{" "}
                  {formData.chargingDate || "_______"} hrs on {formData.commissioningDate || "_______"} (date).
                </p>
                <p style={{ lineHeight: "1.6", marginBottom: "30px" }}>
                  All works under the scope of the order have been completed, and no pending activities remain.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
                <div style={{ width: "45%" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "20px" }}>For VPES, Nagpur</h4>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Name: </strong>
                    {formData.vpesName || "_________________"}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Designation: </strong>
                    {formData.vpesDesignation || "_________________"}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Signature: </strong>
                    {formData.vpesSignature ? (
                      <div
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          marginTop: "5px",
                          minHeight: "60px",
                          background: "white",
                        }}
                      >
                        [Signature Present]
                      </div>
                    ) : (
                      "_________________"
                    )}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Date: </strong>
                    {formData.vpesDate || "_________________"}
                  </div>
                </div>

                <div style={{ width: "45%" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "20px" }}>For Customer</h4>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Name: </strong>
                    {formData.customerName2 || "_________________"}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Designation: </strong>
                    {formData.customerDesignation || "_________________"}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Signature: </strong>
                    {formData.customerSignature ? (
                      <div
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          marginTop: "5px",
                          minHeight: "60px",
                          background: "white",
                        }}
                      >
                        [Signature Present]
                      </div>
                    ) : (
                      "_________________"
                    )}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Date: </strong>
                    {formData.customerDate || "_________________"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form className="form-layout">
              <div className="form-grid">
                {formStructure.fields.map((field, index) => (
                  <div key={index} className="form-group">
                    <label className="form-label">{formatLabel(field.label)}</label>
                    {field.type === "select" ? (
                      <div className="form-select-display">
                        <select value={formData[field.name] || ""} disabled className="form-input disabled">
                          <option value="">{formData[field.name] || "Not Selected"}</option>
                          {field.options?.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={formData[field.name] || ""}
                        disabled
                        className="form-textarea disabled"
                        rows="4"
                        placeholder="No data entered"
                      />
                    ) : field.type === "checkbox" ? (
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          checked={formData[field.name] || false}
                          disabled
                          className="form-checkbox disabled"
                        />
                        <span className="checkbox-label">{formData[field.name] ? "Yes" : "No"}</span>
                      </div>
                    ) : field.type === "file" ? (
                      <div className="file-display">
                        {formData[field.name] ? (
                          <div className="file-preview">
                            <span className="file-name">📎 {formData[field.name]}</span>
                          </div>
                        ) : (
                          <span className="no-file">No file uploaded</span>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ""}
                        disabled
                        className="form-input disabled"
                        placeholder="No data entered"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="signature-section">
                <div className="signature-row">
                  <div className="signature-box">
                    <div className="signature-line"></div>
                    <label>Prepared By</label>
                    <span className="signature-date">Date: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="signature-box">
                    <div className="signature-line"></div>
                    <label>Checked By</label>
                    <span className="signature-date">Date: ___________</span>
                  </div>
                  <div className="signature-box">
                    <div className="signature-line"></div>
                    <label>Approved By</label>
                    <span className="signature-date">Date: ___________</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  // Default data for initialization
  const defaultDepartments = [
    {
      id: 1,
      name: "Auto Transformer",
      description: "Auto transformer department for power distribution systems",
      icon: "⚡",
      color: "#C41E3A",
    },
    {
      id: 2,
      name: "Traction Transformer",
      description: "Traction transformer department for railway systems",
      icon: "🚊",
      color: "#1E3A8A",
    },
    {
      id: 3,
      name: "V Connected 63 MVA Transformer",
      description: "V Connected 63 MVA transformer department for high voltage systems",
      icon: "🔌",
      color: "#047857",
    },
  ]

  const defaultCompanys = [
    {
      id: 101,
      name: "Smart City Infrastructure",
      description: "Urban development Company for smart city implementation",
      status: "active",
      createdAt: "2024-01-15",
      departmentId: 1,
    },
    {
      id: 102,
      name: "Railway Electrification",
      description: "Company for electrifying railway lines",
      status: "active",
      createdAt: "2024-02-01",
      departmentId: 2,
    },
    {
      id: 103,
      name: "Grid Modernization",
      description: "Modernizing the power grid for efficiency",
      status: "active",
      createdAt: "2024-02-15",
      departmentId: 3,
    },
  ]

  const defaultCompanies = []
  const mockSubmittedForms = []

  // Helper functions for modals
  const showNotification = (message, type = "info") => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotificationModal(true)
  }

  const showConfirmDialog = (message, action) => {
    setConfirmMessage(message)
    setConfirmAction(() => action)
    setShowConfirmModal(true)
  }

  const showInputDialog = (title, placeholder, action) => {
    setInputModalTitle(title)
    setInputModalPlaceholder(placeholder)
    setInputModalValue("")
    setInputModalAction(() => action)
    setShowInputModal(true)
  }

  // Load data from localStorage on component mount
  useEffect(() => {
    setDepartments(defaultDepartments)
    var backendSavedCompanys = []
    if (additionalLogging) {
      console.log("Frontend : From UseEffect get call to api/company")
    }
    axios
      .get(`${BACKEND_API_BASE_URL}/api/company`, {
        params: {
          companyName: newCompany.name,
          companyDescription: newCompany.description,
        },
      })
      .then((response) => {
        backendSavedCompanys = response.data

        setCompanys(backendSavedCompanys)
      })
      .catch((error) => {
        console.error("Error creating company on the backend:", error)
        alert("Failed to create company. Please try again.")
      })
  }, [])

  const handleCreateCompany = async () => {
    if (newCompany.name && newCompany.description && selectedDepartment) {
      const CompanyId = Math.max(...Companys.map((p) => p.id), 0) + 1

      const Company = {
        id: CompanyId,
        companyName: newCompany.name,
        companyDescription: newCompany.description,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        departmentId: selectedDepartment.id,
      }

      try {
        if (additionalLogging) {
          console.log("Frontend : From handleCreateCompany post call to api/company")
        }
        const response = await axios.post(`${BACKEND_API_BASE_URL}/api/company`, {
          companyName: newCompany.name,
          companyDescription: newCompany.description,
        })
        console.log("company created successfully on the backend:", response.data)
      } catch (error) {
        console.error("Error creating company on the backend:", error)
        alert("Failed to create company. Please try again.")
        return
      }

      setCompanys([...Companys, Company])
      // setNewCompany({ name: "", description: "" })
      setShowCreateCompanyForm(false)
      showNotification(
        `Company "${Company.companyName}" created successfully in ${selectedDepartment.name}!`,
        "success",
      )
    }
  }

  const handleAddProject = (CompanyName) => {
    showInputDialog("Create New Project", "Enter Project name...", async (ProjectName) => {
      if (ProjectName.trim()) {
        const newProject = {
          id: Math.max(...companies.map((c) => c.id), 0) + 1,
          name: ProjectName,
          companyName: CompanyName,
          stage: 1,
          formsCompleted: 0,
          totalForms: getStageFormCount(1),
          status: "in-progress",
          lastActivity: new Date().toISOString().split("T")[0],
          stageApprovals: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
          },
          submittedStages: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
          },
        }
        try {
          // --- UPDATED POST REQUEST ---
          // We are now sending both the projectName and the CompanyId in the payload.
          if (additionalLogging) {
            console.log("Frontend : From handleAddProject post call to api/company/addCompany")
          }
          const response = await axios.post(`${BACKEND_API_BASE_URL}/api/company/addCompany`, {
            projectName: ProjectName,
            companyName: CompanyName, // Pass the CompanyId to the backend
            companyProjects: newProject,
          })

          console.log("Project created successfully on the backend:", response.data)

          selectedMainCompany.companyProjects = selectedMainCompany.companyProjects ?? []
          selectedMainCompany.companyProjects.push(newProject)

          setCompanies((prev) => [...prev, newProject])
          showNotification(`Project "${ProjectName}" added to this Company!`, "success")
        } catch (error) {
          console.error("Error creating project on the backend:", error)

          showNotification("Failed to create project. Please try again.", "error")
          return
        }
      }
    })
  }

  // Helper function to get form count for each stage
  const getStageFormCount = (stage) => {
    const stageForms = {
      1: 5, // Stage 1 has 4 forms
      2: 1, // Stage 2 has 1 form
      3: 7, // Stage 3 has 7 forms
      4: 6, // Stage 4 has 6 forms
      5: 1, // Stage 5 has 1 form
      6: 1, // Stage 6 has 1 form
    }
    return stageForms[stage] || 1
  }

  const handleReviewStage = async (Project, stage) => {
    if (Project.status !== "pending-approval") {
      showNotification(`No forms submitted for Stage ${stage} yet.`, "warning")
      return
    }
    try {
      const response = await axios.post(`${BACKEND_API_BASE_URL}/api/data/getStageTable`, {
        projectName: Project.name,
        companyName: Project.companyName,
        stage: Project.stage,
      })
      console.log(
        `Complete data has been provided for ${Project.companyName} and projectName ${Project.name}`,
        response.data,
      )
      setFormDataFromDB(response.data.data)
    } catch (error) {
      console.error("Error creating company on the backend:", error)
      alert("Failed to create company. Please try again.")
      return
    }

    setSelectedProjectForReview(Project)
    setCurrentStageReview(stage)
    setReviewMode(true)
  }

  const handleApproveStage = async (stage) => {
    try {
      if (additionalLogging) {
        console.log("Frontend : From handleApproveStage post call to api/company/approveCompanyStage")
      }
      const response = await axios.post(`${BACKEND_API_BASE_URL}/api/company/approveCompanyStage`, {
        companyName: selectedProjectForReview.companyName,
        projectName: selectedProjectForReview.name,
        stage: selectedProjectForReview.stage,
      })
      console.log("company created successfully on the backend:", response.data)
    } catch (error) {
      console.error("Error creating company on the backend:", error)
      alert("Failed to create company. Please try again.")
      return
    }

    if (!selectedProjectForReview) {
      showNotification("No Project selected for review.", "error")
      return
    }

    console.log(`Approving stage ${stage} for Project ${selectedProjectForReview.name}`)

    setSelectedMainCompany((prevCompany) => ({
      ...prevCompany,
      companyProjects: prevCompany.companyProjects.map((project) => {
        if (
          prevCompany.companyName === selectedProjectForReview.companyName &&
          project.name === selectedProjectForReview.name
        ) {
          const currentStage = project.stage
          return {
            ...project,
            stage: currentStage !== 6 ? currentStage + 1 : currentStage,
            status: currentStage === 6 ? "completed" : "in-progress",
            stageApprovals: {
              ...project.stageApprovals,
              [currentStage]: true,
            },
          }
        }
        return project // unchanged projects
      }),
    }))

    showNotification(
      `Stage ${stage} approved for ${selectedProjectForReview.name}! ${
        stage === 6 ? "Project completed all stages." : `Stage ${stage + 1} is now available.`
      }`,
      "success",
    )
    setReviewMode(false)
    setSelectedProjectForReview(null)
    setCurrentStageReview(1)
  }

  const handleRejectStage = (stage) => {
    if (!selectedProjectForReview) {
      showNotification("No Project selected for review.", "error")
      return
    }
    stage.submittedStages[stage.stage] = false
    stage.status = "rejected"
    setRejectionStage(stage)
    setRejectionReason("")
    setShowRejectionModal(true)
  }

  const confirmRejectStage = async () => {
    if (!rejectionReason.trim()) {
      showNotification("Please provide a reason for rejecting this stage.", "warning")
      return
    }

    try {
      const { data } = await axios.post(`${BACKEND_API_BASE_URL}/api/company/rejectStage`, {
        companyName: selectedProjectForReview.companyName,
        projectName: selectedProjectForReview.name,
        stage: rejectionStage.stage,
        rejectionReason,
      })
    } catch (error) {
      console.error("Error rejecting stage:", error)
      showNotification(error.message, "error")
    }

    setRejectionReason(rejectionReason)
    console.log(`Rejecting stage ${rejectionStage} for Project ${selectedProjectForReview.name}`)

    // Update submitted forms status
    setSubmittedForms((forms) =>
      forms.map((form) =>
        form.ProjectId === selectedProjectForReview.id && form.stage === rejectionStage
          ? {
              ...form,
              status: "rejected",
              rejectionReason,
              reviewedAt: new Date().toISOString().split("T")[0],
            }
          : form,
      ),
    )

    // Reset Project stage submission status
    // setCompanies((companies) =>
    //   companies.map((Project) =>
    //     Project.id === selectedProjectForReview.id
    //       ? {
    //           ...Project,
    //           status: "in-progress",
    //           submittedStages: {
    //             ...Project.submittedStages,
    //             [rejectionStage]: false,
    //           },
    //           stageApprovals: {
    //             ...Project.stageApprovals,
    //             [rejectionStage]: false,
    //           },
    //           formsCompleted: 0, // Reset forms completed for this stage
    //           totalForms: getStageFormCount(rejectionStage), // Reset total forms for current stage
    //           lastActivity: new Date().toISOString().split("T")[0],
    //         }
    //       : Project
    //   )
    // );

    showNotification(
      `Stage ${rejectionStage.stage} rejected for Project : ${selectedProjectForReview.name}. Project needs to resubmit forms.`,
      "warning",
    )
    setShowRejectionModal(false)
    setRejectionStage(null)
    setRejectionReason("")
    setReviewMode(false)
    setSelectedProjectForReview(null)
    setCurrentStageReview(1)
  }

  const handleViewSubmittedForms = async (Project) => {
    console.log("Fronend : handleViewSubmittedForm ")
    if (Project.status === "rejected" && Project.rejectionReason) {
      showNotification(`Form got rejected due to  ${Project.rejectionReason}. Please resubmit the forms.`, "warning")
    }

    try {
      if (additionalLogging) {
        console.log("Frontend : From handleCreateCompany post call to api/company")
      }
      const response = await axios.post(`${BACKEND_API_BASE_URL}/api/data/getCompleteTable`, {
        projectName: Project.name,
        companyName: Project.companyName,
      })
      console.log(
        `Complete data has been provided for ${Project.companyName} and projectName ${Project.name}`,
        response.data,
      )
      setFormDataFromDB(response.data.data.autoTransformerData)
    } catch (error) {
      console.error("Error creating company on the backend:", error)

      if (error.response?.status === 404) {
        // ✅ Custom message for 404
        alert("Please fill the forms first")
      } else {
        alert(`Failed to load submitted forms: ${error.response?.data?.message || error.message}`)
      }
      return
    }
    setSelectedProjectForReview(Project)
    setShowSubmitterReview(true)
  }

  const handleBackFromReview = () => {
    setReviewMode(false)
    setShowSubmitterReview(false)
    setSelectedProjectForReview(null)
    setCurrentStageReview(1)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "status-completed"
      case "in-progress":
        return "status-progress"
      case "pending-approval":
        return "status-pending"
      default:
        return "status-default"
    }
  }

  const getStageStatus = (project, stageNumber) => {
    if (project.stageApprovals?.[stageNumber]) {
      return "approved"
    }
    if (project.submittedStages?.[stageNumber]) {
      return "pending-review"
    }
    if (project.stage === stageNumber) {
      return "available"
    }
    return "locked"
  }

  const getDepartmentCompanys = (departmentId) => {
    return Companys.filter((Company) => Company.departmentId === departmentId)
  }

  const getCompanyCompanies = (CompanyId) => {
    return companies.filter((Project) => Project.CompanyId === CompanyId)
  }

  const currentStageForms = reviewMode
    ? submittedForms.filter(
        (form) => form.ProjectId === selectedProjectForReview.id && form.stage === currentStageReview,
      )
    : []

  const allProjectForms = showSubmitterReview
    ? submittedForms.filter((form) => form.ProjectId === selectedProjectForReview.id)
    : []

  const handleLogoutAndClearData = () => {
    localStorage.removeItem("etc_Companys")
    localStorage.removeItem("etc_companies")
    localStorage.removeItem("etc_submitted_forms")

    setCompanys([])
    setCompanies([])
    setSubmittedForms([])
    setSelectedDepartment(null)
    setSelectedMainCompany(null)
    setSelectedProjectForReview(null)
    setReviewMode(false)
    setShowSubmitterReview(false)
    setShowFormStage(false)

    onLogout()
  }

  // Function to handle form submission from FormStage
  const handleFormStageSubmit = (stage, submittedData, selectedProjectForReview) => {
    console.log(`Submittingsds forms for stage ${stage}:`, submittedData, selectedProjectForReview)

    const newFormEntry = {
      id: Math.max(...submittedForms.map((f) => f.id), 0) + 1,
      ProjectId: formStageProject.id,
      stage: stage,
      formName: `Stage ${stage} Forms`,
      submittedAt: new Date().toISOString().split("T")[0],
      status: "pending-review",
      data: submittedData,
    }

    console.log(`Submitting forms for stagew ${stage}:`, newFormEntry)

    setSubmittedForms((prev) => [...prev, newFormEntry])

    // Update Project to show forms submitted and pending approval

    showNotification(`Forms for Stage ${stage} submitted successfully! Waiting for ETC Admin approval.`, "success")
    setShowFormStage(false)
    setFormStageProject(null)
    setFormStageStage(1)
  }

  // Function to go back from FormStage
  const handleBackFromFormStage = () => {
    setShowFormStage(false)
    setFormStageProject(null)
    setFormStageStage(1)
  }

  const capitalizeFirst = (s) => (typeof s === "string" && s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s)

  const isObjectOfObjects = (obj) =>
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.values(obj).every((v) => v && typeof v === "object" && !Array.isArray(v))

  const renderPrimitiveCell = (val, labelForImg = "") => {
    if (typeof val === "string" && val.startsWith("data:image/")) {
      return (
        <img
          src={val || "/placeholder.svg"}
          alt={labelForImg || "image"}
          style={{ maxWidth: "100px", border: "1px solid #ccc" }}
        />
      )
    }
    if (Array.isArray(val)) {
      return JSON.stringify(val)
    }
    return String(val)
  }

  const handleStageSubmit = async (Project) => {
    if (Project.status === "rejected" && Project.rejectionReason) {
      showNotification(`Form got rejected due to  ${Project.rejectionReason}. Please resubmit the forms.`, "warning")
    }

    const nextStage = Project.stage
    const canSubmit = nextStage === 1 || Project.stageApprovals[nextStage - 1]
    setProjectName(Project.name)
    setCompanyName(Project.companyName)

    if (canSubmit && !Project.submittedStages[nextStage]) {
      setFormStageProject(Project)
      setFormStageStage(nextStage)
      setShowFormStage(true)
    } else if (Project.submittedStages[nextStage]) {
      showNotification(`Stage ${nextStage} forms already submitted!`, "warning")
    } else {
      showNotification(`Stage ${nextStage - 1} must be approved first!`, "warning")
    }
  }

  const handleProjectDelete = async (Project) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete project "${Project.name}" from company "${Project.companyName}"?`,
    )

    if (!confirmDelete) {
      // User clicked "Cancel"
      return
    }

    try {
      if (additionalLogging) {
        console.log("Frontend : From handleDeleteProject delete call to api/company/deleteProject")
      }

      // ✅ Axios DELETE requires "data" wrapper for body
      const response = await axios.delete(`${BACKEND_API_BASE_URL}/api/company/deleteProject`, {
        data: {
          projectName: Project.name,
          companyName: Project.companyName,
        },
      })

      console.log("Project deleted successfully from backend:", response.data)

      selectedMainCompany.companyProjects = (selectedMainCompany.companyProjects ?? []).filter(
        (proj) => !(proj.companyName === Project.companyName && proj.name === Project.name),
      )

      // ✅ Update frontend state by filtering out the deleted project
      setCompanies((prev) =>
        prev.map((company) =>
          company.companyName === Project.companyName
            ? {
                ...company,
                companyProjects: (company.companyProjects ?? []).filter(
                  (proj) => !(proj.companyName === Project.companyName && proj.name === Project.name),
                ),
              }
            : company,
        ),
      )

      showNotification(`Project "${Project.name}" deleted successfully!`, "success")
    } catch (error) {
      console.error("Error deleting project on the backend:", error)
      showNotification("Failed to delete project. Please try again.", "error")
    }
  }

  const handleCompanyDelete = async (company) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete company "${company.companyName}" and all its projects?`,
    )

    if (!confirmDelete) return

    try {
      if (additionalLogging) {
        console.log("Frontend : From handleDeleteProject delete call to api/company/deleteProject")
      }

      // ✅ Axios DELETE requires "data" wrapper for body
      const response = await axios.delete(`${BACKEND_API_BASE_URL}/api/company/deleteCompany`, {
        data: { companyName: company.companyName },
      })

      console.log("Company deleted successfully from backend:", response.data)

      // ✅ Update frontend state → remove the company
      setCompanys((prev) => prev.filter((c) => c.companyName !== company.companyName))

      showNotification(`Company "${company.companyName}" deleted successfully!`, "success")
    } catch (error) {
      console.error("Error deleting company on the backend:", error)
      showNotification("Failed to delete company. Please try again.", "error")
    }
  }

  const [expandedStages, setExpandedStages] = useState({})

  const toggleStageExpansion = (stageKey) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageKey]: !prev[stageKey],
    }))
  }

  const handleDownloadAllForms = async () => {
    try {
      const allStageKeys = Object.keys(formDataFromDB)
      if (!allStageKeys.length) {
        showNotification("No forms data available to download", "warning")
        return
      }

      // Send request to backend
      const response = await axios.post(
        `${BACKEND_API_BASE_URL}/api/data/download-all-forms`,
        {
          projectName: selectedProjectForReview?.name,
          formData: formDataFromDB,
        },
        { responseType: "blob" }, // VERY IMPORTANT for PDFs
      )

      // Download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${selectedProjectForReview?.name || "project"}_all_stages.pdf`)
      document.body.appendChild(link)
      link.click()

      showNotification("All forms and stages downloaded successfully as PDF!", "success")
    } catch (error) {
      console.error("Error downloading the PDF", error)
      showNotification("Failed to download PDF. Please try again.", "error")
    }
  }

  return (
    <div className="dashboard-container">
      <header className="etc-header">
        <div className="header-content">
          <div className="header-left">
            {user?.role === "main-admin" && (
              <button onClick={onBackToMain} className="back-btn">
                ← Back
              </button>
            )}
            <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            <img src="/logo.png" alt="Vishvas Power" className="logo" />
            <div className="header-title">
              <h1>
                {showFormStage
                  ? `Submit Forms - ${formStageProject?.name} (Stage ${formStageStage})`
                  : reviewMode
                    ? `Review Stage ${currentStageReview} - ${selectedProjectForReview?.name}`
                    : showSubmitterReview
                      ? `Submitted Forms - ${selectedProjectForReview?.name}`
                      : selectedMainCompany
                        ? `${selectedMainCompany.name} - Companies`
                        : selectedDepartment
                          ? `${selectedDepartment.name} - Companys`
                          : "ETC Admin Panel"}
              </h1>
              <p>
                {showFormStage
                  ? "Fill out and submit the required forms for this stage."
                  : reviewMode
                    ? "Review and approve/reject stage forms"
                    : showSubmitterReview
                      ? "View all submitted forms by Project"
                      : selectedMainCompany
                        ? "Manage companies and their workflows"
                        : selectedDepartment
                          ? "Manage Companys in department"
                          : "Manage departments, Companys and companies"}
              </p>
            </div>
          </div>

          <div className="header-right desktop-only">
            <span className="user-badge">ETC Admin</span>
            <button onClick={handleLogoutAndClearData} className="logout-btn">
              🚪 Logout
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-menu-header">
                  <img src="/logo.png" alt="Vishvas Power" className="logo-small" />
                  <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                    ×
                  </button>
                </div>
                <div className="mobile-menu-content">
                  <div className="mobile-user-info">
                    <span className="user-badge">ETC Admin</span>
                  </div>
                  <button onClick={handleLogoutAndClearData} className="mobile-logout-btn">
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="etc-main">
        {viewMode ? (
          renderFormView()
        ) : showFormStage && formStageProject ? (
          <FormStage
            firstFormDataFromDB={formDataFromDB}
            projectName={projectName}
            companyName={companyName}
            stage={formStageStage}
            onFormSubmit={handleFormStageSubmit}
            onBack={handleBackFromFormStage}
            ProjectData={formStageProject}
            setSelectedMainCompany={setSelectedMainCompany}
            selectedProjectForReview={selectedProjectForReview}
          />
        ) : reviewMode ? (
          <>
            <div className="section-header">
              <div>
                <h2>Stage {currentStageReview} Forms Review</h2>
                <p>Review all forms submitted for Stage {currentStageReview}</p>
              </div>
              <button onClick={handleBackFromReview} className="back-btn">
                ← Back to Companies
              </button>
            </div>

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
                  <strong>Status:</strong> {getStageStatus(selectedProjectForReview, currentStageReview)}
                </p>
              </div>
            </div>

            <div className="forms-review-grid">
              {Object.entries(formDataFromDB).map(([formKey, formData]) => (
                <div key={`${1}-${formKey}`} className={`form-review-card ${selectedProjectForReview?.status}`}>
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
                      {selectedProjectForReview?.status === "approved" && "✅ Approved"}
                      {selectedProjectForReview?.status === "rejected" && "❌ Rejected"}
                      {selectedProjectForReview?.status === "pending-review" && "⏳ Pending Review"}
                    </span>
                  </div>

                  <div className="form-layout-preview">
                    <div className="form-grid-preview">
                      {Object.entries(formData).map(([fieldKey, fieldValue], idx) => (
                        <div className="form-group-preview" key={fieldKey || idx}>
                          <label className="form-label-preview">{capitalizeFirst(fieldKey)}:</label>

                          {/* Handle different field types with proper form styling */}
                          {fieldKey.toLowerCase() === "photos" && fieldValue && typeof fieldValue === "object" ? (
                            <div className="photo-display-grid">
                              {Object.entries(fieldValue).map(([photoKey, url]) => {
                                const fullUrl = url.startsWith("http") ? url : `${BACKEND_API_BASE_URL}/${url}`
                                return (
                                  <div key={photoKey} className="photo-item">
                                    <span className="photo-label">{photoKey}</span>
                                    <img
                                      src={fullUrl || "/placeholder.svg"}
                                      alt={photoKey}
                                      className="photo-preview-img"
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          ) : typeof fieldValue === "string" ? (
                            fieldValue.startsWith("data:image/") ? (
                              <div className="image-field-display">
                                <img
                                  src={fieldValue || "/placeholder.svg"}
                                  alt={fieldKey}
                                  className="form-image-preview"
                                />
                              </div>
                            ) : (
                              <div className="form-input-display">
                                <input
                                  type="text"
                                  value={fieldValue}
                                  disabled
                                  className="form-input disabled preview"
                                />
                              </div>
                            )
                          ) : Array.isArray(fieldValue) ? (
                            fieldValue.length === 0 ? (
                              <div className="form-input-display">
                                <input type="text" value="No data" disabled className="form-input disabled preview" />
                              </div>
                            ) : typeof fieldValue[0] === "object" && fieldValue[0] !== null ? (
                              <div className="array-data-display">
                                {fieldValue.map((row, i) => (
                                  <div key={i} className="array-item-form">
                                    <h5 className="array-item-title">
                                      {capitalizeFirst(fieldKey)} {i + 1}
                                    </h5>
                                    <div className="array-item-grid">
                                      {Object.entries(row).map(([k, v]) => (
                                        <div key={k} className="array-field-group">
                                          <label className="array-field-label">{capitalizeFirst(k)}:</label>
                                          <div className="array-field-value">
                                            {typeof v === "string" && v.startsWith("data:image/") ? (
                                              <img
                                                src={v || "/placeholder.svg"}
                                                alt={k}
                                                className="array-image-preview"
                                              />
                                            ) : (
                                              <input
                                                type="text"
                                                value={String(v)}
                                                disabled
                                                className="form-input disabled preview small"
                                              />
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="form-input-display">
                                <textarea
                                  value={fieldValue.join(", ")}
                                  disabled
                                  className="form-textarea disabled preview"
                                  rows="2"
                                />
                              </div>
                            )
                          ) : typeof fieldValue === "object" && fieldValue !== null ? (
                            <div className="object-data-display">
                              <div className="object-fields-grid">
                                {Object.entries(fieldValue).map(([k, v]) => (
                                  <div key={k} className="object-field-group">
                                    <label className="object-field-label">{capitalizeFirst(k)}:</label>
                                    <div className="object-field-value">
                                      {typeof v === "string" && v.startsWith("data:image/") ? (
                                        <img src={v || "/placeholder.svg"} alt={k} className="object-image-preview" />
                                      ) : (
                                        <input
                                          type="text"
                                          value={String(v)}
                                          disabled
                                          className="form-input disabled preview small"
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="form-input-display">
                              <input
                                type="text"
                                value={String(fieldValue)}
                                disabled
                                className="form-input disabled preview"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
        ) : showSubmitterReview ? (
          <>
            <div className="section-header">
              <div>
                <h2>All Submitted Forms</h2>
                <p>Review all forms submitted by {selectedProjectForReview?.name}</p>
              </div>
              <div className="header-actions">
                <button
                  onClick={handleDownloadAllForms}
                  className="download-all-btn"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginRight: "16px",
                  }}
                >
                  📥 Download All Forms & Stages
                </button>
                <button onClick={handleBackFromReview} className="back-btn">
                  ← Back to Companies
                </button>
              </div>
            </div>

            <div className="submitter-review-summary">
              <div className="review-stats">
                <div className="stat-card">
                  <h4>Total Forms</h4>
                  <div className="stat-number">{allProjectForms.length}</div>
                </div>
                <div className="stat-card">
                  <h4>Approved</h4>
                  <div className="stat-number">{allProjectForms.filter((f) => f.status === "approved").length}</div>
                </div>
                <div className="stat-card">
                  <h4>Pending</h4>
                  <div className="stat-number">
                    {allProjectForms.filter((f) => f.status === "pending-review").length}
                  </div>
                </div>
                <div className="stat-card">
                  <h4>Rejected</h4>
                  <div className="stat-number">{allProjectForms.filter((f) => f.status === "rejected").length}</div>
                </div>
              </div>
            </div>

            <div className="stages-review-container">
              {Object.entries(formDataFromDB).map(([stageKey, forms]) => (
                <div key={stageKey} className="stage-forms-section">
                  <div
                    className="stage-header-clickable"
                    onClick={() => toggleStageExpansion(stageKey)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 20px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "12px",
                      marginBottom: expandedStages[stageKey] ? "20px" : "0",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: "white",
                        fontSize: "1.3rem",
                        fontWeight: "700",
                      }}
                    >
                      {stageKey.replace("stage", "Stage ")} ({Object.keys(forms).length} forms)
                    </h3>
                    <span
                      style={{
                        color: "white",
                        fontSize: "1.2rem",
                        transform: expandedStages[stageKey] ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      ▼
                    </span>
                  </div>

                  {expandedStages[stageKey] && (
                    <div
                      className="forms-dropdown-content"
                      style={{
                        animation: "slideDown 0.3s ease-out",
                      }}
                    >
                      {Object.entries(forms).map(([formKey, formData]) => (
                        <div
                          key={`${stageKey}-${formKey}`}
                          className={`form-review-card ${selectedProjectForReview?.status}`}
                          style={{
                            marginBottom: "20px",
                            border: "2px solid #e5e7eb",
                            borderRadius: "12px",
                            padding: "20px",
                            background: "white",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <h4
                            style={{
                              color: "#374151",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              marginBottom: "16px",
                              paddingBottom: "8px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            📋 {formKey.replace("form", "Form ")}
                          </h4>

                          <div className="form-layout-preview">
                            <div className="form-grid-preview">
                              {Object.entries(formData).map(([fieldKey, fieldValue]) => {
                                // Handle photos specially
                                if (fieldKey === "photos" && fieldValue && typeof fieldValue === "object") {
                                  return (
                                    <div
                                      key={`${stageKey}-${formKey}-photos`}
                                      className="form-group-preview photo-group"
                                    >
                                      <label className="form-label-preview">
                                        📸 {fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}
                                      </label>
                                      <div className="photo-display-grid">
                                        {Object.entries(fieldValue).map(([photoKey, url]) => {
                                          const fullUrl = url.startsWith("http")
                                            ? url
                                            : `${BACKEND_API_BASE_URL}/${url}`
                                          return (
                                            <div key={photoKey} className="photo-item">
                                              <span className="photo-label">{photoKey}</span>
                                              <img
                                                src={fullUrl || "/placeholder.svg"}
                                                alt={photoKey}
                                                className="photo-preview-img"
                                              />
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  )
                                }

                                // Handle strings & numbers with form input styling
                                if (typeof fieldValue === "string" || typeof fieldValue === "number") {
                                  return (
                                    <div key={`${stageKey}-${formKey}-${fieldKey}`} className="form-group-preview">
                                      <label className="form-label-preview">
                                        {fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}
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
                                  )
                                }

                                return null
                              })}
                            </div>

                            <div className="form-preview-container">
                              {(() => {
                                const stageNumber = Number.parseInt(stageKey.replace("stage", ""))
                                const formIndex = Number.parseInt(formKey.replace("form", "")) - 1
                                const formStructure = formStructures[`stage${stageNumber}`]?.forms[formIndex]

                                if (!formStructure) return <div>Form structure not found</div>

                                return (
                                  <div className="direct-form-view">
                                    <div className="form-title-only">
                                      <h4>{formStructure.title}</h4>
                                    </div>

                                    <div className="mini-form-layout">
                                      <div className="mini-form-grid">
                                        {formStructure.fields.map((field, fieldIndex) => (
                                          <div key={fieldIndex} className="mini-form-group">
                                            <label className="mini-form-label">{field.label}:</label>
                                            <div className="mini-form-value">
                                              {field.type === "select" ? (
                                                <span>{formData[field.name] || "Not Selected"}</span>
                                              ) : field.type === "textarea" ? (
                                                <span className="textarea-preview">
                                                  {formData[field.name] || "No data entered"}
                                                </span>
                                              ) : field.type === "checkbox" ? (
                                                <span className="checkbox-preview">
                                                  {formData[field.name] ? "✓ Yes" : "✗ No"}
                                                </span>
                                              ) : field.type === "file" ? (
                                                <span className="file-preview">
                                                  {formData[field.name] ? `📎 ${formData[field.name]}` : "No file"}
                                                </span>
                                              ) : (
                                                <span>{formData[field.name] || "No data entered"}</span>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : !selectedDepartment ? (
          <>
            <div className="section-header">
              <div>
                <h2>Transformer Categories</h2>
                <p>Select a category to manage Companys and companies</p>
              </div>
            </div>

            <div className="departments-grid">
              {departments.map((department) => {
                const departmentCompanys = getDepartmentCompanys(department.id)
                return (
                  <div
                    key={department.id}
                    className="department-card"
                    onClick={() => setSelectedDepartment(department)}
                  >
                    <div className="department-header">
                      <div className="department-icon" style={{ backgroundColor: department.color }}>
                        {department.icon}
                      </div>
                      <span className="status-badge status-progress">Active</span>
                    </div>
                    <h3>{department.name}</h3>
                    <p>{department.description}</p>
                    <div className="department-footer">
                      <span>📁 {departmentCompanys.length} Companys</span>
                      <span>
                        🏢{" "}
                        {departmentCompanys.reduce((acc, proj) => {
                          return acc + getCompanyCompanies(proj.id).length
                        }, 0)}{" "}
                        companies
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : !selectedMainCompany ? (
          <>
            <div className="section-header">
              <div>
                <h2>Companys in {selectedDepartment.name}</h2>
                <p>Create and manage Companys for this category</p>
              </div>
              <div className="section-actions">
                <button onClick={() => setShowCreateCompanyForm(true)} className="create-btn">
                  ➕ Create Company
                </button>
                <button onClick={() => setSelectedDepartment(null)} className="back-btn">
                  ← Back to Categories
                </button>
              </div>
            </div>

            <div className="search-bar">
              <input
                type="text"
                placeholder="🔍 Search Companys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {showCreateCompanyForm && (
              <div className="modal-overlay" onClick={() => setShowCreateCompanyForm(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <img src="/logo.png" alt="Vishvas Power" className="logo-small" />
                    <h3>Create New Company in {selectedDepartment.name}</h3>
                  </div>
                  <p>Companies will be added to this Company after creation</p>
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter Company name"
                      value={newCompany.companyName}
                      onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      placeholder="Enter Company description"
                      value={newCompany.companyDescription}
                      onChange={(e) =>
                        setNewCompany({
                          ...newCompany,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      required
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      onClick={handleCreateCompany}
                      className="submit-btn"
                      disabled={!newCompany.name || !newCompany.description}
                    >
                      Create Company
                    </button>
                    <button onClick={() => setShowCreateCompanyForm(false)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="Companys-grid">
              {Companys.map((Company) => {
                const CompanyCompanies = getCompanyCompanies(Company.id)

                return (
                  <div key={Company._id} className="Company-card">
                    <div className="Company-header">
                      <div className="Company-icon" style={{ backgroundColor: selectedDepartment.color }}>
                        📁
                      </div>
                      <span className={`status-badge ${getStatusColor(Company.status)}`}>{Company.status}</span>
                    </div>
                    <h3>{Company.companyName}</h3>
                    <p>{Company.companyDescription}</p>
                    <div className="Company-footer">
                      <span>🏢 {Company?.companyProjects?.length} companies</span>
                      <span>📅 {Company.createdAt}</span>
                    </div>
                    <div
                      className="Company-actions"
                      style={{
                        marginTop: "15px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCompanyDelete(Company)
                        }}
                        className="delete-btn"
                        style={{
                          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", // red gradient
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        🗑️ Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedMainCompany(Company)
                        }}
                        className="view-btn"
                        style={{
                          background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        👁️ View Companies
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <div className="section-header">
              <div>
                <h2>Companies in {selectedMainCompany.companyName}</h2>
                <p>Manage companies and their workflows</p>
              </div>
              <div className="section-actions">
                <button onClick={() => handleAddProject(selectedMainCompany.companyName)} className="create-btn">
                  ➕ Create Project
                </button>
                <button onClick={() => setSelectedMainCompany(null)} className="back-btn">
                  ← Back to Companys
                </button>
              </div>
            </div>

            <div className="companies-grid">
              {selectedMainCompany.companyProjects === undefined || selectedMainCompany.companyProjects.length === 0 ? (
                <p className="no-data-message">
                  No companies found for this Company. Click "Create Company" to create one.
                </p>
              ) : (
                selectedMainCompany.companyProjects.map((Project, index) => (
                  <div key={index} className="Project-card">
                    <div className="Project-header">
                      <div className="Project-icon" style={{ backgroundColor: "#1E3A8A" }}>
                        🏢
                      </div>
                      <span className={`status-badge ${getStatusColor(Project.status)}`}>
                        {Project.status === "pending-approval" && "⏳"}
                        {Project.status === "in-progress" && "🔄"}
                        {Project.status === "completed" && "✅"}
                        {Project.status}
                      </span>
                    </div>
                    <h3>{Project.name}</h3>
                    <p>
                      Stage {Project.stage} • {Project.formsCompleted}/{totalStageForm[Project.stage - 1]} forms
                      completed
                    </p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(Project.formsCompleted / Project.totalForms) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="Project-footer">
                      <span>📊 {Math.round((Project.formsCompleted / Project.totalForms) * 100)}% complete</span>
                      <span>📅 {Project.lastActivity}</span>
                    </div>

                    <div className="stage-management">
                      <h4>Stage Management:</h4>
                      <div className="stages-row">
                        {[1, 2, 3, 4, 5, 6].map((stage) => {
                          const stageStatus = getStageStatus(Project, stage)
                          return (
                            <div key={stage} className={`stage-item ${stageStatus}`}>
                              <div className="stage-number">{stage}</div>
                              <div className="stage-status-text">
                                {stageStatus === "approved" && "✅ Approved"}
                                {stageStatus === "pending-review" && "⏳ Pending"}
                                {stageStatus === "available" && "📝 Available"}
                                {stageStatus === "locked" && "🔒 Locked"}
                              </div>
                              {stageStatus === "pending-review" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleReviewStage(Project, stage)
                                  }}
                                  className="review-stage-btn"
                                >
                                  Review
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div
                      className="Project-actions"
                      style={{
                        marginTop: "15px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {/* View Forms */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewSubmittedForms(Project)
                        }}
                        className="view-forms-btn"
                        style={{
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        📋 View Forms
                      </button>

                      {/* Submit Stage */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStageSubmit(Project)
                        }}
                        className="submit-test-btn"
                        style={{
                          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        📝 Submit Stage {Project.stage}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProjectDelete(Project)
                        }}
                        className="delete-btn"
                        style={{
                          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", // red gradient
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        🗑️ Delete Project
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        <div className="dashboard-footer">
          <div className="footer-logo">
            <img src="/logo.png" alt="Vishvas Power" className="logo" />
            <p>Powered by Vishvas Power</p>
          </div>
        </div>
      </main>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="modal-overlay" onClick={() => setShowNotificationModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {notificationType === "success" && <span style={{ fontSize: "1.5rem" }}>✅</span>}
                {notificationType === "error" && <span style={{ fontSize: "1.5rem" }}>❌</span>}
                {notificationType === "warning" && <span style={{ fontSize: "1.5rem" }}>⚠️</span>}
                {notificationType === "info" && <span style={{ fontSize: "1.5rem" }}>ℹ️</span>}
                <h3>
                  {notificationType === "success" && "Success"}
                  {notificationType === "error" && "Error"}
                  {notificationType === "warning" && "Warning"}
                  {notificationType === "info" && "Information"}
                </h3>
              </div>
            </div>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                margin: "20px 0",
              }}
            >
              {notificationMessage}
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowNotificationModal(false)} className="submit-btn">
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.5rem" }}>❓</span>
                <h3>Confirmation</h3>
              </div>
            </div>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                margin: "20px 0",
              }}
            >
              {confirmMessage}
            </p>
            <div className="modal-actions">
              <button
                onClick={() => {
                  if (confirmAction) confirmAction()
                  setShowConfirmModal(false)
                  setConfirmAction(null)
                }}
                className="submit-btn"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false)
                  setConfirmAction(null)
                }}
                className="cancel-btn"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input Modal */}
      {showInputModal && (
        <div className="modal-overlay" onClick={() => setShowInputModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.5rem" }}>✏️</span>
                <h3>{inputModalTitle}</h3>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder={inputModalPlaceholder}
                value={inputModalValue}
                onChange={(e) => setInputModalValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && inputModalValue.trim()) {
                    if (inputModalAction) inputModalAction(inputModalValue.trim())
                    setShowInputModal(false)
                    setInputModalAction(null)
                    setInputModalValue("")
                  }
                }}
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => {
                  if (inputModalValue.trim() && inputModalAction) {
                    inputModalAction(inputModalValue.trim())
                  }
                  setShowInputModal(false)
                  setInputModalAction(null)
                  setInputModalValue("")
                }}
                className="submit-btn"
                disabled={!inputModalValue.trim()}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowInputModal(false)
                  setInputModalAction(null)
                  setInputModalValue("")
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="modal-overlay" onClick={() => setShowRejectionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.5rem" }}>❌</span>
                <h3>Reject Stage {rejectionStage.stage}</h3>
              </div>
            </div>
            <p style={{ fontSize: "1rem", color: "#666", marginBottom: "20px" }}>
              Please provide a detailed reason for rejecting this stage. This will help the submitter understand what
              needs to be corrected.
            </p>
            <div className="form-group">
              <label>Rejection Reason *</label>
              <textarea
                placeholder="Enter detailed reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows="4"
                style={{ minHeight: "120px" }}
                required
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={confirmRejectStage}
                className="reject-stage-btn"
                disabled={!rejectionReason.trim()}
                style={{
                  background: rejectionReason.trim() ? "linear-gradient(135deg, #f44336, #d32f2f)" : "#ccc",
                  cursor: rejectionReason.trim() ? "pointer" : "not-allowed",
                }}
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => {
                  setShowRejectionModal(false)
                  setRejectionStage(null)
                  setRejectionReason("")
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ETCAdminPanel
