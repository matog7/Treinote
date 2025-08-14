import React from 'react';
import MyTrainingProgram from '../components/features/training/MyTrainingProgram';

const Training: React.FC = () => {
  return (
    <div className='min-h-screen bg-white mt-16'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8 font-audiowide text-center'>Training Programs</h1>
        <MyTrainingProgram />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Beginner Level</h3>
            <p className='text-gray-600 mb-4'>Perfect for newcomers to tennis</p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Start Training
            </button>
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Intermediate Level</h3>
            <p className='text-gray-600 mb-4'>For players with basic skills</p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Start Training
            </button>
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Advanced Level</h3>
            <p className='text-gray-600 mb-4'>For experienced players</p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Start Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
