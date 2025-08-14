import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Target,
  Users,
  Calendar,
  GraduationCap,
  Shield,
  Trophy,
  Settings,
  X,
  Mail,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/training', label: 'Training', icon: Target },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/coaches', label: 'Coaches', icon: GraduationCap },
    { path: '/equipment', label: 'Equipment', icon: Shield },
    { path: '/tournaments', label: 'Tournaments', icon: Trophy },
    { path: '/contact', label: 'Contact', icon: Mail },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Overlay sombre - toujours visible quand ouvert */}
      {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={onClose} />}

      {/* Sidebar - toujours en overlay */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header du sidebar */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-bold text-gray-800 font-audiowide'>Menu</h2>
          <button onClick={onClose} className='p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <X className='w-6 h-6 text-gray-600' />
          </button>
        </div>

        {/* Navigation du sidebar */}
        <nav className='p-4'>
          <ul className='space-y-2'>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose} // Ferme toujours le sidebar après navigation
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-all duration-200
                      ${
                        isActive(item.path)
                          ? 'bg-teal-100 text-teal-700 border-r-4 border-teal-500'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <IconComponent className='w-5 h-5 mr-3' />
                    <span className='font-medium'>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Section utilisateur */}
        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center'>
              <span className='text-teal-600 font-bold'>U</span>
            </div>
            <div>
              <p className='font-medium text-gray-800 font-audiowide'>User Profile</p>
              <p className='text-sm text-gray-500'>Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
