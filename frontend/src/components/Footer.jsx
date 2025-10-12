import React from "react";
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">गाँव शिक्षा</h3>
                <p className="text-sm text-gray-400">Village Learning</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              हर गाँव में शिक्षा, हर सपने में उड़ान।
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">त्वरित लिंक / Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  होम / Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  कोर्स / Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  टीचर्स / Teachers
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  संपर्क / Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">विषय / Subjects</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  गणित / Mathematics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  विज्ञान / Science
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  हिंदी / Hindi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  अंग्रेजी / English
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">संपर्क / Contact</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>📧 support@ganvshiksha.com</p>
              <p>📱 +91 98765 43210</p>
              <p>🏠 गाँव शिक्षा केंद्र, भारत</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 गाँव शिक्षा / Village Learning. सभी अधिकार सुरक्षित / All
            rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            🌟 शिक्षा से रोशनी, ज्ञान से शक्ति 🌟
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
