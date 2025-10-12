import React, { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-25 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-orange-200 rounded-full opacity-20 animate-bounce delay-700"></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-30"></div>
      </div>

      {/* Main Login Container */}
      <div className="relative w-full max-w-md">
        {/* Village Scene Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="text-4xl font-bold text-green-800 mb-2 relative z-10">
              गाँव शिक्षा
            </h1>
            <div className="text-xl text-green-600 font-medium">Village Learning</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 mt-3 text-sm">
            "ज्ञान से रोशनी, शिक्षा से उन्नति" <br />
            <span className="text-xs">Knowledge brings light, Education brings progress</span>
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-8 relative overflow-hidden">
          {/* Card Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50 rounded-3xl"></div>
          
          {/* Village Icons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🌾</span>
            </div>
            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📚</span>
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              अपने खाते में लॉग इन करें
              <div className="text-sm font-normal text-gray-500 mt-1">Login to your account</div>
            </h2>

            <div className="space-y-5">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 ईमेल / Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="अपना ईमेल दर्ज करें / Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔐 पासवर्ड / Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="अपना पासवर्ड दर्ज करें / Enter password"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-2 border-green-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-600">मुझे याद रखें / Remember me</span>
                </label>
                <a href="#" className="text-green-600 hover:text-green-800 font-medium transition-colors">
                  पासवर्ड भूल गए? / Forgot?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  🚀 लॉग इन करें / Login
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">या / OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-3">
                <span className="text-xl">📱</span>
                <span>मोबाइल नंबर से / Login with Mobile</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                नया खाता बनाएं? / Don't have an account?{' '}
                <a href="#" className="text-green-600 hover:text-green-800 font-semibold transition-colors">
                  साइन अप करें / Sign up
                </a>
              </p>
            </div>

            {/* Footer Message */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                🌟 हर गाँव में शिक्षा, हर बच्चे में उम्मीद 🌟<br />
                <span className="text-green-600">Education in every village, hope in every child</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center mt-6 space-x-4 opacity-60">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-600"></div>
        </div>
      </div>
    </div>
  )
}

export default Login