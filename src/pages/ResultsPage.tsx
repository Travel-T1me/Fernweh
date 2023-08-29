import React from 'react';
import { styled } from 'styled-components';
import FullItinerary from '../components/FullItinerary';
import Restaurants from '../components/Restaurants';
import Weather from '../components/Weather';

const ResultsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
  padding: 15px;
  height: 100vh;
`;

const FirstColumn = styled.section`
  display: grid;
  grid-column: 1 / 2;

`;

const SecondColumn = styled.section`
  display: grid;
  grid-column: 2 / 3;
  grid-template-rows: auto 1fr;
  row-gap: 15px;
`;

// const WeatherContainer = styled.section`
//   height: 50%
// `
// const RestaurantContainer = styled.section`
//   height: 50%
// `
const ResultsPage = () => {
  return (
    <ResultsContainer>
      <FirstColumn>
          <FullItinerary />
      </FirstColumn>
      {/* <WeatherContainer> */}
      <SecondColumn>
          <Weather />

      {/* </WeatherContainer>
      <RestaurantContainer> */}
          <Restaurants />
      </SecondColumn>
      {/* </RestaurantContainer> */}
    </ResultsContainer>
  )
}

export default ResultsPage;