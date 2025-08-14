import React from 'react';
import { X, Calendar, Clock, Target, TrendingUp, Dumbbell, FileText, MapPin } from 'lucide-react';

interface Training {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  intensity: number;
  description?: string;
  equipment?: string;
  notes?: string;
}

interface TrainingDetailCardProps {
  training: Training;
  isOpen: boolean;
  onClose: () => void;
}

const TrainingDetailCard: React.FC<TrainingDetailCardProps> = ({ training, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'text-green-600 bg-green-100';
    if (intensity <= 6) return 'text-yellow-600 bg-yellow-100';
    if (intensity <= 8) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity <= 3) return 'Débutant';
    if (intensity <= 6) return 'Intermédiaire';
    if (intensity <= 8) return 'Avancé';
    return 'Expert';
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Target className='w-8 h-8' />
              <h2 className='text-2xl font-bold font-audiowide'>{training.title}</h2>
            </div>
            <button
              onClick={onClose}
              className='text-white hover:text-teal-200 transition-colors p-2 rounded-full hover:bg-white/20'
            >
              <X className='w-6 h-6' />
            </button>
          </div>
          <p className='text-teal-100 mt-2'>{formatDate(training.date)}</p>
        </div>

        {/* Content */}
        <div className='p-6 overflow-y-auto max-h-[calc(90vh-120px)]'>
          <div className='space-y-6'>
            {/* Informations principales */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-gray-50 rounded-lg p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Clock className='w-6 h-6 text-teal-600' />
                </div>
                <p className='text-sm text-gray-600'>Heure de début</p>
                <p className='text-xl font-bold text-gray-900'>{training.time}</p>
              </div>

              <div className='bg-gray-50 rounded-lg p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <TrendingUp className='w-6 h-6 text-teal-600' />
                </div>
                <p className='text-sm text-gray-600'>Durée</p>
                <p className='text-xl font-bold text-gray-900'>{training.duration} min</p>
              </div>

              <div className='bg-gray-50 rounded-lg p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Target className='w-6 h-6 text-teal-600' />
                </div>
                <p className='text-sm text-gray-600'>Intensité</p>
                <div className='flex items-center justify-center space-x-2'>
                  <span className='text-xl font-bold text-gray-900'>
                    Niveau {training.intensity}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getIntensityColor(
                      training.intensity
                    )}`}
                  >
                    {getIntensityLabel(training.intensity)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {training.description && (
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                  <FileText className='w-5 h-5 mr-2 text-teal-600' />
                  Description de la session
                </h3>
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <p className='text-gray-700'>{training.description}</p>
                </div>
              </div>
            )}

            {/* Équipement */}
            {training.equipment && (
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                  <Dumbbell className='w-5 h-5 mr-2 text-teal-600' />
                  Équipement utilisé
                </h3>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <p className='text-gray-700'>{training.equipment}</p>
                </div>
              </div>
            )}

            {/* Notes personnelles */}
            {training.notes && (
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                  <MapPin className='w-5 h-5 mr-2 text-teal-600' />
                  Notes personnelles
                </h3>
                <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
                  <p className='text-gray-700'>{training.notes}</p>
                </div>
              </div>
            )}

            {/* Statistiques de performance */}
            <div className='bg-gradient-to-r from-gray-50 to-teal-50 rounded-lg p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4 text-center'>
                📊 Statistiques de la session
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                    <span className='text-2xl font-bold text-teal-600'>
                      {Math.round(training.duration / 60)}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600'>Heures</p>
                </div>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                    <span className='text-2xl font-bold text-orange-600'>{training.intensity}</span>
                  </div>
                  <p className='text-sm text-gray-600'>Intensité</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end'>
          <button
            onClick={onClose}
            className='px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium'
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetailCard;
