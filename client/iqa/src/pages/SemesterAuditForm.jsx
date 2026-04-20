import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const options = ["Yes", "No", "NA"];

const fieldLabels = {
  coursePlan: "Course Plan",
  academicCalendar: "Academic Calendar",
  studentList: "Student List",
  timetable: "Timetable",
  lessonPlan: "Lesson Plan",
  lectureNotes: "Lecture Notes",
  questionBank: "Question Bank",
  attendance: "Attendance",
  internalAssessment: "Internal Assessment",
  courseOutcomesDefined: "Course Outcomes Defined",
  coPoMapping: "CO-PO Mapping",
  resultAnalysis: "Result Analysis",
  gapAnalysis: "Gap Analysis",
};

const uploadableFields = [
  "lessonPlan",
  "lectureNotes",
  "questionBank",
  "attendance",
  "internalAssessment",
  "resultAnalysis",
];

const fieldGroups = [
  {
    heading: "Planning & Structure",
    keys: ["coursePlan", "academicCalendar", "studentList", "timetable"],
  },
  {
    heading: "Teaching Materials",
    keys: ["lessonPlan", "lectureNotes", "questionBank"],
  },
  {
    heading: "Assessment & Evaluation",
    keys: ["attendance", "internalAssessment", "resultAnalysis"],
  },
  {
    heading: "Outcomes & Analysis",
    keys: ["courseOutcomesDefined", "coPoMapping", "gapAnalysis"],
  },
];

const formatDocumentType = (key) => fieldLabels[key] || key;

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  fontSize: "14px",
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  background: "#ffffff",
  color: "#111827",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",
  cursor: "pointer",
};

export default function SemesterAuditForm() {
  const [semester, setSemester] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploading, setUploading] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    academicYear: "",
    coursePlan: "NA",
    academicCalendar: "NA",
    studentList: "NA",
    timetable: "NA",
    lessonPlan: "NA",
    lectureNotes: "NA",
    questionBank: "NA",
    attendance: "NA",
    internalAssessment: "NA",
    courseOutcomesDefined: "NA",
    coPoMapping: "NA",
    resultAnalysis: "NA",
    gapAnalysis: "NA",
    facultyRemarks: "",
  });

  const facultyId = localStorage.getItem("userId");
  const department = localStorage.getItem("department");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const documentType = formatDocumentType(key);
    setUploading((prev) => ({ ...prev, [key]: true }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("facultyId", facultyId);
    formData.append("department", department);
    formData.append("documentType", documentType);

    try {
      await API.post("/faculty/new-upload-document", formData);
      setUploadedFiles((prev) => ({ ...prev, [key]: file.name }));
    } catch (err) {
      console.error(err);
      alert("Upload failed for " + documentType);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!semester) {
      alert("Select semester");
      return;
    }

    setSubmitting(true);

    await API.post("/semester-audit", {
      ...form,
      semester,
      facultyId,
    });

    alert(`${semester} Audit Submitted Successfully`);

    // ✅ CORRECT PLACE (inside success)
    window.location.href = "/faculty";

  } catch (err) {
    console.error(err);
    alert("Submission failed");
  } finally {
    setSubmitting(false);
  }
};
  const getSelectColor = (val) => {
    if (val === "Yes") return { borderColor: "#059669", background: "#ECFDF5" };
    if (val === "No") return { borderColor: "#DC2626", background: "#FEF2F2" };
    return {};
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Navbar title="Semester Audit" />

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Page header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: "0 0 6px" }}>Semester Audit Form</h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>Fill in all section details and upload required documents</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── Top info card ── */}
          <div style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "1.5rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Basic Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "500", color: "#6B7280", display: "block", marginBottom: "6px" }}>Semester</label>
                <select
                  style={selectStyle}
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  onFocus={e => e.target.style.borderColor = "#6366F1"}
                  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                >
                  <option value="">Select semester</option>
                  {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "500", color: "#6B7280", display: "block", marginBottom: "6px" }}>Academic Year</label>
                <input
                  name="academicYear"
                  placeholder="e.g. 2024-25"
                  style={inputStyle}
                  onChange={handleChange}
                  onFocus={e => e.target.style.borderColor = "#6366F1"}
                  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>
            </div>
          </div>

          {/* ── Field groups ── */}
          {fieldGroups.map((group) => (
            <div
              key={group.heading}
              style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "1.5rem", marginBottom: "1.25rem" }}
            >
              <h2 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {group.heading}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {group.keys.map((key) => (
                  <div key={key}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "12px", alignItems: "center" }}>
                      <label style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
                        {fieldLabels[key]}
                        {uploadableFields.includes(key) && (
                          <span style={{ fontSize: "11px", color: "#6366F1", fontWeight: "500", marginLeft: "8px", background: "#EEF2FF", padding: "2px 7px", borderRadius: "99px" }}>Upload</span>
                        )}
                      </label>
                      <select
                        name={key}
                        style={{ ...selectStyle, ...getSelectColor(form[key]) }}
                        onChange={handleChange}
                        onFocus={e => e.target.style.borderColor = "#6366F1"}
                        onBlur={e => { const c = getSelectColor(form[key]); e.target.style.borderColor = c.borderColor || "#E5E7EB"; }}
                      >
                        {options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    {/* File upload row */}
                    {uploadableFields.includes(key) && (
                      <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "10px", paddingLeft: "0" }}>
                        <label
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: uploading[key] ? "#9CA3AF" : "#4F46E5",
                            border: "1px dashed #C7D2FE",
                            borderRadius: "8px",
                            padding: "6px 14px",
                            cursor: uploading[key] ? "not-allowed" : "pointer",
                            background: "#F5F3FF",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {uploading[key] ? "Uploading..." : "Choose file"}
                          <input
                            type="file"
                            style={{ display: "none" }}
                            disabled={uploading[key]}
                            onChange={(e) => handleFileUpload(e, key)}
                          />
                        </label>
                        {uploadedFiles[key] ? (
                          <span style={{ fontSize: "12px", color: "#059669", display: "flex", alignItems: "center", gap: "4px" }}>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill="#ECFDF5"/><path d="M3.5 6.5l2 2 4-4" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            {uploadedFiles[key]}
                          </span>
                        ) : (
                          <span style={{ fontSize: "12px", color: "#9CA3AF" }}>No file chosen</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ── Remarks ── */}
          <div style={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Faculty Remarks
            </h2>
            <textarea
              name="facultyRemarks"
              placeholder="Add any remarks or observations for this semester..."
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#6366F1"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>

          {/* ── Submit ── */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? "#A5B4FC" : "#4F46E5",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                padding: "10px 28px",
                borderRadius: "10px",
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                transition: "background 0.15s",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => { if (!submitting) e.target.style.background = "#4338CA"; }}
              onMouseLeave={e => { if (!submitting) e.target.style.background = "#4F46E5"; }}
            >
              {submitting ? "Submitting..." : "Submit Audit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}