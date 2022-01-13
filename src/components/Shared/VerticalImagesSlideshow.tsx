import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import book1 from '../../img/book.png';
import book2 from '../../img/book2.png';
import book3 from '../../img/book3.jpeg';

const images = [book1, book2, book3];

const variants = {
  hidden: { y: -700 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
    },
  },
  exiting: {
    y: 700,
    transition: { duration: 0.75 },
  },
};

const VerticalImagesSlideshow = () => {
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

  return (
    <div className="image-container">
      <MotionConfig transition={{ duration: 0.7 }}>
        <AnimatePresence initial={false}>
          <motion.img
            className="image123"
            key={images[selectedImage]}
            initial="hidden"
            animate="visible"
            exit="exiting"
            variants={variants}
            src={images[selectedImage]}
            alt="src"
          />
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

export default VerticalImagesSlideshow;
