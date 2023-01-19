import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authenticateMe } from "../../features/meSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/auth/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ body }) => {
        return {
          url: "register",
          method: "POST",
          body,
        };
      },
    }),
    login: builder.mutation({
      query: ({ body }) => {
        return {
          url: "login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const { data: user } = data;
        dispatch(authenticateMe({ isAuthenticated: true, data: user }));
      },
    }),
    logout: builder.query({
      query: (name) => {
        return {
          url: `logout`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutQuery } =
  authApi;
