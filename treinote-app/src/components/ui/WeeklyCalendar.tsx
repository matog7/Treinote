import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/configureStore";
import { useState, useEffect } from "react";
import { Training } from "../../interfaces";
import { fetchTrainingsByUser } from "@/store/slices/trainingSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WeeklyCalendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchTrainingsByUser(Number(user.id)))
        .unwrap()
        .then((data) => setTrainings(data))
        .catch(() => {});
    }
  }, [dispatch, user]);

  const getDaysInWeek = (date: Date) => {
    // Obtenir le lundi de la semaine (début de semaine)
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Ajuster pour que lundi = 0
    const monday = new Date(date);
    monday.setDate(diff);

    const days = [];

    // Générer les 7 jours de la semaine (lundi à dimanche)
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(monday);
      currentDate.setDate(monday.getDate() + i);
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

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getWeekRange = (date: Date) => {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(date);
    monday.setDate(diff);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const mondayStr = monday.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
    const sundayStr = sunday.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${mondayStr} - ${sundayStr}`;
  };

  const goToPreviousWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInWeek(currentDate);
  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  return (
    <div className="flex flex-col gap-8">
      {/* Calendrier */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Header du calendrier */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 font-champion">
              Cette semaine
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousWeek}
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
                onClick={goToNextWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            {getWeekRange(currentDate)}
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

            {/* Jours de la semaine */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`
                      p-2 min-h-[60px] border border-gray-100 transition-all duration-200
                      bg-white
                      ${day.isToday ? "bg-teal-100 border-teal-300" : ""}
                      ${
                        day.hasTraining
                          ? "bg-green-100 border-green-300 hover:bg-green-200 cursor-pointer"
                          : "hover:bg-teal-50 hover:border-teal-200 cursor-pointer"
                      }
                    `}
              >
                <div className="text-right">
                  <span
                    className={`
                        text-sm font-medium
                        text-gray-900
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
