import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">
                गाँव शिक्षा
              </h1>
              <p className="text-xs text-green-600">Village Learning</p>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
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

          {/* Auth Buttons */}
          <div className="flex space-x-3">
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar