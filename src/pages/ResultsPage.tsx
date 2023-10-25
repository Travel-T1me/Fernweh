import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Itinerary from '../components/Itinerary';
import Restaurants from '../components/Restaurants';
import MapContainer from '../components/MapContainer';
import useStore from '../store';
import { BaseButtonStyle } from '../GlobalStyles';
import axiosInstance from '../axiosInstance';
import { PartialStore } from '../../types';


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
  //console.log('results page is rendered')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const {pexelPics, setPexelPics } : PartialStore = useStore();

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:4000/isAuthenticated", { withCredentials: true });
      setIsLoggedIn(!!response.data);
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  };

  // const fetchPexelPics = async () => {
  //   try {
  //     const pexelsResponse = await axiosInstance.get(`/pexels?query=${useStore.getState().location}`);
  //     // save response data to store
  //     setPexelPics(pexelsResponse.data.photos);
  //     console.log(`Pexel list of images after setting: `, pexelPics)

  //   } catch (error) {
  //     console.log(`Error fetching pexep pics: ${error}`);
  //   }
  // };


  useEffect(() => {
    console.log('ResultsPage component re-rendered');
    fetchUserData();
    // fetchPexelPics();
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

/* Moving the restaurant fetch request to here since it's currently not being used within this component

  // const fetchRestaurants = async () => {
  //   try {
  //     const restaurantRes = await axiosInstance.get(`/yelp/${useStore.getState().location}`);
  //     setRestaurants(restaurantRes.data);
  //   } catch (error) {
  //     console.error('Error fetching restaurants: ', error);
  //   }
  // };

  // fetchRestaurants();

    // console.log(`Checking restaurants state: ${JSON.stringify(restaurants)}`);
    // console.log(`RESTAURANTS?`, Array.isArray(restaurants))
*/