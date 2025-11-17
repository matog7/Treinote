// src/store/slices/preferencesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export interface NavbarShortcut {
  id: string;
  label: string;
  path: string;
}

interface PreferencesState {
  navbarShortcuts: NavbarShortcut[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const defaultShortcuts: NavbarShortcut[] = [
  { id: "home", label: "Accueil", path: "/" },
  { id: "training", label: "Entrainement", path: "/training" },
  { id: "community", label: "Communauté", path: "/community" },
];

const initialState: PreferencesState = {
  navbarShortcuts: defaultShortcuts,
  status: "idle",
};

// Récupérer les préférences depuis l'API
export const fetchPreferences = createAsyncThunk(
  "preferences/fetch",
  async (userId: string | number) => {
    const { data } = await api.get(`/preferences/${userId}`);
    return data.navbar_shortcuts as NavbarShortcut[];
  }
);

// Mettre à jour les préférences via l'API
export const updatePreferences = createAsyncThunk(
  "preferences/update",
  async ({
    userId,
    shortcuts,
  }: {
    userId: string | number;
    shortcuts: NavbarShortcut[];
  }) => {
    const { data } = await api.put(`/preferences/${userId}`, {
      navbar_shortcuts: shortcuts,
    });
    return data.navbar_shortcuts as NavbarShortcut[];
  }
);

// Réinitialiser les préférences via l'API
export const resetPreferences = createAsyncThunk(
  "preferences/reset",
  async (userId: string | number) => {
    await api.delete(`/preferences/${userId}`);
    return defaultShortcuts;
  }
);

const slice = createSlice({
  name: "preferences",
  initialState: initialState,
  reducers: {
    // Action locale pour mettre à jour sans API (utilisée temporairement)
    updateNavbarShortcuts: (state, action: PayloadAction<NavbarShortcut[]>) => {
      state.navbarShortcuts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch preferences
      .addCase(fetchPreferences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.navbarShortcuts = action.payload || defaultShortcuts;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.navbarShortcuts = defaultShortcuts;
      })
      // Update preferences
      .addCase(updatePreferences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.navbarShortcuts = action.payload;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Reset preferences
      .addCase(resetPreferences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPreferences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.navbarShortcuts = action.payload;
      })
      .addCase(resetPreferences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateNavbarShortcuts } = slice.actions;
export default slice.reducer;
