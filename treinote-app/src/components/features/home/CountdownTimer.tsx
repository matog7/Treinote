import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Date cible : 1er septembre 2025 (dans le futur) -> à voir lors de l'ajout d'une activité
    const targetDate = new Date('2025-09-01T00:00:00').getTime();

    const timer = setTimeout(() => setIsVisible(true), 100);

    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Événement terminé ou date passée
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <span className='bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-xs font-mono font-bold shadow-lg transform hover:scale-105 transition-all duration-300'>
      {value.toString().padStart(2, '0')} {label}
    </span>
  );

  return (
    <div
      className={`flex space-x-1 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <TimeUnit value={timeLeft.days} label='j' />
      <TimeUnit value={timeLeft.hours} label='h' />
      <TimeUnit value={timeLeft.minutes} label='m' />
      <TimeUnit value={timeLeft.seconds} label='s' />
    </div>
  );
};

export default CountdownTimer;
