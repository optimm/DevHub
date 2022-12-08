import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authenticateMe } from "../../features/meSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/user/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    checkMyAuth: builder.query({
      query: () => {
        return {
          url: "me",
          method: "GET",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data.data);
          dispatch(authenticateMe({ isAuthenticated: true, data: data?.data }));
        } catch (error) {
          dispatch(authenticateMe({ isAuthenticated: false, myData: {} }));
        }
      },
    }),
    getSingleUser: builder.query({
      query: ({ id }) => {
        return {
          url: `${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCheckMyAuthQuery, useGetSingleUserQuery } = userApi;
