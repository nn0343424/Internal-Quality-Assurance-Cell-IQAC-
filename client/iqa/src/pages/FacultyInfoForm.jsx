import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FacultyInfoForm() {
  const [form, setForm] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const res = await API.get("/faculty/info");
    if (res.data) {
      setForm(res.data);
      setEditMode(false);
    } else {
      setForm({
        designation: "",
        department: "",
        dateOfJoining: "",
        appointmentType: "",
        coursesHandled: ""
      });
      setEditMode(true);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form._id) {
      await API.put("/faculty/info", form);
      alert("Faculty info updated successfully");
    } else {
      await API.post("/faculty/info", form);
      alert("Faculty info added successfully");
    }

    setEditMode(false);
    fetchInfo();
  };

  if (!form) return null;

  return (
    <>
      <Navbar title="Faculty Information" />

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">

          <h2 className="text-xl font-semibold mb-4">
            Faculty Profile
          </h2>

          {!editMode ? (
            <>
              <div className="space-y-2 text-gray-700">
                <p><b>Designation:</b> {form.designation}</p>
                <p><b>Department:</b> {form.department}</p>
                <p><b>Date of Joining:</b> {form.dateOfJoining}</p>
                <p><b>Appointment Type:</b> {form.appointmentType}</p>
                <p><b>Courses Handled:</b> {form.coursesHandled}</p>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              <select
                name="designation"
                className="input"
                value={form.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
              </select>

              <input
                name="department"
                placeholder="Department"
                className="input"
                value={form.department}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="dateOfJoining"
                className="input"
                value={form.dateOfJoining}
                onChange={handleChange}
                required
              />

              <select
                name="appointmentType"
                className="input"
                value={form.appointmentType}
                onChange={handleChange}
                required
              >
                <option value="">Nature of Appointment</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>

              <input
                name="coursesHandled"
                placeholder="Courses Handled"
                className="input"
                value={form.coursesHandled}
                onChange={handleChange}
              />

              <div className="flex gap-3 pt-4">
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
