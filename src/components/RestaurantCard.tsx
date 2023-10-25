import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';
import { RestaurantCardProps } from '../../types';

const RestaurantCardContainer = styled.div`
  position: relative;
  background-color: ivory;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 400px;
`;

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



const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  
  return (
    <>
      
        <RestaurantCardContainer>

          <ImgContainer>
              <RestaurantImg src={restaurant.photo} alt={restaurant.name} />
            </ImgContainer>

          <InnerCardContainer>
            <TextShadow>

              <CardTitle>{restaurant.name}</CardTitle>

              <InfoParagraph>
                <strong>Address:</strong> {restaurant.address}
              </InfoParagraph>

              <InfoParagraph>
                <strong>Rating:</strong> {restaurant.rating} stars
              </InfoParagraph>

              <InfoParagraph>
                <strong>Review Count:</strong> {restaurant.review_count} total reviews
              </InfoParagraph>

              <InfoParagraph>
                <strong>Price Range:</strong> {restaurant.price_range}
              </InfoParagraph>

              <InfoParagraph>
                <strong>Phone:</strong> {restaurant.phone}
              </InfoParagraph>

              <InfoParagraph>
                <strong>Website:</strong> <a href={restaurant.business_page_link}>Learn more here!</a>
              </InfoParagraph>

              <InfoParagraph>
                <strong>Additional Photos:</strong> <a href={restaurant.photos_page_link}>Feast your eyes here!</a>
              </InfoParagraph>
              
            </TextShadow>
        
          </InnerCardContainer>
        </RestaurantCardContainer>
        
      
    </>
  )
};

export default RestaurantCard;
