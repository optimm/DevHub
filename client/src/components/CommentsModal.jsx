import { Avatar, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../app/services/projectApi";
import {
  AddCommentSection,
  CommentSingle,
  CommentsWrapper,
  LoadingCommentWrapper,
} from "../styles/components/commentsModalStyles";
import "../styles/modal.css";
import { SoloButton } from "../styles/pages/profileStyles";
import commentSchema from "../validationSchemas/comment";
import { createNotification } from "./Notification";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";

const CommentsModal = ({ show, setShow, isMine }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: async (values) => {
      if (!isAuthenticated) {
        createNotification(`Please Login First`, "error", 2000);
        navigate("/login");
      }
      const { data: commentData, error: commentError } = await addComment({
        id,
        body: values,
      });
      console.log({ commentData });
      if (commentData?.success) {
        createNotification(commentData?.msg, "success", 2000);
        resetForm();
      } else if (!commentError?.success) {
        createNotification(commentError?.msg, "error", 2000);
      }
    },
  });

  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetCommentsQuery({ id });

  const [addComment, {}] = useAddCommentMutation();
  const comments = data?.data?.comments;

  const [blankLoader, setBlankLoader] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (isLoading) {
      setBlankLoader(true);
    } else if (!isLoading && data?.success) {
      setTimeout(() => {
        setBlankLoader(false);
      }, 500);
    }
  }, [isLoading]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading || blankLoader ? (
          <LoadingCommentWrapper>Loading...</LoadingCommentWrapper>
        ) : (
          <CommentsWrapper auth={isAuthenticated}>
            {comments?.map((item, index) => (
              <CommentSingle className="flex-justify">
                <div className="image-section">
                  <Avatar sx={{ width: 30, height: 30 }} />
                </div>
                <div className="text-section">
                  <span>{item?.user?.username}</span>
                  {item?.comment}
                </div>
                <div className="action-section flex-justify">
                  <button className="action-button">
                    <AiOutlineDelete />
                  </button>
                  <button className="action-button">
                    <RiEditFill />
                  </button>
                </div>
              </CommentSingle>
            ))}
          </CommentsWrapper>
        )}
      </Modal.Body>
      {isAuthenticated && (
        <Modal.Footer>
          <AddCommentSection className="flex-justify" onSubmit={handleSubmit}>
            <div className="input-section">
              <TextField
                name="comment"
                label="Comment"
                variant="outlined"
                color="secondary"
                className="form-input"
                fullWidth
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.comment && errors.comment ? true : false}
                helperText={
                  touched.comment && errors.comment ? errors.comment : null
                }
              />
            </div>
            <div className="button-section">
              <SoloButton
                notActive={errors?.comment ? true : false}
                type="submit"
                disabled={errors?.comment}
              >
                Add
              </SoloButton>
            </div>
          </AddCommentSection>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommentsModal;
