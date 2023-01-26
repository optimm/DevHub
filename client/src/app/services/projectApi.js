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
    deleteProject: builder.mutation({
      query: ({ id }) => {
        return {
          url: `project/${id}`,
          method: "DELETE",
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
    saveUnsaveProject: builder.mutation({
      query: ({ id }) => {
        return {
          url: `project/${id}/save`,
          method: "GET",
        };
      },
      invalidatesTags: ["AllProjects", "SingleProject"],
    }),
    getComments: builder.query({
      query: ({ id }) => {
        return {
          url: `project/${id}/comment`,
          method: "GET",
        };
      },
      providesTags: ["AllComments"],
    }),
    addComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `project/${id}/comment`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllProjects", "SingleProject", "AllComments"],
    }),
    deleteComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `project/${id}/comment`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["AllProjects", "SingleProject", "AllComments"],
    }),
    editComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `project/${id}/comment`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["AllComments"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useLikeUnlikeProjectMutation,
  useSaveUnsaveProjectMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = projectApi;
