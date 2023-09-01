import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const ItineraryCardContainer = styled.div`
  position: relative;
  background-color: ivory;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 400px;
`;
// border: 1px solid black;  Even out edges on cards

const InnerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%; 
  padding: 20px;
  color: black; 
  
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  text-decoration: underline;
  z-index: 2;
`;

const InfoParagraph = styled.p`
  margin-bottom: 10px;
  z-index: 2;
`;

const TextShadow = styled.div`
  border-radius: 20px;
  background-color: whitesmoke;
  z-index: 1;
  padding: 15px;
`;

interface ItineraryCardProps {
    day: string,
    timeOfDay: string,
    activity: string
}


const ItineraryCard: React.FC<ItineraryCardProps> = ({day, timeOfDay, activity}) => {
    return (
        <>
        <InnerCardContainer >
            <CardTitle>{day}</CardTitle>
            <InfoParagraph>
                {timeOfDay}
            </InfoParagraph>
        </InnerCardContainer>
        </>
    )
}

export default ItineraryCard