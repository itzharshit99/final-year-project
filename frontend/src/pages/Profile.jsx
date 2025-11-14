import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, MapPin, School, BookOpen, Users, Edit, GraduationCap } from 'lucide-react';
import {Link} from "react-router-dom"
export default function Profile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please login.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/api/student/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }

      const data = await response.json();
      
      if (data.student) {
        setStudent(data.student);
      } else {
        setError('Unable to fetch student details');
      }
    } catch (err) {
      setError('Failed to load profile data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-2 border-red-400">
          <p className="text-red-600 text-center font-medium">{error}</p>
          <button 
            onClick={fetchStudentData}
            className="mt-4 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!student) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Header */}
      

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Hero Card */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl p-1 shadow-2xl mb-6">
          <div className="bg-white rounded-3xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-gray-800" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-gray-600 text-lg mb-3">कक्षा / Class {student.currentClass}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {student.school}
                  </span>
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {student.medium} Medium
                  </span>
                </div>
              </div>

              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all flex items-center gap-2 shadow-lg">
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-400">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">व्यक्तिगत जानकारी / Personal Info</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <User className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">पिता का नाम / Father's Name</p>
                  <p className="font-semibold text-gray-800">{student.fathersName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <User className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">माता का नाम / Mother's Name</p>
                  <p className="font-semibold text-gray-800">{student.mothersName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">जन्म तिथि / Date of Birth</p>
                  <p className="font-semibold text-gray-800">{formatDate(student.dateOfBirth)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                <User className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">लिंग / Gender</p>
                  <p className="font-semibold text-gray-800 capitalize">{student.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-400">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">संपर्क जानकारी / Contact Info</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <Mail className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600">ईमेल / Email</p>
                  <p className="font-semibold text-gray-800 break-all">{student.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">मोबाइल / Mobile</p>
                  <p className="font-semibold text-gray-800">{student.mobile}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <School className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">विद्यालय / School</p>
                  <p className="font-semibold text-gray-800">{student.school}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                <BookOpen className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">माध्यम / Medium</p>
                  <p className="font-semibold text-gray-800">{student.medium}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="mt-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-1 shadow-xl">
          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">स्थान विवरण / Location Details</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">राज्य / State</p>
                <p className="font-bold text-gray-800">{student.state}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">शहर / City</p>
                <p className="font-bold text-gray-800">{student.city}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">पिनकोड / Pincode</p>
                <p className="font-bold text-gray-800">{student.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Link to='/my-courses' className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl font-bold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg text-lg">
            📚 मेरे कोर्स / My Courses
          </Link>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg text-lg">
            🎯 प्रगति देखें / View Progress
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            सदस्य बने / Member since: <span className="font-semibold">{formatDate(student.createdAt)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}