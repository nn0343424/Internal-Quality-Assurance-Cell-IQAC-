import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Navbar({ title }) {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await API.get(`/notifications/count/${userId}`);
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = async () => {
    const userId = localStorage.getItem("userId");

    try {
      await API.put(`/notifications/read-all/${userId}`);
    } catch (err) {
      console.error(err);
    }

    setCount(0);
    navigate("/faculty-notifications");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Title */}
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* User Info */}
          <div className="hidden sm:flex items-center gap-3 bg-white/10 px-3 py-2 rounded-xl border border-white/20">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">
                {name?.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <p className="text-xs text-white/70 capitalize">
                {role}
              </p>
              <p className="text-sm font-medium">{name}</p>
            </div>
          </div>

          {/* 🔔 Notification Bell */}
          <div
            onClick={handleNotificationClick}
            className="relative cursor-pointer group"
          >
            <div className="p-2 rounded-lg hover:bg-white/20 transition">
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a6 6 0 00-6 6v3l-2 2v1h16v-1l-2-2V8a6 6 0 00-6-6zm0 16a2 2 0 002-2H8a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Badge */}
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow">
                {count}
              </span>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium shadow transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}