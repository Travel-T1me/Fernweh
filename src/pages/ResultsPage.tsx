import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import FullItinerary from '../components/FullItinerary';
import Restaurants from '../components/Restaurants';
import Weather from '../components/Weather';
import useStore from '../store';
import { Marker } from '@react-google-maps/api';
import Map from '../components/Map'

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

const processLatLng = function(latLngStr: string){
  const latLngStrArr = latLngStr.split(',');


  return {
    lat: Number(latLngStrArr[0]),
    lng: Number(latLngStrArr[1])
  }
}

const processRestaurants = function(restaurants: any[]){
  return restaurants.map((restaurant, index) => {
    return <Marker position={{
      lat: Number(restaurant.latitude),
      lng: Number(restaurant.longitude)
    }}
    
    key={'marker' + index}></Marker>
  })
}


const ResultsPage = () => {
  const center = processLatLng(useStore.getState().latLong);
  const markers = processRestaurants(useStore.getState().restaurants);
  
  return (
    <ResultsContainer>
      <FirstColumn>
          <FullItinerary />
      </FirstColumn>

      <Map center={center} markers={markers}/>
      
      <SecondColumn>
          <Weather />
          <Restaurants />
      </SecondColumn>
      
    </ResultsContainer>
  )
}

export default ResultsPage;