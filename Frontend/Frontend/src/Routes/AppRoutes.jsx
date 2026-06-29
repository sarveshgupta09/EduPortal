import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import StudentDashboard from "../Pages/StudentDashboard";
import TeacherDashboard from "../Pages/TeacherDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/student-dashboard" element={<StudentDashboard />} />

      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
    </Routes>
  );
};

export default AppRoutes;