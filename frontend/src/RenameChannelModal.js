import React from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { closeModal } from "./slice/modalNewChannel";
import useAutoFocus from "./hooks/useAutoFocus";
import socket from "./socket";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const RenameChannel = ({ idChannel }) => {
  const renameFocus = useAutoFocus();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = () => dispatch(closeModal());

  const namesChannels = useSelector((state) =>
    state.users.data.channels.map((channel) => channel.name)
  );
  // const currentChanel = useSelector((state) => state.users.data.channels).find(
  //   (channel) => idChannel === channel.id
  // );
  // const { name } = currentChanel;

  const SignupSchema = Yup.object({
    renameChannel: Yup.string()
      .min(3, t("errors.longText"))
      .max(20, t("errors.longText"))
      .notOneOf(namesChannels, t("errors.existChanel"))
      .required(t("errors.required")),
  });

  const formik = useFormik({
    initialValues: {
      renameChannel: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (value) => {
      socket.emit("renameChannel", {
        id: idChannel,
        name: value.renameChannel,
      });
      toast.success(t("text.renameChanalSuccess"));
      handleClose();
    },
  });

  const { handleSubmit, handleChange, errors, values, touched } = formik;
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
        restoreFocus="true"
        autoFocus
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("text.renameChannel")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Col} htmlFor="validationFormikRenameChannel">
              <Form.Label className="visually-hidden" htmlFor="renameChannel">
                {t("text.nameChanel")}
              </Form.Label>
              <Form.Control
                ref={renameFocus}
                className="mb-2"
                id="renameChannel"
                name="renameChannel"
                type="text"
                autoComplete="renameChannel"
                onChange={handleChange}
                value={values.renameChannel}
                isInvalid={touched.renameChannel && errors.renameChannel}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.renameChannel}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2 btn btn-secondary"
              >
                {t("text.cancel")}
              </Button>
              <Button type="submit" variant="primary">
                {t("text.sendForm")}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RenameChannel;
