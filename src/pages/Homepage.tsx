import React from 'react'
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';


const Homepage = () => {
  
  const isNavbarVisible = false;

  return (
    <>
      <Navbar visible={isNavbarVisible}/>
      
      <HeroSection />
      <br/>
      <br/>
      <Features />
      <br/>
      <br/>
      <Features />
    </>
  )
}


export default Homepage;