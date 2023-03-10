import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "./image/projectMen.jpeg";
import routes from "./routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn, logOut } from './slice/authLogger';


const FormAtorithation = () => {
  const [isErrorAutorithation, setErrorAutorithation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const loginPathApi = routes.userLogin();

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

  // const validation = (errors) =>  {
  //   console.log(errors)
  //   errors.username || errors.password ? setError(true) : setError(false);
  // }
  


  const isValid = (error) => {
    if(error) {
      return 'form-control is-invalid'
    }
    return 'form-control';
  }
  

  const classAutorithation = isValid(isErrorAutorithation)
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      try {
        const login = await axios.post(loginPathApi, formik.values);
        localStorage.setItem("userId", JSON.stringify(login.data));
        dispatch(logIn());
        navigate("/");
      } catch (error){
        setErrorAutorithation(true);
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
                      <h1 className="text-center mb-4">??????????</h1>
                      <div className="form-floating form-group  mb-3">
                        <input
                          placeholder="?????? ??????"
                          ref={inputRef}
                          className={classAutorithation}
                          id="username"
                          name="username"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          autoComplete="username"
                          required
                        />
                        <label htmlFor='username'>?????? ??????</label>
                      </div>
                      <div className="form-floating mb-4 ">
                        <input
                          placeholder="????????????"
                          id="password"
                          name="password"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          className={classAutorithation}
                          autoComplete="current-password"
                          required
                        />
                          <label htmlFor='password'>????????????</label>
                          <div className="invalid-tooltip">
                          ???????????????? ?????? ???????????????????????? ?????? ????????????
                          </div>
                      </div>
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                      >
                        ??????????
                      </button>
                    </form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>?????? ?????????????????</span>
                      <a href="#">??????????????????????</a>
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
