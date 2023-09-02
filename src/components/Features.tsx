import React from 'react'
import styled from 'styled-components'
import FeatureCard from './FeatureCard';
import { FeatureCardProps } from '../../types';
import budgetIcon from '../assets/budget-icon.png';
import mapsIcon from '../assets/maps-icon.png';
import menuIcon from '../assets/menu-icon.png';
import ideaIcon from '../assets/idea-icon.png';
import travelGroupIcon from '../assets/travel-group-icon.png';
import itineraryIcon from '../assets/itinerary-icon.png';



const FeaturesTitle = styled.div`
  margin-top: 10rem;
  margin-bottom: 4rem;
`;

const FeaturesContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 75vh;
  z-index: 10;
  background-color: white;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
`;

const FeaturesCards: FeatureCardProps[] = [
  {
    iconSrc: budgetIcon,
    title: 'Budget-Friendly Adventures',
    description: `Tailor your journey by sharing your budget range; we'll handcraft an itinerary that aligns with your financial preferences.`
  },
  {
    iconSrc: ideaIcon,
    title: 'Dream Destination Explorer',
    description: 'Uncover a plethora of activities across any desired location you have in mind, making your travel aspirations a reality.'
  },
  {
    iconSrc: menuIcon,
    title: 'Culinary Delights',
    description: 'Indulge in exquisite local flavors tailored to your taste, as we present you with the finest culinary recommendations.'
  },
  {
    iconSrc: mapsIcon,
    title: 'Interactive Map',
    description: 'Play with out interactive map to pin point all your destinations during your trip.'
  },
  {
    iconSrc: travelGroupIcon,
    title: 'Group Fun',
    description: 'Whether a couple or a crowd, discover activities perfect for your whole travel party to enjoy together.'
  },
  {
    iconSrc: itineraryIcon,
    title: 'Tailored Adventure Planner',
    description: 'Embark on a unique journey designed just for you, with a handpicked selection of activities to craft your ultimate travel experience.'
  },
]

const Features = () => {

  return (
    <>
      <FeaturesContainer>
        <FeaturesTitle>
          <h1>Features</h1>
        </FeaturesTitle>
        
        <CardsContainer>
          {
            FeaturesCards.map((card: FeatureCardProps) => {
              const { iconSrc, title, description } = card;
              return <FeatureCard 
                iconSrc = {iconSrc}
                title = {title}
                description = {description}
              />
            })
          }
        </CardsContainer>
      </FeaturesContainer>
    </>
  )
};


export default Features;