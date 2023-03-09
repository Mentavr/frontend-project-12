import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import socket from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { setChannel } from "./slice/usersData";


const RemoveChannel = ({show,  handleClose, id }) => {
  const {currentChannelId} = useSelector((state) => state.users.data)
  const dispatch = useDispatch()

  const handalRemove = (idNumber) => {
    socket.emit('removeChannel', { id: idNumber });
    currentChannelId === idNumber
    ? dispatch(setChannel(1))
    : dispatch(setChannel(currentChannelId))
    console.log(currentChannelId, idNumber)
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
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Уверены?</p>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="me-2 btn btn-secondary"
            >
              Отменить
            </Button>
            <Button type="submit" variant="red" className="btn btn-primary" onClick={() => handalRemove(id)}>
            Удалить
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RemoveChannel;
