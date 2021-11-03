import React from 'react';
import { useFormik } from 'formik';
import api from '../../api/api';

const Register = () => {
  const validate = (values) => {
    const errors:any = {};
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password1: '',
      password2: '',
    },
    validate,
    onSubmit: (values) => {
      api('auth/register', values);
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="Register">
      <div className="register-form">
        <form onSubmit={formik.handleSubmit}>
          {/* <label htmlFor="email">Email Address</label> */}
          <div className="input p">
            <input
              id="username"
              name="username"
              type="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className="input p">
            <input
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="input p">
            <input
              id="password1"
              name="password1"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password1}
            />
          </div>
          <div className="input p">
            <input
              id="password2"
              name="password2"
              type="password"
              placeholder="Repeat password"
              onChange={formik.handleChange}
              value={formik.values.password2}
            />
          </div>
          <button className="item hand" type="submit">Submit</button>
        </form>

      </div>

    </div>

  );
};

export default Register;
