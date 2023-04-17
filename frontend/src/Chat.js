import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import filter from 'leo-profanity';
import { logOut } from './slice/authLogger';
import { openModal } from './slice/modalNewChannel';
import {
  addChannel,
  removeChannel,
  addMessage,
  renameChannel,
  setChannel,
  userData,
} from './slice/usersData';
import DropdownMenu from './DropdownMenu';
import socket from './socket';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const webSoket = socket
    filter.add(filter.getDictionary('en'));
    filter.add(filter.getDictionary('ru'));
    dispatch(userData());
    webSoket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });

    webSoket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
      dispatch(setChannel(payload.id));
    });

    webSoket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    webSoket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });

    return () => webSoket.removeAllListeners();
  }, []);

  const userName = JSON.parse(localStorage.userId).username;
  const data = useSelector((state) => state.users.data);
  const { currentChannelId } = useSelector((state) => state.users.data);
  const currentChanel = data.channels.find((channel) => channel.id === currentChannelId)
    || 'general';
  const countMassage = data.messages.filter(
    (message) => message.channelId === currentChannelId,
  );
  const filterMesseges = data.messages.filter(
    (message) => message.channelId === currentChannelId,
  );

  const exitHandler = () => dispatch(logOut());
  const choseChannelHandler = (e) => dispatch(setChannel(Number(e.target.id)));
  const hendlerNewModalChannel = () => dispatch(openModal({ opened: 'newChannelModal', idChannel: null }));

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      const filterMessege = filter.clean(message);
      socket.emit('newMessage', {
        body: filterMessege,
        channelId: currentChannelId,
        username: userName,
      });
      formik.values.message = '';
    },
  });
  const { handleSubmit, values, handleChange } = formik;

  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                {t('text.hexletHeader')}
              </a>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => exitHandler()}
              >
                {t('text.exit')}
              </button>
            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b>{t('text.chanel')}</b>
                  <Button
                    className="p-0 text-primary btn btn-group-vertical"
                    variant="first"
                    onClick={() => hendlerNewModalChannel()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <span className="visually-hidden">+</span>
                  </Button>
                </div>
                <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                  {data.channels.map((elem) => {
                    const activeButton = elem.id === currentChannelId
                      ? 'btn-secondary'
                      : 'btn-light';
                    if (elem.removable) {
                      return (
                        <li key={elem.id} className="nav-item w-100">
                          <DropdownMenu
                            activeButton={activeButton}
                            elem={elem}
                            choseChannelHandler={choseChannelHandler}
                          />
                        </li>
                      );
                    }
                    return (
                      <li key={elem.id} className="nav-item w-100">
                        <Button
                          type="button"
                          className={`w-100 rounded-0 text-start btn ${activeButton}`}
                          id={elem.id}
                          onClick={choseChannelHandler}
                        >
                          <span className="me-1">#</span>
                          {elem.name}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b>
                        #
                        {currentChanel.name}
                      </b>
                    </p>
                    <span className="text-muted">
                      <Trans
                        i18nKey="icu_and_trans"
                        values={{ count: countMassage.length }}
                      />
                    </span>
                  </div>
                  <div
                    id="messages-box"
                    className="chat-messages overflow-auto px-5"
                  >
                    {filterMesseges.map((message) => (
                      <div key={message.id} className="text-break mb-2">
                        <b>{message.username}</b>
                        :
                        {message.body}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto px-5 py-3">
                    <form
                      onSubmit={handleSubmit}
                      className="py-1 border rounded-2"
                    >
                      <div className="input-group has-validation">
                        <input
                          className="border-0 p-0 ps-2 form-control"
                          aria-label="Новое сообщение"
                          id="message"
                          name="message"
                          type="text"
                          onChange={handleChange}
                          value={values.message}
                          placeholder="Введите сообщение..."
                        />
                        <button
                          type="submit"
                          className="btn btn-group-vertical border-0"
                          disabled={!values.message}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width="20"
                            height="20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                            />
                          </svg>
                          <span className="visually-hidden">
                            {t('text.sendForm')}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
