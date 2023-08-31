import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const RestaurantCardContainer = styled.div`
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

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding-top: calc(100% * 1/2);
  position: relative;
`;
//
// height: 100%;

const RestaurantImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  text-decoration: underline;
`;

const InfoParagraph = styled.p`
  margin-bottom: 10px;
`;


interface Restaurant {
  id: string;
  alias: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  business_page_link: string;
  rating: number;
  review_count: number;
  price_range: string;
  photo: string;
  photos_page_link: string;
  phone: string;
  country: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}


const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  
  return (
    <>
      
        <RestaurantCardContainer>
          <ImgContainer>
              <RestaurantImg src={restaurant.photo} alt={restaurant.name} />
            </ImgContainer>
          <InnerCardContainer>
            
            <CardTitle>{restaurant.name}</CardTitle>
            <InfoParagraph>Address: {restaurant.address}</InfoParagraph>
            <InfoParagraph>Rating: {restaurant.rating} stars</InfoParagraph>
            <InfoParagraph>Price Range: {restaurant.price_range}</InfoParagraph>
            <InfoParagraph>Phone: {restaurant.phone}</InfoParagraph>
            <InfoParagraph>
              Website: <a href={restaurant.business_page_link}>Learn more here!</a>
            </InfoParagraph>
            <InfoParagraph>
              Additional Photos: <a href={restaurant.photos_page_link}>Feast your eyes here!</a>
            </InfoParagraph>
            
          </InnerCardContainer>
        </RestaurantCardContainer>
        
      
    </>
  )
};

export default RestaurantCard;
