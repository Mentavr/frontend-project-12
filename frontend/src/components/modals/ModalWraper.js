import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import NewChannelModal from './NewChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveModalChannel from './RemoveChannelModal';
import { closeModal } from '../../slice/modalSwitch';
import { openedModalSlice } from '../../slice/modalSwitch';

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
  const openedModal = useSelector(openedModalSlice);
  const isShow = Boolean(openedModal);
  const handleClose = () => dispatch(closeModal());

  const renderContent = (openedModalMap, handleCloseRender) => {
    const ComponetContent = modalsMap[openedModalMap];
    if (!ComponetContent) {
      return null;
    }
    return <ComponetContent handleClose={handleCloseRender} />;
  };

  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      backdrop="static"
      keyboard
      centered
      restoreFocus
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

export default ModalOpen;
