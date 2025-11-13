import React, { useState, useEffect } from 'react'
import { BookOpen, Clock, Users, Star, Search, CheckCircle } from 'lucide-react'
import api from '../api/axios.js'

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false) // 🆕
  const [popupMessage, setPopupMessage] = useState('') // 🆕

  const categories = [
    { id: 'all', name: 'सभी कोर्स', nameEn: 'All Courses' },
    { id: 'hindi', name: 'हिंदी', nameEn: 'Hindi' },
    { id: 'english', name: 'अंग्रेज़ी', nameEn: 'English' },
    { id: 'math', name: 'गणित', nameEn: 'Mathematics' },
    { id: 'science', name: 'विज्ञान', nameEn: 'Science' },
    { id: 'computer', name: 'कंप्यूटर', nameEn: 'Computer' }
  ]

  // ✅ Fetch all courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const res = await api.get('/api/course')
        setCourses(res.data.courses || [])
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // ✅ Enroll Handler
  const handleEnroll = async (courseId, courseTitle) => {
    const token = localStorage.getItem('token')
    if (!token) {
      setPopupMessage('कृपया लॉगिन करें पहले 🙏')
      setShowPopup(true)
      return
    }

    try {
      const res = await api.post(
        '/api/enroll',
        { courseId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      console.log(res)
      if (res.data.success) {
        setPopupMessage(`✅ आपने "${courseTitle}" कोर्स सफलतापूर्वक ज्वाइन किया!`)
        setShowPopup(true)
      }
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || 'कुछ गलत हो गया 😕'
      setPopupMessage(msg)
      setShowPopup(true)
    }
  }

  // ✅ Filter courses by category & search
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'all' || course.category.id === selectedCategory

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.category.nameEn &&
        course.category.nameEn.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">हमारे कोर्स</h1>
          <p className="text-xl text-blue-100">
            गाँव के विद्यार्थियों के लिए खास शिक्षा सामग्री
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="कोर्स खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 animate-pulse">लोड हो रहा है...</p>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">कुल कोर्स</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {courses.length}
                    </p>
                  </div>
                  <BookOpen className="text-blue-600" size={40} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">कुल छात्र</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {courses.reduce((acc, c) => acc + (c.studentsEnrolled || 0), 0)}
                    </p>
                  </div>
                  <Users className="text-green-600" size={40} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">औसत रेटिंग</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {(
                        courses.reduce((acc, c) => acc + (c.rating || 0), 0) /
                        (courses.length || 1)
                      ).toFixed(1)}
                    </p>
                  </div>
                  <Star className="text-yellow-600 fill-yellow-600" size={40} />
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={
                        course.image ||
                        'https://images.unsplash.com/photo-1498079022511-d15614cb1c02?w=400&h=250&fit=crop'
                      }
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                      {course.class}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span className="font-medium">शिक्षक:</span>
                      <span className="ml-2">{course.instructor}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users size={16} className="mr-1" />
                        <span>{course.studentsEnrolled} छात्र</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{course.lessons?.length || 0} लेसन</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <Star
                          size={18}
                          className="text-yellow-400 fill-yellow-400 mr-1"
                        />
                        <span className="font-bold text-gray-800">
                          {course.rating}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEnroll(course._id, course.title)} // 🆕
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        शुरू करें
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">कोई कोर्स नहीं मिला</p>
                <p className="text-gray-500 mt-2">
                  कृपया अन्य श्रेणी चुनें या खोज बदलें
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 🆕 Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center max-w-sm mx-auto shadow-lg">
            <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
            <h3 className="text-lg font-semibold mb-2">सूचना</h3>
            <p className="text-gray-700 mb-4">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ठीक है
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Courses
