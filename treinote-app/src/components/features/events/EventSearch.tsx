import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Target, X, Euro } from 'lucide-react';
import { EventFilters } from '@/interfaces/event';
import { difficulties, statuses, priceRanges, dateRanges } from '@/utils/consts';

interface EventSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: EventFilters) => void;
  onClearFilters: () => void;
}

const EventSearch: React.FC<EventSearchProps> = ({ onSearch, onFilterChange, onClearFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<EventFilters>({
    category: '',
    difficulty: '',
    status: '',
    priceRange: '',
    dateRange: '',
    location: '',
  });

  const categories = [
    'Tous',
    'Tennis',
    'Entraînement',
    'Compétition',
    'Formation',
    'Social',
    'Technique',
    'Tournoi',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof EventFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      difficulty: '',
      status: '',
      priceRange: '',
      dateRange: '',
      location: '',
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some((filter) => filter !== '');

  return (
    <div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
      {/* Barre de recherche principale */}
      <form onSubmit={handleSearch} className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type='text'
            placeholder='Rechercher des événements...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg'
          />
          <button
            type='submit'
            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white px-2 py-2 rounded-full transition-colors duration-200'
          >
            <Search className='w-4 h-4' />
          </button>
        </div>
      </form>

      {/* Bouton des filtres */}
      <div className='flex items-center justify-between mb-4'>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200'
        >
          <Filter className='w-4 h-4' />
          <span>Filtres</span>
          {hasActiveFilters && (
            <span className='bg-teal-600 text-white text-xs rounded-full px-2 py-1'>
              {Object.values(filters).filter((f) => f !== '').length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className='flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm transition-colors duration-200'
          >
            <X className='w-4 h-4' />
            <span>Effacer les filtres</span>
          </button>
        )}
      </div>

      {/* Panneau des filtres */}
      {showFilters && (
        <div className='border-t border-gray-200 pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Catégorie */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Target className='w-4 h-4 inline mr-2' />
                Catégorie
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'Tous' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulté */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Target className='w-4 h-4 inline mr-2' />
                Niveau
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty === 'Tous niveaux' ? '' : difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            {/* Statut */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Calendar className='w-4 h-4 inline mr-2' />
                Statut
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                {statuses.map((status) => (
                  <option key={status} value={status === 'Tous' ? '' : status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Fourchette de prix */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Euro className='w-4 h-4 inline mr-2' />
                Prix
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range === 'Tous les prix' ? '' : range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Plage de dates */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Calendar className='w-4 h-4 inline mr-2' />
                Période
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range === 'Toutes les dates' ? '' : range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Localisation */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <MapPin className='w-4 h-4 inline mr-2' />
                Localisation
              </label>
              <input
                type='text'
                placeholder='Ville, région...'
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              />
            </div>
          </div>

          {/* Filtres actifs */}
          {hasActiveFilters && (
            <div className='mt-6 pt-4 border-t border-gray-200'>
              <h4 className='text-sm font-medium text-gray-700 mb-3'>Filtres actifs :</h4>
              <div className='flex flex-wrap gap-2'>
                {Object.entries(filters).map(([key, value]) => {
                  if (value) {
                    return (
                      <span
                        key={key}
                        className='inline-flex items-center px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full'
                      >
                        {value}
                        <button
                          onClick={() => handleFilterChange(key as keyof EventFilters, '')}
                          className='ml-2 text-teal-600 hover:text-teal-800'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventSearch;
