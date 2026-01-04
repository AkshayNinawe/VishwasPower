import React from 'react';
import { BACKEND_API_BASE_URL, BACKEND_IMG_API_BASE_URL } from './constant';

// Import the existing components from AutoTransformerStageReviewPanel
import {
  Stage1Form1,
  Stage1Form2,
  Stage1Form3,
  Stage1Form4,
  Stage1Form5,
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
} from './AutoTransformerStageReviewPanel';

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
          <h2>Traction Transformer - Stage {currentStageReview} Forms Review</h2>
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

export default TractionTransformerStageReviewPanel;
