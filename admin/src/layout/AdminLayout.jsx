import React, { useState } from "react";
import { Home, BookOpen, Users, Settings, FileText, BarChart3, Menu, X, Video, Award, GraduationCap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "Courses", path: "/course" },
    { icon: Video, label: "All Courses", path: "/all-course" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: GraduationCap, label: "Teachers", path: "/teachers" },
    { icon: Award, label: "Certificates", path: "/certificates" },
    { icon: FileText, label: "Content", path: "/content" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isOpen ? "w-64" : "w-20"} bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 shadow-xl fixed h-screen`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-500">
          {isOpen && <h1 className="font-bold text-xl">Village Edu</h1>}

          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 px-3">
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
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
                  active ? "bg-white text-indigo-700" : "text-indigo-100 hover:bg-indigo-700"
                }`}
              >
                <Icon size={22} />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className={`${isOpen ? "ml-64" : "ml-20"} w-full transition-all p-6`}>
        {children}
      </main>
    </div>
  );
}
