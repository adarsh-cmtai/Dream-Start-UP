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

// Pagination interface
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API Response interface
export interface ServiceResponse {
  services: Service[];
  pagination: PaginationMeta;
}

// Fetch Services Parameters
export interface FetchServicesParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Slice state
interface ServicesState {
  services: Service[];
  currentService: Service | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
}

const initialState: ServicesState = {
  services: [],
  currentService: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Async thunks
export const fetchServices = createAsyncThunk<
  ServiceResponse,
  FetchServicesParams,
  { rejectValue: string }
>(
  "services/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, search = "" } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });
      
      const res = await api.get<ServiceResponse>(`services?${queryParams}`);
      return res.data;
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
    setPaginationPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setPaginationLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
    },
    resetPagination: (state) => {
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all with pagination
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<ServiceResponse>) => {
        state.services = action.payload.services;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.payload ?? "Error fetching services";
        state.loading = false;
      })

      // Add
      .addCase(addService.fulfilled, (state, action: PayloadAction<Service>) => {
        state.services.unshift(action.payload);
        state.pagination.total += 1;
        state.loading = false;
      })

      // Update
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

      // Delete
      .addCase(deleteService.fulfilled, (state, action: PayloadAction<string>) => {
        state.services = state.services.filter((s) => s.id !== action.payload);
        if (state.currentService?.id === action.payload) {
          state.currentService = null;
        }
        state.pagination.total -= 1;
        state.loading = false;
      });
  },
});

export const { 
  clearCurrentService, 
  clearError, 
  setPaginationPage, 
  setPaginationLimit, 
  resetPagination 
} = servicesSlice.actions;

// Selectors
export const selectServices = (state: { services: ServicesState }) => state.services.services;
export const selectServicesLoading = (state: { services: ServicesState }) => state.services.loading;
export const selectServicesError = (state: { services: ServicesState }) => state.services.error;
export const selectServicesPagination = (state: { services: ServicesState }) => state.services.pagination;
export const selectCurrentService = (state: { services: ServicesState }) => state.services.currentService;

export default servicesSlice.reducer;
