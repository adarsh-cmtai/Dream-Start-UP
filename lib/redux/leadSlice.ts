import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../service/api";

// Lead interface based on your Contact model
export interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  message?: string;
  timestamp: string; // Stored as string, but can be converted to Date
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  updatedBy?: string; // If your backend tracks who updated it
  updatedAt?: string; // If your backend tracks when it was updated
}

// Pagination interface (can be shared across slices if identical)
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

// API Response interface for fetching multiple leads
export interface LeadsResponse {
  contacts: Lead[]; // Your backend returns 'contacts' not 'leads'
  pagination: PaginationMeta;
}

// Fetch Leads Parameters
export interface FetchLeadsParams {
  page?: number;
  limit?: number;
  status?: 'pending' | 'in_progress' | 'resolved' | 'closed';
  search?: string;
}

// Update Lead Status Parameters
export interface UpdateLeadStatusParams {
  id: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
}

// Slice state
interface LeadsState {
  leads: Lead[];
  currentLead: Lead | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
}

const initialState: LeadsState = {
  leads: [],
  currentLead: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  },
};

// Async thunks
export const fetchLeads = createAsyncThunk<
  LeadsResponse,
  FetchLeadsParams,
  { rejectValue: string }
>(
  "leads/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, status, search } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
        ...(search && { search }),
      });
      
      const res = await api.get<LeadsResponse>(`contact?${queryParams}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error fetching leads");
    }
  }
);

export const fetchLeadById = createAsyncThunk<Lead, string, { rejectValue: string }>(
  "leads/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get<Lead>(`contact/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Lead not found");
    }
  }
);

export const updateLeadStatus = createAsyncThunk<
  { message: string },
  UpdateLeadStatusParams,
  { rejectValue: string }
>(
  "leads/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch<{ message: string }>(`contact/${id}/status`, { status });
      return { ...res.data, id, status }; // Return id and new status for optimistic updates
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error updating lead status");
    }
  }
);

export const deleteLead = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>(
  "leads/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete<{ message: string }>(`contact/${id}`);
      return { ...res.data, id }; // Return id for optimistic updates
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error deleting lead");
    }
  }
);

// Slice
const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    clearCurrentLead: (state) => {
      state.currentLead = null;
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
    setCurrentLead: (state, action: PayloadAction<Lead>) => {
      state.currentLead = action.payload;
    },
    resetPagination: (state) => {
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all leads with pagination
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action: PayloadAction<LeadsResponse>) => {
        state.leads = action.payload.contacts; // Use action.payload.contacts
        state.pagination = action.payload.pagination; // Assign entire pagination object
        state.loading = false;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.error = action.payload ?? "Error fetching leads";
        state.loading = false;
      })

      // Fetch single lead
      .addCase(fetchLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.currentLead = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.error = action.payload ?? "Lead not found";
        state.loading = false;
      })

      // Update lead status
      .addCase(updateLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const { id, status } = action.meta.arg; // Get id and new status from meta.arg
        
        // Update the lead in the main leads array
        const leadIndex = state.leads.findIndex(lead => lead.id === id);
        if (leadIndex !== -1) {
          state.leads[leadIndex] = {
            ...state.leads[leadIndex],
            status: status,
            // You might want to add updatedBy/updatedAt here if returned by API
          };
        }
        
        // Update currentLead if it's the one being edited
        if (state.currentLead?.id === id) {
          state.currentLead = {
            ...state.currentLead,
            status: status,
            // You might want to add updatedBy/updatedAt here if returned by API
          };
        }
        state.loading = false;
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.error = action.payload ?? "Error updating lead status";
        state.loading = false;
      })

      // Delete lead
      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        const leadId = action.meta.arg; // Get the id from meta.arg
        
        state.leads = state.leads.filter(lead => lead.id !== leadId);
        
        if (state.currentLead?.id === leadId) {
          state.currentLead = null;
        }
        
        state.pagination.total -= 1; // Decrement total count
        state.loading = false;
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.error = action.payload ?? "Error deleting lead";
        state.loading = false;
      });
  },
});

export const { 
  clearCurrentLead, 
  clearError, 
  setPaginationPage, 
  setPaginationLimit, 
  setCurrentLead,
  resetPagination 
} = leadsSlice.actions;

// Selectors
export const selectLeads = (state: { leads: LeadsState }) => state.leads.leads;
export const selectLeadsLoading = (state: { leads: LeadsState }) => state.leads.loading;
export const selectLeadsError = (state: { leads: LeadsState }) => state.leads.error;
export const selectLeadsPagination = (state: { leads: LeadsState }) => state.leads.pagination;
export const selectCurrentLead = (state: { leads: LeadsState }) => state.leads.currentLead;

// Additional selectors
export const selectLeadsByStatus = (status: 'pending' | 'in_progress' | 'resolved' | 'closed') => 
  (state: { leads: LeadsState }) => 
    state.leads.leads.filter(lead => lead.status === status);

export default leadsSlice.reducer;