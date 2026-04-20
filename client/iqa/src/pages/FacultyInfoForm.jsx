import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function FacultyInfoForm() {
  const [form, setForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
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
          coursesHandled: "",
        });
        setEditMode(true);
      }
    } catch {
      toast.error("Failed to load data");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (form._id) {
        await API.put("/faculty/info", form);
        toast.success("Faculty info updated");
      } else {
        await API.post("/faculty/info", form);
        toast.success("Faculty info added");
      }

      setEditMode(false);
      fetchInfo();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return null;

  return (
    <>
      <Navbar title="Faculty Information" />

      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Faculty Profile
            </h2>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Edit
              </button>
            )}
          </div>

          {/* VIEW MODE */}
          {!editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

              <Info label="Designation" value={form.designation} />
              <Info label="Department" value={form.department} />
              <Info label="Date of Joining" value={form.dateOfJoining} />
              <Info label="Appointment Type" value={form.appointmentType} />
              <Info label="Courses Handled" value={form.coursesHandled} />

            </div>
          ) : (

            /* EDIT FORM */
            <form onSubmit={handleSubmit} className="space-y-4">

              <Select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                options={[
                  "Assistant Professor",
                  "Associate Professor",
                  "Professor",
                ]}
                placeholder="Select Designation"
              />

              <Input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department"
              />

              <Input
                type="date"
                name="dateOfJoining"
                value={form.dateOfJoining}
                onChange={handleChange}
              />

              <Select
                name="appointmentType"
                value={form.appointmentType}
                onChange={handleChange}
                options={["Permanent", "Contract"]}
                placeholder="Nature of Appointment"
              />

              <Input
                name="coursesHandled"
                value={form.coursesHandled}
                onChange={handleChange}
                placeholder="Courses Handled"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 rounded text-white
                    ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
                  `}
                >
                  {loading ? "Saving..." : "Save"}
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

/* 🔹 Reusable Components */

function Input({ name, value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      required
    />
  );
}

function Select({ name, value, onChange, options, placeholder }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      required
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  );
}