import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkMyAuth: builder.query({
      query: () => {
        return {
          url: "user/me",
          method: "GET",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authenticateMe({ isAuthenticated: true, data: data?.data }));
        } catch (error) {
          dispatch(authenticateMe({ isAuthenticated: false, myData: {} }));
        }
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
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useFollowUserMutation,
  useGetFollowersFollowingQuery,
} = userApi;
