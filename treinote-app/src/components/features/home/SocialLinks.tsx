import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';

const SocialLinks: React.FC = () => {
  return (
    <div className='absolute right-4 top-4 flex flex-col space-y-2'>
      <button className='w-10 h-10 text-white bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30'>
        <Facebook className='w-5 h-5' />
      </button>
      <button className='w-10 h-10 text-white bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30'>
        <Instagram className='w-5 h-5' />
      </button>
      <button className='w-10 h-10 text-white bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30'>
        <Twitter className='w-5 h-5' />
      </button>
    </div>
  );
};

export default SocialLinks;
