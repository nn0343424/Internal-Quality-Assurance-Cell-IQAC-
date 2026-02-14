import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100"></div>
      
      {/* Floating Shapes Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl w-full glass-card overflow-hidden flex flex-col md:flex-row animate-scale-in">
        
        {/* LEFT BRANDING SECTION */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-10 md:p-14 flex flex-col justify-center items-center text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative z-10 text-center">
            <div className="mb-6 animate-bounce-slow">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-5xl font-black mb-3 tracking-tight">IQAC</h2>
            <div className="h-1 w-20 bg-white/50 mx-auto mb-4 rounded-full"></div>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed">
              Internal Quality<br/>Assurance Cell
            </p>
            
            <div className="mt-8 flex gap-3 justify-center">
              <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        </div>

        {/* RIGHT ACTIONS SECTION */}
        <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
          <div className="animate-slide-up">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
              Quality Management
            </h1>
            <p className="text-xl gradient-text font-bold mb-8">System Portal</p>
          </div>

          <div className="space-y-5 animate-fade-in">
            {/* STAFF LOGIN CARD */}
            <button
              onClick={() => navigate("/login")}
              className="group w-full flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-indigo-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 text-left flex-grow">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Staff Portal</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Admin / Faculty / Auditor Access
                </p>
              </div>
              <div className="text-2xl text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all">
                →
              </div>
            </button>

            {/* COURSE EXIT SURVEY CARD */}
            <button
              onClick={() => navigate("/survey/course-exit")}
              className="group w-full flex items-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-purple-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-5 text-left flex-grow">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Course Exit Survey</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Student Feedback (Anonymous)
                </p>
              </div>
              <div className="text-2xl text-gray-300 group-hover:text-purple-600 group-hover:translate-x-2 transition-all">
                →
              </div>
            </button>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center">
              © 2024-25 IQAC Management System | Secure & Confidential
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
