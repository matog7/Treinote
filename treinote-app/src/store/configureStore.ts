import {
  configureStore,
  combineReducers,
  createAction,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { authReducer, eventsReducer, trainingReducer } from "@/store/slices";

const persistConfig = {
  key: "treinote",
  storage,
};
export const resetAllSlices = createAction("resetAllSlices");
const combinedReducers = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  training: trainingReducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: any
) => {
  return combinedReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        immutableCheck: false,
        serializableCheck: false,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["payload.headers"], // Ignore les headers dans le payload
      },
    }).concat(logger),
  // POUR EMPÊCHER LA VISIBILITÉ DU STORE UNE FOIS L'APP DEPLOYÉE
  // const store = configureStore({
  //   reducer: persistedReducer,
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         immutableCheck: false,
  //         serializableCheck: false,
  //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  //       }
  //     }).concat(
  //       process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging' ? [logger] : []  =>>> AJOUTER CECI
  //     ),
  //   devTools: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging'
  // });
});
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof combinedReducers> & {
  _persist: { version: number; rehydrated: boolean };
};

export default store;
