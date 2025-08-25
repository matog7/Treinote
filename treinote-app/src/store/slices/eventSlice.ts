// src/store/slices/eventsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

const initialState = {
  events: [] as Event[],
  current: null as any,
  status: "idle" as "idle" | "loading" | "succeeded" | "failed",
};

export const fetchEvents = createAsyncThunk(
  "events/fetch",
  async (q?: Record<string, string>) => {
    const { data } = await api.get("/events", { params: q });
    return data as any[];
  }
);
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id: string) => {
    const { data } = await api.get(`/events/${id}`);
    return data as any;
  }
);

const slice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchEvents.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchEvents.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.events = a.payload;
      })
      .addCase(fetchEvents.rejected, (s) => {
        s.status = "failed";
      })
      .addCase(fetchEventById.fulfilled, (s, a) => {
        s.current = a.payload;
      });
  },
});
export default slice.reducer;
