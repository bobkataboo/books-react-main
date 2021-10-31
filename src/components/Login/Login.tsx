import React from 'react'

import { Formik } from 'formik';
import user from '../../Stores/UserStore';
import api, { login } from '../../api/api';
 
 const Basic = () => (
   <div>
     <h1>Anywhere in your app!</h1>
    
   </div>
 );

 interface errors{
     email?: string;

 }

const Login = () => <div className="Login v">
    {console.log("@@@@ loggedIn", user)}
    <div className='login-form'>
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
            login('auth/login', values)
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
                <div  className="input p">
                    <input
                        className="p"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // value={values.email}
                     />
                </div>

                {errors.username && touched.username && <div>{errors.username}</div>}

            {/* {errors.email && touched.email && errors.email ? <div className='m warning'>{errors.email}</div> : null} */}
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
            <button 
                type="submit" 
                className="item hand" 
                disabled={isSubmitting}
            >
                Submit
            </button>
            </form>
        )}
        </Formik>
    </div>

</div>

export default Login