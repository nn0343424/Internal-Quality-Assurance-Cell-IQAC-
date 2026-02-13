import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <Navbar title="Admin Dashboard" />

      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/register"
              className="bg-blue-600 text-white text-center py-3 rounded"
            >
              Register Faculty / Auditor
            </Link>
            <Link
              to="/admin/users"
              className="bg-purple-600 text-white text-center py-3 rounded"
            >
              Manage Faculty & Auditors
            </Link>

            <div className="bg-green-100 text-center py-3 rounded">
              View & Approve Audits
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
