import React from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import socket from "./socket";

const RenameChannel = ({ show, handleClose, idChannel }) => {
  const formik = useFormik({
    initialValues: {
      renameChannel: "",
    },
    onSubmit: (value) => {
      socket.emit("renameChannel", {
        id: idChannel,
        name: value.renameChannel,
      });
      handleClose();
    },
  });

  const { handleSubmit, handleChange, errors, values } = formik;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
        restoreFocus="true"
        autoFocus
      >
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} htmlFor="validationFormikRenameChannel">
              <InputGroup>
                <Form.Label className="visually-hidden" htmlFor="renameChannel">
                  Имя канала
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="renameChannel"
                  name="renameChannel"
                  type="text"
                  autoComplete="renameChannel"
                  onChange={handleChange}
                  value={values.renameChannel}
                  // isInvalid={newChannelError}
                  required
                />
                {/* <Form.Control.Feedback type="invalid">
                  должно быть уникальным
                </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
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
                // onClick={() => handleOnClick(errors)}
              >
                Отправить
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RenameChannel;
