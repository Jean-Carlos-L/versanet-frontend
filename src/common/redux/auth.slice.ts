import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../models/Auth";

interface AuthState {
  user: AuthResponse | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

const getSessionFromLocalStorage = () => {
  const session = localStorage.getItem("session_auth");
  if (session) {
    return JSON.parse(session);
  }
  return initialState;
};

const saveSessionToLocalStorage = (state: AuthState) => {
  localStorage.setItem("session_auth", JSON.stringify(state));
};

const removeSessionFromLocalStorage = () => {
  localStorage.removeItem("session_auth");
};

const authSlice = createSlice({
  name: "auth",
  initialState: getSessionFromLocalStorage(),
  reducers: {
    login(state, action: PayloadAction<AuthResponse>) {
      const user = action.payload;
      saveSessionToLocalStorage({ user: user, isAuth: true });
      state.user = user;
      state.isAuth = true;
    },
    logout(state) {
      removeSessionFromLocalStorage();
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
