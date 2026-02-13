import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function AuditorReview() {
  const { facultyId } = useParams();
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    API.get(`/auditor/review/${facultyId}`).then(res => {
      if (res.data) {
        setRemarks(res.data.remarks || "");
        setStatus(res.data.status || "Pending");
      }
    });
  }, [facultyId]);

  const submitReview = async () => {
    await API.post(`/auditor/review/${facultyId}`, { remarks, status });
    alert("Audit review saved");
  };

  return (
    <>
      <Navbar title="Audit Review" />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">

          <h2 className="text-xl font-semibold mb-4">Auditor Remarks</h2>

          <textarea
            className="input h-28"
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <select
            className="input mt-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Needs Correction</option>
          </select>

          <button
            onClick={submitReview}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save Review
          </button>

        </div>
      </div>
    </>
  );
}
