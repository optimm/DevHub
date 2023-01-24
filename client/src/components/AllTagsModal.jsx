import React from "react";
import { Modal } from "react-bootstrap";
import { AllTagsWrapper, TagSingle } from "../styles/pages/projectStyles";
import "../styles/modal.css";

const AllTagsModal = ({ show, setShow, tags = [] }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AllTagsWrapper>
            {tags?.map((item, index) => (
              <TagSingle key={index}>{item}</TagSingle>
            ))}
          </AllTagsWrapper>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllTagsModal;
