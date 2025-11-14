import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/configureStore";
import { fetchLatestTrainingByUser } from "@/store/slices/trainingSlice";
import { getIntensityColor, getIntensityLabel } from "@/utils/methods";
import {
  Clock,
  TrendingUp,
  Target,
  FileText,
  Dumbbell,
  MapPin,
  BarChart,
} from "lucide-react";
import TextButton from "@/components/layout/TextButton";

const LatestTraining: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const latestTraining = useSelector((s: RootState) => s.training.latest);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchLatestTrainingByUser(Number(user.id)));
    }
  }, [dispatch, user]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 font-champion">
            Dernier entraînement
          </h2>
          <h3 className="text-xl font-bold">{latestTraining?.title}</h3>
          <p className="text-sm text-gray-600 mb-4">
            Séance du{" "}
            {new Date(latestTraining?.date || "").toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
            })}
          </p>
          <div className="p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-600">Heure de début</p>
                  <p className="text-sm font-bold text-gray-900">
                    {latestTraining?.time}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-600">Durée</p>
                  <p className="text-sm font-bold text-gray-900">
                    {latestTraining?.duration} min
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-600">Intensité</p>
                  <div className="flex items-center justify-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getIntensityColor(
                        latestTraining?.intensity || 0
                      )}`}
                    >
                      {getIntensityLabel(latestTraining?.intensity || 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Description */}
                {latestTraining?.description && (
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-teal-600" />
                      Description
                    </h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm max-h-[100px] overflow-y-auto">
                      <p className="text-gray-700">
                        {latestTraining?.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Équipement */}
                {latestTraining?.equipment && (
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                      <Dumbbell className="w-5 h-5 mr-2 text-teal-600" />
                      Équipement
                    </h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm max-h-[100px] overflow-y-auto">
                      <p className="text-gray-700">
                        {latestTraining?.equipment}
                      </p>
                    </div>
                  </div>
                )}

                {/* Notes personnelles */}
                {latestTraining?.notes && (
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                      Notes
                    </h4>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm max-h-[100px] overflow-y-auto ellipsis-text">
                      <p className="text-gray-700">{latestTraining?.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Statistiques de performance */}
              <div className="bg-gradient-to-r from-gray-50 to-teal-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 text-center flex items-center justify-center space-x-8">
                  <BarChart className="w-5 h-5 text-teal-600" /> Statistiques de
                  la session
                </h3>
                <div className="grid grid-cols-2">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-md font-bold text-teal-600">
                        {Math.round(latestTraining?.duration || 0 / 60)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Heures</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-md font-bold text-orange-600">
                        {latestTraining?.intensity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Intensité</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TextButton to="/my-training">Voir l'entraînement</TextButton>
        </div>
      </div>
    </div>
  );
};

export default LatestTraining;
