import React from 'react';
import TextButton from '../../layout/TextButton';

const CommunitySection: React.FC = () => {
  return (
    <section className='mb-8'>
      <h3 className='text-2xl font-bold mb-4'>Join Our Community</h3>
      <p className='text-gray-600 mb-6'>
        Join thousands of players who trust us to sharpen their game.
      </p>

      <div className='grid grid-cols-2 gap-3'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='bg-white rounded-lg shadow-md p-3 text-center'>
            <img
              src={`/placeholder-tip-${i}.jpg`}
              alt={`Tip ${i}`}
              className='w-full h-20 object-cover rounded-lg mb-2'
            />
            <p className='text-sm font-medium'>5 Backhand Sharpen Your Game</p>
          </div>
        ))}
      </div>
      <TextButton to='/community'>See more</TextButton>
    </section>
  );
};

export default CommunitySection;
