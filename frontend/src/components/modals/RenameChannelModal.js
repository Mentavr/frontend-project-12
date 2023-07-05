import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import useAutoFocus from '../../hooks/useAutoFocus';
import { closeModal } from '../../slice/modalSwitch';
import SocketContext from '../../context/socketContext';

const RenameChannel = () => {
  const {idChannel} = useSelector(state => state.modal)
  const renameFocus = useAutoFocus();
  const {renameChannelEmit} = useContext(SocketContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = () => dispatch(closeModal());
  const namesChannels = useSelector((state) => state.channels.ids
  .map((id) => {
    const channel = state.channels.entities[id]
    return channel.name
  },
  ));

  const SignupSchema = Yup.object({
    renameChannel: Yup.string()
      .min(3, 'errors.longText')
      .max(20, 'errors.longText')
      .notOneOf(namesChannels, 'errors.existChanel')
      .required('errors.required'),
  });

  const formik = useFormik({
    initialValues: {
      renameChannel: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (value) => {
      renameChannelEmit(idChannel, value.renameChannel)
      handleClose();
    },
  });

  const {
    handleSubmit, handleChange, errors, values, touched, isSubmitting,
  } = formik;
  return (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group as={Col} htmlFor="validationFormikRenameChannel">
            <Form.Label className="visually-hidden" htmlFor="renameChannel">
              {t('text.nameChanel')}
            </Form.Label>
            <Form.Control
              ref={renameFocus}
              className="mb-2"
              id="renameChannel"
              name="renameChannel"
              type="text"
              autoComplete="renameChannel"
              onChange={handleChange}
              value={values.renameChannel}
              isInvalid={touched.renameChannel && errors.renameChannel}
              required
            />
            <Form.Control.Feedback type="invalid">
              {t(errors.renameChannel)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="me-2 btn btn-secondary"
              disabled={isSubmitting}
            >
              {t('text.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {t('text.sendForm')}
            </Button>
          </Form.Group>
        </Form>
  );
};
export default RenameChannel;
