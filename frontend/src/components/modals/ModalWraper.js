import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import NewChannelModal from './NewChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveModalChannel from './RemoveChannelModal';
import { closeModal } from '../../slice/modalSwitch';

const modalsMap = {
  newChannelModal: NewChannelModal,
  removeModalChannel: RemoveModalChannel,
  renameChannelModal: RenameChannelModal,
};

const titleMap = {
  newChannelModal: 'text.addChanel',
  removeModalChannel: 'text.deleteChanel',
  renameChannelModal: 'text.renameChannel',
};

const ModalOpen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { openedModal } = useSelector((state) => state.modal);
  const isShow = Boolean(openedModal);
  const handleClose = () => dispatch(closeModal());

  const renderContent = (openedModal, handleClose) => {
    const ComponetContent = modalsMap[openedModal];
    if (!ComponetContent) {
      return null;
    }
    return <ComponetContent handleClose={handleClose} />;
  };

  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      backdrop="static"
      keyboard
      centered
      restoreFocus="true"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t(titleMap[openedModal]) ?? ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderContent(openedModal, handleClose)}
      </Modal.Body>
    </Modal>
  );
};

export const { handlerOpen } = ModalOpen;
export default ModalOpen;
