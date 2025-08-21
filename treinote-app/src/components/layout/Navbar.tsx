import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Menu and Navigation */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button - toujours visible */}
          <button
            onClick={onMenuClick}
            className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Navigation Links - Cachés sur mobile, visibles sur desktop */}
          <div className="hidden lg:flex space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                isActive("/")
                  ? "bg-teal-100 text-teal-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span
                className={`w-2 h-2 bg-gray-400 rounded-full mr-2 ${
                  isActive("/") ? "bg-teal-700" : ""
                }`}
              ></span>
              Accueil
            </Link>
            <Link
              to="/training"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                isActive("/training")
                  ? "bg-teal-100 text-teal-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span
                className={`w-2 h-2 bg-gray-400 rounded-full mr-2 ${
                  isActive("/training") ? "bg-teal-700" : ""
                }`}
              ></span>
              Entrainement
            </Link>
            <Link
              to="/community"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                isActive("/community")
                  ? "bg-teal-100 text-teal-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span
                className={`w-2 h-2 bg-gray-400 rounded-full mr-2 ${
                  isActive("/community") ? "bg-teal-700" : ""
                }`}
              ></span>
              Communauté
            </Link>
          </div>
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 title-audiowide hover:text-teal-600 transition-colors"
          >
            Treinote
          </Link>
        </div>

        {/* Right side - Search and Contact */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search Bar */}
          <Search />

          {/* Contact Button */}
          <button
            onClick={() => navigate("/contact")}
            className="hidden md:inline-flex bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Contactez-nous
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
