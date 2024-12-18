import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userId: string }>
    ) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
