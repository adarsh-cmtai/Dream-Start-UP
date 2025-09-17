import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./redux/serviceSlice"
import trainingReducer from "./redux/trainingSlice"

import authReducer from "./redux/authSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    trainings: trainingReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
