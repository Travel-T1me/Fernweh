import React from 'react';
import styled from 'styled-components';

const RestaurantContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  height: calc(50vh - 150px);
  width: 100%;
  background-color: DarkSeaGreen;
  min-height: 300px;
  min-width: 300px;
`;

const Restaurants = () => {

  return (
    <RestaurantContainer>
      <h1>Hello Foodie Container</h1>
    </RestaurantContainer>
  )
};

export default Restaurants;