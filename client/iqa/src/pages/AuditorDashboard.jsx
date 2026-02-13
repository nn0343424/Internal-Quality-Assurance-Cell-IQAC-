import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function AuditorDashboard() {
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  const [auditStatus, setAuditStatus] = useState({});


  useEffect(() => {
    API.get("/auditor/faculty").then(res => setFaculty(res.data));
  }, []);


  useEffect(() => {
  API.get("/auditor/faculty").then(async res => {
    setFaculty(res.data);

    const statusMap = {};
    for (const f of res.data) {
      const s = await API.get(`/semester-audit/status/${f._id}`);
      statusMap[f._id] = s.data;
    }
    setAuditStatus(statusMap);
  });
}, []);


  return (
    <>
      <Navbar title="Auditor Dashboard" />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Faculty to Audit</h2>

          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">ODD Audit</th>
                <th className="border p-2">EVEN Audit</th>
                <th className="border p-2">Actions</th>

              </tr>
            </thead>
            <tbody>
              {faculty.map(f => (
                <tr key={f._id}>
                  <td className="border p-2">{f.name}</td>
                  <td className="border p-2">{f.email}</td>
                  <td className="border p-2">{f.mobile || "-"}</td>
                  <td className="border p-2 text-center">
  {auditStatus[f._id]?.oddSubmitted ? (
    <span className="text-green-600 font-semibold">Submitted</span>
  ) : (
    <span className="text-red-600 font-semibold">Not Submitted</span>
  )}
</td>

<td className="border p-2 text-center">
  {auditStatus[f._id]?.evenSubmitted ? (
    <span className="text-green-600 font-semibold">Submitted</span>
  ) : (
    <span className="text-red-600 font-semibold">Not Submitted</span>
  )}
</td>

                  <td className="border p-2 flex gap-2">
                    <button
                      className="bg-indigo-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => navigate(`/admin/faculty/${f._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => navigate(`/auditor/review/${f._id}`)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}
