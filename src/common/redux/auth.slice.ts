import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../models/Auth";

const initialState: AuthResponse = {
  token: null,
  permissions: [],
  isAuth: false,
};

const getSessionFromLocalStorage = () => {
  const session = localStorage.getItem("session_auth");
  if (session) {
    return JSON.parse(session);
  }
  return initialState;
};

const saveSessionToLocalStorage = (state: AuthResponse) => {
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
      saveSessionToLocalStorage({ ...action.payload, isAuth: true });

      const { token, permissions } = action.payload;
      state.token = token;
      state.permissions = permissions;
      state.isAuth = true;
    },
    logout(state) {
      removeSessionFromLocalStorage();

      state.token = null;
      state.permissions = [];
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
