import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CourseExitSurvey from "./pages/CourseExitSurvey";
import FacultyDashboard from "./pages/FacultyDashboard";
import AuditorDashboard from "./pages/AuditorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterUser from "./pages/RegisterUser";
import AdminUsers from "./pages/AdminUsers";
import PersonalFile from "./pages/PersonalFile";
import FacultyInfoForm from "./pages/FacultyInfoForm";
import FacultyDetails from "./pages/FacultyDetails";
import AuditorReview from "./pages/AuditorReview";
import SemesterAuditForm from "./pages/SemesterAuditForm";





function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/auditor" element={<AuditorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<RegisterUser />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/survey/course-exit" element={<CourseExitSurvey />} />
        <Route path="/faculty/personal-file" element={<PersonalFile />} />
        <Route path="/faculty/faculty-info" element={<FacultyInfoForm />} />
        <Route path="/admin/faculty/:id" element={<FacultyDetails />} />

<Route path="/auditor" element={<AuditorDashboard />} />
<Route path="/auditor/review/:facultyId" element={<AuditorReview />} />

        <Route
  path="/faculty/audit/odd"
  element={<SemesterAuditForm semesterType="ODD" />}
/>

<Route
  path="/faculty/audit/even"
  element={<SemesterAuditForm semesterType="EVEN" />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
