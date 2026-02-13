import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const options = ["Yes", "No", "NA"];

export default function SemesterAuditForm({ semesterType }) {
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
    facultyRemarks: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/semester-audit", {
      ...form,
      semesterType
    });
    alert(`${semesterType} Semester Audit Submitted`);
  };

  return (
    <>
      <Navbar title={`${semesterType} Semester Audit`} />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="academicYear"
              placeholder="Academic Year (e.g. 2024-25)"
              className="input"
              onChange={handleChange}
            />

            {Object.keys(form).map((key) =>
              key !== "academicYear" &&
              key !== "facultyRemarks" ? (
                <div key={key}>
                  <label className="block text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <select
                    name={key}
                    className="input"
                    onChange={handleChange}
                  >
                    {options.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ) : null
            )}

            <textarea
              name="facultyRemarks"
              placeholder="Faculty Remarks"
              className="input h-24"
              onChange={handleChange}
            />

            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Submit Audit
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
