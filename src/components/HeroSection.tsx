import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import travelPic from '../assets/travel-pic3.jpg';
import laptopPic from '../assets/whth-pic.png';
import FernwehBackground from './FernwehBackground';

const HeroContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${travelPic});
  background-size: cover;
  background-position: center;
  z-index: 5;
`;



const ParallaxSection = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParallaxContent = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
  width: 100vw;
  padding: 1rem;
`;

const Image = styled.img`
  max-width: 80%;
  height: auto;
`;

// this style scrolls the item upwards at half a pixel per scroll
// style={{ backgroundPositionY: -scrollPosition * 0.5 + 'px' }}

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

  // Calculate the maximum translateY value based on ParallaxSection height
  const maxTranslateY = 100 - 50; // Content height - ParallaxSection height

  // Calculate the translateY value based on scroll position
  const translateY = scrollPosition * 0.5;
  const translatedY = translateY < maxTranslateY ? maxTranslateY : translateY;

  return (
    <HeroContainer>
      <FernwehBackground>
        <ParallaxSection>
          <ParallaxContent style={{ 
            transform : `translateY(${translatedY}px)`
            }}>
            <Image src={laptopPic} alt="Laptop"></Image>
          </ParallaxContent>
        </ParallaxSection>
      </FernwehBackground>
    </HeroContainer>
  )
};

export default HeroSection;

