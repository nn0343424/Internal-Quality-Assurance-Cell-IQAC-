import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function PersonalFile() {
  const [form, setForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFile();
  }, []);

  const fetchFile = async () => {
    try {
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
          publicationsCount: "",
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
        await API.put("/faculty/personal", form);
        toast.success("Personal file updated");
      } else {
        await API.post("/faculty/personal", form);
        toast.success("Personal file submitted");
      }

      setEditMode(false);
      fetchFile();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return null;

  return (
    <>
      <Navbar title="Personal File" />

      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Faculty Personal File
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

              <Info label="Highest Qualification" value={form.highestQualification} />
              <Info label="Specialization" value={form.specialization} />
              <Info label="Year of Passing" value={form.yearOfPassing} />
              <Info label="Teaching Experience" value={`${form.teachingExperience} years`} />
              <Info label="Industry Experience" value={`${form.industryExperience || 0} years`} />
              <Info label="Publications" value={form.publicationsCount} />

            </div>
          ) : (

            /* EDIT FORM */
            <form onSubmit={handleSubmit} className="space-y-4">

              <Input name="highestQualification" value={form.highestQualification} onChange={handleChange} placeholder="Highest Qualification" />
              <Input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" />

              <Input type="number" name="yearOfPassing" value={form.yearOfPassing} onChange={handleChange} placeholder="Year of Passing" />
              <Input type="number" name="teachingExperience" value={form.teachingExperience} onChange={handleChange} placeholder="Teaching Experience (years)" />
              <Input type="number" name="industryExperience" value={form.industryExperience} onChange={handleChange} placeholder="Industry Experience (years)" />
              <Input type="number" name="publicationsCount" value={form.publicationsCount} onChange={handleChange} placeholder="Total Publications" />

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
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 text-sm"
      required={name !== "industryExperience" && name !== "publicationsCount"}
    />
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