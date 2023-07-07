import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slice/modalSwitch';

const DropdownMenu = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    activeButton, elem, choseChannelHandler, handlerShowModal,
  } = props;

  const handlerOpenModal = (modalName, id) => dispatch(openModal(
    {
      opened: modalName,
      id,
    },
  ));
  try {
    return (
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          type="button"
          className={`d-flex w-100 rounded-0 text-truncate btn  ${activeButton}`}
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
        >
          <span className="visually-hidden">{t('text.сhannelСontrol')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href="#"
            onClick={() => handlerOpenModal('removeModalChannel', elem.id)}
          >
            {t('text.remove')}
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            onClick={() => handlerOpenModal('renameChannelModal', elem.id)}
          >
            {t('text.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  } catch (e) {
    console.log(e);
  }
};

export default DropdownMenu;
