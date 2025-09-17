import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./redux/serviceSlice"
import trainingReducer from "./redux/trainingSlice"
import leadReducer from "./redux/leadSlice";
import blogSlice from "./redux/blogSlice";
import authReducer from "./redux/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    trainings: trainingReducer,
    leads: leadReducer,
    blogs: blogSlice,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
