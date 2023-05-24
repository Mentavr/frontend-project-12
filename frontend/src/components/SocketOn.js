import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../slice/channelsSlice.js';
import { addMessage, removeMessages } from '../slice/messagesSlice.js';
import SocketContext from '../context/socketContext.js';

const SocketOn = ({ children }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    filter.add(filter.getDictionary('en'));
    filter.add(filter.getDictionary('ru'));
    socket.on('removeChannel', (payload) => {
      toast.success(t('text.removeChanalSuccess'));
      dispatch(removeMessages(payload));
      return dispatch(removeChannel(payload));
    });
    socket.on('newChannel', (payload) => {
      toast.success(t('text.createChanalSuccess'));
      dispatch(addChannel(payload));
    });
    socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
    socket.on('renameChannel', (payload) => {
      toast.success(t('text.renameChanalSuccess'));
      return dispatch(renameChannel(payload));
    });
    return () => socket.removeAllListeners();
  }, [dispatch, t, socket]);

  return children;
};

export default SocketOn;
