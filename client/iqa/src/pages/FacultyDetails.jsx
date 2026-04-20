import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function FacultyDetails() {
  const { id } = useParams();

  const [info, setInfo] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      setLoading(true);

      const [infoRes, personalRes] = await Promise.all([
        API.get(`/admin/faculty/${id}/info`),
        API.get(`/admin/faculty/${id}/personal`)
      ]);

      setInfo(infoRes.data);
      setPersonal(personalRes.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load faculty details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="Faculty Details" />

      <div className="p-6 bg-gray-100 min-h-screen">

        {loading ? (
          <div className="text-center py-20 text-gray-600">
            Loading faculty details...
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Faculty Info */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Faculty Information
              </h2>

              {info ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <Info label="Designation" value={info.designation} />
                  <Info label="Department" value={info.department} />
                  <Info label="Appointment Type" value={info.appointmentType} />
                  <Info label="Courses Handled" value={info.coursesHandled} />
                </div>
              ) : (
                <Empty message="Faculty info not submitted" />
              )}
            </div>

            {/* Personal File */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Personal File
              </h2>

              {personal ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <Info label="Qualification" value={personal.highestQualification} />
                  <Info label="Specialization" value={personal.specialization} />
                  <Info
                    label="Teaching Experience"
                    value={`${personal.teachingExperience || 0} years`}
                  />
                  <Info
                    label="Publications"
                    value={personal.publicationsCount || 0}
                  />
                </div>
              ) : (
                <Empty message="Personal file not submitted" />
              )}
            </div>

          </div>
        )}

      </div>
    </>
  );
}

/* 🔹 Reusable Components */

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="text-gray-500 text-sm text-center py-6">
      {message}
    </div>
  );
}