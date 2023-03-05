import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import socket from "./socket";

const RenameChannel = ({ show, handleClose, idChannel }) => {
  const inputText = useRef(null);

  const formik = useFormik({
    initialValues: {
      renameChannel: "",
    },
    onSubmit: (value) => {
      socket.emit("renameChannel", { id: idChannel, name: value.renameChannel });
      handleClose();
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        restoreFocus="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input
              ref={inputText}
              className="mb-2 form-control"
              id="renameChannel"
              name="renameChannel"
              type="text"
              autoComplete="renameChannel"
              onChange={formik.handleChange}
              value={formik.values.renameChannel}
              required
            />
            <label className="visually-hidden" htmlFor="renameChannel">
              Имя канала
            </label>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2 btn btn-secondary"
              >
                Отменить
              </Button>
              <Button
                type="submit"
                variant="primery"
                className="btn btn-primary"
              >
                Отправить
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RenameChannel;
