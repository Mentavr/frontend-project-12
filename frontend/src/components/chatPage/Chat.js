import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { openModal } from '../../slice/modalSwitch';
import { setChannel, selectorChannels, currentChannelIdSelector } from '../../slice/channelsSlice';
import { loadingStatusSelector, userData } from '../../slice/apiDataSlice';
import { selectorMessages } from '../../slice/messagesSlice';
import DropdownMenu from './DropdownMenu';
import SocketContext from '../../context/socketContext';
import useAuth from '../../hooks/useAuth';
import routes from '../../routesSpi';
import Messages from './Messages';
import LoadingPage from './loadingPage';

const Chat = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(loadingStatusSelector);
  const { chatPath } = routes;
  const autContext = useAuth();
  const { addMessageEmit } = useContext(SocketContext);
  const { t } = useTranslation();
  const userName = JSON.parse(localStorage.userId).username;
  const messagesState = useSelector(selectorMessages.selectAll);
  const channelEntities = useSelector(selectorChannels.selectEntities);
  const channelIds = useSelector(selectorChannels.selectIds);
  const currentChannelId = useSelector(currentChannelIdSelector);
  const currentChanelId = channelIds.find((id) => id === currentChannelId);
  const currentNameChannel = currentChanelId ? channelEntities[currentChanelId].name : 'general';
  const filterMesseges = messagesState.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    dispatch(userData());
  }, [dispatch]);

  const renderingMessages = () => {
    const lastMessage = filterMesseges[filterMesseges.length - 1];
    return filterMesseges.map((message) => {
      const isLast = lastMessage.id === message.id;
      return (
        <Messages key={message.id} isLast={isLast} messageProps={message} />
      );
    });
  };

  const exitHandler = () => autContext.logOut();
  const choseChannelHandler = (e) => dispatch(setChannel(Number(e.target.id)));
  const hendlerNewModalChannel = () => dispatch(openModal({ opened: 'newChannelModal', id: currentChanelId }));

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      const filterMessege = filter.clean(message);
      addMessageEmit(filterMessege, currentChannelId, userName);
      formik.values.message = '';
    },
  });
  const { handleSubmit, values, handleChange } = formik;

  if (loadingStatus === 'failed') {
    toast.error(t('errors.errorConnect'));
    return <LoadingPage exitHandler={exitHandler} />;
  }

  if (loadingStatus === 'loading') {
    return (
      <LoadingPage exitHandler={exitHandler} />
    );
  }

  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href={chatPath()}>
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
                  {channelIds.map((id) => {
                    const activeButton = id === currentChannelId
                      ? 'btn-secondary'
                      : 'btn-light';
                    if (channelEntities[id].removable) {
                      return (
                        <li key={id} className="nav-item w-100">
                          <DropdownMenu
                            activeButton={activeButton}
                            elem={channelEntities[id]}
                            choseChannelHandler={choseChannelHandler}
                          />
                        </li>
                      );
                    }
                    return (
                      <li key={id} className="nav-item w-100">
                        <Button
                          type="button"
                          className={`w-100 rounded-0 text-start btn ${activeButton}`}
                          id={id}
                          onClick={choseChannelHandler}
                        >
                          <span className="me-1">#</span>
                          {channelEntities[id].name}
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
                        {currentNameChannel}
                      </b>
                    </p>
                    <span className="text-muted">
                      <Trans
                        i18nKey="icu_and_trans"
                        values={{ count: filterMesseges.length }}
                      />
                    </span>
                  </div>
                  <div
                    id="messages-box"
                    className="chat-messages overflow-auto px-5"
                  >
                    {renderingMessages()}
                  </div>
                  <div className="mt-auto px-5 py-3">
                    <form
                      onSubmit={handleSubmit}
                      className="py-1 border rounded-2"
                    >
                      <div className="input-group has-validation">
                        <input
                          className="border-0 p-0 ps-2 form-control"
                          aria-label={t('text.newMessage')}
                          id="message"
                          name="message"
                          type="text"
                          onChange={handleChange}
                          value={values.message}
                          placeholder={t('text.enterMessage')}
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
