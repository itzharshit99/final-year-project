import React, { useState } from 'react';
import { Home, BookOpen, Users, Settings, FileText, BarChart3, Menu, X, Video, Award, GraduationCap, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Dashboard Stats Data
  const stats = [
    { 
      title: 'Total Students', 
      value: '2,847', 
      change: '+12% from last month',
      icon: Users,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Total Courses', 
      value: '45', 
      change: '+3 new courses',
      icon: BookOpen,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      title: 'Total Teachers', 
      value: '28', 
      change: '+2 this month',
      icon: GraduationCap,
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      title: 'Active Enrollments', 
      value: '5,234', 
      change: '+18% engagement',
      icon: TrendingUp,
      bgColor: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  // Recent Activity
  const recentActivity = [
    { 
      action: 'New student enrolled', 
      details: 'Rajesh Kumar joined Web Development', 
      time: '5 mins ago',
      icon: Users,
      color: 'text-blue-600'
    },
    { 
      action: 'Course published', 
      details: 'Digital Marketing course is now live', 
      time: '1 hour ago',
      icon: BookOpen,
      color: 'text-green-600'
    },
    { 
      action: 'New teacher added', 
      details: 'Priya Sharma joined as Math teacher', 
      time: '2 hours ago',
      icon: GraduationCap,
      color: 'text-purple-600'
    },
    { 
      action: 'Certificate issued', 
      details: '15 students completed English Speaking', 
      time: '3 hours ago',
      icon: Award,
      color: 'text-orange-600'
    },
  ];

  // Top Courses
  const topCourses = [
    { name: 'Web Development', students: 450, completion: 78 },
    { name: 'Digital Marketing', students: 380, completion: 65 },
    { name: 'English Speaking', students: 520, completion: 85 },
    { name: 'Basic Computer', students: 290, completion: 72 },
  ];

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/course' },
    { icon: Video, label: 'Videos', path: '/videos' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: GraduationCap, label: 'Teachers', path: '/teachers' },
    { icon: Award, label: 'Certificates', path: '/certificates' },
    { icon: FileText, label: 'Content', path: '/content' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 ease-in-out shadow-xl fixed left-0 top-0 h-screen z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-500">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <BookOpen className="text-indigo-600" size={24} />
              </div>
              <span className="font-bold text-xl">Village Edu</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-8 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  navigate(item.path);
                }}
                
                className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'text-indigo-100 hover:bg-indigo-700'
                }`}
              >
                <Icon size={22} className="flex-shrink-0" />
                {isOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-500">
            <div className="flex items-center space-x-3 px-4 py-3 bg-indigo-700 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-indigo-200">admin@villageedu.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Dashboard Content */}
      <div className={`flex-1 ${isOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your village education platform.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.lightBg} p-3 rounded-lg`}>
                      <Icon className={stat.textColor} size={24} />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                <Clock className="text-gray-400" size={20} />
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                      <div className={`${activity.color} p-2 rounded-lg bg-gray-50`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Courses */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Top Courses</h2>
                <TrendingUp className="text-gray-400" size={20} />
              </div>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="pb-4 border-b last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-800">{course.name}</h3>
                      <span className="text-sm text-gray-600">{course.students} students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{course.completion}% completion rate</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-indigo-600 text-white rounded-xl p-6 hover:bg-indigo-700 transition-colors shadow-md">
              <BookOpen size={32} className="mb-3" />
              <h3 className="text-lg font-semibold mb-1">Add New Course</h3>
              <p className="text-sm text-indigo-100">Create and publish courses</p>
            </button>
            <button className="bg-green-600 text-white rounded-xl p-6 hover:bg-green-700 transition-colors shadow-md">
              <Users size={32} className="mb-3" />
              <h3 className="text-lg font-semibold mb-1">Manage Students</h3>
              <p className="text-sm text-green-100">View and manage enrollments</p>
            </button>
            <button className="bg-purple-600 text-white rounded-xl p-6 hover:bg-purple-700 transition-colors shadow-md">
              <BarChart3 size={32} className="mb-3" />
              <h3 className="text-lg font-semibold mb-1">View Analytics</h3>
              <p className="text-sm text-purple-100">Track platform performance</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;