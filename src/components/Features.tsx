import React from 'react'
import styled from 'styled-components'
import FeatureCard from './FeatureCard';
import { FeatureCardProps } from '../types';
import budgetIcon from '../assets/budget-icon.png';
import mapsIcon from '../assets/maps-icon.png';
import menuIcon from '../assets/menu-icon.png';
import weatherIcon from '../assets/weather-icon.png';
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
  border-top: 1px solid black;
  border-bottom: 1px solid black;
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
    title: 'Budget your trip',
    description: 'Give your range of budget, we will curate an itinerary that fits your needs.'
  },
  {
    iconSrc: mapsIcon,
    title: 'Choose your destination',
    description: 'Wide selection of activities in any location that you want to visit.'
  },
  {
    iconSrc: menuIcon,
    title: 'Food recommendations',
    description: 'Taste the top local cuisine based on your preferences.'
  },
  {
    iconSrc: weatherIcon,
    title: 'Weather report',
    description: 'Be ready with your wardrobe with an up to date weather report.'
  },
  {
    iconSrc: travelGroupIcon,
    title: 'Plan for the whole group',
    description: 'Activities that will accommodate your entire travel group.'
  },
  {
    iconSrc: itineraryIcon,
    title: 'Custom itinerary',
    description: 'Let us curate a variety of activites and help you plan your next adventure!'
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