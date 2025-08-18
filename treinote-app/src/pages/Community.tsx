import React from 'react';
import { useNavigate } from 'react-router-dom';

const Community: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-white mt-16'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8 font-audiowide text-center'>
          Rejoins notre communauté
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Rencontres locales</h3>
            <p className='text-gray-600 mb-4'>
              Rencontre des sportifs dans le coin et rejoins des événements locaux pour partager ta
              passion pour le sport.
            </p>
            <button
              onClick={() => navigate('/events')}
              className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'
            >
              Trouver des événements
            </button>
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Forum</h3>
            <p className='text-gray-600 mb-4'>
              Rejoins la communauté Treinote pour partager des conseils et échanger avec des
              sportifs partout dans le monde.
            </p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Rejoindre le forum
            </button>
          </div>
        </div>

        <div className='mt-12'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Conseils de la communauté</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='bg-white rounded-lg shadow-md p-4 text-center'>
                <div className='w-16 h-16 bg-teal-100 rounded-full mx-auto mb-3 flex items-center justify-center'>
                  <span className='text-2xl'>🎾</span>
                </div>
                <p className='text-sm font-medium'>Treinotip' #{i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
