import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => {
        return {
          url: "project",
          method: "GET",
        };
      },
      providesTags: ["AllProjects"],
    }),
    getSingleProject: builder.query({
      query: ({ id }) => {
        return {
          url: `project/${id}`,
          method: "GET",
        };
      },
      providesTags: ["SingleProject"],
    }),
    createProject: builder.mutation({
      query: ({ body }) => {
        return {
          url: "project/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllProjects", "SingleUser"],
    }),
    likeUnlikeProject: builder.mutation({
      query: ({ id }) => {
        return {
          url: `project/${id}/like`,
          method: "GET",
        };
      },
      invalidatesTags: ["AllProjects", "SingleProject"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useLikeUnlikeProjectMutation,
} = projectApi;
