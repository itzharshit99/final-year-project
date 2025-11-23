import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    language: "",
    class: "",
    category: { id: "hindi", name: "हिंदी", nameEn: "Hindi" },
    rating: 4.7,
    studentsEnrolled: 380,
    lessons: [{ title: "", videoUrl: "", duration: "", resources: [""] }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, field, value) => {
    const updated = [...formData.lessons];
    updated[index][field] = value;
    setFormData({ ...formData, lessons: updated });
  };

  const addLesson = () => {
    setFormData({
      ...formData,
      lessons: [
        ...formData.lessons,
        { title: "", videoUrl: "", duration: "", resources: [""] },
      ],
    });
  };

  const removeLesson = (index) => {
    const updated = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:3000/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ⭐ token added
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("API Response:", data);

      alert("Course created successfully! 🚀");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course ❌");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create New Course
            </h1>
            <p className="text-gray-600">
              Fill in the details to add a new course to your platform
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 flex items-center gap-2">
                  <span className="text-indigo-600">📚</span> Basic Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    name="title"
                    placeholder="Enter course title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                    onChange={handleChange}
                    value={formData.title}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Write a detailed description of the course"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none resize-none"
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor Name *
                    </label>
                    <input
                      name="instructor"
                      placeholder="Enter instructor name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                      onChange={handleChange}
                      value={formData.instructor}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      name="price"
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                      onChange={handleChange}
                      value={formData.price}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language *
                    </label>
                    <input
                      name="language"
                      placeholder="e.g., Hindi, English"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                      onChange={handleChange}
                      value={formData.language}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class/Level *
                    </label>
                    <input
                      name="class"
                      placeholder="e.g., Class 10, Beginner"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                      onChange={handleChange}
                      value={formData.class}
                    />
                  </div>
                </div>
              </div>

              {/* Lessons Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-3">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-indigo-600">🎥</span> Course Lessons
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {formData.lessons.length}{" "}
                    {formData.lessons.length === 1 ? "Lesson" : "Lessons"}
                  </span>
                </div>

                <div className="space-y-4">
                  {formData.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                          <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          Lesson {index + 1}
                        </h3>
                        {formData.lessons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLesson(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition duration-200"
                            title="Remove lesson"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lesson Title *
                          </label>
                          <input
                            placeholder="Enter lesson title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                            value={lesson.title}
                            onChange={(e) =>
                              handleLessonChange(index, "title", e.target.value)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Video URL *
                            </label>
                            <input
                              placeholder="https://..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                              value={lesson.videoUrl}
                              onChange={(e) =>
                                handleLessonChange(
                                  index,
                                  "videoUrl",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Duration *
                            </label>
                            <input
                              placeholder="e.g., 20 min"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                              value={lesson.duration}
                              onChange={(e) =>
                                handleLessonChange(
                                  index,
                                  "duration",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Resource URL (Optional)
                          </label>
                          <input
                            placeholder="https://..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                            value={lesson.resources[0]}
                            onChange={(e) =>
                              handleLessonChange(index, "resources", [
                                e.target.value,
                              ])
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addLesson}
                  className="w-full py-3 px-4 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Another Lesson
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Create Course 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
