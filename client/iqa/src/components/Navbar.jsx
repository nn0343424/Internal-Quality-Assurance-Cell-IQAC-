export default function Navbar({ title }) {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-4 shadow-lg sticky top-0 z-50 backdrop-blur-sm animate-slide-down">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Logo with animation */}
          <div className="bg-white text-indigo-600 font-black px-4 py-2 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span className="text-xl">IQAC</span>
          </div>

          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-wide">{title}</h1>
            <div className="h-0.5 bg-white/30 mt-1 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Info Card */}
          <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/70 capitalize">Role: {role}</p>
              <p className="text-sm font-semibold">{name}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
