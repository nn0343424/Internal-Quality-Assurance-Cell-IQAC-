# Internal Quality Assurance Cell (IQAC) - Project Presentation

## 📋 Project Overview

The **IQAC System** is a comprehensive web-based platform designed to streamline quality assurance processes in educational institutions. It facilitates faculty performance tracking, semester audits, course evaluations, and administrative oversight through a role-based access system.

---

## 🎯 Project Objectives

- **Digitize Quality Assurance**: Replace manual paperwork with an automated digital system
- **Role-Based Management**: Separate interfaces for Admin, Faculty, and Auditor roles
- **Audit Tracking**: Systematic tracking of semester-wise faculty performance
- **Data Centralization**: Single source of truth for all quality assurance data
- **Transparency**: Clear audit trails and review processes

---

## 🏗️ System Architecture

### Technology Stack

**Frontend:**
- React 19.2.3
- React Router DOM 7.13.0
- Axios for API communication
- Tailwind CSS for styling

**Backend:**
- Node.js with Express 5.2.1
- MongoDB with Mongoose 9.2.1
- JWT for authentication
- Bcrypt for password hashing

**Additional Tools:**
- Multer for file uploads
- CORS for cross-origin requests
- dotenv for environment configuration

---

## 👥 User Roles & Capabilities

### 1. Admin
- Register new users (Faculty/Auditor)
- View all users in the system
- Monitor faculty details and submissions
- Oversee audit processes
- Manage system-wide settings

### 2. Faculty
- Submit personal information and profile
- Fill semester audit forms (ODD/EVEN)
- Maintain personal files
- Submit course exit surveys
- View audit status and feedback

### 3. Auditor
- Review faculty submissions
- Provide remarks and feedback
- Approve or request corrections
- Track audit completion status
- Generate audit reports

---

## 📊 Core Features

### 1. Authentication System
- Secure login with JWT tokens
- Role-based access control
- Password encryption with bcryptjs
- Session management

### 2. Faculty Information Management
- Personal details (designation, department, joining date)
- Appointment type tracking
- Courses handled documentation
- Profile update capabilities

### 3. Semester Audit System

**Checklist Items:**
- Course Plan
- Academic Calendar
- Student List
- Timetable
- Lesson Plan
- Lecture Notes
- Question Bank
- Attendance Records
- Internal Assessment

**Outcome & Analysis:**
- Course Outcomes Definition
- CO-PO Mapping
- Result Analysis
- Gap Analysis

**Review Process:**
- Faculty remarks
- Auditor remarks
- Final status (Pending/Approved/Needs Correction)

### 4. Personal File Management
- Faculty can maintain personal documentation
- Update and retrieve personal files
- Secure storage and access

### 5. Course Exit Survey
- Student feedback collection
- Course evaluation metrics
- Public access for survey submission

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: ["admin", "faculty", "auditor"],
  department: String,
  subject: String,
  mobile: String
}
```

### Faculty Info Model
```javascript
{
  facultyId: ObjectId (ref: User),
  designation: String,
  department: String,
  dateOfJoining: String,
  appointmentType: String,
  coursesHandled: String
}
```

### Semester Audit Model
```javascript
{
  facultyId: ObjectId (ref: User),
  academicYear: String,
  semesterType: ["ODD", "EVEN"],
  // Checklist fields
  coursePlan, academicCalendar, studentList, etc.
  // Outcome fields
  courseOutcomesDefined, coPoMapping, resultAnalysis, gapAnalysis
  // Review fields
  facultyRemarks, auditorRemarks,
  finalStatus: ["Pending", "Approved", "Needs Correction"]
}
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user (Admin only)
- `POST /login` - User login with credentials

### Faculty Routes (`/api/faculty`)
- `POST /info` - Submit faculty information
- `GET /info` - Retrieve faculty information
- `PUT /info` - Update faculty information
- `POST /odd` - Submit ODD semester audit
- `POST /even` - Submit EVEN semester audit
- `POST /personal` - Submit personal file
- `GET /personal` - Retrieve personal file
- `PUT /personal` - Update personal file

### Auditor Routes (`/api/auditor`)
- `GET /faculty` - Get list of all faculty
- `GET /review/:facultyId` - Get existing review for faculty
- `POST /review/:facultyId` - Create/Update review

### Admin Routes (`/api/admin`)
- User management endpoints
- System oversight functions

### Survey Routes (`/api/survey`)
- Course exit survey submission
- Survey data retrieval

### Public Routes (`/api/public`)
- Publicly accessible endpoints
- Survey forms for students

---

## 🖥️ Frontend Pages

### Public Pages
- **Home** - Landing page with system overview
- **Login** - Authentication page
- **Course Exit Survey** - Public survey form

### Faculty Pages
- **Faculty Dashboard** - Overview of submissions and status
- **Faculty Info Form** - Personal information entry
- **Personal File** - Document management
- **Semester Audit Form** - ODD/EVEN semester submissions

### Auditor Pages
- **Auditor Dashboard** - List of faculty to review
- **Auditor Review** - Review and feedback interface

### Admin Pages
- **Admin Dashboard** - System overview
- **Register User** - Create new users
- **Admin Users** - View all users
- **Faculty Details** - Detailed faculty view

---

## 🔐 Security Features

1. **Password Hashing**: All passwords encrypted with bcryptjs
2. **JWT Authentication**: Secure token-based authentication
3. **Role Middleware**: Route protection based on user roles
4. **CORS Configuration**: Controlled cross-origin access
5. **Environment Variables**: Sensitive data in .env file

---

## 📁 Project Structure

```
IQAC-Project/
├── client/
│   └── iqa/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   └── Footer.jsx
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── FacultyDashboard.jsx
│       │   │   ├── AuditorDashboard.jsx
│       │   │   ├── AdminDashboard.jsx
│       │   │   └── [other pages]
│       │   ├── services/
│       │   │   └── api.js
│       │   └── App.js
│       └── package.json
│
└── server/
    ├── config/
    │   └── db.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── roleMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── FacultyInfo.js
    │   ├── SemesterAudit.js
    │   ├── PersonalFile.js
    │   ├── AuditReview.js
    │   └── CourseExitSurvey.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── facultyRoutes.js
    │   ├── auditorRoutes.js
    │   ├── adminRoutes.js
    │   ├── surveyRoutes.js
    │   └── publicRoutes.js
    ├── uploads/
    ├── .env
    ├── server.js
    └── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup
```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
npm start
# Server runs on port 5000
```

### Frontend Setup
```bash
cd client/iqa
npm install
npm start
# Client runs on port 3000
```

---

## 🔄 Workflow Process

### Faculty Workflow
1. Login to the system
2. Complete faculty information form
3. Submit semester audit (ODD/EVEN)
4. Upload required documents
5. View audit status and feedback
6. Make corrections if needed

### Auditor Workflow
1. Login to the system
2. View list of faculty submissions
3. Review submitted audits
4. Provide remarks and feedback
5. Approve or request corrections
6. Track completion status

### Admin Workflow
1. Login to the system
2. Register new users (Faculty/Auditor)
3. Monitor all submissions
4. View faculty details
5. Oversee audit processes
6. Generate reports

---

## 📈 Key Benefits

1. **Efficiency**: Reduces manual paperwork and processing time
2. **Accountability**: Clear audit trails for all submissions
3. **Accessibility**: Web-based access from anywhere
4. **Standardization**: Consistent audit processes across departments
5. **Data Integrity**: Centralized database with validation
6. **Transparency**: Real-time status tracking for all stakeholders
7. **Scalability**: Easy to add new features and users

---

## 🎓 Use Cases

### Academic Quality Assurance
- Track faculty teaching quality
- Monitor course delivery standards
- Ensure compliance with academic norms

### Institutional Accreditation
- Maintain documentation for NAAC/NBA
- Generate audit reports for accreditation
- Demonstrate quality processes

### Performance Management
- Faculty performance evaluation
- Identify areas for improvement
- Recognize excellence in teaching

---

## 🔮 Future Enhancements

1. **Analytics Dashboard**: Visual reports and charts
2. **Email Notifications**: Automated reminders and alerts
3. **Document Versioning**: Track changes in submissions
4. **Mobile App**: Native mobile applications
5. **Advanced Search**: Filter and search capabilities
6. **Export Features**: PDF/Excel report generation
7. **Integration**: Connect with existing ERP systems
8. **AI Analysis**: Automated quality assessment

---

## 🛠️ Technical Highlights

- **RESTful API Design**: Clean and maintainable API structure
- **Middleware Architecture**: Modular authentication and authorization
- **Component-Based UI**: Reusable React components
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Error Handling**: Comprehensive error management
- **Code Organization**: Clear separation of concerns

---

## 📝 Conclusion

The IQAC System provides a robust, scalable solution for managing quality assurance processes in educational institutions. By digitizing workflows and providing role-based access, it enhances efficiency, transparency, and accountability in academic quality management.

The system is production-ready and can be deployed immediately with proper environment configuration. Its modular architecture allows for easy maintenance and future enhancements.

---

## 👨‍💻 Development Team

- Full-stack MERN application
- Modern development practices
- Secure and scalable architecture
- Ready for production deployment

---

**Thank you for your attention!**

*Questions and feedback are welcome.*
