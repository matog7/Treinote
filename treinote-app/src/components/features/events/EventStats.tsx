import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/configureStore";
import { fetchEventStatsUser } from "@/store/slices/eventSlice";
import { TrendingUp, Award } from "lucide-react";

const EventStats: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const stats = useSelector((s: RootState) => s.events.stats);

  useEffect(() => {
    const fetchEventStats = async () => {
      if (user?.id) {
        await dispatch(fetchEventStatsUser(user.id as string));
      }
    };
    fetchEventStats();
  }, [dispatch, user?.id]);

  // Calcul du niveau et de la progression
  const levelData = useMemo(() => {
    const eventCount = stats?.length || 0;

    // Définition des paliers de niveau (événements nécessaires pour chaque niveau)
    const levelThresholds = [0, 5, 10, 20, 35, 50, 75, 100, 150, 200];

    // Trouver le niveau actuel
    let currentLevel = 1;
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
      if (eventCount >= levelThresholds[i]) {
        currentLevel = i + 1;
        break;
      }
    }

    // Calculer la progression vers le niveau suivant
    const currentThreshold = levelThresholds[currentLevel - 1];
    const nextThreshold =
      levelThresholds[currentLevel] ||
      levelThresholds[levelThresholds.length - 1];
    const progressInLevel = eventCount - currentThreshold;
    const neededForNext = nextThreshold - currentThreshold;
    const progressPercentage = Math.min(
      (progressInLevel / neededForNext) * 100,
      100
    );

    return {
      currentLevel,
      eventCount,
      progressPercentage,
      nextThreshold,
      progressInLevel,
      neededForNext,
    };
  }, [stats]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 font-champion mb-6">
        Statistiques des évènements
      </h3>

      {/* Affichage du niveau */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-3 rounded-full">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Niveau actuel</p>
              <p className="text-3xl font-bold text-gray-800">
                Niveau {levelData.currentLevel}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Événements organisés</p>
            <p className="text-2xl font-bold text-teal-600">
              {levelData.eventCount}
            </p>
          </div>
        </div>

        {/* Jauge de progression */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Progression vers le niveau {levelData.currentLevel + 1}</span>
            <span>
              {levelData.progressInLevel} / {levelData.neededForNext}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
              style={{ width: `${levelData.progressPercentage}%` }}
            >
              {levelData.progressPercentage > 15 && (
                <span className="text-xs font-semibold text-white">
                  {Math.round(levelData.progressPercentage)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Message de motivation */}
        {levelData.progressPercentage < 100 ? (
          <p className="text-sm text-gray-600 mt-2">
            Il te reste{" "}
            <span className="font-semibold text-teal-600">
              {levelData.neededForNext - levelData.progressInLevel}
            </span>{" "}
            événement
            {levelData.neededForNext - levelData.progressInLevel > 1
              ? "s"
              : ""}{" "}
            à organiser pour atteindre le niveau {levelData.currentLevel + 1} !
          </p>
        ) : (
          <p className="text-sm text-teal-600 font-semibold mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            Félicitations ! Tu as atteint le niveau maximum !
          </p>
        )}
      </div>

      {/* Badges de niveau */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Paliers de niveau :
        </p>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((level) => {
            const isUnlocked = levelData.currentLevel >= level;
            return (
              <div
                key={level}
                className={`p-2 rounded-lg text-center ${
                  isUnlocked
                    ? "bg-teal-100 border-2 border-teal-500"
                    : "bg-gray-100 border-2 border-gray-300"
                }`}
              >
                <p
                  className={`text-xs font-bold ${
                    isUnlocked ? "text-teal-700" : "text-gray-400"
                  }`}
                >
                  Niv. {level}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventStats;
