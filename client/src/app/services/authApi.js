import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ body }) => {
        return {
          url: "auth/register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllUsers", "SingleUser"],
    }),
    login: builder.mutation({
      query: ({ body }) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const { data: user } = data;
        dispatch(authenticateMe({ isAuthenticated: true, data: user }));
      },
      invalidatesTags: ["SingleUser", "AllUsers", "SingleProject"],
    }),
    logout: builder.query({
      query: ({ id }) => {
        return {
          url: `auth/logout`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          baseApi.util.invalidateTags([
            "AllUsers",
            "SingleUser",
            "CheckAuth",
            "SingleProject",
          ])
        );
        dispatch(authenticateMe({ isAuthenticated: false, data: {} }));
      },

    }),
    changePassword: builder.mutation({
      query: ({ body }) => {
        return {
          url: `auth/change-password`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutQuery,
  useChangePasswordMutation,
} = authApi;
