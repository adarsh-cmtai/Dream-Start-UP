import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./redux/serviceSlice"

import authReducer from "./redux/authSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
