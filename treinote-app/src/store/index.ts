// src/store/index.ts
import { persistStore } from "redux-persist";
import store from "./configureStore"; // Assurez-vous que votre store est exporté par défaut depuis configureStore

const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store; // Retourne l'instance du store
const getState = () => store.getState(); // Récupère l'état actuel du store
const purgeStoreState = () => persistor.purge(); // Purge l'état persisté

export { getStore, getState, getPersistor, purgeStoreState };
