// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

export const login = createAsyncThunk('auth/login', async (payload: { email: string; password: string }) => {
  const { data } = await api.post('/auth/login', payload);
  api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  return data.user;
});

export const refresh = createAsyncThunk('auth/refresh', async () => {
  const { data } = await api.post('/auth/refresh');
  api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  return data.user;
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null as any, status: 'idle' as 'idle'|'loading'|'succeeded'|'failed' },
  reducers: { logoutLocal: (s) => { s.user = null; } },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => { s.status = 'loading'; })
     .addCase(login.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload; })
     .addCase(login.rejected, (s) => { s.status = 'failed'; })
     .addCase(refresh.fulfilled, (s, a) => { s.user = a.payload; });
  },
});
export const { logoutLocal } = slice.actions;
export default slice.reducer;