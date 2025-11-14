import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Star, Play, FileText, ArrowLeft, Award, TrendingUp } from 'lucide-react';
import api from '../api/axios.js';

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
        setCourses(response.data.courses || []);
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
                <p className="text-3xl font-bold text-gray-800">
                  {courses.reduce((acc, c) => acc + (c.lessons?.length || 0), 0)}
                </p>
              </div>
              <Play className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">औसत रेटिंग</p>
                <p className="text-3xl font-bold text-gray-800">
                  {courses.length > 0 
                    ? (courses.reduce((acc, c) => acc + (c.rating || 0), 0) / courses.length).toFixed(1)
                    : '0.0'
                  }
                </p>
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
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => handleCourseClick(course)}
              >
                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-green-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-white/30" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                    {course.class}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    {course.category.name}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="font-medium">शिक्षक:</span>
                    <span className="ml-2">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Play size={16} className="mr-1 text-green-600" />
                      <span>{course.lessons?.length || 0} लेसन</span>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="mr-1 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{course.rating}</span>
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

                  <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all">
                    जारी रखें
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
