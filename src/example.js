import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react';
import './styles.css';

const variants = {
  hidden: { y: -1000, opacity: 0 },
  visible: { y: 0, opacity: 100 },
  exiting: { y: 1000, opacity: 0 },
};

const images = [
  'https://media.istockphoto.com/photos/various-fresh-ripe-pumpkins-as-background-picture-id1277767891',
  'https://media.istockphoto.com/photos/asian-chinese-mid-adult-woman-helping-her-father-in-the-farm-picture-id1268636389',
  'https://media.istockphoto.com/photos/autumn-leaves-falling-on-the-ground-in-a-park-picture-id1278765757',
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedImage === 2) {
        setSelectedImage(0);
        return;
      }
      setSelectedImage((prevValue) => {
        if (prevValue === 2) {
          return 0;
        }
        return prevValue + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <div className="image-container">
        <MotionConfig transition={{ duration: 0.7 }}>
          <AnimatePresence initial={false}>
            {images.map(
              (image, index) => index === selectedImage && (
              <motion.img
                className="image123"
                    // eslint-disable-next-line react/no-array-index-key
                key={image}
                style={{ y: 0 }}
                initial="hidden"
                animate="visible"
                exit="exiting"
                variants={variants}
                src={image}
                alt="src"
              />
              ),
            )}
          </AnimatePresence>
        </MotionConfig>

        {/* <motion.div className="inner green"
        initial={{ z: -100 }} animate={{ z: 0 }} exit={{ z: 100 }} /> */}
      </div>
    </div>
  );
}
