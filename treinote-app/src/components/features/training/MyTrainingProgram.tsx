import React, { useState } from "react";
import AddTrainingModal from "../../modals/AddTrainingModal";
import TrainingImage from "@/assets/basket-training.png";

const MyTrainingProgram: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTraining = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <AddTrainingModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center">
        <div className="lg:col-span-2">
          <img src={TrainingImage} className="rounded-lg shadow-xl" />
        </div>
        <div className="h-full relative m-8">
          <div className="absolute inset-0 flex items-center">
            <div className="h-full border border-gray-200" />
          </div>
        </div>
        <div className="flex flex-col text-left gap-8 lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              Mon programme d'entrainement
            </h3>
            <p className="text-gray-600 mb-4">
              Accessible à tous les niveaux, tu peux ajouter ton propre
              programme d'entrainement, quand tu l'as fait et ce que tu as fait.
            </p>
            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
              Commencer l'entrainement
            </button>
          </div>
          <button
            onClick={handleAddTraining}
            className="w-full text-black py-2 px-4 rounded-lg hover:translate-x-2 transition-all duration-300 hover:text-teal-600 flex items-center justify-center font-medium"
          >
            Ajouter tes propres séances →
          </button>
        </div>
      </div>
    </>
  );
};

export default MyTrainingProgram;
