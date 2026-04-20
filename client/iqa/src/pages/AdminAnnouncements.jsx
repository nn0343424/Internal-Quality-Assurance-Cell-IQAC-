import { useState } from "react";
import { createAnnouncement } from "../services/api";
import toast from "react-hot-toast";

export default function AdminAnnouncements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createAnnouncement({ title, message });

      toast.success("Announcement created successfully");

      setTitle("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 10c0 3.866-3.582 7-8 7a8.978 8.978 0 01-4-.9L3 17l1.1-3.3A6.978 6.978 0 013 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Create Announcement
          </h2>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter announcement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm resize-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !title.trim() || !message.trim()}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white transition
            ${
              loading || !title.trim() || !message.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                  opacity="0.25"
                />
                <path
                  d="M22 12a10 10 0 00-10-10"
                  stroke="white"
                  strokeWidth="4"
                />
              </svg>
              Publishing...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Publish Announcement
            </>
          )}
        </button>
      </div>
    </div>
  );
}