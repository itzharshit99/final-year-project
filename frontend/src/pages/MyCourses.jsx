import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Star, Play, FileText, ArrowLeft, Award, TrendingUp, Users } from 'lucide-react';
import api from '../api/axios.js';
import VideoPlayer from '../components/VideoPlayer .jsx';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('कृपया लॉगिन करें 🙏');
        setLoading(false);
        return;
      }

      const response = await api.get('/api/enroll/my-courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Filter out null/undefined courses
        const validCourses = (response.data.courses || []).filter(course => course != null);
        setCourses(validCourses);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('कोर्स लोड करने में समस्या आई 😕');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
          <button 
            onClick={fetchMyCourses}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold"
          >
            फिर से कोशिश करें
          </button>
        </div>
      </div>
    );
  }

  // If course is selected, show course detail
  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBack={handleBack} />;
  }

  // Calculate stats safely - filter null and check for lessons
  const totalLessons = courses.reduce((acc, course) => {
    if (!course) return acc;
    return acc + (Array.isArray(course.lessons) ? course.lessons.length : 0);
  }, 0);

  const averageRating = courses.length > 0 
    ? (courses.reduce((acc, course) => acc + ((course && course.rating) || 0), 0) / courses.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">📚 मेरे कोर्स</h1>
          <p className="text-xl text-blue-100">
            आपके सभी नामांकित कोर्स एक जगह
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">कुल कोर्स</p>
                <p className="text-3xl font-bold text-gray-800">{courses.length}</p>
              </div>
              <BookOpen className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">कुल लेसन</p>
                <p className="text-3xl font-bold text-gray-800">{totalLessons}</p>
              </div>
              <Play className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">औसत रेटिंग</p>
                <p className="text-3xl font-bold text-gray-800">{averageRating}</p>
              </div>
              <Star className="text-yellow-600 fill-yellow-600" size={40} />
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              कोई कोर्स नहीं मिला
            </h3>
            <p className="text-gray-600 mb-6">
              आपने अभी तक कोई कोर्स में नामांकन नहीं किया है
            </p>
            <button 
              onClick={() => window.location.href = '/courses'}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold"
            >
              कोर्स देखें
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              if (!course) return null;
              
              return (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-green-400">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white/30" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                      {course.class || 'N/A'}
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                      {course.category?.name || 'General'}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title || 'Untitled Course'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description || 'No description available'}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span className="font-medium">शिक्षक:</span>
                      <span className="ml-2">{course.instructor || 'N/A'}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Play size={16} className="mr-1 text-green-600" />
                        <span>{Array.isArray(course.lessons) ? course.lessons.length : 0} लेसन</span>
                      </div>
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold">{course.rating || '0.0'}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>प्रगति</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full" style={{width: '0%'}}></div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleCourseClick(course)}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all"
                    >
                      जारी रखें
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// 🆕 Course Detail Component (same as Courses.jsx)
const CourseDetail = ({ course, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>वापस जाएं</span>
          </button>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={
                course.image ||
                "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?w=400&h=250&fit=crop"
              }
              alt={course.title}
              className="w-full md:w-80 h-48 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-3">
                {course.class}
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{course.studentsEnrolled || 0} छात्रों ने ज्वाइन किया</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-yellow-300 text-yellow-300" />
                  <span>{course.rating || '0.0'} रेटिंग</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{course.lessons?.length || 0} लेसन</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 font-medium border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                विवरण
              </button>
              <button
                onClick={() => setActiveTab("lessons")}
                className={`py-4 font-medium border-b-2 transition-colors ${
                  activeTab === "lessons"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                पाठ्यक्रम
              </button>
              <button
                onClick={() => setActiveTab("instructor")}
                className={`py-4 font-medium border-b-2 transition-colors ${
                  activeTab === "instructor"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                शिक्षक
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  कोर्स के बारे में
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.description}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      🎯 आप क्या सीखेंगे
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• विषय की पूरी समझ</li>
                      <li>• व्यावहारिक उदाहरण</li>
                      <li>• अभ्यास प्रश्न</li>
                      <li>• परीक्षा की तैयारी</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      📚 कोर्स की जानकारी
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• स्तर: {course.class}</li>
                      <li>• भाषा: हिंदी</li>
                      <li>• कुल लेसन: {course.lessons?.length || 0}</li>
                      <li>• सर्टिफिकेट: हां</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "lessons" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  पाठ्यक्रम
                </h2>

                {course.lessons && course.lessons.length > 0 ? (
                  course.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="mb-10 bg-gray-50 p-5 rounded-xl shadow"
                    >
                      <h3 className="text-xl font-semibold mb-3">
                        {lesson.title || `लेसन ${index + 1}`}
                      </h3>

                      {/* VIDEO PLAYER */}
                      <VideoPlayer videoUrl={lesson.videoUrl} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-8">कोई लेसन उपलब्ध नहीं है</p>
                )}
              </div>
            )}

            {activeTab === "instructor" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  आपके शिक्षक
                </h2>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {course.instructor?.charAt(0) || "T"}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {course.instructor || "शिक्षक"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      अनुभवी शिक्षक | {course.category?.nameEn || "विशेषज्ञ"}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      10+ वर्षों के शिक्षण अनुभव के साथ, हमारे शिक्षक गाँव के
                      विद्यार्थियों को गुणवत्तापूर्ण शिक्षा प्रदान करने में
                      विश्वास रखते हैं। सरल भाषा और व्यावहारिक उदाहरणों के साथ
                      पढ़ाने की उनकी अनूठी शैली छात्रों को विषय को आसानी से
                      समझने में मदद करती है।
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};