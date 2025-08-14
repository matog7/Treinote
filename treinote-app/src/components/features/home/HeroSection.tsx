import React from 'react';
import SocialLinks from './SocialLinks';
import CallToAction from './CallToAction';
import player from '../../../assets/coach.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className=' text-black py-20 rounded-lg'>
      <div className='container mx-auto px-4 text-center'>
        <h1 className='text-6xl font-bold mb-4 font-audiowide'>Push Your Limits</h1>
        <p className='text-xl mb-8'>Ace Your Game. Master Every Swing.</p>

        <div className='flex justify-center items-center mb-8'>
          <div className='relative'>
            <img
              src={player}
              alt='Tennis Player'
              className='w-80 h-96 object-cover rounded-lg shadow-2xl'
            />
            <SocialLinks />
          </div>
        </div>

        <CallToAction />

        <div className='mt-16'>
          <h2 className='text-4xl font-bold mb-4 font-audiowide'>Train Like a Champion</h2>
          <div className='flex items-center justify-center space-x-6'>
            <button className='w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-xl font-bold hover:scale-110'>
              ←
            </button>
            <span className='text-lg font-medium'>Find Your Perfect Drill</span>
            <button className='w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-xl font-bold hover:scale-110'>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
