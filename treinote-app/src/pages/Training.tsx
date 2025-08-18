import React from 'react';
import MyTrainingProgram from '../components/features/training/MyTrainingProgram';

const Training: React.FC = () => {
  return (
    <div className='min-h-screen bg-white mt-16'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8 font-audiowide text-center'>
          Programmes d'entrainement
        </h1>
        <MyTrainingProgram />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Niveau Débutant</h3>
            <p className='text-gray-600 mb-4'>Parfait pour les débutants</p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Commencer l'entrainement
            </button>
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Niveau Intermédiaire</h3>
            <p className='text-gray-600 mb-4'>Pour les sportifs initiés</p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Commencer l'entrainement
            </button>
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Niveau Avancé</h3>
            <p className='text-gray-600 mb-4'>Pour les sportifs expérimentés</p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Commencer l'entrainement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
