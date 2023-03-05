import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import routes from "./routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn, logOut } from './slice/authLogger';
import img from './image/avatarRegistration.jpg'



const FormRegistration = () => {
  const [isError, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const createUserPathApi = routes.createUser();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object({
    username: Yup.string()
    .min(1, 'Too Short!')
    .required("Required"),
    password: Yup.string()
    .min(1, 'Too Short')
    .required("Required"),
  });



  const isValid = (error) => {
    if(error) {
      return 'form-control is-invalid'
    }
    return 'form-control';
  }
  


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      try {
        const login = await axios.post(createUserPathApi, formik.values);
        localStorage.setItem("userId", JSON.stringify(login.data));
        dispatch(logIn());
        navigate("/");
      } catch (error) {
        setError(true);
        dispatch(logOut());
      }
    },
  })

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
                    
                    <form
                      onSubmit={formik.handleSubmit}
                      className="col-12 col-md-6 mt-3 mt-mb-0"
                    >
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating form-group  mb-3">
                        <input
                          placeholder="Ваш ник"
                          ref={inputRef}
                          className={isValid(isError)}
                          id="username"
                          name="username"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          autoComplete="username"
                          required
                        />
                        <label htmlFor='username'>Ваш ник</label>
                      </div>
                      <div className="form-floating mb-4 ">
                        <input
                          placeholder="Пароль"
                          id="password"
                          name="password"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          className={isValid(isError)}
                          autoComplete="current-password"
                          required
                        />
                          <label htmlFor='password'>Пароль</label>
                          <div className="invalid-tooltip">
                          Неверные имя пользователя или пароль
                          </div>
                      </div>
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                      >
                        Войти
                      </button>
                    </form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>Нет аккаунта?</span>
                      <a href="#">Регестрация</a>
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
export default FormRegistration;
