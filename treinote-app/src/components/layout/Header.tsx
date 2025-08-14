import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className='sticky top-0 z-50 bg-white'>
        <Navbar onMenuClick={toggleSidebar} />
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default Header;
