import React, { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const RenameChannel = ({show,  handleClose}) => {

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
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="me-2 btn btn-secondary"
            >
              Отменить
            </Button>
            <Button type="submit" variant="primery" className="btn btn-primary">
              Отправить
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RenameChannel;
