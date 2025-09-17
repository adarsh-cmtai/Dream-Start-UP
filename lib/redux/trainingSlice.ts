import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../service/api";

// Training interface based on the Training model
export interface Training {
  id: string;
  title: string;
  description: string;
 ytLink?: string;
    seo?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
  timestamp: string;
  isActive: boolean;
}

// Pagination interface
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API Response interface
export interface TrainingResponse {
  trainings: Training[];
  page: number;
  limit: number;
  total: number;
}

// Fetch Trainings Parameters
export interface FetchTrainingsParams {
  page?: number;
  limit?: number;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

// Create Training Parameters
export interface CreateTrainingParams {
  title: string;
  description: string;
  ytLink: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
}

// Update Training Parameters
export interface UpdateTrainingParams {
  id: string;
  data: Partial<Omit<Training, 'id' | 'timestamp' >>;
}

// Slice state
interface TrainingsState {
  trainings: Training[];
  currentTraining: Training | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
}

const initialState: TrainingsState = {
  trainings: [],
  currentTraining: null,
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
export const fetchTrainings = createAsyncThunk<
  TrainingResponse,
  FetchTrainingsParams,
  { rejectValue: string }
>(
  "trainings/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, category, level } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(level && { level }),
      });
      
      const res = await api.get<TrainingResponse>(`training?${queryParams}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error fetching trainings");
    }
  }
);

export const fetchTrainingById = createAsyncThunk<Training, string, { rejectValue: string }>(
  "trainings/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get<Training>(`training/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Training not found");
    }
  }
);

export const addTraining = createAsyncThunk<
  { id: string; message: string },
  CreateTrainingParams,
  { rejectValue: string }
>(
  "trainings/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post<{ id: string; message: string }>("training", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error creating training");
    }
  }
);

export const updateTraining = createAsyncThunk<
  { message: string },
  UpdateTrainingParams,
  { rejectValue: string }
>(
  "trainings/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put<{ message: string }>(`training/${id}`, data);
      return { ...res.data, id, data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error updating training");
    }
  }
);

export const deleteTraining = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>(
  "trainings/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete<{ message: string }>(`training/${id}`);
      return { ...res.data, id };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error deleting training");
    }
  }
);

// Slice
const trainingsSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {
    clearCurrentTraining: (state) => {
      state.currentTraining = null;
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
    setCurrentTraining: (state, action: PayloadAction<Training>) => {
      state.currentTraining = action.payload;
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
      // Fetch all trainings with pagination
      .addCase(fetchTrainings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainings.fulfilled, (state, action: PayloadAction<TrainingResponse>) => {
        state.trainings = action.payload.trainings;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: Math.ceil(action.payload.total / action.payload.limit),
        };
        state.loading = false;
      })
      .addCase(fetchTrainings.rejected, (state, action) => {
        state.error = action.payload ?? "Error fetching trainings";
        state.loading = false;
      })

      // Fetch single training
      .addCase(fetchTrainingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingById.fulfilled, (state, action: PayloadAction<Training>) => {
        state.currentTraining = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrainingById.rejected, (state, action) => {
        state.error = action.payload ?? "Training not found";
        state.loading = false;
      })

      // Add training
      .addCase(addTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTraining.fulfilled, (state, action) => {
        state.loading = false;
        state.pagination.total += 1;
      })
      .addCase(addTraining.rejected, (state, action) => {
        state.error = action.payload ?? "Error creating training";
        state.loading = false;
      })

      // Update training
      .addCase(updateTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTraining.fulfilled, (state, action) => {
        const trainingId = action.meta.arg.id;
        const updateData = action.meta.arg.data;
        
        const trainingIndex = state.trainings.findIndex(training => training.id === trainingId);
        if (trainingIndex !== -1) {
          state.trainings[trainingIndex] = {
            ...state.trainings[trainingIndex],
            ...updateData,
          };
        }
        
        if (state.currentTraining?.id === trainingId) {
          state.currentTraining = {
            ...state.currentTraining,
            ...updateData,
          };
        }
        
        state.loading = false;
      })
      .addCase(updateTraining.rejected, (state, action) => {
        state.error = action.payload ?? "Error updating training";
        state.loading = false;
      })

      // Delete training (soft delete)
      .addCase(deleteTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        const trainingId = action.meta.arg;
        
        state.trainings = state.trainings.filter(training => training.id !== trainingId);
        
        if (state.currentTraining?.id === trainingId) {
          state.currentTraining = null;
        }
        
        state.pagination.total -= 1;
        state.loading = false;
      })
      .addCase(deleteTraining.rejected, (state, action) => {
        state.error = action.payload ?? "Error deleting training";
        state.loading = false;
      });
  },
});

export const { 
  clearCurrentTraining, 
  clearError, 
  setPaginationPage, 
  setPaginationLimit, 
  setCurrentTraining,
  resetPagination 
} = trainingsSlice.actions;

// Selectors
export const selectTrainings = (state: { trainings: TrainingsState }) => state.trainings.trainings;
export const selectTrainingsLoading = (state: { trainings: TrainingsState }) => state.trainings.loading;
export const selectTrainingsError = (state: { trainings: TrainingsState }) => state.trainings.error;
export const selectTrainingsPagination = (state: { trainings: TrainingsState }) => state.trainings.pagination;
export const selectCurrentTraining = (state: { trainings: TrainingsState }) => state.trainings.currentTraining;

// Additional selectors
export const selectTrainingsByCategory = (category: string) => 
  (state: { trainings: TrainingsState }) => 
    state.trainings.trainings.filter(training => training.category === category);

export const selectTrainingsByLevel = (level: 'beginner' | 'intermediate' | 'advanced') => 
  (state: { trainings: TrainingsState }) => 
    state.trainings.trainings.filter(training => training.level === level);

export const selectActiveTrainings = (state: { trainings: TrainingsState }) => 
  state.trainings.trainings.filter(training => training.isActive);

export const selectBeginnerTrainings = (state: { trainings: TrainingsState }) => 
  state.trainings.trainings.filter(training => training.level === 'beginner' && training.isActive);

export const selectIntermediateTrainings = (state: { trainings: TrainingsState }) => 
  state.trainings.trainings.filter(training => training.level === 'intermediate' && training.isActive);

export const selectAdvancedTrainings = (state: { trainings: TrainingsState }) => 
  state.trainings.trainings.filter(training => training.level === 'advanced' && training.isActive);

export default trainingsSlice.reducer;
