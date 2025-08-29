import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eventImage from "@/assets/muscu.png";
import { FaGoogle } from "react-icons/fa";
import { Facebook } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/authSlice";
import type { RootState, AppDispatch } from "@/store/configureStore";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((s: RootState) => s.auth.status);
  const navigate = useNavigate();
  const isLoading = authStatus === "loading";
  const isFailed = authStatus === "failed";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => navigate("/my-training"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Colonne gauche: image de fond + gradient */}
        <motion.div
          className="relative h-48 md:h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <img
            src={eventImage}
            alt="Séance d'entraînement"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/70 via-teal-700/50 to-black/40" />
          <div className="absolute bottom-4 left-4 right-4 hidden md:block">
            <h3 className="text-white text-2xl font-bold font-audiowide">
              Treinote
            </h3>
            <p className="text-white/90 text-sm">
              Suivre, progresser, évoluer.
            </p>
          </div>
        </motion.div>

        {/* Colonne droite: contenu et formulaire */}
        <motion.div
          className="p-8 sm:p-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          {/* Header */}
          <div className="text-center">
            <Link
              to="/"
              className="text-4xl font-bold text-gray-800 font-audiowide hover:text-teal-600 transition-colors"
            >
              Treinote
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 font-champion">
              L’entraînement qui laisse une trace.
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous pour accéder à votre espace d'entraînement
            </p>
          </div>

          {/* Formulaire de connexion */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded "
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "transform hover:scale-105"
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : undefined}
                whileTap={!isLoading ? { scale: 0.98 } : undefined}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-teal-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </span>
                {isLoading ? "Connexion..." : "Se connecter"}
              </motion.button>
            </div>
            {isFailed && (
              <div className="mt-4 text-sm text-red-600 text-center">
                Les identifiants saisis sont invalides.
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  to="/register"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>

          {/* Séparateur */}
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white">Ou continuer avec</span>
            </div>
          </div>

          {/* Boutons sociaux */}
          <div className="flex flex-row justify-center gap-8 mt-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 text-black bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-250 hover:border-2 hover:border-teal-500 hover:text-teal-600"
            >
              <FaGoogle className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 text-black bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-250 hover:border-2 hover:border-teal-500 hover:text-teal-600"
            >
              <Facebook className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
