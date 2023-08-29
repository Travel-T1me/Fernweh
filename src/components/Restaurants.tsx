import React from 'react';
import styled from 'styled-components';

const RestaurantContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  height: calc(50vh - 22.5px);
  width: 50vw;
  background-color: DarkSeaGreen;
`;

const Restaurants = () => {

  return (
    <RestaurantContainer>
      <h1>At our local pizza restaurant you can eat dirt cheap. But who wants to eat dirt?</h1>
    </RestaurantContainer>
  )
};

export default Restaurants;