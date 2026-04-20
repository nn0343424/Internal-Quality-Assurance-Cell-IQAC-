import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AdminReports() {
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    verified: 0,
    rejected: 0,
  });

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/auditor/new-documents");
      const data = res.data;

      setDocs(data);

      setStats({
        total: data.length,
        submitted: data.filter(d => d.status === "Submitted").length,
        verified: data.filter(d => d.status === "Verified").length,
        rejected: data.filter(d => d.status === "Needs Correction").length,
      });

    } catch (err) {
      console.error("Reports error:", err);
      toast.error("Failed to load reports");
    }
  };

  return (
    <>
      <Navbar title="Admin Reports" />

      <div className="p-6 bg-gray-100 min-h-screen">

        {/* 📊 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          {/* Total */}
          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <h2 className="text-2xl font-semibold">{stats.total}</h2>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"/>
              </svg>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h2 className="text-2xl font-semibold text-orange-500">
                {stats.submitted}
              </h2>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3"/>
              </svg>
            </div>
          </div>

          {/* Verified */}
          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Verified</p>
              <h2 className="text-2xl font-semibold text-green-600">
                {stats.verified}
              </h2>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>

          {/* Rejected */}
          <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Needs Correction</p>
              <h2 className="text-2xl font-semibold text-red-500">
                {stats.rejected}
              </h2>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </div>

        </div>

        {/* 📄 Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="text-lg font-semibold text-gray-700">
              All Submissions
            </h3>
          </div>

          {docs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No submissions available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3 text-left">Faculty</th>
                    <th className="p-3 text-left">Document</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {docs.map((doc) => (
                    <tr key={doc._id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-3">{doc.faculty?.name || "N/A"}</td>
                      <td className="p-3">{doc.documentType}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium
                            ${
                              doc.status === "Verified"
                                ? "bg-green-100 text-green-700"
                                : doc.status === "Needs Correction"
                                ? "bg-red-100 text-red-600"
                                : "bg-orange-100 text-orange-600"
                            }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </>
  );
}