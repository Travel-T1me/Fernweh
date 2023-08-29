import React from 'react'
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import GetStartedSection from '../components/GetStartedSection';
import Footer from '../components/Footer';


const Homepage = () => {
  
  const isNavbarVisible = false;

  return (
    <>
      <Navbar visible={isNavbarVisible}/>
      
      <HeroSection />
      
      <Features />
      
      <GetStartedSection />
      
      <Footer />
    </>
  )
}


export default Homepage;