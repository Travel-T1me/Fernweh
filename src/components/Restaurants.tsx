import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';
import RestaurantCard from './RestaurantCard';
import NavButton from './NavButton';
import MockData from './MockData';


type ScrollWidth = number;

const data = MockData;


const RestaurantContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  height: calc(50vh - 150px);
  width: 100%;
  background-color: DarkSeaGreen;
  min-height: 300px;
  min-width: 300px;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardContainer = styled.div<{ scrollOffset: number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 300px;

  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ scrollOffset }) => scrollOffset}px);
`;


const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = (scrollWidth: ScrollWidth) => {
    setScrollOffset((prevOffset) => {
      const newOffset = prevOffset + scrollWidth;
      return Math.max(0, Math.min(newOffset, (data.length - 1) * -300));
    });
  };

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       const restuarantRes = await axiosInstance.post(`/yelp/${mongoID}`);
  //       setRestaurants(restaurantRes.data);
  //     } catch (error) {
  //       console.error('Error fetching restaurants: ', error);
  //     }
  //   };

  //   fetchRestaurants();
  // }, []);

  return (
    <RestaurantContainer>
      
      {/* {restaurantData.map((restaurant, index) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))} */}
      <CardContainer scrollOffset={scrollOffset}>
        <NavButton onClick={() => handleScroll(-300)}>{"<"}</NavButton>
        {data.map((restaurant, index) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
        <NavButton onClick={() => handleScroll(300)}>{">"}</NavButton>
      </CardContainer>

    </RestaurantContainer>
  )
};

export default Restaurants;