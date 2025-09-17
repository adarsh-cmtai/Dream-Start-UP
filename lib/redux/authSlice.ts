// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../service/api";

// 1️⃣ Types
export interface User {
  uid: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}


// 3️⃣ Async Thunks
export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: { error: string } }
>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      return data.user as User;
    } catch (error: any) {
      return rejectWithValue({ error: error.response?.data?.message || error.message });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: { error: string } }
>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/me");
      return data.user as User;
    } catch (error: any) {
      return rejectWithValue({ error: error.response?.data?.message || error.message });
    }
  }
);

export const logoutUser = createAsyncThunk<void>(
  "auth/logoutUser",
  async () => {
    await api.post("/auth/logout");
  }
);

// 4️⃣ Initial State
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// 5️⃣ Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); // Optional if using localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ? action.payload.error : "Unknown error";
        state.loading = false;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload.error : "Unknown error";
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

// 6️⃣ Export Actions & Reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
