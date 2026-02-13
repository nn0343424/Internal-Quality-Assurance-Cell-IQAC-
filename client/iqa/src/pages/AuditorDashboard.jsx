import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuditorDashboard() {
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  const [auditStatus, setAuditStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/auditor/faculty").then(async res => {
      setFaculty(res.data);

      const statusMap = {};
      for (const f of res.data) {
        try {
          const s = await API.get(`/semester-audit/status/${f._id}`);
          statusMap[f._id] = s.data;
        } catch (error) {
          statusMap[f._id] = { oddSubmitted: false, evenSubmitted: false };
        }
      }
      setAuditStatus(statusMap);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Auditor Dashboard" />
      
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
              Auditor Dashboard
            </h2>
            <p className="text-gray-600 text-lg">
              Review and approve faculty submissions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Total Faculty</p>
                  <p className="text-3xl font-black text-gray-800 mt-1">{faculty.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Submissions</p>
                  <p className="text-3xl font-black text-gray-800 mt-1">
                    {Object.values(auditStatus).filter(s => s.oddSubmitted || s.evenSubmitted).length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Pending</p>
                  <p className="text-3xl font-black text-gray-800 mt-1">
                    {faculty.length - Object.values(auditStatus).filter(s => s.oddSubmitted && s.evenSubmitted).length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty Table */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-scale-in">
            <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Faculty Audit List
              </h3>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-500">Loading faculty data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Phone</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">ODD Audit</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">EVEN Audit</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {faculty.map((f, index) => (
                      <tr 
                        key={f._id} 
                        className="hover:bg-gray-50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {f.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">{f.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{f.email}</td>
                        <td className="px-6 py-4 text-gray-600">{f.mobile || "-"}</td>
                        <td className="px-6 py-4 text-center">
                          {auditStatus[f._id]?.oddSubmitted ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              <span>✓</span> Submitted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                              <span>✗</span> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {auditStatus[f._id]?.evenSubmitted ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              <span>✓</span> Submitted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                              <span>✗</span> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                              onClick={() => navigate(`/admin/faculty/${f._id}`)}
                            >
                              View
                            </button>
                            <button
                              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                              onClick={() => navigate(`/auditor/review/${f._id}`)}
                            >
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
