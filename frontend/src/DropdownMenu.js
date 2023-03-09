import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import RemoveModal from "./RemoveModal";
import RenameModal from "./RenameModal";


const DropdownMenu = (props) => {
  const { activeButton, elem, choseChannelHandler} = props;
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);

  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);

  return (
    <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
      <Button
        type="button"
        className={`w-100 rounded-0 text-start btn ${activeButton}`}
        id={elem.id}
        onClick={choseChannelHandler}
      >
        <span className="me-1">#</span>
        {elem.name}
      </Button>
      <Dropdown.Toggle
        variant="first"
        id="dropdown-basic"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary ${activeButton}`}
      ></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={handleShowRemove}>
          Удалить
        </Dropdown.Item>
        <RemoveModal
          show={showRemove}
          handleClose={handleCloseRemove}
          id={elem.id}
        />
        <Dropdown.Item href="#" onClick={handleShowRename}>
          Переименовать
        </Dropdown.Item>
        <RenameModal
          show={showRename}
          handleClose={handleCloseRename}
          idChannel={elem.id}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
