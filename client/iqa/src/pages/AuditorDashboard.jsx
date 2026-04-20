import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { getAnnouncements } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function AuditorDashboard() {
  const [faculty, setFaculty] = useState([]);
  const [auditStatus, setAuditStatus] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [docStats, setDocStats] = useState({
    total: 0,
    submitted: 0,
    verified: 0,
    rejected: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const docRes = await API.get("/auditor/new-documents");
      const docs = docRes.data;

      setDocStats({
        total: docs.length,
        submitted: docs.filter(d => d.status === "Submitted").length,
        verified: docs.filter(d => d.status === "Verified").length,
        rejected: docs.filter(d => d.status === "Needs Correction").length,
      });

      const annRes = await getAnnouncements();
      setAnnouncements(annRes.data);

      const userRes = await API.get("/admin/users");
      const facultyOnly = userRes.data.filter(u => u.role === "faculty");
      setFaculty(facultyOnly);

      const statusMap = {};
      for (const f of facultyOnly) {
        try {
          const res = await API.get(`/semester-audit/status/${f._id}`);
          statusMap[f._id] = res.data;
        } catch {
          statusMap[f._id] = { submitted: false };
        }
      }
      setAuditStatus(statusMap);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = faculty.filter(f =>
    f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statCards = [
    {
      label: "Total Faculty",
      value: faculty.length,
      color: "indigo",
      icon: (
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      ),
    },
    {
      label: "Pending Review",
      value: docStats.submitted,
      color: "orange",
      icon: (
        <path d="M12 6v6l4 2" />
      ),
    },
    {
      label: "Verified",
      value: docStats.verified,
      color: "green",
      icon: (
        <path d="M5 13l4 4L19 7" />
      ),
    },
    {
      label: "Needs Correction",
      value: docStats.rejected,
      color: "red",
      icon: (
        <path d="M6 18L18 6M6 6l12 12" />
      ),
    },
  ];

  return (
    <>
      <Navbar title="Auditor Dashboard" />

      <div className="p-6 bg-gray-100 min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Auditor Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              {new Date().toDateString()}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <h2 className="text-xl font-bold text-gray-800">{card.value}</h2>
              </div>

              <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                <svg
                  className={`w-5 h-5 text-${card.color}-600`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  {card.icon}
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Review Card */}
        <div
          onClick={() => navigate("/auditor-review")}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5 rounded-xl shadow-lg mb-6 cursor-pointer hover:scale-[1.01] transition"
        >
          <p className="text-sm opacity-90">Review Documents</p>
          <h2 className="text-lg font-semibold">
            Go to Review Panel →
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Announcements */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-sm font-semibold mb-3 text-gray-700">
              Announcements
            </h2>

            {announcements.length === 0 ? (
              <p className="text-gray-400 text-sm">No announcements</p>
            ) : (
              announcements.map(a => (
                <div
                  key={a._id}
                  className="mb-3 p-3 bg-gray-50 rounded border-l-4 border-indigo-500"
                >
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Faculty Table */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md">

            <div className="p-4 border-b flex justify-between">
              <h2 className="text-sm font-semibold text-gray-700">
                Faculty List
              </h2>

              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-2 py-1 rounded text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-500">
                Loading...
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredFaculty.map(f => (
                    <tr key={f._id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium">{f.name}</td>
                      <td className="p-3 text-gray-600">{f.email}</td>

                      <td className="p-3 text-center">
                        {auditStatus[f._id]?.submitted ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                            Submitted
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="p-3 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => navigate(`/admin/faculty/${f._id}`)}
                          className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                        >
                          View
                        </button>

                        <button
                          onClick={() => navigate(`/auditor/review/${f._id}`)}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}