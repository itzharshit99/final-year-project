import React, { useState, useEffect } from "react";
import axios from "axios";
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
  UserCheck,
  Loader,
} from "lucide-react";
import AdminLayout from "../layout/AdminLayout";
import api from "../api/axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      
      const response = await api.get(
        "/api/admin/dashboard/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setDashboardData(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="animate-spin text-blue-500" size={40} />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error loading dashboard: {error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const { summary, recentEnrollments } = dashboardData || {};

  // Dashboard Stats Data
  const stats = [
    {
      title: "Total Students",
      titleHi: "कुल छात्र",
      value: summary?.totalStudents || 0,
      change: `${summary?.enrollmentRate || 0}% enrolled`,
      icon: Users,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Courses",
      titleHi: "कुल पाठ्यक्रम",
      value: summary?.totalCourses || 0,
      change: "Available courses",
      icon: BookOpen,
      bgColor: "bg-blue-500",
    },
    {
      title: "Enrolled Students",
      titleHi: "नामांकित छात्र",
      value: summary?.enrolledStudents || 0,
      change: `${summary?.enrollmentRate || 0}% enrollment rate`,
      icon: UserCheck,
      bgColor: "bg-purple-500",
    },
    {
      title: "Total Enrollments",
      titleHi: "कुल नामांकन",
      value: summary?.totalEnrollments || 0,
      change: "Course registrations",
      icon: TrendingUp,
      bgColor: "bg-orange-500",
    },
  ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  // Group enrollments by course
  const courseEnrollmentStats = {};
  recentEnrollments?.forEach((enrollment) => {
    if (enrollment.course) {
      const courseTitle = enrollment.course.title;
      if (!courseEnrollmentStats[courseTitle]) {
        courseEnrollmentStats[courseTitle] = {
          title: courseTitle,
          titleHi: enrollment.course.title,
          category: enrollment.course.category?.name || "Other",
          count: 0,
        };
      }
      courseEnrollmentStats[courseTitle].count++;
    }
  });

  const topCourses = Object.values(courseEnrollmentStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

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
          {/* Recent Enrollments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Enrollments
              </h2>
              <Clock className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {recentEnrollments && recentEnrollments.length > 0 ? (
                recentEnrollments.slice(0, 5).map((enrollment, index) => (
                  <div
                    key={enrollment._id}
                    className="flex items-start space-x-3 pb-4 border-b last:border-b-0 border-gray-100"
                  >
                    <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                      <UserCheck size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {enrollment.student?.firstName}{" "}
                        {enrollment.student?.lastName}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {enrollment.course
                          ? `Enrolled in ${enrollment.course.title}`
                          : "Course enrollment"}
                      </p>
                      {enrollment.course?.category && (
                        <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                          {enrollment.course.category.name}
                        </span>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(enrollment.enrolledAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No recent enrollments
                </p>
              )}
            </div>
          </div>

          {/* Popular Courses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Popular Courses
              </h2>
              <TrendingUp className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {topCourses.length > 0 ? (
                topCourses.map((course, index) => {
                  const colors = [
                    "bg-green-500",
                    "bg-blue-500",
                    "bg-purple-500",
                    "bg-orange-500",
                  ];
                  const bgColor = colors[index % colors.length];
                  const percentage = Math.min(
                    (course.count / summary?.totalEnrollments) * 100,
                    100
                  );

                  return (
                    <div
                      key={index}
                      className="pb-4 border-b last:border-b-0 border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-800">
                            {course.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {course.category}
                          </p>
                        </div>
                        <span className="text-xs text-gray-600 font-medium ml-2">
                          {course.count} enrollments
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`${bgColor} h-1.5 rounded-full transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No enrollment data available
                </p>
              )}
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
            <p className="text-xs text-blue-50">
              {summary?.totalStudents || 0} students registered
            </p>
          </button>
          <button className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-5 hover:shadow-md transition-all text-left">
            <BarChart3 size={24} className="mb-2" />
            <h3 className="text-base font-semibold mb-1">View Analytics</h3>
            <p className="text-xs text-purple-50">
              {summary?.enrollmentRate || 0}% enrollment rate
            </p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;