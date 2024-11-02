import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice"; // Importamos el reducer de autenticación

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
