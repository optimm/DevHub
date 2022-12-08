import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        console.log({ arg });
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
