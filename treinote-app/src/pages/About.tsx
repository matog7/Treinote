import React, { useState, useEffect } from 'react';
import {
  Target,
  Users,
  Calendar,
  Trophy,
  Smartphone,
  Monitor,
  Download,
  Share2,
  Home,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Heart,
} from 'lucide-react';
import InstallationTabs from '../components/features/about/InstallationTabs';

const About: React.FC = () => {
  const [userAgent, setUserAgent] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Détecter le type d'appareil
    const agent = navigator.userAgent;
    setUserAgent(agent);
    setIsMobile(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent));
  }, []);

  const getDeviceType = () => {
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
    if (/Android/i.test(userAgent)) return 'Android';
    return 'Desktop';
  };

  const deviceType = getDeviceType();

  const features = [
    {
      icon: <Target className='w-8 h-8 text-teal-600' />,
      title: "Suivi d'Entraînement",
      description:
        'Enregistrez vos sessions, suivez votre progression et analysez vos performances avec des graphiques détaillés.',
    },
    {
      icon: <Users className='w-8 h-8 text-blue-600' />,
      title: 'Communauté',
      description:
        "Rejoignez des événements, participez à des compétitions et connectez-vous avec d'autres passionnés de tennis.",
    },
    {
      icon: <Calendar className='w-8 h-8 text-purple-600' />,
      title: 'Événements',
      description:
        'Découvrez des tournois, des entraînements collectifs et des workshops dans votre région.',
    },
    {
      icon: <Trophy className='w-8 h-8 text-yellow-600' />,
      title: 'Records Personnels',
      description:
        'Battez vos records, suivez vos objectifs et célébrez vos réussites avec un système de badges.',
    },
  ];

  const benefits = [
    {
      icon: <Zap className='w-6 h-6 text-green-500' />,
      text: 'Progression rapide avec des objectifs personnalisés',
    },
    {
      icon: <Heart className='w-6 h-6 text-red-500' />,
      text: 'Motivation constante grâce à la communauté',
    },
    {
      icon: <Star className='w-6 h-6 text-yellow-500' />,
      text: 'Suivi détaillé de vos performances',
    },
    {
      icon: <Users className='w-6 h-6 text-blue-500' />,
      text: 'Réseau de joueurs et coachs expérimentés',
    },
  ];

  return (
    <div className='min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-16'>
      <div className='mx-auto'>
        {/* En-tête de la page */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 font-audiowide mb-6'>
            À Propos de Treinote
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Votre compagnon de tennis intelligent pour progresser, vous connecter et exceller sur le
            court
          </p>
        </div>

        {/* Section Utilité de l'Application */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white rounded-3xl shadow-xl p-8 mb-12 lg:col-span-1'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800 font-champion mb-4'>
                Pourquoi Treinote ?
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Treinote révolutionne votre expérience du tennis en combinant technologie et passion
              </p>
            </div>

            {/* Fonctionnalités principales */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200'
                >
                  <div className='flex-shrink-0'>{feature.icon}</div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-800 mb-2'>{feature.title}</h3>
                    <p className='text-gray-600 leading-relaxed'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Avantages */}
            <div className='bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white'>
              <h3 className='text-2xl font-bold mb-4 text-center'>Vos Avantages</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {benefits.map((benefit, index) => (
                  <div key={index} className='flex items-center space-x-3'>
                    {benefit.icon}
                    <span className='text-teal-50'>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Détection d'Appareil */}
          <div className='bg-white rounded-3xl shadow-xl p-8 mb-12 lg:col-span-1'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800 font-champion mb-4'>
                Détection de Votre Appareil
              </h2>
              <p className='text-lg text-gray-600'>
                Nous avons détecté que vous utilisez un appareil{' '}
                {deviceType === 'Desktop' ? 'de bureau' : deviceType}
              </p>
            </div>

            <div className='flex items-center justify-center space-x-4 mb-6'>
              {deviceType === 'iOS' ? (
                <div className='flex items-center space-x-2 text-blue-600'>
                  <Smartphone className='w-8 h-8' />
                  <span className='text-xl font-semibold'>iPhone/iPad</span>
                </div>
              ) : deviceType === 'Android' ? (
                <div className='flex items-center space-x-2 text-green-600'>
                  <Smartphone className='w-8 h-8' />
                  <span className='text-xl font-semibold'>Android</span>
                </div>
              ) : (
                <div className='flex items-center space-x-2 text-gray-600'>
                  <Monitor className='w-8 h-8' />
                  <span className='text-xl font-semibold'>Ordinateur</span>
                </div>
              )}
            </div>

            {deviceType === 'Desktop' && (
              <div className='text-center p-6 bg-blue-50 rounded-2xl'>
                <p className='text-blue-800 mb-4'>
                  💡 <strong>Conseil :</strong> Pour une meilleure expérience, testez Treinote sur
                  votre smartphone !
                </p>
                <div className='flex items-center justify-center space-x-4'>
                  <div className='flex items-center space-x-2'>
                    <Smartphone className='w-5 h-5 text-blue-600' />
                    <span className='text-sm text-blue-700'>Scannez le QR code</span>
                  </div>
                  <ArrowRight className='w-4 h-4 text-blue-600' />
                  <span className='text-sm text-blue-700'>Ajoutez à l'écran d'accueil</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Installation sur Écran d'Accueil */}
        <InstallationTabs deviceType={deviceType} />

        {/* Section Avantages de l'Installation */}
        <div className='bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl shadow-xl p-8 text-white'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold font-champion mb-4'>Avantages de l'Installation</h2>
            <p className='text-xl opacity-90'>
              Pourquoi ajouter Treinote à votre écran d'accueil ?
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm'>
              <Home className='w-12 h-12 mx-auto mb-4 text-teal-200' />
              <h3 className='text-xl font-bold mb-2'>Accès Rapide</h3>
              <p className='opacity-90'>Un clic depuis votre écran d'accueil</p>
            </div>

            <div className='text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm'>
              <Zap className='w-12 h-12 mx-auto mb-4 text-teal-200' />
              <h3 className='text-xl font-bold mb-2'>Performance</h3>
              <p className='opacity-90'>Chargement plus rapide et fluide</p>
            </div>

            <div className='text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm'>
              <CheckCircle className='w-12 h-12 mx-auto mb-4 text-teal-200' />
              <h3 className='text-xl font-bold mb-2'>Expérience Native</h3>
              <p className='opacity-90'>Comme une vraie application mobile</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <div className='bg-white rounded-3xl shadow-xl p-8'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
              Prêt à Transformer Votre Tennis ?
            </h3>
            <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
              Rejoignez la communauté Treinote et commencez votre voyage vers l'excellence sur le
              court
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2'>
                <Download className='w-5 h-5' />
                <span>Commencer Maintenant</span>
              </button>
              <button className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2'>
                <Share2 className='w-5 h-5' />
                <span>Partager Treinote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
