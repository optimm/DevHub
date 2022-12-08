import { configureStore } from "@reduxjs/toolkit";
import meSlice from "../features/meSlice";
import { authApi } from "./services/authApi";
import { userApi } from "./services/userApi";

const store = configureStore({
  reducer: {
    me: meSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware),
});

export default store;
