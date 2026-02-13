import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function FacultyDashboard() {
  return (
    <>
      <Navbar title="Faculty Dashboard" />

      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">
            Welcome, Faculty
          </h2>
          <p className="text-gray-600 mb-6">
            Complete and track your IQAC audit activities below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Link to="/faculty/faculty-info " className="card bg-blue-50">
              <h3 className="text-lg font-semibold mb-1">Faculty Info</h3>
              <p className="text-sm text-gray-600">
                Basic academic and course details
              </p>
            </Link>

            <Link to="/faculty/audit/odd" className="card bg-green-50 border-l-4 border-green-600">
              <h3 className="text-lg font-semibold mb-1">ODD Semester Audit</h3>
              <p className="text-sm text-gray-600">Fill ODD semester details</p>
            </Link>

            <Link to="/faculty/audit/even" className="card bg-yellow-50">
              <h3 className="text-lg font-semibold mb-1">EVEN Semester Audit</h3>
              <p className="text-sm text-gray-600">Fill EVEN semester details</p>
            </Link>

            <Link to="/faculty/personal-file" className="card bg-purple-50">
              <h3 className="text-lg font-semibold mb-1">Personal File</h3>
              <p className="text-sm text-gray-600">
                Qualification and experience
              </p>
            </Link>

          
          </div>
        </div>
      </div>
<Footer />
    </>
  );
}
