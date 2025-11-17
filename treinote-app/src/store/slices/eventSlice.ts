// src/store/slices/eventsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { Event } from "@/interfaces/event";

const initialState = {
  events: [] as Event[],
  stats: null as any,
  current: null as any,
  status: "idle" as "idle" | "loading" | "succeeded" | "failed",
};

export const fetchEvents = createAsyncThunk(
  "events/fetch",
  async (q?: Record<string, string>) => {
    const { data } = await api.get("/events/all", { params: q });
    return data as Event[];
  }
);
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id: string) => {
    const { data } = await api.get(`/events/${id}`);
    return data as any;
  }
);
export const fetchEventStatsUser = createAsyncThunk(
  "events/fetchStatsUser",
  async (id: string) => {
    const { data } = await api.get(`/events/statByUser/${id}`);
    return data as any;
  }
);
export const createEvent = createAsyncThunk(
  "events/create",
  async (event: Event) => {
    const { data } = await api.post("/events/create", event);
    return data as any;
  }
);
export const updateEvent = createAsyncThunk(
  "events/update",
  async (event: Event) => {
    const { data } = await api.put(`/events/${event.id}`, event);
    return data as any;
  }
);
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id: string) => {
    const { data } = await api.delete(`/events/${id}`);
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
      })
      .addCase(fetchEventStatsUser.fulfilled, (s, a) => {
        s.stats = a.payload;
      })
      .addCase(fetchEventStatsUser.rejected, (s) => {
        s.status = "failed";
      })
      .addCase(fetchEventStatsUser.pending, (s) => {
        s.status = "loading";
      })
      .addCase(createEvent.fulfilled, (s, a) => {
        s.events.push(a.payload);
      })
      .addCase(createEvent.rejected, (s) => {
        s.status = "failed";
      })
      .addCase(createEvent.pending, (s) => {
        s.status = "loading";
      })
      .addCase(updateEvent.fulfilled, (s, a) => {
        s.events = s.events.map((e) => (e.id === a.payload.id ? a.payload : e));
      })
      .addCase(updateEvent.rejected, (s) => {
        s.status = "failed";
      })
      .addCase(updateEvent.pending, (s) => {
        s.status = "loading";
      })
      .addCase(deleteEvent.fulfilled, (s, a) => {
        s.events = s.events.filter((e) => e.id !== a.payload.id);
      })
      .addCase(deleteEvent.rejected, (s) => {
        s.status = "failed";
      })
      .addCase(deleteEvent.pending, (s) => {
        s.status = "loading";
      });
  },
});
export default slice.reducer;
