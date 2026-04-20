import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "faculty",
    department: "",
    mobile: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      toast.success("User registered successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "faculty",
        department: "",
        mobile: ""
      });

    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Register Faculty / Auditor" />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              User Registration
            </h2>
            <p className="text-sm text-gray-500">
              Add faculty or auditor account
            </p>
          </div>

          {/* Name */}
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          {/* Email */}
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
          />

          {/* Password */}
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />

          {/* Mobile */}
          <Input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
          />

          {/* Department */}
          <Input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
          />

          {/* Role */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="faculty">Faculty</option>
            <option value="auditor">Auditor</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    opacity="0.25"
                  />
                  <path
                    d="M22 12a10 10 0 00-10-10"
                    stroke="white"
                    strokeWidth="4"
                  />
                </svg>
                Registering...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Register User
              </>
            )}
          </button>

        </form>
      </div>
    </>
  );
}

/* 🔹 Reusable Input Component */
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
                 focus:border-indigo-500 text-sm"
    />
  );
}