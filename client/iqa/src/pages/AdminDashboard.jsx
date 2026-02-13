import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFaculty: 0,
    totalAuditors: 0,
    pendingAudits: 0,
    completedAudits: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await API.get("/admin/users");
        const users = usersRes.data;

        const facultyCount = users.filter(u => u.role === "faculty").length;
        const auditorCount = users.filter(u => u.role === "auditor").length;

        setStats({
          totalFaculty: facultyCount,
          totalAuditors: auditorCount,
          pendingAudits: 0,
          completedAudits: 0,
        });

        // Get recent users as activity
        const recent = users.slice(-3).reverse().map(u => ({
          action: `${u.role === 'faculty' ? 'Faculty' : 'Auditor'} registered`,
          user: u.name,
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

  const adminActions = [
    {
      title: "Register User",
      description: "Add new Faculty or Auditor to the system",
      link: "/admin/register",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Manage Users",
      description: "View and manage Faculty & Auditors",
      link: "/admin/users",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "View Audits",
      description: "Review and approve audit submissions",
      link: "#",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Reports",
      description: "Generate system-wide reports",
      link: "#",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const statsData = [
    { 
      label: "Total Faculty", 
      value: stats.totalFaculty, 
      color: "from-blue-500 to-cyan-500",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: "Total Auditors", 
      value: stats.totalAuditors, 
      color: "from-purple-500 to-pink-500",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    { 
      label: "Pending Audits", 
      value: stats.pendingAudits, 
      color: "from-amber-500 to-orange-500",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: "Completed", 
      value: stats.completedAudits, 
      color: "from-green-500 to-emerald-500",
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Admin Dashboard" />

      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
              Admin Control Panel
            </h2>
            <p className="text-gray-600 text-lg">
              Manage users, audits, and system settings
            </p>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-500">Loading dashboard...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-semibold mb-1">{stat.label}</p>
                    <p className="text-4xl font-black text-gray-800">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Action Cards */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-slide-up">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Actions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {adminActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.link}
                      className="group p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl hover:border-indigo-300 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                            {action.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {action.description}
                          </p>
                        </div>

                        <div className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all text-xl">
                          →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              {recentActivity.length > 0 && (
                <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Recent Activity
                  </h3>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
