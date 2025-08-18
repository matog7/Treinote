import React from 'react';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, image }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <img src={image} alt={title} className='w-full h-32 object-cover rounded-lg mb-3' />
      <h4 className='font-semibold mb-2'>{title}</h4>
      <p className='text-gray-600 text-sm mb-3'>{description}</p>
      <button className='w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors'>
        Ne rate jamais un événement
      </button>
    </div>
  );
};

export default NewsCard;
