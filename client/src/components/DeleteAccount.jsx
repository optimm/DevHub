import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "styled-components/macro";
import { baseApi } from "../app/services/baseApi";
import { useDeleteProfileMutation } from "../app/services/userApi";
import { authenticateMe } from "../features/meSlice";
import { flexcv } from "../styles/globalStyle";
import { createNotification } from "./Notification";

const DeleteAccount = ({ show, setShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const [deleteAcc, { data, isLoading, isSuccess, isError }] =
    useDeleteProfileMutation();

  const handleDelete = async () => {
    await deleteAcc();
  };

  useEffect(() => {
    if (isSuccess) {
      createNotification("Account permanently deleted", "info", 2000);
      setShow(false);
      dispatch(
        baseApi.util.invalidateTags([
          "AllUsers",
          "SingleUser",
          "FollowUser",
          "Followers",
        ])
      );
      dispatch(authenticateMe({ isAuthenticated: false, data: {} }));
      navigate("/");
    } else if (isError) {
      createNotification("Something went wrong", "error", 2000);
    }
  }, [isSuccess, isError]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          css={`
            ${flexcv}
            width:90%;
            margin: 20px auto;
            gap: 20px;
          `}
        >
          <div
            css={`
              font-size: 1.1rem;
              text-align: center;
              font-weight: 500;
              color: var(--text-3);
            `}
          >
            Are you sure you want to delete your account? It cannot be recovered
            afterwards.
          </div>
          <Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAccount;
