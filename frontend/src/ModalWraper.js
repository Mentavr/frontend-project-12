import React from "react";
import { useSelector } from "react-redux";
import NewChannelModal from "./NewChannelModal";
import RenameChannelModal from "./RenameChannelModal";
import RemoveModalChannel from "./RemoveChannelModal";

const modalsMap = {
  newChannelModal: NewChannelModal,
  removeModalChannel: RemoveModalChannel,
  renameChannelModal: RenameChannelModal,
};

const ModalOpen = () => {
  const { openedModal, id } = useSelector((state) => state.modal);
  const Component = modalsMap[openedModal];
  return Component ? <Component idChannel={id} /> : null;
};

export default ModalOpen;
