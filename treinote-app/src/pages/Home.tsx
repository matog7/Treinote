import React from 'react';
import HeroSection from '../components/features/home/HeroSection';
import EventSection from '../components/features/home/EventSection';
import TrainingSection from '../components/features/home/TrainingSection';
import NewsSection from '../components/features/home/NewsSection';
import CommunitySection from '../components/features/home/CommunitySection';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen bg-white mt-16'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-2'>
            <EventSection />
          </div>
          <div className='lg:col-span-2'>
            <HeroSection />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-2'>
            <TrainingSection />
            <CommunitySection />
            <NewsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
