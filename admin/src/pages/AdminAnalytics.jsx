import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Calendar,
  MapPin,
  Loader,
  UserCheck,
  GraduationCap,
  Target,
} from "lucide-react";
import AdminLayout from "../layout/AdminLayout";

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://localhost:3000/api/admin/analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAnalyticsData(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching analytics data:", err);
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
            <p className="text-red-600">Error loading analytics: {error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const {
    overview,
    courseWiseStats,
    categoryStats,
    classStats,
    classCourseStats,
    genderStats,
    stateStats,
    recentEnrollments,
    topCourses,
  } = analyticsData || {};

  // Overview Stats Cards
  const overviewStats = [
    {
      title: "Total Students",
      titleHi: "कुल छात्र",
      value: overview?.totalStudents || 0,
      icon: Users,
      bgColor: "bg-blue-500",
      detail: `${overview?.enrolledStudents || 0} enrolled`,
    },
    {
      title: "Total Courses",
      titleHi: "कुल पाठ्यक्रम",
      value: overview?.totalCourses || 0,
      icon: BookOpen,
      bgColor: "bg-green-500",
      detail: "Active courses",
    },
    {
      title: "Enrollment Rate",
      titleHi: "नामांकन दर",
      value: `${overview?.enrollmentPercentage || 0}%`,
      icon: TrendingUp,
      bgColor: "bg-purple-500",
      detail: `${overview?.enrolledStudents || 0} of ${overview?.totalStudents || 0}`,
    },
    {
      title: "Total Enrollments",
      titleHi: "कुल नामांकन",
      value: overview?.totalEnrollments || 0,
      icon: Award,
      bgColor: "bg-orange-500",
      detail: "Course registrations",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Comprehensive insights into your platform's performance
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {overviewStats.map((stat, index) => {
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
                <p className="text-xs text-gray-500">{stat.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Courses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Top Performing Courses
              </h2>
              <Award className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {topCourses?.slice(0, 5).map((course, index) => (
                <div
                  key={course._id}
                  className="flex items-start space-x-3 pb-4 border-b last:border-b-0 border-gray-100"
                >
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg flex-shrink-0">
                    <span className="font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
                        {course.category?.name}
                      </span>
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">
                        {course.class}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{course.studentsEnrolled} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Statistics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Category Performance
              </h2>
              <PieChart className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {categoryStats?.map((category, index) => {
                const colors = [
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-purple-500",
                  "bg-orange-500",
                ];
                const bgColor = colors[index % colors.length];
                const totalEnrollments = categoryStats.reduce(
                  (sum, cat) => sum + cat.totalEnrollments,
                  0
                );
                const percentage =
                  (category.totalEnrollments / totalEnrollments) * 100;

                return (
                  <div
                    key={category._id}
                    className="pb-4 border-b last:border-b-0 border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {category.categoryName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {category.totalCourses} courses • ₹
                          {Math.round(category.averagePrice)} avg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">
                          {category.totalEnrollments}
                        </p>
                        <p className="text-xs text-gray-500">enrollments</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${bgColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1">
                        <Star
                          size={12}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <span className="text-xs text-gray-600">
                          {category.averageRating.toFixed(1)} rating
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Course-wise Statistics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Course-wise Enrollment Statistics
            </h2>
            <BarChart3 className="text-gray-400" size={18} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Course Name
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Class
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Instructor
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Enrollments
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Price
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseWiseStats?.map((course, index) => (
                  <tr
                    key={course._id}
                    className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 text-sm text-gray-800">
                      {course.courseName}
                    </td>
                    <td className="py-3">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                        {course.courseCategory}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {course.courseClass}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {course.instructor}
                    </td>
                    <td className="py-3">
                      <span className="text-sm font-semibold text-gray-800">
                        {course.totalEnrollments}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      ₹{course.price}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <span className="text-sm text-gray-800">
                          {course.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Class-wise Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Class Distribution
              </h2>
              <GraduationCap className="text-gray-400" size={18} />
            </div>
            <div className="space-y-3">
              {classCourseStats?.map((classData, index) => {
                const maxEnrollments = Math.max(
                  ...classCourseStats.map((c) => c.totalEnrollments)
                );
                const percentage =
                  (classData.totalEnrollments / maxEnrollments) * 100;

                return (
                  <div key={classData._id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {classData._id}
                      </span>
                      <span className="text-xs text-gray-600">
                        {classData.totalEnrollments} enrollments
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Gender Distribution
              </h2>
              <Users className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {genderStats?.map((gender, index) => {
                const totalStudents = genderStats.reduce(
                  (sum, g) => sum + g.count,
                  0
                );
                const percentage = (gender.count / totalStudents) * 100;
                const colors = ["bg-blue-500", "bg-purple-500"];
                const bgColor = colors[index % colors.length];

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {gender._id}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {gender.count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${bgColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* State Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                State-wise Students
              </h2>
              <MapPin className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4">
              {stateStats?.map((state, index) => {
                const totalStudents = stateStats.reduce(
                  (sum, s) => sum + s.count,
                  0
                );
                const percentage = (state.count / totalStudents) * 100;
                const colors = [
                  "bg-green-500",
                  "bg-orange-500",
                  "bg-purple-500",
                ];
                const bgColor = colors[index % colors.length];

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {state._id}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {state.count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${bgColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Enrollments Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Enrollment Timeline
            </h2>
            <Calendar className="text-gray-400" size={18} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentEnrollments?.map((enrollment, index) => {
              const date = new Date(enrollment._id);
              const formattedDate = date.toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={enrollment._id}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="text-blue-600" size={16} />
                    <span className="text-xs text-gray-600">
                      {formattedDate}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {enrollment.count}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">enrollments</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;