import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAnnouncements } from "../services/api";
import { useNavigate } from "react-router-dom";

const PIE_COLORS = ["#16a34a", "#f97316"];

const RADIAN = Math.PI / 180;
function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight="700">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalFaculty: 0,
    totalAuditors: 0,
    pendingAudits: 0,
    completedAudits: 0,
  });

  const [announcements, setAnnouncements] = useState([]);
  const [verified, setVerified] = useState(0);
  const [pending, setPending] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartData = [
    { name: "Verified", value: verified },
    { name: "Pending", value: pending },
  ];

  // ── ORIGINAL fetch logic — untouched ────────────────────────────
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const res = await getAnnouncements();
    setAnnouncements(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. USERS
        const usersRes = await API.get("/admin/users");
        const users = usersRes.data;

        const facultyCount = users.filter(
          (u) => u.role?.toLowerCase() === "faculty"
        ).length;

        const auditorCount = users.filter(
          (u) => u.role?.toLowerCase() === "auditor"
        ).length;

        // 2. DOCUMENTS
        const docsRes = await API.get("/auditor/new-documents");
        const docs = docsRes.data;

        const verifiedCount = docs.filter((d) => d.status === "Verified").length;
        const pendingCount = docs.filter((d) => d.status === "Submitted").length;

        // 3. UPDATE STATES
        setVerified(verifiedCount);
        setPending(pendingCount);

        setStats({
          totalFaculty: facultyCount,
          totalAuditors: auditorCount,
          pendingAudits: pendingCount,
          completedAudits: verifiedCount,
        });

        // 4. RECENT ACTIVITY
        const recent = users.slice(-3).reverse().map((u) => ({
          action: `${u.role === "faculty" ? "Faculty" : "Auditor"} registered`,
          user: u.name,
          role: u.role?.toLowerCase(),
          time: "Recently",
        }));

        setRecentActivity(recent);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // ────────────────────────────────────────────────────────────────

  const adminActions = [
    {
      title: "Register User",
      description: "Add new Faculty or Auditor to the system",
      link: "/admin/register",
      iconBg: "#4F46E5",
      iconPath: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    },
    {
      title: "Manage Users",
      description: "View and manage Faculty & Auditors",
      link: "/admin/users",
      iconBg: "#0891B2",
      iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      title: "View Audits",
      description: "Review and approve audit submissions",
      link: "/auditor-review",
      iconBg: "#059669",
      iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
    {
      title: "Reports",
      description: "Generate system-wide reports",
      link: "/admin-reports",
      iconBg: "#D97706",
      iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
  ];

  const statsConfig = [
    {
      label: "Total Faculty",
      value: stats.totalFaculty,
      iconBg: "#EEF2FF",
      iconColor: "#4F46E5",
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      label: "Total Auditors",
      value: stats.totalAuditors,
      iconBg: "#E0F7FA",
      iconColor: "#0891B2",
      iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    },
    {
      label: "Pending Audits",
      value: stats.pendingAudits,
      iconBg: "#FFFBEB",
      iconColor: "#D97706",
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Completed Audits",
      value: stats.completedAudits,
      iconBg: "#ECFDF5",
      iconColor: "#059669",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  const announcementColors = [
    { bg: "#F5F3FF", border: "#C4B5FD", dot: "#7C3AED", titleColor: "#5B21B6" },
    { bg: "#FFFBEB", border: "#FCD34D", dot: "#D97706", titleColor: "#92400E" },
    { bg: "#E0F7FA", border: "#67E8F9", dot: "#0891B2", titleColor: "#164E63" },
  ];

  const roleColors = {
    faculty: { bg: "#EEF2FF", color: "#4F46E5", avatarBg: "#4F46E5" },
    auditor: { bg: "#E0F7FA", color: "#0891B2", avatarBg: "#0891B2" },
  };

  const card = { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "1.5rem" };
  const sectionLabel = { fontSize: 12, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 1rem" };
  const total = verified + pending;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Navbar title="Admin Dashboard" />

      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1E293B", margin: "0 0 4px" }}>Admin Control Panel</h1>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>Manage users, audits, announcements and system settings</p>
            </div>
            <button
              onClick={() => navigate("/admin/register")}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", fontSize: 13, fontWeight: 600, color: "#fff", background: "#4F46E5", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#94A3B8", fontSize: 15 }}>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <div style={{ width: 40, height: 40, border: "3px solid #E2E8F0", borderTop: "3px solid #4F46E5", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
              Loading dashboard...
            </div>
          ) : (
            <>
              {/* ── Stat Cards ── */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {statsConfig.map((s, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "1.25rem", border: "1px solid #E2E8F0" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <svg width="22" height="22" fill="none" stroke={s.iconColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.iconPath} />
                      </svg>
                    </div>
                    <p style={{ fontSize: 28, fontWeight: 700, color: "#1E293B", margin: "0 0 4px" }}>{s.value}</p>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* ── Chart + Announcements ── */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 14 }}>

                {/* Pie Chart */}
                <div style={card}>
                  <p style={sectionLabel}>Audit Status Overview</p>
                  {total > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} labelLine={false} label={CustomLabel}>
                            {chartData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                          </Pie>
                          <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 13, fontWeight: 600 }} />
                          <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: "#64748B", fontSize: 12, fontWeight: 600 }}>{v}</span>} />
                        </PieChart>
                      </ResponsiveContainer>

                      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                        <div style={{ flex: 1, background: "#ECFDF5", borderRadius: 10, padding: 10, textAlign: "center" }}>
                          <p style={{ fontSize: 20, fontWeight: 700, color: "#059669", margin: "0 0 2px" }}>{verified}</p>
                          <p style={{ fontSize: 10, fontWeight: 600, color: "#059669", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Verified</p>
                        </div>
                        <div style={{ flex: 1, background: "#FFFBEB", borderRadius: 10, padding: 10, textAlign: "center" }}>
                          <p style={{ fontSize: 20, fontWeight: 700, color: "#D97706", margin: "0 0 2px" }}>{pending}</p>
                          <p style={{ fontSize: 10, fontWeight: 600, color: "#D97706", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Pending</p>
                        </div>
                        <div style={{ flex: 1, background: "#F8FAFC", borderRadius: 10, padding: 10, textAlign: "center" }}>
                          <p style={{ fontSize: 20, fontWeight: 700, color: "#475569", margin: "0 0 2px" }}>{total}</p>
                          <p style={{ fontSize: 10, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Total</p>
                        </div>
                      </div>

                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #F1F5F9" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#64748B" }}>Completion Rate</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#4F46E5" }}>{Math.round((verified / total) * 100)}%</span>
                        </div>
                        <div style={{ height: 6, background: "#E2E8F0", borderRadius: 99 }}>
                          <div style={{ height: 6, width: `${Math.round((verified / total) * 100)}%`, background: "#4F46E5", borderRadius: 99 }} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <p style={{ fontSize: 13, color: "#94A3B8", textAlign: "center", padding: "3rem 0" }}>No audit data yet</p>
                  )}
                </div>

                {/* Announcements */}
                <div style={card}>
                  <p style={sectionLabel}>Admin Notifications</p>
                  {announcements.length === 0 ? (
                    <p style={{ fontSize: 13, color: "#94A3B8", textAlign: "center", padding: "2rem 0" }}>No announcements</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {announcements.map((a, i) => {
                        const c = announcementColors[i % announcementColors.length];
                        return (
                          <div key={a._id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, marginTop: 5, flexShrink: 0 }} />
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 600, color: c.titleColor, margin: "0 0 2px" }}>{a.title}</p>
                              <p style={{ fontSize: 12, color: "#64748B", margin: 0, lineHeight: 1.5 }}>{a.message}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Quick Actions ── */}
              <div style={card}>
                <p style={sectionLabel}>Quick Actions</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                  {adminActions.map((action, i) => (
                    <Link key={i} to={action.link} style={{ textDecoration: "none" }}>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 14, padding: "1rem 1.25rem", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, cursor: "pointer", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#C7D2FE"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: action.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="20" height="20" fill="none" stroke="#fff" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.iconPath} />
                          </svg>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", margin: "0 0 2px" }}>{action.title}</p>
                          <p style={{ fontSize: 12, color: "#94A3B8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{action.description}</p>
                        </div>
                        <span style={{ color: "#CBD5E1", fontSize: 16 }}>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── More Nav Buttons ── */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
                {[
                  { label: "Announcements", path: "/admin-announcements", iconBg: "#DB2777", iconPath: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
                  { label: "Timetable", path: "/admin-timetable", iconBg: "#7C3AED", iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                  { label: "Events", path: "/admin-events", iconBg: "#0891B2", iconPath: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                  { label: "Reports", path: "/admin-reports", iconBg: "#D97706", iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => navigate(btn.path)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "#374151", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#C7D2FE"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: btn.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" fill="none" stroke="#fff" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.iconPath} />
                      </svg>
                    </div>
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* ── Recent Activity ── */}
              {recentActivity.length > 0 && (
                <div style={card}>
                  <p style={sectionLabel}>Recent Activity</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {recentActivity.map((activity, i) => {
                      const rc = roleColors[activity.role] || { bg: "#F8FAFC", color: "#64748B", avatarBg: "#94A3B8" };
                      const initials = (activity.user || "?").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#F8FAFC", borderRadius: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: rc.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {initials}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#1E293B", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{activity.user}</p>
                            <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>{activity.action}</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99, background: rc.bg, color: rc.color }}>
                              {activity.role === "faculty" ? "Faculty" : "Auditor"}
                            </span>
                            <span style={{ fontSize: 11, color: "#94A3B8" }}>{activity.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}