import React, { useEffect, useState } from "react";
import "../styles/modal.css";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useEditProfileMutation,
  useGetSingleUserQuery,
} from "../app/services/userApi";
import {
  EditForm,
  EditInner,
  EditWrapper,
  Footer,
} from "../styles/components/editProfileStyles";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import editProfileSchema from "../validationSchemas/editProfile";
import { createNotification } from "./Notification";
import { baseApi } from "../app/services/baseApi";
import { arraysEqual, capitalizeString } from "../util/utilFunctions";

import { platformOptions } from "../util/platformOptions";

const EditProfileModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleClose = () => setShow(false);
  const { data, isFetching, isLoading } = useGetSingleUserQuery(
    { id },
    { skip: !show }
  );
  const me = data?.data;
  const [
    updateProfile,
    {
      data: updateData,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useEditProfileMutation();

  const [errorText, setErrorText] = useState("");
  const [profiles, setProfiles] = useState([]);

  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {},
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      if (
        me?.name === values?.name &&
        me?.username === values?.username &&
        me?.email === values?.email &&
        me?.bio === values?.bio &&
        me?.about === values?.about &&
        arraysEqual(me?.profiles, values?.profiles)
      ) {
        createNotification("Nothing to update", "error", 2000);
      } else {
        const { data, error } = await updateProfile({ body: values });
        if (error) {
          setErrorText(error?.data?.msg);
        }
      }
    },
  });

  useEffect(() => {
    if (data?.success) {
      let temp = data?.data;
      temp?.name && setFieldValue("name", temp?.name);
      temp?.username && setFieldValue("username", temp?.username);
      temp?.email && setFieldValue("email", temp?.email);
      temp?.bio && setFieldValue("bio", temp?.bio);
      temp?.about && setFieldValue("about", temp?.about);
      temp?.profiles && setFieldValue("profiles", temp?.profiles);
    }
  }, [data]);

  useEffect(() => {
    if (isUpdateSuccess) {
      createNotification(`${updateData?.msg}`, "success", 2000);
      setShow(false);
      dispatch(baseApi.util.invalidateTags(["SingleUser"]));
    }
  }, [isUpdateSuccess]);

  const linkToProfile = (plt) => {
    let str = "";
    values?.profiles?.map((e) => {
      if (e?.platform === plt) str = e?.link;
    });
    return str;
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <EditForm onSubmit={handleSubmit}>
        <Modal.Body>
          <EditWrapper>
            {isLoading || isFetching ? (
              <>Loading...</>
            ) : (
              <>
                <EditInner url="/images/login.jpg">
                  <div className="image-section">
                    <div className="image"></div>
                    <div className="text-section">
                      <div className="username">{me?.username}</div>
                      <div className="edit">Change profile photo</div>
                    </div>
                  </div>
                  <div className="text-data-section">
                    <TextField
                      name="name"
                      label="Name"
                      variant="outlined"
                      color="secondary"
                      className="form-input"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && errors.name ? true : false}
                      helperText={
                        touched.name && errors.name ? errors.name : null
                      }
                    />
                    <TextField
                      name="username"
                      label="Username"
                      variant="outlined"
                      color="secondary"
                      className="form-input"
                      fullWidth
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && errors.username ? true : false}
                      helperText={
                        touched.username && errors.username
                          ? errors.username
                          : null
                      }
                    />
                    <TextField
                      name="email"
                      label="Email"
                      variant="outlined"
                      color="secondary"
                      className="form-input"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email ? true : false}
                      helperText={
                        touched.email && errors.email ? errors.email : null
                      }
                    />
                    <TextField
                      name="bio"
                      label="Bio"
                      variant="outlined"
                      color="secondary"
                      className="form-input"
                      fullWidth
                      multiline
                      maxRows={4}
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bio && errors.bio ? true : false}
                      helperText={touched.bio && errors.bio ? errors.bio : null}
                    />
                    <TextField
                      name="about"
                      label="About"
                      variant="outlined"
                      color="secondary"
                      className="form-input"
                      fullWidth
                      multiline
                      value={values.about}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.about && errors.about ? true : false}
                      helperText={
                        touched.about && errors.about ? errors.about : null
                      }
                    />
                  </div>
                  <div className="profiles-section">
                    <div className="profile-head">Profiles</div>
                    <div className="profiles">
                      {platformOptions.map((item, index) => (
                        <TextField
                          key={index}
                          name={item}
                          label={capitalizeString(item)}
                          variant="outlined"
                          color="secondary"
                          className="form-input"
                          fullWidth
                          value={linkToProfile(item)}
                          onChange={(e) => {
                            let temp = [...values?.profiles];
                            let flag = false;
                            if (!e.target.value || e.target.value === "") {
                              let ind = -1;
                              temp.map((x, i) => {
                                if (x?.platform === item) {
                                  ind = i;
                                }
                              });
                              if (ind > -1) {
                                temp.splice(ind, 1);
                              }
                              setFieldValue("profiles", temp);
                              return;
                            }
                            temp.map((x, i) => {
                              if (x?.platform === item) {
                                flag = true;
                                let newObj = { ...temp[i] };
                                newObj.link = e.target.value;
                                temp[i] = newObj;
                              }
                            });

                            if (!flag) {
                              temp = [
                                ...temp,
                                { platform: item, link: e.target.value },
                              ];
                            }
                            setFieldValue("profiles", temp);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </EditInner>
              </>
            )}
          </EditWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Footer>
            <div className="error-text">{errorText}</div>
            <button
              className="submit-button"
              type="submit"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? "Loading.." : "Update"}
            </button>
          </Footer>
        </Modal.Footer>
      </EditForm>
    </Modal>
  );
};

export default EditProfileModal;
