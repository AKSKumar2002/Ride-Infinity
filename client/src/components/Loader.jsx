import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg'; // Update if needed

const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    // 🔒 Disable scroll while loader is showing
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = ''; // Re-enable scroll
    };
  }, [onComplete]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-[100dvh] z-[9999] flex flex-col justify-center items-center bg-white"
    >
      {/* Logo Box */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="backdrop-blur-md bg-white/40 border border-white/20 shadow-xl rounded-2xl p-3 mb-8"
        style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)' }}
      >
        <img
          src={logo}
          alt="RideInfinity"
          className="h-16 w-auto object-contain rounded-md"
          style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))' }}
        />
      </motion.div>

      {/* Spinner */}
      <div className="w-14 h-14 rounded-full border-4 border-t-transparent border-b-transparent border-l-[6px] border-r-[6px] border-l-black border-r-[#5C4033] animate-spin"></div>
    </div>
  );
};

export default Loader;
