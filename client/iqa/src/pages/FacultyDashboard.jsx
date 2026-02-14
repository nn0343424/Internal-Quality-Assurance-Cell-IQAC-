import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

export default function FacultyDashboard() {
  const [stats, setStats] = useState({
    infoSubmitted: false,
    oddSubmitted: false,
    evenSubmitted: false,
    personalFileSubmitted: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, personalRes, auditRes] = await Promise.all([
          API.get("/faculty/info").catch(() => ({ data: null })),
          API.get("/faculty/personal").catch(() => ({ data: null })),
          API.get("/semester-audit/status/" + localStorage.getItem("userId")).catch(() => ({ 
            data: { oddSubmitted: false, evenSubmitted: false } 
          })),
        ]);

        setStats({
          infoSubmitted: Boolean(infoRes.data),
          oddSubmitted: auditRes.data?.oddSubmitted || false,
          evenSubmitted: auditRes.data?.evenSubmitted || false,
          personalFileSubmitted: Boolean(personalRes.data),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalSubmissions = Object.values(stats).filter(Boolean).length;
  const completionPercentage = (totalSubmissions / 4) * 100;

  const dashboardCards = [
    {
      title: "Faculty Info",
      description: "Basic academic and course details",
      link: "/faculty/faculty-info",
      gradient: "from-blue-500 to-cyan-500",
      submitted: stats.infoSubmitted,
    },
    {
      title: "ODD Semester Audit",
      description: "Fill ODD semester details",
      link: "/faculty/audit/odd",
      gradient: "from-green-500 to-emerald-500",
      submitted: stats.oddSubmitted,
    },
    {
      title: "EVEN Semester Audit",
      description: "Fill EVEN semester details",
      link: "/faculty/audit/even",
      gradient: "from-amber-500 to-orange-500",
      submitted: stats.evenSubmitted,
    },
    {
      title: "Personal File",
      description: "Qualification and experience",
      link: "/faculty/personal-file",
      gradient: "from-purple-500 to-pink-500",
      submitted: stats.personalFileSubmitted,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Faculty Dashboard" />

      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-lg">
              Complete and track your IQAC audit activities below.
            </p>
          </div>

          {/* Stats Cards */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-500">Loading dashboard...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-semibold">Total Submissions</p>
                      <p className="text-3xl font-black text-gray-800 mt-1">{totalSubmissions}</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-semibold">Completion Rate</p>
                      <p className="text-3xl font-black text-gray-800 mt-1">{completionPercentage.toFixed(0)}%</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-semibold">Pending</p>
                      <p className="text-3xl font-black text-gray-800 mt-1">{4 - totalSubmissions}</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {dashboardCards.map((card, index) => (
                  <Link
                    key={index}
                    to={card.link}
                    className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {card.title}
                          </h3>
                          {card.submitted && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Submitted
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {card.description}
                        </p>
                        
                        <div className="mt-4 flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                          <span>{card.submitted ? 'View Details' : 'Get Started'}</span>
                          <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">Status</span>
                        <span className={`font-semibold ${card.submitted ? 'text-green-600' : 'text-amber-600'}`}>
                          {card.submitted ? 'Complete' : 'Incomplete'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick Tips Section */}
              <div className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-xl text-white animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Quick Tips</h3>
                    <ul className="space-y-2 text-indigo-100">
                      <li>• Complete all sections for faster approval</li>
                      <li>• Upload supporting documents where required</li>
                      <li>• Check auditor feedback regularly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
