import { useState } from "react";
import { createTimetable } from "../services/api";
import toast from "react-hot-toast";

export default function AdminTimetable() {
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!department.trim() || !semester.trim() || !fileUrl.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createTimetable({
        department,
        semester,
        fileUrl,
      });

      toast.success("Timetable uploaded successfully");

      setDepartment("");
      setSemester("");
      setFileUrl("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload timetable");
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
                d="M9 17v-6h13M9 7V3H4v4h5zm0 0v10m0-10h13"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Upload Timetable
          </h2>
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Department
          </label>
          <input
            type="text"
            placeholder="e.g. CSE"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Semester */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Semester
          </label>
          <input
            type="number"
            placeholder="e.g. 1, 2, 3..."
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm"
          />
        </div>

        {/* File URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            File URL
          </label>
          <input
            type="text"
            placeholder="Paste file link (temporary)"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            !department.trim() ||
            !semester.trim() ||
            !fileUrl.trim()
          }
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white transition
            ${
              loading ||
              !department.trim() ||
              !semester.trim() ||
              !fileUrl.trim()
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
              Uploading...
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v-9m0 0l-3 3m3-3l3 3"
                />
              </svg>
              Upload Timetable
            </>
          )}
        </button>
      </div>
    </div>
  );
}