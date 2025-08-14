import React from 'react';
import { useNavigate } from 'react-router-dom';

const RightButton: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className='w-18 h-8 rounded-full bg-white/20 hover:text-teal-600 hover:translate-x-1 transition-all duration-300 flex items-center justify-center text-xl font-medium'
    >
      {children}
    </button>
  );
};

export default RightButton;
