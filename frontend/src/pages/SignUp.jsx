import React, { useState } from 'react'
import api from "../api/axios.js";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fathersName: '',
    mothersName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    state: '',
    city: '',
    pincode: '',
    currentClass: '',
    school: '',
    medium: '',
    termsAccepted: false
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await api.post("/api/student/register", formData);
      console.log("✅ Registration successful:", response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const states = [
    'आंध्र प्रदेश / Andhra Pradesh', 'अरुणाचल प्रदेश / Arunachal Pradesh', 'असम / Assam', 'बिहार / Bihar',
    'छत्तीसगढ़ / Chhattisgarh', 'गोवा / Goa', 'गुजरात / Gujarat', 'हरियाणा / Haryana',
    'हिमाचल प्रदेश / Himachal Pradesh', 'झारखंड / Jharkhand', 'कर्नाटक / Karnataka', 'केरल / Kerala',
    'मध्य प्रदेश / Madhya Pradesh', 'महाराष्ट्र / Maharashtra', 'मणिपुर / Manipur', 'मेघालय / Meghalaya',
    'मिजोरम / Mizoram', 'नगालैंड / Nagaland', 'ओडिशा / Odisha', 'पंजाब / Punjab',
    'राजस्थान / Rajasthan', 'सिक्किम / Sikkim', 'तमिलनाडु / Tamil Nadu', 'तेलंगाना / Telangana',
    'त्रिपुरा / Tripura', 'उत्तर प्रदेश / Uttar Pradesh', 'उत्तराखंड / Uttarakhand', 'पश्चिम बंगाल / West Bengal'
  ]

  const classes = [
    '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'
  ]

  const mediums = ['हिंदी / Hindi', 'English', 'उर्दू / Urdu', 'Other']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 py-8 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-25 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-orange-200 rounded-full opacity-20 animate-bounce delay-700"></div>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-30"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="text-4xl font-bold text-green-800 mb-2 relative z-10">
              गाँव शिक्षा
            </h1>
            <div className="text-xl text-green-600 font-medium">Village Learning</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 mt-3 text-sm">
            "शिक्षा से सपनों को पंख दें" <br />
            <span className="text-xs">Give wings to dreams through education</span>
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              चरण {currentStep} का {totalSteps} / Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-8 relative overflow-hidden">
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
              नया खाता बनाएं
              <div className="text-sm font-normal text-gray-500 mt-1">Create New Account</div>
            </h2>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                  <span className="mr-2">👤</span>
                  व्यक्तिगत जानकारी / Personal Information
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      पहला नाम / First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="अपना पहला नाम दर्ज करें"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      अंतिम नाम / Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="अपना अंतिम नाम दर्ज करें"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      पिता का नाम / Father's Name *
                    </label>
                    <input
                      type="text"
                      name="fathersName"
                      value={formData.fathersName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="पिता का नाम दर्ज करें"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      माता का नाम / Mother's Name *
                    </label>
                    <input
                      type="text"
                      name="mothersName"
                      value={formData.mothersName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="माता का नाम दर्ज करें"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      जन्म तिथि / Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      लिंग / Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      required
                    >
                      <option value="">चुनें / Select</option>
                      <option value="male">पुरुष / Male</option>
                      <option value="female">महिला / Female</option>
                      <option value="other">अन्य / Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact & Location */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  संपर्क और पता / Contact & Address
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📧 ईमेल / Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="अपना ईमेल दर्ज करें"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📱 मोबाइल नंबर / Mobile *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="10 अंकीय मोबाइल नंबर"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📮 पिनकोड / Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="6 अंकीय पिनकोड"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      राज्य / State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      required
                    >
                      <option value="">राज्य चुनें / Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      शहर / City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="अपना शहर दर्ज करें"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Academic & Security */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                  <span className="mr-2">🎓</span>
                  शैक्षणिक जानकारी और सुरक्षा / Academic & Security
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      कक्षा / Class *
                    </label>
                    <select
                      name="currentClass"
                      value={formData.currentClass}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      required
                    >
                      <option value="">कक्षा चुनें / Select Class</option>
                      {classes.map((cls, index) => (
                        <option key={index} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      माध्यम / Medium *
                    </label>
                    <select
                      name="medium"
                      value={formData.medium}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      required
                    >
                      <option value="">माध्यम चुनें / Select Medium</option>
                      {mediums.map((medium, index) => (
                        <option key={index} value={medium}>{medium}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      स्कूल का नाम / School Name
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="अपने स्कूल का नाम दर्ज करें"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🔐 पासवर्ड / Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="मजबूत पासवर्ड बनाएं"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🔐 पासवर्ड पुष्टि / Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="पासवर्ड दोबारा दर्ज करें"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500 mt-1"
                    required
                  />
                  <div className="text-sm text-gray-700 leading-relaxed">
                    मैं <span className="font-semibold text-green-700">नियम और शर्तों</span> से सहमत हूं और <span className="font-semibold text-green-700">गोपनीयता नीति</span> को स्वीकार करता/करती हूं।
                    <br />
                    <span className="text-xs text-gray-500">
                      I agree to the Terms & Conditions and accept the Privacy Policy.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                >
                  ← पिछला / Previous
                </button>
              )}
              
              <div className="flex-1"></div>

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-medium"
                >
                  अगला / Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    🚀 खाता बनाएं / Create Account
                  </span>
                </button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                पहले से खाता है? / Already have an account?{' '}
                <a href="#" className="text-green-600 hover:text-green-800 font-semibold transition-colors">
                  लॉग इन करें / Login
                </a>
              </p>
            </div>

            {/* Footer Message */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                🌟 आपका भविष्य, हमारा मिशन 🌟<br />
                <span className="text-green-600">Your future, our mission</span>
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

export default SignUp