import React from 'react';
 import { useFormik } from 'formik';
 import * as Yup from 'yup';

 
 const FormAtorithation = () => {
   const formik = useFormik({
     initialValues: {
      login: '',
      password: '',
     },
     validationSchema: Yup.object({
      login: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      passwod: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="userName">Login</label>
       <input
         id="login"
         name="login"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.login}
       />
       <label htmlFor="password">Password</label>
       <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
       />
       <button type="submit">Submit</button>
     </form>
   );
 };
 export default FormAtorithation;