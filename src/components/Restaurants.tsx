import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';
import RestaurantCard from './RestaurantCard';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Restaurant } from '../../types';
import useStore from '../store';
import { PartialStore } from '../../types';
import MockData from './MockData';

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
  overflow: hidden;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;


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

  // Commented out because we're fetching from yelp within QuestionCard component. Check Case #4
  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       const restaurantRes = await axiosInstance.get(`/yelp/${useStore.getState().location}`);
  //       setRestaurants(restaurantRes.data);
  //     } catch (error) {
  //       console.error('Error fetching restaurants: ', error);
  //     }
  //   };

  //   fetchRestaurants();

    //console.log(`Checking restaurants state: ${JSON.stringify(restaurants)}`);
    //console.log(`RESTAURANTS?`, Array.isArray(restaurants))
  // }, []);

  return (
      <RestaurantContainer>
        
        <SlideshowContainer>
          <Slide easing="ease" {...slideshowProperties}>

            {/* Using Mock data here to save API calls */}
            {/* {data.map((restaurant: Restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))} */}

            {/* Commented out to use MockData instead */}
            {restaurants !== null ? (
              restaurants.map((restaurant: Restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <div>Loading restaurants...</div>
            )}

          </Slide>
        </SlideshowContainer>
          
      </RestaurantContainer>
    
  )
};

export default Restaurants;


//import MockData from './MockData';
//const data = MockData;
// type ScrollWidth = number;

// const OutterCardContainer = styled.div<{ scrollOffset: number}>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   min-height: 300px;
//   min-width: 300px;
// `;

{/* {restaurantData.map((restaurant, index) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))} */}
//{/* <OutterCardContainer scrollOffset={scrollOffset}> */}  

//{/* </OutterCardContainer> */}