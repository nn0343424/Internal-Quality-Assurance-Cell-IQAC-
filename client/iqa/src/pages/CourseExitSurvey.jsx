import { useEffect, useState } from "react";
import API from "../services/api";

export default function CourseExitSurvey() {
  const [facultyList, setFacultyList] = useState([]);
  const [form, setForm] = useState({
    facultyId: "",
    courseName: "",
    clarity: "",
    syllabusCoverage: "",
    usefulness: "",
    overallSatisfaction: ""
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  // ✅ FIXED FUNCTION
  const fetchFaculty = async () => {
    try {
      const res = await API.get("/public/faculty"); // ✔ only once
      setFacultyList(res.data);
    } catch (err) {
      console.error("Faculty fetch error:", err);
      alert("Failed to load faculty");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.facultyId) {
    alert("Please select faculty");
    return;
  }

  try {
    await API.post("/students/course-exit", form); // ✅ FIXED
    alert("Thank you for your feedback");

    setForm({
      facultyId: "",
      courseName: "",
      clarity: "",
      syllabusCoverage: "",
      usefulness: "",
      overallSatisfaction: ""
    });
  } catch (err) {
    console.error("Submit error:", err);
    alert("Submission failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-3"
      >
        <h2 className="text-lg font-semibold text-center">
          Course Exit Survey
        </h2>

        {/* FACULTY SELECT */}
        <select
          name="facultyId"
          className="input"
          value={form.facultyId}
          onChange={handleChange}
          required
        >
          <option value="">Select Faculty</option>
          {facultyList.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name} ({f.department})
            </option>
          ))}
        </select>

        <input
          name="courseName"
          placeholder="Course Name"
          className="input"
          value={form.courseName}
          onChange={handleChange}
          required
        />

        <select
  name="clarity"
  className="input"
  value={form.clarity}
  onChange={handleChange}
  required
>
          <option value="">Content Clarity</option>
          <option value="1">1 - Very Poor</option>
          <option value="2">2 - Poor</option>
          <option value="3">3 - Average</option>
          <option value="4">4 - Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        <select name="syllabusCoverage" className="input" value={form.syllabusCoverage} onChange={handleChange} required>
          <option value="">Syllabus Coverage</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <select name="usefulness" className="input" value={form.usefulness} onChange={handleChange} required>
          <option value="">Usefulness of Course</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <select name="overallSatisfaction" className="input" value={form.overallSatisfaction} onChange={handleChange} required>
          <option value="">Overall Satisfaction</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}