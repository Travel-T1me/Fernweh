import React from 'react';
import styled from 'styled-components';

const ItineraryCardContainer = styled.div`
  position: relative;
  background-color: whitesmoke;
  display: grid;
  align-items: 1fr 1fr;
  justify-content: center;
  width: 100%;
`;

const CardTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 10px;
  text-decoration: underline;
  text-align: center;
`;

const TimeOfDay = styled.p`
  font-size: 28px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
`;

const Activity = styled.div`
  font-size: 20px;
`;

interface ItineraryCardProps {
  day: string;
  timeOfDay: string;
  activities: string[];
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ day, timeOfDay, activities }) => {
  let renderedTimeOfDay = false; // Track if timeOfDay has been rendered

  return (
    <>
      <ItineraryCardContainer>
        {activities.map((activity, index) => (
          <div key={`${day}-${timeOfDay}-${index}`}>
            {index === 0 && <CardTitle>{day}</CardTitle>}
            {/* Only render timeOfDay once for the group */}
            {!renderedTimeOfDay && <TimeOfDay>{timeOfDay}</TimeOfDay>}
            <Activity>{activity}</Activity>
            {renderedTimeOfDay = true} {/* Mark as rendered */}
          </div>
        ))}
      </ItineraryCardContainer>
    </>
  );
};

export default ItineraryCard;
