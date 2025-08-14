import React from 'react';
import CountdownTimer from './CountdownTimer';
import eventImage from '../../../assets/2497.jpg';
import RightButton from '../../layout/RightButton';

const EventSection: React.FC = () => {
  return (
    <section className='mb-12'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='relative'>
          <img src={eventImage} alt='Training session' className='w-full h-84 object-cover' />
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
            <div className='text-center text-white p-6 bg-black/30 rounded-lg backdrop-blur-sm'>
              <h3 className='text-2xl font-bold mb-3 title-audiowide'>
                Unlock your full potential
              </h3>
              <p className='text-lg max-w-md'>
                Expert tips, gear recommendations, and pro-level training
              </p>
            </div>
          </div>
        </div>

        <div className='p-6'>
          <h4 className='text-xl font-semibold mb-4'>Let's Join Our Event</h4>
          <div className='flex items-center space-x-4 mb-4'>
            <span className='text-gray-600 flex items-center'>📍 Larmor-Plage</span>
            <span className='text-gray-600 flex items-center'>📅 1st September 2025</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-500'>Register before:</span>
              <CountdownTimer />
            </div>
            <RightButton to='/events'>→</RightButton>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <span className='inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-2'>
          Destination
        </span>
        <p className='text-gray-700'>
          Master your gestures, perfect your lifts, and dominate the gym with expert drills.
        </p>
      </div>
    </section>
  );
};

export default EventSection;
