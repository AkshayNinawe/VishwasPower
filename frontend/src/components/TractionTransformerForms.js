"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import "./form-styles.css"
import axios from "axios"
import { BACKEND_API_BASE_URL } from "./constant"

// Signature Canvas Hook
const useSignatureCanvas = (initialDataUrl) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [signatureDataUrl, setSignatureDataUrl] = useState(initialDataUrl || "")
  const lastX = useRef(0)
  const lastY = useRef(0)

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setSignatureDataUrl("")
    }
  }, [])

  const getSignature = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      return canvas.toDataURL("image/png")
    }
    return ""
  }, [])

  const draw = useCallback(
    (e) => {
      // Prevent default touch behavior to stop page scrolling
      e.preventDefault()
      
      if (!isDrawing) return

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      const rect = canvas.getBoundingClientRect()

      let clientX, clientY
      if (e.touches) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      const currentX = clientX - rect.left
      const currentY = clientY - rect.top

      ctx.beginPath()
      ctx.moveTo(lastX.current, lastY.current)
      ctx.lineTo(currentX, currentY)
      ctx.stroke()

      lastX.current = currentX
      lastY.current = currentY
    },
    [isDrawing]
  )

  const startDrawing = useCallback((e) => {
    // Prevent default touch behavior to stop page scrolling
    e.preventDefault()
    
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    let clientX, clientY
    if (e.touches) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    lastX.current = clientX - rect.left
    lastY.current = clientY - rect.top
  }, [])

  const stopDrawing = useCallback((e) => {
    // Prevent default touch behavior to stop page scrolling
    if (e) {
      e.preventDefault()
    }
    
    setIsDrawing(false)
    setSignatureDataUrl(getSignature())
  }, [getSignature])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.strokeStyle = "#000"

      if (initialDataUrl) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = initialDataUrl
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
      }
    }
  }, [initialDataUrl])

  // Additional touch event handling to prevent page scrolling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const preventTouch = (e) => {
      e.preventDefault()
    }

    // Add passive: false to ensure preventDefault works
    canvas.addEventListener('touchstart', preventTouch, { passive: false })
    canvas.addEventListener('touchmove', preventTouch, { passive: false })
    canvas.addEventListener('touchend', preventTouch, { passive: false })

    return () => {
      canvas.removeEventListener('touchstart', preventTouch)
      canvas.removeEventListener('touchmove', preventTouch)
      canvas.removeEventListener('touchend', preventTouch)
    }
  }, [])

  return {
    canvasRef,
    signatureDataUrl,
    clearCanvas,
    startDrawing,
    draw,
    stopDrawing,
  }
}

// Enhanced Photo Upload Component
const PhotoUploadSection = ({ title, photos, onPhotoChange, allowMultiple = false }) => {
  const [cameraStream, setCameraStream] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setCameraStream(stream)
      setShowCamera(true)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
      setShowCamera(false)
    }
  }

  const capturePhoto = (photoKey) => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
              type: "image/jpeg",
            })
            onPhotoChange(photoKey, file)
            stopCamera()
          }
        },
        "image/jpeg",
        0.8,
      )
    }
  }

  const handleFileSelect = (photoKey, files) => {
    if (allowMultiple && files.length > 1) {
      Array.from(files).forEach((file, index) => {
        onPhotoChange(`${photoKey}_${index}`, file)
      })
    } else {
      onPhotoChange(photoKey, files[0])
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="photo-upload-section">
      <h4>Note: - Photographs to be added: -</h4>
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>{title}</p>

      {showCamera && (
        <div
          className="camera-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video ref={videoRef} autoPlay playsInline style={{ maxWidth: "90%", maxHeight: "70%" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => capturePhoto(photos[0]?.key)}
              className="capture-btn"
              style={{
                padding: "10px 20px",
                margin: "0 10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              📷 Capture Photo
            </button>
            <button
              onClick={stopCamera}
              style={{
                padding: "10px 20px",
                margin: "0 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      <div className="photo-upload-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-upload-item">
            <label>{photo.label}</label>

            <div className="upload-options" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                type="button"
                onClick={startCamera}
                className="camera-btn"
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                📷 Camera
              </button>

              <label
                className="gallery-btn"
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#FF9800",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                🖼️ Gallery
                <input
                  type="file"
                  accept="image/*"
                  multiple={allowMultiple}
                  onChange={(e) => handleFileSelect(photo.key, e.target.files)}
                  style={{ display: "none" }}
                />
              </label>

              {allowMultiple && (
                <label
                  className="bulk-btn"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#9C27B0",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  📁 Bulk
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(photo.key, e.target.files)}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => onPhotoChange(photo.key, e.target.files[0])}
              style={{ marginTop: "10px", width: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Individual Signature Box Component
const SignatureBox = ({
  label,
  nameValue,
  onNameChange,
  onSignatureChange,
  initialSignature,
}) => {
  const {
    canvasRef,
    signatureDataUrl,
    clearCanvas,
    startDrawing,
    draw,
    stopDrawing,
  } = useSignatureCanvas(initialSignature);

  useEffect(() => {
    if (signatureDataUrl) {
      onSignatureChange(signatureDataUrl);
    }
  }, [signatureDataUrl, onSignatureChange]);

  return (
    <div className="signature-box">
      <label>{label}</label>
      <input
        type="text"
        placeholder="Enter name"
        value={nameValue}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        style={{ 
          border: "1px solid #ccc", 
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none"
        }}
      />
      <button
        type="button"
        onClick={clearCanvas}
        className="clear-signature-btn"
      >
        Clear Signature
      </button>
      <small>Sign above</small>
    </div>
  );
};

// V Connected 63 MVA Transformer Forms

// Stage 1 Forms
export function Stage1Form1({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyData,
  stage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    make: "",
    currentHV: "",
    srNo: "",
    currentLV: "",
    mvaRating: "",
    tempRiseOilC: "",
    hvKv: "",
    windingC: "",
    lvKv: "",
    oilQuantity: "",
    impedancePercent: "",
    weightCoreWdg: "",
    yearOfMfg: "",
    transportingWeight: "",
    noOfCoolingFan: "",
    totalWeight: "",
    noOfRadiators: "",
    noOfTaps: "",
    mfgOfOctc: "",
    typeOfOctc: "",
    srNoOctc: "",
    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage1Form1`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for stage1Form1")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "transformer", label: "Transformer" },
    { key: "oilLevelGauge", label: "Oil Level Gauge" },
    { key: "wheelLocking", label: "Wheel Locking" },
    {
      key: "transformerFoundation",
      label: "Transformer Foundation Level condition",
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />
            </td>
            <td>
              <strong>CURRENT HV (A)</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.currentHV}
                onChange={(e) => setFormData({ ...formData, currentHV: e.target.value })}
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
                value={formData.srNo}
                onChange={(e) => setFormData({ ...formData, srNo: e.target.value })}
              />
            </td>
            <td>
              <strong>LV (A)</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.currentLV}
                onChange={(e) => setFormData({ ...formData, currentLV: e.target.value })}
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
                value={formData.mvaRating}
                onChange={(e) => setFormData({ ...formData, mvaRating: e.target.value })}
              />
            </td>
            <td>
              <strong>Temp. Rise over amb. Oil in °C</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.tempRiseOilC}
                onChange={(e) => setFormData({ ...formData, tempRiseOilC: e.target.value })}
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
                value={formData.hvKv}
                onChange={(e) => setFormData({ ...formData, hvKv: e.target.value })}
              />
            </td>
            <td>
              <strong>Winding in °C</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.windingC}
                onChange={(e) => setFormData({ ...formData, windingC: e.target.value })}
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
                value={formData.lvKv}
                onChange={(e) => setFormData({ ...formData, lvKv: e.target.value })}
              />
            </td>
            <td>
              <strong>Oil Quantity</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.oilQuantity}
                onChange={(e) => setFormData({ ...formData, oilQuantity: e.target.value })}
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
                value={formData.impedancePercent}
                onChange={(e) => setFormData({ ...formData, impedancePercent: e.target.value })}
              />
            </td>
            <td>
              <strong>Weight of Core & Wdg.</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.weightCoreWdg}
                onChange={(e) => setFormData({ ...formData, weightCoreWdg: e.target.value })}
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
                value={formData.yearOfMfg}
                onChange={(e) => setFormData({ ...formData, yearOfMfg: e.target.value })}
              />
            </td>
            <td>
              <strong>TRANSPORTING WEIGHT</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.transportingWeight}
                onChange={(e) => setFormData({ ...formData, transportingWeight: e.target.value })}
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
                value={formData.noOfCoolingFan}
                onChange={(e) => setFormData({ ...formData, noOfCoolingFan: e.target.value })}
              />
            </td>
            <td>
              <strong>Total Weight</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.totalWeight}
                onChange={(e) => setFormData({ ...formData, totalWeight: e.target.value })}
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
                value={formData.noOfOilPump}
                onChange={(e) => setFormData({ ...formData, noOfOilPump: e.target.value })}
              /> */}
            </td>
            <td>
              <strong>NO. OF RADIATORS</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.noOfRadiators}
                onChange={(e) => setFormData({ ...formData, noOfRadiators: e.target.value })}
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
                value={formData.noOfTaps}
                onChange={(e) => setFormData({ ...formData, noOfTaps: e.target.value })}
              />
            </td>
            <td>
              <strong>MFG. OF OCTC</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.mfgOfOctc}
                onChange={(e) => setFormData({ ...formData, mfgOfOctc: e.target.value })}
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
                value={formData.typeOfOctc}
                onChange={(e) => setFormData({ ...formData, typeOfOctc: e.target.value })}
              />
            </td>
            <td>
              <strong>SR. NO. OCTC</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.srNoOctc}
                onChange={(e) => setFormData({ ...formData, srNoOctc: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="Transformer, Oil Level gauge, Wheel Locking, Transformer Foundation Level condition."
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

function Stage1Form2({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    accessories: {},
    photos: {},
    ...initialData,
  });

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_API_BASE_URL}/api/autoData/getTable`,
          {
            companyName: companyName,
            projectName: projectName,
            stage: 1,
            formNumber: 2,
          }
        );
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for stage1Form2");
          console.log(response.data.data);
          setFormData(response.data.data);
        } else {
          console.log("There is no data in DB.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFormData();
  }, [projectName, companyName]);

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

  const handleAccessoryChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      accessories: {
        ...prev.accessories,
        [id]: {
          ...prev.accessories[id],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }));
  };

  const photoRequirements = [
    { key: "transformerAccessories", label: "Transformer Accessories" },
  ];

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                  value={formData?.accessories[item.id]?.packingCase || ""}
                  onChange={(e) =>
                    handleAccessoryChange(
                      item.id,
                      "packingCase",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <strong>{item.description}</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories[item.id]?.qtyPerPL || ""}
                  onChange={(e) =>
                    handleAccessoryChange(item.id, "qtyPerPL", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories[item.id]?.qtyReceived || ""}
                  onChange={(e) =>
                    handleAccessoryChange(
                      item.id,
                      "qtyReceived",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories[item.id]?.shortQty || ""}
                  onChange={(e) =>
                    handleAccessoryChange(item.id, "shortQty", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData?.accessories[item.id]?.damagedQty || ""}
                  onChange={(e) =>
                    handleAccessoryChange(item.id, "damagedQty", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PhotoUploadSection
        title="Transformer Accessories"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  );
}

function Stage1Form3({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Core Insulation Check fields (Between Core-Frame, Frame-Tank, Core-Tank)
    coreFrame_obtainedValue: "",
    coreFrame_remarks: "",
    frameTank_obtainedValue: "",
    frameTank_remarks: "",
    coreTank_obtainedValue: "",
    coreTank_remarks: "",
    // Equipment checklist fields
    filterMachine: "",
    filterMachineCapacity: "",
    vacuumPumpCapacity: "",
    reservoirAvailable: "",
    reservoirCapacity: "",
    hosePipes: "",
    craneAvailable: "",
    dryAir: "",
    dewPointMeter: "",
    mecLeodGauge: "",
    // Safety equipment fields
    fireExtinguisher: "",
    firstAidKit: "",
    ppeEquipment: "",
    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage1Form3`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for stage1Form3")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "tenDeltaKit", label: "Ten delta kit" },
    { key: "calibrationReport", label: "calibration report" },
    { key: "duringTenDeltaBushing", label: "during tendelta of bushing photo" },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>CORE INSULATION CHECK: At 1KV &gt; 500 MΩ </h2>
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
                value={formData.coreFrame_obtainedValue}
                onChange={(e) => setFormData({ ...formData, coreFrame_obtainedValue: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.coreFrame_remarks}
                onChange={(e) => setFormData({ ...formData, coreFrame_remarks: e.target.value })}
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
                value={formData.frameTank_obtainedValue}
                onChange={(e) => setFormData({ ...formData, frameTank_obtainedValue: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.frameTank_remarks}
                onChange={(e) => setFormData({ ...formData, frameTank_remarks: e.target.value })}
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
                value={formData.coreTank_obtainedValue}
                onChange={(e) => setFormData({ ...formData, coreTank_obtainedValue: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.coreTank_remarks}
                onChange={(e) => setFormData({ ...formData, coreTank_remarks: e.target.value })}
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
                value={formData.filterMachine}
                onChange={(e) =>
                  setFormData({ ...formData, filterMachine: e.target.value })
                }
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
                value={formData.filterMachineCapacity}
                onChange={(e) => setFormData({ ...formData, filterMachineCapacity: e.target.value })}
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
                value={formData.vacuumPumpCapacity}
                onChange={(e) => setFormData({ ...formData, vacuumPumpCapacity: e.target.value })}
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
                value={formData.reservoirAvailable}
                onChange={(e) => setFormData({ ...formData, reservoirAvailable: e.target.value })}
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
                value={formData.reservoirCapacity}
                onChange={(e) => setFormData({ ...formData, reservoirCapacity: e.target.value })}
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
                value={formData.hosePipes}
                onChange={(e) =>
                  setFormData({ ...formData, hosePipes: e.target.value })
                }
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
                value={formData.craneAvailable}
                onChange={(e) => setFormData({ ...formData, craneAvailable: e.target.value })}
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
                value={formData.dryAir}
                onChange={(e) =>
                  setFormData({ ...formData, dryAir: e.target.value })
                }
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
                value={formData.dewPointMeter}
                onChange={(e) =>
                  setFormData({ ...formData, dewPointMeter: e.target.value })
                }
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
                value={formData.mecLeodGauge}
                onChange={(e) =>
                  setFormData({ ...formData, mecLeodGauge: e.target.value })
                }
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
                value={formData.fireExtinguisher}
                onChange={(e) =>
                  setFormData({ ...formData, fireExtinguisher: e.target.value })
                }
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
                value={formData.firstAidKit}
                onChange={(e) =>
                  setFormData({ ...formData, firstAidKit: e.target.value })
                }
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
                value={formData.ppeEquipment}
                onChange={(e) =>
                  setFormData({ ...formData, ppeEquipment: e.target.value })
                }
              >
                <option value="">(Yes/No)</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="Ten delta kit, calibration report, during ten delta of bushing photo"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

function Stage1Form4({ onSubmit, onPrevious, initialData, isLastFormOfStage, companyName, projectName }) {
  const [formData, setFormData] = useState({
    makeOfMeter: "",
    modelSrNo: "",
    date: "",
    ambient: "",
    wtiTemp: "",
    testReportReviewedBy: "",
    acceptanceOfTest: "",

    // Phase 1.1 - CT Ratio test fields (S1-S2)
    phase31_20percent_appliedCurrent_s1s2: "",
    phase31_20percent_measuredCurrent_s1s2: "",
    phase31_40percent_appliedCurrent_s1s2: "",
    phase31_40percent_measuredCurrent_s1s2: "",
    phase31_60percent_appliedCurrent_s1s2: "",
    phase31_60percent_measuredCurrent_s1s2: "",
    phase31_80percent_appliedCurrent_s1s2: "",
    phase31_80percent_measuredCurrent_s1s2: "",
    phase31_100percent_appliedCurrent_s1s2: "",
    phase31_100percent_measuredCurrent_s1s2: "",

    // Phase 1.1 - CT Ratio test fields (S1-S3)
    phase31_20percent_appliedCurrent_s1s3: "",
    phase31_20percent_measuredCurrent_s1s3: "",
    phase31_40percent_appliedCurrent_s1s3: "",
    phase31_40percent_measuredCurrent_s1s3: "",
    phase31_60percent_appliedCurrent_s1s3: "",
    phase31_60percent_measuredCurrent_s1s3: "",
    phase31_80percent_appliedCurrent_s1s3: "",
    phase31_80percent_measuredCurrent_s1s3: "",
    phase31_100percent_appliedCurrent_s1s3: "",
    phase31_100percent_measuredCurrent_s1s3: "",

    // Phase 1.1 - Knee point voltage fields (S1-S2)
    phase31_knee_20percent_appliedVoltage_s1s2: "",
    phase31_knee_20percent_measuredCurrent_s1s2: "",
    phase31_knee_40percent_appliedVoltage_s1s2: "",
    phase31_knee_40percent_measuredCurrent_s1s2: "",
    phase31_knee_60percent_appliedVoltage_s1s2: "",
    phase31_knee_60percent_measuredCurrent_s1s2: "",
    phase31_knee_80percent_appliedVoltage_s1s2: "",
    phase31_knee_80percent_measuredCurrent_s1s2: "",
    phase31_knee_100percent_appliedVoltage_s1s2: "",
    phase31_knee_100percent_measuredCurrent_s1s2: "",
    phase31_knee_110percent_appliedVoltage_s1s2: "",
    phase31_knee_110percent_measuredCurrent_s1s2: "",

    // Phase 1.1 - Knee point voltage fields (S1-S3)
    phase31_knee_20percent_appliedVoltage_s1s3: "",
    phase31_knee_20percent_measuredCurrent_s1s3: "",
    phase31_knee_40percent_appliedVoltage_s1s3: "",
    phase31_knee_40percent_measuredCurrent_s1s3: "",
    phase31_knee_60percent_appliedVoltage_s1s3: "",
    phase31_knee_60percent_measuredCurrent_s1s3: "",
    phase31_knee_80percent_appliedVoltage_s1s3: "",
    phase31_knee_80percent_measuredCurrent_s1s3: "",
    phase31_knee_100percent_appliedVoltage_s1s3: "",
    phase31_knee_100percent_measuredCurrent_s1s3: "",
    phase31_knee_110percent_appliedVoltage_s1s3: "",
    phase31_knee_110percent_measuredCurrent_s1s3: "",

    // Phase 1.2 - CT Ratio test fields (S1-S2)
    phase32_20percent_appliedCurrent_s1s2: "",
    phase32_20percent_measuredCurrent_s1s2: "",
    phase32_40percent_appliedCurrent_s1s2: "",
    phase32_40percent_measuredCurrent_s1s2: "",
    phase32_60percent_appliedCurrent_s1s2: "",
    phase32_60percent_measuredCurrent_s1s2: "",
    phase32_80percent_appliedCurrent_s1s2: "",
    phase32_80percent_measuredCurrent_s1s2: "",
    phase32_100percent_appliedCurrent_s1s2: "",
    phase32_100percent_measuredCurrent_s1s2: "",

    // Phase 1.2 - CT Ratio test fields (S1-S3)
    phase32_20percent_appliedCurrent_s1s3: "",
    phase32_20percent_measuredCurrent_s1s3: "",
    phase32_40percent_appliedCurrent_s1s3: "",
    phase32_40percent_measuredCurrent_s1s3: "",
    phase32_60percent_appliedCurrent_s1s3: "",
    phase32_60percent_measuredCurrent_s1s3: "",
    phase32_80percent_appliedCurrent_s1s3: "",
    phase32_80percent_measuredCurrent_s1s3: "",
    phase32_100percent_appliedCurrent_s1s3: "",
    phase32_100percent_measuredCurrent_s1s3: "",

    // Phase 1.2 - Knee point voltage fields (S1-S2)
    phase32_knee_20percent_appliedVoltage_s1s2: "",
    phase32_knee_20percent_measuredCurrent_s1s2: "",
    phase32_knee_40percent_appliedVoltage_s1s2: "",
    phase32_knee_40percent_measuredCurrent_s1s2: "",
    phase32_knee_60percent_appliedVoltage_s1s2: "",
    phase32_knee_60percent_measuredCurrent_s1s2: "",
    phase32_knee_80percent_appliedVoltage_s1s2: "",
    phase32_knee_80percent_measuredCurrent_s1s2: "",
    phase32_knee_100percent_appliedVoltage_s1s2: "",
    phase32_knee_100percent_measuredCurrent_s1s2: "",
    phase32_knee_110percent_appliedVoltage_s1s2: "",
    phase32_knee_110percent_measuredCurrent_s1s2: "",

    // Phase 1.2 - Knee point voltage fields (S1-S3)
    phase32_knee_20percent_appliedVoltage_s1s3: "",
    phase32_knee_20percent_measuredCurrent_s1s3: "",
    phase32_knee_40percent_appliedVoltage_s1s3: "",
    phase32_knee_40percent_measuredCurrent_s1s3: "",
    phase32_knee_60percent_appliedVoltage_s1s3: "",
    phase32_knee_60percent_measuredCurrent_s1s3: "",
    phase32_knee_80percent_appliedVoltage_s1s3: "",
    phase32_knee_80percent_measuredCurrent_s1s3: "",
    phase32_knee_100percent_appliedVoltage_s1s3: "",
    phase32_knee_100percent_measuredCurrent_s1s3: "",
    phase32_knee_110percent_appliedVoltage_s1s3: "",
    phase32_knee_110percent_measuredCurrent_s1s3: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage1Form4`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for stage1Form4")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "ctRatioKit", label: "CT Ratio kit calibration" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                value={formData.phase31_20percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_20percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_40percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_40percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_60percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_60percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_80percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_80percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_100percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_100percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_knee_20percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_20percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_knee_40percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_40percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_knee_60percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_60percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_knee_80percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_80percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_knee_100percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_100percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_knee_110percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_110percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_110percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_110percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_20percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_20percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_40percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_40percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_60percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_60percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_80percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_80percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_100percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_100percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_knee_20percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_20percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_knee_40percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_40percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_knee_60percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_60percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_knee_80percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_80percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_knee_100percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_100percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_knee_110percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_110percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_110percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_110percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="CT Ratio kit calibration"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

function Stage1Form5({ onSubmit, onPrevious, initialData, isLastFormOfStage, companyName, projectName }) {
  const [formData, setFormData] = useState({
    // Phase 2.1 CT Ratio measurements
    phase31_20percent_appliedCurrent_s1s2: "",
    phase31_20percent_appliedCurrent_s1s3: "",
    phase31_20percent_measuredCurrent_s1s2: "",
    phase31_20percent_measuredCurrent_s1s3: "",
    phase31_40percent_appliedCurrent_s1s2: "",
    phase31_40percent_appliedCurrent_s1s3: "",
    phase31_40percent_measuredCurrent_s1s2: "",
    phase31_40percent_measuredCurrent_s1s3: "",
    phase31_60percent_appliedCurrent_s1s2: "",
    phase31_60percent_appliedCurrent_s1s3: "",
    phase31_60percent_measuredCurrent_s1s2: "",
    phase31_60percent_measuredCurrent_s1s3: "",
    phase31_80percent_appliedCurrent_s1s2: "",
    phase31_80percent_appliedCurrent_s1s3: "",
    phase31_80percent_measuredCurrent_s1s2: "",
    phase31_80percent_measuredCurrent_s1s3: "",
    phase31_100percent_appliedCurrent_s1s2: "",
    phase31_100percent_appliedCurrent_s1s3: "",
    phase31_100percent_measuredCurrent_s1s2: "",
    phase31_100percent_measuredCurrent_s1s3: "",

    // Phase 2.1 Knee point voltage measurements
    phase31_knee_20percent_appliedVoltage_s1s2: "",
    phase31_knee_20percent_appliedVoltage_s1s3: "",
    phase31_knee_20percent_measuredCurrent_s1s2: "",
    phase31_knee_20percent_measuredCurrent_s1s3: "",
    phase31_knee_40percent_appliedVoltage_s1s2: "",
    phase31_knee_40percent_appliedVoltage_s1s3: "",
    phase31_knee_40percent_measuredCurrent_s1s2: "",
    phase31_knee_40percent_measuredCurrent_s1s3: "",
    phase31_knee_60percent_appliedVoltage_s1s2: "",
    phase31_knee_60percent_appliedVoltage_s1s3: "",
    phase31_knee_60percent_measuredCurrent_s1s2: "",
    phase31_knee_60percent_measuredCurrent_s1s3: "",
    phase31_knee_80percent_appliedVoltage_s1s2: "",
    phase31_knee_80percent_appliedVoltage_s1s3: "",
    phase31_knee_80percent_measuredCurrent_s1s2: "",
    phase31_knee_80percent_measuredCurrent_s1s3: "",
    phase31_knee_100percent_appliedVoltage_s1s2: "",
    phase31_knee_100percent_appliedVoltage_s1s3: "",
    phase31_knee_100percent_measuredCurrent_s1s2: "",
    phase31_knee_100percent_measuredCurrent_s1s3: "",
    phase31_knee_110percent_appliedVoltage_s1s2: "",
    phase31_knee_110percent_appliedVoltage_s1s3: "",
    phase31_knee_110percent_measuredCurrent_s1s2: "",
    phase31_knee_110percent_measuredCurrent_s1s3: "",

    // Phase 2.2 CT Ratio measurements
    phase32_20percent_appliedCurrent_s1s2: "",
    phase32_20percent_appliedCurrent_s1s3: "",
    phase32_20percent_measuredCurrent_s1s2: "",
    phase32_20percent_measuredCurrent_s1s3: "",
    phase32_40percent_appliedCurrent_s1s2: "",
    phase32_40percent_appliedCurrent_s1s3: "",
    phase32_40percent_measuredCurrent_s1s2: "",
    phase32_40percent_measuredCurrent_s1s3: "",
    phase32_60percent_appliedCurrent_s1s2: "",
    phase32_60percent_appliedCurrent_s1s3: "",
    phase32_60percent_measuredCurrent_s1s2: "",
    phase32_60percent_measuredCurrent_s1s3: "",
    phase32_80percent_appliedCurrent_s1s2: "",
    phase32_80percent_appliedCurrent_s1s3: "",
    phase32_80percent_measuredCurrent_s1s2: "",
    phase32_80percent_measuredCurrent_s1s3: "",
    phase32_100percent_appliedCurrent_s1s2: "",
    phase32_100percent_appliedCurrent_s1s3: "",
    phase32_100percent_measuredCurrent_s1s2: "",
    phase32_100percent_measuredCurrent_s1s3: "",

    // Phase 2.2 Knee point voltage measurements
    phase32_knee_20percent_appliedVoltage_s1s2: "",
    phase32_knee_20percent_appliedVoltage_s1s3: "",
    phase32_knee_20percent_measuredCurrent_s1s2: "",
    phase32_knee_20percent_measuredCurrent_s1s3: "",
    phase32_knee_40percent_appliedVoltage_s1s2: "",
    phase32_knee_40percent_appliedVoltage_s1s3: "",
    phase32_knee_40percent_measuredCurrent_s1s2: "",
    phase32_knee_40percent_measuredCurrent_s1s3: "",
    phase32_knee_60percent_appliedVoltage_s1s2: "",
    phase32_knee_60percent_appliedVoltage_s1s3: "",
    phase32_knee_60percent_measuredCurrent_s1s2: "",
    phase32_knee_60percent_measuredCurrent_s1s3: "",
    phase32_knee_80percent_appliedVoltage_s1s2: "",
    phase32_knee_80percent_appliedVoltage_s1s3: "",
    phase32_knee_80percent_measuredCurrent_s1s2: "",
    phase32_knee_80percent_measuredCurrent_s1s3: "",
    phase32_knee_100percent_appliedVoltage_s1s2: "",
    phase32_knee_100percent_appliedVoltage_s1s3: "",
    phase32_knee_100percent_measuredCurrent_s1s2: "",
    phase32_knee_100percent_measuredCurrent_s1s3: "",
    phase32_knee_110percent_appliedVoltage_s1s2: "",
    phase32_knee_110percent_appliedVoltage_s1s3: "",
    phase32_knee_110percent_measuredCurrent_s1s2: "",
    phase32_knee_110percent_measuredCurrent_s1s3: "",

    // WTI CT Ratio measurements (S1-S2, S1-S3, S1-S4)
    wti_20percent_appliedCurrent_s1s2: "",
    wti_20percent_appliedCurrent_s1s3: "",
    wti_20percent_appliedCurrent_s1s4: "",
    wti_20percent_measuredCurrent_s1s2: "",
    wti_20percent_measuredCurrent_s1s3: "",
    wti_20percent_measuredCurrent_s1s4: "",
    wti_40percent_appliedCurrent_s1s2: "",
    wti_40percent_appliedCurrent_s1s3: "",
    wti_40percent_appliedCurrent_s1s4: "",
    wti_40percent_measuredCurrent_s1s2: "",
    wti_40percent_measuredCurrent_s1s3: "",
    wti_40percent_measuredCurrent_s1s4: "",
    wti_60percent_appliedCurrent_s1s2: "",
    wti_60percent_appliedCurrent_s1s3: "",
    wti_60percent_appliedCurrent_s1s4: "",
    wti_60percent_measuredCurrent_s1s2: "",
    wti_60percent_measuredCurrent_s1s3: "",
    wti_60percent_measuredCurrent_s1s4: "",
    wti_80percent_appliedCurrent_s1s2: "",
    wti_80percent_appliedCurrent_s1s3: "",
    wti_80percent_appliedCurrent_s1s4: "",
    wti_80percent_measuredCurrent_s1s2: "",
    wti_80percent_measuredCurrent_s1s3: "",
    wti_80percent_measuredCurrent_s1s4: "",
    wti_100percent_appliedCurrent_s1s2: "",
    wti_100percent_appliedCurrent_s1s3: "",
    wti_100percent_appliedCurrent_s1s4: "",
    wti_100percent_measuredCurrent_s1s2: "",
    wti_100percent_measuredCurrent_s1s3: "",
    wti_100percent_measuredCurrent_s1s4: "",

    // WTI CT Ratio measurements (S1-S5, S1-S6, S1-S7)
    wti_20percent_appliedCurrent_s1s5: "",
    wti_20percent_appliedCurrent_s1s6: "",
    wti_20percent_appliedCurrent_s1s7: "",
    wti_20percent_measuredCurrent_s1s5: "",
    wti_20percent_measuredCurrent_s1s6: "",
    wti_20percent_measuredCurrent_s1s7: "",
    wti_40percent_appliedCurrent_s1s5: "",
    wti_40percent_appliedCurrent_s1s6: "",
    wti_40percent_appliedCurrent_s1s7: "",
    wti_40percent_measuredCurrent_s1s5: "",
    wti_40percent_measuredCurrent_s1s6: "",
    wti_40percent_measuredCurrent_s1s7: "",
    wti_60percent_appliedCurrent_s1s5: "",
    wti_60percent_appliedCurrent_s1s6: "",
    wti_60percent_appliedCurrent_s1s7: "",
    wti_60percent_measuredCurrent_s1s5: "",
    wti_60percent_measuredCurrent_s1s6: "",
    wti_60percent_measuredCurrent_s1s7: "",
    wti_80percent_appliedCurrent_s1s5: "",
    wti_80percent_appliedCurrent_s1s6: "",
    wti_80percent_appliedCurrent_s1s7: "",
    wti_80percent_measuredCurrent_s1s5: "",
    wti_80percent_measuredCurrent_s1s6: "",
    wti_80percent_measuredCurrent_s1s7: "",
    wti_100percent_appliedCurrent_s1s5: "",
    wti_100percent_appliedCurrent_s1s6: "",
    wti_100percent_appliedCurrent_s1s7: "",
    wti_100percent_measuredCurrent_s1s5: "",
    wti_100percent_measuredCurrent_s1s6: "",
    wti_100percent_measuredCurrent_s1s7: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage5Form1`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for stage5Form1")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "ctRatioKit", label: "CT Ratio kit calibration" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                value={formData.phase31_20percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_20percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_20percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>40%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_40percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_40percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_40percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>60%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_60percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_60percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_60percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>80%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_80percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_80percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_80percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>100%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_100percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_100percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_100percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase31_knee_20percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_20percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_20percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>40%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_40percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_40percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_40percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>60%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_60percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_60percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_60percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>80%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_80percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_80percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_80percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>100%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_100percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_100percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_100percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>110%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_110percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_110percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_110percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase31_knee_110percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase31_knee_110percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_20percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_20percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_20percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>40%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_40percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_40percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_40percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>60%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_60percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_60percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_60percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>80%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_80percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_80percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_80percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>100%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_100percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_100percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_100percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.phase32_knee_20percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_20percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_20percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>40%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_40percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_40percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_40percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>60%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_60percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_60percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_60percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>80%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_80percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_80percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_80percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>100%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_100percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_100percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_100percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>110%</strong></td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_110percent_appliedVoltage_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_appliedVoltage_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_110percent_appliedVoltage_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_appliedVoltage_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_110percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.phase32_knee_110percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, phase32_knee_110percent_measuredCurrent_s1s3: e.target.value })}
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
                value={formData.wti_20percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_20percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_20percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_appliedCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_20percent_appliedCurrent_s1s4: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_20percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_20percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_measuredCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_20percent_measuredCurrent_s1s4: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>40%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_40percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_40percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_appliedCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_40percent_appliedCurrent_s1s4: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_40percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_40percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_measuredCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_40percent_measuredCurrent_s1s4: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>60%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_60percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_60percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_appliedCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_60percent_appliedCurrent_s1s4: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_60percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_60percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_measuredCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_60percent_measuredCurrent_s1s4: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>80%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_80percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_80percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_appliedCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_80percent_appliedCurrent_s1s4: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_80percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_80percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_measuredCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_80percent_measuredCurrent_s1s4: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>100%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_appliedCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_100percent_appliedCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_appliedCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_100percent_appliedCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_appliedCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_100percent_appliedCurrent_s1s4: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_measuredCurrent_s1s2}
                onChange={(e) => setFormData({ ...formData, wti_100percent_measuredCurrent_s1s2: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_measuredCurrent_s1s3}
                onChange={(e) => setFormData({ ...formData, wti_100percent_measuredCurrent_s1s3: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_measuredCurrent_s1s4}
                onChange={(e) => setFormData({ ...formData, wti_100percent_measuredCurrent_s1s4: e.target.value })}
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
                value={formData.wti_20percent_appliedCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_20percent_appliedCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_appliedCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_20percent_appliedCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_appliedCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_20percent_appliedCurrent_s1s7: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_measuredCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_20percent_measuredCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_measuredCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_20percent_measuredCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_20percent_measuredCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_20percent_measuredCurrent_s1s7: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>40%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_appliedCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_40percent_appliedCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_appliedCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_40percent_appliedCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_appliedCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_40percent_appliedCurrent_s1s7: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_measuredCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_40percent_measuredCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_measuredCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_40percent_measuredCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_40percent_measuredCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_40percent_measuredCurrent_s1s7: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>60%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_appliedCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_60percent_appliedCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_appliedCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_60percent_appliedCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_appliedCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_60percent_appliedCurrent_s1s7: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_measuredCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_60percent_measuredCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_measuredCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_60percent_measuredCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_60percent_measuredCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_60percent_measuredCurrent_s1s7: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>80%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_appliedCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_80percent_appliedCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_appliedCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_80percent_appliedCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_appliedCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_80percent_appliedCurrent_s1s7: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_measuredCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_80percent_measuredCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_measuredCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_80percent_measuredCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_80percent_measuredCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_80percent_measuredCurrent_s1s7: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>100%</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_appliedCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_100percent_appliedCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_appliedCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_100percent_appliedCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_appliedCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_100percent_appliedCurrent_s1s7: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_measuredCurrent_s1s5}
                onChange={(e) => setFormData({ ...formData, wti_100percent_measuredCurrent_s1s5: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_measuredCurrent_s1s6}
                onChange={(e) => setFormData({ ...formData, wti_100percent_measuredCurrent_s1s6: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.wti_100percent_measuredCurrent_s1s7}
                onChange={(e) => setFormData({ ...formData, wti_100percent_measuredCurrent_s1s7: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="CT Ratio kit calibration"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

function Stage1Form6({ onSubmit, onPrevious, initialData, isLastFormOfStage, companyName, projectName }) {
  const [formData, setFormData] = useState({
    // Basic test information
    meterUsed: "",
    date: "",
    time: "",
    modelSrNo: "",
    wti: "",
    oti: "",

    // HV Bushing Serial Numbers
    hvBushing11_srNo: "",
    hvBushing12_srNo: "",

    // HV Bushing 1.1 - 05 KV Phase measurements
    hvBushing11_05kv_tanDelta: "",
    hvBushing11_05kv_capacitance: "",
    hvBushing11_05kv_excitationCurrent: "",
    hvBushing11_05kv_dielectricLoss: "",

    // HV Bushing 1.2 - 05 KV Phase measurements
    hvBushing12_05kv_tanDelta: "",
    hvBushing12_05kv_capacitance: "",
    hvBushing12_05kv_excitationCurrent: "",
    hvBushing12_05kv_dielectricLoss: "",

    // HV Bushing 1.1 - 10 KV Phase measurements
    hvBushing11_10kv_tanDelta: "",
    hvBushing11_10kv_capacitance: "",
    hvBushing11_10kv_excitationCurrent: "",
    hvBushing11_10kv_dielectricLoss: "",

    // HV Bushing 1.2 - 10 KV Phase measurements
    hvBushing12_10kv_tanDelta: "",
    hvBushing12_10kv_capacitance: "",
    hvBushing12_10kv_excitationCurrent: "",
    hvBushing12_10kv_dielectricLoss: "",

    // LV Bushing Serial Numbers
    lvBushing21_srNo: "",
    lvBushing22_srNo: "",

    // LV Bushing 2.1 - 05 KV Phase measurements
    lvBushing21_05kv_tanDelta: "",
    lvBushing21_05kv_capacitance: "",
    lvBushing21_05kv_excitationCurrent: "",
    lvBushing21_05kv_dielectricLoss: "",

    // LV Bushing 2.2 - 05 KV Phase measurements
    lvBushing22_05kv_tanDelta: "",
    lvBushing22_05kv_capacitance: "",
    lvBushing22_05kv_excitationCurrent: "",
    lvBushing22_05kv_dielectricLoss: "",

    // LV Bushing 2.1 - 10 KV Phase measurements
    lvBushing21_10kv_tanDelta: "",
    lvBushing21_10kv_capacitance: "",
    lvBushing21_10kv_excitationCurrent: "",
    lvBushing21_10kv_dielectricLoss: "",

    // LV Bushing 2.2 - 10 KV Phase measurements
    lvBushing22_10kv_tanDelta: "",
    lvBushing22_10kv_capacitance: "",
    lvBushing22_10kv_excitationCurrent: "",
    lvBushing22_10kv_dielectricLoss: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage1Form6`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage1Form6")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "tanDeltaKit", label: "Tan Delta Kit" },
    { key: "calibrationReport", label: "Calibration Report" },
    { key: "duringTanDelta", label: "During Tan Delta of bushing photo" }
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                value={formData.meterUsed}
                onChange={(e) => setFormData({ ...formData, meterUsed: e.target.value })}
              />
            </td>
            <td><strong>DATE</strong></td>
            <td>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </td>
            <td><strong>TIME</strong></td>
            <td>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>MODEL & S. NO.</strong></td>
            <td>
              <input
                type="text"
                value={formData.modelSrNo}
                onChange={(e) => setFormData({ ...formData, modelSrNo: e.target.value })}
              />
            </td>
            <td><strong>WTI</strong></td>
            <td>
              <input
                type="text"
                value={formData.wti}
                onChange={(e) => setFormData({ ...formData, wti: e.target.value })}
              />
            </td>
            <td><strong>OTI</strong></td>
            <td>
              <input
                type="text"
                value={formData.oti}
                onChange={(e) => setFormData({ ...formData, oti: e.target.value })}
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
                value={formData.hvBushing11_srNo}
                onChange={(e) => setFormData({ ...formData, hvBushing11_srNo: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_srNo}
                onChange={(e) => setFormData({ ...formData, hvBushing12_srNo: e.target.value })}
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
                value={formData.hvBushing11_05kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, hvBushing11_05kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing11_05kv_capacitance}
                onChange={(e) => setFormData({ ...formData, hvBushing11_05kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing11_05kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, hvBushing11_05kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing11_05kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, hvBushing11_05kv_dielectricLoss: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>1.2</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_05kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, hvBushing12_05kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_05kv_capacitance}
                onChange={(e) => setFormData({ ...formData, hvBushing12_05kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_05kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, hvBushing12_05kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_05kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, hvBushing12_05kv_dielectricLoss: e.target.value })}
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
                value={formData.hvBushing11_10kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, hvBushing11_10kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing11_10kv_capacitance}
                onChange={(e) => setFormData({ ...formData, hvBushing11_10kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing11_10kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, hvBushing11_10kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing11_10kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, hvBushing11_10kv_dielectricLoss: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>1.2</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_10kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, hvBushing12_10kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_10kv_capacitance}
                onChange={(e) => setFormData({ ...formData, hvBushing12_10kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_10kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, hvBushing12_10kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvBushing12_10kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, hvBushing12_10kv_dielectricLoss: e.target.value })}
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
                value={formData.lvBushing21_srNo}
                onChange={(e) => setFormData({ ...formData, lvBushing21_srNo: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_srNo}
                onChange={(e) => setFormData({ ...formData, lvBushing22_srNo: e.target.value })}
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
                value={formData.lvBushing21_05kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, lvBushing21_05kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing21_05kv_capacitance}
                onChange={(e) => setFormData({ ...formData, lvBushing21_05kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing21_05kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, lvBushing21_05kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing21_05kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, lvBushing21_05kv_dielectricLoss: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>2.2</strong></td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_05kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, lvBushing22_05kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_05kv_capacitance}
                onChange={(e) => setFormData({ ...formData, lvBushing22_05kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_05kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, lvBushing22_05kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_05kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, lvBushing22_05kv_dielectricLoss: e.target.value })}
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
                value={formData.lvBushing21_10kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, lvBushing21_10kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing21_10kv_capacitance}
                onChange={(e) => setFormData({ ...formData, lvBushing21_10kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing21_10kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, lvBushing21_10kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing21_10kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, lvBushing21_10kv_dielectricLoss: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>2.2</strong></td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_10kv_tanDelta}
                onChange={(e) => setFormData({ ...formData, lvBushing22_10kv_tanDelta: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_10kv_capacitance}
                onChange={(e) => setFormData({ ...formData, lvBushing22_10kv_capacitance: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_10kv_excitationCurrent}
                onChange={(e) => setFormData({ ...formData, lvBushing22_10kv_excitationCurrent: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvBushing22_10kv_dielectricLoss}
                onChange={(e) => setFormData({ ...formData, lvBushing22_10kv_dielectricLoss: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="Tan Delta Kit"
        photos={[photoRequirements[0]]}
        onPhotoChange={handlePhotoChange}
      />
      <PhotoUploadSection
        title="Calibration Report"
        photos={[photoRequirements[1]]}
        onPhotoChange={handlePhotoChange}
      />
      <PhotoUploadSection
        title="During Tan Delta of bushing photo"
        photos={[photoRequirements[2]]}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

function Stage1Form7({ onSubmit, onPrevious, initialData, isLastFormOfStage, companyName, projectName }) {
  const [formData, setFormData] = useState({
    // Basic test information
    date: "",
    time: "",
    ambTemp: "",
    make: "",
    oilTemp: "",
    srNo: "",
    wdgTemp: "",
    range: "",
    relativeHumidity: "",
    voltageLevel: "",

    // IR measurements
    hvEarth_10sec: "",
    hvEarth_60sec: "",
    hvEarth_ratio: "",
    lvEarth_10sec: "",
    lvEarth_60sec: "",
    lvEarth_ratio: "",
    hvLv_10sec: "",
    hvLv_60sec: "",
    hvLv_ratio: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage1Form7`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage1Form7")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "irTester", label: "IR tester" },
    { key: "calibrationReport", label: "Calibration Report" },
    { key: "irValue60sec", label: "60 sec IR value" }
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>RECORD OF MEASUREMENT OF IR VALUES</h2>
      </div>
      <h3>Before Erection</h3>
      <table className="form-table">
        <tbody>
          <tr>
            <td><strong>Date</strong></td>
            <td>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </td>
            <td><strong>Time</strong></td>
            <td>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Amb Temp:</strong></td>
            <td>
              <input
                type="text"
                value={formData.ambTemp}
                onChange={(e) => setFormData({ ...formData, ambTemp: e.target.value })}
              />
            </td>
            <td><strong>Make:</strong></td>
            <td>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Oil Temp:</strong></td>
            <td>
              <input
                type="text"
                value={formData.oilTemp}
                onChange={(e) => setFormData({ ...formData, oilTemp: e.target.value })}
              />
            </td>
            <td><strong>Sr No:</strong></td>
            <td>
              <input
                type="text"
                value={formData.srNo}
                onChange={(e) => setFormData({ ...formData, srNo: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Wdg. Temp:</strong></td>
            <td>
              <input
                type="text"
                value={formData.wdgTemp}
                onChange={(e) => setFormData({ ...formData, wdgTemp: e.target.value })}
              />
            </td>
            <td><strong>Range:</strong></td>
            <td>
              <input
                type="text"
                value={formData.range}
                onChange={(e) => setFormData({ ...formData, range: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Relative Humidity</strong></td>
            <td>
              <input
                type="text"
                value={formData.relativeHumidity}
                onChange={(e) => setFormData({ ...formData, relativeHumidity: e.target.value })}
              />
            </td>
            <td><strong>Voltage Level:</strong></td>
            <td>
              <input
                type="text"
                value={formData.voltageLevel}
                onChange={(e) => setFormData({ ...formData, voltageLevel: e.target.value })}
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
              <input
                type="text"
                value={formData.hvEarth_10sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV-Earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.lvEarth_10sec}
                onChange={(e) => setFormData({ ...formData, lvEarth_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, lvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvEarth_ratio}
                onChange={(e) => setFormData({ ...formData, lvEarth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>HV-LV</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvLv_10sec}
                onChange={(e) => setFormData({ ...formData, hvLv_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv_ratio}
                onChange={(e) => setFormData({ ...formData, hvLv_ratio: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="IR tester"
        photos={[photoRequirements[0]]}
        onPhotoChange={handlePhotoChange}
      />
      <PhotoUploadSection
        title="Calibration Report"
        photos={[photoRequirements[1]]}
        onPhotoChange={handlePhotoChange}
      />
      <PhotoUploadSection
        title="60 sec IR value"
        photos={[photoRequirements[2]]}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}


// Stage 2 Forms
export function Stage2Form1({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Tank 1 data
    tank1_noOfBarrels: "",
    tank1_startedDate: "",
    tank1_startedTime: "",
    tank1_completedDate: "",
    tank1_completedTime: "",
    tank1_bdv: "",
    tank1_ppm: "",

    // Tank 2 data
    tank2_noOfBarrels: "",
    tank2_startedDate: "",
    tank2_startedTime: "",
    tank2_completedDate: "",
    tank2_completedTime: "",
    tank2_bdv: "",
    tank2_ppm: "",

    // Tank 3 data
    tank3_noOfBarrels: "",
    tank3_startedDate: "",
    tank3_startedTime: "",
    tank3_completedDate: "",
    tank3_completedTime: "",
    tank3_bdv: "",
    tank3_ppm: "",

    // Reservoir Tank Filtration
    filtrationRecords: Array(15)
      .fill()
      .map(() => ({
        date: "",
        time: "",
        vacuumLevel: "",
        inletTemp: "",
        outletTemp: "",
      })),

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage2Form1`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage2Form1")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleFiltrationRecordChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      filtrationRecords: prev.filtrationRecords.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    }))
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "reservoirCondition", label: "Internal condition of reservoir tank" },
    { key: "calibrationReport", label: "Calibration report of BDV & PPM kit" },
    { key: "oilBarrelsChecking", label: "Oil barrels checking by water pest" },
    { key: "ppmPhoto", label: "PPM Photo" },
    { key: "bdvReading", label: "Reading of BDV value" },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
          <tr>
            <td><strong>Tank1</strong></td>
            <td>
              <input
                type="text"
                value={formData.tank1_noOfBarrels}
                onChange={(e) => setFormData({ ...formData, tank1_noOfBarrels: e.target.value })}
              />
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData.tank1_startedDate}
                  onChange={(e) => setFormData({ ...formData, tank1_startedDate: e.target.value })}
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData.tank1_startedTime}
                  onChange={(e) => setFormData({ ...formData, tank1_startedTime: e.target.value })}
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData.tank1_completedDate}
                  onChange={(e) => setFormData({ ...formData, tank1_completedDate: e.target.value })}
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData.tank1_completedTime}
                  onChange={(e) => setFormData({ ...formData, tank1_completedTime: e.target.value })}
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <input
                type="text"
                value={formData.tank1_bdv}
                onChange={(e) => setFormData({ ...formData, tank1_bdv: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.tank1_ppm}
                onChange={(e) => setFormData({ ...formData, tank1_ppm: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Tank2</strong></td>
            <td>
              <input
                type="text"
                value={formData.tank2_noOfBarrels}
                onChange={(e) => setFormData({ ...formData, tank2_noOfBarrels: e.target.value })}
              />
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData.tank2_startedDate}
                  onChange={(e) => setFormData({ ...formData, tank2_startedDate: e.target.value })}
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData.tank2_startedTime}
                  onChange={(e) => setFormData({ ...formData, tank2_startedTime: e.target.value })}
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData.tank2_completedDate}
                  onChange={(e) => setFormData({ ...formData, tank2_completedDate: e.target.value })}
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData.tank2_completedTime}
                  onChange={(e) => setFormData({ ...formData, tank2_completedTime: e.target.value })}
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <input
                type="text"
                value={formData.tank2_bdv}
                onChange={(e) => setFormData({ ...formData, tank2_bdv: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.tank2_ppm}
                onChange={(e) => setFormData({ ...formData, tank2_ppm: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Tank3</strong></td>
            <td>
              <input
                type="text"
                value={formData.tank3_noOfBarrels}
                onChange={(e) => setFormData({ ...formData, tank3_noOfBarrels: e.target.value })}
              />
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData.tank3_startedDate}
                  onChange={(e) => setFormData({ ...formData, tank3_startedDate: e.target.value })}
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData.tank3_startedTime}
                  onChange={(e) => setFormData({ ...formData, tank3_startedTime: e.target.value })}
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="date"
                  value={formData.tank3_completedDate}
                  onChange={(e) => setFormData({ ...formData, tank3_completedDate: e.target.value })}
                  style={{ width: "50%" }}
                />
                <input
                  type="time"
                  value={formData.tank3_completedTime}
                  onChange={(e) => setFormData({ ...formData, tank3_completedTime: e.target.value })}
                  style={{ width: "50%" }}
                />
              </div>
            </td>
            <td>
              <input
                type="text"
                value={formData.tank3_bdv}
                onChange={(e) => setFormData({ ...formData, tank3_bdv: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.tank3_ppm}
                onChange={(e) => setFormData({ ...formData, tank3_ppm: e.target.value })}
              />
            </td>
          </tr>
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
          {formData.filtrationRecords.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={record.date}
                  onChange={(e) => handleFiltrationRecordChange(index, "date", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={record.time}
                  onChange={(e) => handleFiltrationRecordChange(index, "time", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.vacuumLevel}
                  onChange={(e) => handleFiltrationRecordChange(index, "vacuumLevel", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.inletTemp}
                  onChange={(e) => handleFiltrationRecordChange(index, "inletTemp", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.outletTemp}
                  onChange={(e) => handleFiltrationRecordChange(index, "outletTemp", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PhotoUploadSection
        title="Internal condition of reservoir tank, Calibration report of BDV & PPM kit, Oil barrels checking by water pest, PPM Photo, Reading of BDV value."
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

export function Stage2Form2({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Line Lead Clearance in mm
    hv_earth_11: "",
    hv_earth_12: "",
    lv1_earth_21: "",
    lv1_earth_22: "",
    lv2_earth_31: "",
    lv2_earth_32: "",

    // Temperature readings
    tempOTI: "",
    tempWTI: "",
    tempAMB: "",

    // IR measurements (15sec and 60sec)
    hvEarth_15sec: "",
    hvEarth_60sec: "",
    hvEarth_ratio: "",
    lv1Earth_15sec: "",
    lv1Earth_60sec: "",
    lv1Earth_ratio: "",
    lv2Earth_15sec: "",
    lv2Earth_60sec: "",
    lv2Earth_ratio: "",
    hvLv1_15sec: "",
    hvLv1_60sec: "",
    hvLv1_ratio: "",
    hvLv2_15sec: "",
    hvLv2_60sec: "",
    hvLv2_ratio: "",
    lv1Lv2_15sec: "",
    lv1Lv2_60sec: "",
    lv1Lv2_ratio: "",

    // Before oil filling in main tank
    bdv: "",
    waterContent: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage2Form2`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage2Form2")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "dewPoint", label: "Dew Point" },
    { key: "dryAirAttached", label: "dry air attached photo on transformer" },
    { key: "leadClearances", label: "Lead clearances" },
    { key: "anabond", label: "anabond on both bushing's thimble" },
    { key: "radiators", label: "radiators" },
    { key: "flashing", label: "flashing" },
    { key: "conservator", label: "conservator internal inspection" },
    { key: "fullTransformer", label: "full transformer photo" },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
            <td><strong>HV with respect to earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.hv_earth_11}
                onChange={(e) => setFormData({ ...formData, hv_earth_11: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hv_earth_12}
                onChange={(e) => setFormData({ ...formData, hv_earth_12: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV 1 with respect to earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv1_earth_21}
                onChange={(e) => setFormData({ ...formData, lv1_earth_21: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1_earth_22}
                onChange={(e) => setFormData({ ...formData, lv1_earth_22: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV 2 with respect to earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv2_earth_31}
                onChange={(e) => setFormData({ ...formData, lv2_earth_31: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2_earth_32}
                onChange={(e) => setFormData({ ...formData, lv2_earth_32: e.target.value })}
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
            <td><strong>Temp OTI °C</strong></td>
            <td>
              <input
                type="text"
                value={formData.tempOTI}
                onChange={(e) => setFormData({ ...formData, tempOTI: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Temp WTI °C</strong></td>
            <td>
              <input
                type="text"
                value={formData.tempWTI}
                onChange={(e) => setFormData({ ...formData, tempWTI: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Temp AMB °C</strong></td>
            <td>
              <input
                type="text"
                value={formData.tempAMB}
                onChange={(e) => setFormData({ ...formData, tempAMB: e.target.value })}
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
            <td><strong>HV-Earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_15sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV1-Earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_ratio}
                onChange={(e) => setFormData({ ...formData, lv1Earth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV2-Earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_ratio}
                onChange={(e) => setFormData({ ...formData, lv2Earth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>HV-LV1</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_ratio}
                onChange={(e) => setFormData({ ...formData, hvLv1_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>HV-LV2</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_ratio}
                onChange={(e) => setFormData({ ...formData, hvLv2_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV1-LV2</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_ratio}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_ratio: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: "40px" }}>Before oil filling in main tank</h4>
      <table className="form-table">
        <tbody>
          <tr>
            <td><strong>BDV (KV)</strong></td>
            <td>
              <input
                type="text"
                value={formData.bdv}
                onChange={(e) => setFormData({ ...formData, bdv: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Water Content (PPM)</strong></td>
            <td>
              <input
                type="text"
                value={formData.waterContent}
                onChange={(e) => setFormData({ ...formData, waterContent: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="Dew Point, dry air attached photo on transformer, Lead clearances, anabond on both bushing's thimble, radiators, flashing, conservator internal inspection, full transformer photo."
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Submit Stage 2
        </button>
      </div>
    </form>
  )
}

// Stage 3 Forms
export function Stage3Form1({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Vacuum cycle details
    vacuumHoseCheckedBy: "",
    vacuumHoseConnectedTo: "",
    evacuationStartedAt: "",
    evacuationStartedOn: "",

    // Vacuum cycle records
    vacuumRecords: Array(15)
      .fill()
      .map(() => ({
        date: "",
        time: "",
        vacuumLevelMic: "",
        vacuumLevelTransformer: "",
      })),

    // Temperature readings for IR test
    tempOTI: "",
    tempWTI: "",
    tempAMB: "",

    // IR measurements (15sec and 60sec)
    hvEarth_15sec: "",
    hvEarth_60sec: "",
    hvEarth_ratio: "",
    lv1Earth_15sec: "",
    lv1Earth_60sec: "",
    lv1Earth_ratio: "",
    lv2Earth_15sec: "",
    lv2Earth_60sec: "",
    lv2Earth_ratio: "",
    hvLv1_15sec: "",
    hvLv1_60sec: "",
    hvLv1_ratio: "",
    hvLv2_15sec: "",
    hvLv2_60sec: "",
    hvLv2_ratio: "",
    lv1Lv2_15sec: "",
    lv1Lv2_60sec: "",
    lv1Lv2_ratio: "",

    // Pressure Test Report
    pressureTestDate: "",
    pressureTests: Array(5)
      .fill()
      .map(() => ({
        timeStarted: "",
        pressure: "",
        tempAmb: "",
        tempOti: "",
        tempWti: "",
      })),

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage3Form1`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage3Form1")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleVacuumRecordChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      vacuumRecords: prev.vacuumRecords.map((record, i) => (i === index ? { ...record, [field]: value } : record)),
    }))
  }

  const handlePressureTestChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      pressureTests: prev.pressureTests.map((test, i) => (i === index ? { ...test, [field]: value } : test)),
    }))
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "mecLeadGauge", label: "Mec Lead Gauge photo" },
    { key: "vacuumGauge", label: "vacuum gauge photo" },
    { key: "pressureGauge", label: "pressure gauge" },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                value={formData.vacuumHoseCheckedBy}
                onChange={(e) => setFormData({ ...formData, vacuumHoseCheckedBy: e.target.value })}
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Vacuum hose Connected To</strong></td>
            <td>
              <input
                type="text"
                value={formData.vacuumHoseConnectedTo}
                onChange={(e) => setFormData({ ...formData, vacuumHoseConnectedTo: e.target.value })}
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
                value={formData.evacuationStartedAt}
                onChange={(e) => setFormData({ ...formData, evacuationStartedAt: e.target.value })}
                style={{ marginRight: "10px" }}
              />
              <span>Hrs. On</span>
              <input
                type="date"
                value={formData.evacuationStartedOn}
                onChange={(e) => setFormData({ ...formData, evacuationStartedOn: e.target.value })}
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
          {formData.vacuumRecords.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={record.date}
                  onChange={(e) => handleVacuumRecordChange(index, "date", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={record.time}
                  onChange={(e) => handleVacuumRecordChange(index, "time", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.vacuumLevelMic}
                  onChange={(e) => handleVacuumRecordChange(index, "vacuumLevelMic", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.vacuumLevelTransformer}
                  onChange={(e) => handleVacuumRecordChange(index, "vacuumLevelTransformer", e.target.value)}
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
              <input
                type="text"
                value={formData.tempOTI}
                onChange={(e) => setFormData({ ...formData, tempOTI: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Temp WTI °C</strong></td>
            <td>
              <input
                type="text"
                value={formData.tempWTI}
                onChange={(e) => setFormData({ ...formData, tempWTI: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>Temp AMB °C</strong></td>
            <td>
              <input
                type="text"
                value={formData.tempAMB}
                onChange={(e) => setFormData({ ...formData, tempAMB: e.target.value })}
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
            <td><strong>HV-Earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_15sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV1-Earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_ratio}
                onChange={(e) => setFormData({ ...formData, lv1Earth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV2-Earth</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_ratio}
                onChange={(e) => setFormData({ ...formData, lv2Earth_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>HV-LV1</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_ratio}
                onChange={(e) => setFormData({ ...formData, hvLv1_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>HV-LV2</strong></td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_ratio}
                onChange={(e) => setFormData({ ...formData, hvLv2_ratio: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td><strong>LV1-LV2</strong></td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_ratio}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_ratio: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: "40px", textAlign: "center" }}>PRESSURE TEST REPORT</h4>
      <div style={{ marginBottom: "10px" }}>
        <strong>DATE: </strong>
        <input
          type="date"
          value={formData.pressureTestDate}
          onChange={(e) => setFormData({ ...formData, pressureTestDate: e.target.value })}
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
          {formData.pressureTests.map((test, index) => (
            <tr key={index}>
              <td><strong>{index + 1}</strong></td>
              <td>
                <input
                  type="time"
                  value={test.timeStarted}
                  onChange={(e) => handlePressureTestChange(index, "timeStarted", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={test.pressure}
                  onChange={(e) => handlePressureTestChange(index, "pressure", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={test.tempAmb}
                  onChange={(e) => handlePressureTestChange(index, "tempAmb", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={test.tempOti}
                  onChange={(e) => handlePressureTestChange(index, "tempOti", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={test.tempWti}
                  onChange={(e) => handlePressureTestChange(index, "tempWti", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PhotoUploadSection
        title="Mec Lead Gauge photo, vacuum gauge photo, pressure gauge"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

// Stage 4 Forms
export function Stage4Form1({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Oil filtration records
    filtrationRecords: Array(30)
      .fill()
      .map(() => ({
        date: "",
        time: "",
        vacuumLevel: "",
        mcOutletTemp: "",
        otiTemp: "",
        wtiTemp: "",
      })),

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage4Form1`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage4Form1")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleFiltrationRecordChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      filtrationRecords: prev.filtrationRecords.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    }))
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "oilFiltrationProcess", label: "Oil Filtration Process" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
          {formData.filtrationRecords.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={record.date}
                  onChange={(e) => handleFiltrationRecordChange(index, "date", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={record.time}
                  onChange={(e) => handleFiltrationRecordChange(index, "time", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.vacuumLevel}
                  onChange={(e) => handleFiltrationRecordChange(index, "vacuumLevel", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.mcOutletTemp}
                  onChange={(e) => handleFiltrationRecordChange(index, "mcOutletTemp", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.otiTemp}
                  onChange={(e) => handleFiltrationRecordChange(index, "otiTemp", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.wtiTemp}
                  onChange={(e) => handleFiltrationRecordChange(index, "wtiTemp", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PhotoUploadSection title="Oil Filtration Process" photos={photoRequirements} onPhotoChange={handlePhotoChange} />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

export function Stage4Form2({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // IR Value before radiator/combine filtration
    date: "",
    time: "",
    insulationTesterDetails: "",
    ambTemp: "",
    make: "",
    oilTemp: "",
    srNo: "",
    wdgTemp: "",
    range: "",
    relativeHumidity: "",
    voltageLevel: "",

    // Temperature readings
    tempOTI: "",
    tempWTI: "",
    tempAMB: "",

    // IR measurements (15sec and 60sec)
    hvEarth_15sec: "",
    hvEarth_60sec: "",
    hvEarth_ratio: "",
    lv1Earth_15sec: "",
    lv1Earth_60sec: "",
    lv1Earth_ratio: "",
    lv2Earth_15sec: "",
    lv2Earth_60sec: "",
    lv2Earth_ratio: "",
    hvLv1_15sec: "",
    hvLv1_60sec: "",
    hvLv1_ratio: "",
    hvLv2_15sec: "",
    hvLv2_60sec: "",
    hvLv2_ratio: "",
    lv1Lv2_15sec: "",
    lv1Lv2_60sec: "",
    lv1Lv2_ratio: "",

    // Oil filtration of Cooler Bank
    coolerBankRecords: Array(15)
      .fill()
      .map(() => ({
        date: "",
        time: "",
        vacuumLevel: "",
        mcOutletTemp: "",
        otiTemp: "",
        wtiTemp: "",
      })),

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage4Form2`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage4Form2")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleCoolerBankRecordChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      coolerBankRecords: prev.coolerBankRecords.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    }))
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "coolerBankFiltration", label: "Cooler Bank Filtration Process" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
                value={formData.insulationTesterDetails}
                onChange={(e) => setFormData({ ...formData, insulationTesterDetails: e.target.value })}
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
                value={formData.tempOTI}
                onChange={(e) => setFormData({ ...formData, tempOTI: e.target.value })}
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
                value={formData.tempWTI}
                onChange={(e) => setFormData({ ...formData, tempWTI: e.target.value })}
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
                value={formData.tempAMB}
                onChange={(e) => setFormData({ ...formData, tempAMB: e.target.value })}
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
                value={formData.hvEarth_15sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio: e.target.value })}
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
                value={formData.lv1Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_ratio}
                onChange={(e) => setFormData({ ...formData, lv1Earth_ratio: e.target.value })}
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
                value={formData.lv2Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_ratio}
                onChange={(e) => setFormData({ ...formData, lv2Earth_ratio: e.target.value })}
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
                value={formData.hvLv1_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_ratio}
                onChange={(e) => setFormData({ ...formData, hvLv1_ratio: e.target.value })}
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
                value={formData.hvLv2_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_ratio}
                onChange={(e) => setFormData({ ...formData, hvLv2_ratio: e.target.value })}
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
                value={formData.lv1Lv2_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_ratio}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_ratio: e.target.value })}
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
          {formData.coolerBankRecords.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={record.date}
                  onChange={(e) => handleCoolerBankRecordChange(index, "date", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={record.time}
                  onChange={(e) => handleCoolerBankRecordChange(index, "time", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.vacuumLevel}
                  onChange={(e) => handleCoolerBankRecordChange(index, "vacuumLevel", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.mcOutletTemp}
                  onChange={(e) => handleCoolerBankRecordChange(index, "mcOutletTemp", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.otiTemp}
                  onChange={(e) => handleCoolerBankRecordChange(index, "otiTemp", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.wtiTemp}
                  onChange={(e) => handleCoolerBankRecordChange(index, "wtiTemp", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PhotoUploadSection
        title="Cooler Bank Filtration Process"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

export function Stage4Form3({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Oil filtration of Combine (Main Tank + Cooler bank)
    combineRecords: Array(15)
      .fill()
      .map(() => ({
        date: "",
        time: "",
        vacuumLevel: "",
        mcOutletTemp: "",
        otiTemp: "",
        wtiTemp: "",
      })),

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage4Form3`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage4Form3")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleCombineRecordChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      combineRecords: prev.combineRecords.map((record, i) => (i === index ? { ...record, [field]: value } : record)),
    }))
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "combineFiltration", label: "Combine Filtration Process" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
          {formData.combineRecords.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={record.date}
                  onChange={(e) => handleCombineRecordChange(index, "date", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={record.time}
                  onChange={(e) => handleCombineRecordChange(index, "time", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.vacuumLevel}
                  onChange={(e) => handleCombineRecordChange(index, "vacuumLevel", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.mcOutletTemp}
                  onChange={(e) => handleCombineRecordChange(index, "mcOutletTemp", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.otiTemp}
                  onChange={(e) => handleCombineRecordChange(index, "otiTemp", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={record.wtiTemp}
                  onChange={(e) => handleCombineRecordChange(index, "wtiTemp", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PhotoUploadSection
        title="Combine Filtration Process"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

export function Stage4Form4({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // IR & PI Value after filtration
    date: "",
    time: "",
    insulationTesterDetails: "",
    ambTemp: "",
    make: "",
    oilTemp: "",
    srNo: "",
    wdgTemp: "",
    range: "",
    relativeHumidity: "",
    voltageLevel: "",

    // Temperature readings
    tempOTI: "",
    tempWTI: "",
    tempAMB: "",

    // IR measurements (10sec, 60sec, 600sec, and PI)
    hvEarth_10sec: "",
    hvEarth_60sec: "",
    hvEarth_600sec: "",
    hvEarth_pi: "",
    lv1Earth_10sec: "",
    lv1Earth_60sec: "",
    lv1Earth_600sec: "",
    lv1Earth_pi: "",
    lv2Earth_10sec: "",
    lv2Earth_60sec: "",
    lv2Earth_600sec: "",
    lv2Earth_pi: "",
    hvLv1_10sec: "",
    hvLv1_60sec: "",
    hvLv1_600sec: "",
    hvLv1_pi: "",
    hvLv2_10sec: "",
    hvLv2_60sec: "",
    hvLv2_600sec: "",
    hvLv2_pi: "",
    lv1Lv2_10sec: "",
    lv1Lv2_60sec: "",
    lv1Lv2_600sec: "",
    lv1Lv2_pi: "",

    // After Oil Filtration of main tank
    bdv: "",
    waterContent: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage4Form4`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage4Form4")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    { key: "ppmPhoto", label: "PPM Photo" },
    { key: "bdvReading", label: "Reading of BDV values" },
    { key: "airCell", label: "Air cell" },
    { key: "mog", label: "MOG" },
    { key: "pog", label: "POG" },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
                value={formData.insulationTesterDetails}
                onChange={(e) => setFormData({ ...formData, insulationTesterDetails: e.target.value })}
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
                value={formData.tempOTI}
                onChange={(e) => setFormData({ ...formData, tempOTI: e.target.value })}
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
                value={formData.tempWTI}
                onChange={(e) => setFormData({ ...formData, tempWTI: e.target.value })}
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
                value={formData.tempAMB}
                onChange={(e) => setFormData({ ...formData, tempAMB: e.target.value })}
              />
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
              <input
                type="text"
                value={formData.hvEarth_10sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_600sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_pi}
                onChange={(e) => setFormData({ ...formData, hvEarth_pi: e.target.value })}
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
                value={formData.lv1Earth_10sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_600sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_pi}
                onChange={(e) => setFormData({ ...formData, lv1Earth_pi: e.target.value })}
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
                value={formData.lv2Earth_10sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_600sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_pi}
                onChange={(e) => setFormData({ ...formData, lv2Earth_pi: e.target.value })}
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
                value={formData.hvLv1_10sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_600sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_pi}
                onChange={(e) => setFormData({ ...formData, hvLv1_pi: e.target.value })}
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
                value={formData.hvLv2_10sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_600sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_pi}
                onChange={(e) => setFormData({ ...formData, hvLv2_pi: e.target.value })}
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
                value={formData.lv1Lv2_10sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_10sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_600sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_pi}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_pi: e.target.value })}
              />
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
              <input
                type="text"
                value={formData.bdv}
                onChange={(e) => setFormData({ ...formData, bdv: e.target.value })}
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
                value={formData.waterContent}
                onChange={(e) => setFormData({ ...formData, waterContent: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="PPM Photo, Reading of BDV values, Air cell, MOG, POG."
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Submit Stage 4
        </button>
      </div>
    </form>
  )
}

// Form 7: Magnetizing Current Test (V Connected 63 MVA)
function Stage5Form1({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Test equipment details
    makeOfMeter: "",
    date: "",
    modelSrNo: "",
    ambient: "",
    oti: "",
    wti: "",
    testReportReviewedBy: "",
    acceptanceOfTest: "",

    // Transformer details
    trSrNo: "",
    location: "",
    customer: "",
    testDate: "",
    testTime: "",

    // Test conditions
    ambTemp: "",
    make: "",
    oilTemp: "",
    srNo: "",
    wdgTemp: "",
    voltageLevel: "",

    // IR measurements (15sec, 60sec, 600sec, and ratios)
    hvEarth_15sec: "",
    hvEarth_60sec: "",
    hvEarth_600sec: "",
    hvEarth_ratio60_15: "",
    hvEarth_ratio600_60: "",
    lvEarth_15sec: "",
    lvEarth_60sec: "",
    lvEarth_600sec: "",
    lvEarth_ratio60_15: "",
    lvEarth_ratio600_60: "",
    hvLv_15sec: "",
    hvLv_60sec: "",
    hvLv_600sec: "",
    hvLv_ratio60_15: "",
    hvLv_ratio600_60: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage5Form1`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage5Form1")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "testRecord", label: "Test Record of Erection" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
                value={formData.makeOfMeter}
                onChange={(e) => setFormData({ ...formData, makeOfMeter: e.target.value })}
              />
            </td>
            <td>
              <strong>Date</strong>
            </td>
            <td>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                value={formData.modelSrNo}
                onChange={(e) => setFormData({ ...formData, modelSrNo: e.target.value })}
              />
            </td>
            <td>
              <strong>Ambient</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.ambient}
                onChange={(e) => setFormData({ ...formData, ambient: e.target.value })}
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
                value={formData.oti}
                onChange={(e) => setFormData({ ...formData, oti: e.target.value })}
              />
            </td>
            <td>
              <strong>WTI in ⁰C</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.wti}
                onChange={(e) => setFormData({ ...formData, wti: e.target.value })}
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
                value={formData.testReportReviewedBy}
                onChange={(e) => setFormData({ ...formData, testReportReviewedBy: e.target.value })}
              />
            </td>
            <td>
              <strong>Acceptance of the test</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.acceptanceOfTest}
                onChange={(e) => setFormData({ ...formData, acceptanceOfTest: e.target.value })}
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
                value={formData.trSrNo}
                onChange={(e) => setFormData({ ...formData, trSrNo: e.target.value })}
              />
            </td>
            <td>
              <strong>Location</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
            </td>
            <td>
              <strong>Date</strong>
            </td>
            <td>
              <input
                type="date"
                value={formData.testDate}
                onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
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
                value={formData.testTime}
                onChange={(e) => setFormData({ ...formData, testTime: e.target.value })}
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
                value={formData.ambTemp}
                onChange={(e) => setFormData({ ...formData, ambTemp: e.target.value })}
              />
            </td>
            <td>
              <strong>Make</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
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
                value={formData.oilTemp}
                onChange={(e) => setFormData({ ...formData, oilTemp: e.target.value })}
              />
            </td>
            <td>
              <strong>Sr. No</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.srNo}
                onChange={(e) => setFormData({ ...formData, srNo: e.target.value })}
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
                value={formData.wdgTemp}
                onChange={(e) => setFormData({ ...formData, wdgTemp: e.target.value })}
              />
            </td>
            <td>
              <strong>Voltage Level</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.voltageLevel}
                onChange={(e) => setFormData({ ...formData, voltageLevel: e.target.value })}
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
                value={formData.hvEarth_15sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_600sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio60_15}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio60_15: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio600_60}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio600_60: e.target.value })}
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
                value={formData.lvEarth_15sec}
                onChange={(e) => setFormData({ ...formData, lvEarth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, lvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvEarth_600sec}
                onChange={(e) => setFormData({ ...formData, lvEarth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvEarth_ratio60_15}
                onChange={(e) => setFormData({ ...formData, lvEarth_ratio60_15: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lvEarth_ratio600_60}
                onChange={(e) => setFormData({ ...formData, lvEarth_ratio600_60: e.target.value })}
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
                value={formData.hvLv_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv_600sec}
                onChange={(e) => setFormData({ ...formData, hvLv_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv_ratio60_15}
                onChange={(e) => setFormData({ ...formData, hvLv_ratio60_15: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv_ratio600_60}
                onChange={(e) => setFormData({ ...formData, hvLv_ratio600_60: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="Test Record of Erection"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

// Form 8: Polarity Test (V Connected 63 MVA)
function Stage5Form2({ onSubmit, onPrevious, initialData, isLastFormOfStage, companyName, projectName }) {
  const [formData, setFormData] = useState({
    // Polarity Test
    condition1_terminal1: "",
    condition1_terminal2: "",
    condition2_terminal1: "",
    condition2_terminal2: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage5Form2`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for Stage5Form2")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "polarityTest", label: "Polarity Test" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>TYPE OF TEST – POLARITY TEST</h2>
      </div>

      <h3 style={{ textAlign: "center", marginTop: "30px" }}>Condition 1</h3>
      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>Terminal 1</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.condition1_terminal1}
                onChange={(e) => setFormData({ ...formData, condition1_terminal1: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Terminal 2</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.condition1_terminal2}
                onChange={(e) => setFormData({ ...formData, condition1_terminal2: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ textAlign: "center", marginTop: "30px" }}>Condition 2</h3>
      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>Terminal 1</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.condition2_terminal1}
                onChange={(e) => setFormData({ ...formData, condition2_terminal1: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Terminal 2</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.condition2_terminal2}
                onChange={(e) => setFormData({ ...formData, condition2_terminal2: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection title="Polarity Test" photos={photoRequirements} onPhotoChange={handlePhotoChange} />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Submit Stage 5
        </button>
      </div>
    </form>
  )
}

// Form 9: Short Circuit Test (V Connected 63 MVA)
function ShortCircuitTestV63Form({ onSubmit, onPrevious, initialData, isLastFormOfStage, companyName, projectName }) {
  const [formData, setFormData] = useState({
    appliedVoltage: "",
    date: "",
    time: "",
    meterMakeSrNo: "",

    // Short circuit test measurements
    test11_12_measuredCurrent11: "",
    test11_12_measuredCurrent12_21: "",
    test12_21_measuredCurrent12: "",
    test12_21_measuredCurrent11_21: "",

    // Impedance calculation
    appliedVoltageHV: "",
    ratedCurrentLV: "",
    percentZ: "",
    ratedVoltageHV: "",
    measuredCurrentLV: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage5Form9`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for stage5Form9")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "shortCircuitTest", label: "Short Circuit Test" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>TYPE OF TEST – SHORT CIRCUIT TEST</h2>
      </div>

      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>APPLIED VOLTAGE:</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.appliedVoltage}
                onChange={(e) => setFormData({ ...formData, appliedVoltage: e.target.value })}
                placeholder="VOLTS"
              />
            </td>
            <td>
              <strong>DATE:</strong>
            </td>
            <td>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </td>
            <td>
              <strong>TIME :</strong>
            </td>
            <td>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>METER MAKE SR. NO.</strong>
            </td>
            <td colSpan="5">
              <input
                type="text"
                value={formData.meterMakeSrNo}
                onChange={(e) => setFormData({ ...formData, meterMakeSrNo: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>APPLIED VOLTAGE</th>
            <th colSpan="2">Measured Current</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>1.1 – 1.2</strong>
            </td>
            <td>
              <strong>1.1</strong>
            </td>
            <td>
              <strong>1.2 – 2.1 SHORTED</strong>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                value={formData.test11_12_measuredCurrent11}
                onChange={(e) => setFormData({ ...formData, test11_12_measuredCurrent11: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.test11_12_measuredCurrent12_21}
                onChange={(e) => setFormData({ ...formData, test11_12_measuredCurrent12_21: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>1.2 – 2.1</strong>
            </td>
            <td>
              <strong>1.2</strong>
            </td>
            <td>
              <strong>1.1 – 2.1 SHORTED</strong>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                value={formData.test12_21_measuredCurrent12}
                onChange={(e) => setFormData({ ...formData, test12_21_measuredCurrent12: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.test12_21_measuredCurrent11_21}
                onChange={(e) => setFormData({ ...formData, test12_21_measuredCurrent11_21: e.target.value })}
              />
            </td>
          </tr>
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
              <input
                type="text"
                value={formData.appliedVoltageHV}
                onChange={(e) => setFormData({ ...formData, appliedVoltageHV: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.ratedCurrentLV}
                onChange={(e) => setFormData({ ...formData, ratedCurrentLV: e.target.value })}
              />
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
                  value={formData.percentZ}
                  onChange={(e) => setFormData({ ...formData, percentZ: e.target.value })}
                  placeholder="%Z ="
                  style={{ width: "80px" }}
                />
                <span>
                  <strong>Rated voltage HV</strong>
                </span>
                <input
                  type="text"
                  value={formData.ratedVoltageHV}
                  onChange={(e) => setFormData({ ...formData, ratedVoltageHV: e.target.value })}
                  style={{ width: "120px" }}
                />
                <span>
                  <strong>Measured current LV</strong>
                </span>
                <input
                  type="text"
                  value={formData.measuredCurrentLV}
                  onChange={(e) => setFormData({ ...formData, measuredCurrentLV: e.target.value })}
                  style={{ width: "120px" }}
                />
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection title="Short Circuit Test" photos={photoRequirements} onPhotoChange={handlePhotoChange} />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
    
  )
}

// Form 10: Short Circuit and Winding Resistance Test (V Connected 63 MVA)
function ShortCircuitWindingResistanceTestForm({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    appliedVoltage: "",
    date: "",
    time: "",
    meterMakeSrNo: "",

    // Short circuit test measurements
    test11_12_measuredCurrent11: "",
    test11_12_measuredCurrent12_21: "",
    test12_21_measuredCurrent12: "",
    test12_21_measuredCurrent11_21: "",

    // Impedance calculation
    appliedVoltageHV: "",
    ratedCurrentLV: "",
    percentZ: "",
    ratedVoltageHV: "",
    measuredCurrentLV: "",

    // Winding Resistance Test
    windingMeterUsed: "",
    windingDate: "",
    windingTime: "",
    windingMeterMakeSrNo: "",
    windingWti: "",
    windingOti: "",
    windingRange: "",
    windingAmbient: "",

    // Winding resistance measurements
    winding11_12: "",
    winding11_21: "",
    winding21_12: "",

    photos: {},
    ...initialData,
  })

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/table/getTable/Stage5Form10`, {
          params: {
            companyName: companyName,
            projectName: projectName,
          },
        })
        if (response.data && response.data.data) {
          console.log("Data fetched from DB for stage5Form10")
          setFormData(response.data.data)
        } else {
          console.log("There is no data in DB.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchFormData()
  }, [projectName, companyName])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleSignatureChange = (key, type, value) => {
    setFormData((prev) => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [`${key}${
          type === "name" ? "Name" : type === "date" ? "Date" : "Signature"
        }`]: value,
      },
    }));
  };

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "shortCircuitTest", label: "Short Circuit Test" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>TYPE OF TEST – SHORT CIRCUIT TEST</h2>
      </div>

      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>APPLIED VOLTAGE:</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.appliedVoltage}
                onChange={(e) => setFormData({ ...formData, appliedVoltage: e.target.value })}
                placeholder="VOLTS"
              />
            </td>
            <td>
              <strong>DATE:</strong>
            </td>
            <td>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </td>
            <td>
              <strong>TIME :</strong>
            </td>
            <td>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>METER MAKE SR. NO.</strong>
            </td>
            <td colSpan="5">
              <input
                type="text"
                value={formData.meterMakeSrNo}
                onChange={(e) => setFormData({ ...formData, meterMakeSrNo: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>APPLIED VOLTAGE</th>
            <th colSpan="2">Measured Current</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>1.1 – 1.2</strong>
            </td>
            <td>
              <strong>1.1</strong>
            </td>
            <td>
              <strong>1.2 – 2.1 SHORTED</strong>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                value={formData.test11_12_measuredCurrent11}
                onChange={(e) => setFormData({ ...formData, test11_12_measuredCurrent11: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.test11_12_measuredCurrent12_21}
                onChange={(e) => setFormData({ ...formData, test11_12_measuredCurrent12_21: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>1.2 – 2.1</strong>
            </td>
            <td>
              <strong>1.2</strong>
            </td>
            <td>
              <strong>1.1 – 2.1 SHORTED</strong>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                value={formData.test12_21_measuredCurrent12}
                onChange={(e) => setFormData({ ...formData, test12_21_measuredCurrent12: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.test12_21_measuredCurrent11_21}
                onChange={(e) => setFormData({ ...formData, test12_21_measuredCurrent11_21: e.target.value })}
              />
            </td>
          </tr>
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
              <input
                type="text"
                value={formData.appliedVoltageHV}
                onChange={(e) => setFormData({ ...formData, appliedVoltageHV: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.ratedCurrentLV}
                onChange={(e) => setFormData({ ...formData, ratedCurrentLV: e.target.value })}
              />
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="text"
                  value={formData.percentZ}
                  onChange={(e) => setFormData({ ...formData, percentZ: e.target.value })}
                  placeholder="%Z ="
                  style={{ width: "80px" }}
                />
                <span>
                  <strong>Rated voltage HV</strong>
                </span>
                <input
                  type="text"
                  value={formData.ratedVoltageHV}
                  onChange={(e) => setFormData({ ...formData, ratedVoltageHV: e.target.value })}
                  style={{ width: "120px" }}
                />
                <span>
                  <strong>Measured current LV</strong>
                </span>
                <input
                  type="text"
                  value={formData.measuredCurrentLV}
                  onChange={(e) => setFormData({ ...formData, measuredCurrentLV: e.target.value })}
                  style={{ width: "120px" }}
                />
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "40px", textAlign: "center" }}>TYPE OF TEST – WINDING RESISTANCE TEST</h3>

      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>METER USED</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.windingMeterUsed}
                onChange={(e) => setFormData({ ...formData, windingMeterUsed: e.target.value })}
              />
            </td>
            <td>
              <strong>DATE:</strong>
            </td>
            <td>
              <input
                type="date"
                value={formData.windingDate}
                onChange={(e) => setFormData({ ...formData, windingDate: e.target.value })}
              />
            </td>
            <td>
              <strong>TIME :</strong>
            </td>
            <td>
              <input
                type="time"
                value={formData.windingTime}
                onChange={(e) => setFormData({ ...formData, windingTime: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>METER MAKE SR. NO.</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.windingMeterMakeSrNo}
                onChange={(e) => setFormData({ ...formData, windingMeterMakeSrNo: e.target.value })}
              />
            </td>
            <td>
              <strong>WTI:</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.windingWti}
                onChange={(e) => setFormData({ ...formData, windingWti: e.target.value })}
              />
            </td>
            <td>
              <strong>OTI:</strong>
            </td>
            <td>
                <input
                type="text"
                value={formData.windingWti}
                onChange={(e) => setFormData({ ...formData, windingWti: e.target.value })}
              />
              </td>
              </tr>
              </tbody>
              </table>
              <table className="form-table" style={{ marginTop: "20px" }}>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Temperature of</strong>
                          </td>
                          <td>
                            <strong>°C</strong>
                          </td>
                          <td>
                            <strong>WTI</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={formData.temperatureWTI}
                              onChange={(e) =>
                                setFormData({ ...formData, temperatureWTI: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <strong>OTI</strong>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={formData.temperatureOTI}
                              onChange={(e) =>
                                setFormData({ ...formData, temperatureOTI: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
              
                    <div className="form-group" style={{ marginTop: "30px" }}>
                      <label>
                        <strong>
                          Remarks: The Transformer as mentioned above has been jointly cleared
                          for charging as on _____. All the necessary pre-commissioning checks
                          and protection trials have been found satisfactory. Transformer has
                          been cleared from all foreign material and is ready for charging.
                        </strong>
                      </label>
                      <textarea
                        rows="4"
                        value={formData.remarks}
                        onChange={(e) =>
                          setFormData({ ...formData, remarks: e.target.value })
                        }
                        placeholder="Enter any additional remarks..."
                      />
                    </div>
              
                    <PhotoUploadSection
                      title="Earthing's of main tank & bushing, sealing of Cable gland, bushing test tap & thimble, Buchholz terminal plate, etc...., Full Photo of transformer"
                      photos={photoRequirements}
                      onPhotoChange={handlePhotoChange}
                    />
              
                    <div className="signature-section">
                      <div className="signature-box">
                        <label>Checked by VPES:</label>
                        <input
                          type="text"
                          placeholder="Name"
                          value={formData.signatures.vpesName}
                          onChange={(e) =>
                            handleSignatureChange("vpes", "name", e.target.value)
                          }
                        />
                        <SignatureBox
                          label=""
                          nameValue=""
                          onNameChange={() => {}}
                          onSignatureChange={(signature) =>
                            handleSignatureChange("vpes", "signature", signature)
                          }
                          initialSignature={formData.signatures.vpesSignature}
                        />
                        <input
                          type="date"
                          value={formData.signatures.vpesDate}
                          onChange={(e) =>
                            handleSignatureChange("vpes", "date", e.target.value)
                          }
                        />
                      </div>
              
                      <div className="signature-box">
                        <label>Witnessed By Customer:</label>
                        <input
                          type="text"
                          placeholder="Name"
                          value={formData.signatures.customerName}
                          onChange={(e) =>
                            handleSignatureChange("customer", "name", e.target.value)
                          }
                        />
                        <SignatureBox
                          label=""
                          nameValue=""
                          onNameChange={() => {}}
                          onSignatureChange={(signature) =>
                            handleSignatureChange("customer", "signature", signature)
                          }
                          initialSignature={formData.signatures.customerSignature}
                        />
                        <input
                          type="date"
                          value={formData.signatures.customerDate}
                          onChange={(e) =>
                            handleSignatureChange("customer", "date", e.target.value)
                          }
                        />
                      </div>
                    </div>
              
                    <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
                  </form>
                );
              }

export function IRValuesTransformerForm({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
               const [formData, setFormData] = useState({
    date: "",
    time: "",
    ambTemp: "",
    oilTemp: "",
    wdgTemp: "",
    relativeHumidity: "",
    make: "",
    srNo: "",
    range: "",
    voltageLevel: "",

    // IR measurements
    hvEarth_15sec: "",
    hvEarth_60sec: "",
    hvEarth_600sec: "",
    hvEarth_ratio_ir60: "",
    hvEarth_ratio_ir600: "",

    lv1Earth_15sec: "",
    lv1Earth_60sec: "",
    lv1Earth_600sec: "",
    lv1Earth_ratio_ir60: "",
    lv1Earth_ratio_ir600: "",

    lv2Earth_15sec: "",
    lv2Earth_60sec: "",
    lv2Earth_600sec: "",
    lv2Earth_ratio_ir60: "",
    lv2Earth_ratio_ir600: "",

    hvLv1_15sec: "",
    hvLv1_60sec: "",
    hvLv1_600sec: "",
    hvLv1_ratio_ir60: "",
    hvLv1_ratio_ir600: "",

    hvLv2_15sec: "",
    hvLv2_60sec: "",
    hvLv2_600sec: "",
    hvLv2_ratio_ir60: "",
    hvLv2_ratio_ir600: "",

    lv1Lv2_15sec: "",
    lv1Lv2_60sec: "",
    lv1Lv2_600sec: "",
    lv1Lv2_ratio_ir60: "",
    lv1Lv2_ratio_ir600: "",

    // Signatures
    signatures: {
      vpesName: "",
      vpesSignature: "",
      vpesDate: "",
      customerName: "",
      customerSignature: "",
      customerDate: "",
    },

    photos: {},
    ...initialData,
  })

  const handleSignatureChange = (key, type, value) => {
    setFormData((prev) => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [`${key}${type.charAt(0).toUpperCase() + type.slice(1)}`]: value,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    {
      key: "sfraCalibraton",
      label: "SFRA kit calibration, ten delta kit calibration, multimeter, megger, winding resistance kit, clamp meter",
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>"IR VALUES OF TRANSFORMER"</h2>
      </div>

      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>Date :</strong>
            </td>
            <td>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </td>
            <td>
              <strong>Time:</strong>
            </td>
            <td>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
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
              <input
                type="text"
                value={formData.ambTemp}
                onChange={(e) => setFormData({ ...formData, ambTemp: e.target.value })}
              />
            </td>
            <td>
              <strong>Make :</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />
            </td>
            <td rowSpan="4"></td>
          </tr>
          <tr>
            <td>
              <strong>Oil Temp. :</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.oilTemp}
                onChange={(e) => setFormData({ ...formData, oilTemp: e.target.value })}
              />
            </td>
            <td>
              <strong>Sr. No. :</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.srNo}
                onChange={(e) => setFormData({ ...formData, srNo: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Wdg. Temp. :</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.wdgTemp}
                onChange={(e) => setFormData({ ...formData, wdgTemp: e.target.value })}
              />
            </td>
            <td>
              <strong>Range :</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.range}
                onChange={(e) => setFormData({ ...formData, range: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Relative Humidity :</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.relativeHumidity}
                onChange={(e) => setFormData({ ...formData, relativeHumidity: e.target.value })}
              />
            </td>
            <td>
              <strong>Voltage Level :</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.voltageLevel}
                onChange={(e) => setFormData({ ...formData, voltageLevel: e.target.value })}
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
            <th>Ratio of IR 60/IR 15</th>
            <th>Ratio of IR 600/IR 60</th>
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
                value={formData.hvEarth_15sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_60sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_600sec}
                onChange={(e) => setFormData({ ...formData, hvEarth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio_ir60}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio_ir60: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvEarth_ratio_ir600}
                onChange={(e) => setFormData({ ...formData, hvEarth_ratio_ir600: e.target.value })}
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
                value={formData.lv1Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_600sec}
                onChange={(e) => setFormData({ ...formData, lv1Earth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_ratio_ir60}
                onChange={(e) => setFormData({ ...formData, lv1Earth_ratio_ir60: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Earth_ratio_ir600}
                onChange={(e) => setFormData({ ...formData, lv1Earth_ratio_ir600: e.target.value })}
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
                value={formData.lv2Earth_15sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_60sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_600sec}
                onChange={(e) => setFormData({ ...formData, lv2Earth_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_ratio_ir60}
                onChange={(e) => setFormData({ ...formData, lv2Earth_ratio_ir60: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv2Earth_ratio_ir600}
                onChange={(e) => setFormData({ ...formData, lv2Earth_ratio_ir600: e.target.value })}
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
                value={formData.hvLv1_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_600sec}
                onChange={(e) => setFormData({ ...formData, hvLv1_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_ratio_ir60}
                onChange={(e) => setFormData({ ...formData, hvLv1_ratio_ir60: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv1_ratio_ir600}
                onChange={(e) => setFormData({ ...formData, hvLv1_ratio_ir600: e.target.value })}
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
                value={formData.hvLv2_15sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_60sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_600sec}
                onChange={(e) => setFormData({ ...formData, hvLv2_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_ratio_ir60}
                onChange={(e) => setFormData({ ...formData, hvLv2_ratio_ir60: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.hvLv2_ratio_ir600}
                onChange={(e) => setFormData({ ...formData, hvLv2_ratio_ir600: e.target.value })}
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
                value={formData.lv1Lv2_15sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_15sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_60sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_60sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_600sec}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_600sec: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_ratio_ir60}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_ratio_ir60: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.lv1Lv2_ratio_ir600}
                onChange={(e) => setFormData({ ...formData, lv1Lv2_ratio_ir600: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="SFRA kit calibration, ten delta kit calibration, multimeter, megger, winding resistance kit, clamp meter."
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="signature-section">
        <div className="signature-box">
          <label>Checked By VPES :</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.signatures.vpesName}
            onChange={(e) => handleSignatureChange("vpes", "name", e.target.value)}
          />
          <SignatureBox
            label=""
            nameValue=""
            onNameChange={() => {}}
            onSignatureChange={(signature) => handleSignatureChange("vpes", "signature", signature)}
            initialSignature={formData.signatures.vpesSignature}
          />
          <input
            type="date"
            value={formData.signatures.vpesDate}
            onChange={(e) => handleSignatureChange("vpes", "date", e.target.value)}
          />
        </div>

        <div className="signature-box">
          <label>Witnessed by customer :</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.signatures.customerName}
            onChange={(e) => handleSignatureChange("customer", "name", e.target.value)}
          />
          <SignatureBox
            label=""
            nameValue=""
            onNameChange={() => {}}
            onSignatureChange={(signature) => handleSignatureChange("customer", "signature", signature)}
            initialSignature={formData.signatures.customerSignature}
          />
          <input
            type="date"
            value={formData.signatures.customerDate}
            onChange={(e) => handleSignatureChange("customer", "date", e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Submit Stage 5
        </button>
      </div>
    </form>
  )
}
// Stage 6 Form Components - Based on provided images
// Stage 6 Form 1: Pre-Commissioning Checklist
export function PreCommissioningChecklistForm({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    projectName: "",
    ratingMVA: "63 MVA",
    ratingVoltage: "132KV±7.5 KV",
    srNo: "",
    manufacturerName: "Vishvas Power Engg. Services Pvt. Ltd.",

    // Checklist items
    valveStatus: "",
    bushingToConservator: "",
    bushingToRadiator: "",
    radiatorTopValves: "",
    radiatorBottomValves: "",
    mainTankToRadiator: "",
    topHeader: "",
    bottomHeader: "",
    mainTankToRadiatorBank: "",
    oilPumpToRFRD: "",
    oilPumpToRadiatorBank: "",
    topFilterValve: "",
    bottomFilterValve: "",
    drainValve: "",
    samplingValve: "",

    // Air venting from following locations
    mainTank: "",
    conservator: "",
    hvBushing: { 1.1: "", 1.2: "" },
    lvBushing: { 2.1: "", 2.2: "", 3.1: "", 3.2: "" },
    pipeLineTop: "",
    pipeLineBottom: "",
    headerTop: "",
    headerBottom: "",
    radiatorTop: "",
    nfrd: "",
    oilPump: "",
    diverseSwitch: "",
    protectionTrails: "",
    buchholz: "",

    // MOG
    mog: "",
    prv: "",

    // OTI
    oti: "",
    wti: "",

    // Connectors
    connectors: {
      lv21: "",
      lv22: "",
      lv31: "",
      lv32: "",
    },

    // Final checks
    anabondApplied: "",
    jointsSealed: "",
    foreignMaterialCleared: "",
    temperatureWTI: "",
    temperatureOTI: "",

    // Signatures
    signatures: {
      vpesName: "",
      vpesSignature: "",
      vpesDate: "",
      customerName: "",
      customerSignature: "",
      customerDate: "",
    },

    photos: {},
    ...initialData,
  })

  const handleSignatureChange = (key, type, value) => {
    setFormData((prev) => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [`${key}${type.charAt(0).toUpperCase() + type.slice(1)}`]: value,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [
    {
      key: "earthingMainTank",
      label:
        "Earthing's of main tank & bushing, sealing of Cable gland, bushing test tap & thimble, Buchholz terminal plate, etc...., Full Photo of transformer",
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>VISHVAS POWER ENGINEERING SERVICES PVT. LTD. NAGPUR</h2>
        <h3>PRE-COMMISSIONING CHECKLIST</h3>
      </div>

      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>Name of end customer</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </td>
            <td>
              <strong>Rating MVA</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.ratingMVA}
                onChange={(e) => setFormData({ ...formData, ratingMVA: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Name of project company</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              />
            </td>
            <td>
              <strong>Rating Voltage</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.ratingVoltage}
                onChange={(e) => setFormData({ ...formData, ratingVoltage: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Name of TSS</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.nameTSS}
                onChange={(e) => setFormData({ ...formData, nameTSS: e.target.value })}
              />
            </td>
            <td>
              <strong>Sr. no.</strong>
            </td>
            <td>
              <input
                type="text"
                value={formData.srNo}
                onChange={(e) => setFormData({ ...formData, srNo: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Manufacturer name</strong>
            </td>
            <td colSpan="3">
              <input
                type="text"
                value={formData.manufacturerName}
                onChange={(e) => setFormData({ ...formData, manufacturerName: e.target.value })}
                style={{ width: "100%" }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Particulars</th>
            <th>Qty</th>
            <th>Open</th>
            <th>Status Closed</th>
            <th>N/A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>A</strong>
            </td>
            <td>Valve Status</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>B</strong>
            </td>
            <td>Bushing to Conservator</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>Bushing to Radiator</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>D</strong>
            </td>
            <td>Radiator Top Valves</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>E</strong>
            </td>
            <td>Radiator Bottom Valves</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>F</strong>
            </td>
            <td>Main Tank to Radiator</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>G</strong>
            </td>
            <td>Top Header</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>H</strong>
            </td>
            <td>Bottom Header</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>I</strong>
            </td>
            <td>Main Tank to Radiator Bank</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>J</strong>
            </td>
            <td>Oil Pump to R.F.R.D</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>K</strong>
            </td>
            <td>Oil Pump to Radiator Bank</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>L</strong>
            </td>
            <td>Top Filter Valve</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>M</strong>
            </td>
            <td>Bottom Filter Valve</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>N</strong>
            </td>
            <td>Drain Valve</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>O</strong>
            </td>
            <td>Sampling Valve</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: "30px" }}>Air venting from the Following Locations:</h4>
      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>A</strong>
            </td>
            <td>Main Tank</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>B</strong>
            </td>
            <td>Conservator</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>HV Bushing</td>
            <td>1.1</td>
            <td>1.2</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>D</strong>
            </td>
            <td>LV Bushing</td>
            <td>2.1</td>
            <td>2.2</td>
            <td>3.1</td>
            <td>3.2</td>
          </tr>
          <tr>
            <td>
              <strong>E</strong>
            </td>
            <td>Pipe Line Top</td>
            <td>1</td>
            <td>2</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>F</strong>
            </td>
            <td>Pipe Line Bottom</td>
            <td>1</td>
            <td>2</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>G</strong>
            </td>
            <td>Header - Top</td>
            <td>1</td>
            <td>2</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>H</strong>
            </td>
            <td>Header - Bottom</td>
            <td>1</td>
            <td>2</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>I</strong>
            </td>
            <td>Radiator - Top</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>J</strong>
            </td>
            <td>NFRD</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>
              <strong>K</strong>
            </td>
            <td>Oil Pump</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>L</strong>
            </td>
            <td>Diverse Switch</td>
            <td></td>
            <td></td>
            <td>Checked</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>M</strong>
            </td>
            <td>Protection Trails</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>N</strong>
            </td>
            <td>BUCHHOLZ</td>
            <td>ALARM</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <td>
              <strong>B</strong>
            </td>
            <td>MOG</td>
            <td>ALARM</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>PRV</td>
            <td>TRIP</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>D</strong>
            </td>
            <td>OTI</td>
            <td>ALARM</td>
            <td>Set Temperature</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>TRIP</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>E</strong>
            </td>
            <td>WTI</td>
            <td>ALARM</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>TRIP</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <td>
              <strong>XI</strong>
            </td>
            <td>Connectors</td>
            <td>LV Jumpers</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>2.1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>2.2</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>3.1</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>3.2</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <td>
              <strong>XII</strong>
            </td>
            <td>Anabond applied to HV Bushing thimble Sealed</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>1</strong>
            </td>
            <td>Anabond applied to HV Bushing</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>2</strong>
            </td>
            <td>All joints properly sealed against Water Ingress</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>3</strong>
            </td>
            <td>All Foreign material cleared from Transformer</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Temperature of °C WTI</strong>
          <input
            type="text"
            value={formData.temperatureWTI}
            onChange={(e) => setFormData({ ...formData, temperatureWTI: e.target.value })}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </p>
        <p>
          <strong>OTI</strong>
          <input
            type="text"
            value={formData.temperatureOTI}
            onChange={(e) => setFormData({ ...formData, temperatureOTI: e.target.value })}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <p>
          <strong>
            Remarks: The Transformer as mentioned above has been jointly cleared for charging as on _____. All the
            necessary pre-commissioning checks and protection trials have been found satisfactory. Transformer has been
            cleared from all foreign material and is ready for charging.
          </strong>
        </p>
      </div>

      <PhotoUploadSection
        title="Earthing's of main tank & bushing, sealing of Cable gland, bushing test tap & thimble, Buchholz terminal plate, etc...., Full Photo of transformer"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="signature-section">
        <div className="signature-box">
          <label>Checked by VPES :</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.signatures.vpesName}
            onChange={(e) => handleSignatureChange("vpes", "name", e.target.value)}
          />
          <SignatureBox
            label=""
            nameValue=""
            onNameChange={() => {}}
            onSignatureChange={(signature) => handleSignatureChange("vpes", "signature", signature)}
            initialSignature={formData.signatures.vpesSignature}
          />
          <input
            type="date"
            value={formData.signatures.vpesDate}
            onChange={(e) => handleSignatureChange("vpes", "date", e.target.value)}
          />
        </div>

        <div className="signature-box">
          <label>Witnessed By Customer :</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.signatures.customerName}
            onChange={(e) => handleSignatureChange("customer", "name", e.target.value)}
          />
          <SignatureBox
            label=""
            nameValue=""
            onNameChange={() => {}}
            onSignatureChange={(signature) => handleSignatureChange("customer", "signature", signature)}
            initialSignature={formData.signatures.customerSignature}
          />
          <input
            type="date"
            value={formData.signatures.customerDate}
            onChange={(e) => handleSignatureChange("customer", "date", e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

// Stage 6 Form 2: Transformer Protection and Accessories
export function TransformerProtectionAccessoriesForm({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Transformer Protection relay
    transformerProtectionRelay: {
      make: "",
      srNo: "",
      lastTestedDate: "",
      remark: "",
    },

    // Over current relay
    overCurrentRelay: {
      make: "",
      srNo: "",
      lastTestedDate: "",
      remark: "",
    },

    // Differential Relay
    differentialRelay: {
      make: "",
      srNo: "",
      lastTestedDate: "",
      remark: "",
    },

    // Master Trip Relay
    masterTripRelay: {
      make: "",
      srNo: "",
      lastTestedDate: "",
      remark: "",
    },

    // Separate earth pit for neutral earthing
    separateEarthPit: "yes/no",

    // Neutral earth pit resistance values
    neutralEarthPitResistance: "yes/no",

    // Oil surge & Checking for the main tank Earthing
    oilSurgeChecking: {
      1.1: "",
      1.2: "",
      2.1: "",
      2.2: "",
      3.1: "",
      3.2: "",
    },

    // Whether LA Earthing checked
    laEarthingChecked: "",

    // IR values of LA
    irValuesLA: "",

    // Phase 1.1, 1.2, 2.1, 2.2, 3.1, 3.2
    phases: {
      1.1: "",
      1.2: "",
      2.1: "",
      2.2: "",
      3.1: "",
      3.2: "",
    },

    // Accessories Checking
    accessories: {
      fanStart: { setTemp: "", checked: "", noOfHrsRun: "" },
      fanStop: { setTemp: "", checked: "", noOfHrsRun: "" },
      pumpStart: { setTemp: "", checked: "", noOfHrsRun: "" },
      pumpStop: { setTemp: "", checked: "", noOfHrsRun: "" },
      octcTapPosition: { setTemp: "", checked: "", noOfHrsRun: "" },
      diverseSwitch: { setTemp: "", checked: "", noOfHrsRun: "" },
      oilLevel: { setTemp: "", checked: "", noOfHrsRun: "" },
      tpi: { setTemp: "", checked: "", noOfHrsRun: "" },
      bushingTapEarthed: {
        hvChecked: { 1.1: "", 1.2: "" },
        lvChecked: { 2.1: "", 2.2: "", 3.1: "", 3.2: "" },
      },
    },

    // Oil Values
    oilValues: {
      bdv: "",
      moistureContent: "",
      finalOilValues: {
        hvEarth: "",
        lv1Earth: "",
        lv2Earth: "",
        hvLv1: "",
        hvLv2: "",
        lv1Lv2: "",
        coreToFrame: "",
        frameToTank: "",
      },
    },

    // Oil Level in Conservator
    oilLevelConservator: {
      conditions: {
        hvJumpers: { 1.1: "", 1.2: "" },
      },
    },

    photos: {},
    ...initialData,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "transformerProtection", label: "Transformer Protection and Accessories" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>Transformer Protection and Accessories</h2>
      </div>

      <table className="form-table">
        <thead>
          <tr>
            <th>IV</th>
            <th>Transformer Protection relay</th>
            <th>Make</th>
            <th>Sr no.</th>
            <th>last tested date</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>A</strong>
            </td>
            <td>Over current relay</td>
            <td>
              <input
                type="text"
                value={formData.overCurrentRelay.make}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    overCurrentRelay: { ...formData.overCurrentRelay, make: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.overCurrentRelay.srNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    overCurrentRelay: { ...formData.overCurrentRelay, srNo: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="date"
                value={formData.overCurrentRelay.lastTestedDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    overCurrentRelay: { ...formData.overCurrentRelay, lastTestedDate: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.overCurrentRelay.remark}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    overCurrentRelay: { ...formData.overCurrentRelay, remark: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>B</strong>
            </td>
            <td>Earth Fault Relay</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>Differential Relay</td>
            <td>
              <input
                type="text"
                value={formData.differentialRelay.make}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    differentialRelay: { ...formData.differentialRelay, make: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.differentialRelay.srNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    differentialRelay: { ...formData.differentialRelay, srNo: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="date"
                value={formData.differentialRelay.lastTestedDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    differentialRelay: { ...formData.differentialRelay, lastTestedDate: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.differentialRelay.remark}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    differentialRelay: { ...formData.differentialRelay, remark: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>D</strong>
            </td>
            <td>Master Trip Relay</td>
            <td>
              <input
                type="text"
                value={formData.masterTripRelay.make}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    masterTripRelay: { ...formData.masterTripRelay, make: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.masterTripRelay.srNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    masterTripRelay: { ...formData.masterTripRelay, srNo: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="date"
                value={formData.masterTripRelay.lastTestedDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    masterTripRelay: { ...formData.masterTripRelay, lastTestedDate: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.masterTripRelay.remark}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    masterTripRelay: { ...formData.masterTripRelay, remark: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>E</strong>
            </td>
            <td>Separate earth pit for neutral earthing</td>
            <td colSpan="4">
              <select
                value={formData.separateEarthPit}
                onChange={(e) => setFormData({ ...formData, separateEarthPit: e.target.value })}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <strong>F</strong>
            </td>
            <td>Neutral earth pit resistance values</td>
            <td colSpan="4">
              <select
                value={formData.neutralEarthPitResistance}
                onChange={(e) => setFormData({ ...formData, neutralEarthPitResistance: e.target.value })}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: "30px" }}>Oil surge & Checking for the main tank Earthing</h4>
      <table className="form-table">
        <thead>
          <tr>
            <th>G</th>
            <th>LA Earthing & Checking for the main tank Earthing</th>
            <th>1.1</th>
            <th>2.1</th>
            <th>3.1</th>
            <th></th>
          </tr>
          <tr>
            <th>H</th>
            <th>LA Earthing</th>
            <th>1.2</th>
            <th>2.2</th>
            <th>3.2</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <input
                type="text"
                value={formData.oilSurgeChecking["1.1"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilSurgeChecking: { ...formData.oilSurgeChecking, 1.1: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.oilSurgeChecking["2.1"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilSurgeChecking: { ...formData.oilSurgeChecking, 2.1: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.oilSurgeChecking["3.1"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilSurgeChecking: { ...formData.oilSurgeChecking, 3.1: e.target.value },
                  })
                }
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <input
                type="text"
                value={formData.oilSurgeChecking["1.2"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilSurgeChecking: { ...formData.oilSurgeChecking, 1.2: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.oilSurgeChecking["2.2"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilSurgeChecking: { ...formData.oilSurgeChecking, 2.2: e.target.value },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.oilSurgeChecking["3.2"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilSurgeChecking: { ...formData.oilSurgeChecking, 3.2: e.target.value },
                  })
                }
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <td>
              <strong>I</strong>
            </td>
            <td>Whether LA Earthing checked</td>
            <td>
              <input
                type="text"
                value={formData.laEarthingChecked}
                onChange={(e) => setFormData({ ...formData, laEarthingChecked: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>J</strong>
            </td>
            <td>IR values of LA</td>
            <td>
              <input
                type="text"
                value={formData.irValuesLA}
                onChange={(e) => setFormData({ ...formData, irValuesLA: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>K</strong>
            </td>
            <td>Phase 1.1</td>
            <td>
              <input
                type="text"
                value={formData.phases["1.1"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: { ...formData.phases, 1.1: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>L</strong>
            </td>
            <td>Phase 1.2</td>
            <td>
              <input
                type="text"
                value={formData.phases["1.2"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: { ...formData.phases, 1.2: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>M</strong>
            </td>
            <td>Phase 2.1</td>
            <td>
              <input
                type="text"
                value={formData.phases["2.1"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: { ...formData.phases, 2.1: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>N</strong>
            </td>
            <td>Phase 2.2</td>
            <td>
              <input
                type="text"
                value={formData.phases["2.2"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: { ...formData.phases, 2.2: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>O</strong>
            </td>
            <td>Phase 3.1</td>
            <td>
              <input
                type="text"
                value={formData.phases["3.1"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: { ...formData.phases, 3.1: e.target.value },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>P</strong>
            </td>
            <td>Phase 3.2</td>
            <td>
              <input
                type="text"
                value={formData.phases["3.2"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phases: { ...formData.phases, 3.2: e.target.value },
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: "30px" }}>Accessories Checking</h4>
      <table className="form-table">
        <thead>
          <tr>
            <th>IV</th>
            <th>Accessories Checking</th>
            <th>SET Temp.</th>
            <th>Checked</th>
            <th>No. of Hrs. RUN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>A</strong>
            </td>
            <td>FAN START</td>
            <td>
              <input
                type="text"
                value={formData.accessories.fanStart.setTemp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      fanStart: { ...formData.accessories.fanStart, setTemp: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.fanStart.checked}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      fanStart: { ...formData.accessories.fanStart, checked: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.fanStart.noOfHrsRun}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      fanStart: { ...formData.accessories.fanStart, noOfHrsRun: e.target.value },
                    },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>B</strong>
            </td>
            <td>FAN STOP</td>
            <td>
              <input
                type="text"
                value={formData.accessories.fanStop.setTemp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      fanStop: { ...formData.accessories.fanStop, setTemp: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.fanStop.checked}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      fanStop: { ...formData.accessories.fanStop, checked: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.fanStop.noOfHrsRun}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      fanStop: { ...formData.accessories.fanStop, noOfHrsRun: e.target.value },
                    },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>PUMP START</td>
            <td>
              <input
                type="text"
                value={formData.accessories.pumpStart.setTemp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      pumpStart: { ...formData.accessories.pumpStart, setTemp: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.pumpStart.checked}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      pumpStart: { ...formData.accessories.pumpStart, checked: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.pumpStart.noOfHrsRun}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      pumpStart: { ...formData.accessories.pumpStart, noOfHrsRun: e.target.value },
                    },
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>D</strong>
            </td>
            <td>PUMP STOP</td>
            <td>
              <input
                type="text"
                value={formData.accessories.pumpStop.setTemp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      pumpStop: { ...formData.accessories.pumpStop, setTemp: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.pumpStop.checked}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      pumpStop: { ...formData.accessories.pumpStop, checked: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.accessories.pumpStop.noOfHrsRun}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessories: {
                      ...formData.accessories,
                      pumpStop: { ...formData.accessories.pumpStop, noOfHrsRun: e.target.value },
                    },
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: "30px" }}>Oil Values</h4>
      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>VIII</strong>
            </td>
            <td>Oil Values</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>A</strong>
            </td>
            <td>BDV</td>
            <td>KV</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>B</strong>
            </td>
            <td>Moisture Content</td>
            <td>PPM</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>Final Oil Values</td>
            <td>10</td>
            <td>60</td>
            <td>600</td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <td></td>
            <td>HV-Earth</td>
            <td>
              <input
                type="text"
                value={formData.oilValues.finalOilValues.hvEarth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilValues: {
                      ...formData.oilValues,
                      finalOilValues: { ...formData.oilValues.finalOilValues, hvEarth: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>LV1-Earth</td>
            <td>
              <input
                type="text"
                value={formData.oilValues.finalOilValues.lv1Earth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilValues: {
                      ...formData.oilValues,
                      finalOilValues: { ...formData.oilValues.finalOilValues, lv1Earth: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>LV2-Earth</td>
            <td>
              <input
                type="text"
                value={formData.oilValues.finalOilValues.lv2Earth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilValues: {
                      ...formData.oilValues,
                      finalOilValues: { ...formData.oilValues.finalOilValues, lv2Earth: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>HV-LV1</td>
            <td>
              <input
                type="text"
                value={formData.oilValues.finalOilValues.hvLv1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilValues: {
                      ...formData.oilValues,
                      finalOilValues: { ...formData.oilValues.finalOilValues, hvLv1: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>HV-LV2</td>
            <td>
              <input
                type="text"
                value={formData.oilValues.finalOilValues.hvLv2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilValues: {
                      ...formData.oilValues,
                      finalOilValues: { ...formData.oilValues.finalOilValues, hvLv2: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>LV1-LV2</td>
            <td>
              <input
                type="text"
                value={formData.oilValues.finalOilValues.lv1Lv2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    oilValues: {
                      ...formData.oilValues,
                      finalOilValues: { ...formData.oilValues.finalOilValues, lv1Lv2: e.target.value },
                    },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <PhotoUploadSection
        title="Transformer Protection and Accessories"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Next Form
        </button>
      </div>
    </form>
  )
}

// Stage 6 Form 3: Final Checklist and Clearance
export function FinalChecklistClearanceForm({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Connectors
    connectors: {
      lv21: "",
      lv22: "",
      lv31: "",
      lv32: "",
    },

    // Final checks
    anabondApplied: "",
    jointsSealed: "",
    foreignMaterialCleared: "",
    temperatureWTI: "",
    temperatureOTI: "",

    // Remarks
    remarks: "",

    // Signatures
    signatures: {
      vpesName: "",
      vpesSignature: "",
      vpesDate: "",
      customerName: "",
      customerSignature: "",
      customerDate: "",
    },

    photos: {},
    ...initialData,
  })

  const handleSignatureChange = (key, type, value) => {
    setFormData((prev) => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [`${key}${type.charAt(0).toUpperCase() + type.slice(1)}`]: value,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePhotoChange = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const photoRequirements = [{ key: "finalTransformer", label: "Full Photo of transformer" }]

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="company-header">
        <h2>Final Checklist and Clearance</h2>
      </div>

      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <strong>XI</strong>
            </td>
            <td>Connectors</td>
            <td>LV Jumpers</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>2.1</td>
            <td>
              <input
                type="text"
                value={formData.connectors.lv21}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    connectors: { ...formData.connectors, lv21: e.target.value },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>2.2</td>
            <td>
              <input
                type="text"
                value={formData.connectors.lv22}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    connectors: { ...formData.connectors, lv22: e.target.value },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>3.1</td>
            <td>
              <input
                type="text"
                value={formData.connectors.lv31}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    connectors: { ...formData.connectors, lv31: e.target.value },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>3.2</td>
            <td>
              <input
                type="text"
                value={formData.connectors.lv32}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    connectors: { ...formData.connectors, lv32: e.target.value },
                  })
                }
              />
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className="form-table" style={{ marginTop: "20px" }}>
        <tbody>
          <tr>
            <td>
              <strong>XII</strong>
            </td>
            <td>Anabond applied to HV Bushing thimble Sealed</td>
            <td>
              <input
                type="text"
                value={formData.anabondApplied}
                onChange={(e) => setFormData({ ...formData, anabondApplied: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>1</strong>
            </td>
            <td>Anabond applied to HV Bushing</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>2</strong>
            </td>
            <td>All joints properly sealed against Water Ingress</td>
            <td>
              <input
                type="text"
                value={formData.jointsSealed}
                onChange={(e) => setFormData({ ...formData, jointsSealed: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>3</strong>
            </td>
            <td>All Foreign material cleared from Transformer</td>
            <td>
              <input
                type="text"
                value={formData.foreignMaterialCleared}
                onChange={(e) => setFormData({ ...formData, foreignMaterialCleared: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Temperature of °C WTI</strong>
          <input
            type="text"
            value={formData.temperatureWTI}
            onChange={(e) => setFormData({ ...formData, temperatureWTI: e.target.value })}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </p>
        <p>
          <strong>OTI</strong>
          <input
            type="text"
            value={formData.temperatureOTI}
            onChange={(e) => setFormData({ ...formData, temperatureOTI: e.target.value })}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <p>
          <strong>
            Remarks: The Transformer as mentioned above has been jointly cleared for charging as on _____. All the
            necessary pre-commissioning checks and protection trials have been found satisfactory. Transformer has been
            cleared from all foreign material and is ready for charging.
          </strong>
        </p>
        <textarea
          rows="4"
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          placeholder="Enter any additional remarks..."
          style={{ width: "100%", marginTop: "10px" }}
        />
      </div>

      <PhotoUploadSection
        title="Full Photo of transformer"
        photos={photoRequirements}
        onPhotoChange={handlePhotoChange}
      />

      <div className="signature-section">
        <div className="signature-box">
          <label>Checked by VPES :</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.signatures.vpesName}
            onChange={(e) => handleSignatureChange("vpes", "name", e.target.value)}
          />
          <SignatureBox
            label=""
            nameValue=""
            onNameChange={() => {}}
            onSignatureChange={(signature) => handleSignatureChange("vpes", "signature", signature)}
            initialSignature={formData.signatures.vpesSignature}
          />
          <input
            type="date"
            value={formData.signatures.vpesDate}
            onChange={(e) => handleSignatureChange("vpes", "date", e.target.value)}
          />
        </div>

        <div className="signature-box">
          <label>Witnessed By Customer :</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.signatures.customerName}
            onChange={(e) => handleSignatureChange("customer", "name", e.target.value)}
          />
          <SignatureBox
            label=""
            nameValue=""
            onNameChange={() => {}}
            onSignatureChange={(signature) => handleSignatureChange("customer", "signature", signature)}
            initialSignature={formData.signatures.customerSignature}
          />
          <input
            type="date"
            value={formData.signatures.customerDate}
            onChange={(e) => handleSignatureChange("customer", "date", e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        {onPrevious && (
          <button type="button" onClick={onPrevious} className="prev-btn">
            Previous Form
          </button>
        )}
        <button type="submit" className="submit-btn">
          Submit Stage 6
        </button>
      </div>
    </form>
  )
}

// Stage 7 Form: Work Completion Report
export function WorkCompletionReportForm({
  onSubmit,
  onPrevious,
  initialData,
  isLastFormOfStage,
  companyName,
  projectName,
}) {
  const [formData, setFormData] = useState({
    // Project Information
    customerName: "",
    orderNumber: "",
    location: "",

    // Transformer Details
    type: "V-Connected Transformer",
    capacity: "",
    voltageRating: "",
    make: "",
    serialNumber: "",

    // Completion details
    completionDate: "",
    chargingDate: "",
    commissioningDate: "",

    // Signatures
    signatures: {
      vpesName: "",
      vpesDesignation: "",
      vpesSignature: "",
      vpesDate: "",
      customerName: "",
      customerDesignation: "",
      customerSignature: "",
      customerDate: "",
    },

    ...initialData,
  })

  const handleSignatureChange = (key, type, value) => {
    setFormData((prev) => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [`${key}${type.charAt(0).toUpperCase() + type.slice(1)}`]: value,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
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
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#C41E3A" }}>V</div>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>VISHVAS</div>
            <div
              style={{
                fontSize: "1.2rem",
                color: "#666",
                letterSpacing: "2px",
              }}
            >
              POWER
            </div>
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

      <form onSubmit={handleSubmit}>
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
              value={formData.completionDate}
              onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
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
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
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
              value={formData.orderNumber}
              onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
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
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{
                border: "none",
                borderBottom: "1px solid #333",
                background: "transparent",
                width: "200px",
              }}
            />
            <strong style={{ marginLeft: "20px" }}>TSS</strong>
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
            <strong>Type: – V-Connected Transformer</strong>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Capacity: </strong>
            <input
              type="text"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
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
              value={formData.voltageRating}
              onChange={(e) => setFormData({ ...formData, voltageRating: e.target.value })}
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
              value={formData.make}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
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
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
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
            Subject: <em>Completion of Transformer Erection, Testing and Commissioning Work</em>
          </h3>

          <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
            This is to certify that the erection, Testing and commissioning of the above-mentioned transformer has been
            completed in accordance with the terms and conditions of the referenced order.
          </p>

          <p style={{ lineHeight: "1.6", marginBottom: "15px" }}>
            The installation work has been jointly inspected and found satisfactory by the undersigned representatives.
            The transformer was successfully charged/commissioned on no-load at
            <input
              type="time"
              value={formData.chargingDate}
              onChange={(e) => setFormData({ ...formData, chargingDate: e.target.value })}
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
              value={formData.commissioningDate}
              onChange={(e) => setFormData({ ...formData, commissioningDate: e.target.value })}
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
                value={formData.signatures.vpesName}
                onChange={(e) => handleSignatureChange("vpes", "name", e.target.value)}
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
                value={formData.signatures.vpesDesignation}
                onChange={(e) => handleSignatureChange("vpes", "designation", e.target.value)}
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
              <SignatureBox
                label=""
                nameValue=""
                onNameChange={() => {}}
                onSignatureChange={(signature) => handleSignatureChange("vpes", "signature", signature)}
                initialSignature={formData.signatures.vpesSignature}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>Date: </strong>
              <input
                type="date"
                value={formData.signatures.vpesDate}
                onChange={(e) => handleSignatureChange("vpes", "date", e.target.value)}
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
                value={formData.signatures.customerName}
                onChange={(e) => handleSignatureChange("customer", "name", e.target.value)}
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
                value={formData.signatures.customerDesignation}
                onChange={(e) => handleSignatureChange("customer", "designation", e.target.value)}
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
              <SignatureBox
                label=""
                nameValue=""
                onNameChange={() => {}}
                onSignatureChange={(signature) => handleSignatureChange("customer", "signature", signature)}
                initialSignature={formData.signatures.customerSignature}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>Date: </strong>
              <input
                type="date"
                value={formData.signatures.customerDate}
                onChange={(e) => handleSignatureChange("customer", "date", e.target.value)}
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

        <div className="form-actions" style={{ marginTop: "50px" }}>
          {onPrevious && (
            <button type="button" onClick={onPrevious} className="prev-btn">
              Previous Form
            </button>
          )}
          <button type="submit" className="submit-btn">
            Submit Stage 7
          </button>
        </div>
      </form>
    </div>
  )
}

// Main V Connected 63 MVA Transformer Forms Component
const TractionTransformerForms = ({
  firstFormDataFromDB,
  projectName,
  companyName,
  stage,
  onFormSubmit,
  onBack,
  ProjectData,
  setSelectedMainCompany,
  selectedProjectForReview,
}) => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0)
  const [formData, setFormData] = useState({})

  // Define stage forms mapping
  const stageFormsMapping = {
    1: [
      { component: Stage1Form1, name: "Name Plate Details Transformer/Reactor" },
      { component: Stage1Form2, name: "Pre Erection Ratio Test of Turret CTs - Phase 3" },
      { component: Stage1Form3, name: "Tan Delta and Capacitance Test on Bushing" },
      { component: Stage1Form4, name: "SFRA Test Record" },
      { component: Stage1Form5, name: "SFRA Test Record" },
      { component: Stage1Form6, name: "SFRA Test Record" },
      { component: Stage1Form7, name: "SFRA Test Record" },
      ],
    2: [
      { component: Stage2Form1, name: "Record of Oil Handling" },
      { component: Stage2Form2, name: "IR After Erection" },
    ],
    3: [
      { component: Stage3Form1, name: "Vacuum Cycle Recording" },
    ],
    4: [
      { component: Stage4Form1, name: "Record Oil Filtration Main Tank" },
      { component: Stage4Form2, name: "IR Value Before Radiator Filtration" },
      { component: Stage4Form3, name: "Oil Filtration Combine" },
      { component: Stage4Form4, name: "IR & PI Value After Filtration" },
    ],
    5: [
      { component: Stage5Form1, name: "Magnetizing Current Test" },
      { component: Stage5Form2, name: "Polarity Test" },
      { component: ShortCircuitTestV63Form, name: "Short Circuit Test" },
      { component: ShortCircuitWindingResistanceTestForm, name: "Short Circuit and Winding Resistance Test" },
      { component: IRValuesTransformerForm, name: "IR Values of Transformer" },
    ],
    6: [
      { component: PreCommissioningChecklistForm, name: "Pre-Commissioning Checklist" },
      { component: TransformerProtectionAccessoriesForm, name: "Transformer Protection and Accessories" },
      { component: FinalChecklistClearanceForm, name: "Final Checklist and Clearance" },
    ],
    7: [
      { component: WorkCompletionReportForm, name: "Work Completion Report" },
    ],
  }

  const currentStageForms = stageFormsMapping[stage] || []
  const CurrentFormComponent = currentStageForms[currentFormIndex]?.component

  const handleFormSubmit = async (data) => {
    console.log("VConnected63MVA: handleFormSubmit → saving form data", data);

    try {
      // Build FormData for API submission
      const formDataToSend = new FormData();
      formDataToSend.append("projectName", projectName);
      formDataToSend.append("companyName", companyName);
      formDataToSend.append("stage", stage);
      formDataToSend.append("formNumber", currentFormIndex + 1);

      // Process form data
      Object.entries(data).forEach(([key, value]) => {
        if (key === "photos" && typeof value === "object") {
          Object.entries(value).forEach(([photoKey, file]) => {
            if (file instanceof File) {
              formDataToSend.append(`photos[${photoKey}]`, file);
            }
          });
        } else if (typeof value === "object") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value ?? "");
        }
      });

      //Submit to API
      await axios.post(
        `${BACKEND_API_BASE_URL}/api/tractionData/setTable`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update form completion status
      const isLastFormOfStage = currentFormIndex === currentStageForms.length - 1;
      
      if (isLastFormOfStage) {
        await axios.post(
          `${BACKEND_API_BASE_URL}/api/tractioncompany/updateFormsCompleted`,
          {
            projectName,
            companyName,
            formsCompleted: currentFormIndex + 1,
            status: "pending-approval",
            stage,
          }
        );

        // Update local state
        if (setSelectedMainCompany) {
          setSelectedMainCompany((prevCompany) => {
            if (prevCompany.companyName === companyName) {
              return {
                ...prevCompany,
                companyProjects: prevCompany.companyProjects.map((project) => {
                  if (project.name === projectName) {
                    const submittedStagesMap = {};
                    for (let i = 1; i <= 7; i++) {
                      submittedStagesMap[i.toString()] = i <= stage;
                    }
                    return {
                      ...project,
                      submittedStages: submittedStagesMap,
                      status: "pending-approval",
                    };
                  }
                  return project;
                }),
              };
            }
            return prevCompany;
          });
        }
      } else {
        await axios.post(
          `${BACKEND_API_BASE_URL}/api/tractioncompany/updateFormsCompleted`,
          {
            projectName,
            companyName,
            formsCompleted: currentFormIndex + 1,
          }
        );
      }

      // Update local form data
      const updatedFormData = { ...formData, [`form${currentFormIndex + 1}`]: data }
      setFormData(updatedFormData)

      // Navigate to next form or complete stage
      if (currentFormIndex < currentStageForms.length - 1) {
        setCurrentFormIndex(currentFormIndex + 1)
      } else {
        // All forms completed for this stage
        onFormSubmit(stage, updatedFormData, selectedProjectForReview)
      }

    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form. Please try again.");
    }
  }

  const handlePreviousForm = () => {
    if (currentFormIndex > 0) {
      setCurrentFormIndex(currentFormIndex - 1)
    } else {
      onBack()
    }
  }

  if (!CurrentFormComponent) {
    return (
      <div className="form-stage-container">
        <div className="form-header">
          <h2>No forms available for Stage {stage}</h2>
          <button onClick={onBack} className="back-btn">
            ← Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="form-stage-container">
      <div className="form-header">
        <div className="form-progress">
          <h2>
            Stage {stage} - Form {currentFormIndex + 1} of {currentStageForms.length}
          </h2>
          <p>{currentStageForms[currentFormIndex]?.name}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentFormIndex + 1) / currentStageForms.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
         <button onClick={onBack} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <CurrentFormComponent
        onSubmit={handleFormSubmit}
        onPrevious={handlePreviousForm}
        initialData={formData[`form${currentFormIndex + 1}`] || {}}
        isLastFormOfStage={currentFormIndex === currentStageForms.length - 1}
        companyData={ProjectData}
        stage={stage}
        companyName={companyName}
        projectName={projectName}
      />
    </div>
  )
}

// Export all forms for V Connected 63 MVA Transformer department
export const TractionTransformerFormsConfig = {
  // Stage 5 forms
  5: [
    {
      id: 1,
      name: "IR Values of Transformer",
      component: IRValuesTransformerForm,
    },
  ],
  // Stage 6 forms
  6: [
    {
      id: 1,
      name: "Pre-Commissioning Checklist",
      component: PreCommissioningChecklistForm,
    },
    {
      id: 2,
      name: "Transformer Protection and Accessories",
      component: TransformerProtectionAccessoriesForm,
    },
    {
      id: 3,
      name: "Final Checklist and Clearance",
      component: FinalChecklistClearanceForm,
    },
  ],
  // Stage 7 forms
  7: [
    {
      id: 1,
      name: "Work Completion Report",
      component: WorkCompletionReportForm,
    },
  ],
}

export default TractionTransformerForms
