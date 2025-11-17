export interface Event {
  id: string;
  event_id?: string;
  organizer_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxparticipants: number;
  currentparticipants: number;
  price: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  organizer: {
    name: string;
    avatar?: string;
    rating: number;
  };
  tags: string[];
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface EventFilters {
  category: string;
  difficulty: string;
  status: string;
  priceRange: string;
  dateRange: string;
  location: string;
}
