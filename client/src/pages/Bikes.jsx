import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import CarCard from '../components/CarCard';

const Bikes = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { bikes, axios, bikeSearchInput } = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredbikes, setFilteredbikes] = useState([]);

  const applyFilter = () => {
    if (!bikeSearchInput || bikeSearchInput.trim() === '') {
      setFilteredbikes(bikes);
      return;
    }

    const input = bikeSearchInput.toLowerCase().replace(/\s+/g, '');

    const filtered = bikes.filter((bike) => {
      return (
        (bike.brand?.toLowerCase().replace(/\s+/g, '') || '').includes(input) ||
        (bike.model?.toLowerCase().replace(/\s+/g, '') || '').includes(input) ||
        (bike.category?.toLowerCase().replace(/\s+/g, '') || '').includes(input) ||
        (bike.transmission?.toLowerCase().replace(/\s+/g, '') || '').includes(input)
      );
    });

    setFilteredbikes(filtered);
  };

  const searchbikeAvailablity = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredbikes(data.availablebikes);
        if (data.availablebikes.length === 0) {
          toast('No bikes available');
        }
      } else {
        toast.error('Failed to check availability');
      }
    } catch (error) {
      toast.error('Error checking availability');
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchbikeAvailablity();
    }
  }, []);

  useEffect(() => {
    if (bikes.length > 0 && !isSearchData) {
      applyFilter();
    }
  }, [bikeSearchInput, bikes]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
      >
        <Title
          title="Available Bikes"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
      >
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredbikes.length} Bikes
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredbikes.map((bike, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <CarCard bike={bike} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Bikes;
