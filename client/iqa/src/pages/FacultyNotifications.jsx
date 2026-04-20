import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function FacultyNotifications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const res = await API.get(`/notifications/${userId}`);
      setData(res.data);
    } catch {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const formatNotification = (n) => {
    const msg = n.message || "";

    if (n.type === "announcement") {
      return {
        title: n.title || "Announcement",
        desc: msg,
        icon: "announcement",
      };
    }

    if (msg.includes("Verified")) {
      return { title: "Document Verified", desc: msg, icon: "success" };
    }

    if (msg.includes("Needs Correction")) {
      return { title: "Needs Correction", desc: msg, icon: "warning" };
    }

    if (msg.includes("Timetable")) {
      return { title: "New Timetable", desc: msg, icon: "calendar" };
    }

    if (msg.includes("Event")) {
      return { title: "New Event", desc: msg, icon: "event" };
    }

    return { title: "Notification", desc: msg, icon: "default" };
  };

  const getIcon = (type) => {
    const base = "w-6 h-6";

    switch (type) {
      case "success":
        return (
          <div className="bg-green-100 p-2 rounded-lg">
            <svg className={`${base} text-green-600`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );

      case "warning":
        return (
          <div className="bg-orange-100 p-2 rounded-lg">
            <svg className={`${base} text-orange-600`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.257 3.099c.366-.756 1.42-.756 1.786 0l6.857 14.143A1 1 0 0116.143 19H3.857a1 1 0 01-.857-1.758L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-7a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1z" />
            </svg>
          </div>
        );

      case "calendar":
        return (
          <div className="bg-indigo-100 p-2 rounded-lg">
            <svg className={`${base} text-indigo-600`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" />
            </svg>
          </div>
        );

      case "event":
        return (
          <div className="bg-pink-100 p-2 rounded-lg">
            <svg className={`${base} text-pink-600`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 9H9V5h2v6z" />
            </svg>
          </div>
        );

      case "announcement":
        return (
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className={`${base} text-blue-600`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10l16-5v10l-16-5z" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 p-2 rounded-lg">
            <svg className={`${base} text-gray-600`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3l-2 2v1h16v-1l-2-2V8a6 6 0 00-6-6z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Notifications
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-400">No notifications</p>
      ) : (
        <div className="space-y-4">
          {data.map((n) => {
            const f = formatNotification(n);

            return (
              <div
                key={n._id}
                onClick={async () => {
                  try {
                    await API.put(`/notifications/read/${n._id}`);
                    fetchData();
                  } catch {
                    toast.error("Failed to update");
                  }
                }}
                className={`flex items-start gap-4 p-4 rounded-xl border transition cursor-pointer
                  ${
                    n.read
                      ? "bg-white hover:shadow"
                      : "bg-indigo-50 border-indigo-200 shadow-sm"
                  }`}
              >
                {/* ICON */}
                {getIcon(f.icon)}

                {/* TEXT */}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {f.title}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {f.desc}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}