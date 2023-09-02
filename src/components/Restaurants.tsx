import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';
import RestaurantCard from './RestaurantCard';
import MockData from './MockData';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Restaurant } from '../../types';
import useStore from '../store';
import { PartialStore } from '../../types';


//const data = MockData;

type ScrollWidth = number;

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
  overflow: hidden;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

// const OutterCardContainer = styled.div<{ scrollOffset: number}>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   min-height: 300px;
//   min-width: 300px;

// `;

const SlideshowContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  min-width: 300px;
  margin: 0 auto;
`;


const Restaurants = () => {
  
  const {restaurants, setRestaurants} : PartialStore = useStore();
  
  const slideshowProperties = {
    autoplay: false, // 
    duration: 5000, // Set to 0 to turn off auto slide
    transitionDuration: 500,
    indicators: true,
    infinite: true,
    canSwipe: true,
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantRes = await axiosInstance.get(`/api/yelp/${location}`);
        setRestaurants(restaurantRes.data);
      } catch (error) {
        console.error('Error fetching restaurants: ', error);
      }
    };

    fetchRestaurants();

    console.log(`Checking restaurants state: ${JSON.stringify(restaurants)}`);
  }, []);

  return (
      <RestaurantContainer>
      
        {/* {restaurantData.map((restaurant, index) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))} */}
        {/* <OutterCardContainer scrollOffset={scrollOffset}> */}
        <SlideshowContainer>
          <Slide easing="ease" {...slideshowProperties}>
            {restaurants !== null ? (
              restaurants.map((restaurant: Restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <p>Loading restaurants...</p>
            )}
          </Slide>
        </SlideshowContainer>
          
        {/* </OutterCardContainer> */}
          
      </RestaurantContainer>
    
  )
};

export default Restaurants;