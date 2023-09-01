import React from 'react'
import styled from 'styled-components'
import parseGPTResponse from '../../utils/parseGPTresponse'
import useStore from '../store'
import { Slide } from 'react-slideshow-image';
import ItineraryCard from './ItineraryCard';
import 'react-slideshow-image/dist/styles.css'

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

const SlideshowContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  min-width: 300px;
  margin: 0 auto;
`;

const Itinerary = () => {
  // grab the gptResponse and parse the data
  const { gptResponse } = useStore()
  const parsedResponse = parseGPTResponse(gptResponse); 

  const slideshowProperties = {
    autoplay: false, // 
    duration: 5000, // Set to 0 to turn off auto slide
    transitionDuration: 500,
    indicators: true,
    infinite: true,
    canSwipe: true,
  };

  const timeOfDayArray = ['Morning', 'Afternoon', 'Evening']
  const dayArray = Object.keys(parsedResponse);
  const arrOfItineraryCards = [];


  for (const day of dayArray){ //[Day 1, etc.]
    for (let i = 0; i < timeOfDayArray.length; i++){
      let timeOfDay = timeOfDayArray[i]
      let activityForTimeOfDayArray = parsedResponse[day][timeOfDay] //object[Day 1][Morning]
      for (const activity of activityForTimeOfDayArray){
        const itineraryCard = <ItineraryCard day={day} timeOfDay={timeOfDay} activity={activity}/>
        arrOfItineraryCards.push(itineraryCard)
      }
    }
  }


  return (
    <>
    <ItineraryContainer>
      
      <TripImage>
        <PexelImg src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" alt="London Bridge"/>
      </TripImage>

      <h1>Your next vacation</h1>
    </ItineraryContainer>
    
    <SlideshowContainer>
        <Slide easing="ease" {...slideshowProperties}>
          {arrOfItineraryCards}
        </Slide>
      </SlideshowContainer>
    </>
  )
};

export default Itinerary;