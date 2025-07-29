import React, { useState } from 'react';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import Loader from '../components/Loader';

const Home = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Hero />
          <FeaturedSection />
          <Banner />
          <Testimonial />
          <Newsletter />
        </>
      )}
    </>
  );
};

export default Home;
