import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchFeedback();
  }, []);

  // Fetch faculty & auditors
  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  // Fetch feedback summary
  const fetchFeedback = async () => {
    const res = await API.get("/admin/feedback-summary");
    setFeedback(res.data);
  };

  // Get feedback for a faculty
  const getFeedback = (facultyId) => {
    return feedback.find((f) => f._id === facultyId);
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await API.put(`/admin/users/${editUser._id}`, editUser);
    alert("User updated successfully");
    setEditUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await API.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <>
      <Navbar title="Manage Faculty & Auditors" />

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">

          <h2 className="text-xl font-semibold mb-4">
            Faculty & Auditor Management
          </h2>

          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Responses</th>
                <th className="border p-2">Avg Clarity</th>
                <th className="border p-2">Avg Satisfaction</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const fb = getFeedback(u._id);

                return (
                  <tr key={u._id}>
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2 capitalize">{u.role}</td>
                    <td className="border p-2">{u.department || "-"}</td>
                    <td className="border p-2">{u.mobile || "-"}</td>

                    <td className="border p-2 text-center">
                      {fb ? fb.responses : 0}
                    </td>

                    <td className="border p-2 text-center">
                      {fb ? fb.avgClarity.toFixed(1) : "-"}
                    </td>

                    <td className="border p-2 text-center">
                      {fb ? fb.avgSatisfaction.toFixed(1) : "-"}
                    </td>

                    <td className="border p-2 flex gap-2">
                      <button
                        onClick={() => setEditUser(u)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(u._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>

                      <button
  onClick={() => navigate(`/admin/faculty/${u._id}`)}
  className="bg-indigo-600 text-white px-2 py-1 rounded text-sm"
>
  View
</button>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>


          {/* EDIT FORM */}
          {editUser && (
            <div className="mt-6 p-4 border rounded bg-gray-50">
              <h3 className="font-semibold mb-3">Edit User</h3>

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="name"
                  value={editUser.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Name"
                />

                <input
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Email"
                />

                <input
                  name="mobile"
                  value={editUser.mobile || ""}
                  onChange={handleChange}
                  className="input"
                  placeholder="Mobile"
                />

                <input
                  name="department"
                  value={editUser.department || ""}
                  onChange={handleChange}
                  className="input"
                  placeholder="Department"
                />

                <input
                  name="subject"
                  value={editUser.subject || ""}
                  onChange={handleChange}
                  className="input"
                  placeholder="Subject"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditUser(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
