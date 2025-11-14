import React from "react";
import LatestTraining from "@/components/features/profile/LatestTraining";
import TextButton from "@/components/layout/TextButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import avatar from "@/assets/avatar.png";
import WeeklyCalendar from "@/components/ui/WeeklyCalendar";
import EventStats from "@/components/features/events/EventStats";

const Profile: React.FC = () => {
  const user = useSelector((s: RootState) => s.auth.user);
  return (
    <div className="min-h-screen bg-white mt-16 mb-6">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row items-center justify-start mb-8 border-b border-gray-200 pb-8">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full mr-4 shadow-lg border-2 border-gray-200 object-cover"
          />
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl font-bold font-audiowide text-center">
              {user?.pseudo}
            </h1>
            <p className="text-gray-600 mt-2">{user?.email}</p>
            <p className="text-gray-600">
              Inscrit le{" "}
              {new Date(user?.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <LatestTraining />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Mon PR</h3>
              <p className="text-gray-600 mb-4">
                Tu peux ajouter tes performances de séances, pour les partager
                avec tes amis et pour te rappeler de tes progrès.
              </p>
              <TextButton to="/my-training">Consulter le PR</TextButton>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <WeeklyCalendar />
            <EventStats />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Ma galerie</h3>
              <p className="text-gray-600 mb-4">
                Tu peux ajouter tes photos de séances, pour les partager avec
                tes amis et pour te rappeler de tes progrès.
              </p>
              <TextButton to="/my-training/gallery">
                Consulter la galerie
              </TextButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
