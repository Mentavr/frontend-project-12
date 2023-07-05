import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import routesApi from '../../routesApi';
import routes from '../../routesSpi';
import img from '../../image/projectMen.jpeg';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const autContext = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const loginPathApi = routesApi.userLogin();
  const {chatPath, atorithationPath} = routes;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object({
    username: Yup.string().required('errors.required'),
    password: Yup.string().required('errors.required'),
  });

  const errorsNet = (numberError, formik) => {
    console.log('autorization numberErroor', numberError)
    if (numberError === 401) {
      const { errors } = formik;
      errors.password = 'errors.enterNickPassword';
    };
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      try {
        console.log('formik valuse', formik.values)
        console.log('formik  login path api', loginPathApi)
        await autContext.logIn(formik.values, loginPathApi);
        navigate(chatPath());
      } catch (error) {
        console.log( 'errors async autorization',error)
        const numberError = request.status;
        errorsNet(numberError, formik);
      }
    },
  });

  const {
    errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting,
  } = formik;

  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href={atorithationPath()}>
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
                            placeholder={t('text.userName')}
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
                            {t(errors.username)}
                          </Form.Control.Feedback>
                        </Form.Floating>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Floating>
                          <Form.Control
                            placeholder={t('text.password')}
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
                            {t(errors.password)}
                          </Form.Control.Feedback>
                        </Form.Floating>
                      </Form.Group>
                      <Button
                        type="submit"
                        className="w-100 mb-3"
                        disabled={isSubmitting}
                      >
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
export default Login;
