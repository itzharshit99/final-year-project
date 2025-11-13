import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">गाँव शिक्षा</h1>
              <p className="text-xs text-green-600">Village Learning</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              होम / Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              कोर्स / Courses
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              संपर्क / Contact
            </Link>
          </div>

          {/* Right Side - Auth / Profile */}
          <div className="flex space-x-3 items-center relative">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 text-sm font-medium">
                    लॉग इन / Login
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm font-medium">
                    साइन अप / Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-green-100 hover:bg-green-200 transition"
                >
                  <span className="text-xl">🧑‍💻</span>
                  <span className="text-gray-700 font-medium hidden sm:block">
                    Profile
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border border-gray-100 z-50"
                    onMouseLeave={() => setShowMenu(false)}
                  >
                    <Link
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-t-lg"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
