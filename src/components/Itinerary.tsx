import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { PexelPic } from '../../types';
import useStore from '../store';
import { PartialStore } from '../../types';
import axiosInstance from '../axiosInstance';
import parseGPTResponse from '../../utils/parseGPTresponse';
import CircularProgress from '@mui/material/CircularProgress';
import ItineraryCard from './ItineraryCard';
import MockItineraryData from './MockData2';

const data = MockItineraryData;

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
  flex-wrap: wrap;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const TripImagesContainer = styled.div`
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

const GptResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  max-height: 500px;
  min-width: 300px;
  margin: 1rem;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 20px;
  background-color: whitesmoke;
  padding: 15px;
  overflow-x: hidden;
  overflow-y: auto;
`;

// Define interfaces for the expected data structure
interface ParsedResponse {
  [day: string]: {
    Morning?: string[];
    Afternoon?: string[];
    Evening?: string[];
  };
}

interface GroupedItinerary {
  [day: string]: {
    timeOfDay: string;
    activities: string[];
  }[];
}



const Itinerary = () => {
  const {pexelPics, setPexelPics} : PartialStore = useStore();

  const slideshowProperties = {
    autoplay: true, // 
    duration: 5000, // Set to 0 to turn off auto slide
    transitionDuration: 500,
    indicators: true,
    infinite: true,
    canSwipe: true,
  }

  useEffect(() => {
    //console.log(`Before fetch pexel call`);
    const fetchPexelPics = async () => {
      try{
        const pexelsResponse = await axiosInstance.get(`/pexels?query=${useStore.getState().location}`);
        // save response data to store
        setPexelPics(pexelsResponse.data.photos);
  
      } catch(error) {
        console.log(`Error fetching pexel pics: ${error}`);
      }
    };
    fetchPexelPics();
  }, [])

  // Adjustment here
  const [parsedResponse, setParsedResponse] = useState<ParsedResponse | null>(null);
  // Commenting out to use mock data instead of data from store:
  // const { gptResponse } = useStore();

  const gptResponse = JSON.stringify(data);

  React.useEffect(() => {
    setParsedResponse(parseGPTResponse(gptResponse));
  }, [gptResponse]);

  // Adjustment here
  const groupedItinerary: GroupedItinerary = {};

  if (parsedResponse) {
    for (const day of Object.keys(parsedResponse)) {
      for (const timeOfDay of ['Morning', 'Afternoon', 'Evening']) {
        // Adjustment here
        const activities = (parsedResponse[day] as { [key: string]: string[] })[timeOfDay];
        if (activities && activities.length > 0) {
          if (!groupedItinerary[day]) {
            groupedItinerary[day] = [];
          }
          groupedItinerary[day].push({
            timeOfDay,
            activities,
          });
        }
      }
    }
  }

  return (
    <ItineraryContainer>
      
      <TripImagesContainer>
        <Slide easing="ease" {...slideshowProperties}>
          {pexelPics !== null ? (
            pexelPics.map((pexelPic: PexelPic) => (
              <PexelImg src={pexelPic.url} alt={pexelPic.alt} />
            ))
          ) : (
            <p>Loading images...</p>
          )}
        </Slide>
        
        
        <br />
        <br />

        <GptResponseContainer>
          {Object.keys(groupedItinerary).length === 0 ? (
            <>
              <h1>Loading your itinerary...</h1>
              <CircularProgress />
            </>
          ) : (
            <>
              {Object.keys(groupedItinerary).map((day) => (
                <div key={day}>
                  {groupedItinerary[day].map((data, index) => (
                    <ItineraryCard
                      key={`${day}-${data.timeOfDay}-${index}`}
                      day={index === 0 ? day : ''}
                      timeOfDay={data.timeOfDay}
                      activities={data.activities}
                    />
                  ))}
                </div>
              ))}
            </>
          )}
        </GptResponseContainer>
        
      </TripImagesContainer>

      

    </ItineraryContainer>
  )
};


export default Itinerary;


//{/* <TripImg src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" alt="London Bridge" /> */}