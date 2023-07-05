import { useEffect } from 'react';
import SocketContext from '../../context/socketContext.js';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
    addChannel,
    removeChannel,
    renameChannel,
    setChannel,
  } from '../../slice/channelsSlice.js';
import { addMessage } from '../../slice/messagesSlice.js';

const ApiProvider = ({children}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const socket = io();

    useEffect(() => {
        socket.on('removeChannel', (payload) => {
          toast.success(t('text.removeChanalSuccess'));
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

    const newChannelEmit = (filterMessege) => socket.emit('newChannel', { name: filterMessege }, (recept) => {
      const {data} = recept;
        dispatch(addChannel(data))
        return dispatch(setChannel(data.id))
      });
    const removeChannelEmit = (idNumber) => socket.emit('removeChannel', { id: idNumber }, ({status}) => {
      if(status === 'ok') {
        console.log('removeEmit', idNumber)
        dispatch(removeChannel({ id: idNumber }));
      }
    });
    const renameChannelEmit = (idChannel, rename ) => socket.emit('renameChannel', {
        id: idChannel,
        name: rename,
      }, ({status}) => {
        if(status === 'ok') {
          dispatch(renameChannel({ name: rename, removable: true, id: idChannel}));
        }
      });
    const addMessageEmit = (messege,  currentChannelId, userName) => socket.emit('newMessage', {
      body: messege,
      channelId: currentChannelId,
      username: userName,
    });
return (
    <SocketContext.Provider value={{newChannelEmit, removeChannelEmit, renameChannelEmit, addMessageEmit}}>
        {children}
    </SocketContext.Provider>
)
    
}

export default ApiProvider;