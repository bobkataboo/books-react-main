import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { motion, MotionConfig } from 'framer-motion';
import { login } from '../../api/api';
import book1 from '../../img/book.png';
import book2 from '../../img/book2.png';
import book3 from '../../img/book3.jpeg';
import { ReactComponent as BookSVG } from '../../img/book-blue.svg';

//  interface errors{
//      email?: string;

//  }

// const img = require('../../img/book.jpeg');
const images = [book1, book2, book3];

const variants = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: 0,
    opacity: 100,
    transition: {
      delay: 0.75,
      duration: 0.75,
      when: 'beforeChildren',
      staggerChildren: 0.5,
    },
  },
  exiting: {
    y: '100vh',
    opacity: 0,
    transition: { duration: 0.75 },
  },
};

const Login = observer(() => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedImage === 2) {
        setSelectedImage(0);
        return;
      }
      setSelectedImage((prevValue) => {
        if (prevValue === 2) { return 0; }
        return prevValue + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const history = useHistory();

  return (
    <div className="Login v">
      <div className="image-container">
        <MotionConfig transition={{ duration: 0.7 }}>

          {images.map((image, index) => (
            // <AnimatePresence initial={false}>
            index === selectedImage && (
              <motion.img
                className="image123"
                  // eslint-disable-next-line react/no-array-index-key
                key={image}
                style={{ y: 0 }}
                // initial={{ y: -1000 }}
                // animate={{ y: 0 }}
                // exit={{ y: 1000 }}
                initial="hidden"
                animate="visible"
                exit="exiting"
                variants={variants}
                src={image}
                alt="src"
                // variants={variants}
              />
            )

            // </AnimatePresence>
          ))}

        </MotionConfig>

        {/* <motion.div className="inner green"
        initial={{ z: -100 }} animate={{ z: 0 }} exit={{ z: 100 }} /> */}
      </div>
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
