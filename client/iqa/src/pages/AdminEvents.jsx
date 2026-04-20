import { useState } from "react";
import { createEvent } from "../services/api";
import toast from "react-hot-toast";

export default function AdminEvents() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !type.trim() || !date || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createEvent({ title, type, date, description });

      toast.success("Event added successfully");

      setTitle("");
      setType("");
      setDate("");
      setDescription("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add event");
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
                d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Create Event
          </h2>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Type
          </label>
          <input
            type="text"
            placeholder="Seminar / Workshop / Meeting"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Write event details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm resize-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            !title.trim() ||
            !type.trim() ||
            !date ||
            !description.trim()
          }
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white transition
            ${
              loading ||
              !title.trim() ||
              !type.trim() ||
              !date ||
              !description.trim()
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
              Adding...
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
              Add Event
            </>
          )}
        </button>
      </div>
    </div>
  );
}