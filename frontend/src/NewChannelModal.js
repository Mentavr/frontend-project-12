import React from "react";
import socket from "./socket";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

const ModalChannel = ({
  show,
  handleClose,
}) => {
  const namesChannels = useSelector((state) =>
    state.users.data.channels.map((channel) => channel.name)
  );

  const { t } = useTranslation()
  const SignupSchema = Yup.object({
    newChannel: Yup.string()
      .min(3, t("errors.longText"))
      .max(20, t("errors.longText"))
      .notOneOf(namesChannels, t("errors.existChanel"))
      .required(t("errors.required")),
  });
  const formik = useFormik({
    initialValues: {
      newChannel: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      socket.emit("newChannel", { name: values.newChannel });
      toast.success(t("text.createChanalSuccess"))
      handleClose();
    },
  });
  const { handleSubmit, handleChange, errors, values, handleBlur, touched } = formik;

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
          <Modal.Title>{t("text.addChanel")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} htmlFor="validationFormikNewChannel">
                <Form.Label className="visually-hidden" htmlFor="newChannel">
                  {t("text.nameChanel")}
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
                  isInvalid={touched.newChannel && errors.newChannel}
                  onBlur={handleBlur}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.newChannel}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <Button
                type="submit"
                className="me-2 btn-secondary"
              >
                {t("text.cancel")}
              </Button>
              <Button
                type="submit"
                className="btn-primary"
              >
                {t("text.sendForm")}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalChannel;
