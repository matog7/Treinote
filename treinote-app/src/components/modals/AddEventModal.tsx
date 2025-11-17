import React, { useState } from "react";
import { Event } from "@/interfaces/event";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Users,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/ui/ToastContainer";

interface AddEventModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onAddEvent: (event: Event) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onAddEvent,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { toasts, showError, removeToast } = useToast();
  const [formData, setFormData] = useState<Event>({
    id: "",
    organizer_id: "",
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    location: "",
    category: "",
    maxparticipants: 0,
    currentparticipants: 0,
    organizer: {
      name: "",
      avatar: "",
      rating: 0,
    },
    price: 0,
    difficulty: "beginner",
    tags: [],
    image: "",
    status: "upcoming",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: value
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddEvent = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validation des champs requis
    if (!formData.title.trim()) {
      showError("Champ requis", "Le titre est requis");
      return;
    }
    if (!formData.category.trim()) {
      showError("Champ requis", "La catégorie est requise");
      return;
    }
    if (!formData.date) {
      showError("Champ requis", "La date est requise");
      return;
    }
    if (!formData.time) {
      showError("Champ requis", "L'heure est requise");
      return;
    }
    if (!formData.location.trim()) {
      showError("Champ requis", "Le lieu est requis");
      return;
    }
    if (!formData.maxparticipants || formData.maxparticipants < 1) {
      showError(
        "Champ requis",
        "Le nombre de participants maximum doit être au moins 1"
      );
      return;
    }

    const newEvent: Event = {
      ...formData,
      maxparticipants: Number(formData.maxparticipants),
      currentparticipants: 0,
      price: Number(formData.price),
      difficulty: formData.difficulty as
        | "beginner"
        | "intermediate"
        | "advanced",
      status: formData.status as "upcoming" | "ongoing" | "completed",
      organizer: {
        name: user?.pseudo || user?.name || "",
        avatar: user?.avatar || "",
        rating: user?.rating || 0,
      },
      organizer_id: user?.id || "",
    };

    if (onAddEvent) {
      onAddEvent(newEvent);
    }

    // Reset form
    setFormData({
      id: Date.now().toString(),
      organizer_id: user?.id || "",
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "12:00",
      location: "",
      category: "",
      maxparticipants: 0,
      currentparticipants: 0,
      organizer: {
        name: "",
        avatar: "",
        rating: 0,
      },
      price: 0,
      difficulty: "beginner",
      tags: [],
      image: "",
      status: "upcoming",
    });

    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8" />
                <h2 className="text-2xl font-bold font-audiowide">
                  Créer un événement
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-teal-200 transition-colors p-2 rounded-full hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-teal-100 mt-2">
              Organisez votre événement sportif et partagez-le avec la
              communauté
            </p>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEvent();
              }}
            >
              {/* Première ligne - Titre et Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-2 text-teal-600" />
                    Titre de l'événement *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Ex: Tournoi de tennis amical"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <Tag className="w-4 h-4 mr-2 text-teal-600" />
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Ex: Tennis, Football, Basketball..."
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2 text-teal-600" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                  placeholder="Décrivez votre événement, les règles, les objectifs..."
                />
              </div>

              {/* Deuxième ligne - Date et Heure */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2 text-teal-600" />
                    Heure de début *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Troisième ligne - Lieu et Participants */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                    Lieu *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Ex: Stade municipal, Court n°3..."
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="maxparticipants"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <Users className="w-4 h-4 mr-2 text-teal-600" />
                    Nombre de participants maximum *
                  </label>
                  <input
                    type="number"
                    id="maxparticipants"
                    name="maxparticipants"
                    value={formData.maxparticipants}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="10"
                    required
                  />
                </div>
              </div>

              {/* Quatrième ligne - Prix et Difficulté */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <DollarSign className="w-4 h-4 mr-2 text-teal-600" />
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <TrendingUp className="w-4 h-4 mr-2 text-teal-600" />
                    Niveau de difficulté *
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  >
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancé</option>
                  </select>
                </div>
              </div>

              {/* Cinquième ligne - Tags et Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <Tag className="w-4 h-4 mr-2 text-teal-600" />
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Ex: compétition, amical, mixte (séparés par des virgules)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Séparez les tags par des virgules
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <ImageIcon className="w-4 h-4 mr-2 text-teal-600" />
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>
              </div>

              {/* Statut */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-600" />
                  Statut *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  required
                >
                  <option value="upcoming">À venir</option>
                  <option value="ongoing">En cours</option>
                  <option value="completed">Terminé</option>
                </select>
              </div>
            </form>
          </div>

          {/* Footer avec bouton d'envoi */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
            <div className="flex space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleAddEvent}
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 font-semibold flex items-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Créer l'événement</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventModal;
