import React, { useRef, useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import routes from "./routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./slice/authLogger";
import img from "./image/avatarRegistration.jpg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";

// import ValidationContext from "./context";

const FormRegistration = () => {

  // const validationContext = useContext(ValidationContext);
  // const validationErrors = (errorName) => validationContext.t(errorName);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const createUserPathApi = routes.createUser();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object({
    username: Yup.string()
    .required("Обязательное поле")
      .min(3, 'От 3 до 20 символов')
      .max(20, "От 3 до 20 символов"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .required("Обязательное поле"),
    confirmPassword: Yup.string().when("password", (password, schema) => {
      return schema.test({
        test: (confirmPassword) => password === confirmPassword,
        message: "Пароли должны совпадать",
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
        formik.errors.confirmPassword = "такой пользовать ........"
        dispatch(logOut());
      }
    },
  });
  const {errors, touched, values, handleChange, handleBlur, handleSubmit  } = formik;

  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Hexlet Chat
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
                      // noValidate
                      onSubmit={handleSubmit}
                      className="col-12 col-md-6 mt-3 mt-mb-0"
                    >
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <Form.Group className="mb-3">
                        <InputGroup hasValidation>
                          <Form.Label
                            htmlFor="username"
                            className="visually-hidden"
                          >
                            Ваш ник
                          </Form.Label>
                          <FloatingLabel label="Ваш ник">
                            <Form.Control
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
                              <Form.Control.Feedback type="invalid">
                                {errors.username}
                              </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <InputGroup hasValidation>
                          <Form.Label
                            htmlFor="password"
                            className="visually-hidden"
                          >
                            Пароль
                          </Form.Label>
                          <FloatingLabel label="Пароль">
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
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group as={Col} className="mb-4">
                        <InputGroup hasValidation>
                          <Form.Label
                            htmlFor="password"
                            className="visually-hidden"
                          >
                            Подтвердить пароль
                          </Form.Label>
                          <FloatingLabel label="Подтвердить пароль">
                            <Form.Control
                              placeholder="Подтвердить пароль"
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              onChange={handleChange}
                              value={values.confirmPassword}
                              onBlur={handleBlur}
                              autoComplete="current-password"
                              isInvalid={touched.confirmPassword && errors.confirmPassword}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Button
                        type="submit"
                        className="w-100 mb-3"
                      >
                        Зарегестрироваться
                      </Button>
                    </Form>
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
export default FormRegistration;
