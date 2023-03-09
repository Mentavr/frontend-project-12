import React from "react";
import socket from "./socket";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const ModalChannel = ({
  show,
  handleClose,
  newChannelError,
  setNewChannelError,
}) => {
  const namesChannels = useSelector((state) =>
    state.users.data.channels.map((channel) => channel.name)
  );

  const SignupSchema = Yup.object({
    newChannel: Yup.string()
      .min(3, "Too Short!")
      .notOneOf(namesChannels)
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      newChannel: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      socket.emit("newChannel", { name: formik.values.newChannel });
      handleClose();
      setNewChannelError(false)
    },
  });
  const { handleSubmit, handleChange, errors, values } = formik;

  const handleOnClick = (error) => {
    const { newChannel } = error;
    newChannel ? setNewChannelError(true) : handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
        restoreFocus="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} htmlFor="validationFormikNewChannel">
              <InputGroup>
                <Form.Label className="visually-hidden" htmlFor="newChannel">
                  Имя канала
                </Form.Label>
                <Form.Control
                  autoFocus
                  className="mb-2"
                  id="newChannel"
                  name="newChannel"
                  type="text"
                  autoComplete="newChannel"
                  onChange={handleChange}
                  value={values.newChannel}
                  isInvalid={newChannelError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  должно быть уникальным
                </Form.Control.Feedback>
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
                onClick={() => handleOnClick(errors)}
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

export default ModalChannel;
