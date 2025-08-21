import React from "react";
import CountdownTimer from "./CountdownTimer";
import eventImage from "../../../assets/muscu.png";
import { MapPin, Calendar1 } from "lucide-react";
import RightButton from "@/components/layout/RightButton";

const EventSection: React.FC = () => {
  return (
    <section className="mb-12 h-full">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={eventImage}
          alt="Séance d'entraînement"
          className="w-full h-[720px] md:h-[760px] object-cover"
        />

        {/* Badge texte en haut à droite (style carte blanche) */}
        <div className="absolute top-4 right-4 max-w-xs">
          <div className="bg-white/90 text-gray-900 rounded-2xl p-4 shadow-md">
            <h3 className="text-md font-semibold font-audiowide mb-1">
              Débloque ton plein potentiel
            </h3>
            <p className="text-xs text-gray-600">
              Conseils d'experts, recommandations de matériel et entraînement de
              niveau pro.
            </p>
          </div>
        </div>

        {/* Panneau blanc arrondi superposé en bas (infos + timer) */}
        <div className="absolute left-4 right-4 bottom-4">
          <div className="bg-white/90 rounded-2xl shadow-xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4 items-center">
              <div>
                <h4 className="text-md font-semibold text-black mb-1">
                  Rejoins-nous
                </h4>
                <div className="flex flex-col text-left text-xs gap-1">
                  <div className="flex flex-row space-x-1 text-black/60">
                    <MapPin className="w-4 h-4" />
                    <span>Larmor-Plage</span>
                  </div>

                  <div className="flex flex-row space-x-1 text-black/60">
                    <Calendar1 className="w-4 h-4" />
                    <span>1er Septembre 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-black/60 text-left whitespace-nowrap">
                  Fin des inscriptions :
                </span>
                <CountdownTimer />
              </div>
              <RightButton to="/events">→</RightButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
          Objectif
        </span>
        <p className="text-gray-700">
          Maîtrise tes gestes, perfectionne tes mouvements, et domine avec des
          exercices experts.
        </p>
      </div>
    </section>
  );
};

export default EventSection;
