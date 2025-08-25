import React from "react";
import LeftButton from "./LeftButton";

interface SoonProps {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

const Soon: React.FC<SoonProps> = ({
  title = "Bientôt disponible",
  description = "Cette page arrive très prochainement. Revenez nous voir d'ici peu !",
  backHref = "/",
  backLabel = "← Retour à l’accueil",
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-sm">
          <span className="text-2xl font-bold">⏳</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-audiowide mb-3">
          {title}
        </h1>
        <p className="text-gray-600 mb-8">{description}</p>
        <div className="flex justify-center">
          <LeftButton to={backHref}>{backLabel}</LeftButton>
        </div>
      </div>
    </div>
  );
};

export default Soon;
