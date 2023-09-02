import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Itinerary from '../components/Itinerary';
import Restaurants from '../components/Restaurants';
import MapContainer from '../components/MapContainer';
import useStore from '../store';
import { BaseButtonStyle } from '../GlobalStyles';
import axios from 'axios';

const Button = styled.button`${BaseButtonStyle}`;

const ResultsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 100px;
  padding: 100px;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 2rem;
    padding-top: 2rem;
  }
`;

const FirstColumn = styled.section`
  display: grid;
  grid-column: 1 / 2;

  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const SecondColumn = styled.section`
  display: grid;
  grid-column: 2 / 3;
  grid-template-rows: auto 1fr;
  row-gap: 100px;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    row-gap: 2rem;
    padding-bottom: 2rem;
  }
`;


const LogoutButton = styled(Button)`
  position: fixed;
  top: 30px;
  right: 60px;
  z-index: 20;
  background-color: white;
  border-color: darkcyan;
  color: darkcyan;
  &:hover {
    background-color: hsl(180, 50%, 85%);
  }
`;


const ResultsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/isAuthenticated", { withCredentials: true });
      setIsLoggedIn(!!response.data);
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  
  return (
    <ResultsContainer>
      
      <FirstColumn>
          <Itinerary />
      </FirstColumn>
      
      <SecondColumn>
          <MapContainer />
          <Restaurants />
          {isLoggedIn && 
          <a href="http://localhost:4000/logout">
          <LogoutButton>Logout</LogoutButton>
          </a>
          
          }
      </SecondColumn>
      
    </ResultsContainer>
  )
}

export default ResultsPage;