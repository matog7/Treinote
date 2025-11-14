// src/store/slices/trainingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { Training } from "@/interfaces/training";

type Status = "idle" | "loading" | "succeeded" | "failed";

type TrainingState = {
  items: Training[];
  latest: Training | null;
  status: Status;
  error?: string;
};

const initialState: TrainingState = {
  items: [],
  latest: null,
  status: "idle",
};

// Récupérer les entraînements pour un utilisateur (par son id)
export const fetchTrainingsByUser = createAsyncThunk(
  "training/fetchByUser",
  async (userId: number) => {
    const { data } = await api.get(`/training/trainings/${userId}`);
    return data as Training[];
  }
);

// Récupérer le dernier entraînement pour un utilisateur (par son id)
export const fetchLatestTrainingByUser = createAsyncThunk(
  "training/fetchLatestByUser",
  async (userId: number) => {
    const { data } = await api.get(`/training/latest/${userId}`);
    return data as Training;
  }
);

const slice = createSlice({
  name: "training",
  initialState,
  reducers: {
    clearTrainings: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingsByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrainingsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTrainingsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLatestTrainingByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLatestTrainingByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.latest = action.payload;
      })
      .addCase(fetchLatestTrainingByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearTrainings } = slice.actions;
export default slice.reducer;
