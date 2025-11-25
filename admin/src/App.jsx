import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard ";
import HomePage from "./pages/HomePage";
import AddCourse from "./pages/AddCourse";
import ProtectedRoute from "./utils/ProtectedRoute";
import AllCourses from "./pages/AllCourses";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/course" element={<AddCourse />} />
        <Route path="/all-course" element={<AllCourses/>} />
      </Routes>
    </div>
  );
};

export default App;
