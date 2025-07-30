import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext();

  const flippingWords = ['Ride', 'Bike', 'Trip'];
  const [flipIndex, setFlipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipIndex((prev) => (prev + 1) % flippingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      '/cars?pickupLocation=' +
        pickupLocation +
        '&pickupDate=' +
        pickupDate +
        '&returnDate=' +
        returnDate
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4 flex flex-col items-center justify-center gap-10 bg-light text-center overflow-x-hidden"
    >
      {/* Heading */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl md:text-5xl font-semibold flex items-center justify-center gap-2"
      >
        Need a
        <span
          className="relative flex items-center justify-center w-[100px] h-[50px] md:w-[130px] md:h-[60px] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={flipIndex}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center font-bold text-amber-500 text-3xl md:text-5xl leading-tight"
              style={{ backfaceVisibility: 'hidden', height: '100%' }}
            >
              {flippingWords[flipIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        ?
      </motion.h1>

      <motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="flex items-end justify-center gap-6 w-full max-w-6xl px-4 mx-auto"
>
  {/* Left Bike */}
  <div className="w-1/3 flex justify-center">
    <motion.img
      src={assets.bmw}
      alt="Left bike"
      className="h-40 sm:h-48 md:h-60 lg:h-64 scale-x-[-1] object-contain"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    />
  </div>

  {/* Center Bike */}
  <div className="w-1/3 flex justify-center">
    <motion.img
      src={assets.bullet}
      alt="Center bike"
      className="h-40 sm:h-48 md:h-60 lg:h-64 object-contain"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
    />
  </div>

  {/* Right Bike */}
  <div className="w-1/3 flex justify-center">
    <motion.img
      src={assets.kawasaki}
      alt="Right bike"
      className="h-40 sm:h-48 md:h-60 lg:h-64 object-contain"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    />
  </div>
</motion.div>

    </motion.div>
  );
};

export default Hero;
