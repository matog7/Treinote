import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const user = useSelector((s: RootState) => s.auth.user);
  const { navbarShortcuts } = useSelector((s: RootState) => s.preferences);

  // Utiliser les raccourcis personnalisés ou les valeurs par défaut
  const shortcuts =
    navbarShortcuts.length === 3
      ? navbarShortcuts
      : [
          {
            id: "home",
            label: "Accueil",
            path: user?.id ? "/my-training" : "/",
          },
          { id: "training", label: "Entrainement", path: "/training" },
          { id: "community", label: "Communauté", path: "/community" },
        ];

  // Ajuster le premier raccourci si l'utilisateur n'est pas connecté
  const adjustedShortcuts = shortcuts.map((shortcut, index) => {
    if (index === 0 && shortcut.path === "/my-training" && !user?.id) {
      return { ...shortcut, path: "/" };
    }
    return shortcut;
  });

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
            {adjustedShortcuts.map((shortcut) => (
              <Link
                key={shortcut.id}
                to={shortcut.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                  isActive(shortcut.path)
                    ? "bg-teal-100 text-teal-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span
                  className={`w-2 h-2 bg-gray-400 rounded-full mr-2 ${
                    isActive(shortcut.path) ? "bg-teal-700" : ""
                  }`}
                ></span>
                {shortcut.label}
              </Link>
            ))}
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
