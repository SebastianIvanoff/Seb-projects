import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Importing Redux Toolkit's createSlice and PayloadAction

// Define the shape of the authentication state
interface AuthState {
  token: string | null; // Token can either be a string or null (if not logged in)
  userId: string | null; // userId can either be a string or null (if not logged in)
  userName: string | null; // Add userName to the state
}

// Set the initial state, including loading token, userId, and userName from localStorage (if available)
const initialState: AuthState = {
  token: localStorage.getItem("token") || null, // Get token from localStorage, default to null if not present
  userId: localStorage.getItem("userId") || null, // Get userId from localStorage, default to null if not present
  userName: localStorage.getItem("userName") || null, // Get userName from localStorage, default to null if not present
};

// Create a slice for authentication (login/logout)
const authSlice = createSlice({
  name: "auth", // The name of the slice (used for debugging)
  initialState, // Set the initial state as defined above
  reducers: {
    // Action to handle user login
    login: (
      state,
      action: PayloadAction<{ token: string; userId: string; userName: string }> // Payload action containing token, userId, and userName
    ) => {
      const { token, userId, userName } = action.payload; // Extract token, userId, and userName from the payload
      state.token = token; // Set the token in state
      state.userId = userId; // Set the userId in state
      state.userName = userName; // Set the userName in state

      // Save token, userId, and userName to localStorage so it persists across sessions
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName); // Save userName to localStorage
    },
    // Action to handle user logout
    logout: (state) => {
      state.token = null; // Clear token in state
      state.userId = null; // Clear userId in state
      state.userName = null; // Clear userName in state

      // Remove token, userId, and userName from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName"); // Remove userName from localStorage
    },
  },
});

// Export login and logout actions to be used in components
export const { login, logout } = authSlice.actions;
// Export the reducer to be used in the store
export default authSlice.reducer;
