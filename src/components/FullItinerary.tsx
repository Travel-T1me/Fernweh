import React from 'react'
import styled from 'styled-components'

const ItineraryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  height: calc(100vh - 200px);
  width: 100%;
  background-color: ivory;
  min-height: 700px;
  min-width: 400px;

`;

const FullItinerary = () => {

  return (
    <ItineraryContainer>
      <h1>Hi from inside Itinerary container</h1>
    </ItineraryContainer>
  )
};

export default FullItinerary;