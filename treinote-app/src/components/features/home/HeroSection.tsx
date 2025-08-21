import React from "react";
import SocialLinks from "./SocialLinks";
import CallToAction from "./CallToAction";
import player from "../../../assets/2497.jpg";

const HeroSection: React.FC = () => {
  return (
    <section className=" text-black py-12 md:py-20 rounded-lg h-full">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 md:gap-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 font-audiowide text-center md:text-left">
            Dépasse tes limites
          </h1>
          <p className="text-gray-700 text-base md:text-sm mb-6 md:mb-8 text-center md:text-left w-full md:w-1/2">
            Pousse dans tes retranchements. Maîtrise chaque exercice.
          </p>
        </div>

        <div className="flex flex-row justify-center items-center mb-12 gap-8">
          <div className="flex flex-col items-center gap-4">
            <img
              src={player}
              alt="Tennis Player"
              className="w-56 h-72 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] object-cover rounded-lg shadow-2xl"
            />
            <CallToAction />
          </div>
          <div className="flex flex-col items-center">
            <SocialLinks />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-audiowide">
            Entraîne toi comme un champion
          </h2>
          <div className="flex items-center justify-center space-x-6">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:border-2 hover:border-teal-300/60 hover:text-teal-500 transition-all duration-150 flex items-center justify-center text-lg md:text-xl font-bold hover:scale-110">
              ←
            </button>
            <span className="text-gray-700 md:text-lg font-medium">
              Trouve le parfait exercice
            </span>
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:border-2 hover:border-teal-300/60 hover:text-teal-500 transition-all duration-150 flex items-center justify-center text-lg md:text-xl font-bold hover:scale-110">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
