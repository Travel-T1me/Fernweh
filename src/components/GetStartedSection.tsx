import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import travelPic from '../assets/travel-pic1.jpg';
import { Link } from 'react-router-dom';


const GetStartedContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${travelPic});
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: 70% auto;
`;

// const ParallaxSection = styled.div`
//   position: relative;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const StartButton = styled(Link)`
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: darkcyan;
  color: white;
  height: 3.5rem;
  width: 13rem;
  border-radius: 40px;
  padding: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: hsl(180, 75%, 40%);
  }
  text-decoration: none; 
`;


// const StyledLink = styled(Link)`
  
//   color: inherit;
// `;


const GetStartedSection = () => {

  return(
    <GetStartedContainer>
      {/* <ParallaxSection > */}
        <StartButton to="/questionnaire">
          <h2>Get Started</h2>
        </StartButton>
      {/* </ParallaxSection> */}
    </GetStartedContainer>
  );
};

export default GetStartedSection;