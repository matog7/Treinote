// src/store/slices/trainingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { Training } from "@/interfaces/training";

type Status = "idle" | "loading" | "succeeded" | "failed";

type TrainingState = {
  items: Training[];
  status: Status;
  error?: string;
};

const initialState: TrainingState = {
  items: [],
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
      });
  },
});

export const { clearTrainings } = slice.actions;
export default slice.reducer;