import React from 'react';
import NewsCard from './NewsCard';

const NewsSection: React.FC = () => {
  return (
    <section className='mb-8 mt-16'>
      <h3 className='text-2xl font-bold mb-6'>Stay Updated with Tennis World</h3>

      <div className='space-y-4'>
        <NewsCard
          title='Federer Returns for a Final Showdown'
          description='The tennis legend makes his comeback in an epic final match that will be remembered for years.'
          image='/placeholder-federer.jpg'
        />
        <NewsCard
          title='Local meet-ups: Play tennis in your city'
          description='Connect with local players and join exciting tennis meetups in your area.'
          image='/placeholder-local.jpg'
        />
      </div>
    </section>
  );
};

export default NewsSection;
