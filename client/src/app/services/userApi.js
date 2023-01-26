import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //profile and account
    checkMyAuth: builder.query({
      query: () => {
        return {
          url: "user/me",
          method: "GET",
        };
      },
      providesTags: ["CheckAuth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authenticateMe({ isAuthenticated: true, data: data?.data }));
        } catch (error) {
          dispatch(authenticateMe({ isAuthenticated: false, myData: {} }));
        }
      },
    }),
    editProfile: builder.mutation({
      query: ({ body }) => {
        return {
          url: "user/me",
          method: "PATCH",
          body,
        };
      },
    }),
    deleteProfile: builder.mutation({
      query: () => {
        return {
          url: "user/me",
          method: "DELETE",
        };
      },
      invalidatesTags: [
        "AllUsers",
        "SingleUser",
        "SingleProject",
        "AllProjects",
        "AllComments",
        "CheckAuth",
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(authenticateMe({ isAuthenticated: false, data: {} }));
      },
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: `user`,
          method: "GET",
        };
      },
      providesTags: ["AllUsers"],
    }),
    getSingleUser: builder.query({
      query: ({ id }) => {
        return {
          url: `user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["SingleUser"],
    }),
    //followers following
    followUser: builder.mutation({
      query: ({ id }) => {
        return {
          url: `user/${id}/follow`,
          method: "GET",
        };
      },
      invalidatesTags: ["SingleUser", "Followers"],
    }),
    getFollowersFollowing: builder.query({
      query: ({ id, category }) => {
        return {
          url: `user/${id}/${category}`,
          method: "GET",
        };
      },
      providesTags: ["Followers"],
    }),
  }),
});

export const {
  useCheckMyAuthQuery,
  useEditProfileMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useFollowUserMutation,
  useGetFollowersFollowingQuery,
  useDeleteProfileMutation,
} = userApi;
