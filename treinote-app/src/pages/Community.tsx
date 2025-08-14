import React from 'react';

const Community: React.FC = () => {
  return (
    <div className='min-h-screen bg-white mt-16'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8 font-audiowide text-center'>Join Our Community</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Local Meetups</h3>
            <p className='text-gray-600 mb-4'>
              Connect with local players and join exciting tennis meetups in your area to share your
              passion for the sport.
            </p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Find Meetups
            </button>
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold mb-4'>Online Forums</h3>
            <p className='text-gray-600 mb-4'>
              Join our online community to discuss strategies, share tips, and connect with players
              worldwide.
            </p>
            <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
              Join Forum
            </button>
          </div>
        </div>

        <div className='mt-12'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Community Tips</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='bg-white rounded-lg shadow-md p-4 text-center'>
                <div className='w-16 h-16 bg-teal-100 rounded-full mx-auto mb-3 flex items-center justify-center'>
                  <span className='text-2xl'>🎾</span>
                </div>
                <p className='text-sm font-medium'>Tennis Tip #{i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
