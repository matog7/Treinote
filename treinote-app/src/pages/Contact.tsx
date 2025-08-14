import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ui/ToastContainer';
import LeftButton from '../components/layout/LeftButton';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, showSuccess, showError, removeToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Contact form submitted:', formData);

      // Afficher le toast de succès
      showSuccess('Message envoyé !', 'Nous vous répondrons dans les plus brefs délais.', 6000);

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      // Afficher le toast d'erreur
      showError(
        "Erreur lors de l'envoi",
        'Veuillez réessayer ou nous contacter directement.',
        8000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h1 className='text-5xl font-bold text-gray-900 font-audiowide mb-4'>Contactez-nous</h1>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Prêt à améliorer votre jeu de tennis ? Notre équipe d'experts est là pour vous aider.
              N'hésitez pas à nous contacter pour toute question ou demande.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Informations de contact */}
            <div className='space-y-8'>
              <div>
                <h2 className='text-3xl font-bold text-gray-800 font-champion mb-6'>
                  Parlons de votre progression
                </h2>
                <p className='text-lg text-gray-600 mb-8'>
                  Que vous soyez débutant ou joueur confirmé, nous avons les ressources et
                  l'expertise pour vous faire progresser. Contactez-nous pour commencer votre voyage
                  vers l'excellence.
                </p>
              </div>

              {/* Détails de contact */}
              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center'>
                    <Mail className='w-6 h-6 text-teal-600' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800'>Email</h3>
                    <p className='text-gray-600'>contact@treinote.com</p>
                    <p className='text-gray-600'>support@treinote.com</p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center'>
                    <Phone className='w-6 h-6 text-teal-600' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800'>Téléphone</h3>
                    <p className='text-gray-600'>+33 1 23 45 67 89</p>
                    <p className='text-gray-600'>Lun-Ven: 9h-18h</p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center'>
                    <MapPin className='w-6 h-6 text-teal-600' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800'>Adresse</h3>
                    <p className='text-gray-600'>123 Avenue du Tennis</p>
                    <p className='text-gray-600'>75001 Paris, France</p>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className='pt-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Suivez-nous</h3>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white hover:bg-teal-700 transition-colors'
                  >
                    <span className='text-sm font-bold'>f</span>
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white hover:bg-teal-700 transition-colors'
                  >
                    <span className='text-sm font-bold'>in</span>
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white hover:bg-teal-700 transition-colors'
                  >
                    <span className='text-sm font-bold'>t</span>
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white hover:bg-teal-700 transition-colors'
                  >
                    <span className='text-sm font-bold'>yt</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className='bg-white rounded-2xl shadow-xl p-8'>
              <h2 className='text-2xl font-bold text-gray-800 font-champion mb-6'>
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                      Nom complet *
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='text'
                        id='name'
                        name='name'
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                        placeholder='Votre nom'
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                      Email *
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='email'
                        id='email'
                        name='email'
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                        placeholder='votre@email.com'
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm font-medium text-gray-700 mb-2'>
                    Sujet *
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                    placeholder='Comment pouvons-nous vous aider ?'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>
                    Message *
                  </label>
                  <div className='relative'>
                    <MessageSquare className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                    <textarea
                      id='message'
                      name='message'
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none'
                      placeholder='Décrivez votre demande en détail...'
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2'
                >
                  {isSubmitting ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className='w-5 h-5' />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>

              <div className='mt-6 text-center'>
                <p className='text-sm text-gray-500'>
                  En soumettant ce formulaire, vous acceptez notre{' '}
                  <a href='#' className='text-teal-600 hover:text-teal-700 font-medium'>
                    politique de confidentialité
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* CTA de retour */}
          <div className='flex justify-center mt-16'>
            <LeftButton to='/'>← Back to home</LeftButton>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
};

export default Contact;
