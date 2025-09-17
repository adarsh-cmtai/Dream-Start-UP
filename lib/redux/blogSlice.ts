import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../service/api"; // Assuming your API client is in this path

// Blog SEO interface
export interface BlogSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

// Blog interface based on your Blog model
export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  slug: string;
  image?: string;
  seo?: BlogSEO;
  timestamp: string; // Stored as string, but can be converted to Date
  isPublished: boolean;
  createdBy?: string;
  createdByEmail?: string;
  updatedBy?: string;
  updatedByEmail?: string;
  updatedAt?: string;
  publishedAt?: string; // When the blog was first published
}

// Pagination interface (can be shared across slices if identical)
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

// API Response interface for fetching multiple blogs
export interface BlogsResponse {
  blogs: Blog[];
  pagination: PaginationMeta;
}

// Fetch Blogs Parameters (for both public and admin)
export interface FetchBlogsParams {
  page?: number;
  limit?: number;
  category?: string;
  tags?: string; // Comma-separated string of tags
  author?: string;
  search?: string;
  isPublished?: boolean; // Only for admin
}

// Create Blog Parameters
export interface CreateBlogParams {
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  slug: string;
  image?: string;
  seo?: BlogSEO;
  isPublished?: boolean;
}

// Update Blog Parameters
export interface UpdateBlogParams {
  id: string;
  data: Partial<Omit<Blog, 'id' | 'timestamp' | 'createdBy' | 'createdByEmail' | 'updatedAt' | 'publishedAt'>>;
}

// Toggle Publish Status Parameters
export interface TogglePublishParams {
  id: string;
  isPublished: boolean;
}

// Slice state
interface BlogsState {
  blogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
}

const initialState: BlogsState = {
  blogs: [],
  currentBlog: null,
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

// Fetch published blogs for public view
export const fetchBlogsPublic = createAsyncThunk<
  BlogsResponse,
  Omit<FetchBlogsParams, 'isPublished'>, // Exclude isPublished as it's always true
  { rejectValue: string }
>(
  "blogs/fetchPublic",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, category, tags, author, search } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(author && { author }),
        ...(search && { search }),
      });
      
      const res = await api.get<BlogsResponse>(`blog?${queryParams}`); // Public endpoint
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error fetching public blogs");
    }
  }
);

// Fetch all blogs for admin view
export const fetchBlogsAdmin = createAsyncThunk<
  BlogsResponse,
  FetchBlogsParams,
  { rejectValue: string }
>(
  "blogs/fetchAdmin",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, category, tags, author, search, isPublished } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(author && { author }),
        ...(search && { search }),
        ...(isPublished !== undefined && { isPublished: isPublished.toString() }),
      });
      
      const res = await api.get<BlogsResponse>(`blog/admin?${queryParams}`); // Admin endpoint
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error fetching admin blogs");
    }
  }
);

// Fetch single published blog by ID for public view
export const fetchBlogByIdPublic = createAsyncThunk<Blog, string, { rejectValue: string }>(
  "blogs/fetchByIdPublic",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get<Blog>(`blog/${id}`); // Public endpoint
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Blog post not found");
    }
  }
);

// Fetch single blog by ID for admin view (includes unpublished)
export const fetchBlogByIdAdmin = createAsyncThunk<Blog, string, { rejectValue: string }>(
  "blogs/fetchByIdAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get<Blog>(`blog/admin/${id}`); // Admin endpoint
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Blog post not found for admin");
    }
  }
);

export const addBlog = createAsyncThunk<
  { id: string; message: string },
  CreateBlogParams,
  { rejectValue: string }
>(
  "blogs/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post<{ id: string; message: string }>("blog", data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error creating blog post");
    }
  }
);

export const updateBlog = createAsyncThunk<
  { message: string },
  UpdateBlogParams,
  { rejectValue: string }
>(
  "blogs/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put<{ message: string }>(`blog/${id}`, data);
      return { ...res.data, id, data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error updating blog post");
    }
  }
);

export const togglePublishStatus = createAsyncThunk<
  { message: string },
  TogglePublishParams,
  { rejectValue: string }
>(
  "blogs/togglePublish",
  async ({ id, isPublished }, { rejectWithValue }) => {
    try {
      const res = await api.patch<{ message: string }>(`blog/${id}/publish`, { isPublished });
      return { ...res.data, id, isPublished }; // Return id and new status for optimistic updates
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error toggling publish status");
    }
  }
);


export const deleteBlog = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>(
  "blogs/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete<{ message: string }>(`blog/${id}`);
      return { ...res.data, id }; // Return id for optimistic updates
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Error deleting blog post");
    }
  }
);

// Slice
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
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
    setCurrentBlog: (state, action: PayloadAction<Blog>) => {
      state.currentBlog = action.payload;
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
      // Fetch all blogs (public and admin share this logic for populating 'blogs' array)
      .addCase(fetchBlogsPublic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsPublic.fulfilled, (state, action: PayloadAction<BlogsResponse>) => {
        state.blogs = action.payload.blogs;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchBlogsPublic.rejected, (state, action) => {
        state.error = action.payload ?? "Error fetching public blogs";
        state.loading = false;
      })
      .addCase(fetchBlogsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsAdmin.fulfilled, (state, action: PayloadAction<BlogsResponse>) => {
        state.blogs = action.payload.blogs;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchBlogsAdmin.rejected, (state, action) => {
        state.error = action.payload ?? "Error fetching admin blogs";
        state.loading = false;
      })

      // Fetch single blog
      .addCase(fetchBlogByIdPublic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogByIdPublic.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.currentBlog = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogByIdPublic.rejected, (state, action) => {
        state.error = action.payload ?? "Blog post not found";
        state.loading = false;
      })
      .addCase(fetchBlogByIdAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogByIdAdmin.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.currentBlog = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogByIdAdmin.rejected, (state, action) => {
        state.error = action.payload ?? "Blog post not found for admin";
        state.loading = false;
      })

      // Add blog
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.pagination.total += 1;
        // Depending on whether you want to immediately see the new blog,
        // you might re-fetch the list or add it optimistically.
        // For simplicity, we'll rely on re-fetching the list in the component.
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.error = action.payload ?? "Error creating blog post";
        state.loading = false;
      })

      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const blogId = action.meta.arg.id;
        const updateData = action.meta.arg.data;
        
        // Update the blog in the main blogs array
        const blogIndex = state.blogs.findIndex(blog => blog.id === blogId);
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = {
            ...state.blogs[blogIndex],
            ...updateData,
            // You might want to add updatedBy/updatedAt here if returned by API
          };
        }
        
        // Update currentBlog if it's the one being edited
        if (state.currentBlog?.id === blogId) {
          state.currentBlog = {
            ...state.currentBlog,
            ...updateData,
            // You might want to add updatedBy/updatedAt here if returned by API
          };
        }
        state.loading = false;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.error = action.payload ?? "Error updating blog post";
        state.loading = false;
      })

      // Toggle publish status
      .addCase(togglePublishStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        const { id, isPublished } = action.meta.arg;
        
        // Update the blog in the main blogs array
        const blogIndex = state.blogs.findIndex(blog => blog.id === id);
        if (blogIndex !== -1) {
          state.blogs[blogIndex] = {
            ...state.blogs[blogIndex],
            isPublished: isPublished,
            // Add publishedAt if it was just published
            ...(isPublished && !state.blogs[blogIndex].publishedAt && { publishedAt: new Date().toISOString() }),
          };
        }

        // Update currentBlog if it's the one being viewed/edited
        if (state.currentBlog?.id === id) {
          state.currentBlog = {
            ...state.currentBlog,
            isPublished: isPublished,
            ...(isPublished && !state.currentBlog.publishedAt && { publishedAt: new Date().toISOString() }),
          };
        }
        state.loading = false;
      })
      .addCase(togglePublishStatus.rejected, (state, action) => {
        state.error = action.payload ?? "Error toggling publish status";
        state.loading = false;
      })

      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const blogId = action.meta.arg;
        
        state.blogs = state.blogs.filter(blog => blog.id !== blogId);
        
        if (state.currentBlog?.id === blogId) {
          state.currentBlog = null;
        }
        
        state.pagination.total -= 1; // Decrement total count
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload ?? "Error deleting blog post";
        state.loading = false;
      });
  },
});

export const { 
  clearCurrentBlog, 
  clearError, 
  setPaginationPage, 
  setPaginationLimit, 
  setCurrentBlog,
  resetPagination 
} = blogsSlice.actions;

// Selectors
export const selectBlogs = (state: { blogs: BlogsState }) => state.blogs.blogs;
export const selectBlogsLoading = (state: { blogs: BlogsState }) => state.blogs.loading;
export const selectBlogsError = (state: { blogs: BlogsState }) => state.blogs.error;
export const selectBlogsPagination = (state: { blogs: BlogsState }) => state.blogs.pagination;
export const selectCurrentBlog = (state: { blogs: BlogsState }) => state.blogs.currentBlog;

// Additional selectors
export const selectPublishedBlogs = (state: { blogs: BlogsState }) => 
  state.blogs.blogs.filter(blog => blog.isPublished);

export const selectUnpublishedBlogs = (state: { blogs: BlogsState }) => 
  state.blogs.blogs.filter(blog => !blog.isPublished);

export default blogsSlice.reducer;