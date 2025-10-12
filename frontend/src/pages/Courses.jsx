import React, { useState } from 'react'
import { BookOpen, Clock, Users, Star, Search, Filter } from 'lucide-react'

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'सभी कोर्स', nameEn: 'All Courses' },
    { id: 'hindi', name: 'हिंदी', nameEn: 'Hindi' },
    { id: 'english', name: 'अंग्रेज़ी', nameEn: 'English' },
    { id: 'math', name: 'गणित', nameEn: 'Mathematics' },
    { id: 'science', name: 'विज्ञान', nameEn: 'Science' },
    { id: 'computer', name: 'कंप्यूटर', nameEn: 'Computer' }
  ]

  const courses = [
    {
      id: 1,
      title: 'बेसिक हिंदी व्याकरण',
      titleEn: 'Basic Hindi Grammar',
      category: 'hindi',
      instructor: 'राजेश शर्मा',
      students: 245,
      duration: '6 हफ्ते',
      rating: 4.8,
      level: 'शुरुआती',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      description: 'हिंदी भाषा की मूल बातें सीखें'
    },
    {
      id: 2,
      title: 'अंग्रेज़ी बोलना सीखें',
      titleEn: 'Learn English Speaking',
      category: 'english',
      instructor: 'प्रिया वर्मा',
      students: 389,
      duration: '8 हफ्ते',
      rating: 4.9,
      level: 'शुरुआती',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop',
      description: 'रोज़मर्रा की अंग्रेज़ी बोलना सीखें'
    },
    {
      id: 3,
      title: 'गणित की बुनियादी बातें',
      titleEn: 'Mathematics Fundamentals',
      category: 'math',
      instructor: 'अमित कुमार',
      students: 412,
      duration: '10 हफ्ते',
      rating: 4.7,
      level: 'मध्यम',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
      description: 'गणित के महत्वपूर्ण विषय'
    },
    {
      id: 4,
      title: 'विज्ञान के चमत्कार',
      titleEn: 'Wonders of Science',
      category: 'science',
      instructor: 'सुनीता देवी',
      students: 298,
      duration: '7 हफ्ते',
      rating: 4.6,
      level: 'शुरुआती',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop',
      description: 'विज्ञान की रोचक दुनिया'
    },
    {
      id: 5,
      title: 'कंप्यूटर बेसिक्स',
      titleEn: 'Computer Basics',
      category: 'computer',
      instructor: 'विकास पाटिल',
      students: 521,
      duration: '5 हफ्ते',
      rating: 4.9,
      level: 'शुरुआती',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop',
      description: 'कंप्यूटर चलाना सीखें'
    },
    {
      id: 6,
      title: 'उन्नत गणित',
      titleEn: 'Advanced Mathematics',
      category: 'math',
      instructor: 'डॉ. संजय मेहता',
      students: 187,
      duration: '12 हफ्ते',
      rating: 4.8,
      level: 'उन्नत',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop',
      description: 'गणित के उन्नत विषय'
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            हमारे कोर्स
          </h1>
          <p className="text-xl text-center text-blue-100">
            गाँव के विद्यार्थियों के लिए खास शिक्षा सामग्री
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
            {categories.map(category => (
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">कुल कोर्स</p>
                <p className="text-3xl font-bold text-gray-800">{courses.length}</p>
              </div>
              <BookOpen className="text-blue-600" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">कुल छात्र</p>
                <p className="text-3xl font-bold text-gray-800">2,052</p>
              </div>
              <Users className="text-green-600" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">औसत रेटिंग</p>
                <p className="text-3xl font-bold text-gray-800">4.8</p>
              </div>
              <Star className="text-yellow-600 fill-yellow-600" size={40} />
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="font-medium">शिक्षक:</span>
                  <span className="ml-2">{course.instructor}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{course.students} छात्र</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-bold text-gray-800">{course.rating}</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
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
            <p className="text-gray-500 mt-2">कृपया अन्य श्रेणी चुनें या खोज बदलें</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses