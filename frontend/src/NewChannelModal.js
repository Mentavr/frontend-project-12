import React, { useRef, useState} from "react";
import socket from "./socket";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";

const ModalChannel = ({show, handleClose}) => {
//   useEffect(() => {
//     inputText.current.focus();
//   },[]);

  const inputText = useRef(null);

  const formik = useFormik({
    initialValues: {
      newChannel: "",
    },
    onSubmit: () => {
        socket.emit('newChannel', { name: formik.values.newChannel });
        handleClose();
    },
  })

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
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input
              ref={inputText}
              className="mb-2 form-control"
              id="newChannel"
              name="newChannel"
              type="text"
              autoComplete="newChannel"
              onChange={formik.handleChange}
              value={formik.values.newChannel}
              required
            />
            <label
              className="visually-hidden"
              htmlFor="newChannel"
            >
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

export default ModalChannel;
