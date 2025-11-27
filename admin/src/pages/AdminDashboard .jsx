import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Users,
  Settings,
  FileText,
  BarChart3,
  Menu,
  X,
  Video,
  Award,
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import AdminLayout from "../layout/AdminLayout";

const AdminDashboard = () => {
  // Dashboard Stats Data
  const stats = [
    {
      title: "Total Students",
      titleHi: "कुल छात्र",
      value: "2,847",
      change: "+12% from last month",
      icon: Users,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Courses",
      titleHi: "कुल पाठ्यक्रम",
      value: "45",
      change: "+3 new courses",
      icon: BookOpen,
      bgColor: "bg-blue-500",
    },
    {
      title: "Total Teachers",
      titleHi: "कुल शिक्षक",
      value: "28",
      change: "+2 this month",
      icon: GraduationCap,
      bgColor: "bg-purple-500",
    },
    {
      title: "Active Enrollments",
      titleHi: "सक्रिय नामांकन",
      value: "5,234",
      change: "+18% engagement",
      icon: TrendingUp,
      bgColor: "bg-orange-500",
    },
  ];

  // Recent Activity
  const recentActivity = [
    {
      action: "New student enrolled",
      details: "Rajesh Kumar joined Web Development",
      time: "5 mins ago",
      icon: Users,
      color: "bg-green-50 text-green-600",
    },
    {
      action: "Course published",
      details: "Digital Marketing course is now live",
      time: "1 hour ago",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      action: "New teacher added",
      details: "Priya Sharma joined as Math teacher",
      time: "2 hours ago",
      icon: GraduationCap,
      color: "bg-purple-50 text-purple-600",
    },
    {
      action: "Certificate issued",
      details: "15 students completed English Speaking",
      time: "3 hours ago",
      icon: Award,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  // Top Courses
  const topCourses = [
    {
      name: "Web Development",
      nameHi: "वेब डेवलपमेंट",
      students: 450,
      completion: 78,
      color: "bg-green-500",
    },
    {
      name: "Digital Marketing",
      nameHi: "डिजिटल मार्केटिंग",
      students: 380,
      completion: 65,
      color: "bg-blue-500",
    },
    {
      name: "English Speaking",
      nameHi: "अंग्रेजी बोलना",
      students: 520,
      completion: 85,
      color: "bg-purple-500",
    },
    {
      name: "Basic Computer",
      nameHi: "बेसिक कंप्यूटर",
      students: 290,
      completion: 72,
      color: "bg-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here's what's happening with your village education
            platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{stat.titleHi}</p>
                    <h3 className="text-sm font-medium text-gray-700">
                      {stat.title}
                    </h3>
                  </div>
                  <div
                    className={`${stat.bgColor} bg-opacity-10 p-2 rounded-lg`}
                  >
                    <Icon
                      className={`${stat.bgColor.replace("bg-", "text-")}`}
                      size={18}
                    />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h2>
              <Clock className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-3 pb-4 border-b last:border-b-0 border-gray-100"
                  >
                    <div className={`${activity.color} p-2 rounded-lg`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {activity.details}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Courses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Top Courses
              </h2>
              <TrendingUp className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div
                  key={index}
                  className="pb-4 border-b last:border-b-0 border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">
                        {course.name}
                      </h3>
                      <p className="text-xs text-gray-500">{course.nameHi}</p>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {course.students} students
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`${course.color} h-1.5 rounded-full transition-all duration-300`}
                      style={{ width: `${course.completion}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {course.completion}% completion rate
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-5 hover:shadow-md transition-all text-left">
            <BookOpen size={24} className="mb-2" />
            <h3 className="text-base font-semibold mb-1">Add New Course</h3>
            <p className="text-xs text-green-50">Create and publish courses</p>
          </button>
          <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-5 hover:shadow-md transition-all text-left">
            <Users size={24} className="mb-2" />
            <h3 className="text-base font-semibold mb-1">Manage Students</h3>
            <p className="text-xs text-blue-50">View and manage enrollments</p>
          </button>
          <button className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-5 hover:shadow-md transition-all text-left">
            <BarChart3 size={24} className="mb-2" />
            <h3 className="text-base font-semibold mb-1">View Analytics</h3>
            <p className="text-xs text-purple-50">Track platform performance</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
