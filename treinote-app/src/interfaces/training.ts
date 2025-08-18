export interface Training {
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

export interface ProgressData {
  id: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
  date: string;
}
