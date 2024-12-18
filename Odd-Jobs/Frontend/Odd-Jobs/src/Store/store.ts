import { configureStore } from "@reduxjs/toolkit"; // Import configureStore from Redux Toolkit to set up the Redux store
import authReducer from "./authSlice"; // Import the auth slice reducer

// Create and configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Map the authReducer to the "auth" slice of the state
  },
});

// TypeScript types for better type inference and safety

// RootState represents the entire state of the Redux store
export type RootState = ReturnType<typeof store.getState>; // Get the type of the state from the store's getState method

// AppDispatch is the type of the dispatch function for the Redux store
export type AppDispatch = typeof store.dispatch; // Get the type of dispatch method from the store
