import React from 'react'
import styled from 'styled-components'

const ItineraryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  height: calc(100vh - 200px);
  width: 100%;
  background-color: ivory;
  min-height: 700px;
  min-width: 400px;
  overflow-y: auto;
  flex-wrap: wrap;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const TripImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  position: relative;
`;

const PexelImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;





const Itinerary = () => {

  return (
    <ItineraryContainer>
      
      <TripImage>
        <PexelImg src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" alt="London Bridge"/>
      </TripImage>

      <h1>Your next vacation</h1>

      

    </ItineraryContainer>
  )
};

export default Itinerary;