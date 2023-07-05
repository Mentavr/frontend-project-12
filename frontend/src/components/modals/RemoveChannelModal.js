import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slice/modalSwitch';
import SocketContext from '../../context/socketContext';

const RemoveChannel = () => {
  const {idChannel} = useSelector(state => state.modal)
  const {removeChannelEmit} = useContext(SocketContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const handalRemove = (idNumber) => {
    removeChannelEmit(idNumber);
    dispatch(closeModal());
  };

  return (
      <>
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
      </>
  );
};
export default RemoveChannel;
