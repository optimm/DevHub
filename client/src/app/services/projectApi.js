import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: ({ body }) => {
        return {
          url: "project/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllProjects","SingleUser"],
    }),
  }),
});

export const { useCreateProjectMutation } = projectApi;
