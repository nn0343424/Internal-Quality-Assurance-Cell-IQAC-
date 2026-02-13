import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function FacultyDetails() {
  const { id } = useParams();

  const [info, setInfo] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const infoRes = await API.get(`/admin/faculty/${id}/info`);
      const personalRes = await API.get(`/admin/faculty/${id}/personal`);

      setInfo(infoRes.data);
      setPersonal(personalRes.data);

    } catch (err) {
      console.error(err);
      setError("Unable to load faculty details. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  fetchDetails();
}, [id]);

  if (loading) {
    return (
      <>
        <Navbar title="Faculty Details" />
        <div className="p-8 text-center">Loading faculty details...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar title="Faculty Details" />
        <div className="p-8 text-center text-red-600">{error}</div>
      </>
    );
  }

  return (
    <>
      <Navbar title="Faculty Details" />

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded shadow space-y-6">

          <div>
            <h2 className="text-xl font-semibold mb-2">Faculty Info</h2>
            {info ? (
              <>
                <p><b>Designation:</b> {info.designation || "-"}</p>
                <p><b>Department:</b> {info.department || "-"}</p>
                <p><b>Appointment:</b> {info.appointmentType || "-"}</p>
                <p><b>Courses:</b> {info.coursesHandled || "-"}</p>
              </>
            ) : (
              <p className="text-gray-500">Faculty info not submitted.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Personal File</h2>
            {personal ? (
              <>
                <p><b>Qualification:</b> {personal.highestQualification || "-"}</p>
                <p><b>Specialization:</b> {personal.specialization || "-"}</p>
                <p><b>Teaching Experience:</b> {personal.teachingExperience || 0} years</p>
                <p><b>Publications:</b> {personal.publicationsCount || 0}</p>
              </>
            ) : (
              <p className="text-gray-500">Personal file not submitted.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
