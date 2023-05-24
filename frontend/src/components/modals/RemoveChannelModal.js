import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../../slice/modalSwitch';
import SocketContext from '../../context/socketContext';

const RemoveChannel = ({ idChannel }) => {
  const socket = useContext(SocketContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const handalRemove = (idNumber) => {
    socket.emit('removeChannel', { id: idNumber });
    dispatch(closeModal());
    handleClose();
  };
  return (
    <Modal
      show
      onHide={handleClose}
      backdrop="static"
      keyboard
      centered
      restoreFocus="true"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('text.deleteChanel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('text.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            {t('text.cancel')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => handalRemove(idChannel)}
          >
            {t('text.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RemoveChannel;
