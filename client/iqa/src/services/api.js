import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// ✅ TOKEN INTERCEPTOR
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= ADMIN FEATURES =================

// Announcements
export const createAnnouncement = (data) =>
  API.post("/admin/new-announcement", data);

export const getAnnouncements = () =>
  API.get("/admin/new-announcement");

// Calendar
export const createCalendar = (data) =>
  API.post("/admin/new-calendar", data);

export const getCalendar = () =>
  API.get("/students/calendar");

// Timetable
export const createTimetable = (data) =>
  API.post("/admin/new-timetable", data);

export const getTimetable = () =>
  API.get("/students/timetable");

// Events
export const createEvent = (data) =>
  API.post("/admin/new-event", data);

// Reports / Documents
export const getDocuments = (dept) =>
  API.get(`/auditor/new-documents/${dept}`);

export const getMyDocuments = (facultyId) =>
  API.get(`/faculty/my-documents/${facultyId}`);
export const getNotifications = (userId) =>
  API.get(`/notifications/${userId}`);
export const getAuditStatus = (facultyId) =>
  API.get(`/semester-audit/status/${facultyId}`);


// DEFAULT EXPORT (keep this)
export default API;