import React, { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import socket from "./socket";

const RemoveChannel = ({show,  handleClose, data}) => {

  console.log(data)

  const handalRemove = (number) => {
    if(data.removable) {
      socket.emit('removeChannel', { id: number });
      handleClose();
    }
    handleClose();
  }
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
            <Button type="submit" variant="primery" className="btn btn-primary" onClick={() => handalRemove(data.id)}>
            Удалить
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RemoveChannel;
