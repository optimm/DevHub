import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useGetReadmeQuery } from "../app/services/projectApi";
import MarkdownIt from "markdown-it";
import "../styles/markdown.css";
import "../styles/modal.css";
const md = new MarkdownIt({ html: true, linkify: true });

const ReadmeFile = ({ show, setShow, readmeData }) => {
  const handleClose = () => setShow(false);
  const [html, setHtml] = useState("");
  useEffect(() => {
    setHtml(md.render(readmeData?.readmeData));
  }, []);
  const link = readmeData?.link;
  const baseUrl = link.replace("README.md", "");

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Readme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ReadmeFile;
