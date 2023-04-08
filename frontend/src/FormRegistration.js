import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logIn, logOut } from "./slice/authLogger";
import * as Yup from "yup";
import routes from "./routes";
import axios from "axios";
import img from "./image/avatarRegistration.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";

const FormRegistration = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const createUserPathApi = routes.createUser();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object({
    username: Yup.string()
      .required(t("errors.required"))
      .min(3, t("errors.longText"))
      .max(20, t("errors.longText")),
    password: Yup.string()
      .min(6, t("errors.tooShortPassword"))
      .required(t("errors.required")),
    confirmPassword: Yup.string().when("password", (password, schema) => {
      return schema.test({
        test: (confirmPassword) => password === confirmPassword,
        message: t("errors.differentPassword"),
      });
    }),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      try {
        const login = await axios.post(createUserPathApi, values);
        localStorage.setItem("userId", JSON.stringify(login.data));
        dispatch(logIn());
        navigate("/");
      } catch (error) {
        console.log(error);
        errors.confirmPassword = t("errors.existUser");
        dispatch(logOut());
      }
    },
  });
  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            {t("text.hexletHeader")}
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
                  <h1 className="text-center mb-4">{t("text.registration")}</h1>
                  <Form.Group className="mb-3">
                    <FloatingLabel htmlFor="username" label="Имя пользователя">
                      <Form.Control
                        placeholder="Имя пользователя"
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
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <FloatingLabel  htmlFor="password" label="Пароль">
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
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-4">
                    <FloatingLabel htmlFor="confirmPassword" label="Подтвердите пароль">
                      <Form.Control
                        placeholder="Подтвердите пароль"
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
                        required
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                  >
                    {t("text.register")}
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
