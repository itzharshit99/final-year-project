import React, { useState } from "react";
import { Home, BookOpen, Users, Settings, FileText, BarChart3, Menu, X, Video, Award, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", labelHi: "डैशबोर्ड", path: "/dashboard" },
    { icon: BookOpen, label: "Courses", labelHi: "पाठ्यक्रम", path: "/course" },
    { icon: Video, label: "All Courses", labelHi: "सभी कोर्स", path: "/all-course" },
    { icon: Users, label: "Analytics", labelHi: "छात्र", path: "/analytics" },
    { icon: GraduationCap, label: "Teachers", labelHi: "शिक्षक", path: "/teachers" },
    { icon: Award, label: "Certificates", labelHi: "प्रमाण पत्र", path: "/certificates" },
    { icon: FileText, label: "Content", labelHi: "सामग्री", path: "/content" },
    { icon: BarChart3, label: "Analytics", labelHi: "विश्लेषण", path: "/analytics" },
    { icon: Settings, label: "Settings", labelHi: "सेटिंग्स", path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 shadow-sm fixed h-screen z-50`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                VE
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Village Edu</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          )}
          {!isOpen && (
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto">
              VE
            </div>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${!isOpen && 'hidden'}`}
          >
            <Menu size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem === item.label;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  navigate(item.path);
                }}
                className={`w-full flex items-center px-3 py-3 rounded-lg mb-1 transition-all duration-200 group ${
                  active 
                    ? "bg-gradient-to-r from-green-50 to-blue-50 text-green-600" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} className={active ? "text-green-600" : "text-gray-500 group-hover:text-gray-700"} />
                {isOpen && (
                  <div className="ml-3 text-left">
                    <div className={`text-sm font-medium ${active ? "text-green-600" : "text-gray-700"}`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.labelHi}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Toggle when closed */}
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)} 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X size={18} className="text-gray-600 rotate-180" />
          </button>
        )}
      </div>

      {/* Main Content */}
      <main className={`${isOpen ? "ml-64" : "ml-20"} w-full transition-all duration-300 p-6`}>
        {children}
      </main>
    </div>
  );
}