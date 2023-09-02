import React from 'react'
import styled from 'styled-components';
import fernwehBG from '../assets/fernweh-background.png';
import { Link } from 'react-router-dom';


const FernwehContainer = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 100%;
  background-image: url(${fernwehBG});
  background-size: cover;
  z-index: 6;
  overflow-x: hidden;
`;

const TextContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0; /* Position on the left */
  top: 55%; /* Center vertically */
  transform: translateY(-50%); /* Center vertically */
  width: 35%; /* Take up the left half of the container */
  padding: 5rem; /* Add some padding for spacing */
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
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
  margin-left: 5rem;
`;


const FernwehBackground = ({ children }) => {

  return (
    <FernwehContainer>
      {children}
      <TextContainer>
        <h1 >Get ready to plan your next adventure</h1>
        <br/>
        <h2 style={{ color: 'darkgray' }}>
          Let us take care of the heavy lifting. Just kick back and prepare for the ride
        </h2>
        <br/>
        <br/>
        <StyledLink to="/questionnaire">
          <h2>Get Started</h2>
        </StyledLink>
        
      </TextContainer>
      
    </FernwehContainer>
  )
};

export default FernwehBackground;