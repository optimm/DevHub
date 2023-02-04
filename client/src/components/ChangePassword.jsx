import React from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { useChangePasswordMutation } from "../app/services/authApi";
import { InnerWrapper } from "../styles/components/changePasswordStyles";
import { EditForm, Footer } from "../styles/components/editProfileStyles";
import "../styles/modal.css";
import { trimAll } from "../util/utilFunctions";
import changePasswordSchema from "../validationSchemas/changePassword";
import { createNotification } from "./Notification";

const ChangePassword = ({ show, setShow }) => {
  const { touched, errors, values, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: async (values) => {
        values = trimAll(values);
        try {
          const data = await change({ body: values }).unwrap();
          createNotification(data?.msg, "success", 2000);
          setShow(false);
        } catch (error) {}
      },
    });

  const handleClose = () => setShow(false);
  const [change, { isLoading, error, isError }] = useChangePasswordMutation();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <EditForm onSubmit={handleSubmit}>
        <Modal.Body>
          <InnerWrapper>
            <TextField
              name="currentPassword"
              label="Current Password"
              variant="outlined"
              color="secondary"
              fullWidth
              type="password"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.currentPassword && errors.currentPassword ? true : false
              }
              helperText={
                touched.currentPassword && errors.currentPassword
                  ? errors.currentPassword
                  : null
              }
            />
            <TextField
              name="newPassword"
              label="New Password"
              variant="outlined"
              color="secondary"
              fullWidth
              type="password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.newPassword && errors.newPassword ? true : false}
              helperText={
                touched.newPassword && errors.newPassword
                  ? errors.newPassword
                  : null
              }
            />
          </InnerWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Footer>
            <div className="error-text">{isError && error?.data?.msg}</div>
            <button
              className="submit-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading.." : "Update"}
            </button>
          </Footer>
        </Modal.Footer>
      </EditForm>
    </Modal>
  );
};

export default ChangePassword;
