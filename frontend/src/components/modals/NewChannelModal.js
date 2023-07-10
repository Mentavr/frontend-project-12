import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import SocketContext from '../../context/socketContext';
import { selectChannelNames } from '../../slice/channelsSlice';

const ModalChannel = ({ handleClose }) => {
  const { newChannelEmit } = useContext(SocketContext);
  const { t } = useTranslation();
  const namesChannels = useSelector(selectChannelNames);

  const SignupSchema = Yup.object({
    newChannel: Yup.string()
      .min(3, 'errors.longText')
      .max(20, 'errors.longText')
      .notOneOf(namesChannels, 'errors.existChanel')
      .required('errors.required'),
  });

  const formik = useFormik({
    initialValues: {
      newChannel: '',
    },
    validationSchema: SignupSchema,
    onSubmit: ({ newChannel }) => {
      const filterMessege = filter.clean(newChannel);
      newChannelEmit(filterMessege);
      handleClose();
      formik.values.newChannel = '';
    },
  });
  const {
    handleSubmit, handleChange, errors, values, touched, isSubmitting,
  } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Col} htmlFor="validationFormikNewChannel">
        <Form.Label className="visually-hidden" htmlFor="newChannel">
          {t('text.nameChanel')}
        </Form.Label>
        <Form.Control
          className="mb-2"
          id="newChannel"
          name="newChannel"
          type="text"
          autoComplete="newChannel"
          onChange={handleChange}
          value={values.newChannel}
          isInvalid={touched.newChannel && errors.newChannel}
          required
          autoFocus
        />
        <Form.Control.Feedback type="invalid">
          {t(errors.newChannel)}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="d-flex justify-content-end">
        <Button className="me-2 btn-secondary" onClick={handleClose}>
          {t('text.cancel')}
        </Button>
        <Button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {t('text.sendForm')}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ModalChannel;
