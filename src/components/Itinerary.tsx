import React, { useState } from 'react';
import styled from 'styled-components';
import parseGPTResponse from '../../utils/parseGPTresponse';
import useStore from '../store';
import { Slide } from 'react-slideshow-image';
import ItineraryCard from './ItineraryCard';
import 'react-slideshow-image/dist/styles.css';
import CircularProgress from '@mui/material/CircularProgress';

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

const Itinerary = () => {
  const [parsedResponse, setParsedResponse] = useState();
  const { gptResponse } = useStore();

  React.useEffect(() => {
    setParsedResponse(parseGPTResponse(gptResponse));
  }, [gptResponse]);

  const groupedItinerary = {};

  if (parsedResponse) {
    for (const day of Object.keys(parsedResponse)) {
      for (const timeOfDay of ['Morning', 'Afternoon', 'Evening']) {
        const activities = parsedResponse[day][timeOfDay];
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
    <>
      <ItineraryContainer>
        <TripImage>
          <PexelImg src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" alt="London Bridge" />
        </TripImage>
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
      </ItineraryContainer>
    </>
  );
};

export default Itinerary;
