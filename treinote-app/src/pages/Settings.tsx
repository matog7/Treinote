import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/configureStore";
import {
  fetchPreferences,
  updatePreferences,
  resetPreferences,
  NavbarShortcut,
} from "@/store/slices/preferencesSlice";
import {
  Settings as SettingsIcon,
  RotateCcw,
  Save,
  Navigation,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/ui/ToastContainer";

const availablePages: { path: string; label: string }[] = [
  { path: "/", label: "Accueil" },
  { path: "/my-training", label: "Mon tableau d'entraînement" },
  { path: "/training", label: "Entrainement" },
  { path: "/community", label: "Communauté" },
  { path: "/events", label: "Événements" },
  { path: "/profile", label: "Mon profil" },
  { path: "/coaches", label: "Coachs" },
  { path: "/contact", label: "Contact" },
  { path: "/about", label: "À propos" },
];

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navbarShortcuts, status } = useSelector(
    (state: RootState) => state.preferences
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const { toasts, showSuccess, showError, removeToast } = useToast();
  const [shortcuts, setShortcuts] = useState<NavbarShortcut[]>(navbarShortcuts);

  // Charger les préférences depuis l'API au montage
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchPreferences(user.id));
    }
  }, [dispatch, user?.id]);

  // Synchroniser le state local avec le store Redux
  useEffect(() => {
    if (navbarShortcuts.length === 3) {
      setShortcuts(navbarShortcuts);
    }
  }, [navbarShortcuts]);

  const handleShortcutChange = (index: number, path: string) => {
    const selectedPage = availablePages.find((p) => p.path === path);
    if (selectedPage) {
      const newShortcuts = [...shortcuts];
      newShortcuts[index] = {
        id: selectedPage.path.replace("/", "") || "home",
        label: selectedPage.label,
        path: selectedPage.path,
      };
      setShortcuts(newShortcuts);
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      showError(
        "Erreur",
        "Vous devez être connecté pour sauvegarder vos préférences",
        3000
      );
      return;
    }

    // Vérifier qu'il n'y a pas de doublons
    const paths = shortcuts.map((s) => s.path);
    const uniquePaths = new Set(paths);
    if (uniquePaths.size !== paths.length) {
      showError(
        "Erreur",
        "Vous ne pouvez pas sélectionner la même page deux fois",
        3000
      );
      return;
    }

    try {
      await dispatch(
        updatePreferences({ userId: user.id, shortcuts })
      ).unwrap();
      showSuccess(
        "Paramètres sauvegardés",
        "Vos raccourcis de navigation ont été mis à jour",
        3000
      );
    } catch (error) {
      showError(
        "Erreur",
        "Impossible de sauvegarder les préférences. Veuillez réessayer.",
        3000
      );
    }
  };

  const handleReset = async () => {
    if (!user?.id) {
      showError(
        "Erreur",
        "Vous devez être connecté pour réinitialiser vos préférences",
        3000
      );
      return;
    }

    try {
      await dispatch(resetPreferences(user.id)).unwrap();
      setShortcuts([
        { id: "home", label: "Accueil", path: "/" },
        { id: "training", label: "Entrainement", path: "/training" },
        { id: "community", label: "Communauté", path: "/community" },
      ]);
      showSuccess(
        "Paramètres réinitialisés",
        "Les raccourcis par défaut ont été restaurés",
        3000
      );
    } catch (error) {
      showError(
        "Erreur",
        "Impossible de réinitialiser les préférences. Veuillez réessayer.",
        3000
      );
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 font-audiowide text-gray-800">
              Paramètres
            </h1>
            <p className="text-gray-600">
              Personnalisez votre expérience Treinote
            </p>
          </div>

          {/* Section Raccourcis de navigation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Navigation className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 font-champion">
                    Raccourcis de navigation
                  </h2>
                  <p className="text-sm text-gray-600">
                    Configurez les 3 raccourcis affichés dans la barre de
                    navigation
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Raccourci {index + 1}
                  </label>
                  <select
                    value={shortcut.path}
                    onChange={(e) =>
                      handleShortcutChange(index, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                  >
                    {availablePages.map((page) => (
                      <option key={page.path} value={page.path}>
                        {page.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Chemin:{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {shortcut.path}
                    </code>
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleReset}
                disabled={status === "loading" || !user?.id}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Réinitialiser</span>
              </button>
              <button
                onClick={handleSave}
                disabled={status === "loading" || !user?.id}
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sauvegarde...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Sauvegarder</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section Informations */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <SettingsIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 font-champion">
                  Informations
                </h2>
                <p className="text-sm text-gray-600">
                  Vos préférences sont sauvegardées localement
                </p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> Les modifications des raccourcis de
                navigation seront immédiatement visibles dans la barre de
                navigation après sauvegarde.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
