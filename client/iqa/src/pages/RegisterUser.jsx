import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "faculty",
    department: "",
    mobile: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("User registered successfully");
    setForm({
      name: "",
      email: "",
      password: "",
      role: "faculty",
      department: "",
      mobile: ""
    });
  };

  return (
    <>
      <Navbar title="Register Faculty / Auditor" />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-96 space-y-3"
        >
          <h2 className="text-lg font-semibold text-center mb-2">
            User Registration
          </h2>

          <input
            name="name"
            placeholder="Full Name"
            className="input"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            placeholder="Password"
            className="input"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            className="input"
            value={form.mobile}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            className="input"
            value={form.department}
            onChange={handleChange}
          />

          <select
            name="role"
            className="input"
            value={form.role}
            onChange={handleChange}
          >
            <option value="faculty">Faculty</option>
            <option value="auditor">Auditor</option>
          </select>

          <button className="bg-blue-600 text-white w-full py-2 rounded">
            Register User
          </button>
        </form>
      </div>
    </>
  );
}
