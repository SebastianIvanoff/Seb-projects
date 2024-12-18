import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Importing Redux Toolkit's createSlice and PayloadAction

// Define the shape of the authentication state
interface AuthState {
  token: string | null; // Token can either be a string or null (if not logged in)
  userId: string | null; // userId can either be a string or null (if not logged in)
}

// Set the initial state, including loading token and userId from localStorage (if available)
const initialState: AuthState = {
  token: localStorage.getItem("token") || null, // Get token from localStorage, default to null if not present
  userId: localStorage.getItem("userId") || null, // Get userId from localStorage, default to null if not present
};

// Create a slice for authentication (login/logout)
const authSlice = createSlice({
  name: "auth", // The name of the slice (used for debugging)
  initialState, // Set the initial state as defined above
  reducers: {
    // Action to handle user login
    login: (
      state, 
      action: PayloadAction<{ token: string; userId: string }> // Payload action containing token and userId
    ) => {
      const { token, userId } = action.payload; // Extract token and userId from the payload
      state.token = token; // Set the token in state
      state.userId = userId; // Set the userId in state

      // Save token and userId to localStorage so it persists across sessions
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    },
    // Action to handle user logout
    logout: (state) => {
      state.token = null; // Clear token in state
      state.userId = null; // Clear userId in state

      // Remove token and userId from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

// Export login and logout actions to be used in components
export const { login, logout } = authSlice.actions;
// Export the reducer to be used in the store
export default authSlice.reducer;
