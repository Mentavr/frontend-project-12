import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import routes from './routes';
import img from './image/projectMen.jpeg';
import { logIn } from './slice/authLogger';

const FormAtorithation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const loginPathApi = routes.userLogin();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  const errorsNet = (numberError) => {
    switch (numberError) {
      case 401:
        formik.errors.password = t('errors.enterNickPassword');
        break;
      case 0:
        return toast.error(t('errors.errorConnect'));
      default:
        return new Error('что-то пошло не так');
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      try {
        const login = await axios.post(loginPathApi, formik.values);
        localStorage.setItem('userId', JSON.stringify(login.data));
        dispatch(logIn());
        navigate('/');
      } catch ({ request }) {
        const numberError = request.status;
        errorsNet(numberError);
      }
    },
  });

  const {
    errors, touched, values, handleChange, handleBlur, handleSubmit,
  } = formik;

  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                {t('text.hexletHeader')}
              </a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img className="rounded-circle" src={img} alt="" />
                    </div>

                    <Form
                      onSubmit={handleSubmit}
                      className="col-12 col-md-6 mt-3 mt-mb-0"
                    >
                      <h1 className="text-center mb-4">{t('text.enter')}</h1>
                      <Form.Group>
                        <Form.Floating>
                          <Form.Control
                            className="mb-3"
                            placeholder="Ваш ник"
                            ref={inputRef}
                            id="username"
                            name="username"
                            type="text"
                            onChange={handleChange}
                            value={values.username}
                            onBlur={handleBlur}
                            autoComplete="username"
                            isInvalid={touched.username && errors.username}
                            required
                          />
                          <label htmlFor="username">{t('text.userName')}</label>
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.username}
                          </Form.Control.Feedback>
                        </Form.Floating>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Floating>
                          <Form.Control
                            placeholder="Пароль"
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                            autoComplete="current-password"
                            isInvalid={touched.password && errors.password}
                            required
                          />
                          <label htmlFor="password">{t('text.password')}</label>
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Floating>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3 ">
                        {t('text.enter')}
                      </Button>
                    </Form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>
                        {t('text.noAccount')}
                        {' '}
                      </span>
                      <a href="/signup">{t('text.registration')}</a>
                    </div>
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
export default FormAtorithation;
