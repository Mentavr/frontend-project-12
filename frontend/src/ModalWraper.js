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
        values.newChannel = '';
      },
    });
    const { handleSubmit, handleChange, errors, values, touched } = formik;
  
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
                    className="mb-2"
                    id="newChannel"
                    name="newChannel"
                    type="text"
                    autoComplete="newChannel"
                    onChange={handleChange}
                    value={values.newChannel}
                    isInvalid={touched.newChannel && errors.newChannel}
                    required
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newChannel}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button
                  className="me-2 btn-secondary"
                  onClick={handleClose}
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

  const RemoveChannel = ({show,  handleClose, id }) => {
    const { t } = useTranslation()
    const {currentChannelId} = useSelector((state) => state.users.data)
    const dispatch = useDispatch()
  
    const handalRemove = (idNumber) => {
      socket.emit('removeChannel', { id: idNumber });
      currentChannelId === idNumber
      ? dispatch(setChannel(1))
      : dispatch(setChannel(currentChannelId));
      toast.success(t("text.removeChanalSuccess"))
      handleClose();
    }
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
            <Modal.Title>{t("text.deleteChanel")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="lead">{t("text.confirm")}</p>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                {t("text.cancel")}
              </Button>
              <Button type="submit" variant="danger" onClick={() => handalRemove(id)}>
              {t("text.delete")}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const RenameChannel = ({ show, handleClose, idChannel }) => {



    const { t } = useTranslation();
  
    const namesChannels = useSelector((state) =>
      state.users.data.channels.map((channel) => channel.name)
    );
    const currentChanel = useSelector((state) => state.users.data.channels).find(
      (channel) => idChannel === channel.id
    );
    const { name } = currentChanel;
  
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
    const inputRename = useAutoFocus()
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
            <Modal.Title>{t("text.renameChannel")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} htmlFor="validationFormikRenameChannel">
                <Form.Label className="visually-hidden" htmlFor="renameChannel">
                  {t("text.nameChanel")}
                </Form.Label>
                <Form.Control
                  ref={inputRename}
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

const ModalOpen = (props) => {
    const {} = props;

    
}

export default ModalOpen;