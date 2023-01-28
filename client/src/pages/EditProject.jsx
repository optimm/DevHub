import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  useEditProjectMutation,
  useGetSingleProjectQuery,
} from "../app/services/projectApi";
import {
  Head,
  MainForm,
  MainLeft,
  MainRight,
  MainWrapper,
} from "../styles/pages/createProjectStyles";
import { tags } from "../util/options";
import createProjectSchema from "../validationSchemas/createProject";
import { createNotification } from "../components/Notification";
import { useSelector } from "react-redux";
import { BsCardImage } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingWrapper } from "../styles/pages/profileStyles";
import { arraysEqual, trimAll } from "../util/utilFunctions";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [update, {}] = useEditProjectMutation();
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetSingleProjectQuery({ id }, { skip: err });

  const { myData } = useSelector((state) => state.me);
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
      values = trimAll(values);
      let temp = { ...values };
      let pData = data?.data;
      if (!pData?.live_link && temp.live_link === "") delete temp["live_link"];
      if (!pData?.github_link && temp.github_link === "")
        delete temp["github_link"];
      if (!pData?.tags && temp?.tags?.length === 0) delete temp["tags"];
      if (!pData?.desc && temp?.desc?.length === 0) delete temp["desc"];

      if (
        pData?.title === temp?.title &&
        pData?.desc === temp?.desc &&
        pData?.live_link === temp?.live_link &&
        pData?.github_link === temp?.github_link &&
        arraysEqual(pData?.tags, temp?.tags)
      ) {
        createNotification("Nothing to update", "error", 2000);
        return;
      }

      try {
        const updateData = await update({ body: temp, id }).unwrap();
        createNotification(updateData?.msg, "success", 2000);
        navigate(`/projects/${id}`);
      } catch (error) {
        setErr(true);
        createNotification(error?.data?.msg, "error", 2000);
      }
    },
  });

  useEffect(() => {
    if (data?.success) {
      let pData = data?.data;
      setFieldValue("title", pData?.title);
      pData?.desc && setFieldValue("desc", pData?.desc);
      pData?.live_link && setFieldValue("live_link", pData?.live_link);
      pData?.github_link && setFieldValue("github_link", pData?.github_link);
      pData?.tags && setFieldValue("tags", pData?.tags);
    }
  }, [data]);

  return (
    <>
      {isLoading || isFetching ? (
        <LoadingWrapper>Loading..</LoadingWrapper>
      ) : (
        <>
          <Head>
            Edit Your Project, <span>{myData?.username}</span>
          </Head>
          <MainWrapper>
            <MainLeft>
              <MainForm onSubmit={handleSubmit}>
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
                    helperText={
                      touched.title && errors.title ? errors.title : null
                    }
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
                    helperText={
                      touched.desc && errors.desc ? errors.desc : null
                    }
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
                    error={
                      touched.github_link && errors.github_link ? true : false
                    }
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
                      touched.live_link && errors.live_link
                        ? errors.live_link
                        : null
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
                    {isLoading ? "Loading..." : "Update Project"}
                  </button>
                </div>
              </MainForm>
            </MainLeft>
            <MainRight>
              <div className="paper-for-image">
                <div className="image-wrapper">
                  <BsCardImage />
                  <div className="text">
                    Upload cover Image for your project.
                  </div>
                </div>
              </div>
            </MainRight>
          </MainWrapper>
        </>
      )}
    </>
  );
};

export default EditProject;
