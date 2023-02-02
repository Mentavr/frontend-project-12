import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "./image/projectMen.jpeg"
import routes from "./routes";
import axios from 'axios';
import useAuth from './hooks/useAuth.jsx';


const FormAtorithation = () => {
  const auth = useAuth();
  const loginPathApi = routes.userLogin()

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    // validationSchema: Yup.object({
    //   login: Yup.string()
    //     .max(15, "Must be 15 characters or less")
    //     .required("Required"),
    //   passwod: Yup.string().required("Required"),
    // }),
    onSubmit: async () => {
      try{
        console.log(loginPathApi)
        const login = await axios.post(loginPathApi, formik.values);
        window.localStorage.getItem('userId', login.token);
        auth.logIn();
      }catch (error) {
        auth.logOut();
      }
    },
  });
  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img className="rounded-circle" src={img} alt=""/>
                    </div>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="col-12 col-md-6 mt-3 mt-mb-0"
                    >
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3">
                      <label htmlFor="login">Ваш ник</label>
                        <input
                          id="login"
                          name="login"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.login}
                          className="form-control"
                          autoComplete="login"
                          required 
                          autofocus
                          placeholder="Ваш ник"
                        />
                      </div>
                      <div className="form-floating mb-4">
                      <label htmlFor="password">Пароль</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          className="form-control"
                          autoComplete="current-password"
                          required
                          placeholder="Пароль"
                        />
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
export default FormAtorithation;
