import { configureStore } from "@reduxjs/toolkit";
import meSlice from "../features/meSlice";
import { authApi } from "./services/authApi";

const store = configureStore({
  reducer: {
    me: meSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
