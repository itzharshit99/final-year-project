import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";

export default function CategoryDetailedReport() {
  const [selectedCategory, setSelectedCategory] = useState("छात्र / Student");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "छात्र / Student",
    "अभिभावक / Parent",
    "शिक्षक / Teacher",
    "स्कूल प्रशासन / School Admin",
    "अन्य / Other",
  ];

  useEffect(() => {
    fetchCategoryReport();
  }, [selectedCategory, currentPage]);

  const fetchCategoryReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://localhost:3000/api/contact/analysis/category/${encodeURIComponent(
          selectedCategory
        )}`,
        {
          params: {
            page: currentPage,
            limit: 10,
          },
        }
      );

      setData(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading report...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              विस्तृत श्रेणी रिपोर्ट
            </h1>
            <p className="text-gray-600">Detailed Category Report</p>
          </div>

          {/* Category Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Select Category / श्रेणी चुनें
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.split("/")[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-red-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-red-800">Error</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {data && (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                  <p className="text-gray-500 text-sm mb-1">Total Contacts</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {data.statistics.totalContacts}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    in {data.category}
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                  <p className="text-gray-500 text-sm mb-1">Hindi Preference</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {data.statistics.languageDistribution.hindi || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">contacts</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                  <p className="text-gray-500 text-sm mb-1">
                    English Preference
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {data.statistics.languageDistribution.english || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">contacts</p>
                </div>
              </div>

              {/* Contacts Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Contact Details
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing {(currentPage - 1) * 10 + 1} to{" "}
                    {Math.min(currentPage * 10, data.statistics.totalContacts)}{" "}
                    of {data.statistics.totalContacts} contacts
                  </p>
                </div>

                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                  </div>
                ) : data.contacts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-lg font-medium">No contacts found</p>
                    <p className="text-sm">
                      Try selecting a different category
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                            Name
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                            Email
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                            Phone
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                            Language
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                            Message
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.contacts.map((contact, index) => (
                          <tr
                            key={contact._id || index}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="py-4 px-6">
                              <p className="font-medium text-gray-800">
                                {contact.name}
                              </p>
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-gray-600 text-sm">
                                {contact.email}
                              </p>
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-gray-600 text-sm">
                                {contact.phone || "N/A"}
                              </p>
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  contact.preferredLanguage === "hindi"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {contact.preferredLanguage === "hindi"
                                  ? "हिंदी"
                                  : "English"}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <p
                                className="text-gray-600 text-sm max-w-xs truncate"
                                title={contact.message}
                              >
                                {contact.message}
                              </p>
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-gray-600 text-sm">
                                {new Date(contact.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {new Date(contact.createdAt).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination */}
                {data.pagination.totalPages > 1 && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!data.pagination.hasPrev || loading}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          data.pagination.hasPrev && !loading
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        ← Previous
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Page {data.pagination.currentPage} of{" "}
                          {data.pagination.totalPages}
                        </span>
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!data.pagination.hasNext || loading}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          data.pagination.hasNext && !loading
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
