import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/auth/`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ data }) => {
        return {
          url: "register",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useRegisterMutation } = authApi;
