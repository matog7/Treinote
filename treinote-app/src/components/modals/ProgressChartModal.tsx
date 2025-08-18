import React, { useState } from 'react';
import { X, TrendingUp, Calendar, Target } from 'lucide-react';

interface ProgressData {
  id: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
  date: string;
}

interface ProgressChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProgressChartModal: React.FC<ProgressChartModalProps> = ({ isOpen, onClose }) => {
  const [selectedExercise, setSelectedExercise] = useState<string>('developpe-couche');

  // Données factices pour la démonstration
  const mockProgressData: { [key: string]: ProgressData[] } = {
    'developpe-couche': [
      { id: '1', exercise: 'Développé couché', weight: 60, reps: 8, sets: 3, date: '2025-01-15' },
      { id: '2', exercise: 'Développé couché', weight: 65, reps: 8, sets: 3, date: '2025-01-22' },
      { id: '3', exercise: 'Développé couché', weight: 70, reps: 6, sets: 3, date: '2025-01-29' },
      { id: '4', exercise: 'Développé couché', weight: 75, reps: 6, sets: 3, date: '2025-02-05' },
      { id: '5', exercise: 'Développé couché', weight: 80, reps: 5, sets: 3, date: '2025-02-12' },
      { id: '6', exercise: 'Développé couché', weight: 85, reps: 4, sets: 3, date: '2025-02-19' },
      { id: '7', exercise: 'Développé couché', weight: 90, reps: 3, sets: 3, date: '2025-02-26' },
      { id: '8', exercise: 'Développé couché', weight: 95, reps: 2, sets: 3, date: '2025-03-05' },
    ],
    squat: [
      { id: '9', exercise: 'Squat', weight: 80, reps: 8, sets: 3, date: '2025-01-15' },
      { id: '10', exercise: 'Squat', weight: 85, reps: 8, sets: 3, date: '2025-01-22' },
      { id: '11', exercise: 'Squat', weight: 90, reps: 6, sets: 3, date: '2025-01-29' },
      { id: '12', exercise: 'Squat', weight: 95, reps: 6, sets: 3, date: '2025-02-05' },
      { id: '13', exercise: 'Squat', weight: 100, reps: 5, sets: 3, date: '2025-02-12' },
      { id: '14', exercise: 'Squat', weight: 105, reps: 4, sets: 3, date: '2025-02-19' },
      { id: '15', exercise: 'Squat', weight: 110, reps: 3, sets: 3, date: '2025-02-26' },
      { id: '16', exercise: 'Squat', weight: 115, reps: 2, sets: 3, date: '2025-03-05' },
    ],
    deadlift: [
      { id: '17', exercise: 'Deadlift', weight: 100, reps: 8, sets: 3, date: '2025-01-15' },
      { id: '18', exercise: 'Deadlift', weight: 110, reps: 8, sets: 3, date: '2025-01-22' },
      { id: '19', exercise: 'Deadlift', weight: 120, reps: 6, sets: 3, date: '2025-01-29' },
      { id: '20', exercise: 'Deadlift', weight: 130, reps: 6, sets: 3, date: '2025-02-05' },
      { id: '21', exercise: 'Deadlift', weight: 140, reps: 5, sets: 3, date: '2025-02-12' },
      { id: '22', exercise: 'Deadlift', weight: 150, reps: 4, sets: 3, date: '2025-02-19' },
      { id: '23', exercise: 'Deadlift', weight: 160, reps: 3, sets: 3, date: '2025-02-26' },
      { id: '24', exercise: 'Deadlift', weight: 170, reps: 2, sets: 3, date: '2025-03-05' },
    ],
    'military-press': [
      { id: '25', exercise: 'Military Press', weight: 40, reps: 8, sets: 3, date: '2025-01-15' },
      { id: '26', exercise: 'Military Press', weight: 45, reps: 8, sets: 3, date: '2025-01-22' },
      { id: '27', exercise: 'Military Press', weight: 50, reps: 6, sets: 3, date: '2025-01-29' },
      { id: '28', exercise: 'Military Press', weight: 55, reps: 6, sets: 3, date: '2025-02-05' },
      { id: '29', exercise: 'Military Press', weight: 60, reps: 5, sets: 3, date: '2025-02-12' },
      { id: '30', exercise: 'Military Press', weight: 65, reps: 4, sets: 3, date: '2025-02-19' },
      { id: '31', exercise: 'Military Press', weight: 70, reps: 3, sets: 3, date: '2025-02-26' },
      { id: '32', exercise: 'Military Press', weight: 75, reps: 2, sets: 3, date: '2025-03-05' },
    ],
  };

  const exerciseNames = {
    'developpe-couche': 'Développé couché',
    squat: 'Squat',
    deadlift: 'Deadlift',
    'military-press': 'Military Press',
  };

  const currentProgressData = mockProgressData[selectedExercise] || [];
  const maxWeight = Math.max(...currentProgressData.map((p) => p.weight));
  const minWeight = Math.min(...currentProgressData.map((p) => p.weight));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center'>
              <TrendingUp className='w-5 h-5 text-teal-600' />
            </div>
            <div>
              <h2 className='text-2xl font-bold text-gray-800 font-champion'>
                Courbe de Progression
              </h2>
              <p className='text-gray-600'>Suivez l'évolution de vos performances</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'
          >
            <X className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        {/* Contenu */}
        <div className='p-6'>
          {/* Sélection d'exercice */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Exercice</label>
            <select
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
            >
              <option value='developpe-couche'>Développé couché</option>
              <option value='squat'>Squat</option>
              <option value='deadlift'>Deadlift</option>
              <option value='military-press'>Military Press</option>
            </select>
          </div>

          {/* Statistiques rapides */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div className='bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <Target className='w-6 h-6' />
                <div>
                  <p className='text-sm opacity-90'>Poids max actuel</p>
                  <p className='text-2xl font-bold'>{maxWeight} kg</p>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <TrendingUp className='w-6 h-6' />
                <div>
                  <p className='text-sm opacity-90'>Progression totale</p>
                  <p className='text-2xl font-bold'>{maxWeight - minWeight} kg</p>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg'>
              <div className='flex items-center space-x-3'>
                <Calendar className='w-6 h-6' />
                <div>
                  <p className='text-sm opacity-90'>Sessions</p>
                  <p className='text-2xl font-bold'>{currentProgressData.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphique */}
          <div className='bg-gray-50 rounded-xl p-6 mb-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              {exerciseNames[selectedExercise as keyof typeof exerciseNames]} - Évolution du poids
            </h3>

            {/* Graphique en barres */}
            <div className='h-64 relative'>
              {/* Lignes de grille horizontales */}
              <div className='absolute inset-0 flex flex-col justify-between text-xs text-gray-400'>
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div key={percent} className='flex items-center'>
                    <div className='w-full border-t border-gray-200'></div>
                    <span className='ml-2 w-12 text-right'>
                      {Math.round(maxWeight * (percent / 100))} kg
                    </span>
                  </div>
                ))}
              </div>

              {/* Barres de progression */}
              <div className='absolute inset-0 flex items-end justify-between px-4 pb-8'>
                {currentProgressData.map((progress, index) => {
                  const height = ((progress.weight - minWeight) / (maxWeight - minWeight)) * 100;
                  return (
                    <div key={progress.id} className='flex flex-col items-center space-y-2'>
                      <div
                        className='w-8 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg shadow-lg transition-all duration-300 hover:scale-110'
                        style={{ height: `${height}%` }}
                        title={`${progress.weight}kg × ${progress.reps} reps - ${formatDate(
                          progress.date
                        )}`}
                      />
                      <span className='text-xs text-gray-600 font-medium'>
                        {formatDate(progress.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tableau détaillé */}
          <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
            <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-800'>Historique détaillé</h3>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Date
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Poids
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Répétitions
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Séries
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {currentProgressData.map((progress) => (
                    <tr key={progress.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {new Date(progress.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {progress.weight} kg
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {progress.reps}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {progress.sets}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {progress.weight * progress.reps * progress.sets} kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChartModal;
