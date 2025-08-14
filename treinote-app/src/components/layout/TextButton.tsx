import React from 'react';
import { Link } from 'react-router-dom';

const TextButton: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <div className='text-center mt-8'>
      <Link
        to={to}
        className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-teal-700 hover:translate-y-[-5px] hover:bg-teal-100/70 transition-all duration-300'
      >
        {children}
      </Link>
    </div>
  );
};

export default TextButton;
