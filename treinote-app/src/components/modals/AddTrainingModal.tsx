import React, { useState } from 'react';
import { X, Calendar, Clock, Target, Dumbbell, FileText, Settings } from 'lucide-react';
import { Training } from '../../interfaces';

interface AddTrainingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onAddTraining?: (training: Training) => void;
}

const AddTrainingModal: React.FC<AddTrainingModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onAddTraining,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Aujourd'hui par défaut
    time: '12:00',
    duration: 60,
    intensity: 5,
    notes: '',
    equipment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTraining = () => {
    const newTraining: Training = {
      id: Date.now().toString(),
      ...formData,
      duration: Number(formData.duration),
      intensity: Number(formData.intensity),
    };

    console.info('Add Training:', newTraining);

    // Appeler la fonction de callback si elle existe
    if (onAddTraining) {
      onAddTraining(newTraining);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      duration: 60,
      intensity: 5,
      notes: '',
      equipment: '',
    });

    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Target className='w-8 h-8' />
              <h2 className='text-2xl font-bold font-audiowide'>Planifier un entraînement</h2>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className='text-white hover:text-teal-200 transition-colors p-2 rounded-full hover:bg-white/20'
            >
              <X className='w-6 h-6' />
            </button>
          </div>
          <p className='text-teal-100 mt-2'>Créez votre session d'entraînement personnalisée</p>
        </div>

        {/* Content */}
        <div className='p-6 overflow-y-auto max-h-[calc(90vh-120px)]'>
          <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
            {/* Première ligne - Titre et Description */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <Target className='w-4 h-4 mr-2 text-teal-600' />
                  Titre de l'entraînement *
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                  placeholder='Ex: Session technique service'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <FileText className='w-4 h-4 mr-2 text-teal-600' />
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none'
                  placeholder="Décrivez l'objectif de cette session..."
                />
              </div>
            </div>

            {/* Deuxième ligne - Date et Heure */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='date'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <Calendar className='w-4 h-4 mr-2 text-teal-600' />
                  Date *
                </label>
                <input
                  type='date'
                  id='date'
                  name='date'
                  value={formData.date}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='time'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <Clock className='w-4 h-4 mr-2 text-teal-600' />
                  Heure de début *
                </label>
                <input
                  type='time'
                  id='time'
                  name='time'
                  value={formData.time}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                  required
                />
              </div>
            </div>

            {/* Troisième ligne - Durée et Intensité */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='duration'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <Clock className='w-4 h-4 mr-2 text-teal-600' />
                  Durée (minutes) *
                </label>
                <input
                  type='number'
                  id='duration'
                  name='duration'
                  value={formData.duration}
                  onChange={handleChange}
                  min='15'
                  max='300'
                  step='15'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                  placeholder='60'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='intensity'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <Target className='w-4 h-4 mr-2 text-teal-600' />
                  Niveau d'intensité *
                </label>
                <div className='space-y-2'>
                  <input
                    type='range'
                    id='intensity'
                    name='intensity'
                    value={formData.intensity}
                    onChange={handleChange}
                    min='1'
                    max='10'
                    step='1'
                    className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-teal'
                    required
                  />
                  <div className='flex justify-between text-xs text-gray-500'>
                    <span>Débutant</span>
                    <span className='text-teal-600 font-semibold'>Niveau {formData.intensity}</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quatrième ligne - Équipement et Notes */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='equipment'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <Dumbbell className='w-4 h-4 mr-2 text-teal-600' />
                  Équipement nécessaire
                </label>
                <input
                  type='text'
                  id='equipment'
                  name='equipment'
                  value={formData.equipment}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                  placeholder='Raquette, balles, tapis...'
                />
              </div>

              <div>
                <label
                  htmlFor='notes'
                  className='block text-sm font-semibold text-gray-700 mb-2 flex items-center'
                >
                  <Settings className='w-4 h-4 mr-2 text-teal-600' />
                  Notes personnelles
                </label>
                <textarea
                  id='notes'
                  name='notes'
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none'
                  placeholder='Ajoutez vos notes, objectifs spécifiques...'
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer avec bouton d'envoi */}
        <div className='bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end'>
          <div className='flex space-x-3'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
            >
              Annuler
            </button>
            <button
              onClick={handleAddTraining}
              className='px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 font-semibold flex items-center space-x-2'
            >
              <Target className='w-5 h-5' />
              <span>Créer l'entraînement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrainingModal;
