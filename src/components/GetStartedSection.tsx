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
  background-size: cover;
`;

const ParallaxSection = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ParallaxContent = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: darkcyan;
  color: white;
  height: 5rem;
  width: 20rem;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: hsl(180, 75%, 40%);
  }
`;

const ContentText = styled.h1`
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit;
`;


const GetStartedSection = () => {

  return(
    <GetStartedContainer>
      <ParallaxSection >
        <ParallaxContent>
          <StyledLink to="/questionaire">
            <ContentText>
              Start your next adventure!
            </ContentText>
          </StyledLink>
        </ParallaxContent>
      </ParallaxSection>
    </GetStartedContainer>
  );
};

export default GetStartedSection;