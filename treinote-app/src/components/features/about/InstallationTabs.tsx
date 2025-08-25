import React, { useState } from "react";
import { Smartphone, ArrowRight, CheckCircle, Download } from "lucide-react";
import { FaApple, FaAndroid } from "react-icons/fa";

interface InstallationTabsProps {
  deviceType: string;
}

const InstallationTabs: React.FC<InstallationTabsProps> = ({ deviceType }) => {
  const [activeTab, setActiveTab] = useState<"iOS" | "Android">("iOS");

  const iosSteps = [
    {
      step: 1,
      title: "Ouvrez Safari sur votre iPhone/iPad",
      description: "Naviguez vers treinote-app.com",
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
    },
    {
      step: 2,
      title: "Appuyez sur l'icône de partage",
      description: "Trouvez le bouton carré avec une flèche vers le haut",
      icon: <Download className="w-5 h-5 text-blue-600" />,
    },
    {
      step: 3,
      title: "Sélectionnez 'Sur l'écran d'accueil'",
      description: "Choisissez cette option dans le menu de partage",
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
    },
    {
      step: 4,
      title: "Personnalisez et ajoutez",
      description: "Modifiez le nom si souhaité et appuyez sur 'Ajouter'",
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
    },
  ];

  const androidSteps = [
    {
      step: 1,
      title: "Ouvrez Chrome sur votre appareil Android",
      description: "Naviguez vers treinote-app.com",
      icon: <Smartphone className="w-5 h-5 text-green-600" />,
    },
    {
      step: 2,
      title: "Appuyez sur le menu (3 points)",
      description: "Trouvez l'icône avec trois points verticaux",
      icon: <Download className="w-5 h-5 text-green-600" />,
    },
    {
      step: 3,
      title: "Sélectionnez 'Ajouter à l'écran d'accueil'",
      description: "Choisissez cette option dans le menu",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      step: 4,
      title: "Confirmez l'ajout",
      description: "Appuyez sur 'Ajouter' pour finaliser",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
  ];

  const tabColor = activeTab === "iOS" ? "blue" : "green";

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 font-audiowide mb-4">
          Ajouter Treinote à Votre Écran d'Accueil
        </h2>
        <p className="text-lg text-gray-600">
          Transformez Treinote en application native pour un accès rapide et une
          expérience optimale
        </p>
      </div>

      {/* Onglets iOS et Android */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-2xl p-1">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("iOS")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === "iOS"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center`}
                >
                  <FaApple className="w-3 h-3 text-white" />
                </div>
                <span>iPhone/iPad</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("Android")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === "Android"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 bg-green-600 rounded-full flex items-center justify-center`}
                >
                  <FaAndroid className="w-3 h-3 text-white" />
                </div>
                <span>Android</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Instructions iOS */}
      {activeTab === "iOS" && (
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FaApple className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-800">
                Instructions pour iPhone/iPad
              </h3>
              <p className="text-blue-700">
                Suivez ces étapes simples pour installer Treinote
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {iosSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">
                    {step.step}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {step.icon}
                    <h4 className="text-blue-800 font-semibold">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions Android */}
      {activeTab === "Android" && (
        <div className="bg-green-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <FaAndroid className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">
                Instructions pour Android
              </h3>
              <p className="text-green-700">
                Suivez ces étapes simples pour installer Treinote
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {androidSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">
                    {step.step}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {step.icon}
                    <h4 className="text-green-800 font-semibold">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conseils supplémentaires */}
      <div className={`bg-${tabColor}-100 rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-4">
          <div
            className={`w-10 h-10 bg-${tabColor}-600 rounded-full flex items-center justify-center`}
          >
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h4 className={`text-xl font-bold text-${tabColor}-800`}>
            Conseils d'Installation
          </h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle
              className={`w-5 h-5 text-${tabColor}-600 mt-0.5 flex-shrink-0`}
            />
            <p className={`text-${tabColor}-700`}>
              Assurez-vous d'être connecté à Internet pendant l'installation
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle
              className={`w-5 h-5 text-${tabColor}-600 mt-0.5 flex-shrink-0`}
            />
            <p className={`text-${tabColor}-700`}>
              L'icône apparaîtra sur votre écran d'accueil après l'installation
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle
              className={`w-5 h-5 text-${tabColor}-600 mt-0.5 flex-shrink-0`}
            />
            <p className={`text-${tabColor}-700`}>
              Vous pouvez déplacer l'icône comme n'importe quelle autre
              application
            </p>
          </div>
        </div>
      </div>

      {/* Détection d'appareil */}
      {deviceType === "Desktop" && (
        <div className="mt-6 text-center p-6 bg-blue-50 rounded-2xl">
          <p className="text-blue-800 mb-4">
            💡 <strong>Conseil :</strong> Pour une meilleure expérience, testez
            Treinote sur votre smartphone !
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-700">Scannez le QR code</span>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">
              Ajoutez à l'écran d'accueil
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallationTabs;
