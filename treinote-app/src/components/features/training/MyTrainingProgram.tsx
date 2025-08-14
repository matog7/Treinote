import React, { useState } from 'react';
import AddTrainingModal from '../../modals/AddTrainingModal';

const MyTrainingProgram: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTraining = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <AddTrainingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
      <div className='container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center'>
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>My Training Program</h3>
            <p className='text-gray-600 mb-4'>
              Perfect for newcomers, you can add your own training program, when you did it & what
              you did.
            </p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Start Training
            </button>
          </div>
        </div>
        <div className='lg:col-span-1'>
          <button
            onClick={handleAddTraining}
            className='w-full text-black py-2 px-4 rounded-lg hover:translate-x-2 transition-all duration-300 hover:text-teal-600 flex items-center justify-center font-medium'
          >
            Add your own training program →
          </button>
        </div>
      </div>
    </>
  );
};

export default MyTrainingProgram;
