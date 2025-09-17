import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../service/api";

// Service interface
export interface Service {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  timestamp?: string;
  image?: string;
  tags?: string[];
}

// Slice state
interface ServicesState {
  services: Service[];
  currentService: Service | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  currentService: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchServices = createAsyncThunk<Service[], void, { rejectValue: string }>(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<{ services: Service[]; page: number; limit: number; total: number }>("services");
      return res.data.services;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error fetching services");
    }
  }
);

export const fetchServiceById = createAsyncThunk<Service, string, { rejectValue: string }>(
  "services/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get<Service>(`services/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Service not found");
    }
  }
);

export const addService = createAsyncThunk<Service, Omit<Service, 'id' | 'timestamp'>, { rejectValue: string }>(
  "services/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post<Service>("services", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error creating service");
    }
  }
);

export const updateService = createAsyncThunk<Service, { id: string; data: Partial<Omit<Service, 'id' | 'timestamp'>> }, { rejectValue: string }>(
  "services/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put<Service>(`services/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error updating service");
    }
  }
);

export const deleteService = createAsyncThunk<string, string, { rejectValue: string }>(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`services/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error deleting service");
    }
  }
);

// Slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearCurrentService: (state) => {
      state.currentService = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.payload ?? "Error fetching services";
        state.loading = false;
      })

      // Fetch by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action: PayloadAction<Service>) => {
        state.currentService = action.payload;
        state.loading = false;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.error = action.payload ?? "Service not found";
        state.loading = false;
      })

      // Add
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action: PayloadAction<Service>) => {
        state.services.push(action.payload);
        state.loading = false;
      })
      .addCase(addService.rejected, (state, action) => {
        state.error = action.payload ?? "Error creating service";
        state.loading = false;
      })

      // Update
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action: PayloadAction<Service>) => {
        const index = state.services.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
        if (state.currentService?.id === action.payload.id) {
          state.currentService = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.error = action.payload ?? "Error updating service";
        state.loading = false;
      })

      // Delete
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action: PayloadAction<string>) => {
        state.services = state.services.filter((s) => s.id !== action.payload);
        if (state.currentService?.id === action.payload) {
          state.currentService = null;
        }
        state.loading = false;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.payload ?? "Error deleting service";
        state.loading = false;
      });
  },
});

export const { clearCurrentService, clearError } = servicesSlice.actions;

// Define RootState properly here or import from store
export interface RootState {
  services: ServicesState;
}

export const selectServices = (state: RootState) => state.services.services;
export const selectServicesLoading = (state: RootState) => state.services.loading;
export const selectServicesError = (state: RootState) => state.services.error;

export default servicesSlice.reducer;
