import React from 'react';

const TrainingSection: React.FC = () => {
  return (
    <section className='mb-12'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h3 className='text-2xl font-bold mb-4'>Training Programs</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='text-center'>
            <img
              src='/placeholder-training-1.jpg'
              alt='Training 1'
              className='w-full h-48 object-cover rounded-lg mb-3'
            />
            <h4 className='font-semibold mb-2'>Beginner Level</h4>
            <p className='text-gray-600'>Perfect for newcomers to tennis</p>
          </div>
          <div className='text-center'>
            <img
              src='/placeholder-training-2.jpg'
              alt='Training 2'
              className='w-full h-48 object-cover rounded-lg mb-3'
            />
            <h4 className='font-semibold mb-2'>Advanced Level</h4>
            <p className='text-gray-600'>For experienced players</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
