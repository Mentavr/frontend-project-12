import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "./slice/usersData";
import { logOut } from "./slice/authLogger";
import {
  addChannel,
  removeChannel,
  addMessage,
  renameChannel,
  setChannel,
} from "./slice/usersData";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ModalChannel from "./NewChannelModal.js";
import RemoveModal from "./RemoveModal";
import RenameModal from "./RenameModal";
import socket from "./socket";

const Chat = () => {
  const [showRemove, setShowRemove] = useState(false);
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [countMessage, setCountMessage] = useState(0);

  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);
  const handleCloseNewChannel = () => setShowNewChannel(false);
  const handleShowNewChannel = () => setShowNewChannel(true);
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("removeChannel", (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on("newMessage", (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });
    dispatch(userData());
  }, []);

  const userName = JSON.parse(localStorage.userId).username;
  const data = useSelector((state) => state.users.data);
  const {currentChannelId} = useSelector((state) => state.users.data);
  console.log(data);
  const exitHandler = () => {
    dispatch(logOut());
  };

  const chooseChannelHandler = (e) => {
    dispatch(setChannel(Number(e.target.id)));
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: ({ message }) => {
      socket.emit("newMessage", {
        body: message,
        channelId: currentChannelId,
        username: userName,
      });
    },
  });

  return (
    <>
      <div className="h-100">
        <div className="h-100">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">
                  Hexlet Chat
                </a>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => exitHandler()}
                >
                  Выйти
                </button>
              </div>
            </nav>
            <div className="contaicontainer h-100 my-4 overflow-hidden rounded shadowner-fluid h-100">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                    <span>Каналы</span>
                    <Button
                      className="p-0 text-primary btn btn-group-vertical"
                      variant="first"
                      onClick={handleShowNewChannel}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                        <span className="visually-hidden">+</span>
                      </svg>
                    </Button>
                    <ModalChannel
                      show={showNewChannel}
                      handleClose={handleCloseNewChannel}
                    />
                  </div>
                  <ul className="nav flex-column nav-pills nav-fill px-2">
                    {data.channels.map((elem) => {
                      const { currentChannelId } = data;
                      const activeButton =
                        elem.id === currentChannelId
                          ? "btn-secondary"
                          : "btn-light";
                      return (
                        <li key={elem.id} className="nav-item w-100">
                          <Dropdown
                            as={ButtonGroup}
                            className="d-flex dropdown btn-group"
                          >
                            <Button
                              type="button"
                              className={`w-100 rounded-0 text-start btn ${activeButton}`}
                              id={elem.id}
                              onClick={chooseChannelHandler}
                            >
                              <span className="me-1">#</span>
                              {elem.name}
                            </Button>
                            <Dropdown.Toggle
                              variant="first"
                              id="dropdown-basic"
                            ></Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                href="#"
                                onClick={handleShowRemove}
                              >
                                Удалить
                              </Dropdown.Item>
                              <RemoveModal
                                show={showRemove}
                                handleClose={handleCloseRemove}
                                data={elem}
                              />
                              <Dropdown.Item
                                href="#"
                                onClick={handleShowRename}
                              >
                                Переименовать
                              </Dropdown.Item>
                              <RenameModal
                                show={showRename}
                                handleClose={handleCloseRename}
                                idChannel={elem.id}
                              />
                            </Dropdown.Menu>
                          </Dropdown>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                      <p className="m-0">
                        <b># general</b>
                      </p>
                      <span className="text-muted">
                        {countMessage} сообщений
                      </span>
                    </div>
                    <div
                      id="messages-box"
                      className="chat-messages overflow-auto px-5"
                    >
                      {data.messages.filter((message) => message.channelId === currentChannelId)
                      .map((message) => {
                      return(
                        <div className="text-break mb-2">
                          <b>{message.username}</b>: {message.body}
                        </div>
                      )
                      })}
                    </div>
                    <div className="mt-auto px-5 py-3">
                      <form
                        onSubmit={formik.handleSubmit}
                        className="py-1 border rounded-2"
                      >
                        <div className="input-group has-validation">
                          <input
                            className="border-0 p-0 ps-2 form-control"
                            aria-label="Новое сообщение"
                            id="message"
                            name="message"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            placeholder="Введите сообщение..."
                          />
                          <button
                            type="submit"
                            className="btn btn-group-vertical"
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
                              ></path>
                            </svg>
                            <span className="visually-hidden">Отправить</span>
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
    </>
  );
};
export default Chat;
