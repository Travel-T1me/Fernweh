import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import travelPic from '../assets/travel-pic1.jpg';

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: darkcyan;
`;

const ParallaxSection = styled.div`
  height: 100vh;
  width: 100vh;
  background-image: url(${travelPic});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParallaxContent = styled.div`
  display: flex;
  
  text-align: center;
  background-color: slategray;
  color: white;
  height: 5rem;
  width: 20rem;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
`;

const ContentText = styled.h1`
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0;
`;


const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeroContainer>
      <ParallaxSection style={{ backgroundPositionY: -scrollPosition * 0.5 + 'px' }}>
        <ParallaxContent>
          <ContentText>Welcome to your next adventure!</ContentText>  
        </ParallaxContent>
      </ParallaxSection>
    </HeroContainer>
  )
};

export default HeroSection;

