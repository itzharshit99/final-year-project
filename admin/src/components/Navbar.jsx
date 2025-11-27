import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
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
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Video, label: 'All Courses', path: '/all-course' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: Award, label: 'Certificates', path: '/certificates' },
    { icon: FileText, label: 'Content', path: '/content' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 ease-in-out shadow-xl`}
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
              <Link key={item.label} to={item.path}>
                <button
                  onClick={() => setActiveItem(item.label)}
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
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
