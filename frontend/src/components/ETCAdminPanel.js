"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_API_BASE_URL, additionalLogging } from "./constant";
import FormStage from "./FormStage"; // Import FormStage
import "./stage-review-styles.css";

const ETCAdminPanel = ({
  user,
  selectedCompany,
  onLogout,
  onCompanySelect,
  onProjectSelect,
  onBackToMain,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [Companys, setCompanys] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [submittedForms, setSubmittedForms] = useState([]);

  const [projectName, setProjectName] = useState(null);
  const [companyName, setCompanyName] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedMainCompany, setSelectedMainCompany] = useState(null);

  const [newCompany, setNewCompany] = useState({ name: "", description: "" });
  const [showCreateCompanyForm, setShowCreateCompanyForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedProjectForReview, setSelectedProjectForReview] =
    useState(null);
  const [currentStageReview, setCurrentStageReview] = useState(1);
  const [showSubmitterReview, setShowSubmitterReview] = useState(false);

  // State for showing and managing FormStage
  const [formDataFromDB, setFormDataFromDB] = useState(false);
  const [showFormStage, setShowFormStage] = useState(false);
  const [formStageProject, setFormStageProject] = useState(null);
  const [formStageStage, setFormStageStage] = useState(1);

  // Modal states for replacing alerts and prompts
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info"); // info, success, error, warning

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const [showInputModal, setShowInputModal] = useState(false);
  const [inputModalTitle, setInputModalTitle] = useState("");
  const [inputModalPlaceholder, setInputModalPlaceholder] = useState("");
  const [inputModalValue, setInputModalValue] = useState("");
  const [inputModalAction, setInputModalAction] = useState(null);

  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionStage, setRejectionStage] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const totalStageForm = [5, 2, 3, 4, 2, 1];

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
      description:
        "V Connected 63 MVA transformer department for high voltage systems",
      icon: "🔌",
      color: "#047857",
    },
  ];

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
  ];

  const defaultCompanies = [];
  const mockSubmittedForms = [];

  // Helper functions for modals
  const showNotification = (message, type = "info") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotificationModal(true);
  };

  const showConfirmDialog = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const showInputDialog = (title, placeholder, action) => {
    setInputModalTitle(title);
    setInputModalPlaceholder(placeholder);
    setInputModalValue("");
    setInputModalAction(() => action);
    setShowInputModal(true);
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    setDepartments(defaultDepartments);
    var backendSavedCompanys = [];
    if (additionalLogging) {
      console.log("Frontend : From UseEffect get call to api/company");
    }
    axios
      .get(`${BACKEND_API_BASE_URL}/api/company`, {
        params: {
          companyName: newCompany.name,
          companyDescription: newCompany.description,
        },
      })
      .then((response) => {
        backendSavedCompanys = response.data;

        setCompanys(backendSavedCompanys);
      })
      .catch((error) => {
        console.error("Error creating company on the backend:", error);
        alert("Failed to create company. Please try again.");
      });
  }, []);

  const handleCreateCompany = async () => {
    if (newCompany.name && newCompany.description && selectedDepartment) {
      const CompanyId = Math.max(...Companys.map((p) => p.id), 0) + 1;

      const Company = {
        id: CompanyId,
        companyName: newCompany.name,
        companyDescription: newCompany.description,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        departmentId: selectedDepartment.id,
      };

      try {
        if (additionalLogging) {
          console.log(
            "Frontend : From handleCreateCompany post call to api/company"
          );
        }
        const response = await axios.post(
          `${BACKEND_API_BASE_URL}/api/company`,
          {
            companyName: newCompany.name,
            companyDescription: newCompany.description,
          }
        );
        console.log(
          "company created successfully on the backend:",
          response.data
        );
      } catch (error) {
        console.error("Error creating company on the backend:", error);
        alert("Failed to create company. Please try again.");
        return;
      }

      setCompanys([...Companys, Company]);
      // setNewCompany({ name: "", description: "" })
      setShowCreateCompanyForm(false);
      showNotification(
        `Company "${Company.companyName}" created successfully in ${selectedDepartment.name}!`,
        "success"
      );
    }
  };

  const handleAddProject = (CompanyName) => {
    showInputDialog(
      "Create New Project",
      "Enter Project name...",
      async (ProjectName) => {
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
          };
          try {
            // --- UPDATED POST REQUEST ---
            // We are now sending both the projectName and the CompanyId in the payload.
            if (additionalLogging) {
              console.log(
                "Frontend : From handleAddProject post call to api/company/addCompany"
              );
            }
            const response = await axios.post(
              `${BACKEND_API_BASE_URL}/api/company/addCompany`,
              {
                projectName: ProjectName,
                companyName: CompanyName, // Pass the CompanyId to the backend
                companyProjects: newProject,
              }
            );

            console.log(
              "Project created successfully on the backend:",
              response.data
            );

            selectedMainCompany.companyProjects =
              selectedMainCompany.companyProjects ?? [];
            selectedMainCompany.companyProjects.push(newProject);

            setCompanies((prev) => [...prev, newProject]);
            showNotification(
              `Project "${ProjectName}" added to this Company!`,
              "success"
            );
          } catch (error) {
            console.error("Error creating project on the backend:", error);

            showNotification(
              "Failed to create project. Please try again.",
              "error"
            );
            return;
          }
        }
      }
    );
  };

  // Helper function to get form count for each stage
  const getStageFormCount = (stage) => {
    const stageForms = {
      1: 5, // Stage 1 has 4 forms
      2: 1, // Stage 2 has 1 form
      3: 7, // Stage 3 has 7 forms
      4: 6, // Stage 4 has 6 forms
      5: 1, // Stage 5 has 1 form
      6: 1, // Stage 6 has 1 form
    };
    return stageForms[stage] || 1;
  };

  const handleReviewStage = async (Project, stage) => {
    if (Project.status !== "pending-approval") {
      showNotification(`No forms submitted for Stage ${stage} yet.`, "warning");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_API_BASE_URL}/api/data/getStageTable`,
        {
          projectName: Project.name,
          companyName: Project.companyName,
          stage: Project.stage,
        }
      );
      console.log(
        `Complete data has been provided for ${Project.companyName} and projectName ${Project.name}`,
        response.data
      );
      setFormDataFromDB(response.data.data);
    } catch (error) {
      console.error("Error creating company on the backend:", error);
      alert("Failed to create company. Please try again.");
      return;
    }

    setSelectedProjectForReview(Project);
    setCurrentStageReview(stage);
    setReviewMode(true);
  };

  const handleApproveStage = async (stage) => {
    try {
      if (additionalLogging) {
        console.log(
          "Frontend : From handleApproveStage post call to api/company/approveCompanyStage"
        );
      }
      const response = await axios.post(
        `${BACKEND_API_BASE_URL}/api/company/approveCompanyStage`,
        {
          companyName: selectedProjectForReview.companyName,
          projectName: selectedProjectForReview.name,
          stage: selectedProjectForReview.stage,
        }
      );
      console.log(
        "company created successfully on the backend:",
        response.data
      );
    } catch (error) {
      console.error("Error creating company on the backend:", error);
      alert("Failed to create company. Please try again.");
      return;
    }

    if (!selectedProjectForReview) {
      showNotification("No Project selected for review.", "error");
      return;
    }

    console.log(
      `Approving stage ${stage} for Project ${selectedProjectForReview.name}`
    );

    setSelectedMainCompany((prevCompany) => ({
      ...prevCompany,
      companyProjects: prevCompany.companyProjects.map((project) => {
        if (
          prevCompany.companyName === selectedProjectForReview.companyName &&
          project.name === selectedProjectForReview.name
        ) {
          const currentStage = project.stage;
          return {
            ...project,
            stage: currentStage !== 6 ? currentStage + 1 : currentStage,
            status: currentStage === 6 ? "completed" : "in-progress",
            stageApprovals: {
              ...project.stageApprovals,
              [currentStage]: true,
            },
          };
        }
        return project; // unchanged projects
      }),
    }));

    showNotification(
      `Stage ${stage} approved for ${selectedProjectForReview.name}! ${
        stage === 6
          ? "Project completed all stages."
          : `Stage ${stage + 1} is now available.`
      }`,
      "success"
    );
    setReviewMode(false);
    setSelectedProjectForReview(null);
    setCurrentStageReview(1);
  };

  const handleRejectStage = (stage) => {
    if (!selectedProjectForReview) {
      showNotification("No Project selected for review.", "error");
      return;
    }

    setRejectionStage(stage);
    setRejectionReason("");
    setShowRejectionModal(true);
  };

  const confirmRejectStage = () => {
    if (!rejectionReason.trim()) {
      showNotification(
        "Please provide a reason for rejecting this stage.",
        "warning"
      );
      return;
    }

    console.log(
      `Rejecting stage ${rejectionStage} for Project ${selectedProjectForReview.name}`
    );

    // Update submitted forms status
    setSubmittedForms((forms) =>
      forms.map((form) =>
        form.ProjectId === selectedProjectForReview.id &&
        form.stage === rejectionStage
          ? {
              ...form,
              status: "rejected",
              rejectionReason,
              reviewedAt: new Date().toISOString().split("T")[0],
            }
          : form
      )
    );

    // Reset Project stage submission status
    setCompanies((companies) =>
      companies.map((Project) =>
        Project.id === selectedProjectForReview.id
          ? {
              ...Project,
              status: "in-progress",
              submittedStages: {
                ...Project.submittedStages,
                [rejectionStage]: false,
              },
              stageApprovals: {
                ...Project.stageApprovals,
                [rejectionStage]: false,
              },
              formsCompleted: 0, // Reset forms completed for this stage
              totalForms: getStageFormCount(rejectionStage), // Reset total forms for current stage
              lastActivity: new Date().toISOString().split("T")[0],
            }
          : Project
      )
    );

    showNotification(
      `Stage ${rejectionStage} rejected for ${selectedProjectForReview.name}. Project needs to resubmit forms.`,
      "warning"
    );
    setShowRejectionModal(false);
    setRejectionStage(null);
    setRejectionReason("");
    setReviewMode(false);
    setSelectedProjectForReview(null);
    setCurrentStageReview(1);
  };

  const handleViewSubmittedForms = async (Project) => {
    console.log("Fronend : handleViewSubmittedForm ");
    try {
      if (additionalLogging) {
        console.log(
          "Frontend : From handleCreateCompany post call to api/company"
        );
      }
      const response = await axios.post(
        `${BACKEND_API_BASE_URL}/api/data/getCompleteTable`,
        {
          projectName: Project.name,
          companyName: Project.companyName,
        }
      );
      console.log(
        `Complete data has been provided for ${Project.companyName} and projectName ${Project.name}`,
        response.data
      );
      setFormDataFromDB(response.data.data.autoTransformerData);
    } catch (error) {
      console.error("Error creating company on the backend:", error);

      if (error.response?.status === 404) {
        // ✅ Custom message for 404
        alert("Please fill the forms first");
      } else {
        alert(
          `Failed to load submitted forms: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      return;
    }
    setSelectedProjectForReview(Project);
    setShowSubmitterReview(true);
  };

  const handleBackFromReview = () => {
    setReviewMode(false);
    setShowSubmitterReview(false);
    setSelectedProjectForReview(null);
    setCurrentStageReview(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-progress";
      case "pending-approval":
        return "status-pending";
      default:
        return "status-default";
    }
  };

  const getStageStatus = (project, stageNumber) => {
    if (project.stageApprovals?.[stageNumber]) {
      return "approved";
    }
    if (project.submittedStages?.[stageNumber]) {
      return "pending-review";
    }
    if (project.stage === stageNumber) {
      return "available";
    }
    return "locked";
  };

  const getDepartmentCompanys = (departmentId) => {
    return Companys.filter((Company) => Company.departmentId === departmentId);
  };

  const getCompanyCompanies = (CompanyId) => {
    return companies.filter((Project) => Project.CompanyId === CompanyId);
  };

  const currentStageForms = reviewMode
    ? submittedForms.filter(
        (form) =>
          form.ProjectId === selectedProjectForReview.id &&
          form.stage === currentStageReview
      )
    : [];

  const allProjectForms = showSubmitterReview
    ? submittedForms.filter(
        (form) => form.ProjectId === selectedProjectForReview.id
      )
    : [];

  const handleLogoutAndClearData = () => {
    localStorage.removeItem("etc_Companys");
    localStorage.removeItem("etc_companies");
    localStorage.removeItem("etc_submitted_forms");

    setCompanys([]);
    setCompanies([]);
    setSubmittedForms([]);
    setSelectedDepartment(null);
    setSelectedMainCompany(null);
    setSelectedProjectForReview(null);
    setReviewMode(false);
    setShowSubmitterReview(false);
    setShowFormStage(false);

    onLogout();
  };

  // Function to handle form submission from FormStage
  const handleFormStageSubmit = (
    stage,
    submittedData,
    selectedProjectForReview
  ) => {
    console.log(
      `Submittingsds forms for stage ${stage}:`,
      submittedData,
      selectedProjectForReview
    );

    const newFormEntry = {
      id: Math.max(...submittedForms.map((f) => f.id), 0) + 1,
      ProjectId: formStageProject.id,
      stage: stage,
      formName: `Stage ${stage} Forms`,
      submittedAt: new Date().toISOString().split("T")[0],
      status: "pending-review",
      data: submittedData,
    };

    console.log(`Submitting forms for stagew ${stage}:`, newFormEntry);

    setSubmittedForms((prev) => [...prev, newFormEntry]);

    // Update Project to show forms submitted and pending approval

    showNotification(
      `Forms for Stage ${stage} submitted successfully! Waiting for ETC Admin approval.`,
      "success"
    );
    setShowFormStage(false);
    setFormStageProject(null);
    setFormStageStage(1);
  };

  // Function to go back from FormStage
  const handleBackFromFormStage = () => {
    setShowFormStage(false);
    setFormStageProject(null);
    setFormStageStage(1);
  };

  const capitalizeFirst = (s) =>
    typeof s === "string" && s.length
      ? s.charAt(0).toUpperCase() + s.slice(1)
      : s;

  const isObjectOfObjects = (obj) =>
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.values(obj).every(
      (v) => v && typeof v === "object" && !Array.isArray(v)
    );

  const renderPrimitiveCell = (val, labelForImg = "") => {
    if (typeof val === "string" && val.startsWith("data:image/")) {
      return (
        <img
          src={val}
          alt={labelForImg || "image"}
          style={{ maxWidth: "100px", border: "1px solid #ccc" }}
        />
      );
    }
    if (Array.isArray(val)) {
      return JSON.stringify(val);
    }
    return String(val);
  };

  const handleStageSubmit = async (Project) => {
    const nextStage = Project.stage;
    const canSubmit = nextStage === 1 || Project.stageApprovals[nextStage - 1];
    setProjectName(Project.name);
    setCompanyName(Project.companyName);

    if (canSubmit && !Project.submittedStages[nextStage]) {
      setFormStageProject(Project);
      setFormStageStage(nextStage);
      setShowFormStage(true);
    } else if (Project.submittedStages[nextStage]) {
      showNotification(
        `Stage ${nextStage} forms already submitted!`,
        "warning"
      );
    } else {
      showNotification(
        `Stage ${nextStage - 1} must be approved first!`,
        "warning"
      );
    }
  };

  const handleProjectDelete = async (Project) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete project "${Project.name}" from company "${Project.companyName}"?`
    );

    if (!confirmDelete) {
      // User clicked "Cancel"
      return;
    }

    try {
      if (additionalLogging) {
        console.log(
          "Frontend : From handleDeleteProject delete call to api/company/deleteProject"
        );
      }

      // ✅ Axios DELETE requires "data" wrapper for body
      const response = await axios.delete(
        `${BACKEND_API_BASE_URL}/api/company/deleteProject`,
        {
          data: {
            projectName: Project.name,
            companyName: Project.companyName,
          },
        }
      );

      console.log("Project deleted successfully from backend:", response.data);

      selectedMainCompany.companyProjects = (
        selectedMainCompany.companyProjects ?? []
      ).filter(
        (proj) =>
          !(
            proj.companyName === Project.companyName &&
            proj.name === Project.name
          )
      );

      // ✅ Update frontend state by filtering out the deleted project
      setCompanies((prev) =>
        prev.map((company) =>
          company.companyName === Project.companyName
            ? {
                ...company,
                companyProjects: (company.companyProjects ?? []).filter(
                  (proj) =>
                    !(
                      proj.companyName === Project.companyName &&
                      proj.name === Project.name
                    )
                ),
              }
            : company
        )
      );

      showNotification(
        `Project "${Project.name}" deleted successfully!`,
        "success"
      );
    } catch (error) {
      console.error("Error deleting project on the backend:", error);
      showNotification("Failed to delete project. Please try again.", "error");
    }
  };

  const handleCompanyDelete = async (company) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete company "${company.companyName}" and all its projects?`
    );

    if (!confirmDelete) return;

    try {
      if (additionalLogging) {
        console.log(
          "Frontend : From handleDeleteProject delete call to api/company/deleteProject"
        );
      }

      // ✅ Axios DELETE requires "data" wrapper for body
      const response = await axios.delete(
        `${BACKEND_API_BASE_URL}/api/company/deleteCompany`,
        {
          data: { companyName: company.companyName },
        }
      );

      console.log("Company deleted successfully from backend:", response.data);

      // ✅ Update frontend state → remove the company
      setCompanys((prev) =>
        prev.filter((c) => c.companyName !== company.companyName)
      );

      showNotification(
        `Company "${company.companyName}" deleted successfully!`,
        "success"
      );
    } catch (error) {
      console.error("Error deleting company on the backend:", error);
      showNotification("Failed to delete company. Please try again.", "error");
    }
  };

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
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
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
            <div
              className="mobile-menu-overlay"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-menu-header">
                  <img
                    src="/logo.png"
                    alt="Vishvas Power"
                    className="logo-small"
                  />
                  <button
                    className="mobile-menu-close"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="mobile-menu-content">
                  <div className="mobile-user-info">
                    <span className="user-badge">ETC Admin</span>
                  </div>
                  <button
                    onClick={handleLogoutAndClearData}
                    className="mobile-logout-btn"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="etc-main">
        {showFormStage && formStageProject ? (
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

                  <div className="form-data-preview">
                    {Object.entries(formData).map(
                      ([fieldKey, fieldValue], idx) => (
                        <div className="data-item" key={fieldKey || idx}>
                          <span className="data-label">
                            {capitalizeFirst(fieldKey)}:
                          </span>

                          {/* 🔹 Special handling for "photos" object */}
                          {fieldKey.toLowerCase() === "photos" &&
                          fieldValue &&
                          typeof fieldValue === "object" ? (
                            <div className="photo-list mt-2 space-y-3">
                              {Object.entries(fieldValue).map(
                                ([photoKey, url]) => {
                                  const fullUrl = url.startsWith("http")
                                    ? url
                                    : `${BACKEND_API_BASE_URL}/${url}`;
                                  return (
                                    <div
                                      key={photoKey}
                                      className="photo-preview"
                                    >
                                      <p className="text-sm font-medium">
                                        {photoKey}
                                      </p>
                                      <a
                                        href={fullUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline break-all"
                                      ></a>
                                      <img
                                        src={fullUrl}
                                        alt={photoKey}
                                        className="mt-1 w-40 h-24 object-cover rounded border"
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : typeof fieldValue === "string" &&
                            fieldValue.startsWith("data:image/") ? (
                            /* Base64 inline image */
                            <img
                              src={fieldValue}
                              alt={fieldKey}
                              style={{
                                maxWidth: "120px",
                                border: "1px solid #ccc",
                              }}
                            />
                          ) : Array.isArray(fieldValue) ? (
                            /* Arrays */
                            fieldValue.length === 0 ? (
                              <span className="data-value">[]</span>
                            ) : typeof fieldValue[0] === "object" &&
                              fieldValue[0] !== null ? (
                              <div>
                                {fieldValue.map((row, i) => (
                                  <div key={i}>
                                    <h5>
                                      {capitalizeFirst(fieldKey)} {i + 1}
                                    </h5>
                                    <table>
                                      <tbody>
                                        {Object.entries(row).map(([k, v]) => (
                                          <tr key={k}>
                                            <td>{capitalizeFirst(k)}</td>
                                            <td>{renderPrimitiveCell(v, k)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <ul>
                                {fieldValue.map((item, i) => (
                                  <li key={i}>
                                    {typeof item === "object"
                                      ? JSON.stringify(item, null, 2)
                                      : String(item)}
                                  </li>
                                ))}
                              </ul>
                            )
                          ) : typeof fieldValue === "object" &&
                            fieldValue !== null ? (
                            /* Objects */
                            isObjectOfObjects(fieldValue) ? (
                              <div>
                                {Object.entries(fieldValue).map(
                                  ([subKey, subVal]) => (
                                    <div key={subKey}>
                                      <h5>
                                        {capitalizeFirst(fieldKey)} {subKey}
                                      </h5>
                                      <table>
                                        <tbody>
                                          {Object.entries(subVal).map(
                                            ([k, v]) => (
                                              <tr key={k}>
                                                <td>{capitalizeFirst(k)}</td>
                                                <td>
                                                  {renderPrimitiveCell(v, k)}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <table>
                                <tbody>
                                  {Object.entries(fieldValue).map(([k, v]) => (
                                    <tr key={k}>
                                      <td>{capitalizeFirst(k)}</td>
                                      <td>{renderPrimitiveCell(v, k)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )
                          ) : (
                            <span className="data-value">
                              {String(fieldValue)}
                            </span>
                          )}
                        </div>
                      )
                    )}
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
                <p>
                  Review all forms submitted by {selectedProjectForReview?.name}
                </p>
              </div>
              <button onClick={handleBackFromReview} className="back-btn">
                ← Back to Companies
              </button>
            </div>

            <div className="submitter-review-summary">
              <div className="review-stats">
                <div className="stat-card">
                  <h4>Total Forms</h4>
                  <div className="stat-number">{allProjectForms.length}</div>
                </div>
                <div className="stat-card">
                  <h4>Approved</h4>
                  <div className="stat-number">
                    {
                      allProjectForms.filter((f) => f.status === "approved")
                        .length
                    }
                  </div>
                </div>
                <div className="stat-card">
                  <h4>Pending</h4>
                  <div className="stat-number">
                    {
                      allProjectForms.filter(
                        (f) => f.status === "pending-review"
                      ).length
                    }
                  </div>
                </div>
                <div className="stat-card">
                  <h4>Rejected</h4>
                  <div className="stat-number">
                    {
                      allProjectForms.filter((f) => f.status === "rejected")
                        .length
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="stages-review-container">
              {Object.entries(formDataFromDB).map(([stageKey, forms]) => (
                <div key={stageKey} className="stage-forms-section">
                  <h3>{stageKey.replace("stage", "Stage ")} Forms</h3>

                  <div className="forms-review-grid">
                    {Object.entries(forms).map(([formKey, formData]) => (
                      <div
                        key={`${stageKey}-${formKey}`}
                        className={`form-review-card ${selectedProjectForReview?.status}`}
                      >
                        <h4>{formKey.replace("form", "Form ")}</h4>

                        <div className="form-data-preview">
                          {Object.entries(formData).map(
                            ([fieldKey, fieldValue]) => {
                              // 🔹 Special case for photos
                              if (
                                fieldKey === "photos" &&
                                fieldValue &&
                                typeof fieldValue === "object"
                              ) {
                                return (
                                  <div
                                    key={`${stageKey}-${formKey}-photos`}
                                    className="data-item-wrapper"
                                  >
                                    <h5 className="data-label">
                                      {fieldKey.charAt(0).toUpperCase() +
                                        fieldKey.slice(1)}
                                    </h5>
                                    <div className="photo-list mt-2 space-y-3">
                                      {Object.entries(fieldValue).map(
                                        ([photoKey, url]) => {
                                          const fullUrl = url.startsWith("http")
                                            ? url
                                            : `${BACKEND_API_BASE_URL}/${url}`;
                                          return (
                                            <div
                                              key={photoKey}
                                              className="photo-preview"
                                            >
                                              <p className="text-sm font-medium">
                                                {photoKey}
                                              </p>
                                              <a
                                                href={fullUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline break-all"
                                              ></a>
                                              {/* Optional thumbnail preview */}
                                              <img
                                                src={fullUrl}
                                                alt={photoKey}
                                                className="mt-1 w-40 h-24 object-cover rounded border"
                                              />
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                );
                              }

                              // 🔹 Strings & numbers
                              if (
                                typeof fieldValue === "string" ||
                                typeof fieldValue === "number"
                              ) {
                                return (
                                  <div
                                    key={`${stageKey}-${formKey}-${fieldKey}`}
                                    className="data-item"
                                  >
                                    <span className="data-label">
                                      {fieldKey.charAt(0).toUpperCase() +
                                        fieldKey.slice(1)}
                                      :
                                    </span>
                                    <span className="data-value">
                                      {String(fieldValue)}
                                    </span>
                                  </div>
                                );
                              }

                              // 🔹 Arrays
                              if (Array.isArray(fieldValue)) {
                                return (
                                  <div
                                    key={`${stageKey}-${formKey}-${fieldKey}`}
                                    className="data-item-wrapper"
                                  >
                                    <h5>
                                      {fieldKey.charAt(0).toUpperCase() +
                                        fieldKey.slice(1)}
                                    </h5>
                                    {fieldValue.length > 0 &&
                                      typeof fieldValue[0] === "object" &&
                                      fieldValue.map((row, idx) => (
                                        <div key={idx}>
                                          <h4>
                                            {fieldKey.charAt(0).toUpperCase() +
                                              fieldKey.slice(1)}{" "}
                                            {idx + 1}
                                          </h4>
                                          <table>
                                            <tbody>
                                              {Object.entries(row).map(
                                                ([k, v]) => (
                                                  <tr key={k}>
                                                    <td>
                                                      {k
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        k.slice(1)}
                                                    </td>
                                                    <td>{String(v)}</td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      ))}
                                    {fieldValue.length > 0 &&
                                      typeof fieldValue[0] !== "object" && (
                                        <div className="data-item">
                                          <span className="data-label">
                                            {fieldKey.charAt(0).toUpperCase() +
                                              fieldKey.slice(1)}
                                            :
                                          </span>
                                          <span className="data-value">
                                            {JSON.stringify(fieldValue)}
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                );
                              }

                              // 🔹 Nested objects (non-photos)
                              if (
                                typeof fieldValue === "object" &&
                                fieldValue !== null
                              ) {
                                return (
                                  <div
                                    key={`${stageKey}-${formKey}-${fieldKey}`}
                                    className="data-item-wrapper"
                                  >
                                    <h5>
                                      {fieldKey.charAt(0).toUpperCase() +
                                        fieldKey.slice(1)}
                                    </h5>
                                    {Object.entries(fieldValue).map(
                                      ([subKey, subVal]) => (
                                        <div key={subKey}>
                                          <h4>
                                            {fieldKey.charAt(0).toUpperCase() +
                                              fieldKey.slice(1)}{" "}
                                            {subKey}
                                          </h4>
                                          <table>
                                            <tbody>
                                              {Object.entries(subVal).map(
                                                ([k, v]) => (
                                                  <tr key={k}>
                                                    <td>
                                                      {k
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        k.slice(1)}
                                                    </td>
                                                    <td>{String(v)}</td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      )
                                    )}
                                  </div>
                                );
                              }

                              // 🔹 Fallback
                              return (
                                <div
                                  key={`${stageKey}-${formKey}-${fieldKey}`}
                                  className="data-item"
                                >
                                  <span className="data-label">
                                    {fieldKey.charAt(0).toUpperCase() +
                                      fieldKey.slice(1)}
                                    :
                                  </span>
                                  <span className="data-value">
                                    {String(fieldValue)}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                const departmentCompanys = getDepartmentCompanys(department.id);
                return (
                  <div
                    key={department.id}
                    className="department-card"
                    onClick={() => setSelectedDepartment(department)}
                  >
                    <div className="department-header">
                      <div
                        className="department-icon"
                        style={{ backgroundColor: department.color }}
                      >
                        {department.icon}
                      </div>
                      <span className="status-badge status-progress">
                        Active
                      </span>
                    </div>
                    <h3>{department.name}</h3>
                    <p>{department.description}</p>
                    <div className="department-footer">
                      <span>📁 {departmentCompanys.length} Companys</span>
                      <span>
                        🏢{" "}
                        {departmentCompanys.reduce((acc, proj) => {
                          return acc + getCompanyCompanies(proj.id).length;
                        }, 0)}{" "}
                        companies
                      </span>
                    </div>
                  </div>
                );
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
                <button
                  onClick={() => setShowCreateCompanyForm(true)}
                  className="create-btn"
                >
                  ➕ Create Company
                </button>
                <button
                  onClick={() => setSelectedDepartment(null)}
                  className="back-btn"
                >
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
              <div
                className="modal-overlay"
                onClick={() => setShowCreateCompanyForm(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <img
                      src="/logo.png"
                      alt="Vishvas Power"
                      className="logo-small"
                    />
                    <h3>Create New Company in {selectedDepartment.name}</h3>
                  </div>
                  <p>Companies will be added to this Company after creation</p>
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter Company name"
                      value={newCompany.companyName}
                      onChange={(e) =>
                        setNewCompany({ ...newCompany, name: e.target.value })
                      }
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
                    <button
                      onClick={() => setShowCreateCompanyForm(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="Companys-grid">
              {Companys.map((Company) => {
                const CompanyCompanies = getCompanyCompanies(Company.id);

                return (
                  <div key={Company._id} className="Company-card">
                    <div className="Company-header">
                      <div
                        className="Company-icon"
                        style={{ backgroundColor: selectedDepartment.color }}
                      >
                        📁
                      </div>
                      <span
                        className={`status-badge ${getStatusColor(
                          Company.status
                        )}`}
                      >
                        {Company.status}
                      </span>
                    </div>
                    <h3>{Company.companyName}</h3>
                    <p>{Company.companyDescription}</p>
                    <div className="Company-footer">
                      <span>🏢 {CompanyCompanies.length} companies</span>
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
                          e.stopPropagation();
                          handleCompanyDelete(Company);
                        }}
                        className="delete-btn"
                        style={{
                          background:
                            "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", // red gradient
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
                          e.stopPropagation();
                          setSelectedMainCompany(Company);
                        }}
                        className="view-btn"
                        style={{
                          background:
                            "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
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
                );
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
                <button
                  onClick={() =>
                    handleAddProject(selectedMainCompany.companyName)
                  }
                  className="create-btn"
                >
                  ➕ Create Project
                </button>
                <button
                  onClick={() => setSelectedMainCompany(null)}
                  className="back-btn"
                >
                  ← Back to Companys
                </button>
              </div>
            </div>

            <div className="companies-grid">
              {selectedMainCompany.companyProjects === undefined ||
              selectedMainCompany.companyProjects.length === 0 ? (
                <p className="no-data-message">
                  No companies found for this Company. Click "Create Company" to
                  create one.
                </p>
              ) : (
                selectedMainCompany.companyProjects.map((Project, index) => (
                  <div key={index} className="Project-card">
                    <div className="Project-header">
                      <div
                        className="Project-icon"
                        style={{ backgroundColor: "#1E3A8A" }}
                      >
                        🏢
                      </div>
                      <span
                        className={`status-badge ${getStatusColor(
                          Project.status
                        )}`}
                      >
                        {Project.status === "pending-approval" && "⏳"}
                        {Project.status === "in-progress" && "🔄"}
                        {Project.status === "completed" && "✅"}
                        {Project.status}
                      </span>
                    </div>
                    <h3>{Project.name}</h3>
                    <p>
                      Stage {Project.stage} • {Project.formsCompleted}/
                      {totalStageForm[Project.stage - 1]} forms completed
                    </p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${
                            (Project.formsCompleted /
                              totalStageForm[Project.stage - 1]) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="Project-footer">
                      <span>
                        📊{" "}
                        {Math.round(
                          (Project.formsCompleted / Project.totalForms) * 100
                        )}
                        % complete
                      </span>
                      <span>📅 {Project.lastActivity}</span>
                    </div>

                    <div className="stage-management">
                      <h4>Stage Management:</h4>
                      <div className="stages-row">
                        {[1, 2, 3, 4, 5, 6].map((stage) => {
                          const stageStatus = getStageStatus(Project, stage);
                          return (
                            <div
                              key={stage}
                              className={`stage-item ${stageStatus}`}
                            >
                              <div className="stage-number">{stage}</div>
                              <div className="stage-status-text">
                                {stageStatus === "approved" && "✅ Approved"}
                                {stageStatus === "pending-review" &&
                                  "⏳ Pending"}
                                {stageStatus === "available" && "📝 Available"}
                                {stageStatus === "locked" && "🔒 Locked"}
                              </div>
                              {stageStatus === "pending-review" && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReviewStage(Project, stage);
                                  }}
                                  className="review-stage-btn"
                                >
                                  Review
                                </button>
                              )}
                            </div>
                          );
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
                          e.stopPropagation();
                          handleViewSubmittedForms(Project);
                        }}
                        className="view-forms-btn"
                        style={{
                          background:
                            "linear-gradient(135deg, #10b981 0%, #059669 100%)",
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
                          e.stopPropagation();
                          handleStageSubmit(Project);
                        }}
                        className="submit-test-btn"
                        style={{
                          background:
                            "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
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
                          e.stopPropagation();
                          handleProjectDelete(Project);
                        }}
                        className="delete-btn"
                        style={{
                          background:
                            "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", // red gradient
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
        <div
          className="modal-overlay"
          onClick={() => setShowNotificationModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {notificationType === "success" && (
                  <span style={{ fontSize: "1.5rem" }}>✅</span>
                )}
                {notificationType === "error" && (
                  <span style={{ fontSize: "1.5rem" }}>❌</span>
                )}
                {notificationType === "warning" && (
                  <span style={{ fontSize: "1.5rem" }}>⚠️</span>
                )}
                {notificationType === "info" && (
                  <span style={{ fontSize: "1.5rem" }}>ℹ️</span>
                )}
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
              <button
                onClick={() => setShowNotificationModal(false)}
                className="submit-btn"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowConfirmModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
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
                  if (confirmAction) confirmAction();
                  setShowConfirmModal(false);
                  setConfirmAction(null);
                }}
                className="submit-btn"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmAction(null);
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
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
                    if (inputModalAction)
                      inputModalAction(inputModalValue.trim());
                    setShowInputModal(false);
                    setInputModalAction(null);
                    setInputModalValue("");
                  }
                }}
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => {
                  if (inputModalValue.trim() && inputModalAction) {
                    inputModalAction(inputModalValue.trim());
                  }
                  setShowInputModal(false);
                  setInputModalAction(null);
                  setInputModalValue("");
                }}
                className="submit-btn"
                disabled={!inputModalValue.trim()}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowInputModal(false);
                  setInputModalAction(null);
                  setInputModalValue("");
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
        <div
          className="modal-overlay"
          onClick={() => setShowRejectionModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "1.5rem" }}>❌</span>
                <h3>Reject Stage {rejectionStage}</h3>
              </div>
            </div>
            <p
              style={{ fontSize: "1rem", color: "#666", marginBottom: "20px" }}
            >
              Please provide a detailed reason for rejecting this stage. This
              will help the submitter understand what needs to be corrected.
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
                  background: rejectionReason.trim()
                    ? "linear-gradient(135deg, #f44336, #d32f2f)"
                    : "#ccc",
                  cursor: rejectionReason.trim() ? "pointer" : "not-allowed",
                }}
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionStage(null);
                  setRejectionReason("");
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
  );
};

export default ETCAdminPanel;
