import React from 'react';

import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { login } from '../../api/api';
import { ReactComponent as BookSVG } from '../../img/book-blue.svg';

//  interface errors{
//      email?: string;

//  }

const Login = observer(() => {
  const history = useHistory();

  return (
    <div className="Login v">
      <div className="image-container" />
      <div className="login-form center">
        <BookSVG />
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            login('auth/login', values, history);
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="input p">
                <input
                  className="p"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errors.username && touched.username && <div>{errors.username}</div>}
              <div className="input p">
                <input
                  className="p"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
              {errors.password && touched.password && errors.password}
              <div>
                <button
                  type="submit"
                  className="item hand submit center"
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
              </div>

            </form>
          )}
        </Formik>
      </div>

    </div>
  );
});

export default Login;
