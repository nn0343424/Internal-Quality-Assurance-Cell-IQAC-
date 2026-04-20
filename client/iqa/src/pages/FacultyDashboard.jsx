import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { getMyDocuments, getNotifications, getAuditStatus } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    infoSubmitted: false,
    personalFileSubmitted: false,
  });

  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      await Promise.all([
        fetchData(),
        fetchDocuments(),
        fetchNotifications(),
        fetchAuditStatus(),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditStatus = async () => {
    try {
      const facultyId = localStorage.getItem("userId");
      const res = await getAuditStatus(facultyId);

      const submitted =
        res.data?.submitted ||
        res.data?.oddSubmitted ||
        res.data?.evenSubmitted ||
        false;

      setAuditSubmitted(submitted);
    } catch {
      setAuditSubmitted(false);
    }
  };

  const fetchData = async () => {
    try {
      const [infoRes, personalRes] = await Promise.all([
        API.get("/faculty/info").catch(() => ({ data: null })),
        API.get("/faculty/personal").catch(() => ({ data: null })),
      ]);

      setStats({
        infoSubmitted: !!infoRes.data,
        personalFileSubmitted: !!personalRes.data,
      });
    } catch {}
  };

  const fetchDocuments = async () => {
    try {
      const facultyId = localStorage.getItem("userId");
      const res = await getMyDocuments(facultyId);
      setDocuments(res.data);
    } catch {}
  };

  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await getNotifications(userId);
      setNotifications(res.data);
    } catch {}
  };

  const totalSubmissions =
    (stats.infoSubmitted ? 1 : 0) +
    (auditSubmitted ? 1 : 0) +
    (stats.personalFileSubmitted ? 1 : 0);

  const completion = Math.round((totalSubmissions / 3) * 100);

  const dashboardCards = [
    {
      title: "Faculty Info",
      description: "Basic academic and course details",
      link: "/faculty/faculty-info",
      submitted: stats.infoSubmitted,
      iconBg: "bg-indigo-100",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="3" width="16" height="16" rx="3" stroke="#4F46E5" strokeWidth="1.6" />
          <path d="M7 8h8M7 11h5M7 14h6" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Semester Audit",
      description: "Fill semester audit details",
      link: "/semester-audit",
      submitted: auditSubmitted,
      iconBg: "bg-green-100",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 18V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M2 18h18M8 8h6M8 11.5h4" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Personal File",
      description: "Qualification and experience",
      link: "/faculty/personal-file",
      submitted: stats.personalFileSubmitted,
      iconBg: "bg-pink-100",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="8" r="3.5" stroke="#DB2777" strokeWidth="1.6" />
          <path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#DB2777" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Navbar title="Faculty Dashboard" />

      <div className="bg-gray-100 min-h-screen p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              {new Date().toDateString()}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
            FA
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading...
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <StatCard label="Forms Completed" value={`${totalSubmissions}/3`} />
              <StatCard label="Documents" value={documents.length} />
              <StatCard label="Notifications" value={notifications.length} />
            </div>

            {/* Progress */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Submission Progress</span>
                <span className="font-semibold text-indigo-600">
                  {completion}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            {/* Quick Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {dashboardCards.map((card, i) => (
                <Link key={i} to={card.link}>
                  <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition relative">

                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${card.iconBg}`}>
                      {card.icon}
                    </div>

                    <h3 className="mt-3 font-medium text-gray-800">
                      {card.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {card.description}
                    </p>

                    <span
                      className={`absolute top-4 right-4 text-xs px-2 py-1 rounded
                        ${
                          card.submitted
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-600"
                        }`}
                    >
                      {card.submitted ? "Submitted" : "Pending"}
                    </span>

                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-4">

              {/* Documents */}
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-3">My Documents</h3>

                {documents.length === 0 ? (
                  <p className="text-gray-400 text-sm">No documents</p>
                ) : (
                  documents.map(doc => (
                    <div key={doc._id} className="mb-3 text-sm">
                      <p className="font-medium">{doc.documentType}</p>
                      <span className="text-xs text-indigo-600">
                        {doc.status}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Notifications */}
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-3">Notifications</h3>

                {notifications.length === 0 ? (
                  <p className="text-gray-400 text-sm">No notifications</p>
                ) : (
                  notifications.slice(0, 5).map(n => (
                    <p key={n._id} className="text-sm mb-2">
                      {n.message}
                    </p>
                  ))
                )}

                <button
                  onClick={() => navigate("/faculty-notifications")}
                  className="mt-3 text-sm text-indigo-600 font-medium"
                >
                  View All →
                </button>
              </div>

            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

/* Components */

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>
  );
}