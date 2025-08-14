import React from 'react';

const SocialLinks: React.FC = () => {
  return (
    <div className='absolute right-4 top-4 flex flex-col space-y-2'>
      <button className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30'>
        🐦
      </button>
      <button className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30'>
        ▶️
      </button>
      <button className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30'>
        📘
      </button>
    </div>
  );
};

export default SocialLinks;
