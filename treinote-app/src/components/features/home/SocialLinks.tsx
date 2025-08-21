import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';

const SocialLinks: React.FC = () => {
  return (
    <div className='flex flex-col space-y-2'>
      <button className='w-10 h-10 text-black bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-250 hover:border-2 hover:border-gray-300 hover:text-gray-400'>
        <Facebook className='w-5 h-5' />
      </button>
      <button className='w-10 h-10 text-black bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-250 hover:border-2 hover:border-gray-300 hover:text-gray-400'>
        <Instagram className='w-5 h-5' />
      </button>
      <button className='w-10 h-10 text-black bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-250 hover:border-2 hover:border-gray-300 hover:text-gray-400'>
        <Twitter className='w-5 h-5' />
      </button>
    </div>
  );
};

export default SocialLinks;
