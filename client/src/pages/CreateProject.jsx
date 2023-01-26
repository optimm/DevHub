import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useCreateProjectMutation } from "../app/services/projectApi";
import {
  MainForm,
  MainLeft,
  MainRight,
  MainWrapper,
} from "../styles/pages/createProjectStyles";
import { tags } from "../util/options";
import createProjectSchema from "../validationSchemas/createProject";
import { createNotification } from "../components/Notification";

export const CreateProject = () => {
  const [create, { data, isLoading, isError, isSuccess, error }] =
    useCreateProjectMutation();
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      live_link: "",
      github_link: "",
      tags: [],
    },
    validationSchema: createProjectSchema,
    onSubmit: async (values) => {
      let temp = { ...values };
      if (temp.live_link === "") delete temp["live_link"];
      if (temp.github_link === "") delete temp["github_link"];
      if (temp?.tags?.length === 0) delete temp["tags"];
      if (temp?.desc?.length === 0) delete temp["desc"];
      await create({ body: temp });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      createNotification(data?.msg, "success", 2000);
      resetForm();
    }
    if (isError) {
      createNotification(error?.data?.msg, "error", 2000);
    }
  }, [isSuccess, isError]);

  return (
    <MainWrapper>
      <MainLeft>
        <MainForm onSubmit={handleSubmit}>
          <div className="form-head">Add Project Details</div>
          <div className="form-questions">
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              color="secondary"
              className="form-input"
              fullWidth
              multiline
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && errors.title ? true : false}
              helperText={touched.title && errors.title ? errors.title : null}
              readOnly={isLoading}
            />
            <TextField
              name="desc"
              label="Description"
              variant="outlined"
              color="secondary"
              className="form-input"
              fullWidth
              multiline
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.desc && errors.desc ? true : false}
              helperText={touched.desc && errors.desc ? errors.desc : null}
              readOnly={isLoading}
            />
            <TextField
              name="github_link"
              label="Github Link"
              variant="outlined"
              color="secondary"
              className="form-input"
              fullWidth
              value={values.github_link}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.github_link && errors.github_link ? true : false}
              readOnly={isLoading}
              helperText={
                touched.github_link && errors.github_link
                  ? errors.github_link
                  : null
              }
            />
            <TextField
              name="live_link"
              label="Live Link"
              variant="outlined"
              color="secondary"
              className="form-input"
              fullWidth
              value={values.live_link}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.live_link && errors.live_link ? true : false}
              readOnly={isLoading}
              helperText={
                touched.live_link && errors.live_link ? errors.live_link : null
              }
            />
            <Autocomplete
              multiple
              id="tags-outlined"
              options={tags}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              fullWidth
              value={values.tags}
              onChange={(e, newValue) => {
                setFieldValue("tags", newValue);
              }}
              onBlur={handleBlur}
              renderInput={(params) => (
                <TextField {...params} label="Tags" placeholder="Tag" />
              )}
              readOnly={isLoading}
            />

            <button
              className="submit-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Add Project"}
            </button>
          </div>
        </MainForm>
      </MainLeft>
      <MainRight>
        <div className="image-wrapper"></div>
      </MainRight>
    </MainWrapper>
  );
};
