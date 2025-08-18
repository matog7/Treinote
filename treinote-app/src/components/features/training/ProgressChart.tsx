import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, ChartColumn } from 'lucide-react';
import { ProgressData } from '../../../interfaces';
import ExpandButton from '../../layout/ExpandButton';
import ProgressApexChart from '../../ui/ProgressApexChart';

const ProgressChart: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<string>('developpe-couche');
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

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
      { id: '13', exercise: 'Squat', weight: 60, reps: 5, sets: 3, date: '2025-02-12' },
      { id: '14', exercise: 'Squat', weight: 105, reps: 4, sets: 3, date: '2025-02-19' },
      { id: '15', exercise: 'Squat', weight: 110, reps: 3, sets: 3, date: '2025-02-26' },
      { id: '16', exercise: 'Squat', weight: 115, reps: 2, sets: 3, date: '2025-03-05' },
    ],
    deadlift: [
      { id: '17', exercise: 'Deadlift', weight: 100, reps: 8, sets: 3, date: '2025-01-15' },
      { id: '18', exercise: 'Deadlift', weight: 110, reps: 8, sets: 3, date: '2025-01-22' },
      { id: '20', exercise: 'Deadlift', weight: 130, reps: 6, sets: 3, date: '2025-02-05' },
      { id: '21', exercise: 'Deadlift', weight: 140, reps: 5, sets: 3, date: '2025-02-12' },
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
    'triceps-extension': [],
  };

  const exerciseNames = {
    'developpe-couche': 'Développé couché',
    squat: 'Squat',
    deadlift: 'Deadlift',
    'military-press': 'Military Press',
    'triceps-extension': 'Triceps Extension',
  };

  const currentProgressData = mockProgressData[selectedExercise] || [];

  return (
    <div className='bg-white rounded-2xl shadow-xl p-6'>
      {/* Header */}
      <div className='flex items-center space-x-3 mb-6'>
        <div className='w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center'>
          <ChartColumn className='w-5 h-5 text-teal-600' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-800 font-champion'>
            Vos suivis de progression
          </h2>
          <p className='text-gray-600'>Suivez l'évolution de vos performances</p>
        </div>
      </div>

      {/* Contenu */}
      <div>
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
            <option value='triceps-extension'>Triceps Extension</option>
          </select>
        </div>

        {/* Statistiques rapides */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-lg'>
            <div className='flex items-center space-x-3'>
              <Target className='w-6 h-6' />
              <div>
                <p className='text-sm opacity-90'>Poids max actuel</p>
                <p className='text-2xl font-bold'>
                  {currentProgressData.length > 0
                    ? Math.max(...currentProgressData.map((p) => p.weight))
                    : 0}{' '}
                  kg
                </p>
              </div>
            </div>
          </div>
          <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg'>
            <div className='flex items-center space-x-3'>
              <TrendingUp className='w-6 h-6' />
              <div>
                <p className='text-sm opacity-90'>Progression totale</p>
                <p className='text-2xl font-bold'>
                  {currentProgressData.length > 0
                    ? Math.max(...currentProgressData.map((p) => p.weight)) -
                      Math.min(...currentProgressData.map((p) => p.weight))
                    : 0}{' '}
                  kg
                </p>
              </div>
            </div>
          </div>
          <div className='bg-gradient-to-r from-orange-400 to-orange-300 text-white p-4 rounded-lg'>
            <div className='flex items-center space-x-3'>
              <Calendar className='w-6 h-6' />
              <div>
                <p className='text-sm opacity-90'>Sessions</p>
                <p className='text-2xl font-bold'>{currentProgressData.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphique ApexCharts */}
        <div className='bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            {exerciseNames[selectedExercise as keyof typeof exerciseNames]} - Évolution du poids
          </h3>

          <ProgressApexChart
            data={currentProgressData}
            exerciseName={exerciseNames[selectedExercise as keyof typeof exerciseNames]}
          />
        </div>

        {/* Tableau détaillé */}
        <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
          <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-800'>Historique détaillé</h3>
          </div>
          <div
            className={`overflow-x-auto transition-all duration-300 ${
              isHistoryExpanded ? 'max-h-none' : 'max-h-64'
            }`}
          >
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

          {/* Bouton d'expansion */}
          <div className='px-6 py-4 shadow-lg backdrop-blur-sm bg-white/25 text-center border-t border-gray-200'>
            <ExpandButton
              isExpanded={isHistoryExpanded}
              onToggle={() => setIsHistoryExpanded(!isHistoryExpanded)}
              expandedText="Réduire l'historique"
              collapsedText="Voir tout l'historique"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
