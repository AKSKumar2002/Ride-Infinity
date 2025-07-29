import React, { useState, useEffect } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner, bikeSearchInput, setBikeSearchInput } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role');
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`backdrop-blur-md bg-white/30 border-b border-white/20 
      flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 
      text-gray-800 sticky top-0 z-50 shadow-md rounded-b-2xl transition-all`}
    >
      <Link to='/'>
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={assets.logo1}
          alt="logo"
          className="h-16 object-contain rounded-2xl shadow-lg bg-white/50 backdrop-blur-md p-1"
        />
      </Link>

      <div
        className={`max-sm:fixed max-sm:top-20 max-sm:right-0 
        max-sm:w-full max-sm:h-[calc(100dvh-5rem)] max-sm:overflow-y-auto 
        flex flex-col sm:flex-row items-start sm:items-center gap-6 
        sm:gap-10 max-sm:p-6 max-sm:z-40 max-sm:transition-transform duration-300 
        ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}
        ${location.pathname === '/' ? 'bg-white/100' : 'bg-white/100'}
        max-sm:backdrop-blur-lg sm:static sm:bg-transparent`}
      >
        {menuLinks.map((link, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={link.path}
              className="text-base font-medium text-gray-700 hover:text-primary transition-all"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}

        {/* Search input (used on Bikes page) */}
        <div className='hidden lg:flex items-center text-sm gap-2 border border-white/40 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm'>
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
            placeholder="Search bikes"
            value={bikeSearchInput}
            onChange={(e) => setBikeSearchInput(e.target.value)}
          />
          <img src={assets.search_icon} alt="search" className="w-5 h-5" />
        </div>

        <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
          {isOwner && (
            <motion.button
              onClick={() => navigate('/owner')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium text-primary hover:underline"
            >
              Dashboard
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              user ? logout() : setShowLogin(true);
              setOpen(false);
            }}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull 
            transition-all text-white rounded-lg shadow-md"
          >
            {user ? 'Logout' : 'Login'}
          </motion.button>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        className='sm:hidden cursor-pointer'
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
