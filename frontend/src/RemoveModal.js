import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import socket from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { setChannel } from "./slice/usersData";
import { useTranslation } from "react-i18next";


const RemoveChannel = ({show,  handleClose, id }) => {
  const { t } = useTranslation()
  const {currentChannelId} = useSelector((state) => state.users.data)
  const dispatch = useDispatch()

  const handalRemove = (idNumber) => {
    socket.emit('removeChannel', { id: idNumber });
    currentChannelId === idNumber
    ? dispatch(setChannel(1))
    : dispatch(setChannel(currentChannelId))
    handleClose();
  }
  return (
    <>
      <Modal
        show={show}
        autoFocus
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
export default RemoveChannel;
