import React from 'react';
import SocialLinks from './SocialLinks';
import CallToAction from './CallToAction';
import player from '../../../assets/coach.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className=' text-black py-20 rounded-lg mb-12'>
      <div className='container mx-auto px-4 text-center'>
        <div className='flex flex-row justify-between items-center mb-8 gap-12'>
          <h1 className='text-6xl font-bold mb-4 font-audiowide text-left'>Dépasse tes limites</h1>
          <p className='text-medium mb-8 text-left w-1/2'>
            Pousse dans tes retranchements. Maîtrise chaque exercice.
          </p>
        </div>

        <div className='flex flex-row justify-center items-center mb-8 gap-8'>
          <div className='flex flex-col items-center gap-4'>
            <img
              src={player}
              alt='Tennis Player'
              className='w-80 h-96 object-cover rounded-lg shadow-2xl'
            />
            <CallToAction />
          </div>
          <div className='flex flex-col items-center'>
            <SocialLinks />
          </div>
        </div>

        <div className='mt-16'>
          <h2 className='text-4xl font-bold mb-4 font-audiowide'>Entraîne toi comme un champion</h2>
          <div className='flex items-center justify-center space-x-6'>
            <button className='w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-xl font-bold hover:scale-110'>
              ←
            </button>
            <span className='text-lg font-medium'>Trouve le parfait exercice</span>
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
