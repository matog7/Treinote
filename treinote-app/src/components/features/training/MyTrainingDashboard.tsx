import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Plus,
  ChevronLeft,
  ChevronRight,
  PlusIcon,
  ChartColumnBig,
} from "lucide-react";
import AddTrainingModal from "../../modals/AddTrainingModal";
import TrainingDetailCard from "./TrainingDetailCard";
import ProgressChart from "./ProgressChart";
import { Training } from "../../../interfaces";
import before from "../../../assets/before.png";
import TextButton from "@/components/layout/TextButton";

const MyTrainingDashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);

  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: "1",
      title: "Session technique service",
      date: "2025-08-12",
      time: "09:00",
      duration: 90,
      intensity: 7,
      description: "Travail sur la technique de service",
      equipment: "Raquette, balles",
      notes: "Bien progressé sur le slice",
    },
    {
      id: "2",
      title: "Match d'entraînement",
      date: "2025-08-10",
      time: "14:00",
      duration: 120,
      intensity: 8,
      description: "Match contre un partenaire",
      equipment: "Raquette, balles, filet",
      notes: "Gagné 6-4, 7-5",
    },
    {
      id: "3",
      title: "Cardio tennis",
      date: "2025-07-25",
      time: "16:00",
      duration: 60,
      intensity: 9,
      description: "Entraînement cardio intensif",
      equipment: "Raquette, balles, chronomètre",
      notes: "Très fatiguant mais efficace",
    },
  ]);

  // Générer les jours du mois
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Ajouter les jours du mois précédent pour remplir la première semaine
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        hasTraining: false,
        trainings: [],
      });
    }

    // Ajouter les jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dateString = currentDate.toISOString().split("T")[0];
      const dayTrainings = trainings.filter(
        (training) => training.date === dateString
      );
      const hasTraining = dayTrainings.length > 0;

      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: isToday(currentDate),
        hasTraining,
        trainings: dayTrainings,
      });
    }

    // Ajouter les jours du mois suivant pour remplir la dernière semaine
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        hasTraining: false,
        trainings: [],
      });
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day: any) => {
    if (day.hasTraining && day.trainings.length > 0) {
      // Si plusieurs entraînements le même jour, prendre le premier
      setSelectedTraining(day.trainings[0]);
      setIsDetailCardOpen(true);
    }
  };

  const handleAddTraining = (newTraining: Training) => {
    setTrainings((prev) => [newTraining, ...prev]);
  };

  const closeDetailCard = () => {
    setIsDetailCardOpen(false);
    setSelectedTraining(null);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 font-audiowide mb-2">
                Mon Dashboard d'Entraînement
              </h1>
              <p className="text-lg text-gray-600">
                Suivez vos progrès et planifiez vos sessions
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 font-semibold flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Nouvel entraînement</span>
            </button>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Sessions ce mois
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      trainings.filter((t) => {
                        const trainingDate = new Date(t.date);
                        return (
                          trainingDate.getMonth() === currentDate.getMonth() &&
                          trainingDate.getFullYear() ===
                            currentDate.getFullYear()
                        );
                      }).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Heures totales
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      trainings.reduce((acc, t) => acc + t.duration, 0) / 60
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Intensité moyenne
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      trainings.reduce((acc, t) => acc + t.intensity, 0) /
                        trainings.length
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Série actuelle
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {trainings.length > 0 ? trainings.length : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendrier */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Header du calendrier */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 font-champion">
                  Calendrier des entraînements
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-teal-100/70 text-teal-700 rounded-lg hover:bg-teal-600 hover:text-white transition-colors font-medium"
                  >
                    Aujourd'hui
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                {getMonthName(currentDate)}
              </h3>

              {/* Grille du calendrier */}
              <div className="grid grid-cols-7 gap-1">
                {/* Jours de la semaine */}
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-semibold text-gray-600"
                  >
                    {day}
                  </div>
                ))}

                {/* Jours du mois */}
                {days.map((day, index) => (
                  <div
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={`
                      p-2 min-h-[60px] border border-gray-100 transition-all duration-200
                      ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"}
                      ${day.isToday ? "bg-teal-100 border-teal-300" : ""}
                      ${
                        day.hasTraining
                          ? "bg-green-100 border-green-300 hover:bg-green-200 cursor-pointer"
                          : "hover:bg-teal-50 hover:border-teal-200"
                      }
                      ${
                        !day.isCurrentMonth
                          ? "cursor-default"
                          : "cursor-pointer"
                      }
                    `}
                  >
                    <div className="text-right">
                      <span
                        className={`
                        text-sm font-medium
                        ${
                          day.isCurrentMonth ? "text-gray-900" : "text-gray-400"
                        }
                        ${day.isToday ? "text-teal-700 font-bold" : ""}
                      `}
                      >
                        {day.date.getDate()}
                      </span>
                    </div>
                    {day.hasTraining && (
                      <div className="mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
                        {day.trainings.length > 1 && (
                          <div className="text-xs text-green-600 text-center mt-1">
                            +{day.trainings.length - 1}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Légende */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-teal-100 border border-teal-300 rounded"></div>
                    <span>Aujourd'hui</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span>Entraînement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
                    <span>Autre mois</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Derniers entraînements */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 font-champion mb-6">
                Derniers entraînements
              </h2>

              <div className="space-y-4">
                {trainings.slice(0, 5).map((training) => (
                  <div
                    key={training.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedTraining(training);
                      setIsDetailCardOpen(true);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {training.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(training.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {training.time}
                      </span>
                      <span className="flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        {training.duration}min
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Niv.{training.intensity}
                      </span>
                    </div>

                    {training.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {training.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {trainings.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun entraînement enregistré</p>
                  <p className="text-sm">
                    Commencez par ajouter votre premier entraînement !
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Courbe de progression */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 font-champion">
                  Courbe de progression
                </h2>
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <p className="text-gray-600 mb-6">
                  Suivez l'évolution de vos performances sur vos exercices de
                  musculation préférés
                </p>

                <button
                  // onClick={() => setIsProgressModalOpen(true)}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span>Ajouter un suivi</span>
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between mt-6">
              <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 font-champion">
                    Avant / Après
                  </h2>
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <ChartColumnBig className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
                <div className="flex flex-col items-center space-x-2 mt-6">
                  <div className="flex flex-row items-center justify-center gap-4">
                    <img
                      src={before}
                      alt="Avant"
                      className="text-teal-600 object-contain w-1/2 h-1/2 rounded-lg"
                    />
                    <img
                      src={before}
                      alt="Avant"
                      className="text-teal-600 object-contain w-1/2 h-1/2 rounded-lg"
                    />
                  </div>
                  <TextButton to="/my-training/gallery">
                    Voir ma galerie
                  </TextButton>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <ProgressChart />
          </div>
        </div>
      </div>

      {/* Modal d'ajout d'entraînement */}
      <AddTrainingModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onAddTraining={handleAddTraining}
      />

      {/* Carte de détail des entraînements */}
      {selectedTraining && (
        <TrainingDetailCard
          training={selectedTraining}
          isOpen={isDetailCardOpen}
          onClose={closeDetailCard}
        />
      )}
    </div>
  );
};

export default MyTrainingDashboard;
