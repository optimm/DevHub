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
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
} = projectApi;
