import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PersonalFile() {
  const [form, setForm] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchFile();
  }, []);

  const fetchFile = async () => {
    const res = await API.get("/faculty/personal");
    if (res.data) {
      setForm(res.data);
      setEditMode(false);
    } else {
      setForm({
        highestQualification: "",
        specialization: "",
        yearOfPassing: "",
        teachingExperience: "",
        industryExperience: "",
        publicationsCount: ""
      });
      setEditMode(true);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form._id) {
      await API.put("/faculty/personal", form);
      alert("Personal file updated");
    } else {
      await API.post("/faculty/personal", form);
      alert("Personal file submitted");
    }

    setEditMode(false);
    fetchFile();
  };

  if (!form) return null;

  return (
    <>
      <Navbar title="Personal File" />

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">

          <h2 className="text-xl font-semibold mb-4">
            Faculty Personal File
          </h2>

          {!editMode ? (
            <>
              <p><b>Highest Qualification:</b> {form.highestQualification}</p>
              <p><b>Specialization:</b> {form.specialization}</p>
              <p><b>Year of Passing:</b> {form.yearOfPassing}</p>
              <p><b>Teaching Experience:</b> {form.teachingExperience} years</p>
              <p><b>Industry Experience:</b> {form.industryExperience} years</p>
              <p><b>Publications:</b> {form.publicationsCount}</p>

              <button
                onClick={() => setEditMode(true)}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
              >
                Edit Personal File
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

  <input
    name="highestQualification"
    className="input"
    placeholder="Highest Qualification (e.g., M.Tech, PhD)"
    value={form.highestQualification}
    onChange={handleChange}
    required
  />

  <input
    name="specialization"
    className="input"
    placeholder="Specialization (e.g., Computer Science)"
    value={form.specialization}
    onChange={handleChange}
    required
  />

  <input
    type="number"
    name="yearOfPassing"
    className="input"
    placeholder="Year of Passing (e.g., 2020)"
    value={form.yearOfPassing}
    onChange={handleChange}
    required
  />

  <input
    type="number"
    name="teachingExperience"
    className="input"
    placeholder="Teaching Experience (in years)"
    value={form.teachingExperience}
    onChange={handleChange}
    required
  />

  <input
    type="number"
    name="industryExperience"
    className="input"
    placeholder="Industry Experience (in years)"
    value={form.industryExperience}
    onChange={handleChange}
  />

  <input
    type="number"
    name="publicationsCount"
    className="input"
    placeholder="Total Publications"
    value={form.publicationsCount}
    onChange={handleChange}
  />

  <div className="flex gap-3">
    <button className="bg-green-600 text-white px-6 py-2 rounded">
      Save
    </button>

    <button
      type="button"
      onClick={() => setEditMode(false)}
      className="bg-gray-400 text-white px-6 py-2 rounded"
    >
      Cancel
    </button>
  </div>

</form>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}
