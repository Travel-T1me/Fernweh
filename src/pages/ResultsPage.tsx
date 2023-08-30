import React from 'react';
import { styled } from 'styled-components';
import Itinerary from '../components/Itinerary';
import Restaurants from '../components/Restaurants';
import Weather from '../components/Weather';

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


const ResultsPage = () => {
  return (
    <ResultsContainer>
      
      <FirstColumn>
          <Itinerary />
      </FirstColumn>
      
      <SecondColumn>
          <Weather />
          <Restaurants />
      </SecondColumn>
      
    </ResultsContainer>
  )
}

export default ResultsPage;