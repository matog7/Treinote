import React from 'react';
import { Calendar, MapPin, Users, Clock, Star, Tally1, Tally2, Tally3 } from 'lucide-react';
import { Event } from '@/interfaces/event';
interface EventCardProps {
  event: Event;
  onJoin?: (eventId: string) => void;
  onViewDetails?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoin, onViewDetails }) => {
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Tally1 className='w-6 h-6' />;
      case 'intermediate':
        return <Tally2 className='w-6 h-6' />;
      case 'advanced':
        return <Tally3 className='w-6 h-6' />;
      default:
        return 'Tous niveaux';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-teal-400/50';
      case 'ongoing':
        return 'from-green-500 to-green-600';
      case 'completed':
        return 'bg-gray-400/50';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir';
      case 'ongoing':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      default:
        return 'Inconnu';
    }
  };

  const isFull = event.currentParticipants >= event.maxParticipants;
  const isCompleted = event.status === 'completed';

  return (
    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden'>
      {/* Image de l'événement */}
      <div className='relative h-48 bg-gradient-to-br from-teal-400 to-teal-600'>
        {event.image ? (
          <img src={event.image} alt={event.title} className='w-full h-full object-cover' />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <Calendar className='w-16 h-16 text-white opacity-80' />
          </div>
        )}

        {/* Badge de statut */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-teal-100 ${getStatusColor(
            event.status
          )}`}
        >
          {getStatusLabel(event.status)}
        </div>

        {/* Badge de difficulté */}
        <div
          className={`absolute top-4 left-4 rounded-full px-1 py-1 text-xs font-medium text-white`}
        >
          {getDifficultyLabel(event.difficulty)}
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className='p-6'>
        {/* En-tête */}
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>{event.title}</h3>
            <p className='text-gray-600 text-sm line-clamp-2'>{event.description}</p>
          </div>
        </div>

        {/* Informations principales */}
        <div className='space-y-3 mb-4'>
          <div className='flex items-center text-sm text-gray-600'>
            <Calendar className='w-4 h-4 mr-2 text-teal-500' />
            <span>
              {new Date(event.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className='flex items-center text-sm text-gray-600'>
            <Clock className='w-4 h-4 mr-2 text-teal-500' />
            <span>{event.time}</span>
          </div>

          <div className='flex items-center text-sm text-gray-600'>
            <MapPin className='w-4 h-4 mr-2 text-teal-500' />
            <span>{event.location}</span>
          </div>

          <div className='flex items-center text-sm text-gray-600'>
            <Users className='w-4 h-4 mr-2 text-teal-500' />
            <span>
              {event.currentParticipants}/{event.maxParticipants} participants
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {event.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className='px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium'
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium'>
              +{event.tags.length - 3}
            </span>
          )}
        </div>

        {/* Organisateur */}
        <div className='flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center'>
              {event.organizer.avatar ? (
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className='w-6 h-6 rounded-full'
                />
              ) : (
                <span className='text-teal-600 font-bold text-sm'>
                  {event.organizer.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <p className='text-sm font-medium text-gray-800'>{event.organizer.name}</p>
              <div className='flex items-center space-x-1'>
                <Star className='w-3 h-3 text-yellow-400 fill-current' />
                <span className='text-xs text-gray-600'>{event.organizer.rating}/5</span>
              </div>
            </div>
          </div>

          <div className='text-right'>
            <p className='text-lg font-bold text-teal-600'>
              {event.price === 0 ? 'Gratuit' : `${event.price}€`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className='flex space-x-3'>
          <button
            onClick={() => onViewDetails?.(event.id)}
            className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200'
          >
            Voir détails
          </button>

          {!isCompleted && (
            <button
              onClick={() => onJoin?.(event.id)}
              disabled={isFull}
              className={`flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 ${
                isFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white transform hover:scale-105'
              }`}
            >
              {isFull ? 'Complet' : 'Rejoindre'}
            </button>
          )}
        </div>

        {/* Barre de progression des participants */}
        {!isCompleted && (
          <div className='mt-4'>
            <div className='flex justify-between text-xs text-gray-600 mb-1'>
              <span>Places disponibles</span>
              <span>{event.maxParticipants - event.currentParticipants} restantes</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
