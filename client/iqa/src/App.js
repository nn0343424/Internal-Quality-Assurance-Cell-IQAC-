import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CourseExitSurvey from "./pages/CourseExitSurvey";

import FacultyDashboard from "./pages/FacultyDashboard";
import AuditorDashboard from "./pages/AuditorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import RegisterUser from "./pages/RegisterUser";
import AdminUsers from "./pages/AdminUsers";
import FacultyDetails from "./pages/FacultyDetails";

import PersonalFile from "./pages/PersonalFile";
import FacultyInfoForm from "./pages/FacultyInfoForm";

import AuditorReview from "./pages/AuditorReview";
import SemesterAuditForm from "./pages/SemesterAuditForm";

import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminCalendar from "./pages/AdminCalendar";
import AdminTimetable from "./pages/AdminTimetable";
import AdminEvents from "./pages/AdminEvents";
import AdminReports from "./pages/AdminReports";

import FacultyNotifications from "./pages/FacultyNotifications";

export default function App() {
  return (
    <BrowserRouter>

      {/* ✅ Toast container MUST be here */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>

        {/* ========= PUBLIC ========= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ========= FACULTY ========= */}
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/semester-audit" element={<SemesterAuditForm />} />
        <Route path="/faculty/personal-file" element={<PersonalFile />} />
        <Route path="/faculty/faculty-info" element={<FacultyInfoForm />} />
        <Route path="/faculty-notifications" element={<FacultyNotifications />} />

        {/* ========= AUDITOR ========= */}
        <Route path="/auditor" element={<AuditorDashboard />} />
        <Route path="/auditor-review" element={<AuditorReview />} />
        <Route path="/auditor/review/:facultyId" element={<AuditorReview />} />

        {/* ========= ADMIN ========= */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<RegisterUser />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/faculty/:id" element={<FacultyDetails />} />

        <Route path="/admin-announcements" element={<AdminAnnouncements />} />
        <Route path="/admin-calendar" element={<AdminCalendar />} />
        <Route path="/admin-timetable" element={<AdminTimetable />} />
        <Route path="/admin-events" element={<AdminEvents />} />
        <Route path="/admin-reports" element={<AdminReports />} />

        {/* ========= SURVEY ========= */}
        <Route path="/survey/course-exit" element={<CourseExitSurvey />} />

      </Routes>
    </BrowserRouter>
  );
}