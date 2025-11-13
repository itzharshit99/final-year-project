import React from "react";
import Login from "./pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./utils/isProtected.jsx";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();
  const hiddenNavbarFooter =
    location.pathname === "/login" || location.pathname === "/sign-up";
  return (
    <div>
      {!hiddenNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/courses"
          element={<ProtectedRoute element={<Courses />} />}
        />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      {!hiddenNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
