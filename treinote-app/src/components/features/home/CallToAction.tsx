import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleClick}
      className='bg-teal-700 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-250'
    >
      Commencer dès maintenant
    </button>
  );
};

export default CallToAction;
