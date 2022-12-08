import { configureStore } from "@reduxjs/toolkit";
import meSlice from "../features/meSlice";
import { authApi } from "../services/authApi";

const store = configureStore({
  reducer: {
    me: meSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
});

export default store;
