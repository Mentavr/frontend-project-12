import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket from './socket';
import { setChannel } from './slice/usersData';
import { closeModal } from './slice/modalNewChannel';

const RemoveChannel = ({ idChannel }) => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const handalRemove = (idNumber) => {
    socket.emit('removeChannel', { id: idNumber });
    toast.success(t('text.removeChanalSuccess'));
    dispatch(closeModal());
    handleClose();

    if (currentChannelId === idNumber) {
      return dispatch(setChannel(1));
    }
    return dispatch(setChannel(currentChannelId));
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
