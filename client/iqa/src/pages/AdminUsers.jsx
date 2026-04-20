import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchFeedback();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await API.get("/admin/feedback-summary");
      setFeedback(res.data);
    } catch (err) {
      toast.error("Failed to load feedback");
    }
  };

  const getFeedback = (facultyId) => {
    return feedback.find((f) => f._id === facultyId);
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/admin/users/${editUser._id}`, editUser);
      toast.success("User updated successfully");
      setEditUser(null);
      fetchUsers();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar title="Manage Faculty & Auditors" />

      <div className="p-6 bg-gray-100 min-h-screen">

        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow overflow-hidden">

          {/* Header */}
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-700">
              Faculty & Auditor Management
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-center">Responses</th>
                  <th className="p-3 text-center">Clarity</th>
                  <th className="p-3 text-center">Satisfaction</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => {
                  const fb = getFeedback(u._id);

                  return (
                    <tr key={u._id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 capitalize">{u.role}</td>
                      <td className="p-3">{u.department || "-"}</td>
                      <td className="p-3">{u.mobile || "-"}</td>

                      <td className="p-3 text-center">
                        {fb ? fb.responses : 0}
                      </td>

                      <td className="p-3 text-center">
                        {fb ? fb.avgClarity.toFixed(1) : "-"}
                      </td>

                      <td className="p-3 text-center">
                        {fb ? fb.avgSatisfaction.toFixed(1) : "-"}
                      </td>

                      {/* Actions */}
                      <td className="p-3 flex gap-2 justify-center">

                        <button
                          onClick={() => setEditUser(u)}
                          className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(u._id)}
                          className="px-3 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => navigate(`/admin/faculty/${u._id}`)}
                          className="px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          View
                        </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No users found
            </div>
          )}

        </div>

        {/* Edit Modal */}
        {editUser && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">

              <h3 className="text-lg font-semibold mb-4">Edit User</h3>

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="name"
                  value={editUser.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border p-2 rounded"
                />

                <input
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-2 rounded"
                />

                <input
                  name="mobile"
                  value={editUser.mobile || ""}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="border p-2 rounded"
                />

                <input
                  name="department"
                  value={editUser.department || ""}
                  onChange={handleChange}
                  placeholder="Department"
                  className="border p-2 rounded"
                />

                <input
                  name="subject"
                  value={editUser.subject || ""}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="border p-2 rounded col-span-2"
                />

              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}