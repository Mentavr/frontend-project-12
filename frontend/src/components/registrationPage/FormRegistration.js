import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import img from '../../image/avatarRegistration.jpg';
import routesApi from '../../routesApi';
import routes from '../../routesSpi';
import useAuth from '../../hooks/useAuth';

const FormRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const createUserPathApi = routesApi.createUser();
  const { atorithationPath, chatPath } = routes;
  const autContext = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object({
    username: Yup.string()
      .required('errors.required')
      .min(3, 'errors.longText')
      .max(20, 'errors.longText'),
    password: Yup.string()
      .min(6, 'errors.tooShortPassword')
      .required('errors.required'),
    confirmPassword: Yup.string().when('password', (password, schema) => schema.test({
      test: (confirmPassword) => password === confirmPassword,
      message: 'errors.differentPassword',
    })),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      try {
        const { values } = formik;
        await autContext.logIn(values, createUserPathApi);
        navigate(chatPath());
      } catch (_) {
        formik.setErrors({ confirmPassword: 'errors.existUser' });
      }
    },
  });
  const {
    errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting,
  } = formik;

  return (
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
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img className="rounded-circle" src={img} alt="" />
                </div>
                <Form onSubmit={handleSubmit} className="w-50">
                  <h1 className="text-center mb-4">{t('text.registration')}</h1>
                  <Form.Group className="mb-3">
                    <Form.Floating>
                      <Form.Control
                        placeholder={t('text.userNameRegistration')}
                        ref={inputRef}
                        id="username"
                        name="username"
                        type="text"
                        onChange={handleChange}
                        value={values.username}
                        onBlur={handleBlur}
                        autoComplete="username"
                        isInvalid={touched.username && errors.username}
                      />
                      <label htmlFor="username">
                        {t('text.userNameRegistration')}
                      </label>

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
                      />
                      <label htmlFor="password">{t('text.password')}</label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(errors.password)}
                      </Form.Control.Feedback>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-4">
                    <Form.Floating>
                      <Form.Control
                        placeholder={t('text.confirmPassword')}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                        isInvalid={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                      <label htmlFor="confirmPassword">
                        {t('text.confirmPassword')}
                      </label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(errors.confirmPassword)}
                      </Form.Control.Feedback>
                    </Form.Floating>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                    disabled={isSubmitting}
                  >
                    {t('text.register')}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormRegistration;
