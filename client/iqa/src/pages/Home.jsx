import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-50">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/50 pointer-events-none"></div>

      <div className="relative max-w-5xl w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row border border-white">

        {/* LEFT BRANDING */}
        <div className="w-full md:w-[45%] bg-[#4F46E5] p-10 md:p-14 flex flex-col justify-center items-center text-white relative">
          <h2 className="text-4xl font-black mb-2">IQAC</h2>
          <p className="text-indigo-100 text-lg">
            Internal Quality Assurance Cell
          </p>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center bg-white">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-8">
            Quality Management <span className="text-indigo-600">System</span>
          </h1>

          <div className="space-y-5">
            {/* STAFF LOGIN */}
            <button
              onClick={() => navigate("/login")}
              className="group w-full flex items-center p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                👥
              </div>
              <div className="ml-5 text-left flex-grow">
                <h3 className="text-lg font-bold">Staff Portal</h3>
                <p className="text-sm text-slate-500">
                  Admin / Faculty / Auditor
                </p>
              </div>
              ➜
            </button>

            {/* COURSE EXIT SURVEY */}
            <button
              onClick={() => navigate("/survey/course-exit")}
              className="group w-full flex items-center p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-violet-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                📝
              </div>
              <div className="ml-5 text-left flex-grow">
                <h3 className="text-lg font-bold">Course Exit Survey</h3>
                <p className="text-sm text-slate-500">
                  Student Feedback (Anonymous)
                </p>
              </div>
              ➜
            </button>
          </div>

          <div className="mt-12 text-xs text-slate-400">
            © IQAC Management System
          </div>
        </div>
      </div>
    </div>
  );
}
