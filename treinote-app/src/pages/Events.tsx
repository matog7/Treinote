import React, { useState, useMemo } from 'react';
import { Plus, Calendar, Users, Check, Tally1, Tally2, Tally3 } from 'lucide-react';
import EventSearch from '@/components/features/events/EventSearch';
import EventCard from '@/components/features/events/EventCard';
import { EventFilters, Event } from '@/interfaces/event';

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<EventFilters>({
    category: '',
    difficulty: '',
    status: '',
    priceRange: '',
    dateRange: '',
    location: '',
  });

  // Données factices pour la démonstration
  const events: Event[] = [
    {
      id: '1',
      title: 'Tournoi de Tennis Local - Printemps 2025',
      description:
        "Compétition amicale ouverte à tous les niveaux. Venez défier d'autres joueurs dans une ambiance conviviale !",
      date: '2025-04-15',
      time: '09:00',
      location: 'Tennis Club de Lyon',
      category: 'Tennis',
      maxParticipants: 32,
      currentParticipants: 28,
      price: 25,
      difficulty: 'intermediate',
      organizer: {
        name: 'Tennis Club Lyon',
        rating: 4.8,
      },
      tags: ['Tennis', 'Compétition', 'Printemps'],
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Workshop Technique - Service et Volée',
      description:
        'Perfectionnez votre service et votre jeu de volée avec nos coachs expérimentés. Session intensive de 3 heures.',
      date: '2025-03-22',
      time: '14:00',
      location: 'Centre Sportif de Villeurbanne',
      category: 'Formation',
      maxParticipants: 12,
      currentParticipants: 8,
      price: 45,
      difficulty: 'advanced',
      organizer: {
        name: 'Coach Pro Tennis',
        rating: 4.9,
      },
      tags: ['Technique', 'Service', 'Volée'],
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Entraînement Collectif Débutants',
      description:
        "Session d'entraînement pour les joueurs débutants. Apprentissage des bases et exercices pratiques.",
      date: '2025-03-20',
      time: '18:00',
      location: 'Complexe Sportif de Bron',
      category: 'Entraînement',
      maxParticipants: 16,
      currentParticipants: 12,
      price: 0,
      difficulty: 'beginner',
      organizer: {
        name: 'Association Tennis Bron',
        rating: 4.5,
      },
      tags: ['Débutant', 'Entraînement', 'Gratuit'],
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Match Exhibition - Champions vs Amateurs',
      description:
        'Spectacle unique avec des matchs entre professionnels et amateurs. Animation et démonstrations.',
      date: '2025-03-18',
      time: '16:00',
      location: 'Stade de Gerland',
      category: 'Compétition',
      maxParticipants: 200,
      currentParticipants: 180,
      price: 15,
      difficulty: 'intermediate',
      organizer: {
        name: 'Fédération Tennis Rhône',
        rating: 4.7,
      },
      tags: ['Exhibition', 'Professionnels', 'Spectacle'],
      status: 'upcoming',
    },
    {
      id: '5',
      title: 'Championnat Interclubs - Phase Finale',
      description:
        "Finale du championnat interclubs de la région. Les meilleures équipes s'affrontent pour le titre.",
      date: '2025-03-10',
      time: '10:00',
      location: 'Tennis Club de Caluire',
      category: 'Tournoi',
      maxParticipants: 64,
      currentParticipants: 64,
      price: 0,
      difficulty: 'advanced',
      organizer: {
        name: 'Ligue Tennis Auvergne-Rhône-Alpes',
        rating: 4.9,
      },
      tags: ['Championnat', 'Finale', 'Interclubs'],
      status: 'completed',
    },
    {
      id: '6',
      title: 'Soirée Sociale - Dîner des Joueurs',
      description:
        'Soirée conviviale pour tous les membres du club. Dîner, échanges et networking dans une ambiance détendue.',
      date: '2025-03-25',
      time: '19:30',
      location: 'Restaurant du Club',
      category: 'Social',
      maxParticipants: 50,
      currentParticipants: 35,
      price: 35,
      difficulty: 'beginner',
      organizer: {
        name: 'Tennis Club Lyon',
        rating: 4.6,
      },
      tags: ['Social', 'Dîner', 'Networking'],
      status: 'upcoming',
    },
    {
      id: '7',
      title: 'Stage Vacances - Pâques 2025',
      description:
        'Stage intensif pendant les vacances de Pâques. Progression rapide garantie avec nos méthodes éprouvées.',
      date: '2025-04-07',
      time: '09:00',
      location: 'Complexe Sportif de Tassin',
      category: 'Formation',
      maxParticipants: 20,
      currentParticipants: 15,
      price: 120,
      difficulty: 'intermediate',
      organizer: {
        name: 'Académie Tennis Pro',
        rating: 4.8,
      },
      tags: ['Stage', 'Vacances', 'Intensif'],
      status: 'upcoming',
    },
    {
      id: '8',
      title: 'Open de Lyon - Qualification',
      description:
        "Tournoi de qualification pour l'Open de Lyon. Une chance de se qualifier pour la compétition principale.",
      date: '2025-03-05',
      time: '08:00',
      location: 'Tennis Club de Lyon',
      category: 'Tournoi',
      maxParticipants: 48,
      currentParticipants: 48,
      price: 30,
      difficulty: 'advanced',
      organizer: {
        name: 'Open de Lyon',
        rating: 4.9,
      },
      tags: ['Qualification', 'Open', 'Compétition'],
      status: 'completed',
    },
  ];

  // Filtrage des événements
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Filtre de recherche
      const matchesSearch =
        searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filtre de catégorie
      const matchesCategory =
        activeFilters.category === '' || event.category === activeFilters.category;

      // Filtre de difficulté
      const matchesDifficulty =
        activeFilters.difficulty === '' ||
        (activeFilters.difficulty === 'Débutant' && event.difficulty === 'beginner') ||
        (activeFilters.difficulty === 'Intermédiaire' && event.difficulty === 'intermediate') ||
        (activeFilters.difficulty === 'Avancé' && event.difficulty === 'advanced');

      // Filtre de statut
      const matchesStatus =
        activeFilters.status === '' ||
        (activeFilters.status === 'À venir' && event.status === 'upcoming') ||
        (activeFilters.status === 'En cours' && event.status === 'ongoing') ||
        (activeFilters.status === 'Terminé' && event.status === 'completed');

      // Filtre de prix
      const matchesPrice =
        activeFilters.priceRange === '' ||
        (activeFilters.priceRange === 'Gratuit' && event.price === 0) ||
        (activeFilters.priceRange === '0-20€' && event.price > 0 && event.price <= 20) ||
        (activeFilters.priceRange === '20-50€' && event.price > 20 && event.price <= 50) ||
        (activeFilters.priceRange === '50€+' && event.price > 50);

      // Filtre de localisation
      const matchesLocation =
        activeFilters.location === '' ||
        event.location.toLowerCase().includes(activeFilters.location.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesStatus &&
        matchesPrice &&
        matchesLocation
      );
    });
  }, [events, searchQuery, activeFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: EventFilters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({
      category: '',
      difficulty: '',
      status: '',
      priceRange: '',
      dateRange: '',
      location: '',
    });
    setSearchQuery('');
  };

  const handleJoinEvent = (eventId: string) => {
    // Logique pour rejoindre un événement
    console.log(`Rejoindre l'événement ${eventId}`);
    // Ici vous pourriez ouvrir une modal de confirmation ou rediriger vers une page d'inscription
  };

  const handleViewDetails = (eventId: string) => {
    // Logique pour voir les détails d'un événement
    console.log(`Voir les détails de l'événement ${eventId}`);
    // Ici vous pourriez rediriger vers une page de détails ou ouvrir une modal
  };

  const upcomingEvents = filteredEvents.filter((event) => event.status === 'upcoming').length;
  const ongoingEvents = filteredEvents.filter((event) => event.status === 'ongoing').length;
  const completedEvents = filteredEvents.filter((event) => event.status === 'completed').length;

  return (
    <div className='min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-16'>
      <div className='max-w-7xl mx-auto'>
        {/* En-tête de la page */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 font-audiowide mb-4'>
            Découvrez les Événements
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Trouvez et participez aux meilleurs événements de tennis, entraînements et compétitions
            de votre région
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-teal-600 text-white p-6 rounded-xl text-center '>
            <Calendar className='w-8 h-8 mx-auto mb-3' />
            <p className='text-2xl font-bold'>{upcomingEvents}</p>
            <p className='text-sm opacity-90'>À venir</p>
          </div>

          <div className='bg-teal-600 text-white p-6 rounded-xl text-center'>
            <Users className='w-8 h-8 mx-auto mb-3' />
            <p className='text-2xl font-bold'>{ongoingEvents}</p>
            <p className='text-sm opacity-90'>En cours</p>
          </div>

          <div className='bg-teal-600 text-white p-6 rounded-xl text-center'>
            <Check className='w-8 h-8 mx-auto mb-3' />
            <p className='text-2xl font-bold'>{completedEvents}</p>
            <p className='text-sm opacity-90'>Terminés</p>
          </div>
        </div>

        {/* Composant de recherche et filtres */}
        <EventSearch
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Bouton créer un événement */}
        <div className='text-center mb-8'>
          <button className='bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto'>
            <Plus className='w-5 h-5' />
            <span>Créer un événement</span>
          </button>
        </div>

        {/* Résultats de la recherche */}
        <div className='mb-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 font-champion'>
              {filteredEvents.length === 0
                ? 'Aucun événement trouvé'
                : `${filteredEvents.length} événement${
                    filteredEvents.length > 1 ? 's' : ''
                  } trouvé${filteredEvents.length > 1 ? 's' : ''}`}
            </h2>

            {filteredEvents.length > 0 && (
              <div className='text-sm text-gray-400'>
                {searchQuery ? (
                  `Résultats pour "${searchQuery}"`
                ) : (
                  <div className='flex items-center'>
                    {' '}
                    <div className='mr-4 flex items-center'>
                      <Tally1 className='w-6 h-6' /> Niveau débutant
                    </div>
                    <div className='mr-4 flex items-center'>
                      <Tally2 className='w-6 h-6' /> Niveau intermédiaire
                    </div>
                    <div className='mr-4 flex items-center'>
                      <Tally3 className='w-6 h-6' /> Niveau avancé
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Grille des événements */}
        {filteredEvents.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onJoin={handleJoinEvent}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <Calendar className='w-16 h-16 mx-auto mb-4 text-gray-300' />
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>Aucun événement trouvé</h3>
            <p className='text-gray-500 mb-6'>
              Essayez de modifier vos critères de recherche ou vos filtres
            </p>
            <button
              onClick={handleClearFilters}
              className='bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors duration-200'
            >
              Effacer tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
